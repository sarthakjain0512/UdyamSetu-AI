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
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Title & Radius Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 1.1
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Local Market Snapshot
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Illustrative {radiusKm} km radius opportunity indicators around your selected location
          </p>
        </div>

        {/* Radius Selector Control (Step 4 & 17) */}
        <div className="flex items-center gap-1.5 bg-[#071913] p-1 rounded-xl border border-[#1a4f3b] text-xs">
          <span className="text-[11px] text-emerald-300/70 px-2 font-medium">Radius:</span>
          <button
            type="button"
            onClick={() => onRadiusChange(5)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              radiusKm === 5
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-300/70 hover:text-white hover:bg-emerald-900/50'
            }`}
          >
            5 km (Default)
          </button>
          <button
            type="button"
            onClick={() => onRadiusChange(10)}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-all ${
              radiusKm === 10
                ? 'bg-emerald-700 text-white shadow-sm'
                : 'text-emerald-300/70 hover:text-white hover:bg-emerald-900/50'
            }`}
          >
            10 km Cluster
          </button>
        </div>
      </div>

      {/* Snapshot Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Metric 1: Location & Tier */}
        <div className="bg-[#071913] p-4 rounded-xl border border-[#154636] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-300/70">
            <span className="flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-rose-400" /> Locality Catchment
            </span>
            <span className="text-[10px] text-emerald-400 font-mono">{radiusKm} km</span>
          </div>
          <p className="text-sm font-bold text-white">{locationName}</p>
          <span className="inline-block text-[10px] text-emerald-300/80 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
            {locationTier || 'Rural Cluster'}
          </span>
        </div>

        {/* Metric 2: Indicative Demand Level */}
        <div className="bg-[#071913] p-4 rounded-xl border border-[#154636] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-300/70">
            <span className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Demand Level
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Illustrative</span>
          </div>
          <p className="text-sm font-bold text-emerald-300">
            {snapshot?.demandLevel || 'High Demand'}
          </p>
          <p className="text-[10px] text-emerald-200/60 leading-tight">
            Non-discretionary rural consumption pattern
          </p>
        </div>

        {/* Metric 3: Competition Intensity */}
        <div className="bg-[#071913] p-4 rounded-xl border border-[#154636] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-300/70">
            <span className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5 text-amber-400" /> Competition Intensity
            </span>
            <span className="text-[10px] text-amber-400 font-mono">Simulated</span>
          </div>
          <p className="text-sm font-bold text-amber-300">
            {snapshot?.competitionIntensity || 'Moderate'}
          </p>
          <p className="text-[10px] text-emerald-200/60 leading-tight">
            Mainly unorganized vendors & distant brands
          </p>
        </div>

        {/* Metric 4: Overall Opportunity Level */}
        <div className="bg-[#071913] p-4 rounded-xl border border-[#154636] space-y-1.5">
          <div className="flex items-center justify-between text-xs text-emerald-300/70">
            <span className="flex items-center gap-1">
              <Compass className="w-3.5 h-3.5 text-cyan-400" /> Opportunity Level
            </span>
            <span className="text-[10px] text-emerald-300 font-mono">Viable</span>
          </div>
          <p className="text-sm font-bold text-cyan-300">
            {snapshot?.opportunityLevel || 'Favorable'}
          </p>
          <p className="text-[10px] text-emerald-200/60 leading-tight">
            {snapshot?.opportunitySignal || 'Good rural market viability'}
          </p>
        </div>

      </div>

      {/* Target Customer Segment Callout */}
      <div className="p-3.5 rounded-xl bg-[#061d15] border border-[#1c5540] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
        <div className="flex items-center gap-2">
          <Users className="w-4 h-4 text-emerald-400 flex-shrink-0" />
          <span className="text-emerald-100/80">
            <strong>Key Target Segments:</strong> {snapshot?.customerSegment || 'Village households & local retail shops'}
          </span>
        </div>
        <span className="text-[10px] text-amber-300/80 font-mono whitespace-nowrap bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
          Prototype Demo Radius
        </span>
      </div>

    </div>
  );
}
