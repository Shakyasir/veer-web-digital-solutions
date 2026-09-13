import React from 'react';
import { UserCheck, ShieldCheck, Eye, Zap, Layers, RefreshCw } from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const benefits = [
    {
      icon: UserCheck,
      title: 'Direct Founder Execution',
      description:
        'You communicate directly with the builders working on your website and media, avoiding layers of account managers, broken telephone, and misaligned scopes.',
    },
    {
      icon: Eye,
      title: 'Zero Fake Claims or Hype',
      description:
        'We believe in honest work. We disclose sample prototypes clearly as demo projects and never fabricate client testimonials, awards, or arbitrary marketing metrics.',
    },
    {
      icon: Zap,
      title: 'Clean Code & Fast Loading',
      description:
        'Every website is built with modern web technologies, zero page bloat, optimized assets, and mobile-friendly tap targets that load fast on Indian mobile networks.',
    },
    {
      icon: ShieldCheck,
      title: 'Transparent Milestone Pricing',
      description:
        'Clear upfront deliverables and defined timelines. No hidden hosting surprises, unsolicited add-ons, or surprise monthly maintenance charges.',
    },
    {
      icon: Layers,
      title: 'Integrated Digital Solutions',
      description:
        'Websites, social media collateral, and AI video production in one coherent studio, ensuring your visual identity and messaging stay consistent.',
    },
    {
      icon: RefreshCw,
      title: 'Built For Easy Self-Updates',
      description:
        'We configure your project so you or your team can manage content, update text, or view incoming customer inquiries without needing developer assistance.',
    },
  ];

  return (
    <section id="why-choose-us-section" className="py-20 sm:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 font-heading">
            Authentic Value
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-950 mt-2 tracking-tight">
            Why Choose Veer Web & Digital Solutions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            Grounded in honesty, modern craft, and direct accountability — no agency fluff or false promises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <div
                key={i}
                className="p-8 rounded-3xl bg-slate-50/70 border border-slate-200/80 hover:border-purple-200 hover:bg-purple-50/20 transition-all duration-300 flex flex-col justify-start"
              >
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 text-purple-600 flex items-center justify-center mb-6 shadow-xs">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-heading font-bold text-lg text-slate-950 mb-2.5">
                  {b.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {b.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
