/**
 * VEER WEB & DIGITAL SOLUTIONS
 * Centralized Contact & Business Configuration
 *
 * Update business contact information in this single file or via /admin/settings.
 * All components across the website pull contact numbers, links,
 * and email settings directly from here.
 */

import { BusinessSettings } from '../types';

export interface ContactConfig {
  businessName: string;
  shortName: string;
  tagline: string;
  positioning: string;
  phone: string; // Formatted display for human eyes
  phoneRaw: string; // Dialing format with country code
  whatsappNumber: string; // Strictly numeric format for wa.me URL without '+', spaces, or hyphens
  whatsappDisplay: string; // Visual format for UI
  email: string; // Business email. Keep empty or placeholder until client configures
  workingHours: string;
  socials: {
    instagram: string;
    linkedin: string;
    youtube: string;
  };
}

export let CONTACT_CONFIG: ContactConfig = {
  businessName: 'VEER WEB & DIGITAL SOLUTIONS',
  shortName: 'VEER WEB',
  tagline: 'Build • Grow • Create',
  positioning:
    'Professional websites, social media solutions and AI-assisted video production designed to help businesses build, grow and create.',

  // Primary Business Phone & WhatsApp (+91 70272 06714)
  phone: '+91 70272 06714',
  phoneRaw: '+917027206714',
  whatsappNumber: '917027206714', // STRICT: No +, spaces, brackets, or hyphens for wa.me URL
  whatsappDisplay: '+91 70272 06714',

  email: '',
  workingHours: 'Mon – Sat: 10:00 AM – 7:30 PM IST',
  socials: {
    instagram: '',
    linkedin: '',
    youtube: '',
  },
};

/**
 * Updates in-memory CONTACT_CONFIG from backend settings
 */
export function syncContactConfigFromSettings(settings: BusinessSettings) {
  if (!settings) return;
  CONTACT_CONFIG = {
    ...CONTACT_CONFIG,
    businessName: settings.businessName || CONTACT_CONFIG.businessName,
    tagline: settings.tagline || CONTACT_CONFIG.tagline,
    positioning: settings.positioning || CONTACT_CONFIG.positioning,
    phone: settings.phone || CONTACT_CONFIG.phone,
    phoneRaw: settings.phoneRaw || CONTACT_CONFIG.phoneRaw,
    whatsappNumber: settings.whatsappNumber || CONTACT_CONFIG.whatsappNumber,
    whatsappDisplay: settings.phone || CONTACT_CONFIG.whatsappDisplay,
    email: settings.email !== undefined ? settings.email : CONTACT_CONFIG.email,
    workingHours: settings.workingHours || CONTACT_CONFIG.workingHours,
    socials: {
      instagram: settings.instagram || '',
      linkedin: settings.linkedin || '',
      youtube: settings.youtube || '',
    },
  };
}

/**
 * Check if a valid, non-placeholder business email is configured
 */
export const isEmailConfigured = (): boolean => {
  if (!CONTACT_CONFIG.email) return false;
  const trimmed = CONTACT_CONFIG.email.trim();
  if (
    trimmed === '' ||
    trimmed === 'your@email.com' ||
    trimmed === '[your@email.com]' ||
    trimmed.includes('your@email.com')
  ) {
    return false;
  }
  return true;
};

/**
 * Generate a mailto link
 */
export const getEmailUrl = (): string => {
  return `mailto:${CONTACT_CONFIG.email.trim()}`;
};

/**
 * Generate tel: phone dialing link
 */
export const getPhoneUrl = (): string => {
  return `tel:${CONTACT_CONFIG.phoneRaw}`;
};

/**
 * Generate WhatsApp URL with pre-filled message (or standard link if no text provided)
 * Guarantees no '+', spaces, brackets, or dashes in the phone number part of https://wa.me/
 */
export const getWhatsAppUrl = (message?: string): string => {
  const cleanNumber = (CONTACT_CONFIG.whatsappNumber || '917027206714').replace(/[^0-9]/g, '');
  const baseUrl = `https://wa.me/${cleanNumber}`;
  if (!message || !message.trim()) {
    return baseUrl;
  }
  return `${baseUrl}?text=${encodeURIComponent(message.trim())}`;
};

/**
 * Pre-filled contextual WhatsApp messages as required by brand guidelines
 */
export const PREFILLED_WHATSAPP_MESSAGES = {
  general: 'Hello Veer Web! I would like to discuss a digital project for my business.',
  website: 'Hello, I am interested in your Website Solutions. I would like to discuss my project.',
  socialMedia: 'Hello, I am interested in your Social Media Solutions. I would like to discuss my requirements.',
  aiVideo: 'Hello, I am interested in your AI Video Production service. I would like to discuss my project.',
  portfolio: 'Hello, I saw your portfolio project and would like to discuss a similar project for my business.',
  projectInquiry: (projectName: string, category?: string) =>
    `Hello Veer Web! I saw your portfolio project "${projectName}"${category ? ` (${category})` : ''} and would like to discuss a similar project for my business.`,
  finalCta: 'Hello, I have a project in mind and would like to discuss how we can build something valuable for my business.',
  adminInquiryContact: (clientName: string, service?: string) =>
    `Hello ${clientName}, I am contacting you regarding your project inquiry${service ? ` for ${service}` : ''} submitted through Veer Web & Digital Solutions.`,
};
