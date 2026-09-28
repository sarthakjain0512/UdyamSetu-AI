import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Building2, MapPin, IndianRupee, Sparkles, ArrowRight, 
  Lightbulb, AlertCircle, Info, ShieldCheck, CheckCircle2,
  FileQuestion, Users, Compass, RefreshCw
} from 'lucide-react';
import { useSectors } from '../hooks/useSectors';
import { formatCurrencyINR } from '../utils/formatters';
import { computeFinancialPreview } from '../utils/financialPreview';
import { saveAnalysisSession, getAnalysisSession } from '../services/sessionService';
import { AnalysisSummaryCard } from '../components/analysis/AnalysisSummaryCard';

export function NewAnalysisPage() {
  const navigate = useNavigate();
  const { sectors, districts, loading, error: sectorsError } = useSectors();

  // Check for any previous active session to allow restoring or editing
  const existingSession = useMemo(() => getAnalysisSession(), []);

  // Section 1: Location State
  const [selectedState, setSelectedState] = useState(
    existingSession?.location?.state || 'Uttar Pradesh'
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState(
    existingSession?.location?.districtId || 'varanasi-up'
  );
  const [blockOrLocality, setBlockOrLocality] = useState(
    existingSession?.location?.blockOrLocality || ''
  );

  // Section 2: Business Category & Idea
  const [selectedSectorId, setSelectedSectorId] = useState(
    existingSession?.business?.isCustom ? 'other' : (existingSession?.business?.sectorId || 'dairy-processing')
  );
  const [customIdea, setCustomIdea] = useState(
    existingSession?.business?.idea || ''
  );

  // Section 3: Available Margin Capital
  const [marginCapitalInput, setMarginCapitalInput] = useState(
    existingSession?.finance?.marginCapital ? String(existingSession.finance.marginCapital) : '300000'
  );

  // Section 4: Entrepreneur Context (Optional)
  const [entrepreneurName, setEntrepreneurName] = useState(
    existingSession?.entrepreneurContext?.name || 'Ramesh Sharma'
  );
  const [gender, setGender] = useState(
    existingSession?.entrepreneurContext?.gender || 'general'
  );
  const [socialCategory, setSocialCategory] = useState(
    existingSession?.entrepreneurContext?.socialCategory || 'obc'
  );
  const [areaContext, setAreaContext] = useState(
    existingSession?.entrepreneurContext?.areaContext || 'rural'
  );

  // Validation Errors state
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Derived unique states from districts list
  const availableStates = useMemo(() => {
    const set = new Set(districts.map(d => d.state).filter(Boolean));
    return Array.from(set);
  }, [districts]);

  // Filtered districts for selected state
  const filteredDistricts = useMemo(() => {
    if (!selectedState) return districts;
    const matched = districts.filter(d => d.state === selectedState);
    return matched.length > 0 ? matched : districts;
  }, [districts, selectedState]);

  // Selected district object
  const currentDistrict = useMemo(() => {
    return districts.find(d => d.id === selectedDistrictId) || null;
  }, [districts, selectedDistrictId]);

  // Selected sector object
  const isCustomSector = selectedSectorId === 'other';
  const currentSector = useMemo(() => {
    return sectors.find(s => s.id === selectedSectorId) || null;
  }, [sectors, selectedSectorId]);

  // Numeric capital value for live calculations
  const parsedCapital = Number(marginCapitalInput) || 0;
  const financialPreview = computeFinancialPreview(parsedCapital);

  // Handle State selection change
  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setErrors(prev => ({ ...prev, state: undefined }));

    // Reset or auto-select first district in newly selected state
    const matched = districts.filter(d => d.state === newState);
    if (matched.length > 0) {
      setSelectedDistrictId(matched[0].id);
      setErrors(prev => ({ ...prev, district: undefined }));
    }
  };

  // Handle District change
  const handleDistrictChange = (e) => {
    const newDistrictId = e.target.value;
    setSelectedDistrictId(newDistrictId);
    setErrors(prev => ({ ...prev, district: undefined }));

    // If state does not match district's state, sync state
    const dist = districts.find(d => d.id === newDistrictId);
    if (dist && dist.state && dist.state !== selectedState) {
      setSelectedState(dist.state);
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    // Location validation
    if (!selectedState || selectedState.trim() === '') {
      newErrors.state = 'Please select a state.';
    }
    if (!selectedDistrictId || selectedDistrictId.trim() === '') {
      newErrors.district = 'Please select a district.';
    }

    // Business idea validation
    if (!selectedSectorId || selectedSectorId.trim() === '') {
      newErrors.category = 'Please select a business category.';
    }
    if (isCustomSector && (!customIdea || customIdea.trim().length < 3)) {
      newErrors.customIdea = 'Please provide a descriptive business idea (at least 3 characters).';
    }

    // Margin capital validation
    if (!marginCapitalInput || marginCapitalInput.trim() === '') {
      newErrors.marginCapital = 'Please enter a valid margin capital amount.';
    } else {
      const cap = Number(marginCapitalInput);
      if (isNaN(cap)) {
        newErrors.marginCapital = 'Please enter a valid numeric amount.';
      } else if (cap <= 0) {
        newErrors.marginCapital = 'Margin capital must be greater than ₹0.';
      } else if (cap < 5000) {
        newErrors.marginCapital = 'Margin capital should be at least ₹5,000 for meaningful enterprise sizing.';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    setIsSubmitting(true);

    try {
      // Build normalized session data
      const categoryLabel = isCustomSector 
        ? 'Custom Enterprise' 
        : (currentSector?.name || selectedSectorId);

      const finalIdea = customIdea.trim() || categoryLabel;

      const sessionPayload = {
        location: {
          state: selectedState,
          district: currentDistrict?.name || 'Varanasi',
          districtId: selectedDistrictId,
          blockOrLocality: blockOrLocality.trim(),
          tier: currentDistrict?.tier || 'Tier-3 / Rural Cluster'
        },
        business: {
          category: currentSector?.category || 'Custom / Micro Enterprise',
          sectorId: selectedSectorId,
          sectorName: categoryLabel,
          idea: finalIdea,
          isCustom: isCustomSector
        },
        finance: {
          marginCapital: parsedCapital
        },
        entrepreneurContext: {
          name: entrepreneurName.trim() || 'Beneficiary Entrepreneur',
          gender: gender,
          socialCategory: socialCategory,
          areaContext: areaContext
        }
      };

      // Store in analysis session
      const savedSession = saveAnalysisSession(sessionPayload);

      // Navigate to Market Analysis (Stage 1) passing session payload
      navigate('/market-analysis', {
        state: {
          sector_id: isCustomSector ? 'dairy-processing' : selectedSectorId, // fallback sector id for mock market engine
          district_id: selectedDistrictId,
          proposed_capital: parsedCapital,
          business_idea: finalIdea,
          session: savedSession
        }
      });
    } catch (err) {
      console.error('Submission error:', err);
      setErrors(prev => ({
        ...prev,
        form: 'Failed to initialize analysis session. Please check your inputs.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Header Banner */}
      <div className="border-b border-[#144233] pb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 text-xs font-semibold border border-emerald-800 mb-2">
            <Compass className="w-3.5 h-3.5 text-amber-400" />
            Stage 1: Entrepreneur Onboarding & Opportunity Sizing
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
            Start New Business Analysis
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/70 mt-1 max-w-2xl leading-relaxed">
            Provide your geographic location, available equity margin, and proposed enterprise category to compute viability, market dynamics, and subsidy matches.
          </p>
        </div>

        {existingSession && (
          <div className="flex items-center gap-2 bg-[#09241b] px-3 py-2 rounded-xl border border-[#1b5540] text-xs text-emerald-200">
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
            <span>Pre-filled from active session</span>
          </div>
        )}
      </div>

      {/* General Form Error Notice */}
      {errors.form && (
        <div className="p-4 rounded-xl bg-red-950/80 border border-red-800 text-red-200 text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Main Grid: 2-Column Form + Live Summary Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Columns: Multi-Section Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6" noValidate>
          
          {/* SECTION 1: Where is your business? */}
          <div className="bg-[#0c241b] rounded-2xl p-6 sm:p-7 border border-[#18533e] space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#144233] pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-100 text-xs flex items-center justify-center font-bold">1</span>
                <span>Where is your business?</span>
              </h2>
              <span className="text-[11px] text-emerald-300/70 font-mono">Location Context</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* State Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> State <span className="text-amber-400">*</span>
                </label>
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-colors ${
                    errors.state ? 'border-red-500' : 'border-[#1d5c46]'
                  }`}
                >
                  <option value="">Select State</option>
                  {availableStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.state}
                  </p>
                )}
              </div>

              {/* District Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-400" /> District <span className="text-amber-400">*</span>
                </label>
                <select
                  value={selectedDistrictId}
                  onChange={handleDistrictChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-colors ${
                    errors.district ? 'border-red-500' : 'border-[#1d5c46]'
                  }`}
                >
                  <option value="">Select District</option>
                  {filteredDistricts.map(d => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.tier})
                    </option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.district}
                  </p>
                )}
              </div>

              {/* Optional Block / Locality */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100 flex items-center justify-between">
                  <span>Gram Panchayat / Block / Locality</span>
                  <span className="text-[10px] text-emerald-300/60 font-normal">Optional</span>
                </label>
                <input
                  type="text"
                  value={blockOrLocality}
                  onChange={(e) => setBlockOrLocality(e.target.value)}
                  placeholder="e.g. Kashi Vidyapeeth Block, Chiraigaon Tehsil"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

            </div>

            {/* Prototype geographic note */}
            <p className="text-[11px] text-emerald-200/60 italic border-t border-[#144233] pt-3">
              Prototype location data • Production version will integrate authorized geographic datasets (Bhuvan/LGD).
            </p>
          </div>

          {/* SECTION 2: What do you want to start? */}
          <div className="bg-[#0c241b] rounded-2xl p-6 sm:p-7 border border-[#18533e] space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#144233] pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-100 text-xs flex items-center justify-center font-bold">2</span>
                <span>What do you want to start?</span>
              </h2>
              <span className="text-[11px] text-emerald-300/70 font-mono">Venture Scope</span>
            </div>

            <div className="space-y-4">
              
              {/* Category Dropdown */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-emerald-400" />
                  Business Category <span className="text-amber-400">*</span>
                </label>
                <select
                  value={selectedSectorId}
                  onChange={(e) => {
                    setSelectedSectorId(e.target.value);
                    setErrors(prev => ({ ...prev, category: undefined, customIdea: undefined }));
                  }}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-colors ${
                    errors.category ? 'border-red-500' : 'border-[#1d5c46]'
                  }`}
                >
                  <option value="">Select Category</option>
                  {sectors.map(s => (
                    <option key={s.id} value={s.id}>
                      {s.name} ({s.category})
                    </option>
                  ))}
                  <option value="other">✨ Other / Custom Business Idea</option>
                </select>
                {errors.category && (
                  <p className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.category}
                  </p>
                )}
              </div>

              {/* Custom Business Idea text input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                    Specific Business Idea / Venture Scope
                    {isCustomSector && <span className="text-amber-400">*</span>}
                  </span>
                  {!isCustomSector && (
                    <span className="text-[10px] text-emerald-300/60 font-normal">Optional details</span>
                  )}
                </label>
                <input
                  type="text"
                  value={customIdea}
                  onChange={(e) => {
                    setCustomIdea(e.target.value);
                    setErrors(prev => ({ ...prev, customIdea: undefined }));
                  }}
                  placeholder={
                    isCustomSector
                      ? "e.g. Village-level solar cold storage or artisanal pottery workshop"
                      : "e.g. 500-liter milk chilling and paneer manufacturing center"
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border text-sm text-white focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-colors ${
                    errors.customIdea ? 'border-red-500' : 'border-[#1d5c46]'
                  }`}
                />
                {errors.customIdea ? (
                  <p className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.customIdea}
                  </p>
                ) : (
                  <p className="text-[11px] text-emerald-200/60">
                    {isCustomSector 
                      ? "Required: Describe your custom micro-enterprise concept clearly." 
                      : "Optional: Provide a specific operational angle to tailor feasibility recommendations."}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* SECTION 3: How much capital do you have? */}
          <div className="bg-[#0c241b] rounded-2xl p-6 sm:p-7 border border-[#18533e] space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#144233] pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-100 text-xs flex items-center justify-center font-bold">3</span>
                <span>How much capital do you have?</span>
              </h2>
              <span className="text-[11px] text-emerald-300/70 font-mono">Financial Sizing</span>
            </div>

            <div className="space-y-4">
              
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100 flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                  Available Margin Capital <span className="text-amber-400">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-2.5 text-emerald-400 text-sm font-bold">₹</span>
                  <input
                    type="number"
                    min="5000"
                    step="5000"
                    value={marginCapitalInput}
                    onChange={(e) => {
                      setMarginCapitalInput(e.target.value);
                      setErrors(prev => ({ ...prev, marginCapital: undefined }));
                    }}
                    placeholder="Enter amount (e.g. 300000)"
                    className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-[#071913] border text-sm text-white font-medium focus:outline-none focus:ring-1 focus:ring-emerald-400 transition-colors ${
                      errors.marginCapital ? 'border-red-500' : 'border-[#1d5c46]'
                    }`}
                  />
                </div>
                {errors.marginCapital ? (
                  <p className="text-[11px] text-red-400 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.marginCapital}
                  </p>
                ) : (
                  <p className="text-[11px] text-emerald-200/60 leading-relaxed">
                    Enter the amount of your own capital available to start the business.
                  </p>
                )}
              </div>

              {/* Informative Live Preview Callout */}
              <div className="p-4 rounded-xl bg-[#071f16] border border-[#1c5540] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-emerald-200 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-amber-400" />
                    SIH 26091 Sizing Preview
                  </span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-amber-300 border border-emerald-800">
                    {financialPreview.track}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs pt-1">
                  <div className="p-2.5 rounded-lg bg-[#051811] border border-[#134232]">
                    <span className="text-[10px] text-emerald-300/60 block">Estimated Project Cost</span>
                    <span className="font-bold text-white text-base">
                      {formatCurrencyINR(financialPreview.estimatedProjectCost)}
                    </span>
                    <span className="text-[10px] text-emerald-300/50 block">Formula: Margin / 0.10</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-[#051811] border border-[#134232]">
                    <span className="text-[10px] text-emerald-300/60 block">Estimated Bank Loan</span>
                    <span className="font-bold text-amber-400 text-base">
                      {formatCurrencyINR(financialPreview.estimatedLoanAmount)}
                    </span>
                    <span className="text-[10px] text-emerald-300/50 block">Formula: Cost × 0.90</span>
                  </div>
                </div>

                <p className="text-[10px] text-emerald-300/60 leading-relaxed border-t border-[#123d2e] pt-2">
                  {financialPreview.disclaimer} Prototype estimates based on the SIH problem statement framework; not a guaranteed loan approval.
                </p>
              </div>

            </div>
          </div>

          {/* SECTION 4: Entrepreneur Context (Optional) */}
          <div className="bg-[#0c241b] rounded-2xl p-6 sm:p-7 border border-[#18533e] space-y-5 shadow-lg">
            <div className="flex items-center justify-between border-b border-[#144233] pb-3">
              <h2 className="text-base font-bold text-white flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-800 text-emerald-100 text-xs flex items-center justify-center font-bold">4</span>
                <span>Entrepreneur Context</span>
              </h2>
              <span className="text-[11px] text-emerald-300/60 font-normal">Optional Context</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Applicant Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100 flex items-center justify-between">
                  <span>Applicant / Entity Name</span>
                  <span className="text-[10px] text-emerald-300/60 font-normal">Optional</span>
                </label>
                <input
                  type="text"
                  value={entrepreneurName}
                  onChange={(e) => setEntrepreneurName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
                />
              </div>

              {/* Area Context */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100">Area Location Context</label>
                <select
                  value={areaContext}
                  onChange={(e) => setAreaContext(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="rural">Rural Area (Eligible for highest PMEGP subsidies)</option>
                  <option value="semi-urban">Semi-Urban / Peri-Urban Area</option>
                  <option value="urban">Urban Cluster</option>
                </select>
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-emerald-100">Gender / Ownership</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#071913] border border-[#1d5c46] text-sm text-white focus:outline-none focus:border-emerald-400"
                >
                  <option value="general">Male / General Ownership</option>
                  <option value="female">Female / Women-Led (35% Subsidy Match)</option>
                  <option value="transgender">Transgender</option>
                </select>
              </div>

              {/* Social Category */}
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

          {/* Submission CTA */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-600 via-amber-600 to-emerald-700 hover:from-orange-500 hover:via-amber-500 hover:to-emerald-600 text-white font-bold text-base shadow-xl shadow-orange-950/40 flex items-center justify-center gap-2 group transition-all duration-200 cursor-pointer disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Initializing Session...' : 'Analyze Business Opportunity'}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-emerald-200/60 mt-2">
              Validates your inputs, initializes the analysis session, and transitions to Stage 1: Market Analysis.
            </p>
          </div>

        </form>

        {/* Right 1 Column: Live Summary Card (Step 8) */}
        <div className="lg:col-span-1">
          <AnalysisSummaryCard
            stateName={selectedState}
            districtName={currentDistrict?.name || 'Varanasi'}
            blockOrLocality={blockOrLocality}
            categoryName={currentSector?.name || selectedSectorId}
            customIdea={customIdea}
            isCustom={isCustomSector}
            marginCapital={parsedCapital}
            entrepreneurName={entrepreneurName}
          />
        </div>

      </div>

    </div>
  );
}
