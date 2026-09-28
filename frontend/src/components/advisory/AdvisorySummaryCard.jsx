import React from 'react';
import { Compass, Sparkles, ShieldCheck, AlertCircle } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function AdvisorySummaryCard({ 
  executiveSummary, 
  advisoryStatus, 
  statusBadge, 
  profile 
}) {
  const getBadgeStyle = () => {
    switch (statusBadge) {
      case 'emerald':
        return 'bg-emerald-950 text-emerald-300 border-emerald-700';
      case 'rose':
        return 'bg-rose-950 text-rose-300 border-rose-700';
      case 'amber':
      default:
        return 'bg-amber-950 text-amber-300 border-amber-700';
    }
  };

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl relative overflow-hidden space-y-6">
      {/* Decorative ambient gradient */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 5.1
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Integrated Strategic Synthesis
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Your Business Advisory
          </h2>
          <p className="text-xs text-emerald-200/70">
            Actionable intelligence synthesized across market, operational feasibility, and SIH 26091 financing
          </p>
        </div>

        {/* Status Badge */}
        <div className="shrink-0">
          <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border shadow-sm ${getBadgeStyle()}`}>
            <ShieldCheck className="w-4 h-4" />
            <span>{advisoryStatus}</span>
          </span>
        </div>
      </div>

      {/* Executive Summary Narrative */}
      <div className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-300 uppercase tracking-wider">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Synthesis Statement</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-sans">
          {executiveSummary}
        </p>
      </div>

      {/* Quick Footprint Highlights */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-xl bg-[#071913]/80 border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase block">Enterprise Scope</span>
          <strong className="text-white text-xs block mt-0.5 truncate">{profile?.businessIdea || profile?.sectorName}</strong>
        </div>
        <div className="p-3 rounded-xl bg-[#071913]/80 border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase block">Project Sizing</span>
          <strong className="text-white font-mono text-xs block mt-0.5">{formatCurrencyINR(profile?.projectCost)}</strong>
        </div>
        <div className="p-3 rounded-xl bg-[#071913]/80 border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase block">Indicative Debt</span>
          <strong className="text-emerald-400 font-mono text-xs block mt-0.5">{formatCurrencyINR(profile?.loanAmount)}</strong>
        </div>
        <div className="p-3 rounded-xl bg-[#071913]/80 border border-[#154636]">
          <span className="text-[10px] text-emerald-300/60 uppercase block">Financing Path</span>
          <strong className="text-amber-300 text-xs block mt-0.5 truncate">{profile?.track}</strong>
        </div>
      </div>
    </div>
  );
}
