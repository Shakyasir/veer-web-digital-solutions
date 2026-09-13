import React from 'react';
import { ArrowRight, MessageSquare, Sparkles, CheckCircle2, ShieldCheck, Zap } from 'lucide-react';
import { getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from '../config/contactConfig';

interface HeroSectionProps {
  onStartProject: () => void;
  onExploreWork: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onStartProject,
  onExploreWork,
}) => {
  return (
    <section id="homepage-hero-section" className="relative overflow-hidden bg-white pt-12 pb-20 sm:pt-16 sm:pb-28 border-b border-slate-100">
      {/* Subtle SaaS Ambient Background Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-6xl h-96 bg-gradient-to-b from-purple-100/60 via-blue-50/40 to-transparent pointer-events-none -z-10 blur-3xl" />
      <div className="absolute -top-10 -right-20 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute top-40 -left-20 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-4xl mx-auto space-y-8">
          
          {/* Small Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/80 text-purple-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600" />
            <span>Digital Solutions for Modern Businesses</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-heading font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight text-slate-950 leading-[1.1]">
            Build Your Digital Presence.{' '}
            <span className="block mt-1 text-purple-600">
              Grow Your Brand.
            </span>
          </h1>

          {/* Supporting Text */}
          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed font-normal">
            Professional websites, social media solutions and AI-assisted video production designed to help businesses build, grow and create.
          </p>

          {/* Action CTAs: Primary, Secondary, WhatsApp */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            <button
              id="hero-start-project-btn"
              onClick={onStartProject}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md shadow-purple-500/20 active:scale-95 transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              id="hero-explore-work-btn"
              onClick={onExploreWork}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-700 hover:text-slate-950 bg-slate-50 hover:bg-slate-100 border border-slate-200/80 active:scale-95 transition-all"
            >
              <span>Explore Our Work</span>
            </button>

            <a
              id="hero-whatsapp-btn"
              href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.general)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/80 border border-emerald-200 active:scale-95 transition-all"
            >
              <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>Chat on WhatsApp</span>
            </a>
          </div>

          {/* Reassurance markers */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-purple-600" />
              <span>Direct Founder Communication</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              <span>Transparent Scopes & Pricing</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              <span>Modern, Clean Code & Media</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
