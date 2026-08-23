import React, { useState, useEffect } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { PreferencesProvider } from './context/PreferencesContext';
import ScrollLandingPage from './components/Landing/ScrollLandingPage';
import DashboardSidebar from './components/Sidebar/DashboardSidebar';
import HomeView from './components/Dashboard/HomeView';
import VerifiedCompaniesView from './components/Dashboard/VerifiedCompaniesView';
import SafetyInsightsView from './components/Dashboard/SafetyInsightsView';
import WatchlistView from './components/Dashboard/WatchlistView';
import ProfileView from './components/Dashboard/ProfileView';
import SettingsView from './components/Dashboard/SettingsView';

import { Hero } from './components/Hero';
import { AnalysisForm } from './components/AnalysisForm';
import { AnalyzingState } from './components/AnalyzingState';
import { TrustScoreGauge } from './components/TrustScoreGauge';
import { WhatWeFoundCard } from './components/WhatWeFoundCard';
import { VerificationChecksCard } from './components/VerificationChecksCard';
import { EvidenceTrailCard } from './components/EvidenceTrailCard';
import { SafetyRecommendationsCard } from './components/SafetyRecommendationsCard';
import { JobTrustPassport } from './components/JobTrustPassport';
import { HistoryTab } from './components/HistoryTab';
import { FileSearch, Shield, Bell, CheckCircle2, Menu, Home, ShieldAlert, Building2, BarChart3, User, Sparkles } from 'lucide-react';
import { API_BASE } from './api/config';

function Dashboard() {
  const { user, token } = useAuth();

  // Navigation Tab State: 'home' | 'scanner' | 'companies' | 'insights' | 'history' | 'watchlist' | 'profile' | 'settings'
  const [activeTab, setActiveTab] = useState('home');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Active Input State for Scanner
  const [jobMessage, setJobMessage] = useState('');
  const [jobUrl, setJobUrl] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Analysis Result State
  const [currentResult, setCurrentResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [backendStatus, setBackendStatus] = useState('connecting'); // 'connected' | 'offline'
  
  // Audit History State
  const [history, setHistory] = useState([]);

  // Check backend connectivity and load persisted DB audit history on mount
  useEffect(() => {
    const checkBackendAndLoadHistory = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health`);
        if (res.ok) {
          setBackendStatus('connected');
          setApiError(null);
          
          try {
            const authHeaders = token ? { 'Authorization': `Bearer ${token}` } : {};
            const histRes = await fetch(`${API_BASE}/api/history?limit=50`, {
              headers: authHeaders
            });
            if (histRes.ok) {
              const histData = await histRes.json();
              if (Array.isArray(histData)) {
                const formattedHistory = histData.map(item => ({
                  title: item.entities?.company && item.entities.company !== 'Not detected' 
                    ? item.entities.company 
                    : item.verdict || "Scanned Job",
                  jobMessage: item.summary || "",
                  url: item.entities?.domain || "",
                  result: {
                    trustScore: item.trust_score,
                    riskLevel: item.risk_level,
                    riskColor: item.risk_color,
                    verdict: item.verdict,
                    summary: item.summary,
                    entities: item.entities,
                    deductions: item.deductions,
                    verifications: item.verifications,
                    recommendations: item.recommendations,
                    passportId: item.passport_id,
                    timestamp: item.timestamp
                  }
                }));
                setHistory(formattedHistory);
              }
            }
          } catch (histErr) {
            console.warn("History fetch warning:", histErr);
          }
        } else {
          setBackendStatus('offline');
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };

    checkBackendAndLoadHistory();
  }, [token]);

  // Execute Real Live Threat Analysis
  const handleAnalyze = async () => {
    if (!jobMessage.trim() && !jobUrl.trim() && !selectedImage) {
      return;
    }

    setIsLoading(true);
    setApiError(null);
    setActiveTab('scanner');

    const startTime = Date.now();

    try {
      const headers = { 'Content-Type': 'application/json' };
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers,
        body: JSON.stringify({
          message: jobMessage.trim(),
          url: jobUrl.trim() || null,
          has_image: !!selectedImage,
          image_base64: selectedImage?.preview || null
        })
      });

      const elapsed = Date.now() - startTime;
      if (elapsed < 600) {
        await new Promise(r => setTimeout(r, 600 - elapsed));
      }

      if (response.ok) {
        const data = await response.json();
        const formatted = {
          trustScore: data.trust_score,
          riskLevel: data.risk_level,
          riskColor: data.risk_color,
          verdict: data.verdict,
          summary: data.summary,
          entities: {
            company: data.entities?.company || 'Not detected',
            recruiter: data.entities?.recruiter || 'Not detected',
            email: data.entities?.email || 'Not provided',
            phone: data.entities?.phone || 'Not provided',
            jobTitle: data.entities?.job_title || 'Not specified',
            domain: data.entities?.domain || 'None detected',
            paymentAmount: data.entities?.payment_amount || 'None detected',
            salaryClaim: data.entities?.salary_claim || 'Not specified'
          },
          deductions: data.deductions || [],
          verifications: data.verifications || [],
          recommendations: data.recommendations || [],
          passportId: data.passport_id,
          timestamp: data.timestamp
        };

        setCurrentResult(formatted);
        setBackendStatus('connected');
        setHistory(prev => [
          {
            title: formatted.entities.company !== 'Not detected' ? formatted.entities.company : "Scanned Job",
            jobMessage: jobMessage || "Audited screenshot / URL",
            url: jobUrl,
            result: formatted
          },
          ...prev.filter(h => h.result?.passportId !== formatted.passportId)
        ]);

        setIsLoading(false);

        setTimeout(() => {
          const resultsElem = document.getElementById('results-view');
          if (resultsElem) {
            resultsElem.scrollIntoView({ behavior: 'smooth' });
          }
        }, 100);
        return;
      } else {
        const errJson = await response.json().catch(() => ({}));
        setApiError(errJson.detail || `Analysis failed with status code ${response.status}.`);
      }
    } catch (e) {
      console.error("Backend API connection error:", e);
      setBackendStatus('offline');
      setApiError("Cannot reach HireShield API backend at " + API_BASE + ". Please verify that the FastAPI backend server is running.");
    }

    setIsLoading(false);
  };

  const handleSelectHistoryItem = (item) => {
    setJobMessage(item.jobMessage || '');
    setJobUrl(item.url || '');
    if (item.result) {
      setCurrentResult(item.result);
    }
    setActiveTab('scanner');

    setTimeout(() => {
      const resultsElem = document.getElementById('results-view');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleClearHistory = async () => {
    try {
      const headers = token ? { 'Authorization': `Bearer ${token}` } : {};
      await fetch(`${API_BASE}/api/history`, { method: 'DELETE', headers });
    } catch (e) {
      console.warn("Could not delete remote history:", e);
    }
    setHistory([]);
  };

  const getSectionTitle = () => {
    switch (activeTab) {
      case 'home': return 'Home Overview';
      case 'scanner': return 'Check a Job';
      case 'companies': return 'Verified Companies';
      case 'insights': return 'Safety Insights';
      case 'history': return 'Audit History';
      case 'watchlist': return 'Saved / Watchlist';
      case 'profile': return 'My Profile';
      case 'settings': return 'Settings';
      default: return 'HireShield';
    }
  };

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 bg-grid-pattern relative flex selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* PART 2: Responsive Multi-Device Sidebar & Mobile Drawer */}
      <DashboardSidebar 
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
        isMobileOpen={isMobileSidebarOpen}
        onCloseMobile={() => setIsMobileSidebarOpen(false)}
      />

      {/* Main Content Area (Responsive Left Padding: 0 on mobile, 20/64 on desktop) */}
      <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
        isSidebarCollapsed ? 'pl-0 md:pl-20' : 'pl-0 md:pl-20 lg:pl-64'
      }`}>
        
        {/* Top Floating App Bar */}
        <header className="sticky top-0 z-30 px-4 sm:px-6 py-3.5 bg-[#07090e]/85 backdrop-blur-xl border-b border-slate-800/80 flex items-center justify-between gap-3">
          
          {/* Left: Mobile Hamburger Trigger & Section Title */}
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setIsMobileSidebarOpen(true)}
              className="p-2 -ml-1 rounded-xl text-slate-300 hover:text-white hover:bg-slate-800 md:hidden transition-colors cursor-pointer"
              title="Open Navigation Menu"
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 text-cyan-400" />
            </button>

            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
              {getSectionTitle()}
            </h2>
          </div>

          {/* Right: User Avatar */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => setActiveTab('profile')}
              className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-cyan-400 cursor-pointer hover:border-cyan-500/50 transition-colors"
              title="View Profile"
            >
              {user?.name?.[0]?.toUpperCase() || 'U'}
            </button>
          </div>
        </header>

        {/* View Router Container (Responsive Padding) */}
        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6 md:p-8 space-y-6 sm:space-y-8 pb-24 md:pb-8">
          
          {/* VIEW 1: HOME (Default View) */}
          {activeTab === 'home' && (
            <HomeView 
              onOpenScanner={(initialQuery) => {
                if (initialQuery) setJobMessage(initialQuery);
                setActiveTab('scanner');
              }}
              onViewHistory={() => setActiveTab('history')}
              onNavigateVerified={() => setActiveTab('companies')}
            />
          )}

          {/* VIEW 2: CHECK A JOB (Full Scanner Console) */}
          {activeTab === 'scanner' && (
            <div className="space-y-7 animate-in fade-in duration-300">
              <Hero />

              <section id="analysis-form">
                <AnalysisForm
                  jobMessage={jobMessage}
                  setJobMessage={setJobMessage}
                  jobUrl={jobUrl}
                  setJobUrl={setJobUrl}
                  selectedImage={selectedImage}
                  setSelectedImage={setSelectedImage}
                  onAnalyze={handleAnalyze}
                  isLoading={isLoading}
                  apiError={apiError}
                />
              </section>

              {isLoading && <AnalyzingState />}

              {currentResult && !isLoading && (
                <section id="results-view" className="space-y-6 pt-3 animate-in fade-in duration-300">
                  <div className="flex items-center justify-between pb-2 border-b border-slate-800">
                    <div className="flex items-center gap-2">
                      <FileSearch className="w-5 h-5 text-cyan-400" />
                      <h2 className="text-xl font-bold text-slate-100 tracking-tight">
                        Job Safety Assessment
                      </h2>
                    </div>
                    <span className="text-xs text-cyan-300 bg-cyan-950/70 px-3 py-1 rounded-full border border-cyan-800/50 font-mono">
                      Report #{currentResult.passportId}
                    </span>
                  </div>

                  <TrustScoreGauge
                    score={currentResult.trustScore}
                    riskLevel={currentResult.riskLevel}
                    verdict={currentResult.verdict}
                    summary={currentResult.summary}
                  />

                  <WhatWeFoundCard
                    entities={currentResult.entities}
                    verifications={currentResult.verifications}
                    deductions={currentResult.deductions}
                  />

                  <VerificationChecksCard
                    verifications={currentResult.verifications}
                    deductions={currentResult.deductions}
                    entities={currentResult.entities}
                  />

                  <EvidenceTrailCard deductions={currentResult.deductions} />

                  <SafetyRecommendationsCard
                    recommendations={currentResult.recommendations}
                    riskLevel={currentResult.riskLevel}
                  />

                  <JobTrustPassport
                    passportData={currentResult}
                    passportId={currentResult.passportId}
                    company={currentResult.entities?.company || 'Verified Entity'}
                    trustScore={currentResult.trustScore}
                    riskLevel={currentResult.riskLevel}
                    riskColor={currentResult.riskColor}
                    verdict={currentResult.verdict}
                    timestamp={currentResult.timestamp}
                    entities={currentResult.entities}
                  />
                </section>
              )}
            </div>
          )}

          {/* VIEW 3: VERIFIED COMPANIES */}
          {activeTab === 'companies' && (
            <VerifiedCompaniesView />
          )}

          {/* VIEW 4: SAFETY INSIGHTS */}
          {activeTab === 'insights' && (
            <SafetyInsightsView 
              onNavigateScanner={() => setActiveTab('scanner')}
              onAuditOffer={() => setActiveTab('scanner')} 
            />
          )}

          {/* VIEW 5: AUDIT HISTORY */}
          {activeTab === 'history' && (
            <HistoryTab
              history={history}
              onSelectHistoryItem={handleSelectHistoryItem}
              onSelectHistory={handleSelectHistoryItem}
              onClearHistory={handleClearHistory}
              onSwitchToScanner={() => setActiveTab('scanner')}
            />
          )}

          {/* VIEW 6: SAVED / WATCHLIST */}
          {activeTab === 'watchlist' && (
            <WatchlistView onOpenScanner={() => setActiveTab('scanner')} />
          )}

          {/* VIEW 7: MY PROFILE */}
          {activeTab === 'profile' && (
            <ProfileView />
          )}

          {/* VIEW 8: SETTINGS */}
          {activeTab === 'settings' && (
            <SettingsView />
          )}

        </main>

        {/* Footer */}
        <footer className="border-t border-slate-900 bg-slate-950/40 py-5 px-6 text-center text-xs text-slate-500 font-mono hidden md:block">
          <p>© 2026 HireShield Security Intelligence • All verification executed deterministically.</p>
        </footer>

        {/* Mobile Bottom Navigation Bar (Phones & Small Tablets only) */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0a0f1d]/95 backdrop-blur-2xl border-t border-slate-800/90 py-2 px-2 flex items-center justify-around shadow-2xl">
          {[
            { id: 'home', label: 'Home', icon: Home },
            { id: 'scanner', label: 'Check Job', icon: ShieldAlert },
            { id: 'companies', label: 'Companies', icon: Building2 },
            { id: 'insights', label: 'Insights', icon: BarChart3 },
            { id: 'profile', label: 'Profile', icon: User },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;

            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-xl transition-all cursor-pointer ${
                  isActive
                    ? 'text-cyan-400 bg-cyan-500/10 font-bold'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
                <span className="text-[10px] font-medium tracking-tight">{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

    </div>
  );
}

function MainApp() {
  const { user, isLoading } = useAuth();

  // Loading Splash Screen
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#070a12] flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-40" />
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <div className="relative flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 p-[2px] shadow-2xl shadow-cyan-500/40 animate-pulse">
            <div className="w-full h-full bg-[#0b101d] rounded-[22px] flex items-center justify-center">
              <Shield className="w-8 h-8 text-cyan-400" />
            </div>
          </div>
          <div className="flex items-center gap-2 text-cyan-400 font-bold text-sm tracking-wider uppercase font-mono">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span>Initializing HireShield Security...</span>
          </div>
        </div>
      </div>
    );
  }

  // PART 1: 3D Scroll Landing Page for Unauthenticated Visitors
  if (!user) {
    return <ScrollLandingPage />;
  }

  // PART 2: Cyber Dashboard with Left Sidebar for Logged-In Users
  return <Dashboard />;
}

export function App() {
  return (
    <PreferencesProvider>
      <AuthProvider>
        <MainApp />
      </AuthProvider>
    </PreferencesProvider>
  );
}

export default App;
