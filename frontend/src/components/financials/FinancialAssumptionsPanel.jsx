import React, { useState } from 'react';
import { 
  ChevronDown, 
  ChevronUp, 
  FileCode, 
  Layers, 
  Sliders, 
  HelpCircle, 
  AlertCircle, 
  Landmark, 
  Calculator,
  ShieldCheck 
} from 'lucide-react';
import { PROTOTYPE_FINANCIAL_ASSUMPTIONS } from '../../utils/financialCalculator';

export default function FinancialAssumptionsPanel() {
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
            <HelpCircle className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-white">
              Financial Assumptions & Methodology
            </h3>
            <p className="text-xs text-emerald-200/70">
              Mathematical formulas, SIH 26091 parameters, amortization models, and data provenance
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300 bg-emerald-950 px-3 py-1.5 rounded-lg border border-emerald-800">
          <span>{isOpen ? 'Collapse Methodology' : 'Explain Financial Methodology'}</span>
          {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </div>
      </button>

      {isOpen && (
        <div className="p-6 pt-0 border-t border-[#144233] space-y-6 text-xs text-emerald-100/80">
          
          {/* Data Provenance & Transparency Legend (Step 21) */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              1. Financial Data Provenance & Label Taxonomy
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
              <div className="p-3 rounded-xl bg-[#071913] border border-emerald-800/60">
                <span className="text-[10px] font-bold text-emerald-400 uppercase block">User Input</span>
                <p className="text-[11px] text-emerald-200/70 mt-1">Available Margin Capital and Business Category entered by the entrepreneur in Step 1.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#071913] border border-purple-800/60">
                <span className="text-[10px] font-bold text-purple-300 uppercase block">SIH 26091 Parameter</span>
                <p className="text-[11px] text-emerald-200/70 mt-1">Stated loan brackets (Micro Finance vs. Term Loan), interest rates (6.5% vs. 8.0%), and moratoriums.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#071913] border border-amber-800/60">
                <span className="text-[10px] font-bold text-amber-300 uppercase block">Calculated Estimate</span>
                <p className="text-[11px] text-emerald-200/70 mt-1">Mathematical derivations: Project Cost = Margin / 0.10, Loan = 90%, and reducing-balance EMI.</p>
              </div>
              <div className="p-3 rounded-xl bg-[#071913] border border-cyan-800/60">
                <span className="text-[10px] font-bold text-cyan-300 uppercase block">Illustrative Prototype Assumption</span>
                <p className="text-[11px] text-emerald-200/70 mt-1">Synthetic asset turnover (1.6× / 1.35×), EBITDA margins (25–28%), revenue ramp, and DSCR interpretation thresholds (NOT SIH parameters).</p>
              </div>
            </div>
          </div>

          {/* SIH Core Sizing Formula */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" />
              2. Sizing Equations (SIH 26091 Problem Statement)
            </h4>
            <div className="p-4 rounded-xl bg-[#071913] border border-[#154636] font-mono text-xs space-y-1.5 text-white">
              <div>• Project Cost = Available Margin Capital / 0.10</div>
              <div>• Sized Debt   = Project Cost × 0.90</div>
              <div className="text-emerald-300 text-[11px] font-sans pt-1">
                Reflects the standard 10% entrepreneur equity requirement and 90% debt leverage guideline.
              </div>
            </div>
          </div>

          {/* Track Brackets */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
              <Landmark className="w-4 h-4 text-emerald-400" />
              3. Scheme Track Thresholds & Ceilings
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 rounded-xl bg-[#071913] border border-[#154636] space-y-1">
                <strong className="text-white text-xs block">Micro Finance Track</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-emerald-200/70">
                  <li>Project Cost: Up to ₹1.40 Lakh</li>
                  <li>Interest Rate: 6.5% p.a.</li>
                  <li>Tenure: 3 Years (36 Months)</li>
                  <li>Moratorium: 3 Months</li>
                  <li>Maximum Loan Ceiling: ₹1.25 Lakh</li>
                </ul>
              </div>
              <div className="p-3.5 rounded-xl bg-[#071913] border border-[#154636] space-y-1">
                <strong className="text-white text-xs block">Term Loan Track</strong>
                <ul className="list-disc pl-4 space-y-0.5 text-[11px] text-emerald-200/70">
                  <li>Project Cost: Above ₹1.40 Lakh up to ₹50 Lakh</li>
                  <li>Interest Rate: 8.0% p.a.</li>
                  <li>Tenure: 7 Years (84 Months)</li>
                  <li>Moratorium: 6 Months</li>
                  <li>Maximum Loan Ceiling: ₹45.00 Lakh</li>
                </ul>
              </div>
            </div>
          </div>

          {/* EMI & Moratorium Math */}
          <div className="space-y-2">
            <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
              <FileCode className="w-4 h-4 text-emerald-400" />
              4. EMI Calculation & Moratorium Treatment
            </h4>
            <p className="leading-relaxed">
              Standard reducing balance formula: <code className="text-amber-300 font-mono text-[10px]">EMI = P × r × (1+r)^n / ((1+r)^n - 1)</code>
            </p>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-emerald-200/70">
              <li><strong>P:</strong> Sized loan principal capped at scheme ceiling.</li>
              <li><strong>r:</strong> Monthly interest rate (Annual Rate / 12).</li>
              <li><strong>n:</strong> Active repayment months (Total Tenure Months − Moratorium Months). The moratorium is explicitly excluded from the amortization denominator.</li>
              <li><strong>Moratorium Treatment:</strong> Prototype models simple monthly interest during months 1 to M. Full capital amortization begins from month M + 1.</li>
            </ul>
          </div>

          {/* DSCR Thresholds */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <h4 className="font-bold text-white uppercase tracking-wider text-[11px] flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-400" />
                5. DSCR Interpretation Benchmark
              </h4>
              <span className="text-[10px] font-bold text-cyan-300 bg-cyan-950 px-2.5 py-0.5 rounded border border-cyan-800 uppercase w-fit">
                Illustrative Prototype Assumption
              </span>
            </div>
            <p className="text-[11px] text-emerald-200/70">
              Illustrative prototype heuristic bands. These benchmarks are <strong className="text-white">NOT government eligibility thresholds</strong> or statutory lending rules. Actual lender underwriting criteria vary by institution.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-center pt-1 font-sans">
              <div className="p-2.5 rounded-lg bg-emerald-950/60 border border-emerald-800">
                <span className="font-bold text-emerald-300 block text-xs">&gt; {PROTOTYPE_FINANCIAL_ASSUMPTIONS.dscrBenchmarks.strong.toFixed(2)}</span>
                <span className="text-[10px] text-emerald-400">Strong Coverage</span>
              </div>
              <div className="p-2.5 rounded-lg bg-amber-950/60 border border-amber-800">
                <span className="font-bold text-amber-300 block text-xs">{PROTOTYPE_FINANCIAL_ASSUMPTIONS.dscrBenchmarks.moderate.toFixed(2)} – {(PROTOTYPE_FINANCIAL_ASSUMPTIONS.dscrBenchmarks.strong - 0.01).toFixed(2)}</span>
                <span className="text-[10px] text-amber-400">Moderate Coverage</span>
              </div>
              <div className="p-2.5 rounded-lg bg-orange-950/60 border border-orange-800">
                <span className="font-bold text-orange-300 block text-xs">{PROTOTYPE_FINANCIAL_ASSUMPTIONS.dscrBenchmarks.tight.toFixed(2)} – {(PROTOTYPE_FINANCIAL_ASSUMPTIONS.dscrBenchmarks.moderate - 0.01).toFixed(2)}</span>
                <span className="text-[10px] text-orange-400">Tight Coverage</span>
              </div>
              <div className="p-2.5 rounded-lg bg-rose-950/60 border border-rose-800">
                <span className="font-bold text-rose-300 block text-xs">&lt; {PROTOTYPE_FINANCIAL_ASSUMPTIONS.dscrBenchmarks.tight.toFixed(2)}</span>
                <span className="text-[10px] text-rose-400">Insufficient Coverage</span>
              </div>
            </div>
          </div>

          {/* Limitations Banner */}
          <div className="p-4 bg-[#051c14] rounded-2xl border border-[#164d3a] flex items-start gap-2.5 text-xs text-emerald-200/80">
            <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-white">Prototype Limitations:</strong> These financial structures are deterministic illustrative models designed for SIH 26091 prototype demonstration. Antigravity AI does not provide financial audit services, credit underwriting guarantees, or bank loan sanctions. All terms must be verified against current guidelines issued by the Reserve Bank of India (RBI), Ministry of MSME, and respective financing institutions.
            </div>
          </div>

        </div>
      )}
    </div>
  );
}
