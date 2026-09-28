import React, { useState } from 'react';
import { CheckSquare, Square, ShieldCheck, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';

export default function VerificationChecklistSection({ checklist = [] }) {
  const [checkedItems, setCheckedItems] = useState({});

  const toggleCheck = (id) => {
    setCheckedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const completedCount = Object.values(checkedItems).filter(Boolean).length;
  const totalCount = checklist.length;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 4.4
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Before Applying — Verify These
            </h3>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Verification checklist — confirm with the applicable authority/lender before submission
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-300 bg-emerald-950 px-3.5 py-1.5 rounded-full border border-emerald-800">
          <span>{completedCount} of {totalCount} Reviewed</span>
        </div>
      </div>

      {/* Verification Notice Banner */}
      <div className="p-3.5 rounded-xl bg-[#071913] border border-amber-800/60 text-xs text-emerald-200/90 flex items-start gap-2.5">
        <HelpCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong>Verification Advisory:</strong> The items below are essential operational checks. Final requirements, margin percentages, and interest rules depend on the specific financing branch and circulars active on your application date.
        </p>
      </div>

      {/* Checklist Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
        {checklist.map((item) => {
          const isDone = Boolean(checkedItems[item.id]);

          return (
            <div
              key={item.id}
              onClick={() => toggleCheck(item.id)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer select-none space-y-2 ${
                isDone
                  ? 'bg-[#07241b] border-emerald-600/80 shadow-md'
                  : 'bg-[#071913] border-[#154636] hover:border-emerald-700/60'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400/80 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800">
                  {item.category}
                </span>
                <div className="text-emerald-400 shrink-0">
                  {isDone ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-emerald-800 hover:text-emerald-500" />
                  )}
                </div>
              </div>

              <h4 className={`text-xs font-bold ${isDone ? 'text-emerald-300 line-through' : 'text-white'}`}>
                {item.title}
              </h4>

              <p className="text-[11px] text-emerald-200/70 leading-relaxed">
                {item.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
