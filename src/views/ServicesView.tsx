import React from 'react';
import { Globe, Share2, Video, CheckCircle2, ArrowRight, Sparkles, MessageSquare } from 'lucide-react';
import { getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from '../config/contactConfig';

interface ServicesViewProps {
  onOpenInquiryModal: (service?: string) => void;
}

export const ServicesView: React.FC<ServicesViewProps> = ({ onOpenInquiryModal }) => {
  const services = [
    {
      id: 'website-solutions',
      pillar: 'BUILD',
      categoryBadge: 'Website Solutions',
      title: 'Professional Business Websites & Landing Pages',
      headline: 'High-Converting, Mobile-First Websites Engineered for Growth',
      description:
        'We build fast, bespoke, mobile-optimized business websites and high-impact landing pages that establish immediate credibility and turn visitors into qualified inquiries.',
      icon: Globe,
      color: 'from-purple-600 to-indigo-600',
      badgeBg: 'bg-purple-100 text-purple-700 border-purple-200',
      whoItsFor:
        'Local businesses, founders, professionals, clinics, consultants, and service providers who need an authoritative digital storefront that loads fast and drives inquiries.',
      keyFeatures: [
        'Business websites & multi-page company profiles',
        'High-converting landing pages for marketing campaigns',
        'Full website redesigns from outdated platforms',
        '100% mobile-first responsive design across all screen sizes',
        'Speed optimization & clean semantic HTML/CSS code',
        'Local SEO foundations & search console indexability',
        'Integrated inquiry funnels with direct WhatsApp routing',
      ],
      deliverables: [
        'Complete functional web application',
        'Mobile & tablet view validation',
        'Direct inquiry & WhatsApp trigger setup',
        'Domain & hosting deployment assistance',
        'Easy content management handoff walkthrough',
      ],
      whatsappMsg: PREFILLED_WHATSAPP_MESSAGES.website,
    },
    {
      id: 'social-media-solutions',
      pillar: 'GROW',
      categoryBadge: 'Social Media Solutions',
      title: 'Social Media Design & Strategic Content Planning',
      headline: 'Build a Cohesive, Trustworthy Brand Presence Across Channels',
      description:
        'Strategic graphic design, branded carousel templates, and structured content calendars that eliminate posting inconsistency and position your business as the market leader.',
      icon: Share2,
      color: 'from-blue-600 to-cyan-600',
      badgeBg: 'bg-blue-100 text-blue-700 border-blue-200',
      whoItsFor:
        'Business owners who want active social media channels without wasting hours guessing what to design or post every week.',
      keyFeatures: [
        'Comprehensive brand identity & visual guideline styling',
        'Bespoke social media graphic templates & carousels',
        'Strategic monthly content calendars & theme planning',
        'Eye-catching reel covers, thumbnails & story layouts',
        'Audience engagement frameworks to capture inbound direct messages',
        'Consistent typography, palette, and logo asset application',
      ],
      deliverables: [
        'Editable Canva or Figma master templates',
        'Ready-to-post high-resolution PNG/JPG batches',
        'Monthly caption & content prompt spreadsheet',
        'Highlight covers and profile bio optimization checklist',
      ],
      whatsappMsg: PREFILLED_WHATSAPP_MESSAGES.socialMedia,
    },
    {
      id: 'ai-video-production',
      pillar: 'CREATE',
      categoryBadge: 'AI Video Production',
      title: 'AI-Assisted Short-Form Video & Visual Production',
      headline: 'Cinematic, High-Retention Video Formats Designed for Modern Feeds',
      description:
        'Produce engaging short-form video reels, product showcases, and explainer assets at a fraction of traditional agency overhead through cutting-edge AI production workflows.',
      icon: Video,
      color: 'from-purple-600 to-pink-600',
      badgeBg: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      whoItsFor:
        'Companies aiming to dominate Instagram Reels, YouTube Shorts, and LinkedIn video feeds with polished audio, motion, and visual clarity.',
      keyFeatures: [
        'Short-form vertical video reels for Instagram & Shorts',
        'AI-assisted video editing, cutdowns & motion pacing',
        'Dynamic product & service showcases with 3D-style depth',
        'Persuasive scriptwriting, hooks & clear calls-to-action',
        'Studio-grade AI voiceovers and sound design synchronization',
        'High-retention captions, animated text highlights & sound effects',
      ],
      deliverables: [
        'Broadcast-quality 1080x1920 MP4 vertical video files',
        'Embedded animated subtitles and brand watermark styling',
        'Original script copy with timing notes and hook variants',
        'Re-purposing recommendations for multiple platforms',
      ],
      whatsappMsg: PREFILLED_WHATSAPP_MESSAGES.aiVideo,
    },
  ];

  return (
    <div id="services-public-page" className="min-h-screen bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Focused Studio Services</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight">
            Solutions That Build, Grow & Create
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            We don't offer thirty random agency services. We specialize in the three core digital assets every modern business needs to win customers today.
          </p>
        </div>

        {/* In-depth Services Stack */}
        <div className="space-y-16 sm:space-y-24">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 1;

            return (
              <section
                key={service.id}
                id={service.id}
                className="p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/90 shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                  
                  {/* Left Main Overview (7 cols) */}
                  <div className="lg:col-span-7 space-y-6">
                    <div className="flex items-center gap-3">
                      <span className={`px-3 py-1 rounded-full text-xs font-extrabold tracking-wider border ${service.badgeBg}`}>
                        {service.pillar}
                      </span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                        {service.categoryBadge}
                      </span>
                    </div>

                    <div>
                      <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-slate-950 tracking-tight">
                        {service.title}
                      </h2>
                      <p className="text-sm sm:text-base font-medium text-purple-700 mt-1">
                        {service.headline}
                      </p>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                      {service.description}
                    </p>

                    {/* Who it's for */}
                    <div className="p-4 rounded-2xl bg-white border border-slate-200/80">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block mb-1">
                        Who It's For:
                      </span>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {service.whoItsFor}
                      </p>
                    </div>

                    {/* Key Features List */}
                    <div className="space-y-3">
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-900 block">
                        Core Capabilities & Highlights:
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {service.keyFeatures.map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-700">
                            <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                            <span>{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* CTAs */}
                    <div className="pt-4 flex flex-wrap items-center gap-3">
                      <button
                        onClick={() => onOpenInquiryModal(service.categoryBadge)}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md shadow-purple-500/20 active:scale-95 transition-all"
                      >
                        <span>Start a Project</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>

                      <a
                        href={getWhatsAppUrl(service.whatsappMsg)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-all"
                      >
                        <MessageSquare className="w-3.5 h-3.5 text-emerald-600 fill-emerald-600" />
                        <span>Chat About This on WhatsApp</span>
                      </a>
                    </div>

                  </div>

                  {/* Right Deliverables Card (5 cols) */}
                  <div className="lg:col-span-5">
                    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
                      <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                        <span className="font-heading font-bold text-base text-slate-950">
                          What's Included
                        </span>
                        <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${service.color} text-white flex items-center justify-center`}>
                          <Icon className="w-5 h-5" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        {service.deliverables.map((item, idx) => (
                          <div
                            key={idx}
                            className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700"
                          >
                            <span className="w-5 h-5 rounded-md bg-purple-100 text-purple-700 font-bold flex items-center justify-center text-[10px] shrink-0 mt-0.5">
                              {idx + 1}
                            </span>
                            <span className="leading-snug">{item}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-2 text-[11px] text-slate-500 text-center">
                        Need a custom scope or bundled package? We tailor solutions to your exact targets.
                      </div>
                    </div>
                  </div>

                </div>
              </section>
            );
          })}
        </div>

      </div>
    </div>
  );
};
