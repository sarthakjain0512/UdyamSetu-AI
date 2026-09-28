import React, { useState } from 'react';
import { 
  Table, 
  ChevronDown, 
  ChevronUp, 
  Calendar, 
  IndianRupee, 
  FileSpreadsheet, 
  ShieldCheck,
  Info
} from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

export default function RepaymentScheduleSection({ repayment, financing, emi }) {
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [activeYearFilter, setActiveYearFilter] = useState('all');

  if (!repayment || !financing) return null;

  const { yearlySummaries = [], monthlySchedule = [] } = repayment;
  const { loanAmount, track, tenureYears } = financing;
  const { totalInterest, totalRepayment } = emi;

  const filteredMonthly = activeYearFilter === 'all'
    ? monthlySchedule
    : monthlySchedule.filter(m => Math.ceil(m.month / 12) === Number(activeYearFilter));

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 3.3
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Amortization & Repayment Schedule
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Deterministic principal redemption and interest servicing breakdown across tenure
          </p>
        </div>

        <span className="text-xs font-medium text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Illustrative Repayment Estimate
        </span>
      </div>

      {/* Annual Summary Cards / Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
            <Calendar className="w-4 h-4 text-emerald-400" />
            Annual Summary Breakdown ({yearlySummaries.length} Years)
          </h3>
          <span className="text-[11px] text-emerald-300/60">
            Summary View (Click Below For Month-by-Month)
          </span>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-[#18533e]">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#071913] text-emerald-300/80 font-bold uppercase tracking-wider border-b border-[#18533e]">
              <tr>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Opening Balance</th>
                <th className="py-3 px-4">Annual Debt Service</th>
                <th className="py-3 px-4 text-emerald-400">Principal Paid</th>
                <th className="py-3 px-4 text-amber-400">Interest Paid</th>
                <th className="py-3 px-4">Closing Balance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#144233] bg-[#0c241b]">
              {yearlySummaries.map((yr) => (
                <tr key={yr.year} className="hover:bg-[#12382b]/50 transition-colors">
                  <td className="py-3 px-4 font-bold text-white flex items-center gap-1.5">
                    <span className="w-5 h-5 rounded bg-emerald-950 text-emerald-400 text-[10px] flex items-center justify-center font-mono">
                      Y{yr.year}
                    </span>
                    <span>Year {yr.year}</span>
                  </td>
                  <td className="py-3 px-4 font-mono text-emerald-100">{formatCurrencyINR(yr.openingBalance)}</td>
                  <td className="py-3 px-4 font-mono text-white font-bold">{formatCurrencyINR(yr.totalPayment)}</td>
                  <td className="py-3 px-4 font-mono text-emerald-400 font-bold">{formatCurrencyINR(yr.totalPrincipal)}</td>
                  <td className="py-3 px-4 font-mono text-amber-300">{formatCurrencyINR(yr.totalInterest)}</td>
                  <td className="py-3 px-4 font-mono text-cyan-300">{formatCurrencyINR(yr.closingBalance)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot className="bg-[#071913] border-t-2 border-[#18533e] font-bold text-white">
              <tr>
                <td className="py-3 px-4">Total ({yearlySummaries.length} Yrs)</td>
                <td className="py-3 px-4 font-mono text-emerald-300/60">—</td>
                <td className="py-3 px-4 font-mono text-white text-sm">{formatCurrencyINR(totalRepayment)}</td>
                <td className="py-3 px-4 font-mono text-emerald-400 text-sm">{formatCurrencyINR(loanAmount)}</td>
                <td className="py-3 px-4 font-mono text-amber-300 text-sm">{formatCurrencyINR(totalInterest)}</td>
                <td className="py-3 px-4 font-mono text-cyan-300">₹0</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      {/* Expandable Detailed Monthly Schedule */}
      <div className="pt-2 border-t border-[#144233]">
        <button
          onClick={() => setShowFullSchedule(!showFullSchedule)}
          className="w-full py-3.5 px-5 rounded-2xl bg-[#071913] hover:bg-[#12382b] border border-[#18533e] transition-colors flex items-center justify-between text-xs font-bold text-emerald-300"
          aria-expanded={showFullSchedule}
        >
          <div className="flex items-center gap-2">
            <FileSpreadsheet className="w-4 h-4 text-emerald-400" />
            <span>
              {showFullSchedule ? 'Collapse Detailed Monthly Schedule' : `Expand Detailed Monthly Schedule (${monthlySchedule.length} Months)`}
            </span>
          </div>
          {showFullSchedule ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showFullSchedule && (
          <div className="mt-4 space-y-4">
            {/* Filter by year */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <span className="text-emerald-300/70 font-semibold mr-1">Filter Schedule:</span>
              <button
                onClick={() => setActiveYearFilter('all')}
                className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                  activeYearFilter === 'all'
                    ? 'bg-emerald-600 text-white border-emerald-500'
                    : 'bg-[#071913] text-emerald-300/80 border-[#18533e] hover:bg-[#12382b]'
                }`}
              >
                All Months ({monthlySchedule.length})
              </button>
              {yearlySummaries.map((yr) => (
                <button
                  key={yr.year}
                  onClick={() => setActiveYearFilter(String(yr.year))}
                  className={`px-3 py-1 rounded-lg border text-xs font-semibold transition-colors ${
                    activeYearFilter === String(yr.year)
                      ? 'bg-emerald-600 text-white border-emerald-500'
                      : 'bg-[#071913] text-emerald-300/80 border-[#18533e] hover:bg-[#12382b]'
                  }`}
                >
                  Year {yr.year}
                </button>
              ))}
            </div>

            {/* Scrollable table container */}
            <div className="overflow-x-auto max-h-96 rounded-2xl border border-[#18533e] shadow-inner">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#071913] text-emerald-300/80 font-bold uppercase tracking-wider sticky top-0 border-b border-[#18533e] z-10">
                  <tr>
                    <th className="py-2.5 px-3">Mo #</th>
                    <th className="py-2.5 px-3">Phase</th>
                    <th className="py-2.5 px-3">Opening</th>
                    <th className="py-2.5 px-3">Installment</th>
                    <th className="py-2.5 px-3 text-emerald-400">Principal</th>
                    <th className="py-2.5 px-3 text-amber-400">Interest</th>
                    <th className="py-2.5 px-3">Closing</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#144233] bg-[#0c241b] font-mono">
                  {filteredMonthly.map((m) => (
                    <tr 
                      key={m.month} 
                      className={`hover:bg-[#12382b]/60 transition-colors ${
                        m.isMoratorium ? 'bg-amber-950/20' : ''
                      }`}
                    >
                      <td className="py-2 px-3 font-sans font-bold text-white">M{m.month}</td>
                      <td className="py-2 px-3 font-sans">
                        <span className={`text-[10px] px-2 py-0.5 rounded font-semibold ${
                          m.isMoratorium
                            ? 'bg-amber-950 text-amber-300 border border-amber-800'
                            : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                        }`}>
                          {m.phase}
                        </span>
                      </td>
                      <td className="py-2 px-3 text-emerald-100">{formatCurrencyINR(m.openingBalance)}</td>
                      <td className="py-2 px-3 text-white font-bold">{formatCurrencyINR(m.payment)}</td>
                      <td className="py-2 px-3 text-emerald-400">{formatCurrencyINR(m.principal)}</td>
                      <td className="py-2 px-3 text-amber-300">{formatCurrencyINR(m.interest)}</td>
                      <td className="py-2 px-3 text-cyan-300">{formatCurrencyINR(m.closingBalance)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Amortization Disclaimer Note */}
      <div className="p-3.5 bg-[#071913] rounded-xl border border-[#18533e] flex items-start gap-2.5 text-xs text-emerald-200/80">
        <Info className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
        <p className="leading-relaxed text-[11px]">
          <strong>Amortization Note:</strong> This schedule is an illustrative prototype estimate calculated via standard reducing-balance math. Official bank loan agreements may adjust installment dates, apply rounding conventions, or adjust for leap years and statutory banking holidays.
        </p>
      </div>

    </div>
  );
}
