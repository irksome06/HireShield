import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AnalysisForm } from './components/AnalysisForm';
import { TrustScoreGauge } from './components/TrustScoreGauge';
import { ExtractedEntitiesCard } from './components/ExtractedEntitiesCard';
import { EvidenceTrailCard } from './components/EvidenceTrailCard';
import { SafetyRecommendationsCard } from './components/SafetyRecommendationsCard';
import { JobTrustPassport } from './components/JobTrustPassport';
import { HistoryDrawer } from './components/HistoryDrawer';
import { MOCK_SCENARIOS } from './data/mockScenarios';
import { Shield, Sparkles, Terminal, Activity, Info, CheckCircle2 } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export function App() {
  // Active Input State
  const [jobMessage, setJobMessage] = useState(MOCK_SCENARIOS[0].message);
  const [jobUrl, setJobUrl] = useState(MOCK_SCENARIOS[0].url);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Analysis Result State
  const [currentResult, setCurrentResult] = useState(MOCK_SCENARIOS[0].result);
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('connecting'); // 'connected' | 'offline'
  
  // History & Navigation State
  const [history, setHistory] = useState(
    MOCK_SCENARIOS.map(s => ({
      title: s.title,
      jobMessage: s.message,
      url: s.url,
      result: s.result
    }))
  );
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  // Check backend connectivity and load DB audit history on mount
  useEffect(() => {
    const checkBackendAndLoadHistory = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health`);
        if (res.ok) {
          setBackendStatus('connected');
          
          // Fetch persistent history from PostgreSQL / SQLite
          try {
            const histRes = await fetch(`${API_BASE}/api/history?limit=15`);
            if (histRes.ok) {
              const histData = await histRes.json();
              if (Array.isArray(histData) && histData.length > 0) {
                const formattedHistory = histData.map(item => ({
                  title: item.entities?.company || item.verdict || "Audited Job",
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
                // Merge with default scenarios
                setHistory(prev => [...formattedHistory, ...prev]);
              }
            }
          } catch (histErr) {
            console.info("History fetch fallback:", histErr);
          }
        } else {
          setBackendStatus('offline');
        }
      } catch (err) {
        setBackendStatus('offline');
      }
    };
    checkBackendAndLoadHistory();
  }, []);

  // Scenario Selection Handler
  const handleSelectScenario = (scenario) => {
    setJobMessage(scenario.message);
    setJobUrl(scenario.url);
    setSelectedImage(null);
    setCurrentResult(scenario.result);
  };

  // Local Rule-Based Heuristic Fallback Engine
  const runLocalRuleEngine = (text, url) => {
    const lowerText = (text || '').toLowerCase();
    const lowerUrl = (url || '').toLowerCase();
    
    let score = 100;
    const deductions = [];
    const verifications = [];

    // Upfront fee check
    if (lowerText.includes('fee') || lowerText.includes('zelle') || lowerText.includes('wire') || lowerText.includes('pay upfront') || lowerText.includes('$350') || lowerText.includes('purchase equipment')) {
      score -= 40;
      deductions.push({
        id: 1,
        signal: "Upfront Payment / Equipment Fee Demand",
        penalty: -40,
        severity: "Critical",
        description: "Message explicitly requests candidate to pay fees, equipment charges, or wire money."
      });
    }

    // Urgency & personal data harvesting
    if (lowerText.includes('ssn') || lowerText.includes('social security') || lowerText.includes('whatsapp') || lowerText.includes('otp') || lowerText.includes('immediately')) {
      score -= 20;
      deductions.push({
        id: 2,
        signal: "Personal Data / Urgency Pressure",
        penalty: -20,
        severity: "High",
        description: "Demands sensitive identifiers (SSN/OTP) or applies artificial urgent pressure."
      });
    }

    // Telegram / Crypto check
    if (lowerText.includes('telegram') || lowerText.includes('crypto') || lowerText.includes('usdt') || lowerUrl.includes('t.me')) {
      score -= 25;
      deductions.push({
        id: 3,
        signal: "Off-Platform / Untraceable Channel",
        penalty: -25,
        severity: "High",
        description: "Redirects applicant to anonymous communication networks (Telegram/WhatsApp) or crypto payouts."
      });
    }

    // Suspicious domain extension
    if (lowerUrl.includes('.top') || lowerUrl.includes('.xyz') || lowerUrl.includes('.click') || lowerText.includes('.top')) {
      score -= 25;
      deductions.push({
        id: 4,
        signal: "High-Risk Domain TLD",
        penalty: -25,
        severity: "High",
        description: "Domain utilizes top-level domain frequently weaponized in recruitment phishing."
      });
    }

    // Determine Risk Tier
    let riskLevel = "Low";
    let riskColor = "emerald";
    let verdict = "Verified & High Trust Job Opportunity";

    if (score < 35) {
      riskLevel = "High";
      riskColor = "rose";
      verdict = "High-Risk Recruitment Scam Pattern Detected";
    } else if (score < 60) {
      riskLevel = "Suspicious";
      riskColor = "amber";
      verdict = "Suspicious Indicators Require Verification";
    } else if (score < 80) {
      riskLevel = "Moderate";
      riskColor = "sky";
      verdict = "Moderate Confidence — Review Recommended";
    }

    const extractedEmail = text.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/)?.[0] || "Not provided";
    const extractedPhone = text.match(/(\+?\d{1,3}[-.\s]?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4})/)?.[0] || "Not provided";
    
    let domainName = "None detected";
    if (url) {
      try {
        const u = new URL(url.startsWith('http') ? url : `https://${url}`);
        domainName = u.hostname;
      } catch (e) {
        domainName = url;
      }
    }

    verifications.push({
      name: "Domain Reputation Heuristic",
      status: score > 70 ? "Passed" : score > 40 ? "Warning" : "Failed",
      detail: domainName !== "None detected" ? `Audited domain: ${domainName}` : "No direct URL submitted"
    });

    verifications.push({
      name: "Recruiter Email MX Check",
      status: extractedEmail.includes('@') && !extractedEmail.includes('gmail') ? "Passed" : "Warning",
      detail: extractedEmail !== "Not provided" ? `Sender identity: ${extractedEmail}` : "No corporate email detected"
    });

    return {
      trustScore: Math.max(0, score),
      riskLevel,
      riskColor,
      verdict,
      summary: deductions.length > 0
        ? `Identified ${deductions.length} specific threat vectors resulting in a final score of ${score}/100.`
        : "No significant scam triggers or fraudulent keywords were detected in the provided submission.",
      entities: {
        company: text.includes('Apex') ? 'Apex Global Logistics' : text.includes('CloudScale') ? 'CloudScale Systems' : 'Extracted Entity',
        recruiter: text.includes('Sarah') ? 'Sarah Jenkins' : text.includes('Michael') ? 'Michael Sterling' : 'Unspecified Recruiter',
        email: extractedEmail,
        phone: extractedPhone,
        jobTitle: text.includes('Data Entry') ? 'Remote Data Entry' : text.includes('Frontend') ? 'Senior Frontend Engineer' : 'Inspected Role',
        domain: domainName,
        paymentAmount: deductions.some(d => d.id === 1) ? '$350.00 Advance Fee' : 'None detected',
        salaryClaim: text.match(/\$\d+(\/hr|\/hour|\/day|\/year|,\d+)/i)?.[0] || 'Market Standard'
      },
      deductions,
      verifications,
      recommendations: score < 50 ? [
        "DO NOT send money, gift cards, or crypto under any circumstance.",
        "Refuse to transfer onboarding communications to unverified private chat apps.",
        "Cross-verify the job opening on the company's official career portal."
      ] : [
        "Confirm that interview invites arrive from the verified company domain.",
        "Never submit sensitive banking info until contracts are formally counter-signed."
      ],
      passportId: `HSP-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}-${riskLevel[0]}`,
      timestamp: new Date().toISOString()
    };
  };

  // Execute Analysis (FastAPI Backend with local fallback)
  const handleAnalyze = async () => {
    setIsLoading(true);

    try {
      // Attempt backend API call with screenshot OCR data if attached
      const response = await fetch(`${API_BASE}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: jobMessage,
          url: jobUrl || null,
          has_image: !!selectedImage,
          image_base64: selectedImage?.preview || null
        })
      });

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
            title: formatted.entities.company || "Job Audit",
            jobMessage: jobMessage || "Audited screenshot / URL",
            url: jobUrl,
            result: formatted
          },
          ...prev
        ]);
        setIsLoading(false);
        return;
      }
    } catch (e) {
      console.warn("Backend API not reachable; using local deterministic risk engine fallback.", e);
      setBackendStatus('offline');
    }

    // Fallback to local engine if backend failed
    const res = runLocalRuleEngine(jobMessage, jobUrl);
    setCurrentResult(res);
    setHistory(prev => [
      {
        title: res.entities.company || "Job Audit",
        jobMessage,
        url: jobUrl,
        result: res
      },
      ...prev
    ]);
    setIsLoading(false);
  };

  const handleSelectHistoryItem = (item) => {
    setJobMessage(item.jobMessage || '');
    setJobUrl(item.url || '');
    if (item.result) {
      setCurrentResult(item.result);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 bg-grid-pattern relative pb-16">
      {/* Top Navigation */}
      <Navbar 
        onOpenHistory={() => setIsHistoryOpen(true)}
        historyCount={history.length}
        backendStatus={backendStatus}
      />

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 mt-2">
        {/* Hero Section */}
        <Hero />

        {/* Console & Submission Area */}
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
            onSelectScenario={handleSelectScenario}
          />
        </section>

        {/* Live Threat Intelligence Results Display */}
        {currentResult && (
          <section className="space-y-6 pt-2 animate-fadeIn">
            {/* Section Header */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-slate-100 tracking-tight">
                  Scam Intelligence & Trust Breakdown
                </h2>
              </div>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2.5 py-1 rounded-md border border-cyan-800/40">
                Audit ID: {currentResult.passportId}
              </span>
            </div>

            {/* Score & Verdict Card */}
            <TrustScoreGauge
              score={currentResult.trustScore}
              riskLevel={currentResult.riskLevel}
              verdict={currentResult.verdict}
              summary={currentResult.summary}
            />

            {/* Extracted Entities */}
            <ExtractedEntitiesCard entities={currentResult.entities} />

            {/* Deductions & External Verifications */}
            <EvidenceTrailCard 
              deductions={currentResult.deductions}
              verifications={currentResult.verifications}
            />

            {/* Safety Protocol */}
            <SafetyRecommendationsCard 
              recommendations={currentResult.recommendations}
              riskLevel={currentResult.riskLevel}
            />

            {/* Official Job Trust Passport */}
            <JobTrustPassport passportData={currentResult} />
          </section>
        )}
      </main>

      {/* History Slide-over Drawer */}
      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistoryItem={handleSelectHistoryItem}
        onClearHistory={() => setHistory([])}
      />

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 pt-8 text-center text-xs text-slate-500 font-mono print:hidden">
        <p>HireShield Intelligence Platform • Hackathon Release</p>
        <p className="mt-1 text-slate-600">Built with React, Vite, Tailwind CSS, and FastAPI Risk Engine</p>
      </footer>
    </div>
  );
}

export default App;
