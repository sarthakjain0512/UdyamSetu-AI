import React from 'react';
import { 
  CheckCircle2, AlertTriangle, Lightbulb, 
  ShieldAlert, Sparkles 
} from 'lucide-react';

export function SWOTSection({ swot }) {
  if (!swot) return null;

  return (
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 1.6
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Hyper-Local SWOT Analysis
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Internal capabilities and external environmental dynamics for the venture
          </p>
        </div>

        <span className="text-[10px] text-emerald-300/70 font-mono bg-[#071913] px-2.5 py-1 rounded-full border border-[#184f3c]">
          Deterministic Advisory Model
        </span>
      </div>

      {/* 4-Quadrant Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
        
        {/* Quadrant 1: Strengths */}
        <div className="bg-[#071913] rounded-xl p-5 border border-emerald-800/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#144233]">
            <div className="w-6 h-6 rounded-lg bg-emerald-950 flex items-center justify-center text-emerald-300 border border-emerald-700/60">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-white text-sm">Strengths (Internal Advantages)</h3>
          </div>
          <ul className="space-y-2 text-emerald-100/90 text-xs">
            {swot.strengths?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-emerald-400 mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quadrant 2: Weaknesses */}
        <div className="bg-[#071913] rounded-xl p-5 border border-amber-800/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#144233]">
            <div className="w-6 h-6 rounded-lg bg-amber-950 flex items-center justify-center text-amber-300 border border-amber-700/60">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-white text-sm">Weaknesses (Internal Challenges)</h3>
          </div>
          <ul className="space-y-2 text-emerald-100/90 text-xs">
            {swot.weaknesses?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-amber-400 mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quadrant 3: Opportunities */}
        <div className="bg-[#071913] rounded-xl p-5 border border-cyan-800/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#144233]">
            <div className="w-6 h-6 rounded-lg bg-cyan-950 flex items-center justify-center text-cyan-300 border border-cyan-700/60">
              <Lightbulb className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-white text-sm">Opportunities (External Tailwinds)</h3>
          </div>
          <ul className="space-y-2 text-emerald-100/90 text-xs">
            {swot.opportunities?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-cyan-400 mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Quadrant 4: Threats */}
        <div className="bg-[#071913] rounded-xl p-5 border border-rose-800/60 space-y-3">
          <div className="flex items-center gap-2 pb-2 border-b border-[#144233]">
            <div className="w-6 h-6 rounded-lg bg-rose-950 flex items-center justify-center text-rose-300 border border-rose-700/60">
              <ShieldAlert className="w-3.5 h-3.5" />
            </div>
            <h3 className="font-bold text-white text-sm">Threats (External Headwinds)</h3>
          </div>
          <ul className="space-y-2 text-emerald-100/90 text-xs">
            {swot.threats?.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="text-rose-400 mt-0.5">•</span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

      </div>

      <p className="text-[10px] text-emerald-300/50 italic text-center">
        * SWOT dimensions represent deterministic advisory models synthesized from sector operating characteristics and rural cluster dynamics.
      </p>

    </div>
  );
}
