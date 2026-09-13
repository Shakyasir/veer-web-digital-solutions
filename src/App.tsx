import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeView } from './views/HomeView';
import { ServicesView } from './views/ServicesView';
import { PortfolioView } from './views/PortfolioView';
import { PortfolioDetailView } from './views/PortfolioDetailView';
import { AboutView } from './views/AboutView';
import { ContactView } from './views/ContactView';
import { ContactModal } from './components/ContactModal';
import { AdminLayout } from './components/admin/AdminLayout';
import { PortfolioItem, ServiceCategory } from './types';
import { fetchPortfolioProjects, fetchSettings } from './services/api';
import { syncContactConfigFromSettings, getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from './config/contactConfig';
import { MessageSquare, ArrowUp } from 'lucide-react';

export default function App() {
  const [isAdminRoute, setIsAdminRoute] = useState(false);
  const [currentTab, setCurrentTab] = useState<'home' | 'services' | 'portfolio' | 'about' | 'contact'>('home');
  const [portfolioProjects, setPortfolioProjects] = useState<PortfolioItem[]>([]);
  const [selectedProject, setSelectedProject] = useState<PortfolioItem | null>(null);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [contactPrefilledService, setContactPrefilledService] = useState<string | undefined>(undefined);
  const [portfolioInitialCategory, setPortfolioInitialCategory] = useState<string>('all');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Check URL route on mount and on history changes
  useEffect(() => {
    const checkRoute = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/admin' || hash === '#admin') {
        setIsAdminRoute(true);
      } else {
        setIsAdminRoute(false);
      }
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  // Fetch initial public data & synchronized settings
  useEffect(() => {
    loadPublicData();
  }, []);

  const loadPublicData = async () => {
    try {
      const [projectsData, settingsData] = await Promise.all([
        fetchPortfolioProjects(),
        fetchSettings(),
      ]);
      setPortfolioProjects(projectsData);
      syncContactConfigFromSettings(settingsData);
    } catch (err) {
      console.error('Failed to load initial public data:', err);
    }
  };

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 350);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigateTab = (
    tab: 'home' | 'services' | 'portfolio' | 'about' | 'contact',
    categoryFilter?: string
  ) => {
    setSelectedProject(null);
    setCurrentTab(tab);
    if (tab === 'portfolio' && categoryFilter) {
      setPortfolioInitialCategory(categoryFilter);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleOpenInquiryModal = (service?: string) => {
    setContactPrefilledService(service);
    setIsContactModalOpen(true);
  };

  const handleStartSimilarProject = (projectTitle: string, category: string) => {
    setContactPrefilledService(`Similar to: ${projectTitle} (${category})`);
    setIsContactModalOpen(true);
  };

  const handleReturnToPublic = () => {
    window.history.pushState(null, '', '/');
    setIsAdminRoute(false);
    loadPublicData();
  };

  // If visiting /admin
  if (isAdminRoute) {
    return <AdminLayout onReturnToPublic={handleReturnToPublic} />;
  }

  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans selection:bg-purple-600 selection:text-white">
      {/* Public Navbar (strictly no public admin link) */}
      <Navbar
        currentTab={currentTab}
        onSelectTab={handleNavigateTab}
        onOpenInquiryModal={() => handleOpenInquiryModal()}
      />

      {/* Main Public Router */}
      <main className="flex-1">
        {selectedProject ? (
          /* Dedicated Portfolio Detail View */
          <PortfolioDetailView
            project={selectedProject}
            onBack={() => {
              setSelectedProject(null);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onStartSimilar={handleStartSimilarProject}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <HomeView
                portfolioProjects={portfolioProjects}
                onSelectProject={(project) => {
                  setSelectedProject(project);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateTab={handleNavigateTab}
                onOpenInquiryModal={handleOpenInquiryModal}
              />
            )}

            {currentTab === 'services' && (
              <ServicesView onOpenInquiryModal={handleOpenInquiryModal} />
            )}

            {currentTab === 'portfolio' && (
              <PortfolioView
                initialCategory={portfolioInitialCategory}
                onSelectProject={(project) => {
                  setSelectedProject(project);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onOpenInquiry={() => handleOpenInquiryModal()}
              />
            )}

            {currentTab === 'about' && (
              <AboutView onStartProject={() => handleOpenInquiryModal()} />
            )}

            {currentTab === 'contact' && <ContactView />}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectTab={handleNavigateTab}
        onOpenInquiryModal={() => handleOpenInquiryModal()}
      />

      {/* Project Inquiry Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        prefilledService={contactPrefilledService}
      />

      {/* Floating Action Controls */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {showScrollTop && (
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="w-10 h-10 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-purple-600 hover:bg-slate-50 flex items-center justify-center shadow-lg transition-all"
            aria-label="Scroll to top"
          >
            <ArrowUp className="w-4 h-4" />
          </button>
        )}

        <a
          href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.general)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-3 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold shadow-xl border border-emerald-400/40 hover:scale-105 active:scale-95 transition-all"
          title="Chat directly on WhatsApp"
        >
          <MessageSquare className="w-4 h-4 fill-white shrink-0" />
          <span>WhatsApp Us</span>
        </a>
      </div>
    </div>
  );
}
