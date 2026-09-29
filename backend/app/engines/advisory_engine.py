from typing import List, Dict, Any, Optional
from app.models.schemas import AdvisoryRequest, AdvisoryResponse, RecommendationItem

class AdvisoryGenerationEngine:
    """
    Deterministic Strategic Business Advisory Engine (Task 7).
    Synthesizes available upstream analysis into explainable, evidence-backed recommendations,
    risk mitigations, validation questions, and a phased execution roadmap.
    """

    @staticmethod
    def generate_advisory(request: AdvisoryRequest) -> AdvisoryResponse:
        session = request.session or {}
        market = request.market
        feasibility = request.feasibility
        financial = request.financial
        scheme = request.scheme

        # Extract context
        business = session.get("business", {})
        location = session.get("location", {})
        finance = session.get("finance", {})

        sector_name = business.get("sectorName") or business.get("category") or "Rural Micro-Enterprise"
        idea_title = business.get("idea") or sector_name
        district_name = location.get("districtName") or location.get("district") or "Target Cluster"
        margin = finance.get("marginCapital") or request.proposed_capital or 0.0

        strengths: List[str] = []
        risks: List[str] = []
        recommendations: List[RecommendationItem] = []

        # 1. Market-Derived Intelligence (ONLY if market is available)
        if market and isinstance(market, dict) and not market.get("is_unavailable"):
            trend = market.get("demand_trend") or market.get("snapshot", {}).get("demandLevel") or "Growing"
            strengths.append(f"Demonstrated local market demand signal ({trend}) within target cluster.")
            recommendations.append(RecommendationItem(
                category="Market Penetration",
                priority="High",
                title="Secure Initial Local Offtake Commitments",
                why=f"Local market indicates {trend} with competitive room for high-quality packaging.",
                action="Engage 5–10 village retailers and dhabas with sample trial packs prior to commercial launch.",
                source="Market Intelligence"
            ))
        else:
            strengths.append("Market Intelligence: Not available from current analysis — validation required.")

        # 2. Feasibility-Derived Intelligence
        if feasibility and isinstance(feasibility, dict) and not feasibility.get("is_unavailable"):
            score = feasibility.get("feasibility_score", 75)
            status = feasibility.get("feasibility_status", "Potentially Feasible")
            strengths.append(f"Operational & financial feasibility readiness assessed at {score}/100 ({status}).")
            recommendations.append(RecommendationItem(
                category="Operational Readiness",
                priority="High",
                title="Execute Infrastructure & Licensing Milestone",
                why="Operational clearance ensures uninterrupted production once term loan disburses.",
                action="Confirm Gram Panchayat NOC, power sanction, and initiate Udyam/FSSAI registration.",
                source="Feasibility Assessment"
            ))
        else:
            risks.append("Operational Feasibility: Not available from current analysis — conduct site check.")

        # 3. Financial-Derived Intelligence
        if financial and isinstance(financial, dict) and not financial.get("is_unavailable"):
            cost = financial.get("total_project_cost") or financial.get("financing", {}).get("projectCost") or (margin * 10)
            loan = financial.get("required_loan_amount") or financial.get("financing", {}).get("loanAmount") or (margin * 9)
            dscr = financial.get("dscr") or 1.35
            strengths.append(f"Bankable debt structuring sized at ₹{cost:,.0f} total cost (₹{loan:,.0f} debt requirement).")
            recommendations.append(RecommendationItem(
                category="Financial Discipline",
                priority="High",
                title="Maintain Working Capital Buffer",
                why=f"Indicative DSCR is {dscr:.2f}x; initial ramp-up requires liquidity discipline.",
                action="Keep at least 15% of equity capital in an accessible liquid buffer for initial operating cycles.",
                source="Financial Plan"
            ))
        else:
            risks.append("Financial Structuring: Not available from current analysis — establish promoter equity.")

        # 4. Scheme-Derived Guidance
        if scheme and isinstance(scheme, dict) and not scheme.get("is_unavailable"):
            track_title = scheme.get("track_title") or scheme.get("routingPlan", {}).get("trackTitle") or "Term Loan Track"
            strengths.append(f"Government financing alignment confirmed under {track_title}.")
            recommendations.append(RecommendationItem(
                category="Government Subsidy",
                priority="Medium",
                title="Submit Margin Money Application via Nodal Portal",
                why="Credit-linked subsidies reduce effective borrowing cost and monthly debt service pressure.",
                action="Prepare DPR following PMEGP / Mudra documentation guidelines and apply via JanSamarth.",
                source="Scheme Router"
            ))
        else:
            risks.append("Scheme Routing: Not available from current analysis — verify official criteria.")

        # Synthesis Summary
        summary = (
            f"Strategic analysis for {idea_title} in {district_name}. "
            f"Promoter equity of ₹{margin:,.0f} structures a bankable project with actionable preparatory milestones. "
            "Follow the prioritized recommendations to validate local demand and secure formal credit-linked support."
        )

        roadmap = [
            {"phase": "Phase 1: Pre-Sanction Preparation", "timeframe": "Weeks 1–3", "focus": "Documentation, Udyam enrollment, site NOC, and supplier quotations."},
            {"phase": "Phase 2: Financing & Equipment Sourcing", "timeframe": "Weeks 4–7", "focus": "Bank appraisal, JanSamarth subsidy linkage, machinery procurement."},
            {"phase": "Phase 3: Trial Production & Distribution", "timeframe": "Weeks 8–12", "focus": "Trial batch, packaging validation, retail shelf placement."}
        ]

        validation_questions = [
            {"domain": "Market Validation", "question": "Have you confirmed pricing acceptance with at least 5 local retail buyers?"},
            {"domain": "Raw Material Access", "question": "Are supply contracts or verbal commitments in place for peak and lean harvest months?"},
            {"domain": "Cash Flow Buffer", "question": "Can your enterprise sustain 60 days of delayed customer receivables without halting wages?"}
        ]

        return AdvisoryResponse(
            executive_summary=summary,
            strengths=strengths,
            risks=risks,
            recommendations=recommendations,
            action_roadmap=roadmap,
            validation_questions=validation_questions,
            is_fallback=False,
            source="backend",
            disclaimer="Deterministic Prototype Advisory — Non-Guarantee Guidance"
        )
