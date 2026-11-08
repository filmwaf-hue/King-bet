import React from 'react';
import { 
  X, 
  User, 
  Crown, 
  ShieldCheck, 
  LogOut, 
  Calendar, 
  Mail, 
  Award,
  Zap,
  Check,
  Lock
} from 'lucide-react';
import { UserProfile } from '../types/football';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onLogout: () => void;
  onOpenVipModal: () => void;
  onOpenAuthModal?: () => void;
}

const ROOT_ADMIN_EMAIL = 'filmwaf@gmail.com';

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogout,
  onOpenVipModal,
  onOpenAuthModal,
}) => {
  if (!isOpen) return null;

  const isRootAdmin = currentUser.email.toLowerCase() === ROOT_ADMIN_EMAIL.toLowerCase() || currentUser.role === 'admin';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-md bg-[#0a0d18] border border-cyan-500/30 rounded-2xl shadow-[0_0_50px_rgba(0,229,255,0.15)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-white text-base">User Account &amp; Profile</h3>
              <p className="text-[11px] text-slate-400">SMART BET HUB Member Hub</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* User Card */}
        <div className="p-5 space-y-4">
          <div className="p-4 rounded-xl bg-[#0e1322] border border-slate-800 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-black font-black text-lg ${
                isRootAdmin 
                  ? 'bg-gradient-to-br from-purple-400 to-indigo-500 shadow-[0_0_20px_rgba(168,85,247,0.5)]'
                  : 'bg-gradient-to-br from-cyan-500 to-blue-600 shadow-[0_0_20px_rgba(0,229,255,0.4)]'
              }`}>
                {currentUser.name ? currentUser.name[0].toUpperCase() : 'U'}
              </div>
              <div>
                <h4 className="font-extrabold text-white text-base leading-tight">
                  {currentUser.name}
                </h4>
                <div className="flex items-center gap-1.5 text-slate-400 text-xs mt-0.5">
                  <Mail className="w-3 h-3 text-slate-500" />
                  <span className="font-mono text-slate-300">{currentUser.email}</span>
                </div>
              </div>
            </div>

            {/* Role Badge */}
            <div>
              {isRootAdmin ? (
                <span className="bg-purple-500/20 text-purple-300 border border-purple-500/40 text-[10px] font-mono font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow-[0_0_12px_rgba(168,85,247,0.3)]">
                  <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                  ADMIN
                </span>
              ) : currentUser.isVip ? (
                <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[10px] font-mono font-bold px-2 py-1 rounded-full flex items-center gap-1">
                  <Crown className="w-3 h-3 fill-amber-400" />
                  VIP PRO
                </span>
              ) : (
                <span className="bg-slate-800 text-slate-300 border border-slate-700 text-[10px] font-mono font-bold px-2 py-1 rounded-full">
                  FREE MEMBER
                </span>
              )}
            </div>
          </div>

          {/* Security & Role Verification Status Card (No Demo Switcher) */}
          <div className="p-4 rounded-xl bg-[#080b14] border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider font-mono flex items-center gap-1">
                <Lock className="w-3 h-3" />
                SECURITY &amp; ACCESS PRIVILEGES
              </span>
              <span className="text-[10px] font-mono text-slate-500">SERVER AUTHORITATIVE</span>
            </div>

            {isRootAdmin ? (
              <div className="p-3 rounded-lg bg-purple-950/30 border border-purple-500/30 space-y-1">
                <div className="flex items-center gap-1.5 text-purple-300 text-xs font-bold">
                  <ShieldCheck className="w-4 h-4 text-purple-400" />
                  <span>Permanent Root Administrator Verified</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Full administrative permissions enabled for publishing tips, managing matches, updating settlement scores, and overseeing system VIP subscriptions.
                </p>
              </div>
            ) : (
              <div className="p-3 rounded-lg bg-slate-900 border border-slate-800 space-y-1">
                <div className="text-xs text-slate-300 font-semibold">
                  Standard Member Tier
                </div>
                <p className="text-[11px] text-slate-400">
                  Admin operations are protected by backend authorization. Only the authorized root administrator account ({ROOT_ADMIN_EMAIL}) has publishing access.
                </p>
              </div>
            )}
          </div>

          {/* VIP Status box */}
          <div className="p-4 rounded-xl bg-[#070912] border border-slate-800 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <Crown className="w-3.5 h-3.5 text-amber-400" />
                VIP Subscription Status
              </div>
              <div className="text-[11px] text-slate-400 mt-0.5">
                {isRootAdmin 
                  ? 'Permanent Lifetime VIP & Admin' 
                  : currentUser.isVip 
                    ? 'Active VIP Subscription' 
                    : 'Free Tier Member'}
              </div>
            </div>

            {!currentUser.isVip && !isRootAdmin && (
              <button
                onClick={() => {
                  onClose();
                  onOpenVipModal();
                }}
                className="px-3 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs"
              >
                Get VIP
              </button>
            )}
            {(currentUser.isVip || isRootAdmin) && (
              <span className="text-emerald-400 font-mono font-bold text-xs">
                Active
              </span>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080b13] border-t border-slate-800 flex items-center justify-between">
          <button
            onClick={() => {
              onLogout();
              onClose();
            }}
            className="flex items-center gap-1.5 text-rose-400 hover:text-rose-300 text-xs font-semibold"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
};
