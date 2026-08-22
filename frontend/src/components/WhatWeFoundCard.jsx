import React from 'react';
import { 
  Building2, 
  User, 
  Mail, 
  Phone, 
  Briefcase, 
  Globe, 
  CreditCard, 
  DollarSign,
  SearchCheck,
  AlertOctagon
} from 'lucide-react';

export const WhatWeFoundCard = ({ entities = {} }) => {
  const paymentValue = entities.paymentAmount || entities.payment_amount || 'None detected';
  const hasFee = paymentValue && !paymentValue.toLowerCase().includes('none') && paymentValue !== 'None detected';

  const items = [
    {
      label: 'Company Name',
      value: entities.company || 'Not detected',
      icon: Building2,
      isDanger: false
    },
    {
      label: 'Recruiter Contact',
      value: entities.recruiter || 'Not detected',
      icon: User,
      isDanger: false
    },
    {
      label: 'Recruiter Email',
      value: entities.email || 'Not provided',
      icon: Mail,
      isMono: true,
      isDanger: false
    },
    {
      label: 'Phone / Chat App',
      value: entities.phone || 'Not provided',
      icon: Phone,
      isMono: true,
      isDanger: false
    },
    {
      label: 'Job Position',
      value: entities.jobTitle || entities.job_title || 'Not specified',
      icon: Briefcase,
      isDanger: false
    },
    {
      label: 'Offered Salary',
      value: entities.salaryClaim || entities.salary_claim || 'Not specified',
      icon: DollarSign,
      isDanger: false
    },
    {
      label: 'Website Domain',
      value: entities.domain || 'None detected',
      icon: Globe,
      isMono: true,
      isDanger: entities.domain?.includes('.top') || entities.domain?.includes('.xyz')
    },
    {
      label: 'Upfront Money / Fees Demanded',
      value: hasFee ? paymentValue : 'None (Safe)',
      icon: hasFee ? AlertOctagon : CreditCard,
      isDanger: hasFee,
      isSafe: !hasFee
    }
  ];

  return (
    <div className="bg-[#111827]/95 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl backdrop-blur-md">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
            <SearchCheck className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">What We Found</h3>
            <p className="text-xs text-slate-400">Key details extracted directly from the job message</p>
          </div>
        </div>
        <span className="text-[11px] text-slate-400 font-mono px-2 py-0.5 rounded-lg bg-slate-900 border border-slate-800">
          8 Key Details
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {items.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={idx}
              className={`p-3.5 rounded-2xl border transition-all ${
                item.isDanger 
                  ? 'bg-rose-950/30 border-rose-700/80 text-rose-200 ring-1 ring-rose-500/30' 
                  : item.isSafe && item.label.includes('Upfront')
                  ? 'bg-emerald-950/20 border-emerald-800/50 text-emerald-300'
                  : 'bg-[#0a0e17] border-slate-800/80 text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
                <span>{item.label}</span>
                <IconComponent className={`w-3.5 h-3.5 ${
                  item.isDanger ? 'text-rose-400' : item.isSafe && item.label.includes('Upfront') ? 'text-emerald-400' : 'text-slate-500'
                }`} />
              </div>
              <p className={`text-sm font-semibold truncate ${
                item.isDanger ? 'text-rose-300 font-bold' : item.isMono ? 'font-mono' : ''
              }`}>
                {item.value}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};
