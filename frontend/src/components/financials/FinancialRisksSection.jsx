import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle2, Info } from 'lucide-react';

const SEVERITY_CONFIG = {
  Low: {
    badge: 'bg-emerald-950 text-emerald-300 border-emerald-800',
    icon: CheckCircle2,
    border: 'border-emerald-800/40'
  },
  Moderate: {
    badge: 'bg-amber-950 text-amber-300 border-amber-800',
    icon: Info,
    border: 'border-amber-800/40'
  },
  High: {
    badge: 'bg-rose-950 text-rose-300 border-rose-800',
    icon: AlertTriangle,
    border: 'border-rose-800/40'
  }
};

export default function FinancialRisksSection({ risks = [] }) {
  if (!risks || risks.length === 0) return null;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 3.7
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Financial Risk Assessment Matrix
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Capital exposure, leverage vulnerability, and cash flow liquidity stress points
          </p>
        </div>

        <span className="text-xs font-medium text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Risk & Vulnerability Factors
        </span>
      </div>

      {/* Risk Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map((item, idx) => {
          const cfg = SEVERITY_CONFIG[item.severity] || SEVERITY_CONFIG.Moderate;
          const Icon = cfg.icon;

          return (
            <div 
              key={idx}
              className="p-5 rounded-2xl bg-[#071913] border border-[#154636] hover:border-[#18533e] transition-all flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                      {item.category}
                    </span>
                    <h3 className="text-sm font-bold text-white leading-snug">
                      {item.risk}
                    </h3>
                  </div>
                  <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full border shrink-0 ${cfg.badge}`}>
                    <Icon className="w-3 h-3" />
                    {item.severity}
                  </span>
                </div>

                <div className="space-y-1.5 mt-2">
                  <p className="text-xs text-emerald-200/80 leading-relaxed">
                    <strong className="text-white">Why it matters:</strong> {item.impact}
                  </p>
                </div>
              </div>

              <div className="pt-2.5 border-t border-[#144233] bg-[#051c14] -mx-5 -mb-5 p-3.5 rounded-b-2xl">
                <p className="text-xs text-emerald-100 leading-relaxed">
                  <strong className="text-emerald-400">Pragmatic Mitigation:</strong> {item.mitigation}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] text-emerald-200/60 text-center">
        * Financial risk ratings are qualitative prototype classifications. No speculative probability percentages are used.
      </p>

    </div>
  );
}
