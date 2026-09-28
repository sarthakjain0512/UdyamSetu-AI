import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Building2, TrendingUp, ShieldCheck, Calculator, 
  Landmark, Sparkles, Mic, Menu, X, Globe, Award 
} from 'lucide-react';
import { VoiceAssistantModal } from './VoiceAssistantModal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [lang, setLang] = useState('hi');

  const navItems = [
    { label: 'Overview', path: '/', icon: Building2 },
    { label: 'Market Intelligence', path: '/market-intelligence', icon: TrendingUp },
    { label: 'Feasibility', path: '/feasibility', icon: ShieldCheck },
    { label: 'Financial Structuring', path: '/financials', icon: Calculator },
    { label: 'Scheme Router', path: '/schemes', icon: Landmark },
    { label: 'AI Advisory Blueprint', path: '/advisory', icon: Sparkles },
  ];

  const toggleLanguage = () => {
    setLang(prev => prev === 'hi' ? 'en' : 'hi');
  };

  return (
    <>
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 via-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg shadow-indigo-500/25 group-hover:scale-105 transition-transform">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold tracking-tight text-white">UdyamSetu<span className="text-cyan-400">.AI</span></span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-semibold flex items-center gap-1">
                    <Award className="w-3 h-3 text-cyan-400" /> SIH 26091
                  </span>
                </div>
                <p className="text-[10px] text-slate-400 hidden sm:block">Rural Micro-Enterprise Advisory Engine</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `px-3 py-2 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-indigo-600/30 text-indigo-300 border border-indigo-500/40 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {item.label}
                  </NavLink>
                );
              })}
            </nav>

            {/* Actions: Voice & Language */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceModalOpen(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white flex items-center gap-1.5 shadow-md shadow-emerald-900/30 transition-all hover:scale-105"
                title="Voice Assistant (Hindi / Regional)"
              >
                <Mic className="w-3.5 h-3.5 animate-pulse text-emerald-200" />
                <span className="hidden sm:inline">Voice AI</span>
              </button>

              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 flex items-center gap-1"
              >
                <Globe className="w-3 h-3 text-cyan-400" />
                <span>{lang === 'hi' ? 'हिंदी' : 'ENG'}</span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-400 hover:text-white lg:hidden"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-800 bg-slate-900/95 px-4 pt-2 pb-4 space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2 ${
                      isActive ? 'bg-indigo-600/30 text-indigo-300' : 'text-slate-300 hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-cyan-400" />
                  {item.label}
                </NavLink>
              );
            })}
          </div>
        )}
      </header>

      {/* Voice Assistant Modal */}
      {voiceModalOpen && (
        <VoiceAssistantModal onClose={() => setVoiceModalOpen(false)} currentLang={lang} />
      )}
    </>
  );
}
