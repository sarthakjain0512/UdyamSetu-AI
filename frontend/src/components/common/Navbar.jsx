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
      <header className="sticky top-0 z-40 bg-[#14532D] text-white shadow-md border-b border-[#0f3e22]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Product Identity */}
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-9 h-9 rounded-xl bg-[#0F766E] flex items-center justify-center text-white shadow-sm group-hover:scale-105 transition-transform border border-teal-400/30">
                <Building2 className="w-5 h-5 text-emerald-100" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-base font-bold tracking-tight text-white">
                    UdyamSetu<span className="text-[#E58A24]">.AI</span>
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#0F766E]/60 text-teal-100 border border-teal-400/30 font-semibold flex items-center gap-1">
                    <Award className="w-2.5 h-2.5 text-[#E58A24]" /> SIH 26091
                  </span>
                </div>
                <p className="text-[10px] text-emerald-100/75 hidden md:block">
                  Rural Micro-Enterprise Advisory
                </p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1" aria-label="Main Navigation">
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
                          ? 'bg-[#0F766E] text-white font-semibold shadow-inner ring-1 ring-[#E58A24]/70'
                          : 'text-emerald-100/85 hover:text-white hover:bg-emerald-800/60'
                      }`
                    }
                  >
                    <Icon className="w-3.5 h-3.5 opacity-90" />
                    <span>{item.label}</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Medium screen Navigation */}
            <div className="hidden lg:flex xl:hidden items-center space-x-1">
              <NavLink
                to="/"
                end
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-lg text-xs font-medium ${isActive ? 'bg-[#0F766E] text-white' : 'text-emerald-100/85 hover:text-white'}`
                }
              >
                Dashboard
              </NavLink>
              <NavLink
                to="/new-analysis"
                className={({ isActive }) =>
                  `px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#E58A24] text-white hover:bg-[#c87512] ${isActive ? 'ring-2 ring-white' : ''}`
                }
              >
                + New Analysis
              </NavLink>
              <NavLink
                to="/business-plan"
                className={({ isActive }) =>
                  `px-2 py-1.5 rounded-lg text-xs font-medium ${isActive ? 'bg-[#0F766E] text-white' : 'text-emerald-100/85 hover:text-white'}`
                }
              >
                Launch Plan
              </NavLink>
            </div>

            {/* Action Buttons: Voice AI & Language & Mobile Hamburger */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setVoiceModalOpen(true)}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-[#0F766E] hover:bg-[#0d655f] text-white flex items-center gap-1.5 shadow-sm transition-all border border-teal-400/40"
                title="Voice Assistant (Hindi / Regional)"
              >
                <Mic className="w-3.5 h-3.5 text-teal-200" />
                <span className="hidden sm:inline">Voice AI</span>
              </button>

              <button
                onClick={toggleLanguage}
                className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-emerald-900/70 hover:bg-emerald-900 text-emerald-100 border border-emerald-700/60 flex items-center gap-1 transition-colors"
                title="Toggle Language"
              >
                <Globe className="w-3 h-3 text-[#E58A24]" />
                <span>{lang === 'hi' ? 'हिंदी' : 'ENG'}</span>
              </button>

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-1.5 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-800/80 lg:hidden"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#0f3e22] bg-[#14532D] px-4 pt-2 pb-4 space-y-1 shadow-lg">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-3 py-2 rounded-xl text-xs font-medium flex items-center gap-2.5 transition-colors ${
                      isActive 
                        ? 'bg-[#0F766E] text-white font-bold ring-1 ring-[#E58A24]' 
                        : 'text-emerald-100/90 hover:bg-emerald-800/60 hover:text-white'
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

export default Navbar;
