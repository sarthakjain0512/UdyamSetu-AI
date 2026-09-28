import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  Building2, MapPin, IndianRupee, Sparkles, TrendingUp, 
  ShieldCheck, Calculator, Landmark, ArrowRight, CheckCircle2,
  Users, Award, FileText, ChevronRight, AlertCircle, Compass
} from 'lucide-react';
import { useSectors } from '../hooks/useSectors';
import { formatCurrencyINR } from '../utils/formatters';

export function HomePage() {
  const navigate = useNavigate();
  const { sectors, loading } = useSectors();

  const workflowSteps = [
    {
      step: '01',
      title: 'Market Intelligence',
      path: '/market-analysis',
      icon: TrendingUp,
      desc: 'Hyper-local mandi prices, buyer demand index & competitor saturation analysis.',
      badge: 'Demand & Supply'
    },
    {
      step: '02',
      title: 'Business Feasibility',
      path: '/feasibility',
      icon: ShieldCheck,
      desc: 'Operational scoring (0–100), infrastructure checks & compliance clearance.',
      badge: 'Viability Score'
    },
    {
      step: '03',
      title: 'Financial Planning',
      path: '/financial-plan',
      icon: Calculator,
      desc: 'CapEx/OpEx allocation, 90% debt sizing, DSCR ratio & 3-year cash flow projections.',
      badge: 'DSCR & EMI'
    },
    {
      step: '04',
      title: 'Scheme Guidance',
      path: '/scheme-router',
      icon: Landmark,
      desc: 'PMEGP, Mudra, and PMFME credit subsidy router with up to 35% capital support.',
      badge: 'Up to 35% Subsidy'
    },
    {
      step: '05',
      title: 'Business Launch Plan',
      path: '/business-plan',
      icon: FileText,
      desc: 'Unified bankable advisory blueprint & 90-day milestone-driven execution roadmap.',
      badge: 'Bank-Ready PDF'
    }
  ];

  return (
    <div className="space-y-12">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden bg-gradient-to-br from-[#063325] via-[#09291e] to-[#041913] border border-[#144937] shadow-xl">
        <div className="absolute top-0 right-0 -mt-16 -mr-16 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-4xl space-y-6 relative z-10">
          
          {/* Badges: SIH Problem & Prototype Indicator */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/90 border border-emerald-700/60 text-emerald-200 text-xs font-semibold">
              <Award className="w-3.5 h-3.5 text-amber-400" />
              SIH 26091 — Rural Micro-Enterprise Advisory
            </span>
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-medium">
              <AlertCircle className="w-3 h-3 text-amber-400" /> Prototype • Demo Data
            </span>
          </div>

          {/* Main Title & Tagline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-tight">
              UdyamSetu <span className="text-amber-400">AI</span>
            </h1>
            <p className="text-lg sm:text-xl font-semibold text-emerald-300 tracking-wide">
              From Local Insight to Sustainable Enterprise
            </p>
          </div>

          {/* Product Explanation */}
          <p className="text-sm sm:text-base text-emerald-100/80 leading-relaxed max-w-2xl">
            An AI-driven hyper-local advisory and financial structuring platform tailored for rural micro-entrepreneurs. Evaluate market viability, optimize capital allocation, and unlock credit-linked government subsidies with bank-ready blueprints.
          </p>

          {/* Primary CTA & Secondary Action */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <Link
              to="/new-analysis"
              className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-sm sm:text-base shadow-xl shadow-orange-950/50 flex items-center gap-2.5 group transition-all transform hover:-translate-y-0.5"
            >
              <Compass className="w-5 h-5 text-amber-200" />
              <span>Start New Business Analysis</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/business-plan"
              className="py-3.5 px-6 rounded-2xl bg-[#0b3829] hover:bg-[#0e4835] text-emerald-200 hover:text-white font-semibold text-sm border border-[#1b5c45] flex items-center gap-2 transition-all"
            >
              <FileText className="w-4 h-4 text-emerald-400" />
              <span>View Sample Blueprint</span>
            </Link>
          </div>

          {/* Highlight Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-[#134232]">
            <div className="bg-[#051c14]/70 p-3 rounded-xl border border-[#164b38]">
              <span className="text-[11px] text-emerald-300/70">Supported Sectors</span>
              <p className="text-base font-bold text-white">6+ High Impact</p>
            </div>
            <div className="bg-[#051c14]/70 p-3 rounded-xl border border-[#164b38]">
              <span className="text-[11px] text-emerald-300/70">Financing Structure</span>
              <p className="text-base font-bold text-amber-400">10% Margin / 90% Debt</p>
            </div>
            <div className="bg-[#051c14]/70 p-3 rounded-xl border border-[#164b38]">
              <span className="text-[11px] text-emerald-300/70">Subsidy Routing</span>
              <p className="text-base font-bold text-emerald-300">Up to 35% Capital</p>
            </div>
            <div className="bg-[#051c14]/70 p-3 rounded-xl border border-[#164b38]">
              <span className="text-[11px] text-emerald-300/70">Language Support</span>
              <p className="text-base font-bold text-teal-300">Voice AI (HI / EN)</p>
            </div>
          </div>

        </div>
      </div>

      {/* Advisory Workflow Section (Required Step 4) */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2 border-b border-[#144233] pb-4">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Advisory & Structuring Workflow
            </h2>
            <p className="text-xs text-emerald-200/70 mt-1">
              Deterministic 5-stage pipeline transforming local inputs into sustainable rural enterprises
            </p>
          </div>
          <Link
            to="/new-analysis"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            Launch full journey <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* 5-Step Pipeline Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {workflowSteps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.step}
                onClick={() => navigate(step.path)}
                className="bg-[#0c241b] hover:bg-[#0f2e22] rounded-2xl p-5 border border-[#174e3a] hover:border-emerald-500/50 cursor-pointer transition-all duration-200 group flex flex-col justify-between space-y-4 shadow-sm"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono font-bold text-amber-400/90 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                      Step {step.step}
                    </span>
                    <span className="text-[10px] text-emerald-300/80 font-medium bg-[#081f17] px-2 py-0.5 rounded-full border border-[#184f3c]">
                      {step.badge}
                    </span>
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-emerald-950 flex items-center justify-center text-emerald-300 group-hover:scale-105 transition-transform border border-emerald-700/40">
                    <Icon className="w-5 h-5" />
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                      {step.title}
                    </h3>
                    <p className="text-xs text-emerald-100/70 mt-1.5 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>

                <div className="pt-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-300 group-hover:text-amber-300">
                  <span>Explore Module</span>
                  <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Featured Micro-Enterprise Sectors */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-[#144233] pb-3">
          <div>
            <h3 className="text-lg font-bold text-white">Supported Micro-Enterprise Sectors</h3>
            <p className="text-xs text-emerald-200/60">Sectors with proven rural viability and central subsidy alignment</p>
          </div>
          <Link to="/new-analysis" className="text-xs font-medium text-amber-400 hover:text-amber-300">
            Select in New Analysis →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map(sector => (
            <div 
              key={sector.id} 
              onClick={() => navigate('/new-analysis')}
              className="bg-[#0b2219] hover:bg-[#0e2c20] p-5 rounded-2xl border border-[#154634] space-y-3 cursor-pointer transition-colors group"
            >
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-[#051c14] text-emerald-300 border border-[#1c5540]">
                  {sector.category}
                </span>
                <span className="text-[11px] text-emerald-300/80 font-mono">
                  {formatCurrencyINR(sector.avg_investment_min)} – {formatCurrencyINR(sector.avg_investment_max)}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-amber-300 transition-colors">
                {sector.name}
              </h4>
              <p className="text-xs text-emerald-100/70 line-clamp-2 leading-relaxed">
                {sector.description}
              </p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
