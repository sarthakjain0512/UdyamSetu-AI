import React from 'react';
import { 
  Compass, MapPin, Building2, TrendingUp, Users, 
  Layers, CheckCircle2, AlertCircle, Info 
} from 'lucide-react';

export function MarketSnapshotCard({
  snapshot,
  locationName,
  locationTier,
  businessCategory,
  radiusKm,
  onRadiusChange
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-[#DDE5DD] shadow-sm space-y-5">
      
      {/* Title & Radius Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DD] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#14532D] font-mono bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Module 1.1
            </span>
            <h2 className="text-lg font-bold text-[#14532D] tracking-tight">
              Local Market Snapshot
            </h2>
          </div>
          <p className="text-xs text-[#647067] mt-0.5">
            Illustrative {radiusKm} km radius opportunity indicators around your selected location
          </p>
        </div>

        {/* Radius Selector Control */}
        <div className="flex items-center gap-1.5 bg-stone-50 p-1 rounded-xl border border-[#DDE5DD] text-xs">
          <span className="text-[11px] text-[#647067] px-2 font-medium">Catchment:</span>
          <button
            type="button"
            onClick={() => onRadiusChange(5)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              radiusKm === 5
                ? 'bg-[#14532D] text-white shadow-sm'
                : 'text-[#647067] hover:text-[#17211B] hover:bg-stone-200'
            }`}
          >
            5 km (Standard)
          </button>
          <button
            type="button"
            onClick={() => onRadiusChange(10)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              radiusKm === 10
                ? 'bg-[#14532D] text-white shadow-sm'
                : 'text-[#647067] hover:text-[#17211B] hover:bg-stone-200'
            }`}
          >
            10 km Cluster
          </button>
        </div>
      </div>

      {/* Snapshot Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Location & Tier */}
        <div className="bg-stone-50 p-4 rounded-xl border border-[#DDE5DD] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#647067]">
            <span className="flex items-center gap-1 font-medium">
              <MapPin className="w-3.5 h-3.5 text-[#0F766E]" /> Locality Catchment
            </span>
            <span className="text-[10px] text-[#14532D] font-mono font-bold">{radiusKm} km</span>
          </div>
          <p className="text-sm font-bold text-[#17211B]">{locationName}</p>
          <span className="inline-block text-[10px] text-[#14532D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-semibold">
            {locationTier || 'Rural Cluster'}
          </span>
        </div>

        {/* Metric 2: Indicative Demand Level */}
        <div className="bg-stone-50 p-4 rounded-xl border border-[#DDE5DD] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#647067]">
            <span className="flex items-center gap-1 font-medium">
              <TrendingUp className="w-3.5 h-3.5 text-[#16803C]" /> Demand Level
            </span>
            <span className="text-[10px] text-[#C87512] font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">Prototype</span>
          </div>
          <p className="text-sm font-bold text-[#16803C]">
            {snapshot?.demandLevel || 'High Demand'}
          </p>
          <p className="text-[10px] text-[#647067] leading-tight">
            Non-discretionary rural consumption pattern
          </p>
        </div>

        {/* Metric 3: Competition Intensity */}
        <div className="bg-stone-50 p-4 rounded-xl border border-[#DDE5DD] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#647067]">
            <span className="flex items-center gap-1 font-medium">
              <Users className="w-3.5 h-3.5 text-[#C87512]" /> Competition Intensity
            </span>
            <span className="text-[10px] text-[#C87512] font-semibold bg-amber-50 px-1.5 py-0.2 rounded border border-amber-200">Simulated</span>
          </div>
          <p className="text-sm font-bold text-[#C87512]">
            {snapshot?.competitionIntensity || 'Moderate'}
          </p>
          <p className="text-[10px] text-[#647067] leading-tight">
            Mainly unorganized vendors & distant brands
          </p>
        </div>

        {/* Metric 4: Overall Opportunity Level */}
        <div className="bg-stone-50 p-4 rounded-xl border border-[#DDE5DD] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#647067]">
            <span className="flex items-center gap-1 font-medium">
              <Compass className="w-3.5 h-3.5 text-[#0F766E]" /> Opportunity Level
            </span>
            <span className="text-[10px] text-[#14532D] font-semibold bg-emerald-50 px-1.5 py-0.2 rounded border border-emerald-200">Viable</span>
          </div>
          <p className="text-sm font-bold text-[#0F766E]">
            {snapshot?.opportunityLevel || 'Favorable'}
          </p>
          <p className="text-[10px] text-[#647067] leading-tight">
            {snapshot?.opportunitySignal || 'Good rural market viability'}
          </p>
        </div>

      </div>

      {/* Target Customer Segment Callout */}
      <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-[#14532D] shrink-0" />
          <span className="text-[#17211B]">
            <strong>Key Target Segments:</strong> {snapshot?.customerSegment || 'Village households & local retail shops'}
          </span>
        </div>
        <span className="text-[10px] text-[#C87512] font-semibold whitespace-nowrap bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
          Illustrative Prototype Assumption
        </span>
      </div>

    </div>
  );
}

export default MarketSnapshotCard;
