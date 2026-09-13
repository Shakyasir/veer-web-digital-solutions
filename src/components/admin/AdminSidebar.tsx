import React from 'react';
import { LayoutDashboard, FolderKanban, Inbox, Settings, LogOut, ExternalLink, Sparkles } from 'lucide-react';

export type AdminTab = 'overview' | 'portfolio' | 'inquiries' | 'settings';

interface AdminSidebarProps {
  currentTab: AdminTab;
  onSelectTab: (tab: AdminTab) => void;
  onLogout: () => void;
  onViewPublicSite: () => void;
  unreadInquiriesCount: number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  currentTab,
  onSelectTab,
  onLogout,
  onViewPublicSite,
  unreadInquiriesCount,
}) => {
  const navItems = [
    { id: 'overview' as AdminTab, label: 'Dashboard Overview', icon: LayoutDashboard },
    { id: 'portfolio' as AdminTab, label: 'Portfolio Management', icon: FolderKanban },
    {
      id: 'inquiries' as AdminTab,
      label: 'Project Inquiries',
      icon: Inbox,
      badge: unreadInquiriesCount > 0 ? unreadInquiriesCount : undefined,
    },
    { id: 'settings' as AdminTab, label: 'Website Settings', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-slate-950 text-slate-300 flex flex-col justify-between shrink-0 h-screen sticky top-0 border-r border-slate-800">
      <div className="p-6 space-y-8">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-blue-600 text-white flex items-center justify-center font-heading font-extrabold text-lg shadow-sm">
            V
          </div>
          <div>
            <span className="font-heading font-bold text-sm text-white block">
              VEER WEB
            </span>
            <span className="text-[10px] text-purple-400 font-semibold tracking-wider uppercase block">
              Admin Studio CMS
            </span>
          </div>
        </div>

        {/* Navigation items */}
        <nav className="space-y-1.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-purple-600 text-white shadow-xs'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-slate-950">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Utilities */}
      <div className="p-6 border-t border-slate-900 space-y-2">
        <button
          onClick={onViewPublicSite}
          className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold text-slate-400 hover:text-white hover:bg-slate-900 transition-colors"
        >
          <div className="flex items-center gap-3">
            <ExternalLink className="w-4 h-4 text-purple-400" />
            <span>View Public Site</span>
          </div>
        </button>

        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:text-red-300 hover:bg-red-950/30 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};
