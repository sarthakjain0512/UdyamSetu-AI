import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { RootLayout } from './layouts/RootLayout';
import { HomePage } from './pages/HomePage';
import { MarketIntelligencePage } from './pages/MarketIntelligencePage';
import { FeasibilityPage } from './pages/FeasibilityPage';
import { FinancialsPage } from './pages/FinancialsPage';
import { SchemeRouterPage } from './pages/SchemeRouterPage';
import { FullAdvisoryPage } from './pages/FullAdvisoryPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<HomePage />} />
          <Route path="market-intelligence" element={<MarketIntelligencePage />} />
          <Route path="feasibility" element={<FeasibilityPage />} />
          <Route path="financials" element={<FinancialsPage />} />
          <Route path="schemes" element={<SchemeRouterPage />} />
          <Route path="advisory" element={<FullAdvisoryPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
