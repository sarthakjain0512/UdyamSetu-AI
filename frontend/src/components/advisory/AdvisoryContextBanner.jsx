import React from 'react';
import { MapPin, Briefcase, IndianRupee, Layers, FileText } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function AdvisoryContextBanner({ profile }) {
  if (!profile) return null;

  const {
    businessIdea,
    sectorName,
    locationDisplay,
    marginCapital,
    projectCost,
    track
  } = profile;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-7 border border-[#18533e] shadow-xl space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-950 border border-emerald-800 flex items-center justify-center text-emerald-400">
            <Layers className="w-4 h-4" />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300">
              Enterprise Advisory Context
            </span>
            <h3 className="text-base font-bold text-white">
              Profile & Financing Footprint
            </h3>
          </div>
        </div>

        <span className="text-[11px] font-semibold text-amber-300 bg-amber-950/80 px-3 py-1 rounded-full border border-amber-800 w-fit">
          Multi-Module Synthesis
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        {/* Location */}
        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636] space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-400/80 flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" /> Operational Area
          </span>
          <p className="text-white font-semibold text-xs truncate" title={locationDisplay}>
            {locationDisplay}
          </p>
          <span className="text-[10px] text-emerald-300/60 block">Target District</span>
        </div>

        {/* Category */}
        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636] space-y-1">
          <span className="text-[10px] uppercase font-bold text-emerald-400/80 flex items-center gap-1.5">
            <Briefcase className="w-3.5 h-3.5 text-emerald-400" /> Sector Category
          </span>
          <p className="text-white font-semibold text-xs truncate" title={sectorName}>
            {sectorName}
          </p>
          <span className="text-[10px] text-emerald-300/60 block">Rural Enterprise Sector</span>
        </div>

        {/* Margin Capital */}
        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636] space-y-1">
          <span className="text-[10px] uppercase font-bold text-amber-400/80 flex items-center gap-1.5">
            <IndianRupee className="w-3.5 h-3.5 text-amber-400" /> Committed Equity
          </span>
          <p className="text-white font-bold text-sm font-mono">
            {formatCurrencyINR(marginCapital)}
          </p>
          <span className="text-[10px] text-amber-300/60 block">Available Margin</span>
        </div>

        {/* Indicative Track */}
        <div className="p-3.5 rounded-2xl bg-[#071913] border border-[#154636] space-y-1">
          <span className="text-[10px] uppercase font-bold text-cyan-400/80 flex items-center gap-1.5">
            <FileText className="w-3.5 h-3.5 text-cyan-400" /> Sized Project Cost
          </span>
          <p className="text-white font-bold text-sm font-mono">
            {formatCurrencyINR(projectCost)}
          </p>
          <span className="text-[10px] text-cyan-300/60 block">{track}</span>
        </div>
      </div>

      {businessIdea && (
        <div className="p-3 rounded-xl bg-[#071913]/70 border border-[#154636]/60 text-xs text-emerald-200/80 flex items-center gap-2">
          <span className="text-[10px] font-bold uppercase text-emerald-400 shrink-0">Business Proposal:</span>
          <span className="truncate italic text-white/90 font-serif">"{businessIdea}"</span>
        </div>
      )}
    </div>
  );
}
