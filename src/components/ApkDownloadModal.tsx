import React, { useState } from 'react';
import { 
  X, 
  Download, 
  Check, 
  Copy, 
  ShieldCheck, 
  Smartphone, 
  Sparkles, 
  AlertTriangle,
  ArrowRight,
  ExternalLink
} from 'lucide-react';

interface ApkDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ApkDownloadModal: React.FC<ApkDownloadModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [copied, setCopied] = useState(false);
  const downloadUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/download/smart-bet-hub-debug.apk` 
    : '/download/smart-bet-hub-debug.apk';

  if (!isOpen) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(downloadUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div 
        className="relative w-full max-w-xl bg-gradient-to-b from-[#0a121c] via-[#070b13] to-[#05080e] border border-cyan-500/40 rounded-2xl shadow-[0_0_60px_rgba(0,229,255,0.25)] overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-cyan-500/20 bg-[#0c1626]/60 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center text-black font-black shadow-[0_0_20px_rgba(16,185,129,0.5)]">
              <Smartphone className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-black text-white text-base sm:text-lg">
                  Download Android APK
                </h3>
                <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px] font-bold px-2 py-0.5 rounded-full">
                  DEBUG BUILD v1.0
                </span>
              </div>
              <p className="text-xs text-slate-300">
                Direct installable Android application package for SMART BET HUB
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white bg-slate-800/80 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 sm:p-6 space-y-5">
          
          {/* Dual Download Cards: Debug & Release */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* Debug APK */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#0e1626] to-[#080d16] border border-cyan-500/40 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-cyan-400 uppercase">
                    DEBUG BUILD (RECOMMENDED)
                  </span>
                  <span className="bg-cyan-500/20 text-cyan-300 font-mono text-[9px] px-1.5 py-0.2 rounded font-bold">
                    v1.0.0
                  </span>
                </div>
                <div className="font-extrabold text-white text-base mt-1">
                  app-debug.apk
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Path: <span className="text-slate-300 text-[10px]">app/build/outputs/apk/debug/</span>
                </div>
              </div>

              <a
                href="/download/app-debug.apk"
                download="app-debug.apk"
                className="w-full mt-3 py-2.5 px-3 rounded-lg bg-gradient-to-r from-emerald-400 to-cyan-500 hover:from-emerald-300 hover:to-cyan-400 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(0,229,255,0.4)] transition-all flex items-center justify-center gap-1.5 text-center"
              >
                <Download className="w-3.5 h-3.5 stroke-[3]" />
                <span>Download Debug APK</span>
              </a>
            </div>

            {/* Release APK */}
            <div className="p-4 rounded-xl bg-gradient-to-b from-[#0e1626] to-[#080d16] border border-slate-700 space-y-2 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase">
                    RELEASE BUILD (PROGUARD)
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-300 font-mono text-[9px] px-1.5 py-0.2 rounded font-bold">
                    v1.0.0
                  </span>
                </div>
                <div className="font-extrabold text-white text-base mt-1">
                  app-release.apk
                </div>
                <div className="text-[11px] text-slate-400 font-mono">
                  Path: <span className="text-slate-300 text-[10px]">app/build/outputs/apk/release/</span>
                </div>
              </div>

              <a
                href="/download/app-release.apk"
                download="app-release.apk"
                className="w-full mt-3 py-2.5 px-3 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-400 hover:to-cyan-400 text-black font-black text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(59,130,246,0.4)] transition-all flex items-center justify-center gap-1.5 text-center"
              >
                <Download className="w-3.5 h-3.5 stroke-[3]" />
                <span>Download Release APK</span>
              </a>
            </div>
          </div>

          {/* Copy Direct Link URL */}
          <div className="p-3.5 rounded-xl bg-[#080c16] border border-slate-800 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">DIRECT DOWNLOAD URL:</span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 text-cyan-400 hover:text-cyan-300 font-bold transition-colors"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-mono">COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span className="font-mono">COPY LINK</span>
                  </>
                )}
              </button>
            </div>
            <div className="p-2.5 rounded-lg bg-[#05070d] border border-slate-800 font-mono text-xs text-cyan-300 break-all select-all">
              {downloadUrl}
            </div>
          </div>

          {/* 4-Step Android Installation Guide */}
          <div className="p-4 rounded-xl bg-[#080c16] border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider font-mono">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>How to Install on Android</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#05070d] border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <span>Tap <strong>Download APK</strong> above to save file.</span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#05070d] border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <span>Open downloaded <strong>smart-bet-hub-debug.apk</strong>.</span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#05070d] border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <span>Allow <em>"Install unknown apps"</em> in Android Settings.</span>
              </div>

              <div className="flex items-start gap-2.5 p-2.5 rounded-lg bg-[#05070d] border border-slate-800/80">
                <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-400 font-mono font-bold text-xs flex items-center justify-center shrink-0">
                  4
                </span>
                <span>Tap <strong>Install</strong> to launch SMART BET HUB!</span>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="grid grid-cols-3 gap-2 text-center text-xs font-mono">
            <div className="p-2.5 rounded-lg bg-[#080b13] border border-slate-800">
              <span className="text-[10px] text-slate-500 block">TARGET OS</span>
              <span className="text-white font-bold">Android 8.0+</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#080b13] border border-slate-800">
              <span className="text-[10px] text-slate-500 block">ARCH</span>
              <span className="text-cyan-400 font-bold">Universal</span>
            </div>
            <div className="p-2.5 rounded-lg bg-[#080b13] border border-slate-800">
              <span className="text-[10px] text-slate-500 block">SECURITY</span>
              <span className="text-emerald-400 font-bold">Debug Signed</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#080b14] border-t border-slate-800 flex items-center justify-between text-xs">
          <span className="text-slate-400 font-mono">SMART BET HUB Mobile Client</span>
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-white font-bold"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
