import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  Sparkles, 
  Activity, 
  Cpu, 
  Terminal, 
  Radio, 
  Lock 
} from 'lucide-react';

export default function SceneLaptop3D({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  // If we are at the final console stage (Stage 5 / scrollProgress >= 0.78), completely hide the laptop
  if (scrollProgress >= 0.78) {
    return null;
  }

  // Stage determination based on scroll progress (0.0 to 0.78)
  // Stage 0 (0.00 - 0.20): Defense OS Boot & Clamshell Opening
  // Stage 1 (0.20 - 0.40): Signal Ingestion & Waveform Pulse
  // Stage 2 (0.40 - 0.60): Multi-Vector Laser Scanning Sweep
  // Stage 3 (0.60 - 0.78): Threat Signal Isolation Pulse
  const stage = scrollProgress < 0.20 ? 0 
              : scrollProgress < 0.40 ? 1 
              : scrollProgress < 0.60 ? 2 
              : 3;

  // Clamshell Opening Angle: Opens smoothly from 48deg -> 118deg as user scrolls into the experience
  const hingeAngle = Math.min(118, 48 + scrollProgress * 150);

  // Smooth Gyroscopic Tilt responding to mouse
  const tiltX = (mousePos.y || 0) * 12;
  const tiltY = -(mousePos.x || 0) * 14;

  // Stage-specific 3D Camera / Perspective Transforms
  const getStageTransforms = () => {
    switch (stage) {
      case 0:
        return {
          rotX: 18 + tiltX * 0.7,
          rotY: -14 + tiltY * 0.7,
          rotZ: -2,
          scale: 0.96 + scrollProgress * 0.15,
          transY: 0,
          transZ: 0
        };
      case 1:
        return {
          rotX: 10 + tiltX * 0.8,
          rotY: 10 + tiltY * 0.8,
          rotZ: 1.5,
          scale: 1.04,
          transY: -8,
          transZ: 15
        };
      case 2:
        return {
          rotX: 4 + tiltX * 0.9,
          rotY: 0 + tiltY * 0.9,
          rotZ: 0,
          scale: 1.12,
          transY: -14,
          transZ: 30
        };
      case 3:
        return {
          rotX: 12 + tiltX * 0.8,
          rotY: -10 + tiltY * 0.8,
          rotZ: -1.5,
          scale: 1.06,
          transY: -6,
          transZ: 20
        };
      default:
        return { rotX: 14, rotY: 0, rotZ: 0, scale: 1, transY: 0, transZ: 0 };
    }
  };

  const transform = getStageTransforms();

  // Screen Sheen Highlight calculation based on mouse
  const sheenX = ((mousePos.x || 0) + 1) * 50;

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none transition-opacity duration-500" 
      style={{ perspective: '2200px' }}
    >
      
      {/* ----------------------------------------------------------------- */}
      {/* 1. AMBIENT HOLOGRAPHIC LIGHTING & ORBITAL GYROSCOPE RINGS         */}
      {/* ----------------------------------------------------------------- */}
      <div className="absolute w-[480px] h-[480px] rounded-full border border-cyan-500/20 animate-orbit pointer-events-none" />
      <div 
        className="absolute w-[620px] h-[620px] rounded-full border border-dashed border-indigo-500/20 animate-orbit pointer-events-none" 
        style={{ animationDirection: 'reverse', animationDuration: '40s' }} 
      />
      
      {/* Dynamic Aura Glow behind laptop */}
      <div 
        className={`absolute w-[420px] h-[420px] rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
          stage === 3 
            ? 'bg-rose-500/20 shadow-[0_0_120px_rgba(244,63,94,0.3)]' 
            : stage === 2
            ? 'bg-cyan-500/25 shadow-[0_0_120px_rgba(6,182,212,0.35)]'
            : stage === 1
            ? 'bg-indigo-600/20 shadow-[0_0_100px_rgba(99,102,241,0.25)]'
            : 'bg-blue-600/20 shadow-[0_0_100px_rgba(37,99,235,0.25)]'
        }`} 
      />

      {/* Floating 3D Cyber Particles */}
      <div className="absolute -top-16 left-1/4 w-2 h-2 rounded-full bg-cyan-400/70 blur-[1px] shadow-[0_0_10px_rgba(6,182,212,1)] animate-spark-float" />
      <div className="absolute -bottom-10 right-1/4 w-2.5 h-2.5 rounded-full bg-indigo-400/70 blur-[1px] shadow-[0_0_10px_rgba(99,102,241,1)] animate-spark-float" style={{ animationDelay: '0.3s' }} />

      {/* ----------------------------------------------------------------- */}
      {/* 2. 3D CENTRAL LAPTOP HERO RIG                                     */}
      {/* ----------------------------------------------------------------- */}
      <div 
        className="relative flex flex-col items-center justify-center transition-all duration-700 ease-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${transform.rotX}deg) rotateY(${transform.rotY}deg) rotateZ(${transform.rotZ}deg) scale(${transform.scale}) translateY(${transform.transY}px) translateZ(${transform.transZ}px)`
        }}
      >

        {/* --------------------------------------------------------------- */}
        {/* A. LAPTOP SCREEN DISPLAY LID (CLAMSHELL WITH HINGE ROTATION)    */}
        {/* --------------------------------------------------------------- */}
        <div 
          className="relative w-[340px] sm:w-[440px] lg:w-[480px] h-[220px] sm:h-[275px] lg:h-[295px] rounded-t-2xl bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 p-[3.5px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9)] border-t border-x border-slate-500/50 transition-all duration-700"
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'bottom center',
            transform: `rotateX(${118 - hingeAngle}deg)`
          }}
        >
          
          {/* Metallic Outer Chamfer Rim */}
          <div className="relative w-full h-full bg-[#050811] rounded-t-[13px] border border-slate-700/80 overflow-hidden flex flex-col justify-between shadow-2xl">
            
            {/* Specular Dynamic Glass Sheen Reflection */}
            <div 
              className="absolute inset-0 pointer-events-none z-40 opacity-25 mix-blend-screen transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.4) ${sheenX - 30}%, rgba(6,182,212,0.15) ${sheenX}%, transparent ${sheenX + 30}%)`
              }}
            />

            {/* Top Webcam Notch & Status LED */}
            <div className="relative z-30 w-full pt-1.5 px-4 flex items-center justify-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600" />
              <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                stage === 2 ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]' 
                : stage === 3 ? 'bg-rose-500 animate-ping shadow-[0_0_8px_rgba(244,63,94,1)]'
                : 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
              }`} />
            </div>

            {/* ----------------------------------------------------------- */}
            {/* B. CLEAN HOLOGRAPHIC CYBER DISPLAY SCREEN (NO CLUTTER TEXT) */}
            {/* ----------------------------------------------------------- */}
            <div className="relative z-20 flex-1 px-4 py-3 flex flex-col justify-between overflow-hidden">
              
              {/* STAGE 0: MINIMALIST ZERO-TRUST DEFENSE CORE */}
              {stage === 0 && (
                <div className="h-full flex flex-col items-center justify-center animate-in fade-in duration-500 space-y-3">
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/40 flex items-center justify-center cyber-glow animate-float-slow shadow-lg shadow-cyan-950/50">
                    <Shield className="w-8 h-8 text-cyan-400" />
                    <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-ping opacity-25" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-300/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>DEFENSE NETWORK STANDBY</span>
                  </div>
                </div>
              )}

              {/* STAGE 1: TELEMETRY SIGNAL INGESTION WAVEFORM */}
              {stage === 1 && (
                <div className="h-full flex flex-col items-center justify-center animate-in fade-in zoom-in-95 duration-500 space-y-3">
                  <div className="flex items-center gap-1.5">
                    {[...Array(16)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-1 bg-gradient-to-t from-indigo-500 to-cyan-400 rounded-full animate-pulse" 
                        style={{ 
                          height: `${14 + Math.sin(i * 0.8) * 18 + 12}px`,
                          animationDelay: `${i * 0.08}s` 
                        }} 
                      />
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-indigo-300">
                    <Activity className="w-3.5 h-3.5 text-indigo-400 animate-spin" />
                    <span>INGESTING INCOMING TELEMETRY</span>
                  </div>
                </div>
              )}

              {/* STAGE 2: MULTI-VECTOR LASER SCAN MATRIX */}
              {stage === 2 && (
                <div className="h-full flex flex-col items-center justify-center relative overflow-hidden animate-in fade-in duration-500">
                  {/* High-Intensity Laser Sweep Line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser-scan shadow-[0_0_15px_rgba(6,182,212,1)] z-30 pointer-events-none" />

                  {/* Cyber Grid Radar Nodes */}
                  <div className="grid grid-cols-6 gap-3.5 opacity-60 my-auto">
                    {[...Array(18)].map((_, i) => (
                      <div 
                        key={i} 
                        className="w-2.5 h-2.5 rounded-full border border-cyan-500/50 bg-cyan-500/20 animate-pulse" 
                        style={{ animationDelay: `${(i % 5) * 0.15}s` }} 
                      />
                    ))}
                  </div>

                  <div className="flex items-center gap-2 text-[10px] font-mono text-cyan-300 mt-2">
                    <Search className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                    <span>DEEP SCANNING 140+ VECTORS</span>
                  </div>
                </div>
              )}

              {/* STAGE 3: THREAT SIGNAL ISOLATION PULSE */}
              {stage === 3 && (
                <div className="h-full flex flex-col items-center justify-center animate-in fade-in duration-500 space-y-3">
                  <div className="relative w-16 h-16 rounded-2xl bg-rose-950/80 border border-rose-500/60 flex items-center justify-center shadow-lg shadow-rose-950/60 animate-bounce">
                    <ShieldAlert className="w-8 h-8 text-rose-400" />
                    <div className="absolute inset-0 rounded-2xl border border-rose-400/40 animate-ping opacity-30" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono text-rose-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                    <span>THREAT INTERCEPTED & BLOCKED</span>
                  </div>
                </div>
              )}

            </div>

            {/* Screen Bottom Bezel */}
            <div className="bg-slate-950/95 py-1 text-center border-t border-slate-800/80 flex items-center justify-center gap-1.5">
              <Shield className="w-2.5 h-2.5 text-cyan-400" />
              <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">HIRESHIELD</span>
            </div>

          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* C. LAPTOP KEYBOARD BASE DECK (METALLIC ANODIZED FINISH)         */}
        {/* --------------------------------------------------------------- */}
        <div 
          className="relative w-[380px] sm:w-[480px] lg:w-[520px] h-[170px] sm:h-[195px] lg:h-[210px] rounded-b-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-[#070b14] border-x-2 border-b-2 border-slate-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.95)] p-4 flex flex-col justify-between preserve-3d"
          style={{
            transform: 'rotateX(68deg) translateY(-28px)',
            transformOrigin: 'top center'
          }}
        >
          {/* Keyboard Deck Metallic Indentation */}
          <div className="w-full bg-[#070c18] rounded-xl p-2.5 border border-slate-700/70 shadow-inner">
            
            {/* Top Function Key Row with Status Power LED */}
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[...Array(11)].map((_, i) => (
                <div key={i} className="h-1.5 rounded-sm bg-slate-800/90 border border-slate-700/50 shadow-sm" />
              ))}
              <div className="h-1.5 rounded-sm bg-cyan-500/40 border border-cyan-400/60 shadow-[0_0_6px_rgba(6,182,212,0.8)]" />
            </div>

            {/* Number & QWERTY Key Rows */}
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-2 rounded bg-slate-850 border border-slate-700/60 shadow-sm hover:border-cyan-400/40 transition-colors" />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-2 rounded bg-slate-850 border border-slate-700/60 shadow-sm hover:border-cyan-400/40 transition-colors" />
              ))}
            </div>

            {/* Bottom Spacebar & Modifier Keys Row */}
            <div className="grid grid-cols-8 gap-1.5">
              <div className="col-span-2 h-2 rounded bg-slate-850 border border-slate-700/60" />
              <div className="col-span-4 h-2 rounded bg-gradient-to-r from-slate-800 via-cyan-950 to-slate-800 border border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
              <div className="col-span-2 h-2 rounded bg-slate-850 border border-slate-700/60" />
            </div>
          </div>

          {/* Frosted Glass Precision Trackpad */}
          <div className="w-28 sm:w-32 h-11 sm:h-13 mx-auto rounded-xl bg-slate-850/80 border border-slate-700/60 shadow-inner flex items-center justify-center">
            <div className="w-6 h-0.5 rounded-full bg-slate-700/60" />
          </div>

          {/* Side Thunderbolt USB-C Cyber Accents */}
          <div className="absolute left-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-60">
            <span className="w-1.5 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,1)]" />
            <span className="w-1.5 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,1)]" />
          </div>
          <div className="absolute right-1.5 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 opacity-60">
            <span className="w-1.5 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_4px_rgba(6,182,212,1)]" />
          </div>

        </div>

      </div>
    </div>
  );
}
