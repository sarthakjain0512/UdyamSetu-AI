import React from 'react';
import { 
  ShieldCheck, AlertTriangle, HelpCircle, CheckCircle2, 
  Clock, Check, X, Layers
} from 'lucide-react';

export default function LaunchReadinessCard({ readiness, coverage }) {
  if (!readiness) return null;

  const {
    hasFeasibility,
    feasibilityStatus,
    feasibilityScore,
    feasibilityGrade,
    informationAvailable,
    informationRequiringValidation,
    informationMissing
  } = readiness;

  // Visual style for existing Task 4 status
  const getStatusBadge = () => {
    if (!hasFeasibility) {
      return {
        bg: 'bg-slate-900',
        text: 'text-slate-300',
        border: 'border-slate-700',
        label: 'Feasibility Analysis — Not available from current analysis'
      };
    }

    const lower = String(feasibilityStatus).toLowerCase();
    if (lower.includes('potentially') || lower.includes('high')) {
      return {
        bg: 'bg-emerald-950',
        text: 'text-emerald-300',
        border: 'border-emerald-700',
        label: `Feasibility Status: ${feasibilityStatus}`
      };
    }
    if (lower.includes('validation') || lower.includes('moderate')) {
      return {
        bg: 'bg-amber-950',
        text: 'text-amber-300',
        border: 'border-amber-700',
        label: `Feasibility Status: ${feasibilityStatus}`
      };
    }
    return {
      bg: 'bg-rose-950',
      text: 'text-rose-300',
      border: 'border-rose-700',
      label: `Feasibility Status: ${feasibilityStatus}`
    };
  };

  const badge = getStatusBadge();

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.2
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Evidence Audit & Status
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Launch Readiness Assessment
          </h2>
          <p className="text-xs text-emerald-200/70">
            Structured audit of verified intelligence, validation requirements, and unanalyzed modules (non-scoring status)
          </p>
        </div>

        {/* Existing Task 4 Feasibility Status Badge */}
        <div className="shrink-0">
          <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold border shadow-sm ${badge.bg} ${badge.text} ${badge.border}`}>
            <ShieldCheck className="w-4 h-4" />
            <span>{badge.label}</span>
            {feasibilityGrade && (
              <span className="ml-1 px-2 py-0.5 rounded bg-black/40 text-[11px] font-black">
                {feasibilityGrade}
              </span>
            )}
          </span>
        </div>
      </div>

      {/* Analysis Coverage Bar */}
      {coverage && (
        <div className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-400" /> Upstream Intelligence Coverage
            </span>
            <span className="text-emerald-400 font-mono font-bold">
              {Object.values(coverage).filter(c => c.available).length} of {Object.keys(coverage).length} Modules Available
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {Object.entries(coverage).map(([key, item]) => (
              <div 
                key={key}
                className={`p-2.5 rounded-xl border text-center transition-all ${
                  item.available 
                    ? 'bg-emerald-950/40 border-emerald-800/80 text-emerald-200' 
                    : 'bg-slate-900/50 border-slate-800 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  {item.available ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <X className="w-3.5 h-3.5 text-slate-500" />
                  )}
                  <span className="text-[11px] font-bold truncate">{item.label}</span>
                </div>
                <span className="text-[10px] block opacity-80">
                  {item.available ? 'Analyzed' : 'Not available'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tripartite Audit Columns: Available vs. Requiring Validation vs. Missing */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        
        {/* Column 1: Information Available */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-emerald-900/60 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase tracking-wider border-b border-emerald-900/40 pb-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>Information Available ({informationAvailable.length})</span>
          </div>
          {informationAvailable.length > 0 ? (
            <ul className="space-y-2 text-xs text-emerald-200/90 leading-relaxed">
              {informationAvailable.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">No verified analysis outputs recorded.</p>
          )}
        </div>

        {/* Column 2: Information Requiring Ground Validation */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-amber-900/60 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-400 uppercase tracking-wider border-b border-amber-900/40 pb-2.5">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>Requires Validation ({informationRequiringValidation.length})</span>
          </div>
          {informationRequiringValidation.length > 0 ? (
            <ul className="space-y-2 text-xs text-amber-200/90 leading-relaxed">
              {informationRequiringValidation.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold shrink-0 mt-0.5">!</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-400 italic">No explicit validation hurdles flagged.</p>
          )}
        </div>

        {/* Column 3: Information Still Missing */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider border-b border-slate-800 pb-2.5">
            <HelpCircle className="w-4 h-4 text-slate-400" />
            <span>Information Missing ({informationMissing.length})</span>
          </div>
          {informationMissing.length > 0 ? (
            <ul className="space-y-2 text-xs text-slate-300 leading-relaxed">
              {informationMissing.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="text-slate-500 font-bold shrink-0 mt-0.5">○</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-emerald-300 italic flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" /> All pipeline modules completed.
            </p>
          )}
        </div>

      </div>

      <div className="p-3.5 rounded-xl bg-slate-900/70 border border-slate-800 text-xs text-slate-400 flex items-start gap-2">
        <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Transparency Notice:</strong> Launch readiness in UdyamSetu AI represents an audit of available upstream inputs and ground-validation prerequisites, rather than an automated green light or approval guarantee.
        </span>
      </div>

    </div>
  );
}
