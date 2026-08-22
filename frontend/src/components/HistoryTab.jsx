import React, { useState } from 'react';
import { 
  History, 
  Search, 
  ShieldAlert, 
  ShieldCheck, 
  AlertTriangle, 
  ArrowRight, 
  Trash2, 
  Calendar, 
  Building2, 
  Globe, 
  Layers
} from 'lucide-react';

export const HistoryTab = ({ 
  history = [], 
  onSelectHistoryItem, 
  onClearHistory,
  onSwitchToScanner 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterRisk, setFilterRisk] = useState('all'); // 'all', 'high', 'suspicious', 'low'

  // Filter and search logic
  const filteredHistory = history.filter(item => {
    const company = (item.result?.entities?.company || item.title || '').toLowerCase();
    const role = (item.result?.entities?.jobTitle || item.result?.entities?.job_title || '').toLowerCase();
    const domain = (item.result?.entities?.domain || item.url || '').toLowerCase();
    const message = (item.jobMessage || '').toLowerCase();
    const passportId = (item.result?.passportId || item.result?.passport_id || '').toLowerCase();
    const q = searchQuery.toLowerCase().trim();

    const matchesSearch = !q || company.includes(q) || role.includes(q) || domain.includes(q) || message.includes(q) || passportId.includes(q);

    if (!matchesSearch) return false;

    const risk = item.result?.riskLevel || item.result?.risk_level;
    if (filterRisk === 'high') return risk === 'High';
    if (filterRisk === 'suspicious') return risk === 'Suspicious' || risk === 'Moderate';
    if (filterRisk === 'low') return risk === 'Low';

    return true;
  });

  // Calculate statistics
  const totalScans = history.length;
  const highRiskCount = history.filter(i => (i.result?.riskLevel || i.result?.risk_level) === 'High').length;
  const suspiciousCount = history.filter(i => ['Suspicious', 'Moderate'].includes(i.result?.riskLevel || i.result?.risk_level)).length;
  const safeCount = history.filter(i => (i.result?.riskLevel || i.result?.risk_level) === 'Low').length;

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* Header & Stats Bar */}
      <div className="bg-[#111827]/95 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-slate-800/80">
          <div>
            <div className="flex items-center gap-2.5">
              <span className="p-2 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                <History className="w-5 h-5" />
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
                Scan History & Audit Logs
              </h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Job offer security assessments saved securely in your persistent database.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onSwitchToScanner}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all cursor-pointer"
            >
              <span>+ Check New Job</span>
            </button>

            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="p-2 text-slate-400 hover:text-rose-400 hover:bg-slate-800/80 rounded-xl border border-slate-800 transition-colors cursor-pointer"
                title="Clear audit log database"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* 3 Quick Summary Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 mt-5">
          <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Total Audits</p>
              <p className="text-xl font-extrabold font-mono text-slate-100 mt-0.5">{totalScans}</p>
            </div>
            <div className="p-2 rounded-xl bg-slate-900 border border-slate-800 text-cyan-400">
              <Layers className="w-5 h-5" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Scams Flagged</p>
              <p className="text-xl font-extrabold font-mono text-rose-400 mt-0.5">{highRiskCount}</p>
            </div>
            <div className="p-2 rounded-xl bg-rose-950/40 border border-rose-800/40 text-rose-400">
              <ShieldAlert className="w-5 h-5" />
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400 font-medium">Verified Safe</p>
              <p className="text-xl font-extrabold font-mono text-emerald-400 mt-0.5">{safeCount}</p>
            </div>
            <div className="p-2 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
          </div>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="bg-[#111827]/95 border border-slate-800 rounded-3xl p-4 sm:p-5 shadow-xl backdrop-blur-md flex flex-col sm:flex-row items-center justify-between gap-3.5">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by company, role, domain..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#0a0e17] border border-slate-800 text-xs sm:text-sm text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
          />
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setFilterRisk('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterRisk === 'all' 
                ? 'bg-slate-800 text-cyan-300 border border-cyan-500/40' 
                : 'bg-[#0a0e17] text-slate-400 hover:text-slate-200 border border-slate-800'
            }`}
          >
            All ({totalScans})
          </button>
          <button
            type="button"
            onClick={() => setFilterRisk('high')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterRisk === 'high' 
                ? 'bg-rose-950/80 text-rose-300 border border-rose-500/60' 
                : 'bg-[#0a0e17] text-slate-400 hover:text-rose-300 border border-slate-800'
            }`}
          >
            🚨 High Risk ({highRiskCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterRisk('suspicious')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterRisk === 'suspicious' 
                ? 'bg-amber-950/80 text-amber-300 border border-amber-500/60' 
                : 'bg-[#0a0e17] text-slate-400 hover:text-amber-300 border border-slate-800'
            }`}
          >
            ⚠️ Caution ({suspiciousCount})
          </button>
          <button
            type="button"
            onClick={() => setFilterRisk('low')}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
              filterRisk === 'low' 
                ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-500/60' 
                : 'bg-[#0a0e17] text-slate-400 hover:text-emerald-300 border border-slate-800'
            }`}
          >
            ✅ Safe ({safeCount})
          </button>
        </div>

      </div>

      {/* History Items Grid / List */}
      {filteredHistory.length === 0 ? (
        <div className="bg-[#111827]/95 border border-slate-800 rounded-3xl p-12 text-center shadow-xl">
          <History className="w-10 h-10 text-slate-600 mx-auto mb-3" />
          <h3 className="text-base font-bold text-slate-200">
            {totalScans === 0 ? "No Scans Recorded Yet" : "No Scans Match Your Filter"}
          </h3>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            {totalScans === 0 
              ? "Run your first job safety scan in the scanner tab to populate your audit database."
              : "Try adjusting your search query or clear the active filter."}
          </p>
          <button
            type="button"
            onClick={onSwitchToScanner}
            className="mt-4 px-5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 text-xs font-medium border border-slate-700 transition-colors cursor-pointer"
          >
            Go to Job Scanner
          </button>
        </div>
      ) : (
        <div className="space-y-3.5">
          {filteredHistory.map((item, idx) => {
            const score = item.result?.trustScore ?? item.result?.trust_score ?? 0;
            const risk = item.result?.riskLevel || item.result?.risk_level || 'Moderate';
            const isHigh = risk === 'High';
            const isSuspicious = risk === 'Suspicious' || risk === 'Moderate';

            let badgeBg = isHigh 
              ? 'bg-rose-950/80 border-rose-500/50 text-rose-300' 
              : isSuspicious 
              ? 'bg-amber-950/80 border-amber-500/50 text-amber-300' 
              : 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300';

            let badgeLabel = isHigh 
              ? 'Dangerous: Do Not Pay' 
              : isSuspicious 
              ? 'Warning Signs Found' 
              : 'Safe to Apply';

            let scoreColor = isHigh ? 'text-rose-400' : isSuspicious ? 'text-amber-400' : 'text-emerald-400';

            const company = item.result?.entities?.company || item.title || 'Job Offer Scan';
            const role = item.result?.entities?.jobTitle || item.result?.entities?.job_title || 'Role unstated';
            const domain = item.result?.entities?.domain || item.url || '';
            const timestamp = item.result?.timestamp || new Date().toISOString();
            const passportId = item.result?.passportId || item.result?.passport_id || `ID: HSP-LOG-${idx + 1}`;

            return (
              <div
                key={idx}
                className="bg-[#111827]/95 border border-slate-800 hover:border-cyan-500/40 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md transition-all group"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  
                  {/* Left Info */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold border ${badgeBg}`}>
                        {badgeLabel}
                      </span>
                      <span className="text-xs font-mono text-slate-400 px-2 py-0.5 rounded-md bg-[#0a0e17] border border-slate-800">
                        {passportId}
                      </span>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-500" />
                        {new Date(timestamp).toLocaleDateString()}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-100 group-hover:text-cyan-300 transition-colors">
                        {company}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 mt-0.5">
                        <span className="flex items-center gap-1 text-slate-300">
                          <Building2 className="w-3.5 h-3.5 text-cyan-400" />
                          {role}
                        </span>
                        {domain && domain !== 'None detected' && (
                          <span className="flex items-center gap-1 font-mono text-slate-400">
                            <Globe className="w-3.5 h-3.5 text-slate-500" />
                            {domain}
                          </span>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed max-w-2xl">
                      {item.result?.summary || item.jobMessage?.slice(0, 140) || 'Safety audit details'}
                    </p>
                  </div>

                  {/* Right Score & View Button */}
                  <div className="flex items-center justify-between md:justify-end gap-5 pt-3 md:pt-0 border-t md:border-t-0 border-slate-800/80">
                    <div className="text-center md:text-right">
                      <div className="flex items-center md:justify-end gap-1">
                        <span className={`text-2xl sm:text-3xl font-extrabold font-mono tracking-tight ${scoreColor}`}>
                          {score}
                        </span>
                        <span className="text-xs text-slate-500 font-mono">/100</span>
                      </div>
                      <span className="text-[10px] uppercase font-mono tracking-wider text-slate-400">
                        Safety Score
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => onSelectHistoryItem(item)}
                      className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all group-hover:border-cyan-500/50 cursor-pointer shrink-0"
                    >
                      <span>View Full Report</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
