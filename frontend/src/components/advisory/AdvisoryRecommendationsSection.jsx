import React, { useState } from 'react';
import { Sliders, ArrowRight, ShieldCheck, CheckCircle2, Filter, Cpu, Info } from 'lucide-react';

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
        return 'bg-red-50 text-[#C2413A] border-red-200';
      case 'Medium':
        return 'bg-amber-50 text-[#C87512] border-amber-200';
      case 'Low':
      default:
        return 'bg-emerald-50 text-[#16803C] border-emerald-200';
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 sm:p-7 border border-[#DDE5DD] shadow-sm space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#DDE5DD] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-[#14532D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              Module 5.4
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-[#14532D] tracking-tight">
              Strategic Advisory Priorities & Action Plan
            </h3>
          </div>
          <p className="text-xs text-[#647067] mt-0.5">
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
                  ? 'bg-[#14532D] text-white shadow-sm'
                  : 'bg-stone-50 text-[#647067] hover:text-[#17211B] border border-[#DDE5DD]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Recommendations Grid or Empty Category State */}
      {filtered.length === 0 ? (
        <div className="p-8 text-center bg-stone-50 rounded-xl border border-[#DDE5DD] space-y-2">
          <p className="text-xs text-[#17211B] font-semibold">
            {selectedCategory === 'Market'
              ? 'Market Intelligence is not available from current analysis.'
              : selectedCategory === 'Finance'
              ? 'Financial Plan is not available from current analysis.'
              : `No recommendations available for ${selectedCategory} from current analysis.`}
          </p>
          <p className="text-[11px] text-[#647067]">
            Recommendations are strictly generated when corresponding upstream module data is available.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((item, idx) => (
            <div
              key={item.id || idx}
              className="p-5 rounded-xl bg-stone-50 border border-[#DDE5DD] hover:border-[#14532D]/40 transition-all space-y-3.5 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Priority Number, Category, Source Header */}
                <div className="flex items-center justify-between gap-2 border-b border-[#DDE5DD] pb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-[#14532D] bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 font-mono">
                      STRATEGIC PRIORITY {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-[10px] font-semibold text-[#0F766E] uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded border uppercase tracking-wider ${getPriorityBadge(item.priority)}`}>
                    {item.priority}
                  </span>
                </div>

                {/* Title */}
                <h4 className="text-sm font-bold text-[#17211B] tracking-tight">
                  {item.title}
                </h4>

                {/* WHY? */}
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-bold text-[#C87512] block">
                    Why:
                  </span>
                  <p className="text-xs text-[#647067] leading-relaxed">
                    {item.reason}
                  </p>
                </div>
              </div>

              {/* WHAT SHOULD I DO? (Action) */}
              <div className="p-3 rounded-lg bg-emerald-50/50 border border-emerald-200/80 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-[#14532D] flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-[#14532D]" />
                    Action:
                  </span>
                  <span className="text-[10px] text-[#0F766E] font-medium">
                    Source: {item.source || 'Analysis Engine'}
                  </span>
                </div>
                <p className="text-[#17211B] text-xs leading-relaxed font-medium">
                  {item.action}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* AI Transparency Notice */}
      <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 flex items-start gap-2.5 text-xs text-[#C87512]">
        <Info className="w-4 h-4 text-[#C87512] shrink-0 mt-0.5" />
        <p className="leading-relaxed">
          <strong>AI Advisory Transparency Notice:</strong> Prototype advisory recommendations are generated from deterministic cross-module analysis rules (Tasks 0–7). A production release can interface this analytical layer with an authorized, safety-aligned LLM/NLP service.
        </p>
      </div>
    </div>
  );
}

export { AdvisoryRecommendationsSection };
