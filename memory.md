# UdyamSetu AI — Project Memory & Decision Log

## 1. Project Identification
- **Project**: UdyamSetu AI
- **SIH Problem Statement**: SIH 26091 — AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs
- **Tagline**: From Local Insight to Sustainable Enterprise
- **Nodal Ministry**: Ministry of Social Justice and Empowerment
- **Current Development Stage**: Task 5 — Financial Planning & Financial Structuring

---

## 2. Key Architectural Decisions

1. **Frontend Architecture**:
   - Built on React 19, Vite, Tailwind CSS v4, and React Router v7.
   - Decoupled into `components/`, `layouts/`, `pages/`, `services/`, `hooks/`, and `utils/`.
   - Strict UI presentation focus: UI components do not contain financial formulas, lending math, or business domain rules.
   - Visual identity uses professional government/startup styling: Deep green primary, white/cream surfaces, restrained orange accent.

2. **Hyper-Local Market Intelligence Module (Task 3)**:
   - Implemented 5–10 km illustrative market reach analysis adhering to SIH 26091 requirements.
   - Consumes the Task-2 `udyamsetu_analysis_session` directly; displays "Your Analysis" summary header with "Edit Analysis" shortcut.
   - Structured into 8 analytical sections:
     1. Local Market Snapshot (configurable 5 km / 10 km radius, locality tier, demand level, competition intensity)
     2. Demand Opportunity (qualitative categories, customer need signal, repeat purchase potential, accessibility, seasonal sensitivity)
     3. Competition Landscape (archetypes, threat levels, share estimates, differentiation opportunities without fake live map queries)
     4. Product Market Value (6 qualitative dimensions with documented evaluation methodology)
     5. Local Opportunity Factors (tailwinds, raw material aggregation, import substitution, ODOP subsidies)
     6. Hyper-Local SWOT Analysis (4-quadrant deterministic matrix tailored to rural micro-enterprise operations)
     7. Market Threats & Risk Matrix (Low / Moderate / High classification with actionable rural mitigation strategies)
     8. Market Opportunity Summary (synthesis with non-guarantee advisory disclaimers and CTA to Feasibility)
   - Data Provenance & Transparency: Dedicated `DataMethodologyPanel` clarifying that all indicators are illustrative models rather than live spatial queries; production deployment roadmap targets Agmarknet, Bhuvan, and LGD.

3. **Business Feasibility Analysis Module (Task 4)**:
   - Implemented `/feasibility` as an illustrative, deterministic, multi-dimensional feasibility assessment evaluating operational and financial readiness.
   - Strictly consumes `udyamsetu_analysis_session` from Task 2 (Location, Margin Capital, Business Category, Idea) and market signals from Task 3.
   - Enforces No-Session Guard with CTA to `/new-analysis`.
   - Structured into 11 logical sections:
     1. Feasibility Overview (`FeasibilityOverviewCard`: Overall Feasibility Indicator, Qualitative Status: Potentially Feasible / Needs Validation / Needs Significant Preparation / High Risk, Score 0-100, Grade, Executive Narrative, Non-Guarantee Disclaimer)
     2. Feasibility Dimensions (`FeasibilityDimensionsGrid`: Market Fit, Financial Readiness, Operational Readiness, Resource Feasibility, Risk Exposure & Control)
     3. Operational Readiness (`OperationalReadinessSection`: Raw Materials, Machinery, Skills, Infrastructure, Supply Chain, Distribution)
     4. Market Fit (`MarketFitSection`: Consumes Task-3 market intelligence signals directly)
     5. Financial Readiness (`FinancialReadinessSection`: Margin Capital, Project Cost = Margin / 0.10, Loan = 90%, Financing Track, Non-Sanction Heuristics)
     6. Resource Requirements Checklist (`ResourceRequirementsSection`: Capital, Equipment, Raw Materials, Workforce, Infrastructure, Licensing/Compliance)
     7. Break-Even Insight (`BreakEvenInsightSection`: Monthly fixed cost, contribution margin %, indicative break-even horizon)
     8. Risk Assessment Matrix (`FeasibilityRiskMatrix`: Market, Financial, Operational, Supply, Customer Acquisition, Seasonal Risk with Low/Moderate/High ratings & rural mitigations)
     9. Key Gaps (`KeyGapsSection`: Critical operational hurdles derived deterministically from capital ratio and market density)
     10. Feasibility Recommendations (`FeasibilityRecommendationsSection`: 6 practical preparatory milestones)
     11. Next Step Navigation (Primary: Continue to Financial Planning `/financial-plan`, Secondary: Back to Market Analysis `/market-analysis`)
   - Explainability & Transparency: Dedicated `FeasibilityExplainabilityPanel` explaining scoring methodology, weights, inputs, and prototype limitations. No `Math.random()`, no fake live claims.
   - **Task 4 Patch Integrity Fixes**:
     - Removed hardcoded ₹3,00,000 fallback in `FeasibilityPage.jsx`, `feasibilityService.js`, and `fallbackFeasibilityData.js`. Feasibility strictly consumes `activeSession.finance.marginCapital`. If margin capital is missing/invalid, an explicit guard state directs the user to `/new-analysis` without assuming any default amount.
     - Break-Even Prototype Transparency: Enforced clear "Illustrative Prototype Estimate" badge and explicit notice that estimates are based on representative archetype assumptions (not entrepreneur's verified costs or guaranteed break-even). Insufficient assumptions display "Break-even calculation requires additional operating assumptions."
     - Deterministic Status vs. Letter Grade separation:
       - Status: 75–100 (Potentially Feasible), 60–74 (Needs Validation), 45–59 (Needs Significant Preparation), 0–44 (High Risk).
       - Letter Grade: 90–100 (A+), 75–89 (A), 60–74 (B), 45–59 (C), 0–44 (D).

4. **Financial Planning & Debt Structuring Module (Task 5)**:
   - Implemented `/financial-plan` as a comprehensive, bankable debt structuring and cash flow modeling engine adhering to SIH 26091 rules.
   - Consumes `udyamsetu_analysis_session` directly. Enforces two-tier Session & Missing Margin Capital Guard directing user to `/new-analysis` without assuming any fallback values.
   - Sizing Equations: Project Cost = Margin Capital / 0.10, Sized Loan = Project Cost × 0.90.
   - Financing Tracks:
     - Micro Finance: Project Cost $\le$ ₹1.40L, max loan ₹1.25L, 6.5% p.a., 3-year tenure (36 months), 3-month moratorium.
     - Term Loan: Project Cost > ₹1.40L and $\le$ ₹50L, max loan ₹45L, 8.0% p.a., 7-year tenure (84 months), 6-month moratorium.
     - Beyond Prototype Framework: Project Cost > ₹50L flagged with explicit warning banner; does not silently route into Term Loan.
   - Distinctive Feature Architecture:
     1. Financial Overview (`FinancialOverviewSection`): Sizing, ceilings, tracks, and non-sanction disclaimers.
     2. EMI & Moratorium Card (`EmiMoratoriumCard`): Standard reducing-balance EMI formula where active repayment months $n = \text{Tenure} - \text{Moratorium}$. Models simple interest during moratorium without compounding penalties.
     3. Visual Analytics (`FinancialChartsSection`): Donut chart for Principal vs. Interest, AreaChart for Balance Trajectory, Stacked BarChart for Annual Split, with textual accessibility summaries.
     4. Amortization Schedule (`RepaymentScheduleSection`): Annual summary table + expandable month-by-month table with year filters and responsive horizontal scroll.
     5. Indicative Cash Flow & DSCR (`CashFlowDscrSection`): Multi-year operating scenario, DSCR formula = Cash available / Debt service, qualitative benchmarks (> 1.50 Strong, 1.20–1.49 Moderate, 1.00–1.19 Tight, < 1.00 Insufficient).
     6. Sensitivity Stress Test (`FinancialSensitivitySection`): 80%, 100%, 120% revenue scenarios showing DSCR impact.
     7. Financial Risks (`FinancialRisksSection`): 6 classified risks (High debt, low margin, debt service burden, credit receivables, floating rate, post-moratorium cliff) with rural mitigations.
     8. Financial Recommendations (`FinancialRecommendationsSection`): 6 actionable pre-sanction guidelines.
     9. Assumptions & Methodology (`FinancialAssumptionsPanel`): Full disclosure distinguishing User Input, SIH Parameters, Calculated Estimates, and Prototype Assumptions.
     10. Bottom Navigation Bar: Primary CTA $\rightarrow$ `/scheme-router`, Secondary CTA $\rightarrow$ `/feasibility`.

5. **Analysis Session & State Persistence (Task 2)**:
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

---

## 5. Task 5 Patch — Financial Model Transparency & Disclosures

### 5.1 Centralized Prototype Financial Assumptions
- Centralized all synthetic/demo parameters in `PROTOTYPE_FINANCIAL_ASSUMPTIONS` inside `frontend/src/utils/financialCalculator.js`:
  - `assetTurnover`: Micro Finance (1.6×), Term Loan (1.35×)
  - `ebitdaOperatingMargin`: Micro Finance (28%), Term Loan (25%)
  - `revenueRampMultiplier`: Year 1 (1.0), Year 2 (1.15), Year 3+ (1.25)
  - `dscrBenchmarks`: Strong (> 1.50), Moderate (1.20–1.49), Tight (1.00–1.19)
  - `sensitivityFactors`: Conservative (0.8), Base (1.0), Optimistic (1.2)
- Presentation components import or receive assumptions dynamically from this service/calculator tier; zero magic numbers remain in presentation JSX.

### 5.2 Cash Flow & DSCR Disclosures
- Explicitly labeled Cash Flow Section: `"Illustrative Prototype Scenario — Not Actual Market Data"`.
- Clarified that revenue and EBITDA margins are synthetic prototype heuristics, NOT government financial benchmarks or revenue predictions, and must be replaced with validated local enterprise operating data in production.
- Explicitly disclosed: `"Prototype DSCR uses modeled Operating Profit as a proxy for Cash Available for Debt Service."`
- Disclaimed that DSCR benchmarks are illustrative indicators, NOT official government/bank eligibility thresholds.

### 5.3 Assumption Taxonomy
- Enforced strict 4-tier categorization:
  1. **User Input**: Margin capital, business sector.
  2. **SIH 26091 Parameter**: 90/10 financing, Micro Finance vs. Term Loan brackets, interest rates, tenure, moratorium.
  3. **Calculated Estimate**: Project cost ($M / 0.10$), loan sizing ($90\%$), reducing-balance EMI.
  4. **Illustrative Prototype Assumption**: Asset turnover heuristics, EBITDA margins, ramp rates, DSCR benchmark bands.
- Synthetic assumptions are strictly quarantined from SIH statutory parameters.

