import React, { useState } from 'react';
import { FileText, CheckCircle2, Info, ChevronDown, ChevronUp } from 'lucide-react';

export default function DocumentChecklistSection({ documentCategories = [] }) {
  const [collapsedCategories, setCollapsedCategories] = useState({});

  const toggleCategory = (idx) => {
    setCollapsedCategories(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 4.5
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Potential Documents to Prepare
            </h3>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Potential documents to prepare — final requirements vary by applicable authority/lender
          </p>
        </div>

        <span className="text-xs font-semibold text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Illustrative Dossier Checklist
        </span>
      </div>

      {/* Transparency Note */}
      <div className="p-3.5 rounded-xl bg-[#071913] border border-[#154636] text-xs text-emerald-200/80 flex items-start gap-2.5">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong>Notice on Document Requirements:</strong> Not every document listed below is mandatory for every scheme or loan ticket size. For example, micro-loans below ₹1.40 Lakh often require only simplified KYC and an asset quote, whereas formal term loans require full DPR blueprints.
        </p>
      </div>

      {/* Document Categories Accordion/Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {documentCategories.map((cat, idx) => {
          const isCollapsed = Boolean(collapsedCategories[idx]);

          return (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-3"
            >
              <div 
                className="flex items-center justify-between cursor-pointer select-none"
                onClick={() => toggleCategory(idx)}
              >
                <div>
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider flex items-center gap-2">
                    <FileText className="w-3.5 h-3.5 text-emerald-400" />
                    {cat.category}
                  </h4>
                  <span className="text-[10px] text-emerald-300/60 block mt-0.5">
                    {cat.note}
                  </span>
                </div>
                <button 
                  type="button" 
                  className="text-emerald-400 hover:text-emerald-300 p-1"
                  aria-label="Toggle category"
                >
                  {isCollapsed ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
                </button>
              </div>

              {!isCollapsed && (
                <div className="space-y-2 pt-2 border-t border-[#144233]">
                  {cat.documents.map((doc, dIdx) => (
                    <div 
                      key={dIdx}
                      className="p-2.5 rounded-xl bg-[#0a2018] border border-[#164434] space-y-0.5"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                        <span className="text-xs font-semibold text-emerald-100">
                          {doc.name}
                        </span>
                      </div>
                      <p className="text-[11px] text-emerald-200/60 pl-5 leading-relaxed">
                        {doc.detail}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
