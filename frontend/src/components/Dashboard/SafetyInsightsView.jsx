import React, { useState, useEffect } from 'react';
import { 
  ShieldAlert, 
  ExternalLink, 
  Search, 
  TrendingUp, 
  CheckCircle2, 
  AlertTriangle, 
  Globe, 
  Activity, 
  RefreshCw, 
  Lock, 
  Cpu, 
  Info,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { API_BASE } from '../../api/config';

export default function SafetyInsightsView({ onNavigateScanner }) {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Live URL / Threat Lookup State
  const [lookupUrl, setLookupUrl] = useState('');
  const [isLookingUp, setIsLookingUp] = useState(false);
  const [lookupResult, setLookupResult] = useState(null);
  const [lookupError, setLookupError] = useState(null);

  const fetchInsights = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/api/threat-intelligence`);
      if (!res.ok) {
        throw new Error(`API returned HTTP ${res.status}`);
      }
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error('Failed to load threat intelligence:', err);
      setError('Unable to fetch live threat intelligence from the API server. Please verify backend connection.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  useEffect(() => {
    fetchInsights();
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    fetchInsights();
  };

  const handleLookup = async (e) => {
    e.preventDefault();
    if (!lookupUrl.trim()) return;

    setIsLookingUp(true);
    setLookupResult(null);
    setLookupError(null);

    try {
      const res = await fetch(`${API_BASE}/api/threat-intelligence/lookup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: lookupUrl.trim() })
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.detail || 'Lookup query failed');
      }

      const result = await res.json();
      setLookupResult(result);
    } catch (err) {
      setLookupError(err.message || 'Failed to query threat database.');
    } finally {
      setIsLookingUp(false);
    }
  };

  // Loading State
  if (isLoading && !data) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-8 flex flex-col items-center justify-center space-y-4 min-h-[350px]">
          <div className="w-14 h-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 animate-pulse">
            <Radio className="w-7 h-7 animate-spin" />
          </div>
          <div className="text-center space-y-1">
            <h3 className="text-base font-bold text-white">Connecting to Threat Intelligence Stream...</h3>
            <p className="text-xs text-slate-400 font-mono">Syncing with Google Safe Browsing API v4 & WHOIS telemetry</p>
          </div>
        </div>
      </div>
    );
  }

  // Error State
  if (error && !data) {
    return (
      <div className="space-y-6 animate-in fade-in duration-300">
        <div className="rounded-3xl bg-slate-900/80 border border-rose-500/40 p-8 flex flex-col items-center justify-center space-y-4 min-h-[350px] text-center">
          <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400">
            <AlertCircle className="w-7 h-7" />
          </div>
          <div className="space-y-1 max-w-md">
            <h3 className="text-base font-bold text-white">Threat Intelligence API Error</h3>
            <p className="text-xs text-slate-400 leading-relaxed">{error}</p>
          </div>
          <button
            onClick={fetchInsights}
            className="py-2.5 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-bold shadow-md transition-all cursor-pointer flex items-center gap-2"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      </div>
    );
  }

  const summary = data?.summary || { total_inspected: 0, safe_verified: 0, threats_blocked: 0, overall_safety_index: 0 };
  const categories = data?.category_breakdown || {};
  const recentActivity = data?.recent_activity || [];
  const safetyTrends = data?.safety_trends || { safe_percentage: 0, threat_percentage: 0 };

  return (
    <div className="space-y-7 animate-in fade-in duration-300">
      
      {/* Header with Source Badge & Last Updated */}
      <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 backdrop-blur-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-mono font-bold">
            <Radio className="w-3.5 h-3.5 animate-pulse text-cyan-400" />
            <span>Live Threat Intelligence Stream</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Safety Insights & Threat Intelligence</h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Real-time detections from <span className="text-white font-semibold">{data?.source}</span>.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-950/70 border border-slate-800 px-3 py-2 rounded-xl">
            <Clock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Updated: <span className="text-white">{data?.last_updated || 'Live'}</span></span>
          </div>

          <button
            onClick={handleRefresh}
            disabled={isRefreshing}
            className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-all cursor-pointer disabled:opacity-50"
            title="Refresh Intelligence Feed"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin text-cyan-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* Top 4 Real Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Inspected */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider block">Total Scans Inspected</span>
          <p className="text-3xl font-black text-white mt-2 font-mono">{summary.total_inspected}</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Audit pipeline verified</span>
          </p>
        </div>

        {/* Threats Blocked */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <span className="text-xs text-rose-400 font-semibold uppercase tracking-wider block">Threats Isolated</span>
          <p className="text-3xl font-black text-rose-400 mt-2 font-mono">{summary.threats_blocked}</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">Malware, phishing & fee scams</p>
        </div>

        {/* Safe Verified */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <span className="text-xs text-emerald-400 font-semibold uppercase tracking-wider block">High Trust Verified</span>
          <p className="text-3xl font-black text-emerald-400 mt-2 font-mono">{summary.safe_verified}</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">Passports issued</p>
        </div>

        {/* Global Safety Index */}
        <div className="p-5 rounded-3xl bg-slate-900/80 border border-slate-800 backdrop-blur-xl">
          <span className="text-xs text-cyan-400 font-semibold uppercase tracking-wider block">Global Safety Index</span>
          <p className="text-3xl font-black text-cyan-300 mt-2 font-mono">{summary.overall_safety_index}%</p>
          <p className="text-[11px] text-slate-500 mt-1 font-mono">Verified candidate safety ratio</p>
        </div>

      </div>

      {/* ---------------------------------------------------- */}
      {/* REAL-TIME URL & DOMAIN THREAT LOOKUP CONSOLE         */}
      {/* ---------------------------------------------------- */}
      <div className="rounded-3xl bg-slate-900/80 border border-cyan-500/30 p-6 sm:p-7 backdrop-blur-xl space-y-4 cyber-glow">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-md">
              <Search className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">Live Threat Lookup (Google Safe Browsing API)</h3>
              <p className="text-xs text-slate-400">Inspect any recruiter link, domain, or company URL in real-time.</p>
            </div>
          </div>

          <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-cyan-500/10 text-cyan-300 border border-cyan-500/20 font-bold self-start sm:self-auto">
            API v4 Ready
          </span>
        </div>

        <form onSubmit={handleLookup} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Globe className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              required
              value={lookupUrl}
              onChange={(e) => setLookupUrl(e.target.value)}
              placeholder="E.g. careers-stripe.top or http://testsafebrowsing.appspot.com/s/phishing.html"
              className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-700 rounded-2xl text-xs text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none transition-all font-mono"
            />
          </div>

          <button
            type="submit"
            disabled={isLookingUp}
            className="py-3 px-6 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-60 whitespace-nowrap"
          >
            {isLookingUp ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Scanning Google Safe Browsing...</span>
              </>
            ) : (
              <>
                <span>Scan URL</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Lookup Error */}
        {lookupError && (
          <div className="p-3 rounded-2xl bg-rose-950/50 border border-rose-500/30 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
            <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{lookupError}</span>
          </div>
        )}

        {/* Lookup Result Box */}
        {lookupResult && (
          <div className={`p-4 rounded-2xl border text-xs font-mono space-y-2 animate-in fade-in ${
            lookupResult.is_safe
              ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-300'
              : 'bg-rose-950/50 border-rose-500/40 text-rose-300'
          }`}>
            <div className="flex items-center justify-between">
              <span className="font-bold flex items-center gap-2">
                {lookupResult.is_safe ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>STATUS: CLEAN / HIGH TRUST</span>
                  </>
                ) : (
                  <>
                    <ShieldAlert className="w-4 h-4 text-rose-400 animate-bounce" />
                    <span>STATUS: 🚨 CRITICAL THREAT DETECTED</span>
                  </>
                )}
              </span>
              <span className="text-[10px] text-slate-400">{lookupResult.source}</span>
            </div>

            <p className="text-slate-300 text-[11px]">{lookupResult.details}</p>
            {lookupResult.threat_types?.length > 0 && (
              <div className="flex items-center gap-2 pt-1">
                <span className="text-[10px] text-slate-400">Classifications:</span>
                {lookupResult.threat_types.map((t, idx) => (
                  <span key={idx} className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 border border-rose-500/30 text-[10px] font-bold">
                    {t}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Grid: Threat Categories & Recent Detections */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Real Threat Categories Breakdown */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Real-Time Threat Vector Categories</span>
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Telemetry Feed</span>
          </div>

          <div className="space-y-3.5">
            {Object.entries(categories).map(([categoryName, count], idx) => {
              const total = summary.threats_blocked || 1;
              const percentage = summary.threats_blocked > 0 ? Math.round((count / total) * 100) : 0;

              return (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs">
                    <span className="text-slate-300 font-medium">{categoryName}</span>
                    <span className="font-mono text-cyan-400 font-bold">{count} ({percentage}%)</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                    <div 
                      className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Recent Real Activity Log */}
        <div className="rounded-3xl bg-slate-900/80 border border-slate-800 p-6 sm:p-7 backdrop-blur-xl space-y-5 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-rose-400" />
                <span>Recent Threat Activity Feed</span>
              </h3>
              <span className="text-[10px] font-mono text-slate-400">Real Scans</span>
            </div>

            {recentActivity.length > 0 ? (
              <div className="space-y-2.5 max-h-[260px] overflow-y-auto pr-1">
                {recentActivity.map((item, idx) => (
                  <div key={idx} className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-3 text-xs">
                    <div className="space-y-0.5 truncate">
                      <p className="font-bold text-white truncate">{item.domain}</p>
                      <p className="text-[10px] text-slate-400 font-mono">{item.category} • {item.timestamp}</p>
                    </div>

                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20 shrink-0">
                      {item.risk_level}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-8 rounded-2xl bg-slate-950/40 border border-slate-800 text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <p className="text-xs font-bold text-white">No Critical Threats Detected</p>
                <p className="text-[11px] text-slate-400">Scanned offers are safe or pending inspection.</p>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
            <span className="text-slate-500 font-mono">Deterministic Engine Telemetry</span>
            {onNavigateScanner && (
              <button
                onClick={onNavigateScanner}
                className="text-cyan-400 hover:text-cyan-300 font-semibold flex items-center gap-1 cursor-pointer"
              >
                <span>Run New Job Scan</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
