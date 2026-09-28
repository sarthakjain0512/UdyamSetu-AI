import React, { useEffect, useMemo } from 'react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { 
  Calculator, 
  IndianRupee, 
  ArrowRight, 
  ArrowLeft, 
  MapPin, 
  Building2, 
  Edit3, 
  AlertCircle, 
  RefreshCw, 
  Compass,
  ShieldCheck,
  Info
} from 'lucide-react';

import { useFinancials } from '../hooks/useFinancials';
import { useSectors } from '../hooks/useSectors';
import { getAnalysisSession } from '../services/sessionService';
import { formatCurrencyINR } from '../utils/formatters';

// Financial Module Components
import FinancialOverviewSection from '../components/financials/FinancialOverviewSection';
import EmiMoratoriumCard from '../components/financials/EmiMoratoriumCard';
import RepaymentScheduleSection from '../components/financials/RepaymentScheduleSection';
import FinancialChartsSection from '../components/financials/FinancialChartsSection';
import CashFlowDscrSection from '../components/financials/CashFlowDscrSection';
import FinancialSensitivitySection from '../components/financials/FinancialSensitivitySection';
import FinancialRisksSection from '../components/financials/FinancialRisksSection';
import FinancialRecommendationsSection from '../components/financials/FinancialRecommendationsSection';
import FinancialAssumptionsPanel from '../components/financials/FinancialAssumptionsPanel';

export function FinancialsPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { sectors, districts } = useSectors();
  const { data, loading, error, calculate } = useFinancials();

  // STEP 1: Consume active analysis session from Task-2
  const activeSession = useMemo(() => {
    if (location.state?.session) return location.state.session;
    return getAnalysisSession();
  }, [location.state]);

  // STEP 2: Guard checks — Session & Margin Capital
  const hasValidSession = Boolean(
    activeSession || 
    (location.state?.sector_id && location.state?.district_id)
  );

  const rawMargin = activeSession?.finance?.marginCapital ?? location.state?.proposed_capital;
  const parsedMargin = Number(rawMargin);
  const hasValidMargin = !isNaN(parsedMargin) && parsedMargin > 0;
  const marginCapital = hasValidMargin ? parsedMargin : null;

  const sectorId = activeSession?.business?.sectorId === 'other'
    ? 'dairy-processing'
    : (activeSession?.business?.sectorId || location.state?.sector_id || 'dairy-processing');

  const districtId = activeSession?.location?.districtId || location.state?.district_id || 'varanasi-up';
  const businessIdea = activeSession?.business?.idea || '';

  // Context resolution
  const sectorInfo = sectors.find(s => s.id === sectorId);
  const districtInfo = districts.find(d => d.id === districtId);

  const displayLocation = districtInfo 
    ? `${districtInfo.name}, ${districtInfo.state}` 
    : (activeSession?.location?.districtName || 'Varanasi, Uttar Pradesh');

  const displayCategory = sectorInfo 
    ? sectorInfo.name 
    : (activeSession?.business?.sectorName || 'Dairy & Food Processing');

  const displayIdea = businessIdea || (sectorInfo ? sectorInfo.description : 'Rural Value-Added Enterprise');

  // Trigger calculation when session and margin capital are verified
  useEffect(() => {
    if (hasValidSession && hasValidMargin) {
      calculate({
        marginCapital,
        sector_id: sectorId,
        equity_contribution: marginCapital,
        district_id: districtId
      });
    }
  }, [hasValidSession, hasValidMargin, marginCapital, sectorId, districtId]);

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
              Financial planning requires an active business profile (location, business idea, and available margin capital) to size project costs and structure debt repayments.
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
        </div>
      </div>
    );
  }

  // STEP 2B: MISSING MARGIN CAPITAL GUARD (Zero Hardcoded Fallback)
  if (!hasValidMargin) {
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
              Margin capital is required to generate the financial plan.
            </h1>
            <p className="text-sm text-emerald-100/70 leading-relaxed">
              A valid equity contribution amount is required to calculate project scale, borrowing requirements, EMI schedules, and DSCR coverage. No default or fabricated financial amounts are assumed.
            </p>
          </div>

          <div className="pt-2">
            <Link
              to="/new-analysis"
              className="inline-flex items-center gap-2 py-3.5 px-8 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-sm shadow-xl shadow-orange-950/40 transition-all transform hover:-translate-y-0.5"
            >
              <span>Complete Analysis Inputs</span>
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
            <Calculator className="w-3.5 h-3.5" /> Stage 3: Financial Structuring Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Financial Planning & Debt Structuring
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/70 mt-1">
            Transform equity inputs into bankable capital sizing, reducing-balance EMI schedules, and debt-service coverage.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <span className="text-[11px] font-mono text-emerald-300/80 bg-[#0c241b] px-3 py-1.5 rounded-xl border border-[#18533e]">
            SIH 26091 Financial Framework
          </span>
        </div>
      </div>

      {/* FINANCIAL PLANNING CONTEXT (Step 1) */}
      <div className="bg-[#0c241b] rounded-2xl p-5 border border-[#18533e] shadow-lg flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 flex-1">
          <div>
            <span className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-semibold block">
              Business Idea
            </span>
            <div className="text-xs font-bold text-white mt-0.5 truncate" title={displayIdea}>
              {displayIdea}
            </div>
          </div>

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
              Margin Capital
            </span>
            <div className="flex items-center gap-1 text-xs font-bold text-emerald-300 mt-0.5">
              <IndianRupee className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>{formatCurrencyINR(marginCapital)}</span>
            </div>
          </div>

          <div>
            <span className="text-[10px] text-emerald-300/60 uppercase tracking-wider font-semibold block">
              Est. Project Cost
            </span>
            <div className="text-xs font-bold text-amber-300 mt-0.5">
              {formatCurrencyINR(Math.round(marginCapital / 0.10))}
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
            Preparing financial plan...
          </p>
          <p className="text-xs text-emerald-300/60 max-w-md mx-auto">
            Structuring project capital, calculating amortization schedules, and modeling debt-service coverage.
          </p>
        </div>
      )}

      {/* ERROR STATE */}
      {error && !loading && (
        <div className="bg-rose-950/40 rounded-3xl p-8 border border-rose-800/80 text-center space-y-4">
          <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
          <div>
            <h3 className="text-base font-bold text-white">
              Financial plan could not be generated.
            </h3>
            <p className="text-xs text-rose-300/70 mt-1 max-w-md mx-auto">
              {error}
            </p>
          </div>
          <button
            onClick={() => calculate({
              marginCapital,
              sector_id: sectorId,
              equity_contribution: marginCapital,
              district_id: districtId
            })}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-rose-900/60 hover:bg-rose-900 text-white text-xs font-semibold border border-rose-700 transition-colors"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Financial Calculation</span>
          </button>
        </div>
      )}

      {/* MAIN FINANCIAL CONTENT */}
      {data && !loading && (
        <div className="space-y-8">
          
          {/* 1. Financial Overview Section (Step 5) */}
          <FinancialOverviewSection financing={data.financing} />

          {/* 2. Monthly Debt Service & Moratorium Modeling (Steps 6 & 7) */}
          <EmiMoratoriumCard financing={data.financing} emi={data.emi} />

          {/* 3. Visual Debt Analytics (Step 10) */}
          <FinancialChartsSection 
            financing={data.financing} 
            emi={data.emi} 
            repayment={data.repayment} 
          />

          {/* 4. Amortization & Repayment Schedule (Steps 8 & 9) */}
          <RepaymentScheduleSection 
            repayment={data.repayment} 
            financing={data.financing} 
            emi={data.emi} 
          />

          {/* 5. Indicative Cash Flow & DSCR (Steps 11 & 12) */}
          <CashFlowDscrSection 
            cashFlow={data.cashFlow} 
            dscr={data.dscr} 
          />

          {/* 6. Financial Sensitivity Stress Test (Step 14) */}
          <FinancialSensitivitySection 
            sensitivity={data.sensitivity} 
          />

          {/* 7. Financial Risk Assessment Matrix (Step 13) */}
          <FinancialRisksSection 
            risks={data.risks} 
          />

          {/* 8. Actionable Financial Recommendations (Step 15) */}
          <FinancialRecommendationsSection 
            recommendations={data.recommendations} 
          />

          {/* 9. Financial Assumptions & Methodology Panel (Steps 20 & 21) */}
          <FinancialAssumptionsPanel />

          {/* Regulatory Disclaimer Banner (Step 3) */}
          <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] flex items-start gap-3 text-xs text-emerald-200/80">
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">SIH 26091 Financial Framework Disclosure:</strong> Prototype financial structure based on SIH 26091 problem statement assumptions. Final eligibility, financing terms, interest rates, and sanction conditions must be verified against current official rules. This is not a loan approval system or bank sanction engine.
            </div>
          </div>

          {/* 11. NEXT STEP & NAVIGATION FOOTER (Step 25) */}
          <div className="pt-6 border-t border-[#18533e]/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Link
              to="/feasibility"
              state={{ session: activeSession }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#0c241b] hover:bg-[#12382b] text-emerald-300 text-xs font-semibold border border-[#18533e] transition-colors w-full sm:w-auto justify-center"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Feasibility</span>
            </Link>

            <Link
              to="/scheme-router"
              state={{ 
                session: activeSession,
                financialPlan: data,
                proposed_capital: marginCapital,
                sector_id: sectorId,
                district_id: districtId
              }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl shadow-orange-950/40 transition-all transform hover:-translate-y-0.5 w-full sm:w-auto justify-center"
            >
              <span>Continue to Scheme Guidance</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      )}

    </div>
  );
}
