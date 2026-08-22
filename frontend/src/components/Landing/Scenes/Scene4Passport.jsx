import React from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  Fingerprint, 
  ArrowRight, 
  ChevronDown, 
  Globe, 
  Mail, 
  FileCheck, 
  Sparkles,
  QrCode
} from 'lucide-react';

export default function Scene4Passport({ onOpenAuth, onScrollNext, onScrollPrev }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 pt-28 pb-12 overflow-hidden select-none bg-[#071318]">
      
      {/* Ambient Emerald/Cyan Security Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Content */}
      <div className="max-w-5xl mx-auto w-full space-y-7 z-10 my-auto">
        
        {/* Header */}
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-300 text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>STAGE 04 • CRYPTOGRAPHIC VERIFICATION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            The Job Trust Passport™
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            A tamper-proof, explainable digital safety credential issued for every scanned job opportunity.
          </p>
        </div>

        {/* The 3D Master Passport Certificate Card */}
        <div className="max-w-2xl mx-auto w-full rounded-3xl bg-slate-900/95 border border-emerald-500/50 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-emerald-950/60 cyber-glow-emerald relative overflow-hidden">
          
          {/* Top Hologram Strip */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-400 via-emerald-400 to-indigo-400" />

          {/* Certificate Header */}
          <div className="flex items-center justify-between pb-5 border-b border-emerald-900/60">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shadow-md">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-base font-black text-white tracking-tight">HIRESHIELD JOB TRUST PASSPORT™</h3>
                <p className="text-xs text-emerald-400 font-mono">OFFICIAL RECRUITMENT VERIFICATION RECORD</p>
              </div>
            </div>

            <div className="text-right">
              <span className="text-2xl font-black text-emerald-300 font-mono">100<span className="text-sm font-normal text-emerald-500">/100</span></span>
              <p className="text-[10px] text-emerald-400 font-mono font-bold">HIGH TRUST</p>
            </div>
          </div>

          {/* Core Verification Grid */}
          <div className="py-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div className="p-3 rounded-2xl bg-slate-950/70 border border-emerald-500/20 flex items-center justify-between">
              <span className="text-slate-400">Employer Status:</span>
              <span className="text-emerald-300 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                Verified Entity
              </span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-emerald-500/20 flex items-center justify-between">
              <span className="text-slate-400">Corporate MX:</span>
              <span className="text-white font-bold">Authenticated</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-emerald-500/20 flex items-center justify-between">
              <span className="text-slate-400">Upfront Fee Risk:</span>
              <span className="text-emerald-400 font-bold">0 Signals Found</span>
            </div>

            <div className="p-3 rounded-2xl bg-slate-950/70 border border-emerald-500/20 flex items-center justify-between">
              <span className="text-slate-400">Passport Hash:</span>
              <span className="text-cyan-400 font-bold">HSP-2026-A89F</span>
            </div>
          </div>

          {/* Certificate Footer Stamp */}
          <div className="pt-4 border-t border-emerald-900/60 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2 text-slate-400 font-mono text-[11px]">
              <Fingerprint className="w-4 h-4 text-emerald-400" />
              <span>Cryptographically signed by HireShield v2.0</span>
            </div>

            <button
              onClick={() => onOpenAuth('signup')}
              className="py-2 px-4 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>Get Your Job Passport</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>

      </div>

      {/* Navigation Footer */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs text-slate-500 font-mono z-10 pt-6 border-t border-slate-900">
        <button
          onClick={onScrollPrev}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to Threat Engine
        </button>

        <button
          onClick={onScrollNext}
          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer group"
        >
          <span>Scroll to Access Gateway</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
