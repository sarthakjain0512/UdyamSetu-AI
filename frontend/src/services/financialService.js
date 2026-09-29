/**
 * UdyamSetu AI — Financial Planning Service
 *
 * Calls the backend calculation engine (/api/financial/calculate) with graceful fallback to the
 * deterministic SIH 26091 prototype financial structuring model.
 *
 * Adheres strictly to the Page -> Hook -> Service -> Backend/Data Layer architecture.
 */

import { apiClient } from './apiClient.js';
import { calculateFinancialPlan } from '../utils/financialCalculator';

export async function calculateFinancials(payload) {
  const rawMargin = payload.marginCapital ?? payload.equity_contribution ?? payload.margin_capital;
  const marginCapital = Number(rawMargin);

  if (!rawMargin || isNaN(marginCapital) || marginCapital <= 0) {
    throw new Error("Margin capital is required to generate the financial plan.");
  }

  const sectorId = payload.sector_id || 'dairy-processing';

  // Compute full deterministic SIH 26091 client model (for UI formatting and fallback)
  const plan = calculateFinancialPlan({
    marginCapital,
    sectorId
  });

  try {
    const apiResult = await apiClient.post('/api/financial/calculate', {
      margin_capital: marginCapital,
      sector_id: sectorId,
      total_project_cost: plan.financing.projectCost,
      equity_contribution: marginCapital,
      desired_loan_term_years: plan.financing.tenureYears,
      estimated_monthly_revenue: Math.round(plan.cashFlow.baseAnnualRevenue / 12)
    });

    return {
      ...plan,
      backendResponse: apiResult,
      is_fallback: false,
      source: "backend"
    };
  } catch (err) {
    console.warn('[FinancialService] Backend unavailable or failed. Using deterministic prototype fallback:', err.message);

    return {
      ...plan,
      is_fallback: true,
      source: "prototype-fallback"
    };
  }
}
