import React from 'react';
import { Globe, Share2, Video, ArrowRight, Check } from 'lucide-react';
import { ServiceCategory } from '../types';

interface TrustValueStripProps {
  onSelectCategory: (category: ServiceCategory) => void;
}

export const TrustValueStrip: React.FC<TrustValueStripProps> = ({
  onSelectCategory,
}) => {
  const pillars = [
    {
      badge: 'BUILD',
      badgeColor: 'bg-purple-100 text-purple-700 border-purple-200',
      title: 'Professional Websites',
      description:
        'High-converting business websites, landing pages and full redesigns built with modern code, mobile responsiveness and local SEO foundations.',
      icon: Globe,
      accentBorder: 'hover:border-purple-300',
      iconBg: 'bg-purple-50 text-purple-600',
      category: 'website' as ServiceCategory,
      features: ['Lightning-fast page speeds', 'Mobile-first responsive layouts', 'Clear inquiry CTA funnels'],
    },
    {
      badge: 'GROW',
      badgeColor: 'bg-blue-100 text-blue-700 border-blue-200',
      title: 'Social Media & Content',
      description:
        'Strategic content planning, brand identity styling, and audience engagement setups designed to turn casual viewers into paying business leads.',
      icon: Share2,
      accentBorder: 'hover:border-blue-300',
      iconBg: 'bg-blue-50 text-blue-600',
      category: 'social-media' as ServiceCategory,
      features: ['Targeted content calendars', 'Professional brand templates', 'Engagement & growth funnels'],
    },
    {
      badge: 'CREATE',
      badgeColor: 'bg-indigo-100 text-indigo-700 border-indigo-200',
      title: 'AI Video Production',
      description:
        'Modern, cinematic short-form reels, explainer showcases, and product video assets accelerated through state-of-the-art AI workflows.',
      icon: Video,
      accentBorder: 'hover:border-indigo-300',
      iconBg: 'bg-indigo-50 text-indigo-600',
      category: 'ai-video' as ServiceCategory,
      features: ['Scripting & storyboarding', 'AI-assisted visuals & voice', 'High-retention social formatting'],
    },
  ];

  return (
    <section id="trust-value-section" className="py-16 sm:py-24 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 font-heading">
            Our Core Pillars
          </span>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-slate-950 mt-2 tracking-tight">
            Everything You Need to Dominate Online
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-3">
            We don't sell bloated agency retainers. We deliver three focused solutions that drive measurable visibility and revenue.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.badge}
                onClick={() => onSelectCategory(pillar.category)}
                className={`group cursor-pointer rounded-3xl bg-white border border-slate-200/90 p-8 shadow-xs hover:shadow-lg transition-all duration-300 ${pillar.accentBorder} flex flex-col justify-between`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold tracking-wider border ${pillar.badgeColor}`}
                    >
                      {pillar.badge}
                    </span>
                    <div className={`w-12 h-12 rounded-2xl ${pillar.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-xl text-slate-950 mb-3 group-hover:text-purple-600 transition-colors">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-slate-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>

                  <ul className="space-y-2.5 pt-4 border-t border-slate-100 mb-6">
                    {pillar.features.map((feat, i) => (
                      <li key={i} className="flex items-center gap-2.5 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-purple-600 shrink-0" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform">
                  <span>Explore {pillar.title}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
