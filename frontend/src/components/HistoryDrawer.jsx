import React from 'react';
import { X, History, Clock, ShieldCheck, ShieldAlert, AlertTriangle, ArrowRight, Trash2 } from 'lucide-react';

export const HistoryDrawer = ({ isOpen, onClose, history = [], onSelectHistoryItem, onClearHistory }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0d131f] border-l border-slate-800 shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
          
          {/* Header */}
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <History className="w-5 h-5 text-cyan-400" />
                <h2 className="text-lg font-bold text-slate-100">Audit History Log</h2>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* List */}
            <div className="mt-4 space-y-3">
              {history.length === 0 ? (
                <div className="py-12 text-center text-slate-500 text-xs">
                  <Clock className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>No job audits logged in this session yet.</p>
                </div>
              ) : (
                history.map((item, index) => {
                  const isHigh = item.result?.riskLevel === "High";
                  const isSuspicious = item.result?.riskLevel === "Suspicious";
                  const isLow = item.result?.riskLevel === "Low";

                  return (
                    <div
                      key={index}
                      onClick={() => { onSelectHistoryItem(item); onClose(); }}
                      className="p-3.5 rounded-xl bg-[#111827] border border-slate-800 hover:border-cyan-500/50 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between gap-2 mb-1.5">
                        <span className="text-xs font-bold text-slate-100 truncate group-hover:text-cyan-300 transition-colors">
                          {item.result?.entities?.company || item.title || 'Job Threat Inspection'}
                        </span>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold ${
                          isHigh 
                            ? 'bg-rose-950/80 text-rose-300 border border-rose-800/80' 
                            : isSuspicious 
                            ? 'bg-amber-950/80 text-amber-300 border border-amber-800/80' 
                            : 'bg-emerald-950/80 text-emerald-300 border border-emerald-800/80'
                        }`}>
                          Score {item.result?.trustScore}
                        </span>
                      </div>

                      <p className="text-[11px] text-slate-400 line-clamp-2">
                        {item.jobMessage?.slice(0, 100) || item.url || 'Analyzed content'}
                      </p>

                      <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[10px] font-mono text-slate-500">
                        <span>{item.result?.passportId || `HSP-LOG-${index + 1}`}</span>
                        <span className="text-cyan-400 group-hover:translate-x-0.5 transition-transform flex items-center gap-1">
                          Load Audit <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Footer actions */}
          {history.length > 0 && (
            <div className="pt-4 border-t border-slate-800">
              <button
                type="button"
                onClick={onClearHistory}
                className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-rose-950/30 text-slate-400 hover:text-rose-400 border border-slate-800 hover:border-rose-800/50 text-xs font-mono flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Audit Cache</span>
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
