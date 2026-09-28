import React, { useState } from 'react';
import { Sliders, ArrowRight, ShieldCheck, CheckCircle2, Filter } from 'lucide-react';

export default function AdvisoryRecommendationsSection({ recommendations = [] }) {
  const [selectedCategory, setSelectedCategory] = useState('All');

  if (!recommendations || recommendations.length === 0) return null;

  const categories = ['All', 'Market', 'Finance', 'Financing / Scheme', 'Operations', 'Risk', 'Validation'];

  const filtered = selectedCategory === 'All' 
    ? recommendations 
    : recommendations.filter(r => r.category === selectedCategory);

  const getPriorityBadge = (p) => {
    switch (p) {
      case 'High':
        return 'bg-rose-950 text-rose-300 border-rose-800';
      case 'Medium':
        return 'bg-amber-950 text-amber-300 border-amber-800';
      case 'Low':
      default:
        return 'bg-emerald-950 text-emerald-300 border-emerald-800';
    }
  };

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 5.4
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Priority Recommendations & Next Steps
            </h3>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Explainable strategic actions linked directly to upstream analysis data
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1 rounded-full text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? 'bg-emerald-700 text-white shadow-md'
                  : 'bg-[#071913] text-emerald-300/70 hover:text-white border border-[#154636]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid or Empty Category State */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-[#071913] rounded-2xl border border-[#154636] space-y-2">
          <p className="text-xs text-stone-300 font-semibold">
            {selectedCategory === 'Market'
              ? 'Market Intelligence is not available from current analysis.'
              : selectedCategory === 'Finance'
              ? 'Financial Plan is not available from current analysis.'
              : `No recommendations available for ${selectedCategory} from current analysis.`}
          </p>
          <p className="text-[11px] text-emerald-200/60">
            Recommendations are strictly generated when corresponding upstream module data is available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] hover:border-emerald-600/70 transition-all space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Category, Priority, Source Header */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-300 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                    {item.category}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getPriorityBadge(item.priority)}`}>
                      Priority: {item.priority}
                    </span>
                    <span className="text-[10px] text-emerald-400/60 font-mono hidden sm:inline">
                      {item.source}
                    </span>
                  </div>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-white tracking-wide">
                  {item.title}
                </h4>

                {/* WHY? (Explainability) */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-amber-300 block">
                    Why:
                  </span>
                  <p className="text-xs text-emerald-200/80 leading-relaxed font-sans">
                    {item.reason}
                  </p>
                </div>
              </div>

              {/* WHAT SHOULD I DO? (Action) */}
              <div className="p-3 rounded-xl bg-[#0a221a] border border-[#18533e] space-y-1">
                <span className="text-[10px] uppercase font-bold text-cyan-300 block flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-cyan-400" />
                  Action:
                </span>
                <p className="text-emerald-100 text-[11px] leading-relaxed font-sans">
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
