import { apiClient } from './apiConfig';
import { assessFeasibility } from './feasibilityService';
import { analyzeMarketIntelligence } from './marketService';
import { calculateFinancials } from './financialService';
import { routeSchemes } from './schemeService';

export async function generateAdvisory(payload) {
  try {
    return await apiClient('/advisory/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  } catch (err) {
    const feasibility = await assessFeasibility({
      sector_id: payload.sector_id,
      district_id: payload.district_id,
      proposed_capital: payload.proposed_capital
    });

    const market = await analyzeMarketIntelligence({
      sector_id: payload.sector_id,
      district_id: payload.district_id,
      investment_amount: payload.proposed_capital
    });

    const financials = await calculateFinancials({
      sector_id: payload.sector_id,
      total_project_cost: payload.proposed_capital,
      equity_contribution: payload.proposed_capital * 0.15,
      estimated_monthly_revenue: payload.proposed_capital * 0.38
    });

    const schemes = await routeSchemes({
      sector_id: payload.sector_id,
      district_id: payload.district_id,
      investment_amount: payload.proposed_capital,
      gender: payload.gender || "general",
      social_category: payload.social_category || "general"
    });

    return {
      entrepreneur_name: payload.entrepreneur_name || "Udyami",
      business_title: `${payload.entrepreneur_name || 'Udyami'}'s Rural Micro-Enterprise`,
      sector_name: feasibility.sector_name,
      location_display: feasibility.district_name,
      executive_summary: `Starting your ${feasibility.sector_name} unit in ${feasibility.district_name} with ₹${(payload.proposed_capital || 300000).toLocaleString('en-IN')} capital shows high viability (Grade: ${feasibility.feasibility_grade}). By leveraging PMEGP/PMFME, you can secure up to 35% capital subsidy.`,
      feasibility: feasibility,
      market_intelligence: market,
      financial_structure: financials,
      matching_schemes: schemes,
      compliance_checklist: [
        { title: "Udyam Registration Certificate", authority: "Ministry of MSME", mandatory: true, estimated_time_days: 1, estimated_cost_inr: 0, guidance: "Instant online registration using Aadhaar on udyamregistration.gov.in." },
        { title: "FSSAI Food License / Registration", authority: "FSSAI", mandatory: true, estimated_time_days: 7, estimated_cost_inr: 100, guidance: "Apply online on FoSCoS portal for basic registration." },
        { title: "Gram Panchayat Trade NOC", authority: "Village Panchayat", mandatory: true, estimated_time_days: 3, estimated_cost_inr: 250, guidance: "Obtain Pradhan NOC for commercial electrical line setup." }
      ],
      roadmap_steps: [
        { phase: "Phase 1: Setup & Filing (Weeks 1-3)", step_number: 1, title: "Register Udyam & PMEGP Portal Submission", description: "Complete Udyam registration and file project proposal online.", estimated_days: 7 },
        { phase: "Phase 1: Setup & Filing (Weeks 1-3)", step_number: 2, title: "Bank Sanction & Equipment Order", description: "Present project report to bank and place orders for primary machinery.", estimated_days: 14 },
        { phase: "Phase 2: Commercial Launch (Weeks 4-8)", step_number: 3, title: "Trial Run & Local Retailer Distribution", description: "Conduct processing trial runs and begin supply to local stores.", estimated_days: 15 }
      ],
      voice_script_summary: {
        hi: `नमस्ते ${payload.entrepreneur_name || 'उद्यमी'} जी! ${feasibility.district_name} में ${feasibility.sector_name} का उद्योग शुरू करने के लिए आपकी योजना बहुत उत्तम है। इसका फ़िजिबिलिटी स्कोर ${feasibility.feasibility_score} प्रतिशत है।`,
        en: `Hello ${payload.entrepreneur_name || 'Entrepreneur'}! Starting your ${feasibility.sector_name} unit in ${feasibility.district_name} shows high viability with a feasibility score of ${feasibility.feasibility_score}%.`
      }
    };
  }
}
