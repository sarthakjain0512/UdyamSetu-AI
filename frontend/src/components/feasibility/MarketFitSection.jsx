import React from 'react';
import { TrendingUp, Users, Sparkles, CheckCircle2, ShieldAlert } from 'lucide-react';

export function MarketFitSection({ marketContext }) {
  const demandSignal = marketContext?.demand_trend || marketContext?.snapshot?.demandLevel || "High Demand / Growing";
  const competitionIntensity = marketContext?.competition_density || marketContext?.snapshot?.competitionIntensity || "Moderate";
  const opportunitySignal = marketContext?.snapshot?.opportunitySignal || "Favorable Local Demand Alignment";

  return (
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 2.4
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Market Fit & Alignment
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Synthesized from Stage 1 Market Intelligence outputs
          </p>
        </div>

        <span className="text-[10px] text-emerald-300/70 font-mono bg-[#071913] px-2.5 py-1 rounded-full border border-[#184f3c]">
          Task-3 Consumed
        </span>
      </div>

      {/* Synthesis Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
        
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
            <TrendingUp className="w-3.5 h-3.5 text-emerald-400" />
            <span>Demand Alignment</span>
          </div>
          <p className="text-sm font-bold text-white">{demandSignal}</p>
          <p className="text-[10px] text-emerald-200/60">
            Backed by regular rural household or commercial eatery consumption.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-1.5">
          <div className="flex items-center gap-1.5 text-amber-400 font-semibold text-[11px]">
            <Users className="w-3.5 h-3.5 text-amber-400" />
            <span>Competition Pressure</span>
          </div>
          <p className="text-sm font-bold text-amber-300">{competitionIntensity}</p>
          <p className="text-[10px] text-emerald-200/60">
            Fragmented local unorganized supply with quality differentiation scope.
          </p>
        </div>

        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-1.5">
          <div className="flex items-center gap-1.5 text-cyan-400 font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>Opportunity Signal</span>
          </div>
          <p className="text-sm font-bold text-cyan-300">{opportunitySignal}</p>
          <p className="text-[10px] text-emerald-200/60">
            Favorable rural market fit conditioned upon quality and transparent pricing.
          </p>
        </div>

      </div>

      <div className="p-3.5 rounded-xl bg-[#061d15] border border-[#1c5540] text-xs text-emerald-200/80">
        <p className="text-[11px] leading-relaxed">
          <strong className="text-white">Market Fit Takeaway: </strong>
          Favorable product relevance in the local catchment with differentiation potential over unorganized players. Rapid customer adoption depends on consistent batch quality and localized door-to-door sales relationships.
        </p>
      </div>

    </div>
  );
}
