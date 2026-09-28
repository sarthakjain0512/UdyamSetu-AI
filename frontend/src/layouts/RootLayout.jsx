import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/common/Navbar';
import { Footer } from '../components/common/Footer';
import { AlertCircle } from 'lucide-react';

export function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#091410] text-[#f1f5f3] selection:bg-emerald-600 selection:text-white">
      {/* Subtle Prototype / Demo Data Top Bar */}
      <div className="bg-[#042017] border-b border-emerald-950/80 px-4 py-1.5 text-center text-[11px] font-medium text-emerald-200/80 flex items-center justify-center gap-2">
        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] font-semibold bg-amber-500/15 text-amber-300 border border-amber-500/30">
          <AlertCircle className="w-3 h-3 text-amber-400" /> Prototype • Demo Data
        </span>
        <span className="hidden sm:inline text-emerald-300/70">
          Smart India Hackathon 2026 (Problem Statement: SIH 26091) — Academic Evaluation Environment
        </span>
      </div>

      {/* Main Header / Navigation */}
      <Navbar />

      {/* Application Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
