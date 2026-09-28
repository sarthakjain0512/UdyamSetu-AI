import React, { useState } from 'react';
import { 
  CheckSquare, Square, Building2, TrendingUp, IndianRupee, 
  Wrench, Landmark, FileText, AlertCircle, Info 
} from 'lucide-react';

export default function LaunchChecklist({ checklist }) {
  if (!checklist) return null;

  // Local interactive toggle state for user convenience during planning session
  const [completedItems, setCompletedItems] = useState({});

  const toggleItem = (id) => {
    setCompletedItems(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const sections = [
    {
      key: 'businessValidation',
      title: 'A. Business Validation',
      subtitle: 'Concept, product-market fit, and physical premises readiness',
      icon: Building2,
      color: 'text-amber-400',
      items: checklist.businessValidation || []
    },
    {
      key: 'marketValidation',
      title: 'B. Market Validation',
      subtitle: 'Catchment demand, competitive pricing, and distribution access',
      icon: TrendingUp,
      color: 'text-emerald-400',
      items: checklist.marketValidation || []
    },
    {
      key: 'financialPreparation',
      title: 'C. Financial Preparation',
      subtitle: 'Promoter equity readiness, debt service capability, and working capital',
      icon: IndianRupee,
      color: 'text-cyan-400',
      items: checklist.financialPreparation || []
    },
    {
      key: 'operationsPreparation',
      title: 'D. Operations Preparation',
      subtitle: 'Vendor machinery quotes, raw material contracts, and workforce availability',
      icon: Wrench,
      color: 'text-orange-400',
      items: checklist.operationsPreparation || []
    },
    {
      key: 'schemeVerification',
      title: 'E. Financing / Scheme Verification',
      subtitle: 'Official bank interaction, loan ceiling adherence, and subsidy verification',
      icon: Landmark,
      color: 'text-indigo-400',
      items: checklist.schemeVerification || []
    },
    {
      key: 'documentationPreparation',
      title: 'F. Documentation Preparation',
      subtitle: 'Potential statutory items (confirm applicability before applying)',
      icon: FileText,
      color: 'text-teal-400',
      items: checklist.documentationPreparation || []
    }
  ];

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b border-[#144233] pb-5">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 6.4
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              Operational Due Diligence
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight font-serif">
            Pre-Launch Verification Checklist
          </h2>
          <p className="text-xs text-emerald-200/70">
            Structured action items grouped by operational domain. Click to check off items as you validate them.
          </p>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-[11px] text-slate-400 block max-w-xs">
            Regulatory & document items are potential items; verify whether applicable before incurring expense.
          </span>
        </div>
      </div>

      {/* Checklist Sections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {sections.map(section => {
          const Icon = section.icon;
          const isSectionAvailable = section.items.some(i => i.isAvailable !== false);

          return (
            <div 
              key={section.key}
              className="p-5 rounded-2xl bg-[#071913] border border-[#18533e] space-y-4 flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Section Title */}
                <div className="flex items-start gap-2.5 border-b border-[#144233] pb-3">
                  <div className={`p-2 rounded-xl bg-black/40 border border-[#18533e] shrink-0 ${section.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      {section.title}
                    </h3>
                    <p className="text-[11px] text-emerald-200/60 mt-0.5">
                      {section.subtitle}
                    </p>
                  </div>
                </div>

                {/* Items List */}
                <div className="space-y-2.5">
                  {section.items.map(item => {
                    const isChecked = Boolean(completedItems[item.id]);

                    if (item.isAvailable === false) {
                      return (
                        <div 
                          key={item.id}
                          className="p-3 rounded-xl bg-slate-900/60 border border-dashed border-slate-700 space-y-1 text-slate-400"
                        >
                          <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
                            <Info className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{item.title}</span>
                          </div>
                          <p className="text-[11px] text-slate-400 leading-relaxed pl-5.5">
                            {item.action}
                          </p>
                        </div>
                      );
                    }

                    return (
                      <div 
                        key={item.id}
                        onClick={() => toggleItem(item.id)}
                        className={`p-3 rounded-xl border transition-all cursor-pointer select-none space-y-1 ${
                          isChecked 
                            ? 'bg-emerald-950/30 border-emerald-700/80 text-emerald-100' 
                            : 'bg-black/30 border-[#144233] hover:border-emerald-800 text-slate-200'
                        }`}
                      >
                        <div className="flex items-start gap-2.5">
                          <button 
                            type="button" 
                            className="mt-0.5 shrink-0 text-emerald-400 focus:outline-none"
                            aria-label={`Toggle ${item.title}`}
                          >
                            {isChecked ? (
                              <CheckSquare className="w-4 h-4 text-emerald-400" />
                            ) : (
                              <Square className="w-4 h-4 text-slate-500 hover:text-emerald-400" />
                            )}
                          </button>
                          <div className="space-y-0.5 flex-1">
                            <p className={`text-xs font-bold leading-snug ${isChecked ? 'line-through opacity-70' : 'text-white'}`}>
                              {item.title}
                            </p>
                            <p className="text-[11px] text-emerald-200/70 leading-relaxed">
                              {item.action}
                            </p>
                            {item.status && (
                              <span className="text-[10px] font-semibold text-amber-400/90 block pt-0.5">
                                • {item.status}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
}
