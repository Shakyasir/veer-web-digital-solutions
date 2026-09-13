import React, { useState, useEffect } from 'react';
import { PortfolioItem, PortfolioCategoryFilter } from '../types';
import { fetchPortfolioProjects } from '../services/api';
import { ExternalLink, Tag, Sparkles, Filter, RefreshCw } from 'lucide-react';

interface PortfolioViewProps {
  initialCategory?: string;
  onSelectProject: (project: PortfolioItem) => void;
  onOpenInquiry: () => void;
}

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  initialCategory = 'all',
  onSelectProject,
  onOpenInquiry,
}) => {
  const [activeFilter, setActiveFilter] = useState<PortfolioCategoryFilter>(
    (initialCategory as PortfolioCategoryFilter) || 'all'
  );
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProjects();
  }, [activeFilter]);

  const loadProjects = async () => {
    setLoading(true);
    try {
      const data = await fetchPortfolioProjects(activeFilter === 'all' ? undefined : activeFilter);
      setProjects(data);
    } catch (err) {
      console.error('Failed to load portfolio:', err);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'website', label: 'Website Solutions' },
    { id: 'social-media', label: 'Social Media' },
    { id: 'ai-video', label: 'AI Video Production' },
  ] as const;

  return (
    <div id="portfolio-public-page" className="min-h-screen bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Studio Showcase</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight">
            Our Work & Digital Creations
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Explore our portfolio of responsive business websites, strategic social media collateral, and AI-assisted video productions. Every project is built for conversion, speed, and real-world clarity.
          </p>
        </div>

        {/* Category Filters Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => {
            const isActive = activeFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id as PortfolioCategoryFilter)}
                className={`px-5 py-2.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-sm shadow-purple-500/25'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-flex items-center gap-2 text-slate-500 text-sm">
              <RefreshCw className="w-4 h-4 animate-spin text-purple-600" />
              <span>Loading portfolio projects...</span>
            </div>
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center py-20 rounded-3xl bg-slate-50 border border-slate-200 max-w-lg mx-auto p-8 space-y-3">
            <h3 className="font-heading font-bold text-base text-slate-900">
              No projects found in this category
            </h3>
            <p className="text-xs text-slate-500">
              Try switching filters or check back shortly as new prototypes are added.
            </p>
            <button
              onClick={() => setActiveFilter('all')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-purple-600 text-white"
            >
              Show All Projects
            </button>
          </div>
        ) : (
          /* Projects Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer rounded-3xl bg-white border border-slate-200/80 hover:border-purple-300 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Cover Image */}
                  <div className="relative aspect-video sm:aspect-4/3 overflow-hidden bg-slate-100">
                    <img
                      src={project.coverImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                      <span className="text-white text-xs font-semibold inline-flex items-center gap-1.5">
                        <span>View Project Case Study</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </span>
                    </div>

                    {/* Category pill */}
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
                        {project.category === 'website'
                          ? 'Website'
                          : project.category === 'social-media'
                          ? 'Social Media'
                          : 'AI Video'}
                      </span>
                    </div>

                    {/* Demo Project Badge */}
                    {project.isDemoProject && (
                      <div className="absolute top-4 right-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/95 text-white shadow-xs backdrop-blur-xs">
                          Demo Project
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center justify-between text-xs text-purple-600 font-semibold">
                      <span>{project.subcategory || project.projectType}</span>
                      {project.clientName && (
                        <span className="text-slate-400 font-normal text-[11px]">
                          {project.clientName}
                        </span>
                      )}
                    </div>

                    <h3 className="font-heading font-bold text-xl text-slate-950 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>

                    <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>

                {/* Footer Tools & Details Link */}
                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.slice(0, 3).map((tool, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Case Study →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Bottom CTA Banner */}
        <div className="mt-20 p-8 sm:p-12 rounded-3xl bg-slate-50 border border-slate-200/90 text-center max-w-4xl mx-auto space-y-4">
          <h3 className="font-heading font-extrabold text-2xl text-slate-950">
            Need a custom digital solution for your business?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
            Tell us about your industry, current challenges, and goals. We'll provide a transparent scope and roadmap.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenInquiry}
              className="px-6 py-3 rounded-2xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-sm transition-all"
            >
              Submit Project Inquiry
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
