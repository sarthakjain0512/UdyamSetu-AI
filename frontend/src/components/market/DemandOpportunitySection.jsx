import React from 'react';
import { 
  TrendingUp, RefreshCw, ShoppingCart, Calendar, 
  MapPin, Users, CheckCircle2, AlertCircle 
} from 'lucide-react';

export function DemandOpportunitySection({ demandDetails, demographics, radiusKm }) {
  const radiusNote = radiusKm === 10 
    ? demandDetails?.indicativeRadius10km 
    : demandDetails?.indicativeRadius5km;

  return (
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Section Header */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 1.2
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Demand Opportunity Indicators
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Qualitative demand patterns and customer consumption frequencies
          </p>
        </div>
        <span className="text-[10px] text-emerald-300/70 font-mono bg-[#071913] px-2.5 py-1 rounded-full border border-[#184f3c]">
          Illustrative Prototype Indicators
        </span>
      </div>

      {/* Qualitative Indicator Grid (Step 5) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
        
        {/* 1. Demand Level */}
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2">
          <div className="flex items-center justify-between text-emerald-300/70">
            <span className="font-semibold flex items-center gap-1.5">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Demand Level
            </span>
            <span className="text-[10px] font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
              {demandDetails?.demandLevel || 'High'}
            </span>
          </div>
          <p className="text-emerald-100/90 text-xs font-medium leading-relaxed">
            {demandDetails?.customerNeedSignal || 'Essential consumption with regular rural buying.'}
          </p>
        </div>

        {/* 2. Repeat-Purchase Potential */}
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2">
          <div className="flex items-center justify-between text-emerald-300/70">
            <span className="font-semibold flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 text-cyan-400" /> Repeat Potential
            </span>
            <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
              High Frequency
            </span>
          </div>
          <p className="text-emerald-100/90 text-xs font-medium leading-relaxed">
            {demandDetails?.repeatPurchasePotential || 'Recurring weekly or monthly replenishment cycles.'}
          </p>
        </div>

        {/* 3. Local Accessibility */}
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2">
          <div className="flex items-center justify-between text-emerald-300/70">
            <span className="font-semibold flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-amber-400" /> Local Accessibility
            </span>
            <span className="text-[10px] font-bold text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
              Direct & Haats
            </span>
          </div>
          <p className="text-emerald-100/90 text-xs font-medium leading-relaxed">
            {demandDetails?.localAccessibility || 'Accessible through local village shops and bi-weekly bazaars.'}
          </p>
        </div>

        {/* 4. Seasonal Sensitivity */}
        <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] space-y-2">
          <div className="flex items-center justify-between text-emerald-300/70">
            <span className="font-semibold flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5 text-purple-400" /> Seasonal Sensitivity
            </span>
            <span className="text-[10px] font-bold text-purple-300 bg-purple-950 px-2 py-0.5 rounded border border-purple-800">
              Moderate
            </span>
          </div>
          <p className="text-emerald-100/90 text-xs font-medium leading-relaxed">
            {demandDetails?.seasonalSensitivity || 'Baseline year-round demand with festival spikes.'}
          </p>
        </div>

      </div>

      {/* Catchment Radius Context */}
      {radiusNote && (
        <div className="p-3.5 rounded-xl bg-[#061d15] border border-[#1c5540] text-xs text-emerald-200/80 flex items-start gap-2.5">
          <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
          <div>
            <strong className="text-white font-semibold">Serviceable Catchment ({radiusKm} km): </strong>
            <span>{radiusNote}</span>
          </div>
        </div>
      )}

      {/* Target Demographic Segments Distribution (from Prototype Data) */}
      {demographics && demographics.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider flex items-center gap-2">
            <Users className="w-4 h-4 text-emerald-400" />
            Indicative Buyer Segments Distribution
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {demographics.map((demo, idx) => (
              <div key={idx} className="bg-[#071913] p-3.5 rounded-xl border border-[#144233] space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white truncate">{demo.segment}</span>
                  <span className="text-[11px] font-bold text-amber-300 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 font-mono">
                    ~{demo.percentage}%
                  </span>
                </div>
                
                <div className="w-full bg-[#05140f] h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${demo.percentage}%` }}></div>
                </div>

                <div className="text-[11px] text-emerald-200/70 space-y-0.5">
                  <p>Buying Power: <strong className="text-white">{demo.buying_power}</strong></p>
                  <p className="line-clamp-1">Needs: {demo.needs?.join(', ')}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-emerald-300/50 italic">
            * Buyer share percentages represent benchmark customer profiles for rural cluster prototyping.
          </p>
        </div>
      )}

    </div>
  );
}
