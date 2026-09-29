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
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDE5DD] shadow-sm space-y-6">
      
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#DDE5DD] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#14532D] font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Module 3.1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#14532D] tracking-tight">
              Capital Sizing & Financial Plan
            </h2>
          </div>
          <p className="text-xs text-[#647067] mt-0.5">
            Core project sizing and debt structuring aligned with SIH 26091 parameters
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-[#14532D] bg-emerald-50 px-3.5 py-1.5 rounded-full border border-emerald-200">
            {track}
          </span>
        </div>
      </div>

      {/* Sizing Warning Banners */}
      {isExceedingMaxCost && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 flex items-start gap-3 text-xs text-[#C2413A]">
          <AlertTriangle className="w-5 h-5 text-[#C2413A] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-[#17211B] text-sm block">Project Scale Exceeds Stated Prototype Framework</strong>
            <p className="leading-relaxed">
              Calculated project cost ({formatCurrencyINR(projectCost)}) exceeds the stated SIH 26091 maximum boundary of ₹50.00 Lakh. The prototype financing engine does not automatically sanction or route amounts above ₹50 Lakh. Multi-crore enterprises require formal commercial consortium appraisal.
            </p>
          </div>
        </div>
      )}

      {isExceedingCap && !isExceedingMaxCost && (
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 flex items-start gap-3 text-xs text-[#C87512]">
          <AlertCircle className="w-5 h-5 text-[#C87512] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <strong className="text-[#17211B] text-sm block">Financing Sizing Exceeds Prototype Scheme Ceiling</strong>
            <p className="leading-relaxed">
              Calculated 90% debt ({formatCurrencyINR(rawLoanAmount)}) exceeds the stated prototype ceiling ({formatCurrencyINR(maxLoanCeiling)}) for the {track}. The estimated loan requirement in this plan is capped at <strong>{formatCurrencyINR(loanAmount)}</strong>. Additional capital must be funded via equity or verified lender co-financing.
            </p>
          </div>
        </div>
      )}

      {/* Primary Financial Metric Cards — Visual Hierarchy */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Estimated Project Cost (Dominant Metric 1) */}
        <div className="p-5 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#14532D] font-bold uppercase tracking-wider">
              Est. Total Project Cost
            </span>
            <span className="text-[9px] font-semibold text-[#14532D] bg-white px-2 py-0.5 rounded border border-emerald-200">
              100% Scale
            </span>
          </div>
          <div className="text-2xl font-black text-[#14532D] font-mono">
            {formatCurrencyINR(projectCost)}
          </div>
          <p className="text-[11px] text-[#647067]">
            Sized at Margin / 0.10 covering CapEx, tooling & initial OpEx.
          </p>
        </div>

        {/* Margin Capital (Dominant Metric 2) */}
        <div className="p-5 rounded-xl bg-stone-50 border border-[#DDE5DD] space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#647067] font-bold uppercase tracking-wider">
              Promoter Margin Equity
            </span>
            <span className="text-[9px] font-semibold text-[#14532D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              10% Own Equity
            </span>
          </div>
          <div className="text-2xl font-black text-[#17211B] font-mono">
            {formatCurrencyINR(marginCapital)}
          </div>
          <p className="text-[11px] text-[#647067]">
            Self-funded entrepreneur equity commitment.
          </p>
        </div>

        {/* Estimated Bank Loan (Dominant Metric 3) */}
        <div className="p-5 rounded-xl bg-stone-50 border border-[#DDE5DD] space-y-1.5 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#0F766E] font-bold uppercase tracking-wider">
              Estimated Bank Loan
            </span>
            <span className="text-[9px] font-semibold text-[#0F766E] bg-teal-50 px-2 py-0.5 rounded border border-teal-200">
              90% Debt Facility
            </span>
          </div>
          <div className="text-2xl font-black text-[#0F766E] font-mono">
            {formatCurrencyINR(loanAmount)}
          </div>
          <p className="text-[11px] text-[#647067]">
            Credit-linked borrowing under {track}.
          </p>
        </div>

        {/* Financing Terms Card */}
        <div className="p-5 rounded-xl bg-stone-50 border border-[#DDE5DD] space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] text-[#C87512] font-bold uppercase tracking-wider">
              Statutory Terms
            </span>
            <span className="text-[9px] font-semibold text-[#C87512] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              SIH 26091
            </span>
          </div>
          <div className="space-y-1 text-xs">
            <div className="flex items-center justify-between font-semibold text-[#17211B]">
              <span className="text-[#647067]">Rate:</span>
              <span className="font-mono text-[#14532D]">{interestRateDisplay}</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-[#17211B]">
              <span className="text-[#647067]">Tenure:</span>
              <span className="font-mono">{tenureYears} Yrs ({tenureMonths} Mo)</span>
            </div>
            <div className="flex items-center justify-between font-semibold text-[#17211B]">
              <span className="text-[#647067]">Moratorium:</span>
              <span className="font-mono text-[#0F766E]">{moratoriumMonths} Months</span>
            </div>
          </div>
        </div>

      </div>

      {/* Regulatory Non-Sanction Heuristics Notice */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5 text-xs text-[#C87512]">
        <ShieldCheck className="w-4 h-4 text-[#C87512] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-[#17211B]">Prototype Advisory Disclaimer:</strong> Illustrative prototype financial model structured in accordance with SIH 26091 rules. Final sanction, credit terms, and interest rates are determined exclusively by the lending bank during official credit appraisal.
        </p>
      </div>

    </div>
  );
}

export { FinancialOverviewSection };
