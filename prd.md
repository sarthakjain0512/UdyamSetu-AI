# UdyamSetu AI — Product Requirements Document

## Product
**UdyamSetu AI**

## Tagline
*From Local Insight to Sustainable Enterprise*

## SIH Problem Statement
**SIH 26091** — AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs

## Organization
Ministry of Social Justice and Empowerment

---

## 1. Product Objective
UdyamSetu AI is an AI-driven, modular advisory and financial structuring platform tailored for rural micro-entrepreneurs across India. It addresses the critical information asymmetry, financial illiteracy, and procedural friction that prevent grassroots entrepreneurs from establishing viable businesses and accessing credit and institutional subsidies.

The platform assists rural micro-entrepreneurs in evaluating potential business opportunities and establishing sound, bank-ready financial structures based on three primary inputs:
1. **Location**: District, state, and geographic tier.
2. **Available Margin Capital**: The entrepreneur's own equity investment capacity.
3. **Business Category / Idea**: Proposed sector, trade, or processing activity (e.g., dairy, agro-processing, rural retail, artisanal manufacturing).

---

## 2. Core User Journey

```
Location + Available Margin Capital + Business Idea
                      ↓
        Hyper-Local Market Intelligence
                      ↓
             Business Feasibility
                      ↓
             Financial Structuring
                      ↓
                Scheme Guidance
                      ↓
             Business Launch Plan
```

1. **Intake & Opportunity Discovery**: The entrepreneur enters their location, capital, and venture idea.
2. **Hyper-Local Market Intelligence**: Assesses demand-supply dynamics, local raw material clusters, consumer footfall, and competition density.
3. **Business Feasibility**: Evaluates technical readiness, infrastructure suitability, regulatory permits, and risk scores.
4. **Financial Structuring**: Computes total project cost, CapEx/OpEx breakdown, debt requirement, DSCR, and 3-year cash flow projections.
5. **Scheme Guidance**: Recommends appropriate central and state credit-linked subsidy schemes (e.g., PMEGP, Mudra, PMFME, Stand-Up India).
6. **Business Launch Plan**: Consolidates findings into a bank-ready advisory dossier and step-by-step roadmap.

---

## 3. Core Modules

### 3.1 Hyper-Local Market Intelligence
- Aggregates geographic and demographic indicators.
- Assesses local raw material availability, mandi pricing benchmarks, and transportation links.
- Evaluates competition density and local purchasing power indices.

### 3.2 Business Feasibility Engine
- Calculates holistic feasibility scores (0–100 scale).
- Assesses operational parameters: power, water, logistics, skilled/semi-skilled workforce.
- Evaluates regulatory requirements (e.g., FSSAI, Udyam registration, GST, trade license).
- Generates targeted risk mitigation recommendations.

### 3.3 Financial Planning & Structuring Engine
- Automatically projects total project cost and working capital needs based on margin capital and industry benchmarks.
- Allocates capital expenditure (machinery, civil works, electrification) and operating expenses (raw materials, wages, utilities).
- Computes repayment schedules (EMI), Debt Service Coverage Ratio (DSCR), and 3-year revenue and cash flow projections.

### 3.4 Scheme Router Engine
- Matches entrepreneur profile (demographics, sector, location, investment scale) with government schemes.
- Determines eligible capital subsidies (up to 35% under standard rural enterprise programs).
- Highlights nodal agencies, documentation checklists, and application avenues.

### 3.5 AI Advisory / Business Launch Plan
- Synthesizes findings across market, feasibility, finance, and schemes into an actionable bankable blueprint.
- Outlines a 90-day milestone-driven roadmap from setup to initial commercial sales.
- Provides accessible multi-language prompts for rural users.

---

## 4. Prototype Scope
To ensure clarity, rigor, and compliance during evaluation:
- **Demonstration & Synthetic Data**: The prototype uses curated demonstration datasets, synthetic benchmarks, and localized sample profiles for districts and sectors.
- **Deterministic Calculations**: Core financial calculations (loan sizing, CapEx/OpEx splits, EMI, and DSCR) adhere to standard banking and accounting formulas.
- **No Claim of Live Government Data**: The prototype does not claim direct, real-time connectivity to live government databases (e.g., Udyam portal, PMEGP portal, or GSTN).
- **No Claim of Live Market Data**: Commodity pricing, competition metrics, and demand indices represent representative regional benchmarks rather than real-time exchange or mandi feeds.
- **No Claim of Production-Grade AI**: The advisory generation in this stage operates on structured rules and template-driven logic designed to emulate future production LLM behavior.
- **Extensible Architecture**: All modules, services, and endpoints are architected for seamless drop-in integration with production APIs and models.

---

## 5. Future Production Scope
The production roadmap includes:
1. **Authorized Government Datasets & APIs**: Integration with national APIs (API Setu, Digilocker, Udyam, JanSamarth portal, PM Vishwakarma).
2. **Verified Market Datasets**: Direct feeds from Agmarknet (mandi prices), Census/Geographic Information Systems (GIS), and national open data portals (data.gov.in).
3. **Geographic & Mapping Services**: Reverse geocoding, boundary mapping, and hyper-local spatial queries using Bhuvan / Google Maps APIs.
4. **Production NLP / LLM Services**: Context-aware multilingual generative models fine-tuned on MSME guidelines and vernacular rural dialects.
5. **Production Persistence Layer**: Relational PostgreSQL database with audit logging, multi-tenant state storage, and role-based access control.
6. **Authentication & Identity**: Aadhaar-based OTP authentication, Digilocker consent flows, and bank officer portals.
7. **Monitoring & Observability**: OpenTelemetry tracing, Prometheus metrics, and structured centralized logging.
8. **Scalable Production Deployment**: Containerized deployment on secure cloud infrastructure with CI/CD and automated load balancing.

---

## 6. Functional Requirements

| ID | Requirement | Description |
|---|---|---|
| FR-01 | Entrepreneur Profile Intake | Collect location (state, district), margin capital, sector/idea, and optional demographic details. |
| FR-02 | Input Validation | Validate numerical capital values, required district selection, and sector classification. |
| FR-03 | Market Intelligence Display | Display demand levels, competition index, pricing benchmarks, and seasonal indicators. |
| FR-04 | Feasibility Assessment | Present overall viability score, breakdown factors (raw material, market demand, regulatory ease), and risks. |
| FR-05 | Financial Structuring Output | Render total project cost, loan amount, monthly EMI, DSCR, CapEx/OpEx breakdown, and 3-year cash flow. |
| FR-06 | Scheme Matching & Subsidies | List matching central/state schemes with eligible subsidy percentages, criteria, and benefits. |
| FR-07 | Bankable Business Plan | Provide a printable/viewable unified blueprint integrating all analysis modules. |
| FR-08 | Responsive Navigation | Seamless navigation across Dashboard, New Analysis, Market Intelligence, Feasibility, Financials, Schemes, and Advisory. |

---

## 7. Non-Functional Requirements

- **Design System & UI**: Clean, dignified government/startup aesthetic utilizing deep green primary tones, cream/white surfaces, and restrained orange accents. Clear typography and high contrast.
- **Modularity**: Strict separation between presentation components and business engines.
- **Performance**: Instantaneous UI page switches and sub-second deterministic engine responses.
- **Error Handling & Resilience**: Graceful degradation, empty state messaging, and network failure fallbacks.
- **Accessibility**: High-contrast labels, legible type scales, and screen-reader accessible semantic HTML.
- **Maintainability**: Well-documented service interfaces, standardized schema typing, and clean directory structure.

---

## 8. Limitations & Legal Disclaimer
> **Notice**: The data presented within the UdyamSetu AI prototype is for academic, hackathon evaluation, and prototyping purposes only. Financial projections and subsidy estimations are indicative and based on standardized templates. Final scheme eligibility, subsidy disbursal, and credit sanction remain strictly subject to the prevailing guidelines of the Ministry of MSME, the Ministry of Social Justice and Empowerment, lending institutions, and respective state nodal agencies.
