import React, { useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  Compass, 
  IndianRupee, 
  RefreshCw, 
  AlertCircle,
  Cpu,
  Layers,
  ShieldCheck 
} from 'lucide-react';

import { useAdvisory } from '../hooks/useAdvisory';
import { getAnalysisSession } from '../services/sessionService';
import { useAnalysisState } from '../hooks/useAnalysisState';
import WorkflowProgressTracker from '../components/common/WorkflowProgressTracker';
import StaleAnalysisAlert from '../components/common/StaleAnalysisAlert';

// Module Presentation Components
import AdvisoryContextBanner from '../components/advisory/AdvisoryContextBanner';
import AdvisorySummaryCard from '../components/advisory/AdvisorySummaryCard';
import AnalysisCoverageCard from '../components/advisory/AnalysisCoverageCard';
import AdvisoryStrengthsSection from '../components/advisory/AdvisoryStrengthsSection';
import AdvisoryRisksSection from '../components/advisory/AdvisoryRisksSection';
import AdvisoryRecommendationsSection from '../components/advisory/AdvisoryRecommendationsSection';
import AdvisoryActionPlanSection from '../components/advisory/AdvisoryActionPlanSection';
import ValidationQuestionsSection from '../components/advisory/ValidationQuestionsSection';
import AdvisoryAssumptionsPanel from '../components/advisory/AdvisoryAssumptionsPanel';
import AdvisoryDisclaimerCard from '../components/advisory/AdvisoryDisclaimerCard';

export function AdvisoryPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { moduleStatuses } = useAnalysisState();
  const { advisoryPlan, loading, error, isStale, fetchAdvisory } = useAdvisory();

  // 1. Session Retrieval (State or LocalStorage)
  const activeSession = useMemo(() => {
    if (location.state?.session) return location.state.session;
    return getAnalysisSession();
  }, [location.state]);

  // 2. Upstream Module Context (From navigation state if available)
  const marketData = location.state?.marketData || null;
  const feasibilityData = location.state?.feasibilityData || null;
  const financialData = location.state?.financialPlan || null;
  const schemeRouteData = location.state?.schemeRoute || null;

  // 3. Guard Checks
  const hasValidSession = Boolean(
    activeSession || 
    (location.state?.sector_id && location.state?.district_id)
  );

  const rawMargin = activeSession?.finance?.marginCapital ?? location.state?.proposed_capital;
  const parsedMargin = Number(rawMargin);
  const hasValidMargin = !isNaN(parsedMargin) && parsedMargin > 0;

  // 4. Trigger Advisory Synthesis
  useEffect(() => {
    if (hasValidSession && hasValidMargin && !advisoryPlan) {
      fetchAdvisory({
        session: activeSession,
        market: marketData,
        feasibility: feasibilityData,
        financial: financialData,
        scheme: schemeRouteData
      }).catch(err => {
        console.error('[AdvisoryPage] Synthesis error:', err);
      });
    }
  }, [hasValidSession, hasValidMargin, advisoryPlan, activeSession, marketData, feasibilityData, financialData, schemeRouteData, fetchAdvisory]);

  const handleRefresh = () => {
    fetchAdvisory({
      session: activeSession,
      market: marketData,
      feasibility: feasibilityData,
      financial: financialData,
      scheme: schemeRouteData
    }).catch(err => {
      console.error('[AdvisoryPage] Synthesis refresh error:', err);
    });
  };

  // GUARD A: NO SESSION
  if (!hasValidSession) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DDE5DD] text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C87512] mx-auto">
            <Compass className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-[#14532D] border border-emerald-200">
              Module 5 • Business Advisory
            </span>
            <h2 className="text-2xl font-bold text-[#17211B] font-serif">
              Start a business analysis first.
            </h2>
            <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
              Business advisory synthesizes your target market, feasibility analysis, capital structure, and scheme guidance into actionable recommendations.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/new-analysis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              <span>Initialize Business Intake</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // GUARD B: MISSING MARGIN CAPITAL
  if (!hasValidMargin) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#DDE5DD] text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C87512] mx-auto">
            <IndianRupee className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-[#C87512] border border-amber-200">
              Equity Parameter Required
            </span>
            <h2 className="text-2xl font-bold text-[#17211B] font-serif">
              Margin capital is required for business advisory.
            </h2>
            <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
              Advisory debt sizing, financial risk exposure, and repayment mitigations depend directly on your available promoter equity.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/new-analysis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
            >
              <span>Provide Margin Capital</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12 max-w-7xl mx-auto">
      
      {/* Workflow Progress Tracker */}
      <WorkflowProgressTracker moduleStatuses={moduleStatuses} currentStage="advisory" />

      {/* Stale Analysis Alert */}
      {isStale && (
        <StaleAnalysisAlert 
          moduleName="AI Business Advisory" 
          onRefresh={handleRefresh} 
          isRefreshing={loading} 
        />
      )}

      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DDE5DD] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-[#C87512] border border-amber-200 mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Module 5: AI-Assisted Business Advisory Layer</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#17211B] tracking-tight font-serif">
            Strategic Business Advisory & Next Steps
          </h1>
          <p className="text-xs sm:text-sm text-[#647067] mt-1 max-w-2xl">
            Synthesized multi-module intelligence providing explainable recommendations, risk mitigations, validation questions, and a phased execution roadmap.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/scheme-router"
            state={{ session: activeSession }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#14532D] text-xs font-semibold border border-[#DDE5DD] shadow-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Review Schemes</span>
          </Link>
        </div>
      </div>

      {/* Prototype Advisory Notice Banner (Section 15) */}
      <div className="p-4 rounded-2xl bg-[#052E23] border border-amber-500/40 flex items-start gap-3 text-xs shadow-sm">
        <Cpu className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <strong className="text-amber-300 uppercase tracking-wider text-[11px] block font-bold">
            Prototype Advisory Engine • AI Transparency Notice
          </strong>
          <p className="text-[11px] leading-relaxed text-[#E7F3EC]">
            Recommendations are generated from deterministic prototype rules using available analysis outputs. No real-time AI model or live government decision engine is used in this prototype. Future production architecture can connect this advisory layer to an authorized LLM/NLP service.
          </p>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-3xl p-12 border border-[#DDE5DD] text-center space-y-4 shadow-sm">
          <RefreshCw className="w-8 h-8 text-[#E58A24] mx-auto animate-spin" />
          <p className="text-sm font-semibold text-[#17211B]">
            Synthesizing multi-module advisory roadmap...
          </p>
          <span className="text-xs text-[#647067] block">
            Evaluating feasibility, debt metrics, and scheme track parameters
          </span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-rose-50 rounded-3xl p-8 border border-rose-200 text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-[#C2413A] mx-auto" />
          <h3 className="text-base font-bold text-[#C2413A]">Advisory Synthesis Interrupted</h3>
          <p className="text-xs text-[#647067] max-w-md mx-auto">{error}</p>
        </div>
      )}

      {/* Main Content Area */}
      {advisoryPlan && !loading && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* 2. Analysis Context Banner */}
          <AdvisoryContextBanner
            profile={advisoryPlan.profile}
          />

          {/* 3. Executive Advisory Summary */}
          <AdvisorySummaryCard
            executiveSummary={advisoryPlan.executiveSummary}
            advisoryStatus={advisoryPlan.advisoryStatus}
            statusBadge={advisoryPlan.statusBadge}
            profile={advisoryPlan.profile}
          />

          {/* 4. Analysis Coverage Audit */}
          <AnalysisCoverageCard
            coverage={advisoryPlan.coverage}
          />

          {/* 5. Identified Key Strengths */}
          <AdvisoryStrengthsSection
            strengths={advisoryPlan.strengths}
          />

          {/* 6. Identified Operational & Financial Risks */}
          <AdvisoryRisksSection
            risks={advisoryPlan.risks}
          />

          {/* 7. Priority Strategic Recommendations */}
          <AdvisoryRecommendationsSection
            recommendations={advisoryPlan.recommendations}
          />

          {/* 8. Phased Action Plan (Now, Before Financing, Before Launch) */}
          <AdvisoryActionPlanSection
            actionPlan={advisoryPlan.actionPlan}
          />

          {/* 9. Pre-Commitment Validation Questions */}
          <ValidationQuestionsSection
            questions={advisoryPlan.validationQuestions}
          />

          {/* 10. Assumptions, Architecture & Methodology Panel */}
          <AdvisoryAssumptionsPanel
            transparency={advisoryPlan.transparency}
          />

          {/* 11. Official Verification / Prototype Disclaimer */}
          <AdvisoryDisclaimerCard
            customDisclaimer={advisoryPlan.transparency?.disclaimer}
          />

          {/* 12. Navigation Controls */}
          <div className="pt-6 border-t border-[#DDE5DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/scheme-router"
              state={{ session: activeSession }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-[#14532D] text-xs font-semibold border border-[#DDE5DD] shadow-sm transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Scheme Guidance</span>
            </Link>

            <Link
              to="/business-plan"
              state={{ 
                session: activeSession,
                advisoryPlan: advisoryPlan,
                marketData: marketData,
                feasibilityData: feasibilityData,
                financialPlan: financialData,
                schemeRoute: schemeRouteData
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-950/40 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <span>Continue to Business Launch Plan</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}

export default AdvisoryPage;
