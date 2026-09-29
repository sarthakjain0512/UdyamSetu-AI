import React from 'react';
import { Award, CheckCircle2, TrendingUp, ShieldCheck } from 'lucide-react';

export default function AdvisoryStrengthsSection({ strengths = [] }) {
  if (!strengths || strengths.length === 0) return null;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 5.2
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Identified Enterprise Strengths
            </h3>
          </div>
          <p className="text-xs text-[#E7F3EC] mt-1">
            Core positive viability factors evidenced by the multi-module analysis
          </p>
        </div>

        <span className="text-xs font-semibold text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Data-Evidenced Factors
        </span>
      </div>

      {/* Strengths Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {strengths.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] hover:border-emerald-600/60 transition-colors space-y-2.5 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6EE7B7] bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {item.source}
                </span>
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              </div>

              <h4 className="text-sm font-bold text-white tracking-wide">
                {item.title}
              </h4>

              <p className="text-xs text-[#E7F3EC] leading-relaxed font-sans">
                {item.detail}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
