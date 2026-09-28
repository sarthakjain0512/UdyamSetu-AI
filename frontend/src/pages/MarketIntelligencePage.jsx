import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  TrendingUp, Users, ShoppingBag, AlertTriangle, Sparkles, 
  Compass, ArrowRight, MapPin, Building2, IndianRupee, Edit3 
} from 'lucide-react';
import { useMarketIntelligence } from '../hooks/useMarketIntelligence';
import { useSectors } from '../hooks/useSectors';
import { MetricCard } from '../components/common/MetricCard';
import { getAnalysisSession } from '../services/sessionService';
import { formatCurrencyINR } from '../utils/formatters';

export function MarketIntelligencePage() {
  const location = useLocation();
  const { sectors, districts } = useSectors();
  const { data, loading, runAnalysis } = useMarketIntelligence();

  // Resolve active session from navigation state OR persistent sessionService
  const activeSession = useMemo(() => {
    if (location.state?.session) return location.state.session;
    return getAnalysisSession();
  }, [location.state]);

  // Session guard: Is there a valid analysis session?
  const hasValidSession = Boolean(
    activeSession || 
    (location.state?.sector_id && location.state?.district_id)
  );

  const initialSectorId = activeSession?.business?.sectorId === 'other'
    ? 'dairy-processing'
    : (activeSession?.business?.sectorId || location.state?.sector_id || '');

  const initialDistrictId = activeSession?.location?.districtId || location.state?.district_id || '';
  const initialInvestment = activeSession?.finance?.marginCapital || location.state?.proposed_capital || 0;

  const [sectorId, setSectorId] = useState(initialSectorId);
  const [districtId, setDistrictId] = useState(initialDistrictId);
  const [investment, setInvestment] = useState(initialInvestment);

  // Sync state if session loads/updates
  useEffect(() => {
    if (hasValidSession) {
      const sId = activeSession?.business?.sectorId === 'other' 
        ? 'dairy-processing' 
        : (activeSession?.business?.sectorId || location.state?.sector_id || 'dairy-processing');
      const dId = activeSession?.location?.districtId || location.state?.district_id || 'varanasi-up';
      const inv = activeSession?.finance?.marginCapital || location.state?.proposed_capital || 300000;

      setSectorId(sId);
      setDistrictId(dId);
      setInvestment(inv);

      runAnalysis({
        sector_id: sId,
        district_id: dId,
        investment_amount: Number(inv)
      });
    }
  }, [hasValidSession, activeSession, location.state]);

  // Trigger re-analysis when sector or district dropdown is toggled
  const handleSectorChange = (e) => {
    const newSector = e.target.value;
    setSectorId(newSector);
    if (districtId) {
      runAnalysis({
        sector_id: newSector,
        district_id: districtId,
        investment_amount: Number(investment)
      });
    }
  };

  const handleDistrictChange = (e) => {
    const newDistrict = e.target.value;
    setDistrictId(newDistrict);
    if (sectorId) {
      runAnalysis({
        sector_id: sectorId,
        district_id: newDistrict,
        investment_amount: Number(investment)
      });
    }
  };

  // STEP 13 GUARD: Empty state when no analysis session exists
  if (!hasValidSession) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        
        {/* Guard Notice Card */}
        <div className="bg-[#0c241b] rounded-3xl p-8 sm:p-12 border border-[#18533e] text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
              Session Required
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Start a business analysis first
            </h1>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Hyper-local market intelligence requires a defined enterprise location, margin capital, and venture category to analyze mandi pricing, competition density, and local buying patterns.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/new-analysis"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-sm shadow-xl shadow-orange-950/40 transition-all transform hover:-translate-y-0.5"
            >
              <span>Create New Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Sizing Framework Explanatory Notice */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-left pt-6 border-t border-[#144233] text-xs">
            <div className="p-3 rounded-xl bg-[#071913] border border-[#134232]">
              <span className="text-[10px] text-amber-400 font-mono block">1. Location</span>
              <p className="text-emerald-100/80 mt-1">District, State & rural tier to assess mandi benchmarks</p>
            </div>
            <div className="p-3 rounded-xl bg-[#071913] border border-[#134232]">
              <span className="text-[10px] text-amber-400 font-mono block">2. Category / Idea</span>
              <p className="text-emerald-100/80 mt-1">Standardized sector or custom rural enterprise idea</p>
            </div>
            <div className="p-3 rounded-xl bg-[#071913] border border-[#134232]">
              <span className="text-[10px] text-amber-400 font-mono block">3. Margin Capital</span>
              <p className="text-emerald-100/80 mt-1">Own equity to project total project cost and debt sizing</p>
            </div>
          </div>

        </div>

      </div>
    );
  }

  // Active Analysis Session UI
  return (
    <div className="space-y-8">
      
      {/* Active Session Context Bar */}
      {activeSession && (
        <div className="bg-[#0b291e] border border-[#185540] rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-3">
            <span className="font-bold text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4" /> Active Analysis Session:
            </span>
            <span className="text-white font-semibold">
              {activeSession.business?.idea || activeSession.business?.sectorName}
            </span>
            <span className="text-emerald-300/60">•</span>
            <span className="text-emerald-200">
              {activeSession.location?.district}, {activeSession.location?.state}
            </span>
            <span className="text-emerald-300/60">•</span>
            <span className="text-emerald-300 font-mono font-medium">
              Margin: {formatCurrencyINR(activeSession.finance?.marginCapital)}
            </span>
          </div>

          <Link
            to="/new-analysis"
            className="inline-flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-semibold transition-colors"
          >
            <Edit3 className="w-3.5 h-3.5" />
            <span>Edit Intake Inputs</span>
          </Link>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#144233] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" /> Module 1: Market Intelligence Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Hyper-Local Market Analysis</h1>
          <p className="text-xs text-emerald-100/70">Demographic demand index, competitor density & local pricing benchmarks</p>
        </div>

        {/* Dynamic Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sectorId}
            onChange={handleSectorChange}
            className="px-3 py-2 rounded-xl bg-[#071913] border border-[#1d5c46] text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select
            value={districtId}
            onChange={handleDistrictChange}
            className="px-3 py-2 rounded-xl bg-[#071913] border border-[#1d5c46] text-xs text-white focus:outline-none focus:border-emerald-400"
          >
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}, {d.state}</option>)}
          </select>
        </div>
      </div>

      {loading && (
        <div className="p-12 text-center text-emerald-200/70 animate-pulse text-sm">
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
              subtitle="Calculated for rural/peri-urban cluster"
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
            <div className="bg-[#0c241b] p-6 rounded-2xl border border-[#18533e] space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-400" /> Target Demographic Segments
              </h3>
              <div className="space-y-3">
                {data.target_demographics.map((demo, idx) => (
                  <div key={idx} className="bg-[#071913] p-4 rounded-xl border border-[#154636] space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-white">{demo.segment}</span>
                      <span className="text-xs font-bold text-emerald-300 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                        {demo.percentage}% Share
                      </span>
                    </div>
                    <div className="w-full bg-[#05140f] h-2 rounded-full overflow-hidden">
                      <div className="bg-emerald-500 h-full" style={{ width: `${demo.percentage}%` }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-emerald-200/70">
                      <span>Buying Power: {demo.buying_power}</span>
                      <span>Key Needs: {demo.needs.join(', ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Benchmarks & Competitors */}
            <div className="bg-[#0c241b] p-6 rounded-2xl border border-[#18533e] space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShoppingBag className="w-4 h-4 text-amber-400" /> Local Pricing Benchmarks & Margins
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs text-emerald-100/90">
                  <thead className="bg-[#071913] text-emerald-300/70 border-b border-[#154636]">
                    <tr>
                      <th className="p-3">Item Category</th>
                      <th className="p-3">Avg Price</th>
                      <th className="p-3">Unit</th>
                      <th className="p-3">Estimated Margin</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#154636]">
                    {data.pricing_benchmarks.map((item, idx) => (
                      <tr key={idx} className="hover:bg-[#071913]/60">
                        <td className="p-3 font-semibold text-white">{item.item_category}</td>
                        <td className="p-3 text-emerald-400 font-bold">₹{item.local_avg_price}</td>
                        <td className="p-3 text-emerald-300/70">/ {item.unit}</td>
                        <td className="p-3 text-amber-400 font-semibold">{item.margin_pct}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Competitors Summary */}
              <div className="pt-2">
                <h4 className="text-xs font-bold text-emerald-300/70 uppercase tracking-wider mb-2">Competitor Analysis</h4>
                <div className="space-y-2">
                  {data.competitors.map((comp, idx) => (
                    <div key={idx} className="bg-[#071913] p-3 rounded-xl border border-[#154636] text-xs space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-white">{comp.type}</span>
                        <span className="text-amber-400 font-medium">Threat: {comp.threat_level} ({comp.market_share_est})</span>
                      </div>
                      <p className="text-emerald-200/70">Opp: <span className="text-emerald-100">{comp.differentiator_opportunity}</span></p>
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
