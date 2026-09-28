import React from 'react';
import { ShieldAlert, AlertTriangle, ShieldCheck, ArrowRight } from 'lucide-react';

export function MarketThreatsSection({ threats }) {
  if (!threats || threats.length === 0) return null;

  const getLevelBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'high':
        return 'bg-rose-950 text-rose-300 border-rose-800';
      case 'moderate':
      case 'medium':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'low':
      case 'low to moderate':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      default:
        return 'bg-amber-950 text-amber-300 border-amber-800';
    }
  };

  return (
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 1.7
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Market Threats & Risk Matrix
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Classified vulnerabilities and proactive rural mitigation recommendations
          </p>
        </div>

        <span className="text-[10px] text-emerald-300/70 font-mono bg-[#071913] px-2.5 py-1 rounded-full border border-[#184f3c]">
          Categorical Risk Assessment
        </span>
      </div>

      {/* Threats List */}
      <div className="space-y-3">
        {threats.map((threat, idx) => (
          <div 
            key={idx}
            className="bg-[#071913] p-4 rounded-xl border border-[#154636] space-y-2.5 text-xs"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400 flex-shrink-0" />
                <h3 className="font-bold text-white text-sm">{threat.name}</h3>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded border self-start sm:self-auto ${getLevelBadge(threat.level)}`}>
                Risk Level: {threat.level}
              </span>
            </div>

            <p className="text-emerald-100/80 leading-relaxed text-[11px]">
              {threat.description}
            </p>

            <div className="p-3 rounded-lg bg-[#05140f] border border-[#123d2e] flex items-start gap-2 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-300">Actionable Mitigation: </strong>
                <span className="text-emerald-100/90">{threat.mitigation}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-emerald-300/50 italic">
        * Risk classifications are qualitative heuristics intended to highlight typical operational vulnerabilities rather than empirical statistical failure probabilities.
      </p>

    </div>
  );
}
