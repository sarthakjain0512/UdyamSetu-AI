import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

export default function AdvisoryDisclaimerCard({ customDisclaimer }) {
  const disclaimerText = customDisclaimer || 
    "UdyamSetu AI provides prototype decision support based on the SIH 26091 problem-statement framework. It does not constitute certified financial underwriting, business consultancy guarantees, or government loan sanctions. Final eligibility, financing terms, and sanction are subject to official authority appraisal.";

  return (
    <div className="p-5 rounded-3xl bg-[#051c14] border border-[#164d3a] shadow-xl space-y-3">
      <div className="flex items-start gap-3">
        <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1.5 text-xs text-emerald-200/90 leading-relaxed">
          <strong className="text-white text-xs block uppercase tracking-wider">
            Official Advisory & Statutory Regulatory Disclosure
          </strong>
          <p className="text-[11px] leading-relaxed">
            {disclaimerText}
          </p>
          <p className="text-[11px] text-emerald-300/70 pt-0.5">
            Entrepreneurs must conduct on-ground quotation verification, consult their local District Industries Centre (DIC) or Lead Bank Office, and obtain certified tax/regulatory advice before executing commercial commitments.
          </p>
        </div>
      </div>
    </div>
  );
}
