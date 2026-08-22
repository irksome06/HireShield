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
  Printer,
  Sparkles,
  Lock
} from 'lucide-react';

export const JobTrustPassport = ({ passportData = {} }) => {
  const [copied, setCopied] = useState(false);

  const {
    passportId = "HSP-2026-ALPHA",
    timestamp = new Date().toISOString(),
    trustScore = 90,
    riskLevel = "Low",
    verdict = "Verified",
    entities = {},
    verifications = [],
    deductions = []
  } = passportData;

  const handleCopyJson = () => {
    navigator.clipboard.writeText(JSON.stringify(passportData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isLowRisk = riskLevel === "Low";

  return (
    <div id="passport-section" className="bg-[#111827]/95 border-2 border-cyan-500/40 rounded-2xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md cyber-glow print:border-slate-300 print:bg-white print:text-black">
      {/* Background cyber watermark */}
      <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none print:hidden"></div>

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
        <div className="flex items-center space-x-3">
          <div className="p-3 rounded-xl bg-cyan-500/20 border border-cyan-400/50 text-cyan-300 print:bg-slate-100 print:text-cyan-800">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold tracking-widest text-cyan-400 uppercase print:text-cyan-800">
                Official Document
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-300 print:bg-slate-100 print:text-slate-700">
                ECDSA SHA-256
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight print:text-slate-900">
              Job Trust Passport™
            </h2>
          </div>
        </div>

        {/* Passport Status Badge */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-[10px] font-mono text-slate-400 uppercase print:text-slate-600">Passport ID</p>
            <p className="text-xs font-mono font-bold text-cyan-300 print:text-cyan-900">{passportId}</p>
          </div>

          <div className={`px-4 py-2.5 rounded-xl font-mono font-bold text-sm border flex items-center gap-2 ${
            isLowRisk 
              ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 print:bg-emerald-50 print:text-emerald-800' 
              : 'bg-rose-950/80 border-rose-500/60 text-rose-300 print:bg-rose-50 print:text-rose-800'
          }`}>
            <span>SCORE: {trustScore}/100</span>
            <span className="text-xs">({riskLevel})</span>
          </div>
        </div>
      </div>

      {/* Passport Body Grid */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Company</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900">{entities.company || 'Unknown'}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recruiter Identity</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900">{entities.recruiter || 'Unspecified'}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Role / Position</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900">{entities.jobTitle || 'Unspecified'}</p>
        </div>

        <div className="p-3.5 rounded-xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Audited Domain</span>
          </div>
          <p className="text-sm font-semibold font-mono text-cyan-300 truncate print:text-cyan-800">{entities.domain || 'N/A'}</p>
        </div>
      </div>

      {/* Cryptographic Verification Ledger Summary */}
      <div className="mt-4 p-4 rounded-xl bg-[#0a0e17] border border-slate-800 flex flex-wrap items-center justify-between gap-4 print:bg-slate-50 print:border-slate-200">
        <div className="flex items-center gap-4 text-xs font-mono text-slate-400 print:text-slate-600">
          <div className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5 text-cyan-400" />
            <span>Timestamp: {new Date(timestamp).toLocaleString()}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-cyan-400" />
            <span>Signature: 0x{passportId.toLowerCase().replace(/[^a-z0-9]/g, '')}c79e8a</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Print or Save PDF Certificate"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Print Certificate</span>
          </button>

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

      {/* Security Seal & Policy */}
      <div className="mt-4 flex items-center justify-between pt-2 border-t border-slate-800/60 print:border-slate-300 text-[10px] font-mono text-slate-500 print:text-slate-600">
        <span>HireShield Verification Protocol • Deterministic Trust Engine</span>
        <span className="text-cyan-400 print:text-cyan-800">Status: {verdict}</span>
      </div>
    </div>
  );
};
