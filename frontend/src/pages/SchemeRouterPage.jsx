import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Landmark, Award, ExternalLink, CheckCircle2, FileText, Sparkles } from 'lucide-react';
import { useSchemes } from '../hooks/useSchemes';
import { useSectors } from '../hooks/useSectors';
import { MetricCard } from '../components/common/MetricCard';
import { formatCurrencyINR } from '../utils/formatters';

export function SchemeRouterPage() {
  const location = useLocation();
  const { sectors, districts } = useSectors();
  const { data, loading, fetchMatchingSchemes } = useSchemes();

  const [sectorId, setSectorId] = useState(location.state?.sector_id || 'dairy-processing');
  const [districtId, setDistrictId] = useState(location.state?.district_id || 'varanasi-up');
  const [amount, setAmount] = useState(location.state?.proposed_capital || 300000);
  const [gender, setGender] = useState(location.state?.gender || 'female');
  const [category, setCategory] = useState(location.state?.social_category || 'obc');

  useEffect(() => {
    fetchMatchingSchemes({
      sector_id: sectorId,
      district_id: districtId,
      investment_amount: Number(amount),
      gender: gender,
      social_category: category
    });
  }, [sectorId, districtId, amount, gender, category]);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-amber-950 text-amber-300 border border-amber-800 mb-2">
            <Landmark className="w-3.5 h-3.5" /> Module 4: Government Scheme Router Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Central & State Scheme Matching</h1>
          <p className="text-xs text-slate-400">PMEGP, Mudra, PMFME, Lakhpati Didi & Stand-Up India eligibility score</p>
        </div>

        {/* Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          >
            <option value="female font-bold">Female (35% Rural Subsidy Bonus)</option>
            <option value="general">Male / General</option>
          </select>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          >
            <option value="obc">OBC</option>
            <option value="sc">SC</option>
            <option value="st">ST</option>
            <option value="general">General</option>
          </select>
        </div>
      </div>

      {loading && (
        <div className="p-12 text-center text-slate-400 animate-pulse text-sm">
          Matching MSME and Ministry of Agriculture databases for optimal subsidy rates...
        </div>
      )}

      {data && !loading && (
        <>
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <MetricCard
              title="Top Recommended Scheme"
              value={data.best_matching_scheme.scheme_code}
              subtitle={data.best_matching_scheme.scheme_name}
              icon={Award}
              color="amber"
            />
            <MetricCard
              title="Potential Capital Subsidy"
              value={formatCurrencyINR(data.total_potential_subsidy)}
              subtitle="Combined Scheme Benefits"
              icon={Sparkles}
              color="emerald"
            />
            <MetricCard
              title="Highest Match Score"
              value={`${data.best_matching_scheme.match_score}%`}
              subtitle={data.best_matching_scheme.eligibility_status}
              icon={Landmark}
              color="cyan"
            />
          </div>

          {/* Scheme Cards */}
          <div className="space-y-6">
            <h3 className="text-base font-bold text-white">Matching Central & State Schemes</h3>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {data.recommended_schemes.map((scheme) => (
                <div key={scheme.scheme_code} className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4 relative overflow-hidden">
                  
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800">
                        {scheme.nodal_ministry}
                      </span>
                      <h4 className="text-base font-bold text-white mt-1.5">{scheme.scheme_name}</h4>
                    </div>
                    <span className="text-xs font-extrabold px-2.5 py-1 rounded-lg bg-emerald-950 text-emerald-400 border border-emerald-800">
                      {scheme.match_score}% Match
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 bg-slate-900/80 p-3 rounded-xl border border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400">Capital Subsidy:</span>
                      <p className="font-bold text-emerald-400">{scheme.subsidy_rate_pct}% ({formatCurrencyINR(scheme.max_subsidy_amount)})</p>
                    </div>
                    <div>
                      <span className="text-slate-400">Max Loan Limit:</span>
                      <p className="font-bold text-white">{formatCurrencyINR(scheme.max_loan_limit)}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> Key Benefits:
                    </span>
                    <ul className="text-xs text-slate-400 space-y-1 pl-4 list-disc">
                      {scheme.key_benefits.map((b, idx) => (
                        <li key={idx}>{b}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-800">
                    <span className="text-xs font-semibold text-slate-300 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5 text-indigo-400" /> Document Checklist:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {scheme.required_documents.map((doc, idx) => (
                        <span key={idx} className="text-[11px] px-2 py-0.5 rounded bg-slate-900 text-slate-300 border border-slate-800">
                          {doc}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <a
                      href={scheme.application_portal_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 hover:underline"
                    >
                      Apply on Nodal Portal <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>

                </div>
              ))}
            </div>

          </div>
        </>
      )}

    </div>
  );
}
