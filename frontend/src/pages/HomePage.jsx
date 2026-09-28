import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, IndianRupee, Sparkles, TrendingUp, 
  ShieldCheck, Calculator, Landmark, ArrowRight, CheckCircle2,
  Users, Award
} from 'lucide-react';
import { useSectors } from '../hooks/useSectors';
import { MetricCard } from '../components/common/MetricCard';
import { formatCurrencyINR } from '../utils/formatters';

export function HomePage() {
  const navigate = useNavigate();
  const { sectors, districts, loading } = useSectors();

  const [selectedSector, setSelectedSector] = useState('dairy-processing');
  const [selectedDistrict, setSelectedDistrict] = useState('varanasi-up');
  const [capital, setCapital] = useState(300000);
  const [name, setName] = useState('Ramesh Sharma');
  const [gender, setGender] = useState('general');
  const [category, setCategory] = useState('obc');

  const handleStartAnalysis = (e) => {
    e.preventDefault();
    // Navigate with query state to advisory
    navigate('/advisory', {
      state: {
        sector_id: selectedSector,
        district_id: selectedDistrict,
        proposed_capital: Number(capital),
        entrepreneur_name: name,
        gender: gender,
        social_category: category
      }
    });
  };

  return (
    <div className="space-y-10">
      
      {/* Hero Section */}
      <div className="relative rounded-3xl p-8 sm:p-12 overflow-hidden glass-panel border border-slate-800">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-96 h-96 bg-gradient-to-br from-indigo-600/20 via-cyan-500/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-3xl space-y-6 relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/80 border border-cyan-800/80 text-cyan-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> SIH 26091 — AI Advisory for Rural Micro-Entrepreneurs
          </div>

          <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
            AI-Driven Hyper-Local <span className="gradient-text">Business & Financial Advisory</span>
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Empowering rural micro-entrepreneurs with hyper-local market intelligence, feasibility ratings, government scheme matching (PMEGP, Mudra, PMFME), and bankable 3-year financial blueprints.
          </p>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Supported Sectors</span>
              <p className="text-lg font-bold text-white">6+ High Impact</p>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Government Schemes</span>
              <p className="text-lg font-bold text-emerald-400">PMEGP, Mudra, PMFME</p>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Subsidy Routing</span>
              <p className="text-lg font-bold text-cyan-400">Up to 35% Capital</p>
            </div>
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
              <span className="text-[11px] text-slate-400">Language Assistance</span>
              <p className="text-lg font-bold text-purple-400">Voice AI (HI / EN)</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Interactive Assistant Launch Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form Panel */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="w-10 h-10 rounded-xl bg-indigo-600/20 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Enterprise Profile Generator</h2>
              <p className="text-xs text-slate-400">Input location & capital to generate instant AI feasibility & scheme match</p>
            </div>
          </div>

          <form onSubmit={handleStartAnalysis} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Entrepreneur Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-cyan-400" /> Entrepreneur Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                  required
                />
              </div>

              {/* Proposed Capital */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-400" /> Proposed Capital (INR)
                </label>
                <input
                  type="number"
                  step="25000"
                  value={capital}
                  onChange={(e) => setCapital(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-emerald-500"
                  required
                />
                <span className="text-[11px] text-slate-400">Formatted: {formatCurrencyINR(Number(capital))}</span>
              </div>

              {/* Sector Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-indigo-400" /> Target Micro Sector
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-indigo-500"
                >
                  {sectors.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
              </div>

              {/* District Selection */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> Target District & State
                </label>
                <select
                  value={selectedDistrict}
                  onChange={(e) => setSelectedDistrict(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-rose-500"
                >
                  {districts.map(d => (
                    <option key={d.id} value={d.id}>{d.name}, {d.state} ({d.tier})</option>
                  ))}
                </select>
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Category / Gender</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="general">Male / General</option>
                  <option value="female">Female / Women Entrepreneur (35% Subsidy Match)</option>
                  <option value="transgender">Transgender</option>
                </select>
              </div>

              {/* Social Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300">Social Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="obc">OBC (Other Backward Class)</option>
                  <option value="sc">SC (Scheduled Caste)</option>
                  <option value="st">ST (Scheduled Tribe)</option>
                  <option value="general">General</option>
                </select>
              </div>

            </div>

            <div className="pt-3">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 via-indigo-600 to-purple-600 hover:from-cyan-400 hover:via-indigo-500 hover:to-purple-500 text-white font-bold text-sm shadow-xl shadow-indigo-600/30 flex items-center justify-center gap-2 group transition-all hover:scale-[1.01]"
              >
                <span>Generate Full AI Feasibility & Scheme Blueprint</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </form>
        </div>

        {/* Modular Access Cards */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider">Independent Core Engines</h3>

          <div 
            onClick={() => navigate('/market-intelligence')} 
            className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-cyan-500/50 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 group-hover:scale-110 transition-transform">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-cyan-300">Market Intelligence Engine</h4>
                <p className="text-xs text-slate-400">Demographics, competition index & pricing benchmarks</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/feasibility')} 
            className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-emerald-500/50 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 group-hover:scale-110 transition-transform">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-emerald-300">Feasibility Engine</h4>
                <p className="text-xs text-slate-400">Viability scoring, break-even period & risk matrix</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/financials')} 
            className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-indigo-500/50 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 group-hover:scale-110 transition-transform">
                <Calculator className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-indigo-300">Financial Structuring Engine</h4>
                <p className="text-xs text-slate-400">3-Yr Cashflow, DSCR ratio, CapEx/OpEx breakdown</p>
              </div>
            </div>
          </div>

          <div 
            onClick={() => navigate('/schemes')} 
            className="glass-panel p-4 rounded-2xl border border-slate-800 hover:border-amber-500/50 cursor-pointer group transition-all"
          >
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-amber-500/10 text-amber-400 group-hover:scale-110 transition-transform">
                <Landmark className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white group-hover:text-amber-300">Scheme Router Engine</h4>
                <p className="text-xs text-slate-400">PMEGP, PMFME & Mudra eligibility matcher</p>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* Featured Supported Micro Sectors Grid */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-white">Supported Micro-Enterprise Sectors</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {sectors.map(sector => (
            <div key={sector.id} className="glass-panel p-5 rounded-2xl border border-slate-800 space-y-3 hover:border-slate-700 transition-colors">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-semibold px-2.5 py-0.5 rounded-full bg-slate-800 text-indigo-300 border border-slate-700">
                  {sector.category}
                </span>
                <span className="text-[11px] text-slate-400">
                  {formatCurrencyINR(sector.avg_investment_min)} - {formatCurrencyINR(sector.avg_investment_max)}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white">{sector.name}</h4>
              <p className="text-xs text-slate-400 line-clamp-2">{sector.description}</p>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
