import React, { useEffect, useState, useMemo } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { 
  TrendingUp, Compass, ArrowRight, MapPin, Building2, 
  IndianRupee, Edit3, AlertCircle, RefreshCw, Layers 
} from 'lucide-react';
import { useMarketIntelligence } from '../hooks/useMarketIntelligence';
import { useSectors } from '../hooks/useSectors';
import { getAnalysisSession } from '../services/sessionService';
import { formatCurrencyINR } from '../utils/formatters';

// Market UI Module Components
import { MarketSnapshotCard } from '../components/market/MarketSnapshotCard';
import { DemandOpportunitySection } from '../components/market/DemandOpportunitySection';
import { CompetitionSection } from '../components/market/CompetitionSection';
import { ProductMarketValueSection } from '../components/market/ProductMarketValueSection';
import { OpportunityFactorsSection } from '../components/market/OpportunityFactorsSection';
import { SWOTSection } from '../components/market/SWOTSection';
import { MarketThreatsSection } from '../components/market/MarketThreatsSection';
import { MarketInsightSummary } from '../components/market/MarketInsightSummary';
import { DataMethodologyPanel } from '../components/market/DataMethodologyPanel';
import WorkflowProgressTracker from '../components/common/WorkflowProgressTracker';
import StaleAnalysisAlert from '../components/common/StaleAnalysisAlert';
import { useAnalysisState } from '../hooks/useAnalysisState';

export function MarketIntelligencePage() {
  const location = useLocation();
  const { sectors, districts } = useSectors();
  const { moduleStatuses } = useAnalysisState();
  const { data, loading, error, isStale, runAnalysis } = useMarketIntelligence();

  // Step 1: Consume Analysis Session from Task-2
  const activeSession = useMemo(() => {
    if (location.state?.session) return location.state.session;
    return getAnalysisSession();
  }, [location.state]);

  // Step 2: No-Session Guard Check
  const hasValidSession = Boolean(
    activeSession || 
    (location.state?.sector_id && location.state?.district_id)
  );

  // Configurable radius: default 5 km (Step 4 & 17)
  const [radiusKm, setRadiusKm] = useState(5);

  const sectorId = activeSession?.business?.sectorId === 'other'
    ? 'dairy-processing'
    : (activeSession?.business?.sectorId || location.state?.sector_id || 'dairy-processing');

  const districtId = activeSession?.location?.districtId || location.state?.district_id || 'varanasi-up';
  const investment = activeSession?.finance?.marginCapital || location.state?.proposed_capital || 300000;
  const businessIdea = activeSession?.business?.idea || '';

  // Trigger analysis when session exists and no data is stored yet
  useEffect(() => {
    if (hasValidSession && !data) {
      runAnalysis({
        sector_id: sectorId,
        district_id: districtId,
        investment_amount: Number(investment),
        radius_km: radiusKm,
        business_idea: businessIdea,
        is_custom: activeSession?.business?.isCustom || false
      });
    }
  }, [hasValidSession, data, sectorId, districtId, investment, radiusKm, businessIdea, runAnalysis]);

  // Explicit refresh handler
  const handleRefresh = () => {
    runAnalysis({
      sector_id: sectorId,
      district_id: districtId,
      investment_amount: Number(investment),
      radius_km: radiusKm,
      business_idea: businessIdea,
      is_custom: activeSession?.business?.isCustom || false
    });
  };

  // Handle radius toggle
  const handleRadiusChange = (newRadius) => {
    setRadiusKm(newRadius);
    runAnalysis({
      sector_id: sectorId,
      district_id: districtId,
      investment_amount: Number(investment),
      radius_km: newRadius,
      business_idea: businessIdea,
      is_custom: activeSession?.business?.isCustom || false
    });
  };

  // STEP 2 GUARD: Empty state when no analysis session exists
  if (!hasValidSession) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
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

  // Active Session Page Content
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Workflow Progress Tracker */}
      <WorkflowProgressTracker moduleStatuses={moduleStatuses} currentStage="market" />

      {/* Stale Analysis Alert */}
      {isStale && (
        <StaleAnalysisAlert 
          moduleName="Market Intelligence" 
          onRefresh={handleRefresh} 
          isRefreshing={loading} 
        />
      )}

      {/* Step 1: Compact "Your Analysis" Summary Header with Return Action */}
      <div className="bg-[#0c241b] border border-[#18533e] rounded-2xl p-4 sm:p-5 shadow-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Active Analysis Session
            </span>
            <span className="text-xs text-emerald-300/80">Stage 1 of 5</span>
          </div>
          <div className="flex flex-wrap items-center gap-2 text-sm">
            <span className="text-white font-bold">
              {activeSession?.business?.idea || activeSession?.business?.sectorName || 'Rural Micro Enterprise'}
            </span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-200 flex items-center gap-1 text-xs">
              <MapPin className="w-3.5 h-3.5 text-rose-400" />
              {activeSession?.location?.district || 'District'}, {activeSession?.location?.state || 'State'}
              {activeSession?.location?.blockOrLocality ? ` (${activeSession.location.blockOrLocality})` : ''}
            </span>
            <span className="text-emerald-400">•</span>
            <span className="text-emerald-300 font-mono text-xs font-semibold">
              Margin: {formatCurrencyINR(activeSession?.finance?.marginCapital || investment)}
            </span>
          </div>
        </div>

        <Link
          to="/new-analysis"
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-[#071913] hover:bg-[#0a231b] border border-[#1d5c46] text-amber-400 hover:text-amber-300 font-semibold text-xs transition-colors self-start md:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Analysis Inputs</span>
        </Link>
      </div>

      {/* Page Title & Subheading (Step 3) */}
      <div className="border-b border-[#144233] pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 mb-2">
            <TrendingUp className="w-3.5 h-3.5 text-amber-400" />
            Module 1: Hyper-Local Market Intelligence
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            Hyper-Local Market Intelligence
          </h1>
          <p className="text-xs text-emerald-100/70 mt-0.5">
            Understand the opportunity around your selected location.
          </p>
        </div>

        <div className="flex items-center gap-2 text-[11px] text-amber-300 bg-amber-500/10 px-3 py-1.5 rounded-xl border border-amber-500/20">
          <AlertCircle className="w-3.5 h-3.5 text-amber-400 flex-shrink-0" />
          <span>Prototype Demo Data • 5–10 km Reach</span>
        </div>
      </div>

      {/* Loading State (Step 20) */}
      {loading && (
        <div className="bg-[#0c241b] rounded-2xl p-12 border border-[#18533e] text-center space-y-3">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
          <p className="text-sm text-emerald-200 font-medium">Analyzing local market opportunity...</p>
          <p className="text-xs text-emerald-300/60">Evaluating demographic demand, competition density, and pricing benchmarks.</p>
        </div>
      )}

      {/* Error State (Step 20) */}
      {error && !loading && (
        <div className="bg-red-950/80 rounded-2xl p-6 border border-red-800 text-center space-y-4 text-xs text-red-200">
          <AlertCircle className="w-6 h-6 text-red-400 mx-auto" />
          <p className="text-sm font-bold text-white">Market analysis could not be generated.</p>
          <p>{error}</p>
          <button
            onClick={() => runAnalysis({
              sector_id: sectorId,
              district_id: districtId,
              investment_amount: Number(investment),
              radius_km: radiusKm
            })}
            className="px-4 py-2 bg-red-900 hover:bg-red-800 text-white rounded-xl font-bold transition-colors"
          >
            Retry Analysis
          </button>
        </div>
      )}

      {/* Analytical Modules (Step 3 through Step 12) */}
      {data && !loading && (
        <div className="space-y-8">
          
          {/* 1. Local Market Snapshot (Step 4) */}
          <MarketSnapshotCard
            snapshot={data.snapshot}
            locationName={data.district_name}
            locationTier={data.district_tier || activeSession?.location?.tier}
            businessCategory={data.sector_name}
            radiusKm={radiusKm}
            onRadiusChange={handleRadiusChange}
          />

          {/* 2. Demand Opportunity (Step 5) */}
          <DemandOpportunitySection
            demandDetails={data.demand_details}
            demographics={data.target_demographics}
            radiusKm={radiusKm}
          />

          {/* 3. Competition Landscape (Step 6) */}
          <CompetitionSection
            competitors={data.competitors}
            competitionDensity={data.competition_density}
            pricingBenchmarks={data.pricing_benchmarks}
          />

          {/* 4. Product Market Value (Step 7) */}
          <ProductMarketValueSection
            productMarketValue={data.product_market_value}
          />

          {/* 5. Local Opportunity Factors (Step 8) */}
          <OpportunityFactorsSection
            opportunityFactors={data.opportunity_factors}
            locationContext={data.district_name}
          />

          {/* 6. SWOT Analysis (Step 9) */}
          <SWOTSection
            swot={data.swot}
          />

          {/* 7. Market Threats & Risks (Step 10) */}
          <MarketThreatsSection
            threats={data.threats_matrix}
          />

          {/* 8. Market Insight Summary (Step 11) */}
          <MarketInsightSummary
            summary={data.summary}
            activeSession={activeSession}
          />

          {/* 9. Data Source & Transparency Panel (Step 12) */}
          <DataMethodologyPanel />

        </div>
      )}

    </div>
  );
}
