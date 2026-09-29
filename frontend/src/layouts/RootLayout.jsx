import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { AlertCircle } from 'lucide-react';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F5EF] text-[#17211B] selection:bg-[#14532D] selection:text-white">
      {/* Subtle Professional Prototype Top Bar */}
      <div className="bg-[#14532D] border-b border-[#0f3e22] px-4 py-1 text-center text-[11px] font-medium text-emerald-100 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-semibold bg-[#E58A24]/20 text-amber-200 border border-[#E58A24]/40">
          <AlertCircle className="w-3 h-3 text-amber-300" /> Prototype • Demo Data
        </span>
        <span className="hidden sm:inline text-emerald-100/90 text-xs">
          Smart India Hackathon 2026 (SIH 26091) — AI-Driven Hyper-Local Business Advisory for Rural Micro-Entrepreneurs
        </span>
      </div>

      {/* Main Header / Navigation */}
      <Navbar />

      {/* Application Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default RootLayout;
