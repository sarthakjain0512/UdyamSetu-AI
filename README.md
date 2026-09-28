# UdyamSetu AI 🌾🤖

> **Smart India Hackathon 2026 Prototype (Problem Statement: SIH 26091)**  
> **AI-Driven Hyper-Local Business Advisory and Financial Structuring Assistant for Rural Micro-Entrepreneurs.**

---

## 🌟 Overview

**UdyamSetu AI** is a production-scalable, modular web application prototype engineered to bridge the gap between rural micro-entrepreneurs, government MSME subsidies (PMEGP, Mudra, PMFME, Lakhpati Didi), and bank credit evaluation requirements.

### Key Advisory Modules
1. **Market Intelligence Engine**: Analyzes hyper-local mandi pricing, demographic demand, competition index, and raw material availability.
2. **Feasibility Engine**: Computes viability scores (0-100), location suitability, skill readiness, break-even period, and risk mitigation strategies.
3. **Financial Structuring Engine**: Generates CapEx/OpEx breakdowns, 3-year cash flow projections, Debt Service Coverage Ratio (DSCR), and monthly EMI schedules.
4. **Government Scheme Router**: Matches central & state schemes (PMEGP, Mudra, PMFME, Stand-Up India) with dynamic subsidy routing (up to 35%).
5. **AI Advisory & Voice Assistant**: 360° bankable blueprint generator with multilingual voice prompts (Hindi / English / Regional).

---

## 🏗 System Architecture

```text
UdyamSetu AI Workspace/
├── frontend/                     # React + Vite + Tailwind CSS + Recharts
│   ├── src/
│   │   ├── components/           # Reusable UI components (Navbar, MetricCard, VoiceModal)
│   │   ├── pages/                # Route pages (Home, Market, Feasibility, Financials, Schemes, Advisory)
│   │   ├── layouts/              # RootLayout with sticky header & footer
│   │   ├── services/             # Decoupled API service layer with client fallback
│   │   ├── hooks/                # Custom React hooks (useMarketIntelligence, useFeasibility, etc.)
│   │   ├── data/                 # Client fallback dataset layer
│   │   └── utils/                # Formatters (INR Currency, Percentages)
│   ├── .env                      # Environment variable (VITE_API_BASE_URL)
│   └── package.json
│
├── backend/                      # Python + FastAPI Engine
│   ├── app/
│   │   ├── api/                  # FastAPI APIRouter endpoints (/v1/market-intelligence, etc.)
│   │   ├── engines/              # Independent engines (Market, Feasibility, Financial, Scheme, Advisory)
│   │   ├── models/               # Pydantic validation schemas
│   │   ├── data/                 # Abstracted Data Repositories (sectors_db, districts_db, schemes_db)
│   │   ├── services/             # DataService abstraction layer
│   │   └── main.py               # FastAPI application entry point
│   ├── requirements.txt
│   └── .env.example
│
├── README.md
└── .gitignore
```

---

## 🚀 How to Run the Application

### 1. Prerequisites
- **Node.js**: v18+ (Tested on v24.15.0)
- **Python**: 3.10+ (Tested on Python 3.12.10)

---

### 2. Running the FastAPI Backend Engine

Open a terminal window and navigate to the `backend/` directory:

```bash
cd backend
```

#### Create & Activate Virtual Environment:
- **Windows**:
  ```bash
  python -m venv venv
  .\venv\Scripts\activate
  ```
- **macOS / Linux**:
  ```bash
  python3 -m venv venv
  source venv/bin/activate
  ```

#### Install Python Dependencies:
```bash
pip install -r requirements.txt
```

#### Launch Backend Server:
```bash
python -m uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- **Interactive Swagger API Docs**: Open [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs) in your browser.

---

### 3. Running the React Frontend

Open a second terminal window and navigate to the `frontend/` directory:

```bash
cd frontend
```

#### Install NPM Packages:
```bash
npm install
```

#### Start Vite Development Server:
```bash
npm run dev
```
- Open [http://localhost:5173](http://localhost:5173) to view the live prototype.

---

## ⚡ Key Architectural Highlights
- **Decoupled Business Logic**: React UI components contain zero calculation/math logic. All logic resides in custom React hooks and backend engine modules.
- **Service & Data Layer Abstraction**: Frontend calls unified service functions with environmental base URLs (`VITE_API_BASE_URL`). Backend data access is encapsulated in `DataService` so SQL/NoSQL databases can be plugged in without changing engine logic.
- **Resilient Presentation**: Automatic client-side fallback ensures seamless presentation even if backend services are temporarily offline.

---
*Created for Smart India Hackathon (SIH) 2026 Submission.*
