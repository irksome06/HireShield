import React from 'react';
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
  Check
} from 'lucide-react';

export default function SceneLaptop3D({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  // Stage determination based on scroll progress (0.0 to 1.0)
  // Stage 0 (0.00 - 0.22): Computer / Cyber Station
  // Stage 1 (0.22 - 0.44): Job Offer Appears
  // Stage 2 (0.44 - 0.66): Job Being Scanned (Laser Sweep)
  // Stage 3 (0.66 - 0.86): Suspicious Signals Detected
  // Stage 4 (0.86 - 1.00): Verification & Safe/Protected Passport

  const stage = scrollProgress < 0.22 ? 0 
              : scrollProgress < 0.44 ? 1 
              : scrollProgress < 0.66 ? 2 
              : scrollProgress < 0.86 ? 3 
              : 4;

  // Continuous transformations derived from scroll
  // Laptop rotation, scale, position interpolations
  const tiltX = mousePos.y * 10;
  const tiltY = -mousePos.x * 10;

  // Stage-specific camera / 3D transform settings
  const getStageTransforms = () => {
    switch (stage) {
      case 0:
        return {
          rotX: 18 + tiltX,
          rotY: -15 + tiltY,
          scale: 0.95 + scrollProgress * 0.2,
          transY: 0
        };
      case 1:
        return {
          rotX: 8 + tiltX,
          rotY: 5 + tiltY,
          scale: 1.05,
          transY: -5
        };
      case 2:
        return {
          rotX: 4 + tiltX,
          rotY: 0 + tiltY,
          scale: 1.15,
          transY: -15
        };
      case 3:
        return {
          rotX: 12 + tiltX,
          rotY: 10 + tiltY,
          scale: 1.08,
          transY: -5
        };
      case 4:
        return {
          rotX: 6 + tiltX,
          rotY: -2 + tiltY,
          scale: 1.1,
          transY: -10
        };
      default:
        return { rotX: 15, rotY: 0, scale: 1, transY: 0 };
    }
  };

  const currentTransform = getStageTransforms();

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none perspective-2000">
      
      {/* Ambient Cyber Lighting Rings behind Laptop */}
      <div className="absolute w-[440px] h-[440px] rounded-full border border-cyan-500/15 animate-orbit pointer-events-none" />
      <div className="absolute w-[560px] h-[560px] rounded-full border border-dashed border-indigo-500/15 animate-orbit pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '35s' }} />
      <div className={`absolute w-[360px] h-[360px] rounded-full blur-3xl pointer-events-none transition-colors duration-700 ${
        stage === 3 ? 'bg-rose-500/15' : stage === 4 ? 'bg-emerald-500/15' : 'bg-cyan-500/15'
      }`} />

      {/* ---------------------------------------------------- */}
      {/* ONE 3D CENTRAL LAPTOP HERO OBJECT                     */}
      {/* ---------------------------------------------------- */}
      <div 
        className="relative flex flex-col items-center justify-center transition-all duration-700 ease-out preserve-3d"
        style={{
          transform: `rotateX(${currentTransform.rotX}deg) rotateY(${currentTransform.rotY}deg) scale(${currentTransform.scale}) translateY(${currentTransform.transY}px)`
        }}
      >

        {/* 1. LAPTOP DISPLAY / SCREEN (LID) */}
        <div className="relative w-[340px] sm:w-[420px] lg:w-[460px] h-[220px] sm:h-[265px] lg:h-[285px] rounded-t-2xl bg-gradient-to-b from-slate-700 via-slate-800 to-slate-900 p-[3px] shadow-2xl shadow-black/80 preserve-3d">
          
          {/* Screen Inner Bezel */}
          <div className="relative w-full h-full bg-[#070b14] rounded-t-[13px] border border-slate-700/60 overflow-hidden flex flex-col justify-between">
            
            {/* Top Webcam Notch */}
            <div className="relative z-30 w-full pt-1.5 flex items-center justify-center gap-1">
              <span className="w-1 h-1 rounded-full bg-slate-800 border border-slate-600" />
              <span className={`w-1 h-1 rounded-full transition-colors duration-300 ${stage === 2 ? 'bg-cyan-400 animate-pulse' : 'bg-emerald-400'}`} />
            </div>

            {/* Screen Inner Viewport (Changes per Stage) */}
            <div className="relative z-20 flex-1 px-3 sm:px-4 py-2 flex flex-col justify-between overflow-hidden">
              
              {/* STAGE 0 SCREEN: Cyber Station OS Boot */}
              {stage === 0 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-500">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] font-mono text-cyan-400">
                    <span className="flex items-center gap-1.5">
                      <Terminal className="w-3 h-3 text-cyan-400" />
                      HIRESHIELD-OS v2.0
                    </span>
                    <span className="text-emerald-400 font-bold">READY</span>
                  </div>

                  <div className="flex flex-col items-center justify-center my-auto space-y-2">
                    <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center cyber-glow animate-float-slow">
                      <Shield className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-white tracking-wide">Threat Defense Console</p>
                      <p className="text-[10px] text-slate-400 font-mono">140+ Rules Active • Ready for Ingestion</p>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500 pt-1 border-t border-slate-850">
                    <span>STATUS: 0 ACTIVE THREATS</span>
                    <span className="text-cyan-400">DETERMINISTIC ENGINE</span>
                  </div>
                </div>
              )}

              {/* STAGE 1 SCREEN: Job Offer Appears */}
              {stage === 1 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-800 text-[10px] font-mono">
                    <span className="text-indigo-300 font-bold flex items-center gap-1">
                      <FileText className="w-3 h-3 text-indigo-400" />
                      INCOMING REQUISITION #8492
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 text-[9px]">
                      Pending Verification
                    </span>
                  </div>

                  <div className="bg-slate-900/90 rounded-xl p-2.5 border border-slate-800 space-y-1.5 text-left my-auto">
                    <div className="flex justify-between text-xs">
                      <span className="font-bold text-white">Staff Software Engineer</span>
                      <span className="font-bold text-emerald-400 font-mono">$190k - $220k</span>
                    </div>
                    <p className="text-[10px] text-slate-400 font-mono">Company: Stripe Technologies</p>
                    <p className="text-[10px] text-slate-400 font-mono">Recruiter: david.miller@stripe-hr-portal.com</p>
                    <div className="flex items-center gap-1 pt-1">
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">LinkedIn Verified Source</span>
                      <span className="text-[8px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">Unstop / Internshala Tag</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-500">
                    <span>ACTION: INITIATING DEEP SCAN...</span>
                    <span className="text-cyan-400 animate-pulse">ANALYZING</span>
                  </div>
                </div>
              )}

              {/* STAGE 2 SCREEN: Job Being Scanned (Laser Sweep) */}
              {stage === 2 && (
                <div className="h-full flex flex-col justify-between relative overflow-hidden animate-in fade-in duration-500">
                  {/* Laser Scan Beam */}
                  <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-scan shadow-lg shadow-cyan-400 z-30 pointer-events-none" />

                  <div className="flex items-center justify-between pb-1.5 border-b border-cyan-500/30 text-[10px] font-mono text-cyan-300">
                    <span className="flex items-center gap-1 font-bold">
                      <Search className="w-3 h-3 text-cyan-400 animate-spin" />
                      AUTONOMOUS THREAT INSPECTION
                    </span>
                    <span className="text-cyan-400 animate-pulse font-bold">SCANNING</span>
                  </div>

                  <div className="space-y-1 my-auto text-left font-mono text-[10px]">
                    <div className="p-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 flex justify-between">
                      <span className="text-slate-400">MX Record Query:</span>
                      <span className="text-emerald-400 font-bold">Authenticated</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 flex justify-between">
                      <span className="text-slate-400">Domain Registry Age:</span>
                      <span className="text-cyan-300 font-bold">14 Years Active</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-slate-900/90 border border-cyan-500/30 flex justify-between">
                      <span className="text-slate-400">Advance Fee Heuristics:</span>
                      <span className="text-emerald-400 font-bold">Passed (0 Flags)</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-slate-400">
                    <span>140+ RULES EXECUTED</span>
                    <span className="text-cyan-400 font-bold">PARSING COMPLETE</span>
                  </div>
                </div>
              )}

              {/* STAGE 3 SCREEN: Suspicious Signals Detected */}
              {stage === 3 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in duration-500">
                  <div className="flex items-center justify-between pb-1.5 border-b border-rose-900 text-[10px] font-mono text-rose-300">
                    <span className="flex items-center gap-1 font-bold">
                      <ShieldAlert className="w-3 h-3 text-rose-400 animate-bounce" />
                      THREAT SIGNALS DETECTED
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[9px] font-bold">
                      -65 PTS
                    </span>
                  </div>

                  <div className="space-y-1.5 my-auto text-left">
                    <div className="p-1.5 rounded-lg bg-rose-950/70 border border-rose-500/40 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-rose-200">Upfront Equipment Deposit ($350)</p>
                        <p className="text-[8px] text-rose-300/70">Candidate asked to wire refundable check deposit.</p>
                      </div>
                    </div>

                    <div className="p-1.5 rounded-lg bg-rose-950/70 border border-rose-500/40 flex items-start gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] font-bold text-rose-200">Off-Platform Telegram Redirection</p>
                        <p className="text-[8px] text-rose-300/70">Interview redirected to anonymous chat handle.</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-rose-400 font-bold">
                    <span>VERDICT: HIGH-RISK SCAM</span>
                    <span className="text-rose-300">BLOCKED</span>
                  </div>
                </div>
              )}

              {/* STAGE 4 SCREEN: Verified Job Trust Passport */}
              {stage === 4 && (
                <div className="h-full flex flex-col justify-between animate-in fade-in zoom-in-95 duration-500">
                  <div className="flex items-center justify-between pb-1.5 border-b border-emerald-900 text-[10px] font-mono text-emerald-300">
                    <span className="flex items-center gap-1 font-bold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      JOB TRUST PASSPORT™
                    </span>
                    <span className="px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold font-mono">
                      100/100 HIGH TRUST
                    </span>
                  </div>

                  <div className="bg-emerald-950/30 rounded-xl p-2 border border-emerald-500/30 space-y-1 text-left my-auto">
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300">Employer Authenticity:</span>
                      <span className="text-emerald-400 font-bold flex items-center gap-0.5">
                        <Check className="w-3 h-3" /> Verified Enterprise
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300">Corporate MX Match:</span>
                      <span className="text-white font-bold">stripe.com</span>
                    </div>
                    <div className="flex justify-between items-center text-[10px] font-mono">
                      <span className="text-slate-300">Passport Signature:</span>
                      <span className="text-cyan-400 font-bold">HSP-2026-A89F</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono text-emerald-400 font-bold">
                    <span>STATUS: SAFE TO PROCEED</span>
                    <span className="text-cyan-400">CERTIFIED</span>
                  </div>
                </div>
              )}

            </div>

            {/* Screen Bottom Chin Logo */}
            <div className="bg-slate-950 py-1 text-center border-t border-slate-800/80">
              <span className="text-[9px] font-mono tracking-widest text-slate-500 font-bold uppercase">HIRESHIELD</span>
            </div>

          </div>
        </div>

        {/* 2. LAPTOP KEYBOARD BASE DECK */}
        <div 
          className="relative w-[380px] sm:w-[460px] lg:w-[500px] h-[160px] sm:h-[185px] lg:h-[200px] rounded-b-3xl bg-gradient-to-b from-slate-800 via-slate-850 to-slate-900 border-x-2 border-b-2 border-slate-700/80 shadow-2xl shadow-black p-4 flex flex-col justify-between preserve-3d"
          style={{
            transform: 'rotateX(68deg) translateY(-25px)',
            transformOrigin: 'top center'
          }}
        >
          {/* Keyboard Grid */}
          <div className="w-full bg-[#0a0f1d] rounded-xl p-2 border border-slate-700/60 shadow-inner">
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-2 rounded bg-slate-800/90 border border-cyan-500/15" />
              ))}
            </div>
            <div className="grid grid-cols-12 gap-1 mb-1">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="h-2 rounded bg-slate-800/90 border border-cyan-500/15" />
              ))}
            </div>
            <div className="grid grid-cols-8 gap-1">
              <div className="col-span-2 h-2 rounded bg-slate-800/90" />
              <div className="col-span-4 h-2 rounded bg-slate-700/90 border border-cyan-400/40 shadow-sm shadow-cyan-400/20" />
              <div className="col-span-2 h-2 rounded bg-slate-800/90" />
            </div>
          </div>

          {/* Trackpad */}
          <div className="w-24 h-12 mx-auto rounded-lg bg-slate-800/60 border border-slate-700/60 shadow-inner" />
        </div>

        {/* 3. DYNAMIC FLOATING PERSPECTIVE BADGES SURROUNDING LAPTOP */}
        {stage === 1 && (
          <div className="absolute -top-6 -right-8 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-indigo-500/40 text-[11px] font-mono text-indigo-300 shadow-xl backdrop-blur-md animate-float-slow">
            <span className="font-bold">💼 Sourced: Unstop / LinkedIn</span>
          </div>
        )}

        {stage === 3 && (
          <div className="absolute -top-8 -left-6 px-3 py-1.5 rounded-xl bg-rose-950/90 border border-rose-500/50 text-[11px] font-mono text-rose-300 shadow-xl backdrop-blur-md animate-bounce">
            <span className="font-bold">🚨 Advance Fee Fraud Alert</span>
          </div>
        )}

        {stage === 4 && (
          <div className="absolute -top-8 -right-6 px-3.5 py-1.5 rounded-xl bg-emerald-950/90 border border-emerald-500/50 text-[11px] font-mono text-emerald-300 shadow-xl backdrop-blur-md animate-float-slow">
            <span className="font-bold">🛡️ Verified Trust Score: 100/100</span>
          </div>
        )}

      </div>
    </div>
  );
}
