import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { NewAnalysisPage } from './pages/NewAnalysisPage';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { FeasibilityPage } from './pages/FeasibilityPage';
import { FinancialsPage } from './pages/FinancialsPage';
import { SchemeRouterPage } from './pages/SchemeRouterPage';
import { AdvisoryPage } from './pages/AdvisoryPage';
import { BusinessPlanPage } from './pages/BusinessPlanPage';
import { FullAdvisoryPage } from './pages/FullAdvisoryPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Dashboard */}
          <Route index element={<HomePage />} />
          
          {/* Task 1 Intake Route */}
          <Route path="new-analysis" element={<NewAnalysisPage />} />
          
          {/* Module 1: Market Intelligence */}
          <Route path="market-analysis" element={<MarketIntelligencePage />} />
          <Route path="market-intelligence" element={<MarketIntelligencePage />} />
          
          {/* Module 2: Feasibility */}
          <Route path="feasibility" element={<FeasibilityPage />} />
          
          {/* Module 3: Financial Plan */}
          <Route path="financial-plan" element={<FinancialsPage />} />
          <Route path="financials" element={<FinancialsPage />} />
          
          {/* Module 4: Scheme Router */}
          <Route path="scheme-router" element={<SchemeRouterPage />} />
          <Route path="schemes" element={<SchemeRouterPage />} />
          
          {/* Module 5: AI Advisory */}
          <Route path="advisory" element={<AdvisoryPage />} />
          
          {/* Module 6: Business Launch Plan */}
          <Route path="business-plan" element={<BusinessPlanPage />} />
          <Route path="full-advisory" element={<FullAdvisoryPage />} />
          
          {/* 404 Catch-All */}
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
