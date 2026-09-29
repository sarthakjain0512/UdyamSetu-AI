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
import { saveAnalysisSession, getAnalysisSession, clearAnalysisSession } from '../services/sessionService';
import { AnalysisSummaryCard } from '../components/analysis/AnalysisSummaryCard';

export function NewAnalysisPage() {
  const navigate = useNavigate();
  const { sectors, districts, loading } = useSectors();

  // Check for any previous active session
  const existingSession = useMemo(() => getAnalysisSession(), []);

  // STEP 1: Location State
  const [selectedState, setSelectedState] = useState(
    existingSession?.location?.state || 'Uttar Pradesh'
  );
  const [selectedDistrictId, setSelectedDistrictId] = useState(
    existingSession?.location?.districtId || 'varanasi-up'
  );
  const [blockOrLocality, setBlockOrLocality] = useState(
    existingSession?.location?.blockOrLocality || ''
  );

  // STEP 2: Business Category & Idea
  const [selectedSectorId, setSelectedSectorId] = useState(
    existingSession?.business?.isCustom ? 'other' : (existingSession?.business?.sectorId || 'dairy-processing')
  );
  const [customIdea, setCustomIdea] = useState(
    existingSession?.business?.idea || ''
  );

  // STEP 3: Available Margin Capital
  const [marginCapitalInput, setMarginCapitalInput] = useState(
    existingSession?.finance?.marginCapital ? String(existingSession.finance.marginCapital) : '100000'
  );

  // STEP 4: Entrepreneur Context
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
  const [hasCleared, setHasCleared] = useState(false);

  const handleClearSession = () => {
    clearAnalysisSession();
    setSelectedState('Uttar Pradesh');
    setSelectedDistrictId('varanasi-up');
    setBlockOrLocality('');
    setSelectedSectorId('dairy-processing');
    setCustomIdea('');
    setMarginCapitalInput('100000');
    setEntrepreneurName('Ramesh Sharma');
    setGender('general');
    setSocialCategory('obc');
    setAreaContext('rural');
    setErrors({});
    setHasCleared(true);
  };

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

  // Handle State selection change
  const handleStateChange = (e) => {
    const newState = e.target.value;
    setSelectedState(newState);
    setErrors(prev => ({ ...prev, state: undefined }));

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

    const dist = districts.find(d => d.id === newDistrictId);
    if (dist && dist.state && dist.state !== selectedState) {
      setSelectedState(dist.state);
    }
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {};

    if (!selectedState || selectedState.trim() === '') {
      newErrors.state = 'Please select a state.';
    }
    if (!selectedDistrictId || selectedDistrictId.trim() === '') {
      newErrors.district = 'Please select a district.';
    }

    if (!selectedSectorId || selectedSectorId.trim() === '') {
      newErrors.category = 'Please select a business category.';
    }
    if (isCustomSector && (!customIdea || customIdea.trim().length < 3)) {
      newErrors.customIdea = 'Please provide a descriptive business idea (at least 3 characters).';
    }

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

      const savedSession = saveAnalysisSession(sessionPayload);

      navigate('/market-analysis', {
        state: {
          sector_id: isCustomSector ? 'dairy-processing' : selectedSectorId,
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
    <div className="space-y-8 max-w-7xl mx-auto pb-12">
      
      {/* Page Header */}
      <div className="border-b border-[#DDE5DD] pb-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-[#14532D] text-xs font-semibold border border-emerald-200 mb-2">
            <Compass className="w-3.5 h-3.5 text-[#E58A24]" />
            Stage 1: Entrepreneur Onboarding & Opportunity Sizing
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-[#14532D] tracking-tight">
            Create New Analysis
          </h1>
          <p className="text-xs sm:text-sm text-[#647067] mt-1 max-w-2xl leading-relaxed">
            Provide your geographic location, available equity margin, and proposed enterprise category to compute viability, market dynamics, and subsidy matches.
          </p>
        </div>

        {existingSession && !hasCleared && (
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto">
            <div className="flex items-center gap-1.5 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 text-xs text-[#14532D] font-medium">
              <RefreshCw className="w-3.5 h-3.5 text-[#E58A24]" />
              <span>Restored from session</span>
            </div>
            <button
              type="button"
              onClick={handleClearSession}
              className="px-3 py-1.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-[#647067] hover:text-[#17211B] border border-[#DDE5DD] text-xs font-semibold transition-colors"
            >
              Start Fresh
            </button>
          </div>
        )}
      </div>

      {/* General Form Error Notice */}
      {errors.form && (
        <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-[#C2413A] text-xs flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#C2413A] shrink-0" />
          <span>{errors.form}</span>
        </div>
      )}

      {/* Main Grid: 2-Column Form (Left) + Sticky Live Summary (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left 2 Columns: Multi-Section Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-6" noValidate>
          
          {/* STEP 1: Location */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDE5DD] space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#DDE5DD] pb-3">
              <h2 className="text-base font-bold text-[#14532D] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#14532D] text-white text-xs flex items-center justify-center font-bold">1</span>
                <span>STEP 1: Location Context</span>
              </h2>
              <span className="text-[11px] text-[#0F766E] font-medium bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                Geography
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* State Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#17211B] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0F766E]" /> State <span className="text-[#C87512]">*</span>
                </label>
                <select
                  value={selectedState}
                  onChange={handleStateChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#17211B] focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors ${
                    errors.state ? 'border-red-400' : 'border-[#DDE5DD]'
                  }`}
                >
                  <option value="">Select State</option>
                  {availableStates.map(state => (
                    <option key={state} value={state}>{state}</option>
                  ))}
                </select>
                {errors.state && (
                  <p className="text-[11px] text-[#C2413A] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.state}
                  </p>
                )}
              </div>

              {/* District Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#17211B] flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#0F766E]" /> District <span className="text-[#C87512]">*</span>
                </label>
                <select
                  value={selectedDistrictId}
                  onChange={handleDistrictChange}
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#17211B] focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors ${
                    errors.district ? 'border-red-400' : 'border-[#DDE5DD]'
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
                  <p className="text-[11px] text-[#C2413A] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.district}
                  </p>
                )}
              </div>

              {/* Block or Locality (Optional) */}
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs font-semibold text-[#17211B] flex items-center gap-1.5">
                  Block / Gram Panchayat / Catchment Radius <span className="text-[10px] text-[#647067] font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={blockOrLocality}
                  onChange={(e) => setBlockOrLocality(e.target.value)}
                  placeholder="e.g. Cholapur Block, Rohania, 5-10 km radius"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDE5DD] text-sm text-[#17211B] placeholder-[#647067]/60 focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors"
                />
              </div>

            </div>
          </div>

          {/* STEP 2: Business Category & Idea */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDE5DD] space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#DDE5DD] pb-3">
              <h2 className="text-base font-bold text-[#14532D] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#14532D] text-white text-xs flex items-center justify-center font-bold">2</span>
                <span>STEP 2: Business Concept</span>
              </h2>
              <span className="text-[11px] text-[#0F766E] font-medium bg-teal-50 px-2 py-0.5 rounded-full border border-teal-100">
                Enterprise Sector
              </span>
            </div>

            <div className="space-y-4">
              
              {/* Sector Selection Grid */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#17211B] flex items-center gap-1.5">
                  <Building2 className="w-3.5 h-3.5 text-[#14532D]" /> Select Enterprise Sector <span className="text-[#C87512]">*</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {sectors.map((s) => {
                    const isSelected = selectedSectorId === s.id;
                    return (
                      <div
                        key={s.id}
                        onClick={() => {
                          setSelectedSectorId(s.id);
                          setErrors(prev => ({ ...prev, category: undefined }));
                        }}
                        className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                          isSelected 
                            ? 'bg-emerald-50/70 border-[#14532D] ring-1 ring-[#14532D] shadow-sm' 
                            : 'bg-white border-[#DDE5DD] hover:bg-stone-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className={`text-xs font-bold ${isSelected ? 'text-[#14532D]' : 'text-[#17211B]'}`}>
                            {s.name}
                          </span>
                          <span className="text-[10px] font-semibold text-[#647067]">
                            {s.category}
                          </span>
                        </div>
                        <p className="text-[11px] text-[#647067] mt-1 line-clamp-2 leading-relaxed">
                          {s.description}
                        </p>
                      </div>
                    );
                  })}

                  {/* Option: Other / Custom Idea */}
                  <div
                    onClick={() => {
                      setSelectedSectorId('other');
                      setErrors(prev => ({ ...prev, category: undefined }));
                    }}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                      isCustomSector 
                        ? 'bg-amber-50/80 border-[#E58A24] ring-1 ring-[#E58A24] shadow-sm' 
                        : 'bg-white border-[#DDE5DD] hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`text-xs font-bold ${isCustomSector ? 'text-[#C87512]' : 'text-[#17211B]'}`}>
                        Other / Custom Enterprise
                      </span>
                      <span className="text-[10px] font-semibold text-[#C87512]">
                        Custom
                      </span>
                    </div>
                    <p className="text-[11px] text-[#647067] mt-1 leading-relaxed">
                      Enter a custom micro-enterprise concept not covered in benchmark sectors.
                    </p>
                  </div>
                </div>

                {errors.category && (
                  <p className="text-[11px] text-[#C2413A] flex items-center gap-1 mt-1">
                    <AlertCircle className="w-3 h-3" /> {errors.category}
                  </p>
                )}
              </div>

              {/* Specific Business Idea Description */}
              <div className="space-y-1.5 pt-2">
                <label className="text-xs font-semibold text-[#17211B] flex items-center gap-1.5">
                  <Lightbulb className="w-3.5 h-3.5 text-[#E58A24]" /> Specific Business Description
                  {isCustomSector && <span className="text-[#C87512]">*</span>}
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
                      ? "e.g. Cold-Pressed Mustard Oil Expeller unit with retail packaging"
                      : `e.g. Village unit producing packaged Paneer, Curd and Pure Ghee`
                  }
                  className={`w-full px-3.5 py-2.5 rounded-xl bg-white border text-sm text-[#17211B] placeholder-[#647067]/60 focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors ${
                    errors.customIdea ? 'border-red-400' : 'border-[#DDE5DD]'
                  }`}
                />
                <p className="text-[11px] text-[#647067]">
                  Helps hyper-local market intelligence calibrate local pricing and product-level demand.
                </p>
                {errors.customIdea && (
                  <p className="text-[11px] text-[#C2413A] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.customIdea}
                  </p>
                )}
              </div>

            </div>
          </div>

          {/* STEP 3: Available Margin Capital */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDE5DD] space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#DDE5DD] pb-3">
              <h2 className="text-base font-bold text-[#14532D] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#14532D] text-white text-xs flex items-center justify-center font-bold">3</span>
                <span>STEP 3: Margin Capital (Promoter Equity)</span>
              </h2>
              <span className="text-[11px] text-[#C87512] font-semibold bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                10% Own Contribution
              </span>
            </div>

            <div className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#17211B] flex items-center gap-1.5">
                  <IndianRupee className="w-3.5 h-3.5 text-[#14532D]" /> Available Own Equity Margin <span className="text-[#C87512]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-bold text-[#647067]">
                    ₹
                  </span>
                  <input
                    type="number"
                    min="5000"
                    step="5000"
                    value={marginCapitalInput}
                    onChange={(e) => {
                      setMarginCapitalInput(e.target.value);
                      setErrors(prev => ({ ...prev, marginCapital: undefined }));
                    }}
                    placeholder="100000"
                    className={`w-full pl-8 pr-3.5 py-2.5 rounded-xl bg-white border text-sm font-bold text-[#17211B] focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors ${
                      errors.marginCapital ? 'border-red-400' : 'border-[#DDE5DD]'
                    }`}
                  />
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <span className="text-[11px] text-[#647067]">Quick Presets:</span>
                  {[
                    { label: '₹50,000', value: '50000' },
                    { label: '₹1,00,000', value: '100000' },
                    { label: '₹2,00,000', value: '200000' },
                    { label: '₹3,00,000', value: '300000' },
                    { label: '₹5,00,000', value: '500000' }
                  ].map(preset => (
                    <button
                      key={preset.value}
                      type="button"
                      onClick={() => {
                        setMarginCapitalInput(preset.value);
                        setErrors(prev => ({ ...prev, marginCapital: undefined }));
                      }}
                      className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-emerald-50 text-[11px] font-semibold text-[#17211B] border border-[#DDE5DD] transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>

                {errors.marginCapital && (
                  <p className="text-[11px] text-[#C2413A] flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.marginCapital}
                  </p>
                )}
              </div>

              {/* Informational Callout */}
              <div className="p-3.5 rounded-xl bg-emerald-50/50 border border-emerald-200 text-xs text-[#14532D] space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldCheck className="w-4 h-4 text-[#16803C]" />
                  <span>SIH 26091 Statutory Sizing Framework</span>
                </div>
                <p className="text-[11px] text-[#647067] leading-relaxed">
                  Rural micro-lending schemes (PMEGP, Mudra) operate on a 10% promoter equity and 90% bank loan framework. Your entered margin capital directly sizes project viability and credit track.
                </p>
              </div>
            </div>
          </div>

          {/* STEP 4: Entrepreneur Context */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDE5DD] space-y-5 shadow-sm">
            <div className="flex items-center justify-between border-b border-[#DDE5DD] pb-3">
              <h2 className="text-base font-bold text-[#14532D] flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-[#14532D] text-white text-xs flex items-center justify-center font-bold">4</span>
                <span>STEP 4: Entrepreneur Context</span>
              </h2>
              <span className="text-[11px] text-[#647067] font-medium bg-stone-100 px-2 py-0.5 rounded-full border border-[#DDE5DD]">
                Subsidy Parameters
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Entrepreneur Name */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#17211B] flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5 text-[#0F766E]" /> Entrepreneur / SHG Name
                </label>
                <input
                  type="text"
                  value={entrepreneurName}
                  onChange={(e) => setEntrepreneurName(e.target.value)}
                  placeholder="e.g. Ramesh Sharma"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDE5DD] text-sm text-[#17211B] focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors"
                />
              </div>

              {/* Gender */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#17211B]">
                  Gender
                </label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDE5DD] text-sm text-[#17211B] focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors"
                >
                  <option value="general">Male</option>
                  <option value="female">Female (Eligible for Special PMEGP Track)</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Social Category */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#17211B]">
                  Beneficiary Social Category
                </label>
                <select
                  value={socialCategory}
                  onChange={(e) => setSocialCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDE5DD] text-sm text-[#17211B] focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors"
                >
                  <option value="general">General (15–25% Subsidy)</option>
                  <option value="obc">OBC (Up to 35% Rural Subsidy)</option>
                  <option value="sc">SC (Up to 35% Rural Subsidy)</option>
                  <option value="st">ST (Up to 35% Rural Subsidy)</option>
                  <option value="minority">Minority / Ex-Serviceman / Divyang (Up to 35%)</option>
                </select>
              </div>

              {/* Setting Context */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#17211B]">
                  Operational Setting
                </label>
                <select
                  value={areaContext}
                  onChange={(e) => setAreaContext(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-white border border-[#DDE5DD] text-sm text-[#17211B] focus:outline-none focus:ring-2 focus:ring-[#14532D]/30 transition-colors"
                >
                  <option value="rural">Rural (Eligible for highest 35% PMEGP subsidy)</option>
                  <option value="semi-urban">Semi-Urban / Peri-Urban</option>
                  <option value="urban">Urban</option>
                </select>
              </div>

            </div>
          </div>

          {/* Primary Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 px-8 rounded-xl bg-[#E58A24] hover:bg-[#c87512] text-white font-bold text-base shadow-md flex items-center justify-center gap-3 group transition-all transform hover:-translate-y-0.5 disabled:opacity-50"
            >
              <span>Continue to Analysis →</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="text-center text-[11px] text-[#647067] mt-2">
              Proceeds to Stage 1: Hyper-Local Market Intelligence with configured parameters.
            </p>
          </div>

        </form>

        {/* Right Column: Sticky Live Analysis Summary */}
        <div className="lg:col-span-1">
          <AnalysisSummaryCard
            stateName={selectedState}
            districtName={currentDistrict?.name}
            blockOrLocality={blockOrLocality}
            categoryName={currentSector?.name}
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

export default NewAnalysisPage;
