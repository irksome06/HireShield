import React from 'react';
import { ShieldCheck, History, Terminal, Server, WifiOff, Sparkles } from 'lucide-react';

export const Navbar = ({ onOpenHistory, historyCount = 3, backendStatus = "connected" }) => {
  const isOnline = backendStatus === "connected";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0a0e17]/90 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center space-x-3 group">
          <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500/20 to-blue-600/30 border border-cyan-500/40 text-cyan-400 cyber-glow group-hover:border-cyan-400 transition-colors">
            <ShieldCheck className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-cyan-500"></span>
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-xl tracking-tight bg-gradient-to-r from-slate-100 via-cyan-100 to-cyan-400 bg-clip-text text-transparent">
                HireShield
              </span>
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-cyan-950/80 text-cyan-300 border border-cyan-800/60 font-mono">
                Job Scam Scanner
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              Free & instant job offer safety checker
            </p>
          </div>
        </a>

        {/* Actions & Status */}
        <div className="flex items-center space-x-2.5 sm:space-x-3">
          {/* Server Status Pill */}
          <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900/90 border border-slate-800 text-xs text-slate-300 font-mono">
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Scam Engine:</span>
                <span className="text-emerald-400 font-semibold">Online</span>
              </>
            ) : (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                <span>Engine:</span>
                <span className="text-amber-400 font-semibold">Offline (Local Mode)</span>
              </>
            )}
          </div>

          {/* Saved Scans History Button */}
          <button
            type="button"
            onClick={onOpenHistory}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700 border border-slate-700/70 rounded-xl transition-all cursor-pointer hover:border-cyan-500/40"
          >
            <History className="w-3.5 h-3.5 text-cyan-400" />
            <span>Saved Scans</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-cyan-500/20 text-cyan-300 text-[11px] font-mono">
                {historyCount}
              </span>
            )}
          </button>

          <a
            href="#report-certificate"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-cyan-300 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-800/60 rounded-xl transition-colors"
          >
            <Terminal className="w-3.5 h-3.5 text-cyan-400" />
            <span>Safety Certificate</span>
          </a>
        </div>
      </div>
    </header>
  );
};
