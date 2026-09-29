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

---

## 6. Task 6 — Smart Scheme Router & Government Financing Guidance

### 6.1 Deterministic Scheme Routing Engine
- **Module**: `frontend/src/utils/schemeRouterEngine.js`
- **Architecture**: `SchemeRouterPage` → `useSchemeRouter` → `schemeService` → `schemeRouterEngine` / API.
- **SIH 26091 Framework Rules**:
  - **Rule A (Micro Finance Track)**: Project cost $\le ₹1.40\text{ Lakh}$. Max loan $₹1.25\text{ Lakh}$, $6.5\%$ interest, $3$-year tenure ($36$ months), $3$-month moratorium.
  - **Rule B (Term Loan Track)**: Project cost $> ₹1.40\text{ Lakh}$ to $\le ₹50\text{ Lakh}$. Max loan $₹45.00\text{ Lakh}$, $8.0\%$ interest, $7$-year tenure ($84$ months), $6$-month moratorium.
  - **Rule C (Above ₹50 Lakh)**: Project cost $> ₹50\text{ Lakh}$. Flagged as outside prototype financing bounds; requires separate commercial banking consortium appraisal.
- **Loan Ceiling Mismatch Handling**: When calculated $90\%$ debt exceeds the stated loan ceiling (e.g. at upper boundary of Micro Finance where $90\%$ of $₹1.40\text{L} = ₹1.26\text{L} > ₹1.25\text{L}$), the indicative routed loan is explicitly capped at the documented ceiling ($₹1.25\text{L}$), accompanied by an explicit disclosure.
- **Zero AI / Determinism**: 100% deterministic rules, zero `Math.random()`, zero LLM calls, confidence explicitly labeled as `"Prototype Rule Match"`.

### 6.2 Prototype-Only Eligibility Language & Disclosures
- Avoids claims of "Eligible", "Approved", "Guaranteed loan", or "Government has approved this".
- Uses careful prototype terminology: `"Potentially Applicable"`, `"Prototype Rule Match"`, `"Based on the provided inputs"`, `"Indicative financing path"`, `"Requires official verification"`.
- Official statutory disclosure prominently presented:
  *"UdyamSetu AI provides prototype decision support based on the SIH 26091 problem-statement framework. It does not determine government eligibility or loan approval. Final scheme eligibility, financing terms, documentation and sanction are subject to current official rules and lender/authority appraisal."*

### 6.3 Structured Checklists & Warnings
- **Before Applying Verification Checklist**: 6 practical pre-application checks (current circulars, lending bank interest rates, promoter equity mandate, moratorium interest treatment, social category subventions, official application portal).
- **Potential Document Checklist**: 5 categorized tiers (Identity, Residence, Banking, Business/DPR, Statutory/NOC) with explicit notice that not all documents are mandatory.
- **Actionable Warnings**: Dedicated alerts for loan ceiling mismatches, $>₹50\text{L}$ boundary overflows, sparse intake ideas, and prototype disclaimers.

### 6.4 Buyer Functionality Quarantine
- In accordance with SIH scope directives, buyer/B2B marketplace functionality remains strictly future scope and is quarantined from the entrepreneur flow.

---

## 7. Task 7 — AI-Assisted Business Advisory Layer

### 7.1 Architecture & Replaceable Design
- **Module**: `frontend/src/utils/advisoryEngine.js`
- **Architecture**: `AdvisoryPage` → `useAdvisory` → `advisoryService` → `advisoryEngine` & `/advisory/generate` fallback.
- **Replaceable Interface**: Structured contract accepting `{ session, market, feasibility, financial, scheme }` and returning `{ profile, executiveSummary, advisoryStatus, coverage, strengths, risks, recommendations, actionPlan, validationQuestions, transparency }`. This allows clean future substitution with an authorized LLM/NLP endpoint without modifying frontend presentation components.

### 7.2 Explainable Recommendation Engine
- **Categories**: Market, Operations, Finance, Financing / Scheme, Risk, Validation.
- **Rule Hierarchy**:
  - *Rule 1 (Feasibility Signal)*: Low/moderate feasibility alerts entrepreneur to validate demand before committing capital.
  - *Rule 2 (Opportunity Signal)*: High market opportunity with low competition advises micro-pilot sales to calibrate pricing.
  - *Rule 3 (Debt Signal)*: 90% debt structure triggers recommendation to ring-fence 15% equity for working capital liquidity.
  - *Rule 4 (Ceiling Mismatch)*: Informs entrepreneur of the gap between calculated 90% debt and scheme ceiling.
  - *Rule 5 (> ₹50L Overflow)*: Flags capital investments exceeding prototype boundary for consortium bank appraisal.
  - *Rule 6 (DSCR Signal)*: Weak/tight DSCR coverage advises sinking fund creation during the moratorium period.
  - *Rule 7 (Concept Gaps)*: Sparse ideas prompt completion of a formal Detailed Project Report (DPR).
- **Mandatory Explainability**: Every recommendation specifies priority (`High`, `Medium`, `Low`), reason (`Why`), concrete next step (`Action`), and data provenance source.

### 7.3 Data Coverage & Prototype Transparency
- **Transparent Audit**: `AnalysisCoverageCard` explicitly verifies which upstream modules (Intake, Market, Feasibility, Financials, Scheme) provided inputs, displaying `"Not available from current analysis"` for missing layers without calculating artificial AI confidence percentages.
- **Prototype / AI Disclaimer**: Prominently states that recommendations are derived from deterministic prototype rules and not from a live government decision engine or real-time LLM.
- **Due Diligence Support**: Formulates 7 pragmatic validation questions covering customer reach, local willingness-to-pay, competitor proximity, monthly fixed overheads, break-even unit volumes, and buffer stress-testing.

### 7.4 Scope Boundaries Preserved
- Buyer/B2B functionality remains strictly quarantined.
- Business Launch Plan (`/business-plan`) is preserved as the subsequent Task-8 milestone.

---

## 8. Task 7 Patch — Advisory Data Integrity & Recommendation Safety

### 8.1 Missing Market Data Handling
- Removed all sector-baseline fallbacks when Market Intelligence is unavailable.
- If Market Intelligence is missing:
  - Zero market strengths, zero market recommendations, zero market risks are generated.
  - Zero competitor, demand, or market opportunity conclusions are manufactured.
  - Returns explicit notification: `"Market Intelligence is not available from current analysis."`
  - Analysis Coverage Card explicitly renders: `○ Market Intelligence — Not available from current analysis`.

### 8.2 Removal of Unsupported Financial Prescriptions
- Removed all arbitrary percentages and rupee amounts not derived from Task 5 calculations (e.g., "ring-fence 15% of equity", "₹25,000–₹50,000 reserve", "60-day buffer", "15-day supplier credit", "50% sinking fund").
- Replaced with non-prescriptive validation actions:
  - *"Validate whether sufficient working capital remains after the proposed project contribution and financing structure."*
  - *"Review whether projected operating cash flow can comfortably support the modeled debt service."*
  - *"Validate the modeled operating cash flow because the prototype DSCR is only an illustrative indicator."*

### 8.3 De-escalation of Government / Official Action Language
- Replaced definitive mandatory statements ("Complete Udyam Registration", "Meet Lead Bank Manager to confirm allocations") with conditional, verify-first language:
  - *"Verify whether Udyam registration is applicable to your business and current financing route."*
  - *"Confirm the applicable financing channel and current requirements with the relevant official authority or lender."*
  - *"Verify whether any current subsidy, subvention, or category-specific benefit applies to your case."*
  - Document checklist items marked as: *"Potential preparation item — confirm applicability."*

### 8.4 Pilot Sample Size Heuristics Cleaned
- Removed arbitrary sample quantities ("5–10 retailers", "15–20 counters").
- Replaced with open validation guidance:
  - *"Run a small local pilot with potential customers before scaling."*
  - *"Conduct a local customer validation survey."*

---

## 9. Task 8 — Business Launch Plan

### 9.1 Objective & Architecture
- **Objective**: Synthesize outputs already produced by Tasks 2–7 into a coherent, actionable, evidence-derived operational roadmap answering: *"Based on the information already analyzed, what should the entrepreneur validate and prepare before launching this business?"*
- **Module Route**: `/business-plan`
- **Architecture**: `BusinessPlanPage.jsx` $\rightarrow$ `useBusinessPlan.js` $\rightarrow$ `businessPlanService.js` $\rightarrow$ `businessPlanEngine.js` $\rightarrow$ Tasks 2–7 outputs.
- **Presentation Separation**: UI components handle only presentation, layout, and interactive checklist toggles; business-plan synthesis logic resides entirely in `businessPlanEngine.js`.

### 9.2 Upstream Data Synthesis & Zero-Hallucination Governance
- Strictly consumes:
  - **Task 2 (Intake/Session)**: Business concept, category, location (state, district, block, tier), promoter margin capital, entrepreneur context.
  - **Task 3 (Market Intelligence)**: Catchment radius, demand signal, competition landscape, SWOT, market threats.
  - **Task 4 (Feasibility)**: Feasibility score, feasibility status (Potentially Feasible / Needs Validation / Needs Significant Preparation / High Risk), letter grade, operational bottlenecks.
  - **Task 5 (Financial Plan)**: Project cost ($M / 0.10$), indicative loan ($90\%$), reducing-balance EMI, tenure, moratorium, illustrative DSCR indicator.
  - **Task 6 (Scheme Router)**: Indicative route track, loan ceiling mismatch, boundary alerts, statutory disclaimers.
  - **Task 7 (AI Advisory)**: Executive narrative, prioritized strategic recommendations, phased action items, validation inquiries.
- **Strict Missing-Data Rule**:
  - If Market Intelligence is missing: zero market conclusions, zero competitor claims, zero market risks. Explicitly displays `"Market Intelligence — Not available from current analysis"`.
  - If Feasibility is missing: no invented score or grade. Explicitly displays `"Feasibility Analysis — Not available from current analysis"`.
  - If Financial Plan is missing: no invented EMI or DSCR. Explicitly displays `"Financial Plan — Not available from current analysis"`.
  - If Scheme Router is missing: no invented government eligibility. Explicitly displays `"Scheme Router — Not available from current analysis"`.
  - If Advisory is missing: no fabricated recommendations. Explicitly displays `"AI Advisory — Not available from current analysis"`.

### 9.3 11 Modular Dashboard Components
1. **Business Overview** (`BusinessOverviewCard`): Baseline concept, location, margin capital, project cost, loan sizing, and financing track.
2. **Launch Readiness** (`LaunchReadinessCard`): Status-based readiness audit (information available, information requiring validation, information missing) without inventing a new numeric score; cites Task 4 feasibility status.
3. **Recommended Before Launch** (`LaunchRecommendations`): High-priority strategic actions surfaced from Task 7 with workflow priority, diagnostic rationale (why), action, and data provenance.
4. **Pre-Launch Checklist** (`LaunchChecklist`): 6 categorized verification groups (Business, Market, Financial, Operations, Scheme, Documentation) with interactive checkboxes.
5. **Launch Sequence** (`LaunchSequence`): 9 sequential planning stages (Idea $\rightarrow$ Market $\rightarrow$ Model $\rightarrow$ Financials $\rightarrow$ Scheme $\rightarrow$ Operations $\rightarrow$ Pilot $\rightarrow$ Review $\rightarrow$ Scale) without arbitrary targets or time guarantees.
6. **Milestone Planner** (`LaunchMilestones`): 4 qualitative milestone groups (Pre-Launch, Initial Launch, Early Operations, Review & Improvement).
7. **Risk & Control Plan** (`RiskControlPlan`): Domain risks and mitigations derived strictly with upstream provenance.
8. **Financial Preparation** (`FinancialPreparationCard`): Task 5 financial parameters and pre-launch liquidity checks.
9. **Financing / Scheme Follow-Up** (`FinancingFollowUpCard`): Task 6 track, loan ceiling status, conditional verification steps, and statutory disclaimers.
10. **Validation Questions** (`ValidationQuestionsCard`): Practical questions grouped by domain (Market, Operations, Finance, Financing, Business Model).
11. **Source & Transparency Panel** (`BusinessPlanTransparency`): Audit of available upstream sources and prototype transparency disclaimers.

### 9.4 Scope & Version Control
- Buyer/B2B role remains strictly quarantined from the entrepreneur flow.
- No Git commands executed by the AI agent; manual user Git workflow preserved.

---

## 10. Task 9 — End-to-End Workflow Integration & State Persistence

### 10.1 Objective & Architecture
- **Objective**: Unify the complete entrepreneur workflow across Tasks 2–8 into ONE persistent, resilient canonical analysis session.
- **Key Files Introduced/Modified**:
  - `frontend/src/services/analysisStateService.js`: Centralized canonical persistence layer managing module outputs under `udyamsetu_analysis_session`.
  - `frontend/src/hooks/useAnalysisState.js`: Event-driven reactive hook exposing `session`, `analysis`, `moduleStatuses`, and mutation handlers.
  - `frontend/src/components/common/ModuleStatusBadge.jsx`: Unified 4-state indicator badge (`completed`, `stale` / `needs_refresh`, `not_started`, `unavailable`).
  - `frontend/src/components/common/WorkflowProgressTracker.jsx`: Visual 7-step breadcrumb progress bar rendered across all stage views.
  - `frontend/src/components/common/StaleAnalysisAlert.jsx`: Stale warning banner with inline "Refresh Analysis" trigger.
  - Hooks updated: `useMarketIntelligence.js`, `useFeasibility.js`, `useFinancials.js`, `useSchemeRouter.js`, `useAdvisory.js`, `useBusinessPlan.js`.
  - Services updated: `sessionService.js`, `advisoryService.js`, `businessPlanService.js`.
  - Pages updated: `NewAnalysisPage.jsx`, `MarketIntelligencePage.jsx`, `FeasibilityPage.jsx`, `FinancialsPage.jsx`, `SchemeRouterPage.jsx`, `AdvisoryPage.jsx`, `BusinessPlanPage.jsx`, `HomePage.jsx`.

### 10.2 Single Canonical Session Schema
Stored under localStorage key `udyamsetu_analysis_session`:
- `version`: Schema version (2).
- `sessionId`: Unique timestamped session identifier without `Math.random()`.
- `intake`: Source of truth for `location`, `business`, `finance` (margin capital), and `entrepreneurContext`.
- `analysis`: Keyed map storing `{ inputFingerprint, generatedAt, data }` for `market`, `feasibility`, `financial`, `scheme`, `advisory`, and `businessPlan`.
- Merge/update semantics: updating any module output preserves all existing module outputs.

### 10.3 Deterministic Stale Data Protection
- Normalized input fingerprints computed deterministically (`computeInputFingerprint`).
- Changing location, business category, or business idea marks `market` and `feasibility` outputs as stale (`isStale: true`).
- Changing `marginCapital` marks `financial`, `scheme`, `advisory`, and `businessPlan` outputs as stale.
- Stale outputs show a clear message: *"This analysis was generated from an earlier version of your business inputs"* and offer an instant "Refresh Analysis" button.

### 10.4 Resilience & Recovery
- Browser Refresh: All completed module outputs and session parameters survive browser refresh.
- Direct URL Access: Opening any route directly retrieves the active session and module data from storage; if no session exists, the page renders a structured "Session Required" card pointing to `/new-analysis`.
- Clean Reset: Starting a new analysis or clicking "Clear & Start Fresh" clears previous downstream analysis to prevent stale reuse.
- Zero Git commands run; all existing legacy routes and aliases preserved.
