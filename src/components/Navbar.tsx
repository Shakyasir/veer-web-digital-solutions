import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, MessageSquare, ArrowRight, Sparkles } from 'lucide-react';
import { CONTACT_CONFIG, getPhoneUrl, getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from '../config/contactConfig';

interface NavbarProps {
  currentTab: string;
  onSelectTab: (tab: 'home' | 'services' | 'portfolio' | 'about' | 'contact') => void;
  onOpenInquiryModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  onSelectTab,
  onOpenInquiryModal,
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ] as const;

  const handleNavClick = (tab: 'home' | 'services' | 'portfolio' | 'about' | 'contact') => {
    onSelectTab(tab);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="main-navigation-header"
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-slate-200/80 shadow-xs'
          : 'bg-white border-b border-slate-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo / Brand Name */}
          <div
            id="nav-brand-logo"
            onClick={() => handleNavClick('home')}
            className="cursor-pointer flex items-center gap-3.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 via-indigo-600 to-blue-600 flex items-center justify-center text-white shadow-sm shadow-purple-500/25 group-hover:scale-105 transition-transform">
              <span className="font-heading font-extrabold text-lg tracking-wider">V</span>
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-extrabold text-base tracking-tight text-slate-950 group-hover:text-purple-600 transition-colors">
                VEER WEB
              </span>
              <span className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 flex items-center gap-1.5">
                <span>DIGITAL SOLUTIONS</span>
                <span className="inline-block w-1 h-1 rounded-full bg-purple-500"></span>
                <span className="text-purple-600 font-bold">BUILD • GROW • CREATE</span>
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav id="desktop-nav-links" className="hidden md:flex items-center gap-1 bg-slate-100/80 p-1.5 rounded-full border border-slate-200/60">
            {navItems.map((item) => {
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-link-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-white text-purple-700 shadow-xs'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Desktop Action CTAs */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              id="header-whatsapp-direct"
              href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-emerald-700 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-200 transition-all"
              title="Chat directly on WhatsApp"
            >
              <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
              <span>WhatsApp</span>
            </a>

            <button
              id="header-start-project-btn"
              onClick={onOpenInquiryModal}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-sm shadow-purple-500/20 active:scale-95 transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-inquiry-quick-btn"
              onClick={onOpenInquiryModal}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold text-white bg-purple-600 active:scale-95 transition-all"
            >
              Start Project
            </button>
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 transition-colors"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="md:hidden border-b border-slate-200 bg-white/98 backdrop-blur-xl px-4 pt-3 pb-6 space-y-3 shadow-lg animate-in slide-in-from-top-2 duration-200"
        >
          <div className="space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  currentTab === item.id
                    ? 'bg-purple-50 text-purple-700 font-bold border border-purple-100'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{item.label}</span>
                {currentTab === item.id && <span className="w-1.5 h-1.5 rounded-full bg-purple-600"></span>}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenInquiryModal();
              }}
              className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 shadow-sm"
            >
              <Sparkles className="w-4 h-4" />
              <span>Start Your Project</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>WhatsApp</span>
              </a>
              <a
                href={getPhoneUrl()}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl text-xs font-semibold text-slate-800 bg-slate-100 border border-slate-200"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>Call Now</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
