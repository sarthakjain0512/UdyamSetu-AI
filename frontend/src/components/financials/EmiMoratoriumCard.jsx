import React from 'react';
import { 
  Calculator, 
  Calendar, 
  Clock, 
  IndianRupee, 
  ArrowRight, 
  ShieldCheck, 
  HelpCircle,
  AlertCircle
} from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function EmiMoratoriumCard({ financing, emi }) {
  if (!financing || !emi) return null;

  const {
    loanAmount,
    interestRateDisplay,
    tenureYears,
    tenureMonths,
    moratoriumMonths,
    repaymentMonths,
    track
  } = financing;

  const {
    monthlyEmi,
    monthlyMoratoriumInterest,
    totalMoratoriumInterest,
    totalInterest,
    totalRepayment
  } = emi;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 3.2
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Monthly Debt Service & Moratorium Modeling
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Explicit separation of moratorium grace window and principal amortization period
          </p>
        </div>

        <span className="text-xs font-bold text-amber-300 bg-amber-950 px-3 py-1 rounded-full border border-amber-800">
          Moratorium Treatment: Illustrative
        </span>
      </div>

      {/* Main Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        
        {/* Monthly Regular EMI */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-[#063325] to-[#041913] border border-[#18533e] space-y-3 relative">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
              Monthly Equated Installment (EMI)
            </span>
            <Calculator className="w-5 h-5 text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-white font-mono">
            {formatCurrencyINR(monthlyEmi)}
            <span className="text-xs font-normal text-emerald-300/70 ml-1">/ month</span>
          </div>
          <p className="text-xs text-emerald-200/70 leading-relaxed">
            Active during months <strong>{moratoriumMonths + 1} to {tenureMonths}</strong> ({repaymentMonths} installments) at {interestRateDisplay}.
          </p>
        </div>

        {/* Moratorium Grace Window */}
        <div className="p-6 rounded-2xl bg-[#071913] border border-[#154636] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300 uppercase tracking-wider">
              Moratorium Grace Period
            </span>
            <Clock className="w-5 h-5 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-300 font-mono">
            {moratoriumMonths} Months
            <span className="text-xs font-normal text-amber-300/70 ml-1">grace</span>
          </div>
          <p className="text-xs text-emerald-200/70 leading-relaxed">
            Months <strong>1 to {moratoriumMonths}</strong>: Zero principal repayment. Simple interest is estimated at <strong>{formatCurrencyINR(monthlyMoratoriumInterest)}/mo</strong>.
          </p>
        </div>

        {/* Total Cost of Borrowing */}
        <div className="p-6 rounded-2xl bg-[#071913] border border-[#154636] space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-cyan-300 uppercase tracking-wider">
              Total Interest & Repayment
            </span>
            <IndianRupee className="w-5 h-5 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-cyan-300 font-mono">
            {formatCurrencyINR(totalRepayment)}
          </div>
          <div className="text-xs text-emerald-200/70 flex justify-between pt-1 border-t border-[#144233]">
            <span>Principal: <strong>{formatCurrencyINR(loanAmount)}</strong></span>
            <span>Total Interest: <strong className="text-amber-300">{formatCurrencyINR(totalInterest)}</strong></span>
          </div>
        </div>

      </div>

      {/* Timeline Visual Bar */}
      <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-3">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
          <span className="font-bold text-white uppercase tracking-wider text-[11px]">
            Tenure Composition Timeline ({tenureMonths} Months Total)
          </span>
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 text-amber-300">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
              Moratorium ({moratoriumMonths} Mo)
            </span>
            <span className="flex items-center gap-1.5 text-emerald-300">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block"></span>
              Principal Repayment ({repaymentMonths} Mo)
            </span>
          </div>
        </div>

        {/* Progress Timeline */}
        <div className="w-full h-4 bg-[#041913] rounded-full overflow-hidden flex p-0.5 border border-[#18533e]">
          <div 
            style={{ width: `${(moratoriumMonths / tenureMonths) * 100}%` }}
            className="bg-amber-500 h-full rounded-l-full flex items-center justify-center text-[9px] font-bold text-amber-950 truncate px-1"
            title={`Moratorium: Months 1–${moratoriumMonths}`}
          >
            {moratoriumMonths}M
          </div>
          <div 
            style={{ width: `${(repaymentMonths / tenureMonths) * 100}%` }}
            className="bg-emerald-500 h-full rounded-r-full flex items-center justify-center text-[9px] font-bold text-emerald-950 truncate px-1"
            title={`Active Amortization: Months ${moratoriumMonths + 1}–${tenureMonths}`}
          >
            {repaymentMonths} Months Active EMI Repayment
          </div>
        </div>

        <p className="text-[11px] text-emerald-200/60 pt-1">
          * Standard monthly EMI formula: <code className="text-amber-300 font-mono text-[10px]">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</code> where n = {repaymentMonths} active amortization months.
        </p>
      </div>

      {/* Moratorium Advisory Banner */}
      <div className="p-4 rounded-2xl bg-[#051c14] border border-[#164d3a] flex items-start gap-2.5 text-xs text-amber-200/90">
        <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong className="text-white">Prototype Moratorium Assumption:</strong> Interest treatment during the moratorium period is modelled separately for illustration (estimated simple interest without compounding penalty). Actual commercial banks and lending institutions may capitalize interest or offer flexible payment options. Final lender terms must be verified during loan appraisal.
        </p>
      </div>

    </div>
  );
}
