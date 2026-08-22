import React from 'react';
import { 
  Building2, 
  UserCheck, 
  Mail, 
  Phone, 
  Briefcase, 
  Globe, 
  CreditCard, 
  DollarSign, 
  Layers, 
  Cpu 
} from 'lucide-react';

export const ExtractedEntitiesCard = ({ entities = {} }) => {
  const items = [
    {
      label: 'Target Company',
      value: entities.company || 'Not detected',
      icon: Building2,
      highlight: false
    },
    {
      label: 'Recruiter / Sender',
      value: entities.recruiter || 'Not detected',
      icon: UserCheck,
      highlight: false
    },
    {
      label: 'Recruiter Email',
      value: entities.email || 'Not provided',
      icon: Mail,
      isMono: true,
      highlight: false
    },
    {
      label: 'Phone / Messaging',
      value: entities.phone || 'Not provided',
      icon: Phone,
      isMono: true,
      highlight: false
    },
    {
      label: 'Job Title / Role',
      value: entities.jobTitle || 'Not specified',
      icon: Briefcase,
      highlight: false
    },
    {
      label: 'Associated Domain',
      value: entities.domain || 'None detected',
      icon: Globe,
      isMono: true,
      highlight: entities.domain?.includes('.top') || entities.domain?.includes('t.me')
    },
    {
      label: 'Payment / Fee Requirement',
      value: entities.paymentAmount || 'None detected',
      icon: CreditCard,
      highlight: entities.paymentAmount && !entities.paymentAmount.toLowerCase().includes('none'),
      isDanger: entities.paymentAmount && !entities.paymentAmount.toLowerCase().includes('none')
    },
    {
      label: 'Compensation Claim',
      value: entities.salaryClaim || 'Not specified',
      icon: DollarSign,
      highlight: false
    }
  ];

  return (
    <div className="bg-[#111827]/90 border border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-cyan-950/60 border border-cyan-800/50 text-cyan-400">
            <Cpu className="w-4 h-4" />
          </div>
          <div>
            <h3 className="text-base font-bold text-slate-100">Structured Entity Extraction</h3>
            <p className="text-xs text-slate-400">Extracted via structured parsing engine & regex security heuristics</p>
          </div>
        </div>
        <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-cyan-300">
          8 Entity Fields
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {items.map((item, idx) => {
          const IconComponent = item.icon;
          return (
            <div 
              key={idx}
              className={`p-3 rounded-xl border transition-all ${
                item.isDanger 
                  ? 'bg-rose-950/20 border-rose-800/60 text-rose-200' 
                  : item.highlight 
                  ? 'bg-amber-950/20 border-amber-800/60 text-amber-200'
                  : 'bg-[#0d131f] border-slate-800/80 text-slate-200 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span className="font-mono">{item.label}</span>
                <IconComponent className={`w-3.5 h-3.5 ${
                  item.isDanger ? 'text-rose-400' : item.highlight ? 'text-amber-400' : 'text-slate-500'
                }`} />
              </div>
              <p className={`text-sm font-semibold truncate ${
                item.isDanger ? 'text-rose-400 font-bold' : item.isMono ? 'font-mono' : ''
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
