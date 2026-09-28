import React from 'react';
import { 
  Award, CheckCircle2, ShieldCheck, 
  HelpCircle, Info, BarChart3 
} from 'lucide-react';

export function ProductMarketValueSection({ productMarketValue }) {
  const dimensions = productMarketValue?.dimensions || [];
  const methodology = productMarketValue?.scoringMethodology || 
    'Evaluates rural consumer price sensitivity, purchase frequency, and value-add margin potential.';

  const getRatingBadge = (rating) => {
    switch (rating?.toLowerCase()) {
      case 'high':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'moderate':
      case 'moderate to high':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'low':
        return 'bg-slate-900 text-slate-300 border-slate-700';
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
              Module 1.4
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Product Market Value Analysis
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Multi-dimensional evaluation of product viability in rural and peri-urban markets
          </p>
        </div>

        <span className="text-[10px] text-emerald-300/70 font-mono bg-[#071913] px-2.5 py-1 rounded-full border border-[#184f3c]">
          Transparent Qualitative Model
        </span>
      </div>

      {/* Dimensions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {dimensions.map((dim, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{dim.name}</span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getRatingBadge(dim.rating)}`}>
                  {dim.rating}
                </span>
              </div>
              <p className="text-emerald-100/80 leading-relaxed text-[11px]">
                {dim.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Documented Methodology Box (Step 7) */}
      <div className="p-3.5 rounded-xl bg-[#061d15] border border-[#1c5540] text-xs text-emerald-200/80 space-y-1">
        <div className="flex items-center gap-1.5 font-semibold text-amber-300">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>Evaluation Methodology</span>
        </div>
        <p className="text-[11px] leading-relaxed">
          {methodology} Each dimension is evaluated on a 3-tier qualitative rubric (High, Moderate, Low) based on rural consumption elasticity and local input access rather than unexplainable automated scores.
        </p>
      </div>

    </div>
  );
}
