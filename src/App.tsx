/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Crown, 
  Layers, 
  CheckCircle2, 
  ShieldCheck, 
  Filter, 
  Flame, 
  TrendingUp, 
  Calendar,
  AlertCircle,
  RotateCcw,
  Plus,
  Smartphone,
  Download
} from 'lucide-react';
import { 
  Fixture, 
  Accumulator, 
  BetSlipItem, 
  UserProfile, 
  MatchAnalysis, 
  UserRole,
  TipTier
} from './types/football';
import { INITIAL_FIXTURES, INITIAL_ACCUMULATORS } from './data/mockMatches';
import { Navbar } from './components/Navbar';
import { MatchCard } from './components/MatchCard';
import { MatchAnalysisModal } from './components/MatchAnalysisModal';
import { VipTipsSection } from './components/VipTipsSection';
import { DailyAccaSection } from './components/DailyAccaSection';
import { ResultsTrackerSection } from './components/ResultsTrackerSection';
import { AdminDashboard } from './components/AdminDashboard';
import { VipSubscriptionModal } from './components/VipSubscriptionModal';
import { UserProfileModal } from './components/UserProfileModal';
import { AuthModal } from './components/AuthModal';
import { BetSlipDrawer } from './components/BetSlipDrawer';
import { ApkDownloadModal } from './components/ApkDownloadModal';
import { AiMatchLabView } from './components/AiMatchLabView';
import { AndroidBottomNav } from './components/AndroidBottomNav';

const STORAGE_KEY_FIXTURES = 'smart_bet_hub_fixtures_v1';
const STORAGE_KEY_USER = 'smart_bet_hub_user_v1';

export default function App() {
  // Fixtures State (Loaded from localStorage or initialized from seed)
  const [fixtures, setFixtures] = useState<Fixture[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_FIXTURES);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Failed to load saved fixtures:', e);
    }
    return INITIAL_FIXTURES;
  });

  const [accumulators, setAccumulators] = useState<Accumulator[]>(INITIAL_ACCUMULATORS);

  const ROOT_ADMIN_EMAIL = 'filmwaf@gmail.com';

  // User & Auth State (Permanent Administrator by default for configured email)
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_USER);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.email?.toLowerCase() === ROOT_ADMIN_EMAIL) {
          parsed.role = 'admin';
          parsed.isVip = true;
        }
        return parsed;
      }
    } catch (e) {
      console.error('Failed to load user profile:', e);
    }
    return {
      id: 'usr-admin-root',
      name: 'System Administrator (filmwaf)',
      email: ROOT_ADMIN_EMAIL,
      role: 'admin',
      isVip: true,
      vipExpiry: 'Permanent Lifetime Access',
      joinedDate: 'November 2026',
      bookmarkedMatches: [],
    };
  });

  // UI Navigation & Modals
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [selectedAnalysisFixture, setSelectedAnalysisFixture] = useState<Fixture | null>(null);
  const [isVipModalOpen, setIsVipModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isApkModalOpen, setIsApkModalOpen] = useState(false);
  const [isBetSlipOpen, setIsBetSlipOpen] = useState(false);

  // Language State: English & Kiswahili
  const [language, setLanguage] = useState<'en' | 'sw'>('en');

  // Bet Slip
  const [betSlipItems, setBetSlipItems] = useState<BetSlipItem[]>([]);

  // Dashboard Filters
  const [dateFilter, setDateFilter] = useState<'ALL' | 'Today' | 'Tomorrow' | 'Weekend'>('ALL');
  const [leagueFilter, setLeagueFilter] = useState<string>('ALL');
  const [tierFilter, setTierFilter] = useState<'ALL' | TipTier>('ALL');
  const [marketCategory, setMarketCategory] = useState<'ALL' | 'FREE' | 'VIP' | 'SAFE' | 'OU' | 'BTTS' | 'CORRECT_SCORE'>('ALL');
  const [highConfidenceOnly, setHighConfidenceOnly] = useState(false);

  // Verify server session on mount
  useEffect(() => {
    const token = localStorage.getItem('smart_bet_hub_auth_token');
    if (token) {
      fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((res) => (res.ok ? res.json() : null))
        .then((data) => {
          if (data?.user) {
            setCurrentUser({
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              role: data.user.role,
              isVip: data.user.isVip,
              vipExpiry: data.user.vipExpiry || (data.user.role === 'admin' ? 'Permanent Lifetime' : undefined),
              joinedDate: data.user.createdAt ? new Date(data.user.createdAt).toLocaleDateString() : 'Active Member',
              bookmarkedMatches: [],
            });
          }
        })
        .catch((err) => {
          console.warn('Session check skipped:', err);
        });
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_FIXTURES, JSON.stringify(fixtures));
    } catch (e) {
      console.error('Failed to persist fixtures:', e);
    }
  }, [fixtures]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_USER, JSON.stringify(currentUser));
    } catch (e) {
      console.error('Failed to persist user:', e);
    }
  }, [currentUser]);

  // Bet Slip Handlers
  const handleAddToSlip = (item: BetSlipItem) => {
    setBetSlipItems(prev => {
      const exists = prev.some(i => i.fixtureId === item.fixtureId && i.pick === item.pick);
      if (exists) {
        return prev.filter(i => !(i.fixtureId === item.fixtureId && i.pick === item.pick));
      }
      return [...prev, item];
    });
  };

  const handleAddAllLegsToSlip = (items: BetSlipItem[]) => {
    setBetSlipItems(prev => {
      const existingIds = new Set(prev.map(p => `${p.fixtureId}-${p.pick}`));
      const newItems = items.filter(item => !existingIds.has(`${item.fixtureId}-${item.pick}`));
      return [...prev, ...newItems];
    });
    setIsBetSlipOpen(true);
  };

  const handleRemoveSlipItem = (id: string) => {
    setBetSlipItems(prev => prev.filter(i => i.id !== id));
  };

  const handleClearSlip = () => {
    setBetSlipItems([]);
  };

  const isInSlip = (fixtureId: string, pick: string) => {
    return betSlipItems.some(i => i.fixtureId === fixtureId && i.pick === pick);
  };

  // VIP Subscription handler
  const handleUpgradeToVip = (planName: string) => {
    setCurrentUser(prev => ({
      ...prev,
      isVip: true,
      role: prev.role === 'admin' ? 'admin' : 'vip',
      vipExpiry: 'December 2026',
    }));
  };

  const handleLogout = async () => {
    const token = localStorage.getItem('smart_bet_hub_auth_token');
    if (token) {
      try {
        await fetch('/api/auth/logout', {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (e) {
        // ignore
      }
      localStorage.removeItem('smart_bet_hub_auth_token');
    }

    setCurrentUser({
      id: 'guest',
      name: 'Guest User',
      email: 'guest@smartbethub.com',
      role: 'free',
      isVip: false,
      joinedDate: 'Just Now',
      bookmarkedMatches: [],
    });
  };

  // Fixture Management (Admin)
  const handleAddFixture = (newFix: Fixture) => {
    setFixtures(prev => [newFix, ...prev]);
    alert('Prediction published successfully to live schedule.');
  };

  const handleUpdateFixture = (updatedFix: Fixture) => {
    setFixtures(prev => prev.map(f => f.id === updatedFix.id ? updatedFix : f));
  };

  const handleDeleteFixture = (fixtureId: string) => {
    setFixtures(prev => prev.filter(f => f.id !== fixtureId));
  };

  const handleResetData = () => {
    if (window.confirm('Reset all match fixtures and results to initial realistic demo dataset?')) {
      setFixtures(INITIAL_FIXTURES);
      localStorage.removeItem(STORAGE_KEY_FIXTURES);
      alert('Sample fixtures restored.');
    }
  };

  const handleUpdateFixtureAnalysis = (fixtureId: string, analysis: MatchAnalysis) => {
    setFixtures(prev => prev.map(f => {
      if (f.id === fixtureId) {
        return {
          ...f,
          analysis,
          probabilities: analysis.probabilities || f.probabilities,
          prediction: {
            ...f.prediction,
            primaryTip: analysis.primaryTip || f.prediction.primaryTip,
            tipLabel: analysis.tipLabel || f.prediction.tipLabel,
            confidence: analysis.confidence || f.prediction.confidence,
            reasoning: analysis.summary || f.prediction.reasoning,
          },
        };
      }
      return f;
    }));

    if (selectedAnalysisFixture && selectedAnalysisFixture.id === fixtureId) {
      setSelectedAnalysisFixture(prev => prev ? { ...prev, analysis } : null);
    }
  };

  // Filtered Fixtures for Dashboard
  const availableLeagues = Array.from(new Set(fixtures.map(f => f.league)));
  const scheduledFixtures = fixtures.filter(f => f.status === 'SCHEDULED' || f.status === 'LIVE');
  const featuredBanker = fixtures.find(f => f.isBankerOfDay) || fixtures[0];

  const filteredFixtures = fixtures.filter(f => {
    if (dateFilter !== 'ALL' && f.dateLabel !== dateFilter) return false;
    if (leagueFilter !== 'ALL' && f.league !== leagueFilter) return false;
    if (tierFilter !== 'ALL' && f.prediction.tier !== tierFilter) return false;
    if (highConfidenceOnly && f.prediction.confidence < 5) return false;
    if (marketCategory === 'FREE' && f.prediction.tier !== 'FREE') return false;
    if (marketCategory === 'VIP' && f.prediction.tier !== 'VIP') return false;
    if (marketCategory === 'SAFE' && (f.prediction.confidence < 5 && f.prediction.odds >= 1.75)) return false;
    if (marketCategory === 'OU' && !(f.prediction.marketType === 'O/U' || f.prediction.primaryTip.includes('OVER') || f.prediction.primaryTip.includes('UNDER'))) return false;
    if (marketCategory === 'BTTS' && !(f.prediction.marketType === 'BTTS' || f.prediction.primaryTip.includes('BTTS'))) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-[#05070c] text-slate-100 flex flex-col font-sans selection:bg-cyan-500 selection:text-black">
      {/* Top Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        language={language}
        onToggleLanguage={() => setLanguage(l => l === 'en' ? 'sw' : 'en')}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenProfile={() => setIsProfileModalOpen(true)}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        onOpenApkModal={() => setIsApkModalOpen(true)}
        betSlipCount={betSlipItems.length}
        onToggleBetSlip={() => setIsBetSlipOpen(prev => !prev)}
        onResetData={handleResetData}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 space-y-6">
        
        {/* VIEW 1: HOME DASHBOARD / MATCHES */}
        {(activeTab === 'dashboard' || activeTab === 'matches') && (
          <div className="space-y-6">
            
            {/* Featured Banker Hero Card */}
            {featuredBanker && (
              <div className="relative rounded-2xl bg-gradient-to-r from-[#0d1626] via-[#09101c] to-[#070b14] border border-cyan-400/40 p-5 sm:p-6 shadow-[0_0_35px_rgba(0,229,255,0.12)] overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none"></div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div className="space-y-2 max-w-xl">
                    <div className="flex items-center gap-2">
                      <span className="bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-black text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_12px_rgba(0,229,255,0.4)]">
                        <Flame className="w-3.5 h-3.5 fill-black" />
                        TODAY'S AI BANKER PICK
                      </span>
                      <span className="text-cyan-400 font-mono text-xs font-bold">
                        {featuredBanker.league} • {featuredBanker.kickOff}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                      {featuredBanker.homeTeam.name} vs {featuredBanker.awayTeam.name}
                    </h2>

                    <div className="flex items-center gap-3">
                      <span className="text-base sm:text-lg font-extrabold text-cyan-300">
                        {featuredBanker.prediction.tipLabel}
                      </span>
                      <span className="font-mono font-black text-cyan-400 bg-cyan-950/80 border border-cyan-500/40 px-2.5 py-0.5 rounded-lg text-sm sm:text-base">
                        @{featuredBanker.prediction.odds.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2">
                      {featuredBanker.prediction.reasoning}
                    </p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <button
                      onClick={() => setSelectedAnalysisFixture(featuredBanker)}
                      className="px-4 py-2.5 rounded-xl bg-[#091120] hover:bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 hover:text-white text-xs font-bold transition-all flex items-center gap-2 shadow"
                    >
                      <Sparkles className="w-4 h-4 text-cyan-400" />
                      <span>AI Tactical Breakdown</span>
                    </button>

                    <button
                      onClick={() =>
                        handleAddToSlip({
                          id: `${featuredBanker.id}-${featuredBanker.prediction.primaryTip}`,
                          fixtureId: featuredBanker.id,
                          matchTitle: `${featuredBanker.homeTeam.name} vs ${featuredBanker.awayTeam.name}`,
                          league: featuredBanker.league,
                          market: featuredBanker.prediction.marketType,
                          pick: featuredBanker.prediction.tipLabel,
                          odds: featuredBanker.prediction.odds,
                        })
                      }
                      className={`px-5 py-2.5 rounded-xl text-xs font-extrabold transition-all ${
                        isInSlip(featuredBanker.id, featuredBanker.prediction.tipLabel)
                          ? 'bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.5)]'
                          : 'bg-cyan-400 hover:bg-cyan-300 text-black shadow-[0_0_20px_rgba(0,229,255,0.5)]'
                      }`}
                    >
                      {isInSlip(featuredBanker.id, featuredBanker.prediction.tipLabel) ? 'Added to Slip' : 'Add to Bet Slip'}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Android APK Direct Download Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-emerald-950/40 via-[#071318] to-cyan-950/40 border border-emerald-500/40 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-[0_0_25px_rgba(16,185,129,0.12)]">
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-400 flex items-center justify-center text-black font-black shrink-0 shadow-[0_0_15px_rgba(16,185,129,0.5)]">
                  <Smartphone className="w-5 h-5 stroke-[2.5]" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm sm:text-base">
                      SMART BET HUB Android App (APK)
                    </span>
                    <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                      READY TO INSTALL
                    </span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Direct download link generated for Android devices. Fast, offline-capable mobile analytics.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  onClick={() => setIsApkModalOpen(true)}
                  className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold transition-all"
                >
                  View Details &amp; Guide
                </button>
                <a
                  href="/download/smart-bet-hub-debug.apk"
                  download="smart-bet-hub-debug.apk"
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-emerald-400 to-cyan-400 hover:from-emerald-300 hover:to-cyan-300 text-black font-black text-xs shadow-[0_0_15px_rgba(16,185,129,0.5)] transition-all flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5 stroke-[3]" />
                  <span>Direct Download APK</span>
                </a>
              </div>
            </div>

            {/* Filters Bar */}
            <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 space-y-3">
              {/* Betting Tip Categories (Free, VIP, Safe, O/U, BTTS) */}
              <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none pb-2 border-b border-slate-800/60 text-xs">
                <span className="text-[10px] text-slate-500 font-mono font-bold uppercase mr-1 shrink-0">
                  {language === 'sw' ? 'KUNDI LA UTABIRI:' : 'TIP CATEGORIES:'}
                </span>
                {[
                  { id: 'ALL', label: language === 'sw' ? 'Zote' : 'All Tips' },
                  { id: 'FREE', label: language === 'sw' ? 'Za Bure' : 'Free Tips' },
                  { id: 'VIP', label: 'VIP Tips ★' },
                  { id: 'SAFE', label: language === 'sw' ? 'Uhakika (Safe)' : 'Safe Picks' },
                  { id: 'OU', label: 'Over / Under' },
                  { id: 'BTTS', label: 'BTTS (GG)' },
                ].map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => setMarketCategory(cat.id as any)}
                    className={`px-3 py-1 rounded-lg font-bold whitespace-nowrap transition-all ${
                      marketCategory === cat.id
                        ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-[0_0_12px_rgba(22,119,255,0.4)]'
                        : 'bg-[#060810] text-slate-400 hover:text-white border border-slate-800'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
                
                {/* Date Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
                  {(['ALL', 'Today', 'Tomorrow', 'Weekend'] as const).map(d => (
                    <button
                      key={d}
                      onClick={() => setDateFilter(d)}
                      className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                        dateFilter === d
                          ? 'bg-cyan-500 text-black shadow-[0_0_12px_rgba(0,229,255,0.4)]'
                          : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                      }`}
                    >
                      {d === 'ALL' ? (language === 'sw' ? 'Siku Zote' : 'All Days') : d}
                    </button>
                  ))}
                </div>

                {/* Secondary Filters */}
                <div className="flex items-center gap-2">
                  {/* Tier Filter */}
                  <select
                    value={tierFilter}
                    onChange={(e) => setTierFilter(e.target.value as any)}
                    className="px-2.5 py-1.5 bg-[#060810] border border-slate-700 rounded-lg text-slate-300 text-xs font-semibold outline-none focus:border-cyan-400"
                  >
                    <option value="ALL">All Tips (Free &amp; VIP)</option>
                    <option value="FREE">Free Tips Only</option>
                    <option value="VIP">VIP Tips Only</option>
                  </select>

                  {/* League Filter */}
                  <select
                    value={leagueFilter}
                    onChange={(e) => setLeagueFilter(e.target.value)}
                    className="px-2.5 py-1.5 bg-[#060810] border border-slate-700 rounded-lg text-slate-300 text-xs font-semibold outline-none focus:border-cyan-400"
                  >
                    <option value="ALL">All Leagues</option>
                    {availableLeagues.map(l => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>

                  {/* High Confidence Toggle */}
                  <button
                    onClick={() => setHighConfidenceOnly(prev => !prev)}
                    className={`px-3 py-1.5 rounded-lg font-bold border transition-all ${
                      highConfidenceOnly
                        ? 'bg-amber-400/20 text-amber-300 border-amber-400/50'
                        : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
                    }`}
                  >
                    5★ Banker Only
                  </button>
                </div>
              </div>

              {/* Demo Notice Banner */}
              <div className="pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  Showing {filteredFixtures.length} football fixtures • Realistic analytics demo data
                </span>
                <span className="text-slate-500 hidden sm:inline">
                  Click 'AI Analysis' on any match to test Gemini 3.8 Flash model
                </span>
              </div>
            </div>

            {/* Fixture Match Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredFixtures.map(fixture => (
                <MatchCard
                  key={fixture.id}
                  fixture={fixture}
                  currentUser={currentUser}
                  onSelectAnalysis={setSelectedAnalysisFixture}
                  onAddToSlip={handleAddToSlip}
                  isInSlip={isInSlip}
                  onOpenVipModal={() => setIsVipModalOpen(true)}
                />
              ))}
            </div>
          </div>
        )}

        {/* VIEW 2: VIP TIPS HUB */}
        {activeTab === 'vip' && (
          <VipTipsSection
            fixtures={fixtures}
            currentUser={currentUser}
            onOpenVipModal={() => setIsVipModalOpen(true)}
            onSelectAnalysis={setSelectedAnalysisFixture}
            onAddToSlip={handleAddToSlip}
            isInSlip={isInSlip}
          />
        )}

        {/* VIEW 3: DAILY ACCUMULATORS */}
        {activeTab === 'accumulators' && (
          <DailyAccaSection
            accumulators={accumulators}
            currentUser={currentUser}
            onAddToSlip={handleAddToSlip}
            onAddAllLegsToSlip={handleAddAllLegsToSlip}
            onOpenVipModal={() => setIsVipModalOpen(true)}
          />
        )}

        {/* VIEW 4: RESULTS & ROI TRACKER */}
        {activeTab === 'results' && (
          <ResultsTrackerSection fixtures={fixtures} />
        )}

        {/* VIEW 5: ADMIN DASHBOARD */}
        {activeTab === 'admin' && (
          <AdminDashboard
            fixtures={fixtures}
            currentUser={currentUser}
            onOpenAuth={() => setIsAuthModalOpen(true)}
            onAddFixture={handleAddFixture}
            onUpdateFixture={handleUpdateFixture}
            onDeleteFixture={handleDeleteFixture}
            onResetData={handleResetData}
          />
        )}

        {/* VIEW 6: AI MATCH LAB */}
        {activeTab === 'ai_lab' && (
          <AiMatchLabView
            onAddToSlip={handleAddToSlip}
            isInSlip={isInSlip}
            language={language}
          />
        )}

      </main>

      {/* Android Bottom Navigation Bar (Visible on mobile/tablet screens) */}
      <AndroidBottomNav
        activeTab={activeTab === 'dashboard' ? 'dashboard' : activeTab}
        setActiveTab={(tab) => {
          if (tab === 'profile') {
            setIsProfileModalOpen(true);
          } else {
            setActiveTab(tab);
          }
        }}
        language={language}
      />

      {/* Floating Bet Slip Indicator when Drawer is closed & has items */}
      {!isBetSlipOpen && betSlipItems.length > 0 && (
        <button
          onClick={() => setIsBetSlipOpen(true)}
          className="fixed bottom-16 md:bottom-6 right-6 z-40 bg-gradient-to-r from-cyan-400 to-blue-600 hover:from-cyan-300 hover:to-blue-500 text-black font-black px-4 py-3 rounded-2xl shadow-[0_0_25px_rgba(0,229,255,0.6)] flex items-center gap-3 transition-transform hover:scale-105"
        >
          <span className="w-6 h-6 rounded-full bg-black text-cyan-400 font-mono font-black text-xs flex items-center justify-center">
            {betSlipItems.length}
          </span>
          <span className="text-xs uppercase tracking-wider font-extrabold">Open Bet Slip</span>
        </button>
      )}

      {/* Modals & Drawers */}
      <MatchAnalysisModal
        fixture={selectedAnalysisFixture}
        onClose={() => setSelectedAnalysisFixture(null)}
        currentUser={currentUser}
        onAddToSlip={handleAddToSlip}
        isInSlip={isInSlip}
        onUpdateFixtureAnalysis={handleUpdateFixtureAnalysis}
      />

      <VipSubscriptionModal
        isOpen={isVipModalOpen}
        onClose={() => setIsVipModalOpen(false)}
        currentUser={currentUser}
        onUpgradeToVip={handleUpgradeToVip}
      />

      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        currentUser={currentUser}
        onLogout={handleLogout}
        onOpenVipModal={() => setIsVipModalOpen(true)}
        onOpenAuthModal={() => setIsAuthModalOpen(true)}
      />

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={(user) => setCurrentUser(user)}
      />

      <BetSlipDrawer
        isOpen={isBetSlipOpen}
        onClose={() => setIsBetSlipOpen(false)}
        items={betSlipItems}
        onRemoveItem={handleRemoveSlipItem}
        onClearSlip={handleClearSlip}
      />

      <ApkDownloadModal
        isOpen={isApkModalOpen}
        onClose={() => setIsApkModalOpen(false)}
      />

      {/* Footer */}
      <footer className="bg-[#04060a] border-t border-slate-900 py-8 px-4 sm:px-6 text-xs text-slate-500 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2">
              <span className="font-extrabold text-white text-sm">SMART BET HUB</span>
              <span className="text-cyan-400 font-mono text-[10px] bg-cyan-950/60 border border-cyan-500/30 px-1.5 py-0.2 rounded">
                v3.8 QUANT
              </span>
            </div>
            <p className="text-[11px] text-slate-400">
              Quantitative football analytics, expected value (+EV) modeling, and match probability distributions.
            </p>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-slate-900 text-center md:text-right max-w-md text-[10px] text-slate-500 leading-normal">
            ⚠️ <strong>Responsible Gaming Notice:</strong> Football betting involves financial risk. SMART BET HUB presents algorithmic probabilities, not guaranteed results. Never gamble with money you cannot afford to lose. 18+.
          </div>
        </div>
      </footer>
    </div>
  );
}
