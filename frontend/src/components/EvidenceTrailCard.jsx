import React from 'react';
import { AlertOctagon, ShieldCheck, AlertTriangle } from 'lucide-react';

export const EvidenceTrailCard = ({ deductions = [] }) => {
  return (
    <div className="bg-[#111827]/95 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-rose-500/20 text-rose-400 border border-rose-500/30">
            <AlertOctagon className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Warning Signs & Red Flags</h3>
            <p className="text-xs text-slate-400">Why this job offer lost points in the safety scan</p>
          </div>
        </div>
        <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${
          deductions.length > 0 
            ? 'bg-rose-950/80 border-rose-800 text-rose-300' 
            : 'bg-emerald-950/80 border-emerald-800 text-emerald-300'
        }`}>
          {deductions.length === 0 ? '0 Warnings Found' : `${deductions.length} Warning Signs`}
        </span>
      </div>

      {deductions.length === 0 ? (
        <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-800/40 text-center">
          <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-emerald-300">Clean Scan — Zero Scam Red Flags Detected</p>
          <p className="text-xs text-slate-400 mt-1">
            No upfront fees, fake domains, or urgent personal data requests were found in this offer.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {deductions.map((item) => (
            <div 
              key={item.id}
              className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800/80 hover:border-slate-700 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-slate-100">{item.signal}</span>
                  <span className={`text-[10px] font-semibold uppercase px-2 py-0.2 rounded-full border ${
                    item.severity === 'Critical' 
                      ? 'bg-rose-950/80 border-rose-700 text-rose-300' 
                      : item.severity === 'High' 
                      ? 'bg-amber-950/80 border-amber-700 text-amber-300' 
                      : 'bg-slate-800 border-slate-700 text-slate-300'
                  }`}>
                    {item.severity} Risk
                  </span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
                  {item.description}
                </p>
              </div>

              <div className="shrink-0 self-start sm:self-auto">
                <span className="text-xs font-mono font-bold text-rose-400 px-2.5 py-1 rounded-lg bg-rose-950/40 border border-rose-800/50">
                  {item.penalty} pts
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
