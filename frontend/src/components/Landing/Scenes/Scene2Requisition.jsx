import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Building2, 
  CheckCircle2, 
  Globe, 
  Layers, 
  DollarSign, 
  ArrowRight, 
  ChevronDown, 
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export default function Scene2Requisition({ onOpenAuth, onScrollNext, onScrollPrev }) {
  const [activePlatform, setActivePlatform] = useState('All');

  const offers = [
    {
      id: 1,
      role: 'Staff Software Architect',
      company: 'Stripe, Inc.',
      salary: '$195,000 - $220,000 /yr',
      recruiter: 'david.miller@stripe.com',
      domain: 'stripe.com',
      platform: 'LinkedIn Verified',
      status: 'MX Authenticated',
      trustScore: 100
    },
    {
      id: 2,
      role: 'Lead Backend Engineer (Go/Rust)',
      company: 'Razorpay Software',
      salary: '₹38,00,000 - ₹50,00,000 /yr',
      recruiter: 'careers@razorpay.com',
      domain: 'razorpay.com',
      platform: 'Unstop / Campus',
      status: 'MX Authenticated',
      trustScore: 100
    },
    {
      id: 3,
      role: 'Product Designer (Figma/Design Systems)',
      company: 'Canva Visuals',
      salary: '$140,000 - $165,000 /yr',
      recruiter: 'talent@canva.com',
      domain: 'canva.com',
      platform: 'Internshala & Direct',
      status: 'Verified High Trust',
      trustScore: 99
    }
  ];

  const platforms = ['All', 'LinkedIn Verified', 'Unstop / Campus', 'Internshala & Direct'];

  const filteredOffers = activePlatform === 'All' 
    ? offers 
    : offers.filter(o => o.platform === activePlatform);

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 pt-28 pb-12 overflow-hidden select-none bg-[#070b16]">
      
      {/* Ambient Grid & Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content */}
      <div className="max-w-6xl mx-auto w-full space-y-7 z-10 my-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
              <Layers className="w-3.5 h-3.5 text-indigo-400" />
              <span>STAGE 02 • MULTI-CHANNEL INGESTION</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Incoming Job Requisitions Sandbox
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Inspect offers across LinkedIn, Unstop, Internshala, or direct email before interacting with recruiters.
            </p>
          </div>

          {/* Platform Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {platforms.map((p) => (
              <button
                key={p}
                onClick={() => setActivePlatform(p)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activePlatform === p
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                    : 'bg-slate-900/80 text-slate-400 hover:text-slate-200 border border-slate-800'
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Columns Job Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {filteredOffers.map((offer) => (
            <div 
              key={offer.id}
              className="p-5 rounded-3xl bg-slate-900/85 border border-slate-800/90 hover:border-cyan-500/40 transition-all backdrop-blur-xl shadow-xl shadow-black/40 flex flex-col justify-between group"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                    {offer.platform}
                  </span>
                  <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                    {offer.trustScore}/100
                  </span>
                </div>

                <div>
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                    {offer.role}
                  </h3>
                  <p className="text-xs text-slate-400 font-mono mt-0.5">{offer.company}</p>
                </div>

                <div className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Compensation:</span>
                    <span className="text-emerald-400 font-bold">{offer.salary}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Recruiter:</span>
                    <span className="text-slate-300 truncate max-w-[140px]">{offer.recruiter}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Domain MX:</span>
                    <span className="text-cyan-400 font-semibold">{offer.domain}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-800/80 flex items-center justify-between">
                <span className="text-[11px] text-emerald-400 font-mono flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {offer.status}
                </span>

                <button
                  onClick={() => onOpenAuth('signup')}
                  className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
                >
                  <span>Verify Offer</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Navigation Footer */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between text-xs text-slate-500 font-mono z-10 pt-6 border-t border-slate-900">
        <button
          onClick={onScrollPrev}
          className="text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          ← Back to Overview
        </button>

        <button
          onClick={onScrollNext}
          className="flex items-center gap-1.5 text-cyan-400 hover:text-cyan-300 font-semibold transition-colors cursor-pointer group"
        >
          <span>Scroll into Threat Detection Engine</span>
          <ChevronDown className="w-4 h-4 animate-bounce group-hover:translate-y-0.5 transition-transform" />
        </button>
      </div>

    </div>
  );
}
