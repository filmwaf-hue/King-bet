import React from 'react';
import { 
  Sparkles, 
  Crown, 
  Lock, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Plus, 
  Check, 
  TrendingUp,
  BarChart3,
  ShieldAlert
} from 'lucide-react';
import { Fixture, BetSlipItem, UserProfile } from '../types/football';

interface MatchCardProps {
  fixture: Fixture;
  currentUser: UserProfile;
  onSelectAnalysis: (fixture: Fixture) => void;
  onAddToSlip: (item: BetSlipItem) => void;
  isInSlip: (fixtureId: string, pick: string) => boolean;
  onOpenVipModal: () => void;
}

export const MatchCard: React.FC<MatchCardProps> = ({
  fixture,
  currentUser,
  onSelectAnalysis,
  onAddToSlip,
  isInSlip,
  onOpenVipModal,
}) => {
  const isVipLocked = fixture.prediction.tier === 'VIP' && !currentUser.isVip;

  const renderFormBadge = (result: 'W' | 'D' | 'L', idx: number) => {
    const bg = 
      result === 'W' 
        ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' 
        : result === 'D' 
        ? 'bg-slate-700/50 text-slate-300 border-slate-600' 
        : 'bg-rose-500/20 text-rose-400 border-rose-500/30';
    return (
      <span 
        key={idx} 
        className={`w-4 h-4 rounded text-[9px] font-mono font-bold flex items-center justify-center border ${bg}`}
      >
        {result}
      </span>
    );
  };

  return (
    <div className={`relative rounded-2xl bg-[#0a0d16] border transition-all duration-200 overflow-hidden ${
      fixture.isBankerOfDay 
        ? 'border-cyan-400/50 shadow-[0_0_25px_rgba(0,229,255,0.12)]' 
        : fixture.prediction.tier === 'VIP'
        ? 'border-amber-400/30 hover:border-amber-400/60 shadow-[0_0_20px_rgba(245,158,11,0.06)]'
        : 'border-slate-800 hover:border-cyan-500/30'
    }`}>
      {/* Top Banner & League Header */}
      <div className="bg-[#0e1320] px-4 py-2.5 flex items-center justify-between border-b border-slate-800/80 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-semibold text-white tracking-wide">{fixture.league}</span>
          <span className="text-slate-500">•</span>
          <span className="text-slate-400 font-mono text-[11px]">{fixture.round}</span>
        </div>

        <div className="flex items-center gap-2">
          {fixture.status === 'FINISHED' ? (
            <span className="flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-800 text-slate-300 border border-slate-700">
              FT {fixture.score?.home ?? 0} - {fixture.score?.away ?? 0}
            </span>
          ) : (
            <span className="flex items-center gap-1 text-cyan-400 font-mono text-[11px] font-medium">
              <Clock className="w-3 h-3 text-cyan-400" />
              {fixture.kickOff}
            </span>
          )}

          {fixture.isBankerOfDay && (
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-black text-[9px] px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,229,255,0.4)]">
              BANKER OF DAY
            </span>
          )}

          {fixture.prediction.tier === 'VIP' && (
            <span className="bg-amber-400/15 border border-amber-400/40 text-amber-300 font-bold text-[9px] px-2 py-0.5 rounded-full flex items-center gap-1">
              <Crown className="w-2.5 h-2.5 fill-amber-400" />
              VIP
            </span>
          )}
        </div>
      </div>

      {/* Main Match Info & Teams */}
      <div className="p-4 sm:p-5">
        <div className="grid grid-cols-12 gap-3 items-center mb-4">
          
          {/* Home Team */}
          <div className="col-span-5 flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center font-bold text-xs text-white shadow-inner shrink-0 overflow-hidden">
              <img 
                src={fixture.homeTeam.logo} 
                alt={fixture.homeTeam.name} 
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute text-[10px] font-bold font-mono text-cyan-400">
                {fixture.homeTeam.shortName}
              </span>
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-white text-sm sm:text-base leading-tight truncate">
                {fixture.homeTeam.name}
              </h4>
              <div className="flex items-center gap-1.5 mt-1">
                <span className="text-[10px] text-slate-400 font-mono">
                  #{fixture.homeTeam.leagueRank}
                </span>
                <div className="flex items-center gap-0.5">
                  {fixture.homeTeam.form.map((res, i) => renderFormBadge(res, i))}
                </div>
              </div>
            </div>
          </div>

          {/* Versus / Score Center */}
          <div className="col-span-2 text-center">
            {fixture.status === 'FINISHED' ? (
              <div className="font-mono font-black text-xl text-white tracking-wider">
                {fixture.score?.home ?? 0} : {fixture.score?.away ?? 0}
              </div>
            ) : (
              <div className="inline-block px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-black text-slate-400 font-mono">
                VS
              </div>
            )}
            <div className="text-[9px] text-slate-500 mt-1 truncate">
              {fixture.venue.split(',')[0]}
            </div>
          </div>

          {/* Away Team */}
          <div className="col-span-5 flex items-center justify-end gap-3 text-right">
            <div className="min-w-0">
              <h4 className="font-bold text-white text-sm sm:text-base leading-tight truncate">
                {fixture.awayTeam.name}
              </h4>
              <div className="flex items-center justify-end gap-1.5 mt-1">
                <div className="flex items-center gap-0.5">
                  {fixture.awayTeam.form.map((res, i) => renderFormBadge(res, i))}
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  #{fixture.awayTeam.leagueRank}
                </span>
              </div>
            </div>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700/80 flex items-center justify-center font-bold text-xs text-white shadow-inner shrink-0 overflow-hidden">
              <img 
                src={fixture.awayTeam.logo} 
                alt={fixture.awayTeam.name} 
                className="w-full h-full object-cover opacity-80"
                onError={(e) => {
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
              <span className="absolute text-[10px] font-bold font-mono text-cyan-400">
                {fixture.awayTeam.shortName}
              </span>
            </div>
          </div>

        </div>

        {/* Match Probability Percentages Bar */}
        <div className="bg-[#070a12] p-3 rounded-xl border border-slate-800/80 mb-4">
          <div className="flex items-center justify-between text-[11px] mb-1.5">
            <span className="text-slate-400 flex items-center gap-1 font-medium">
              <BarChart3 className="w-3.5 h-3.5 text-cyan-400" />
              1X2 Probabilities
            </span>
            <div className="flex items-center gap-3 font-mono text-xs">
              <span className="text-cyan-400 font-bold">{fixture.homeTeam.shortName}: {fixture.probabilities.homeWin}%</span>
              <span className="text-slate-400">Draw: {fixture.probabilities.draw}%</span>
              <span className="text-purple-400 font-bold">{fixture.awayTeam.shortName}: {fixture.probabilities.awayWin}%</span>
            </div>
          </div>

          {/* Segmented Progress Bar */}
          <div className="h-2 w-full bg-slate-900 rounded-full flex overflow-hidden p-0.5 border border-slate-800">
            <div 
              style={{ width: `${fixture.probabilities.homeWin}%` }} 
              className="bg-cyan-500 rounded-l-full shadow-[0_0_8px_rgba(0,229,255,0.7)]" 
              title={`Home Win: ${fixture.probabilities.homeWin}%`}
            />
            <div 
              style={{ width: `${fixture.probabilities.draw}%` }} 
              className="bg-slate-500 mx-0.5 opacity-80" 
              title={`Draw: ${fixture.probabilities.draw}%`}
            />
            <div 
              style={{ width: `${fixture.probabilities.awayWin}%` }} 
              className="bg-purple-500 rounded-r-full shadow-[0_0_8px_rgba(168,85,247,0.7)]" 
              title={`Away Win: ${fixture.probabilities.awayWin}%`}
            />
          </div>

          {/* Secondary Markets Probabilities */}
          <div className="grid grid-cols-2 gap-2 mt-2 pt-2 border-t border-slate-800/60 text-[10px] font-mono">
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">Over 2.5 Goals:</span>
              <span className={fixture.probabilities.over25 >= 55 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {fixture.probabilities.over25}% <span className="text-slate-500">(@{fixture.odds.over25})</span>
              </span>
            </div>
            <div className="flex items-center justify-between text-slate-300">
              <span className="text-slate-400">BTTS (Both Score):</span>
              <span className={fixture.probabilities.bttsYes >= 55 ? 'text-emerald-400 font-bold' : 'text-slate-400'}>
                {fixture.probabilities.bttsYes}% <span className="text-slate-500">(@{fixture.odds.bttsYes})</span>
              </span>
            </div>
          </div>
        </div>

        {/* Prediction Box / VIP Lock Overlay */}
        <div className={`p-3.5 rounded-xl border relative ${
          isVipLocked 
            ? 'bg-[#121008] border-amber-500/30' 
            : fixture.prediction.outcome === 'WON'
            ? 'bg-emerald-950/20 border-emerald-500/30'
            : fixture.prediction.outcome === 'LOST'
            ? 'bg-rose-950/20 border-rose-500/30'
            : 'bg-gradient-to-r from-blue-950/30 via-cyan-950/20 to-slate-900 border-cyan-500/30'
        }`}>
          {isVipLocked ? (
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-amber-400/10 border border-amber-400/40 flex items-center justify-center text-amber-400 shrink-0">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-amber-400 font-bold text-xs uppercase tracking-wide">
                      VIP Locked Prediction
                    </span>
                    <span className="bg-amber-400/20 text-amber-300 text-[10px] px-1.5 py-0.2 rounded font-mono font-bold">
                      Confidence 5★
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    High value tactical pick reserved for VIP Club subscribers.
                  </p>
                </div>
              </div>
              <button
                onClick={onOpenVipModal}
                className="bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs px-3.5 py-1.5 rounded-lg shadow-[0_0_15px_rgba(250,204,21,0.3)] transition-all whitespace-nowrap shrink-0"
              >
                Unlock VIP
              </button>
            </div>
          ) : (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-cyan-400 font-bold tracking-wider uppercase">
                    AI PREDICTION
                  </span>

                  {/* Outcome Tag if Finished */}
                  {fixture.prediction.outcome === 'WON' && (
                    <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5" />
                      WON
                    </span>
                  )}
                  {fixture.prediction.outcome === 'LOST' && (
                    <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[9px] font-black px-1.5 py-0.5 rounded flex items-center gap-1">
                      <XCircle className="w-2.5 h-2.5" />
                      LOST
                    </span>
                  )}
                  {fixture.prediction.outcome === 'PENDING' && (
                    <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[9px] font-mono px-1.5 py-0.5 rounded">
                      PENDING
                    </span>
                  )}
                </div>

                <div className="flex items-baseline gap-2">
                  <span className="font-extrabold text-white text-sm sm:text-base">
                    {fixture.prediction.tipLabel}
                  </span>
                  <span className="font-mono font-bold text-cyan-400 text-sm bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                    @{fixture.prediction.odds.toFixed(2)}
                  </span>
                </div>

                <p className="text-[11px] text-slate-400 line-clamp-1">
                  {fixture.prediction.reasoning}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 pt-2 sm:pt-0">
                <button
                  onClick={() => onSelectAnalysis(fixture)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0f1524] hover:bg-cyan-950/50 border border-cyan-500/30 text-cyan-300 hover:text-white rounded-lg text-xs font-semibold transition-all"
                  title="View AI Tactical Breakdown"
                >
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                  <span>AI Analysis</span>
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
                  className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isInSlip(fixture.id, fixture.prediction.tipLabel)
                      ? 'bg-emerald-500 text-black shadow-[0_0_12px_rgba(16,185,129,0.5)]'
                      : 'bg-cyan-500 hover:bg-cyan-400 text-black shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                  }`}
                >
                  {isInSlip(fixture.id, fixture.prediction.tipLabel) ? (
                    <>
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Added</span>
                    </>
                  ) : (
                    <>
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add Slip</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Quick Market Odds (1 X 2 direct selection) */}
        <div className="grid grid-cols-3 gap-2 mt-3 text-xs">
          <button
            onClick={() =>
              onAddToSlip({
                id: `${fixture.id}-1`,
                fixtureId: fixture.id,
                matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                league: fixture.league,
                market: '1X2',
                pick: `${fixture.homeTeam.shortName} Win`,
                odds: fixture.odds.homeWin,
              })
            }
            className={`p-2 rounded-lg border text-center transition-all ${
              isInSlip(fixture.id, `${fixture.homeTeam.shortName} Win`)
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                : 'bg-[#0d111a] border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="text-[10px] text-slate-400 font-medium">1 ({fixture.homeTeam.shortName})</div>
            <div className="font-mono font-bold text-white text-xs">{fixture.odds.homeWin.toFixed(2)}</div>
          </button>

          <button
            onClick={() =>
              onAddToSlip({
                id: `${fixture.id}-X`,
                fixtureId: fixture.id,
                matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                league: fixture.league,
                market: '1X2',
                pick: 'Draw (X)',
                odds: fixture.odds.draw,
              })
            }
            className={`p-2 rounded-lg border text-center transition-all ${
              isInSlip(fixture.id, 'Draw (X)')
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                : 'bg-[#0d111a] border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="text-[10px] text-slate-400 font-medium">X (Draw)</div>
            <div className="font-mono font-bold text-white text-xs">{fixture.odds.draw.toFixed(2)}</div>
          </button>

          <button
            onClick={() =>
              onAddToSlip({
                id: `${fixture.id}-2`,
                fixtureId: fixture.id,
                matchTitle: `${fixture.homeTeam.name} vs ${fixture.awayTeam.name}`,
                league: fixture.league,
                market: '1X2',
                pick: `${fixture.awayTeam.shortName} Win`,
                odds: fixture.odds.awayWin,
              })
            }
            className={`p-2 rounded-lg border text-center transition-all ${
              isInSlip(fixture.id, `${fixture.awayTeam.shortName} Win`)
                ? 'bg-cyan-950/60 border-cyan-400 text-cyan-300'
                : 'bg-[#0d111a] border-slate-800 hover:border-slate-700 text-slate-300'
            }`}
          >
            <div className="text-[10px] text-slate-400 font-medium">2 ({fixture.awayTeam.shortName})</div>
            <div className="font-mono font-bold text-white text-xs">{fixture.odds.awayWin.toFixed(2)}</div>
          </button>
        </div>
      </div>
    </div>
  );
};
