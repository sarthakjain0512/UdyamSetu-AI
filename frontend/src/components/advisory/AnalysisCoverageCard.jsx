import React from 'react';
import { CheckCircle2, Circle, Layers, Info } from 'lucide-react';

export default function AnalysisCoverageCard({ coverage }) {
  if (!coverage || !coverage.modules) return null;

  const { modules, availableCount, totalCount } = coverage;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-7 border border-[#18533e] shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">
              Analysis Coverage
            </h3>
            <p className="text-xs text-emerald-200/70">
              Audit of foundational modules contributing data to this advisory synthesis
            </p>
          </div>
        </div>

        <div className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-800">
          <span>{availableCount} of {totalCount} Modules Available</span>
        </div>
      </div>

      {/* Grid of Modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {Object.entries(modules).map(([key, mod]) => {
          const isAvail = mod.available;

          return (
            <div
              key={key}
              className={`p-3.5 rounded-2xl border transition-all space-y-1.5 ${
                isAvail
                  ? 'bg-[#071913] border-emerald-700/60'
                  : 'bg-[#071913]/40 border-stone-800/80 opacity-75'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-emerald-400/80">
                  {mod.source}
                </span>
                {isAvail ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Circle className="w-4 h-4 text-stone-500" />
                )}
              </div>

              <strong className={`text-xs block ${isAvail ? 'text-white' : 'text-stone-400'}`}>
                {mod.label}
              </strong>

              <span className={`text-[10px] block ${isAvail ? 'text-emerald-300/80 font-semibold' : 'text-stone-400'}`}>
                {isAvail ? 'Available & Synced' : `${mod.label} — Not available from current analysis`}
              </span>
            </div>
          );
        })}
      </div>

      {availableCount < totalCount && (
        <div className="p-3 bg-[#071913] rounded-xl border border-amber-800/60 flex items-start gap-2.5 text-xs text-amber-200/80">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            Modules not yet analyzed are excluded from this advisory synthesis. Recommendations are strictly generated from completed analysis data.
          </p>
        </div>
      )}
    </div>
  );
}
