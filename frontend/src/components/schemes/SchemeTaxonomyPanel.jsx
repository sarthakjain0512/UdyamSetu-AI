import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, HelpCircle, ShieldCheck } from 'lucide-react';

export default function SchemeTaxonomyPanel({ taxonomy }) {
  const [isOpen, setIsOpen] = useState(false);

  if (!taxonomy) return null;

  const {
    userInput = [],
    sihParameters = [],
    calculatedEstimates = [],
    prototypeAssumptions = []
  } = taxonomy;

  return (
    <div className="bg-[#0c241b] rounded-3xl border border-[#18533e] shadow-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-[#12382b]/40 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800">
            <Layers className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Data Provenance & Scheme Routing Taxonomy
            </h3>
            <p className="text-xs text-emerald-200/70">
              Clear classification distinguishing user input, statutory SIH parameters, mathematical estimates, and prototype heuristics
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800">
          <span>{isOpen ? 'Collapse Taxonomy' : 'Explain Data Taxonomy'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 pt-0 border-t border-[#144233] space-y-6 text-xs text-emerald-100/80">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
            
            {/* 1. User Input */}
            <div className="p-4 rounded-2xl bg-[#071913] border border-emerald-800/60 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-wider block">
                  1. User Input
                </span>
                <p className="text-[11px] text-emerald-200/60 mt-0.5">
                  Parameters entered directly by the entrepreneur in Step 1 intake.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-[#144233]">
                {userInput.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[10px] text-emerald-300/60 block">{item.label}:</span>
                    <strong className="text-white text-xs block">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* 2. SIH 26091 Parameter */}
            <div className="p-4 rounded-2xl bg-[#071913] border border-purple-800/60 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-purple-300 uppercase tracking-wider block">
                  2. SIH 26091 Parameter
                </span>
                <p className="text-[11px] text-emerald-200/60 mt-0.5">
                  Statutory boundaries documented in the challenge specifications.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-[#144233]">
                {sihParameters.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[10px] text-purple-300/60 block">{item.label}:</span>
                    <strong className="text-white text-xs block">{item.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {/* 3. Calculated Estimate */}
            <div className="p-4 rounded-2xl bg-[#071913] border border-cyan-800/60 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-cyan-300 uppercase tracking-wider block">
                  3. Calculated Estimate
                </span>
                <p className="text-[11px] text-emerald-200/60 mt-0.5">
                  Deterministic mathematical derivations from the sizing equation.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-[#144233]">
                {calculatedEstimates.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[10px] text-cyan-300/60 block">{item.label}:</span>
                    <strong className="text-white text-xs block">{item.value}</strong>
                    <span className="text-[10px] text-cyan-400 font-mono block">{item.formula}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4. Illustrative Prototype Assumption */}
            <div className="p-4 rounded-2xl bg-[#071913] border border-amber-800/60 space-y-3">
              <div>
                <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider block">
                  4. Prototype Assumption
                </span>
                <p className="text-[11px] text-emerald-200/60 mt-0.5">
                  Rule matches and status labels for prototype decision support.
                </p>
              </div>
              <div className="space-y-2 pt-2 border-t border-[#144233]">
                {prototypeAssumptions.map((item, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <span className="text-[10px] text-amber-300/60 block">{item.label}:</span>
                    <strong className="text-white text-xs block">{item.value}</strong>
                    <span className="text-[10px] text-emerald-200/50 block">{item.note}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Non-Government Decision Note */}
          <div className="p-3.5 rounded-xl bg-[#071913] border border-[#18533e] text-xs text-emerald-200/80 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              <strong>Classification Assurance:</strong> The scheme routing result is labeled as <em>"Potentially Applicable"</em> based on deterministic mathematical boundary matching. It is NOT an official government loan sanction, subsidy guarantee, or statutory approval.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
