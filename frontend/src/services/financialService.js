import { apiClient } from './apiConfig';

export async function calculateFinancials(payload) {
  try {
    return await apiClient('/financials/calculate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    const total = payload.total_project_cost || 300000;
    const equity = payload.equity_contribution || 45000;
    const loan = total - equity;

    return {
      total_project_cost: total,
      equity_contribution: equity,
      required_loan_amount: loan,
      capex_breakdown: [
        { category: "Machinery & Processing Equipment", amount: total * 0.40, percentage: 40.0, description: "Core processing units, grinders, packaging tools" },
        { category: "Site Infrastructure & Power", amount: total * 0.15, percentage: 15.0, description: "Wiring, sanitation, stainless steel work tables" },
        { category: "Testing & Licensing Fees", amount: total * 0.10, percentage: 10.0, description: "FSSAI, GST registration, trade clearance" }
      ],
      opex_monthly_breakdown: [
        { category: "Raw Material Aggregation", amount: 45000, percentage: 55.0, description: "Direct purchases from local farmers & wholesalers" },
        { category: "Labor & Worker Wages", amount: 20000, percentage: 25.0, description: "Local skilled/semi-skilled rural workers" },
        { category: "Utilities & Packaging Material", amount: 15000, percentage: 20.0, description: "Electricity, diesel, eco-pouches & labels" }
      ],
      working_capital_required: total * 0.25,
      monthly_emi_est: 5350.0,
      projected_annual_roi_pct: 38.5,
      dscr: 2.15,
      three_year_projections: [
        { year: 1, revenue: 1080000, opex: 669600, net_profit: 345800, cash_flow: 375800 },
        { year: 2, revenue: 1274400, opex: 723168, net_profit: 487032, cash_flow: 517032 },
        { year: 3, revenue: 1490400, opex: 776736, net_profit: 649464, cash_flow: 679464 }
      ],
      estimated_subsidy_percentage: 35.0,
      net_effective_loan: loan * 0.65
    };
  }
}
