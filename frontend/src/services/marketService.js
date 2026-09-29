/**
 * UdyamSetu AI — Market Intelligence Service
 *
 * Calls the backend API (/api/market/analyze) with graceful fallback
 * to the deterministic prototype market intelligence layer.
 *
 * Adheres strictly to the Page -> Hook -> Service -> Backend/Data Layer architecture.
 */

import { apiClient } from './apiClient.js';
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
    const apiResult = await apiClient.post('/api/market/analyze', {
      sector_id: sectorId,
      district_id: districtId,
      investment_amount: investment,
      radius_km: radiusKm,
      target_scale: "micro",
      location: payload.session?.location || null,
      business: payload.session?.business || null,
      finance: payload.session?.finance || null
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
      is_fallback: false,
      source: "backend"
    };
  } catch (err) {
    console.warn('[MarketService] Backend unavailable or failed. Using deterministic prototype fallback:', err.message);

    // Resilient Client-side Fallback Service Logic (Offline & Sandbox Prototype Mode)
    const sector = FALLBACK_SECTORS.find(s => s.id === sectorId) || {
      id: sectorId,
      name: payload.business_idea || "Rural Micro Enterprise",
      category: "Agri & Allied"
    };

    const district = FALLBACK_DISTRICTS.find(d => d.id === districtId) || {
      id: districtId,
      name: "Varanasi",
      state: "Uttar Pradesh",
      tier: "Tier-3 / Rural Cluster"
    };

    return {
      sector_id: sectorId,
      sector_name: sector.name,
      district_name: `${district.name}, ${district.state}`,
      demand_index: 82.0,
      demand_trend: sectorIntelligence.snapshot.demandLevel,
      raw_material_availability: "High (Local Agricultural Sourcing)",
      competition_density: sectorIntelligence.snapshot.competitionIntensity,
      radius_km: radiusKm,
      target_demographics: [
        {
          segment: "Local Retail Kirana & Sweet Counters",
          percentage: 45.0,
          buying_power: "Moderate to High",
          needs: ["Bulk supply", "Consistent quality assurance", "Timely delivery"]
        },
        {
          segment: "Rural & Semi-Urban Households",
          percentage: 35.0,
          buying_power: "Moderate",
          needs: ["Packaged affordable units", "Hygienic processing", "Daily freshness"]
        },
        {
          segment: "Highway Dhabas & Catering Units",
          percentage: 20.0,
          buying_power: "High",
          needs: ["Bulk commercial crates", "Standardized weight", "Credit flexibility"]
        }
      ],
      competitors: [
        {
          type: "Unorganized Village Vendors",
          threat_level: "Moderate",
          market_share_est: "55%",
          differentiator_opportunity: "Branded packaging, tamper-proof sealing, certified quality standards"
        },
        {
          type: "Regional Commercial Brands",
          threat_level: "High",
          market_share_est: "35%",
          differentiator_opportunity: "Fresher local turnaround time, direct retailer relationships, lower logistics cost"
        }
      ],
      pricing_benchmarks: [
        {
          item_category: "Standard Value-Added Pack",
          local_avg_price: 250.0,
          unit: "unit",
          margin_pct: 28.5
        },
        {
          item_category: "Bulk Commercial Pack",
          local_avg_price: 520.0,
          unit: "pack",
          margin_pct: 32.0
        }
      ],
      growth_drivers: [
        "Consistent hyper-local household demand for value-added products",
        "Government priority sector support and ODOP scheme subsidies",
        "Proximity to regional mandi logistics and rural transport links"
      ],
      challenges: [
        "Maintaining cold-chain and inventory freshness during peak summer",
        "Managing working capital debtor cycles from local village retailers"
      ],
      snapshot: sectorIntelligence.snapshot,
      demand_details: sectorIntelligence.demand,
      product_market_value: sectorIntelligence.productValue,
      opportunity_factors: sectorIntelligence.opportunityFactors,
      swot: sectorIntelligence.swot,
      threats_matrix: sectorIntelligence.threats,
      summary: sectorIntelligence.summary,
      is_fallback: true,
      source: "prototype-fallback"
    };
  }
}
