import React, { useEffect, useCallback } from 'react';
import { 
  Mic, MicOff, X, Volume2, VolumeX, Sparkles, CheckCircle2, 
  AlertCircle, Globe, RefreshCw, HelpCircle, ShieldCheck, Info 
} from 'lucide-react';
import { useVoiceAssistant, VOICE_STATUS } from '../../hooks/useVoiceAssistant';

export function VoiceAssistantModal({ onClose, currentLang = 'hi' }) {
  const {
    status,
    transcript,
    interimTranscript,
    response,
    error,
    selectedLanguage,
    hasVoice,
    isSupported,
    startListening,
    stopListening,
    cancelListening,
    stopSpeaking,
    changeLanguage,
    selectSamplePrompt,
    resetSession,
    replayAudio,
    cleanupAll,
    availableLanguages
  } = useVoiceAssistant({ initialLang: currentLang });

  /**
   * Centralized safe close handler:
   * 1. Tears down recognition, cancels TTS, invalidates session tokens
   * 2. Clears pending timers
   * 3. Invokes parent onClose callback
   */
  const closeVoiceAssistant = useCallback(() => {
    cleanupAll();
    if (onClose) {
      onClose();
    }
  }, [cleanupAll, onClose]);

  // Handle ESC key to dismiss modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        e.preventDefault();
        closeVoiceAssistant();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [closeVoiceAssistant]);

  // Lock body scroll when modal is active, restore on close
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  // Handle click on backdrop: ONLY close if clicking backdrop itself, not modal dialog
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeVoiceAssistant();
    }
  };

  const isListening = status === VOICE_STATUS.LISTENING || status === VOICE_STATUS.REQUESTING_PERMISSION;
  const isSpeaking = status === VOICE_STATUS.SPEAKING;
  const isProcessing = status === VOICE_STATUS.PROCESSING;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md transition-opacity animate-in fade-in duration-200"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="voice-modal-title"
    >
      <div 
        className="bg-[#0c241b] border border-[#18533e] rounded-3xl max-w-xl w-full p-5 sm:p-7 shadow-2xl space-y-5 relative overflow-hidden max-h-[92vh] flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow ambient background accents */}
        <div className="absolute -top-24 -right-24 w-52 h-52 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-52 h-52 bg-[#E58A24]/10 rounded-full blur-3xl pointer-events-none" />

        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-[#144233] pb-4 shrink-0 relative z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-950/80 border border-emerald-700/60 flex items-center justify-center text-emerald-400 shadow-inner">
              <Mic className={`w-5 h-5 ${isListening ? 'animate-pulse text-rose-400' : 'text-emerald-400'}`} />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 id="voice-modal-title" className="text-base sm:text-lg font-black text-white tracking-tight flex items-center gap-2 font-serif">
                  UdyamSetu Voice AI
                </h2>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-950 text-[#6EE7B7] border border-emerald-800">
                  Multilingual ASR/TTS
                </span>
              </div>
              <p className="text-xs text-[#B7D4C4] mt-0.5">
                Multilingual Rural Voice Assistance
              </p>
            </div>
          </div>

          {/* Close Button — Real accessible button */}
          <button 
            type="button"
            onClick={closeVoiceAssistant}
            aria-label="Close Voice Assistant"
            className="p-2 text-[#B7D4C4] hover:text-white rounded-xl hover:bg-[#144233] border border-transparent hover:border-[#18533e] focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Body */}
        <div className="space-y-4 overflow-y-auto pr-1 flex-1 relative z-10 text-xs text-[#E7F3EC]">
          
          {/* Language Selector Strip */}
          <div className="p-3 rounded-2xl bg-[#071913] border border-[#164736] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-[#E58A24] shrink-0" />
              <div>
                <label htmlFor="voice-lang-select" className="text-[11px] font-bold text-white block">
                  Choose your preferred language:
                </label>
                <span className="text-[10px] text-[#B7D4C4]">
                  Selected: <strong className="text-[#6EE7B7]">{selectedLanguage.nativeName} ({selectedLanguage.name})</strong>
                </span>
              </div>
            </div>

            <div className="shrink-0">
              <select
                id="voice-lang-select"
                aria-label="Select voice language"
                value={selectedLanguage.id}
                onChange={(e) => changeLanguage(e.target.value)}
                className="w-full sm:w-auto px-3 py-1.5 rounded-xl bg-[#0a271d] border border-[#1a5a43] text-white text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer shadow-sm"
              >
                {availableLanguages.map((lang) => (
                  <option key={lang.id} value={lang.id} className="bg-slate-900 text-white">
                    {lang.nativeName} — {lang.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Browser / Dialect & Intent Transparency Notice */}
          <div className="px-3 py-2 rounded-xl bg-[#071913]/70 border border-[#144233] flex items-start gap-2 text-[11px] text-[#B7D4C4]">
            <Info className="w-3.5 h-3.5 text-[#E58A24] shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span>Language availability depends on your browser and device speech support.</span>
              <p className="text-[10px] text-[#6EE7B7]/90 font-medium">
                Voice queries are first checked for relevance before business advisory responses are generated.
              </p>
              {selectedLanguage.isDialect && (
                <p className="text-amber-300 font-medium">
                  Note: Bhojpuri acoustic model support varies across browser engines. If unavailable, speech input defaults to standard regional models.
                </p>
              )}
            </div>
          </div>

          {/* Unsupported Browser Warning (if Web Speech is absent) */}
          {!isSupported && (
            <div className="p-3.5 rounded-2xl bg-amber-950/60 border border-amber-800 text-amber-200 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-xs font-bold text-amber-300">Voice Input Unsupported</strong>
                <p className="text-[11px] leading-relaxed">
                  Voice input is not supported in this browser. You can still use the assistant through text input or by clicking the sample queries below.
                </p>
              </div>
            </div>
          )}

          {/* Microphone Interactive Orb */}
          <div className="flex flex-col items-center justify-center py-4 sm:py-6 space-y-3 bg-[#071913] rounded-3xl border border-[#144233]">
            <button
              type="button"
              onClick={startListening}
              disabled={!isSupported}
              aria-label={isListening ? "Stop listening" : "Tap microphone to speak"}
              className={`relative w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-emerald-500/50 cursor-pointer ${
                !isSupported
                  ? 'bg-slate-800/60 text-slate-500 border-2 border-slate-700 cursor-not-allowed'
                  : isListening
                  ? 'bg-rose-500/25 border-4 border-rose-500 text-rose-300 shadow-lg shadow-rose-900/50 scale-105'
                  : isProcessing
                  ? 'bg-amber-500/20 border-4 border-amber-400 text-amber-300 animate-pulse'
                  : isSpeaking
                  ? 'bg-teal-500/20 border-4 border-teal-400 text-teal-300'
                  : 'bg-emerald-950 border-4 border-emerald-600/80 text-emerald-400 hover:scale-105 hover:border-emerald-400 shadow-lg shadow-emerald-950/80'
              }`}
            >
              {/* Outer pulsing ring for active listening */}
              {isListening && (
                <span className="absolute inset-0 rounded-full border-2 border-rose-400 animate-ping opacity-60 pointer-events-none" />
              )}
              
              {isSpeaking ? (
                <Volume2 className="w-9 h-9 animate-bounce" />
              ) : isListening ? (
                <MicOff className="w-9 h-9" />
              ) : (
                <Mic className="w-9 h-9" />
              )}
            </button>

            {/* Dynamic Status Text */}
            <div className="text-center space-y-1">
              <div className="text-xs sm:text-sm font-bold tracking-tight">
                {status === VOICE_STATUS.LISTENING && (
                  <span className="text-rose-400 flex items-center justify-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                    Listening... Speak in {selectedLanguage.nativeName}
                  </span>
                )}
                {status === VOICE_STATUS.REQUESTING_PERMISSION && (
                  <span className="text-amber-300">Requesting microphone permission...</span>
                )}
                {status === VOICE_STATUS.PROCESSING && (
                  <span className="text-amber-300 flex items-center justify-center gap-1.5">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    Processing your request...
                  </span>
                )}
                {status === VOICE_STATUS.SPEAKING && (
                  <span className="text-teal-300 flex items-center justify-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 animate-pulse" />
                    UdyamSetu is responding...
                  </span>
                )}
                {status === VOICE_STATUS.IDLE && (
                  <span className="text-[#E7F3EC]">Tap the microphone to speak</span>
                )}
                {status === VOICE_STATUS.UNSUPPORTED && (
                  <span className="text-stone-400">Voice input is not supported in this browser</span>
                )}
                {status === VOICE_STATUS.ERROR && (
                  <span className="text-rose-400">Voice input could not be started</span>
                )}
              </div>

              <p className="text-[11px] text-[#B7D4C4]">
                {isListening 
                  ? 'Tap button again to stop recording' 
                  : 'Or select a quick enterprise query prompt below'}
              </p>
            </div>

            {/* Live interim text during speech */}
            {interimTranscript && (
              <div className="w-11/12 p-2.5 rounded-xl bg-black/40 border border-emerald-900/60 text-center text-xs text-emerald-300 italic">
                "{interimTranscript}..."
              </div>
            )}
          </div>

          {/* Error Message Card if any */}
          {error && (
            <div className="p-3 rounded-xl bg-rose-950/70 border border-rose-800 text-rose-200 flex items-start gap-2 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1">
                <strong>Microphone Error:</strong> {error.message || 'An error occurred during voice recognition.'}
              </div>
            </div>
          )}

          {/* Recognized Speech and Advisory Response */}
          {(transcript || response) && (
            <div className="bg-[#071913] p-4 rounded-2xl border border-[#164736] space-y-3">
              {transcript && (
                <div className="space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#6EE7B7]">
                    Recognized Speech ({selectedLanguage.nativeName}):
                  </span>
                  <p className="text-xs text-white bg-[#0a271d] p-2.5 rounded-xl border border-[#144233] leading-relaxed">
                    "{transcript}"
                  </p>
                </div>
              )}

              {response && (
                <div className="space-y-2 pt-1 border-t border-[#144233]">
                  {/* Header with State Type */}
                  <div className="flex items-center justify-between gap-2">
                    {response.type === 'advisory' ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-[#E58A24]" />
                        Advisory Response:
                      </span>
                    ) : response.type === 'greeting' ? (
                      <span className="text-[10px] font-bold uppercase tracking-wider text-teal-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-teal-400" />
                        Assistant Greeting:
                      </span>
                    ) : (
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5 bg-amber-950/70 px-2 py-0.5 rounded border border-amber-800/80">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
                          RELEVANCE CHECK
                        </span>
                        <span className="text-[10px] text-[#B7D4C4] font-mono hidden sm:inline">
                          Deterministic Voice Intent Gate
                        </span>
                      </div>
                    )}

                    {/* Audio Controls */}
                    <div className="flex items-center gap-1.5">
                      {isSpeaking ? (
                        <button
                          type="button"
                          onClick={stopSpeaking}
                          className="px-2 py-1 rounded-lg bg-rose-900/80 hover:bg-rose-900 text-rose-200 text-[10px] font-bold flex items-center gap-1 border border-rose-700 transition-colors cursor-pointer"
                        >
                          <VolumeX className="w-3 h-3" /> Stop Audio
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={replayAudio}
                          className="px-2 py-1 rounded-lg bg-teal-900/80 hover:bg-teal-900 text-teal-200 text-[10px] font-bold flex items-center gap-1 border border-teal-700 transition-colors cursor-pointer"
                          title="Replay Audio"
                        >
                          <Volume2 className="w-3 h-3" /> Replay Voice
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Content Card based on response type */}
                  {response.type === 'advisory' ? (
                    <div className="text-xs text-[#E7F3EC] bg-emerald-950/60 p-3.5 rounded-xl border border-emerald-900/80 leading-relaxed flex items-start gap-2.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="font-medium leading-relaxed">{response.message}</span>
                    </div>
                  ) : response.type === 'greeting' ? (
                    <div className="text-xs text-[#E7F3EC] bg-teal-950/50 p-3.5 rounded-xl border border-teal-900/80 leading-relaxed flex items-start gap-2.5">
                      <Sparkles className="w-4 h-4 text-teal-400 mt-0.5 shrink-0" />
                      <span className="font-medium leading-relaxed">{response.message}</span>
                    </div>
                  ) : (
                    <div className="text-xs text-[#E7F3EC] bg-[#14120a] p-3.5 rounded-xl border border-amber-900/60 leading-relaxed space-y-3">
                      <div className="flex items-start gap-2 text-amber-200">
                        <Info className="w-4 h-4 text-amber-400 mt-0.5 shrink-0" />
                        <p className="font-medium leading-relaxed">{response.message}</p>
                      </div>

                      {/* Suggested Topics List */}
                      <div className="pt-2 border-t border-amber-900/40 text-[11px] space-y-1.5 text-[#B7D4C4]">
                        <strong className="text-amber-300 block">Try asking about:</strong>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 pl-1 font-sans">
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>Business ideas (dairy, spices, food processing)</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>Local market opportunities & demand</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>Financing, project cost & EMI</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>Government schemes (PMEGP, MUDRA)</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>Business feasibility & risk analysis</span>
                          </li>
                          <li className="flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                            <span>Business launch planning & documents</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Reset session button */}
              <div className="flex justify-end pt-1">
                <button
                  type="button"
                  onClick={resetSession}
                  className="text-[11px] text-[#B7D4C4] hover:text-white flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <RefreshCw className="w-3 h-3" /> Clear Transcript
                </button>
              </div>
            </div>
          )}

          {/* Quick Query Prompts for the Selected Language */}
          {selectedLanguage.samplePrompts && selectedLanguage.samplePrompts.length > 0 && (
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[#B7D4C4] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E58A24]" />
                Sample Queries ({selectedLanguage.nativeName}):
              </span>
              <div className="space-y-1.5">
                {selectedLanguage.samplePrompts.map((promptText, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectSamplePrompt(promptText)}
                    className="w-full text-left text-xs p-2.5 rounded-xl bg-[#071913] hover:bg-[#0e2f23] border border-[#164736] hover:border-emerald-600/60 text-[#E7F3EC] flex items-center justify-between group transition-colors cursor-pointer"
                  >
                    <span className="pr-2 leading-relaxed">"{promptText}"</span>
                    <Volume2 className="w-3.5 h-3.5 text-[#6EE7B7] opacity-60 group-hover:opacity-100 shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Modal Footer */}
        <div className="pt-3 border-t border-[#144233] flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 relative z-10 text-[11px] text-[#B7D4C4]">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Prototype Voice Assistant • SIH 26091</span>
          </div>

          <button
            type="button"
            onClick={closeVoiceAssistant}
            className="w-full sm:w-auto px-4 py-2 rounded-xl bg-[#071913] hover:bg-[#144233] text-white border border-[#18533e] text-xs font-bold transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}

export default VoiceAssistantModal;
