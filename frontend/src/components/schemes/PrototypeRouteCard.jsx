import React from 'react';
import { Landmark, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PrototypeRouteCard({ route, parameters, isAbove50L }) {
  if (!route) return null;

  const { track, status, reason, confidence } = route;

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDE5DD] shadow-sm relative overflow-hidden space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#DDE5DD] pb-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#14532D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Module 4.1
            </span>
            <span className="text-xs font-bold text-[#0F766E] uppercase tracking-wider">
              RECOMMENDED FINANCING ROUTE
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-[#14532D] tracking-tight">
            {track}
          </h2>
          <p className="text-xs text-[#647067] max-w-2xl leading-relaxed">
            {reason}
          </p>
        </div>

        {/* Status & Confidence Badges */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-[#C87512] border border-amber-200">
            <ShieldCheck className="w-3.5 h-3.5 text-[#C87512]" />
            <span>{status}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono text-[#14532D] bg-emerald-50 border border-emerald-200">
            <span>Confidence:</span>
            <strong className="text-[#14532D]">{confidence}</strong>
          </div>
        </div>
      </div>

      {/* Track Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-stone-50 border border-[#DDE5DD]">
          <span className="text-[10px] text-[#647067] uppercase font-bold block">Boundary Bracket</span>
          <span className="font-bold text-[#17211B] text-xs block mt-1">
            {parameters.projectCostRange}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-50 border border-[#DDE5DD]">
          <span className="text-[10px] text-[#647067] uppercase font-bold block">Financing Ratio</span>
          <span className="font-bold text-[#17211B] text-xs block mt-1 font-mono">
            Up to {parameters.financingPercentage}% Debt
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-50 border border-[#DDE5DD]">
          <span className="text-[10px] text-[#647067] uppercase font-bold block">Interest Rate</span>
          <span className="font-bold text-[#14532D] text-xs block mt-1 font-mono">
            {parameters.interestRate}% p.a.
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-50 border border-[#DDE5DD]">
          <span className="text-[10px] text-[#647067] uppercase font-bold block">Loan Tenure</span>
          <span className="font-bold text-[#17211B] text-xs block mt-1 font-mono">
            {parameters.tenureYears} Years ({parameters.tenureMonths} Mo)
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-stone-50 border border-[#DDE5DD]">
          <span className="text-[10px] text-[#647067] uppercase font-bold block">Moratorium Window</span>
          <span className="font-bold text-[#0F766E] text-xs block mt-1 font-mono">
            {parameters.moratoriumMonths} Months
          </span>
        </div>
      </div>

      {/* Above 50L Out of Scope Flag */}
      {isAbove50L && (
        <div className="p-3.5 rounded-xl bg-amber-50 border border-amber-200 text-xs text-[#C87512] flex items-start gap-2.5">
          <AlertTriangle className="w-4 h-4 text-[#C87512] shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Prototype Boundary Notice:</strong> Sized project cost exceeds ₹50 Lakh. The prototype financing engine caps rural micro-enterprise tracks at ₹50 Lakh. Enterprises exceeding this scale require formal commercial banking consortium appraisal.
          </p>
        </div>
      )}

      {/* Mandatory Disclaimer */}
      <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-[#14532D] flex items-start gap-2.5">
        <Landmark className="w-4 h-4 text-[#14532D] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>Potential scheme pathway identified:</strong> Final eligibility, applicable subsidy percentage, and loan sanction require verification against current official guidelines and formal appraisal by the financing institution.
        </p>
      </div>

    </div>
  );
}

export { PrototypeRouteCard };
