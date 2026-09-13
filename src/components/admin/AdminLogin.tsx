import React, { useState } from 'react';
import { Lock, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { adminLogin } from '../../services/api';

interface AdminLoginProps {
  onLoginSuccess: () => void;
  onBackToPublic: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({
  onLoginSuccess,
  onBackToPublic,
}) => {
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('admin');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await adminLogin(password, username);
      onLoginSuccess();
    } catch (err: any) {
      setError(err.message || 'Invalid admin credentials');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 shadow-2xl border border-slate-200 text-slate-900 space-y-6">
        
        <div className="text-center space-y-2">
          <div className="w-14 h-14 rounded-2xl bg-purple-100 text-purple-700 flex items-center justify-center mx-auto shadow-xs">
            <Lock className="w-7 h-7" />
          </div>
          <h1 className="font-heading font-extrabold text-2xl text-slate-950">
            Studio Management
          </h1>
          <p className="text-xs text-slate-500">
            VEER WEB & DIGITAL SOLUTIONS Admin Portal
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Username
            </label>
            <input
              type="text"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              className="w-full px-4 py-2.5 text-xs rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:border-purple-600"
            />
            <div className="mt-1 text-[11px] text-slate-400">
              Default password for initial setup: <span className="font-mono text-purple-700 font-semibold">admin</span>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-md shadow-purple-500/20 active:scale-95 transition-all disabled:opacity-50"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <button
            onClick={onBackToPublic}
            className="hover:text-purple-600 font-medium transition-colors"
          >
            ← Return to Public Website
          </button>
          <span className="flex items-center gap-1 text-[11px]">
            <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            Protected
          </span>
        </div>

      </div>
    </div>
  );
};
