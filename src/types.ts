export type ServiceCategory = 'website' | 'social-media' | 'ai-video';

export type PortfolioCategoryFilter = 'all' | 'website' | 'social-media' | 'ai-video';

export type ProjectStatus = 'draft' | 'published' | 'archived';

export interface PortfolioItem {
  id: string;
  title: string;
  slug: string;
  category: ServiceCategory;
  subcategory: string;
  description: string;
  coverImage: string;
  galleryImages: string[];
  videoUrl?: string;
  projectUrl?: string;
  clientName?: string;
  projectType: string;
  tools: string[];
  services: string[];
  featured: boolean;
  status: ProjectStatus;
  isDemoProject: boolean;
  createdAt: string;
  challenge: string;
  approach: string;
  whatWeCreated: string;
  deliverables: string[];
  outcome: string;
  orderIndex?: number;
}

export type InquiryStatus =
  | 'New'
  | 'Contacted'
  | 'Qualified'
  | 'Proposal Sent'
  | 'In Progress'
  | 'Completed'
  | 'Rejected';

export type ServiceRequiredOption =
  | 'Website Development'
  | 'Landing Page'
  | 'Website Redesign'
  | 'Social Media Solutions'
  | 'AI Video Production'
  | 'Multiple Services'
  | 'Other';

export type BudgetRangeOption =
  | 'Under ₹10,000'
  | '₹10,000 – ₹25,000'
  | '₹25,000 – ₹50,000'
  | '₹50,000+'
  | 'Not Sure Yet';

export type PreferredContactOption = 'WhatsApp' | 'Phone Call' | 'Email';

export interface ProjectInquiry {
  id: string;
  created_at: string;
  updated_at: string;
  full_name: string;
  business_name: string;
  email: string;
  phone: string;
  service_required: ServiceRequiredOption | string;
  budget_range: BudgetRangeOption | string;
  project_details: string;
  preferred_contact: PreferredContactOption | string;
  status: InquiryStatus;
  admin_notes: string;
  assigned_to?: string;
}

export interface BusinessSettings {
  businessName: string;
  tagline: string;
  positioning: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  email: string;
  workingHours: string;
  instagram: string;
  linkedin: string;
  youtube: string;
  logoUrl?: string;
}

export interface AdminUser {
  id: string;
  username: string;
  passwordHash: string;
  name: string;
}

export interface ServiceDetail {
  id: string;
  category: ServiceCategory;
  title: string;
  tagline: string;
  shortDescription: string;
  whatItIs: string;
  whoItIsFor: string;
  keyFeatures: string[];
  deliverables: string[];
  subServices: string[];
}

export interface ContactFormData {
  name: string;
  businessName: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  details: string;
  preferredContact?: PreferredContactOption | string;
}
