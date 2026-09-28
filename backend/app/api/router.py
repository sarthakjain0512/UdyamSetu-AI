from typing import List
from fastapi import APIRouter, HTTPException, Query
from app.models.schemas import (
    SectorItem, DistrictItem,
    MarketAnalysisRequest, MarketAnalysisResponse,
    FeasibilityRequest, FeasibilityResponse,
    FinancialRequest, FinancialResponse,
    SchemeRoutingRequest, SchemeRoutingResponse,
    AdvisoryRequest, AdvisoryResponse
)
from app.services.data_service import DataService
from app.engines.market_engine import MarketIntelligenceEngine
from app.engines.feasibility_engine import FeasibilityEngine
from app.engines.financial_engine import FinancialCalculationEngine
from app.engines.scheme_engine import SchemeRoutingEngine
from app.engines.advisory_engine import AdvisoryGenerationEngine

api_router = APIRouter(prefix="/v1")

@api_router.get("/health", tags=["Health"])
def health_check():
    return {
        "status": "healthy",
        "service": "UdyamSetu AI Backend Engine",
        "version": "1.0.0",
        "sih_problem_code": "SIH 26091"
    }

@api_router.get("/sectors", response_model=List[SectorItem], tags=["Data"])
def list_sectors():
    return DataService.get_all_sectors()

@api_router.get("/districts", response_model=List[DistrictItem], tags=["Data"])
def list_districts():
    return DataService.get_all_districts()

@api_router.post("/market-intelligence/analyze", response_model=MarketAnalysisResponse, tags=["Engines"])
def analyze_market_intelligence(request: MarketAnalysisRequest):
    try:
        return MarketIntelligenceEngine.analyze_market(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/feasibility/assess", response_model=FeasibilityResponse, tags=["Engines"])
def assess_feasibility(request: FeasibilityRequest):
    try:
        return FeasibilityEngine.assess_feasibility(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/financials/calculate", response_model=FinancialResponse, tags=["Engines"])
def calculate_financials(request: FinancialRequest):
    try:
        return FinancialCalculationEngine.calculate_financials(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/schemes/route", response_model=SchemeRoutingResponse, tags=["Engines"])
def route_schemes(request: SchemeRoutingRequest):
    try:
        return SchemeRoutingEngine.route_schemes(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@api_router.post("/advisory/generate", response_model=AdvisoryResponse, tags=["Engines"])
def generate_advisory(request: AdvisoryRequest):
    try:
        return AdvisoryGenerationEngine.generate_advisory(request)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
