import React from 'react';
import { ArrowLeft, ExternalLink, Play, CheckCircle, Tag, Sparkles, MessageSquare, Phone, ShieldCheck } from 'lucide-react';
import { PortfolioItem } from '../types';
import { getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from '../config/contactConfig';

interface PortfolioDetailViewProps {
  project: PortfolioItem;
  onBack: () => void;
  onStartSimilar: (projectTitle: string, category: string) => void;
}

export const PortfolioDetailView: React.FC<PortfolioDetailViewProps> = ({
  project,
  onBack,
  onStartSimilar,
}) => {
  return (
    <div id="portfolio-detail-page" className="min-h-screen bg-slate-50 py-10 sm:py-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-white border border-slate-200/90 hover:bg-slate-50 hover:text-purple-700 shadow-xs transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Portfolio</span>
          </button>

          <div className="flex items-center gap-2">
            {project.isDemoProject ? (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                Demo Project — Created for Portfolio
              </span>
            ) : (
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                Client Project
              </span>
            )}
          </div>
        </div>

        {/* Hero Card */}
        <div className="rounded-3xl bg-white border border-slate-200/90 shadow-md overflow-hidden">
          <div className="relative aspect-video sm:aspect-21/9 w-full bg-slate-900 overflow-hidden">
            <img
              src={project.coverImage}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-transparent flex items-end p-6 sm:p-10">
              <div className="space-y-2 text-white max-w-2xl">
                <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-purple-600/90 text-white backdrop-blur-xs">
                  {project.category === 'website'
                    ? 'Website Solution'
                    : project.category === 'social-media'
                    ? 'Social Media Solution'
                    : 'AI Video Production'}
                </span>
                <h1 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
                  {project.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-200 font-medium">
                  {project.subcategory} • {project.projectType}
                  {project.clientName && ` • Client: ${project.clientName}`}
                </p>
              </div>
            </div>
          </div>

          <div className="p-6 sm:p-10 space-y-10">
            {/* Overview */}
            <div className="space-y-3">
              <h2 className="font-heading font-bold text-lg text-slate-950">
                Overview
              </h2>
              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Challenge & Approach Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600">
                  Challenge / Requirement
                </span>
                <h3 className="font-heading font-bold text-base text-slate-950">
                  The Problem Solved
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.challenge || 'Local businesses frequently experience low conversion rates and friction on mobile devices due to unorganized content structures.'}
                </p>
              </div>

              <div className="p-6 rounded-2xl bg-purple-50/50 border border-purple-100 space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-700">
                  Our Approach
                </span>
                <h3 className="font-heading font-bold text-base text-slate-950">
                  Strategic Execution
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.approach || 'We planned high-impact visual sections, streamlined user navigation, and integrated direct WhatsApp/phone touchpoints.'}
                </p>
              </div>
            </div>

            {/* What We Created & Deliverables */}
            <div className="space-y-4">
              <h2 className="font-heading font-bold text-lg text-slate-950">
                What We Created
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {project.whatWeCreated || 'A polished solution engineered for rapid loading, intuitive interactivity, and focused business outcomes.'}
              </p>

              {project.deliverables && project.deliverables.length > 0 && (
                <div className="pt-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 block">
                    Key Deliverables & Features
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.deliverables.map((d, i) => (
                      <div
                        key={i}
                        className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-700"
                      >
                        <CheckCircle className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                        <span>{d}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Gallery / Images */}
            {project.galleryImages && project.galleryImages.length > 0 && (
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-lg text-slate-950">
                  Project Gallery & Visuals
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.galleryImages.map((imgUrl, i) => (
                    <div
                      key={i}
                      className="rounded-2xl overflow-hidden border border-slate-200 bg-slate-100 aspect-video group"
                    >
                      <img
                        src={imgUrl}
                        alt={`${project.title} gallery asset ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Video Preview if available */}
            {project.videoUrl && (
              <div className="space-y-3 p-6 rounded-2xl bg-slate-900 text-white">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-400">
                  <Play className="w-4 h-4" />
                  <span>Video Preview</span>
                </div>
                <p className="text-xs text-slate-300">
                  Video preview asset linked for this production:
                </p>
                <a
                  href={project.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white transition-colors"
                >
                  <span>Watch Video Asset</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            )}

            {/* Tools Used & Outcome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Tools & Technologies Used
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((t, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-lg text-xs font-medium bg-slate-100 text-slate-800"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-2">
                  Outcome & Value Delivered
                </span>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {project.outcome || 'Clean responsive interface, zero bloat, and a structured layout optimized for business inquiries.'}
                </p>
              </div>
            </div>

            {/* Live Project URL if available */}
            {project.projectUrl && (
              <div className="pt-2">
                <a
                  href={project.projectUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 border border-purple-200 hover:bg-purple-100 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Visit Live Prototype / Project URL</span>
                </a>
              </div>
            )}

            {/* Transparency Note */}
            {project.isDemoProject && (
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-900 flex items-start gap-3">
                <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold block">Portfolio Transparency Notice</span>
                  This sample was created by Veer Web & Digital Solutions as a concept showcase to demonstrate design standard, component structure, and code capabilities. We never fabricate client testimonials or claim unauthorized agency affiliations.
                </div>
              </div>
            )}

            {/* Bottom Action CTA */}
            <div className="pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="text-center sm:text-left">
                <h4 className="font-heading font-bold text-base text-slate-950">
                  Interested in a similar solution for your brand?
                </h4>
                <p className="text-xs text-slate-600">
                  Let's discuss requirements, budget range, and timeline.
                </p>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto">
                <button
                  onClick={() => onStartSimilar(project.title, project.category)}
                  className="w-full sm:w-auto px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-sm transition-all"
                >
                  Start Similar Project
                </button>

                <a
                  href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.projectInquiry(project.title, project.category))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 hover:bg-emerald-100 transition-all"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                  <span>WhatsApp</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
