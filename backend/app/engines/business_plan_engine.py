from typing import Dict, Any, List, Optional
from app.models.schemas import BusinessPlanRequest, BusinessPlanResponse

class BusinessPlanEngine:
    """
    Deterministic Business Launch Plan Engine (Task 8).
    Synthesizes upstream analysis into a structured pre-launch roadmap.
    """

    @staticmethod
    def generate_launch_plan(request: BusinessPlanRequest) -> BusinessPlanResponse:
        session = request.session or {}
        market = request.market
        feasibility = request.feasibility
        financial = request.financial
        scheme = request.scheme
        advisory = request.advisory

        business = session.get("business", {})
        location = session.get("location", {})
        finance = session.get("finance", {})

        sector_name = business.get("sectorName") or business.get("category") or "Rural Micro-Enterprise"
        idea_title = business.get("idea") or sector_name
        district_name = location.get("districtName") or location.get("district") or "Target Cluster"
        margin = finance.get("marginCapital") or 300000.0
        project_cost = margin * 10
        loan_amount = margin * 9

        # Track information sources
        coverage = {
            "session": True,
            "market": bool(market and not market.get("is_unavailable")),
            "feasibility": bool(feasibility and not feasibility.get("is_unavailable")),
            "financial": bool(financial and not financial.get("is_unavailable")),
            "scheme": bool(scheme and not scheme.get("is_unavailable")),
            "advisory": bool(advisory and not advisory.get("is_unavailable"))
        }

        # 1. Overview
        overview = {
            "business_idea": idea_title,
            "sector": sector_name,
            "location": district_name,
            "margin_capital": margin,
            "project_cost": project_cost,
            "loan_amount": loan_amount,
            "track": "Micro Finance Track" if project_cost <= 140000 else "Term Loan Track"
        }

        # 2. Readiness Audit
        readiness_items = [
            {"domain": "Promoter Equity", "status": "Ready", "detail": f"₹{margin:,.0f} margin contribution defined."},
            {"domain": "Market Demand", "status": "Ready" if coverage["market"] else "Requires Validation", "detail": "Local offtake demand signal verified." if coverage["market"] else "Not available from current analysis — field inquiry recommended."},
            {"domain": "Operational Feasibility", "status": "Ready" if coverage["feasibility"] else "Requires Validation", "detail": "Operational parameters assessed." if coverage["feasibility"] else "Not available from current analysis — site check recommended."},
            {"domain": "Debt Structuring", "status": "Ready" if coverage["financial"] else "Requires Validation", "detail": "90% debt sizing and EMI modeled." if coverage["financial"] else "Financial structure requires confirmation."},
            {"domain": "Subsidy Route", "status": "Ready" if coverage["scheme"] else "Requires Validation", "detail": "Government financing pathway matched." if coverage["scheme"] else "Scheme routing requires portal verification."}
        ]
        readiness = {
            "overall_status": "Ready for Pre-Launch Preparation" if all(coverage.values()) else "Partially Validated — Follow Up Required",
            "items": readiness_items
        }

        # 3. Recommendations
        recommendations = [
            {"phase": "Pre-Sanction", "priority": "High", "action": "Complete Udyam registration and open dedicated MSME current account."},
            {"phase": "Pre-Sanction", "priority": "High", "action": "Obtain machinery quotations from 2 verified suppliers for bank appraisal."},
            {"phase": "Operations", "priority": "Medium", "action": "Secure written or verbal agreements with local raw material suppliers."},
            {"phase": "Marketing", "priority": "Medium", "action": "Distribute pre-launch samples to 10 local retail outlets to validate taste/packaging."}
        ]

        # 4. Pre-Launch Checklist
        checklist = {
            "legal_and_compliance": [
                {"id": "c1", "label": "Aadhaar-linked Udyam Registration Certificate", "mandatory": True},
                {"id": "c2", "label": "Gram Panchayat / Local Body Trade NOC", "mandatory": True},
                {"id": "c3", "label": "FSSAI Registration / State Food License (if food sector)", "mandatory": True}
            ],
            "financial_and_banking": [
                {"id": "c4", "label": "Dedicated Bank Current Account with Promoter Margin Deposit", "mandatory": True},
                {"id": "c5", "label": "Detailed Project Report (DPR) with 3-Year Cash Flow Projections", "mandatory": True},
                {"id": "c6", "label": "Machinery Pro-forma Invoices from Certified Vendors", "mandatory": True}
            ],
            "operational_readiness": [
                {"id": "c7", "label": "Electricity Load Sanction & Dedicated Earthing Installation", "mandatory": True},
                {"id": "c8", "label": "Safe Drinking & Processing Water Quality Test Report", "mandatory": False},
                {"id": "c9", "label": "First Aid & Basic Fire Extinguisher Installation on Premises", "mandatory": True}
            ]
        }

        # 5. Launch Sequence (9 Steps)
        sequence = [
            {"step": 1, "title": "Concept Sizing", "description": "Define enterprise capacity, equity capital, and product lines."},
            {"step": 2, "title": "Catchment Validation", "description": "Engage retail counters within 5–10 km radius to confirm pricing."},
            {"step": 3, "title": "Site & Power Check", "description": "Confirm physical workshop location and electrical power sanction."},
            {"step": 4, "title": "Regulatory Filings", "description": "Register on Udyam and apply for sector clearances (FSSAI/PCB)."},
            {"step": 5, "title": "DPR & Bank Appraisal", "description": "Submit bankable loan proposal via JanSamarth or Lead Bank branch."},
            {"step": 6, "title": "Equipment Procurement", "description": "Issue vendor purchase orders upon loan sanction."},
            {"step": 7, "title": "Trial Production", "description": "Calibrate machinery and run test batches with raw material batches."},
            {"step": 8, "title": "Retail Launch", "description": "Begin formal distribution to pre-booked kirana and sweet shops."},
            {"step": 9, "title": "Cash Flow Review", "description": "Review debtor collection cycles and bank EMI debits after 60 days."}
        ]

        # 6. Milestones
        milestones = [
            {"period": "Pre-Launch (Month 1)", "target": "Bank sanction, site NOC, equipment ordered."},
            {"period": "Launch Phase (Month 2)", "target": "Equipment installation, trial batch cleared, first retail order dispatched."},
            {"period": "Early Operations (Month 3–4)", "target": "Reach 40% capacity, collect initial receivables, maintain 1.25x DSCR."},
            {"period": "Stabilization (Month 5–6)", "target": "Expand local dealer network, review PMEGP subsidy adjustment."}
        ]

        # 7. Risk Control Plan
        risk_control = [
            {"risk": "Delayed Bank Loan Disbursement", "mitigation": "Follow up weekly with Lead District Manager; ensure DPR aligns strictly with Mudra/PMEGP guidelines."},
            {"risk": "Raw Material Price Spike", "mitigation": "Hold minimum 15-day inventory buffer during harvest price dips."},
            {"risk": "Slow Retail Payment Collections", "mitigation": "Offer 2% cash settlement discounts to encourage prompt settlement by kirana stores."}
        ]

        # 8. Financial Preparation
        financial_prep = {
            "promoter_margin": margin,
            "project_cost": project_cost,
            "recommended_liquid_buffer": round(margin * 0.15, 2),
            "expected_first_quarter_fixed_cost": round(project_cost * 0.08, 2),
            "guidance": "Do not commit 100% of promoter capital to fixed machinery. Retain liquidity for initial raw material inventory cycles."
        }

        # 9. Financing Follow-Up
        financing_follow_up = {
            "channel": "JanSamarth Portal / Nodal Commercial Bank Branch",
            "priority_action": "Verify scheme eligibility and submit online DPR under PMEGP or Mudra.",
            "statutory_reminder": "Final loan sanction, interest concession, and subsidy adjustment depend solely on bank appraisal and nodal ministry verification."
        }

        # 10. Validation Questions
        validation_questions = [
            {"topic": "Commercial Offtake", "prompt": "Have at least 5 retail merchants agreed to stock trial packs?"},
            {"topic": "Utility Reliability", "prompt": "Is electrical supply in your village steady enough, or is backup diesel power required?"},
            {"topic": "Working Capital", "prompt": "Can you pay worker wages on the 1st of every month if retailers delay payment by 30 days?"}
        ]

        return BusinessPlanResponse(
            overview=overview,
            readiness=readiness,
            recommendations=recommendations,
            checklist=checklist,
            sequence=sequence,
            milestones=milestones,
            risk_control=risk_control,
            financial_preparation=financial_prep,
            financing_follow_up=financing_follow_up,
            validation_questions=validation_questions,
            source_coverage=coverage,
            is_fallback=False,
            source="backend",
            disclaimer="Evidence-Derived Business Launch Blueprint — Prototype Pre-Launch Guidance"
        )
