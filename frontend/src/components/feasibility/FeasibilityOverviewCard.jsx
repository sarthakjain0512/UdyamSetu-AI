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
        return 'bg-emerald-50 text-[#16803C] border-emerald-300';
      case 'amber':
        return 'bg-amber-50 text-[#C87512] border-amber-300';
      case 'orange':
        return 'bg-orange-50 text-[#C87512] border-orange-300';
      case 'rose':
        return 'bg-red-50 text-[#C2413A] border-red-300';
      default:
        return 'bg-emerald-50 text-[#16803C] border-emerald-300';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDE5DD] shadow-sm space-y-5">
      
      {/* Top Badge & Section Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DD] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#14532D] font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Module 2.1
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-[#14532D] tracking-tight">
              Feasibility Overview
            </h2>
          </div>
          <p className="text-xs text-[#647067] mt-0.5">
            Operational viability, capital adequacy, and risk profile for {sectorName} in {districtName}
          </p>
        </div>

        <span className={`text-xs font-bold px-3.5 py-1.5 rounded-full border self-start sm:self-auto ${getStatusBadge()}`}>
          {status}
        </span>
      </div>

      {/* Main Score & Grade Hero Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-center">
        
        {/* Score Ring Display */}
        <div className="p-4 rounded-xl bg-stone-50 border border-[#DDE5DD] flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-emerald-50 flex flex-col items-center justify-center border border-emerald-200 flex-shrink-0">
            <span className="text-2xl font-black text-[#14532D] font-mono">{overallScore}</span>
            <span className="text-[9px] text-[#0F766E] uppercase tracking-wider font-bold">/100</span>
          </div>
          <div className="space-y-1">
            <span className="text-[10px] text-[#647067] uppercase tracking-wider font-semibold block">
              Feasibility Score
            </span>
            <p className="text-sm font-bold text-[#17211B] leading-snug">Grade {grade}</p>
            <p className="text-[10px] text-[#647067]">Weighted across 5 operational dimensions</p>
          </div>
        </div>

        {/* Status Assessment Narrative */}
        <div className="md:col-span-2 p-4 rounded-xl bg-stone-50 border border-[#DDE5DD] space-y-2 text-xs">
          <span className="text-[10px] text-[#C87512] uppercase tracking-wider font-bold block">
            Executive Feasibility Summary
          </span>
          <p className="text-[#17211B] leading-relaxed text-xs">
            {overallScore >= 80 
              ? "The enterprise demonstrates strong operational viability with adequate margin capital for rural credit schemes (PMEGP/Mudra). Raw material access and local demand fundamentals are favorable."
              : "The venture exhibits promising local demand; however, thorough local customer validation and careful working capital allocation are recommended before committing major capital."}
          </p>
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="text-[10px] font-semibold text-[#14532D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Deterministic Scoring
            </span>
            <span className="text-[10px] font-semibold text-[#C87512] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              Prototype Evaluation Model
            </span>
          </div>
        </div>

      </div>

      {/* Mandatory Non-Guarantee Disclaimer */}
      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-[#C87512] flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-[#C87512] flex-shrink-0 mt-0.5" />
        <p className="text-[11px] leading-relaxed">
          <strong className="text-[#C87512]">Prototype Feasibility Assessment: </strong>
          Results are illustrative prototype indicators based on the information entered and benchmark rural models. They do not constitute a bank credit sanction, guaranteed business success, or an official government appraisal.
        </p>
      </div>

    </div>
  );
}

export default FeasibilityOverviewCard;
