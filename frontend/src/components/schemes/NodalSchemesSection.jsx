import React from 'react';
import { Landmark, ExternalLink, CheckCircle2, Award, Sparkles, FileText } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function NodalSchemesSection({ contextualSchemes }) {
  if (!contextualSchemes || !contextualSchemes.recommended_schemes || contextualSchemes.recommended_schemes.length === 0) {
    return null;
  }

  const { recommended_schemes = [], total_potential_subsidy = 0 } = contextualSchemes;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 4.6
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Relevant National Schemes Reference
            </h3>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Complementary central & state schemes potentially applicable to your enterprise sector
          </p>
        </div>

        <span className="text-xs font-semibold text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Nodal Portal References
        </span>
      </div>

      {/* Schemes Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {recommended_schemes.map((sch) => (
          <div
            key={sch.scheme_code}
            className="p-6 rounded-2xl bg-[#071913] border border-[#154636] space-y-4 relative overflow-hidden flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 uppercase tracking-wider">
                  {sch.nodal_ministry}
                </span>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-mono">
                  {sch.match_score}% Benchmark Match
                </span>
              </div>

              <div>
                <h4 className="text-base font-bold text-white tracking-tight">
                  {sch.scheme_name}
                </h4>
                <span className="text-[11px] text-amber-300/80 font-mono block mt-0.5">
                  Code: {sch.scheme_code} • Status: {sch.eligibility_status}
                </span>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 gap-2 bg-[#0a241b] p-3 rounded-xl border border-[#164736] text-xs">
                <div>
                  <span className="text-[10px] text-emerald-300/60 uppercase block">Capital Subsidy</span>
                  <strong className="text-emerald-400 font-mono text-xs block mt-0.5">
                    {sch.subsidy_rate_pct}% ({formatCurrencyINR(sch.max_subsidy_amount)})
                  </strong>
                </div>
                <div>
                  <span className="text-[10px] text-emerald-300/60 uppercase block">Max Loan Ceiling</span>
                  <strong className="text-white font-mono text-xs block mt-0.5">
                    {formatCurrencyINR(sch.max_loan_limit)}
                  </strong>
                </div>
              </div>

              {/* Benefits */}
              {sch.key_benefits && sch.key_benefits.length > 0 && (
                <div className="space-y-1.5 pt-1">
                  <span className="text-[11px] font-bold text-emerald-300 uppercase tracking-wider block">
                    Core Provisions:
                  </span>
                  <ul className="text-[11px] text-emerald-200/70 space-y-1 pl-4 list-disc">
                    {sch.key_benefits.map((b, bIdx) => (
                      <li key={bIdx}>{b}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Portal Link */}
            {sch.application_portal_url && (
              <div className="pt-4 border-t border-[#144233] mt-2">
                <a
                  href={sch.application_portal_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  <span>Official Application Portal</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
