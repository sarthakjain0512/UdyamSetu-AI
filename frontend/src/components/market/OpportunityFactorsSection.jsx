import React from 'react';
import { 
  Sparkles, CheckCircle2, TrendingUp, ShieldCheck, 
  MapPin, Landmark 
} from 'lucide-react';

export function OpportunityFactorsSection({ opportunityFactors, locationContext }) {
  return (
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 1.5
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Local Opportunity Factors
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Key regional enablers and localized tailwinds for enterprise sustainability
          </p>
        </div>

        <span className="text-[10px] text-emerald-300/70 font-mono bg-[#071913] px-2.5 py-1 rounded-full border border-[#184f3c]">
          Location & Category Driven
        </span>
      </div>

      {/* Factors Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {opportunityFactors && opportunityFactors.map((factor, idx) => (
          <div 
            key={idx} 
            className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2.5 text-xs flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="font-bold text-white text-xs">{factor.title}</span>
                <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {factor.status}
                </span>
              </div>
              <p className="text-emerald-100/80 leading-relaxed text-[11px]">
                {factor.description}
              </p>
            </div>
            
            <div className="flex items-center gap-1 text-[10px] text-emerald-400 font-semibold pt-1 border-t border-[#134232]">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>Tailwind Indicator</span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
