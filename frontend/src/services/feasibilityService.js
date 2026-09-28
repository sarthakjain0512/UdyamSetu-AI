/**
 * UdyamSetu AI — Feasibility Service
 * Queries the backend feasibility engine with client fallback to deterministic
 * operational and financial readiness models.
 *
 * Adheres strictly to the Page -> Hook -> Service -> Backend/Data Layer architecture.
 */

import { apiClient } from './apiConfig';
import { FALLBACK_SECTORS } from '../data/fallbackSectors';
import { FALLBACK_DISTRICTS } from '../data/fallbackDistricts';
import { computeFeasibilityAssessment } from '../data/fallbackFeasibilityData';

export async function assessFeasibility(payload) {
  const sectorId = payload.sector_id || 'dairy-processing';
  const districtId = payload.district_id || 'varanasi-up';
  const rawCapital = Number(payload.proposed_capital);
  if (!payload.proposed_capital || isNaN(rawCapital) || rawCapital <= 0) {
    throw new Error("Margin capital is required to evaluate financial readiness and feasibility.");
  }
  const capital = rawCapital;
  const districtTier = payload.district_tier || 'Tier-3 / Rural Cluster';

  // Compute deterministic assessment model
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
    name: 'Target District Cluster',
    state: 'State Jurisdiction',
    tier: districtTier
  };

  try {
    const apiResult = await apiClient('/feasibility/assess', {
      method: 'POST',
      body: JSON.stringify({
        sector_id: sectorId,
        district_id: districtId,
        proposed_capital: capital,
        prior_experience_years: 1,
        land_available: true,
        electricity_water_access: true
      }),
    });

    return {
      sector_id: sectorId,
      sector_name: apiResult.sector_name || sector.name,
      district_name: apiResult.district_name || `${district.name}, ${district.state}`,
      district_tier: district.tier,
      feasibility_score: apiResult.feasibility_score || assessment.overallScore,
      feasibility_grade: apiResult.feasibility_grade || assessment.grade,
      overall_status: assessment.status,
      status_color: assessment.statusColor,
      location_suitability: apiResult.location_suitability || 82.0,
      skill_readiness_score: apiResult.skill_readiness_score || 80.0,
      estimated_breakeven_months: apiResult.estimated_breakeven_months || assessment.breakevenAssumptions.indicativeBreakEvenMonths,
      recommended_min_capital: apiResult.recommended_min_capital || sector.avg_investment_min,
      capital_adequacy: apiResult.capital_adequacy || 'Sufficient',
      dimensions: assessment.dimensions,
      operational_readiness: assessment.operationalReadiness,
      resource_requirements: assessment.resourceRequirements,
      breakeven_assumptions: assessment.breakevenAssumptions,
      key_gaps: assessment.keyGaps,
      recommendations: apiResult.key_recommendations?.length ? apiResult.key_recommendations : assessment.recommendations,
      risks: assessment.risks || [],
      financial_summary: assessment.financialSummary,
      is_fallback: false
    };
  } catch (err) {
    // Resilient fallback logic for prototype & offline evaluation
    return {
      sector_id: sectorId,
      sector_name: sector.name,
      district_name: `${district.name}, ${district.state}`,
      district_tier: district.tier,
      feasibility_score: assessment.overallScore,
      feasibility_grade: assessment.grade,
      overall_status: assessment.status,
      status_color: assessment.statusColor,
      location_suitability: 84.0,
      skill_readiness_score: 80.0,
      estimated_breakeven_months: assessment.breakevenAssumptions.indicativeBreakEvenMonths,
      recommended_min_capital: sector.avg_investment_min || 100000,
      capital_adequacy: capital >= (sector.avg_investment_min || 100000) ? 'Sufficient' : 'Requires Loan Structuring',
      dimensions: assessment.dimensions,
      operational_readiness: assessment.operationalReadiness,
      resource_requirements: assessment.resourceRequirements,
      breakeven_assumptions: assessment.breakevenAssumptions,
      key_gaps: assessment.keyGaps,
      recommendations: assessment.recommendations,
      risks: assessment.risks,
      financial_summary: assessment.financialSummary,
      is_fallback: true
    };
  }
}
