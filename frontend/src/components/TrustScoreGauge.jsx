import React from 'react';
import { ShieldCheck, ShieldAlert, AlertTriangle, CheckCircle2 } from 'lucide-react';

export const TrustScoreGauge = ({ score = 85, riskLevel = "Low", verdict = "", summary = "" }) => {
  // Determine color and friendly status tokens
  let strokeColor = "#10b981"; // emerald
  let textColor = "text-emerald-400";
  let badgeBg = "bg-emerald-950/80 border-emerald-500/50 text-emerald-300";
  let glowClass = "cyber-glow-emerald";
  let Icon = ShieldCheck;
  let friendlyVerdict = verdict || "Verified & High Trust Job Opportunity";
  let friendlyBadge = "Safe to Apply";

  if (score < 35 || riskLevel === "High") {
    strokeColor = "#f43f5e"; // rose
    textColor = "text-rose-400";
    badgeBg = "bg-rose-950/80 border-rose-500/50 text-rose-300";
    glowClass = "cyber-glow-rose";
    Icon = ShieldAlert;
    friendlyVerdict = "High Risk — Likely a Recruitment Scam";
    friendlyBadge = "Dangerous: Do Not Pay";
  } else if (score < 60 || riskLevel === "Suspicious") {
    strokeColor = "#f59e0b"; // amber
    textColor = "text-amber-400";
    badgeBg = "bg-amber-950/80 border-amber-500/50 text-amber-300";
    glowClass = "cyber-glow";
    Icon = AlertTriangle;
    friendlyVerdict = "Suspicious — Proceed with Extreme Caution";
    friendlyBadge = "Warning Signs Found";
  } else if (score < 80 || riskLevel === "Moderate") {
    strokeColor = "#38bdf8"; // sky
    textColor = "text-sky-400";
    badgeBg = "bg-sky-950/80 border-sky-500/50 text-sky-300";
    glowClass = "cyber-glow";
    Icon = ShieldCheck;
    friendlyVerdict = "Moderate Risk — Verify Company Directly";
    friendlyBadge = "Needs Verification";
  }

  // SVG Circle calculations
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className={`bg-[#111827]/95 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl relative overflow-hidden backdrop-blur-md ${glowClass}`}>
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        
        {/* Left: Circular Score Gauge */}
        <div className="relative flex items-center justify-center shrink-0">
          <svg className="w-36 h-36 transform -rotate-90" viewBox="0 0 160 160">
            {/* Background Track */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke="#1e293b"
              strokeWidth="12"
              fill="transparent"
            />
            {/* Progress Stroke */}
            <circle
              cx="80"
              cy="80"
              r={radius}
              stroke={strokeColor}
              strokeWidth="12"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              strokeLinecap="round"
              fill="transparent"
              className="transition-all duration-1000 ease-out"
            />
          </svg>

          {/* Centered Score */}
          <div className="absolute flex flex-col items-center justify-center text-center">
            <span className={`text-4xl font-extrabold font-mono tracking-tighter ${textColor}`}>
              {score}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
              Safety Score
            </span>
          </div>
        </div>

        {/* Right: Plain-English Verdict */}
        <div className="flex-1 text-center md:text-left space-y-2.5">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border ${badgeBg}`}>
              <Icon className="w-3.5 h-3.5" />
              <span>{friendlyBadge}</span>
            </span>
            <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded bg-slate-900 border border-slate-800">
              Score: {score} out of 100
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-slate-100 tracking-tight">
            {friendlyVerdict}
          </h3>

          <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
            {summary}
          </p>

          <div className="pt-1 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: strokeColor }}></span>
              <span>Explainable Safety Assessment</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>Free Candidate Protection</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
