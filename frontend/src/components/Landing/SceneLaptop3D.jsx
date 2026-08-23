import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  FileText, 
  Search, 
  AlertTriangle, 
  CheckCircle, 
  Sparkles, 
  Lock, 
  Globe, 
  Cpu,
  Fingerprint,
  QrCode,
  Terminal,
  Activity,
  Zap,
  Check,
  Radio,
  ExternalLink,
  Flame
} from 'lucide-react';

export default function SceneLaptop3D({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  // Stage determination based on scroll progress (0.0 to 1.0)
  // Stage 0 (0.00 - 0.20): Defense OS Boot & Clamshell Opening
  // Stage 1 (0.20 - 0.40): Incoming Requisition Ingestion
  // Stage 2 (0.40 - 0.65): Multi-Vector Laser Forensic Sweep
  // Stage 3 (0.65 - 0.85): Threat Alert & Scam Blocked
  // Stage 4 (0.85 - 1.00): Cryptographic Job Trust Passport
  const stage = scrollProgress < 0.20 ? 0 
              : scrollProgress < 0.40 ? 1 
              : scrollProgress < 0.65 ? 2 
              : scrollProgress < 0.85 ? 3 
              : 4;

  // Clamshell Opening Angle: Opens from 45deg -> 118deg as user scrolls into the experience
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
          rotY: 12 + tiltY * 0.8,
          rotZ: 1.5,
          scale: 1.04,
          transY: -8,
          transZ: 20
        };
      case 2:
        return {
          rotX: 4 + tiltX * 0.9,
          rotY: 0 + tiltY * 0.9,
          rotZ: 0,
          scale: 1.14,
          transY: -16,
          transZ: 40
        };
      case 3:
        return {
          rotX: 14 + tiltX * 0.8,
          rotY: -12 + tiltY * 0.8,
          rotZ: -1.5,
          scale: 1.06,
          transY: -6,
          transZ: 25
        };
      case 4:
        return {
          rotX: 6 + tiltX * 0.8,
          rotY: 4 + tiltY * 0.8,
          rotZ: 0.5,
          scale: 1.08,
          transY: -10,
          transZ: 30
        };
      default:
        return { rotX: 14, rotY: 0, rotZ: 0, scale: 1, transY: 0, transZ: 0 };
    }
  };

  const transform = getStageTransforms();

  // Screen Sheen Highlight calculation based on mouse
  const sheenX = ((mousePos.x || 0) + 1) * 50;
  const sheenY = ((mousePos.y || 0) + 1) * 50;

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none" style={{ perspective: '2200px' }}>
      
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
            : stage === 4 
            ? 'bg-emerald-500/20 shadow-[0_0_120px_rgba(16,185,129,0.3)]' 
            : stage === 2
            ? 'bg-cyan-500/25 shadow-[0_0_120px_rgba(6,182,212,0.35)]'
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

            {/* Top Webcam Notch & Dual Mic Array */}
            <div className="relative z-30 w-full pt-1.5 px-4 flex items-center justify-between">
              <div className="flex items-center gap-1 opacity-50">
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="w-1 h-1 rounded-full bg-slate-600" />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600" />
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  stage === 2 ? 'bg-cyan-400 animate-pulse shadow-[0_0_8px_rgba(6,182,212,1)]' 
                  : stage === 3 ? 'bg-rose-500 animate-ping shadow-[0_0_8px_rgba(244,63,94,1)]'
                  : 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
                }`} />
              </div>

              <div className="text-[8px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                1080P PRO
              </div>
            </div>

            {/* ----------------------------------------------------------- */}
            {/* B. SCREEN VIEWPORT (INTERACTIVE CYBER UI PER STAGE)         */}
            {/* ----------------------------------------------------------- */}
            <div className="relative z-20 flex-1 px-3.5 sm:px-4 py-2 flex flex-col justify-between overflow-hidden">
              
              {/* STAGE 0: CYBER DEFENSE OS BOOT */}
              {stage === 0 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-500">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] font-mono text-cyan-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                      <span>HIRESHIELD ZERO-TRUST OS</span>
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      DEFENSE ACTIVE
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto space-y-2.5">
                    <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/40 flex items-center justify-center cyber-glow animate-float-slow shadow-lg shadow-cyan-950/50">
                      <Shield className="w-7 h-7 text-cyan-400" />
                      <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-ping opacity-25" />
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold text-white tracking-wide">Recruitment Threat Defense Matrix</p>
                      <p className="text-[10px] text-slate-400 font-mono">140+ Threat Rules • Real-time DNS & MX Sensor Ready</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-850">
                    <span>TELEMETRY: 0 ACTIVE ANOMALIES</span>
                    <span className="text-cyan-400 font-semibold">STANDBY INGESTION</span>
                  </div>
                </div>
              )}

              {/* STAGE 1: INCOMING REQUISITION INGESTION */}
              {stage === 1 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex items-center justify-between pb-1.5 border-b border-indigo-500/30 text-[10px] font-mono">
                    <span className="text-indigo-300 font-bold flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-indigo-400 animate-bounce" />
                      <span>INGESTING REQUISITION #8492</span>
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[9px] font-bold">
                      Pending MX Audit
                    </span>
                  </div>

                  <div className="bg-slate-900/95 rounded-xl p-2.5 border border-indigo-500/30 space-y-1.5 text-left my-auto shadow-xl">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">Staff Software Engineer</span>
                      <span className="font-bold text-emerald-400 font-mono">$190,000 - $220,000</span>
                    </div>
                    <p className="text-[10px] text-slate-300 font-mono flex items-center gap-1">
                      <Globe className="w-3 h-3 text-cyan-400" />
                      Company: Stripe Technologies, Inc.
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono truncate">
                      Sender: careers-recruiting@stripe-talent-portal.org
                    </p>
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-slate-800 text-cyan-300 border border-cyan-500/20">LinkedIn Source</span>
                      <span className="text-[8px] font-mono px-2 py-0.5 rounded bg-slate-800 text-indigo-300 border border-indigo-500/20">Unstop Verified</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span>DISPATCHING FORENSIC AGENTS...</span>
                    <span className="text-cyan-400 font-bold animate-pulse">EXTRACTING DNS ROOTS</span>
                  </div>
                </div>
              )}

              {/* STAGE 2: MULTI-VECTOR LASER FORENSIC SCAN */}
              {stage === 2 && (
                <div className="h-full flex flex-col justify-between relative overflow-hidden animate-in fade-in duration-500">
                  {/* High-Intensity Laser Sweep Line */}
                  <div className="absolute left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser-scan shadow-[0_0_15px_rgba(6,182,212,1)] z-30 pointer-events-none" />

                  <div className="flex items-center justify-between pb-1.5 border-b border-cyan-500/40 text-[10px] font-mono text-cyan-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <Search className="w-3.5 h-3.5 text-cyan-400 animate-spin" />
                      <span>AUTONOMOUS FORENSIC SWEEP</span>
                    </span>
                    <span className="text-cyan-400 font-bold px-2 py-0.5 rounded bg-cyan-500/10 border border-cyan-500/30 text-[9px] animate-pulse">
                      140+ RULES RUNNING
                    </span>
                  </div>

                  <div className="space-y-1.5 my-auto text-left font-mono text-[10px]">
                    <div className="p-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Activity className="w-3 h-3 text-cyan-400" /> MX Server Handshake:
                      </span>
                      <span className="text-emerald-400 font-bold">Valid aspmx.l.google.com</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Globe className="w-3 h-3 text-cyan-400" /> Domain Age & Registrant:
                      </span>
                      <span className="text-cyan-300 font-bold">14 Years • Authenticated</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 flex justify-between items-center">
                      <span className="text-slate-400 flex items-center gap-1">
                        <Zap className="w-3 h-3 text-cyan-400" /> Upfront Deposit Trap:
                      </span>
                      <span className="text-emerald-400 font-bold">Passed (0 Flags)</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span>NEURAL HEURISTICS: ACTIVE</span>
                    <span className="text-cyan-300 font-bold">100% PARSED</span>
                  </div>
                </div>
              )}

              {/* STAGE 3: THREAT SIGNALS DETECTED & SCAM BLOCKED */}
              {stage === 3 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-500">
                  <div className="flex items-center justify-between pb-1.5 border-b border-rose-900 text-[10px] font-mono text-rose-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-3.5 h-3.5 text-rose-400 animate-bounce" />
                      <span>CRITICAL THREATS ISOLATED</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[9px] font-bold animate-pulse">
                      RISK SCORE: 94/100
                    </span>
                  </div>

                  <div className="space-y-1.5 my-auto text-left">
                    <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/50 flex items-start gap-2 shadow-lg shadow-rose-950/40">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-rose-200">Upfront Equipment Wire Scam ($350)</p>
                        <p className="text-[8px] text-rose-300/80">Recruiter demanded $350 via Zelle for home hardware dispatch.</p>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-rose-950/80 border border-rose-500/50 flex items-start gap-2 shadow-lg shadow-rose-950/40">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-rose-200">Lookalike Domain Phishing Spoof</p>
                        <p className="text-[8px] text-rose-300/80">Domain registered 3 days ago. No legitimate MX records found.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-rose-400 font-bold">
                    <span>SECURITY VERDICT: MALICIOUS OFFER</span>
                    <span className="text-rose-200 bg-rose-950 px-2 py-0.5 rounded border border-rose-600/40">AUTOMATICALLY BLOCKED</span>
                  </div>
                </div>
              )}

              {/* STAGE 4: CRYPTOGRAPHIC JOB TRUST PASSPORT */}
              {stage === 4 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex items-center justify-between pb-1.5 border-b border-emerald-900 text-[10px] font-mono text-emerald-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      <span>JOB TRUST PASSPORT™</span>
                    </span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[9px] font-bold font-mono">
                      100/100 SAFE
                    </span>
                  </div>

                  <div className="bg-emerald-950/40 rounded-xl p-2 border border-emerald-500/30 space-y-1.5 text-left my-auto shadow-lg">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300">Employer Authenticity:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-400" /> Enterprise Verified
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300">Official MX Domain:</span>
                      <span className="text-white font-bold">stripe.com</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300">SHA-256 Signature:</span>
                      <span className="text-cyan-300 font-bold">HSP-2026-A89F</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400 font-bold">
                    <span>SAFETY STATUS: CERTIFIED LEGITIMATE</span>
                    <span className="text-cyan-300">SAFE TO APPLY</span>
                  </div>
                </div>
              )}

            </div>

            {/* Screen Bottom Bezel with Glow Logo */}
            <div className="bg-slate-950/95 py-1 text-center border-t border-slate-800 flex items-center justify-center gap-1.5">
              <Shield className="w-2.5 h-2.5 text-cyan-400" />
              <span className="text-[9px] font-mono tracking-widest text-slate-400 font-bold uppercase">HIRESHIELD PRO</span>
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

            {/* Row 1 & 2 Number & QWERTY Rows */}
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

        {/* --------------------------------------------------------------- */}
        {/* D. FLOATING 3D GLASS PERSPECTIVE HOLOGRAM CARDS                 */}
        {/* --------------------------------------------------------------- */}
        {stage === 1 && (
          <div 
            className="absolute -top-8 -right-8 px-3.5 py-2 rounded-2xl bg-slate-900/95 border border-indigo-500/50 text-xs font-mono text-indigo-300 shadow-2xl backdrop-blur-xl animate-float-slow"
            style={{ transform: 'translateZ(45px)' }}
          >
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
              Sourced: LinkedIn / Unstop Verified
            </span>
          </div>
        )}

        {stage === 3 && (
          <div 
            className="absolute -top-10 -left-8 px-4 py-2 rounded-2xl bg-rose-950/95 border border-rose-500/60 text-xs font-mono text-rose-300 shadow-2xl backdrop-blur-xl animate-bounce"
            style={{ transform: 'translateZ(50px)' }}
          >
            <span className="font-bold flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-rose-400" />
              Upfront Deposit Wire Fraud Intercepted!
            </span>
          </div>
        )}

        {stage === 4 && (
          <div 
            className="absolute -top-10 -right-8 px-4 py-2 rounded-2xl bg-emerald-950/95 border border-emerald-500/60 text-xs font-mono text-emerald-300 shadow-2xl backdrop-blur-xl animate-float-slow"
            style={{ transform: 'translateZ(50px)' }}
          >
            <span className="font-bold flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Trust Score: 100/100
            </span>
          </div>
        )}

      </div>
    </div>
  );
}
