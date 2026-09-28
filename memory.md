# UdyamSetu AI — Project Memory & Decision Log

## 1. Project Identification
- **Project**: UdyamSetu AI
- **SIH Problem Statement**: SIH 26091 — AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs
- **Tagline**: From Local Insight to Sustainable Enterprise
- **Nodal Ministry**: Ministry of Social Justice and Empowerment
- **Current Development Stage**: Task 2 — Entrepreneur Input & Analysis Session Workflow

---

## 2. Key Architectural Decisions

1. **Frontend Architecture**:
   - Built on React 19, Vite, Tailwind CSS v4, and React Router v7.
   - Decoupled into `components/`, `layouts/`, `pages/`, `services/`, `hooks/`, and `utils/`.
   - Strict UI presentation focus: UI components do not contain financial formulas, lending math, or business domain rules.
   - Visual identity uses professional government/startup styling: Deep green primary, white/cream surfaces, restrained orange accent.

2. **Analysis Session & State Persistence (Task 2)**:
   - Analysis Session is standardized across the multi-stage pipeline via `frontend/src/services/sessionService.js` and `frontend/src/hooks/useAnalysisSession.js`.
   - Persistence uses `localStorage` under key `udyamsetu_analysis_session`.
   - Session schema:
     ```json
     {
       "sessionId": "session_timestamp_random",
       "createdAt": "ISO-8601",
       "updatedAt": "ISO-8601",
       "status": "ACTIVE_INTAKE",
       "location": {
         "state": "Uttar Pradesh",
         "district": "Varanasi",
         "districtId": "varanasi-up",
         "blockOrLocality": "Kashi Vidyapeeth",
         "tier": "Tier-2 / Peri-Urban"
       },
       "business": {
         "category": "Agri & Allied",
         "sectorId": "dairy-processing",
         "sectorName": "Dairy & Milk Value Addition",
         "idea": "Village cold storage & chilling center",
         "isCustom": false
       },
       "finance": {
         "marginCapital": 300000,
         "estimatedProjectCost": 3000000,
         "estimatedLoanAmount": 2700000,
         "financingTrack": "Term Loan"
       },
       "entrepreneurContext": {
         "name": "Ramesh Sharma",
         "gender": "general",
         "socialCategory": "obc",
         "areaContext": "rural"
       }
     }
     ```
   - Downstream route guards: Direct navigation to `/market-analysis` without an active session presents an informative empty-state ("Start a business analysis first") with CTA to `/new-analysis`.

3. **Backend Architecture**:
   - Python FastAPI application serving clean RESTful endpoints over `/api/v1`.
   - Modular engine pattern: `market_engine.py`, `feasibility_engine.py`, `financial_engine.py`, `scheme_engine.py`, and `advisory_engine.py`.
   - Strict schema validation using Pydantic v2.
   - Abstracted `DataService` decoupling engine logic from the storage layer.

4. **Service Layer Contract**:
   - Frontend components access backend data exclusively through `services/*.js`.
   - Built-in resilient client fallback allows offline demonstration and graceful degradation.

5. **Data Fidelity & Integrity Principles**:
   - Demo, synthetic, and representative benchmarks are strictly marked as such.
   - Never fabricate or present demo data as live official government statistics.
   - Clear disclaimers indicating that actual loan sanction and subsidy disbursals require formal verification with official nodal portals.

6. **Version Control Protocol**:
   - All Git actions (init, add, commit, push, branch, reset) are under manual user control.
   - AI agents are strictly prohibited from executing automatic git operations.

---

## 3. Financial Framework (SIH 26091 Problem Statement Guidelines)

The core financial structuring logic is derived from the official Smart India Hackathon problem statement specifications:

### 3.1 Project Sizing & Margin Capital Formula
- **Project Cost Formula**:
  $$\text{Project Cost} = \frac{\text{Available Margin Capital}}{0.10}$$
- **Loan Requirement Formula**:
  $$\text{Loan} = \text{Project Cost} \times 0.90$$

### 3.2 Micro Finance Track
- **Project Cost Ceiling**: Up to ₹1.40 Lakh (₹140,000)
- **Maximum Loan**: ₹1.25 Lakh (₹125,000)
- **Financing Ratio**: Up to 90% of Project Cost
- **Interest Rate**: 6.5% p.a.
- **Repayment Tenure**: 3 Years (36 Months)
- **Moratorium Period**: 3 Months

### 3.3 Term Loan Track
- **Project Cost Range**: Above ₹1.40 Lakh and up to ₹50 Lakh (₹5,000,000)
- **Maximum Loan**: Up to ₹45 Lakh (₹4,500,000)
- **Financing Ratio**: Up to 90% of Project Cost
- **Interest Rate**: 8.0% p.a.
- **Repayment Tenure**: 7 Years (84 Months)
- **Moratorium Period**: 6 Months

> **Note on Verification**: These specific loan thresholds, rates, and moratorium periods are defined by the SIH 26091 challenge specification for rural micro-enterprises and must be explicitly contextualized as challenge framework guidelines rather than universal statutory banking rules.

---

## 4. Preservation & Invariance Rules

- **Preserve Task-0 Backend**: All 5 engines (`market_engine.py`, `feasibility_engine.py`, `financial_engine.py`, `scheme_engine.py`, `advisory_engine.py`), `main.py`, `router.py`, and supporting services remain functional and backward-compatible.
- **Maintain Route Compatibility**: Ensure both legacy routes (`/market-intelligence`, `/financials`, `/schemes`, `/advisory`) and standard Task-1 routes (`/new-analysis`, `/market-analysis`, `/feasibility`, `/financial-plan`, `/scheme-router`, `/business-plan`) work cleanly.
- **Document Changes**: Any change to API contracts or financial thresholds must be logged in `memory.md` and `architecture.md`.
