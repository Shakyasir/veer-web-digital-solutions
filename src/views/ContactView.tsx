import React, { useState } from 'react';
import { MessageSquare, Phone, Mail, Clock, Send, CheckCircle2, ShieldCheck, Sparkles } from 'lucide-react';
import {
  CONTACT_CONFIG,
  getPhoneUrl,
  getWhatsAppUrl,
  getEmailUrl,
  isEmailConfigured,
  PREFILLED_WHATSAPP_MESSAGES,
} from '../config/contactConfig';
import { ServiceRequiredOption, BudgetRangeOption, PreferredContactOption } from '../types';
import { submitProjectInquiry } from '../services/api';

export const ContactView: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    serviceRequired: 'Website Development' as ServiceRequiredOption,
    budgetRange: '₹10,000 – ₹25,000' as BudgetRangeOption,
    projectDetails: '',
    preferredContact: 'WhatsApp' as PreferredContactOption,
  });

  const [honeypot, setHoneypot] = useState('');

  const serviceOptions: ServiceRequiredOption[] = [
    'Website Development',
    'Landing Page',
    'Website Redesign',
    'Social Media Solutions',
    'AI Video Production',
    'Multiple Services',
    'Other',
  ];

  const budgetOptions: BudgetRangeOption[] = [
    'Under ₹10,000',
    '₹10,000 – ₹25,000',
    '₹25,000 – ₹50,000',
    '₹50,000+',
    'Not Sure Yet',
  ];

  const contactMethods: PreferredContactOption[] = [
    'WhatsApp',
    'Phone Call',
    'Email',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return;

    setSubmitting(true);
    setErrorMsg(null);

    try {
      await submitProjectInquiry({
        full_name: formData.fullName,
        business_name: formData.businessName,
        email: formData.email,
        phone: formData.phone,
        service_required: formData.serviceRequired,
        budget_range: formData.budgetRange,
        project_details: formData.projectDetails,
        preferred_contact: formData.preferredContact,
      });
      setSubmitted(true);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to submit inquiry. Please try again or chat via WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  const getSubmittedWhatsAppUrl = () => {
    const text =
      `*New Project Inquiry — Veer Web*\n` +
      `*Name:* ${formData.fullName}\n` +
      `*Business:* ${formData.businessName || 'Not specified'}\n` +
      `*Service:* ${formData.serviceRequired}\n` +
      `*Budget:* ${formData.budgetRange}\n` +
      `*Phone/Email:* ${formData.phone} / ${formData.email}\n` +
      `*Preferred Contact:* ${formData.preferredContact}\n` +
      `*Details:* ${formData.projectDetails || 'Discuss requirements'}`;
    return getWhatsAppUrl(text);
  };

  return (
    <div id="contact-public-page" className="min-h-screen bg-white py-12 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Banner */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Connect With Us</span>
          </div>
          <h1 className="font-heading font-extrabold text-3xl sm:text-5xl text-slate-950 tracking-tight">
            Start Your Project or Inquire
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have an upcoming project or need advice on website solutions, social media, or AI video? Reach out directly via WhatsApp, phone, or submit your project details below.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Details & Trust Badges (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/90 space-y-6">
              <h2 className="font-heading font-bold text-xl text-slate-950">
                Direct Contact Channels
              </h2>

              <div className="space-y-4">
                {/* WhatsApp Channel */}
                <a
                  href={getWhatsAppUrl(PREFILLED_WHATSAPP_MESSAGES.general)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-emerald-200 hover:border-emerald-300 hover:shadow-xs transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <MessageSquare className="w-5 h-5 fill-emerald-600" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-emerald-800 uppercase tracking-wider block">
                      WhatsApp (Fastest Response)
                    </span>
                    <span className="font-bold text-sm text-slate-900 block mt-0.5">
                      {CONTACT_CONFIG.phone}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Chat directly with studio leadership
                    </span>
                  </div>
                </a>

                {/* Phone Channel */}
                <a
                  href={getPhoneUrl()}
                  className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-purple-300 hover:shadow-xs transition-all group"
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-purple-700 uppercase tracking-wider block">
                      Phone Call
                    </span>
                    <span className="font-bold text-sm text-slate-900 block mt-0.5">
                      {CONTACT_CONFIG.phone}
                    </span>
                    <span className="text-[11px] text-slate-500">
                      Mon – Sat: 10:00 AM – 7:30 PM IST
                    </span>
                  </div>
                </a>

                {/* Email Channel (Conditional) */}
                {isEmailConfigured() && (
                  <a
                    href={getEmailUrl()}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 hover:shadow-xs transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-xs font-semibold text-blue-700 uppercase tracking-wider block">
                        Official Email
                      </span>
                      <span className="font-bold text-sm text-slate-900 block mt-0.5">
                        {CONTACT_CONFIG.email}
                      </span>
                      <span className="text-[11px] text-slate-500">
                        Formal proposals and detailed RFP documents
                      </span>
                    </div>
                  </a>
                )}
              </div>

              {/* Working Hours */}
              <div className="pt-4 border-t border-slate-200 flex items-center gap-3 text-xs text-slate-600">
                <Clock className="w-4 h-4 text-purple-600 shrink-0" />
                <span>Working Hours: {CONTACT_CONFIG.workingHours}</span>
              </div>
            </div>

            {/* Commitments & Transparency */}
            <div className="p-6 rounded-3xl bg-purple-50/60 border border-purple-100 space-y-3 text-xs text-purple-900">
              <div className="flex items-center gap-2 font-bold text-purple-950">
                <ShieldCheck className="w-4 h-4 text-purple-600" />
                <span>Our Studio Commitment</span>
              </div>
              <p className="leading-relaxed">
                We respond to all verified project inquiries within 24 hours. No aggressive sales pressure, spam calls, or third-party lead brokers.
              </p>
            </div>

          </div>

          {/* Right Column: Project Inquiry Form (7 cols) */}
          <div className="lg:col-span-7">
            <div className="p-8 sm:p-10 rounded-3xl bg-white border border-slate-200/90 shadow-lg">
              {submitted ? (
                /* Success Message matching specification */
                <div className="text-center py-10 space-y-6">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-9 h-9" />
                  </div>

                  <div className="space-y-2 max-w-md mx-auto">
                    <h3 className="font-heading font-extrabold text-2xl text-slate-950">
                      Thank you! Your project inquiry has been received.
                    </h3>
                    <p className="text-sm text-slate-600 leading-relaxed">
                      We’ll review your requirements and get back to you soon.
                    </p>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={getSubmittedWhatsAppUrl()}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors"
                    >
                      <MessageSquare className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                      <span>Chat on WhatsApp</span>
                    </a>

                    <button
                      onClick={() => setSubmitted(false)}
                      className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                    >
                      Send Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="mb-2">
                    <h2 className="font-heading font-bold text-xl text-slate-950">
                      Project Inquiry Form
                    </h2>
                    <p className="text-xs text-slate-500 mt-1">
                      Fill out this form to get a structured proposal and roadmap.
                    </p>
                  </div>

                  {errorMsg && (
                    <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                      {errorMsg}
                    </div>
                  )}

                  {/* Anti-spam honeypot */}
                  <input
                    type="text"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    className="hidden"
                    tabIndex={-1}
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Vikram Sharma"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Business Name
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Apex Logistics / Aura Cafe"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="vikram@example.com"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="+91 70272 06714"
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Service Required *
                      </label>
                      <select
                        value={formData.serviceRequired}
                        onChange={(e) => setFormData({ ...formData, serviceRequired: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                      >
                        {serviceOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                        Budget Range *
                      </label>
                      <select
                        value={formData.budgetRange}
                        onChange={(e) => setFormData({ ...formData, budgetRange: e.target.value as any })}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                      >
                        {budgetOptions.map((b) => (
                          <option key={b} value={b}>
                            {b}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Preferred Contact Method
                    </label>
                    <div className="grid grid-cols-3 gap-3">
                      {contactMethods.map((method) => {
                        const isSelected = formData.preferredContact === method;
                        return (
                          <button
                            type="button"
                            key={method}
                            onClick={() => setFormData({ ...formData, preferredContact: method })}
                            className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                              isSelected
                                ? 'bg-purple-50 text-purple-700 border-purple-600 shadow-xs'
                                : 'bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100'
                            }`}
                          >
                            {method}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                      Project Details / Requirements
                    </label>
                    <textarea
                      rows={4}
                      value={formData.projectDetails}
                      onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                      placeholder="Briefly describe your vision, pages required, current website link (if any), and timeline expectations..."
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md shadow-purple-500/20 active:scale-95 transition-all disabled:opacity-50"
                    >
                      <Send className="w-3.5 h-3.5" />
                      <span>{submitting ? 'Submitting...' : 'Submit Project Inquiry'}</span>
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
