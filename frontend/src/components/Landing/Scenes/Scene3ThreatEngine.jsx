import React from 'react';
import { 
  ShieldAlert, 
  AlertTriangle, 
  Search, 
  XCircle, 
  Zap, 
  Activity, 
  ArrowRight, 
  ChevronDown,
  Lock,
  Cpu
} from 'lucide-react';

export default function Scene3ThreatEngine({ onOpenAuth, onScrollNext, onScrollPrev }) {
  const redFlags = [
    {
      id: 1,
      title: 'Upfront Equipment Check & Wire Deposit',
      penalty: '-40 PTS',
      severity: 'Critical Scam Vector',
      desc: 'Candidate sent a fraudulent $3,400 PDF check and instructed to wire $450 back for "pre-approved home hardware supplier".'
    },
    {
      id: 2,
      title: 'Off-Platform Telegram / WhatsApp Redirection',
      penalty: '-25 PTS',
      severity: 'High Anonymity Risk',
      desc: 'Recruiter refuses video screening on Zoom or Teams and insists on text-only Telegram chat handle.'
    },
    {
      id: 3,
      title: 'Unindexed Ephemeral .TOP Phishing Domain',
      penalty: '-25 PTS',
      severity: 'WHOIS Telemetry Failure',
      desc: 'Recruiter domain registered 3 days ago through privacy guard; unindexed in official corporate MX records.'
    }
  ];

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden select-none bg-[#0e070c]">
      
      {/* Ambient Red/Rose Threat Glow */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/3 left-1/3 w-[550px] h-[550px] bg-rose-500/10 rounded-full blur-3xl pointer-events-none animate-pulse-glow" />

      {/* Main Header Area (Unobscured view to 3D Laptop Screen below) */}
      <div className="max-w-6xl mx-auto w-full space-y-3 z-20">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-300 text-xs font-mono">
              <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />
              <span>STAGE 03 • AUTONOMOUS THREAT ISOLATION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Scam Signals & Penalty Engine
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Deterministic rule execution detects advance fee fraud, domain spoofing, and anonymous recruitment channels directly on the live terminal.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-rose-950/60 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping" />
            <span>4,378 Scams Blocked This Month</span>
          </div>
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between text-xs text-slate-500 font-mono z-10 pt-6 border-t border-slate-900">
        <button
          onClick={onScrollPrev}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to Requisitions
        </button>

        <button
          onClick={onScrollNext}
          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer group"
        >
          <span>Scroll into Job Trust Passport™</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
