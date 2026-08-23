import React from 'react';
import { 
  Layers, 
  ChevronDown 
} from 'lucide-react';

export default function Scene2Requisition({ onOpenAuth, onScrollNext, onScrollPrev }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between p-6 sm:p-10 pt-16 sm:pt-20 pb-8 sm:pb-10 overflow-hidden select-none bg-[#070b16]">
      
      {/* Ambient Grid & Lighting */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Header Area (Unobscured view to 3D Laptop Screen below) */}
      <div className="max-w-6xl mx-auto w-full space-y-2 z-20">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-xs font-mono">
            <Layers className="w-3.5 h-3.5 text-indigo-400" />
            <span>STAGE 02 • MULTI-CHANNEL INGESTION</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Incoming Job Requisitions Sandbox
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Inspect offers across LinkedIn, Unstop, Internshala, or direct email rendered inside the live terminal.
          </p>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between text-xs text-slate-500 font-mono z-10 pt-4 border-t border-slate-900">
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
