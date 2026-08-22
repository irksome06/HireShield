import React from 'react';
import { ShieldAlert, SearchCheck, CheckCircle2, Cpu, Zap, FileCode } from 'lucide-react';

export const Hero = () => {
  return (
    <div className="relative py-8 md:py-12 overflow-hidden">
      {/* Background ambient radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[250px] bg-gradient-to-b from-cyan-500/10 via-blue-500/5 to-transparent blur-3xl pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-xs font-mono text-cyan-300 mb-6 cyber-glow">
          <Cpu className="w-3.5 h-3.5 text-cyan-400" />
          <span>Zero-Trust Recruitment Intelligence Platform</span>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
          <span className="text-slate-400">Anti-Scam Defense</span>
        </div>

        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          Verify Job Offers Before You <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-cyan-400 via-teal-300 to-blue-400 bg-clip-text text-transparent">
            Share Data or Send Funds
          </span>
        </h1>

        <p className="mt-4 text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
          HireShield extracts job entities with structured AI, runs deterministic verification across WHOIS, email MX & risk vectors, and outputs an explainable <span className="text-cyan-300 font-medium">0–100 Trust Score</span> with a tamper-evident Job Trust Passport.
        </p>

        {/* Feature Pill Tags */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 font-mono">
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Deterministic Scoring</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Domain Age & MX Verification</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
            <span>Transparent Evidence Trail</span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-slate-900/60 border border-slate-800">
            <CheckCircle2 className="w-3.5 h-3.5 text-purple-400" />
            <span>Job Trust Passport</span>
          </div>
        </div>
      </div>
    </div>
  );
};
