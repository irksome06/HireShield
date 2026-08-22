import React from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, CheckCircle, ExternalLink, LifeBuoy } from 'lucide-react';

export const SafetyRecommendationsCard = ({ recommendations = [], riskLevel = "Low" }) => {
  const isHighRisk = riskLevel === "High" || riskLevel === "Suspicious";

  return (
    <div className={`rounded-2xl p-5 sm:p-6 border shadow-xl backdrop-blur-sm ${
      isHighRisk 
        ? 'bg-rose-950/15 border-rose-900/60' 
        : 'bg-emerald-950/15 border-emerald-900/60'
    }`}>
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800/80">
        <div className={`p-1.5 rounded-lg ${
          isHighRisk 
            ? 'bg-rose-950/80 text-rose-400 border border-rose-800' 
            : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
        }`}>
          {isHighRisk ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-100">Candidate Action Protocol & Advisory</h3>
          <p className="text-xs text-slate-400">Step-by-step guidance based on evaluated risk level</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {recommendations.map((rec, i) => (
          <div key={i} className="flex items-start gap-2.5 text-xs text-slate-200">
            <ArrowRight className={`w-3.5 h-3.5 mt-0.5 shrink-0 ${
              isHighRisk ? 'text-rose-400' : 'text-emerald-400'
            }`} />
            <span className="leading-relaxed">{rec}</span>
          </div>
        ))}
      </div>

      {isHighRisk && (
        <div className="mt-4 pt-3 border-t border-rose-900/40 flex flex-wrap items-center justify-between gap-2 text-[11px]">
          <span className="text-rose-300 font-medium">Suspect you were targeted by this entity?</span>
          <div className="flex items-center gap-3 font-mono">
            <a 
              href="https://reportfraud.ftc.gov/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              Report to FTC <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://safebrowsing.google.com/safebrowsing/report_phish/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-cyan-400 hover:underline flex items-center gap-1"
            >
              Google Phish Report <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
