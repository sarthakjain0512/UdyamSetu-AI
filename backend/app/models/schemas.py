from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# ----------------------------------------------------
# 1. Health & Error Schemas
# ----------------------------------------------------

class HealthResponse(BaseModel):
    status: str = "ok"
    service: str = "udyamsetu-api"
    version: str = "1.0.0"

class ErrorDetail(BaseModel):
    code: str
    message: str

class ErrorResponse(BaseModel):
    error: ErrorDetail

# ----------------------------------------------------
# 2. Common Domain Schemas (Analysis Session Models)
# ----------------------------------------------------

class AnalysisLocation(BaseModel):
    state: Optional[str] = "Uttar Pradesh"
    district: Optional[str] = "Varanasi"
    districtId: Optional[str] = "varanasi-up"
    blockOrLocality: Optional[str] = ""
    tier: Optional[str] = "Tier-3 / Rural Cluster"

class BusinessInput(BaseModel):
    category: Optional[str] = "Dairy & Food Processing"
    sectorId: Optional[str] = "dairy-processing"
    sectorName: Optional[str] = "Dairy & Food Processing"
    idea: Optional[str] = "Rural Dairy Unit"
    isCustom: Optional[bool] = False

class FinancialInput(BaseModel):
    marginCapital: Optional[float] = Field(default=None, description="Promoter margin capital in INR")
    estimatedProjectCost: Optional[float] = None
    estimatedLoanAmount: Optional[float] = None

class EntrepreneurContextInput(BaseModel):
    name: Optional[str] = "Beneficiary Entrepreneur"
    gender: Optional[str] = "general"
    socialCategory: Optional[str] = "general"
    areaContext: Optional[str] = "rural"

# ----------------------------------------------------
# 3. Base Reference Metadata Items
# ----------------------------------------------------

class SectorItem(BaseModel):
    id: str
    name: str
    category: str
    description: str
    icon: str
    avg_investment_min: float
    avg_investment_max: float
    popular_districts: List[str]

class DistrictItem(BaseModel):
    id: str
    name: str
    state: str
    tier: str
    primary_crops_industries: List[str]
    rural_population_pct: float

# ----------------------------------------------------
# 4. Market Intelligence Schemas (Task 3)
# ----------------------------------------------------

class MarketAnalysisRequest(BaseModel):
    sector_id: Optional[str] = None
    district_id: Optional[str] = None
    investment_amount: Optional[float] = None
    proposed_capital: Optional[float] = None
    radius_km: Optional[int] = 5
    target_scale: Optional[str] = "micro"
    location: Optional[AnalysisLocation] = None
    business: Optional[BusinessInput] = None
    finance: Optional[FinancialInput] = None

    def get_sector_id(self) -> str:
        return self.sector_id or (self.business.sectorId if self.business else "dairy-processing") or "dairy-processing"

    def get_district_id(self) -> str:
        return self.district_id or (self.location.districtId if self.location else "varanasi-up") or "varanasi-up"

    def get_investment_amount(self) -> float:
        if self.investment_amount is not None:
            return float(self.investment_amount)
        if self.proposed_capital is not None:
            return float(self.proposed_capital)
        if self.finance and self.finance.marginCapital is not None:
            return float(self.finance.marginCapital)
        return 300000.0

class DemographicInsight(BaseModel):
    segment: str
    percentage: float
    buying_power: str
    needs: List[str]

class CompetitorInfo(BaseModel):
    type: str
    threat_level: str  # Low, Medium, High
    market_share_est: str
    differentiator_opportunity: str

class PricingBenchmark(BaseModel):
    item_category: str
    local_avg_price: float
    unit: str
    margin_pct: float

class MarketAnalysisResponse(BaseModel):
    sector_id: str
    sector_name: str
    district_name: str
    demand_index: float
    demand_trend: str
    raw_material_availability: str
    competition_density: str
    radius_km: int = 5
    target_demographics: List[DemographicInsight]
    competitors: List[CompetitorInfo]
    pricing_benchmarks: List[PricingBenchmark]
    growth_drivers: List[str]
    challenges: List[str]
    is_fallback: bool = False
    source: str = "backend"
    disclaimer: str = "Prototype Demo Data — Not Actual Live Mandi Statistics"

# ----------------------------------------------------
# 5. Feasibility Engine Schemas (Task 4)
# ----------------------------------------------------

class FeasibilityRequest(BaseModel):
    sector_id: Optional[str] = None
    district_id: Optional[str] = None
    proposed_capital: Optional[float] = None
    margin_capital: Optional[float] = None
    prior_experience_years: Optional[float] = 0
    land_available: Optional[bool] = True
    electricity_water_access: Optional[bool] = True
    business_idea: Optional[str] = None
    district_tier: Optional[str] = "Tier-3 / Rural Cluster"
    location: Optional[AnalysisLocation] = None
    business: Optional[BusinessInput] = None
    finance: Optional[FinancialInput] = None
    market_context: Optional[Dict[str, Any]] = None

    def get_sector_id(self) -> str:
        return self.sector_id or (self.business.sectorId if self.business else "dairy-processing") or "dairy-processing"

    def get_district_id(self) -> str:
        return self.district_id or (self.location.districtId if self.location else "varanasi-up") or "varanasi-up"

    def get_capital(self) -> Optional[float]:
        if self.proposed_capital is not None:
            return float(self.proposed_capital)
        if self.margin_capital is not None:
            return float(self.margin_capital)
        if self.finance and self.finance.marginCapital is not None:
            return float(self.finance.marginCapital)
        return None

class RiskFactor(BaseModel):
    risk_name: str
    category: str
    severity: str
    mitigation_strategy: str

class FeasibilityResponse(BaseModel):
    sector_name: str
    district_name: str
    feasibility_score: float
    feasibility_grade: str
    feasibility_status: str
    location_suitability: float
    skill_readiness_score: float
    estimated_breakeven_months: int
    recommended_min_capital: float
    capital_adequacy: str
    margin_capital_analyzed: float
    project_cost_estimate: float
    risks: List[RiskFactor]
    key_recommendations: List[str]
    is_fallback: bool = False
    source: str = "backend"
    disclaimer: str = "Prototype Feasibility Assessment — Non-Guarantee Advisory"

# ----------------------------------------------------
# 6. Financial Planning Schemas (Task 5)
# ----------------------------------------------------

class FinancialRequest(BaseModel):
    margin_capital: Optional[float] = None
    equity_contribution: Optional[float] = None
    sector_id: Optional[str] = "dairy-processing"
    total_project_cost: Optional[float] = None
    desired_loan_term_years: Optional[int] = None
    estimated_monthly_revenue: Optional[float] = None
    location: Optional[AnalysisLocation] = None
    business: Optional[BusinessInput] = None
    finance: Optional[FinancialInput] = None

    def get_margin_capital(self) -> Optional[float]:
        if self.margin_capital is not None:
            return float(self.margin_capital)
        if self.equity_contribution is not None:
            return float(self.equity_contribution)
        if self.finance and self.finance.marginCapital is not None:
            return float(self.finance.marginCapital)
        return None

    def get_sector_id(self) -> str:
        return self.sector_id or (self.business.sectorId if self.business else "dairy-processing") or "dairy-processing"

class ProjectCostBreakdown(BaseModel):
    category: str
    amount: float
    percentage: float
    description: str

class YearlyProjections(BaseModel):
    year: int
    revenue: float
    opex: float
    net_profit: float
    cash_flow: float

class FinancialResponse(BaseModel):
    total_project_cost: float
    equity_contribution: float
    required_loan_amount: float
    track: str
    interest_rate_pct: float
    tenure_years: int
    tenure_months: int
    moratorium_months: int
    monthly_emi_est: float
    dscr: float
    is_exceeding_max_cost: bool = False
    is_exceeding_cap: bool = False
    capex_breakdown: List[ProjectCostBreakdown]
    opex_monthly_breakdown: List[ProjectCostBreakdown]
    working_capital_required: float
    three_year_projections: List[YearlyProjections]
    is_fallback: bool = False
    source: str = "backend"
    disclaimer: str = "SIH 26091 Illustrative Financial Scenario — Prototype Estimate"

# ----------------------------------------------------
# 7. Scheme Routing Schemas (Task 6)
# ----------------------------------------------------

class SchemeRoutingRequest(BaseModel):
    sector_id: Optional[str] = "dairy-processing"
    district_id: Optional[str] = "varanasi-up"
    investment_amount: Optional[float] = None
    margin_capital: Optional[float] = None
    gender: Optional[str] = "general"
    social_category: Optional[str] = "general"
    is_differently_abled: Optional[bool] = False
    is_rural: Optional[bool] = True
    business_idea: Optional[str] = None
    location: Optional[AnalysisLocation] = None
    business: Optional[BusinessInput] = None
    finance: Optional[FinancialInput] = None

    def get_margin_capital(self) -> Optional[float]:
        if self.margin_capital is not None:
            return float(self.margin_capital)
        if self.investment_amount is not None:
            return float(self.investment_amount)
        if self.finance and self.finance.marginCapital is not None:
            return float(self.finance.marginCapital)
        return None

class SchemeDetail(BaseModel):
    scheme_code: str
    scheme_name: str
    nodal_ministry: str
    subsidy_rate_pct: float
    max_loan_limit: float
    max_subsidy_amount: float
    match_score: float
    eligibility_status: str
    key_benefits: List[str]
    required_documents: List[str]
    application_portal_url: str

class SchemeRoutingResponse(BaseModel):
    track_code: str
    track_title: str
    track_description: str
    project_cost: float
    margin_capital: float
    loan_amount: float
    statutory_tenure_years: int
    statutory_moratorium_months: int
    statutory_interest_rate_pct: float
    recommended_schemes: List[SchemeDetail]
    best_matching_scheme: Optional[SchemeDetail] = None
    is_exceeding_ceiling: bool = False
    is_out_of_boundary: bool = False
    is_fallback: bool = False
    source: str = "backend"
    disclaimer: str = "Prototype Scheme Routing Guidance — Official Sanction by Lender Only"

# ----------------------------------------------------
# 8. Advisory Schemas (Task 7)
# ----------------------------------------------------

class AdvisoryRequest(BaseModel):
    session: Optional[Dict[str, Any]] = None
    market: Optional[Dict[str, Any]] = None
    feasibility: Optional[Dict[str, Any]] = None
    financial: Optional[Dict[str, Any]] = None
    scheme: Optional[Dict[str, Any]] = None
    # Flat parameters for backward compatibility
    sector_id: Optional[str] = None
    district_id: Optional[str] = None
    entrepreneur_name: Optional[str] = "Udyami"
    proposed_capital: Optional[float] = None
    gender: Optional[str] = "general"
    social_category: Optional[str] = "general"
    experience_years: Optional[float] = 0

class RecommendationItem(BaseModel):
    category: str
    priority: str
    title: str
    why: str
    action: str
    source: str

class AdvisoryResponse(BaseModel):
    executive_summary: str
    strengths: List[str]
    risks: List[str]
    recommendations: List[RecommendationItem]
    action_roadmap: List[Dict[str, Any]]
    validation_questions: List[Dict[str, Any]]
    is_fallback: bool = False
    source: str = "backend"
    disclaimer: str = "Deterministic Prototype Advisory — Non-Guarantee Guidance"

# ----------------------------------------------------
# 9. Business Launch Plan Schemas (Task 8)
# ----------------------------------------------------

class BusinessPlanRequest(BaseModel):
    session: Optional[Dict[str, Any]] = None
    market: Optional[Dict[str, Any]] = None
    feasibility: Optional[Dict[str, Any]] = None
    financial: Optional[Dict[str, Any]] = None
    scheme: Optional[Dict[str, Any]] = None
    advisory: Optional[Dict[str, Any]] = None

class BusinessPlanResponse(BaseModel):
    overview: Dict[str, Any]
    readiness: Dict[str, Any]
    recommendations: List[Dict[str, Any]]
    checklist: Dict[str, Any]
    sequence: List[Dict[str, Any]]
    milestones: List[Dict[str, Any]]
    risk_control: List[Dict[str, Any]]
    financial_preparation: Dict[str, Any]
    financing_follow_up: Dict[str, Any]
    validation_questions: List[Dict[str, Any]]
    source_coverage: Dict[str, Any]
    is_fallback: bool = False
    source: str = "backend"
    disclaimer: str = "Evidence-Derived Business Launch Blueprint — Prototype Pre-Launch Guidance"
