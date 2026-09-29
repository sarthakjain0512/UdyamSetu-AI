import React from 'react';
import { 
  Building2, MapPin, IndianRupee, Calculator, 
  Sparkles, ShieldCheck, Info, CheckCircle2 
} from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';
import { computeFinancialPreview } from '../../utils/financialPreview';

export function AnalysisSummaryCard({
  stateName,
  districtName,
  blockOrLocality,
  categoryName,
  customIdea,
  isCustom,
  marginCapital,
  entrepreneurName
}) {
  const preview = computeFinancialPreview(marginCapital);
  const displayIdea = isCustom 
    ? (customIdea?.trim() || 'Custom Business Idea (Pending description)')
    : (customIdea?.trim() ? `${categoryName} — ${customIdea}` : (categoryName || 'Select a Category'));

  const locationDisplay = [districtName, stateName].filter(Boolean).join(', ') || 'Select Location';

  return (
    <div className="bg-white rounded-2xl p-5 sm:p-6 border border-[#DDE5DD] shadow-sm space-y-4 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#DDE5DD] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-50 flex items-center justify-center text-[#14532D] border border-emerald-200">
            <Sparkles className="w-4 h-4 text-[#E58A24]" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-[#17211B] tracking-tight">Live Analysis Summary</h3>
            <p className="text-[10px] text-[#647067]">Configured parameters for analysis</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 text-[#14532D] border border-emerald-200 font-semibold">
          Stage 1
        </span>
      </div>

      {/* Structured Parameters */}
      <div className="space-y-3 text-xs">
        
        {/* 1. Proposed Enterprise */}
        <div className="p-3 rounded-xl bg-stone-50 border border-[#DDE5DD] space-y-1">
          <div className="flex items-center gap-1.5 text-[#647067] text-[11px] font-medium">
            <Building2 className="w-3.5 h-3.5 text-[#14532D]" />
            <span>Proposed Enterprise</span>
          </div>
          <p className="text-[#17211B] font-bold text-sm line-clamp-2">
            {displayIdea}
          </p>
          {isCustom && (
            <span className="inline-block text-[10px] font-semibold text-[#C87512] bg-amber-50 px-1.5 py-0.5 rounded border border-amber-200">
              Custom Venture
            </span>
          )}
        </div>

        {/* 2. Target Location */}
        <div className="p-3 rounded-xl bg-stone-50 border border-[#DDE5DD] space-y-1">
          <div className="flex items-center gap-1.5 text-[#647067] text-[11px] font-medium">
            <MapPin className="w-3.5 h-3.5 text-[#0F766E]" />
            <span>Target Location</span>
          </div>
          <p className="text-[#17211B] font-bold text-sm">
            {locationDisplay}
          </p>
          {blockOrLocality && (
            <p className="text-[11px] text-[#647067] font-mono">
              Block / Locality: {blockOrLocality}
            </p>
          )}
        </div>

        {/* 3. Financial Sizing Breakdown */}
        <div className="p-3.5 rounded-xl bg-emerald-50/40 border border-emerald-200 space-y-3">
          <div className="flex items-center justify-between text-[11px] text-[#14532D] border-b border-emerald-200/80 pb-2">
            <span className="flex items-center gap-1 font-semibold">
              <Calculator className="w-3.5 h-3.5 text-[#14532D]" /> Financial Structuring
            </span>
            <span className="text-[10px] font-bold text-[#C87512] bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
              {preview.track}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[#647067]">Margin Capital (Own Equity):</span>
              <span className="font-bold text-[#17211B] text-sm">
                {formatCurrencyINR(preview.marginCapital)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#647067]">Est. Total Project Cost:</span>
              <span className="font-bold text-[#14532D] text-sm">
                {formatCurrencyINR(preview.projectCost)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-[#647067]">Indicative Bank Loan (90%):</span>
              <span className="font-bold text-[#0F766E] text-sm">
                {formatCurrencyINR(preview.loanAmount)}
              </span>
            </div>

            <div className="flex items-center justify-between pt-1 border-t border-emerald-200/60 text-[11px]">
              <span className="text-[#647067]">Indicative Interest Rate:</span>
              <span className="font-semibold text-[#14532D]">{preview.interestRate}</span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#647067]">Statutory Loan Tenure:</span>
              <span className="font-semibold text-[#14532D]">{preview.tenureYears} Years</span>
            </div>

            <div className="flex items-center justify-between text-[11px]">
              <span className="text-[#647067]">Principal Moratorium:</span>
              <span className="font-semibold text-[#14532D]">{preview.moratoriumMonths} Months</span>
            </div>
          </div>
        </div>

      </div>

      {/* Advisory Non-Guarantee Disclosure */}
      <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200/80 text-[11px] text-[#C87512] flex items-start gap-2">
        <Info className="w-3.5 h-3.5 text-[#C87512] shrink-0 mt-0.5" />
        <p className="leading-snug">
          <strong>Illustrative Prototype Data:</strong> Formulas adhere to SIH 26091 guidelines. Lending appraisal and subsidy disbursement are subject to institutional sanction.
        </p>
      </div>

    </div>
  );
}

export default AnalysisSummaryCard;
