import React, { useState, useEffect } from 'react';
import { X, Send, MessageSquare, CheckCircle2, ShieldCheck, Sparkles, Phone, Mail } from 'lucide-react';
import { ServiceRequiredOption, BudgetRangeOption, PreferredContactOption } from '../types';
import { submitProjectInquiry } from '../services/api';
import { getWhatsAppUrl, PREFILLED_WHATSAPP_MESSAGES } from '../config/contactConfig';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledService?: string;
}

export const ContactModal: React.FC<ContactModalProps> = ({
  isOpen,
  onClose,
  prefilledService,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    fullName: '',
    businessName: '',
    email: '',
    phone: '',
    serviceRequired: (prefilledService as ServiceRequiredOption) || 'Website Development',
    budgetRange: '₹10,000 – ₹25,000' as BudgetRangeOption,
    projectDetails: '',
    preferredContact: 'WhatsApp' as PreferredContactOption,
  });

  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap

  useEffect(() => {
    if (prefilledService) {
      setFormData((prev) => ({
        ...prev,
        serviceRequired: prefilledService as any,
      }));
    }
  }, [prefilledService]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

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

  const contactMethodOptions: PreferredContactOption[] = [
    'WhatsApp',
    'Phone Call',
    'Email',
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // Silent discard for bots

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
    <div
      id="contact-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <div
        id="contact-modal-card"
        className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl text-slate-900 my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-slate-100 sticky top-0 bg-white/95 backdrop-blur-md z-10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-heading font-extrabold text-lg text-slate-950">
                Project Inquiry
              </h3>
              <p className="text-xs text-slate-500">
                Tell us about your project requirements & goals
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 sm:p-8">
          {submitted ? (
            /* Professional Success State */
            <div className="text-center py-8 space-y-6">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div className="space-y-2 max-w-md mx-auto">
                <h4 className="font-heading font-extrabold text-2xl text-slate-950">
                  Thank you! Your project inquiry has been received.
                </h4>
                <p className="text-sm text-slate-600 leading-relaxed">
                  We’ll review your requirements and get back to you soon.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-purple-50/60 border border-purple-100 max-w-md mx-auto text-xs text-purple-900">
                For immediate assistance or quick questions, you can also forward this directly to our founder on WhatsApp.
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href={getSubmittedWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl text-xs font-semibold text-emerald-900 bg-emerald-100 hover:bg-emerald-200 border border-emerald-300 transition-colors shadow-xs"
                >
                  <MessageSquare className="w-4 h-4 text-emerald-700 fill-emerald-700" />
                  <span>Chat on WhatsApp</span>
                </a>

                <button
                  onClick={() => {
                    setSubmitted(false);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-xl text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors"
                >
                  Close Window
                </button>
              </div>
            </div>
          ) : (
            /* Inquiry Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {errorMsg && (
                <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                  {errorMsg}
                </div>
              )}

              {/* Honeypot for spam bots */}
              <input
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                className="hidden"
                tabIndex={-1}
                autoComplete="off"
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
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
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
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
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
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
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
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600 focus:ring-1 focus:ring-purple-600"
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
                  {contactMethodOptions.map((method) => {
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
                  rows={3}
                  value={formData.projectDetails}
                  onChange={(e) => setFormData({ ...formData, projectDetails: e.target.value })}
                  placeholder="Tell us about what you want to build or achieve, target timelines, or reference links..."
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md shadow-purple-500/20 active:scale-95 transition-all disabled:opacity-50"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{submitting ? 'Submitting...' : 'Submit Project Inquiry'}</span>
                </button>

                <div className="flex items-center gap-2 text-[11px] text-slate-500">
                  <ShieldCheck className="w-4 h-4 text-purple-600" />
                  <span>Stored securely in studio database</span>
                </div>
              </div>
            </form>
          )}
        </div>

      </div>
    </div>
  );
};
