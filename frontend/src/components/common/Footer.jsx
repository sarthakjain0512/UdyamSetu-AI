import React from 'react';
import { Building2, ShieldCheck, Award, AlertCircle } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-[#DDE5DD] bg-white text-[#647067] text-xs py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#14532D] flex items-center justify-center text-white font-bold border border-[#0f3e22]">
              <Building2 className="w-4 h-4 text-emerald-100" />
            </div>
            <div>
              <span className="text-sm font-bold text-[#17211B] tracking-tight">UdyamSetu AI</span>
              <p className="text-[11px] text-[#647067]">
                Smart India Hackathon 2026 • SIH 26091 — Rural Micro-Enterprise Advisory & Financial Structuring
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 text-[11px]">
            <span className="flex items-center gap-1 bg-emerald-50 text-[#14532D] px-2.5 py-1 rounded-md border border-emerald-200 font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-[#16803C]" /> Modular Engine Architecture
            </span>
            <span className="flex items-center gap-1 bg-amber-50 text-[#C87512] px-2.5 py-1 rounded-md border border-amber-200 font-semibold">
              <Award className="w-3.5 h-3.5 text-[#E58A24]" /> SIH 2026 Prototype
            </span>
          </div>
        </div>

        {/* Prototype & Legal Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50/70 border border-amber-200 text-[11px] text-[#C87512] space-y-1">
          <div className="flex items-center gap-1.5 font-semibold text-[#17211B]">
            <AlertCircle className="w-3.5 h-3.5 text-[#C87512]" /> Prototype Evaluation Disclaimer
          </div>
          <p className="text-[#647067]">
            This application uses synthetic and demonstration benchmark datasets for academic and hackathon evaluation. Final scheme eligibility, subsidy percentages, and credit sanction remain subject to statutory verification on official nodal portals (JanSamarth, KVIC, Mudra) and institutional appraisal.
          </p>
        </div>

        <div className="border-t border-[#DDE5DD] pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#647067]">
          <p>© 2026 UdyamSetu AI. From Local Insight to Sustainable Enterprise.</p>
          <p>Rural Micro-Enterprise Advisory Framework — SIH 26091</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
