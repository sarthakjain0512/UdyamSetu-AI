from app.models.schemas import (
    AdvisoryRequest, AdvisoryResponse, FeasibilityRequest, FinancialRequest, 
    MarketAnalysisRequest, SchemeRoutingRequest, ComplianceItem, ActionStep
)
from app.engines.feasibility_engine import FeasibilityEngine
from app.engines.financial_engine import FinancialCalculationEngine
from app.engines.market_engine import MarketIntelligenceEngine
from app.engines.scheme_engine import SchemeRoutingEngine
from app.services.data_service import DataService

class AdvisoryGenerationEngine:
    """
    Unified AI Business Advisory & Action Plan Engine.
    Combines feasibility, market intelligence, financial structuring, and scheme routing
    into a step-by-step roadmap for rural micro-entrepreneurs.
    """

    @staticmethod
    def generate_advisory(request: AdvisoryRequest) -> AdvisoryResponse:
        sector = DataService.get_sector_by_id(request.sector_id)
        district = DataService.get_district_by_id(request.district_id)

        sector_name = sector.name if sector else request.sector_id.title()
        district_name = f"{district.name}, {district.state}" if district else request.district_id.title()

        # Run constituent engines
        feasibility_res = FeasibilityEngine.assess_feasibility(FeasibilityRequest(
            sector_id=request.sector_id,
            district_id=request.district_id,
            proposed_capital=request.proposed_capital,
            prior_experience_years=request.experience_years
        ))

        market_res = MarketIntelligenceEngine.analyze_market(MarketAnalysisRequest(
            sector_id=request.sector_id,
            district_id=request.district_id,
            investment_amount=request.proposed_capital
        ))

        est_monthly_rev = round(request.proposed_capital * 0.38, 2)
        financial_res = FinancialCalculationEngine.calculate_financials(FinancialRequest(
            sector_id=request.sector_id,
            total_project_cost=request.proposed_capital,
            equity_contribution=round(request.proposed_capital * 0.15, 2),
            estimated_monthly_revenue=est_monthly_rev
        ))

        scheme_res = SchemeRoutingEngine.route_schemes(SchemeRoutingRequest(
            sector_id=request.sector_id,
            district_id=request.district_id,
            investment_amount=request.proposed_capital,
            gender=request.gender,
            social_category=request.social_category
        ))

        business_title = f"{request.entrepreneur_name}'s {sector_name} Enterprise"

        exec_summary = (
            f"Based on hyper-local data for {district_name}, establishing a {sector_name} unit with "
            f"₹{request.proposed_capital:,.0f} capital holds an overall feasibility grade of {feasibility_res.feasibility_grade} "
            f"(Score: {feasibility_res.feasibility_score}/100). By leveraging the {scheme_res.best_matching_scheme.scheme_name}, "
            f"you are eligible for an estimated subsidy of ₹{scheme_res.best_matching_scheme.max_subsidy_amount:,.0f}, "
            f"reducing your net effective loan burden. Estimated break-even is achieved in {feasibility_res.estimated_breakeven_months} months."
        )

        compliance = [
            ComplianceItem(
                title="Udyam Registration Certificate",
                authority="Ministry of MSME",
                mandatory=True,
                estimated_time_days=1,
                estimated_cost_inr=0.0,
                guidance="Instant online registration using Aadhaar on udyamregistration.gov.in. Unlocks interest subvention."
            ),
            ComplianceItem(
                title="FSSAI Basic Food License / Registration",
                authority="Food Safety & Standards Authority of India",
                mandatory=True if request.sector_id in ["dairy-processing", "spices-food-processing"] else False,
                estimated_time_days=7,
                estimated_cost_inr=100.0,
                guidance="Apply online on FoSCoS portal. Required for food manufacturing, packaging, and retail sale."
            ),
            ComplianceItem(
                title="Gram Panchayat Trade NOC / Commercial Permit",
                authority="Local Village Panchayat",
                mandatory=True,
                estimated_time_days=3,
                estimated_cost_inr=250.0,
                guidance="Obtain no-objection certificate from Gram Pradhan / Sarpanch for operating commercial power unit."
            ),
            ComplianceItem(
                title="GST Registration (Exempt for Turnover < ₹40 Lakhs)",
                authority="GST Council / State Tax Department",
                mandatory=False,
                estimated_time_days=5,
                estimated_cost_inr=0.0,
                guidance="Optional initially for micro-enterprises under ₹40 Lakhs turnover unless selling inter-state or on e-commerce."
            )
        ]

        roadmap = [
            ActionStep(
                phase="Phase 1: Foundation & Grant Filing (Weeks 1-3)",
                step_number=1,
                title="Register Udyam & Submit PMEGP / Scheme Portal Application",
                description=f"Complete Udyam registration and submit project proposal on {scheme_res.best_matching_scheme.scheme_name} portal.",
                estimated_days=7
            ),
            ActionStep(
                phase="Phase 1: Foundation & Grant Filing (Weeks 1-3)",
                step_number=2,
                title="Bank Sanction & Machinery Procurement",
                description="Present project report to nodal bank branch for loan sanction and order core equipment.",
                estimated_days=14
            ),
            ActionStep(
                phase="Phase 2: Installation & Pilot Operations (Weeks 4-6)",
                step_number=3,
                title="Unit Setup, Power Connection & Quality Testing",
                description="Install processing machinery, setup electrical backup, and conduct test run for FSSAI compliance.",
                estimated_days=10
            ),
            ActionStep(
                phase="Phase 3: Market Launch & Scaling (Weeks 7-10)",
                step_number=4,
                title="Launch Local Distribution & Onboard Retailers",
                description=f"Begin supply to targeted buyers in {district_name} ({market_res.target_demographics[0].segment}).",
                estimated_days=15
            )
        ]

        voice_script = {
            "hi": f"नमस्ते {request.entrepreneur_name} जी! {district_name} में {sector_name} का उद्योग शुरू करने के लिए आपकी योजना बहुत उत्तम है। इसका फ़िजिबिलिटी स्कोर {feasibility_res.feasibility_score} प्रतिशत है। आपको {scheme_res.best_matching_scheme.scheme_name} के तहत लगभग ₹{scheme_res.best_matching_scheme.max_subsidy_amount:,.0f} की सब्सिडी मिल सकती है।",
            "en": f"Hello {request.entrepreneur_name}! Starting your {sector_name} unit in {district_name} shows high viability with a feasibility score of {feasibility_res.feasibility_score}%. Under {scheme_res.best_matching_scheme.scheme_name}, you can secure up to ₹{scheme_res.best_matching_scheme.max_subsidy_amount:,.0f} in capital subsidy."
        }

        return AdvisoryResponse(
            entrepreneur_name=request.entrepreneur_name,
            business_title=business_title,
            sector_name=sector_name,
            location_display=district_name,
            executive_summary=exec_summary,
            feasibility=feasibility_res,
            market_intelligence=market_res,
            financial_structure=financial_res,
            matching_schemes=scheme_res,
            compliance_checklist=compliance,
            roadmap_steps=roadmap,
            voice_script_summary=voice_script
        )
