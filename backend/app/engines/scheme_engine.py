from typing import List, Optional
from app.models.schemas import SchemeRoutingRequest, SchemeRoutingResponse, SchemeDetail
from app.services.data_service import DataService

class SchemeRoutingEngine:
    """
    Deterministic SIH 26091 Government Scheme Routing Engine.
    Matches statutory schemes (PMEGP, MUDRA, PMFME) based on margin capital, track, and applicant context.
    """

    @staticmethod
    def route_schemes(request: SchemeRoutingRequest) -> SchemeRoutingResponse:
        margin = request.get_margin_capital()
        if margin is None or margin <= 0:
            margin = 300000.0

        project_cost = round(margin / 0.10)
        raw_loan = round(project_cost * 0.90)

        is_out_of_boundary = project_cost > 5000000
        is_micro_finance = project_cost <= 140000

        if is_out_of_boundary:
            track_code = "BOUNDARY_EXCEEDED"
            track_title = "Outside Stated Prototype Financing Boundary (> ₹50L)"
            track_description = "The SIH 26091 micro-enterprise framework covers credit structuring up to ₹50 Lakhs project cost. Commercial syndication is advised."
            max_loan = 4500000.0
            tenure = 7
            moratorium = 6
            rate = 8.0
        elif is_micro_finance:
            track_code = "MICRO_FINANCE"
            track_title = "Micro Finance Track (≤ ₹1.40L Project Cost)"
            track_description = "Targeted micro-credit under Mudra Shishu / Micro Finance institution pathways with 3-year tenure and 3-month moratorium."
            max_loan = 125000.0
            tenure = 3
            moratorium = 3
            rate = 6.5
        else:
            track_code = "TERM_LOAN"
            track_title = "Term Loan Track (₹1.40L – ₹50L Project Cost)"
            track_description = "Bankable term loan facility under PMEGP or Mudra Kishore/Tarun with 7-year tenure, 6-month moratorium, and CGTMSE guarantee."
            max_loan = 4500000.0
            tenure = 7
            moratorium = 6
            rate = 8.0

        is_exceeding_ceiling = raw_loan > max_loan
        sized_loan = min(raw_loan, max_loan)

        # Contextual Scheme Database
        schemes: List[SchemeDetail] = []
        if is_micro_finance:
            schemes.append(SchemeDetail(
                scheme_code="MUDRA-SHISHU-2026",
                scheme_name="Pradhan Mantri MUDRA Yojana (Shishu Category)",
                nodal_ministry="Ministry of Finance / SIDBI",
                subsidy_rate_pct=0.0,
                max_loan_limit=50000.0,
                max_subsidy_amount=0.0,
                match_score=94.0,
                eligibility_status="High Track Alignment",
                key_benefits=[
                    "Collateral-free micro loans up to ₹50,000",
                    "Zero processing fee and concessionary interest",
                    "Immediate working capital support"
                ],
                required_documents=[
                    "Self-declaration / Voter ID / Aadhaar",
                    "Business Quotation / Vendor Estimate",
                    "Bank Account Statement (6 Months)"
                ],
                application_portal_url="https://www.mudra.org.in"
            ))
            schemes.append(SchemeDetail(
                scheme_code="DAY-NRLM-SHG-2026",
                scheme_name="DAY-NRLM Interest Subvention & Micro Credit",
                nodal_ministry="Ministry of Rural Development",
                subsidy_rate_pct=5.0,
                max_loan_limit=100000.0,
                max_subsidy_amount=5000.0,
                match_score=86.0,
                eligibility_status="Conditional / Women SHG",
                key_benefits=[
                    "Interest subvention down to 7% p.a. for rural women SHG members",
                    "Community revolving fund support"
                ],
                required_documents=[
                    "SHG Membership Certificate",
                    "Gram Panchayat Verification"
                ],
                application_portal_url="https://nrlm.gov.in"
            ))
        else:
            schemes.append(SchemeDetail(
                scheme_code="PMEGP-2026",
                scheme_name="Prime Minister's Employment Generation Programme (PMEGP)",
                nodal_ministry="Ministry of MSME / KVIC",
                subsidy_rate_pct=35.0 if request.is_rural else 25.0,
                max_loan_limit=5000000.0,
                max_subsidy_amount=min(1750000.0, round(project_cost * 0.35, 2)),
                match_score=96.0,
                eligibility_status="High Track Alignment",
                key_benefits=[
                    "Up to 35% margin money capital subsidy for rural micro-enterprises",
                    "Bank term financing up to 90–95% of project cost",
                    "Collateral-free coverage under CGTMSE scheme"
                ],
                required_documents=[
                    "Aadhaar, PAN, and Caste/Category Certificate (if applicable)",
                    "Detailed Project Report (DPR) / Financial Plan",
                    "Rural Area Certificate from Gram Panchayat"
                ],
                application_portal_url="https://www.kviconline.gov.in/pmegpeportal/"
            ))
            schemes.append(SchemeDetail(
                scheme_code="PMFME-2026",
                scheme_name="PM Formalisation of Micro Food Processing Enterprises (PMFME)",
                nodal_ministry="Ministry of Food Processing Industries",
                subsidy_rate_pct=35.0,
                max_loan_limit=3000000.0,
                max_subsidy_amount=min(1000000.0, round(project_cost * 0.35, 2)),
                match_score=91.0,
                eligibility_status="High Track Alignment (Food Processing)",
                key_benefits=[
                    "35% credit-linked capital subsidy capped at ₹10 Lakhs",
                    "Seed capital assistance for SHG members",
                    "Branding, marketing, and FSSAI packaging grants"
                ],
                required_documents=[
                    "Identity & Address Proof",
                    "Food Processing Activity Declaration",
                    "Bank Appraisal & DPR"
                ],
                application_portal_url="https://pmfme.mofpi.gov.in"
            ))

        best_scheme = schemes[0] if schemes else None

        return SchemeRoutingResponse(
            track_code=track_code,
            track_title=track_title,
            track_description=track_description,
            project_cost=float(project_cost),
            margin_capital=float(margin),
            loan_amount=float(sized_loan),
            statutory_tenure_years=tenure,
            statutory_moratorium_months=moratorium,
            statutory_interest_rate_pct=rate,
            recommended_schemes=schemes,
            best_matching_scheme=best_scheme,
            is_exceeding_ceiling=is_exceeding_ceiling,
            is_out_of_boundary=is_out_of_boundary,
            is_fallback=False,
            source="backend",
            disclaimer="Prototype Scheme Routing Guidance — Official Sanction by Lender Only"
        )
