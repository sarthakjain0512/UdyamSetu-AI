import React from 'react';
import { 
  Building2, MapPin, IndianRupee, Layers, Briefcase, 
  User, CheckCircle2, AlertCircle 
} from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function BusinessOverviewCard({ overview }) {
  if (!overview) return null;

  const {
    idea,
    category,
    sectorName,
    locationDisplay,
    blockOrLocality,
    tier,
    marginCapital,
    projectCost,
    loanAmount,
    financingTrack,
    entrepreneur
  } = overview;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl relative overflow-hidden space-y-6">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.1
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Operational Profile
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Business Overview
          </h2>
          <p className="text-xs text-emerald-200/70">
            Synthesized baseline parameters derived from active session intake and financial structuring
          </p>
        </div>

        {/* Category Badge */}
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold bg-[#071913] text-emerald-300 border border-[#18533e]">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" />
            <span>{category}</span>
          </span>
        </div>
      </div>

      {/* Core Profile Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        
        {/* 1. Business Concept */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Building2 className="w-3.5 h-3.5 text-amber-400" /> Business Concept
          </span>
          <p className="text-sm font-semibold text-white leading-snug">
            {idea || 'Concept definition in progress'}
          </p>
          <p className="text-[11px] text-emerald-300/80">
            Sector: {sectorName}
          </p>
        </div>

        {/* 2. Target Location */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Target Location
          </span>
          <p className="text-sm font-semibold text-white leading-snug">
            {locationDisplay}
          </p>
          <p className="text-[11px] text-emerald-300/80">
            {blockOrLocality ? `${blockOrLocality} • ` : ''}{tier || 'Rural Cluster'}
          </p>
        </div>

        {/* 3. Promoter Equity */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-amber-400" /> Margin Capital (Equity)
          </span>
          <p className="text-lg font-black text-amber-400">
            {marginCapital ? formatCurrencyINR(marginCapital) : (
              <span className="text-xs font-normal text-slate-400">Not available from current analysis</span>
            )}
          </p>
          <p className="text-[11px] text-slate-400">
            Committed 10% promoter contribution
          </p>
        </div>

        {/* 4. Total Project Cost */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-cyan-400" /> Estimated Project Cost
          </span>
          <p className="text-lg font-black text-cyan-300">
            {projectCost ? formatCurrencyINR(projectCost) : (
              <span className="text-xs font-normal text-slate-400">Not available from current analysis</span>
            )}
          </p>
          <p className="text-[11px] text-slate-400">
            {projectCost ? 'Sized via 90/10 SIH financing framework' : 'Requires margin capital input'}
          </p>
        </div>

        {/* 5. Indicative Debt Requirement */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Indicative Loan Requirement
          </span>
          <p className="text-lg font-black text-emerald-300">
            {loanAmount ? formatCurrencyINR(loanAmount) : (
              <span className="text-xs font-normal text-slate-400">Not available from current analysis</span>
            )}
          </p>
          <p className="text-[11px] text-slate-400">
            {loanAmount ? '90% indicative debt allocation' : 'Requires project cost sizing'}
          </p>
        </div>

        {/* 6. Financing Track */}
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-1.5">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-orange-400" /> Prototype Financing Track
          </span>
          <p className="text-sm font-bold text-orange-300 leading-snug">
            {financingTrack || 'Not available from current analysis'}
          </p>
          <p className="text-[11px] text-slate-400">
            {financingTrack ? 'Subject to official bank verification' : 'Requires scheme routing'}
          </p>
        </div>

      </div>

      {/* Entrepreneur Context Bar (if available) */}
      {entrepreneur && (entrepreneur.name || entrepreneur.socialCategory) && (
        <div className="p-3.5 rounded-xl bg-[#071913]/60 border border-[#18533e]/60 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-slate-300">
            <User className="w-4 h-4 text-emerald-400" />
            <span className="font-semibold text-white">{entrepreneur.name || 'Micro-Entrepreneur'}</span>
            {entrepreneur.socialCategory && (
              <span className="px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-300 uppercase text-[10px] font-bold border border-emerald-800/60">
                {entrepreneur.socialCategory}
              </span>
            )}
            {entrepreneur.gender && entrepreneur.gender !== 'general' && (
              <span className="px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 capitalize text-[10px] font-bold border border-amber-800/60">
                {entrepreneur.gender}
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 italic">
            Location Tier: {tier || 'Rural Cluster'}
          </span>
        </div>
      )}
    </div>
  );
}
