import React from 'react';
import { Landmark, ShieldCheck, CheckCircle2, AlertTriangle, ArrowRight } from 'lucide-react';

export default function PrototypeRouteCard({ route, parameters, isAbove50L }) {
  if (!route) return null;

  const { track, status, reason, confidence } = route;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl relative overflow-hidden space-y-6">
      {/* Decorative gradient corner */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 4.1
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              SIH 26091 Financing Track Identification
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {track}
          </h2>
          <p className="text-xs text-emerald-200/80 max-w-2xl leading-relaxed">
            {reason}
          </p>
        </div>

        {/* Status & Confidence Badges */}
        <div className="flex flex-col sm:items-end gap-2 shrink-0">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-700/80">
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{status}</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded text-[11px] font-mono text-emerald-300/80 bg-[#071913] border border-[#154636]">
            <span>Confidence:</span>
            <strong className="text-emerald-400">{confidence}</strong>
          </div>
        </div>
      </div>

      {/* Track Parameters Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 text-xs">
        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase font-bold block">Boundary Bracket</span>
          <span className="font-bold text-white text-xs block mt-1">
            {parameters.projectCostRange}
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase font-bold block">Financing Ratio</span>
          <span className="font-bold text-white text-xs block mt-1 font-mono">
            Up to {parameters.financingPercentage}% Debt
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase font-bold block">Interest Rate</span>
          <span className="font-bold text-amber-300 text-xs block mt-1 font-mono">
            {parameters.interestRate.toFixed(1)}% p.a.
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase font-bold block">Tenure Period</span>
          <span className="font-bold text-white text-xs block mt-1 font-mono">
            {parameters.tenureYears} Years ({parameters.tenureMonths} Mos)
          </span>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase font-bold block">Moratorium Window</span>
          <span className="font-bold text-emerald-400 text-xs block mt-1 font-mono">
            {parameters.moratoriumMonths} Months
          </span>
        </div>
      </div>

      {/* Boundary Callout Note */}
      <div className="p-3.5 rounded-2xl bg-[#071913]/80 border border-[#18533e] flex items-center justify-between text-xs text-emerald-200/80">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>
            {isAbove50L
              ? 'This investment profile requires separate commercial banking consortium appraisal.'
              : 'Deterministic rule match based on standard 10% entrepreneur equity requirement.'}
          </span>
        </div>
        <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider shrink-0 hidden sm:inline">
          SIH 26091 Standard
        </span>
      </div>
    </div>
  );
}
