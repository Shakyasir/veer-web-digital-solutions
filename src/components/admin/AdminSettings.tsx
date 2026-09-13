import React, { useState, useEffect } from 'react';
import { BusinessSettings } from '../../types';
import { fetchSettings, updateSettings, changeAdminPassword } from '../../services/api';
import { Save, CheckCircle2, Lock, ShieldCheck, Phone, Mail, Globe, Share2 } from 'lucide-react';
import { syncContactConfigFromSettings } from '../../config/contactConfig';

interface AdminSettingsProps {
  onSettingsUpdated?: () => void;
}

export const AdminSettings: React.FC<AdminSettingsProps> = ({ onSettingsUpdated }) => {
  const [settings, setSettings] = useState<BusinessSettings>({
    businessName: 'VEER WEB & DIGITAL SOLUTIONS',
    tagline: 'Build • Grow • Create',
    positioning:
      'Professional websites, social media solutions and AI-assisted video production designed to help businesses build, grow and create.',
    phone: '+91 70272 06714',
    phoneRaw: '+917027206714',
    whatsappNumber: '917027206714',
    email: '',
    workingHours: 'Mon – Sat: 10:00 AM – 7:30 PM IST',
    instagram: '',
    linkedin: '',
    youtube: '',
  });

  const [saving, setSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Password state
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [savingPassword, setSavingPassword] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const data = await fetchSettings();
      setSettings(data);
      syncContactConfigFromSettings(data);
    } catch (err) {
      console.error('Failed to load settings:', err);
    }
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);
    setSavedSuccess(false);

    try {
      const cleanWhatsapp = (settings.whatsappNumber || '917027206714').replace(/[^0-9]/g, '');
      const cleanPhoneRaw = settings.phone.replace(/[^0-9+]/g, '');

      const payload = {
        ...settings,
        whatsappNumber: cleanWhatsapp,
        phoneRaw: cleanPhoneRaw,
      };

      const updated = await updateSettings(payload);
      setSettings(updated);
      syncContactConfigFromSettings(updated);
      setSavedSuccess(true);
      if (onSettingsUpdated) onSettingsUpdated();
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update settings');
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 6) {
      setPasswordMsg('Password must be at least 6 characters long');
      return;
    }
    setSavingPassword(true);
    setPasswordMsg(null);
    try {
      await changeAdminPassword(newPassword);
      setPasswordMsg('Admin password updated successfully.');
      setNewPassword('');
    } catch (err: any) {
      setPasswordMsg('Error updating password: ' + err.message);
    } finally {
      setSavingPassword(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <h1 className="font-heading font-extrabold text-2xl text-slate-950">
          Website & Business Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure business name, tagline, centralized contact numbers, and social links. Any updates here immediately refresh the public website.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Settings saved successfully! The public website has been updated with these details.</span>
        </div>
      )}

      {errorMsg && (
        <div className="p-4 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-800">
          {errorMsg}
        </div>
      )}

      {/* Main Settings Form */}
      <form onSubmit={handleSaveSettings} className="space-y-6">
        
        {/* Brand Information */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Globe className="w-4 h-4 text-purple-600" />
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Brand Identity
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Name
              </label>
              <input
                type="text"
                required
                value={settings.businessName}
                onChange={(e) => setSettings({ ...settings, businessName: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tagline
              </label>
              <input
                type="text"
                required
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Positioning Statement
            </label>
            <textarea
              rows={2}
              value={settings.positioning}
              onChange={(e) => setSettings({ ...settings, positioning: e.target.value })}
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
            />
          </div>
        </div>

        {/* Contact Numbers & Channels */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Phone className="w-4 h-4 text-purple-600" />
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Contact & WhatsApp Numbers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Primary Phone Display
              </label>
              <input
                type="text"
                required
                value={settings.phone}
                onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                placeholder="+91 70272 06714"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Formatted for display across headers, footer, and call buttons.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                WhatsApp Direct Number (Digits only)
              </label>
              <input
                type="text"
                required
                value={settings.whatsappNumber}
                onChange={(e) => setSettings({ ...settings, whatsappNumber: e.target.value })}
                placeholder="917027206714"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600 font-mono"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                Used for wa.me links. Keep country code without + or spaces (e.g. 917027206714).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Business Email (Optional / Placeholder)
              </label>
              <input
                type="email"
                value={settings.email || ''}
                onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                placeholder="your@email.com (leave empty to keep email hidden)"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
              />
              <p className="text-[11px] text-slate-400 mt-1">
                If left blank, the website cleanly hides email elements to avoid broken mailto: links.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Working Hours
              </label>
              <input
                type="text"
                value={settings.workingHours}
                onChange={(e) => setSettings({ ...settings, workingHours: e.target.value })}
                placeholder="Mon – Sat: 10:00 AM – 7:30 PM IST"
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
          <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
            <Share2 className="w-4 h-4 text-purple-600" />
            <h2 className="font-heading font-bold text-sm text-slate-900">
              Social Media Channels
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Instagram URL
              </label>
              <input
                type="url"
                value={settings.instagram || ''}
                onChange={(e) => setSettings({ ...settings, instagram: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={settings.linkedin || ''}
                onChange={(e) => setSettings({ ...settings, linkedin: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                YouTube URL
              </label>
              <input
                type="url"
                value={settings.youtube || ''}
                onChange={(e) => setSettings({ ...settings, youtube: e.target.value })}
                placeholder="https://youtube.com/@..."
                className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-sm transition-all disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving...' : 'Save Settings to Studio'}</span>
          </button>
        </div>
      </form>

      {/* Admin Password Change Form */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
          <Lock className="w-4 h-4 text-purple-600" />
          <h2 className="font-heading font-bold text-sm text-slate-900">
            Security & Admin Password
          </h2>
        </div>

        <form onSubmit={handleChangePassword} className="space-y-4 max-w-md">
          {passwordMsg && (
            <div className="p-3 rounded-xl bg-slate-100 text-slate-700 text-xs font-medium">
              {passwordMsg}
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              New Admin Password
            </label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Minimum 6 characters"
              className="w-full px-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
            />
          </div>

          <button
            type="submit"
            disabled={savingPassword}
            className="px-5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-200 transition-colors"
          >
            {savingPassword ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      </div>

    </div>
  );
};
