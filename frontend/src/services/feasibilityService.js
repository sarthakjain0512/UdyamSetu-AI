/**
 * UdyamSetu AI — Feasibility Service
 *
 * Queries the backend feasibility engine (/api/feasibility/analyze) with client fallback
 * to deterministic operational and financial readiness models.
 *
 * Adheres strictly to the Page -> Hook -> Service -> Backend/Data Layer architecture.
 */

import { apiClient } from './apiClient.js';
import { FALLBACK_SECTORS } from '../data/fallbackSectors';
import { FALLBACK_DISTRICTS } from '../data/fallbackDistricts';
import { computeFeasibilityAssessment } from '../data/fallbackFeasibilityData';

export async function assessFeasibility(payload) {
  const sectorId = payload.sector_id || 'dairy-processing';
  const districtId = payload.district_id || 'varanasi-up';
  const rawCapital = Number(payload.proposed_capital ?? payload.margin_capital);
  if (!rawCapital || isNaN(rawCapital) || rawCapital <= 0) {
    throw new Error("Margin capital is required to evaluate financial readiness and feasibility.");
  }
  const capital = rawCapital;
  const districtTier = payload.district_tier || 'Tier-3 / Rural Cluster';

  // Compute deterministic assessment model for qualitative dimensions
  const assessment = computeFeasibilityAssessment({
    sectorId,
    districtTier,
    marginCapital: capital,
    businessIdea: payload.business_idea,
    isCustom: payload.is_custom
  });

  const sector = FALLBACK_SECTORS.find(s => s.id === sectorId) || {
    id: sectorId,
    name: payload.business_idea || 'Rural Micro Enterprise',
    category: 'Agri & Allied'
  };

  const district = FALLBACK_DISTRICTS.find(d => d.id === districtId) || {
    id: districtId,
    name: 'Varanasi',
    state: 'Uttar Pradesh',
    tier: districtTier
  };

  try {
    const apiResult = await apiClient.post('/api/feasibility/analyze', {
      sector_id: sectorId,
      district_id: districtId,
      proposed_capital: capital,
      prior_experience_years: 1,
      land_available: true,
      electricity_water_access: true,
      business_idea: payload.business_idea || null,
      district_tier: districtTier,
      location: payload.session?.location || null,
      business: payload.session?.business || null,
      finance: payload.session?.finance || null
    });

    const estimatedCost = apiResult.project_cost_estimate || Math.round(capital / 0.10);
    const estimatedLoan = Math.round(estimatedCost * 0.90);
    const financingTrack = capital <= 14000 ? 'Micro Finance Track' : 'Term Loan Track';

    return {
      sector_id: sectorId,
      sector_name: apiResult.sector_name || sector.name,
      district_name: apiResult.district_name || `${district.name}, ${district.state}`,
      feasibility_score: apiResult.feasibility_score ?? assessment.overallScore,
      feasibility_grade: apiResult.feasibility_grade ?? assessment.grade,
      feasibility_status: apiResult.feasibility_status ?? assessment.status,
      overall_status: apiResult.feasibility_status ?? assessment.status,
      status_color: assessment.statusColor || 'emerald',
      capital_analyzed: capital,
      project_cost_estimate: estimatedCost,
      loan_requirement_estimate: estimatedLoan,
      financing_track: financingTrack,
      estimated_breakeven_months: apiResult.estimated_breakeven_months ?? assessment.breakevenAssumptions?.indicativeBreakEvenMonths ?? 6,
      recommended_min_capital: apiResult.recommended_min_capital ?? (capital <= 100000 ? 100000 : 200000),
      capital_adequacy: apiResult.capital_adequacy ?? 'Sufficient Equity Contribution',
      executive_narrative: `Based on your proposed ₹${capital.toLocaleString('en-IN')} promoter equity, your enterprise scores ${apiResult.feasibility_score ?? assessment.overallScore}/100 (${apiResult.feasibility_grade ?? assessment.grade}) in operational readiness.`,
      dimensions: assessment.dimensions,
      operational_readiness: assessment.operationalReadiness,
      resource_requirements: assessment.resourceRequirements,
      breakeven_assumptions: assessment.breakevenAssumptions,
      risks: apiResult.risks && apiResult.risks.length > 0 ? apiResult.risks : assessment.risks,
      risk_factors: apiResult.risks && apiResult.risks.length > 0 ? apiResult.risks : assessment.risks,
      key_gaps: assessment.keyGaps,
      recommendations: apiResult.key_recommendations && apiResult.key_recommendations.length > 0 ? apiResult.key_recommendations : assessment.recommendations,
      break_even: assessment.breakEven || assessment.breakevenAssumptions,
      financial_summary: assessment.financialSummary,
      is_fallback: false,
      source: "backend"
    };
  } catch (err) {
    console.warn('[FeasibilityService] Backend unavailable or failed. Using deterministic prototype fallback:', err.message);

    const estimatedCost = assessment.financialSummary?.estimatedProjectCost || Math.round(capital / 0.10);
    const estimatedLoan = assessment.financialSummary?.estimatedLoan || Math.round(estimatedCost * 0.90);
    const financingTrack = assessment.financialSummary?.financingTrack || (capital <= 14000 ? 'Micro Finance Track' : 'Term Loan Track');

    return {
      sector_id: sectorId,
      sector_name: sector.name,
      district_name: `${district.name}, ${district.state}`,
      feasibility_score: assessment.overallScore,
      feasibility_grade: assessment.grade,
      feasibility_status: assessment.status,
      overall_status: assessment.status,
      status_color: assessment.statusColor || 'emerald',
      capital_analyzed: capital,
      project_cost_estimate: estimatedCost,
      loan_requirement_estimate: estimatedLoan,
      financing_track: financingTrack,
      estimated_breakeven_months: assessment.breakevenAssumptions?.indicativeBreakEvenMonths || 6,
      recommended_min_capital: capital <= 100000 ? 100000 : 200000,
      capital_adequacy: 'Sufficient Equity Contribution',
      executive_narrative: `Based on your proposed ₹${capital.toLocaleString('en-IN')} promoter equity, your enterprise scores ${assessment.overallScore}/100 (${assessment.grade}) in operational readiness.`,
      dimensions: assessment.dimensions,
      operational_readiness: assessment.operationalReadiness,
      resource_requirements: assessment.resourceRequirements,
      breakeven_assumptions: assessment.breakevenAssumptions,
      risks: assessment.risks,
      risk_factors: assessment.risks,
      key_gaps: assessment.keyGaps,
      recommendations: assessment.recommendations,
      break_even: assessment.breakEven || assessment.breakevenAssumptions,
      financial_summary: assessment.financialSummary,
      is_fallback: true,
      source: "prototype-fallback"
    };
  }
}
