import os
from typing import List
from dotenv import load_dotenv
from fastapi import FastAPI, Request, HTTPException, status
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from app.api.router import api_router

# Load environment configuration
load_dotenv()

app = FastAPI(
    title="UdyamSetu AI Engine API",
    description="AI-Driven Hyper-Local Business Advisory & Financial Structuring Assistant for Rural Micro-Entrepreneurs (SIH 26091)",
    version="1.0.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# ------------------------------------------------------------------
# CORS Configuration
# ------------------------------------------------------------------
env_origins = os.getenv("CORS_ORIGINS", "http://localhost:5173,http://127.0.0.1:5173,http://localhost:3000")
allowed_origins: List[str] = [origin.strip() for origin in env_origins.split(",") if origin.strip()]

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)

# ------------------------------------------------------------------
# Uniform Error Handlers
# ------------------------------------------------------------------
@app.exception_handler(HTTPException)
async def http_exception_handler(request: Request, exc: HTTPException):
    detail = exc.detail
    if isinstance(detail, dict) and "code" in detail and "message" in detail:
        code = detail["code"]
        message = detail["message"]
    else:
        code = "HTTP_ERROR" if exc.status_code != 404 else "NOT_FOUND"
        message = str(detail)

    return JSONResponse(
        status_code=exc.status_code,
        content={"error": {"code": code, "message": message}}
    )

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    errors = exc.errors()
    first_msg = errors[0].get("msg", "Invalid request parameter") if errors else "Validation failed"
    loc = " -> ".join(str(l) for l in errors[0].get("loc", [])) if errors else ""
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "error": {
                "code": "VALIDATION_ERROR",
                "message": f"{first_msg} ({loc})" if loc else first_msg
            }
        }
    )

@app.exception_handler(Exception)
async def generic_exception_handler(request: Request, exc: Exception):
    return JSONResponse(
        status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
        content={
            "error": {
                "code": "INTERNAL_ERROR",
                "message": "An unexpected error occurred in the analysis engine."
            }
        }
    )

# ------------------------------------------------------------------
# Route Inclusions (Supporting /api, /api/v1, and /api/v1/api defensive prefixes)
# ------------------------------------------------------------------
app.include_router(api_router, prefix="/api")
app.include_router(api_router, prefix="/api/v1")
app.include_router(api_router, prefix="/api/v1/api")

@app.get("/", tags=["Root"])
def root():
    return {
        "message": "Welcome to UdyamSetu AI API Engine",
        "documentation": "/docs",
        "health": "/api/health",
        "sih_problem": "SIH 26091 - Rural Micro-Enterprise Advisory"
    }

if __name__ == "__main__":
    import uvicorn
    host = os.getenv("HOST", "127.0.0.1")
    port = int(os.getenv("PORT", 8000))
    uvicorn.run("app.main:app", host=host, port=port, reload=True)
