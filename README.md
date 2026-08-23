# 🛡️ HireShield — Zero-Trust Recruitment Defense & Job Scam Intelligence

[![Live Demo](https://img.shields.io/badge/Live_Demo-hireshield--ro6i.onrender.com-06b6d4?style=for-the-badge&logo=render&logoColor=white)](https://hireshield-ro6i.onrender.com)
[![React](https://img.shields.io/badge/React_19-Vite_%2B_TailwindCSS-61dafb?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI_%28Python_3.11%29-009688?style=for-the-badge&logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![Gemini AI](https://img.shields.io/badge/AI_Engine-Google_Gemini_1.5-8e75ff?style=for-the-badge&logo=google&logoColor=white)](https://deepmind.google/technologies/gemini/)
[![Database](https://img.shields.io/badge/Database-PostgreSQL_%2F_SQLite-336791?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-blue?style=for-the-badge)](LICENSE)

> **HireShield** is an autonomous zero-trust recruitment security platform designed to protect job seekers, students, and professionals from advance-fee employment fraud, domain spoofing, recruiter impersonation, and anonymous task traps. Built with explainable deterministic scoring, multi-modal OCR ingestion, real-time MX/DNS telemetry, and cryptographic **Job Trust Passports™**.

---

## 📌 Table of Contents
1. [The Problem & Impact](#-the-problem--real-world-impact)
2. [How the Real Scan Mechanism Works](#-how-the-real-scan-mechanism-works)
3. [Architecture & Data Pipeline](#-system-architecture--data-pipeline)
4. [Deterministic Risk Deduction Matrix](#-deterministic-risk-deduction-matrix)
5. [Key Feature Suite](#-key-feature-suite)
6. [Tech Stack](#-technology-stack)
7. [API Reference & Examples](#-api-reference)
8. [Local Development & Setup](#-local-development--setup)
9. [Hackathon Judging Alignment](#-hackathon-judging-alignment)
10. [License](#-license)

---

## 🚨 The Problem & Real-World Impact

Recruitment fraud has escalated into an organized multi-billion dollar cybercrime industry:
- **$3.8B+ Lost Annually**: Job seekers lose thousands in fake "home office equipment checks", fake training fees, and upfront identity theft.
- **Sophisticated Impersonation**: Fraudsters create typo-squatted domains (`stripe-careers.top`, `amazon-onboarding.xyz`) and send convincing PDF offer letters.
- **Off-Platform Redirection**: Scammers deflect victims to Telegram, WhatsApp, and Zelle to bypass corporate enterprise security.
- **Black-Box AI Fallacy**: Generic LLMs hallucinate or provide vague warnings without actionable, mathematically verifiable evidence.

**HireShield solves this by replacing black-box guesswork with deterministic, rule-based forensic verification backed by real-time DNS, MX, and cryptographic proofs.**

---

## 🔬 How the Real Scan Mechanism Works

HireShield executes a **5-stage multi-vector pipeline** whenever a job offer text, URL, PDF, or screenshot is submitted:

```
[ Raw Offer Text / URL / PDF / Screenshot ]
                     │
                     ▼
┌────────────────────────────────────────────────────────┐
│ 1. Multi-Modal Ingestion & OCR Processing              │
│    • Pytesseract OCR & Gemini Vision Engine            │
│    • PDFPlumber text extraction & sanitization         │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│ 2. Dual-Engine Structured Entity Extraction            │
│    • Primary: Google Gemini Structured JSON Schema     │
│    • Fallback: Deterministic Regex Heuristic Engine    │
│    • Extracted: Company, Recruiter, Email, Salary, Fee │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│ 3. Deep Forensic Network & Domain Telemetry            │
│    • Corporate MX & DNS Server Handshake Verification  │
│    • Recruiter Email Domain vs Company Domain Matching │
│    • High-Risk TLD & Typosquatting Pattern Analysis    │
│    • Google Safe Browsing / Phishing Threat Sensor     │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│ 4. Deterministic Risk & Penalty Engine (0–100)         │
│    • Base Trust Score: 100 Points                      │
│    • Rule-based mathematical penalty deduction         │
│    • 100% Explainable Evidence Audit Trail             │
└────────────────────────────┬───────────────────────────┘
                             │
                             ▼
┌────────────────────────────────────────────────────────┐
│ 5. Cryptographic Job Trust Passport™ Generation        │
│    • Unique Passport ID (HSP-2026-XXXX)                │
│    • SHA-256 Digest & Digital Integrity Signature      │
│    • Exportable PDF Certificate & Audit Persistence    │
└────────────────────────────────────────────────────────┘
```

### 1. Multi-Modal Ingestion & OCR
- Users can paste text, enter a job URL, upload offer letter PDFs, or drag-and-drop screenshots.
- Screenshots are parsed using **Tesseract OCR** with automated cross-platform binary discovery and **Gemini Vision fallback**.

### 2. Dual-Engine Structured Entity Extraction
- Uses **Google Gemini 1.5** with strict structured JSON schema enforcement (`app/services/extractor.py`).
- If offline or API rate-limited, HireShield automatically falls back to an internal **regex token parser** to guarantee 100% uptime with zero crashes.
- Extracts: Target Company, Recruiter Name, Contact Email, Phone, Domain, Salary Claims, and Demanded Upfront Fees.

### 3. Deep Forensic Network & Domain Telemetry
- **Corporate MX Record Verification**: Inspects DNS MX servers (`app/services/verifier.py`) to confirm whether the recruiter's email domain has valid mail exchangers.
- **Recruiter Email Match**: Flags recruiters claiming to represent Fortune 500 companies while communicating from free webmail (`@gmail.com`, `@yahoo.com`) or mismatched domains.
- **TLD Abuse & Typosquatting**: Identifies high-risk extensions (`.top`, `.xyz`, `.click`, `.buzz`, `.cam`, `.work`) and keyword-stuffed domains (`career-apply-portal`).
- **Google Safe Browsing**: Performs real-time API queries against known malicious URL lists.

### 4. Deterministic Risk & Penalty Engine
- Calculates a transparent **0–100 Trust Score**.
- Unlike black-box neural networks, every penalty is tied to an explicit rule ID, severity level, and plain-English deduction description.

### 5. Cryptographic Job Trust Passport™
- Issues a digitally signed certificate with a unique passport ID, timestamp, cryptographic SHA-256 hash, and exportable PDF credential.

---

## ⚖️ Deterministic Risk Deduction Matrix

| Risk Signal | Severity | Penalty | Forensic Rule Description |
|---|---|---|---|
| **Upfront Payment / Equipment Demands** | `Critical` | **-40 pts** | Explicit requests for advance fees, hardware purchasing, Zelle, Wire, Gift Card, or Crypto transfers before hire. |
| **Sensitive Identity / OTP Harvesting** | `High` | **-25 pts** | Soliciting confidential credentials (SSN, OTP, bank routing, passport copies) before official onboarding contracts. |
| **High-Risk Domain TLD & Spoofing** | `High` | **-25 pts** | Domain utilizes high-abuse extensions (`.top`, `.xyz`, `.click`) or multi-hyphen typosquatting structures. |
| **Off-Platform Redirection (Telegram/WhatsApp)** | `High` | **-20 pts** | Deflecting candidate communication to unindexed messaging apps to avoid enterprise logging. |
| **Recruiter Email Domain Mismatch** | `Medium` | **-20 pts** | Recruiter uses free webmail or sender MX does not match the employer's official domain. |
| **Artificial Urgency & Guaranteed Selection** | `Medium` | **-15 pts** | "No interview needed", "first 5 applicants get $500/day", or high-pressure immediate acceptance deadlines. |

### 🎯 Risk Classification Tiers
* **80 – 100 (High Trust)**: Verified corporate identity, authentic domain MX records, standard recruitment lifecycle.
* **60 – 79 (Moderate Risk)**: Plausible offer, but secondary verification through official corporate careers portal advised.
* **35 – 59 (Suspicious)**: Multiple anomalies detected; off-platform contact or suspicious domain.
* **0 – 34 (Critical Threat)**: Malicious scam pattern detected (advance fee, fake check, or credential harvesting).

---

## 🌟 Key Feature Suite

* **🖥️ 3D Interactive Cyber Terminal**: Built with CSS 3D perspective matrix math, clamshell opening animation, and gyro-parallax cursor tracking.
* **⚡ Live Quick Scan & OCR**: Paste raw text or drop an image screenshot for instantaneous entity parsing and threat breakdown.
* **🏢 Verified Companies Directory**: Browse pre-verified enterprise domains (Stripe, Razorpay, Google, Canva, etc.) with validated MX records and direct career portals.
* **📜 Official Job Trust Passport™**: Export notarized PDF verification certificates with SHA-256 cryptographic hashes.
* **🔒 Enterprise Multi-Tenant Auth**: Secure JWT-based authentication with password hashing and Google OAuth integration.
* **📊 Multi-Channel Simulation Sandbox**: Test realistic scam offer scenarios (advance fee checks, Telegram task scams, domain spoofing) in safe simulation chambers.

---

## 💻 Technology Stack

### Frontend
- **Framework**: React 19 + Vite
- **Styling**: Vanilla TailwindCSS v4 + Custom Cyberpunk / Glassmorphism Design System
- **Icons & UI**: Lucide React + Canvas Confetti + PDF Generation (`html2pdf.js`)
- **3D Graphics**: Pure CSS 3D Transforms (`preserve-3d`, dynamic gyroscopic matrix transforms)

### Backend
- **Engine**: FastAPI (Python 3.11)
- **AI / LLM**: Google Gemini 1.5 Flash (Structured Schema API)
- **OCR / Document Parsing**: Pytesseract, PDFPlumber, Pillow (PIL)
- **Networking & DNS**: `dnspython`, `tldextract`, `requests`
- **Database & ORM**: PostgreSQL (Production) / SQLite (Development) via SQLAlchemy
- **Security & Auth**: OAuth2 with Password Bearer, JWT (`python-jose`), Passlib (`bcrypt`)

---

## 📡 API Reference

### 1. Analyze Job Offer
`POST /api/analyze`
```json
{
  "message": "Selected for remote role! Send $350 via Zelle for equipment setup to david@stripe-careers.top",
  "url": "https://stripe-careers.top",
  "has_image": false
}
```
**Response Preview:**
```json
{
  "passport_id": "HSP-2026-A89F",
  "trust_score": 10,
  "risk_level": "High",
  "risk_color": "rose",
  "verdict": "Critical Threat Detected",
  "summary": "Message explicitly demands upfront hardware payment via unverified channels and utilizes an ephemeral high-risk domain.",
  "entities": {
    "company": "Stripe",
    "recruiter": "david@stripe-careers.top",
    "email": "david@stripe-careers.top",
    "domain": "stripe-careers.top",
    "payment_amount": "$350 via Zelle",
    "extraction_method": "Google Gemini 1.5 JSON"
  },
  "deductions": [
    {
      "id": 1,
      "signal": "Upfront Payment / Equipment Fee Demand",
      "penalty": -40,
      "severity": "Critical",
      "description": "Message explicitly demands advance funds or non-reversible money transfers prior to employment."
    },
    {
      "id": 2,
      "signal": "High-Risk Domain TLD & Spoofing Indicator",
      "penalty": -25,
      "severity": "High",
      "description": "Domain utilizes an extension heavily associated with recruitment phishing."
    }
  ],
  "verifications": [
    {
      "name": "Domain Registry TLD Check",
      "status": "Failed",
      "detail": "Domain 'stripe-careers.top' uses '.top', a high-risk TLD frequently abused for recruitment phishing."
    }
  ],
  "recommendations": [
    "Do NOT send money, gift cards, or wire transfers for home office equipment.",
    "Verify the job listing directly on the employer's official careers portal."
  ],
  "timestamp": "2026-08-23T15:00:00Z"
}
```

### 2. Audit History & Retrieval
* `GET /api/history` — List authenticated user's scan history.
* `GET /api/history/{passport_id}` — Retrieve full cryptographic Job Trust Passport record.
* `GET /api/health` — System health check for FastAPI, database, and AI endpoints.

---

## 🚀 Local Development & Setup

### Prerequisites
- Node.js (v18+)
- Python (v3.10+)
- Git

### 1. Backend Setup
```bash
cd backend
python -m venv venv
# On Windows:
.\venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

pip install -r requirements.txt
uvicorn app.main:app --port 8000 --reload
```
*API docs available at `http://127.0.0.1:8000/docs`*

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
*App is live at `http://localhost:5173`*

---

## 🏆 Hackathon Judging Alignment

| Evaluation Criteria | How HireShield Excels |
|---|---|
| **Real-World Utility & Impact** | Directly protects millions of job seekers from financial fraud, fake checks, and identity theft. |
| **Technical Innovation** | Replaces black-box LLM hallucinations with deterministic, explainable mathematical scoring + real-time DNS/MX forensics. |
| **User Experience & Design** | World-class interactive 3D laptop viewport, dynamic cybernetic telemetry, and instantaneous multi-modal OCR parsing. |
| **Architectural Robustness** | Zero-crash fallback architecture: Gemini AI + Regex Fallback + SQLite/PostgreSQL dynamic adapter. |

---

## 📄 License
Released under the [MIT License](LICENSE). Built for candidate safety and recruitment transparency.
