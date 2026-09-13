import React from 'react';
import { ShieldCheck, HeartHandshake, Zap, Target, ArrowRight, MessageSquare, Code2, Layers, Cpu } from 'lucide-react';
import { CONTACT_CONFIG, getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from '../config/contactConfig';

interface AboutViewProps {
  onStartProject: () => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onStartProject }) => {
  const tools = [
    { name: 'TypeScript & React', category: 'Frontend Architecture' },
    { name: 'Tailwind CSS', category: 'Design System' },
    { name: 'Node.js & Express', category: 'Backend & APIs' },
    { name: 'Vite', category: 'Speed & Bundling' },
    { name: 'Figma', category: 'UI/UX Prototyping' },
    { name: 'Canva Pro', category: 'Social Collateral' },
    { name: 'Runway & Midjourney', category: 'Generative AI' },
    { name: 'CapCut Pro & Premiere', category: 'Video Production' },
  ];

  return (
    <div id="about-public-page" className="min-h-screen bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-24">
        
        {/* Header Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>About The Studio</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight">
            Crafting Purposeful Digital Assets for Growing Businesses
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Veer Web & Digital Solutions is an independent digital studio founded on one principle: delivering professional, conversion-focused websites, social media strategy, and AI video without agency runaround.
          </p>
        </div>

        {/* Mission & Philosophy Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Target className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-950">
              Our Studio Mission
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              To empower local and online business owners with professional digital touchpoints that command respect, communicate value clearly, and reliably generate customer inquiries on auto-pilot.
            </p>
          </div>

          <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-700 flex items-center justify-center">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-heading font-bold text-2xl text-slate-950">
              Our Working Philosophy
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We reject bloat, fake testimonials, and complex retainers. We prioritize fast code, direct communication, honest deliverables, and measurable utility over vanity metrics.
            </p>
          </div>
        </div>

        {/* What Makes Veer Web Different */}
        <div className="p-8 sm:p-12 rounded-3xl bg-purple-50/40 border border-purple-100">
          <div className="max-w-2xl mx-auto text-center mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
              Direct & Reliable
            </span>
            <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950 mt-1">
              What Makes Veer Web Different
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
              <h3 className="font-heading font-bold text-base text-slate-900">
                1. You Deal with the Builder
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                No middleman managers or account executives. The person you plan with is the person writing the code and producing the media.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
              <h3 className="font-heading font-bold text-base text-slate-900">
                2. Modern Technical Rigor
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                We use the same modern React, Tailwind, and cloud stacks favored by top technology companies, giving you speeds that WordPress templates can't match.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-2">
              <h3 className="font-heading font-bold text-base text-slate-900">
                3. Total Transparency
              </h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Clear milestones, fixed upfront quotations, and honest disclosures of all prototypes and capabilities.
              </p>
            </div>
          </div>
        </div>

        {/* Founder & Studio Introduction */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-950 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <span className="text-xs font-bold uppercase tracking-wider text-purple-400">
                Founder & Studio Leadership
              </span>
              <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white">
                Personal Attention to Every Client Detail
              </h2>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                "At Veer Web & Digital Solutions, we treat every client’s business like our own. When a customer visits your website or watches your video reel, they decide whether to trust you in less than five seconds. Our mission is to make sure your brand wins that decision."
              </p>
              <div className="pt-2">
                <span className="font-bold text-sm text-white block">Studio Direction</span>
                <span className="text-xs text-slate-400">Veer Web & Digital Solutions</span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col justify-center items-center p-6 rounded-2xl bg-slate-900 border border-slate-800 text-center space-y-3">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-purple-600 to-blue-600 flex items-center justify-center text-white font-heading font-extrabold text-2xl">
                V
              </div>
              <span className="font-heading font-bold text-sm text-white">
                Veer Web Studio
              </span>
              <span className="text-xs text-purple-400">
                Direct WhatsApp Support Available
              </span>
              <a
                href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.general)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold bg-emerald-600 hover:bg-emerald-500 text-white transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Chat with Studio</span>
              </a>
            </div>
          </div>
        </div>

        {/* Technology & Tools */}
        <div className="space-y-6">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Modern Architecture
            </span>
            <h2 className="font-heading font-extrabold text-2xl text-slate-950 mt-1">
              Technology & Tools We Rely On
            </h2>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {tools.map((t, i) => (
              <div
                key={i}
                className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-center space-y-1"
              >
                <span className="font-bold text-xs text-slate-900 block">
                  {t.name}
                </span>
                <span className="text-[11px] text-slate-500 block">
                  {t.category}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Contact CTA */}
        <div className="text-center py-12 p-8 rounded-3xl bg-slate-50 border border-slate-200 space-y-4">
          <h3 className="font-heading font-bold text-2xl text-slate-950">
            Ready to Build, Grow, or Create?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto">
            Let’s discuss how Veer Web & Digital Solutions can strengthen your business's online footprint today.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={onStartProject}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-sm transition-all"
            >
              <span>Start Your Project</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
