/**
 * UdyamSetu AI — Centralized Voice Service (ASR & TTS Engine)
 * Manages Web Speech API lifecycle: SpeechRecognition, SpeechSynthesis,
 * capability detection, voice matching, session safety, and cleanup.
 */

// Browser feature detection
export function isSpeechRecognitionSupported() {
  if (typeof window === 'undefined') return false;
  return !!(window.SpeechRecognition || window.webkitSpeechRecognition);
}

export function isSpeechSynthesisSupported() {
  if (typeof window === 'undefined') return false;
  return 'speechSynthesis' in window && typeof window.SpeechSynthesisUtterance !== 'undefined';
}

export function getSpeechRecognitionConstructor() {
  if (typeof window === 'undefined') return null;
  return window.SpeechRecognition || window.webkitSpeechRecognition || null;
}

/**
 * Cache and retrieve browser synthesis voices.
 */
let cachedVoices = [];
let voicesLoaded = false;

function loadVoices() {
  if (!isSpeechSynthesisSupported()) return [];
  const voices = window.speechSynthesis.getVoices();
  if (voices && voices.length > 0) {
    cachedVoices = voices;
    voicesLoaded = true;
  }
  return cachedVoices;
}

if (typeof window !== 'undefined' && isSpeechSynthesisSupported()) {
  loadVoices();
  if (window.speechSynthesis.onvoiceschanged !== undefined) {
    window.speechSynthesis.onvoiceschanged = () => {
      loadVoices();
    };
  }
}

/**
 * Find the most suitable SpeechSynthesisVoice for a given BCP-47 language tag.
 * E.g., 'hi-IN', 'en-IN', 'bn-IN'.
 */
export function findBestVoiceForLanguage(langCode) {
  if (!isSpeechSynthesisSupported()) return null;
  const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
  if (!voices || voices.length === 0) return null;

  const target = (langCode || '').toLowerCase().replace('_', '-');
  const targetPrefix = target.split('-')[0];

  // 1. Exact match (e.g. 'hi-in' === 'hi-in')
  let match = voices.find(v => (v.lang || '').toLowerCase().replace('_', '-') === target);
  if (match) return match;

  // 2. Prefix match (e.g. 'hi' matches 'hi_IN')
  match = voices.find(v => (v.lang || '').toLowerCase().replace('_', '-').startsWith(targetPrefix));
  if (match) return match;

  // 3. Fallback to any default Indian voice if looking for Indian languages
  if (target.endsWith('in')) {
    match = voices.find(v => (v.lang || '').toLowerCase().includes('in'));
    if (match) return match;
  }

  // 4. Default voice
  return voices.find(v => v.default) || voices[0] || null;
}

/**
 * Check if the browser actually has a voice installed for the given language.
 */
export function hasVoiceForLanguage(langCode) {
  if (!isSpeechSynthesisSupported()) return false;
  const voices = cachedVoices.length > 0 ? cachedVoices : loadVoices();
  if (!voices || voices.length === 0) return false;

  const targetPrefix = (langCode || '').toLowerCase().split('-')[0];
  return voices.some(v => (v.lang || '').toLowerCase().startsWith(targetPrefix));
}

/**
 * Active session tracker to prevent stale async callbacks from updating closed state.
 */
let globalSessionCounter = 0;

export class VoiceSessionManager {
  constructor() {
    this.recognitionInstance = null;
    this.currentSessionId = 0;
    this.isListening = false;
    this.activeUtterance = null;
  }

  createNewSessionId() {
    globalSessionCounter += 1;
    this.currentSessionId = globalSessionCounter;
    return this.currentSessionId;
  }

  isCurrentSession(sessionId) {
    return sessionId === this.currentSessionId;
  }

  /**
   * Start speech recognition for a specific language code.
   */
  startRecognition({
    languageCode,
    onStart,
    onResult,
    onError,
    onEnd
  }) {
    // Teardown any existing recognition first
    this.stopRecognition();
    this.cancelSpeech();

    if (!isSpeechRecognitionSupported()) {
      if (onError) {
        onError({
          type: 'UNSUPPORTED',
          message: 'Voice input is not supported in this browser. You can still use the assistant through text input.'
        });
      }
      return null;
    }

    const SpeechRec = getSpeechRecognitionConstructor();
    if (!SpeechRec) return null;

    const sessionId = this.createNewSessionId();

    try {
      const recognition = new SpeechRec();
      this.recognitionInstance = recognition;

      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.maxAlternatives = 1;
      recognition.lang = languageCode || 'hi-IN';

      recognition.onstart = () => {
        if (!this.isCurrentSession(sessionId)) return;
        this.isListening = true;
        if (onStart) onStart({ sessionId });
      };

      recognition.onresult = (event) => {
        if (!this.isCurrentSession(sessionId)) return;
        let interimTranscript = '';
        let finalTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const item = event.results[i];
          if (item.isFinal) {
            finalTranscript += item[0].transcript;
          } else {
            interimTranscript += item[0].transcript;
          }
        }

        if (onResult) {
          onResult({
            finalTranscript,
            interimTranscript,
            isFinal: !!finalTranscript,
            sessionId
          });
        }
      };

      recognition.onerror = (event) => {
        if (!this.isCurrentSession(sessionId)) return;
        this.isListening = false;
        
        let userMessage = 'Voice input could not be processed.';
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          userMessage = 'Microphone permission was denied. Please allow microphone access in your browser settings.';
        } else if (event.error === 'no-speech') {
          userMessage = 'No speech was detected. Please tap the microphone and speak again.';
        } else if (event.error === 'audio-capture') {
          userMessage = 'No microphone device was detected. Please check your audio hardware.';
        } else if (event.error === 'network') {
          userMessage = 'Network error during speech recognition. Please check your internet connection.';
        } else if (event.error === 'language-not-supported') {
          userMessage = `Voice recognition for language (${languageCode}) is not available in your browser.`;
        }

        if (onError) {
          onError({
            type: event.error || 'UNKNOWN',
            message: userMessage,
            rawEvent: event,
            sessionId
          });
        }
      };

      recognition.onend = () => {
        if (!this.isCurrentSession(sessionId)) return;
        this.isListening = false;
        if (onEnd) onEnd({ sessionId });
      };

      recognition.start();
      return sessionId;
    } catch (err) {
      this.isListening = false;
      if (onError && this.isCurrentSession(sessionId)) {
        onError({
          type: 'START_FAILURE',
          message: err.message || 'Failed to start microphone session.',
          rawError: err,
          sessionId
        });
      }
      return null;
    }
  }

  /**
   * Stop active speech recognition safely without throwing.
   */
  stopRecognition() {
    this.isListening = false;
    if (this.recognitionInstance) {
      try {
        // Remove handlers first so stopped recognition doesn't fire stale callbacks
        this.recognitionInstance.onstart = null;
        this.recognitionInstance.onresult = null;
        this.recognitionInstance.onerror = null;
        this.recognitionInstance.onend = null;
        this.recognitionInstance.stop();
      } catch {
        // ignore already stopped
      }
      try {
        this.recognitionInstance.abort();
      } catch {
        // ignore
      }
      this.recognitionInstance = null;
    }
  }

  /**
   * Safe text-to-speech execution.
   */
  speak({
    text,
    languageCode,
    onStart,
    onEnd,
    onError
  }) {
    this.cancelSpeech();

    if (!isSpeechSynthesisSupported() || !text) {
      if (onError) onError({ message: 'Speech synthesis not supported.' });
      return;
    }

    const sessionId = this.currentSessionId;

    try {
      const utterance = new SpeechSynthesisUtterance(text);
      this.activeUtterance = utterance;

      utterance.lang = languageCode || 'hi-IN';
      const bestVoice = findBestVoiceForLanguage(languageCode);
      if (bestVoice) {
        utterance.voice = bestVoice;
      }

      utterance.rate = 0.95; // Slightly slower for clear rural comprehension
      utterance.pitch = 1.0;

      utterance.onstart = () => {
        if (!this.isCurrentSession(sessionId)) return;
        if (onStart) onStart({ sessionId });
      };

      utterance.onend = () => {
        this.activeUtterance = null;
        if (!this.isCurrentSession(sessionId)) return;
        if (onEnd) onEnd({ sessionId });
      };

      utterance.onerror = (e) => {
        this.activeUtterance = null;
        if (!this.isCurrentSession(sessionId)) return;
        if (onError) onError({ rawEvent: e, sessionId });
      };

      window.speechSynthesis.speak(utterance);
    } catch (err) {
      this.activeUtterance = null;
      if (onError && this.isCurrentSession(sessionId)) {
        onError({ rawError: err, sessionId });
      }
    }
  }

  /**
   * Immediately cancel any speaking TTS utterance.
   */
  cancelSpeech() {
    if (isSpeechSynthesisSupported()) {
      try {
        window.speechSynthesis.cancel();
      } catch {
        // ignore
      }
    }
    this.activeUtterance = null;
  }

  /**
   * Comprehensive cleanup: cancels speech, stops recognition,
   * invalidates session token, and resets internal references.
   */
  cleanupAll() {
    this.createNewSessionId(); // Invalidate any in-flight callbacks
    this.stopRecognition();
    this.cancelSpeech();
    this.isListening = false;
  }
}

// Export singleton instance
export const voiceService = new VoiceSessionManager();
