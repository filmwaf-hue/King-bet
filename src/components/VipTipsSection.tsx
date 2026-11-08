import React from 'react';
import { 
  Crown, 
  Sparkles, 
  Lock, 
  Unlock, 
  CheckCircle, 
  TrendingUp, 
  ShieldCheck, 
  Zap, 
  Plus, 
  Check,
  Flame,
  Award
} from 'lucide-react';
import { Fixture, BetSlipItem, UserProfile } from '../types/football';

interface VipTipsSectionProps {
  fixtures: Fixture[];
  currentUser: UserProfile;
  onOpenVipModal: () => void;
  onSelectAnalysis: (fixture: Fixture) => void;
  onAddToSlip: (item: BetSlipItem) => void;
  isInSlip: (fixtureId: string, pick: string) => boolean;
}

export const VipTipsSection: React.FC<VipTipsSectionProps> = ({
  fixtures,
  currentUser,
  onOpenVipModal,
  onSelectAnalysis,
  onAddToSlip,
  isInSlip,
}) => {
  const vipFixtures = fixtures.filter(f => f.prediction.tier === 'VIP');
  const bankerFixture = fixtures.find(f => f.isBankerOfDay) || fixtures[0];

  return (
    <div className="space-y-6">
      {/* VIP Hero Banner */}
      <div className="relative rounded-2xl bg-gradient-to-r from-amber-950/40 via-[#110e08] to-slate-950 border border-amber-500/40 p-6 shadow-[0_0_40px_rgba(245,158,11,0.1)] overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2">
              <span className="bg-amber-400 text-black font-black text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-[0_0_15px_rgba(250,204,21,0.4)]">
                <Crown className="w-3.5 h-3.5 fill-black" />
                VIP EXCLUSIVE HUB
              </span>
              <span className="text-amber-300 font-mono text-xs font-bold">
                83.2% 90-Day Win-Rate
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              High-Confidence Banker &amp; Value Picks
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Curated by quantitative statistical models filtering matches through xG differentials, home fortress conversion, and sharp bookmaker line movements.
            </p>
          </div>

          {/* VIP Action */}
          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            {currentUser.isVip || currentUser.role === 'admin' ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-black shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Unlock className="w-4 h-4 text-emerald-400" />
                <span>VIP PASS ACTIVE</span>
              </div>
            ) : (
              <button
                onClick={onOpenVipModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4" />
                <span>Unlock VIP via Mobile Money</span>
              </button>
            )}

            {!currentUser.isVip && (
              <button
                onClick={onOpenVipModal}
                className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs shadow-[0_0_20px_rgba(250,204,21,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <Crown className="w-4 h-4 fill-black" />
                <span>Upgrade to VIP</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Banker of the Day Card */}
      {bankerFixture && (
        <div className="rounded-2xl bg-gradient-to-br from-[#0c101c] via-[#080b13] to-[#0c101c] border-2 border-cyan-400/50 p-6 shadow-[0_0_35px_rgba(0,229,255,0.15)] relative overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-cyan-500/20">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-cyan-400 text-black font-black flex items-center justify-center shadow-[0_0_15px_rgba(0,229,255,0.6)]">
                <Flame className="w-5 h-5 fill-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-black text-white text-base tracking-wide uppercase">
                    BANKER OF THE DAY
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 text-[10px] font-mono px-2 py-0.5 rounded-full font-bold">
                    CONFIDENCE 5/5 ★
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono">
                  {bankerFixture.league} • Kickoff: {bankerFixture.kickOff}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-400 font-mono">Recommended Stake:</span>
              <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-bold text-xs px-2.5 py-1 rounded-lg">
                3 Units (Max Safety)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 my-6 items-center">
            {/* Teams */}
            <div className="md:col-span-6 space-y-3">
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080a12] border border-slate-800">
                <span className="font-extrabold text-white text-base">{bankerFixture.homeTeam.name}</span>
                <span className="text-xs font-mono text-cyan-400 font-bold">
                  Win %: {bankerFixture.homeTeam.homeWinPct ?? 80}%
                </span>
              </div>
              <div className="flex items-center justify-between p-3.5 rounded-xl bg-[#080a12] border border-slate-800">
                <span className="font-extrabold text-white text-base">{bankerFixture.awayTeam.name}</span>
                <span className="text-xs font-mono text-purple-400 font-bold">
                  Away Conceded: {(bankerFixture.awayTeam.goalsConceded / bankerFixture.awayTeam.played).toFixed(2)}/g
                </span>
              </div>
            </div>

            {/* Selected Pick Highlight */}
            <div className="md:col-span-6 p-4 rounded-xl bg-gradient-to-r from-cyan-950/40 to-blue-950/40 border border-cyan-500/40 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
                  VIP MODEL SELECTION
                </span>
                <span className="font-mono font-black text-xl text-cyan-300">
                  @{bankerFixture.prediction.odds.toFixed(2)}
                </span>
              </div>

              <div className="text-lg font-black text-white">
                {bankerFixture.prediction.tipLabel}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed">
                {bankerFixture.prediction.reasoning}
              </p>

              <div className="flex items-center gap-2 pt-1">
                <button
                  onClick={() => onSelectAnalysis(bankerFixture)}
                  className="flex-1 py-2 px-3 rounded-lg bg-[#0c1220] hover:bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all text-center"
                >
                  View AI Rationale
                </button>
                <button
                  onClick={() =>
                    onAddToSlip({
                      id: `${bankerFixture.id}-${bankerFixture.prediction.primaryTip}`,
                      fixtureId: bankerFixture.id,
                      matchTitle: `${bankerFixture.homeTeam.name} vs ${bankerFixture.awayTeam.name}`,
                      league: bankerFixture.league,
                      market: bankerFixture.prediction.marketType,
                      pick: bankerFixture.prediction.tipLabel,
                      odds: bankerFixture.prediction.odds,
                    })
                  }
                  className={`py-2 px-4 rounded-lg text-xs font-bold transition-all ${
                    isInSlip(bankerFixture.id, bankerFixture.prediction.tipLabel)
                      ? 'bg-emerald-500 text-black'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold shadow-[0_0_15px_rgba(0,229,255,0.4)]'
                  }`}
                >
                  {isInSlip(bankerFixture.id, bankerFixture.prediction.tipLabel) ? 'Added' : 'Add to Slip'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of VIP Fixtures */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400 fill-amber-400" />
            <h3 className="font-black text-white text-lg tracking-wide">
              Today's VIP Club Match Picks
            </h3>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {vipFixtures.length} VIP tips active
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {vipFixtures.map(fixture => {
            const isLocked = !currentUser.isVip;

            return (
              <div 
                key={fixture.id} 
                className={`rounded-2xl border p-5 transition-all ${
                  isLocked 
                    ? 'bg-[#0a0c14] border-amber-500/20 relative overflow-hidden' 
                    : 'bg-[#0a0e1a] border-amber-400/40 shadow-[0_0_20px_rgba(245,158,11,0.08)]'
                }`}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-3 text-xs">
                  <span className="font-semibold text-slate-300">{fixture.league}</span>
                  <span className="font-mono text-amber-400 font-bold flex items-center gap-1">
                    <Crown className="w-3 h-3 fill-amber-400" />
                    VIP EXCLUSIVE
                  </span>
                </div>

                {/* Matchup */}
                <div className="flex items-center justify-between my-3">
                  <div className="font-extrabold text-white text-sm sm:text-base">
                    {fixture.homeTeam.name} vs {fixture.awayTeam.name}
                  </div>
                  <span className="font-mono text-xs text-slate-400">{fixture.kickOff}</span>
                </div>

                {isLocked ? (
                  <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/30 flex items-center justify-between gap-3 mt-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-amber-400/10 flex items-center justify-center text-amber-400 shrink-0">
                        <Lock className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-amber-300 text-xs">Premium Value Pick Locked</div>
                        <div className="text-[11px] text-slate-400">Subscribe or use Demo Mode to view</div>
                      </div>
                    </div>

                    <button
                      onClick={onOpenVipModal}
                      className="px-3.5 py-1.5 rounded-lg bg-amber-400 hover:bg-amber-300 text-black font-black text-xs shrink-0"
                    >
                      Unlock
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3 mt-4 pt-3 border-t border-slate-800">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold">
                          PROBABILITY: {fixture.probabilities.over25}%
                        </span>
                        <span className="text-xs text-slate-300 font-bold">
                          {fixture.prediction.tipLabel}
                        </span>
                      </div>
                      <span className="font-mono font-black text-cyan-400 text-sm">
                        @{fixture.prediction.odds.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 line-clamp-2">
                      {fixture.prediction.reasoning}
                    </p>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => onSelectAnalysis(fixture)}
                        className="flex-1 py-1.5 px-3 bg-[#0d1220] border border-cyan-500/30 text-cyan-300 hover:text-white rounded-lg text-xs font-semibold"
                      >
                        AI Tactical Notes
                      </button>
                      <button
                        onClick={() =>
                          onAddToSlip({
                            id: `${fixture.id}-${fixture.prediction.primaryTip}`,
                            fixtureId: fixture.id,
                            matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                            league: fixture.league,
                            market: fixture.prediction.marketType,
                            pick: fixture.prediction.tipLabel,
                            odds: fixture.prediction.odds,
                          })
                        }
                        className="py-1.5 px-3 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg text-xs"
                      >
                        {isInSlip(fixture.id, fixture.prediction.tipLabel) ? 'In Slip' : 'Add Slip'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
