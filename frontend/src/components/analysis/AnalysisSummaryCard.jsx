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
    ? (customIdea.trim() || 'Custom Business Idea (Pending description)')
    : (customIdea.trim() ? `${categoryName} — ${customIdea}` : (categoryName || 'Select a Category'));

  const locationDisplay = [districtName, stateName].filter(Boolean).join(', ') || 'Select Location';

  return (
    <div className="bg-[#0c241b] rounded-2xl p-5 sm:p-6 border border-[#18533e] shadow-xl space-y-5 sticky top-24">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-[#144233] pb-3">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-emerald-950 flex items-center justify-center text-amber-400 border border-emerald-700/50">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-white tracking-wide">Live Intake Summary</h3>
            <p className="text-[10px] text-emerald-300/70">Real-time parameters for analysis</p>
          </div>
        </div>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800">
          Step 1/5
        </span>
      </div>

      {/* Structured Parameters */}
      <div className="space-y-3.5 text-xs">
        
        {/* 1. Business Idea */}
        <div className="p-3 rounded-xl bg-[#071a13] border border-[#164836] space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-300/70 text-[11px] font-medium">
            <Building2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Proposed Enterprise</span>
          </div>
          <p className="text-white font-semibold text-sm line-clamp-2">
            {displayIdea}
          </p>
          {isCustom && (
            <span className="inline-block text-[10px] text-amber-300 bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
              Custom Venture
            </span>
          )}
        </div>

        {/* 2. Location */}
        <div className="p-3 rounded-xl bg-[#071a13] border border-[#164836] space-y-1">
          <div className="flex items-center gap-1.5 text-emerald-300/70 text-[11px] font-medium">
            <MapPin className="w-3.5 h-3.5 text-rose-400" />
            <span>Target Location</span>
          </div>
          <p className="text-white font-semibold text-sm">
            {locationDisplay}
          </p>
          {blockOrLocality && (
            <p className="text-[11px] text-emerald-200/60 font-mono">
              Block / Locality: {blockOrLocality}
            </p>
          )}
        </div>

        {/* 3. Financial Sizing Breakdown */}
        <div className="p-3.5 rounded-xl bg-[#061d15] border border-[#1c5540] space-y-3">
          <div className="flex items-center justify-between text-[11px] text-emerald-300/70 border-b border-[#123d2e] pb-2">
            <span className="flex items-center gap-1 font-medium">
              <Calculator className="w-3.5 h-3.5 text-emerald-400" /> Financial Structuring
            </span>
            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
              {preview.track}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-emerald-100/70">Margin Capital (Own Equity):</span>
              <span className="font-bold text-white text-sm">
                {formatCurrencyINR(preview.marginCapital)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-emerald-100/70">Est. Total Project Cost:</span>
              <span className="font-bold text-emerald-300 text-sm">
                {formatCurrencyINR(preview.estimatedProjectCost)}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-emerald-100/70">Est. Bank Loan (90%):</span>
              <span className="font-bold text-amber-400 text-sm">
                {formatCurrencyINR(preview.estimatedLoanAmount)}
              </span>
            </div>
          </div>

          {preview.marginCapital > 0 && (
            <div className="pt-2 border-t border-[#123d2e] space-y-1 text-[11px] text-emerald-200/70">
              <div className="flex justify-between">
                <span>Indicative Rate:</span>
                <span className="font-semibold text-white">{preview.interestRate}</span>
              </div>
              <div className="flex justify-between">
                <span>Indicative Tenure:</span>
                <span className="font-semibold text-white">{preview.tenure}</span>
              </div>
              <div className="flex justify-between">
                <span>Moratorium Period:</span>
                <span className="font-semibold text-white">{preview.moratorium}</span>
              </div>
            </div>
          )}
        </div>

        {entrepreneurName && (
          <div className="text-[11px] text-emerald-300/80 px-1 flex items-center justify-between">
            <span>Applicant:</span>
            <span className="font-semibold text-white">{entrepreneurName}</span>
          </div>
        )}

      </div>

      {/* Disclaimers & Notes */}
      <div className="p-3 rounded-xl bg-[#071e16] border border-[#154636] text-[10px] text-emerald-300/60 space-y-1">
        <div className="flex items-center gap-1 font-semibold text-amber-300/90">
          <Info className="w-3 h-3 text-amber-400" /> SIH 26091 Framework Preview
        </div>
        <p>
          Calculations use the 10% equity / 90% debt rule. Market intelligence and feasibility scores will be generated on the next step.
        </p>
      </div>
    </div>
  );
}
