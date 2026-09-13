import React from 'react';
import { FolderKanban, Inbox, Sparkles, ArrowRight, Plus, MessageSquare, Clock, CheckCircle2 } from 'lucide-react';
import { PortfolioItem, ProjectInquiry } from '../../types';
import { getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from '../../config/contactConfig';

interface AdminOverviewProps {
  projects: PortfolioItem[];
  inquiries: ProjectInquiry[];
  stats: Record<string, number>;
  onNavigate: (tab: 'portfolio' | 'inquiries' | 'settings') => void;
  onAddNewProject: () => void;
  onOpenInquiry: (inquiry: ProjectInquiry) => void;
}

export const AdminOverview: React.FC<AdminOverviewProps> = ({
  projects,
  inquiries,
  stats,
  onNavigate,
  onAddNewProject,
  onOpenInquiry,
}) => {
  const totalProjects = projects.length;
  const publishedProjects = projects.filter((p) => p.status === 'published').length;
  const totalInquiries = stats.total || inquiries.length;
  const newInquiries = stats.new || inquiries.filter((i) => i.status === 'New').length;

  const recentInquiries = inquiries.slice(0, 5);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-950">
            Studio Dashboard Overview
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor real-time portfolio assets and prospective client inquiries.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onAddNewProject}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-xs transition-colors"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Project</span>
          </button>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Total Projects */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Projects
            </span>
            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-slate-950">
              {totalProjects}
            </span>
            <span className="text-xs text-purple-600 font-medium">
              ({publishedProjects} published)
            </span>
          </div>
          <button
            onClick={() => onNavigate('portfolio')}
            className="text-xs text-purple-600 hover:underline font-semibold flex items-center gap-1 pt-1"
          >
            <span>Manage Projects</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Total Inquiries */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              Total Inquiries
            </span>
            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center">
              <Inbox className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-slate-950">
              {totalInquiries}
            </span>
            <span className="text-xs text-slate-400">received</span>
          </div>
          <button
            onClick={() => onNavigate('inquiries')}
            className="text-xs text-blue-600 hover:underline font-semibold flex items-center gap-1 pt-1"
          >
            <span>View All Inquiries</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* New Inquiries */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              New / Unread
            </span>
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="font-heading font-extrabold text-3xl text-amber-600">
              {newInquiries}
            </span>
            <span className="text-xs text-slate-400">action required</span>
          </div>
          <button
            onClick={() => onNavigate('inquiries')}
            className="text-xs text-amber-600 hover:underline font-semibold flex items-center gap-1 pt-1"
          >
            <span>Filter New</span>
            <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        {/* Quick WhatsApp Link */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
              WhatsApp Integration
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
          </div>
          <div className="text-xs font-medium text-slate-700">
            All leads are mapped directly for instant 1-click WhatsApp messaging.
          </div>
          <div className="pt-1">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
              <CheckCircle2 className="w-3 h-3" /> Active: +91 70272 06714
            </span>
          </div>
        </div>
      </div>

      {/* Recent Inquiries List */}
      <div className="rounded-2xl bg-white border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-heading font-bold text-base text-slate-950">
            Recent Client Inquiries
          </h2>
          <button
            onClick={() => onNavigate('inquiries')}
            className="text-xs font-semibold text-purple-600 hover:underline"
          >
            View All ({inquiries.length})
          </button>
        </div>

        {recentInquiries.length === 0 ? (
          <div className="text-center py-10 text-xs text-slate-400">
            No inquiries logged yet. Submissions from the public inquiry form will show here immediately.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {recentInquiries.map((inq) => (
              <div
                key={inq.id}
                onClick={() => onOpenInquiry(inq)}
                className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer hover:bg-slate-50/80 px-2 rounded-xl transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-slate-900">
                      {inq.full_name}
                    </span>
                    {inq.business_name && (
                      <span className="text-[11px] text-slate-500 font-medium">
                        ({inq.business_name})
                      </span>
                    )}
                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        inq.status === 'New'
                          ? 'bg-amber-100 text-amber-800'
                          : inq.status === 'Contacted'
                          ? 'bg-blue-100 text-blue-800'
                          : inq.status === 'Qualified'
                          ? 'bg-purple-100 text-purple-800'
                          : inq.status === 'Proposal Sent'
                          ? 'bg-indigo-100 text-indigo-800'
                          : inq.status === 'In Progress'
                          ? 'bg-emerald-100 text-emerald-800'
                          : inq.status === 'Completed'
                          ? 'bg-slate-100 text-slate-700'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {inq.status}
                    </span>
                  </div>

                  <div className="text-xs text-slate-600">
                    <span className="font-semibold text-slate-800">{inq.service_required}</span> • Budget: {inq.budget_range} • Contact via: {inq.preferred_contact}
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-center">
                  <a
                    href={`https://wa.me/${inq.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                      PREFILLED_WHATSAPP_MESSAGES.adminInquiryContact(inq.full_name, inq.service_required)
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                    <span>WhatsApp</span>
                  </a>

                  <span className="text-[11px] text-slate-400">
                    {new Date(inq.created_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
