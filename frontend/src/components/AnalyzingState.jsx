import React, { useEffect, useState } from 'react';
import { ShieldAlert, Loader2, CheckCircle2, Search, Building2, Globe, FileWarning } from 'lucide-react';

export const AnalyzingState = () => {
  const [step, setStep] = useState(0);

  const steps = [
    { text: "Reading job message and extracting recruiter details...", icon: Search },
    { text: "Verifying company authenticity & website domain...", icon: Globe },
    { text: "Scanning for fake equipment fees, OTP traps, and red flags...", icon: FileWarning },
    { text: "Generating your plain-English Job Safety Report...", icon: CheckCircle2 },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 450);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-[#111827]/95 border border-cyan-500/30 rounded-2xl p-8 text-center shadow-2xl backdrop-blur-md cyber-glow max-w-xl mx-auto my-8 animate-fadeIn">
      {/* Radar scanning pulse */}
      <div className="relative w-20 h-20 mx-auto mb-6 flex items-center justify-center">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-25"></span>
        <span className="relative inline-flex rounded-full h-16 w-16 bg-cyan-950/80 border border-cyan-500/50 items-center justify-center text-cyan-400">
          <Loader2 className="w-8 h-8 animate-spin" />
        </span>
      </div>

      <h3 className="text-xl font-bold text-slate-100 tracking-tight mb-2">
        Scanning Job Offer for Scams...
      </h3>
      <p className="text-xs text-slate-400 mb-6">
        Running security checks across domain registries, recruiter identities, and known scam patterns.
      </p>

      {/* Checklist items */}
      <div className="space-y-3 text-left max-w-md mx-auto">
        {steps.map((s, idx) => {
          const isDone = idx < step;
          const isCurrent = idx === step;
          const IconComp = s.icon;

          return (
            <div 
              key={idx}
              className={`flex items-center gap-3 p-2.5 rounded-xl border transition-all ${
                isDone 
                  ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-300' 
                  : isCurrent 
                  ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-200 ring-1 ring-cyan-500/30' 
                  : 'bg-slate-900/40 border-slate-800/50 text-slate-500 opacity-60'
              }`}
            >
              <div className="shrink-0">
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                ) : isCurrent ? (
                  <Loader2 className="w-4 h-4 text-cyan-400 animate-spin" />
                ) : (
                  <IconComp className="w-4 h-4 text-slate-500" />
                )}
              </div>
              <span className="text-xs font-medium">{s.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
