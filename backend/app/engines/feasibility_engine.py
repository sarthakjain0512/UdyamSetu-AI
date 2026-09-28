from app.models.schemas import FeasibilityRequest, FeasibilityResponse, RiskFactor
from app.services.data_service import DataService

class FeasibilityEngine:
    """
    Feasibility Engine.
    Evaluates business viability, score, risk factors, break-even period, capital adequacy.
    """

    @staticmethod
    def assess_feasibility(request: FeasibilityRequest) -> FeasibilityResponse:
        sector = DataService.get_sector_by_id(request.sector_id)
        district = DataService.get_district_by_id(request.district_id)

        sector_name = sector.name if sector else request.sector_id.title()
        district_name = f"{district.name}, {district.state}" if district else request.district_id.title()

        min_req_capital = sector.avg_investment_min if sector else 100000.0

        # Score calculations based on inputs
        location_score = 88.0 if request.district_id in (sector.popular_districts if sector else []) else 78.0
        
        # Skill score
        skill_score = min(95.0, 60.0 + (request.prior_experience_years * 10.0))
        
        # Capital adequacy score
        capital_adequacy_ratio = request.proposed_capital / max(min_req_capital, 1.0)
        if capital_adequacy_ratio >= 1.0:
            capital_status = "Sufficient"
            capital_score = 90.0
        elif capital_adequacy_ratio >= 0.7:
            capital_status = "Slightly Deficit (Eligible for Mudra/PMEGP Loan)"
            capital_score = 75.0
        else:
            capital_status = "Deficit - High Loan Requirement"
            capital_score = 55.0

        # Overall Feasibility Score
        overall_score = round((location_score * 0.35) + (skill_score * 0.25) + (capital_score * 0.40), 1)

        # Grade
        if overall_score >= 85:
            grade = "A+ (Highly Feasible)"
        elif overall_score >= 75:
            grade = "A (Feasible with Guidance)"
        elif overall_score >= 60:
            grade = "B (Moderate Risk)"
        else:
            grade = "C (Requires Restructuring)"

        # Breakeven estimation
        breakeven_months = 8 if request.proposed_capital > 300000 else 6

        risks = [
            RiskFactor(
                risk_name="Seasonal Raw Material Price Fluctuations",
                category="Market",
                severity="Medium",
                mitigation_strategy="Establish direct forward contracts with local farmers during harvest season."
            ),
            RiskFactor(
                risk_name="Power Disruption & Grid Reliability",
                category="Operational",
                severity="Medium" if request.electricity_water_access else "High",
                mitigation_strategy="Utilize PM Surya Ghar solar subvention or backup diesel/inverter generator."
            ),
            RiskFactor(
                risk_name="Initial Working Capital Strains",
                category="Financial",
                severity="Low" if capital_status == "Sufficient" else "High",
                mitigation_strategy="Leverage Mudra Card line of credit for 90-day revolving inventory."
            )
        ]

        recommendations = [
            f"Apply for PMEGP/PMFME subsidy to cover up to 35% of capital expenditure for {sector_name}.",
            "Register entity on Udyam Portal immediately for priority sector lending interest concessions.",
            "Form a tie-up with local Panchayat self-help groups (SHGs) for raw material aggregation."
        ]

        return FeasibilityResponse(
            sector_name=sector_name,
            district_name=district_name,
            feasibility_score=overall_score,
            feasibility_grade=grade,
            location_suitability=location_score,
            skill_readiness_score=skill_score,
            estimated_breakeven_months=breakeven_months,
            recommended_min_capital=min_req_capital,
            capital_adequacy=capital_status,
            risks=risks,
            key_recommendations=recommendations
        )
