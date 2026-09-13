import React, { useState } from 'react';
import { ProjectInquiry, InquiryStatus } from '../../types';
import { updateInquiryStatus, deleteInquiry } from '../../services/api';
import {
  Search,
  MessageSquare,
  Phone,
  Mail,
  Trash2,
  Edit,
  X,
  CheckCircle,
  Clock,
  Send,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { PREFILLED_WHATSAPP_MESSAGES } from '../../config/contactConfig';

interface AdminInquiriesProps {
  inquiries: ProjectInquiry[];
  onRefresh: () => void;
  selectedInquiry?: ProjectInquiry | null;
}

export const AdminInquiries: React.FC<AdminInquiriesProps> = ({
  inquiries,
  onRefresh,
  selectedInquiry: initialSelected,
}) => {
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [activeInquiry, setActiveInquiry] = useState<ProjectInquiry | null>(initialSelected || null);
  const [editingNotes, setEditingNotes] = useState(false);
  const [adminNotesText, setAdminNotesText] = useState('');
  const [updating, setUpdating] = useState(false);

  const statuses: InquiryStatus[] = [
    'New',
    'Contacted',
    'Qualified',
    'Proposal Sent',
    'In Progress',
    'Completed',
    'Rejected',
  ];

  const handleSelectInquiry = (inq: ProjectInquiry) => {
    setActiveInquiry(inq);
    setAdminNotesText(inq.admin_notes || '');
    setEditingNotes(false);
  };

  const handleStatusChange = async (newStatus: InquiryStatus) => {
    if (!activeInquiry) return;
    setUpdating(true);
    try {
      const updated = await updateInquiryStatus(activeInquiry.id, newStatus, adminNotesText);
      setActiveInquiry(updated);
      onRefresh();
    } catch (err: any) {
      alert('Failed to update status: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleSaveNotes = async () => {
    if (!activeInquiry) return;
    setUpdating(true);
    try {
      const updated = await updateInquiryStatus(activeInquiry.id, activeInquiry.status, adminNotesText);
      setActiveInquiry(updated);
      setEditingNotes(false);
      onRefresh();
    } catch (err: any) {
      alert('Failed to save notes: ' + err.message);
    } finally {
      setUpdating(false);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Delete inquiry from "${name}"?`)) {
      try {
        await deleteInquiry(id);
        if (activeInquiry?.id === id) setActiveInquiry(null);
        onRefresh();
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const getCleanWhatsAppUrl = (phone: string, clientName: string, service?: string) => {
    const cleanNum = phone.replace(/[^0-9]/g, '');
    const text = PREFILLED_WHATSAPP_MESSAGES.adminInquiryContact(clientName, service);
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  const filtered = inquiries.filter((inq) => {
    const matchesStatus = filterStatus === 'all' || inq.status === filterStatus;
    const query = search.toLowerCase();
    const matchesSearch =
      search === '' ||
      inq.full_name.toLowerCase().includes(query) ||
      (inq.business_name && inq.business_name.toLowerCase().includes(query)) ||
      inq.phone.toLowerCase().includes(query) ||
      inq.email.toLowerCase().includes(query) ||
      inq.service_required.toLowerCase().includes(query);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-950">
            Project Inquiries
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage incoming prospective client leads, update workflow status, and initiate WhatsApp conversations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-600 bg-white px-3 py-1.5 rounded-xl border border-slate-200">
            Total: {inquiries.length} | New: {inquiries.filter((i) => i.status === 'New').length}
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by client name, business, email, or phone number..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-purple-600"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 sm:pb-0">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-purple-600 font-semibold text-slate-700"
          >
            <option value="all">All Statuses</option>
            {statuses.map((st) => (
              <option key={st} value={st}>
                {st}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Inquiries Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3.5">Client & Business</th>
                <th className="px-4 py-3.5">Service Required</th>
                <th className="px-4 py-3.5">Budget</th>
                <th className="px-4 py-3.5">Contact Method</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Date</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                    No project inquiries found.
                  </td>
                </tr>
              ) : (
                filtered.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => handleSelectInquiry(inq)}
                    className="hover:bg-purple-50/30 cursor-pointer transition-colors"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-bold text-slate-900">{inq.full_name}</div>
                      {inq.business_name && (
                        <div className="text-[11px] text-slate-500">{inq.business_name}</div>
                      )}
                      <div className="text-[11px] text-slate-400">{inq.phone}</div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="font-semibold text-purple-700 block">
                        {inq.service_required}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 text-slate-700 font-medium">
                      {inq.budget_range}
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-100 text-slate-700">
                        {inq.preferred_contact}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
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
                    </td>

                    <td className="px-4 py-3.5 text-slate-400 text-[11px]">
                      {new Date(inq.created_at).toLocaleDateString()}
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-2" onClick={(e) => e.stopPropagation()}>
                        <a
                          href={getCleanWhatsAppUrl(inq.phone, inq.full_name, inq.service_required)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 transition-colors"
                          title="Open WhatsApp Chat"
                        >
                          <MessageSquare className="w-3.5 h-3.5 fill-emerald-600 text-emerald-600" />
                          <span>Chat</span>
                        </a>

                        <button
                          onClick={() => handleDelete(inq.id, inq.full_name)}
                          className="p-1 rounded-lg text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Inquiry"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inquiry Detail Drawer / Modal */}
      {activeInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs">
          <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-purple-700 block">
                  Inquiry Details
                </span>
                <h3 className="font-heading font-extrabold text-xl text-slate-950">
                  {activeInquiry.full_name}
                </h3>
                {activeInquiry.business_name && (
                  <p className="text-xs text-slate-500">{activeInquiry.business_name}</p>
                )}
              </div>

              <button
                onClick={() => setActiveInquiry(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick Contact Bar */}
            <div className="flex flex-wrap gap-2">
              <a
                href={getCleanWhatsAppUrl(
                  activeInquiry.phone,
                  activeInquiry.full_name,
                  activeInquiry.service_required
                )}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 hover:bg-emerald-100 transition-colors"
              >
                <MessageSquare className="w-4 h-4 fill-emerald-600 text-emerald-600" />
                <span>Open WhatsApp Chat ({activeInquiry.phone})</span>
              </a>

              <a
                href={`tel:${activeInquiry.phone}`}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 border border-slate-200 hover:bg-slate-200 transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-slate-600" />
                <span>Call Phone</span>
              </a>

              {activeInquiry.email && (
                <a
                  href={`mailto:${activeInquiry.email}`}
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-blue-800 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5 text-blue-600" />
                  <span>Email</span>
                </a>
              )}
            </div>

            {/* Status Update Selector */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
              <label className="block text-xs font-bold text-slate-700">
                Update Status
              </label>
              <div className="flex flex-wrap gap-2">
                {statuses.map((st) => (
                  <button
                    key={st}
                    onClick={() => handleStatusChange(st)}
                    disabled={updating}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                      activeInquiry.status === st
                        ? 'bg-purple-600 text-white border-purple-600 shadow-xs'
                        : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Project Specs Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Service Required
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {activeInquiry.service_required}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Budget Range
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {activeInquiry.budget_range}
                </span>
              </div>

              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                  Preferred Contact
                </span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  {activeInquiry.preferred_contact}
                </span>
              </div>
            </div>

            {/* Detailed Requirements Message */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                Client's Project Requirements & Notes
              </label>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 whitespace-pre-wrap leading-relaxed">
                {activeInquiry.project_details || 'No additional project details provided.'}
              </div>
            </div>

            {/* Internal Admin Notes */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-700">
                  Internal Studio Notes
                </label>
                {!editingNotes ? (
                  <button
                    onClick={() => setEditingNotes(true)}
                    className="text-xs text-purple-600 font-semibold hover:underline"
                  >
                    Edit Notes
                  </button>
                ) : (
                  <button
                    onClick={handleSaveNotes}
                    className="text-xs text-emerald-600 font-semibold hover:underline"
                  >
                    Save Notes
                  </button>
                )}
              </div>

              {editingNotes ? (
                <textarea
                  rows={3}
                  value={adminNotesText}
                  onChange={(e) => setAdminNotesText(e.target.value)}
                  placeholder="e.g. Sent sample prototype links on WhatsApp; follow up on Thursday regarding domain access..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-purple-600"
                />
              ) : (
                <div className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 text-xs text-amber-900">
                  {activeInquiry.admin_notes || 'No internal notes added yet. Click "Edit Notes" to write follow-up notes.'}
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Submitted: {new Date(activeInquiry.created_at).toLocaleString()}</span>
              <button
                onClick={() => setActiveInquiry(null)}
                className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold"
              >
                Close Drawer
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
