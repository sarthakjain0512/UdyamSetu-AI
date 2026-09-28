import React from 'react';
import { ShieldCheck, Award, AlertCircle, CheckCircle2, Clock, Landmark } from 'lucide-react';

export function FeasibilityOverviewCard({
  overallScore,
  status,
  grade,
  statusColor,
  sectorName,
  districtName
}) {
  const getStatusBadge = () => {
    switch (statusColor) {
      case 'emerald':
        return 'bg-emerald-950 text-emerald-300 border-emerald-700/80';
      case 'amber':
        return 'bg-amber-950 text-amber-300 border-amber-700/80';
      case 'orange':
        return 'bg-orange-950 text-orange-300 border-orange-700/80';
      case 'rose':
        return 'bg-rose-950 text-rose-300 border-rose-700/80';
      default:
        return 'bg-emerald-950 text-emerald-300 border-emerald-700/80';
    }
  };

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Top Badge & Section Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 2.1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Feasibility Overview
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Operational viability, financial adequacy, and risk profile for {sectorName} in {districtName}
          </p>
        </div>

        <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full border self-start sm:self-auto ${getStatusBadge()}`}>
          {status}
        </span>
      </div>

      {/* Main Score & Grade Hero Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        
        {/* Score Ring Display */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-emerald-950 flex flex-col items-center justify-center border border-emerald-700/60 flex-shrink-0">
            <span className="text-2xl font-black text-white font-mono">{overallScore}</span>
            <span className="text-[9px] text-emerald-300/70 uppercase tracking-wider font-semibold">/100</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-emerald-300/70 uppercase tracking-wider font-semibold block">
              Feasibility Score
            </span>
            <p className="text-xs font-bold text-white leading-snug">{grade}</p>
            <p className="text-[10px] text-emerald-200/60">Weighted across 5 operational dimensions</p>
          </div>
        </div>

        {/* Status Assessment Narrative */}
        <div className="md:col-span-2 p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-2 text-xs">
          <span className="text-[10px] text-amber-400 uppercase tracking-wider font-bold block">
            Executive Feasibility Summary
          </span>
          <p className="text-emerald-100/90 leading-relaxed text-xs">
            {overallScore >= 80 
              ? "The enterprise demonstrates strong operational viability with adequate margin capital for rural credit schemes (PMEGP/Mudra). Raw material access and local demand fundamentals are favorable."
              : "The venture exhibits promising local demand; however, thorough local customer validation and careful working capital allocation are recommended before committing major capital."}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-semibold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              Deterministic Scoring
            </span>
            <span className="text-[10px] font-semibold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              Prototype Evaluation Model
            </span>
          </div>
        </div>

      </div>

      {/* Mandatory Non-Guarantee Disclaimer (Step 0 & 20) */}
      <div className="p-3.5 rounded-xl bg-[#061d15] border border-[#1c5540] text-xs text-emerald-200/80 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="text-amber-300">Prototype Feasibility Assessment: </strong>
          Results are illustrative prototype indicators based on the information entered and benchmark rural models. They do not constitute a bank credit sanction, guaranteed business success, or an official government appraisal.
        </p>
      </div>

    </div>
  );
}
