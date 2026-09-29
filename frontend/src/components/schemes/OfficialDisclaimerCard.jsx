import React from 'react';
import { ShieldAlert, Info, ExternalLink } from 'lucide-react';

export default function OfficialDisclaimerCard({ customDisclaimer }) {
  const disclaimerText = customDisclaimer || 
    "UdyamSetu AI provides prototype decision support based on the SIH 26091 problem-statement framework. It does not determine government eligibility or loan approval. Final scheme eligibility, financing terms, documentation and sanction are subject to current official rules and lender/authority appraisal.";

  return (
    <div className="p-5 rounded-2xl bg-amber-50/70 border border-amber-200 shadow-sm space-y-3">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-[#C87512] shrink-0 mt-0.5" />
        <div className="space-y-1.5 text-xs text-[#647067] leading-relaxed">
          <strong className="text-[#17211B] text-xs block uppercase tracking-wider">
            Official Source & Statutory Regulatory Disclosure
          </strong>
          <p className="text-[11px] leading-relaxed">
            {disclaimerText}
          </p>
          <p className="text-[11px] text-[#0F766E] pt-0.5 font-medium">
            Entrepreneurs are advised to consult their local District Industries Centre (DIC), Khadi and Village Industries Commission (KVIC) office, or Lead Bank Manager (LDM) prior to committing personal funds or executing machinery purchase orders.
          </p>
        </div>
      </div>
    </div>
  );
}

export { OfficialDisclaimerCard };
