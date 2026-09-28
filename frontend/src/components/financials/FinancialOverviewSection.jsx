import React from 'react';
import { 
  Landmark, 
  IndianRupee, 
  Layers, 
  Clock, 
  Percent, 
  AlertTriangle, 
  ShieldCheck, 
  Calendar,
  AlertCircle
} from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function FinancialOverviewSection({ financing }) {
  if (!financing) return null;

  const {
    marginCapital,
    projectCost,
    loanAmount,
    rawLoanAmount,
    track,
    isMicroFinance,
    isExceedingCap,
    isExceedingMaxCost,
    interestRateDisplay,
    tenureYears,
    tenureMonths,
    moratoriumMonths,
    maxLoanCeiling
  } = financing;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 3.1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Financial Structuring Overview
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Core project sizing and debt structuring aligned with SIH 26091 parameters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-700/60">
            {track}
          </span>
        </div>
      </div>

      {/* Sizing Warning Banners */}
      {isExceedingMaxCost && (
        <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 flex items-start gap-3 text-xs text-rose-200">
          <AlertTriangle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white text-sm block">Project Scale Exceeds Stated Prototype Framework</strong>
            <p className="leading-relaxed">
              Calculated project cost ({formatCurrencyINR(projectCost)}) exceeds the stated SIH 26091 maximum boundary of ₹50.00 Lakh. The prototype financing engine does not automatically sanction or route amounts above ₹50 Lakh. Multi-crore enterprises require formal commercial consortium appraisal.
            </p>
          </div>
        </div>
      )}

      {isExceedingCap && !isExceedingMaxCost && (
        <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 flex items-start gap-3 text-xs text-amber-200">
          <AlertCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-white text-sm block">Financing Sizing Exceeds Prototype Scheme Ceiling</strong>
            <p className="leading-relaxed">
              Calculated 90% debt ({formatCurrencyINR(rawLoanAmount)}) exceeds the stated prototype ceiling ({formatCurrencyINR(maxLoanCeiling)}) for the {track}. The estimated loan requirement in this plan is capped at <strong>{formatCurrencyINR(loanAmount)}</strong>. Additional capital must be funded via equity or verified lender co-financing.
            </p>
          </div>
        </div>
      )}

      {/* Primary Financial Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Margin Capital (User Input) */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-emerald-300 font-bold uppercase tracking-wider">
              Available Margin Capital
            </span>
            <span className="text-[9px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
              User Input
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {formatCurrencyINR(marginCapital)}
          </div>
          <p className="text-[11px] text-emerald-200/60">
            Self-funded entrepreneur equity commitment (10% standard ratio).
          </p>
        </div>

        {/* Estimated Project Cost (Calculated Estimate) */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">
              Est. Total Project Cost
            </span>
            <span className="text-[9px] font-semibold text-amber-400 bg-amber-950/80 px-2 py-0.5 rounded border border-amber-800">
              Calculated Estimate
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {formatCurrencyINR(projectCost)}
          </div>
          <p className="text-[11px] text-emerald-200/60">
            Sized at Margin / 0.10 covering CapEx, tooling & working capital.
          </p>
        </div>

        {/* Estimated Loan Requirement (Calculated Estimate) */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-cyan-300 font-bold uppercase tracking-wider">
              Est. Loan Requirement
            </span>
            <span className="text-[9px] font-semibold text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800">
              Calculated Estimate
            </span>
          </div>
          <div className="text-2xl font-black text-white font-mono">
            {formatCurrencyINR(loanAmount)}
          </div>
          <p className="text-[11px] text-emerald-200/60">
            90% project financing subject to scheme ceiling ({formatCurrencyINR(maxLoanCeiling)}).
          </p>
        </div>

        {/* Financing Track Details (SIH 26091 Parameter) */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-purple-300 font-bold uppercase tracking-wider">
              Financing Terms
            </span>
            <span className="text-[9px] font-semibold text-purple-400 bg-purple-950/80 px-2 py-0.5 rounded border border-purple-800">
              SIH 26091 Parameter
            </span>
          </div>
          <div className="space-y-1">
            <div className="text-sm font-bold text-white flex items-center justify-between">
              <span className="text-emerald-300/80">Rate:</span>
              <span className="font-mono text-amber-300">{interestRateDisplay}</span>
            </div>
            <div className="text-sm font-bold text-white flex items-center justify-between">
              <span className="text-emerald-300/80">Tenure:</span>
              <span className="font-mono">{tenureYears} Yrs ({tenureMonths} Mo)</span>
            </div>
            <div className="text-sm font-bold text-white flex items-center justify-between">
              <span className="text-emerald-300/80">Moratorium:</span>
              <span className="font-mono text-emerald-400">{moratoriumMonths} Months</span>
            </div>
          </div>
        </div>

      </div>

      {/* Regulatory Non-Sanction Heuristics Notice */}
      <div className="p-4 rounded-2xl bg-[#051c14] border border-[#164d3a] flex items-start gap-2.5 text-xs text-emerald-200/80">
        <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Prototype Advisory Disclaimer:</strong> Prototype financial structure based on SIH 26091 problem statement assumptions. Final eligibility, financing terms, interest rates, and sanction conditions must be verified against current official bank rules. This module does not constitute a formal loan sanction or bank approval.
        </p>
      </div>

    </div>
  );
}
