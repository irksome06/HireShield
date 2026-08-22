import React from 'react';
import { ShieldCheck, AlertTriangle, ArrowRight, ExternalLink, CheckCircle2 } from 'lucide-react';

export const SafetyRecommendationsCard = ({ recommendations = [], riskLevel = "Low" }) => {
  const isHighRisk = riskLevel === "High" || riskLevel === "Suspicious";

  return (
    <div className={`rounded-3xl p-5 sm:p-6 border shadow-xl backdrop-blur-md ${
      isHighRisk 
        ? 'bg-rose-950/20 border-rose-800/60' 
        : 'bg-emerald-950/20 border-emerald-800/60'
    }`}>
      <div className="flex items-center gap-2 pb-4 mb-4 border-b border-slate-800/80">
        <div className={`p-1.5 rounded-xl ${
          isHighRisk 
            ? 'bg-rose-950/80 text-rose-400 border border-rose-800' 
            : 'bg-emerald-950/80 text-emerald-400 border border-emerald-800'
        }`}>
          {isHighRisk ? <AlertTriangle className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
        </div>
        <div>
          <h3 className="text-base font-bold text-slate-100">What You Should Do Next</h3>
          <p className="text-xs text-slate-400">Step-by-step safety advice for this specific offer</p>
        </div>
      </div>

      <div className="space-y-2.5">
        {recommendations.map((rec, i) => (
          <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-200">
            <ArrowRight className={`w-4 h-4 mt-0.5 shrink-0 ${
              isHighRisk ? 'text-rose-400' : 'text-emerald-400'
            }`} />
            <span className="leading-relaxed">{rec}</span>
          </div>
        ))}
      </div>

      {isHighRisk && (
        <div className="mt-4 pt-3.5 border-t border-rose-900/40 flex flex-wrap items-center justify-between gap-3 text-xs">
          <span className="text-rose-300 font-medium">Suspect you received a scam offer?</span>
          <div className="flex items-center gap-3">
            <a 
              href="https://reportfraud.ftc.gov/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-cyan-400 hover:underline flex items-center gap-1 font-medium"
            >
              Report to FTC <ExternalLink className="w-3 h-3" />
            </a>
            <a 
              href="https://safebrowsing.google.com/safebrowsing/report_phish/" 
              target="_blank" 
              rel="noreferrer" 
              className="text-cyan-400 hover:underline flex items-center gap-1 font-medium"
            >
              Report Phishing Link <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
};
