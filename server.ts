import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { createServer as createViteServer } from 'vite';
import {
  getPortfolioProjects,
  getPortfolioProjectBySlug,
  getPortfolioProjectById,
  createPortfolioProject,
  updatePortfolioProject,
  deletePortfolioProject,
  duplicatePortfolioProject,
  getInquiries,
  createInquiry,
  updateInquiry,
  deleteInquiry,
  getInquiryStats,
  getSettings,
  updateSettings,
  authenticateAdmin,
  validateAdminSession,
  revokeAdminSession,
  updateAdminCredentials,
} from './server/db';

const PORT = 3000;

// Ensure uploads folder exists
const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Configure multer
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname);
    const cleanName = path.basename(file.originalname, ext).replace(/[^a-zA-Z0-9_-]/g, '');
    const filename = `${cleanName}-${Date.now()}${ext}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (_req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp|svg|gif/;
    const extname = allowed.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowed.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb(new Error('Only image files (JPEG, PNG, WebP, SVG, GIF) are allowed.'));
  },
});

async function startServer() {
  const app = express();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  // Serve static uploads
  app.use('/uploads', express.static(uploadsDir));

  // ------------------------------------
  // AUTH MIDDLEWARE
  // ------------------------------------
  const requireAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    const token = authHeader.split(' ')[1];
    const user = await validateAdminSession(token);
    if (!user) {
      return res.status(401).json({ error: 'Invalid or expired admin session' });
    }
    (req as any).adminUser = user;
    (req as any).token = token;
    next();
  };

  const optionalAdmin = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      const user = await validateAdminSession(token);
      if (user) {
        (req as any).adminUser = user;
      }
    }
    next();
  };

  // ------------------------------------
  // AUTH ROUTES
  // ------------------------------------
  app.post('/api/auth/login', async (req: Request, res: Response) => {
    try {
      const username = req.body.username || 'admin';
      const password = req.body.password;
      if (!password) {
        return res.status(400).json({ error: 'Password is required' });
      }
      const token = await authenticateAdmin(username, password);
      if (!token) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      return res.json({
        success: true,
        token,
        user: { username, name: 'Veer Web Studio Admin' },
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message || 'Login failed' });
    }
  });

  app.get('/api/auth/me', requireAdmin, async (req: Request, res: Response) => {
    const user = (req as any).adminUser;
    return res.json({
      authenticated: true,
      user: { id: user.id, username: user.username, name: user.name },
    });
  });

  app.post('/api/auth/logout', requireAdmin, async (req: Request, res: Response) => {
    const token = (req as any).token;
    if (token) {
      await revokeAdminSession(token);
    }
    return res.json({ success: true });
  });

  app.post('/api/auth/change-password', requireAdmin, async (req: Request, res: Response) => {
    try {
      const { newPassword } = req.body;
      if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ error: 'Password must be at least 6 characters' });
      }
      await updateAdminCredentials(newPassword);
      return res.json({ success: true, message: 'Password updated successfully' });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // ------------------------------------
  // PORTFOLIO API ROUTES
  // ------------------------------------
  app.get('/api/portfolio', optionalAdmin, async (req: Request, res: Response) => {
    try {
      const isAdmin = Boolean((req as any).adminUser);
      const category = req.query.category as string;
      const featured = req.query.featured === 'true' ? true : req.query.featured === 'false' ? false : undefined;

      // If not admin, only return published items
      const projects = await getPortfolioProjects({
        publishedOnly: !isAdmin,
        category,
        featured,
      });

      return res.json(projects);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/portfolio/:slug', optionalAdmin, async (req: Request, res: Response) => {
    try {
      const isAdmin = Boolean((req as any).adminUser);
      const project = await getPortfolioProjectBySlug(req.params.slug, !isAdmin);
      if (!project) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.json(project);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/portfolio', requireAdmin, async (req: Request, res: Response) => {
    try {
      const created = await createPortfolioProject(req.body);
      return res.status(201).json(created);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/portfolio/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const updated = await updatePortfolioProject(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.json(updated);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/portfolio/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const success = await deletePortfolioProject(req.params.id);
      if (!success) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.post('/api/portfolio/:id/duplicate', requireAdmin, async (req: Request, res: Response) => {
    try {
      const duplicated = await duplicatePortfolioProject(req.params.id);
      if (!duplicated) {
        return res.status(404).json({ error: 'Project not found' });
      }
      return res.status(201).json(duplicated);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // ------------------------------------
  // PROJECT INQUIRIES API ROUTES
  // ------------------------------------
  // Public insertion:
  app.post('/api/inquiries', async (req: Request, res: Response) => {
    try {
      const full_name = req.body.full_name || req.body.fullName;
      const email = req.body.email;
      const phone = req.body.phone;
      const service_required = req.body.service_required || req.body.serviceRequired || 'General Digital Inquiry';
      const budget_range = req.body.budget_range || req.body.budgetRange || 'Flexible';
      const project_details = req.body.project_details || req.body.projectDetails || '';
      const preferred_contact = req.body.preferred_contact || req.body.preferredContact || 'WhatsApp';
      const business_name = req.body.business_name || req.body.businessName || '';

      if (!full_name || !phone) {
        return res.status(400).json({ error: 'Full Name and Phone / WhatsApp number are required' });
      }

      const inquiry = await createInquiry({
        full_name,
        business_name,
        email: email || '',
        phone,
        service_required,
        budget_range,
        project_details,
        preferred_contact,
      });

      return res.status(201).json({
        success: true,
        id: inquiry.id,
        message: 'Your project inquiry has been received. We will review your requirements and get back to you soon.',
      });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // Admin list inquiries
  app.get('/api/inquiries', requireAdmin, async (req: Request, res: Response) => {
    try {
      const status = req.query.status as string;
      const search = req.query.search as string;
      const sort = req.query.sort as 'newest' | 'oldest';

      const inquiries = await getInquiries({ status, search, sort });
      return res.json(inquiries);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.get('/api/inquiries/stats', requireAdmin, async (_req: Request, res: Response) => {
    try {
      const stats = await getInquiryStats();
      return res.json(stats);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.patch('/api/inquiries/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const updated = await updateInquiry(req.params.id, req.body);
      if (!updated) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }
      return res.json(updated);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.delete('/api/inquiries/:id', requireAdmin, async (req: Request, res: Response) => {
    try {
      const deleted = await deleteInquiry(req.params.id);
      if (!deleted) {
        return res.status(404).json({ error: 'Inquiry not found' });
      }
      return res.json({ success: true });
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // ------------------------------------
  // SETTINGS API ROUTES
  // ------------------------------------
  app.get('/api/settings', async (_req: Request, res: Response) => {
    try {
      const settings = await getSettings();
      return res.json(settings);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  app.put('/api/settings', requireAdmin, async (req: Request, res: Response) => {
    try {
      const updated = await updateSettings(req.body);
      return res.json(updated);
    } catch (err: any) {
      return res.status(500).json({ error: err.message });
    }
  });

  // ------------------------------------
  // IMAGE UPLOAD API ROUTE
  // ------------------------------------
  app.post('/api/upload', requireAdmin, upload.single('image'), (req: Request, res: Response) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file uploaded' });
    }
    const publicUrl = `/uploads/${req.file.filename}`;
    return res.json({
      success: true,
      url: publicUrl,
      filename: req.file.filename,
      size: req.file.size,
    });
  });

  // ------------------------------------
  // VITE MIDDLEWARE / STATIC ASSETS
  // ------------------------------------
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Veer Web & Digital Solutions server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
