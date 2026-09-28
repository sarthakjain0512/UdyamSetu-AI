import React from 'react';
import { TrendingUp, HelpCircle, AlertCircle, Calendar, ArrowRight, ShieldCheck, Info } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function BreakEvenInsightSection({ breakEvenData, projectCost = 0 }) {
  // If assumptions are insufficient or missing, show explicit empty/advisory state
  if (
    !breakEvenData || 
    !breakEvenData.monthlyFixedCost || 
    !breakEvenData.contributionMargin || 
    !breakEvenData.indicativeMonths
  ) {
    return (
      <div className="bg-white rounded-2xl border border-stone-200 shadow-sm p-6">
        <div className="flex items-center justify-between border-b border-stone-100 pb-4 mb-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              7. Break-Even Insight
            </h3>
          </div>
          <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
            Illustrative Prototype Estimate
          </span>
        </div>
        <div className="p-8 bg-stone-50 rounded-xl border border-stone-200 text-center space-y-2">
          <HelpCircle className="w-8 h-8 text-stone-400 mx-auto mb-1" />
          <p className="text-sm font-semibold text-stone-800">
            Break-even calculation requires additional operating assumptions.
          </p>
          <p className="text-xs text-stone-500 max-w-lg mx-auto leading-relaxed">
            Representative sector archetype assumptions are insufficient or missing for this business idea. Antigravity AI does not invent actual supplier prices, wages, revenues, customer counts, or operating costs without verified operating inputs.
          </p>
        </div>
      </div>
    );
  }

  const {
    monthlyFixedCost = 0,
    contributionMargin = 0,
    indicativeMonths = 0,
    dailyBreakEvenUnits = 'N/A',
    assumptions = ''
  } = breakEvenData;

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-stone-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              7. Break-Even & Operational Viability Insight
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Indicative operational horizon required for gross revenue to cover recurring overheads and debt service.
          </p>
        </div>
        <span className="text-[11px] font-medium text-amber-700 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          Illustrative Prototype Estimate
        </span>
      </div>

      <div className="p-6 space-y-6">
        {/* Archetype Notice Banner */}
        <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 flex items-start gap-2.5 text-xs text-stone-600">
          <Info className="w-4 h-4 text-emerald-800 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-stone-900">Representative Sector Heuristics:</strong> This estimate is based on representative sector archetype assumptions and is <strong>NOT</strong> the entrepreneur's actual operating cost, signed lease contract, or guaranteed break-even point.
          </p>
        </div>

        {/* Core Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Est. Monthly Fixed Overheads
            </span>
            <div className="mt-1 text-2xl font-bold text-stone-900 font-serif">
              {formatCurrencyINR(monthlyFixedCost)}
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Archetype estimate for premise rent, utilities, and helper wages.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-stone-50 border border-stone-200/80">
            <span className="text-xs font-semibold text-stone-500 uppercase tracking-wider">
              Gross Contribution Margin
            </span>
            <div className="mt-1 text-2xl font-bold text-emerald-800 font-serif">
              {contributionMargin}%
            </div>
            <p className="text-[11px] text-stone-500 mt-1">
              Estimated margin available to service fixed costs after raw material deduction.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/50 border border-emerald-200/80">
            <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" /> Indicative Break-Even
            </span>
            <div className="mt-1 text-2xl font-bold text-emerald-950 font-serif">
              ~{indicativeMonths} Months
            </div>
            <p className="text-[11px] text-emerald-800/80 mt-1">
              Estimated stabilization period assuming steady market ramp-up.
            </p>
          </div>
        </div>

        {/* Operational Volume Required */}
        {dailyBreakEvenUnits && dailyBreakEvenUnits !== 'N/A' && (
          <div className="p-4 rounded-xl border border-stone-200 bg-stone-50/50 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-xs font-semibold text-stone-700">
                Indicative Sales Target to Clear Overhead:
              </span>
              <p className="text-xs text-stone-600">
                Target baseline: <strong className="text-stone-900">{dailyBreakEvenUnits}</strong>
              </p>
            </div>
            <div className="text-[11px] text-stone-500 max-w-sm">
              Derived from sector archetype unit economics.
            </div>
          </div>
        )}

        {/* Assumptions & Methodology disclosure */}
        {assumptions && (
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-stone-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              Underlying Prototype Assumptions
            </h4>
            <p className="text-xs text-stone-600 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-200/70">
              {assumptions}
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div className="p-3 bg-amber-50/50 rounded-xl border border-amber-200/60 flex items-start gap-2.5 text-xs text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Disclaimer:</strong> This break-even horizon is an illustrative heuristic derived from representative micro-enterprise operating ratios. Actual cash flows fluctuate based on seasonal customer footfall, supplier payment terms, working capital cycles, and credit sales recovery in rural markets.
          </span>
        </div>
      </div>
    </div>
  );
}
