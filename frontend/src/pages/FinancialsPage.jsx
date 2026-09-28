import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Calculator, IndianRupee, PieChart as PieIcon, TrendingUp, Calendar, Percent } from 'lucide-react';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid } from 'recharts';
import { useFinancials } from '../hooks/useFinancials';
import { MetricCard } from '../components/common/MetricCard';
import { formatCurrencyINR, formatPercentage } from '../utils/formatters';

export function FinancialsPage() {
  const location = useLocation();
  const { data, loading, calculate } = useFinancials();

  const [totalCost, setTotalCost] = useState(location.state?.proposed_capital || 300000);
  const [equity, setEquity] = useState(45000);
  const [loanTerm, setLoanTerm] = useState(5);

  useEffect(() => {
    calculate({
      sector_id: location.state?.sector_id || 'dairy-processing',
      total_project_cost: Number(totalCost),
      equity_contribution: Number(equity),
      desired_loan_term_years: Number(loanTerm),
      estimated_monthly_revenue: Number(totalCost) * 0.38
    });
  }, [totalCost, equity, loanTerm]);

  return (
    <div className="space-y-8">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-indigo-950 text-indigo-300 border border-indigo-800 mb-2">
            <Calculator className="w-3.5 h-3.5" /> Module 3: Financial Structuring Engine
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white">Bankable Financial Projections & DSCR</h1>
          <p className="text-xs text-slate-400">CapEx/OpEx allocation, 3-year cash flow, EMI estimation & subsidy impact</p>
        </div>

        {/* Dynamic Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="space-y-1">
            <span className="text-[10px] text-slate-400">Project Cost:</span>
            <input
              type="number"
              step="25000"
              value={totalCost}
              onChange={(e) => setTotalCost(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] text-slate-400">Equity (15%):</span>
            <input
              type="number"
              value={equity}
              onChange={(e) => setEquity(e.target.value)}
              className="px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-700 text-xs text-white"
            />
          </div>
        </div>
      </div>

      {loading && (
        <div className="p-12 text-center text-slate-400 animate-pulse text-sm">
          Generating 3-year profit & loss, DSCR ratio, and EMI schedules...
        </div>
      )}

      {data && !loading && (
        <>
          {/* Top Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Required Bank Loan"
              value={formatCurrencyINR(data.required_loan_amount)}
              subtitle={`Net Effective: ${formatCurrencyINR(data.net_effective_loan)}`}
              icon={IndianRupee}
              color="indigo"
            />
            <MetricCard
              title="Est. Monthly EMI"
              value={`₹${data.monthly_emi_est.toLocaleString('en-IN')}`}
              subtitle={`${loanTerm} Years @ 9.5% p.a.`}
              icon={Calendar}
              color="cyan"
            />
            <MetricCard
              title="DSCR Ratio"
              value={data.dscr}
              subtitle="Bank Loan Eligibility Threshold > 1.5"
              icon={TrendingUp}
              color="emerald"
            />
            <MetricCard
              title="Projected Annual ROI"
              value={formatPercentage(data.projected_annual_roi_pct)}
              subtitle={`Subsidy Impact: ${data.estimated_subsidy_percentage}%`}
              icon={Percent}
              color="amber"
            />
          </div>

          {/* Recharts Cashflow & CapEx Breakdown Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* 3-Year Projections Chart */}
            <div className="lg:col-span-2 glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" /> 3-Year Projected Cash Flow & Revenue (INR)
              </h3>
              
              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data.three_year_projections} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                    <XAxis dataKey="year" tickFormatter={(v) => `Year ${v}`} stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" tickFormatter={(v) => `₹${(v/100000).toFixed(1)}L`} />
                    <Tooltip 
                      formatter={(val) => formatCurrencyINR(val)}
                      contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px' }}
                    />
                    <Legend />
                    <Bar dataKey="revenue" name="Gross Revenue" fill="#38bdf8" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="opex" name="Operational Cost" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="net_profit" name="Net Profit" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* CapEx Breakdown Table */}
            <div className="glass-panel p-6 rounded-2xl border border-slate-800 space-y-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <PieIcon className="w-4 h-4 text-cyan-400" /> CapEx Allocation
              </h3>
              
              <div className="space-y-3">
                {data.capex_breakdown.map((item, idx) => (
                  <div key={idx} className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-1">
                    <div className="flex justify-between text-xs font-semibold text-white">
                      <span>{item.category}</span>
                      <span className="text-cyan-400">{formatCurrencyINR(item.amount)}</span>
                    </div>
                    <p className="text-[11px] text-slate-400">{item.description}</p>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-800">
                <div className="flex justify-between text-xs font-bold text-slate-300">
                  <span>Working Capital Reserve:</span>
                  <span className="text-emerald-400">{formatCurrencyINR(data.working_capital_required)}</span>
                </div>
              </div>
            </div>

          </div>
        </>
      )}

    </div>
  );
}
