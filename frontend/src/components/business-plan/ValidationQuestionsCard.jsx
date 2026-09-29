import React from 'react';
import { HelpCircle, CheckCircle2, Info } from 'lucide-react';

export default function ValidationQuestionsCard({ questionsData }) {
  const isAvailable = questionsData?.isAvailable;
  const questions = questionsData?.questions || [];

  // Group questions by category
  const categories = ['Market', 'Operations', 'Finance', 'Financing', 'Business Model'];
  
  const grouped = categories.reduce((acc, cat) => {
    acc[cat] = questions.filter(q => {
      const qCat = q.category?.toLowerCase() || '';
      return qCat.includes(cat.toLowerCase());
    });
    return acc;
  }, {});

  // Any remaining questions
  const unassigned = questions.filter(q => {
    const qCat = q.category?.toLowerCase() || '';
    return !categories.some(cat => qCat.includes(cat.toLowerCase()));
  });

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.10
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Self-Assessment & Inquiries
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Pre-Commitment Validation Questions
          </h2>
          <p className="text-xs text-emerald-200/70">
            Pragmatic questions to answer before taking on debt or leasing premises
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] text-slate-400 block">
            Evidence-Gathering Guide
          </span>
        </div>
      </div>

      {/* Unavailable State */}
      {!isAvailable ? (
        <div className="p-8 rounded-2xl bg-[#071913] border border-dashed border-slate-700 text-center space-y-3">
          <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
            <Info className="w-5 h-5" />
          </div>
          <h3 className="text-sm font-bold text-slate-300">
            AI Advisory — Not available from current analysis
          </h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Complete Module 5 (AI Advisory) to generate hyper-local validation questions tailored to your business sector and location tier.
          </p>
        </div>
      ) : (
        <div className="space-y-6">
          {categories.map(cat => {
            const list = grouped[cat];
            if (!list || list.length === 0) return null;

            return (
              <div key={cat} className="space-y-3">
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-[#144233] pb-1.5">
                  {cat} Validation
                </span>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {list.map((q, idx) => (
                    <div 
                      key={idx}
                      className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-2.5 flex flex-col justify-between"
                    >
                      <div className="space-y-1.5">
                        <div className="flex items-start gap-2">
                          <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <h4 className="text-xs font-bold text-white leading-snug">
                            {q.question}
                          </h4>
                        </div>

                        {q.whyItMatters && (
                          <p className="text-[11px] text-[#E7F3EC] leading-relaxed pl-6">
                            <strong className="text-[#6EE7B7]">Why it matters:</strong> {q.whyItMatters}
                          </p>
                        )}
                      </div>

                      {q.validationMethod && (
                        <div className="pt-2 border-t border-[#144233] pl-6">
                          <span className="text-[10px] text-amber-300 block font-semibold">
                            How to test: {q.validationMethod}
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

          {unassigned.length > 0 && (
            <div className="space-y-3">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block border-b border-[#144233] pb-1.5">
                General Business Questions
              </span>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {unassigned.map((q, idx) => (
                  <div key={idx} className="p-4 rounded-2xl bg-[#071913] border border-[#18533e] space-y-2">
                    <div className="flex items-start gap-2">
                      <HelpCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                      <h4 className="text-xs font-bold text-white leading-snug">{q.question}</h4>
                    </div>
                    {q.whyItMatters && (
                      <p className="text-[11px] text-[#E7F3EC] leading-relaxed pl-6">{q.whyItMatters}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
