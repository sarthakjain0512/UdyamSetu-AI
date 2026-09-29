import React, { useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Landmark, 
  ArrowRight, 
  ArrowLeft, 
  AlertCircle, 
  Compass, 
  RefreshCw, 
  IndianRupee,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';

import { useSchemeRouter } from '../hooks/useSchemeRouter';
import { useSectors } from '../hooks/useSectors';
import { getAnalysisSession } from '../services/sessionService';
import { useAnalysisState } from '../hooks/useAnalysisState';
import WorkflowProgressTracker from '../components/common/WorkflowProgressTracker';
import StaleAnalysisAlert from '../components/common/StaleAnalysisAlert';

// Module Components
import AnalysisContextBanner from '../components/schemes/AnalysisContextBanner';
import PrototypeRouteCard from '../components/schemes/PrototypeRouteCard';
import FinancingSummaryCard from '../components/schemes/FinancingSummaryCard';
import WhyThisRouteSection from '../components/schemes/WhyThisRouteSection';
import SchemeWarningsSection from '../components/schemes/SchemeWarningsSection';
import VerificationChecklistSection from '../components/schemes/VerificationChecklistSection';
import DocumentChecklistSection from '../components/schemes/DocumentChecklistSection';
import SchemeTaxonomyPanel from '../components/schemes/SchemeTaxonomyPanel';
import NodalSchemesSection from '../components/schemes/NodalSchemesSection';
import OfficialDisclaimerCard from '../components/schemes/OfficialDisclaimerCard';

export function SchemeRouterPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sectors, districts } = useSectors();
  const { moduleStatuses } = useAnalysisState();
  const { routingPlan, loading, error, isStale, routeSession } = useSchemeRouter();

  // 1. Session Retrieval (State or LocalStorage)
  const activeSession = useMemo(() => {
    if (location.state?.session) return location.state.session;
    return getAnalysisSession();
  }, [location.state]);

  // 2. Guard Checks
  const hasValidSession = Boolean(
    activeSession || 
    (location.state?.sector_id && location.state?.district_id)
  );

  const rawMargin = activeSession?.finance?.marginCapital ?? location.state?.proposed_capital;
  const parsedMargin = Number(rawMargin);
  const hasValidMargin = !isNaN(parsedMargin) && parsedMargin > 0;
  const marginCapital = hasValidMargin ? parsedMargin : null;

  // Extract Context
  const sectorId = activeSession?.business?.sectorId === 'other'
    ? 'dairy-processing'
    : (activeSession?.business?.sectorId || location.state?.sector_id || 'dairy-processing');

  const districtId = activeSession?.location?.districtId || location.state?.district_id || 'varanasi-up';
  const businessIdea = activeSession?.business?.idea || '';
  const gender = activeSession?.entrepreneurContext?.gender || location.state?.gender || 'general';
  const socialCategory = activeSession?.entrepreneurContext?.socialCategory || location.state?.social_category || 'general';

  // Resolved context labels
  const sectorInfo = sectors.find(s => s.id === sectorId);
  const districtInfo = districts.find(d => d.id === districtId);

  const displayLocation = districtInfo 
    ? `${districtInfo.name}, ${districtInfo.state}` 
    : (activeSession?.location?.districtName || activeSession?.location?.district || 'Varanasi, Uttar Pradesh');

  const displayCategory = sectorInfo 
    ? sectorInfo.name 
    : (activeSession?.business?.sectorName || activeSession?.business?.category || 'Dairy & Food Processing');

  const displayIdea = businessIdea || (sectorInfo ? sectorInfo.description : 'Rural Value-Added Enterprise');

  // 3. Trigger Deterministic Scheme Routing
  useEffect(() => {
    if (hasValidSession && hasValidMargin && !routingPlan) {
      routeSession({
        marginCapital,
        sectorId,
        districtId,
        businessIdea: displayIdea,
        gender,
        socialCategory,
        sectorName: displayCategory,
        locationDisplay: displayLocation
      }).catch(err => {
        console.error('[SchemeRouterPage] Routing calculation error:', err);
      });
    }
  }, [hasValidSession, hasValidMargin, routingPlan, marginCapital, sectorId, districtId, displayIdea, gender, socialCategory, displayCategory, displayLocation, routeSession]);

  const handleRefresh = () => {
    routeSession({
      marginCapital,
      sectorId,
      districtId,
      businessIdea: displayIdea,
      gender,
      socialCategory,
      sectorName: displayCategory,
      locationDisplay: displayLocation
    }).catch(err => {
      console.error('[SchemeRouterPage] Refresh error:', err);
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
              Module 4 • Scheme Guidance
            </span>
            <h2 className="text-2xl font-bold text-[#17211B] font-serif">
              Start a business analysis first.
            </h2>
            <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
              Scheme routing requires an active business profile with geographic location, enterprise category, and equity capital.
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
              Margin capital is required for scheme routing.
            </h2>
            <p className="text-xs sm:text-sm text-[#647067] leading-relaxed">
              SIH 26091 scheme tracks (Micro Finance vs. Term Loan) are determined deterministically from your available margin capital.
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
      <WorkflowProgressTracker moduleStatuses={moduleStatuses} currentStage="scheme" />

      {/* Stale Analysis Alert */}
      {isStale && (
        <StaleAnalysisAlert 
          moduleName="Government Scheme Router" 
          onRefresh={handleRefresh} 
          isRefreshing={loading} 
        />
      )}

      {/* 1. Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#DDE5DD] pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-50 text-[#C87512] border border-amber-200 mb-2">
            <Landmark className="w-3.5 h-3.5" />
            <span>Module 4: Smart Scheme Router & Financing Guidance</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-[#17211B] tracking-tight font-serif">
            Government Scheme Routing & Financing Track
          </h1>
          <p className="text-xs sm:text-sm text-[#647067] mt-1 max-w-2xl">
            SIH 26091 deterministic track matching, statutory parameters, loan ceiling disclosures, and application verification checklists.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/financial-plan"
            state={{ session: activeSession }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white hover:bg-stone-50 text-[#14532D] text-xs font-semibold border border-[#DDE5DD] shadow-sm transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Review Financials</span>
          </Link>
        </div>
      </div>

      {/* Loading State */}
      {loading && (
        <div className="bg-white rounded-3xl p-12 border border-[#DDE5DD] text-center space-y-4 shadow-sm">
          <RefreshCw className="w-8 h-8 text-[#E58A24] mx-auto animate-spin" />
          <p className="text-sm font-semibold text-[#17211B]">
            Evaluating SIH 26091 scheme rules and retrieving nodal reference data...
          </p>
          <span className="text-xs text-[#647067] block">
            Matching equity capital to Micro Finance and Term Loan brackets
          </span>
        </div>
      )}

      {/* Error State */}
      {error && !loading && (
        <div className="bg-rose-50 rounded-3xl p-8 border border-rose-200 text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-[#C2413A] mx-auto" />
          <h3 className="text-base font-bold text-[#C2413A]">Scheme Routing Interrupted</h3>
          <p className="text-xs text-[#647067] max-w-md mx-auto">{error}</p>
        </div>
      )}

      {/* Main Content Area */}
      {routingPlan && !loading && (
        <div className="space-y-8 animate-fadeIn">
          
          {/* 2. Analysis Context Banner */}
          <AnalysisContextBanner
            locationDisplay={displayLocation}
            categoryDisplay={displayCategory}
            ideaDisplay={displayIdea}
            marginCapital={routingPlan.financingSummary.availableMarginCapital}
            projectCost={routingPlan.financingSummary.calculatedProjectCost}
          />

          {/* 3. Prototype Route Result */}
          <PrototypeRouteCard
            route={routingPlan.route}
            parameters={routingPlan.parameters}
            isAbove50L={routingPlan.explanation.isAbove50L}
          />

          {/* 4. Financing Structure Summary */}
          <FinancingSummaryCard
            financingSummary={routingPlan.financingSummary}
            ceilingMismatch={routingPlan.ceilingMismatch}
          />

          {/* 5. Why This Route? */}
          <WhyThisRouteSection
            explanation={routingPlan.explanation}
          />

          {/* 6. Loan Ceiling / Boundary Warnings */}
          <SchemeWarningsSection
            warnings={routingPlan.warnings}
            ceilingMismatch={routingPlan.ceilingMismatch}
            isAbove50L={routingPlan.explanation.isAbove50L}
          />

          {/* 7. Verification Checklist */}
          <VerificationChecklistSection
            checklist={routingPlan.verificationChecklist}
          />

          {/* 8. Potential Documents */}
          <DocumentChecklistSection
            documentCategories={routingPlan.documentChecklist}
          />

          {/* 9. Nodal Schemes Reference (Central & State) */}
          <NodalSchemesSection
            contextualSchemes={routingPlan.contextualSchemes}
          />

          {/* 10. Transparency & Methodology Taxonomy */}
          <SchemeTaxonomyPanel
            taxonomy={routingPlan.taxonomy}
          />

          {/* 11. Official Verification Disclaimer */}
          <OfficialDisclaimerCard
            customDisclaimer={routingPlan.officialDisclaimer}
          />

          {/* 12. Navigation Controls */}
          <div className="pt-6 border-t border-[#DDE5DD] flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/financial-plan"
              state={{ session: activeSession }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white hover:bg-stone-50 text-[#14532D] text-xs font-semibold border border-[#DDE5DD] shadow-sm transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Financial Plan</span>
            </Link>

            <Link
              to="/advisory"
              state={{ 
                session: activeSession,
                schemeRoute: routingPlan,
                financialPlan: location.state?.financialPlan || null,
                marketData: location.state?.marketData || null,
                feasibilityData: location.state?.feasibilityData || null
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-950/40 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <span>Continue to AI Advisory</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
export default SchemeRouterPage;
