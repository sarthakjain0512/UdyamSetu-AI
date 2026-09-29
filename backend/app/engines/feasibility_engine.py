from typing import List
from app.models.schemas import FeasibilityRequest, FeasibilityResponse, RiskFactor
from app.services.data_service import DataService

class FeasibilityEngine:
    """
    Deterministic Feasibility Assessment Engine.
    Evaluates operational readiness, financial readiness, scoring (0-100), grade, and break-even insights.
    """

    @staticmethod
    def assess_feasibility(request: FeasibilityRequest) -> FeasibilityResponse:
        capital = request.get_capital()
        if capital is None or capital <= 0:
            raise ValueError("Margin capital is required to evaluate financial readiness and feasibility.")

        sector_id = request.get_sector_id()
        district_id = request.get_district_id()

        sector = DataService.get_sector_by_id(sector_id)
        district = DataService.get_district_by_id(district_id)

        sector_name = sector.name if sector else sector_id.replace('-', ' ').title()
        district_name = f"{district.name}, {district.state}" if district else district_id.replace('-', ' ').title()

        min_req_capital = sector.avg_investment_min if sector else 100000.0

        # Operational readiness & location suitability
        location_score = 88.0 if (sector and district_id in sector.popular_districts) else 80.0
        skill_score = min(95.0, 70.0 + (float(request.prior_experience_years or 0) * 10.0))

        # Financial sizing: Project Cost = Capital / 0.10
        project_cost_estimate = round(capital / 0.10)
        capital_ratio = capital / max(min_req_capital * 0.10, 1.0)

        if capital_ratio >= 1.0:
            capital_status = "Sufficient Equity Contribution"
            financial_score = 90.0
        elif capital_ratio >= 0.7:
            capital_status = "Moderate Equity — Dependent on Subsidized Financing"
            financial_score = 75.0
        else:
            capital_status = "Thin Margin — High Leverage Required"
            financial_score = 55.0

        overall_score = round((location_score * 0.35) + (skill_score * 0.25) + (financial_score * 0.40), 1)

        # Deterministic Status & Letter Grade (SIH 26091 Task 4)
        if overall_score >= 75.0:
            feasibility_status = "Potentially Feasible"
        elif overall_score >= 60.0:
            feasibility_status = "Needs Validation"
        elif overall_score >= 45.0:
            feasibility_status = "Needs Significant Preparation"
        else:
            feasibility_status = "High Risk"

        if overall_score >= 90.0:
            feasibility_grade = "A+"
        elif overall_score >= 75.0:
            feasibility_grade = "A"
        elif overall_score >= 60.0:
            feasibility_grade = "B"
        elif overall_score >= 45.0:
            feasibility_grade = "C"
        else:
            feasibility_grade = "D"

        breakeven_months = 7 if capital >= 300000 else 5

        risks = [
            RiskFactor(
                risk_name="Raw Material Supply Seasonality",
                category="Operational",
                severity="Medium",
                mitigation_strategy="Establish forward collection agreements with local producer groups during peak season."
            ),
            RiskFactor(
                risk_name="Working Capital Liquidity Compression",
                category="Financial",
                severity="High" if capital_ratio < 0.8 else "Low",
                mitigation_strategy="Utilize Mudra / PMEGP credit-linked overdraft line for raw material procurement cycles."
            ),
            RiskFactor(
                risk_name="Local Mandi Price Volatility",
                category="Market",
                severity="Medium",
                mitigation_strategy="Package products in standard consumer sizes to earn finished-good retail premium."
            )
        ]

        recommendations = [
            "Formalize local producer supply partnerships before acquiring heavy processing equipment.",
            "Complete Udyam registration and obtain Gram Panchayat NOC for site electric connectivity.",
            "Maintain at least 3 months of operating expenses in reserve buffer during initial production ramp-up.",
            "Apply for PMEGP / PMFME margin subsidy through JanSamarth portal prior to term loan disbursement."
        ]

        return FeasibilityResponse(
            sector_name=sector_name,
            district_name=district_name,
            feasibility_score=overall_score,
            feasibility_grade=feasibility_grade,
            feasibility_status=feasibility_status,
            location_suitability=location_score,
            skill_readiness_score=skill_score,
            estimated_breakeven_months=breakeven_months,
            recommended_min_capital=min_req_capital,
            capital_adequacy=capital_status,
            margin_capital_analyzed=float(capital),
            project_cost_estimate=float(project_cost_estimate),
            risks=risks,
            key_recommendations=recommendations,
            is_fallback=False,
            source="backend",
            disclaimer="Prototype Feasibility Assessment — Non-Guarantee Advisory"
        )
