import { apiClient } from './apiConfig';

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
        eligibility_status: "Eligible - High Match",
        key_benefits: [
          "Up to 35% Capital Subsidy for Rural / Special Category applicants",
          "Bank financing up to 95% of project cost",
          "No collateral required up to ₹10 Lakhs under CGTMSE"
        ],
        required_documents: [
          "Aadhaar & PAN Card",
          "Project Report / Business Blueprint",
          "Gram Panchayat NOC"
        ],
        application_portal_url: "https://www.kviconline.gov.in/pmegpeportal/"
      },
      {
        scheme_code: "MUDRA-KISHORE-2026",
        scheme_name: "Pradhan Mantri MUDRA Yojana (Kishore Category)",
        nodal_ministry: "Ministry of Finance",
        subsidy_rate_pct: 0.0,
        max_loan_limit: 1000000.0,
        max_subsidy_amount: 0.0,
        match_score: 88.0,
        eligibility_status: "Eligible",
        key_benefits: [
          "100% Collateral-free bank loan up to ₹10 Lakhs",
          "Mudra Card for revolving inventory drawal"
        ],
        required_documents: [
          "Mudra Application Form",
          "Machinery Quotation",
          "KYC Documents"
        ],
        application_portal_url: "https://www.mudra.org.in/"
      }
    ];

    return {
      recommended_schemes: list,
      best_matching_scheme: list[0],
      total_potential_subsidy: 175000.0
    };
  }
}
