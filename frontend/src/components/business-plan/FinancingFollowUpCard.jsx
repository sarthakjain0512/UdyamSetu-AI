import React from 'react';
import { Landmark, AlertTriangle, ShieldCheck, CheckCircle2, Info } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function FinancingFollowUpCard({ summary }) {
  const isAvailable = summary?.isAvailable;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.9
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Scheme Routing & Verification
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Financing & Scheme Follow-Up
          </h2>
          <p className="text-xs text-emerald-200/70">
            Official banking route alignment and pre-application verification actions from Module 4 (Scheme Router)
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] text-slate-400 block">
            Advisory Support Only • Non-Statutory
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
            Scheme Router — Not available from current analysis
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Complete Module 4 (Scheme Router) to match your enterprise profile against SIH 26091 Micro Finance and Term Loan brackets.
          </p>
        </div>
      ) : (
        <div className="space-y-5">
          
          {/* Matched Route Banner */}
          <div className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                Matched Indicative Track:
              </span>
              <h3 className="text-lg font-bold text-white">
                {summary.routeTitle}
              </h3>
              <p className="text-xs text-emerald-200/70">
                {summary.track}
              </p>
            </div>

            <div className="flex flex-wrap gap-2 text-xs">
              {summary.maxLoan && (
                <span className="px-3 py-1.5 rounded-xl bg-black/40 text-emerald-300 border border-[#18533e]">
                  Max Loan: <strong>{formatCurrencyINR(summary.maxLoan)}</strong>
                </span>
              )}
              {summary.interestRate && (
                <span className="px-3 py-1.5 rounded-xl bg-black/40 text-white border border-[#18533e]">
                  Indicative Rate: <strong>{summary.interestRate}% p.a.</strong>
                </span>
              )}
            </div>
          </div>

          {/* Mismatch or Out-of-Framework Alerts */}
          {summary.hasCeilingMismatch && (
            <div className="p-4 rounded-2xl bg-amber-950/40 border border-amber-800/80 space-y-1 text-xs text-amber-200">
              <div className="flex items-center gap-2 font-bold text-amber-300">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Loan Ceiling Mismatch Noted</span>
              </div>
              <p className="leading-relaxed pl-6">
                The calculated 90% debt exceeds the documented scheme lending cap. Confirm whether supplementary promoter equity or secondary credit lines are required.
              </p>
            </div>
          )}

          {summary.isAbove50L && (
            <div className="p-4 rounded-2xl bg-rose-950/40 border border-rose-800/80 space-y-1 text-xs text-rose-200">
              <div className="flex items-center gap-2 font-bold text-rose-300">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>Project Exceeds Framework Ceiling (&gt; ₹50 Lakh)</span>
              </div>
              <p className="leading-relaxed pl-6">
                Capital outlay exceeds the micro-enterprise challenge boundary. Commercial banking consortium appraisal is required.
              </p>
            </div>
          )}

          {/* Verification Actions */}
          <div className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] space-y-3">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Recommended Authority & Lender Verification Actions:</span>
            </h3>
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              {summary.verificationActions.map((action, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold shrink-0 mt-0.5">•</span>
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Statutory Disclaimer */}
          <div className="p-4 rounded-xl bg-black/40 border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
            <strong>Official Verification Disclaimer:</strong> {summary.disclaimer}
          </div>

        </div>
      )}

    </div>
  );
}
