import React, { useState } from 'react';
import { Mic, X, Volume2, Sparkles, CheckCircle2 } from 'lucide-react';

export function VoiceAssistantModal({ onClose, currentLang }) {
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');

  const samplePrompts = [
    { text: "वाराणसी में डेयरी उद्योग के लिए कितना लोन और सब्सिडी मिलेगी?", lang: "hi" },
    { text: "How much loan can I get for spice processing in Ranchi?", lang: "en" },
    { text: "महिला उद्यमी के लिए PMEGP और MUDRA में क्या अंतर है?", lang: "hi" }
  ];

  const handleSimulatedVoiceInput = (promptText) => {
    setTranscript(promptText);
    setListening(false);
    
    // Simulate AI response synthesis
    setTimeout(() => {
      setResponse(
        `[AI Voice Response] वाराणसी / रांची क्लस्टर के लिए PMEGP योजना में ग्रामीण महिला / विशेष श्रेणी हेतु 35% सब्सिडी का प्रावधान है। प्रोजेक्ट रिपोर्ट एवं Udyam पंजीयन प्रस्तुत करने पर बैंक द्वारा 90% ऋण स्वीकृत किया जाता है।`
      );
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6 relative overflow-hidden">
        
        {/* Glow effect */}
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl"></div>

        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Mic className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                UdyamSetu Voice AI
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">Multilingual ASR/TTS</span>
              </h3>
              <p className="text-xs text-slate-400">Rural Voice Assistance (Hindi, Bhojpuri, English)</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Listening orb */}
        <div className="flex flex-col items-center justify-center py-6 space-y-4">
          <button
            onClick={() => setListening(!listening)}
            className={`w-20 h-20 rounded-full flex items-center justify-center transition-all ${
              listening 
                ? 'bg-rose-500/20 border-2 border-rose-500 text-rose-400 animate-ping' 
                : 'bg-emerald-500/10 border-2 border-emerald-500/40 text-emerald-400 hover:scale-105'
            }`}
          >
            <Mic className="w-8 h-8" />
          </button>
          <p className="text-xs text-slate-400">
            {listening ? 'Listening... Speak your query in Hindi or English' : 'Tap microphone or choose a quick prompt below'}
          </p>
        </div>

        {/* Sample Voice Prompts */}
        <div className="space-y-2">
          <span className="text-xs font-semibold text-slate-400 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" /> Sample Voice Queries:
          </span>
          <div className="space-y-1.5">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSimulatedVoiceInput(p.text)}
                className="w-full text-left text-xs p-2.5 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-200 flex items-center justify-between group transition-colors"
              >
                <span>"{p.text}"</span>
                <Volume2 className="w-3.5 h-3.5 text-slate-400 group-hover:text-cyan-400" />
              </button>
            ))}
          </div>
        </div>

        {/* Query & Response Display */}
        {transcript && (
          <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 space-y-2">
            <div className="text-xs text-slate-400 flex items-center gap-1.5">
              <span className="font-semibold text-cyan-400">Recognized Speech:</span> "{transcript}"
            </div>
            {response && (
              <div className="text-xs text-emerald-300 bg-emerald-950/50 p-2.5 rounded-lg border border-emerald-900/60 flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>{response}</span>
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}
