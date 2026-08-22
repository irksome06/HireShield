import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Copy, 
  Check, 
  Printer, 
  Building2, 
  User, 
  Briefcase, 
  Globe, 
  Calendar,
  Share2
} from 'lucide-react';

export const JobTrustPassport = ({ passportData = {} }) => {
  const [copied, setCopied] = useState(false);

  const {
    passportId = "HSP-2026-ALPHA",
    timestamp = new Date().toISOString(),
    trustScore = 90,
    riskLevel = "Low",
    verdict = "Verified",
    entities = {}
  } = passportData;

  const handleCopySummary = () => {
    const summaryText = `🛡️ HireShield Job Safety Report
Report ID: ${passportId}
Safety Score: ${trustScore}/100 (${riskLevel} Risk)
Company: ${entities.company || 'Unknown'}
Recruiter: ${entities.recruiter || 'Not specified'}
Role: ${entities.jobTitle || 'Not specified'}
Website: ${entities.domain || 'N/A'}
Verdict: ${verdict}
Scanned on HireShield: Free AI Job Scam Detector`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const isLowRisk = riskLevel === "Low";

  return (
    <div id="report-certificate" className="bg-[#111827]/95 border border-cyan-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md cyber-glow print:border-slate-300 print:bg-white print:text-black">
      
      {/* Certificate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
        <div className="flex items-center space-x-3.5">
          <div className="p-3 rounded-2xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-300 print:bg-slate-100 print:text-cyan-800">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold tracking-wider text-cyan-400 uppercase print:text-cyan-800">
                Official Safety Report
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono print:bg-slate-100 print:text-slate-700">
                ID: {passportId}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight print:text-slate-900 mt-0.5">
              Job Safety Certificate
            </h2>
          </div>
        </div>

        {/* Big Score Badge */}
        <div className={`px-4 py-2 rounded-2xl font-bold text-sm border flex items-center gap-2 self-start sm:self-auto ${
          isLowRisk 
            ? 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300 print:bg-emerald-50 print:text-emerald-800' 
            : 'bg-rose-950/80 border-rose-500/60 text-rose-300 print:bg-rose-50 print:text-rose-800'
        }`}>
          <span>SCORE: {trustScore}/100</span>
          <span className="text-xs font-normal">({riskLevel} Risk)</span>
        </div>
      </div>

      {/* Grid of Verified Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Company</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900">{entities.company || 'Unknown'}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recruiter Name</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900">{entities.recruiter || 'Not specified'}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Role / Position</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900">{entities.jobTitle || 'Not specified'}</p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Website Domain</span>
          </div>
          <p className="text-sm font-semibold font-mono text-cyan-300 truncate print:text-cyan-800">{entities.domain || 'N/A'}</p>
        </div>
      </div>

      {/* Footer Details & Action Buttons */}
      <div className="mt-4 p-4 rounded-2xl bg-[#0a0e17] border border-slate-800 flex flex-wrap items-center justify-between gap-3 print:bg-slate-50 print:border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-400 print:text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Scanned on: {new Date(timestamp).toLocaleDateString()}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 print:hidden">
          <button
            type="button"
            onClick={handlePrint}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
            title="Save as PDF or Print"
          >
            <Printer className="w-3.5 h-3.5 text-cyan-400" />
            <span>Save / Print PDF</span>
          </button>

          <button
            type="button"
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors cursor-pointer"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-cyan-400" />}
            <span>{copied ? 'Copied Summary' : 'Copy Summary'}</span>
          </button>
        </div>
      </div>

    </div>
  );
};
