import React from 'react';
import { Compass, CheckSquare, ShieldCheck, ArrowRight, Lightbulb } from 'lucide-react';

export default function FinancialRecommendationsSection({ recommendations = [] }) {
  if (!recommendations || recommendations.length === 0) return null;

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 3.8
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Actionable Financial Recommendations
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Practical pre-sanction guidelines to optimize capital structure and de-risk borrowing
          </p>
        </div>

        <span className="text-xs font-medium text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Preparatory Road Map
        </span>
      </div>

      {/* Grid of recommendations */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recommendations.map((item, idx) => (
          <div 
            key={idx}
            className="p-5 rounded-2xl bg-[#071913] border border-[#154636] hover:border-[#18533e] transition-all flex flex-col justify-between space-y-3"
          >
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-emerald-800 text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 font-mono">
                {idx + 1}
              </span>
              <div>
                <h3 className="text-sm font-bold text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-emerald-200/70 mt-2 leading-relaxed">
                  {item.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advisory disclaimer */}
      <div className="p-3.5 bg-[#051c14] rounded-xl border border-[#164d3a] text-center text-xs text-emerald-200/70">
        <strong>Advisory Note:</strong> These recommendations are guidance principles to help rural micro-entrepreneurs structure bankable proposals. They do not constitute mandatory statutory instructions or an official credit commitment by any commercial financial institution.
      </div>

    </div>
  );
}
