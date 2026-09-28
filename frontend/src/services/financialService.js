/**
 * UdyamSetu AI — Financial Planning Service
 * Calls the backend calculation engine with graceful fallback to the
 * deterministic SIH 26091 prototype financial structuring model.
 *
 * Adheres strictly to the Page -> Hook -> Service -> Backend/Data Layer architecture.
 */

import { apiClient } from './apiConfig';
import { calculateFinancialPlan } from '../utils/financialCalculator';

export async function calculateFinancials(payload) {
  const rawMargin = payload.marginCapital ?? payload.equity_contribution;
  const marginCapital = Number(rawMargin);

  if (!rawMargin || isNaN(marginCapital) || marginCapital <= 0) {
    throw new Error("Margin capital is required to generate the financial plan.");
  }

  const sectorId = payload.sector_id || 'dairy-processing';

  // Compute full deterministic SIH 26091 model
  const plan = calculateFinancialPlan({
    marginCapital,
    sectorId
  });

  try {
    const apiResult = await apiClient('/financials/calculate', {
      method: 'POST',
      body: JSON.stringify({
        sector_id: sectorId,
        total_project_cost: plan.financing.projectCost,
        equity_contribution: marginCapital,
        desired_loan_term_years: plan.financing.tenureYears,
        estimated_monthly_revenue: Math.round(plan.cashFlow.baseAnnualRevenue / 12)
      }),
    });

    return {
      ...plan,
      backendResponse: apiResult,
      is_fallback: false
    };
  } catch (err) {
    // Resilient deterministic prototype calculation
    return {
      ...plan,
      is_fallback: true
    };
  }
}
