import React, { useState, useEffect, useRef } from 'react';
import { 
  Shield, 
  ArrowRight, 
  Sparkles, 
  ChevronDown
} from 'lucide-react';

import Scene1Hero from './Scenes/Scene1Hero';
import Scene2Requisition from './Scenes/Scene2Requisition';
import Scene3ThreatEngine from './Scenes/Scene3ThreatEngine';
import Scene4Passport from './Scenes/Scene4Passport';
import Scene5AccessGateway from './Scenes/Scene5AccessGateway';
import AuthModal from './AuthModal';

export default function ScrollLandingPage() {
  const [activeScene, setActiveScene] = useState(0); // 0, 1, 2, 3, 4
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('signin');
  const [glowTrigger, setGlowTrigger] = useState(false);
  const prevSceneRef = useRef(0);
  
  const scrollContainerRef = useRef(null);
  const sceneRefs = [useRef(null), useRef(null), useRef(null), useRef(null), useRef(null)];

  // Track active scene via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: scrollContainerRef.current,
      threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = sceneRefs.findIndex(ref => ref.current === entry.target);
          if (index !== -1 && index !== activeScene) {
            setActiveScene(index);
          }
        }
      });
    }, observerOptions);

    sceneRefs.forEach(ref => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => observer.disconnect();
  }, [activeScene]);

  // Trigger soft fluid ambient glow flare on section change
  useEffect(() => {
    if (prevSceneRef.current !== activeScene) {
      setGlowTrigger(true);
      const timer = setTimeout(() => setGlowTrigger(false), 800);
      prevSceneRef.current = activeScene;
      return () => clearTimeout(timer);
    }
  }, [activeScene]);

  const scrollToScene = (index) => {
    const el = sceneRefs[index]?.current;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openAuth = (mode = 'signin') => {
    setAuthModalMode(mode);
    setAuthModalOpen(true);
  };

  const sceneTooltips = [
    '01 • Cyber Station',
    '02 • Requisition Sandbox',
    '03 • Threat Engine',
    '04 • Job Trust Passport',
    '05 • Console Access'
  ];

  return (
    <div 
      ref={scrollContainerRef}
      className="relative w-full h-screen overflow-y-auto scroll-smooth snap-y snap-mandatory bg-[#07090e] text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200 font-sans"
    >
      {/* ---------------------------------------------------- */}
      {/* FLUID AMBIENT GLOW & FLOATING PARTICLE FLARES         */}
      {/* ---------------------------------------------------- */}
      {glowTrigger && (
        <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden flex items-center justify-center animate-in fade-in duration-500">
          {/* Soft Radial Ambient Aura Bloom */}
          <div className="w-[500px] h-[500px] rounded-full bg-cyan-500/10 blur-[100px] animate-pulse-glow" />
          
          {/* Floating Cyber Micro-Particle Flares */}
          <div className="absolute top-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-cyan-400/80 blur-[2px] shadow-[0_0_12px_rgba(6,182,212,0.8)] animate-spark-float" />
          <div className="absolute top-2/3 right-1/4 w-2 h-2 rounded-full bg-indigo-400/80 blur-[2px] shadow-[0_0_10px_rgba(99,102,241,0.8)] animate-spark-float" style={{ animationDelay: '0.15s' }} />
          <div className="absolute top-1/2 left-2/3 w-2.5 h-2.5 rounded-full bg-emerald-400/80 blur-[2px] shadow-[0_0_12px_rgba(16,185,129,0.8)] animate-spark-float" style={{ animationDelay: '0.2s' }} />
        </div>
      )}

      {/* Top Fixed Floating Navigation */}
      <header className="fixed top-0 left-0 right-0 z-40 px-6 py-4 backdrop-blur-xl bg-[#07090e]/85 border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          
          {/* Brand */}
          <div 
            onClick={() => scrollToScene(0)}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[1.5px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-all">
              <div className="w-full h-full bg-[#0b101d] rounded-[14px] flex items-center justify-center">
                <Shield className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-black tracking-tight text-white">Hire<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">Shield</span></span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Recruitment Threat Intelligence</p>
            </div>
          </div>

          {/* Nav CTAs */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => openAuth('signin')}
              className="text-xs font-semibold px-4 py-2 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700 transition-all cursor-pointer"
            >
              Sign In
            </button>
            <button
              onClick={() => openAuth('signup')}
              className="text-xs font-bold px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white shadow-md shadow-cyan-500/25 transition-all active:scale-95 cursor-pointer flex items-center gap-1.5"
            >
              <span>Create Account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* MINIMALIST FLOATING GLOWING DOTS (RIGHT SIDE)       */}
      {/* ---------------------------------------------------- */}
      <nav className="fixed right-6 sm:right-8 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center gap-3.5 py-3 select-none">
        {[0, 1, 2, 3, 4].map((idx) => {
          const isActive = activeScene === idx;
          const isPassed = activeScene > idx;

          return (
            <button
              key={idx}
              onClick={() => scrollToScene(idx)}
              className="group relative flex items-center justify-center p-1.5 focus:outline-none cursor-pointer"
              title={sceneTooltips[idx]}
            >
              {/* Tooltip on Hover */}
              <div className="absolute right-8 px-2.5 py-1 rounded-xl bg-slate-900/95 border border-slate-700 text-[10px] font-mono text-cyan-300 whitespace-nowrap shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-md">
                {sceneTooltips[idx]}
              </div>

              {/* Dynamic Glowing Dot */}
              <div 
                className={`rounded-full transition-all duration-300 ${
                  isActive 
                    ? 'w-3 h-3 bg-cyan-400 shadow-[0_0_15px_rgba(6,182,212,1)] ring-4 ring-cyan-500/20 scale-125' 
                    : isPassed
                    ? 'w-2 h-2 bg-cyan-500/70 hover:scale-150 hover:bg-cyan-300'
                    : 'w-2 h-2 bg-slate-700 hover:scale-150 hover:bg-slate-400'
                }`}
              />
            </button>
          );
        })}
      </nav>

      {/* ---------------------------------------------------- */}
      {/* SCENE 01: Cyber Defense Station                       */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={sceneRefs[0]} 
        className="w-full min-h-screen snap-start relative flex flex-col transition-all duration-700"
      >
        <Scene1Hero 
          onOpenAuth={openAuth}
          onScrollNext={() => scrollToScene(1)}
        />
      </section>

      {/* ---------------------------------------------------- */}
      {/* SCENE 02: Incoming Job Requisition Chamber            */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={sceneRefs[1]} 
        className="w-full min-h-screen snap-start relative flex flex-col transition-all duration-700"
      >
        <Scene2Requisition 
          onOpenAuth={openAuth}
          onScrollNext={() => scrollToScene(2)}
          onScrollPrev={() => scrollToScene(0)}
        />
      </section>

      {/* ---------------------------------------------------- */}
      {/* SCENE 03: Autonomous Threat Detection Matrix          */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={sceneRefs[2]} 
        className="w-full min-h-screen snap-start relative flex flex-col transition-all duration-700"
      >
        <Scene3ThreatEngine 
          onOpenAuth={openAuth}
          onScrollNext={() => scrollToScene(3)}
          onScrollPrev={() => scrollToScene(1)}
        />
      </section>

      {/* ---------------------------------------------------- */}
      {/* SCENE 04: Cryptographic Job Trust Passport™          */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={sceneRefs[3]} 
        className="w-full min-h-screen snap-start relative flex flex-col transition-all duration-700"
      >
        <Scene4Passport 
          onOpenAuth={openAuth}
          onScrollNext={() => scrollToScene(4)}
          onScrollPrev={() => scrollToScene(2)}
        />
      </section>

      {/* ---------------------------------------------------- */}
      {/* SCENE 05: Direct Access & Authentication Gateway      */}
      {/* ---------------------------------------------------- */}
      <section 
        ref={sceneRefs[4]} 
        className="w-full min-h-screen snap-start relative flex flex-col transition-all duration-700"
      >
        <Scene5AccessGateway 
          onScrollPrev={() => scrollToScene(3)}
          onScrollTop={() => scrollToScene(0)}
        />
      </section>

      {/* Global Auth Modal */}
      <AuthModal 
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
        initialMode={authModalMode}
      />

    </div>
  );
}
