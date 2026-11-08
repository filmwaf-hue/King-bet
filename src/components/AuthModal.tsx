import React, { useState } from 'react';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  ShieldCheck, 
  AlertCircle,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { UserProfile } from '../types/football';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (user: UserProfile) => void;
}

const ROOT_ADMIN_EMAIL = 'filmwaf@gmail.com';

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
}) => {
  const [tab, setTab] = useState<'signin' | 'register'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMessage(null);

    const endpoint = tab === 'signin' ? '/api/auth/login' : '/api/auth/register';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
          name: name.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Authentication failed. Please check credentials.');
      }

      if (data.token) {
        localStorage.setItem('smart_bet_hub_auth_token', data.token);
      }

      // Map backend user to UserProfile
      const loggedUser: UserProfile = {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        role: data.user.role,
        isVip: data.user.isVip,
        vipExpiry: data.user.vipExpiry,
        joinedDate: data.user.createdAt ? new Date(data.user.createdAt).toLocaleDateString() : 'Active Member',
        bookmarkedMatches: [],
      };

      onLoginSuccess(loggedUser);
      onClose();
    } catch (err: any) {
      setErrorMessage(err.message || 'Authentication error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  const handlePreFillAdmin = () => {
    setEmail(ROOT_ADMIN_EMAIL);
    setPassword('SmartBetAdmin2026!');
    setTab('signin');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-[#0a0d18] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.15)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-black text-white text-lg">SMART BET HUB</h3>
            <p className="text-xs text-slate-400">Secure Account Authentication</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switch */}
        <div className="flex border-b border-slate-800 bg-[#070912] text-xs font-bold">
          <button
            onClick={() => {
              setTab('signin');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              tab === 'signin'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => {
              setTab('register');
              setErrorMessage(null);
            }}
            className={`flex-1 py-3 text-center border-b-2 transition-all ${
              tab === 'register'
                ? 'border-cyan-400 text-cyan-400'
                : 'border-transparent text-slate-400 hover:text-white'
            }`}
          >
            Create New Account
          </button>
        </div>

        <div className="p-5 space-y-4">
          {/* Permanent Root Administrator Badge */}
          <div className="p-3.5 rounded-xl bg-purple-950/20 border border-purple-500/40 space-y-1.5">
            <div className="flex items-center justify-between">
              <span className="flex items-center gap-1.5 text-xs font-extrabold text-purple-300">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                Permanent System Administrator
              </span>
              <button
                type="button"
                onClick={handlePreFillAdmin}
                className="text-[10px] text-cyan-400 hover:text-cyan-300 font-mono font-bold underline"
              >
                Autofill Credentials
              </button>
            </div>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              Email <strong className="text-white font-mono">{ROOT_ADMIN_EMAIL}</strong> is irrevocably designated with permanent system administrator authorization.
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/50 flex items-start gap-2.5 text-rose-300 text-xs">
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-3">
            {tab === 'register' && (
              <div>
                <label className="text-[11px] font-bold text-slate-400 block mb-1">Your Full Name</label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
                    placeholder="e.g. John Doe"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Email Address</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
                  placeholder="name@domain.com"
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Password</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all mt-2 disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <span>Authenticating with Server...</span>
              ) : (
                <span>{tab === 'signin' ? 'Sign In & Verify Role' : 'Create Verified Account'}</span>
              )}
            </button>
          </form>

          <div className="pt-2 border-t border-slate-800 text-[10px] text-slate-500 text-center font-mono">
            Role-Based Access Control (RBAC) enforced server-side.
          </div>
        </div>
      </div>
    </div>
  );
};
