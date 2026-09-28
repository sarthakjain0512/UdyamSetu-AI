import React from 'react';
import { ShieldAlert, AlertTriangle, CheckCircle, Info } from 'lucide-react';

const LEVEL_CONFIG = {
  Low: {
    bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
    icon: CheckCircle,
    barBg: 'bg-emerald-500'
  },
  Moderate: {
    bg: 'bg-amber-50 text-amber-800 border-amber-200',
    icon: Info,
    barBg: 'bg-amber-500'
  },
  High: {
    bg: 'bg-rose-50 text-rose-800 border-rose-200',
    icon: AlertTriangle,
    barBg: 'bg-rose-500'
  },
};

export default function FeasibilityRiskMatrix({ risks = [] }) {
  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-stone-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-emerald-800" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              8. Risk Assessment Matrix
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Qualitative vulnerability assessment across key commercial and operational frontiers with recommended mitigations.
          </p>
        </div>
        <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2.5 py-1 rounded-full border border-stone-200">
          6 Risk Dimensions
        </span>
      </div>

      <div className="p-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {risks.map((item, idx) => {
            const config = LEVEL_CONFIG[item.level] || LEVEL_CONFIG.Moderate;
            const LevelIcon = config.icon;

            return (
              <div 
                key={idx}
                className="p-5 rounded-xl border border-stone-200/90 bg-stone-50/30 hover:bg-white hover:border-stone-300 transition-all flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div>
                      <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
                        {item.category}
                      </span>
                      <h4 className="text-sm font-bold text-stone-900 leading-snug">
                        {item.title}
                      </h4>
                    </div>
                    <span className={`inline-flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${config.bg}`}>
                      <LevelIcon className="w-3 h-3" />
                      {item.level}
                    </span>
                  </div>

                  <div className="space-y-1.5 mt-2">
                    <p className="text-xs text-stone-600 leading-relaxed">
                      <strong className="text-stone-700">Why it matters:</strong> {item.impact}
                    </p>
                  </div>
                </div>

                <div className="pt-2.5 border-t border-stone-100 bg-emerald-50/40 -mx-5 -mb-5 p-3.5 rounded-b-xl">
                  <p className="text-xs text-emerald-950 leading-relaxed">
                    <strong className="text-emerald-800">Pragmatic Mitigation:</strong> {item.mitigation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-center text-xs text-stone-500">
          Risk ratings are qualitative prototype classifications derived from hyper-local market competitive density and capital exposure. No synthetic probability percentages are assigned.
        </div>
      </div>
    </div>
  );
}
