import React from 'react';
import { HelpCircle, ArrowRight, CheckCircle2, Sliders, FileCode } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function WhyThisRouteSection({ explanation }) {
  if (!explanation) return null;

  const {
    availableMargin,
    calculatedProjectCost,
    projectCostBoundary,
    prototypeRoute,
    reason,
    ruleCode,
    hasCeilingMismatch,
    isAbove50L
  } = explanation;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 4.3
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Why this route?
            </h3>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Deterministic step-by-step logic matching your equity to the SIH 26091 framework
          </p>
        </div>

        <span className="text-xs font-mono font-semibold text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Rule: {ruleCode || 'SIH_DETERMINISTIC_MATCH'}
        </span>
      </div>

      {/* Step-by-Step Logic Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 relative">
        {/* Step 1: Input Margin */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#154636] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Step 1: Input Equity</span>
            <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-800 text-[10px] font-bold text-emerald-300 flex items-center justify-center">1</span>
          </div>
          <p className="text-[11px] text-emerald-200/70">Your Available Margin:</p>
          <div className="text-lg font-bold text-white font-mono">
            {formatCurrencyINR(availableMargin)}
          </div>
          <span className="text-[10px] text-emerald-300/60 block">User-entered unencumbered capital</span>
        </div>

        {/* Step 2: Project Sizing */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#154636] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider">Step 2: Capital Sizing</span>
            <span className="w-5 h-5 rounded-full bg-cyan-950 border border-cyan-800 text-[10px] font-bold text-cyan-300 flex items-center justify-center">2</span>
          </div>
          <p className="text-[11px] text-emerald-200/70">Calculated Project Cost:</p>
          <div className="text-lg font-bold text-white font-mono">
            {formatCurrencyINR(calculatedProjectCost)}
          </div>
          <span className="text-[10px] text-cyan-300/60 block font-mono">Cost = Margin / 0.10</span>
        </div>

        {/* Step 3: Boundary Test */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#154636] space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">Step 3: Bracket Test</span>
            <span className="w-5 h-5 rounded-full bg-amber-950 border border-amber-800 text-[10px] font-bold text-amber-300 flex items-center justify-center">3</span>
          </div>
          <p className="text-[11px] text-emerald-200/70">Applicable Boundary:</p>
          <div className="text-xs font-bold text-white font-mono leading-snug">
            {projectCostBoundary}
          </div>
          <span className="text-[10px] text-amber-300/60 block">SIH 26091 Specified Bracket</span>
        </div>

        {/* Step 4: Routed Output */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#063325] to-[#041913] border border-emerald-600/60 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-emerald-300 uppercase tracking-wider">Step 4: Indicative Route</span>
            <span className="w-5 h-5 rounded-full bg-emerald-950 border border-emerald-700 text-[10px] font-bold text-emerald-300 flex items-center justify-center">4</span>
          </div>
          <p className="text-[11px] text-emerald-200/70">Prototype Route:</p>
          <div className="text-sm font-black text-emerald-400 truncate" title={prototypeRoute}>
            {prototypeRoute}
          </div>
          <span className="text-[10px] text-emerald-300/80 block">Potentially Applicable</span>
        </div>
      </div>

      {/* Rationale Box */}
      <div className="p-4 rounded-2xl bg-[#071913] border border-[#154636] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Rule Rationale Explanation</span>
        </div>
        <p className="text-xs text-emerald-100/90 leading-relaxed font-sans">
          {reason}
        </p>
        <p className="text-[11px] text-emerald-300/70 pt-1 leading-relaxed">
          {isAbove50L
            ? 'Because this project exceeds the maximum documented ₹50 Lakh boundary, the prototype flags it for commercial loan appraisal rather than automatic micro-enterprise track assignment.'
            : hasCeilingMismatch
            ? 'Note: While the calculated 90% debt sizing exceeds the statutory ceiling, the scheme router safely caps the indicative debt allocation at the maximum permissible track limit.'
            : 'Because the calculated project cost conforms directly with the standard 10% equity ratio, the entrepreneur profile matches this scheme track without equity deficit.'}
        </p>
      </div>
    </div>
  );
}
