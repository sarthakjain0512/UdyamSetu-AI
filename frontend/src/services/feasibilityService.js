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

    return {
      sector_id: sectorId,
      sector_name: apiResult.sector_name || sector.name,
      district_name: apiResult.district_name || `${district.name}, ${district.state}`,
      feasibility_score: apiResult.feasibility_score,
      feasibility_grade: apiResult.feasibility_grade,
      feasibility_status: apiResult.feasibility_status,
      capital_analyzed: capital,
      project_cost_estimate: apiResult.project_cost_estimate || round(capital / 0.10),
      loan_requirement_estimate: round((apiResult.project_cost_estimate || (capital / 0.10)) * 0.90),
      financing_track: capital <= 14000 ? 'Micro Finance Track' : 'Term Loan Track',
      estimated_breakeven_months: apiResult.estimated_breakeven_months,
      recommended_min_capital: apiResult.recommended_min_capital,
      capital_adequacy: apiResult.capital_adequacy,
      executive_narrative: `Based on your proposed ₹${capital.toLocaleString('en-IN')} promoter equity, your enterprise scores ${apiResult.feasibility_score}/100 (${apiResult.feasibility_grade}) in operational readiness.`,
      dimensions: assessment.dimensions,
      operational_readiness: assessment.operationalReadiness,
      risk_factors: apiResult.risks || assessment.riskAssessment,
      key_gaps: assessment.keyGaps,
      recommendations: apiResult.key_recommendations || assessment.recommendations,
      break_even: assessment.breakEven,
      is_fallback: false,
      source: "backend"
    };
  } catch (err) {
    console.warn('[FeasibilityService] Backend unavailable or failed. Using deterministic prototype fallback:', err.message);

    return {
      sector_id: sectorId,
      sector_name: sector.name,
      district_name: `${district.name}, ${district.state}`,
      feasibility_score: assessment.overview.feasibilityScore,
      feasibility_grade: assessment.overview.feasibilityGrade,
      feasibility_status: assessment.overview.feasibilityStatus,
      capital_analyzed: capital,
      project_cost_estimate: assessment.financialReadiness.projectCost,
      loan_requirement_estimate: assessment.financialReadiness.loanRequirement,
      financing_track: assessment.financialReadiness.financingTrack,
      estimated_breakeven_months: assessment.breakEven.indicativeBreakEvenMonths,
      recommended_min_capital: assessment.financialReadiness.recommendedMargin,
      capital_adequacy: assessment.financialReadiness.marginSufficiency,
      executive_narrative: assessment.overview.executiveNarrative,
      dimensions: assessment.dimensions,
      operational_readiness: assessment.operationalReadiness,
      risk_factors: assessment.riskAssessment,
      key_gaps: assessment.keyGaps,
      recommendations: assessment.recommendations,
      break_even: assessment.breakEven,
      is_fallback: true,
      source: "prototype-fallback"
    };
  }
}
