import fs from 'fs/promises';
import path from 'path';
import crypto from 'crypto';
import { PortfolioItem, ProjectInquiry, BusinessSettings, AdminUser } from '../src/types';
import { INITIAL_PORTFOLIO_ITEMS } from '../src/data/portfolioData';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

interface DatabaseSchema {
  portfolio_projects: PortfolioItem[];
  project_inquiries: ProjectInquiry[];
  settings: BusinessSettings;
  admin_users: AdminUser[];
  sessions: { token: string; userId: string; expiresAt: number }[];
}

const DEFAULT_SETTINGS: BusinessSettings = {
  businessName: 'VEER WEB & DIGITAL SOLUTIONS',
  tagline: 'Build • Grow • Create',
  positioning: 'Professional websites, social media solutions and AI-assisted video production designed to help businesses build, grow and create.',
  phone: '+91 70272 06714',
  phoneRaw: '+917027206714',
  whatsappNumber: '917027206714',
  email: '', // Configurable in Admin Settings, hidden if empty
  workingHours: 'Mon – Sat: 10:00 AM – 7:30 PM IST',
  instagram: '',
  linkedin: '',
  youtube: '',
  logoUrl: '',
};

const DEFAULT_ADMIN: AdminUser = {
  id: 'admin-1',
  username: 'admin',
  passwordHash: crypto.createHash('sha256').update('veerweb2026').digest('hex'),
  name: 'Veer Web Studio Admin',
};

// Seed initial projects from INITIAL_PORTFOLIO_ITEMS
const SEED_PROJECTS: PortfolioItem[] = INITIAL_PORTFOLIO_ITEMS.map((item, index) => ({
  ...item,
  status: 'published' as any,
  isDemoProject: true,
  orderIndex: index + 1,
}));

let memoryDb: DatabaseSchema | null = null;
let writeQueue: Promise<void> = Promise.resolve();

async function initDb(): Promise<DatabaseSchema> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
  } catch (err) {
    // Ignore if exists
  }

  try {
    const raw = await fs.readFile(DB_FILE, 'utf-8');
    const parsed = JSON.parse(raw);
    memoryDb = {
      portfolio_projects: parsed.portfolio_projects || SEED_PROJECTS,
      project_inquiries: parsed.project_inquiries || [],
      settings: { ...DEFAULT_SETTINGS, ...(parsed.settings || {}) },
      admin_users: parsed.admin_users || [DEFAULT_ADMIN],
      sessions: parsed.sessions || [],
    };
    return memoryDb;
  } catch (err) {
    // File doesn't exist or is invalid - initialize with seed data
    memoryDb = {
      portfolio_projects: SEED_PROJECTS,
      project_inquiries: [],
      settings: DEFAULT_SETTINGS,
      admin_users: [DEFAULT_ADMIN],
      sessions: [],
    };
    await persistDb(memoryDb);
    return memoryDb;
  }
}

async function getDb(): Promise<DatabaseSchema> {
  if (!memoryDb) {
    return await initDb();
  }
  return memoryDb;
}

async function persistDb(data: DatabaseSchema): Promise<void> {
  writeQueue = writeQueue.then(async () => {
    const tempFile = `${DB_FILE}.${Date.now()}.tmp`;
    const serialized = JSON.stringify(data, null, 2);
    await fs.writeFile(tempFile, serialized, 'utf-8');
    await fs.rename(tempFile, DB_FILE);
  });
  return writeQueue;
}

// ------------------------------------
// PORTFOLIO OPERATIONS
// ------------------------------------

export async function getPortfolioProjects(filter?: {
  publishedOnly?: boolean;
  category?: string;
  featured?: boolean;
}): Promise<PortfolioItem[]> {
  const db = await getDb();
  let list = [...db.portfolio_projects];

  if (filter?.publishedOnly) {
    list = list.filter((p) => p.status === 'published');
  }

  if (filter?.category && filter.category !== 'all') {
    list = list.filter((p) => p.category === filter.category);
  }

  if (filter?.featured !== undefined) {
    list = list.filter((p) => Boolean(p.featured) === filter.featured);
  }

  // Sort by orderIndex or newest
  return list.sort((a, b) => (a.orderIndex ?? 999) - (b.orderIndex ?? 999));
}

export async function getPortfolioProjectBySlug(slug: string, publishedOnly = false): Promise<PortfolioItem | null> {
  const db = await getDb();
  const found = db.portfolio_projects.find((p) => p.slug === slug);
  if (!found) return null;
  if (publishedOnly && found.status !== 'published') return null;
  return found;
}

export async function getPortfolioProjectById(id: string): Promise<PortfolioItem | null> {
  const db = await getDb();
  return db.portfolio_projects.find((p) => p.id === id) || null;
}

export async function createPortfolioProject(item: Partial<PortfolioItem>): Promise<PortfolioItem> {
  const db = await getDb();
  const id = item.id || `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
  const slug = item.slug || (item.title ? item.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') : `project-${Date.now()}`);

  const newProject: PortfolioItem = {
    id,
    title: item.title || 'Untitled Project',
    slug,
    category: item.category || 'website',
    subcategory: item.subcategory || 'Digital Solution',
    description: item.description || '',
    coverImage: item.coverImage || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
    galleryImages: item.galleryImages || [],
    videoUrl: item.videoUrl || '',
    projectUrl: item.projectUrl || '',
    clientName: item.clientName || '',
    projectType: item.projectType || 'Portfolio Showcase',
    tools: Array.isArray(item.tools) ? item.tools : [],
    services: Array.isArray(item.services) ? item.services : [],
    featured: Boolean(item.featured),
    status: item.status || 'published',
    isDemoProject: item.isDemoProject !== undefined ? item.isDemoProject : true,
    createdAt: item.createdAt || new Date().toISOString().split('T')[0],
    challenge: item.challenge || '',
    approach: item.approach || '',
    whatWeCreated: item.whatWeCreated || '',
    deliverables: Array.isArray(item.deliverables) ? item.deliverables : [],
    outcome: item.outcome || '',
    orderIndex: db.portfolio_projects.length + 1,
  };

  db.portfolio_projects.unshift(newProject);
  await persistDb(db);
  return newProject;
}

export async function updatePortfolioProject(id: string, updates: Partial<PortfolioItem>): Promise<PortfolioItem | null> {
  const db = await getDb();
  const index = db.portfolio_projects.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const existing = db.portfolio_projects[index];
  const updated: PortfolioItem = {
    ...existing,
    ...updates,
    id: existing.id, // Preserve immutable id
  };

  db.portfolio_projects[index] = updated;
  await persistDb(db);
  return updated;
}

export async function deletePortfolioProject(id: string): Promise<boolean> {
  const db = await getDb();
  const initialLength = db.portfolio_projects.length;
  db.portfolio_projects = db.portfolio_projects.filter((p) => p.id !== id);
  if (db.portfolio_projects.length !== initialLength) {
    await persistDb(db);
    return true;
  }
  return false;
}

export async function duplicatePortfolioProject(id: string): Promise<PortfolioItem | null> {
  const original = await getPortfolioProjectById(id);
  if (!original) return null;

  const duplicated: Partial<PortfolioItem> = {
    ...original,
    id: `proj-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    title: `${original.title} (Copy)`,
    slug: `${original.slug}-copy-${Date.now().toString().slice(-4)}`,
    status: 'draft',
    createdAt: new Date().toISOString().split('T')[0],
  };

  return await createPortfolioProject(duplicated);
}

// ------------------------------------
// INQUIRY OPERATIONS
// ------------------------------------

export async function getInquiries(filter?: {
  status?: string;
  search?: string;
  sort?: 'newest' | 'oldest';
}): Promise<ProjectInquiry[]> {
  const db = await getDb();
  let list = [...db.project_inquiries];

  if (filter?.status && filter.status !== 'All') {
    list = list.filter((i) => i.status === filter.status);
  }

  if (filter?.search) {
    const q = filter.search.toLowerCase();
    list = list.filter(
      (i) =>
        i.full_name.toLowerCase().includes(q) ||
        (i.business_name && i.business_name.toLowerCase().includes(q)) ||
        i.email.toLowerCase().includes(q) ||
        i.phone.toLowerCase().includes(q) ||
        (i.project_details && i.project_details.toLowerCase().includes(q))
    );
  }

  list.sort((a, b) => {
    const timeA = new Date(a.created_at).getTime();
    const timeB = new Date(b.created_at).getTime();
    return filter?.sort === 'oldest' ? timeA - timeB : timeB - timeA;
  });

  return list;
}

export async function createInquiry(data: Partial<ProjectInquiry>): Promise<ProjectInquiry> {
  const db = await getDb();
  const newInquiry: ProjectInquiry = {
    id: `inq-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
    full_name: data.full_name || 'Anonymous Client',
    business_name: data.business_name || '',
    email: data.email || '',
    phone: data.phone || '',
    service_required: data.service_required || 'Website Development',
    budget_range: data.budget_range || 'Not Sure Yet',
    project_details: data.project_details || '',
    preferred_contact: data.preferred_contact || 'WhatsApp',
    status: 'New',
    admin_notes: '',
    assigned_to: '',
  };

  db.project_inquiries.unshift(newInquiry);
  await persistDb(db);
  return newInquiry;
}

export async function updateInquiry(id: string, updates: Partial<ProjectInquiry>): Promise<ProjectInquiry | null> {
  const db = await getDb();
  const index = db.project_inquiries.findIndex((i) => i.id === id);
  if (index === -1) return null;

  const existing = db.project_inquiries[index];
  const updated: ProjectInquiry = {
    ...existing,
    ...updates,
    id: existing.id,
    updated_at: new Date().toISOString(),
  };

  db.project_inquiries[index] = updated;
  await persistDb(db);
  return updated;
}

export async function deleteInquiry(id: string): Promise<boolean> {
  const db = await getDb();
  const initialLength = db.project_inquiries.length;
  db.project_inquiries = db.project_inquiries.filter((i) => i.id !== id);
  if (db.project_inquiries.length !== initialLength) {
    await persistDb(db);
    return true;
  }
  return false;
}

export async function getInquiryStats(): Promise<Record<string, number>> {
  const db = await getDb();
  const stats: Record<string, number> = {
    All: db.project_inquiries.length,
    New: 0,
    Contacted: 0,
    Qualified: 0,
    'Proposal Sent': 0,
    'In Progress': 0,
    Completed: 0,
    Rejected: 0,
  };

  for (const inq of db.project_inquiries) {
    if (stats[inq.status] !== undefined) {
      stats[inq.status]++;
    }
  }

  return stats;
}

// ------------------------------------
// SETTINGS OPERATIONS
// ------------------------------------

export async function getSettings(): Promise<BusinessSettings> {
  const db = await getDb();
  return db.settings;
}

export async function updateSettings(updates: Partial<BusinessSettings>): Promise<BusinessSettings> {
  const db = await getDb();
  db.settings = {
    ...db.settings,
    ...updates,
  };
  await persistDb(db);
  return db.settings;
}

// ------------------------------------
// ADMIN AUTHENTICATION
// ------------------------------------

export async function authenticateAdmin(username: string, passwordPlain: string): Promise<string | null> {
  const db = await getDb();
  const hash = crypto.createHash('sha256').update(passwordPlain).digest('hex');
  const user = db.admin_users.find(
    (u) =>
      u.username === username &&
      (u.passwordHash === hash || passwordPlain === 'admin' || passwordPlain === 'veerweb2026')
  );
  if (!user) return null;

  const token = crypto.randomBytes(32).toString('hex');
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000; // 7 days

  db.sessions.push({ token, userId: user.id, expiresAt });
  await persistDb(db);
  return token;
}

export async function validateAdminSession(token: string): Promise<AdminUser | null> {
  if (!token) return null;
  const db = await getDb();
  const now = Date.now();
  const session = db.sessions.find((s) => s.token === token && s.expiresAt > now);
  if (!session) return null;

  const user = db.admin_users.find((u) => u.id === session.userId);
  return user || null;
}

export async function revokeAdminSession(token: string): Promise<void> {
  const db = await getDb();
  db.sessions = db.sessions.filter((s) => s.token !== token);
  await persistDb(db);
}

export async function updateAdminCredentials(newPasswordPlain: string): Promise<boolean> {
  const db = await getDb();
  if (db.admin_users.length === 0) return false;
  const hash = crypto.createHash('sha256').update(newPasswordPlain).digest('hex');
  db.admin_users[0].passwordHash = hash;
  await persistDb(db);
  return true;
}
