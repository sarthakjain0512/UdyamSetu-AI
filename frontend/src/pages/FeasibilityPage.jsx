import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ShieldCheck, AlertOctagon, CheckCircle2, Clock, MapPin, Award } from 'lucide-react';
import { useFeasibility } from '../hooks/useFeasibility';
import { useSectors } from '../hooks/useSectors';
import { MetricCard } from '../components/common/MetricCard';
import { formatCurrencyINR } from '../utils/formatters';

export function FeasibilityPage() {
  const location = useLocation();
  const { sectors, districts } = useSectors();
  const { data, loading, runAssessment } = useFeasibility();

  const [sectorId, setSectorId] = useState(location.state?.sector_id || 'dairy-processing');
  const [districtId, setDistrictId] = useState(location.state?.district_id || 'varanasi-up');
  const [capital, setCapital] = useState(location.state?.proposed_capital || 300000);
  const [exp, setExp] = useState(2);

  useEffect(() => {
    runAssessment({
      sector_id: sectorId,
      district_id: districtId,
      proposed_capital: Number(capital),
      prior_experience_years: Number(exp)
    });
  }, [sectorId, districtId, capital, exp]);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 mb-2">
            <ShieldCheck className="w-3.5 h-3.5" /> Module 2: Feasibility Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Location & Operational Feasibility</h1>
          <p className="text-xs text-slate-400">Viability scoring, skill readiness, break-even period & risk mitigation</p>
        </div>

        {/* Dynamic Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <select
            value={sectorId}
            onChange={(e) => setSectorId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          >
            {sectors.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
          </select>

          <select
            value={districtId}
            onChange={(e) => setDistrictId(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          >
            {districts.map(d => <option key={d.id} value={d.id}>{d.name}, {d.state}</option>)}
          </select>

          <input
            type="number"
            value={capital}
            onChange={(e) => setCapital(e.target.value)}
            placeholder="Capital (INR)"
            className="w-32 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
          />
        </div>
      </div>

      {loading && (
        <div className="p-12 text-center text-slate-400 animate-pulse text-sm">
          Computing feasibility score and geographical risk matrix...
        </div>
      )}

      {data && !loading && (
        <>
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Overall Feasibility Score"
              value={`${data.feasibility_score}/100`}
              subtitle={data.feasibility_grade}
              icon={Award}
              color="emerald"
            />
            <MetricCard
              title="Location Suitability"
              value={`${data.location_suitability}%`}
              subtitle={data.district_name}
              icon={MapPin}
              color="cyan"
            />
            <MetricCard
              title="Est. Break-Even Period"
              value={`${data.estimated_breakeven_months} Months`}
              subtitle="Payback timeframe"
              icon={Clock}
              color="indigo"
            />
            <MetricCard
              title="Capital Adequacy"
              value={data.capital_adequacy.split(' ')[0]}
              subtitle={`Min Req: ${formatCurrencyINR(data.recommended_min_capital)}`}
              icon={ShieldCheck}
              color="amber"
            />
          </div>

          {/* Feasibility Breakdown & Risk Matrix */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Recommendations & Suitability Card */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Strategic AI Recommendations
              </h3>

              <div className="space-y-3">
                {data.key_recommendations.map((rec, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 text-xs text-slate-200 flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-800 space-y-2">
                <div className="flex justify-between text-xs text-slate-300">
                  <span>Skill & Operational Readiness</span>
                  <span className="font-bold text-emerald-400">{data.skill_readiness_score}%</span>
                </div>
                <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full" style={{ width: `${data.skill_readiness_score}%` }}></div>
                </div>
              </div>
            </div>

            {/* Risk Factors & Mitigation Matrix */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <AlertOctagon className="w-4 h-4 text-amber-400" /> Risk Evaluation & Mitigation Matrix
              </h3>

              <div className="space-y-3">
                {data.risks.map((risk, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-white">{risk.risk_name}</span>
                      <span className={`text-[10px] px-2 py-0.5 rounded font-semibold border ${
                        risk.severity === 'High' 
                          ? 'bg-rose-950 text-rose-300 border-rose-800' 
                          : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}>
                        {risk.severity} Severity
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      <strong className="text-slate-300">Mitigation:</strong> {risk.mitigation_strategy}
                    </p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
