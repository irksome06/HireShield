import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  AlertTriangle, 
  CheckCircle2, 
  FileText, 
  Activity, 
  Terminal, 
  Globe, 
  Lock 
} from 'lucide-react';

export default function SceneLaptop3D({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  // If we are at Stage 5 (final console / scrollProgress >= 0.78), completely hide the laptop
  if (scrollProgress >= 0.78) {
    return null;
  }

  // Stage determination based on scroll progress (0.0 to 0.78)
  // Stage 0 (0.00 - 0.20): Defense OS Boot (Hero)
  // Stage 1 (0.20 - 0.40): Incoming Requisition Sandbox (Stage 2)
  // Stage 2 (0.40 - 0.60): Real-Time Scam Signals & Penalty Engine (Stage 3)
  // Stage 3 (0.60 - 0.78): Cryptographic Job Trust Passport (Stage 4)
  const stage = scrollProgress < 0.20 ? 0 
              : scrollProgress < 0.40 ? 1 
              : scrollProgress < 0.60 ? 2 
              : 3;

  // Clamshell Opening Angle: Opens smoothly from 50deg -> 118deg as user scrolls into the experience
  const hingeAngle = Math.min(118, 50 + scrollProgress * 140);

  // Smooth Gyroscopic Tilt responding to mouse cursor
  const tiltX = (mousePos.y || 0) * 8;
  const tiltY = -(mousePos.x || 0) * 10;

  // Stage-specific 3D Camera / Perspective Transforms (Calibrated to sit comfortably below page titles)
  const getStageTransforms = () => {
    switch (stage) {
      case 0:
        return {
          rotX: 18 + tiltX * 0.7,
          rotY: -12 + tiltY * 0.7,
          rotZ: -1,
          scale: 0.94 + scrollProgress * 0.1,
          transY: 45,
          transZ: 0
        };
      case 1:
        return {
          rotX: 8 + tiltX * 0.8,
          rotY: 6 + tiltY * 0.8,
          rotZ: 0.5,
          scale: 0.98,
          transY: 65,
          transZ: 15
        };
      case 2:
        return {
          rotX: 4 + tiltX * 0.9,
          rotY: 0 + tiltY * 0.9,
          rotZ: 0,
          scale: 1.02,
          transY: 60,
          transZ: 25
        };
      case 3:
        return {
          rotX: 8 + tiltX * 0.8,
          rotY: -4 + tiltY * 0.8,
          rotZ: -0.5,
          scale: 0.98,
          transY: 65,
          transZ: 20
        };
      default:
        return { rotX: 14, rotY: 0, rotZ: 0, scale: 0.96, transY: 55, transZ: 0 };
    }
  };

  const transform = getStageTransforms();

  // Specular Screen Sheen Highlight calculation based on mouse
  const sheenX = ((mousePos.x || 0) + 1) * 50;

  return (
    <div 
      className="relative w-full h-full flex items-center justify-center pointer-events-none select-none transition-opacity duration-500" 
      style={{ perspective: '2200px' }}
    >
      
      {/* ----------------------------------------------------------------- */}
      {/* 1. AMBIENT HOLOGRAPHIC LIGHTING & ORBITAL GYROSCOPE RINGS         */}
      {/* ----------------------------------------------------------------- */}
      <div className="absolute w-[460px] h-[460px] rounded-full border border-cyan-500/20 animate-orbit pointer-events-none" />
      <div 
        className="absolute w-[600px] h-[600px] rounded-full border border-dashed border-indigo-500/20 animate-orbit pointer-events-none" 
        style={{ animationDirection: 'reverse', animationDuration: '45s' }} 
      />
      
      {/* Dynamic Aura Glow behind laptop */}
      <div 
        className={`absolute w-[400px] h-[400px] rounded-full blur-[90px] pointer-events-none transition-all duration-700 ${
          stage === 2 
            ? 'bg-rose-500/20 shadow-[0_0_120px_rgba(244,63,94,0.3)]' 
            : stage === 3
            ? 'bg-emerald-500/20 shadow-[0_0_120px_rgba(16,185,129,0.3)]'
            : stage === 1
            ? 'bg-indigo-600/20 shadow-[0_0_100px_rgba(99,102,241,0.25)]'
            : 'bg-cyan-500/20 shadow-[0_0_100px_rgba(6,182,212,0.25)]'
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
          className="relative w-[340px] sm:w-[440px] md:w-[500px] lg:w-[540px] h-[215px] sm:h-[270px] md:h-[305px] lg:h-[325px] rounded-t-2xl bg-gradient-to-b from-slate-600 via-slate-800 to-slate-900 p-[3.5px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.95)] border-t border-x border-slate-500/50 transition-all duration-700"
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
              className="absolute inset-0 pointer-events-none z-40 opacity-20 mix-blend-screen transition-opacity duration-300"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.4) ${sheenX - 30}%, rgba(6,182,212,0.15) ${sheenX}%, transparent ${sheenX + 30}%)`
              }}
            />

            {/* Top Webcam Notch & Status LED */}
            <div className="relative z-30 w-full pt-1 px-4 flex items-center justify-between border-b border-slate-800/60 bg-[#04060d]">
              <div className="flex items-center gap-1.5 opacity-40">
                <span className="w-1 h-1 rounded-full bg-slate-600" />
                <span className="w-1 h-1 rounded-full bg-slate-600" />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-900 border border-slate-600" />
                <span className={`w-1.5 h-1.5 rounded-full transition-colors duration-300 ${
                  stage === 2 ? 'bg-rose-500 animate-ping shadow-[0_0_8px_rgba(244,63,94,1)]'
                  : stage === 3 ? 'bg-emerald-400 shadow-[0_0_6px_rgba(16,185,129,0.8)]'
                  : stage === 1 ? 'bg-indigo-400 animate-pulse shadow-[0_0_8px_rgba(99,102,241,1)]'
                  : 'bg-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]'
                }`} />
              </div>

              <div className="text-[7px] font-mono text-slate-500 font-bold uppercase tracking-wider">
                FORENSIC ENGINE
              </div>
            </div>

            {/* ----------------------------------------------------------- */}
            {/* B. NESTED CONTENT VIEWPORT DIRECTLY INSIDE LAPTOP DISPLAY   */}
            {/* ----------------------------------------------------------- */}
            <div className="relative z-20 flex-1 p-2.5 sm:p-3.5 flex flex-col justify-between overflow-hidden">
              
              {/* ========================================================= */}
              {/* STAGE 0: ZERO-TRUST DEFENSE NETWORK CORE (HERO)           */}
              {/* ========================================================= */}
              {stage === 0 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-500">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-800 text-[9px] sm:text-[11px] font-mono text-cyan-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-cyan-400 animate-pulse" />
                      <span>HIRESHIELD ZERO-TRUST DEFENSE OS</span>
                    </span>
                    <span className="text-emerald-400 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                      SYSTEM READY
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto space-y-2">
                    <div className="relative w-12 sm:w-14 h-12 sm:h-14 rounded-2xl bg-gradient-to-tr from-cyan-500/20 via-blue-600/20 to-indigo-600/20 border border-cyan-500/40 flex items-center justify-center cyber-glow animate-float-slow shadow-lg shadow-cyan-950/50">
                      <Shield className="w-6 sm:w-7 h-6 sm:h-7 text-cyan-400" />
                      <div className="absolute inset-0 rounded-2xl border border-cyan-400/20 animate-ping opacity-25" />
                    </div>
                    <div className="text-center space-y-0.5">
                      <p className="text-xs sm:text-sm font-bold text-white tracking-wide">Recruitment Threat Defense Terminal</p>
                      <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono">140+ Heuristic Rules • Real-Time DNS & MX Sensor</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-850">
                    <span>TELEMETRY: 0 ACTIVE ANOMALIES</span>
                    <span className="text-cyan-400 font-semibold">AWAITING REQUISITIONS</span>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STAGE 1: INCOMING REQUISITIONS SANDBOX (STAGE 02)         */}
              {/* ========================================================= */}
              {stage === 1 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500 text-left">
                  {/* Top Status Bar */}
                  <div className="flex items-center justify-between pb-1 border-b border-indigo-500/30 text-[9px] sm:text-[11px] font-mono">
                    <span className="text-indigo-300 font-bold flex items-center gap-1.5">
                      <FileText className="w-3 h-3 text-indigo-400" />
                      <span>INSPECTING REQUISITION #8492</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded-md bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[8px] sm:text-[9px] font-bold">
                      LinkedIn Verified Source
                    </span>
                  </div>

                  {/* Clean Requisition Card Rendered Directly Inside Screen */}
                  <div className="bg-slate-900/90 rounded-xl p-2.5 sm:p-3 border border-indigo-500/30 space-y-1.5 my-auto shadow-xl shadow-black/60 backdrop-blur-md">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-[11px] sm:text-xs font-bold text-white tracking-tight">Staff Software Architect</h4>
                        <p className="text-[9px] sm:text-[10px] text-slate-400 font-mono">Stripe, Inc. • Enterprise Cloud Platform</p>
                      </div>
                      <span className="text-[9px] sm:text-[10px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/15 border border-emerald-500/30">
                        100/100 Trust
                      </span>
                    </div>

                    <div className="p-2 rounded-lg bg-slate-950/70 border border-slate-800/80 space-y-0.5 text-[9px] sm:text-[10px] font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-500">Compensation:</span>
                        <span className="text-emerald-400 font-bold">$195,000 - $220,000 /yr</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Recruiter Email:</span>
                        <span className="text-slate-200">david.miller@stripe.com</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500">Domain MX:</span>
                        <span className="text-cyan-400 font-semibold">stripe.com (Google MX)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 pt-0.5">
                      <span className="text-[7px] sm:text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-800/90 text-cyan-300 border border-cyan-500/20">MX Authenticated</span>
                      <span className="text-[7px] sm:text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-800/90 text-indigo-300 border border-indigo-500/20">Unstop Verified</span>
                    </div>
                  </div>

                  {/* Bottom Action Footer */}
                  <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono text-slate-400 pt-1 border-t border-slate-850">
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" /> Ready for Deep Scan
                    </span>
                    <span className="text-indigo-300 font-bold">140+ RULES LOADED</span>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STAGE 2: REAL-TIME SCAM SIGNALS & PENALTY ENGINE (STAGE 3)*/}
              {/* ========================================================= */}
              {stage === 2 && (
                <div className="h-full flex flex-col justify-between relative overflow-hidden animate-in fade-in duration-500 text-left">
                  {/* High-Intensity Laser Sweep Line */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-300 to-transparent animate-laser-scan shadow-[0_0_15px_rgba(6,182,212,1)] z-30 pointer-events-none" />

                  {/* Header */}
                  <div className="flex items-center justify-between pb-1 border-b border-rose-900/80 text-[9px] sm:text-[11px] font-mono text-rose-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShieldAlert className="w-3 h-3 text-rose-400 animate-bounce" />
                      <span>CRITICAL SCAM THREATS DETECTED</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/40 text-[8px] sm:text-[9px] font-bold">
                      RISK SCORE: 94/100
                    </span>
                  </div>

                  {/* Penalty Breakdown List Rendered Inside Screen */}
                  <div className="space-y-1.5 my-auto">
                    <div className="p-2 rounded-lg bg-rose-950/80 border border-rose-500/50 flex items-start gap-1.5 shadow-md">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-[9px] sm:text-[10px]">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-rose-200">Upfront Equipment Check & Wire Trap</p>
                          <span className="font-mono font-black text-rose-400">-40 PTS</span>
                        </div>
                        <p className="text-[8px] sm:text-[9px] text-rose-300/80">Recruiter demanded $350 via Zelle for fake hardware vendor dispatch.</p>
                      </div>
                    </div>

                    <div className="p-2 rounded-lg bg-rose-950/80 border border-rose-500/50 flex items-start gap-1.5 shadow-md">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div className="text-[9px] sm:text-[10px]">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-rose-200">Off-Platform Telegram Redirection</p>
                          <span className="font-mono font-black text-rose-400">-25 PTS</span>
                        </div>
                        <p className="text-[8px] sm:text-[9px] text-rose-300/80">Refused video screening; redirected to anonymous chat handle.</p>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Footer */}
                  <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono text-rose-400 font-bold pt-1 border-t border-rose-950">
                    <span>SECURITY ACTION: MALICIOUS SCAM</span>
                    <span className="text-rose-200 bg-rose-950 px-1.5 py-0.5 rounded border border-rose-600/40">BLOCKED</span>
                  </div>
                </div>
              )}

              {/* ========================================================= */}
              {/* STAGE 3: CRYPTOGRAPHIC JOB TRUST PASSPORT™ (STAGE 04)     */}
              {/* ========================================================= */}
              {stage === 3 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500 text-left">
                  {/* Top Bar */}
                  <div className="flex items-center justify-between pb-1 border-b border-emerald-900/80 text-[9px] sm:text-[11px] font-mono text-emerald-300">
                    <span className="flex items-center gap-1.5 font-bold">
                      <ShieldCheck className="w-3 h-3 text-emerald-400" />
                      <span>JOB TRUST PASSPORT™ ISSUED</span>
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[8px] sm:text-[9px] font-bold font-mono">
                      100/100 HIGH TRUST
                    </span>
                  </div>

                  {/* Passport Certificate Card Rendered Inside Screen */}
                  <div className="bg-emerald-950/40 rounded-xl p-2.5 sm:p-3 border border-emerald-500/40 space-y-1.5 my-auto shadow-xl backdrop-blur-md">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                          <ShieldCheck className="w-3.5 h-3.5" />
                        </div>
                        <div>
                          <h4 className="text-[11px] sm:text-xs font-bold text-white">Stripe Technologies, Inc.</h4>
                          <p className="text-[8px] sm:text-[9px] text-emerald-400 font-mono">Verified Corporate Employer</p>
                        </div>
                      </div>
                      <span className="text-[8px] sm:text-[9px] font-mono font-bold text-emerald-300 px-1.5 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30">
                        SAFE TO APPLY
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[8px] sm:text-[9px] font-mono">
                      <div className="p-1.5 rounded bg-slate-950/70 border border-emerald-500/20">
                        <span className="text-slate-400 block">MX Server:</span>
                        <span className="text-emerald-300 font-bold">Authenticated</span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950/70 border border-emerald-500/20">
                        <span className="text-slate-400 block">Domain Age:</span>
                        <span className="text-white font-bold">14 Years Active</span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950/70 border border-emerald-500/20">
                        <span className="text-slate-400 block">Advance Fee:</span>
                        <span className="text-emerald-300 font-bold">0 Flags (Passed)</span>
                      </div>
                      <div className="p-1.5 rounded bg-slate-950/70 border border-emerald-500/20">
                        <span className="text-slate-400 block">SHA-256 Hash:</span>
                        <span className="text-cyan-300 font-bold">HSP-2026-A89F</span>
                      </div>
                    </div>
                  </div>

                  {/* Bottom Bar */}
                  <div className="flex justify-between items-center text-[8px] sm:text-[9px] font-mono text-emerald-400 font-bold pt-1 border-t border-emerald-950">
                    <span>DIGITALLY SIGNED & NOTARIZED</span>
                    <span className="text-cyan-300">ZERO-TRUST LEDGER</span>
                  </div>
                </div>
              )}

            </div>

            {/* Screen Bottom Bezel */}
            <div className="bg-slate-950/95 py-0.5 text-center border-t border-slate-800/80 flex items-center justify-center gap-1.5">
              <Shield className="w-2 h-2 text-cyan-400" />
              <span className="text-[8px] font-mono tracking-widest text-slate-400 font-bold uppercase">HIRESHIELD PRO</span>
            </div>

          </div>
        </div>

        {/* --------------------------------------------------------------- */}
        {/* C. LAPTOP KEYBOARD BASE DECK (METALLIC ANODIZED FINISH)         */}
        {/* --------------------------------------------------------------- */}
        <div 
          className="relative w-[380px] sm:w-[480px] md:w-[540px] lg:w-[580px] h-[155px] sm:h-[180px] md:h-[200px] lg:h-[215px] rounded-b-3xl bg-gradient-to-b from-slate-800 via-slate-900 to-[#070b14] border-x-2 border-b-2 border-slate-700/80 shadow-[0_30px_70px_rgba(0,0,0,0.95)] p-3.5 flex flex-col justify-between preserve-3d"
          style={{
            transform: 'rotateX(68deg) translateY(-25px)',
            transformOrigin: 'top center'
          }}
        >
          {/* Keyboard Deck Metallic Indentation */}
          <div className="w-full bg-[#070c18] rounded-xl p-2 border border-slate-700/70 shadow-inner">
            
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
                <div key={i} className="h-1.5 sm:h-2 rounded bg-slate-850 border border-slate-700/60 shadow-sm hover:border-cyan-400/40 transition-colors" />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-1.5 sm:h-2 rounded bg-slate-850 border border-slate-700/60 shadow-sm hover:border-cyan-400/40 transition-colors" />
              ))}
            </div>

            {/* Bottom Spacebar & Modifier Keys Row */}
            <div className="grid grid-cols-8 gap-1.5">
              <div className="col-span-2 h-1.5 sm:h-2 rounded bg-slate-850 border border-slate-700/60" />
              <div className="col-span-4 h-1.5 sm:h-2 rounded bg-gradient-to-r from-slate-800 via-cyan-950 to-slate-800 border border-cyan-500/40 shadow-[0_0_8px_rgba(6,182,212,0.3)]" />
              <div className="col-span-2 h-1.5 sm:h-2 rounded bg-slate-850 border border-slate-700/60" />
            </div>
          </div>

          {/* Frosted Glass Precision Trackpad */}
          <div className="w-24 sm:w-32 h-9 sm:h-12 mx-auto rounded-xl bg-slate-850/80 border border-slate-700/60 shadow-inner flex items-center justify-center">
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
