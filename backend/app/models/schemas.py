from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

# Base Models
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

# Market Intelligence
class MarketAnalysisRequest(BaseModel):
    sector_id: str
    district_id: str
    investment_amount: float
    target_scale: Optional[str] = "micro" # micro, small, medium

class DemographicInsight(BaseModel):
    segment: str
    percentage: float
    buying_power: str
    needs: List[str]

class CompetitorInfo(BaseModel):
    type: str
    threat_level: str # Low, Medium, High
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
    demand_index: float # 0 to 100
    demand_trend: str # Growing, Stable, High Demand
    raw_material_availability: str # High, Moderate, Seasonal
    competition_density: str # Low, Moderate, High
    target_demographics: List[DemographicInsight]
    competitors: List[CompetitorInfo]
    pricing_benchmarks: List[PricingBenchmark]
    growth_drivers: List[str]
    challenges: List[str]

# Feasibility Engine
class FeasibilityRequest(BaseModel):
    sector_id: str
    district_id: str
    proposed_capital: float
    prior_experience_years: float = 0
    land_available: bool = True
    electricity_water_access: bool = True

class RiskFactor(BaseModel):
    risk_name: str
    category: str # Market, Operational, Financial, Seasonal
    severity: str # Low, Medium, High
    mitigation_strategy: str

class FeasibilityResponse(BaseModel):
    sector_name: str
    district_name: str
    feasibility_score: float # 0 to 100
    feasibility_grade: str # A+, A, B, C
    location_suitability: float # 0 to 100
    skill_readiness_score: float # 0 to 100
    estimated_breakeven_months: int
    recommended_min_capital: float
    capital_adequacy: str # Sufficient, Slightly Deficit, Deficit
    risks: List[RiskFactor]
    key_recommendations: List[str]

# Financial Calculations
class FinancialRequest(BaseModel):
    sector_id: str
    total_project_cost: float
    equity_contribution: float
    desired_loan_term_years: int = 5
    estimated_monthly_revenue: float

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
    capex_breakdown: List[ProjectCostBreakdown]
    opex_monthly_breakdown: List[ProjectCostBreakdown]
    working_capital_required: float
    monthly_emi_est: float
    projected_annual_roi_pct: float
    dscr: float # Debt Service Coverage Ratio
    three_year_projections: List[YearlyProjections]
    estimated_subsidy_percentage: float
    net_effective_loan: float

# Scheme Routing
class SchemeRoutingRequest(BaseModel):
    sector_id: str
    district_id: str
    investment_amount: float
    gender: str = "general" # male, female, transgender
    social_category: str = "general" # general, obc, sc, st, minority
    is_differently_abled: bool = False
    is_rural: bool = True

class SchemeDetail(BaseModel):
    scheme_code: str
    scheme_name: str
    nodal_ministry: str
    subsidy_rate_pct: float
    max_loan_limit: float
    max_subsidy_amount: float
    match_score: float # 0 to 100
    eligibility_status: str # Eligible, High Match, Conditional
    key_benefits: List[str]
    required_documents: List[str]
    application_portal_url: str

class SchemeRoutingResponse(BaseModel):
    recommended_schemes: List[SchemeDetail]
    best_matching_scheme: SchemeDetail
    total_potential_subsidy: float

# Full Advisory Roadmap
class AdvisoryRequest(BaseModel):
    sector_id: str
    district_id: str
    entrepreneur_name: str = "Udyami"
    proposed_capital: float
    gender: str = "general"
    social_category: str = "general"
    experience_years: float = 0
    language_preference: str = "hi" # hi, en, regional

class ComplianceItem(BaseModel):
    title: str
    authority: str
    mandatory: bool
    estimated_time_days: int
    estimated_cost_inr: float
    guidance: str

class ActionStep(BaseModel):
    phase: str # Phase 1: Setup, Phase 2: Operations, Phase 3: Scale
    step_number: int
    title: str
    description: str
    estimated_days: int

class AdvisoryResponse(BaseModel):
    entrepreneur_name: str
    business_title: str
    sector_name: str
    location_display: str
    executive_summary: str
    feasibility: FeasibilityResponse
    market_intelligence: MarketAnalysisResponse
    financial_structure: FinancialResponse
    matching_schemes: SchemeRoutingResponse
    compliance_checklist: List[ComplianceItem]
    roadmap_steps: List[ActionStep]
    voice_script_summary: Dict[str, str] # localized voice guidance prompts
