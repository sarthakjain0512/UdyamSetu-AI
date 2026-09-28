import React from 'react';
import { HelpCircle, CheckCircle2, ArrowRight } from 'lucide-react';

export default function ValidationQuestionsSection({ questions = [] }) {
  if (!questions || questions.length === 0) return null;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 5.6
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Pre-Commitment Validation Questions
            </h3>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Critical decision-support questions every entrepreneur should resolve before signing loan contracts
          </p>
        </div>

        <span className="text-xs font-semibold text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Due Diligence Checklist
        </span>
      </div>

      {/* Questions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {questions.map((q, idx) => (
          <div
            key={q.id || idx}
            className="p-4 rounded-2xl bg-[#071913] border border-[#154636] hover:border-emerald-700/60 transition-all space-y-2 flex flex-col justify-between"
          >
            <div className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-300 bg-amber-950 px-2 py-0.5 rounded border border-amber-800">
                  {q.category}
                </span>
                <span className="text-xs font-mono font-bold text-emerald-400/60">
                  Q{idx + 1}
                </span>
              </div>

              <h4 className="text-xs sm:text-sm font-bold text-white leading-snug">
                {q.question}
              </h4>
            </div>

            <div className="pt-2 border-t border-[#144233] text-[11px] text-emerald-200/70 flex items-start gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                <strong className="text-emerald-300">Why it matters: </strong>
                {q.why}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
