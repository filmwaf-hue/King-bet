import React, { useState } from 'react';
import { 
  Layers, 
  Copy, 
  Check, 
  Sparkles, 
  TrendingUp, 
  Plus, 
  Calculator, 
  CheckCircle2, 
  XCircle, 
  Clock,
  Crown
} from 'lucide-react';
import { Accumulator, BetSlipItem, UserProfile } from '../types/football';

interface DailyAccaSectionProps {
  accumulators: Accumulator[];
  currentUser: UserProfile;
  onAddToSlip: (item: BetSlipItem) => void;
  onAddAllLegsToSlip: (items: BetSlipItem[]) => void;
  onOpenVipModal: () => void;
}

export const DailyAccaSection: React.FC<DailyAccaSectionProps> = ({
  accumulators,
  currentUser,
  onAddToSlip,
  onAddAllLegsToSlip,
  onOpenVipModal,
}) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [stakeMap, setStakeMap] = useState<Record<string, number>>({
    'acca-today-ai': 20,
    'acca-vip-banker': 50,
  });

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2500);
  };

  const handleStakeChange = (accaId: string, val: number) => {
    setStakeMap(prev => ({
      ...prev,
      [accaId]: Math.max(1, isNaN(val) ? 1 : val),
    }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              <Layers className="w-4 h-4" />
            </span>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-wide">
              Daily Quantitative Accumulators
            </h2>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Carefully structured accumulators balanced for calculated positive Expected Value (+EV).
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-mono">
          <span className="bg-slate-900 border border-slate-800 text-slate-300 px-3 py-1.5 rounded-lg">
            Calculated Combinations
          </span>
        </div>
      </div>

      {/* Accumulators Cards */}
      <div className="space-y-6">
        {accumulators.map(acca => {
          const isVipLocked = acca.tier === 'VIP' && !currentUser.isVip;
          const currentStake = stakeMap[acca.id] ?? 20;
          const estimatedPayout = (currentStake * acca.totalOdds).toFixed(2);
          const estimatedProfit = (currentStake * acca.totalOdds - currentStake).toFixed(2);

          return (
            <div
              key={acca.id}
              className={`rounded-2xl border transition-all overflow-hidden ${
                acca.status === 'WON'
                  ? 'bg-gradient-to-br from-[#07130f] via-[#09110d] to-[#070b10] border-emerald-500/40 shadow-[0_0_25px_rgba(16,185,129,0.1)]'
                  : acca.tier === 'VIP'
                  ? 'bg-[#0c0e18] border-amber-400/40 shadow-[0_0_25px_rgba(245,158,11,0.08)]'
                  : 'bg-[#090d16] border-cyan-500/30 shadow-[0_0_25px_rgba(0,229,255,0.08)]'
              }`}
            >
              {/* Acca Header */}
              <div className="p-5 sm:p-6 bg-[#0c111e]/80 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-black px-2 py-0.5 rounded-full ${
                      acca.status === 'WON'
                        ? 'bg-emerald-500 text-black font-black'
                        : acca.tier === 'VIP'
                        ? 'bg-amber-400 text-black font-black'
                        : 'bg-cyan-500 text-black font-black'
                    }`}>
                      {acca.tag}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">{acca.date}</span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-black text-white">
                    {acca.title}
                  </h3>
                  <p className="text-xs text-slate-400">
                    {acca.subtitle}
                  </p>
                </div>

                {/* Right: Total Odds & Copy Code */}
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block uppercase tracking-wider font-mono">
                      COMBINED ACCA ODDS
                    </span>
                    <span className="text-2xl sm:text-3xl font-black font-mono text-cyan-400 drop-shadow-[0_0_10px_rgba(0,229,255,0.4)]">
                      {acca.totalOdds.toFixed(2)}x
                    </span>
                  </div>

                  {/* Copy Booking Code */}
                  <div className="flex flex-col items-end gap-1">
                    <button
                      onClick={() => handleCopy(acca.bookingCode)}
                      className="flex items-center gap-1.5 px-3 py-1.5 bg-[#080b13] hover:bg-slate-800 border border-slate-700 hover:border-cyan-400 text-slate-200 rounded-lg text-xs font-mono font-bold transition-all"
                      title="Copy Betcode for Bookmaker Slip"
                    >
                      {copiedCode === acca.bookingCode ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">COPIED</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-cyan-400" />
                          <span>{acca.bookingCode}</span>
                        </>
                      )}
                    </button>
                    <span className="text-[9px] text-slate-500 font-mono">Instant Booking Code</span>
                  </div>
                </div>
              </div>

              {/* Acca Legs List */}
              <div className="p-5 sm:p-6 space-y-3">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Selections ({acca.legs.length} Matches)
                </div>

                <div className="grid grid-cols-1 gap-2.5">
                  {acca.legs.map((leg, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-[#070911] border border-slate-800/80 hover:border-slate-700 transition-colors text-xs"
                    >
                      <div className="flex items-center gap-3">
                        <span className="w-6 h-6 rounded-full bg-slate-800 text-slate-300 font-mono font-bold text-[11px] flex items-center justify-center shrink-0">
                          {idx + 1}
                        </span>
                        <div>
                          <div className="font-extrabold text-white text-sm">
                            {leg.matchTitle}
                          </div>
                          <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                            <span>{leg.league}</span>
                            <span>•</span>
                            <span className="text-cyan-400 font-medium">{leg.market}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 text-right">
                        <div>
                          <div className="font-extrabold text-slate-200">
                            {leg.pick}
                          </div>
                          <div className="font-mono font-bold text-cyan-400 text-xs">
                            @{leg.odds.toFixed(2)}
                          </div>
                        </div>

                        {leg.status === 'WON' && (
                          <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            WON {leg.score && `(${leg.score})`}
                          </span>
                        )}

                        {leg.status === 'LOST' && (
                          <span className="bg-rose-500/20 text-rose-400 border border-rose-500/40 text-[10px] font-mono px-2 py-0.5 rounded font-bold flex items-center gap-1">
                            <XCircle className="w-3 h-3" />
                            LOST
                          </span>
                        )}

                        {leg.status === 'PENDING' && (
                          <span className="bg-amber-500/15 text-amber-300 border border-amber-500/30 text-[10px] font-mono px-2 py-0.5 rounded">
                            PENDING
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Acca Reasoning */}
                <p className="text-xs text-slate-400 italic pt-1">
                  💡 {acca.reasoning}
                </p>

                {/* Interactive Payout Calculator */}
                <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-[#0a0f1c] via-[#070a12] to-[#0a0f1c] border border-cyan-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                      <Calculator className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-white">Interactive Payout Calculator</div>
                      <div className="text-[11px] text-slate-400">Calculate potential winnings on this Acca</div>
                    </div>
                  </div>

                  {/* Stake controls */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-400 font-mono">Stake ($):</span>
                    <div className="flex items-center gap-1.5">
                      {[10, 20, 50, 100].map(amt => (
                        <button
                          key={amt}
                          onClick={() => handleStakeChange(acca.id, amt)}
                          className={`px-2.5 py-1 rounded text-xs font-mono font-bold transition-all ${
                            currentStake === amt
                              ? 'bg-cyan-500 text-black'
                              : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                          }`}
                        >
                          ${amt}
                        </button>
                      ))}
                    </div>
                    <input
                      type="number"
                      min={1}
                      value={currentStake}
                      onChange={(e) => handleStakeChange(acca.id, parseFloat(e.target.value))}
                      className="w-16 px-2 py-1 rounded bg-[#070910] border border-slate-700 text-white font-mono text-xs focus:border-cyan-400 outline-none text-right"
                    />
                  </div>

                  {/* Projected Return */}
                  <div className="flex items-center justify-between md:justify-end gap-4 border-t md:border-t-0 pt-2 md:pt-0 border-slate-800">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-mono">POTENTIAL RETURN</span>
                      <span className="text-lg font-black font-mono text-emerald-400">
                        ${estimatedPayout}
                      </span>
                      <span className="text-[10px] text-slate-500 font-mono block">
                        (+${estimatedProfit} net)
                      </span>
                    </div>

                    <button
                      onClick={() =>
                        onAddAllLegsToSlip(
                          acca.legs.map((leg, i) => ({
                            id: `${leg.fixtureId}-${leg.pick}`,
                            fixtureId: leg.fixtureId,
                            matchTitle: leg.matchTitle,
                            league: leg.league,
                            market: leg.market,
                            pick: leg.pick,
                            odds: leg.odds,
                          }))
                        )
                      }
                      className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center gap-1.5 shrink-0"
                    >
                      <Plus className="w-3.5 h-3.5 stroke-[3]" />
                      <span>Add All to Slip</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
