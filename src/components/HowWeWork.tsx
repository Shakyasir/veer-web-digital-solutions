import React from 'react';
import { Search, Compass, Palette, Rocket } from 'lucide-react';

export const HowWeWork: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Discover',
      subtitle: 'Understanding Your Business Goals',
      description:
        'We examine your target audience, current online presence, competitors, and specific conversion objectives before writing a single line of code.',
      icon: Search,
      color: 'from-purple-500 to-indigo-600',
    },
    {
      number: '02',
      title: 'Plan',
      subtitle: 'Clear Scope & Architecture',
      description:
        'We outline the exact site structure, content hierarchy, conversion funnels, and design direction so expectations are completely transparent.',
      icon: Compass,
      color: 'from-indigo-600 to-blue-600',
    },
    {
      number: '03',
      title: 'Create',
      subtitle: 'Design, Development & Media',
      description:
        'We craft responsive pages, write clean semantic code, curate engaging social assets, or generate high-retention AI videos tailored to your brand.',
      icon: Palette,
      color: 'from-blue-600 to-cyan-600',
    },
    {
      number: '04',
      title: 'Deliver',
      subtitle: 'Testing, Launch & Support',
      description:
        'We run cross-device testing, verify speed benchmarks, connect WhatsApp/inquiry funnels, and provide you with simple controls to manage your content.',
      icon: Rocket,
      color: 'from-purple-600 to-pink-600',
    },
  ];

  return (
    <section id="how-we-work-section" className="py-20 sm:py-28 bg-slate-50 border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16 sm:mb-20">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-600 font-heading">
            Our Proven Process
          </span>
          <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-950 mt-2 tracking-tight">
            How We Work
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-3">
            A straightforward, milestone-driven workflow designed to deliver results on time without agency runaround.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div
                key={step.number}
                className="relative rounded-3xl bg-white border border-slate-200/80 p-7 shadow-xs hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-extrabold text-3xl text-slate-200">
                      {step.number}
                    </span>
                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${step.color} text-white flex items-center justify-center shadow-xs`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  <h3 className="font-heading font-bold text-lg text-slate-950 mb-1">
                    {step.title}
                  </h3>
                  <div className="text-xs font-semibold text-purple-600 mb-3">
                    {step.subtitle}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                  <span>Step {step.number} of 04</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
