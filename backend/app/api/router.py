from typing import List
from fastapi import APIRouter, HTTPException, Request, status
from fastapi.responses import JSONResponse

from app.models.schemas import (
    HealthResponse,
    SectorItem, DistrictItem,
    MarketAnalysisRequest, MarketAnalysisResponse,
    FeasibilityRequest, FeasibilityResponse,
    FinancialRequest, FinancialResponse,
    SchemeRoutingRequest, SchemeRoutingResponse,
    AdvisoryRequest, AdvisoryResponse,
    BusinessPlanRequest, BusinessPlanResponse
)
from app.services.data_service import DataService
from app.engines.market_engine import MarketIntelligenceEngine
from app.engines.feasibility_engine import FeasibilityEngine
from app.engines.financial_engine import FinancialCalculationEngine
from app.engines.scheme_engine import SchemeRoutingEngine
from app.engines.advisory_engine import AdvisoryGenerationEngine
from app.engines.business_plan_engine import BusinessPlanEngine

api_router = APIRouter()

# ------------------------------------------------------------------
# Health Endpoint
# ------------------------------------------------------------------
@api_router.get("/health", response_model=HealthResponse, tags=["Health"])
def health_check():
    """
    Lightweight health check endpoint for frontend availability verification.
    """
    return HealthResponse(
        status="ok",
        service="udyamsetu-api",
        version="1.0.0"
    )

# ------------------------------------------------------------------
# Metadata Endpoints
# ------------------------------------------------------------------
@api_router.get("/sectors", response_model=List[SectorItem], tags=["Data"])
def list_sectors():
    return DataService.get_all_sectors()

@api_router.get("/districts", response_model=List[DistrictItem], tags=["Data"])
def list_districts():
    return DataService.get_all_districts()

# ------------------------------------------------------------------
# Stage 1: Market Intelligence Engine
# ------------------------------------------------------------------
@api_router.post("/market/analyze", response_model=MarketAnalysisResponse, tags=["Analysis Stages"])
@api_router.post("/market-intelligence/analyze", response_model=MarketAnalysisResponse, include_in_schema=False)
def analyze_market(request: MarketAnalysisRequest):
    """
    Hyper-local market demand, competitor landscape, and pricing benchmarks.
    """
    try:
        return MarketIntelligenceEngine.analyze_market(request)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "VALIDATION_ERROR", "message": str(e)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"code": "INTERNAL_ERROR", "message": "Failed to analyze market intelligence."}
        )

# ------------------------------------------------------------------
# Stage 2: Feasibility Engine
# ------------------------------------------------------------------
@api_router.post("/feasibility/analyze", response_model=FeasibilityResponse, tags=["Analysis Stages"])
@api_router.post("/feasibility/assess", response_model=FeasibilityResponse, include_in_schema=False)
def assess_feasibility(request: FeasibilityRequest):
    """
    Multi-dimensional operational and financial feasibility scoring (0–100).
    """
    try:
        return FeasibilityEngine.assess_feasibility(request)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "VALIDATION_ERROR", "message": str(e)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"code": "INTERNAL_ERROR", "message": "Failed to assess business feasibility."}
        )

# ------------------------------------------------------------------
# Stage 3: Financial Structuring Engine
# ------------------------------------------------------------------
@api_router.post("/financial/calculate", response_model=FinancialResponse, tags=["Analysis Stages"])
@api_router.post("/financials/calculate", response_model=FinancialResponse, include_in_schema=False)
def calculate_financials(request: FinancialRequest):
    """
    Deterministic SIH 26091 financial model: CapEx, OpEx, reducing EMI, and DSCR.
    """
    try:
        return FinancialCalculationEngine.calculate_financials(request)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "VALIDATION_ERROR", "message": str(e)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"code": "INTERNAL_ERROR", "message": "Failed to calculate financial structuring."}
        )

# ------------------------------------------------------------------
# Stage 4: Government Scheme Router
# ------------------------------------------------------------------
@api_router.post("/scheme/route", response_model=SchemeRoutingResponse, tags=["Analysis Stages"])
@api_router.post("/schemes/route", response_model=SchemeRoutingResponse, include_in_schema=False)
def route_schemes(request: SchemeRoutingRequest):
    """
    Matches credit tracks (Micro Finance vs. Term Loan) and applicable central/state schemes.
    """
    try:
        return SchemeRoutingEngine.route_schemes(request)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "VALIDATION_ERROR", "message": str(e)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"code": "INTERNAL_ERROR", "message": "Failed to route government schemes."}
        )

# ------------------------------------------------------------------
# Stage 5: Strategic Business Advisory
# ------------------------------------------------------------------
@api_router.post("/advisory/generate", response_model=AdvisoryResponse, tags=["Analysis Stages"])
def generate_advisory(request: AdvisoryRequest):
    """
    Synthesizes upstream intelligence into explainable, evidence-backed recommendations and roadmap.
    """
    try:
        return AdvisoryGenerationEngine.generate_advisory(request)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "VALIDATION_ERROR", "message": str(e)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"code": "INTERNAL_ERROR", "message": "Failed to generate business advisory."}
        )

# ------------------------------------------------------------------
# Stage 6: Business Launch Plan
# ------------------------------------------------------------------
@api_router.post("/business-plan/generate", response_model=BusinessPlanResponse, tags=["Analysis Stages"])
def generate_business_plan(request: BusinessPlanRequest):
    """
    Synthesizes full evidence-backed pre-launch blueprint and execution checklists.
    """
    try:
        return BusinessPlanEngine.generate_launch_plan(request)
    except ValueError as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail={"code": "VALIDATION_ERROR", "message": str(e)}
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail={"code": "INTERNAL_ERROR", "message": "Failed to generate business launch plan."}
        )
