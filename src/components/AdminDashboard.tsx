import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Plus, 
  Sparkles, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw,
  Crown,
  Layers,
  ArrowRight,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { Fixture, MatchOutcome, TipTier, MatchAnalysis, UserProfile } from '../types/football';

interface AdminDashboardProps {
  fixtures: Fixture[];
  currentUser: UserProfile;
  onOpenAuth: () => void;
  onAddFixture: (fixture: Fixture) => void;
  onUpdateFixture: (fixture: Fixture) => void;
  onDeleteFixture: (fixtureId: string) => void;
  onResetData: () => void;
}

const ROOT_ADMIN_EMAIL = 'filmwaf@gmail.com';

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  fixtures,
  currentUser,
  onOpenAuth,
  onAddFixture,
  onUpdateFixture,
  onDeleteFixture,
  onResetData,
}) => {
  const isAuthorized = currentUser.role === 'admin' && currentUser.email.toLowerCase() === ROOT_ADMIN_EMAIL.toLowerCase();

  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [editingFixtureId, setEditingFixtureId] = useState<string | null>(null);
  const [isAiLoading, setIsAiLoading] = useState(false);

  // New Match Form State
  const [formLeague, setFormLeague] = useState('Premier League');
  const [formHomeTeam, setFormHomeTeam] = useState('');
  const [formAwayTeam, setFormAwayTeam] = useState('');
  const [formKickoff, setFormKickoff] = useState('Today, 20:00');
  const [formVenue, setFormVenue] = useState('Main Stadium');
  const [formTipLabel, setFormTipLabel] = useState('');
  const [formOdds, setFormOdds] = useState('1.85');
  const [formTier, setFormTier] = useState<TipTier>('FREE');
  const [formPrimaryTip, setFormPrimaryTip] = useState('HOME_WIN');
  const [formConfidence, setFormConfidence] = useState('4');
  const [formReasoning, setFormReasoning] = useState('');
  const [formHomeProb, setFormHomeProb] = useState('52');
  const [formDrawProb, setFormDrawProb] = useState('26');
  const [formAwayProb, setFormAwayProb] = useState('22');
  const [formOver25Prob, setFormOver25Prob] = useState('58');
  const [formBttsProb, setFormBttsProb] = useState('54');
  const [formIsBanker, setFormIsBanker] = useState(false);

  // Handle AI Auto-Fill for Admin match creation
  const handleAiAutoFill = async () => {
    if (!formHomeTeam || !formAwayTeam) {
      alert('Please enter both Home Team and Away Team names first.');
      return;
    }

    setIsAiLoading(true);
    try {
      const response = await fetch('/api/analyze-match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          matchData: {
            homeTeam: formHomeTeam,
            awayTeam: formAwayTeam,
            league: formLeague,
            venue: formVenue,
            homeStats: { goalsScoredAvg: 1.9, goalsConcededAvg: 0.9, last5Wins: 3 },
            awayStats: { goalsScoredAvg: 1.3, goalsConcededAvg: 1.5, last5Wins: 2 },
          },
        }),
      });

      if (!response.ok) throw new Error('API request failed');
      const data = await response.json();

      setFormTipLabel(data.tipLabel || `${formHomeTeam} to Win`);
      setFormPrimaryTip(data.primaryTip || 'HOME_WIN');
      setFormReasoning(data.summary || 'Tactical data favors home territory advantage.');
      setFormHomeProb(String(data.probabilities?.homeWin ?? 52));
      setFormDrawProb(String(data.probabilities?.draw ?? 26));
      setFormAwayProb(String(data.probabilities?.awayWin ?? 22));
      setFormOver25Prob(String(data.probabilities?.over25 ?? 58));
      setFormBttsProb(String(data.probabilities?.bttsYes ?? 54));
      setFormConfidence(String(data.confidence ?? 4));
      setFormTier(data.tier === 'VIP' ? 'VIP' : 'FREE');
    } catch (e) {
      console.error('Error during AI auto fill:', e);
      // Fallback auto fill
      setFormTipLabel(`${formHomeTeam} to Win & Over 1.5`);
      setFormReasoning('Modeled from recent possession efficiency and home defensive record.');
    } finally {
      setIsAiLoading(false);
    }
  };

  const handleCreateSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formHomeTeam || !formAwayTeam || !formTipLabel) {
      alert('Please fill out all required fields.');
      return;
    }

    const newFixture: Fixture = {
      id: `fix-custom-${Date.now()}`,
      league: formLeague,
      leagueCode: formLeague.slice(0, 3).toUpperCase(),
      country: 'Global',
      round: 'Regular Season',
      kickOff: formKickoff,
      dateLabel: 'Today',
      venue: formVenue,
      status: 'SCHEDULED',
      homeTeam: {
        name: formHomeTeam,
        shortName: formHomeTeam.slice(0, 3).toUpperCase(),
        logo: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=120&auto=format&fit=crop&q=80',
        form: ['W', 'W', 'D', 'W', 'L'],
        leagueRank: 2,
        played: 20,
        won: 14,
        drawn: 3,
        lost: 3,
        goalsScored: 44,
        goalsConceded: 18,
        cleanSheets: 9,
      },
      awayTeam: {
        name: formAwayTeam,
        shortName: formAwayTeam.slice(0, 3).toUpperCase(),
        logo: 'https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=120&auto=format&fit=crop&q=80',
        form: ['W', 'L', 'D', 'W', 'L'],
        leagueRank: 6,
        played: 20,
        won: 9,
        drawn: 4,
        lost: 7,
        goalsScored: 31,
        goalsConceded: 28,
        cleanSheets: 5,
      },
      h2h: { homeWins: 2, draws: 1, awayWins: 1, lastMatches: [] },
      odds: {
        homeWin: parseFloat(formOdds),
        draw: 3.50,
        awayWin: 4.20,
        over15: 1.25,
        under15: 3.80,
        over25: 1.85,
        under25: 1.95,
        over35: 3.10,
        under35: 1.35,
        bttsYes: 1.75,
        bttsNo: 2.05,
      },
      probabilities: {
        homeWin: parseInt(formHomeProb) || 50,
        draw: parseInt(formDrawProb) || 26,
        awayWin: parseInt(formAwayProb) || 24,
        over15: 82,
        under15: 18,
        over25: parseInt(formOver25Prob) || 55,
        under25: 100 - (parseInt(formOver25Prob) || 55),
        over35: 32,
        under35: 68,
        bttsYes: parseInt(formBttsProb) || 52,
        bttsNo: 100 - (parseInt(formBttsProb) || 52),
      },
      prediction: {
        primaryTip: formPrimaryTip,
        tipLabel: formTipLabel,
        marketType: 'COMBO',
        odds: parseFloat(formOdds) || 1.85,
        confidence: parseInt(formConfidence) || 4,
        tier: formTier,
        isBanker: formIsBanker,
        outcome: 'PENDING',
        reasoning: formReasoning || 'Model projects positive edge on stated market parameters.',
        keyFactors: [
          `${formHomeTeam} holds superior xG generation per 90.`,
          `${formAwayTeam} has conceded in 70% of road fixtures.`,
        ],
        riskLevel: formTier === 'VIP' ? 'LOW' : 'MEDIUM',
      },
      isBankerOfDay: formIsBanker,
    };

    onAddFixture(newFixture);
    setIsCreatingNew(false);
    // Reset form
    setFormHomeTeam('');
    setFormAwayTeam('');
    setFormTipLabel('');
    setFormReasoning('');
  };

  // Quick Outcome Setter
  const handleOutcomeChange = (fixture: Fixture, outcome: MatchOutcome) => {
    const updated = {
      ...fixture,
      prediction: {
        ...fixture.prediction,
        outcome,
      },
      status: (outcome === 'WON' || outcome === 'LOST' ? 'FINISHED' : 'SCHEDULED') as Fixture['status'],
      score: outcome === 'WON' ? { home: 2, away: 0 } : outcome === 'LOST' ? { home: 0, away: 1 } : undefined,
    };
    onUpdateFixture(updated);
  };

  if (!isAuthorized) {
    return (
      <div className="max-w-xl mx-auto my-12 p-8 rounded-3xl bg-[#0b0e1b] border border-purple-500/30 text-center space-y-5 shadow-[0_0_50px_rgba(168,85,247,0.15)]">
        <div className="w-16 h-16 mx-auto rounded-2xl bg-purple-950/40 border border-purple-500/40 flex items-center justify-center text-purple-400">
          <Lock className="w-8 h-8" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-black text-white">Administrator Access Required</h2>
          <p className="text-xs text-slate-300 leading-relaxed">
            The Admin Management Console is restricted strictly to authorized system administrators. Ordinary user accounts cannot publish tips, modify fixture data, or manage system parameters.
          </p>
        </div>
        <div className="p-3.5 rounded-xl bg-[#060810] border border-slate-800 text-left text-xs space-y-1">
          <span className="text-[10px] text-purple-400 font-mono font-bold uppercase tracking-wider block">
            AUTHORIZATION POLICY
          </span>
          <p className="text-slate-400 text-[11px]">
            Permanent Root Administrator Email: <strong className="text-white font-mono">{ROOT_ADMIN_EMAIL}</strong>
          </p>
          <p className="text-slate-500 text-[10px]">
            Current Session: {currentUser.email} ({currentUser.role.toUpperCase()})
          </p>
        </div>
        <button
          onClick={onOpenAuth}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all flex items-center justify-center gap-2"
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Sign In as Permanent Administrator</span>
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-purple-500/30">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-purple-500/20 text-purple-300 border border-purple-500/30">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Administrator Match &amp; Prediction Hub
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Manage upcoming fixtures, publish AI-vetted predictions, set VIP tier flags, and verify settled match scores.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsCreatingNew(!isCreatingNew)}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 text-white font-extrabold text-xs shadow-[0_0_20px_rgba(168,85,247,0.4)] transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>{isCreatingNew ? 'Cancel Form' : 'Publish New Prediction'}</span>
          </button>

          <button
            onClick={onResetData}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-semibold"
            title="Reset to default seed fixtures"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo Data</span>
          </button>
        </div>
      </div>

      {/* CREATE NEW FIXTURE FORM */}
      {isCreatingNew && (
        <form onSubmit={handleCreateSubmit} className="p-6 rounded-2xl bg-[#0c0f1c] border border-cyan-500/40 shadow-[0_0_35px_rgba(0,229,255,0.1)] space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="font-black text-white text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              Publish New Football Fixture &amp; Tip
            </h3>
            <button
              type="button"
              onClick={handleAiAutoFill}
              disabled={isAiLoading}
              className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-cyan-500 to-blue-600 text-black font-extrabold text-xs rounded-lg shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all disabled:opacity-50"
            >
              <Sparkles className={`w-3.5 h-3.5 ${isAiLoading ? 'animate-spin' : ''}`} />
              <span>{isAiLoading ? 'Analyzing Model...' : 'AI Auto-Fill with Gemini'}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">League</label>
              <input
                type="text"
                value={formLeague}
                onChange={(e) => setFormLeague(e.target.value)}
                className="w-full px-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
                placeholder="e.g. Premier League"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Home Team</label>
              <input
                type="text"
                value={formHomeTeam}
                onChange={(e) => setFormHomeTeam(e.target.value)}
                className="w-full px-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
                placeholder="e.g. Arsenal"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Away Team</label>
              <input
                type="text"
                value={formAwayTeam}
                onChange={(e) => setFormAwayTeam(e.target.value)}
                className="w-full px-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
                placeholder="e.g. Chelsea"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Kick-off Date/Time</label>
              <input
                type="text"
                value={formKickoff}
                onChange={(e) => setFormKickoff(e.target.value)}
                className="w-full px-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
                placeholder="Today, 20:00"
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Prediction Pick</label>
              <input
                type="text"
                value={formTipLabel}
                onChange={(e) => setFormTipLabel(e.target.value)}
                className="w-full px-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
                placeholder="e.g. Home Win & Over 1.5 Goals"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Market Odds</label>
              <input
                type="number"
                step="0.01"
                value={formOdds}
                onChange={(e) => setFormOdds(e.target.value)}
                className="w-full px-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400 font-mono"
                placeholder="1.85"
                required
              />
            </div>

            <div>
              <label className="text-[11px] font-bold text-slate-400 block mb-1">Tip Tier</label>
              <select
                value={formTier}
                onChange={(e) => setFormTier(e.target.value as TipTier)}
                className="w-full px-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
              >
                <option value="FREE">Free Tip</option>
                <option value="VIP">VIP Exclusive Tip</option>
              </select>
            </div>
          </div>

          {/* Probabilities Row */}
          <div className="p-3 rounded-xl bg-[#080b14] border border-slate-800">
            <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider block mb-2 font-mono">
              Market Probabilities (%)
            </span>
            <div className="grid grid-cols-5 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-400 block">Home Win %</label>
                <input
                  type="number"
                  value={formHomeProb}
                  onChange={(e) => setFormHomeProb(e.target.value)}
                  className="w-full px-2 py-1 bg-[#05070d] border border-slate-700 rounded text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Draw %</label>
                <input
                  type="number"
                  value={formDrawProb}
                  onChange={(e) => setFormDrawProb(e.target.value)}
                  className="w-full px-2 py-1 bg-[#05070d] border border-slate-700 rounded text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Away Win %</label>
                <input
                  type="number"
                  value={formAwayProb}
                  onChange={(e) => setFormAwayProb(e.target.value)}
                  className="w-full px-2 py-1 bg-[#05070d] border border-slate-700 rounded text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">Over 2.5 %</label>
                <input
                  type="number"
                  value={formOver25Prob}
                  onChange={(e) => setFormOver25Prob(e.target.value)}
                  className="w-full px-2 py-1 bg-[#05070d] border border-slate-700 rounded text-white font-mono text-xs"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-400 block">BTTS %</label>
                <input
                  type="number"
                  value={formBttsProb}
                  onChange={(e) => setFormBttsProb(e.target.value)}
                  className="w-full px-2 py-1 bg-[#05070d] border border-slate-700 rounded text-white font-mono text-xs"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-[11px] font-bold text-slate-400 block mb-1">Analytical Reasoning</label>
            <textarea
              rows={2}
              value={formReasoning}
              onChange={(e) => setFormReasoning(e.target.value)}
              className="w-full px-3 py-2 bg-[#070912] border border-slate-700 rounded-lg text-white text-xs outline-none focus:border-cyan-400"
              placeholder="Model rationale behind this selection..."
            />
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
              <input
                type="checkbox"
                checked={formIsBanker}
                onChange={(e) => setFormIsBanker(e.target.checked)}
                className="w-4 h-4 rounded text-cyan-500"
              />
              <span className="font-bold text-cyan-400">Mark as Banker of the Day</span>
            </label>

            <button
              type="submit"
              className="px-6 py-2 rounded-xl bg-cyan-400 hover:bg-cyan-300 text-black font-black text-xs shadow-[0_0_20px_rgba(0,229,255,0.5)] transition-all"
            >
              Publish Fixture &amp; Tip
            </button>
          </div>
        </form>
      )}

      {/* Fixtures Management List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
          <span>ALL REGISTERED FIXTURES ({fixtures.length})</span>
          <span>Click outcome buttons to instantly test results ledger</span>
        </div>

        <div className="space-y-3">
          {fixtures.map(fixture => (
            <div
              key={fixture.id}
              className="p-4 rounded-xl bg-[#090d16] border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs"
            >
              {/* Fixture Info */}
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">
                    {fixture.homeTeam.name} vs {fixture.awayTeam.name}
                  </span>
                  <span className="text-slate-500">•</span>
                  <span className="text-slate-400 font-mono">{fixture.league}</span>

                  {fixture.isBankerOfDay && (
                    <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/40 text-[9px] px-1.5 py-0.5 rounded font-black font-mono">
                      BANKER
                    </span>
                  )}

                  {fixture.prediction.tier === 'VIP' && (
                    <span className="bg-amber-400/20 text-amber-300 border border-amber-400/40 text-[9px] px-1.5 py-0.5 rounded font-bold font-mono">
                      VIP
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-3 text-slate-400">
                  <span>Pick: <strong className="text-slate-200">{fixture.prediction.tipLabel}</strong></span>
                  <span>Odds: <strong className="font-mono text-cyan-400">@{fixture.prediction.odds.toFixed(2)}</strong></span>
                  <span>Status: <strong className="font-mono text-white">{fixture.status}</strong></span>
                </div>
              </div>

              {/* Outcome Manager Buttons */}
              <div className="flex items-center gap-2">
                <div className="flex items-center bg-[#060810] p-1 rounded-lg border border-slate-800 gap-1">
                  <button
                    onClick={() => handleOutcomeChange(fixture, 'WON')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                      fixture.prediction.outcome === 'WON'
                        ? 'bg-emerald-500 text-black shadow-[0_0_10px_rgba(16,185,129,0.5)]'
                        : 'text-slate-400 hover:text-emerald-400'
                    }`}
                  >
                    WON
                  </button>

                  <button
                    onClick={() => handleOutcomeChange(fixture, 'LOST')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                      fixture.prediction.outcome === 'LOST'
                        ? 'bg-rose-500 text-black shadow-[0_0_10px_rgba(244,63,94,0.5)]'
                        : 'text-slate-400 hover:text-rose-400'
                    }`}
                  >
                    LOST
                  </button>

                  <button
                    onClick={() => handleOutcomeChange(fixture, 'PENDING')}
                    className={`px-2.5 py-1 rounded text-[11px] font-mono font-bold transition-all ${
                      fixture.prediction.outcome === 'PENDING'
                        ? 'bg-amber-400 text-black'
                        : 'text-slate-400 hover:text-amber-300'
                    }`}
                  >
                    PENDING
                  </button>
                </div>

                <button
                  onClick={() => onDeleteFixture(fixture.id)}
                  className="p-1.5 rounded-lg text-slate-500 hover:text-rose-400 bg-slate-900 border border-slate-800 hover:border-rose-500/40 transition-colors"
                  title="Delete Fixture"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
