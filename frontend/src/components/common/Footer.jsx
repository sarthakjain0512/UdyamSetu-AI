import React from 'react';
import { Building2, ShieldCheck, Award, AlertCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#124232] bg-[#051f17] text-emerald-100/70 text-xs py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-700 flex items-center justify-center text-white font-bold border border-emerald-500/40">
              <Building2 className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-white tracking-wide">UdyamSetu AI</span>
              <p className="text-[11px] text-emerald-200/60">
                Problem Statement SIH 26091 — AI Advisory & Financial Structuring Assistant for Rural Micro-Entrepreneurs
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-[11px] text-emerald-200/80">
            <span className="flex items-center gap-1 bg-[#0b3829] px-2.5 py-1 rounded-md border border-[#1b5c45]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Modular Engine Architecture
            </span>
            <span className="flex items-center gap-1 bg-[#0b3829] px-2.5 py-1 rounded-md border border-[#1b5c45]">
              <Award className="w-3.5 h-3.5 text-amber-400" /> SIH 2026 Prototype
            </span>
          </div>
        </div>

        {/* Prototype & Legal Notice */}
        <div className="p-3.5 rounded-xl bg-[#092b21] border border-[#17523f] text-[11px] text-emerald-200/70 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-amber-300">
            <AlertCircle className="w-3.5 h-3.5 text-amber-400" /> Prototype Disclaimer
          </div>
          <p>
            This application uses synthetic and demonstration datasets for academic and hackathon evaluation. Final scheme eligibility, subsidy percentages, and credit sanction remain subject to statutory verification on official nodal portals.
          </p>
        </div>

        <div className="border-t border-[#0d3427] pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-emerald-300/50">
          <p>© 2026 UdyamSetu AI. From Local Insight to Sustainable Enterprise.</p>
          <p>Ministry of Social Justice and Empowerment — SIH 26091</p>
        </div>
      </div>
    </footer>
  );
}
