import { useState, useEffect, useRef, useCallback } from 'react';
import { 
  VOICE_LANGUAGES, 
  DEFAULT_LANGUAGE_ID, 
  getLanguageById, 
  getLanguageByCode 
} from '../config/voiceLanguages';
import { 
  voiceService, 
  isSpeechRecognitionSupported, 
  isSpeechSynthesisSupported, 
  hasVoiceForLanguage 
} from '../services/voiceService';
import { 
  analyzeVoiceIntent, 
  generateDomainAdvisoryResponse,
  INTENT_TYPES 
} from '../services/voiceIntentService';
import { getAnalysisState } from '../services/analysisStateService';

export const VOICE_STATUS = {
  IDLE: 'IDLE',
  REQUESTING_PERMISSION: 'REQUESTING_PERMISSION',
  LISTENING: 'LISTENING',
  PROCESSING: 'PROCESSING',
  SPEAKING: 'SPEAKING',
  ERROR: 'ERROR',
  UNSUPPORTED: 'UNSUPPORTED'
};

export function useVoiceAssistant({ initialLang = 'hi', onAutoClose } = {}) {
  // Find initial language from config
  const initialLanguageObj = getLanguageByCode(initialLang) || getLanguageById(DEFAULT_LANGUAGE_ID);
  
  const [selectedLanguage, setSelectedLanguage] = useState(initialLanguageObj);
  const [status, setStatus] = useState(() => 
    isSpeechRecognitionSupported() ? VOICE_STATUS.IDLE : VOICE_STATUS.UNSUPPORTED
  );
  const [transcript, setTranscript] = useState('');
  const [interimTranscript, setInterimTranscript] = useState('');
  const [response, setResponse] = useState(null); // Structured object: { type, message, intent, relevant, matchedSignals }
  const [error, setError] = useState(null);
  const [hasVoice, setHasVoice] = useState(false);

  const isMountedRef = useRef(true);
  const processingTimeoutRef = useRef(null);
  const activeSessionIdRef = useRef(null);
  const selectedLanguageRef = useRef(selectedLanguage);
  const accumulatedTranscriptRef = useRef('');

  // Keep language ref synchronized
  useEffect(() => {
    selectedLanguageRef.current = selectedLanguage;
  }, [selectedLanguage]);

  // Check voice capability when language changes
  useEffect(() => {
    if (selectedLanguage) {
      const available = hasVoiceForLanguage(selectedLanguage.speechSynthesis);
      setHasVoice(available);
    }
  }, [selectedLanguage]);

  // Teardown helper
  const fullTeardown = useCallback(() => {
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
      processingTimeoutRef.current = null;
    }
    voiceService.cleanupAll();
    activeSessionIdRef.current = null;
    accumulatedTranscriptRef.current = '';
  }, []);

  // Ensure cleanup on component unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      fullTeardown();
    };
  }, [fullTeardown]);

  /**
   * Stop speaking TTS
   */
  const stopSpeaking = useCallback(() => {
    voiceService.cancelSpeech();
    if (isMountedRef.current) {
      setStatus(prev => prev === VOICE_STATUS.SPEAKING ? VOICE_STATUS.IDLE : prev);
    }
  }, []);

  /**
   * THE ONE AND ONLY AUTHORITATIVE RESPONSE PIPELINE:
   * Speech Recognition -> Transcript -> Input Normalization -> analyzeVoiceIntent()
   * -> RELEVANCE GATE:
   *      - IF IRRELEVANT -> Relevance UI -> STOP (zero business advisory)
   *      - IF RELEVANT   -> Advisory Engine -> Advisory Response
   */
  const processVoiceQuery = useCallback((queryText, langObj) => {
    if (!isMountedRef.current) return;
    const rawQuery = (queryText || '').trim();
    if (!rawQuery) {
      setStatus(VOICE_STATUS.IDLE);
      return;
    }

    setStatus(VOICE_STATUS.PROCESSING);

    // Cancel any previous timeout
    if (processingTimeoutRef.current) {
      clearTimeout(processingTimeoutRef.current);
    }

    const currentLang = langObj || selectedLanguageRef.current;

    processingTimeoutRef.current = setTimeout(() => {
      if (!isMountedRef.current) return;

      // 1. INPUT NORMALIZATION & RELEVANCE / INTENT GATE ANALYSIS
      const intentResult = analyzeVoiceIntent(rawQuery, currentLang.id);

      // 2. IF IRRELEVANT / GREETING / CASUAL / PERSONAL -> DO NOT GENERATE BUSINESS ADVISORY
      if (!intentResult.relevant) {
        const isGreeting = intentResult.intent === INTENT_TYPES.GENERAL_GREETING;
        const resultResponse = {
          type: isGreeting ? 'greeting' : 'relevance',
          message: intentResult.relevanceMessage,
          intent: intentResult.intent,
          relevant: false,
          matchedSignals: intentResult.matchedSignals || [],
          reason: intentResult.reason,
          confidence: intentResult.confidence
        };

        setResponse(resultResponse);
        setStatus(VOICE_STATUS.SPEAKING);

        // TTS for relevance / greeting message
        if (isSpeechSynthesisSupported()) {
          voiceService.speak({
            text: intentResult.relevanceMessage,
            languageCode: currentLang.speechSynthesis,
            onStart: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.SPEAKING); },
            onEnd: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.IDLE); },
            onError: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.IDLE); }
          });
        } else {
          setStatus(VOICE_STATUS.IDLE);
        }

        // STRICT STOP: Zero advisory engine call, zero PMEGP, zero loan response
        return;
      }

      // 3. IF RELEVANT -> GENERATE DOMAIN ADVISORY RESPONSE
      const activeSession = getAnalysisState();
      const advisoryText = generateDomainAdvisoryResponse(
        rawQuery,
        intentResult.intent,
        currentLang,
        activeSession
      );

      const resultResponse = {
        type: 'advisory',
        message: advisoryText,
        intent: intentResult.intent,
        relevant: true,
        matchedSignals: intentResult.matchedSignals || [],
        reason: intentResult.reason,
        confidence: intentResult.confidence
      };

      setResponse(resultResponse);
      setStatus(VOICE_STATUS.SPEAKING);

      // TTS for advisory response
      if (isSpeechSynthesisSupported()) {
        voiceService.speak({
          text: advisoryText,
          languageCode: currentLang.speechSynthesis,
          onStart: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.SPEAKING); },
          onEnd: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.IDLE); },
          onError: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.IDLE); }
        });
      } else {
        setStatus(VOICE_STATUS.IDLE);
      }
    }, 250);
  }, []);

  /**
   * Safe start speech recognition
   */
  const startListening = useCallback(() => {
    if (!isSpeechRecognitionSupported()) {
      setStatus(VOICE_STATUS.UNSUPPORTED);
      setError({
        message: 'Voice input is not supported in this browser. You can still use the assistant through text input.'
      });
      return;
    }

    // Toggle off if already listening
    if (status === VOICE_STATUS.LISTENING || status === VOICE_STATUS.REQUESTING_PERMISSION) {
      stopListening();
      return;
    }

    voiceService.cancelSpeech();
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setResponse(null);
    accumulatedTranscriptRef.current = '';
    setStatus(VOICE_STATUS.REQUESTING_PERMISSION);

    const sessionId = voiceService.startRecognition({
      languageCode: selectedLanguageRef.current.speechRecognition,
      onStart: () => {
        if (!isMountedRef.current) return;
        setStatus(VOICE_STATUS.LISTENING);
      },
      onResult: ({ finalTranscript, interimTranscript: interim, isFinal }) => {
        if (!isMountedRef.current) return;
        if (finalTranscript) {
          accumulatedTranscriptRef.current = finalTranscript;
          setTranscript(finalTranscript);
        } else if (interim) {
          accumulatedTranscriptRef.current = interim;
        }

        if (interim) {
          setInterimTranscript(interim);
        } else {
          setInterimTranscript('');
        }
      },
      onError: (err) => {
        if (!isMountedRef.current) return;
        setStatus(VOICE_STATUS.ERROR);
        setError(err);
      },
      onEnd: () => {
        if (!isMountedRef.current) return;
        const finalQuery = (accumulatedTranscriptRef.current || '').trim();
        setInterimTranscript('');
        if (finalQuery.length > 0) {
          setTranscript(finalQuery);
          processVoiceQuery(finalQuery, selectedLanguageRef.current);
        } else {
          setStatus(VOICE_STATUS.IDLE);
        }
      }
    });

    activeSessionIdRef.current = sessionId;
  }, [status, processVoiceQuery]);

  /**
   * Stop listening cleanly and execute pipeline on accumulated speech
   */
  const stopListening = useCallback(() => {
    voiceService.stopRecognition();
    if (isMountedRef.current) {
      const finalQuery = (accumulatedTranscriptRef.current || '').trim();
      setInterimTranscript('');
      if (finalQuery.length > 0) {
        setTranscript(finalQuery);
        processVoiceQuery(finalQuery, selectedLanguageRef.current);
      } else {
        setStatus(VOICE_STATUS.IDLE);
      }
    }
  }, [processVoiceQuery]);

  /**
   * Cancel listening without processing
   */
  const cancelListening = useCallback(() => {
    fullTeardown();
    if (isMountedRef.current) {
      setInterimTranscript('');
      setStatus(VOICE_STATUS.IDLE);
    }
  }, [fullTeardown]);

  /**
   * Change language
   */
  const changeLanguage = useCallback((languageId) => {
    fullTeardown();
    const newLang = getLanguageById(languageId) || getLanguageByCode(languageId);
    setSelectedLanguage(newLang);
    selectedLanguageRef.current = newLang;
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setResponse(null);
    setStatus(isSpeechRecognitionSupported() ? VOICE_STATUS.IDLE : VOICE_STATUS.UNSUPPORTED);
  }, [fullTeardown]);

  /**
   * Handle sample prompt click
   */
  const selectSamplePrompt = useCallback((promptText) => {
    fullTeardown();
    setError(null);
    setTranscript(promptText);
    setInterimTranscript('');
    accumulatedTranscriptRef.current = promptText;
    processVoiceQuery(promptText, selectedLanguageRef.current);
  }, [fullTeardown, processVoiceQuery]);

  /**
   * Reset the voice assistant session to clean state
   */
  const resetSession = useCallback(() => {
    fullTeardown();
    setError(null);
    setTranscript('');
    setInterimTranscript('');
    setResponse(null);
    accumulatedTranscriptRef.current = '';
    setStatus(isSpeechRecognitionSupported() ? VOICE_STATUS.IDLE : VOICE_STATUS.UNSUPPORTED);
  }, [fullTeardown]);

  /**
   * Replay current response audio
   */
  const replayAudio = useCallback(() => {
    if (!response?.message || !isSpeechSynthesisSupported()) return;
    voiceService.speak({
      text: response.message,
      languageCode: selectedLanguage.speechSynthesis,
      onStart: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.SPEAKING); },
      onEnd: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.IDLE); },
      onError: () => { if (isMountedRef.current) setStatus(VOICE_STATUS.IDLE); }
    });
  }, [response, selectedLanguage]);

  return {
    status,
    transcript,
    interimTranscript,
    response,
    error,
    selectedLanguage,
    hasVoice,
    isSupported: isSpeechRecognitionSupported(),
    startListening,
    stopListening,
    cancelListening,
    stopSpeaking,
    changeLanguage,
    selectSamplePrompt,
    resetSession,
    replayAudio,
    cleanupAll: fullTeardown,
    availableLanguages: VOICE_LANGUAGES
  };
}
