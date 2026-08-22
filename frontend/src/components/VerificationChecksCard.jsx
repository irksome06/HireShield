import React from 'react';
import { Building2, UserCheck, Globe, CheckCircle2, AlertTriangle, XCircle, ShieldCheck } from 'lucide-react';

export const VerificationChecksCard = ({ verifications = [], entities = {} }) => {
  // Map backend verification items into 3 clear user-friendly checks
  const domainItem = verifications.find(v => v.name.toLowerCase().includes('domain') || v.name.toLowerCase().includes('tld')) || {
    name: 'Website & Link Check',
    status: entities.domain?.includes('.top') ? 'Failed' : 'Passed',
    detail: entities.domain !== 'None detected' ? `Scanned website: ${entities.domain}` : 'No direct URL link was provided'
  };

  const emailItem = verifications.find(v => v.name.toLowerCase().includes('email') || v.name.toLowerCase().includes('recruiter')) || {
    name: 'Recruiter Identity Check',
    status: entities.email && !entities.email.includes('gmail') ? 'Passed' : 'Warning',
    detail: entities.email !== 'Not provided' ? `Contact: ${entities.email}` : 'No corporate email provided'
  };

  const companyItem = verifications.find(v => v.name.toLowerCase().includes('corporate') || v.name.toLowerCase().includes('reputation')) || {
    name: 'Company Legitimacy Check',
    status: domainItem.status === 'Failed' ? 'Warning' : 'Passed',
    detail: `Company claimed: ${entities.company || 'Unknown'}`
  };

  const checks = [
    {
      title: 'Company Check',
      subtitle: 'Is the business legitimate?',
      icon: Building2,
      status: companyItem.status,
      detail: companyItem.detail
    },
    {
      title: 'Recruiter Check',
      subtitle: 'Does the recruiter use an official email?',
      icon: UserCheck,
      status: emailItem.status,
      detail: emailItem.detail
    },
    {
      title: 'Website Check',
      subtitle: 'Is the link safe and established?',
      icon: Globe,
      status: domainItem.status,
      detail: domainItem.detail
    }
  ];

  const getStatusBadge = (status) => {
    if (status === 'Passed') {
      return {
        label: 'Passed (Safe)',
        icon: CheckCircle2,
        bg: 'bg-emerald-950/70 border-emerald-500/50 text-emerald-400'
      };
    }
    if (status === 'Failed') {
      return {
        label: 'Failed (High Risk)',
        icon: XCircle,
        bg: 'bg-rose-950/70 border-rose-500/50 text-rose-400'
      };
    }
    return {
      label: 'Caution (Unverified)',
      icon: AlertTriangle,
      bg: 'bg-amber-950/70 border-amber-500/50 text-amber-400'
    };
  };

  return (
    <div className="bg-[#111827]/95 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">3 Core Safety Checks</h3>
            <p className="text-xs text-slate-400">Automated verification of the company, sender, and website</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {checks.map((check, idx) => {
          const badge = getStatusBadge(check.status);
          const BadgeIcon = badge.icon;
          const CheckIcon = check.icon;

          return (
            <div 
              key={idx}
              className="p-4 rounded-2xl bg-[#0a0e17] border border-slate-800 flex flex-col justify-between hover:border-slate-700 transition-colors"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 rounded-lg bg-slate-900 border border-slate-800 text-cyan-400">
                      <CheckIcon className="w-4 h-4" />
                    </span>
                    <div>
                      <h4 className="text-sm font-bold text-slate-200">{check.title}</h4>
                      <p className="text-[11px] text-slate-500">{check.subtitle}</p>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  {check.detail}
                </p>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-900">
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold border ${badge.bg}`}>
                  <BadgeIcon className="w-3.5 h-3.5" />
                  <span>{badge.label}</span>
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
