/**
 * UdyamSetu AI — Smart Scheme Service
 * Bridges client intake session, deterministic SIH 26091 scheme routing engine,
 * and the backend scheme matching API (`/schemes/route`).
 *
 * Adheres strictly to the Page -> Hook -> Service -> Engine architecture.
 */

import { apiClient } from './apiConfig';
import { calculateSchemeRoute } from '../utils/schemeRouterEngine';

/**
 * Legacy/Task-0 compatible scheme query function.
 * Queries backend `/schemes/route` with resilient local fallback.
 */
export async function routeSchemes(payload) {
  try {
    return await apiClient('/schemes/route', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    const list = [
      {
        scheme_code: "PMEGP-2026",
        scheme_name: "Prime Minister's Employment Generation Programme (PMEGP)",
        nodal_ministry: "Ministry of MSME",
        subsidy_rate_pct: 35.0,
        max_loan_limit: 5000000.0,
        max_subsidy_amount: 175000.0,
        match_score: 95.0,
        eligibility_status: "Potentially Applicable - High Match",
        key_benefits: [
          "Up to 35% Capital Subsidy for Rural / Special Category applicants",
          "Bank financing up to 90–95% of project cost",
          "Collateral-free credit support under CGTMSE up to ₹10–₹50 Lakhs"
        ],
        required_documents: [
          "Aadhaar & PAN Card",
          "Detailed Project Report (DPR)",
          "Rural Area Certificate / Gram Panchayat NOC"
        ],
        application_portal_url: "https://www.kviconline.gov.in/pmegpeportal/"
      },
      {
        scheme_code: "MUDRA-KISHORE-2026",
        scheme_name: "Pradhan Mantri MUDRA Yojana (Kishore / Tarun Category)",
        nodal_ministry: "Ministry of Finance",
        subsidy_rate_pct: 0.0,
        max_loan_limit: 1000000.0,
        max_subsidy_amount: 0.0,
        match_score: 88.0,
        eligibility_status: "Potentially Applicable",
        key_benefits: [
          "Collateral-free institutional bank loan up to ₹10 Lakhs",
          "Working capital overdraft facility via Mudra Card"
        ],
        required_documents: [
          "Mudra Application Form",
          "Machinery Pro-forma Quotation",
          "KYC Identity Documents"
        ],
        application_portal_url: "https://www.mudra.org.in/"
      }
    ];

    return {
      recommended_schemes: list,
      best_matching_scheme: list[0],
      total_potential_subsidy: 175000.0,
      is_fallback: true
    };
  }
}

/**
 * Task 6 Scheme Routing Plan Generator.
 * Executes deterministic SIH 26091 scheme routing engine and supplements
 * with nodal scheme details from the backend.
 *
 * @param {Object} payload - Session finance and business details
 * @returns {Promise<Object>} Full routing plan with deterministic track & contextual schemes
 */
export async function getSchemeRoutingPlan(payload) {
  const marginCapital = Number(payload.marginCapital ?? payload.equity_contribution ?? payload.proposed_capital);

  if (!marginCapital || isNaN(marginCapital) || marginCapital <= 0) {
    throw new Error('Margin capital is required for scheme routing.');
  }

  // 1. Deterministic SIH 26091 Scheme Routing
  const deterministicPlan = calculateSchemeRoute(payload);

  // 2. Fetch Contextual Nodal Schemes (PMEGP, Mudra, etc.) from backend
  let contextualSchemes = null;
  try {
    const backendData = await routeSchemes({
      sector_id: payload.sectorId || payload.sector_id || 'dairy-processing',
      district_id: payload.districtId || payload.district_id || 'varanasi-up',
      investment_amount: deterministicPlan.financingSummary.calculatedProjectCost,
      gender: payload.gender || 'general',
      social_category: payload.socialCategory || 'general',
      is_rural: payload.isRural ?? true
    });
    contextualSchemes = backendData;
  } catch (err) {
    console.warn('[SchemeService] Backend scheme matching encountered error, relying on deterministic plan:', err);
  }

  return {
    ...deterministicPlan,
    contextualSchemes,
    isBackendConnected: Boolean(contextualSchemes && !contextualSchemes.is_fallback)
  };
}
