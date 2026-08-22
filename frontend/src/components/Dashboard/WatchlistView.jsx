import React from 'react';
import { 
  Bookmark, 
  ShieldCheck, 
  Trash2, 
  ExternalLink, 
  Building2, 
  FileText,
  Plus
} from 'lucide-react';

export default function WatchlistView({ onOpenScanner }) {
  const savedItems = [
    {
      id: 1,
      type: 'Job Passport',
      title: 'Senior Frontend Architect',
      company: 'Stripe, Inc.',
      domain: 'stripe.com',
      trustScore: 98,
      status: 'Verified High Trust',
      savedDate: '2026-02-18'
    },
    {
      id: 2,
      type: 'Domain Watch',
      title: 'Cloudflare Career Requisition',
      company: 'Cloudflare, Inc.',
      domain: 'cloudflare.com',
      trustScore: 100,
      status: 'Active Employer',
      savedDate: '2026-02-15'
    }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono">
            <Bookmark className="w-3.5 h-3.5 text-cyan-400" />
            <span>Saved Passports & Watchlist</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Saved / Watchlist</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Keep track of verified job passports and monitored employer domains.
          </p>
        </div>

        <button
          onClick={onOpenScanner}
          className="py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs flex items-center gap-2 shadow-md transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Save New Job Offer</span>
        </button>
      </div>

      {/* Saved Items List */}
      <div className="space-y-3">
        {savedItems.map((item) => (
          <div 
            key={item.id}
            className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/90 hover:border-cyan-500/30 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-bold text-white">{item.title}</h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-800 text-slate-300">
                    {item.type}
                  </span>
                </div>
                <p className="text-xs text-slate-400 font-mono mt-0.5">
                  {item.company} • <span className="text-cyan-400">{item.domain}</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono font-bold text-emerald-400 px-2.5 py-1 rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                {item.trustScore}/100 Trust
              </span>
              <span className="text-[11px] text-slate-500 font-mono hidden sm:inline">
                Saved {item.savedDate}
              </span>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
