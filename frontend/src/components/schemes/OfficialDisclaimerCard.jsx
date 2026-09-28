import React from 'react';
import { ShieldAlert, Info, ExternalLink } from 'lucide-react';

export default function OfficialDisclaimerCard({ customDisclaimer }) {
  const disclaimerText = customDisclaimer || 
    "UdyamSetu AI provides prototype decision support based on the SIH 26091 problem-statement framework. It does not determine government eligibility or loan approval. Final scheme eligibility, financing terms, documentation and sanction are subject to current official rules and lender/authority appraisal.";

  return (
    <div className="p-5 rounded-3xl bg-[#051c14] border border-[#164d3a] shadow-xl space-y-3">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1.5 text-xs text-emerald-200/90 leading-relaxed">
          <strong className="text-white text-xs block uppercase tracking-wider">
            Official Source & Statutory Regulatory Disclosure
          </strong>
          <p className="text-[11px] leading-relaxed">
            {disclaimerText}
          </p>
          <p className="text-[11px] text-emerald-300/70 pt-0.5">
            Entrepreneurs are advised to consult their local District Industries Centre (DIC), Khadi and Village Industries Commission (KVIC) office, or Lead Bank Manager (LDM) prior to committing personal funds or executing machinery purchase orders.
          </p>
        </div>
      </div>
    </div>
  );
}
