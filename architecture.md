# UdyamSetu AI — System Architecture

## 1. System Overview & Data Flow

UdyamSetu AI is organized as a decoupled, multi-tiered application adhering to strict separation of concerns:

```
┌────────────────────────────────────────────────────────┐
│               React Frontend Presentation              │
│       (Components, Layouts, Navigation, Pages)         │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│             Frontend Service & Client Layer            │
│         (apiConfig.js, domain services, hooks)         │
└──────────────────────────┬─────────────────────────────┘
                           │ HTTP / JSON
                           ▼
┌────────────────────────────────────────────────────────┐
│                FastAPI Application Tier                │
│             (app/main.py, app/api/router.py)           │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│               Backend Service / Data Layer             │
│        (DataService abstraction, Pydantic Models)      │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│              Independent Business Engines              │
│   (market, feasibility, financial, scheme, advisory)   │
└──────────────────────────┬─────────────────────────────┘
                           │
                           ▼
┌────────────────────────────────────────────────────────┐
│                 Prototype Data Stores                  │
│       (sectors_db.py, districts_db.py, schemes_db.py)  │
└────────────────────────────────────────────────────────┘
```

---

## 2. Technology Stack

### 2.1 Frontend Tier
- **Framework**: React 19 (`react`, `react-dom`)
- **Build Tool**: Vite 8
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`, `tailwindcss`)
- **Routing**: React Router v7 (`react-router-dom`)
- **Data Visualization**: Recharts (`recharts`)
- **Iconography**: Lucide React (`lucide-react`)

### 2.2 Backend Tier
- **Language**: Python 3.10+
- **API Framework**: FastAPI (`fastapi`)
- **ASGI Server**: Uvicorn (`uvicorn`)
- **Data Validation & Schemas**: Pydantic v2 (`pydantic`)
- **Configuration**: python-dotenv (`python-dotenv`)

---

## 3. Repository Structure

The actual file tree discovered across the repository is structured as follows:

```text
UdyamSetu AI/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── router.py                 # FastAPI APIRouter registering /v1 endpoints
│   │   ├── data/                         # Modular demo repositories
│   │   │   ├── __init__.py
│   │   │   ├── districts_db.py           # District demographics, tiers & state mappings
│   │   │   ├── schemes_db.py             # Scheme criteria, subsidies & limits
│   │   │   └── sectors_db.py             # Micro sectors, investment ranges & parameters
│   │   ├── engines/                      # Domain-specific computational engines
│   │   │   ├── __init__.py
│   │   │   ├── advisory_engine.py        # 90-day plan & synthesis generation
│   │   │   ├── feasibility_engine.py     # Viability scoring & risk matrix
│   │   │   ├── financial_engine.py       # CapEx, OpEx, EMI, DSCR, 3-Yr projections
│   │   │   ├── market_engine.py          # Competition, demand, pricing index
│   │   │   └── scheme_engine.py          # Eligibility & subsidy calculation
│   │   ├── models/
│   │   │   ├── __init__.py
│   │   │   └── schemas.py                # Pydantic request & response schemas
│   │   ├── services/
│   │   │   ├── __init__.py
│   │   │   └── data_service.py           # Data access abstraction
│   │   ├── __init__.py
│   │   └── main.py                       # FastAPI entry point & CORS configuration
│   ├── requirements.txt
│   └── .env.example
│
├── frontend/
│   ├── src/
│   │   ├── assets/                       # Static SVGs and icons
│   │   ├── components/                   # Presentation components
│   │   │   ├── analysis/
│   │   │   │   └── AnalysisSummaryCard.jsx# Live intake summary card
│   │   │   ├── financials/               # Financial Planning & Structuring components (Task 5)
│   │   │   │   ├── CashFlowDscrSection.jsx
│   │   │   │   ├── EmiMoratoriumCard.jsx
│   │   │   │   ├── FinancialAssumptionsPanel.jsx
│   │   │   │   ├── FinancialChartsSection.jsx
│   │   │   │   ├── FinancialOverviewSection.jsx
│   │   │   │   ├── FinancialRecommendationsSection.jsx
│   │   │   │   ├── FinancialRisksSection.jsx
│   │   │   │   ├── FinancialSensitivitySection.jsx
│   │   │   │   └── RepaymentScheduleSection.jsx
│   │   │   ├── feasibility/              # Feasibility Analysis components (Task 4)
│   │   │   │   ├── BreakEvenInsightSection.jsx
│   │   │   │   ├── FeasibilityDimensionsGrid.jsx
│   │   │   │   ├── FeasibilityExplainabilityPanel.jsx
│   │   │   │   ├── FeasibilityOverviewCard.jsx
│   │   │   │   ├── FeasibilityRecommendationsSection.jsx
│   │   │   │   ├── FeasibilityRiskMatrix.jsx
│   │   │   │   ├── FinancialReadinessSection.jsx
│   │   │   │   ├── KeyGapsSection.jsx
│   │   │   │   ├── MarketFitSection.jsx
│   │   │   │   ├── OperationalReadinessSection.jsx
│   │   │   │   └── ResourceRequirementsSection.jsx
│   │   │   ├── schemes/                  # Smart Scheme Router components (Task 6)
│   │   │   │   ├── AnalysisContextBanner.jsx
│   │   │   │   ├── DocumentChecklistSection.jsx
│   │   │   │   ├── FinancingSummaryCard.jsx
│   │   │   │   ├── NodalSchemesSection.jsx
│   │   │   │   ├── OfficialDisclaimerCard.jsx
│   │   │   │   ├── PrototypeRouteCard.jsx
│   │   │   │   ├── SchemeTaxonomyPanel.jsx
│   │   │   │   ├── SchemeWarningsSection.jsx
│   │   │   │   ├── VerificationChecklistSection.jsx
│   │   │   ├── advisory/                 # AI-Assisted Business Advisory components (Task 7)
│   │   │   │   ├── AdvisoryActionPlanSection.jsx
│   │   │   │   ├── AdvisoryAssumptionsPanel.jsx
│   │   │   │   ├── AdvisoryContextBanner.jsx
│   │   │   │   ├── AdvisoryDisclaimerCard.jsx
│   │   │   │   ├── AdvisoryRecommendationsSection.jsx
│   │   │   │   ├── AdvisoryRisksSection.jsx
│   │   │   │   ├── AdvisoryStrengthsSection.jsx
│   │   │   │   ├── AdvisorySummaryCard.jsx
│   │   │   │   ├── AnalysisCoverageCard.jsx
│   │   │   │   └── ValidationQuestionsSection.jsx
│   │   │   ├── market/                   # Hyper-local Market Intelligence components
│   │   │   │   ├── CompetitionSection.jsx
│   │   │   │   ├── DataMethodologyPanel.jsx
│   │   │   │   ├── DemandOpportunitySection.jsx
│   │   │   │   ├── MarketInsightSummary.jsx
│   │   │   │   ├── MarketSnapshotCard.jsx
│   │   │   │   ├── MarketThreatsSection.jsx
│   │   │   │   ├── OpportunityFactorsSection.jsx
│   │   │   │   ├── ProductMarketValueSection.jsx
│   │   │   │   └── SWOTSection.jsx
│   │   │   │   ├── business-plan/        # Task 8 Business Launch Plan components
│   │   │   │   │   ├── BusinessOverviewCard.jsx
│   │   │   │   │   ├── LaunchReadinessCard.jsx
│   │   │   │   │   ├── LaunchRecommendations.jsx
│   │   │   │   │   ├── LaunchChecklist.jsx
│   │   │   │   │   ├── LaunchSequence.jsx
│   │   │   │   │   ├── LaunchMilestones.jsx
│   │   │   │   │   ├── RiskControlPlan.jsx
│   │   │   │   │   ├── FinancialPreparationCard.jsx
│   │   │   │   │   ├── FinancingFollowUpCard.jsx
│   │   │   │   │   ├── ValidationQuestionsCard.jsx
│   │   │   │   │   └── BusinessPlanTransparency.jsx
│   │   │   └── common/
│   │   │       ├── Footer.jsx            # Application footer
│   │   │       ├── MetricCard.jsx        # Data visualization card
│   │   │       ├── Navbar.jsx            # Responsive navigation bar
│   │   │       └── VoiceAssistantModal.jsx# Vernacular voice prompt modal
│   │   ├── data/                         # Resilient client fallback datasets
│   │   │   ├── fallbackDistricts.js
│   │   │   ├── fallbackFeasibilityData.js # Deterministic feasibility readiness & scoring
│   │   │   ├── fallbackMarketData.js     # Deterministic market SWOT, threats & metrics
│   │   │   └── fallbackSectors.js
│   │   ├── hooks/                        # React hooks for API lifecycle management
│   │   │   ├── useAnalysisSession.js     # Analysis session access & persistence hook
│   │   │   ├── useAdvisory.js
│   │   │   ├── useBusinessPlan.js        # Business Launch Plan lifecycle hook (Task 8)
│   │   │   ├── useFeasibility.js
│   │   │   ├── useFinancials.js
│   │   │   ├── useMarketIntelligence.js
│   │   │   ├── useSchemeRouter.js        # Deterministic scheme routing hook (Task 6)
│   │   │   ├── useSchemes.js
│   │   │   └── useSectors.js
│   │   ├── layouts/
│   │   │   └── RootLayout.jsx            # Master shell layout with header & footer
│   │   ├── pages/                        # Route page views
│   │   │   ├── AdvisoryPage.jsx          # /advisory (Module 5: AI Advisory)
│   │   │   ├── BusinessPlanPage.jsx      # /business-plan (Module 6: Business Launch Plan - Task 8)
│   │   │   ├── FeasibilityPage.jsx       # /feasibility
│   │   │   ├── FinancialsPage.jsx        # /financial-plan & /financials
│   │   │   ├── FullAdvisoryPage.jsx      # /full-advisory (Legacy Task-0 Blueprint)
│   │   │   ├── HomePage.jsx              # / (Dashboard)
│   │   │   ├── MarketIntelligencePage.jsx# /market-analysis & /market-intelligence
│   │   │   ├── NewAnalysisPage.jsx       # /new-analysis (Intake flow)
│   │   │   ├── NotFoundPage.jsx          # Catch-all 404
│   │   │   └── SchemeRouterPage.jsx      # /scheme-router & /schemes
│   │   ├── services/                     # Decoupled API service layer
│   │   │   ├── advisoryService.js        # Advisory synthesis & API calls with fallback
│   │   │   ├── apiConfig.js              # Base API configuration & client
│   │   │   ├── businessPlanService.js    # Business Launch Plan service (Task 8)
│   │   │   ├── feasibilityService.js     # Feasibility API calls with fallback
│   │   │   ├── financialService.js       # Financial calculations API calls with fallback
│   │   │   ├── marketService.js          # Market intelligence API calls with fallback
│   │   │   ├── schemeService.js          # Scheme router API calls with fallback
│   │   │   ├── sectorService.js          # Sector & district metadata API calls with fallback
│   │   │   └── sessionService.js         # Client-side analysis session persistence & schema
│   │   ├── utils/                        # Utilities & formatters
│   │   │   ├── advisoryEngine.js         # Deterministic SIH 26091 business advisory engine (Task 7)
│   │   │   ├── businessPlanEngine.js     # Deterministic SIH 26091 launch plan synthesis engine (Task 8)
│   │   │   ├── financialCalculator.js    # Deterministic SIH 26091 financial planning engine
│   │   │   ├── financialPreview.js       # Sizing preview calculator (SIH 26091)
│   │   │   ├── formatters.js             # Currency and number formatters
│   │   │   └── schemeRouterEngine.js     # Deterministic SIH 26091 scheme routing engine (Task 6)
│   │   ├── App.css
│   │   ├── App.jsx                       # Route provider & shell mapping
│   │   ├── index.css                     # Global styles and design system variables
│   │   └── main.jsx                      # React 19 entry point
│   ├── package.json
│   └── vite.config.js
│
├── AGENTS.md                             # AI Agent operating directives
├── architecture.md                       # Current system architecture documentation
├── memory.md                             # Persistent project memory & decision log
├── prd.md                                # Product Requirements Document
├── README.md
└── .gitignore
```

---

## 4. Backend Engines Specification

1. **`market_engine.py` (`MarketIntelligenceEngine`)**:
   - Evaluates local competition, raw material access, demand level, and mandi price ranges based on district tier and target sector.
2. **`feasibility_engine.py` (`FeasibilityEngine`)**:
   - Assesses operational viability (0–100 score), infrastructure readiness, regulatory hurdles, and risk mitigation strategies.
3. **`financial_engine.py` (`FinancialCalculationEngine`)**:
   - Computes CapEx (machinery, civil, licensing), monthly OpEx, required working capital, EMI, DSCR, and 3-year cash flow forecast.
4. **`scheme_engine.py` (`SchemeRoutingEngine`)**:
   - Matches candidate profile with government credit schemes (PMEGP, Mudra Shishu/Kishor/Tarun, PMFME, Stand-Up India), factoring in social category and gender bonuses.
5. **`advisory_engine.py` (`AdvisoryGenerationEngine`)**:
   - Compiles executive findings, SWOT analysis, and a structured 90-day phase-by-phase implementation blueprint.

---

## 5. Frontend Service Layer

All backend interactions are strictly abstracted through dedicated frontend services:
- **`apiClient.js`**: Centralized HTTP client managing base URL resolution (`VITE_API_BASE_URL`), timeout handling via `AbortController`, JSON unwrapping, error normalization (`VALIDATION_ERROR`, `BACKEND_UNAVAILABLE`), and health checks.
- **`apiConfig.js`**: Backward-compatibility wrapper forwarding to `apiClient.js`.
- **`sectorService.js`**: Fetches active micro sectors and supported districts via `/api/sectors` and `/api/districts`.
- **`marketService.js`**: Calls `/api/market/analyze` with deterministic local fallback.
- **`feasibilityService.js`**: Calls `/api/feasibility/analyze` with deterministic scoring fallback.
- **`financialService.js`**: Calls `/api/financial/calculate` with deterministic SIH 26091 financial model fallback.
- **`schemeService.js`**: Calls `/api/scheme/route` with deterministic SIH 26091 scheme router fallback.
- **`advisoryService.js`**: Calls `/api/advisory/generate` with deterministic advisory engine fallback.
- **`businessPlanService.js`**: Calls `/api/business-plan/generate` with deterministic launch plan engine fallback.
- **`analysisStateService.js`**: Centralized canonical persistence layer managing module outputs, deterministic input fingerprints, stale data detection, and merge updates under `udyamsetu_analysis_session`.
- **`sessionService.js`**: Manages client-side analysis session persistence under `udyamsetu_analysis_session`, enforcing normalized schema across all downstream advisory stages.

Each service attempts the FastAPI backend first; if the backend is unavailable or returns an error, it falls back cleanly to the verified deterministic prototype engine, tagging the data with `source: "backend"` or `source: "prototype-fallback"`.

---

## 6. End-to-End Workflow Integration & State Persistence (Task 9)

### 6.1 Canonical Session Architecture
All six analytical stages and the initial intake belong to a unified canonical session stored under a single localStorage key (`udyamsetu_analysis_session`):

```javascript
{
  version: 2,
  sessionId: "session_...",
  createdAt: "ISO_DATE",
  updatedAt: "ISO_DATE",
  intake: {
    location: { state, district, districtId, blockOrLocality, tier },
    business: { category, sectorId, sectorName, idea, isCustom },
    finance: { marginCapital, estimatedProjectCost, estimatedLoanAmount },
    entrepreneurContext: { name, gender, socialCategory, areaContext }
  },
  // Canonical location, business, finance mirrors intake for backward compatibility
  location: { ... },
  business: { ... },
  finance: { ... },
  entrepreneurContext: { ... },
  analysis: {
    market: { inputFingerprint: "...", generatedAt: "...", data: { ... } },
    feasibility: { inputFingerprint: "...", generatedAt: "...", data: { ... } },
    financial: { inputFingerprint: "...", generatedAt: "...", data: { ... } },
    scheme: { inputFingerprint: "...", generatedAt: "...", data: { ... } },
    advisory: { inputFingerprint: "...", generatedAt: "...", data: { ... } },
    businessPlan: { inputFingerprint: "...", generatedAt: "...", data: { ... } }
  }
}
```

### 6.2 Deterministic Input Fingerprinting & Stale Data Protection
To prevent displaying stale analysis when an entrepreneur changes their business inputs, `analysisStateService.js` computes deterministic input fingerprints:
- **Global Input Fingerprint**: Normalized hash combining `state`, `districtId`, `locality`, `sectorId`, `idea`, and `marginCapital`.
- **Market & Feasibility Sensitivity**: Any change to location, category, or business idea invalidates market and feasibility outputs.
- **Capital Sensitivity**: Any change to `marginCapital` invalidates financial planning, scheme routing, strategic advisory, and business launch plan outputs.
- Stale outputs are marked with `isStale: true` and status `"stale"` (`Needs Refresh`), displaying a prominent `StaleAnalysisAlert` banner with a one-click "Refresh Analysis" trigger.

### 6.3 Module Status Model
Module statuses are derived dynamically from stored data:
1. `completed`: Valid output exists matching current intake fingerprint.
2. `stale`: Output exists but was generated with earlier inputs.
3. `not_started`: Session exists but module has not been run.
4. `unavailable`: Prerequisite inputs or upstream data are missing.

### 6.4 Direct URL & Browser Refresh Recovery
- No analysis state relies solely on transient React memory or route parameters (`location.state`).
- Direct URL access to `/market-analysis`, `/feasibility`, `/financial-plan`, `/scheme-router`, `/advisory`, or `/business-plan` resolves directly from `analysisStateService.js`.
- If no session exists, the page renders a structured "Session Required" card guiding the user to `/new-analysis`.
- If upstream data is incomplete, missing sections display informative "Not available from current analysis" indicators rather than fabricated results.

---

## 8. Backend API Integration & Resilience (Task 10)

### 8.1 API Contract & Registered Endpoints
The FastAPI backend (`backend/app/main.py`) exposes uniform endpoints registered under both `/api` and `/api/v1` prefixes:

| Endpoint | Method | Purpose | Engine / Handler |
|---|---|---|---|
| `/api/health` | `GET` | Health verification & backend liveness probe | `health_check()` |
| `/api/sectors` | `GET` | Supported micro-enterprise sectors | `DataService.get_all_sectors()` |
| `/api/districts` | `GET` | Supported rural district profiles | `DataService.get_all_districts()` |
| `/api/market/analyze` | `POST` | Stage 1: Market demand & competition analysis | `MarketIntelligenceEngine` |
| `/api/feasibility/analyze` | `POST` | Stage 2: Operational readiness & scoring (0–100) | `FeasibilityEngine` |
| `/api/financial/calculate` | `POST` | Stage 3: SIH 26091 financial model & EMI schedule | `FinancialCalculationEngine` |
| `/api/scheme/route` | `POST` | Stage 4: Credit track & subsidy scheme matching | `SchemeRoutingEngine` |
| `/api/advisory/generate` | `POST` | Stage 5: Strategic advisory & execution roadmap | `AdvisoryGenerationEngine` |
| `/api/business-plan/generate` | `POST` | Stage 6: Business launch plan & milestone blueprint | `BusinessPlanEngine` |

### 8.2 Frontend API Client (`apiClient.js`)
- **Centralized Fetch Wrapper**: Replaces raw `fetch` calls across all services.
- **Base URL Resolution**: Defaults to `http://127.0.0.1:8000`, overridable via `VITE_API_BASE_URL`.
- **Request Timeout**: 4000ms timeout using `AbortController` preventing UI lockup.
- **Error Normalization**: Maps network failures to `BACKEND_UNAVAILABLE` and HTTP 400/422 to `VALIDATION_ERROR`.
- **Backend Availability Probe**: `apiClient.checkHealth(1500)` returns boolean health status.

### 8.3 Deterministic Fallback Strategy
To guarantee complete demo resilience during evaluative testing:
1. Every frontend service calls `apiClient.post(...)` first.
2. If the response succeeds, data is tagged with `source: "backend"` and `is_fallback: false`.
3. If the backend is unreachable or returns an error, the service invokes the verified local deterministic engine, tagging output with `source: "prototype-fallback"` and `is_fallback: true`.
4. Outputs are seamlessly persisted into `analysisStateService.js` regardless of origin.

---

## 9. Critical Architecture Rules

1. **Presentation Focus**: React components strictly handle user input, state transitions, layout, and visualization.
2. **No Duplicated Business Rules**: Financial formulas (EMI, DSCR, CapEx ratios, subsidy percentages) must never be re-implemented inside React components.
3. **Engine Independence**: Backend engines remain pure Python modules that do not depend on HTTP frameworks or database connections directly; they interface solely via typed Pydantic models.
4. **Service Abstraction**: Frontend pages never call `fetch()` directly; all API calls route through the service layer.

---

## 10. Future Scalability Roadmap

The current prototype is designed to transition smoothly to a full production deployment:
- **Relational Storage**: Replace in-memory dictionaries with a managed PostgreSQL database using SQLAlchemy / Alembic migrations.
- **Government Portals**: Direct integration with API Setu, Udyam, and JanSamarth via OAuth2 and mutual TLS.
- **Dynamic Geospatial Data**: Integration of GIS boundary layers and Agmarknet live price feeds.
- **Real LLM Integration**: Orchestration layer (LangChain / LlamaIndex) querying fine-tuned models for vernacular conversational advisory.
- **Authentication**: JWT-based session security with Aadhaar / mobile OTP verification.

