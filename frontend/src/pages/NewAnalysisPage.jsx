import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, IndianRupee, Sparkles, ArrowRight, 
  Lightbulb, AlertCircle, Info, ShieldCheck, CheckCircle2 
} from 'lucide-react';
import { useSectors } from '../hooks/useSectors';
import { formatCurrencyINR } from '../utils/formatters';

export function NewAnalysisPage() {
  const navigate = useNavigate();
  const { sectors, districts, loading, error: sectorsError } = useSectors();

  // Core 3 Inputs specified by SIH 26091
  const [districtId, setDistrictId] = useState('varanasi-up');
  const [marginCapital, setMarginCapital] = useState(300000);
  const [sectorId, setSectorId] = useState('dairy-processing');
  const [customIdea, setCustomIdea] = useState('Cold storage milk chilling & packaging center');

  // Supporting contextual inputs for scheme matching
  const [entrepreneurName, setEntrepreneurName] = useState('Ramesh Sharma');
  const [gender, setGender] = useState('general');
  const [socialCategory, setSocialCategory] = useState('obc');

  // Validation state
  const [validationError, setValidationError] = useState('');

  // Sizing calculation preview based on SIH guidelines: Project Cost = Margin / 0.10
  const estimatedProjectCost = marginCapital > 0 ? Math.round(marginCapital / 0.10) : 0;
  const estimatedLoanAmount = marginCapital > 0 ? Math.round(estimatedProjectCost * 0.90) : 0;

  const handleSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    if (!districtId) {
      setValidationError('Please select a target district location.');
      return;
    }
    if (!marginCapital || Number(marginCapital) <= 0) {
      setValidationError('Please enter a valid available margin capital amount (greater than ₹0).');
      return;
    }
    if (!sectorId) {
      setValidationError('Please select a business category or sector.');
      return;
    }

    // Navigate to Market Analysis as stage 1 of the advisory workflow
    navigate('/market-analysis', {
      state: {
        sector_id: sectorId,
        district_id: districtId,
        proposed_capital: Number(marginCapital),
        business_idea: customIdea,
        entrepreneur_name: entrepreneurName,
        gender: gender,
        social_category: socialCategory
      }
    });
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      
      {/* Page Header */}
      <div className="border-b border-[#144233] pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800 mb-3">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          Intake & Opportunity Discovery
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight">
          Start New Business Analysis
        </h1>
        <p className="text-sm text-emerald-100/70 mt-1">
          Evaluate venture viability, market competition, and debt structuring tailored for rural micro-entrepreneurs.
        </p>
      </div>

      {/* Validation Banner */}
      {validationError && (
        <div className="p-4 rounded-xl bg-red-950/70 border border-red-800 text-red-200 text-xs flex items-center gap-2.5">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{validationError}</span>
        </div>
      )}

      {/* Main Intake Form */}
      <form onSubmit={handleSubmit} className="space-y-8">
        
        {/* Step 1: Location & Business Category */}
        <div className="bg-[#0c241b] rounded-2xl p-6 sm:p-8 border border-[#164b38] space-y-6 shadow-md">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#144233] pb-3">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-100 text-xs flex items-center justify-center font-bold">1</span>
            Enterprise Location & Category
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Input 1: Location */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-rose-400" />
                Target District & State (Location)
              </label>
              <select
                value={districtId}
                onChange={(e) => setDistrictId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
                required
              >
                {districts.map(d => (
                  <option key={d.id} value={d.id}>
                    {d.name}, {d.state} ({d.tier})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-emerald-200/60 leading-relaxed">
                Hyper-local demand, raw material access, and transport density are computed for this geographic tier.
              </p>
            </div>

            {/* Input 2: Business Category */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-emerald-400" />
                Business Category / Sector
              </label>
              <select
                value={sectorId}
                onChange={(e) => setSectorId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
                required
              >
                {sectors.map(s => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.category})
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-emerald-200/60 leading-relaxed">
                Standardizes CapEx/OpEx allocation, operating margin benchmarks, and scheme subsidy criteria.
              </p>
            </div>

            {/* Custom Business Idea text */}
            <div className="space-y-2 md:col-span-2">
              <label className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                Specific Business Idea / Scope (Optional)
              </label>
              <input
                type="text"
                value={customIdea}
                onChange={(e) => setCustomIdea(e.target.value)}
                placeholder="e.g. Village-level solar milk processing & cold storage unit"
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
              />
              <p className="text-[11px] text-emerald-200/60">
                Provide a short title or operational focus for customized advisory recommendations.
              </p>
            </div>

          </div>
        </div>

        {/* Step 2: Available Margin Capital */}
        <div className="bg-[#0c241b] rounded-2xl p-6 sm:p-8 border border-[#164b38] space-y-6 shadow-md">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#144233] pb-3">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-100 text-xs flex items-center justify-center font-bold">2</span>
            Available Margin Capital & Financial Sizing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
            
            <div className="space-y-2">
              <label className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                <IndianRupee className="w-4 h-4 text-emerald-400" />
                Available Margin Capital (INR)
              </label>
              <div className="relative">
                <span className="absolute left-3.5 top-2.5 text-emerald-400 text-sm font-bold">₹</span>
                <input
                  type="number"
                  step="10000"
                  min="10000"
                  value={marginCapital}
                  onChange={(e) => setMarginCapital(Number(e.target.value))}
                  className="w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white font-medium focus:outline-none focus:border-emerald-400"
                  required
                />
              </div>
              <div className="flex items-center justify-between text-[11px] text-emerald-200/70 pt-1">
                <span>Own Equity Contribution</span>
                <span className="font-bold text-emerald-300">{formatCurrencyINR(Number(marginCapital))}</span>
              </div>
            </div>

            {/* Financial Formula Callout Box */}
            <div className="p-4 rounded-xl bg-[#071d15] border border-[#1c5540] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-300">
                <Info className="w-4 h-4 text-amber-400" />
                SIH 26091 Financial Sizing Framework
              </div>
              <p className="text-[11px] text-emerald-100/80 leading-relaxed">
                Project Cost is sized assuming a standard 10% entrepreneur margin capital and 90% debt financing:
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs pt-1 border-t border-[#133c2d]">
                <div>
                  <span className="text-[10px] text-emerald-300/60 block">Projected Project Cost</span>
                  <span className="font-bold text-white text-sm">{formatCurrencyINR(estimatedProjectCost)}</span>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300/60 block">Projected Bank Loan (90%)</span>
                  <span className="font-bold text-emerald-400 text-sm">{formatCurrencyINR(estimatedLoanAmount)}</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Step 3: Entrepreneur Profile & Subsidy Match Context */}
        <div className="bg-[#0c241b] rounded-2xl p-6 sm:p-8 border border-[#164b38] space-y-6 shadow-md">
          <h2 className="text-lg font-bold text-white flex items-center gap-2 border-b border-[#144233] pb-3">
            <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-100 text-xs flex items-center justify-center font-bold">3</span>
            Beneficiary Profile (For Scheme Eligibility)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-emerald-100">Entrepreneur Name</label>
              <input
                type="text"
                value={entrepreneurName}
                onChange={(e) => setEntrepreneurName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-emerald-100">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="general">Male / General</option>
                <option value="female">Female / Women (Qualifies for 35% PMEGP Subsidy)</option>
                <option value="transgender">Transgender</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-emerald-100">Social Category</label>
              <select
                value={socialCategory}
                onChange={(e) => setSocialCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="obc">OBC (Other Backward Class)</option>
                <option value="sc">SC (Scheduled Caste)</option>
                <option value="st">ST (Scheduled Tribe)</option>
                <option value="general">General</option>
              </select>
            </div>

          </div>
        </div>

        {/* Form Actions */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-base shadow-lg shadow-orange-950/40 flex items-center justify-center gap-2 group transition-all"
          >
            <span>Analyze Business Opportunity</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </button>
          <p className="text-center text-[11px] text-emerald-200/60 mt-2">
            Inputs will be evaluated across Market Intelligence, Feasibility Scoring, and Government Subsidy Routing.
          </p>
        </div>

      </form>
    </div>
  );
}
