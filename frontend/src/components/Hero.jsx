import React from 'react';
import { ShieldCheck, CheckCircle2, AlertTriangle, Sparkles, ArrowDown } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative pt-6 pb-4 sm:pt-10 sm:pb-6 text-center">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[550px] h-[220px] bg-gradient-to-b from-cyan-500/15 via-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-3xl mx-auto px-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs text-cyan-300 mb-4 cyber-glow font-medium">
          <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
          <span>Free AI Job Scam Detector</span>
          <span className="w-1 h-1 rounded-full bg-cyan-400"></span>
          <span className="text-slate-300">Stay Safe While Job Hunting</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Is That Job Offer Real <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-300 via-teal-200 to-blue-400 bg-clip-text text-transparent">
            or a Dangerous Scam?
          </span>
        </h1>

        <p className="mt-3.5 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Paste any job message, recruiter email, website link, or screenshot. We’ll instantly scan for fake upfront fees, spoofed websites, and stolen recruiter identities.
        </p>

        {/* Feature Benefits */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 text-xs text-slate-300">
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Upfront Fee Detection</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recruiter Email Verification</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Website Safety Check</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-slate-900/80 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Job Safety Certificate</span>
          </div>
        </div>
      </div>
    </div>
  );
};
