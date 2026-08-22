export const MOCK_SCENARIOS = [
  {
    id: "scam-equipment-fee",
    title: "🚨 High-Risk: Equipment Fee Scam",
    badge: "High Risk",
    badgeColor: "rose",
    message: `Dear Candidate,
Congratulations! Following your resume review, you have been selected for the Remote Data Entry Specialist position at Apex Global Logistics. Salary is $48/hour.

To proceed with your workstation dispatch, you are required to purchase home office hardware via our authorized vendor by sending $350 via Zelle/Wire. This amount will be 100% reimbursed on your first paycheck. Please reply with your full legal name, SSN, and WhatsApp number immediately to lock in your slot.

Best regards,
Sarah Jenkins
Recruitment Director
Apex Global Logistics (apexcareers-jobs-portal.top)`,
    url: "https://apexcareers-jobs-portal.top/onboarding-fee",
    result: {
      trustScore: 18,
      riskLevel: "High",
      riskColor: "rose",
      verdict: "High-Confidence Recruitment Scam Detected",
      summary: "Severe risk indicators detected including upfront payment requests, domain spoofing, and urgent personal data harvesting.",
      entities: {
        company: "Apex Global Logistics",
        recruiter: "Sarah Jenkins",
        email: "sarah.jenkins@apexcareers-jobs-portal.top",
        phone: "+1 (555) 942-0193",
        jobTitle: "Remote Data Entry Specialist",
        domain: "apexcareers-jobs-portal.top",
        paymentAmount: "$350.00 (Zelle/Wire)",
        salaryClaim: "$48.00 / hour"
      },
      deductions: [
        { id: 1, signal: "Upfront Payment / Equipment Fee Demand", penalty: -40, severity: "Critical", description: "Demands $350 upfront fee via non-reversible payment channel (Zelle/Wire)." },
        { id: 2, signal: "Suspicious Domain / Spoofing Risk", penalty: -25, severity: "High", description: "Domain 'apexcareers-jobs-portal.top' registered 4 days ago with high-risk TLD (.top)." },
        { id: 3, signal: "Urgent Data Harvesting (SSN / WhatsApp)", penalty: -15, severity: "High", description: "Requests sensitive SSN and attempts to move communication to off-platform chat." },
        { id: 4, signal: "Unrealistic Compensation for Role", penalty: -10, severity: "Medium", description: "Entry-level data entry offered at 300% above median market rate with no interview." },
        { id: 5, signal: "No Verifiable Corporate Identity", penalty: -10, severity: "Medium", description: "Recruiter identity does not match legitimate Apex Logistics executive records." }
      ],
      verifications: [
        { name: "Domain WHOIS Age", status: "Failed", detail: "Domain created 4 days ago (Risk > 90%)" },
        { name: "Google Safe Browsing", status: "Warning", detail: "Flagged under social engineering / phishing cluster" },
        { name: "Recruiter Email Domain Match", status: "Failed", detail: "Free/disposable hosting pattern, not corporate MX" },
        { name: "Corporate Registry Check", status: "Unverified", detail: "Apex Global Logistics exists, but domain is unauthorized alias" }
      ],
      recommendations: [
        "DO NOT send money or purchase equipment via their provided links.",
        "Never share Social Security Numbers or banking info prior to formal verified contracts.",
        "Report the sender domain to ICANN and Google Safe Browsing."
      ],
      passportId: "HSP-2026-88942-X",
      timestamp: "2026-08-22T10:48:00Z"
    }
  },
  {
    id: "suspicious-telegram-crypto",
    title: "⚠️ Suspicious: Telegram Task Scam",
    badge: "Suspicious",
    badgeColor: "amber",
    message: `Hello! I am Emily from TalentPeak HR. We found your profile on LinkedIn and have an urgent remote freelance opening. You can earn $150–$400 daily by simply reviewing hotel listings and optimizing web traffic.

No prior experience required! Immediate payout via USDT / Crypto wallet. Please message our hiring manager on Telegram: @TalentPeak_Emily to begin onboarding training right now. Slots are limited to the first 10 applicants!`,
    url: "https://t.me/TalentPeak_Emily",
    result: {
      trustScore: 42,
      riskLevel: "Suspicious",
      riskColor: "amber",
      verdict: "Suspicious Task / Commission Scam Pattern",
      summary: "Typical fake job pattern redirecting to off-platform messaging with cryptocurrency payout hooks and artificial scarcity.",
      entities: {
        company: "TalentPeak HR",
        recruiter: "Emily",
        email: "Not provided",
        phone: "Not provided",
        jobTitle: "Remote Freelance Optimization",
        domain: "t.me",
        paymentAmount: "Crypto / USDT Task System",
        salaryClaim: "$150–$400 / day"
      },
      deductions: [
        { id: 1, signal: "Off-Platform Redirection (Telegram)", penalty: -25, severity: "High", description: "Directs applicant immediately away from verified channels to untraceable Telegram handle." },
        { id: 2, signal: "Cryptocurrency Payout Structure", penalty: -20, severity: "High", description: "Tasks paid in crypto often lead to deposits required to unlock earnings." },
        { id: 3, signal: "Artificial Urgency & Vague Job Scope", penalty: -15, severity: "Medium", description: "'First 10 applicants only' with zero technical requirements or interview." }
      ],
      verifications: [
        { name: "Domain WHOIS Age", status: "Neutral", detail: "t.me (Telegram Official Host)" },
        { name: "Recruiter Email Domain Match", status: "Failed", detail: "No corporate email provided" },
        { name: "Job Authenticity Score", status: "Warning", detail: "High match with known brush/task scam taxonomy" }
      ],
      recommendations: [
        "Avoid engaging on Telegram for formal hiring without verified email proof.",
        "Refuse any task platform that asks you to deposit funds to 'boost' commission.",
        "Request a verified company email (@talentpeak.com) and job requisition ID."
      ],
      passportId: "HSP-2026-51209-T",
      timestamp: "2026-08-22T09:30:00Z"
    }
  },
  {
    id: "legit-tech-role",
    title: "✅ Legitimate: Senior Frontend Engineer",
    badge: "Low Risk",
    badgeColor: "emerald",
    message: `Hi Alex,
I am Michael Sterling, Lead Tech Recruiter at CloudScale Systems (cloudscale.io). I came across your GitHub repositories and was impressed by your work on distributed UI systems.

We are currently hiring a Senior Frontend Engineer for our Platform team. The salary band is $160,000–$185,000 + equity. The process involves an initial 30-min recruiter screen, followed by a system design discussion.

If interested, you can view the official job spec here: https://cloudscale.io/careers/sr-frontend-eng and book a time directly on my calendar: https://cloudscale.io/team/m-sterling.

Best,
Michael Sterling
michael.sterling@cloudscale.io
CloudScale Systems, Inc.`,
    url: "https://cloudscale.io/careers/sr-frontend-eng",
    result: {
      trustScore: 96,
      riskLevel: "Low",
      riskColor: "emerald",
      verdict: "High Trust & Verified Legitimate Recruitment",
      summary: "Domain MX matches recruiter email, legitimate domain age (>7 years), standard transparent interview process, no financial demands.",
      entities: {
        company: "CloudScale Systems",
        recruiter: "Michael Sterling",
        email: "michael.sterling@cloudscale.io",
        phone: "Not provided",
        jobTitle: "Senior Frontend Engineer",
        domain: "cloudscale.io",
        paymentAmount: "None (Standard Compensation)",
        salaryClaim: "$160,000–$185,000 / year + equity"
      },
      deductions: [],
      verifications: [
        { name: "Domain WHOIS Age", status: "Passed", detail: "Domain registered in 2017 (7+ years established)" },
        { name: "Google Safe Browsing", status: "Passed", detail: "Clean reputation, no malicious records" },
        { name: "Recruiter Email Domain Match", status: "Passed", detail: "Direct match to registered domain MX records" },
        { name: "Corporate Presence Check", status: "Passed", detail: "Active SSL, valid DNSSEC, verifiable LinkedIn profile" }
      ],
      recommendations: [
        "Proceed with confidence. Verified corporate domain and standard hiring procedure.",
        "Ensure all subsequent interview correspondence remains within the official @cloudscale.io domain."
      ],
      passportId: "HSP-2026-10492-V",
      timestamp: "2026-08-22T08:15:00Z"
    }
  }
];
