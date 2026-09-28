import React from 'react';
import { AlertTriangle, AlertCircle, Info, ShieldAlert } from 'lucide-react';

export default function SchemeWarningsSection({ warnings = [], ceilingMismatch, isAbove50L }) {
  if (!warnings || warnings.length === 0) return null;

  // Filter to render prominent actionable warnings first
  const highPriorityWarnings = warnings.filter(w => w.type === 'danger' || w.type === 'warning');
  const advisoryWarnings = warnings.filter(w => w.type === 'info' || w.type === 'neutral');

  return (
    <div className="space-y-4">
      {/* High Priority Critical Warnings (Ceiling mismatch or >50L) */}
      {highPriorityWarnings.map((warn) => {
        const isDanger = warn.type === 'danger';
        return (
          <div
            key={warn.id}
            className={`p-5 rounded-3xl border shadow-xl flex items-start gap-3.5 transition-all ${
              isDanger
                ? 'bg-rose-950/30 border-rose-800 text-rose-200'
                : 'bg-amber-950/30 border-amber-800 text-amber-200'
            }`}
          >
            {isDanger ? (
              <ShieldAlert className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
            ) : (
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            )}
            <div className="space-y-1">
              <h4 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                {warn.title}
              </h4>
              <p className="text-xs leading-relaxed opacity-90">
                {warn.message}
              </p>
            </div>
          </div>
        );
      })}

      {/* Advisory & Prototype Operational Notices */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {advisoryWarnings.map((warn) => (
          <div
            key={warn.id}
            className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] flex items-start gap-3 text-xs text-emerald-200/80"
          >
            <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="text-white block text-xs">{warn.title}</strong>
              <p className="text-[11px] leading-relaxed text-emerald-200/70">
                {warn.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
