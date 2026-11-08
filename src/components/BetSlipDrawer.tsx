import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Receipt, 
  Check, 
  Sparkles, 
  TrendingUp, 
  AlertCircle 
} from 'lucide-react';
import { BetSlipItem } from '../types/football';

interface BetSlipDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: BetSlipItem[];
  onRemoveItem: (id: string) => void;
  onClearSlip: () => void;
}

export const BetSlipDrawer: React.FC<BetSlipDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearSlip,
}) => {
  const [stake, setStake] = useState<number>(20);
  const [isPlacing, setIsPlacing] = useState(false);
  const [placedSuccess, setPlacedSuccess] = useState(false);

  if (!isOpen) return null;

  // Calculate combined odds
  const totalOdds = items.reduce((acc, curr) => acc * curr.odds, 1);
  const formattedOdds = items.length > 0 ? totalOdds.toFixed(2) : '0.00';
  const potentialPayout = items.length > 0 ? (stake * totalOdds).toFixed(2) : '0.00';
  const netProfit = items.length > 0 ? (stake * totalOdds - stake).toFixed(2) : '0.00';

  const handlePlaceBet = () => {
    if (items.length === 0) return;
    setIsPlacing(true);
    setTimeout(() => {
      setIsPlacing(false);
      setPlacedSuccess(true);
      setTimeout(() => {
        setPlacedSuccess(false);
        onClearSlip();
        onClose();
      }, 2000);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/60 backdrop-blur-sm">
      <div 
        className="w-full max-w-md bg-[#0a0d18] border-l border-cyan-500/30 h-full flex flex-col shadow-[-10px_0_40px_rgba(0,229,255,0.15)] animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Slip Header */}
        <div className="p-4 bg-[#0e1322] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center font-bold">
              <Receipt className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-base">Bet Slip &amp; Tracker</h3>
                <span className="bg-cyan-500 text-black text-[10px] font-mono font-bold px-1.5 py-0.2 rounded-full">
                  {items.length} {items.length === 1 ? 'Pick' : 'Picks'}
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Multi-Match Accumulator Calculator</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {items.length > 0 && (
              <button
                onClick={onClearSlip}
                className="text-slate-500 hover:text-rose-400 p-1.5 text-xs transition-colors"
                title="Clear All Selections"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {placedSuccess && (
          <div className="m-4 p-3 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>Simulated Bet Successfully Placed! Stored in Tracker.</span>
          </div>
        )}

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {items.length === 0 ? (
            <div className="text-center py-16 space-y-3">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto text-slate-500">
                <Receipt className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-slate-300 text-sm">Your Bet Slip is Empty</h4>
              <p className="text-xs text-slate-500 max-w-xs mx-auto">
                Select predictions or odds from today's fixtures to build an accumulator and calculate potential payouts.
              </p>
            </div>
          ) : (
            items.map(item => (
              <div
                key={item.id}
                className="p-3.5 rounded-xl bg-[#070912] border border-slate-800/90 relative group hover:border-cyan-500/40 transition-colors text-xs"
              >
                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="absolute top-2.5 right-2.5 text-slate-500 hover:text-rose-400 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>

                <div className="text-[10px] text-cyan-400 font-mono font-semibold">
                  {item.league}
                </div>
                <div className="font-extrabold text-white text-sm my-0.5 pr-6">
                  {item.matchTitle}
                </div>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/60">
                  <span className="font-semibold text-slate-300">{item.pick}</span>
                  <span className="font-mono font-black text-cyan-400 text-xs bg-cyan-950/60 border border-cyan-500/30 px-2 py-0.5 rounded">
                    @{item.odds.toFixed(2)}
                  </span>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer: Accumulator Payout & Actions */}
        {items.length > 0 && (
          <div className="p-4 bg-[#080b14] border-t border-slate-800 space-y-3">
            {/* Odds & Stake Summary */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">TOTAL ACCA ODDS:</span>
                <span className="font-mono font-black text-lg text-cyan-400">
                  {formattedOdds}x
                </span>
              </div>

              {/* Stake input */}
              <div className="flex items-center justify-between gap-2 pt-1">
                <span className="text-xs text-slate-400 font-mono">STAKE ($):</span>
                <div className="flex items-center gap-1.5">
                  {[10, 25, 50].map(amt => (
                    <button
                      key={amt}
                      onClick={() => setStake(amt)}
                      className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                        stake === amt ? 'bg-cyan-500 text-black' : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      ${amt}
                    </button>
                  ))}
                  <input
                    type="number"
                    min={1}
                    value={stake}
                    onChange={(e) => setStake(Math.max(1, parseFloat(e.target.value) || 1))}
                    className="w-16 px-2 py-1 bg-[#05070d] border border-slate-700 rounded text-white font-mono text-xs text-right outline-none focus:border-cyan-400"
                  />
                </div>
              </div>

              {/* Projected Return */}
              <div className="p-3 rounded-xl bg-cyan-950/20 border border-cyan-500/30 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-mono block">POTENTIAL PAYOUT</span>
                  <span className="text-lg font-black font-mono text-emerald-400">
                    ${potentialPayout}
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 font-mono block">ESTIMATED NET PROFIT</span>
                  <span className="text-xs font-mono font-bold text-cyan-300">
                    +${netProfit}
                  </span>
                </div>
              </div>
            </div>

            <button
              onClick={handlePlaceBet}
              disabled={isPlacing}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-black text-xs shadow-[0_0_20px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Sparkles className="w-4 h-4 fill-black" />
              <span>{isPlacing ? 'Placing Bet...' : 'Simulate Bet Placement'}</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
