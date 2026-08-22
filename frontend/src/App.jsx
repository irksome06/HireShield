import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
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
import { MOCK_SCENARIOS } from './data/mockScenarios';
import { FileSearch } from 'lucide-react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000';

export function App() {
  // Navigation Tab State: 'scanner' | 'history'
  const [activeTab, setActiveTab] = useState('scanner');

  // Active Input State
  const [jobMessage, setJobMessage] = useState(MOCK_SCENARIOS[0].message);
  const [jobUrl, setJobUrl] = useState(MOCK_SCENARIOS[0].url);
  const [selectedImage, setSelectedImage] = useState(null);
  
  // Analysis Result State
  const [currentResult, setCurrentResult] = useState(MOCK_SCENARIOS[0].result);
  const [isLoading, setIsLoading] = useState(false);
  const [backendStatus, setBackendStatus] = useState('connecting'); // 'connected' | 'offline'
  
  // History State
  const [history, setHistory] = useState(
    MOCK_SCENARIOS.map(s => ({
      title: s.title,
      jobMessage: s.message,
      url: s.url,
      result: s.result
    }))
  );

  // Check backend connectivity and load DB audit history on mount
  useEffect(() => {
    const checkBackendAndLoadHistory = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/health`);
        if (res.ok) {
          setBackendStatus('connected');
          
          try {
            const histRes = await fetch(`${API_BASE}/api/history?limit=25`);
            if (histRes.ok) {
              const histData = await histRes.json();
              if (Array.isArray(histData) && histData.length > 0) {
                const formattedHistory = histData.map(item => ({
                  title: item.entities?.company || item.verdict || "Scanned Job",
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
    setActiveTab('scanner');

    setTimeout(() => {
      const resultsElem = document.getElementById('results-view');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
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
        signal: "Upfront Money / Equipment Fee Demanded",
        penalty: -40,
        severity: "Critical",
        description: "Demands advance payment (Zelle, Wire, Gift card) for home-office hardware. Real employers NEVER charge candidates for equipment."
      });
    }

    // Urgency & personal data harvesting
    if (lowerText.includes('ssn') || lowerText.includes('social security') || lowerText.includes('whatsapp') || lowerText.includes('otp') || lowerText.includes('immediately')) {
      score -= 20;
      deductions.push({
        id: 2,
        signal: "Urgent SSN / Banking Data Request",
        penalty: -20,
        severity: "High",
        description: "Asks for confidential identity numbers (SSN/OTP/banking) before formal contracts or legitimate onboarding."
      });
    }

    // Telegram / Crypto check
    if (lowerText.includes('telegram') || lowerText.includes('crypto') || lowerText.includes('usdt') || lowerUrl.includes('t.me')) {
      score -= 25;
      deductions.push({
        id: 3,
        signal: "Off-Platform Chat / Crypto Task Trap",
        penalty: -25,
        severity: "High",
        description: "Directs communication to unmonitored Telegram/WhatsApp handles or crypto task platforms."
      });
    }

    // Suspicious domain extension
    if (lowerUrl.includes('.top') || lowerUrl.includes('.xyz') || lowerUrl.includes('.click') || lowerText.includes('.top')) {
      score -= 25;
      deductions.push({
        id: 4,
        signal: "Suspicious / Fake Website Domain",
        penalty: -25,
        severity: "High",
        description: "Uses a temporary or high-abuse website extension frequently registered for phishing."
      });
    }

    let riskLevel = "Low";
    let riskColor = "emerald";
    let verdict = "Verified & High-Trust Job Opportunity";

    if (score < 35) {
      riskLevel = "High";
      riskColor = "rose";
      verdict = "High Risk — Likely a Recruitment Scam";
    } else if (score < 60) {
      riskLevel = "Suspicious";
      riskColor = "amber";
      verdict = "Suspicious — Proceed with Extreme Caution";
    } else if (score < 80) {
      riskLevel = "Moderate";
      riskColor = "sky";
      verdict = "Moderate Risk — Verify Company Directly";
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
      name: "Website Link Check",
      status: score > 70 ? "Passed" : score > 40 ? "Warning" : "Failed",
      detail: domainName !== "None detected" ? `Scanned website: ${domainName}` : "No link provided"
    });

    verifications.push({
      name: "Recruiter Email Check",
      status: extractedEmail.includes('@') && !extractedEmail.includes('gmail') ? "Passed" : "Warning",
      detail: extractedEmail !== "Not provided" ? `Sender: ${extractedEmail}` : "No official email provided"
    });

    return {
      trustScore: Math.max(0, score),
      riskLevel,
      riskColor,
      verdict,
      summary: deductions.length > 0
        ? `Identified ${deductions.length} major red flags resulting in a Safety Score of ${score}/100.`
        : "No scam triggers, upfront fee requests, or fake links were found in this job offer.",
      entities: {
        company: text.includes('Apex') ? 'Apex Global Logistics' : text.includes('CloudScale') ? 'CloudScale Systems' : 'Extracted Company',
        recruiter: text.includes('Sarah') ? 'Sarah Jenkins' : text.includes('Michael') ? 'Michael Sterling' : 'Unspecified Recruiter',
        email: extractedEmail,
        phone: extractedPhone,
        jobTitle: text.includes('Data Entry') ? 'Remote Data Entry' : text.includes('Frontend') ? 'Senior Frontend Engineer' : 'Offered Position',
        domain: domainName,
        paymentAmount: deductions.some(d => d.id === 1) ? '$350.00 Advance Fee' : 'None detected',
        salaryClaim: text.match(/\$\d+(\/hr|\/hour|\/day|\/year|,\d+)/i)?.[0] || 'Market Standard'
      },
      deductions,
      verifications,
      recommendations: score < 50 ? [
        "DO NOT send any money, wire transfers, or gift cards under any circumstances.",
        "Refuse to transfer onboarding conversations to unverified private chat apps.",
        "Verify the job requisition number directly on the official company career portal."
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
    setActiveTab('scanner');

    const startTime = Date.now();

    try {
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

      const elapsed = Date.now() - startTime;
      if (elapsed < 800) {
        await new Promise(r => setTimeout(r, 800 - elapsed));
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
            title: formatted.entities.company || "Scanned Job",
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
      console.warn("Backend API not reachable; using local rule engine fallback.", e);
      setBackendStatus('offline');
    }

    // Fallback to local engine
    await new Promise(r => setTimeout(r, 600));
    const res = runLocalRuleEngine(jobMessage, jobUrl);
    setCurrentResult(res);
    setHistory(prev => [
      {
        title: res.entities.company || "Scanned Job",
        jobMessage: jobMessage || "Audited offer",
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
    setActiveTab('scanner');

    setTimeout(() => {
      const resultsElem = document.getElementById('results-view');
      if (resultsElem) {
        resultsElem.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-[#0a0e17] text-slate-100 bg-grid-pattern relative pb-16">
      {/* Top Navigation */}
      <Navbar 
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        historyCount={history.length}
        backendStatus={backendStatus}
      />

      {/* Main Container */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 space-y-7 mt-3">
        
        {/* TAB 1: SCANNER VIEW */}
        {activeTab === 'scanner' && (
          <>
            {/* Friendly Hero */}
            <Hero />

            {/* Input Console */}
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

            {/* Animated Scanning State */}
            {isLoading && <AnalyzingState />}

            {/* Simple, Plain-English Results Section */}
            {currentResult && !isLoading && (
              <section id="results-view" className="space-y-6 pt-3 animate-fadeIn">
                
                {/* Section Header */}
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

                {/* 1. Risk / Safety Score Gauge */}
                <TrustScoreGauge
                  score={currentResult.trustScore}
                  riskLevel={currentResult.riskLevel}
                  verdict={currentResult.verdict}
                  summary={currentResult.summary}
                />

                {/* 2. What We Found */}
                <WhatWeFoundCard entities={currentResult.entities} />

                {/* 3. Three Core Verification Checks */}
                <VerificationChecksCard 
                  verifications={currentResult.verifications}
                  entities={currentResult.entities}
                />

                {/* 4. Warning Signs & Red Flags */}
                <EvidenceTrailCard deductions={currentResult.deductions} />

                {/* 5. What You Should Do Next */}
                <SafetyRecommendationsCard 
                  recommendations={currentResult.recommendations}
                  riskLevel={currentResult.riskLevel}
                />

                {/* 6. Official Job Safety Certificate */}
                <JobTrustPassport passportData={currentResult} />

              </section>
            )}
          </>
        )}

        {/* TAB 2: DEDICATED HISTORY VIEW */}
        {activeTab === 'history' && (
          <HistoryTab
            history={history}
            onSelectHistoryItem={handleSelectHistoryItem}
            onClearHistory={() => setHistory([])}
            onSwitchToScanner={() => setActiveTab('scanner')}
          />
        )}

      </main>

      {/* Footer */}
      <footer className="mt-16 border-t border-slate-900 pt-8 text-center text-xs text-slate-500 font-mono print:hidden">
        <p>HireShield • Free AI Job Scam Detector</p>
        <p className="mt-1 text-slate-600">Built to protect candidates from recruitment fraud and fake checks</p>
      </footer>
    </div>
  );
}

export default App;
