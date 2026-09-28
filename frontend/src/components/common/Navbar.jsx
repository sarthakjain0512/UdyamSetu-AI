import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Building2, LayoutDashboard, PlusCircle, TrendingUp, ShieldCheck, 
  Calculator, Landmark, FileText, Mic, Menu, X, Globe, Award, Sparkles 
} from 'lucide-react';
import { VoiceAssistantModal } from './VoiceAssistantModal';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);
  const [lang, setLang] = useState('hi');

  const navItems = [
    { label: 'Dashboard', path: '/', icon: LayoutDashboard },
    { label: 'New Analysis', path: '/new-analysis', icon: PlusCircle },
    { label: 'Market Analysis', path: '/market-analysis', icon: TrendingUp },
    { label: 'Feasibility', path: '/feasibility', icon: ShieldCheck },
    { label: 'Financial Plan', path: '/financial-plan', icon: Calculator },
    { label: 'Scheme Router', path: '/scheme-router', icon: Landmark },
    { label: 'Advisory', path: '/advisory', icon: Sparkles },
    { label: 'Business Plan', path: '/business-plan', icon: FileText },
  ];

  const toggleLanguage = () => {
    setLang(prev => (prev === 'hi' ? 'en' : 'hi'));
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#062c20]/95 backdrop-blur-md border-b border-[#124232] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Product Identity (No fake government logos) */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-950/40 group-hover:scale-105 transition-transform border border-emerald-500/30">
                <Building2 className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold tracking-tight text-white">
                    UdyamSetu<span className="text-amber-400">.AI</span>
                  </span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 border border-emerald-700/60 font-medium flex items-center gap-1">
                    <Award className="w-3 h-3 text-amber-400" /> SIH 26091
                  </span>
                </div>
                <p className="text-[10px] text-emerald-200/70 hidden sm:block">
                  Rural Micro-Enterprise Advisory & Financial Structuring
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    className={({ isActive }) =>
                      `px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                        isActive
                          ? 'bg-emerald-900/80 text-white border border-emerald-500/50 shadow-sm relative after:content-[""] after:w-1.5 after:h-1.5 after:bg-orange-500 after:rounded-full after:ml-0.5'
                          : 'text-emerald-100/80 hover:text-white hover:bg-emerald-900/40'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5 text-emerald-300" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Medium screen navigation fallback if viewport is lg */}
            <div className="hidden lg:flex xl:hidden items-center space-x-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-lg text-xs font-medium ${isActive ? 'bg-emerald-900 text-white' : 'text-emerald-100/80 hover:text-white'}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/new-analysis"
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-lg text-xs font-semibold text-orange-300 bg-orange-950/50 border border-orange-500/40 ${isActive ? 'ring-1 ring-orange-400' : ''}`
                }
              >
                + New Analysis
              </NavLink>
              <NavLink
                to="/business-plan"
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-lg text-xs font-medium ${isActive ? 'bg-emerald-900 text-white' : 'text-emerald-100/80 hover:text-white'}`
                }
              >
                Business Plan
              </NavLink>
            </div>

            {/* Actions: Voice & Language & Mobile Menu */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceModalOpen(true)}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-emerald-700 hover:bg-emerald-600 text-white flex items-center gap-1.5 shadow-sm transition-all border border-emerald-500/40"
                title="Voice Assistant (Hindi / Regional)"
              >
                <Mic className="w-3.5 h-3.5 text-emerald-200" />
                <span className="hidden sm:inline">Voice AI</span>
              </button>

              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-[#0b3829] hover:bg-[#0e4835] text-emerald-200 border border-[#1b5c45] flex items-center gap-1"
                title="Toggle Language"
              >
                <Globe className="w-3 h-3 text-amber-400" />
                <span>{lang === 'hi' ? 'हिंदी' : 'ENG'}</span>
              </button>

              {/* Mobile menu trigger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-emerald-200 hover:text-white hover:bg-emerald-900/50 lg:hidden"
                aria-label="Toggle menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#124232] bg-[#062c20] px-4 pt-3 pb-5 space-y-1 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5 transition-colors ${
                      isActive 
                        ? 'bg-emerald-900/90 text-white border border-emerald-500/40 font-semibold' 
                        : 'text-emerald-100/80 hover:bg-emerald-900/40 hover:text-white'
                    }`
                  }
                >
                  <Icon className="w-4 h-4 text-emerald-300" />
                  <span>{item.label}</span>
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
