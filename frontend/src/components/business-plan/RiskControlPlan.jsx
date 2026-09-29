import React from 'react';
import { ShieldAlert, ShieldCheck, AlertCircle, Compass, Layers } from 'lucide-react';

export default function RiskControlPlan({ plan }) {
  if (!plan || !Array.isArray(plan)) return null;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.7
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Risk Governance
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Risk & Mitigation Control Plan
          </h2>
          <p className="text-xs text-emerald-200/70">
            Synthesized operational, financial, and market risks with concrete control actions with verified provenance
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] text-slate-400 block max-w-xs">
            Every displayed risk originates strictly from upstream module signals with explicit attribution.
          </span>
        </div>
      </div>

      {plan.length === 0 ? (
        <div className="p-8 rounded-2xl bg-[#071913] border border-dashed border-slate-700 text-center space-y-2">
          <p className="text-sm font-bold text-slate-300">No active risks identified</p>
          <p className="text-xs text-slate-400">Complete upstream modules to generate domain-specific risk matrices.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {plan.map((item) => (
            <div 
              key={item.id}
              className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] hover:border-emerald-700/70 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-rose-950/60 text-rose-300 border border-rose-800/60 uppercase">
                    {item.category}
                  </span>
                  <span className="text-[10px] font-semibold text-[#B7D4C4] italic">
                    Source: {item.source}
                  </span>
                </div>

                <div className="flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] font-bold text-[#6EE7B7] uppercase tracking-wider block">
                      Identified Risk:
                    </span>
                    <p className="text-xs font-bold text-white leading-snug">
                      {item.risk}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-[#041913] border border-[#144233] space-y-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-[#6EE7B7] uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Mitigation & Control Action:</span>
                </div>
                <p className="text-xs text-[#E7F3EC] leading-relaxed">
                  {item.control}
                </p>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}
