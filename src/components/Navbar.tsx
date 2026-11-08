import React from 'react';
import { 
  Zap, 
  Crown, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Sparkles, 
  User, 
  Receipt,
  RotateCcw,
  Smartphone,
  Download,
  Globe
} from 'lucide-react';
import { UserProfile } from '../types/football';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: UserProfile;
  language: 'en' | 'sw';
  onToggleLanguage: () => void;
  onOpenAuth: () => void;
  onOpenProfile: () => void;
  onOpenVipModal: () => void;
  onOpenApkModal: () => void;
  betSlipCount: number;
  onToggleBetSlip: () => void;
  onResetData: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  currentUser,
  language,
  onToggleLanguage,
  onOpenAuth,
  onOpenProfile,
  onOpenVipModal,
  onOpenApkModal,
  betSlipCount,
  onToggleBetSlip,
  onResetData,
}) => {
  const isSw = language === 'sw';
  return (
    <header className="sticky top-0 z-40 bg-[#07090e]/95 backdrop-blur-md border-b border-cyan-500/20 shadow-[0_4px_30px_rgba(0,229,255,0.05)]">
      {/* Top Real-time Performance Ticker */}
      <div className="bg-gradient-to-r from-blue-950/80 via-cyan-950/40 to-blue-950/80 border-b border-cyan-500/15 py-1 px-4 text-xs">
        <div className="max-w-7xl mx-auto flex items-center justify-between overflow-x-auto gap-4 scrollbar-none text-slate-300">
          <div className="flex items-center gap-2 shrink-0">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-cyan-400 font-semibold tracking-wide uppercase text-[10px]">LIVE MODEL ACCURACY</span>
            <span className="text-slate-400">|</span>
            <span className="text-white font-mono font-medium">30-Day Win Rate: <strong className="text-emerald-400">78.4%</strong></span>
            <span className="text-slate-400">|</span>
            <span className="text-white font-mono font-medium">ROI: <strong className="text-cyan-400">+24.8%</strong></span>
            <span className="text-slate-400">|</span>
            <span className="text-white font-mono font-medium">Yesterday: <strong className="text-emerald-400">5/6 WON</strong></span>
          </div>
          <div className="hidden sm:flex items-center gap-3 shrink-0 text-slate-400 text-[11px]">
            <span className="bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded-full font-mono text-[10px]">
              AI MODEL v3.8 QUANT
            </span>
            <span>Probabilities updated for upcoming fixtures</span>
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
        <div className="flex items-center justify-between gap-4">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group shrink-0"
          >
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-[0_0_20px_rgba(0,229,255,0.4)] group-hover:shadow-[0_0_28px_rgba(0,229,255,0.6)] transition-all">
              <Zap className="w-5 h-5 text-black fill-black" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-[#07090e]"></div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-black text-xl tracking-wider text-white">SMART BET</span>
                <span className="font-black text-xl tracking-wider text-cyan-400 drop-shadow-[0_0_10px_rgba(0,229,255,0.5)]">HUB</span>
              </div>
              <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">
                AI Football Analytics &amp; Predictions
              </p>
            </div>
          </div>

          {/* Nav Tabs (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1 bg-[#0d111a] border border-cyan-500/20 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'dashboard'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              {isSw ? 'Ratiba & Tips' : 'Fixtures & Tips'}
            </button>

            <button
              onClick={() => setActiveTab('ai_lab')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'ai_lab'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] font-bold'
                  : 'text-cyan-400/90 hover:text-cyan-300 hover:bg-cyan-950/30'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400" />
              {isSw ? 'Maabara ya AI' : 'AI Match Lab'}
            </button>

            <button
              onClick={() => setActiveTab('vip')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'vip'
                  ? 'bg-gradient-to-r from-amber-400 to-yellow-500 text-black shadow-[0_0_15px_rgba(250,204,21,0.4)] font-bold'
                  : 'text-amber-400/90 hover:text-amber-300 hover:bg-amber-500/10'
              }`}
            >
              <Crown className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
              {isSw ? 'Utabiri wa VIP' : 'VIP Tips'}
              <span className="text-[9px] bg-amber-400/20 text-amber-300 px-1.5 py-0.2 rounded font-mono font-bold">
                PRO
              </span>
            </button>

            <button
              onClick={() => setActiveTab('accumulators')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'accumulators'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              {isSw ? 'Kifurushi (Acca)' : 'Daily Acca'}
            </button>

            <button
              onClick={() => setActiveTab('results')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'results'
                  ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-black shadow-[0_0_15px_rgba(0,229,255,0.4)] font-bold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              {isSw ? 'Matokeo & Ushindi' : 'Results & ROI'}
            </button>

            <button
              onClick={() => setActiveTab('admin')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'admin'
                  ? 'bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-[0_0_15px_rgba(168,85,247,0.4)] font-bold'
                  : 'text-purple-300 hover:text-white hover:bg-purple-950/30'
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              {isSw ? 'Msimamizi' : 'Admin Hub'}
            </button>
          </nav>

          {/* Right Action Icons & Profile */}
          <div className="flex items-center gap-2.5">
            {/* VIP Status Button */}
            {currentUser.isVip ? (
              <div 
                onClick={onOpenProfile}
                className="hidden sm:flex items-center gap-1.5 bg-amber-400/10 border border-amber-400/40 text-amber-300 px-2.5 py-1.5 rounded-lg text-xs font-bold cursor-pointer hover:bg-amber-400/20 transition-all shadow-[0_0_12px_rgba(250,204,21,0.2)]"
              >
                <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>VIP ACTIVE</span>
              </div>
            ) : (
              <button
                onClick={onOpenVipModal}
                className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-amber-500/20 to-yellow-600/20 border border-amber-500/50 text-amber-300 hover:text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:shadow-[0_0_18px_rgba(245,158,11,0.4)] transition-all"
              >
                <Crown className="w-3.5 h-3.5" />
                <span>Get VIP</span>
              </button>
            )}

            {/* Language Switcher (English / Kiswahili) */}
            <button
              onClick={onToggleLanguage}
              className="flex items-center gap-1.5 bg-[#0e1322] hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-300 hover:text-white px-2.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-all"
              title="Change Language (English / Kiswahili)"
            >
              <Globe className="w-3.5 h-3.5 text-cyan-400" />
              <span>{language.toUpperCase()}</span>
            </button>

            {/* Download APK Button */}
            <button
              onClick={onOpenApkModal}
              className="flex items-center gap-1.5 bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 hover:from-emerald-500/30 hover:to-cyan-500/30 border border-emerald-400/50 text-emerald-300 hover:text-white px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-bold transition-all shadow-[0_0_12px_rgba(16,185,129,0.2)]"
              title="Download Android App APK"
            >
              <Smartphone className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">Download APK</span>
              <span className="sm:hidden font-mono">APK</span>
            </button>

            {/* Bet Slip Trigger */}
            <button
              onClick={onToggleBetSlip}
              className="relative flex items-center gap-2 bg-[#0d121e] hover:bg-cyan-950/40 border border-cyan-500/30 hover:border-cyan-400 text-slate-200 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
              title="Open Bet Slip"
            >
              <Receipt className="w-4 h-4 text-cyan-400" />
              <span className="hidden md:inline">Slip</span>
              {betSlipCount > 0 && (
                <span className="bg-cyan-400 text-black font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center animate-bounce">
                  {betSlipCount}
                </span>
              )}
            </button>

            {/* User Profile / Login */}
            <button
              onClick={currentUser.role === 'free' && currentUser.id === 'guest' ? onOpenAuth : onOpenProfile}
              className="flex items-center gap-2 bg-[#0e1320] border border-slate-700 hover:border-cyan-500/50 px-2.5 py-1.5 rounded-lg text-xs text-slate-200 hover:text-white transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-600 to-blue-700 flex items-center justify-center text-[10px] font-bold text-white uppercase">
                {currentUser.name ? currentUser.name[0] : 'U'}
              </div>
              <span className="hidden sm:inline font-medium max-w-[90px] truncate">
                {currentUser.name || 'Sign In'}
              </span>
            </button>

            {/* Reset Demo Data */}
            <button
              onClick={onResetData}
              className="p-1.5 text-slate-400 hover:text-cyan-400 bg-slate-900/60 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
              title="Reset Sample Fixtures Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Tabs (bottom horizontal scroll on mobile) */}
        <div className="flex lg:hidden items-center gap-1.5 overflow-x-auto pt-2.5 pb-0.5 scrollbar-none border-t border-slate-800/80 mt-2">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              activeTab === 'dashboard'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-slate-300 bg-slate-900/60 border border-slate-800'
            }`}
          >
            Fixtures
          </button>
          <button
            onClick={() => setActiveTab('vip')}
            className={`flex items-center gap-1 px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              activeTab === 'vip'
                ? 'bg-amber-400 text-black font-bold'
                : 'text-amber-400 bg-amber-500/10 border border-amber-500/30'
            }`}
          >
            <Crown className="w-3 h-3 fill-amber-400" />
            VIP Tips
          </button>
          <button
            onClick={() => setActiveTab('accumulators')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              activeTab === 'accumulators'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-slate-300 bg-slate-900/60 border border-slate-800'
            }`}
          >
            Daily Acca
          </button>
          <button
            onClick={() => setActiveTab('results')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              activeTab === 'results'
                ? 'bg-cyan-500 text-black font-bold'
                : 'text-slate-300 bg-slate-900/60 border border-slate-800'
            }`}
          >
            Results
          </button>
          <button
            onClick={() => setActiveTab('admin')}
            className={`px-3 py-1 rounded-md text-xs font-semibold whitespace-nowrap ${
              activeTab === 'admin'
                ? 'bg-purple-500 text-white font-bold'
                : 'text-purple-400 bg-purple-950/40 border border-purple-800/40'
            }`}
          >
            Admin
          </button>
          <button
            onClick={onOpenApkModal}
            className="flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold whitespace-nowrap bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30"
          >
            <Download className="w-3 h-3 text-emerald-400" />
            Get APK
          </button>
        </div>
      </div>
    </header>
  );
};
