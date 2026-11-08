import React, { useState } from 'react';
import { 
  X, 
  Crown, 
  Check, 
  Zap, 
  ShieldCheck, 
  Sparkles, 
  Smartphone, 
  CreditCard,
  Building,
  RefreshCw,
  Lock
} from 'lucide-react';
import { UserProfile } from '../types/football';

interface VipSubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile;
  onUpgradeToVip: (planName: string) => void;
  language?: 'en' | 'sw';
}

export const VipSubscriptionModal: React.FC<VipSubscriptionModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onUpgradeToVip,
  language = 'en',
}) => {
  const [selectedPlan, setSelectedPlan] = useState<'weekly' | 'monthly' | 'lifetime'>('monthly');
  const [currency, setCurrency] = useState<'USD' | 'TZS'>('TZS');
  const [paymentMethod, setPaymentMethod] = useState<'mpesa' | 'tigopesa' | 'airtel' | 'card'>('mpesa');
  const [phoneNumber, setPhoneNumber] = useState('0754123456');
  const [isProcessing, setIsProcessing] = useState(false);
  const [verificationStep, setVerificationStep] = useState<'idle' | 'push_sent' | 'verified'>('idle');

  if (!isOpen) return null;

  const isSw = language === 'sw';

  const prices = {
    weekly: { USD: '$9.99', TZS: 'TSh 25,000' },
    monthly: { USD: '$24.99', TZS: 'TSh 65,000' },
    lifetime: { USD: '$99.99', TZS: 'TSh 250,000' },
  };

  const handleInitiatePayment = () => {
    setIsProcessing(true);
    setVerificationStep('push_sent');

    // Simulate real gateway USSD push verification
    setTimeout(() => {
      setVerificationStep('verified');
      setIsProcessing(false);
      onUpgradeToVip(`${selectedPlan.toUpperCase()} via ${paymentMethod.toUpperCase()}`);
      setTimeout(() => {
        setVerificationStep('idle');
        onClose();
      }, 1800);
    }, 2200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-2xl bg-gradient-to-b from-[#0f1422] to-[#070911] border border-amber-500/40 rounded-2xl shadow-[0_0_60px_rgba(245,158,11,0.2)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 pt-6 pb-4 border-b border-amber-500/20 text-center">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/60 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="inline-flex items-center gap-1.5 bg-amber-400/20 text-amber-300 border border-amber-400/40 px-3 py-1 rounded-full text-xs font-mono font-bold mb-3 shadow-[0_0_15px_rgba(250,204,21,0.3)]">
            <Crown className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            {isSw ? 'KLABU YA VIP SMART BET HUB' : 'SMART BET HUB VIP CLUB'}
          </div>

          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            {isSw ? 'Jiunge na Utabiri wa VIP & Banker' : 'Unlock High-Yield Banker Predictions'}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1.5 max-w-lg mx-auto">
            {isSw 
              ? 'Pata utabiri wa uhakika wa zaidi ya 80% ushindi kila siku, pamoja na malipo salama ya Mitandao ya Simu Tanzania (M-Pesa, Tigo Pesa, Airtel Money).'
              : 'Join elite sports quantitative bettors with access to verified +80% win-rate daily banker picks and Tanzania Mobile Money integration.'}
          </p>

          {/* Currency Toggle */}
          <div className="inline-flex items-center bg-[#070912] border border-slate-700 p-0.5 rounded-lg mt-3 text-xs">
            <button
              onClick={() => setCurrency('TZS')}
              className={`px-3 py-1 rounded-md font-bold transition-all ${
                currency === 'TZS' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              TSh (Tanzania Shillings)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-3 py-1 rounded-md font-bold transition-all ${
                currency === 'USD' ? 'bg-amber-400 text-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              USD ($)
            </button>
          </div>
        </div>

        {/* Verification Status Banner */}
        {verificationStep === 'push_sent' && (
          <div className="mx-6 mt-4 p-3.5 bg-cyan-500/20 border border-cyan-500/40 rounded-xl text-cyan-300 text-xs flex items-center justify-between gap-2">
            <div className="flex items-center gap-2 font-bold">
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-400" />
              <span>
                {isSw ? 'Tafadhali thibitisha ombi la malipo (USSD PIN) kwenye simu yako...' : 'USSD push prompt sent! Confirm PIN on your mobile device...'}
              </span>
            </div>
            <span className="font-mono text-[10px] bg-cyan-950 px-2 py-0.5 rounded border border-cyan-500/30">
              PENDING PIN
            </span>
          </div>
        )}

        {verificationStep === 'verified' && (
          <div className="mx-6 mt-4 p-3.5 bg-emerald-500/20 border border-emerald-500/40 rounded-xl text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-bounce">
            <Check className="w-4 h-4 stroke-[3]" />
            <span>
              {isSw ? 'Malipo Yamethibitishwa! Akaunti yako ya VIP imewezeshwa kikamilifu.' : 'Transaction verified! VIP Access unlocked successfully.'}
            </span>
          </div>
        )}

        {/* Plans Grid */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Weekly */}
            <div
              onClick={() => setSelectedPlan('weekly')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPlan === 'weekly'
                  ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-[#090c16] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-slate-400 uppercase font-mono">
                {isSw ? 'Kifurushi cha Wiki' : 'Weekly Pass'}
              </div>
              <div className="mt-2 text-xl font-black font-mono text-white">
                {prices.weekly[currency]}
              </div>
              <div className="text-[11px] text-slate-400">
                {isSw ? 'Siku 7 za VIP' : '7 Days Full VIP'}
              </div>
            </div>

            {/* Monthly (Popular) */}
            <div
              onClick={() => setSelectedPlan('monthly')}
              className={`p-4 rounded-xl border cursor-pointer transition-all relative ${
                selectedPlan === 'monthly'
                  ? 'bg-gradient-to-b from-amber-500/20 to-yellow-600/10 border-amber-400 shadow-[0_0_25px_rgba(245,158,11,0.3)]'
                  : 'bg-[#090c16] border-slate-800 hover:border-slate-700'
              }`}
            >
              <span className="absolute -top-2.5 right-3 bg-gradient-to-r from-amber-400 to-yellow-500 text-black font-black text-[9px] px-2 py-0.5 rounded-full shadow">
                {isSw ? 'INAYOPENDELEWA' : 'MOST POPULAR'}
              </span>
              <div className="text-xs font-bold text-amber-300 uppercase font-mono">
                {isSw ? 'Kifurushi cha Mwezi' : 'Monthly Pro'}
              </div>
              <div className="mt-2 text-xl font-black font-mono text-white">
                {prices.monthly[currency]}
              </div>
              <div className="text-[11px] text-slate-400">
                {isSw ? 'Siku 30 za VIP + Daily Acca' : '30 Days + Daily Super Acca'}
              </div>
            </div>

            {/* Lifetime */}
            <div
              onClick={() => setSelectedPlan('lifetime')}
              className={`p-4 rounded-xl border cursor-pointer transition-all ${
                selectedPlan === 'lifetime'
                  ? 'bg-amber-500/10 border-amber-400 shadow-[0_0_20px_rgba(245,158,11,0.2)]'
                  : 'bg-[#090c16] border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="text-xs font-bold text-slate-400 uppercase font-mono">
                {isSw ? 'Kifurushi cha Kudumu' : 'Lifetime Access'}
              </div>
              <div className="mt-2 text-xl font-black font-mono text-white">
                {prices.lifetime[currency]}
              </div>
              <div className="text-[11px] text-emerald-400 font-bold">
                {isSw ? 'Bila Malipo Tena' : 'Permanent Unlimited'}
              </div>
            </div>
          </div>

          {/* Tanzania Payment Methods (M-Pesa, Tigo, Airtel, Card) */}
          <div className="p-4 rounded-xl bg-[#090c16] border border-slate-800 space-y-3">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-wider block font-mono">
              {isSw ? 'CHAGUA NJIA YA MALIPO (TANZANIA MOBILE MONEY & CARD)' : 'APPROVED TANZANIA PAYMENT METHODS'}
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setPaymentMethod('mpesa')}
                className={`p-2.5 rounded-lg border font-bold flex flex-col items-center gap-1 transition-all ${
                  paymentMethod === 'mpesa'
                    ? 'bg-red-500/20 border-red-500 text-white shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                    : 'bg-[#060810] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4 text-red-400" />
                <span>M-PESA (Vodacom)</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('tigopesa')}
                className={`p-2.5 rounded-lg border font-bold flex flex-col items-center gap-1 transition-all ${
                  paymentMethod === 'tigopesa'
                    ? 'bg-blue-500/20 border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.3)]'
                    : 'bg-[#060810] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4 text-blue-400" />
                <span>TIGO PESA</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('airtel')}
                className={`p-2.5 rounded-lg border font-bold flex flex-col items-center gap-1 transition-all ${
                  paymentMethod === 'airtel'
                    ? 'bg-rose-500/20 border-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.3)]'
                    : 'bg-[#060810] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-4 h-4 text-rose-400" />
                <span>AIRTEL MONEY</span>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-2.5 rounded-lg border font-bold flex flex-col items-center gap-1 transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-cyan-500/20 border-cyan-500 text-white shadow-[0_0_12px_rgba(0,229,255,0.3)]'
                    : 'bg-[#060810] border-slate-800 text-slate-400 hover:text-white'
                }`}
              >
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>CARD / SELCOM</span>
              </button>
            </div>

            {/* Mobile Number Input */}
            {paymentMethod !== 'card' ? (
              <div className="pt-2">
                <label className="text-[11px] font-bold text-slate-400 block mb-1">
                  {isSw ? 'Nambari ya Simu ya Malipo (Mfano: 0754...)' : 'Tanzania Mobile Money Phone Number:'}
                </label>
                <input
                  type="text"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-3 py-2 bg-[#060810] border border-slate-700 rounded-lg text-white font-mono text-xs outline-none focus:border-amber-400"
                  placeholder="0754123456"
                />
              </div>
            ) : (
              <div className="pt-2 text-xs text-slate-400">
                Processed securely via Selcom / Visa / Mastercard 3D-Secure payment gateway.
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#090c16] border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="text-slate-400 text-xs">
            {currentUser.isVip ? (
              <span className="text-emerald-400 font-bold font-mono">✓ VIP ACTIVE</span>
            ) : (
              <span>Amount: <strong className="text-white font-mono">{prices[selectedPlan][currency]}</strong></span>
            )}
          </div>

          <button
            onClick={handleInitiatePayment}
            disabled={isProcessing}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-amber-400 to-yellow-500 hover:from-amber-300 hover:to-yellow-400 text-black font-black text-xs shadow-[0_0_20px_rgba(250,204,21,0.5)] transition-all flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <Crown className="w-4 h-4 fill-black" />
            <span>
              {isProcessing 
                ? (isSw ? 'Inatuma Ombi la USSD...' : 'Processing Payment...') 
                : (isSw ? `Lipia Sasa (${prices[selectedPlan][currency]})` : `Pay with ${paymentMethod.toUpperCase()}`)}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
