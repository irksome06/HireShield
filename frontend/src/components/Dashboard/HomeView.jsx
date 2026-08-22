import React from 'react';
import { 
  Shield, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  ArrowRight, 
  AlertTriangle, 
  Building2, 
  CheckCircle2, 
  Sparkles, 
  TrendingUp, 
  Clock, 
  FileText,
  ExternalLink,
  ChevronRight,
  Zap,
  Lock
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function HomeView({ onOpenScanner, onViewPassport, onViewHistory }) {
  const { user } = useAuth();

  const scamRadarItems = [
    {
      id: 1,
      severity: 'Critical',
      title: 'Fake Check & Upfront Equipment Fee Ring',
      target: 'Remote Data Entry & Assistant Roles',
      desc: 'Attackers send fake $3,200 PDF checks requesting wire transfer back for "home office equipment".',
      detected: '2 hours ago'
    },
    {
      id: 2,
      severity: 'High',
      title: 'Telegram Fast-Track Interview Trap',
      target: 'Software Engineer & Designer Offers',
      desc: 'Impersonating tier-1 tech recruiters, redirecting candidates to unverified Telegram channels.',
      detected: '5 hours ago'
    },
    {
      id: 3,
      severity: 'Medium',
      title: 'Crypto Task & Deposit Schemes',
      target: 'Product Evaluator & Rating Jobs',
      desc: 'Demands cryptocurrency deposit to "unlock" commissions on daily app review tasks.',
      detected: '1 day ago'
    }
  ];

  const verifiedPreview = [
    { name: 'Stripe', domain: 'stripe.com', verifiedMx: 'ASPMX.L.GOOGLE.COM', trust: '100/100' },
    { name: 'Google', domain: 'google.com', verifiedMx: 'SMTP.GOOGLE.COM', trust: '100/100' },
    { name: 'Microsoft', domain: 'microsoft.com', verifiedMx: 'MS.OUTLOOK.COM', trust: '100/100' },
    { name: 'Cloudflare', domain: 'cloudflare.com', verifiedMx: 'MX.CLOUDFLARE.COM', trust: '100/100' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* Personalized Welcome & Security Status Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-900/90 via-[#0d172e]/90 to-slate-900/90 border border-slate-800 p-6 sm:p-8 backdrop-blur-xl shadow-xl shadow-cyan-950/20 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>Shield Security Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">{user?.name || 'Security Analyst'}</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
              Your real-time recruitment defense engine is active. Monitor verified employers, check incoming offers, and stay protected against recruitment fraud.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenScanner}
              className="py-3 px-5 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-xs shadow-lg shadow-cyan-500/25 flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            >
              <Search className="w-4 h-4" />
              <span>Check a Job Now</span>
            </button>
          </div>
        </div>
      </div>

      {/* Safety Statistics Summary Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Scans Run</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">12</p>
          <p className="text-[11px] text-cyan-400 mt-1 font-mono">100% Deterministic Engine</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Threats Blocked</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">3</p>
          <p className="text-[11px] text-rose-400 mt-1 font-mono">Upfront Fees & Spoofing</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Trust Passports</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">9</p>
          <p className="text-[11px] text-emerald-400 mt-1 font-mono">Cryptographically Verified</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Average Trust Score</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2">86<span className="text-sm font-normal text-slate-500">/100</span></p>
          <p className="text-[11px] text-indigo-400 mt-1 font-mono">Safety Index: High</p>
        </div>

      </div>

      {/* Two Column Grid: Live Scam Radar & Verified Companies */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Live Scam Radar (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-5">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Live Scam Radar</h3>
                <p className="text-[11px] text-slate-400">Active recruitment scam campaigns in the wild</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {scamRadarItems.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-rose-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-rose-200">{item.title}</span>
                  <span className="text-[10px] font-mono text-slate-500">{item.detected}</span>
                </div>
                <p className="text-[11px] text-cyan-400 font-mono mb-1">{item.target}</p>
                <p className="text-xs text-slate-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Companies Quick Preview (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Verified Employers</h3>
                  <p className="text-[11px] text-slate-400">Vetted domains & authenticated MX</p>
                </div>
              </div>
            </div>

            <div className="space-y-2.5">
              {verifiedPreview.map((company, idx) => (
                <div 
                  key={idx}
                  className="p-3 rounded-2xl bg-slate-950/60 border border-slate-800/80 flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center text-xs font-bold text-white">
                      {company.name[0]}
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white">{company.name}</p>
                      <p className="text-[11px] text-slate-400 font-mono">{company.domain}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      {company.trust}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-800/80">
            <button
              onClick={onOpenScanner}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Scan any Recruiter Domain</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

    </div>
  );
}
