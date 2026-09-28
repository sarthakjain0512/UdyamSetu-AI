from typing import List
from app.models.schemas import SchemeRoutingRequest, SchemeRoutingResponse, SchemeDetail
from app.services.data_service import DataService

class SchemeRoutingEngine:
    """
    Intelligent Government Scheme Routing Engine.
    Matches government schemes (PMEGP, PMFME, MUDRA, Lakhpati Didi, Stand-Up India)
    based on entrepreneur profile, location, sector, and credit requirements.
    """

    @staticmethod
    def route_schemes(request: SchemeRoutingRequest) -> SchemeRoutingResponse:
        raw_schemes = DataService.get_raw_schemes()
        matched_details: List[SchemeDetail] = []

        for sch in raw_schemes:
            score = 60.0 # base score

            # Sector match
            if request.sector_id in sch["applicable_sectors"]:
                score += 20.0

            # Gender & social category bonus
            if "women" in sch["eligibility_categories"] and request.gender.lower() in ["female", "women"]:
                score += 15.0
            if "shg" in sch["eligibility_categories"] and request.gender.lower() in ["female", "women"]:
                score += 10.0
            if any(cat in sch["eligibility_categories"] for cat in [request.social_category.lower()]):
                score += 10.0

            # Investment size check
            if request.investment_amount <= sch["max_loan_limit_manufacturing"]:
                score += 10.0

            score = min(98.0, score)

            # Effective subsidy percentage
            subsidy_pct = sch["base_subsidy_rate_rural"] if request.is_rural else sch["base_subsidy_rate_urban"]
            if request.gender.lower() in ["female", "women"] or request.social_category.lower() in ["sc", "st", "obc"]:
                subsidy_pct = min(35.0, subsidy_pct + 10.0) if subsidy_pct > 0 else subsidy_pct

            # Max subsidy
            max_subsidy = round((request.investment_amount * (subsidy_pct / 100.0)), 2)
            max_subsidy_cap = sch.get("max_subsidy_amount", 1000000.0)
            max_subsidy = min(max_subsidy, max_subsidy_cap)

            eligibility_str = "Eligible - High Match" if score >= 85 else ("Eligible" if score >= 70 else "Conditional")

            matched_details.append(SchemeDetail(
                scheme_code=sch["scheme_code"],
                scheme_name=sch["scheme_name"],
                nodal_ministry=sch["nodal_ministry"],
                subsidy_rate_pct=subsidy_pct,
                max_loan_limit=sch["max_loan_limit_manufacturing"],
                max_subsidy_amount=max_subsidy,
                match_score=score,
                eligibility_status=eligibility_str,
                key_benefits=sch["key_benefits"],
                required_documents=sch["required_documents"],
                application_portal_url=sch["application_portal_url"]
            ))

        # Sort by match score descending
        matched_details.sort(key=lambda x: x.match_score, reverse=True)
        best_scheme = matched_details[0]
        total_potential = sum([s.max_subsidy_amount for s in matched_details[:2]])

        return SchemeRoutingResponse(
            recommended_schemes=matched_details,
            best_matching_scheme=best_scheme,
            total_potential_subsidy=round(total_potential, 2)
        )
