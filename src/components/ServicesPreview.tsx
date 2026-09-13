import React from 'react';
import { ArrowRight, Globe, Share2, Video, Check } from 'lucide-react';
import { ServiceCategory } from '../types';

interface ServicesPreviewProps {
  onSelectCategory: (category: ServiceCategory) => void;
  onStartProject: (serviceName?: string) => void;
}

export const ServicesPreview: React.FC<ServicesPreviewProps> = ({
  onSelectCategory,
  onStartProject,
}) => {
  const cards = [
    {
      id: 'website' as ServiceCategory,
      number: '01',
      title: 'WEBSITE SOLUTIONS',
      icon: Globe,
      shortDescription: 'Professional websites designed to establish credibility, showcase your business and generate enquiries.',
      services: [
        'Business Websites',
        'Landing Pages',
        'Portfolio Websites',
        'Website Redesign',
        'Website Maintenance',
      ],
      ctaText: 'Explore Website Solutions',
      accent: 'border-neutral-800 hover:border-amber-500/50',
    },
    {
      id: 'social-media' as ServiceCategory,
      number: '02',
      title: 'SOCIAL MEDIA SOLUTIONS',
      icon: Share2,
      shortDescription: 'Consistent, engaging and AI-assisted content to help businesses maintain a professional social presence.',
      services: [
        'AI-Assisted Content Creation',
        'Social Media Management',
        'Social Media Creatives',
        'Content Planning',
        'Reels Content',
      ],
      ctaText: 'Explore Social Media Solutions',
      accent: 'border-neutral-800 hover:border-amber-500/50',
    },
    {
      id: 'ai-video' as ServiceCategory,
      number: '03',
      title: 'AI VIDEO PRODUCTION',
      icon: Video,
      shortDescription: 'Marketing videos created with AI-assisted production for brands, products and social media.',
      services: [
        'Product Videos',
        'AI Advertisements',
        'Instagram Reels',
        'YouTube Shorts',
        'Explainer Videos',
        'Founder Videos',
        'Before & After Videos',
        'Festival Creatives',
      ],
      ctaText: 'Explore AI Video Production',
      accent: 'border-neutral-800 hover:border-amber-500/50',
    },
  ];

  return (
    <section id="services-preview" className="py-20 bg-neutral-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-neutral-900 border border-neutral-800 text-xs font-semibold text-amber-400 font-heading mb-3">
            WHAT WE DO
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Three digital solutions. One creative partner.
          </h2>
          <p className="text-neutral-400 text-base mt-3 leading-relaxed">
            Instead of managing multiple fragmented agencies and freelancers, work with one reliable partner
            who understands your brand voice across code, design, and video.
          </p>
        </div>

        {/* 3 Premium Service Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                id={`service-card-${card.id}`}
                className={`flex flex-col justify-between rounded-xl bg-neutral-900/60 p-7 border transition-all duration-200 ${card.accent} relative group`}
              >
                <div>
                  {/* Top Row: Number & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="font-heading text-xs font-bold tracking-widest text-amber-500/90 bg-amber-950/40 px-2.5 py-1 rounded border border-amber-800/40">
                      {card.number}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-neutral-850 border border-neutral-750 flex items-center justify-center text-neutral-300 group-hover:text-amber-400 group-hover:border-amber-500/40 transition-colors">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Short Description */}
                  <h3 className="font-heading font-bold text-xl text-white tracking-tight">
                    {card.title}
                  </h3>
                  <p className="text-sm text-neutral-300 mt-3 leading-relaxed">
                    {card.shortDescription}
                  </p>

                  {/* Services List */}
                  <div className="mt-6 pt-5 border-t border-neutral-800/80">
                    <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-3 font-heading">
                      Included Services
                    </p>
                    <ul className="space-y-2">
                      {card.services.map((svc, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-neutral-300">
                          <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                          <span>{svc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Card Footer CTA */}
                <div className="mt-8 pt-5 border-t border-neutral-800/80 flex flex-col gap-2.5">
                  <button
                    id={`btn-explore-${card.id}`}
                    onClick={() => onSelectCategory(card.id)}
                    className="w-full inline-flex items-center justify-between px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-neutral-800 hover:bg-neutral-750 border border-neutral-700/80 transition-all group-hover:border-amber-500/40"
                  >
                    <span>{card.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <button
                    onClick={() => onStartProject(card.title)}
                    className="text-center text-xs text-neutral-400 hover:text-amber-400 transition-colors py-1"
                  >
                    Request Quote for this →
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
