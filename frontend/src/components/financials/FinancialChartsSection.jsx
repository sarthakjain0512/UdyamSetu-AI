import React from 'react';
import { 
  BarChart, 
  Bar, 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  CartesianGrid 
} from 'recharts';
import { PieChart as PieIcon, TrendingDown, BarChart3, Info } from 'lucide-react';
import { formatCurrencyINR } from '../../utils/formatters';

const PIE_COLORS = ['#10b981', '#f59e0b'];

export default function FinancialChartsSection({ financing, emi, repayment }) {
  if (!financing || !emi || !repayment) return null;

  const { loanAmount } = financing;
  const { totalInterest, totalRepayment } = emi;
  const { yearlySummaries = [] } = repayment;

  // Chart 1: Principal vs Interest Data
  const pieData = [
    { name: 'Principal Loan Amount', value: loanAmount, formatted: formatCurrencyINR(loanAmount) },
    { name: 'Total Interest Charge', value: totalInterest, formatted: formatCurrencyINR(totalInterest) }
  ];

  // Chart 2: Annual Repayment Breakdown
  const annualBarData = yearlySummaries.map((yr) => ({
    name: `Year ${yr.year}`,
    Principal: yr.totalPrincipal,
    Interest: yr.totalInterest,
    Balance: yr.closingBalance
  }));

  // Chart 3: Outstanding Loan Balance Reduction Trajectory
  const balanceTrendData = [
    { name: 'Start', balance: loanAmount },
    ...yearlySummaries.map((yr) => ({
      name: `Yr ${yr.year}`,
      balance: yr.closingBalance
    }))
  ];

  return (
    <div className="bg-[#0c241b] rounded-3xl p-6 sm:p-8 border border-[#18533e] shadow-2xl space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#144233] pb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-amber-400 font-mono bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              Module 3.4
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Visual Debt Analytics
            </h2>
          </div>
          <p className="text-xs text-emerald-200/70 mt-1">
            Visual amortization dynamics and principal-to-interest distribution
          </p>
        </div>

        <span className="text-xs font-medium text-emerald-300 bg-emerald-950 px-3 py-1 rounded-full border border-emerald-800">
          Visual Models
        </span>
      </div>

      {/* Two Column Visual Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Chart 1: Principal vs Interest Breakdown */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <PieIcon className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Total Debt Composition
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-300/80">
              Total: {formatCurrencyINR(totalRepayment)}
            </span>
          </div>

          <div className="h-60 w-full" aria-label="Donut chart showing proportion of Principal vs Interest">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} stroke="#071913" strokeWidth={3} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(val) => formatCurrencyINR(val)}
                  contentStyle={{ backgroundColor: '#0c241b', borderColor: '#18533e', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Legend 
                  wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                  formatter={(value) => <span style={{ color: '#d1fae5' }}>{value}</span>}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Accessible Textual Summary */}
          <div className="p-3 bg-[#0c241b] rounded-xl border border-[#18533e] text-xs text-emerald-200/80 space-y-1">
            <p>
              <strong>Text Summary:</strong> Principal borrows <strong>{formatCurrencyINR(loanAmount)}</strong> ({Math.round((loanAmount / totalRepayment) * 100)}%), while cumulative interest amounts to <strong className="text-amber-300">{formatCurrencyINR(totalInterest)}</strong> ({Math.round((totalInterest / totalRepayment) * 100)}%).
            </p>
          </div>
        </div>

        {/* Chart 2: Outstanding Balance Trajectory */}
        <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingDown className="w-4 h-4 text-emerald-400" />
              <h3 className="text-sm font-bold text-white uppercase tracking-wider">
                Outstanding Principal Trajectory
              </h3>
            </div>
            <span className="text-[11px] font-mono text-emerald-300/80">
              Reduces to ₹0 at Maturity
            </span>
          </div>

          <div className="h-60 w-full" aria-label="Area chart showing loan balance reduction over time">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={balanceTrendData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="balanceGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#154636" vertical={false} />
                <XAxis dataKey="name" stroke="#6ee7b7" tick={{ fontSize: 10 }} />
                <YAxis stroke="#6ee7b7" tick={{ fontSize: 10 }} tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`} />
                <Tooltip 
                  formatter={(val) => [formatCurrencyINR(val), 'Remaining Principal']}
                  contentStyle={{ backgroundColor: '#0c241b', borderColor: '#18533e', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="balance" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#balanceGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Accessible Textual Summary */}
          <div className="p-3 bg-[#0c241b] rounded-xl border border-[#18533e] text-xs text-emerald-200/80 space-y-1">
            <p>
              <strong>Text Summary:</strong> Loan balance starts at <strong>{formatCurrencyINR(loanAmount)}</strong>, stays level during moratorium, and amortizes steadily over {financing.tenureYears} years to zero.
            </p>
          </div>
        </div>

      </div>

      {/* Chart 3: Annual Debt Service Stacked Bar Chart */}
      <div className="p-5 rounded-2xl bg-[#071913] border border-[#154636] space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <h3 className="text-sm font-bold text-white uppercase tracking-wider">
              Annual Principal vs Interest Component
            </h3>
          </div>
          <span className="text-[11px] font-mono text-emerald-300/80">
            Year-by-Year Amortization Ratio
          </span>
        </div>

        <div className="h-64 w-full" aria-label="Bar chart showing annual split of principal and interest payments">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={annualBarData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#154636" vertical={false} />
              <XAxis dataKey="name" stroke="#6ee7b7" tick={{ fontSize: 10 }} />
              <YAxis stroke="#6ee7b7" tick={{ fontSize: 10 }} tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`} />
              <Tooltip 
                formatter={(val) => formatCurrencyINR(val)}
                contentStyle={{ backgroundColor: '#0c241b', borderColor: '#18533e', borderRadius: '12px', color: '#fff', fontSize: '12px' }}
              />
              <Legend 
                wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }}
                formatter={(value) => <span style={{ color: '#d1fae5' }}>{value}</span>}
              />
              <Bar dataKey="Principal" stackId="a" fill="#10b981" radius={[0, 0, 4, 4]} />
              <Bar dataKey="Interest" stackId="a" fill="#f59e0b" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <p className="text-[11px] text-emerald-200/60">
          In early repayment years, interest constitutes a larger fraction of installments; in later years, principal repayment accelerates as the outstanding balance drops.
        </p>
      </div>

    </div>
  );
}
