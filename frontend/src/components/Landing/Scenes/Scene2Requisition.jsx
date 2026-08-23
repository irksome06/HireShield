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

      {/* Main Header Area (Unobscured view to 3D Laptop Screen below) */}
      <div className="max-w-6xl mx-auto w-full space-y-4 z-20 pt-4">
        
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
              Inspect offers across LinkedIn, Unstop, Internshala, or direct email rendered inside the live terminal.
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
