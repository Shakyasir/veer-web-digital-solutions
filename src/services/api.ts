import { PortfolioItem, ProjectInquiry, BusinessSettings, InquiryStatus } from '../types';

const ADMIN_TOKEN_KEY = 'veer_admin_token';

export function getAdminToken(): string | null {
  try {
    return localStorage.getItem(ADMIN_TOKEN_KEY);
  } catch {
    return null;
  }
}

export function setAdminToken(token: string | null) {
  try {
    if (token) {
      localStorage.setItem(ADMIN_TOKEN_KEY, token);
    } else {
      localStorage.removeItem(ADMIN_TOKEN_KEY);
    }
  } catch {}
}

function authHeaders(): HeadersInit {
  const token = getAdminToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ------------------------------------
// PORTFOLIO API
// ------------------------------------

export async function fetchPortfolioProjects(category?: string, featured?: boolean): Promise<PortfolioItem[]> {
  try {
    const params = new URLSearchParams();
    if (category && category !== 'all') params.append('category', category);
    if (featured !== undefined) params.append('featured', String(featured));

    const res = await fetch(`/api/portfolio?${params.toString()}`, {
      headers: {
        ...authHeaders(),
      },
    });

    if (!res.ok) throw new Error(`Failed to fetch portfolio: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.error('Error fetching portfolio:', err);
    // Return fallback empty array
    return [];
  }
}

export async function fetchPortfolioProjectBySlug(slug: string): Promise<PortfolioItem | null> {
  try {
    const res = await fetch(`/api/portfolio/${slug}`, {
      headers: {
        ...authHeaders(),
      },
    });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Error fetching project by slug:', err);
    return null;
  }
}

export async function createPortfolioProject(item: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const res = await fetch('/api/portfolio', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(item),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to create project');
  }
  return await res.json();
}

export async function updatePortfolioProject(id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const res = await fetch(`/api/portfolio/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(updates),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update project');
  }
  return await res.json();
}

export async function deletePortfolioProject(id: string): Promise<boolean> {
  const res = await fetch(`/api/portfolio/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete project');
  }
  return true;
}

export async function duplicatePortfolioProject(id: string): Promise<PortfolioItem> {
  const res = await fetch(`/api/portfolio/${id}/duplicate`, {
    method: 'POST',
    headers: {
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to duplicate project');
  }
  return await res.json();
}

// ------------------------------------
// PROJECT INQUIRY API
// ------------------------------------

export async function submitProjectInquiry(inquiry: {
  full_name: string;
  business_name?: string;
  email: string;
  phone: string;
  service_required: string;
  budget_range: string;
  project_details: string;
  preferred_contact: string;
}): Promise<{ success: boolean; id?: string; message?: string }> {
  const res = await fetch('/api/inquiries', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(inquiry),
  });

  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.error || 'Failed to submit project inquiry');
  }
  return data;
}

export async function fetchInquiries(params?: {
  status?: string;
  search?: string;
  sort?: 'newest' | 'oldest';
}): Promise<ProjectInquiry[]> {
  const query = new URLSearchParams();
  if (params?.status) query.append('status', params.status);
  if (params?.search) query.append('search', params.search);
  if (params?.sort) query.append('sort', params.sort);

  const res = await fetch(`/api/inquiries?${query.toString()}`, {
    headers: {
      ...authHeaders(),
    },
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to fetch inquiries');
  }
  return await res.json();
}

export async function fetchInquiryStats(): Promise<Record<string, number>> {
  const res = await fetch('/api/inquiries/stats', {
    headers: {
      ...authHeaders(),
    },
  });
  if (!res.ok) throw new Error('Failed to fetch inquiry statistics');
  return await res.json();
}

export async function updateInquiryStatus(
  id: string,
  status: InquiryStatus,
  admin_notes?: string
): Promise<ProjectInquiry> {
  const payload: any = { status };
  if (admin_notes !== undefined) payload.admin_notes = admin_notes;

  const res = await fetch(`/api/inquiries/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update inquiry');
  }
  return await res.json();
}

export async function updateInquiry(id: string, updates: Partial<ProjectInquiry>): Promise<ProjectInquiry> {
  const res = await fetch(`/api/inquiries/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update inquiry');
  }
  return await res.json();
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const res = await fetch(`/api/inquiries/${id}`, {
    method: 'DELETE',
    headers: {
      ...authHeaders(),
    },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to delete inquiry');
  }
  return true;
}

// ------------------------------------
// SETTINGS API
// ------------------------------------

export async function fetchSettings(): Promise<BusinessSettings> {
  try {
    const res = await fetch('/api/settings');
    if (!res.ok) throw new Error('Failed to fetch settings');
    return await res.json();
  } catch (err) {
    console.error('Error fetching settings:', err);
    return {
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
    };
  }
}

export async function updateSettings(settings: Partial<BusinessSettings>): Promise<BusinessSettings> {
  const res = await fetch('/api/settings', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify(settings),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to update settings');
  }
  return await res.json();
}

// ------------------------------------
// IMAGE UPLOAD API
// ------------------------------------

export async function uploadImage(file: File): Promise<{ url: string; filename: string }> {
  const formData = new FormData();
  formData.append('image', file);

  const res = await fetch('/api/upload', {
    method: 'POST',
    headers: {
      ...authHeaders(),
    },
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to upload image');
  }
  return await res.json();
}

// ------------------------------------
// AUTH API
// ------------------------------------

export async function adminLogin(password: string, username = 'admin'): Promise<{ token: string; user: any }> {
  const res = await fetch('/api/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Invalid credentials');
  }
  const data = await res.json();
  setAdminToken(data.token);
  return data;
}

export async function checkAdminAuth(): Promise<boolean> {
  const token = getAdminToken();
  if (!token) return false;
  try {
    const res = await fetch('/api/auth/me', {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) {
      setAdminToken(null);
      return false;
    }
    return true;
  } catch {
    return false;
  }
}

export async function adminLogout(): Promise<void> {
  const token = getAdminToken();
  if (token) {
    try {
      await fetch('/api/auth/logout', {
        method: 'POST',
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch {}
  }
  setAdminToken(null);
}

export async function changeAdminPassword(newPassword: string): Promise<void> {
  const res = await fetch('/api/auth/change-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...authHeaders(),
    },
    body: JSON.stringify({ newPassword }),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || 'Failed to change password');
  }
}
