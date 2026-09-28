import React, { useState } from 'react';
import { Layers, ChevronDown, ChevronUp, Cpu, ShieldCheck, HelpCircle } from 'lucide-react';

export default function AdvisoryAssumptionsPanel({ transparency }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#0c241b] rounded-3xl border border-[#18533e] shadow-2xl overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-[#12382b]/40 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-950 text-emerald-400 flex items-center justify-center border border-emerald-800">
            <Cpu className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Advisory Architecture & Prototype Transparency
            </h3>
            <p className="text-xs text-emerald-200/70">
              Deterministic rule synthesis, data provenance, and future LLM replacement points
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800">
          <span>{isOpen ? 'Collapse Architecture' : 'Explain Advisory Engine'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 pt-0 border-t border-[#144233] space-y-6 text-xs text-emerald-100/80">
          
          {/* AI / Demo Transparency Box */}
          <div className="p-4 rounded-2xl bg-[#071913] border border-amber-800/80 space-y-2">
            <span className="text-[10px] font-bold uppercase text-amber-300 tracking-wider block">
              Prototype Advisory Engine Notice
            </span>
            <p className="text-xs leading-relaxed text-emerald-100">
              {transparency?.aiModelNotice || 'Recommendations are generated from deterministic prototype rules using the available analysis outputs. No real-time AI model or live government decision engine is used in this prototype.'}
            </p>
            <p className="text-[11px] text-emerald-300/80 pt-1 leading-relaxed">
              {transparency?.futureArchitecture || 'Future production architecture can connect this advisory layer to an authorized LLM/NLP service.'}
            </p>
          </div>

          {/* Provenance Taxonomy Grid */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              Advisory Input Taxonomy & Traceability
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[#071913] border border-emerald-800/60">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block">User Input</span>
                <p className="text-[11px] text-emerald-200/70 mt-1">Margin capital, selected district, and custom enterprise proposal.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#071913] border border-purple-800/60">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">SIH 26091 Parameter</span>
                <p className="text-[11px] text-emerald-200/70 mt-1">Micro vs. Term Loan boundaries, 90/10 ratio, and interest ceilings.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#071913] border border-cyan-800/60">
                <span className="text-[10px] font-bold text-cyan-300 uppercase block">Calculated Estimate</span>
                <p className="text-[11px] text-emerald-200/70 mt-1">Feasibility scores, break-even months, reducing-balance EMI, and DSCR.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#071913] border border-amber-800/60">
                <span className="text-[10px] font-bold text-amber-300 uppercase block">Prototype Assumption</span>
                <p className="text-[11px] text-emerald-200/70 mt-1">Structured decision rules, priority action mapping, and due diligence checks.</p>
              </div>
            </div>
          </div>

          {/* Explainability Assurance */}
          <div className="p-3.5 rounded-xl bg-[#071913] border border-[#18533e] text-xs text-emerald-200/80 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px]">
              <strong>SIH 26091 Explainability Standard:</strong> Every recommendation in this module provides an explicit rationale (<code className="text-amber-300 font-mono text-[10px]">Why</code>) and an operational next step (<code className="text-cyan-300 font-mono text-[10px]">Action</code>), eliminating black-box outputs.
            </p>
          </div>

        </div>
      )}
    </div>
  );
}
