import React from 'react';
import { Layers, CheckCircle2, TrendingUp, AlertCircle, Info } from 'lucide-react';

export function FeasibilityDimensionsGrid({ dimensions }) {
  if (!dimensions || dimensions.length === 0) return null;

  const getDimensionBadge = (level) => {
    switch (level?.toLowerCase()) {
      case 'strong':
      case 'controlled':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'moderate':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'needs attention':
        return 'bg-orange-950 text-orange-300 border-orange-800';
      default:
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
    }
  };

  return (
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 2.2
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Feasibility Dimensions Breakdown
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Normalized 0–100 evaluations across five critical enterprise operational pillars
          </p>
        </div>

        <span className="text-[10px] text-emerald-300/70 font-mono bg-[#071913] px-2.5 py-1 rounded-full border border-[#184f3c]">
          Explicit Input Derived
        </span>
      </div>

      {/* Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {dimensions.map((dim, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-3 flex flex-col justify-between"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{dim.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getDimensionBadge(dim.level)}`}>
                  {dim.level}
                </span>
              </div>

              {/* Score Bar */}
              <div className="space-y-1">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-emerald-300/70">Dimension Score:</span>
                  <span className="font-bold text-white">{dim.score}/100</span>
                </div>
                <div className="w-full bg-[#05140f] h-2 rounded-full overflow-hidden">
                  <div 
                    className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all" 
                    style={{ width: `${dim.score}%` }}
                  />
                </div>
              </div>

              <p className="text-emerald-100/80 leading-relaxed text-[11px] pt-1">
                {dim.summary}
              </p>
            </div>
          </div>
        ))}
      </div>

      <p className="text-[10px] text-emerald-300/50 italic">
        * Each dimension score is deterministically derived from capital adequacy, sector benchmarks, and rural infrastructure access.
      </p>

    </div>
  );
}
