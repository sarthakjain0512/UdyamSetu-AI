import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, AlertCircle, Info } from 'lucide-react';

export default function LaunchRecommendations({ recommendations }) {
  const isAvailable = recommendations?.isAvailable;
  const items = recommendations?.items || [];

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.3
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Strategic Advisory Synthesis
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Recommended Before Launch
          </h2>
          <p className="text-xs text-[#E7F3EC]">
            High-priority diagnostic actions surfaced from the AI Advisory layer to de-risk commercial launch
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] text-[#B7D4C4] block">
            Priority represents internal workflow order, not official government ranking
          </span>
        </div>
      </div>

      {/* Unavailable State */}
      {!isAvailable && (
        <div className="p-8 rounded-2xl bg-[#071913] border border-dashed border-slate-700 text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Info className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-300">
            AI Advisory — Not available from current analysis
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Complete Module 5 (AI Advisory) to synthesize cross-module recommendations, strengths, and diagnostic next steps.
          </p>
        </div>
      )}

      {/* Recommendations Cards Grid */}
      {isAvailable && items.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {items.map((rec, index) => {
            const isHigh = rec.priority === 'High';
            const isMed = rec.priority === 'Medium';

            return (
              <div 
                key={index}
                className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] hover:border-emerald-700/80 transition-all flex flex-col justify-between space-y-4"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-900/60 text-[#6EE7B7] border border-emerald-700/60 uppercase">
                      {rec.category}
                    </span>
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                      isHigh 
                        ? 'bg-rose-900/70 text-rose-200 border-rose-600' 
                        : (isMed ? 'bg-amber-900/70 text-amber-200 border-amber-600' : 'bg-emerald-900/70 text-emerald-200 border-emerald-600')
                    }`}>
                      {rec.priority} Priority
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">
                    {rec.title}
                  </h3>

                  <div className="p-3 rounded-xl bg-[#041913] border border-[#144233] space-y-1">
                    <span className="text-[10px] font-bold text-[#6EE7B7] uppercase tracking-wider block">
                      Diagnostic Reason (Why):
                    </span>
                    <p className="text-xs text-[#E7F3EC] leading-relaxed">
                      {rec.why}
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#144233] space-y-2">
                  <div className="flex items-start gap-2">
                    <ArrowRight className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                        Recommended Action:
                      </span>
                      <p className="text-xs text-white font-medium leading-relaxed">
                        {rec.action}
                      </p>
                    </div>
                  </div>

                  <span className="text-[10px] text-[#B7D4C4] block pt-1 font-medium">
                    Source: {rec.source}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {isAvailable && items.length === 0 && (
        <p className="text-xs text-slate-400 italic text-center py-4">
          No active pre-launch recommendations found.
        </p>
      )}

    </div>
  );
}
