/**
 * UdyamSetu AI — Market Intelligence Service
 * Calls the backend API (/market-intelligence/analyze) with graceful fallback
 * to the deterministic prototype market intelligence layer.
 *
 * Adheres strictly to the Page -> Hook -> Service -> Backend/Data Layer architecture.
 */

import { apiClient } from './apiConfig';
import { FALLBACK_SECTORS } from '../data/fallbackSectors';
import { FALLBACK_DISTRICTS } from '../data/fallbackDistricts';
import { getSectorMarketIntelligence } from '../data/fallbackMarketData';

export async function analyzeMarketIntelligence(payload) {
  const sectorId = payload.sector_id || 'dairy-processing';
  const districtId = payload.district_id || 'varanasi-up';
  const investment = Number(payload.investment_amount) || 300000;
  const radiusKm = payload.radius_km || 5;

  // Retrieve deterministic sector intelligence module
  const sectorIntelligence = getSectorMarketIntelligence(sectorId);

  try {
    const apiResult = await apiClient('/market-intelligence/analyze', {
      method: 'POST',
      body: JSON.stringify({
        sector_id: sectorId,
        district_id: districtId,
        investment_amount: investment,
        target_scale: "micro"
      }),
    });

    // Merge backend metrics with rich qualitative SWOT, Product Value, and Threat models
    return {
      ...apiResult,
      radius_km: radiusKm,
      snapshot: {
        ...sectorIntelligence.snapshot,
        demandLevel: apiResult.demand_trend || sectorIntelligence.snapshot.demandLevel,
        competitionIntensity: apiResult.competition_density || sectorIntelligence.snapshot.competitionIntensity
      },
      demand_details: sectorIntelligence.demand,
      product_market_value: sectorIntelligence.productValue,
      opportunity_factors: sectorIntelligence.opportunityFactors,
      swot: sectorIntelligence.swot,
      threats_matrix: sectorIntelligence.threats,
      summary: sectorIntelligence.summary,
      is_fallback: false
    };
  } catch (err) {
    // Resilient Client-side Fallback Service Logic (Offline & Sandbox Prototype Mode)
    const sector = FALLBACK_SECTORS.find(s => s.id === sectorId) || {
      id: sectorId,
      name: payload.business_idea || "Rural Micro Enterprise",
      category: "Agri & Allied"
    };

    const district = FALLBACK_DISTRICTS.find(d => d.id === districtId) || {
      id: districtId,
      name: "Local District Cluster",
      state: "State Jurisdiction",
      tier: "Tier-3 / Rural Cluster"
    };

    return {
      sector_id: sectorId,
      sector_name: sector.name,
      district_name: `${district.name}, ${district.state}`,
      district_tier: district.tier,
      radius_km: radiusKm,
      demand_index: 84.0,
      demand_trend: sectorIntelligence.snapshot.demandLevel + " Demand / Growing",
      raw_material_availability: "High (Local Agricultural & Farm Supply)",
      competition_density: sectorIntelligence.snapshot.competitionIntensity,
      target_demographics: [
        { segment: "Local Retailers & Sweet Outlets", percentage: 45.0, buying_power: "High", needs: ["Fresh bulk supply", "Quality packaging"] },
        { segment: "Village & Peri-urban Households", percentage: 35.0, buying_power: "Moderate", needs: ["Affordable daily units"] },
        { segment: "Commercial Eateries & Contractors", percentage: 20.0, buying_power: "High", needs: ["Consistent supply contracts"] }
      ],
      competitors: [
        { type: "Unorganized Local Vendors", threat_level: "Moderate", market_share_est: "60%", differentiator_opportunity: "Clean vacuum seal & FSSAI grade certification" },
        { type: "Regional Packaged Brands", threat_level: "High", market_share_est: "30%", differentiator_opportunity: "Hyper-local freshness & faster turnaround time" }
      ],
      pricing_benchmarks: [
        { item_category: "Primary Unit Output", local_avg_price: 360.0, unit: "kg", margin_pct: 28.5 },
        { item_category: "Value Added Secondary Output", local_avg_price: 650.0, unit: "kg", margin_pct: 34.0 }
      ],
      growth_drivers: [
        "Government ODOP (One District One Product) priority push",
        "Rising consumer preference for hygienic, locally processed products"
      ],
      challenges: [
        "Summer temperature control during transit",
        "Initial buyer trust-building and credit period demands"
      ],
      snapshot: sectorIntelligence.snapshot,
      demand_details: sectorIntelligence.demand,
      product_market_value: sectorIntelligence.productValue,
      opportunity_factors: sectorIntelligence.opportunityFactors,
      swot: sectorIntelligence.swot,
      threats_matrix: sectorIntelligence.threats,
      summary: sectorIntelligence.summary,
      is_fallback: true
    };
  }
}
