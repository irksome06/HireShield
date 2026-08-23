import React, { useState, useEffect, useRef } from 'react';
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
  ChevronLeft,
  Zap,
  Lock,
  Calendar,
  Briefcase,
  Radio,
  Newspaper,
  ArrowUpRight,
  Check,
  Share2,
  Bookmark,
  X,
  Layers,
  Eye,
  Play,
  Pause
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function HomeView({ onOpenScanner, onViewPassport, onViewHistory, onNavigateVerified }) {
  const { user } = useAuth();

  // Quick Scan Input State
  const [quickScanInput, setQuickScanInput] = useState('');

  // Flashcards Category Filter State
  const [activeCategory, setActiveCategory] = useState('all'); // 'all' | 'jobs' | 'threats' | 'news' | 'security'

  // Selected Flashcard for Detailed Modal
  const [selectedCard, setSelectedCard] = useState(null);

  // Carousel Active Index, Autoplay & Continuous Progress
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlayEnabled, setIsAutoPlayEnabled] = useState(true);
  const [slideProgress, setSlideProgress] = useState(0);
  const touchStartX = useRef(null);

  // Complete Flashcards Dataset with Authentic Real-World Photography & Live Data
  const FLASHCARDS_DATA = [
    {
      id: 'card-1',
      type: 'jobs',
      badge: 'OFFICIAL 2026 REQUISITION',
      badgeColor: 'emerald',
      title: 'Google Summer & Fall SWE Internship 2026',
      company: 'Google LLC',
      domain: 'google.com',
      image: 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=1000&auto=format&fit=crop&q=80',
      applicationDates: 'Open Now • Deadline: April 15, 2026',
      target: 'B.Tech / M.S. Computer Science, Early Career Developers',
      summary: 'Official software engineering internship across Systems, Cloud Infrastructure, Android, and ML Research teams. Verified direct application portal.',
      trustScore: 100,
      verifiedMx: 'ASPMX.L.GOOGLE.COM',
      url: 'https://careers.google.com/jobs/results/?q=internship',
      tags: ['Internship', 'High Trust', 'Remote / US / IN', 'Full-time Conversion'],
      securityTip: 'Google recruiters NEVER use @gmail.com or third-party WhatsApp numbers for initial interview scheduling.'
    },
    {
      id: 'card-2',
      type: 'threats',
      badge: 'CRITICAL SCAM RING ALERT',
      badgeColor: 'rose',
      title: 'Fake Check & Upfront Equipment Fee Ring',
      company: 'Threat Vector: Impersonated Enterprise HR',
      domain: 'Targeting: Remote Candidates',
      image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=1000&auto=format&fit=crop&q=80',
      applicationDates: 'Active Threat Campaign • Feb 2026',
      target: 'Data Entry, Executive Assistants, Junior Designers',
      summary: 'Attackers send realistic PDF offers with fake $3,200 check advances. Victims are instructed to wire funds back to a "certified hardware vendor" before the check bounces.',
      trustScore: 8,
      verifiedMx: 'INVALID / SPOOFED',
      url: null,
      tags: ['Financial Fraud', 'Check Kiting', 'Immediate Threat', 'Federal Crime'],
      securityTip: 'Legitimate employers supply hardware directly via corporate IT logistics; they never require candidate wire transfers.'
    },
    {
      id: 'card-3',
      type: 'jobs',
      badge: 'ACTIVE HIRING DRIVE',
      badgeColor: 'emerald',
      title: 'Microsoft Early Career & University Graduate Drive',
      company: 'Microsoft Corporation',
      domain: 'microsoft.com',
      image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&auto=format&fit=crop&q=80',
      applicationDates: 'Rolling Admissions • Next Cutoff: March 31, 2026',
      target: 'Software Engineers, Cloud Solution Architects, AI Engineers',
      summary: 'Full-time hiring across Azure, Security Operations, and Microsoft 365. Direct verification with official Microsoft Outlook protection gateway.',
      trustScore: 100,
      verifiedMx: 'MS.OUTLOOK.COM',
      url: 'https://careers.microsoft.com/v2/global/en/home.html',
      tags: ['Full Time', 'University Grad', 'Azure Cloud', 'Verified SPF/DKIM'],
      securityTip: 'Official invitations originate strictly from @microsoft.com or Microsoft Career Action Center portal.'
    },
    {
      id: 'card-4',
      type: 'threats',
      badge: 'URGENT PHISHING ADVISORY',
      badgeColor: 'rose',
      title: 'Telegram & WhatsApp Fast-Track Interview Trap',
      company: 'Threat Vector: Imposter Tech Recruiters',
      domain: 'Modus: Unmonitored Chat Rooms',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=1000&auto=format&fit=crop&q=80',
      applicationDates: 'Ongoing Phishing Wave • 2026',
      target: 'Frontend, React & Mobile Developers',
      summary: 'Unsolicited messages on LinkedIn/WhatsApp inviting candidates to text-only Telegram interviews with immediate same-day $85/hr offers without face-to-face verification.',
      trustScore: 12,
      verifiedMx: 'NON-ENTERPRISE',
      url: null,
      tags: ['Identity Theft', 'Telegram Lure', 'No Video Interview', 'High Risk'],
      securityTip: 'Never submit government IDs, SSNs, or bank routing numbers through unauthenticated messaging apps.'
    },
    {
      id: 'card-5',
      type: 'news',
      badge: 'RECRUITMENT INTELLIGENCE',
      badgeColor: 'cyan',
      title: 'FBI & FTC Issue 2026 Warning on AI-Generated Offer Letters',
      company: 'Cyber Threat Intelligence Bulletin',
      domain: 'Global Telemetry',
      image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=1000&auto=format&fit=crop&q=80',
      applicationDates: 'Published: February 2026 • Live Bulletin',
      target: 'All Job Seekers & Recent Graduates',
      summary: 'Scammers are now using LLMs to synthesize authentic-looking corporate offer letters, NDAs, and employee handbooks complete with forged executive signatures.',
      trustScore: 95,
      verifiedMx: 'GOV / INTELLIGENCE',
      url: null,
      tags: ['AI Fraud Wave', 'FTC Bulletin', 'Signature Forgery', 'Deterministic Defense'],
      securityTip: 'Always run PDF contracts through HireShield to verify cryptographic header timestamps and hidden malware payloads.'
    },
    {
      id: 'card-6',
      type: 'security',
      badge: 'LOOKALIKE DOMAIN ANALYSIS',
      badgeColor: 'amber',
      title: 'Spotting Typo-Squatted & High-Risk Recruiter TLDs',
      company: 'Domain Integrity Protocol',
      domain: 'Defense Guide',
      image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1000&auto=format&fit=crop&q=80',
      applicationDates: 'Standard Operating Procedure',
      target: 'All Tech & Remote Job Applicants',
      summary: 'Attackers register lookalike domains like stripe-careers.top or google-jobs.click. Learn how HireShield cross-references authoritative DNS roots to catch spoofed senders.',
      trustScore: 92,
      verifiedMx: 'WHOIS FORENSICS',
      url: null,
      tags: ['TLD Watch', 'DNS Inspection', 'Lookalike Filter', 'Anti-Phishing'],
      securityTip: 'Top-abused TLDs for recruitment scams include .top, .xyz, .click, .buzz, and .work.'
    },
    {
      id: 'card-7',
      type: 'security',
      badge: 'CRYPTOGRAPHIC STANDARD',
      badgeColor: 'emerald',
      title: 'HireShield Zero-Trust Job Passport Standard',
      company: 'HireShield Cryptographic Verification',
      domain: 'hireshield.security',
      image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=1000&auto=format&fit=crop&q=80',
      applicationDates: 'Active 2026 Security Specification',
      target: 'Verified Candidates & Hiring Teams',
      summary: 'Every audited job offer receives a tamper-evident SHA-256 digital certificate validating corporate sender authenticity, salary realism, and clean reputation.',
      trustScore: 100,
      verifiedMx: 'SHA-256 SIGNED',
      url: null,
      tags: ['Zero-Trust', 'PDF Certificate', 'Tamper Proof', 'Candidate Shield'],
      securityTip: 'Attach your HireShield Trust Passport to recruiter correspondence to demand reciprocal cryptographic verification.'
    }
  ];

  // Filtered Flashcards
  const filteredCards = FLASHCARDS_DATA.filter(card => {
    if (activeCategory === 'all') return true;
    return card.type === activeCategory;
  });

  // Automated Self-Swiping Engine with Real-Time Progress Bar
  const DURATION_PER_SLIDE = 4000; // 4 seconds per card
  const INTERVAL_STEP = 50; // Progress tick

  useEffect(() => {
    if (!isAutoPlayEnabled || filteredCards.length <= 1) return;

    setSlideProgress(0);

    const progressTimer = setInterval(() => {
      setSlideProgress((prev) => {
        if (prev >= 100) {
          setCurrentIndex((curr) => (curr + 1) % filteredCards.length);
          return 0;
        }
        return prev + (INTERVAL_STEP / DURATION_PER_SLIDE) * 100;
      });
    }, INTERVAL_STEP);

    return () => clearInterval(progressTimer);
  }, [currentIndex, isAutoPlayEnabled, filteredCards.length]);

  // Reset current index when category changes
  useEffect(() => {
    setCurrentIndex(0);
    setSlideProgress(0);
  }, [activeCategory]);

  const handleNext = () => {
    setSlideProgress(0);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setSlideProgress(0);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  // Touch Swipe Handling for Mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 40) handleNext();
    if (diff < -40) handlePrev();
    touchStartX.current = null;
  };

  const handleQuickScanSubmit = (e) => {
    e.preventDefault();
    if (onOpenScanner) {
      onOpenScanner(quickScanInput.trim());
    }
  };

  const verifiedPreview = [
    { name: 'Stripe', domain: 'stripe.com', verifiedMx: 'ASPMX.L.GOOGLE.COM', trust: '100/100', role: 'Staff Infrastructure SWE' },
    { name: 'Google', domain: 'google.com', verifiedMx: 'SMTP.GOOGLE.COM', trust: '100/100', role: 'Cloud & AI Engineer' },
    { name: 'Microsoft', domain: 'microsoft.com', verifiedMx: 'MS.OUTLOOK.COM', trust: '100/100', role: 'Security Architect' },
    { name: 'Cloudflare', domain: 'cloudflare.com', verifiedMx: 'MX.CLOUDFLARE.COM', trust: '100/100', role: 'Systems Performance Engineer' }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      
      {/* ------------------------------------------------------------- */}
      {/* 1. COMMAND CENTER HERO WITH EMBEDDED QUICK-SCAN BAR           */}
      {/* ------------------------------------------------------------- */}
      <div className="relative rounded-3xl bg-gradient-to-br from-slate-900/95 via-[#0b1426]/95 to-slate-900/95 border border-cyan-500/30 p-6 sm:p-8 backdrop-blur-2xl shadow-2xl shadow-cyan-950/30 overflow-hidden cyber-glow">
        <div className="absolute -top-12 -right-12 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 space-y-6">
          
          {/* Header Row */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono font-bold">
                <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
                <span>ACTIVE ZERO-TRUST RECRUITMENT DEFENSE</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-indigo-400">{user?.name || 'Security Analyst'}</span>
              </h1>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                Real-time offer forensics, verified company rosters, and upcoming 2026 recruitment alerts.
              </p>
            </div>

            <div className="flex items-center gap-2 sm:gap-3">
              <div className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Candidate Safety Index</span>
                <span className="text-xl font-black text-emerald-400 font-mono flex items-center justify-end gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>96% Protected</span>
                </span>
              </div>
            </div>
          </div>

          {/* Embedded Instant Quick-Scan Bar */}
          <form onSubmit={handleQuickScanSubmit} className="flex flex-col sm:flex-row gap-2.5 pt-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-cyan-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={quickScanInput}
                onChange={(e) => setQuickScanInput(e.target.value)}
                placeholder="Paste recruiter email, career link, or company domain (e.g. careers-stripe.com or jobs@apple.com)..."
                className="w-full pl-11 pr-4 py-3.5 bg-slate-950/90 border border-slate-700/90 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500/40 transition-all font-mono shadow-inner"
              />
            </div>

            <button
              type="submit"
              className="py-3.5 px-7 rounded-2xl bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:via-blue-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 flex items-center justify-center gap-2 transition-all active:scale-[0.98] cursor-pointer whitespace-nowrap"
            >
              <Zap className="w-4 h-4" />
              <span>Instant AI Forensic Scan</span>
            </button>
          </form>

        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. DYNAMIC AUTO-SWIPING FLASHCARDS SHOWCASE (REAL PHOTOS)     */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-3.5">
        
        {/* Sleek Category Filter Tabs & Autoplay Toggle */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pb-0.5">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: '🔥 All Cards' },
              { id: 'jobs', label: '🎓 2026 Internships' },
              { id: 'threats', label: '🚨 Scam Radar' },
              { id: 'news', label: '📰 Cyber News' },
              { id: 'security', label: '🛡️ Safety Tips' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`py-1.5 px-3 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900/90 text-slate-400 hover:text-white border border-slate-800 hover:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Auto-Slide Status Indicator */}
          <button
            onClick={() => setIsAutoPlayEnabled(!isAutoPlayEnabled)}
            className={`py-1.5 px-3 rounded-xl text-[11px] font-mono font-bold flex items-center gap-1.5 transition-all cursor-pointer border ${
              isAutoPlayEnabled
                ? 'bg-emerald-950/60 text-emerald-300 border-emerald-500/40 shadow-sm'
                : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-slate-200'
            }`}
            title={isAutoPlayEnabled ? 'Auto-swipe is ACTIVE (4s interval)' : 'Auto-swipe is PAUSED'}
          >
            {isAutoPlayEnabled ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Auto-Swipe ON</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-slate-400" />
                <span>Auto-Swipe OFF</span>
              </>
            )}
          </button>
        </div>

        {/* The Swipeable / Auto-Swiping Flashcard Deck */}
        <div 
          className="relative rounded-3xl bg-slate-900/90 border border-slate-800 p-4 sm:p-6 backdrop-blur-2xl shadow-xl overflow-hidden group"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Continuous Auto-Swipe Progress Bar Line at Top */}
          {isAutoPlayEnabled && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-slate-950">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-75"
                style={{ width: `${slideProgress}%` }}
              />
            </div>
          )}

          {filteredCards.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              
              {/* Left Column: Authentic Real Photography Image */}
              <div className="lg:col-span-5 relative rounded-2xl overflow-hidden aspect-video lg:aspect-[4/3] bg-slate-950 border border-slate-800 shadow-lg group-hover:border-cyan-500/40 transition-colors">
                <img 
                  src={filteredCards[currentIndex]?.image} 
                  alt={filteredCards[currentIndex]?.title}
                  loading="lazy"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent pointer-events-none" />

                {/* Badge Overlay */}
                <div className="absolute top-3 left-3">
                  <span className={`px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase border shadow-md backdrop-blur-md ${
                    filteredCards[currentIndex]?.badgeColor === 'rose'
                      ? 'bg-rose-950/80 text-rose-300 border-rose-500/50'
                      : filteredCards[currentIndex]?.badgeColor === 'emerald'
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-500/50'
                      : filteredCards[currentIndex]?.badgeColor === 'amber'
                      ? 'bg-amber-950/80 text-amber-300 border-amber-500/50'
                      : 'bg-cyan-950/80 text-cyan-300 border-cyan-500/50'
                  }`}>
                    {filteredCards[currentIndex]?.badge}
                  </span>
                </div>

                {/* Trust Score Tag */}
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-slate-950/90 border border-slate-700 text-xs font-mono font-bold text-white shadow-md backdrop-blur-md">
                  <ShieldCheck className={`w-3.5 h-3.5 ${filteredCards[currentIndex]?.trustScore >= 80 ? 'text-emerald-400' : 'text-rose-400'}`} />
                  <span>Trust: {filteredCards[currentIndex]?.trustScore}/100</span>
                </div>
              </div>

              {/* Right Column: Information, Dates, Target, and Action Buttons */}
              <div className="lg:col-span-7 flex flex-col justify-between space-y-4">
                
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-cyan-400 flex items-center gap-1.5 font-semibold">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{filteredCards[currentIndex]?.applicationDates}</span>
                    </span>
                    <span className="text-[10px] font-mono text-slate-400 bg-slate-950 px-2 py-0.5 rounded-md border border-slate-800">
                      Card {currentIndex + 1} of {filteredCards.length}
                    </span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug hover:text-cyan-300 transition-colors">
                    {filteredCards[currentIndex]?.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {filteredCards[currentIndex]?.summary}
                  </p>

                  <div className="p-3 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-1">
                    <span className="text-[10px] font-mono uppercase font-bold text-slate-400 block">
                      Target Audience / Eligibility:
                    </span>
                    <p className="text-xs text-slate-300 font-medium">
                      {filteredCards[currentIndex]?.target}
                    </p>
                  </div>

                  {/* Tag Pills */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {filteredCards[currentIndex]?.tags?.map((tag, idx) => (
                      <span key={idx} className="px-2.5 py-1 rounded-lg bg-slate-800/80 border border-slate-700 text-[11px] font-mono text-slate-300">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Controls & Actions */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  
                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setSelectedCard(filteredCards[currentIndex])}
                      className="py-2.5 px-4 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center gap-1.5 transition-all shadow-md cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Forensic Brief</span>
                    </button>

                    {filteredCards[currentIndex]?.url ? (
                      <a
                        href={filteredCards[currentIndex].url}
                        target="_blank"
                        rel="noreferrer"
                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                      >
                        <span>Official Portal</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    ) : (
                      <button
                        onClick={onOpenScanner}
                        className="py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-xs flex items-center gap-1.5 transition-all border border-slate-700 cursor-pointer"
                      >
                        <span>Verify This Offer</span>
                        <Shield className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>

                  {/* Manual Navigation Controls */}
                  <div className="flex items-center gap-3 self-end sm:self-auto">
                    <div className="flex items-center gap-1">
                      {filteredCards.map((_, dotIdx) => (
                        <button
                          key={dotIdx}
                          onClick={() => {
                            setSlideProgress(0);
                            setCurrentIndex(dotIdx);
                          }}
                          className={`h-1.5 rounded-full transition-all cursor-pointer ${
                            dotIdx === currentIndex ? 'w-5 bg-cyan-400' : 'w-1.5 bg-slate-700 hover:bg-slate-500'
                          }`}
                          title={`Go to card ${dotIdx + 1}`}
                        />
                      ))}
                    </div>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={handlePrev}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                        title="Previous Flashcard"
                      >
                        <ChevronLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={handleNext}
                        className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
                        title="Next Flashcard"
                      >
                        <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                </div>

              </div>

            </div>
          ) : (
            <div className="p-8 text-center text-slate-400">
              No flashcards available in this category.
            </div>
          )}
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. SAFETY METRICS OVERVIEW CARDS                              */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Total Scans Inspected</span>
            <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <FileText className="w-4 h-4 text-cyan-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2 font-mono">14</p>
          <p className="text-[11px] text-cyan-400 mt-1 font-mono">100% Deterministic Engine</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Threats Deflected</span>
            <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-rose-400 mt-2 font-mono">4</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Fake Checks & Spoofed MX</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Verified Passports</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-400 mt-2 font-mono">10</p>
          <p className="text-[11px] text-slate-400 mt-1 font-mono">Cryptographically Signed</p>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800/80 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-400">Global Trust Index</span>
            <div className="w-8 h-8 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-indigo-400" />
            </div>
          </div>
          <p className="text-2xl font-black text-white mt-2 font-mono">88<span className="text-sm font-normal text-slate-500">/100</span></p>
          <p className="text-[11px] text-indigo-400 mt-1 font-mono">Status: High Protection</p>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. TWO-COLUMN: LIVE THREAT FEED & VERIFIED EMPLOYERS          */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Live Threat Radar (7 cols) */}
        <div className="lg:col-span-7 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-white">Active Recruitment Threat Vectors</h3>
                <p className="text-[11px] text-slate-400">Global scam campaigns monitored in real-time</p>
              </div>
            </div>
            <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-300 border border-rose-500/20">
              Live Feed
            </span>
          </div>

          <div className="space-y-3">
            {[
              {
                title: 'Fake Check Advance Scam targeting Data Entry Roles',
                detected: '1 hour ago',
                level: 'Critical',
                risk: 'Demands candidate wire transfer for "office setup"'
              },
              {
                title: 'Typosquatted Lookalike Domain Wave (.top / .click)',
                detected: '4 hours ago',
                level: 'High Risk',
                risk: 'Spoofing Tier-1 tech recruiters on unverified web hosts'
              },
              {
                title: 'Crypto Task & App Rating Deposit Scheme',
                detected: '1 day ago',
                level: 'Medium',
                risk: 'Requires cryptocurrency deposit to unlock commissions'
              }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800/80 hover:border-rose-500/40 transition-colors"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-xs font-bold text-rose-200">{item.title}</span>
                  <span className="text-[10px] font-mono text-slate-500">{item.detected}</span>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-400">{item.risk}</p>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-500/10 text-rose-400 border border-rose-500/20">
                    {item.level}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Employers Preview (5 cols) */}
        <div className="lg:col-span-5 rounded-3xl bg-slate-900/80 border border-slate-800 p-6 backdrop-blur-xl flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-white">Verified Employers</h3>
                  <p className="text-[11px] text-slate-400">Authenticated MX & Corporate DNS</p>
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
                      <p className="text-[10px] text-slate-400 font-mono">{company.role}</p>
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

          <div className="pt-3 border-t border-slate-800/80">
            <button
              onClick={onNavigateVerified || onOpenScanner}
              className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-200 flex items-center justify-center gap-2 transition-colors cursor-pointer"
            >
              <span>Explore Verified Employer Directory</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 5. INTERACTIVE FLASHCARD FORENSIC BRIEF MODAL                 */}
      {/* ------------------------------------------------------------- */}
      {selectedCard && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl rounded-3xl bg-[#0d1424] border border-slate-700 p-6 sm:p-8 shadow-2xl shadow-cyan-950/60 space-y-5 animate-in zoom-in-95 duration-150 cyber-glow max-h-[90vh] overflow-y-auto">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedCard(null)}
              className="absolute top-5 right-5 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Modal Image Header */}
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-slate-950 border border-slate-800">
              <img 
                src={selectedCard.image} 
                alt={selectedCard.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d1424] via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 backdrop-blur-md">
                  {selectedCard.badge}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-slate-900/90 text-white border border-slate-700 backdrop-blur-md">
                  Trust Score: {selectedCard.trustScore}/100
                </span>
              </div>
            </div>

            {/* Title & Metadata */}
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <Calendar className="w-3.5 h-3.5" />
                <span>{selectedCard.applicationDates}</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-white">{selectedCard.title}</h2>
              <p className="text-xs text-slate-400 font-mono">Entity: {selectedCard.company} • {selectedCard.domain}</p>
            </div>

            {/* Summary */}
            <div className="p-4 rounded-2xl bg-slate-950/70 border border-slate-800 space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Forensic Overview</h4>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">{selectedCard.summary}</p>
            </div>

            {/* Security Tip Alert */}
            <div className="p-4 rounded-2xl bg-cyan-950/30 border border-cyan-500/30 flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-1">
                <h5 className="text-xs font-bold text-cyan-300">HireShield Defense Protocol</h5>
                <p className="text-xs text-slate-300">{selectedCard.securityTip}</p>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-3 border-t border-slate-800">
              <span className="text-[11px] text-slate-500 font-mono">Authenticated via HireShield Intelligence</span>
              
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  onClick={() => setSelectedCard(null)}
                  className="flex-1 sm:flex-initial py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 hover:text-white transition-colors cursor-pointer"
                >
                  Close
                </button>

                {selectedCard.url ? (
                  <a
                    href={selectedCard.url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <span>Apply via Official Portal</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                ) : (
                  <button
                    onClick={() => {
                      setSelectedCard(null);
                      if (onOpenScanner) onOpenScanner();
                    }}
                    className="flex-1 sm:flex-initial py-2.5 px-5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md cursor-pointer"
                  >
                    <span>Audit An Incoming Offer</span>
                    <Shield className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
