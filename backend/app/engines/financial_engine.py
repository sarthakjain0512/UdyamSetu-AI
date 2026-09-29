import math
from typing import List
from app.models.schemas import FinancialRequest, FinancialResponse, ProjectCostBreakdown, YearlyProjections

class FinancialCalculationEngine:
    """
    Deterministic SIH 26091 Financial Planning & Debt Structuring Engine.
    Implements reducing-balance EMI schedules, CapEx/OpEx sizing, DSCR, and 3-year projections.
    """

    @staticmethod
    def calculate_financials(request: FinancialRequest) -> FinancialResponse:
        margin = request.get_margin_capital()
        if margin is None or margin <= 0:
            raise ValueError("Margin capital is required to generate the financial plan.")

        # SIH Core Sizing Formula
        project_cost = round(margin / 0.10)
        raw_loan = round(project_cost * 0.90)

        is_exceeding_max_cost = project_cost > 5000000
        is_micro_finance = project_cost <= 140000

        if is_exceeding_max_cost:
            track = 'Beyond Prototype Ceiling (> ₹50L)'
            annual_rate = 0.08
            tenure_years = 7
            tenure_months = 84
            moratorium_months = 6
            max_loan_ceiling = 4500000
        elif is_micro_finance:
            track = 'Micro Finance Track'
            annual_rate = 0.065
            tenure_years = 3
            tenure_months = 36
            moratorium_months = 3
            max_loan_ceiling = 125000
        else:
            track = 'Term Loan Track'
            annual_rate = 0.08
            tenure_years = 7
            tenure_months = 84
            moratorium_months = 6
            max_loan_ceiling = 4500000

        is_exceeding_cap = raw_loan > max_loan_ceiling
        sized_loan = min(raw_loan, max_loan_ceiling)

        # Reducing balance monthly EMI: P * r * (1+r)^n / ((1+r)^n - 1)
        monthly_rate = annual_rate / 12.0
        repayment_months = max(1, tenure_months - moratorium_months)

        if sized_loan > 0 and monthly_rate > 0:
            emi_factor = pow(1.0 + monthly_rate, repayment_months)
            monthly_emi = round((sized_loan * monthly_rate * emi_factor) / (emi_factor - 1.0), 2)
        else:
            monthly_emi = 0.0

        # CapEx allocation (65% of project cost)
        machinery_cost = round(project_cost * 0.40, 2)
        site_infra_cost = round(project_cost * 0.15, 2)
        licensing_cost = round(project_cost * 0.10, 2)

        capex_items = [
            ProjectCostBreakdown(category="Machinery & Processing Equipment", amount=machinery_cost, percentage=40.0, description="Core processing units, machinery, tools"),
            ProjectCostBreakdown(category="Site Infrastructure & Power Installation", amount=site_infra_cost, percentage=15.0, description="Electrical wiring, site prep, water/sanitation"),
            ProjectCostBreakdown(category="Quality Testing & Licensing Fees", amount=licensing_cost, percentage=10.0, description="FSSAI, Udyam, local trade licenses")
        ]

        # Working Capital & Monthly OpEx (35% of total cost)
        working_capital_req = round(project_cost * 0.35, 2)
        monthly_opex_est = round(working_capital_req / 6.0, 2)

        opex_items = [
            ProjectCostBreakdown(category="Raw Material Aggregation", amount=round(monthly_opex_est * 0.55, 2), percentage=55.0, description="Local agricultural raw material procurement"),
            ProjectCostBreakdown(category="Wages & Honorarium", amount=round(monthly_opex_est * 0.25, 2), percentage=25.0, description="Local worker wages and operator honorarium"),
            ProjectCostBreakdown(category="Utilities & Packaging Material", amount=round(monthly_opex_est * 0.20, 2), percentage=20.0, description="Electricity, fuel, packaging consumables")
        ]

        # Synthetic Prototype Cash Flow Archetype (SIH 26091)
        asset_turnover = 1.6 if is_micro_finance else 1.35
        ebitda_margin = 0.28 if is_micro_finance else 0.25
        base_annual_rev = round(project_cost * asset_turnover, 2)
        annual_debt_service = monthly_emi * 12.0

        projections = []
        ramp_multipliers = [1.0, 1.15, 1.25]

        for i, mult in enumerate(ramp_multipliers, start=1):
            yr_rev = round(base_annual_rev * mult, 2)
            yr_ebitda = round(yr_rev * ebitda_margin, 2)
            yr_opex = round(yr_rev - yr_ebitda, 2)
            yr_net = round(max(0.0, yr_ebitda - annual_debt_service), 2)
            yr_cash_flow = round(yr_net + (project_cost * 0.05), 2)

            projections.append(YearlyProjections(
                year=i,
                revenue=yr_rev,
                opex=yr_opex,
                net_profit=yr_net,
                cash_flow=yr_cash_flow
            ))

        # DSCR = EBITDA / Annual Debt Service
        yr1_ebitda = base_annual_rev * ebitda_margin
        if annual_debt_service > 0:
            dscr = round(yr1_ebitda / annual_debt_service, 2)
        else:
            dscr = 3.5

        return FinancialResponse(
            total_project_cost=float(project_cost),
            equity_contribution=float(margin),
            required_loan_amount=float(sized_loan),
            track=track,
            interest_rate_pct=round(annual_rate * 100.0, 2),
            tenure_years=tenure_years,
            tenure_months=tenure_months,
            moratorium_months=moratorium_months,
            monthly_emi_est=monthly_emi,
            dscr=max(1.05, dscr),
            is_exceeding_max_cost=is_exceeding_max_cost,
            is_exceeding_cap=is_exceeding_cap,
            capex_breakdown=capex_items,
            opex_monthly_breakdown=opex_items,
            working_capital_required=working_capital_req,
            three_year_projections=projections,
            is_fallback=False,
            source="backend",
            disclaimer="SIH 26091 Illustrative Financial Scenario — Prototype Estimate"
        )
