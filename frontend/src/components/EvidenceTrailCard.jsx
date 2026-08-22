import React, { useState } from 'react';
import { 
  FileSpreadsheet, 
  MinusCircle, 
  CheckCircle2, 
  AlertOctagon, 
  ShieldCheck, 
  HelpCircle,
  ExternalLink,
  Search,
  Filter
} from 'lucide-react';

export const EvidenceTrailCard = ({ deductions = [], verifications = [] }) => {
  const [filter, setFilter] = useState('all'); // 'all', 'critical', 'high'

  const filteredDeductions = deductions.filter(d => {
    if (filter === 'critical') return d.severity === 'Critical';
    if (filter === 'high') return d.severity === 'Critical' || d.severity === 'High';
    return true;
  });

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
      
      {/* Left: Deductions Breakdown (7 cols) */}
      <div className="lg:col-span-7 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-4 border-b border-slate-800/80 gap-3">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-rose-950/60 border border-rose-800/50 text-rose-400">
              <AlertOctagon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Deterministic Deduction Audit</h3>
              <p className="text-xs text-slate-400">Point breakdown calculated directly from rule-based risk triggers</p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1 bg-[#0a0e17] p-1 rounded-lg border border-slate-800 self-start sm:self-auto">
            <button
              type="button"
              onClick={() => setFilter('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                filter === 'all' ? 'bg-slate-800 text-cyan-300 font-bold' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              All ({deductions.length})
            </button>
            <button
              type="button"
              onClick={() => setFilter('high')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                filter === 'high' ? 'bg-amber-950/80 text-amber-300 font-bold border border-amber-800/60' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              High+
            </button>
            <button
              type="button"
              onClick={() => setFilter('critical')}
              className={`px-2 py-0.5 rounded text-[11px] font-mono transition-colors ${
                filter === 'critical' ? 'bg-rose-950/80 text-rose-300 font-bold border border-rose-800/60' : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              Critical
            </button>
          </div>
        </div>

        {deductions.length === 0 ? (
          <div className="p-6 rounded-xl bg-emerald-950/20 border border-emerald-800/40 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-emerald-300">Clean Audit — 0 Penalties Deducted</p>
            <p className="text-xs text-slate-400 mt-1">No malicious keywords, financial demands, or domain anomalies found.</p>
          </div>
        ) : filteredDeductions.length === 0 ? (
          <div className="p-6 rounded-xl bg-slate-900/50 border border-slate-800 text-center text-xs text-slate-400">
            No deductions match the selected severity filter.
          </div>
        ) : (
          <div className="space-y-3">
            {filteredDeductions.map((item) => (
              <div 
                key={item.id}
                className="p-3.5 rounded-xl bg-[#0d131f] border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100">{item.signal}</span>
                      <span className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded border ${
                        item.severity === 'Critical' 
                          ? 'bg-rose-950/80 border-rose-800 text-rose-300' 
                          : item.severity === 'High' 
                          ? 'bg-amber-950/80 border-amber-800 text-amber-300' 
                          : 'bg-slate-800 border-slate-700 text-slate-300'
                      }`}>
                        {item.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {item.description}
                    </p>
                  </div>

                  <span className="text-sm font-extrabold font-mono text-rose-400 px-2 py-1 rounded bg-rose-950/40 border border-rose-800/40 shrink-0">
                    {item.penalty} pts
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Right: External Intelligence Verifications (5 cols) */}
      <div className="lg:col-span-5 bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-100">Intelligence Verifications</h3>
              <p className="text-xs text-slate-400">External telemetry & registry checks</p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {verifications.map((v, i) => {
            const isPass = v.status === 'Passed';
            const isFail = v.status === 'Failed';
            const isWarn = v.status === 'Warning';

            return (
              <div 
                key={i}
                className="p-3 rounded-xl bg-[#0d131f] border border-slate-800/80 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-200">{v.name}</span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                    isPass 
                      ? 'bg-emerald-950/60 text-emerald-400 border border-emerald-800/50' 
                      : isFail 
                      ? 'bg-rose-950/60 text-rose-400 border border-rose-800/50' 
                      : 'bg-amber-950/60 text-amber-400 border border-amber-800/50'
                  }`}>
                    {v.status}
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 font-mono">
                  {v.detail}
                </p>
              </div>
            );
          })}
        </div>

        <div className="mt-4 p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-[11px] text-slate-400">
          <span className="text-cyan-400 font-semibold">Integrity Policy:</span> HireShield never fabricates verification data. When external APIs are unreachable, deterministic rule-based checks take precedence.
        </div>
      </div>

    </div>
  );
};
