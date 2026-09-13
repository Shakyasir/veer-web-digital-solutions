import React from 'react';
import { ArrowRight, MessageSquare, Phone } from 'lucide-react';
import { CONTACT_CONFIG, getPhoneUrl, getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from '../config/contactConfig';

interface FinalCTAProps {
  onStartProject: () => void;
}

export const FinalCTA: React.FC<FinalCTAProps> = ({ onStartProject }) => {
  return (
    <section id="final-cta-section" className="py-20 sm:py-28 bg-gradient-to-b from-slate-50 to-purple-50/40 border-b border-slate-200/80">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="relative rounded-3xl bg-white border border-slate-200/90 p-8 sm:p-14 shadow-xl overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-purple-200/30 rounded-full blur-3xl pointer-events-none -z-0" />
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-0" />

          <div className="relative z-10 space-y-6 max-w-2xl mx-auto">
            <span className="inline-flex items-center px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-purple-100/80 text-purple-700">
              Let's Collaborate
            </span>

            <h2 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight">
              Have a project in mind?
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Whether you need a new high-converting business website, a fresh social media strategy, or AI-powered video content — we are ready to discuss your goals and build something valuable.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <button
                id="final-cta-start-project"
                onClick={onStartProject}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-sm font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md shadow-purple-500/25 active:scale-95 transition-all"
              >
                <span>Start a Project</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <a
                id="final-cta-whatsapp"
                href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.finalCta)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-2xl text-sm font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 border border-emerald-200 active:scale-95 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>

            <div className="pt-4 flex items-center justify-center gap-2 text-xs text-slate-500">
              <Phone className="w-3.5 h-3.5 text-purple-600" />
              <span>Or call directly:</span>
              <a
                href={getPhoneUrl()}
                className="font-semibold text-slate-800 hover:text-purple-600 underline decoration-slate-300"
              >
                {CONTACT_CONFIG.phone}
              </a>
              <span className="text-slate-400">• {CONTACT_CONFIG.workingHours}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
