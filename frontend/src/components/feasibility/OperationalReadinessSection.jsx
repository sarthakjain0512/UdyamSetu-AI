import React from 'react';
import { 
  Wrench, Truck, Users, Droplets, Zap, 
  CheckCircle2, AlertCircle, Info, ShieldCheck 
} from 'lucide-react';

export function OperationalReadinessSection({ operationalReadiness, sectorName }) {
  if (!operationalReadiness) return null;

  const factors = [
    {
      title: "Raw Material Access",
      rating: operationalReadiness.rawMaterialAccess?.rating,
      detail: operationalReadiness.rawMaterialAccess?.detail,
      icon: Droplets
    },
    {
      title: "Machinery & Equipment Requirement",
      rating: operationalReadiness.equipmentRequirement?.rating,
      detail: operationalReadiness.equipmentRequirement?.detail,
      icon: Wrench
    },
    {
      title: "Skill & Workforce Readiness",
      rating: operationalReadiness.skillRequirement?.rating,
      detail: operationalReadiness.skillRequirement?.detail,
      icon: Users
    },
    {
      title: "Site & Utility Infrastructure",
      rating: operationalReadiness.infrastructureRequirement?.rating,
      detail: operationalReadiness.infrastructureRequirement?.detail,
      icon: Zap
    },
    {
      title: "Supply Chain & Inbound Logistics",
      rating: operationalReadiness.supplyChainComplexity?.rating,
      detail: operationalReadiness.supplyChainComplexity?.detail,
      icon: Truck
    },
    {
      title: "Distribution & Channel Reach",
      rating: operationalReadiness.distributionComplexity?.rating,
      detail: operationalReadiness.distributionComplexity?.detail,
      icon: ShieldCheck
    }
  ];

  const getBadgeStyle = (rating) => {
    switch (rating?.toLowerCase()) {
      case 'high':
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
      case 'moderate':
      case 'low to moderate':
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
              Module 2.3
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Operational Readiness Assessment
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Practical supply, equipment, and workforce considerations for {sectorName}
          </p>
        </div>

        <span className="text-[10px] text-emerald-300/70 font-mono bg-[#071913] px-2.5 py-1 rounded-full border border-[#184f3c]">
          Qualitative Operational Parameters
        </span>
      </div>

      {/* Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
        {factors.map((f, idx) => {
          const Icon = f.icon;
          return (
            <div 
              key={idx} 
              className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2.5 flex flex-col justify-between"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 font-bold text-white text-xs">
                    <Icon className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{f.title}</span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${getBadgeStyle(f.rating)}`}>
                    {f.rating}
                  </span>
                </div>
                <p className="text-emerald-100/80 leading-relaxed text-[11px] pt-1">
                  {f.detail}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Non-verified suppliers disclosure (Step 8) */}
      <div className="p-3 rounded-xl bg-[#061d15] border border-[#1c5540] text-[11px] text-emerald-200/70 space-y-1">
        <p>
          <strong className="text-emerald-300">Operational Notice: </strong>
          Operational factors are derived from standardized MSME project profiles. Specific local vendors, utility tariffs, and machinery suppliers must be verified on-site during field preparation.
        </p>
      </div>

    </div>
  );
}
