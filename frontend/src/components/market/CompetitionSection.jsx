import React from 'react';
import { 
  Users, ShieldAlert, Sparkles, CheckCircle2, 
  HelpCircle, AlertCircle, ArrowUpRight 
} from 'lucide-react';

export function CompetitionSection({ competitors, competitionDensity, pricingBenchmarks }) {
  return (
    <div className="bg-[#0c241b] rounded-2xl p-6 border border-[#18533e] shadow-xl space-y-6">
      
      {/* Header */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 1.3
            </span>
            <h2 className="text-lg font-bold text-white tracking-tight">
              Competition Landscape
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-0.5">
            Illustrative competitor distribution & differentiation angles
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-emerald-200/80">Market Intensity:</span>
          <span className="text-xs font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full border border-amber-500/30">
            {competitionDensity || 'Moderate'}
          </span>
        </div>
      </div>

      {/* Mandatory Non-Live Disclaimer (Step 6) */}
      <div className="p-3.5 rounded-xl bg-[#071d15] border border-[#1b5540] text-xs text-emerald-200/80 flex items-start gap-2.5">
        <AlertCircle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
        <div>
          <strong className="text-amber-300">Illustrative Competitor Landscape (Demo Estimate): </strong>
          <span>
            This prototype models standard rural competitor segments rather than querying real-time live business directories.
          </span>
        </div>
      </div>

      {/* Competitor Archetypes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {competitors && competitors.map((comp, idx) => {
          const isHighThreat = comp.threat_level?.toLowerCase().includes('high');
          return (
            <div 
              key={idx} 
              className="bg-[#071913] rounded-xl p-4 border border-[#154636] space-y-3 text-xs flex flex-col justify-between"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <h3 className="font-bold text-white text-sm">{comp.type}</h3>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                    isHighThreat 
                      ? 'bg-rose-950 text-rose-300 border-rose-800' 
                      : 'bg-amber-950 text-amber-300 border-amber-800'
                  }`}>
                    Threat: {comp.threat_level}
                  </span>
                </div>

                <div className="text-[11px] text-emerald-200/70 space-y-1">
                  <p>
                    Estimated Volume Share: <strong className="text-white font-mono">{comp.market_share_est}</strong>
                  </p>
                  <p>
                    Competitive Pressure: <strong className="text-emerald-300">
                      {isHighThreat ? 'High Brand Awareness' : 'Price Sensitive / Informal'}
                    </strong>
                  </p>
                </div>
              </div>

              {/* Differentiation Angle */}
              <div className="p-3 rounded-lg bg-[#05140f] border border-[#123d2e] space-y-1">
                <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-[11px]">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Strategic Opportunity to Differentiate</span>
                </div>
                <p className="text-emerald-100/90 text-[11px] leading-relaxed">
                  {comp.differentiator_opportunity}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Local Pricing Benchmarks & Margins Table */}
      {pricingBenchmarks && pricingBenchmarks.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-xs font-bold text-emerald-300 uppercase tracking-wider">
            Representative Local Price Benchmarks & Operating Margins
          </h3>
          <div className="overflow-x-auto rounded-xl border border-[#154636]">
            <table className="w-full text-left text-xs text-emerald-100/90">
              <thead className="bg-[#071913] text-emerald-300/70 border-b border-[#154636]">
                <tr>
                  <th className="p-3">Output Product</th>
                  <th className="p-3">Avg Benchmark Price</th>
                  <th className="p-3">Unit</th>
                  <th className="p-3">Est. Gross Margin</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#154636] bg-[#061912]">
                {pricingBenchmarks.map((item, idx) => (
                  <tr key={idx} className="hover:bg-[#082017]">
                    <td className="p-3 font-semibold text-white">{item.item_category}</td>
                    <td className="p-3 text-emerald-400 font-bold font-mono">₹{item.local_avg_price}</td>
                    <td className="p-3 text-emerald-300/70">/ {item.unit}</td>
                    <td className="p-3 text-amber-400 font-bold font-mono">{item.margin_pct}%</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-[10px] text-emerald-300/50 italic">
            * Mandi prices and margins are representative regional benchmarks for feasibility estimation.
          </p>
        </div>
      )}

    </div>
  );
}
