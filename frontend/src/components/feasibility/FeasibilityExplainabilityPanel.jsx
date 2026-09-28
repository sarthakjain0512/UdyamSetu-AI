import React, { useState } from 'react';
import { ChevronDown, ChevronUp, FileCode, Layers, Sliders, AlertCircle, HelpCircle } from 'lucide-react';

export default function FeasibilityExplainabilityPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-6 text-left flex items-center justify-between hover:bg-stone-50/60 transition-colors focus:outline-none"
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-stone-100 text-stone-700 flex items-center justify-center">
            <HelpCircle className="w-5 h-5 text-emerald-800" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-stone-900">
              How this assessment was calculated
            </h3>
            <p className="text-xs text-stone-500">
              Deterministic methodology, input parameters, scoring formulas, and prototype assumptions.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
          <span>{isOpen ? 'Collapse' : 'Explain Methodology'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 pt-0 border-t border-stone-100 space-y-6 text-xs text-stone-600">
          {/* Dimensions Evaluated & Weights */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-800" />
              1. Dimensions Evaluated & Weighted Scoring
            </h4>
            <p className="leading-relaxed">
              The overall feasibility score (0–100) is a weighted deterministic composite of 5 core dimensions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3 pt-2">
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-800 block">Market Fit (25%)</span>
                <span className="text-[11px] text-stone-500">Based on local demand index, competitor density, and product category relevance.</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-800 block">Financial (25%)</span>
                <span className="text-[11px] text-stone-500">Evaluates margin capital adequacy against indicative minimum project scale.</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-800 block">Operational (20%)</span>
                <span className="text-[11px] text-stone-500">Heuristic rating of local raw material access, equipment lead times, and infrastructure.</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-800 block">Resource (15%)</span>
                <span className="text-[11px] text-stone-500">Availability of rural skilled labor, tooling dependencies, and distribution channels.</span>
              </div>
              <div className="p-3 rounded-lg bg-stone-50 border border-stone-200">
                <span className="font-bold text-stone-800 block">Risk Control (15%)</span>
                <span className="text-[11px] text-stone-500">Inverted vulnerability metric factoring seasonal demand swings and supply chain single-points.</span>
              </div>
            </div>
          </div>

          {/* Explicit Inputs Used */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Sliders className="w-4 h-4 text-emerald-800" />
              2. Inputs Consumed Directly From Session
            </h4>
            <ul className="list-disc pl-5 space-y-1">
              <li><strong>Task 2 Inputs:</strong> Entrepreneur Location (State, District, Locality), Business Category, Business Idea description, and Margin Capital (₹).</li>
              <li><strong>Financial Baseline:</strong> Strict SIH 26091 ratio — Project Cost = Margin Capital / 0.10, Estimated Loan = Project Cost × 0.90.</li>
              <li><strong>Task 3 Market Intelligence:</strong> Local demand signal, competitor count/intensity index, and identified opportunity/threat vectors.</li>
            </ul>
          </div>

          {/* A) Feasibility Status Thresholds */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-800" />
              3. Feasibility Status Classification (Deterministic)
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center pt-1">
              <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block text-xs">75 – 100</span>
                <span className="text-[11px] text-emerald-800">Potentially Feasible</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900 block text-xs">60 – 74</span>
                <span className="text-[11px] text-amber-800">Needs Validation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-orange-50 border border-orange-200">
                <span className="font-bold text-orange-900 block text-xs">45 – 59</span>
                <span className="text-[11px] text-orange-800">Needs Significant Preparation</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200">
                <span className="font-bold text-rose-900 block text-xs">0 – 44</span>
                <span className="text-[11px] text-rose-800">High Risk</span>
              </div>
            </div>
          </div>

          {/* B) Letter Grade Thresholds */}
          <div className="space-y-2">
            <h4 className="font-bold text-stone-900 uppercase tracking-wider text-[11px] flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-800" />
              4. Deterministic Letter Grade Thresholds
            </h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2 text-center pt-1">
              <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="font-bold text-emerald-900 block text-sm">A+</span>
                <span className="text-[10px] text-emerald-800">90 – 100</span>
              </div>
              <div className="p-2 rounded-lg bg-emerald-50/70 border border-emerald-200">
                <span className="font-bold text-emerald-900 block text-sm">A</span>
                <span className="text-[10px] text-emerald-800">75 – 89</span>
              </div>
              <div className="p-2 rounded-lg bg-amber-50 border border-amber-200">
                <span className="font-bold text-amber-900 block text-sm">B</span>
                <span className="text-[10px] text-amber-800">60 – 74</span>
              </div>
              <div className="p-2 rounded-lg bg-orange-50 border border-orange-200">
                <span className="font-bold text-orange-900 block text-sm">C</span>
                <span className="text-[10px] text-orange-800">45 – 59</span>
              </div>
              <div className="p-2 rounded-lg bg-rose-50 border border-rose-200">
                <span className="font-bold text-rose-900 block text-sm">D</span>
                <span className="text-[10px] text-rose-800">0 – 44</span>
              </div>
            </div>
          </div>

          {/* Prototype Limitations & Non-Guarantee Disclaimer */}
          <div className="p-3.5 bg-stone-100 rounded-xl border border-stone-200 text-stone-600 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-stone-500 shrink-0 mt-0.5" />
            <div>
              <strong className="text-stone-800">Prototype Assumptions & Limitations:</strong> All operational ratios, break-even months, and supply chain complexity indices are based on illustrative micro-enterprise archetypes. Antigravity AI makes no claim of scientifically validated predictive certainty. This assessment does not replace formal bank appraisals or official credit committee evaluations.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
