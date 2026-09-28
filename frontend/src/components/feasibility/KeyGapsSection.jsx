import React from 'react';
import { AlertCircle, Target, ArrowRight } from 'lucide-react';

export default function KeyGapsSection({ gaps = [] }) {
  if (!gaps || gaps.length === 0) {
    return null;
  }

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-stone-100 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-700" />
            <h3 className="font-serif text-lg font-bold text-stone-900">
              9. Key Feasibility Gaps & Critical Hurdles
            </h3>
          </div>
          <p className="text-xs text-stone-500 mt-1">
            Deficiencies and operational bottlenecks identified from analysis inputs that require structured resolution before commercial scaling.
          </p>
        </div>
        <span className="text-[11px] font-semibold text-amber-800 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
          {gaps.length} Gaps Identified
        </span>
      </div>

      <div className="p-6">
        <div className="space-y-3">
          {gaps.map((gap, idx) => (
            <div 
              key={idx}
              className="p-4 rounded-xl border border-amber-200/80 bg-amber-50/30 flex items-start gap-3.5 hover:bg-amber-50/50 transition-colors"
            >
              <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-900 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                {idx + 1}
              </div>
              <div className="space-y-1">
                <h4 className="text-sm font-bold text-stone-900">
                  {gap.title}
                </h4>
                <p className="text-xs text-stone-600 leading-relaxed">
                  {gap.detail}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="text-[11px] text-stone-500 mt-4 italic">
          * Gaps are derived directly from the entrepreneur’s submitted margin capital adequacy and the localized competitive intensity signal.
        </p>
      </div>
    </div>
  );
}
