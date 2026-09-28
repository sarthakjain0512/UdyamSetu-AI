import React from 'react';
import { IndianRupee, Calculator, Landmark, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import { computeFinancialPreview } from '../../utils/financialPreview';

export function FinancialReadinessSection({ marginCapital, capitalAdequacy, minRecommendedCapital }) {
  const preview = computeFinancialPreview(marginCapital);

  return (
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 2.5
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Financial Readiness & Sizing
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Sized under SIH 26091 guidelines: 10% entrepreneur equity and 90% debt financing
          </p>
        </div>

        <span className="text-xs font-bold text-amber-300 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/30">
          {preview.track}
        </span>
      </div>

      {/* Sizing Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-1">
          <span className="text-[10px] text-emerald-300/70 flex items-center gap-1 font-medium">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Available Margin Equity
          </span>
          <p className="text-lg font-bold text-white font-mono">
            {formatCurrencyINR(preview.marginCapital)}
          </p>
          <span className="text-[10px] text-emerald-400 font-medium block">10% Own Capital</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-1">
          <span className="text-[10px] text-emerald-300/70 flex items-center gap-1 font-medium">
            <Calculator className="w-3.5 h-3.5 text-cyan-400" /> Est. Total Project Cost
          </span>
          <p className="text-lg font-bold text-emerald-300 font-mono">
            {formatCurrencyINR(preview.estimatedProjectCost)}
          </p>
          <span className="text-[10px] text-emerald-300/60 block">Formula: Margin / 0.10</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-1">
          <span className="text-[10px] text-emerald-300/70 flex items-center gap-1 font-medium">
            <Landmark className="w-3.5 h-3.5 text-amber-400" /> Projected Bank Loan
          </span>
          <p className="text-lg font-bold text-amber-400 font-mono">
            {formatCurrencyINR(preview.estimatedLoanAmount)}
          </p>
          <span className="text-[10px] text-emerald-300/60 block">Formula: Cost × 0.90</span>
        </div>

        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-1">
          <span className="text-[10px] text-emerald-300/70 flex items-center gap-1 font-medium">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Capital Adequacy
          </span>
          <p className="text-lg font-bold text-purple-300">
            {capitalAdequacy || 'Sufficient'}
          </p>
          <span className="text-[10px] text-emerald-300/60 block">
            Min Benchmark: {formatCurrencyINR(minRecommendedCapital || 100000)}
          </span>
        </div>

      </div>

      {/* Credit Terms Preview */}
      <div className="p-4 rounded-xl bg-[#061d15] border border-[#1c5540] grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div>
          <span className="text-[10px] text-emerald-300/70 block">Indicative Rate:</span>
          <span className="font-bold text-white text-sm">{preview.interestRate}</span>
        </div>
        <div>
          <span className="text-[10px] text-emerald-300/70 block">Repayment Tenure:</span>
          <span className="font-bold text-white text-sm">{preview.tenure}</span>
        </div>
        <div>
          <span className="text-[10px] text-emerald-300/70 block">Moratorium Window:</span>
          <span className="font-bold text-white text-sm">{preview.moratorium}</span>
        </div>
      </div>

      {/* Non-Sanction Disclaimer */}
      <div className="p-3 rounded-xl bg-[#071d15] border border-[#174e3a] text-[11px] text-emerald-200/70 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-amber-300">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400" />
          <span>Financing Disclaimer</span>
        </div>
        <p>
          Project sizing is an illustrative prototype estimate based on SIH 26091 guidelines. Final credit sanction, interest rate, and subsidy disbursal remain subject to statutory lending institution underwriting and nodal agency portal approval.
        </p>
      </div>

    </div>
  );
}
