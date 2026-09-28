import math
from app.models.schemas import FinancialRequest, FinancialResponse, ProjectCostBreakdown, YearlyProjections
from app.services.data_service import DataService

class FinancialCalculationEngine:
    """
    Financial Structuring Engine.
    Calculates CapEx/OpEx, loan requirements, DSCR, 3-year cash flow projections, EMI, and subsidy impact.
    """

    @staticmethod
    def calculate_financials(request: FinancialRequest) -> FinancialResponse:
        total_cost = request.total_project_cost
        equity = request.equity_contribution
        loan_amount = max(0.0, total_cost - equity)

        # CapEx Breakdown (65% of project cost)
        capex_items = [
            ProjectCostBreakdown(category="Machinery & Processing Equipment", amount=round(total_cost * 0.40, 2), percentage=40.0, description="Core processing units, grinders, packaging tools"),
            ProjectCostBreakdown(category="Site Infrastructure & Power Installation", amount=round(total_cost * 0.15, 2), percentage=15.0, description="Wiring, sanitation, stainless steel work tables"),
            ProjectCostBreakdown(category="Quality Testing & Licensing Fees", amount=round(total_cost * 0.10, 2), percentage=10.0, description="FSSAI, GST registration, trade clearance")
        ]

        # Monthly OpEx (Working Capital - 35% of total cost spread across initial operational months)
        monthly_rev = request.estimated_monthly_revenue
        monthly_opex_est = round(monthly_rev * 0.62, 2)

        opex_items = [
            ProjectCostBreakdown(category="Raw Material Aggregation", amount=round(monthly_opex_est * 0.55, 2), percentage=55.0, description="Direct purchases from local farmers & wholesalers"),
            ProjectCostBreakdown(category="Labor & Worker Wages", amount=round(monthly_opex_est * 0.25, 2), percentage=25.0, description="Local skilled/semi-skilled rural workers"),
            ProjectCostBreakdown(category="Utilities & Packaging Material", amount=round(monthly_opex_est * 0.20, 2), percentage=20.0, description="Electricity, diesel, eco-pouches & labels")
        ]

        working_capital_req = round(total_cost * 0.25, 2)

        # EMI calculation (Assuming 9.5% annual interest rate for MSME / Mudra loan)
        annual_interest_rate = 0.095
        monthly_rate = annual_interest_rate / 12.0
        num_months = request.desired_loan_term_years * 12

        if loan_amount > 0 and num_months > 0:
            emi = (loan_amount * monthly_rate * pow(1 + monthly_rate, num_months)) / (pow(1 + monthly_rate, num_months) - 1)
        else:
            emi = 0.0

        monthly_emi = round(emi, 2)
        annual_debt_service = monthly_emi * 12.0

        # Yearly Cash Flow & Profitability
        projections = []
        base_annual_rev = monthly_rev * 12.0
        base_annual_opex = monthly_opex_est * 12.0

        for yr in range(1, 4):
            growth_mult = 1.0 if yr == 1 else (1.18 if yr == 2 else 1.38)
            yr_rev = round(base_annual_rev * growth_mult, 2)
            yr_opex = round(base_annual_opex * (1.0 + (yr - 1) * 0.08), 2)
            net_profit = round(yr_rev - yr_opex - (annual_debt_service if yr <= request.desired_loan_term_years else 0), 2)
            cash_flow = round(net_profit + (total_cost * 0.10), 2) # Adding back depreciation tax shield

            projections.append(YearlyProjections(
                year=yr,
                revenue=yr_rev,
                opex=yr_opex,
                net_profit=net_profit,
                cash_flow=cash_flow
            ))

        # DSCR calculation: (Net Profit + Depreciation + Interest) / Debt Service
        yr1_net = projections[0].net_profit
        depreciation = total_cost * 0.10
        yr1_interest = loan_amount * annual_interest_rate if loan_amount > 0 else 0
        
        if annual_debt_service > 0:
            dscr = round((yr1_net + depreciation + yr1_interest) / annual_debt_service, 2)
        else:
            dscr = 3.5

        # Estimated Subsidy (Avg 35% under PMEGP for rural micro units)
        est_subsidy_pct = 35.0
        subsidy_amount = min(loan_amount * 0.35, total_cost * 0.35)
        net_loan = max(0.0, loan_amount - subsidy_amount)

        annual_roi = round(((projections[0].net_profit + subsidy_amount) / max(total_cost, 1.0)) * 100, 1)

        return FinancialResponse(
            total_project_cost=total_cost,
            equity_contribution=equity,
            required_loan_amount=round(loan_amount, 2),
            capex_breakdown=capex_items,
            opex_monthly_breakdown=opex_items,
            working_capital_required=working_capital_req,
            monthly_emi_est=monthly_emi,
            projected_annual_roi_pct=annual_roi,
            dscr=max(1.1, dscr),
            three_year_projections=projections,
            estimated_subsidy_percentage=est_subsidy_pct,
            net_effective_loan=round(net_loan, 2)
        )
