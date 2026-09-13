import React, { useState } from 'react';
import {
  PortfolioItem,
  ServiceCategory,
  ProjectStatus,
} from '../../types';
import {
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
  duplicatePortfolioProject,
  uploadImage,
} from '../../services/api';
import {
  Plus,
  Edit2,
  Trash2,
  Copy,
  Upload,
  Sparkles,
  ExternalLink,
  Search,
  Check,
  X,
  ShieldCheck,
  Eye,
} from 'lucide-react';

interface AdminPortfolioProps {
  projects: PortfolioItem[];
  onRefresh: () => void;
  onOpenCreateModal?: boolean;
}

export const AdminPortfolio: React.FC<AdminPortfolioProps> = ({
  projects,
  onRefresh,
}) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [editingProject, setEditingProject] = useState<PortfolioItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [uploadingCover, setUploadingCover] = useState(false);
  const [uploadingGallery, setUploadingGallery] = useState(false);
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Form State
  const initialForm: Partial<PortfolioItem> = {
    title: '',
    slug: '',
    category: 'website',
    subcategory: '',
    description: '',
    coverImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80',
    galleryImages: [],
    videoUrl: '',
    projectUrl: '',
    clientName: '',
    projectType: 'Website Development',
    tools: ['React', 'Tailwind CSS', 'TypeScript'],
    services: ['UI/UX Design', 'Full-Stack Development'],
    challenge: '',
    approach: '',
    whatWeCreated: '',
    deliverables: ['Custom Web Architecture', 'Mobile-First Responsive Layout'],
    outcome: '',
    status: 'published',
    isDemoProject: true,
    featured: false,
  };

  const [formData, setFormData] = useState<Partial<PortfolioItem>>(initialForm);

  // Helpers for array string inputs
  const [toolsInput, setToolsInput] = useState('');
  const [servicesInput, setServicesInput] = useState('');
  const [deliverablesInput, setDeliverablesInput] = useState('');
  const [galleryUrlsInput, setGalleryUrlsInput] = useState('');

  const openCreateModal = () => {
    setFormData(initialForm);
    setToolsInput(initialForm.tools?.join(', ') || '');
    setServicesInput(initialForm.services?.join(', ') || '');
    setDeliverablesInput(initialForm.deliverables?.join('\n') || '');
    setGalleryUrlsInput('');
    setIsCreating(true);
    setEditingProject(null);
    setErrorMsg(null);
  };

  const openEditModal = (project: PortfolioItem) => {
    setEditingProject(project);
    setFormData({ ...project });
    setToolsInput(project.tools ? project.tools.join(', ') : '');
    setServicesInput(project.services ? project.services.join(', ') : '');
    setDeliverablesInput(project.deliverables ? project.deliverables.join('\n') : '');
    setGalleryUrlsInput(project.galleryImages ? project.galleryImages.join('\n') : '');
    setIsCreating(false);
    setErrorMsg(null);
  };

  const closeModal = () => {
    setIsCreating(false);
    setEditingProject(null);
  };

  const handleCoverUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingCover(true);
    try {
      const res = await uploadImage(file);
      setFormData((prev) => ({ ...prev, coverImage: res.url }));
    } catch (err: any) {
      alert('Cover upload failed: ' + err.message);
    } finally {
      setUploadingCover(false);
    }
  };

  const handleGalleryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    setUploadingGallery(true);
    try {
      const uploadedUrls: string[] = [];
      for (let i = 0; i < files.length; i++) {
        const res = await uploadImage(files[i]);
        uploadedUrls.push(res.url);
      }
      const existing = formData.galleryImages || [];
      const updated = [...existing, ...uploadedUrls];
      setFormData((prev) => ({ ...prev, galleryImages: updated }));
      setGalleryUrlsInput(updated.join('\n'));
    } catch (err: any) {
      alert('Gallery upload failed: ' + err.message);
    } finally {
      setUploadingGallery(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setErrorMsg(null);

    try {
      const parsedTools = toolsInput
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean);
      const parsedServices = servicesInput
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      const parsedDeliverables = deliverablesInput
        .split('\n')
        .map((d) => d.trim())
        .filter(Boolean);
      const parsedGallery = galleryUrlsInput
        .split('\n')
        .map((g) => g.trim())
        .filter(Boolean);

      const payload = {
        ...formData,
        tools: parsedTools,
        services: parsedServices,
        deliverables: parsedDeliverables,
        galleryImages: parsedGallery,
      };

      if (isCreating) {
        await createPortfolioProject(payload);
      } else if (editingProject) {
        await updatePortfolioProject(editingProject.id, payload);
      }

      closeModal();
      onRefresh();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to save portfolio project');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string, title: string) => {
    if (confirm(`Are you sure you want to delete "${title}"? This cannot be undone.`)) {
      try {
        await deletePortfolioProject(id);
        onRefresh();
      } catch (err: any) {
        alert('Delete failed: ' + err.message);
      }
    }
  };

  const handleDuplicate = async (id: string) => {
    try {
      await duplicatePortfolioProject(id);
      onRefresh();
    } catch (err: any) {
      alert('Duplicate failed: ' + err.message);
    }
  };

  const filtered = projects.filter((p) => {
    const matchesCat = filterCategory === 'all' || p.category === filterCategory;
    const matchesSearch =
      search === '' ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase()) ||
      (p.clientName && p.clientName.toLowerCase().includes(search.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-950">
            Portfolio Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add, update, or reorganize studio projects and prototypes. All edits reflect dynamically on the public website.
          </p>
        </div>

        <button
          onClick={openCreateModal}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-sm transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search projects by title, client, or keyword..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-purple-600"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:outline-none focus:border-purple-600 font-medium text-slate-700"
          >
            <option value="all">All Categories</option>
            <option value="website">Website Solutions</option>
            <option value="social-media">Social Media</option>
            <option value="ai-video">AI Video Production</option>
          </select>
        </div>
      </div>

      {/* Projects Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 uppercase tracking-wider font-semibold">
              <tr>
                <th className="px-5 py-3.5">Cover & Title</th>
                <th className="px-4 py-3.5">Category</th>
                <th className="px-4 py-3.5">Type & Tools</th>
                <th className="px-4 py-3.5">Status</th>
                <th className="px-4 py-3.5">Badges</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-slate-400">
                    No projects found matching your criteria.
                  </td>
                </tr>
              ) : (
                filtered.map((proj) => (
                  <tr key={proj.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="px-5 py-3.5">
                      <div className="flex items-center gap-3">
                        <img
                          src={proj.coverImage}
                          alt={proj.title}
                          className="w-14 h-10 rounded-lg object-cover bg-slate-100 border border-slate-200 shrink-0"
                        />
                        <div className="max-w-xs">
                          <span className="font-bold text-slate-900 block truncate">
                            {proj.title}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            /{proj.slug}
                          </span>
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span className="capitalize font-semibold text-slate-700">
                        {proj.category === 'website'
                          ? 'Website'
                          : proj.category === 'social-media'
                          ? 'Social Media'
                          : 'AI Video'}
                      </span>
                      <span className="block text-[11px] text-slate-400">
                        {proj.subcategory}
                      </span>
                    </td>

                    <td className="px-4 py-3.5 max-w-[200px]">
                      <span className="text-slate-700 block truncate">
                        {proj.projectType}
                      </span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {proj.tools.slice(0, 2).map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.5 rounded text-[10px] bg-slate-100 text-slate-600"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          proj.status === 'published'
                            ? 'bg-emerald-100 text-emerald-800'
                            : proj.status === 'draft'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {proj.status}
                      </span>
                    </td>

                    <td className="px-4 py-3.5">
                      <div className="flex flex-col gap-1">
                        {proj.featured && (
                          <span className="text-[10px] font-bold text-purple-600 flex items-center gap-1">
                            <Sparkles className="w-3 h-3" /> Featured
                          </span>
                        )}
                        {proj.isDemoProject ? (
                          <span className="text-[10px] text-amber-700 font-medium">
                            Demo Project
                          </span>
                        ) : (
                          <span className="text-[10px] text-emerald-700 font-medium">
                            Client Project
                          </span>
                        )}
                      </div>
                    </td>

                    <td className="px-5 py-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => openEditModal(proj)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-purple-600 hover:bg-purple-50 transition-colors"
                          title="Edit Project"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDuplicate(proj.id)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                          title="Duplicate Project"
                        >
                          <Copy className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(proj.id, proj.title)}
                          className="p-1.5 rounded-lg text-slate-600 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Delete Project"
                        >
                          <Trash2 className="w-4 h-4" />
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

      {/* Add / Edit Project Modal */}
      {(isCreating || editingProject) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/60 backdrop-blur-xs overflow-y-auto">
          <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-white border border-slate-200 rounded-3xl shadow-2xl p-6 sm:p-8 space-y-6 my-auto">
            
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="font-heading font-extrabold text-xl text-slate-950">
                  {isCreating ? 'Add New Portfolio Project' : `Edit: ${formData.title}`}
                </h3>
                <p className="text-xs text-slate-500">
                  Update content, gallery images, or switch between demo and client designations.
                </p>
              </div>
              <button
                onClick={closeModal}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {errorMsg && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
              {/* Basic Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title || ''}
                    onChange={(e) => {
                      const val = e.target.value;
                      setFormData((prev) => ({
                        ...prev,
                        title: val,
                        slug: prev.slug || val.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
                      }));
                    }}
                    placeholder="e.g. Aura Cafe & Specialty Bakery"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Slug (URL identifier)
                  </label>
                  <input
                    type="text"
                    value={formData.slug || ''}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="aura-cafe-specialty-bakery"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Category, Subcategory & Project Type */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: e.target.value as ServiceCategory })
                    }
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  >
                    <option value="website">Website Solutions</option>
                    <option value="social-media">Social Media</option>
                    <option value="ai-video">AI Video Production</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subcategory
                  </label>
                  <input
                    type="text"
                    value={formData.subcategory || ''}
                    onChange={(e) => setFormData({ ...formData, subcategory: e.target.value })}
                    placeholder="e.g. Business Website / Brand Identity"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Project Type
                  </label>
                  <input
                    type="text"
                    value={formData.projectType || ''}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    placeholder="e.g. Landing Page / Short-Form Reel"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Client Name & External Links */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Client Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.clientName || ''}
                    onChange={(e) => setFormData({ ...formData, clientName: e.target.value })}
                    placeholder="Leave empty if internal concept"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Live Project URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.projectUrl || ''}
                    onChange={(e) => setFormData({ ...formData, projectUrl: e.target.value })}
                    placeholder="https://..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Video URL (Optional)
                  </label>
                  <input
                    type="url"
                    value={formData.videoUrl || ''}
                    onChange={(e) => setFormData({ ...formData, videoUrl: e.target.value })}
                    placeholder="https://... (MP4 / YouTube / Vimeo)"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Description *
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.description || ''}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Concise overview summarizing what this solution does..."
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                />
              </div>

              {/* Cover Image & Upload */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <label className="block text-xs font-bold text-slate-800">
                  Cover Image
                </label>
                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  {formData.coverImage && (
                    <img
                      src={formData.coverImage}
                      alt="Cover Preview"
                      className="w-24 h-16 rounded-xl object-cover border border-slate-200 bg-slate-200 shrink-0"
                    />
                  )}
                  <input
                    type="text"
                    value={formData.coverImage || ''}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    placeholder="Enter image URL or upload below"
                    className="flex-1 px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-purple-600"
                  />
                  <label className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingCover ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleCoverUpload}
                      disabled={uploadingCover}
                      className="hidden"
                    />
                  </label>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-800">
                    Gallery Images (one URL per line)
                  </label>
                  <label className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-200 cursor-pointer">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingGallery ? 'Uploading...' : 'Upload Asset(s)'}</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleGalleryUpload}
                      disabled={uploadingGallery}
                      className="hidden"
                    />
                  </label>
                </div>
                <textarea
                  rows={2}
                  value={galleryUrlsInput}
                  onChange={(e) => setGalleryUrlsInput(e.target.value)}
                  placeholder="https://image1.jpg&#10;https://image2.jpg"
                  className="w-full px-3 py-2 text-xs rounded-xl bg-white border border-slate-200 text-slate-900 focus:outline-none focus:border-purple-600 font-mono"
                />
              </div>

              {/* Case Study Deep-Dive Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Challenge / Requirement
                  </label>
                  <textarea
                    rows={3}
                    value={formData.challenge || ''}
                    onChange={(e) => setFormData({ ...formData, challenge: e.target.value })}
                    placeholder="Describe the initial friction or business problem..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Our Approach
                  </label>
                  <textarea
                    rows={3}
                    value={formData.approach || ''}
                    onChange={(e) => setFormData({ ...formData, approach: e.target.value })}
                    placeholder="Describe the strategy, UI styling and conversion design..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    What We Created
                  </label>
                  <textarea
                    rows={3}
                    value={formData.whatWeCreated || ''}
                    onChange={(e) => setFormData({ ...formData, whatWeCreated: e.target.value })}
                    placeholder="Summary of delivered architecture and assets..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Outcome & Value
                  </label>
                  <textarea
                    rows={3}
                    value={formData.outcome || ''}
                    onChange={(e) => setFormData({ ...formData, outcome: e.target.value })}
                    placeholder="Resulting performance benchmarks or user feedback..."
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Tools & Key Deliverables */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Tools Used (comma separated)
                  </label>
                  <input
                    type="text"
                    value={toolsInput}
                    onChange={(e) => setToolsInput(e.target.value)}
                    placeholder="React, Tailwind, Figma, CapCut"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Key Deliverables (one per line)
                  </label>
                  <textarea
                    rows={2}
                    value={deliverablesInput}
                    onChange={(e) => setDeliverablesInput(e.target.value)}
                    placeholder="Mobile Responsive Layout&#10;WhatsApp Lead Trigger"
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
                  />
                </div>
              </div>

              {/* Status & Checkbox Flags */}
              <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-6">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                      Publication Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) =>
                        setFormData({ ...formData, status: e.target.value as ProjectStatus })
                      }
                      className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 border border-slate-200 font-semibold"
                    >
                      <option value="published">Published</option>
                      <option value="draft">Draft</option>
                      <option value="archived">Archived</option>
                    </select>
                  </div>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer pt-4">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.featured)}
                      onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <span>Featured on Homepage</span>
                  </label>

                  <label className="flex items-center gap-2 text-xs font-semibold text-slate-800 cursor-pointer pt-4">
                    <input
                      type="checkbox"
                      checked={Boolean(formData.isDemoProject)}
                      onChange={(e) => setFormData({ ...formData, isDemoProject: e.target.checked })}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Is Demo Project? (Honest badge)</span>
                  </label>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={saving}
                    className="px-6 py-2.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 shadow-sm disabled:opacity-50"
                  >
                    {saving ? 'Saving...' : isCreating ? 'Create Project' : 'Save Changes'}
                  </button>
                </div>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
};
