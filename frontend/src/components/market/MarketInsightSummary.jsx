import React from 'react';
import { Link } from 'react-router-dom';
import { 
  CheckCircle2, AlertCircle, ArrowRight, Sparkles, 
  ShieldCheck, HelpCircle, Compass, ShieldAlert 
} from 'lucide-react';

export function MarketInsightSummary({ summary, onProceedFeasibility, activeSession }) {
  if (!summary) return null;

  return (
    <div className="bg-gradient-to-br from-[#063325] via-[#09291e] to-[#041913] rounded-3xl p-6 sm:p-8 border border-[#17523f] shadow-2xl space-y-6">
      
      {/* Title */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 1.8
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Market Opportunity Summary
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Executive strategic synthesis and recommended next step
          </p>
        </div>

        <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-700/60 self-start sm:self-auto">
          {summary.signal || 'Favorable Opportunity'}
        </span>
      </div>

      {/* Synthesis Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
        
        {/* Core Demand Driver */}
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2">
          <span className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider block">
            Primary Demand Driver
          </span>
          <p className="text-white font-medium text-xs leading-relaxed">
            {summary.demandDriver}
          </p>
        </div>

        {/* Competitive Watchout */}
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2">
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">
            Primary Competitive Concern
          </span>
          <p className="text-white font-medium text-xs leading-relaxed">
            {summary.competitiveConcern}
          </p>
        </div>

        {/* Recommended Differentiation */}
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2">
          <span className="text-[10px] text-cyan-400 font-bold uppercase tracking-wider block">
            Core Differentiation Recommendation
          </span>
          <p className="text-white font-medium text-xs leading-relaxed">
            {summary.differentiationSuggestion}
          </p>
        </div>

      </div>

      {/* Mandatory Non-Guarantee Advisory Note (Step 11) */}
      <div className="p-3.5 rounded-xl bg-[#051c14] border border-[#164d3a] text-xs text-emerald-200/70 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong className="text-amber-300">Advisory Disclaimer: </strong>
          Prototype analysis indicates potential opportunity factors. Validate locally with Gram Panchayat and prospective buyers before committing capital. Does not guarantee commercial profitability.
        </p>
      </div>

      {/* Next Step CTA */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-[#144233] pt-6">
        <div className="text-xs text-emerald-200/80">
          <span className="font-semibold text-white block">Recommended Next Step:</span>
          <span className="text-[11px] text-emerald-300/70">{summary.recommendedNextStep}</span>
        </div>

        <Link
          to="/feasibility"
          state={{ session: activeSession }}
          className="w-full sm:w-auto py-3 px-6 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-950/40 flex items-center justify-center gap-2 group transition-all transform hover:-translate-y-0.5 whitespace-nowrap"
        >
          <span>Proceed to Business Feasibility</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

    </div>
  );
}
