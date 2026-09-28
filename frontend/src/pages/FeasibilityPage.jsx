import React, { useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Compass, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Building2, 
  IndianRupee, 
  Edit3, 
  AlertCircle, 
  RefreshCw, 
  Layers,
  Sparkles,
  Info
} from 'lucide-react';

import { useFeasibility } from '../hooks/useFeasibility';
import { useSectors } from '../hooks/useSectors';
import { getAnalysisSession } from '../services/sessionService';
import { getSectorMarketIntelligence } from '../data/fallbackMarketData';
import { formatCurrencyINR } from '../utils/formatters';

// Feasibility Module Components
import { FeasibilityOverviewCard } from '../components/feasibility/FeasibilityOverviewCard';
import { FeasibilityDimensionsGrid } from '../components/feasibility/FeasibilityDimensionsGrid';
import { OperationalReadinessSection } from '../components/feasibility/OperationalReadinessSection';
import { MarketFitSection } from '../components/feasibility/MarketFitSection';
import { FinancialReadinessSection } from '../components/feasibility/FinancialReadinessSection';
import ResourceRequirementsSection from '../components/feasibility/ResourceRequirementsSection';
import BreakEvenInsightSection from '../components/feasibility/BreakEvenInsightSection';
import FeasibilityRiskMatrix from '../components/feasibility/FeasibilityRiskMatrix';
import KeyGapsSection from '../components/feasibility/KeyGapsSection';
import FeasibilityRecommendationsSection from '../components/feasibility/FeasibilityRecommendationsSection';
import FeasibilityExplainabilityPanel from '../components/feasibility/FeasibilityExplainabilityPanel';

export function FeasibilityPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sectors, districts } = useSectors();
  const { data, loading, error, runAssessment } = useFeasibility();

  // STEP 1: Consume active analysis session from Task-2
  const activeSession = useMemo(() => {
    if (location.state?.session) return location.state.session;
    return getAnalysisSession();
  }, [location.state]);

  // STEP 2: Guard — Session & Margin Capital check
  const hasValidSession = Boolean(
    activeSession || 
    (location.state?.sector_id && location.state?.district_id)
  );

  const rawMarginCapital = activeSession?.finance?.marginCapital ?? location.state?.proposed_capital;
  const parsedCapital = Number(rawMarginCapital);
  const hasValidCapital = !isNaN(parsedCapital) && parsedCapital > 0;
  const capital = hasValidCapital ? parsedCapital : null;

  const sectorId = activeSession?.business?.sectorId === 'other'
    ? 'dairy-processing'
    : (activeSession?.business?.sectorId || location.state?.sector_id || 'dairy-processing');

  const districtId = activeSession?.location?.districtId || location.state?.district_id || 'varanasi-up';
  const businessIdea = activeSession?.business?.idea || '';
  const isCustom = activeSession?.business?.isCustom || false;

  // Resolve metadata for context display
  const sectorInfo = sectors.find(s => s.id === sectorId);
  const districtInfo = districts.find(d => d.id === districtId);

  const displayLocation = districtInfo 
    ? `${districtInfo.name}, ${districtInfo.state}` 
    : (activeSession?.location?.districtName || 'Varanasi, Uttar Pradesh');

  const displayCategory = sectorInfo 
    ? sectorInfo.name 
    : (activeSession?.business?.sectorName || 'Dairy & Food Processing');

  const displayIdea = businessIdea || (sectorInfo ? sectorInfo.description : 'Rural Value-Added Enterprise');

  // Consume Task-3 hyper-local market intelligence
  const marketContext = useMemo(() => {
    if (location.state?.marketData) return location.state.marketData;
    return getSectorMarketIntelligence(sectorId);
  }, [location.state, sectorId]);

  // Trigger feasibility assessment only when session AND actual margin capital are present
  useEffect(() => {
    if (hasValidSession && hasValidCapital) {
      runAssessment({
        sector_id: sectorId,
        district_id: districtId,
        proposed_capital: capital,
        prior_experience_years: 1,
        business_idea: businessIdea,
        is_custom: isCustom,
        district_tier: districtInfo?.tier || 'Tier-3 / Rural Cluster'
      });
    }
  }, [hasValidSession, hasValidCapital, sectorId, districtId, capital]);

  // STEP 2A: NO-SESSION GUARD
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
              Start a business analysis first.
            </h1>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Business Feasibility analysis requires defined entrepreneur inputs (target geography, business category, business idea, and available margin capital) to evaluate operational readiness and financial sizing.
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

          <div className="pt-4 border-t border-[#144233] text-left max-w-md mx-auto">
            <p className="text-xs text-emerald-300/60 font-mono">
              💡 Tip: Completing Step 1 (New Business Analysis) populates the hyper-local context so feasibility and financial models run automatically without re-entering parameters.
            </p>
          </div>
        </div>
      </div>
    );
  }

  // STEP 2B: MISSING MARGIN CAPITAL GUARD (Zero Hardcoded Fallback)
  if (!hasValidCapital) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <div className="bg-[#0c241b] rounded-3xl p-8 sm:p-12 border border-[#18533e] text-center space-y-6 shadow-2xl">
          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 mx-auto">
            <IndianRupee className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
              Margin Capital Required
            </span>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Margin capital is missing or invalid.
            </h1>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              Business Feasibility analysis requires an actual margin capital input to evaluate project cost sizing, credit ratios, and capital adequacy. No default or fabricated financial amounts are assumed.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/new-analysis"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-sm shadow-xl shadow-orange-950/40 transition-all transform hover:-translate-y-0.5"
            >
              <span>Provide Margin Capital in Analysis Inputs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* PAGE HEADER */}
      <div className="border-b border-[#18533e]/50 pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Stage 2: Feasibility Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Business Feasibility
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/70 mt-1">
            Evaluate operational, market and financial readiness for your proposed enterprise.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-[11px] font-mono text-emerald-300/80 bg-[#0c241b] px-3 py-1.5 rounded-xl border border-[#18533e]">
            Prototype Feasibility Assessment
          </span>
        </div>
      </div>

      {/* COMPACT ANALYSIS CONTEXT CARD (Step 1) */}
      <div className="bg-[#0c241b] rounded-2xl p-5 border border-[#18533e] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
          <div>
            <span className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-semibold block">
              Location
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-white mt-0.5">
              <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span className="truncate">{displayLocation}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-semibold block">
              Business Category
            </span>
            <div className="flex items-center gap-1.5 text-xs font-bold text-white mt-0.5">
              <Building2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span className="truncate">{displayCategory}</span>
            </div>
          </div>

          <div className="col-span-2 sm:col-span-1">
            <span className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-semibold block">
              Business Idea
            </span>
            <div className="text-xs font-bold text-white mt-0.5 truncate" title={displayIdea}>
              {displayIdea}
            </div>
          </div>

          <div>
            <span className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-semibold block">
              Margin Capital
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-300 mt-0.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{formatCurrencyINR(capital)}</span>
            </div>
          </div>
        </div>

        <Link
          to="/new-analysis"
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#071913] hover:bg-[#12382b] text-emerald-300 text-xs font-semibold border border-[#18533e] transition-colors shrink-0 self-start sm:self-auto"
        >
          <Edit3 className="w-3.5 h-3.5" />
          <span>Edit Analysis Inputs</span>
        </Link>
      </div>

      {/* LOADING STATE */}
      {loading && (
        <div className="bg-[#0c241b] rounded-3xl p-12 border border-[#18533e] text-center space-y-4">
          <RefreshCw className="w-8 h-8 text-emerald-400 animate-spin mx-auto" />
          <p className="text-sm font-semibold text-emerald-200">
            Assessing business feasibility...
          </p>
          <p className="text-xs text-emerald-300/60 max-w-md mx-auto">
            Synthesizing hyper-local market signals, operational dependencies, capital adequacy ratios, and break-even horizons.
          </p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div className="bg-rose-950/40 rounded-3xl p-8 border border-rose-800/80 text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">
              Feasibility assessment could not be generated.
            </h3>
            <p className="text-xs text-rose-300/70 mt-1 max-w-md mx-auto">
              {error}
            </p>
          </div>
          <button
            onClick={() => runAssessment({
              sector_id: sectorId,
              district_id: districtId,
              proposed_capital: Number(capital),
              prior_experience_years: 1,
              business_idea: businessIdea,
              is_custom: isCustom,
              district_tier: districtInfo?.tier || 'Tier-3 / Rural Cluster'
            })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-900/60 hover:bg-rose-900 text-white text-xs font-semibold border border-rose-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Assessment</span>
          </button>
        </div>
      )}

      {/* EMPTY STATE */}
      {!data && !loading && !error && (
        <div className="bg-[#0c241b] rounded-3xl p-12 border border-[#18533e] text-center space-y-4">
          <Info className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-base font-bold text-white">
            No feasibility assessment available.
          </h3>
          <p className="text-xs text-emerald-300/60 max-w-md mx-auto">
            Please verify your analysis inputs to compute feasibility indicators.
          </p>
        </div>
      )}

      {/* FEASIBILITY CONTENT — 11-PART STRUCTURE */}
      {data && !loading && (
        <div className="space-y-8">
          
          {/* 1. Feasibility Overview Card */}
          <FeasibilityOverviewCard
            overallScore={data.feasibility_score}
            status={data.overall_status}
            grade={data.feasibility_grade}
            statusColor={data.status_color}
            sectorName={displayCategory}
            districtName={displayLocation}
          />

          {/* 2. Feasibility Dimensions (5-dimension breakdown) */}
          <FeasibilityDimensionsGrid
            dimensions={data.dimensions}
          />

          {/* 3. Operational Readiness */}
          <OperationalReadinessSection
            operationalReadiness={data.operational_readiness}
            sectorName={displayCategory}
          />

          {/* 4. Market Fit (Consumes Task-3 market intelligence) */}
          <MarketFitSection
            marketContext={marketContext}
          />

          {/* 5. Financial Readiness (Margin, Project Cost = Margin/0.10, Loan = 90%) */}
          <FinancialReadinessSection
            marginCapital={capital}
            capitalAdequacy={data.capital_adequacy}
            minRecommendedCapital={data.recommended_min_capital}
          />

          {/* 6. Resource Requirements Checklist */}
          <ResourceRequirementsSection
            resources={data.resource_requirements}
          />

          {/* 7. Break-Even & Operational Viability Insight */}
          <BreakEvenInsightSection
            breakEvenData={{
              monthlyFixedCost: data.breakeven_assumptions?.monthlyFixedCost,
              contributionMargin: data.breakeven_assumptions?.unitContributionMargin,
              indicativeMonths: data.estimated_breakeven_months || data.breakeven_assumptions?.indicativeBreakEvenMonths,
              dailyBreakEvenUnits: data.breakeven_assumptions?.breakEvenVolumeNote,
              assumptions: `Fixed cost reflects rural premise rental, 2 helpers, and base utility bills for ${displayCategory}. Variable costs assume direct farm-gate raw material purchases without middlemen.`
            }}
            projectCost={Math.round(capital / 0.10)}
          />

          {/* 8. Risk Assessment Matrix (6 Dimensions) */}
          <FeasibilityRiskMatrix
            risks={data.risks}
          />

          {/* 9. Key Feasibility Gaps */}
          <KeyGapsSection
            gaps={data.key_gaps?.map((gap, i) => {
              if (typeof gap === 'string') {
                return {
                  title: `Operational Hurdle #${i + 1}`,
                  detail: gap
                };
              }
              return gap;
            })}
          />

          {/* 10. Practical Feasibility Recommendations */}
          <FeasibilityRecommendationsSection
            recommendations={data.recommendations}
          />

          {/* Step 15: Explainability Panel */}
          <FeasibilityExplainabilityPanel />

          {/* Step 20: Data Transparency & Non-Guarantee Disclaimer Banner */}
          <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] flex items-start gap-3 text-xs text-emerald-200/80">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Prototype Feasibility Assessment Disclosure:</strong> Results are illustrative prototype indicators based on the information entered and demo datasets. They are not a guarantee of business success, loan approval, official bank sanction, or official government assessment.
            </div>
          </div>

          {/* 11. NEXT STEP & NAVIGATION FOOTER */}
          <div className="pt-6 border-t border-[#18533e]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/market-analysis"
              state={{ session: activeSession }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0c241b] hover:bg-[#12382b] text-emerald-300 text-xs font-semibold border border-[#18533e] transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Market Analysis</span>
            </Link>

            <Link
              to="/financial-plan"
              state={{ 
                session: activeSession,
                feasibilityData: data,
                proposed_capital: capital,
                sector_id: sectorId,
                district_id: districtId
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-950/40 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <span>Continue to Financial Planning</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
