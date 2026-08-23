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
    <div className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden select-none bg-[#071318]">
      
      {/* Ambient Emerald/Cyan Security Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 right-1/3 w-[550px] h-[550px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Header Area (Unobscured view to 3D Laptop Screen below) */}
      <div className="max-w-5xl mx-auto w-full space-y-3 z-20">
        
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
            A tamper-proof, explainable digital safety credential rendered and signed live on the terminal.
          </p>
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
