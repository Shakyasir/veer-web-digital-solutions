import React from 'react';
import { MessageSquare, Phone, Mail, Instagram, Linkedin, Youtube, ArrowUp } from 'lucide-react';
import {
  CONTACT_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  getEmailUrl,
  isEmailConfigured,
  PREFILLED_WHATSAPP_MESSAGES,
} from '../config/contactConfig';

interface FooterProps {
  onSelectTab: (tab: 'home' | 'services' | 'portfolio' | 'about' | 'contact') => void;
  onOpenInquiryModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenInquiryModal }) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="main-site-footer" className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Brand Info (2 cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-heading font-extrabold text-base">
                V
              </div>
              <span className="font-heading font-bold text-lg text-white tracking-tight">
                {CONTACT_CONFIG.businessName}
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              {CONTACT_CONFIG.positioning}
            </p>

            <div className="pt-2 text-xs text-purple-400 font-semibold tracking-wider uppercase">
              {CONTACT_CONFIG.tagline}
            </div>

            {/* Social Links (if configured) */}
            {(CONTACT_CONFIG.socials.instagram ||
              CONTACT_CONFIG.socials.linkedin ||
              CONTACT_CONFIG.socials.youtube) && (
              <div className="pt-2 flex items-center gap-3">
                {CONTACT_CONFIG.socials.instagram && (
                  <a
                    href={CONTACT_CONFIG.socials.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-purple-500 transition-colors"
                  >
                    <Instagram className="w-4 h-4" />
                  </a>
                )}
                {CONTACT_CONFIG.socials.linkedin && (
                  <a
                    href={CONTACT_CONFIG.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </a>
                )}
                {CONTACT_CONFIG.socials.youtube && (
                  <a
                    href={CONTACT_CONFIG.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-red-500 transition-colors"
                  >
                    <Youtube className="w-4 h-4" />
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => onSelectTab('home')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('services')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('portfolio')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Portfolio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('about')}
                  className="hover:text-purple-400 transition-colors"
                >
                  About Studio
                </button>
              </li>
              <li>
                <button
                  onClick={() => onSelectTab('contact')}
                  className="hover:text-purple-400 transition-colors"
                >
                  Contact & Inquiry
                </button>
              </li>
            </ul>
          </div>

          {/* Services Pillars */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Services
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="hover:text-white cursor-pointer" onClick={() => onSelectTab('services')}>
                Professional Websites
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onSelectTab('services')}>
                Landing Pages & Redesigns
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onSelectTab('services')}>
                Social Media Solutions
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onSelectTab('services')}>
                AI Video Production
              </li>
              <li className="hover:text-white cursor-pointer" onClick={() => onSelectTab('services')}>
                Local SEO & Lead Funnels
              </li>
            </ul>
          </div>

          {/* Direct Contact Info */}
          <div className="space-y-3">
            <h4 className="font-heading font-bold text-xs uppercase tracking-wider text-white">
              Direct Contact
            </h4>
            <div className="space-y-2.5 text-xs">
              <a
                href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-400" />
                <span>WhatsApp: {CONTACT_CONFIG.phone}</span>
              </a>

              <a
                href={getPhoneUrl()}
                className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-purple-400" />
                <span>Call: {CONTACT_CONFIG.phone}</span>
              </a>

              {isEmailConfigured() && (
                <a
                  href={getEmailUrl()}
                  className="flex items-center gap-2 text-slate-300 hover:text-white transition-colors"
                >
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>{CONTACT_CONFIG.email}</span>
                </a>
              )}

              <p className="text-[11px] text-slate-500 pt-1">
                {CONTACT_CONFIG.workingHours}
              </p>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {currentYear} {CONTACT_CONFIG.businessName}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-slate-400">
              Demo projects are clearly designated for transparency.
            </span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
              aria-label="Back to top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
