import React, { useState, useEffect } from 'react';
import { AdminSidebar, AdminTab } from './AdminSidebar';
import { AdminOverview } from './AdminOverview';
import { AdminPortfolio } from './AdminPortfolio';
import { AdminInquiries } from './AdminInquiries';
import { AdminSettings } from './AdminSettings';
import { AdminLogin } from './AdminLogin';
import {
  checkAdminAuth,
  adminLogout,
  fetchPortfolioProjects,
  fetchInquiries,
  fetchInquiryStats,
  fetchSettings,
} from '../../services/api';
import { PortfolioItem, ProjectInquiry } from '../../types';
import { syncContactConfigFromSettings } from '../../config/contactConfig';
import { RefreshCw } from 'lucide-react';

interface AdminLayoutProps {
  onReturnToPublic: () => void;
}

export const AdminLayout: React.FC<AdminLayoutProps> = ({ onReturnToPublic }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [currentTab, setCurrentTab] = useState<AdminTab>('overview');
  const [projects, setProjects] = useState<PortfolioItem[]>([]);
  const [inquiries, setInquiries] = useState<ProjectInquiry[]>([]);
  const [inquiryStats, setInquiryStats] = useState<Record<string, number>>({});
  const [selectedInquiry, setSelectedInquiry] = useState<ProjectInquiry | null>(null);
  const [loadingData, setLoadingData] = useState(false);

  useEffect(() => {
    verifyAuth();
  }, []);

  const verifyAuth = async () => {
    const ok = await checkAdminAuth();
    setIsAuthenticated(ok);
    if (ok) {
      loadAllAdminData();
    }
  };

  const loadAllAdminData = async () => {
    setLoadingData(true);
    try {
      const [projData, inqData, statsData, settingsData] = await Promise.all([
        fetchPortfolioProjects(),
        fetchInquiries(),
        fetchInquiryStats(),
        fetchSettings(),
      ]);
      setProjects(projData);
      setInquiries(inqData);
      setInquiryStats(statsData);
      syncContactConfigFromSettings(settingsData);
    } catch (err) {
      console.error('Failed to load admin data:', err);
    } finally {
      setLoadingData(false);
    }
  };

  const handleLogout = async () => {
    await adminLogout();
    setIsAuthenticated(false);
  };

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xs">
        <div className="flex items-center gap-2">
          <RefreshCw className="w-4 h-4 animate-spin text-purple-400" />
          <span>Validating admin session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <AdminLogin
        onLoginSuccess={() => {
          setIsAuthenticated(true);
          loadAllAdminData();
        }}
        onBackToPublic={onReturnToPublic}
      />
    );
  }

  const unreadCount = inquiryStats.new || inquiries.filter((i) => i.status === 'New').length;

  return (
    <div id="admin-studio-portal" className="min-h-screen bg-slate-100 flex">
      {/* Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onSelectTab={(tab) => {
          setCurrentTab(tab);
          setSelectedInquiry(null);
        }}
        onLogout={handleLogout}
        onViewPublicSite={onReturnToPublic}
        unreadInquiriesCount={unreadCount}
      />

      {/* Main Content Area */}
      <main className="flex-1 min-w-0 p-6 sm:p-10 overflow-y-auto max-h-screen">
        {currentTab === 'overview' && (
          <AdminOverview
            projects={projects}
            inquiries={inquiries}
            stats={inquiryStats}
            onNavigate={(tab) => {
              setCurrentTab(tab);
              setSelectedInquiry(null);
            }}
            onAddNewProject={() => setCurrentTab('portfolio')}
            onOpenInquiry={(inq) => {
              setSelectedInquiry(inq);
              setCurrentTab('inquiries');
            }}
          />
        )}

        {currentTab === 'portfolio' && (
          <AdminPortfolio
            projects={projects}
            onRefresh={loadAllAdminData}
          />
        )}

        {currentTab === 'inquiries' && (
          <AdminInquiries
            inquiries={inquiries}
            onRefresh={loadAllAdminData}
            selectedInquiry={selectedInquiry}
          />
        )}

        {currentTab === 'settings' && (
          <AdminSettings
            onSettingsUpdated={loadAllAdminData}
          />
        )}
      </main>
    </div>
  );
};
