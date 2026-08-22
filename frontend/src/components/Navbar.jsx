import React from 'react';
import { ShieldCheck, History, Search, Terminal, Server, WifiOff } from 'lucide-react';

export const Navbar = ({ 
  activeTab = 'scanner', 
  onSelectTab, 
  historyCount = 3, 
  backendStatus = "connected" 
}) => {
  const isOnline = backendStatus === "connected";

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-[#0a0e17]/90 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <button 
          type="button" 
          onClick={() => onSelectTab('scanner')} 
          className="flex items-center space-x-3 group cursor-pointer text-left"
        >
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
        </button>

        {/* Primary Navigation Tabs */}
        <div className="flex items-center gap-2">
          
          <button
            type="button"
            onClick={() => onSelectTab('scanner')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'scanner'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Check a Job</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectTab('history')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
              activeTab === 'history'
                ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Scan History</span>
            {historyCount > 0 && (
              <span className="ml-0.5 px-1.5 py-0.2 rounded-full bg-cyan-500/30 text-cyan-200 text-[10px] font-mono font-bold">
                {historyCount}
              </span>
            )}
          </button>

          {/* Engine Status Dot */}
          <div className="hidden lg:flex items-center gap-1.5 ml-2 px-2.5 py-1 rounded-lg bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
            <span>{isOnline ? 'Live DB' : 'Local'}</span>
          </div>

        </div>

      </div>
    </header>
  );
};
