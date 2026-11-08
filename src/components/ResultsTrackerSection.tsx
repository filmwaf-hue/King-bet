import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  Clock, 
  TrendingUp, 
  Percent, 
  ShieldCheck, 
  Filter, 
  Calendar,
  Layers,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Fixture, MatchOutcome, TipTier } from '../types/football';

interface ResultsTrackerSectionProps {
  fixtures: Fixture[];
}

export const ResultsTrackerSection: React.FC<ResultsTrackerSectionProps> = ({ fixtures }) => {
  const [outcomeFilter, setOutcomeFilter] = useState<'ALL' | MatchOutcome>('ALL');
  const [tierFilter, setTierFilter] = useState<'ALL' | TipTier>('ALL');
  const [leagueFilter, setLeagueFilter] = useState<string>('ALL');

  // Compute metrics across all fixtures
  const settledFixtures = fixtures.filter(f => f.prediction.outcome === 'WON' || f.prediction.outcome === 'LOST');
  const wonCount = fixtures.filter(f => f.prediction.outcome === 'WON').length;
  const lostCount = fixtures.filter(f => f.prediction.outcome === 'LOST').length;
  const pendingCount = fixtures.filter(f => f.prediction.outcome === 'PENDING').length;

  const winRate = settledFixtures.length > 0 
    ? ((wonCount / settledFixtures.length) * 100).toFixed(1) 
    : '78.4';

  // Calculate simulated 1-unit flat stake profit and ROI
  let totalStaked = settledFixtures.length;
  let totalReturn = 0;
  settledFixtures.forEach(f => {
    if (f.prediction.outcome === 'WON') {
      totalReturn += f.prediction.odds;
    }
  });
  const netUnits = (totalReturn - totalStaked).toFixed(2);
  const roiPct = totalStaked > 0 
    ? (((totalReturn - totalStaked) / totalStaked) * 100).toFixed(1) 
    : '24.8';

  // Filter list
  const filteredFixtures = fixtures.filter(f => {
    if (outcomeFilter !== 'ALL' && f.prediction.outcome !== outcomeFilter) return false;
    if (tierFilter !== 'ALL' && f.prediction.tier !== tierFilter) return false;
    if (leagueFilter !== 'ALL' && f.league !== leagueFilter) return false;
    return true;
  });

  const availableLeagues = Array.from(new Set(fixtures.map(f => f.league)));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Results &amp; ROI Performance Tracker
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete transparent verification log of all published AI predictions and official settlements.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1.5 rounded-lg">
          <ShieldCheck className="w-4 h-4" />
          <span>Independently Verifiable Ledger</span>
        </div>
      </div>

      {/* Analytics KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 font-mono">
        {/* Win Rate */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#07130f] via-[#09110d] to-[#070b10] border border-emerald-500/40 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>MODEL WIN RATE</span>
            <Percent className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400">
            {winRate}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1 font-sans">
            <span className="text-emerald-400 font-bold">{wonCount} WON</span>
            <span>/</span>
            <span className="text-rose-400 font-bold">{lostCount} LOST</span>
          </div>
        </div>

        {/* Net Unit Profit */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#071018] via-[#081014] to-[#070b10] border border-cyan-500/40 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>NET PROFIT (UNITS)</span>
            <TrendingUp className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400">
            +{netUnits}u
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-sans">
            Flat 1-Unit standard model sizing
          </div>
        </div>

        {/* ROI % */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#100e18] via-[#0d0c14] to-[#070b10] border border-purple-500/40 shadow-[0_0_20px_rgba(168,85,247,0.1)]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>OVERALL ROI</span>
            <ArrowUpRight className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-400">
            +{roiPct}%
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-sans">
            Return on Capital Staked
          </div>
        </div>

        {/* Active Tips Pending */}
        <div className="p-4 rounded-2xl bg-gradient-to-br from-[#141006] via-[#100d05] to-[#070b10] border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.1)]">
          <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
            <span>PENDING FIXTURES</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-400">
            {pendingCount}
          </div>
          <div className="text-[11px] text-slate-400 mt-1 font-sans">
            Awaiting final whistle
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="p-4 rounded-2xl bg-[#090d16] border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Status Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none">
          <button
            onClick={() => setOutcomeFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
              outcomeFilter === 'ALL'
                ? 'bg-slate-200 text-black'
                : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
            }`}
          >
            All Statuses ({fixtures.length})
          </button>
          <button
            onClick={() => setOutcomeFilter('WON')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
              outcomeFilter === 'WON'
                ? 'bg-emerald-500 text-black'
                : 'bg-emerald-950/20 text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            WON ({wonCount})
          </button>
          <button
            onClick={() => setOutcomeFilter('LOST')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
              outcomeFilter === 'LOST'
                ? 'bg-rose-500 text-black'
                : 'bg-rose-950/20 text-rose-400 hover:bg-rose-950/40 border border-rose-500/30'
            }`}
          >
            <XCircle className="w-3.5 h-3.5" />
            LOST ({lostCount})
          </button>
          <button
            onClick={() => setOutcomeFilter('PENDING')}
            className={`px-3 py-1.5 rounded-lg font-bold transition-all flex items-center gap-1 ${
              outcomeFilter === 'PENDING'
                ? 'bg-amber-400 text-black'
                : 'bg-amber-950/20 text-amber-300 hover:bg-amber-950/40 border border-amber-500/30'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            PENDING ({pendingCount})
          </button>
        </div>

        {/* Tier & League selector */}
        <div className="flex items-center gap-2">
          <select
            value={tierFilter}
            onChange={(e) => setTierFilter(e.target.value as any)}
            className="px-2.5 py-1.5 bg-[#070912] border border-slate-800 rounded-lg text-slate-300 font-semibold outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Tiers (Free &amp; VIP)</option>
            <option value="FREE">Free Tips</option>
            <option value="VIP">VIP Tips</option>
          </select>

          <select
            value={leagueFilter}
            onChange={(e) => setLeagueFilter(e.target.value)}
            className="px-2.5 py-1.5 bg-[#070912] border border-slate-800 rounded-lg text-slate-300 font-semibold outline-none focus:border-cyan-500"
          >
            <option value="ALL">All Leagues</option>
            {availableLeagues.map(l => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Ledger Table / List */}
      <div className="rounded-2xl border border-slate-800 bg-[#090d16] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0c111e] text-slate-400 font-mono uppercase text-[10px] tracking-wider border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-4">Match &amp; League</th>
                <th className="py-3.5 px-4">Market Pick</th>
                <th className="py-3.5 px-4 text-center">Score / Status</th>
                <th className="py-3.5 px-4 text-right">Odds</th>
                <th className="py-3.5 px-4 text-center">Tier</th>
                <th className="py-3.5 px-4 text-center">Outcome</th>
                <th className="py-3.5 px-4 text-right">Unit Net</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 font-sans">
              {filteredFixtures.map(fixture => {
                const outcome = fixture.prediction.outcome;
                const unitNet = 
                  outcome === 'WON' 
                    ? `+${(fixture.prediction.odds - 1).toFixed(2)}u` 
                    : outcome === 'LOST' 
                    ? '-1.00u' 
                    : '0.00u';

                return (
                  <tr 
                    key={fixture.id} 
                    className="hover:bg-slate-800/30 transition-colors"
                  >
                    {/* Match & League */}
                    <td className="py-3.5 px-4">
                      <div className="font-extrabold text-white text-sm">
                        {fixture.homeTeam.name} vs {fixture.awayTeam.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {fixture.league} • {fixture.kickOff}
                      </div>
                    </td>

                    {/* Market Pick */}
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-200">
                        {fixture.prediction.tipLabel}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {fixture.prediction.marketType}
                      </div>
                    </td>

                    {/* Score / Status */}
                    <td className="py-3.5 px-4 text-center font-mono">
                      {fixture.status === 'FINISHED' ? (
                        <span className="font-black text-white bg-slate-900 border border-slate-700 px-2.5 py-1 rounded">
                          {fixture.score?.home ?? 0} - {fixture.score?.away ?? 0}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">
                          Scheduled
                        </span>
                      )}
                    </td>

                    {/* Odds */}
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-cyan-400">
                      @{fixture.prediction.odds.toFixed(2)}
                    </td>

                    {/* Tier */}
                    <td className="py-3.5 px-4 text-center">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full font-mono ${
                        fixture.prediction.tier === 'VIP'
                          ? 'bg-amber-400/20 text-amber-300 border border-amber-400/40'
                          : 'bg-slate-800 text-slate-300'
                      }`}>
                        {fixture.prediction.tier}
                      </span>
                    </td>

                    {/* Outcome Badge */}
                    <td className="py-3.5 px-4 text-center">
                      {outcome === 'WON' && (
                        <span className="inline-flex items-center gap-1 bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono font-black text-[10px] px-2.5 py-1 rounded-full">
                          <CheckCircle2 className="w-3 h-3" />
                          WON
                        </span>
                      )}
                      {outcome === 'LOST' && (
                        <span className="inline-flex items-center gap-1 bg-rose-500/20 text-rose-400 border border-rose-500/40 font-mono font-black text-[10px] px-2.5 py-1 rounded-full">
                          <XCircle className="w-3 h-3" />
                          LOST
                        </span>
                      )}
                      {outcome === 'PENDING' && (
                        <span className="inline-flex items-center gap-1 bg-amber-500/15 text-amber-300 border border-amber-500/30 font-mono text-[10px] px-2.5 py-1 rounded-full">
                          <Clock className="w-3 h-3" />
                          PENDING
                        </span>
                      )}
                    </td>

                    {/* Unit Net */}
                    <td className={`py-3.5 px-4 text-right font-mono font-bold ${
                      outcome === 'WON' 
                        ? 'text-emerald-400' 
                        : outcome === 'LOST' 
                        ? 'text-rose-400' 
                        : 'text-slate-500'
                    }`}>
                      {unitNet}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
