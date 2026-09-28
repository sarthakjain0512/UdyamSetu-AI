import React from 'react';
import { 
  Calculator, 
  IndianRupee, 
  Clock, 
  Percent, 
  Landmark, 
  ShieldCheck, 
  AlertCircle,
  HelpCircle 
} from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function FinancingSummaryCard({ financingSummary, ceilingMismatch }) {
  if (!financingSummary) return null;

  const {
    availableMarginCapital,
    calculatedProjectCost,
    calculated90Loan,
    statedLoanCeiling,
    indicativeRoutedLoan,
    financingTrack,
    interestRateDisplay,
    tenureDisplay,
    moratoriumDisplay
  } = financingSummary;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 4.2
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Financing Structure Summary
            </h3>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Comparative capital sizing and indicative routed debt structure
          </p>
        </div>

        {/* REQUIRED PROTOTYPE GUIDANCE BADGE */}
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-amber-300 bg-amber-950 px-3.5 py-1.5 rounded-full border border-amber-800 flex items-center gap-1.5 shadow-sm">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>Prototype Guidance</span>
          </span>
        </div>
      </div>

      {/* Main 5-Metric Comparison Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        {/* Available Margin Capital */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-emerald-800/70 space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-400 block">
            1. Available Margin Capital
          </span>
          <div className="text-xl font-bold text-white font-mono">
            {formatCurrencyINR(availableMarginCapital)}
          </div>
          <span className="text-[10px] text-emerald-300/60 block">
            10% Entrepreneur Equity
          </span>
        </div>

        {/* Calculated Project Cost */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-cyan-800/70 space-y-1">
          <span className="text-[10px] uppercase font-bold text-cyan-400 block">
            2. Calculated Project Cost
          </span>
          <div className="text-xl font-bold text-white font-mono">
            {formatCurrencyINR(calculatedProjectCost)}
          </div>
          <span className="text-[10px] text-cyan-300/60 block">
            Margin / 0.10 Formula
          </span>
        </div>

        {/* Calculated 90% Financing */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-amber-800/70 space-y-1">
          <span className="text-[10px] uppercase font-bold text-amber-400 block">
            3. Calculated 90% Debt
          </span>
          <div className="text-xl font-bold text-white font-mono">
            {formatCurrencyINR(calculated90Loan)}
          </div>
          <span className="text-[10px] text-amber-300/60 block">
            Project Cost × 0.90
          </span>
        </div>

        {/* Stated Loan Ceiling */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-purple-800/70 space-y-1">
          <span className="text-[10px] uppercase font-bold text-purple-300 block">
            4. Stated Loan Ceiling
          </span>
          <div className="text-xl font-bold text-white font-mono">
            {formatCurrencyINR(statedLoanCeiling)}
          </div>
          <span className="text-[10px] text-purple-300/60 block">
            SIH Scheme Maximum
          </span>
        </div>

        {/* Indicative Routed Loan */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#063325] to-[#041913] border border-emerald-500/60 space-y-1 relative overflow-hidden">
          <span className="text-[10px] uppercase font-bold text-emerald-300 block">
            5. Indicative Routed Loan
          </span>
          <div className="text-xl font-black text-emerald-400 font-mono">
            {formatCurrencyINR(indicativeRoutedLoan)}
          </div>
          <span className="text-[10px] text-emerald-300/80 block">
            {ceilingMismatch ? 'Capped at Stated Ceiling' : 'Uncapped 90% Sized Debt'}
          </span>
        </div>
      </div>

      {/* Track Parameters Strip */}
      <div className="p-4 rounded-2xl bg-[#071913] border border-[#154636] grid grid-cols-2 md:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-[10px] text-emerald-300/60 uppercase block">Financing Track</span>
          <strong className="text-white text-xs block mt-0.5">{financingTrack}</strong>
        </div>
        <div>
          <span className="text-[10px] text-emerald-300/60 uppercase block">Prescribed Interest Rate</span>
          <strong className="text-amber-300 font-mono text-xs block mt-0.5">{interestRateDisplay}</strong>
        </div>
        <div>
          <span className="text-[10px] text-emerald-300/60 uppercase block">Tenure Period</span>
          <strong className="text-white font-mono text-xs block mt-0.5">{tenureDisplay}</strong>
        </div>
        <div>
          <span className="text-[10px] text-emerald-300/60 uppercase block">Moratorium Period</span>
          <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{moratoriumDisplay}</strong>
        </div>
      </div>

      {/* Ceiling Note */}
      {ceilingMismatch && (
        <div className="p-3.5 rounded-xl bg-amber-950/40 border border-amber-800/80 text-xs text-amber-200/90 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed text-[11px]">
            {ceilingMismatch.explanation}
          </p>
        </div>
      )}
    </div>
  );
}
