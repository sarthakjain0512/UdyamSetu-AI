import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, MapPin, IndianRupee, Sparkles, TrendingUp, 
  ShieldCheck, Calculator, Landmark, ArrowRight, CheckCircle2,
  Users, Award, FileText, ChevronRight, AlertCircle, Compass
} from 'lucide-react';
import { useSectors } from '../hooks/useSectors';
import { useAnalysisState } from '../hooks/useAnalysisState';
import ModuleStatusBadge from '../components/common/ModuleStatusBadge';
import { formatCurrencyINR } from '../utils/formatters';

export function HomePage() {
  const navigate = useNavigate();
  const { sectors } = useSectors();
  const { session, moduleStatuses } = useAnalysisState();

  const workflowSteps = [
    {
      step: '01',
      key: 'market',
      title: 'Market Intelligence',
      path: '/market-analysis',
      icon: TrendingUp,
      desc: 'Hyper-local demand signals, competitive vendor landscape, and margin benchmarks within 5–10 km.',
      badge: 'Demand & Pricing'
    },
    {
      step: '02',
      key: 'feasibility',
      title: 'Business Feasibility',
      path: '/feasibility',
      icon: ShieldCheck,
      desc: 'Operational scoring (0–100), infrastructure prerequisites, resource checks & break-even horizons.',
      badge: 'Operational Score'
    },
    {
      step: '03',
      key: 'financial',
      title: 'Financial Planning',
      path: '/financial-plan',
      icon: Calculator,
      desc: 'SIH 26091 capital sizing: 10% equity, 90% debt, reducing EMI, DSCR & 3-year cash flow projections.',
      badge: 'DSCR & EMI'
    },
    {
      step: '04',
      key: 'scheme',
      title: 'Scheme Guidance',
      path: '/scheme-router',
      icon: Landmark,
      desc: 'PMEGP, Mudra, and PMFME credit subsidy router with up to 35% capital support identification.',
      badge: 'Up to 35% Subsidy'
    },
    {
      step: '05',
      key: 'advisory',
      title: 'Strategic Advisory',
      path: '/advisory',
      icon: Sparkles,
      desc: 'Multi-module cross-analysis generating prioritized action roadmap and validation questions.',
      badge: 'Action Roadmap'
    },
    {
      step: '06',
      key: 'businessPlan',
      title: 'Business Launch Plan',
      path: '/business-plan',
      icon: FileText,
      desc: 'Structured 90-day execution blueprint, readiness audit, milestones, and risk controls.',
      badge: '90-Day Blueprint'
    }
  ];

  // Derive next active step for quick continuation
  const nextStep = workflowSteps.find(s => {
    const st = moduleStatuses[s.key];
    return !st || st.status === 'not_started' || st.isStale;
  }) || workflowSteps[workflowSteps.length - 1];

  return (
    <div className="space-y-10">
      
      {/* Hero Section — Premium Light Gov-Tech Banner */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-white text-[#17211B] shadow-sm border border-[#DDE5DD]">
        <div className="max-w-4xl space-y-6 relative z-10">
          
          {/* SIH Hackathon & Evaluation Badge */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#14532D] text-xs font-semibold border border-emerald-200">
              <Award className="w-3.5 h-3.5 text-[#E58A24]" />
              Smart India Hackathon 2026 • SIH 26091
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 border border-amber-200 text-[#C87512] text-xs font-medium">
              <AlertCircle className="w-3 h-3 text-[#C87512]" /> Prototype • Demo Data
            </span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#14532D] leading-tight">
              UdyamSetu <span className="text-[#E58A24]">AI</span>
            </h1>
            <p className="text-xl sm:text-2xl font-bold text-[#E58A24] tracking-wide">
              From Local Insight to Sustainable Enterprise
            </p>
          </div>

          {/* Value Proposition for SIH Judges */}
          <p className="text-sm sm:text-base text-[#647067] leading-relaxed max-w-3xl">
            AI-assisted hyper-local business advisory and financial structuring for rural micro-entrepreneurs. Evaluate market viability, optimize capital allocation, and unlock credit-linked government subsidies with an actionable 90-day launch roadmap.
          </p>

          {/* Primary & Secondary CTAs */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/new-analysis"
              className="py-3.5 px-7 rounded-xl bg-[#E58A24] hover:bg-[#c87512] text-white font-bold text-sm sm:text-base shadow-sm flex items-center gap-2.5 transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5" />
              <span>Create New Analysis</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {session ? (
              <Link
                to={nextStep.path}
                className="py-3.5 px-6 rounded-xl bg-white hover:bg-stone-50 text-[#14532D] font-bold text-sm border border-[#14532D] flex items-center gap-2 transition-all shadow-sm"
              >
                <span>Resume Active Analysis ({nextStep.title})</span>
                <ArrowRight className="w-4 h-4 text-[#14532D]" />
              </Link>
            ) : (
              <Link
                to="/business-plan"
                className="py-3.5 px-6 rounded-xl bg-white hover:bg-stone-50 text-[#14532D] font-semibold text-sm border border-[#DDE5DD] flex items-center gap-2 transition-all shadow-sm"
              >
                <FileText className="w-4 h-4 text-[#0F766E]" />
                <span>View Sample Blueprint</span>
              </Link>
            )}
          </div>

          {/* Summary Feature Highlights */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#DDE5DD]">
            <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#DDE5DD]">
              <span className="text-[11px] text-[#647067] block">Target Users</span>
              <p className="text-sm font-bold text-[#17211B] mt-0.5">Rural Micro-Entrepreneurs</p>
            </div>
            <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#DDE5DD]">
              <span className="text-[11px] text-[#647067] block">Financing Formula</span>
              <p className="text-sm font-bold text-[#C87512] mt-0.5">10% Equity / 90% Debt</p>
            </div>
            <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#DDE5DD]">
              <span className="text-[11px] text-[#647067] block">Scheme Pathways</span>
              <p className="text-sm font-bold text-[#14532D] mt-0.5">PMEGP • Mudra • PMFME</p>
            </div>
            <div className="bg-[#F7F5EF] p-3 rounded-xl border border-[#DDE5DD]">
              <span className="text-[11px] text-[#647067] block">Multi-Lingual</span>
              <p className="text-sm font-bold text-[#0F766E] mt-0.5">Voice AI (Hindi / English)</p>
            </div>
          </div>

        </div>
      </div>

      {/* ACTIVE SESSION SUMMARY CARD (If session exists) */}
      {session && (
        <div className="bg-white rounded-2xl p-6 border border-[#DDE5DD] shadow-sm space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DD] pb-4">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#14532D] bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 mb-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#16803C]" />
                <span>Active Entrepreneur Session</span>
              </div>
              <h2 className="text-xl font-black text-[#17211B]">
                {session.business?.idea || session.business?.category || 'Rural Micro-Enterprise'}
              </h2>
              <p className="text-xs text-[#647067] mt-0.5">
                {session.location?.districtName || session.location?.district || 'Location defined'} • Available Margin: {formatCurrencyINR(session.finance?.marginCapital || 0)}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link
                to={nextStep.path}
                className="px-5 py-2.5 rounded-xl bg-[#14532D] hover:bg-[#0f3e22] text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-2 transition-all"
              >
                <span>Continue: {nextStep.title}</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-300" />
              </Link>
            </div>
          </div>

          {/* Module-by-module Progress Chips */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
            {workflowSteps.map(step => {
              const st = moduleStatuses[step.key];
              return (
                <div 
                  key={step.key} 
                  onClick={() => navigate(step.path)}
                  className="bg-stone-50 hover:bg-emerald-50/50 p-3 rounded-xl border border-[#DDE5DD] cursor-pointer transition-colors space-y-1.5"
                >
                  <div className="text-[11px] font-semibold text-[#17211B] truncate">
                    {step.title}
                  </div>
                  <div>
                    <ModuleStatusBadge 
                      status={st?.status || 'not_started'} 
                      isStale={st?.isStale} 
                      size="xs" 
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 10-Second Understanding: What It Does Section */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#DDE5DD] pb-3">
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-[#14532D] tracking-tight">
              Integrated Rural Advisory Pipeline
            </h2>
            <p className="text-xs text-[#647067] mt-1">
              A 6-stage structured framework translating local market signals into viable, bankable rural ventures
            </p>
          </div>
          <Link
            to="/new-analysis"
            className="text-xs font-semibold text-[#0F766E] hover:text-[#14532D] flex items-center gap-1"
          >
            Launch full journey <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 6-Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {workflowSteps.map((step) => {
            const Icon = step.icon;
            const st = moduleStatuses[step.key];
            return (
              <div
                key={step.step}
                onClick={() => navigate(step.path)}
                className="bg-white hover:bg-stone-50/80 rounded-2xl p-5 border border-[#DDE5DD] hover:border-[#14532D]/40 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-[#14532D] bg-emerald-50 px-2.5 py-0.5 rounded border border-emerald-200">
                      Stage {step.step}
                    </span>
                    <ModuleStatusBadge 
                      status={st?.status || 'not_started'} 
                      isStale={st?.isStale} 
                      size="xs" 
                    />
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-[#14532D] group-hover:scale-105 transition-transform border border-emerald-200">
                    <Icon className="w-5 h-5 text-[#14532D]" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-[#17211B] group-hover:text-[#14532D] transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-[#647067] mt-1.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-semibold text-[#0F766E] group-hover:text-[#14532D] border-t border-[#DDE5DD]">
                  <span>Explore Module</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Supported Rural Micro-Enterprise Sectors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#DDE5DD] pb-3">
          <div>
            <h3 className="text-lg font-bold text-[#14532D]">Curated Micro-Enterprise Sectors</h3>
            <p className="text-xs text-[#647067]">Archetypes with verified non-discretionary rural demand and PMEGP/Mudra subsidy alignment</p>
          </div>
          <Link to="/new-analysis" className="text-xs font-semibold text-[#0F766E] hover:text-[#14532D]">
            Select in New Analysis →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map(sector => (
            <div 
              key={sector.id} 
              onClick={() => navigate('/new-analysis')}
              className="bg-white hover:bg-stone-50/80 p-5 rounded-2xl border border-[#DDE5DD] space-y-2.5 cursor-pointer transition-colors shadow-sm group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-[#14532D] border border-emerald-200">
                  {sector.category}
                </span>
                <span className="text-[11px] text-[#647067] font-mono">
                  {formatCurrencyINR(sector.avg_investment_min)} – {formatCurrencyINR(sector.avg_investment_max)}
                </span>
              </div>
              <h4 className="text-sm font-bold text-[#17211B] group-hover:text-[#14532D] transition-colors">
                {sector.name}
              </h4>
              <p className="text-xs text-[#647067] line-clamp-2 leading-relaxed">
                {sector.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default HomePage;
