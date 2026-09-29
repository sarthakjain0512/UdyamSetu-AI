import React, { useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Briefcase, Sparkles, Printer, ArrowLeft, ArrowRight, 
  IndianRupee, ShieldCheck, Download, RefreshCw, AlertCircle 
} from 'lucide-react';
import { useBusinessPlan } from '../hooks/useBusinessPlan';
import { getAnalysisSession } from '../services/sessionService';
import { useAnalysisState } from '../hooks/useAnalysisState';
import WorkflowProgressTracker from '../components/common/WorkflowProgressTracker';
import StaleAnalysisAlert from '../components/common/StaleAnalysisAlert';

// Task 8 Components
import BusinessOverviewCard from '../components/business-plan/BusinessOverviewCard';
import LaunchReadinessCard from '../components/business-plan/LaunchReadinessCard';
import LaunchRecommendations from '../components/business-plan/LaunchRecommendations';
import LaunchChecklist from '../components/business-plan/LaunchChecklist';
import LaunchSequence from '../components/business-plan/LaunchSequence';
import LaunchMilestones from '../components/business-plan/LaunchMilestones';
import RiskControlPlan from '../components/business-plan/RiskControlPlan';
import FinancialPreparationCard from '../components/business-plan/FinancialPreparationCard';
import FinancingFollowUpCard from '../components/business-plan/FinancingFollowUpCard';
import ValidationQuestionsCard from '../components/business-plan/ValidationQuestionsCard';
import BusinessPlanTransparency from '../components/business-plan/BusinessPlanTransparency';

export function BusinessPlanPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { moduleStatuses } = useAnalysisState();
  const { launchPlan, loading, error, isStale, fetchLaunchPlan } = useBusinessPlan();

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
  const advisoryPlanData = location.state?.advisoryPlan || null;

  // 3. Guard Checks
  const hasValidSession = Boolean(
    activeSession || 
    (location.state?.sector_id && location.state?.district_id)
  );

  const rawMargin = activeSession?.finance?.marginCapital ?? location.state?.proposed_capital;
  const parsedMargin = Number(rawMargin);
  const hasValidMargin = !isNaN(parsedMargin) && parsedMargin > 0;

  // 4. Trigger Launch Plan Synthesis
  useEffect(() => {
    if (hasValidSession && hasValidMargin && !launchPlan) {
      fetchLaunchPlan({
        session: activeSession,
        market: marketData,
        feasibility: feasibilityData,
        financial: financialData,
        scheme: schemeRouteData,
        advisory: advisoryPlanData
      }).catch(err => {
        console.error('[BusinessPlanPage] Synthesis error:', err);
      });
    }
  }, [hasValidSession, hasValidMargin, launchPlan, activeSession, marketData, feasibilityData, financialData, schemeRouteData, advisoryPlanData, fetchLaunchPlan]);

  const handleRefresh = () => {
    fetchLaunchPlan({
      session: activeSession,
      market: marketData,
      feasibility: feasibilityData,
      financial: financialData,
      scheme: schemeRouteData,
      advisory: advisoryPlanData
    }).catch(err => {
      console.error('[BusinessPlanPage] Synthesis refresh error:', err);
    });
  };

  const handlePrint = () => {
    window.print();
  };

  // GUARD A: NO ACTIVE SESSION
  if (!hasValidSession) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 space-y-8">
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-[#DDE5DD] text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-[#14532D] mx-auto">
            <Briefcase className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-[#14532D] border border-emerald-200">
              Module 6 • Business Launch Plan
            </span>
            <h2 className="text-2xl font-bold text-[#14532D]">
              Start a business analysis first.
            </h2>
            <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
              The Business Launch Plan synthesizes your market intelligence, feasibility assessment, capital structuring, scheme routing, and advisory recommendations into a concrete pre-launch roadmap.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/new-analysis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E58A24] hover:bg-[#c87512] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
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
        <div className="bg-white rounded-2xl p-8 sm:p-12 border border-amber-200 text-center space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-[#C87512] mx-auto">
            <IndianRupee className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-[#C87512] border border-amber-200">
              Equity Parameter Required
            </span>
            <h2 className="text-2xl font-bold text-[#14532D]">
              Margin capital is required for the launch plan.
            </h2>
            <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
              Capital sizing, bank loan eligibility, debt service schedules, and financial preparation checkpoints depend directly on your available promoter equity.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/new-analysis"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#E58A24] hover:bg-[#c87512] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
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
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      
      {/* Workflow Progress Tracker */}
      <div className="print:hidden">
        <WorkflowProgressTracker moduleStatuses={moduleStatuses} currentStage="businessPlan" />
      </div>

      {/* Stale Analysis Alert */}
      {isStale && (
        <div className="print:hidden">
          <StaleAnalysisAlert 
            moduleName="Business Launch Plan" 
            onRefresh={handleRefresh} 
            isRefreshing={loading} 
          />
        </div>
      )}

      {/* 1. Page Header & Actions */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DDE5DD] pb-4 print:border-none print:pb-2">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-[#14532D] border border-emerald-200 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-[#E58A24]" />
            <span>Module 6: Business Launch Plan</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14532D] tracking-tight">
            Enterprise Business Launch Plan
          </h1>
          <p className="text-xs sm:text-sm text-[#647067] mt-0.5 max-w-2xl">
            A structured, evidence-derived operational roadmap synthesizing market intelligence, operational feasibility, financial structuring, scheme routing, and advisory findings.
          </p>
        </div>

        <div className="flex items-center gap-3 print:hidden">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#17211B] border border-[#DDE5DD] text-xs font-bold flex items-center gap-2 transition-colors shadow-sm"
          >
            <Printer className="w-4 h-4 text-[#14532D]" />
            <span>Print / Export PDF</span>
          </button>
        </div>
      </div>

      {/* 2. Loading State */}
      {loading && !launchPlan && (
        <div className="p-16 text-center space-y-4 bg-white rounded-2xl border border-[#DDE5DD] shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 text-[#14532D] flex items-center justify-center mx-auto animate-bounce">
            <Sparkles className="w-6 h-6 text-[#E58A24]" />
          </div>
          <p className="text-sm font-bold text-[#14532D]">
            Synthesizing hyper-local intelligence into your business launch plan...
          </p>
          <p className="text-xs text-[#647067]">
            Merging market benchmarks, credit tracks, risk controls, and 90-day execution milestones.
          </p>
        </div>
      )}

      {/* 3. Error State */}
      {error && !launchPlan && (
        <div className="p-6 rounded-2xl bg-red-50 border border-red-200 text-[#C2413A] text-xs space-y-3 shadow-sm">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="w-4 h-4" />
            <span>Error generating Business Launch Plan:</span>
          </div>
          <p>{error}</p>
          <button
            onClick={handleRefresh}
            className="px-4 py-2 bg-[#C2413A] hover:bg-[#a6342e] text-white rounded-xl font-bold transition-colors"
          >
            Retry Synthesis
          </button>
        </div>
      )}

      {/* 3B. Empty / Uninitialized State (Prevents Blank Screen) */}
      {!launchPlan && !loading && !error && (
        <div className="p-12 text-center space-y-4 bg-white rounded-2xl border border-[#DDE5DD] shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 text-[#14532D] flex items-center justify-center mx-auto border border-emerald-200">
            <Briefcase className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-[#17211B]">
            Launch Plan Ready to Synthesize
          </h3>
          <p className="text-xs text-[#647067] max-w-md mx-auto">
            Click below to generate your comprehensive 90-day pre-launch roadmap from your analysis session.
          </p>
          <button
            onClick={handleRefresh}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#14532D] hover:bg-[#0f3e22] text-white text-xs font-semibold shadow-sm transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Generate Launch Plan</span>
          </button>
        </div>
      )}

      {/* 4. Complete Synthesized Dashboard */}
      {launchPlan && (
        <div className="space-y-6">
          
          {/* Section 1: Business Overview */}
          <BusinessOverviewCard overview={launchPlan.overview} />

          {/* Section 2: Launch Readiness */}
          <LaunchReadinessCard 
            readiness={launchPlan.readiness} 
            coverage={launchPlan.coverage} 
          />

          {/* Section 3: Recommended Before Launch */}
          <LaunchRecommendations 
            recommendations={launchPlan.recommendationsBeforeLaunch} 
          />

          {/* Section 4: Pre-Launch Checklist */}
          <LaunchChecklist checklist={launchPlan.checklist} />

          {/* Section 5: Launch Sequence */}
          <LaunchSequence sequence={launchPlan.launchSequence} />

          {/* Section 6: Milestone Planner */}
          <LaunchMilestones milestones={launchPlan.milestones} />

          {/* Section 7: Risk & Control Plan */}
          <RiskControlPlan plan={launchPlan.riskControlPlan} />

          {/* Section 8: Financial Preparation */}
          <FinancialPreparationCard summary={launchPlan.financialSummary} />

          {/* Section 9: Financing / Scheme Follow-Up */}
          <FinancingFollowUpCard summary={launchPlan.schemeSummary} />

          {/* Section 10: Validation Questions */}
          <ValidationQuestionsCard questionsData={launchPlan.validationQuestions} />

          {/* Section 11: Source & Transparency Panel */}
          <BusinessPlanTransparency transparency={launchPlan.transparency} />

          {/* Section 12: Navigation Controls */}
          <div className="pt-4 border-t border-[#DDE5DD] flex flex-col sm:flex-row items-center justify-between gap-4 print:hidden">
            <Link
              to="/advisory"
              state={{ 
                session: activeSession,
                marketData: marketData,
                feasibilityData: feasibilityData,
                financialPlan: financialData,
                schemeRoute: schemeRouteData
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#17211B] text-xs font-semibold border border-[#DDE5DD] transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4 text-[#14532D]" />
              <span>Back to AI Advisory</span>
            </Link>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={handlePrint}
                className="px-5 py-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#17211B] border border-[#DDE5DD] text-xs font-semibold flex items-center justify-center gap-2 transition-colors w-full sm:w-auto shadow-sm"
              >
                <Printer className="w-4 h-4 text-[#14532D]" />
                <span>Print Plan</span>
              </button>

              <Link
                to="/new-analysis"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#E58A24] hover:bg-[#c87512] text-white font-bold text-xs uppercase tracking-wider shadow-sm transition-all w-full sm:w-auto justify-center"
              >
                <span>Start New Analysis</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}

export default BusinessPlanPage;
