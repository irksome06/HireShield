import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ArrowRight, 
  Sparkles, 
  ChevronDown, 
  Lock, 
  Globe, 
  Zap,
  CheckCircle2
} from 'lucide-react';

export default function Scene1Hero({ onOpenAuth, onScrollNext }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 pt-28 pb-12 overflow-hidden select-none">
      
      {/* Background Cyber Mesh */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Content Area */}
      <div className="max-w-5xl mx-auto w-full my-auto text-center space-y-8 z-10">
        
        {/* Top Intelligence Pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono shadow-lg shadow-cyan-950/40 backdrop-blur-md animate-in fade-in duration-500">
          <Sparkles className="w-4 h-4 text-cyan-400" />
          <span>Autonomous Recruitment Threat Defense Network</span>
        </div>

        {/* Cinematic Headline */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-[1.1]">
            Never fall for a <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-indigo-400">
              fake job offer again.
            </span>
          </h1>

          <p className="text-sm sm:text-lg text-slate-300 max-w-2xl mx-auto font-normal leading-relaxed">
            Deterministic recruiter identity verification, corporate domain MX authentication, and cryptographic <span className="text-white font-semibold">Job Trust Passports™</span>.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => onOpenAuth('signup')}
            className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/25 flex items-center gap-2.5 transition-all transform active:scale-95 cursor-pointer"
          >
            <span>Get Protected Free</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onOpenAuth('signin')}
            className="py-3.5 px-6 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 text-xs sm:text-sm font-semibold backdrop-blur-md transition-all cursor-pointer flex items-center gap-2"
          >
            <span>Sign In with Google</span>
          </button>
        </div>

        {/* Trust Badges Bar */}
        <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>140+ Threat Rules</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>Real-Time WHOIS Telemetry</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-indigo-400" />
            <span>Zero False Positives</span>
          </div>
        </div>

      </div>

      {/* Bottom Scroll Prompt */}
      <div className="max-w-5xl mx-auto w-full flex items-center justify-between text-xs text-slate-500 font-mono z-10 pt-6 border-t border-slate-900">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>CYBER STATION: ONLINE</span>
        </div>

        <button
          onClick={onScrollNext}
          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer group"
        >
          <span>Scroll down to explore pipeline</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
