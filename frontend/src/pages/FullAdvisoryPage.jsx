import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, FileText, Download, Printer, 
  MapPin, ShieldCheck, TrendingUp, Calculator, Landmark, ArrowRight, Volume2
} from 'lucide-react';
import { useAdvisory } from '../hooks/useAdvisory';
import { formatCurrencyINR } from '../utils/formatters';

export function FullAdvisoryPage() {
  const location = useLocation();
  const { data, loading, generateFullPlan } = useAdvisory();

  useEffect(() => {
    generateFullPlan({
      sector_id: location.state?.sector_id || 'dairy-processing',
      district_id: location.state?.district_id || 'varanasi-up',
      entrepreneur_name: location.state?.entrepreneur_name || 'Ramesh Sharma',
      proposed_capital: location.state?.proposed_capital || 300000,
      gender: location.state?.gender || 'female',
      social_category: location.state?.social_category || 'obc'
    });
  }, []);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      
      {/* Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-6 print:hidden">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-cyan-950 to-indigo-950 text-cyan-300 border border-cyan-800 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" /> Module 5: Comprehensive Advisory Blueprint Generator
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Full Bankable Enterprise Blueprint</h1>
          <p className="text-xs text-slate-400">Integrated report for Gramin Bank loan application & Gram Panchayat submission</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrint}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-bold flex items-center gap-2"
          >
            <Printer className="w-4 h-4" /> Print / Export PDF
          </button>
        </div>
      </div>

      {loading && (
        <div className="p-16 text-center space-y-4">
          <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center mx-auto animate-bounce">
            <Sparkles className="w-6 h-6" />
          </div>
          <p className="text-sm font-semibold text-slate-300">Generating hyper-local AI feasibility report & financial schedule...</p>
        </div>
      )}

      {data && !loading && (
        <div className="space-y-8">
          
          {/* Executive Summary Card */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-4 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-white">{data.business_title}</h2>
                <p className="text-xs text-cyan-400 flex items-center gap-1 mt-1">
                  <MapPin className="w-3.5 h-3.5" /> {data.location_display} | Sector: {data.sector_name}
                </p>
              </div>

              <div className="px-4 py-2 rounded-2xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-right">
                <span className="text-[10px] text-slate-400 block">Feasibility Rating</span>
                <span className="text-lg font-black">{data.feasibility.feasibility_grade}</span>
              </div>
            </div>

            <div className="bg-slate-900/90 p-4 rounded-2xl border border-slate-800 text-xs sm:text-sm text-slate-300 leading-relaxed">
              <strong className="text-white block mb-1">Executive Summary:</strong>
              {data.executive_summary}
            </div>

            {/* Voice Script Prompt */}
            {data.voice_script_summary && (
              <div className="bg-indigo-950/40 p-4 rounded-2xl border border-indigo-900/60 space-y-2">
                <span className="text-xs font-bold text-indigo-300 flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-indigo-400" /> Rural Voice Summary (Hindi Audio Script):
                </span>
                <p className="text-xs text-indigo-200 italic">"{data.voice_script_summary.hi}"</p>
              </div>
            )}
          </div>

          {/* Core Analytics Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Feasibility Overview */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                <ShieldCheck className="w-4 h-4" /> Viability Score
              </div>
              <p className="text-3xl font-black text-white">{data.feasibility.feasibility_score}<span className="text-xs text-slate-400 font-normal">/100</span></p>
              <p className="text-xs text-slate-400">Break-even: <strong className="text-slate-200">{data.feasibility.estimated_breakeven_months} Months</strong></p>
            </div>

            {/* Financial Overview */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-indigo-400 font-bold text-sm">
                <Calculator className="w-4 h-4" /> Debt & Cash Flow
              </div>
              <p className="text-3xl font-black text-white">₹{data.financial_structure.monthly_emi_est.toLocaleString('en-IN')}<span className="text-xs text-slate-400 font-normal">/mo EMI</span></p>
              <p className="text-xs text-slate-400">DSCR Ratio: <strong className="text-emerald-400 font-bold">{data.financial_structure.dscr}</strong></p>
            </div>

            {/* Scheme Overview */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-3">
              <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
                <Landmark className="w-4 h-4" /> Scheme Match
              </div>
              <p className="text-3xl font-black text-white">{formatCurrencyINR(data.matching_schemes.best_matching_scheme.max_subsidy_amount)}</p>
              <p className="text-xs text-amber-300">{data.matching_schemes.best_matching_scheme.scheme_code} Subsidy</p>
            </div>

          </div>

          {/* Step-by-Step Action Roadmap */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-cyan-400" /> Actionable 10-Week Execution Blueprint
            </h3>

            <div className="space-y-4">
              {data.roadmap_steps.map((step) => (
                <div key={step.step_number} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-cyan-500/20 text-cyan-400 font-bold text-xs flex items-center justify-center shrink-0">
                    #{step.step_number}
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="text-xs font-semibold text-cyan-300">{step.phase}</span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-800 text-slate-400">{step.estimated_days} Days</span>
                    </div>
                    <h4 className="text-sm font-bold text-white">{step.title}</h4>
                    <p className="text-xs text-slate-400">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mandatory Compliance Checklist */}
          <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-slate-800 space-y-6">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <FileText className="w-5 h-5 text-purple-400" /> Statutory Compliance & Clearances
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {data.compliance_checklist.map((c, idx) => (
                <div key={idx} className="bg-slate-900/80 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">{c.title}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                      c.mandatory ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {c.mandatory ? 'Mandatory' : 'Optional'}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400"><strong className="text-slate-300">Authority:</strong> {c.authority}</p>
                  <p className="text-xs text-slate-400">{c.guidance}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
