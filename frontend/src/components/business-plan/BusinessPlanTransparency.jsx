import React from 'react';
import { ShieldCheck, Info, Check, X, AlertTriangle } from 'lucide-react';

export default function BusinessPlanTransparency({ transparency }) {
  if (!transparency) return null;

  const { sources, prototypeDisclosures, methodology } = transparency;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.11
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Data Integrity & Governance
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Data Provenance & Prototype Transparency
          </h2>
          <p className="text-xs text-emerald-200/70">
            Explicit audit of analytical inputs, prototype assumptions, and statutory non-guarantee disclosures
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950/60 text-amber-300 border border-amber-800">
            <Info className="w-3.5 h-3.5" />
            <span>Deterministic Prototype</span>
          </span>
        </div>
      </div>

      {/* Upstream Data Sources Audit Table */}
      {sources && (
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">
            Data Sources Used in This Plan:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {Object.entries(sources).map(([key, item]) => (
              <div 
                key={key}
                className={`p-3.5 rounded-2xl border flex items-center justify-between gap-2 ${
                  item.available 
                    ? 'bg-[#071913] border-emerald-800/80 text-emerald-200' 
                    : 'bg-slate-900/40 border-dashed border-slate-700 text-slate-400'
                }`}
              >
                <div className="space-y-0.5">
                  <span className="text-xs font-bold text-white block">
                    {item.label}
                  </span>
                  <span className="text-[10px] text-[#B7D4C4]">
                    Source: {item.source}
                  </span>
                </div>

                <div className="shrink-0">
                  {item.available ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-md border border-emerald-800">
                      <Check className="w-3 h-3" /> Available
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md border border-slate-700">
                      <X className="w-3 h-3" /> Not available
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Disclosures Box */}
      <div className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] space-y-3">
        <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-400" />
          <span>Prototype Governance & Transparency Guidelines</span>
        </h3>

        <ul className="space-y-2 text-xs text-[#E7F3EC] leading-relaxed">
          {prototypeDisclosures && prototypeDisclosures.map((disc, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <span className="text-amber-400 font-bold shrink-0 mt-0.5">•</span>
              <span>{disc}</span>
            </li>
          ))}
        </ul>

        {methodology && (
          <p className="text-[11px] text-[#B7D4C4] pt-2 border-t border-[#144233] leading-relaxed">
            <strong className="text-white">Methodology Note:</strong> {methodology}
          </p>
        )}
      </div>

    </div>
  );
}
