import React from 'react';
import { Sliders, Activity, Info, TrendingUp, AlertCircle } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function FinancialSensitivitySection({ sensitivity }) {
  if (!sensitivity || !sensitivity.scenarios || sensitivity.scenarios.length === 0) {
    return null;
  }

  const { scenarios = [] } = sensitivity;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 3.6
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Debt-Service Sensitivity Stress Test
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Impact of fluctuating market sales volume on loan coverage margins
          </p>
        </div>

        <span className="text-xs font-medium text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
          Illustrative Sensitivity Analysis
        </span>
      </div>

      {/* Sensitivity Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {scenarios.map((sc, idx) => {
          const isConservative = sc.revenueFactor < 1.0;
          const isOptimistic = sc.revenueFactor > 1.0;

          return (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border transition-all space-y-3 ${
                isConservative
                  ? 'bg-rose-950/20 border-rose-800/60'
                  : isOptimistic
                  ? 'bg-emerald-950/30 border-emerald-700/60'
                  : 'bg-[#071913] border-[#18533e]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold uppercase tracking-wider ${
                  isConservative ? 'text-rose-300' : isOptimistic ? 'text-emerald-300' : 'text-amber-300'
                }`}>
                  {sc.label}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                  sc.status === 'Viable' || sc.status === 'Strong'
                    ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                    : 'bg-rose-950 text-rose-300 border border-rose-800'
                }`}>
                  {sc.status}
                </span>
              </div>

              <div>
                <span className="text-[10px] text-emerald-300/60 block uppercase">Projected Annual Revenue</span>
                <div className="text-xl font-bold text-white font-mono mt-0.5">
                  {formatCurrencyINR(sc.revenue)}
                </div>
              </div>

              <div className="pt-2 border-t border-[#144233] flex items-center justify-between text-xs">
                <span className="text-emerald-200/70">Estimated DSCR:</span>
                <span className="font-bold text-white font-mono text-sm">{sc.dscr}x</span>
              </div>

              <p className="text-[11px] text-emerald-200/60 leading-relaxed">
                {isConservative && 'Under severe sales drops, cash cushion compresses; 60-day reserves are vital.'}
                {!isConservative && !isOptimistic && 'Base operational case with sustainable debt service and positive retained earnings.'}
                {isOptimistic && 'Strong cash generation permits faster debt prepayment or expansion reinvestment.'}
              </p>
            </div>
          );
        })}
      </div>

      {/* Disclaimer */}
      <div className="p-3.5 bg-[#071913] rounded-xl border border-[#18533e] flex items-start gap-2.5 text-xs text-emerald-200/80">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong>Sensitivity Note:</strong> These scenarios simulate hypothetical variance in turnover and do not represent guaranteed sales forecasts. Real performance depends on active market distribution and local competition.
        </p>
      </div>

    </div>
  );
}
