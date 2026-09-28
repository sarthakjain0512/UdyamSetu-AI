import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { TrendingUp, Users, ShoppingBag, AlertTriangle, Sparkles } from 'lucide-react';
import { useMarketIntelligence } from '../hooks/useMarketIntelligence';
import { useSectors } from '../hooks/useSectors';
import { MetricCard } from '../components/common/MetricCard';

export function MarketIntelligencePage() {
  const location = useLocation();
  const { sectors, districts } = useSectors();
  const { data, loading, runAnalysis } = useMarketIntelligence();

  const [sectorId, setSectorId] = useState(location.state?.sector_id || 'dairy-processing');
  const [districtId, setDistrictId] = useState(location.state?.district_id || 'varanasi-up');
  const [investment, setInvestment] = useState(location.state?.proposed_capital || 300000);

  useEffect(() => {
    runAnalysis({
      sector_id: sectorId,
      district_id: districtId,
      investment_amount: Number(investment)
    });
  }, [sectorId, districtId, investment]);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 mb-2">
            <TrendingUp className="w-3.5 h-3.5" /> Module 1: Market Intelligence Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Hyper-Local Market Analysis</h1>
          <p className="text-xs text-slate-400">Demographic demand index, competitor density & local pricing benchmarks</p>
        </div>

        {/* Dynamic Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sectorId}
            onChange={(e) => setSectorId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          >
            {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          >
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}, {d.state}</option>)}
          </select>
        </div>
      </div>

      {loading && (
        <div className="p-12 text-center text-slate-400 animate-pulse text-sm">
          Analyzing hyper-local mandi data & demographic buying patterns...
        </div>
      )}

      {data && !loading && (
        <>
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Demand Index Score"
              value={`${data.demand_index}/100`}
              subtitle={`Trend: ${data.demand_trend}`}
              icon={TrendingUp}
              color="cyan"
            />
            <MetricCard
              title="Raw Material Availability"
              value={data.raw_material_availability.split(' ')[0]}
              subtitle={data.raw_material_availability}
              icon={ShoppingBag}
              color="emerald"
            />
            <MetricCard
              title="Competition Density"
              value={data.competition_density}
              subtitle="Calculated for peri-urban cluster"
              icon={Users}
              color="amber"
            />
            <MetricCard
              title="Target Location"
              value={data.district_name.split(',')[0]}
              subtitle={data.district_name}
              icon={Sparkles}
              color="indigo"
            />
          </div>

          {/* Demographics & Competitors */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Target Demographics Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-cyan-400" /> Target Demographic Segments
              </h3>
              <div className="space-y-3">
                {data.target_demographics.map((demo, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{demo.segment}</span>
                      <span className="text-xs font-bold text-cyan-400 bg-cyan-950 px-2 py-0.5 rounded border border-cyan-800">
                        {demo.percentage}% Share
                      </span>
                    </div>
                    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                      <div className="bg-cyan-500 h-full" style={{ width: `${demo.percentage}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400">
                      <span>Buying Power: {demo.buying_power}</span>
                      <span>Key Needs: {demo.needs.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Benchmarks & Competitors */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-emerald-400" /> Local Pricing Benchmarks & Margins
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                    <tr>
                      <th className="p-3">Item Category</th>
                      <th className="p-3">Avg Price</th>
                      <th className="p-3">Unit</th>
                      <th className="p-3">Estimated Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60">
                    {data.pricing_benchmarks.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40">
                        <td className="p-3 font-semibold text-white">{item.item_category}</td>
                        <td className="p-3 text-emerald-400 font-bold">₹{item.local_avg_price}</td>
                        <td className="p-3 text-slate-400">/ {item.unit}</td>
                        <td className="p-3 text-cyan-400 font-semibold">{item.margin_pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Competitors Summary */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Competitor Analysis</h4>
                <div className="space-y-2">
                  {data.competitors.map((comp, idx) => (
                    <div key={idx} className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{comp.type}</span>
                        <span className="text-amber-400">Threat: {comp.threat_level} ({comp.market_share_est})</span>
                      </div>
                      <p className="text-slate-400">Opp: <span className="text-slate-200">{comp.differentiator_opportunity}</span></p>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </>
      )}

    </div>
  );
}
