import React from 'react';
import { ArrowRight, Sparkles, ExternalLink, Tag } from 'lucide-react';
import { PortfolioItem } from '../types';

interface FeaturedWorkProps {
  projects: PortfolioItem[];
  onSelectProject: (project: PortfolioItem) => void;
  onViewAllProjects: () => void;
}

export const FeaturedWork: React.FC<FeaturedWorkProps> = ({
  projects,
  onSelectProject,
  onViewAllProjects,
}) => {
  const featured = projects.filter((p) => p.featured).slice(0, 3);
  const displayItems = featured.length > 0 ? featured : projects.slice(0, 3);

  return (
    <section id="featured-work-section" className="py-20 sm:py-28 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Selected Portfolio</span>
            </div>
            <h2 className="font-heading font-extrabold text-3xl sm:text-4xl text-slate-950 tracking-tight">
              Featured Work & Prototypes
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Real functional designs showcasing our standard for code quality, responsiveness, and conversion architecture.
            </p>
          </div>

          <button
            onClick={onViewAllProjects}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100/80 border border-purple-200 transition-all self-start md:self-end"
          >
            <span>View All Projects</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {displayItems.length === 0 ? (
          <div className="text-center py-16 rounded-3xl bg-slate-50 border border-slate-200 text-slate-500">
            No projects published yet. Manage portfolio via the Admin Dashboard.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayItems.map((project) => (
              <div
                key={project.id}
                onClick={() => onSelectProject(project)}
                className="group cursor-pointer rounded-3xl bg-white border border-slate-200/80 hover:border-purple-300 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Cover Image Container */}
                <div className="relative aspect-video sm:aspect-4/3 overflow-hidden bg-slate-100">
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-5">
                    <span className="text-white text-xs font-semibold inline-flex items-center gap-1.5">
                      <span>View Case Study</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </span>
                  </div>

                  {/* Category Pill */}
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase bg-white/95 text-slate-800 shadow-sm backdrop-blur-sm">
                      {project.category === 'website'
                        ? 'Website'
                        : project.category === 'social-media'
                        ? 'Social Media'
                        : 'AI Video'}
                    </span>
                  </div>

                  {/* Demo Project Transparency Badge */}
                  {project.isDemoProject && (
                    <div className="absolute top-4 right-4">
                      <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-amber-500/90 text-white shadow-sm backdrop-blur-xs">
                        Demo Project
                      </span>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="text-xs font-medium text-purple-600 mb-1">
                      {project.subcategory || project.projectType}
                    </div>
                    <h3 className="font-heading font-bold text-lg text-slate-950 group-hover:text-purple-600 transition-colors line-clamp-1">
                      {project.title}
                    </h3>
                    <p className="text-xs text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.tools.slice(0, 3).map((tool, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md text-[10px] font-medium bg-slate-100 text-slate-600"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs font-bold text-purple-600 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Details →
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
