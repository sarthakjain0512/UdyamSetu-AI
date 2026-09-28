import React from 'react';
import { 
  TrendingUp, 
  HelpCircle, 
  CheckCircle2, 
  AlertCircle, 
  Layers, 
  IndianRupee, 
  Activity,
  ShieldCheck,
  Info
} from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function CashFlowDscrSection({ cashFlow, dscr }) {
  if (!cashFlow || !cashFlow.yearly || cashFlow.yearly.length === 0) {
    return (
      <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] text-center space-y-3">
        <HelpCircle className="w-8 h-8 text-stone-400 mx-auto" />
        <h3 className="text-base font-bold text-white">
          DSCR requires additional operating cash-flow assumptions.
        </h3>
        <p className="text-xs text-emerald-200/70 max-w-md mx-auto">
          Detailed operating revenues and expenditure assumptions must be defined to compute debt service coverage.
        </p>
      </div>
    );
  }

  const { yearly = [], assetTurnover = 1.35 } = cashFlow;
  const { value = 0, interpretation = 'Moderate coverage', badgeColor = 'amber' } = dscr || {};

  const getDscrBadge = () => {
    switch (badgeColor) {
      case 'emerald':
        return 'bg-emerald-950 text-emerald-300 border-emerald-700/80';
      case 'amber':
        return 'bg-amber-950 text-amber-300 border-amber-700/80';
      case 'orange':
        return 'bg-orange-950 text-orange-300 border-orange-700/80';
      case 'rose':
        return 'bg-rose-950 text-rose-300 border-rose-700/80';
      default:
        return 'bg-stone-900 text-stone-300 border-stone-700';
    }
  };

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header with Explicit Required Disclosure Label */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 3.5
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Indicative Cash Flow & Debt Service Coverage (DSCR)
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Simulated operating cash generation and debt clearance capacity
          </p>
        </div>

        {/* REQUIRED LABEL (Item 1) */}
        <span className="text-xs font-medium text-amber-300 bg-amber-950 px-3 py-1.5 rounded-full border border-amber-800 text-center sm:text-left">
          Illustrative Prototype Scenario — Not Actual Market Data
        </span>
      </div>

      {/* Explicit Cash Flow Transparency Notice (Item 1) */}
      <div className="p-4 rounded-2xl bg-[#071913] border border-amber-800/60 space-y-2 text-xs text-emerald-200/90">
        <div className="flex items-center gap-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
          <Info className="w-4 h-4 text-amber-400 shrink-0" />
          <span>Synthetic Cash Flow Model Disclosure</span>
        </div>
        <ul className="list-disc pl-5 space-y-1 text-[11px] leading-relaxed text-emerald-100/80">
          <li><strong>Synthetic Revenue Assumptions:</strong> Annual revenue is estimated via illustrative sector archetype asset-turnover heuristics ({assetTurnover}× of project cost). These are synthetic/demo assumptions and NOT predictions of actual business sales.</li>
          <li><strong>Synthetic Operating Cost / EBITDA Assumptions:</strong> Operating expenses are modeled assuming a representative 25–28% EBITDA margin. These are NOT government-provided financial benchmarks.</li>
          <li><strong>Production System Requirement:</strong> In a production deployment, these illustrative scenarios must be replaced with validated local enterprise operating accounts, actual supplier invoices, and local demand surveys.</li>
        </ul>
      </div>

      {/* DSCR Spotlight Card (Item 2) */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-[#063325] via-[#07241b] to-[#041913] border border-[#18533e] flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-emerald-400" />
            <span className="text-xs font-bold text-white uppercase tracking-wider">
              Debt Service Coverage Ratio (DSCR)
            </span>
          </div>
          <p className="text-xs text-emerald-200/90 max-w-xl leading-relaxed">
            <strong className="text-white">Prototype DSCR uses modeled Operating Profit as a proxy for Cash Available for Debt Service.</strong>
          </p>
          <p className="text-[11px] text-emerald-300/70 max-w-xl leading-relaxed">
            This is an illustrative prototype calculation. The displayed benchmarks (&gt; 1.50 Strong, 1.20–1.49 Moderate, etc.) are <strong>NOT</strong> government eligibility thresholds. Actual commercial lender DSCR methodology may differ. A production implementation should use verified cash-flow inputs and lender-specific underwriting criteria.
          </p>
        </div>

        <div className="flex items-center gap-4 bg-[#071913] p-4 rounded-xl border border-[#154636] shrink-0 self-start md:self-auto">
          <div className="text-center">
            <span className="text-3xl font-black text-white font-mono">{value}x</span>
            <span className="text-[10px] text-emerald-300/70 block uppercase tracking-wider">Coverage</span>
          </div>
          <div className="h-10 w-[1px] bg-[#18533e]"></div>
          <div>
            <span className={`text-xs font-bold px-3 py-1 rounded-full border inline-block ${getDscrBadge()}`}>
              {interpretation}
            </span>
            <span className="text-[10px] text-amber-300/80 block mt-1">Prototype Indicator</span>
          </div>
        </div>
      </div>

      {/* Indicative Cash Flow Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-emerald-400" />
            Indicative Multi-Year Operating Scenario
          </h3>
          <span className="text-[11px] text-emerald-300/60 font-mono">
            Values in ₹ INR
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#18533e]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071913] text-emerald-300/80 font-bold uppercase tracking-wider border-b border-[#18533e]">
              <tr>
                <th className="py-3 px-4">Period</th>
                <th className="py-3 px-4">Gross Revenue</th>
                <th className="py-3 px-4">Operating Cost</th>
                <th className="py-3 px-4 text-emerald-300">Operating Profit</th>
                <th className="py-3 px-4 text-amber-300">Debt Service</th>
                <th className="py-3 px-4 text-cyan-300 font-bold">Net Cash Flow</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#144233] bg-[#0c241b] font-mono">
              {yearly.map((row) => (
                <tr key={row.year} className="hover:bg-[#12382b]/50 transition-colors">
                  <td className="py-3 px-4 font-sans font-bold text-white">Year {row.year}</td>
                  <td className="py-3 px-4 text-emerald-100">{formatCurrencyINR(row.revenue)}</td>
                  <td className="py-3 px-4 text-rose-300/80">-{formatCurrencyINR(row.operatingCost)}</td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">{formatCurrencyINR(row.operatingProfit)}</td>
                  <td className="py-3 px-4 text-amber-300">-{formatCurrencyINR(row.debtService)}</td>
                  <td className="py-3 px-4 text-white font-bold">
                    <span className={`px-2 py-0.5 rounded ${row.netCashFlow >= 0 ? 'bg-emerald-950 text-emerald-300' : 'bg-rose-950 text-rose-300'}`}>
                      {formatCurrencyINR(row.netCashFlow)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Advisory Notes & Limitations */}
      <div className="p-4 rounded-2xl bg-[#051c14] border border-[#164d3a] flex items-start gap-2.5 text-xs text-emerald-200/80">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <p className="leading-relaxed">
            <strong className="text-white">Cash Flow & DSCR Disclaimer:</strong> All revenue figures, operating expenses, and DSCR metrics are illustrative prototype scenarios based on sector asset turnover ratios. Actual business cash flow will fluctuate with real market procurement prices, utility bills, helper wages, and seasonal customer sales volume. This is not an official bank underwriting decision.
          </p>
        </div>
      </div>

    </div>
  );
}
