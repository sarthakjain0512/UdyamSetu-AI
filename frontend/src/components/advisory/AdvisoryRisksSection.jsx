import React from 'react';
import { AlertTriangle, ShieldAlert, ArrowRight, HelpCircle } from 'lucide-react';

export default function AdvisoryRisksSection({ risks = [] }) {
  if (!risks || risks.length === 0) return null;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 5.3
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Identified Operational & Financial Risks
            </h3>
          </div>
          <p className="text-xs text-[#E7F3EC] mt-1">
            Vulnerabilities identified from feasibility, financing, and market intelligence
          </p>
        </div>

        <span className="text-xs font-semibold text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
          Risk Mitigation Prioritization
        </span>
      </div>

      {/* Risk Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {risks.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#071913] border border-amber-800/60 space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  {item.source}
                </span>
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
              </div>

              <h4 className="text-sm font-bold text-white tracking-wide">
                {item.risk}
              </h4>

              <div className="space-y-1 text-xs">
                <span className="text-[10px] uppercase font-bold text-rose-300 block">
                  Why it matters:
                </span>
                <p className="text-[#E7F3EC] leading-relaxed font-sans text-xs">
                  {item.why}
                </p>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-[#0a2018] border border-[#164434] space-y-1 text-xs">
              <span className="text-[10px] uppercase font-bold text-[#6EE7B7] block flex items-center gap-1">
                Suggested Mitigation Action:
              </span>
              <p className="text-white text-xs leading-relaxed font-medium">
                {item.mitigation}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
