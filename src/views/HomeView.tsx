import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { TrustValueStrip } from '../components/TrustValueStrip';
import { FeaturedWork } from '../components/FeaturedWork';
import { HowWeWork } from '../components/HowWeWork';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { FinalCTA } from '../components/FinalCTA';
import { PortfolioItem, ServiceCategory } from '../types';

interface HomeViewProps {
  portfolioProjects: PortfolioItem[];
  onSelectProject: (item: PortfolioItem) => void;
  onNavigateTab: (tab: 'home' | 'services' | 'portfolio' | 'about' | 'contact', categoryFilter?: string) => void;
  onOpenInquiryModal: (service?: string) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  portfolioProjects,
  onSelectProject,
  onNavigateTab,
  onOpenInquiryModal,
}) => {
  return (
    <div id="home-view-container">
      {/* 1. SaaS Hero Section */}
      <HeroSection
        onStartProject={() => onOpenInquiryModal()}
        onExploreWork={() => onNavigateTab('portfolio')}
      />

      {/* 2. Visual Trust / Value Section (BUILD, GROW, CREATE) */}
      <TrustValueStrip
        onSelectCategory={(cat: ServiceCategory) => onNavigateTab('services', cat)}
      />

      {/* 3. Featured Work (dynamically from backend database) */}
      <FeaturedWork
        projects={portfolioProjects}
        onSelectProject={onSelectProject}
        onViewAllProjects={() => onNavigateTab('portfolio')}
      />

      {/* 4. How We Work (Discover, Plan, Create, Deliver) */}
      <HowWeWork />

      {/* 5. Why Choose Us (Honest benefits, zero fake statistics) */}
      <WhyChooseUs />

      {/* 6. Final CTA ("Have a project in mind?") */}
      <FinalCTA onStartProject={() => onOpenInquiryModal()} />
    </div>
  );
};
