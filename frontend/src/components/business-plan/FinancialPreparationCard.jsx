import React from 'react';
import { IndianRupee, Layers, Calendar, Percent, ShieldCheck, AlertCircle, Info } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function FinancialPreparationCard({ summary }) {
  const isAvailable = summary?.isAvailable;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.8
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Capital Sizing & Repayment
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Financial Preparation Summary
          </h2>
          <p className="text-xs text-emerald-200/70">
            Pre-sanction capital structure and monthly debt service obligations derived from Module 3 (Financial Plan)
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] text-slate-400 block">
            SIH 26091 90/10 Financing Framework
          </span>
        </div>
      </div>

      {/* Unavailable State */}
      {!isAvailable ? (
        <div className="p-8 rounded-2xl bg-[#071913] border border-dashed border-slate-700 text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Info className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-300">
            Financial Plan — Not available from current analysis
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Complete Module 3 (Financial Plan) to calculate project cost sizing, monthly EMI amortization, and illustrative DSCR debt coverage.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Key Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            
            <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Total Project Cost
              </span>
              <p className="text-lg font-black text-white">
                {formatCurrencyINR(summary.projectCost)}
              </p>
              <span className="text-[10px] text-slate-400">Based on 10% equity</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Promoter Margin Capital
              </span>
              <p className="text-lg font-black text-amber-400">
                {formatCurrencyINR(summary.marginCapital)}
              </p>
              <span className="text-[10px] text-slate-400">Promoter equity</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Indicative Loan Sized
              </span>
              <p className="text-lg font-black text-emerald-300">
                {formatCurrencyINR(summary.loanAmount)}
              </p>
              <span className="text-[10px] text-slate-400">90% target debt</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Modeled Monthly EMI
              </span>
              <p className="text-lg font-black text-cyan-300">
                {summary.monthlyEmi ? formatCurrencyINR(summary.monthlyEmi) : 'N/A'}
              </p>
              <span className="text-[10px] text-slate-400">Reducing-balance</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Interest Rate (SIH)
              </span>
              <p className="text-base font-black text-white">
                {summary.interestRate ? `${summary.interestRate}% p.a.` : 'N/A'}
              </p>
              <span className="text-[10px] text-slate-400">Prototype guideline</span>
            </div>

            <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Tenure & Moratorium
              </span>
              <p className="text-base font-black text-white">
                {summary.tenureYears ? `${summary.tenureYears} Years` : 'N/A'}
              </p>
              <span className="text-[10px] text-slate-400">
                {summary.moratoriumMonths ? `${summary.moratoriumMonths}m moratorium` : 'N/A'}
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1 col-span-2">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Illustrative Prototype DSCR
              </span>
              <p className="text-base font-black text-emerald-300">
                {summary.dscrValue ? `${summary.dscrValue.toFixed(2)} (${summary.dscrBenchmark || 'Indicative'})` : 'Not available'}
              </p>
              <span className="text-[10px] text-slate-400">
                Uses modeled operating profit as proxy; validate with actual quotes
              </span>
            </div>

          </div>

          {/* Financial Validation Before Launch */}
          <div className="p-5 rounded-2xl bg-[#071913] border border-amber-900/60 space-y-3">
            <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-amber-400" />
              <span>Financial Validation Before Launch</span>
            </h3>
            <ul className="space-y-2 text-xs text-amber-200/90 leading-relaxed">
              {summary.validations.map((val, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{val}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

    </div>
  );
}
