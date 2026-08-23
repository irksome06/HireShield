import React, { useState } from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  AlertTriangle,
  Copy, 
  Check, 
  Printer, 
  Building2, 
  User, 
  Briefcase, 
  Globe, 
  Calendar
} from 'lucide-react';

export const JobTrustPassport = ({ 
  passportData,
  passportId,
  company,
  trustScore,
  riskLevel,
  riskColor,
  verdict,
  timestamp,
  entities
}) => {
  const [copied, setCopied] = useState(false);

  const data = passportData || {};
  const finalPassportId = passportId || data.passportId || data.passport_id || "HSP-2026-ALPHA";
  const finalTimestamp = timestamp || data.timestamp || new Date().toISOString();
  
  const finalTrustScore = trustScore !== undefined 
    ? trustScore 
    : (data.trustScore !== undefined 
      ? data.trustScore 
      : (data.trust_score !== undefined ? data.trust_score : 100));
  
  const finalRiskLevel = riskLevel || data.riskLevel || data.risk_level || (
    finalTrustScore < 35 ? "High" :
    finalTrustScore < 60 ? "Suspicious" :
    finalTrustScore < 80 ? "Moderate" : "Low"
  );
  
  const finalVerdict = verdict || data.verdict || (
    finalRiskLevel === "High" ? "High Risk — Likely Recruitment Scam" :
    finalRiskLevel === "Suspicious" ? "Suspicious — Warning Signs Detected" :
    finalRiskLevel === "Moderate" ? "Moderate Risk — Verify Directly" : "Verified Safe Job Opportunity"
  );

  const finalEntities = entities || data.entities || {};

  // Extract friendly display strings
  const companyDisplay = (finalEntities.company && finalEntities.company !== 'Not detected')
    ? finalEntities.company
    : (company && company !== 'Verified Entity' && company !== 'Not detected' ? company : 'Not detected');

  const recruiterDisplay = (finalEntities.recruiter && finalEntities.recruiter !== 'Not detected')
    ? finalEntities.recruiter
    : 'Not specified';

  const roleDisplay = (finalEntities.jobTitle || finalEntities.job_title) && (finalEntities.jobTitle !== 'Not specified' && finalEntities.job_title !== 'Not specified')
    ? (finalEntities.jobTitle || finalEntities.job_title)
    : 'Not specified';

  const domainDisplay = (finalEntities.domain && finalEntities.domain !== 'None detected')
    ? finalEntities.domain
    : 'N/A';

  const isHighRisk = finalRiskLevel === "High" || finalTrustScore < 35;
  const isSuspicious = finalRiskLevel === "Suspicious" || (finalTrustScore >= 35 && finalTrustScore < 60);
  const isModerate = finalRiskLevel === "Moderate" || (finalTrustScore >= 60 && finalTrustScore < 80);

  // Dynamic Theme based on Security Risk
  let theme = {
    badgeText: 'Official Safety Report',
    title: 'Job Safety Certificate',
    containerBorder: 'border-cyan-500/30',
    containerGlow: 'cyber-glow',
    iconBg: 'bg-cyan-500/20 border-cyan-400/40 text-cyan-300',
    icon: ShieldCheck,
    scoreBadge: 'bg-emerald-950/80 border-emerald-500/60 text-emerald-300',
    headerText: 'text-cyan-400'
  };

  if (isHighRisk) {
    theme = {
      badgeText: 'Official Threat Report',
      title: 'Job Threat & Scam Certificate',
      containerBorder: 'border-rose-500/40',
      containerGlow: 'cyber-glow-rose',
      iconBg: 'bg-rose-500/20 border-rose-400/40 text-rose-300',
      icon: ShieldAlert,
      scoreBadge: 'bg-rose-950/80 border-rose-500/60 text-rose-300',
      headerText: 'text-rose-400'
    };
  } else if (isSuspicious) {
    theme = {
      badgeText: 'Security Warning Report',
      title: 'Job Risk Advisory Certificate',
      containerBorder: 'border-amber-500/40',
      containerGlow: 'cyber-glow',
      iconBg: 'bg-amber-500/20 border-amber-400/40 text-amber-300',
      icon: AlertTriangle,
      scoreBadge: 'bg-amber-950/80 border-amber-500/60 text-amber-300',
      headerText: 'text-amber-400'
    };
  } else if (isModerate) {
    theme = {
      badgeText: 'Security Audit Report',
      title: 'Job Security Certificate',
      containerBorder: 'border-sky-500/40',
      containerGlow: 'cyber-glow',
      iconBg: 'bg-sky-500/20 border-sky-400/40 text-sky-300',
      icon: ShieldCheck,
      scoreBadge: 'bg-sky-950/80 border-sky-500/60 text-sky-300',
      headerText: 'text-sky-400'
    };
  }

  const HeaderIcon = theme.icon;

  const handleCopySummary = () => {
    const summaryText = `🛡️ HireShield Job Safety Report
Report ID: ${finalPassportId}
Safety Score: ${finalTrustScore}/100 (${finalRiskLevel} Risk)
Company: ${companyDisplay}
Recruiter: ${recruiterDisplay}
Role: ${roleDisplay}
Website: ${domainDisplay}
Verdict: ${finalVerdict}
Scanned on HireShield: Free AI Job Scam Detector`;

    navigator.clipboard.writeText(summaryText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div id="report-certificate" className={`bg-[#111827]/95 border ${theme.containerBorder} rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden backdrop-blur-md ${theme.containerGlow} print:border-slate-300 print:bg-white print:text-black`}>
      
      {/* Certificate Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800 print:border-slate-300">
        <div className="flex items-center space-x-3.5">
          <div className={`p-3 rounded-2xl border ${theme.iconBg} print:bg-slate-100 print:text-cyan-800`}>
            <HeaderIcon className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className={`text-xs font-semibold tracking-wider ${theme.headerText} uppercase print:text-cyan-800`}>
                {theme.badgeText}
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono print:bg-slate-100 print:text-slate-700">
                ID: {finalPassportId}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-slate-100 tracking-tight print:text-slate-900 mt-0.5">
              {theme.title}
            </h2>
          </div>
        </div>

        {/* Big Score Badge */}
        <div className={`px-4 py-2 rounded-2xl font-bold text-sm border flex items-center gap-2 self-start sm:self-auto ${theme.scoreBadge} print:bg-slate-100 print:text-slate-900`}>
          <span>SCORE: {finalTrustScore}/100</span>
          <span className="text-xs font-normal">({finalRiskLevel} Risk)</span>
        </div>
      </div>

      {/* Grid of Verified Details */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Building2 className="w-3.5 h-3.5 text-cyan-400" />
            <span>Target Company</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900" title={companyDisplay}>
            {companyDisplay}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <User className="w-3.5 h-3.5 text-cyan-400" />
            <span>Recruiter Name</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900" title={recruiterDisplay}>
            {recruiterDisplay}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Briefcase className="w-3.5 h-3.5 text-cyan-400" />
            <span>Role / Position</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 truncate print:text-slate-900" title={roleDisplay}>
            {roleDisplay}
          </p>
        </div>

        <div className="p-3.5 rounded-2xl bg-[#0a0e17] border border-slate-800 print:bg-slate-50 print:border-slate-200">
          <div className="flex items-center gap-1.5 text-xs text-slate-400 mb-1 print:text-slate-600">
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>Website Domain</span>
          </div>
          <p className="text-sm font-semibold font-mono text-cyan-300 truncate print:text-cyan-800" title={domainDisplay}>
            {domainDisplay}
          </p>
        </div>
      </div>

      {/* Footer Details & Action Buttons */}
      <div className="mt-4 p-4 rounded-2xl bg-[#0a0e17] border border-slate-800 flex flex-wrap items-center justify-between gap-3 print:bg-slate-50 print:border-slate-200">
        <div className="flex items-center gap-2 text-xs text-slate-400 print:text-slate-600">
          <Calendar className="w-3.5 h-3.5 text-cyan-400" />
          <span>Scanned on: {new Date(finalTimestamp).toLocaleDateString()}</span>
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
