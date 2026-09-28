import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Database, ShieldCheck, Info } from 'lucide-react';

export function DataMethodologyPanel() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-[#0a2018] rounded-2xl border border-[#164836] overflow-hidden text-xs">
      
      {/* Accordion Toggle Bar */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-5 py-3.5 flex items-center justify-between text-left hover:bg-[#0c261d] transition-colors text-emerald-200"
      >
        <div className="flex items-center gap-2">
          <Database className="w-4 h-4 text-emerald-400" />
          <span className="font-semibold text-white">Data Provenance & Methodology Disclosure</span>
          <span className="text-[10px] text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 hidden sm:inline">
            Transparency
          </span>
        </div>
        {isOpen ? <ChevronUp className="w-4 h-4 text-emerald-400" /> : <ChevronDown className="w-4 h-4 text-emerald-400" />}
      </button>

      {/* Accordion Content */}
      {isOpen && (
        <div className="p-5 pt-2 border-t border-[#133c2d] space-y-3.5 text-emerald-100/80 text-[11px] leading-relaxed">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            
            <div className="space-y-1.5 p-3 rounded-xl bg-[#061811] border border-[#123d2e]">
              <strong className="text-white block font-semibold">1. Prototype & Demo Data Policy</strong>
              <p>
                All market opportunity indicators, competitor share percentages, pricing benchmarks, and demographic splits shown in this prototype are illustrative benchmarks derived from standard rural micro-enterprise models.
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-[#061811] border border-[#123d2e]">
              <strong className="text-white block font-semibold">2. No Live Spatial / Competitor Search</strong>
              <p>
                The prototype does not query live commercial mapping APIs or claim verified on-ground competitor counts. The 5 km and 10 km radii are illustrative geographic clusters for evaluation.
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-[#061811] border border-[#123d2e]">
              <strong className="text-white block font-semibold">3. Deterministic Repeatability</strong>
              <p>
                Identical location, sector, and capital inputs produce identical advisory indicators without pseudo-random number generation, ensuring fair academic and hackathon evaluation.
              </p>
            </div>

            <div className="space-y-1.5 p-3 rounded-xl bg-[#061811] border border-[#123d2e]">
              <strong className="text-white block font-semibold">4. Future Production Roadmap</strong>
              <p>
                Future production deployment plans direct integration with authorized national data services: Agmarknet for live mandi rates, Bhuvan / LGD for spatial GIS boundaries, and Open Data portals.
              </p>
            </div>

          </div>

          <p className="text-[10px] text-emerald-300/60 italic pt-1 border-t border-[#123d2e]">
            Smart India Hackathon 2026 (SIH 26091) — Academic Prototype Transparency Framework.
          </p>
        </div>
      )}

    </div>
  );
}
