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
  QrCode
} from 'lucide-react';

export default function SceneShield3D({ scrollProgress = 0, mousePos = { x: 0, y: 0 } }) {
  // Stage determination based on scroll progress (0.0 to 1.0)
  // Stage 0: 0.00 - 0.22 (Security Shield)
  // Stage 1: 0.22 - 0.44 (Job Offer Document)
  // Stage 2: 0.44 - 0.66 (AI Threat Scanner & Decomposition)
  // Stage 3: 0.66 - 0.86 (Threat Detection & Red Flag Telemetry)
  // Stage 4: 0.86 - 1.00 (Verified Cryptographic Job Trust Passport)

  const stage = scrollProgress < 0.22 ? 0 
              : scrollProgress < 0.44 ? 1 
              : scrollProgress < 0.66 ? 2 
              : scrollProgress < 0.86 ? 3 
              : 4;

  // Calculate mouse tilt
  const tiltX = mousePos.y * 12; // deg
  const tiltY = -mousePos.x * 12; // deg

  // Continuous rotation offset derived from scroll
  const scrollRotate = scrollProgress * 180;

  return (
    <div className="relative w-full h-full flex items-center justify-center pointer-events-none select-none perspective-2000">
      
      {/* 3D Master Scene Canvas */}
      <div 
        className="relative flex items-center justify-center transition-transform duration-300 ease-out preserve-3d"
        style={{
          transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
        }}
      >
        
        {/* Ambient Glowing Cyber Rings behind the object */}
        <div className="absolute w-[420px] h-[420px] rounded-full border border-cyan-500/20 animate-orbit pointer-events-none" />
        <div className="absolute w-[520px] h-[520px] rounded-full border border-dashed border-indigo-500/15 animate-orbit pointer-events-none" style={{ animationDirection: 'reverse', animationDuration: '30s' }} />
        <div className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none animate-pulse-glow" />

        {/* ---------------------------------------------------- */}
        {/* STAGE 0: The Autonomous Security Shield (0 - 22%)     */}
        {/* ---------------------------------------------------- */}
        {stage === 0 && (
          <div 
            className="relative flex flex-col items-center justify-center animate-in zoom-in-90 fade-in duration-500 preserve-3d"
            style={{ transform: `scale(${1 + scrollProgress * 0.4}) rotateY(${scrollRotate * 0.3}deg)` }}
          >
            {/* 3D Floating Security Shield */}
            <div className="relative w-48 h-56 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2.5px] shadow-2xl shadow-cyan-500/40 cyber-glow animate-float-slow">
              <div className="w-full h-full bg-[#090f1d] rounded-[22px] flex flex-col items-center justify-center p-5 relative overflow-hidden">
                <div className="absolute inset-0 bg-grid-pattern opacity-40" />
                <div className="relative z-10 w-20 h-20 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center mb-3">
                  <Shield className="w-12 h-12 text-cyan-400" />
                </div>
                <div className="relative z-10 text-center">
                  <span className="text-xs font-black tracking-widest text-cyan-400 font-mono uppercase">HireShield</span>
                  <p className="text-[10px] text-slate-400 font-medium mt-0.5">Threat Engine Active</p>
                </div>
              </div>
            </div>

            {/* Orbiting Satellite Data Nodes */}
            <div className="absolute -top-6 -right-12 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-cyan-500/30 text-[11px] font-mono text-cyan-300 shadow-lg backdrop-blur-md animate-float-slow" style={{ animationDelay: '1s' }}>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Deterministic AI</span>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-12 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-indigo-500/30 text-[11px] font-mono text-indigo-300 shadow-lg backdrop-blur-md animate-float-slow" style={{ animationDelay: '2.5s' }}>
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-indigo-400" />
                <span>Zero Trust Protocol</span>
              </div>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STAGE 1: Incoming Job Offer Requisition (22% - 44%)   */}
        {/* ---------------------------------------------------- */}
        {stage === 1 && (
          <div 
            className="relative w-80 rounded-3xl bg-slate-900/95 border border-slate-700/90 p-5 shadow-2xl shadow-indigo-950/60 backdrop-blur-2xl animate-in zoom-in-95 fade-in duration-500 preserve-3d"
            style={{ 
              transform: `rotateX(10deg) rotateY(${tiltY * 1.5}deg) translateY(-8px)` 
            }}
          >
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center">
                  <FileText className="w-4 h-4 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white">Job Offer Requisition</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Incoming Correspondence</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/20">
                Unverified
              </span>
            </div>

            {/* Offer Metadata Mock */}
            <div className="py-3 space-y-2 text-xs">
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500 font-mono">Company:</span>
                <span className="font-semibold text-white">CloudScale Technologies</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500 font-mono">Recruiter:</span>
                <span className="text-slate-200">sarah.recruiter@cloudscale.com</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span className="text-slate-500 font-mono">Compensation:</span>
                <span className="font-bold text-emerald-400">$185,000 - $210,000 /yr</span>
              </div>
            </div>

            {/* Floating Tags */}
            <div className="pt-2 border-t border-slate-800/80 flex items-center gap-1.5">
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Full-time</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-slate-800 text-slate-300 font-mono">Remote</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 font-mono border border-cyan-800">Awaiting Scan</span>
            </div>

            {/* 3D Floating Stamp Badge */}
            <div className="absolute -top-4 -right-4 w-10 h-10 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 flex items-center justify-center backdrop-blur-md shadow-lg animate-float-slow">
              <Cpu className="w-5 h-5 text-cyan-300" />
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STAGE 2: Deep AI Threat Scanning (44% - 66%)         */}
        {/* ---------------------------------------------------- */}
        {stage === 2 && (
          <div 
            className="relative w-84 rounded-3xl bg-[#0a1122]/95 border border-cyan-500/40 p-5 shadow-2xl shadow-cyan-950/80 cyber-glow backdrop-blur-2xl animate-in zoom-in-95 fade-in duration-500 preserve-3d overflow-hidden"
            style={{ 
              transform: `rotateX(8deg) rotateY(${tiltY}deg)` 
            }}
          >
            {/* Animated Laser Scan Beam */}
            <div className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-laser-scan shadow-lg shadow-cyan-400 pointer-events-none z-30" />

            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center animate-pulse">
                  <Search className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-cyan-300">Threat Inspection Active</h4>
                  <p className="text-[10px] text-slate-400 font-mono">Decomposing Offer Artifacts...</p>
                </div>
              </div>
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            </div>

            {/* Scan Decomposition Steps */}
            <div className="py-3 space-y-2 text-xs font-mono">
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">MX Domain Matching:</span>
                <span className="text-emerald-400 font-semibold">Matched (cloudscale.com)</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">WHOIS Registry Age:</span>
                <span className="text-cyan-400 font-semibold">14 Years (Established)</span>
              </div>
              <div className="p-2 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Upfront Fee Heuristic:</span>
                <span className="text-emerald-400 font-semibold">0 Red Flags Found</span>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-mono">
              <span>Telemetry: 142 Rules Checked</span>
              <span className="text-cyan-400">100% Deterministic</span>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STAGE 3: Threat Detection & Red Flag Alerts (66%-86%) */}
        {/* ---------------------------------------------------- */}
        {stage === 3 && (
          <div 
            className="relative w-84 rounded-3xl bg-[#180a0f]/95 border border-rose-500/50 p-5 shadow-2xl shadow-rose-950/80 cyber-glow-rose backdrop-blur-2xl animate-in zoom-in-95 fade-in duration-500 preserve-3d"
            style={{ 
              transform: `rotateX(12deg) rotateY(${tiltY * 1.2}deg)` 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-rose-950">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-rose-500/20 border border-rose-500/40 flex items-center justify-center animate-bounce">
                  <ShieldAlert className="w-4 h-4 text-rose-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-rose-300">Scam Red Flags Isolated</h4>
                  <p className="text-[10px] text-rose-400/80 font-mono">High-Risk Patterns Detected</p>
                </div>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                -85 Pts
              </span>
            </div>

            {/* Red Flag Alerts */}
            <div className="py-3 space-y-2 text-xs">
              <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-rose-200">Upfront Equipment Fee Demand</p>
                  <p className="text-[10px] text-rose-300/70 mt-0.5">Demands $350 refundable wire transfer.</p>
                </div>
              </div>

              <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-500/30 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-rose-200">Off-Platform Redirection</p>
                  <p className="text-[10px] text-rose-300/70 mt-0.5">Directs candidate to unindexed Telegram chat.</p>
                </div>
              </div>
            </div>

            {/* Bottom Status */}
            <div className="pt-2 border-t border-rose-950 flex items-center justify-between text-[10px] text-rose-400 font-mono">
              <span>Risk Verdict: Severe Scam</span>
              <span className="font-bold text-rose-300">Blocked</span>
            </div>
          </div>
        )}

        {/* ---------------------------------------------------- */}
        {/* STAGE 4: Verified Job Trust Passport™ (86% - 100%)    */}
        {/* ---------------------------------------------------- */}
        {stage === 4 && (
          <div 
            className="relative w-84 rounded-3xl bg-[#09151c]/95 border border-emerald-500/50 p-6 shadow-2xl shadow-emerald-950/80 cyber-glow-emerald backdrop-blur-2xl animate-in zoom-in-95 fade-in duration-500 preserve-3d"
            style={{ 
              transform: `rotateX(6deg) rotateY(${tiltY}deg) scale(1.02)` 
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-emerald-900/60">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shadow-md shadow-emerald-500/20">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-xs font-extrabold text-white">Job Trust Passport™</h4>
                  <p className="text-[10px] text-emerald-400 font-mono">Cryptographically Certified</p>
                </div>
              </div>
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                100/100
              </span>
            </div>

            {/* Passport Core Verification Details */}
            <div className="py-4 space-y-2.5 text-xs font-mono">
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-emerald-500/20">
                <span className="text-slate-400">Employer Status:</span>
                <span className="text-emerald-300 font-bold flex items-center gap-1">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Enterprise
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-emerald-500/20">
                <span className="text-slate-400">Corporate MX:</span>
                <span className="text-slate-200">Authenticated</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-slate-900/80 border border-emerald-500/20">
                <span className="text-slate-400">Passport Hash:</span>
                <span className="text-cyan-400">HSP-2026-A89F</span>
              </div>
            </div>

            {/* Bottom Seal */}
            <div className="pt-3 border-t border-emerald-900/60 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[10px] text-slate-400 font-mono">
                <Fingerprint className="w-4 h-4 text-emerald-400" />
                <span>Zero Fraud Indicators</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                HIGH TRUST
              </span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
