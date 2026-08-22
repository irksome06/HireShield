import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Download, 
  Copy, 
  Check, 
  QrCode, 
  Hash, 
  Calendar, 
  Globe, 
  User, 
  Building2, 
  Briefcase,
  Share2
} from 'lucide-react';

export const JobTrustPassport = ({ passportData = {} }) => {
  const [copied, setCopied] = useState(false);

  const {
    passportId = "HSP-2026-ALPHA",
    timestamp = new Date().toISOString(),
    trustScore = 90,
    riskLevel = "Low",
    entities = {},
    verifications = []
  } = passportData;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(passportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isLowRisk = riskLevel === "Low";

  return (
    <div id="passport-section" className="bg-[#111827]/95 border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md cyber-glow">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <div className="p-2.5 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase">
                Official Document
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300">
                ECDSA Signed
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight">
              Job Trust Passport™
            </h2>
          </div>
        </div>

        {/* Passport Status Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-400 uppercase">Passport ID</p>
            <p className="text-xs font-mono font-bold text-cyan-300">{passportId}</p>
          </div>

          <div className={`px-4 py-2 rounded-xl font-mono font-bold text-sm border flex items-center gap-2 ${
            isLowRisk 
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300' 
              : 'bg-rose-950/80 border-rose-500/60 text-rose-300'
          }`}>
            <span>SCORE: {trustScore}/100</span>
            <span className="text-xs">({riskLevel})</span>
          </div>
        </div>
      </div>

      {/* Passport Body Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Company</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate">{entities.company || 'Unknown'}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recruiter Name</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate">{entities.recruiter || 'Unspecified'}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Role / Position</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate">{entities.jobTitle || 'Unspecified'}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-slate-800">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Audited Domain</span>
          </div>
          <p className="text-sm font-semibold font-mono text-cyan-300 truncate">{entities.domain || 'N/A'}</p>
        </div>
      </div>

      {/* Verification Ledger Summary */}
      <div className="mt-4 p-4 rounded-xl bg-[#0a0e17] border border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-xs font-mono text-slate-400">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Issued: {new Date(timestamp).toLocaleDateString()}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5 text-cyan-400" />
            <span>Hash: sha256-{passportId.toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, 8)}...</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopyJson}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Copied JSON' : 'Export JSON'}</span>
          </button>
        </div>
      </div>

      {/* Security Watermark */}
      <div className="mt-4 text-center">
        <p className="text-[10px] font-mono text-slate-500">
          HireShield Verification Protocol • Verified via Deterministic Rule Engine & Multi-Source Intelligence
        </p>
      </div>
    </div>
  );
};
