import React from 'react';
import { Building2, ShieldCheck, Award, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t border-slate-800 bg-slate-950/80 text-slate-400 text-xs py-8 mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white font-bold">
              U
            </div>
            <div>
              <span className="text-sm font-bold text-white">UdyamSetu AI</span>
              <p className="text-[11px] text-slate-500">Problem Statement SIH 26091 — AI Advisory for Rural Micro-Entrepreneurs</p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Modular Architecture</span>
            <span className="flex items-center gap-1"><Award className="w-3.5 h-3.5 text-cyan-400" /> SIH 2026 Prototype</span>
          </div>
        </div>

        <div className="border-t border-slate-900 pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-500">
          <p>© 2026 UdyamSetu AI Prototype. Production-scalable modular design.</p>
          <p className="flex items-center gap-1">Built with React, Vite, Tailwind CSS & FastAPI</p>
        </div>
      </div>
    </footer>
  );
}
