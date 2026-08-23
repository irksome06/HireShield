# 🛡️ HireShield — Complete Technical & Architectural Documentation

## 1. Executive Summary
**HireShield** is an AI-powered, deterministic Zero-Trust Recruitment Defense Platform. It provides candidate-facing protection against advance-fee employment scams, recruiter identity theft, fake check schemes, and spoofed domain traps.

Unlike black-box generative models that provide subjective opinions, HireShield couples **Google Gemini 1.5 entity extraction** with a **deterministic mathematical risk deduction engine** and live **DNS/MX network telemetry** to deliver tamper-proof **Job Trust Passports™**.

---

## 2. Threat Vector Modeling & Defense Taxonomy

| Threat Category | Attack Vector & Attacker Methodology | HireShield Defense Mechanism |
|---|---|---|
| **Advance-Fee Equipment Scam** | Fraudster sends a fraudulent PDF check ($3,000+), instructs victim to deposit, and wire $300–$500 back via Zelle/Wire to a fake vendor. | Deterministic token heuristics flag advance-fee phrases, check deposit promises, and wire demands (-40 PTS). |
| **Domain Typosquatting & Spoofing** | Attacker registers ephemeral high-risk domains (`stripe-jobs.top`, `google-career.xyz`) to host fake application forms. | `tldextract` & WHOIS heuristics flag abuse-prone TLDs (.top, .xyz, .click) and multi-hyphen typosquatting (-25 PTS). |
| **Recruiter Email Impersonation** | Attacker claims to represent a Fortune 500 company using a free webmail address (`recruiter.stripe@gmail.com`). | MX records query verifies whether sender domain matches the employer's official enterprise mail exchangers (-20 PTS). |
| **Telegram / WhatsApp Redirection** | Scammers lure candidates off LinkedIn/Indeed into unmonitored chat apps to evade corporate audit trails. | Regular expression parsers detect off-platform handles (`t.me/`, `wa.me/`, `@handle`) and flag unindexed communication channels (-20 PTS). |
| **Identity & OTP Harvesting** | Fraudsters solicit Social Security Numbers, banking routing numbers, and OTP codes under the guise of "pre-employment background screening". | Heuristics isolate pre-contract sensitive data extraction requests (-25 PTS). |

---

## 3. End-to-End System Architecture

```
                       [ CLIENT LAYER ]
               React 19 + Vite + TailwindCSS v4
             3D Interactive Terminal + Dashboard
                              │
                              │ REST JSON API (HTTP/JWT)
                              ▼
                       [ API GATEWAY ]
               FastAPI Backend (Python 3.11)
          OAuth2 / JWT Bearer Token Security
                              │
         ┌────────────────────┼────────────────────┐
         ▼                    ▼                    ▼
[ OCR / Vision ]    [ AI Entity Engine ]   [ Telemetry Engine ]
  Pytesseract OCR     Google Gemini 1.5      DNS / MX Resolver
  PDFPlumber Parser   Regex Token Parser    Domain TLD Classifier
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                              ▼
                 [ DETERMINISTIC RISK ENGINE ]
            Base Score: 100 ➔ Apply Rule Deductions
            Calculates Risk Tier & Evidence Trail
                              │
         ┌────────────────────┴────────────────────┐
         ▼                                         ▼
[ DATABASE PERSISTENCE ]                [ CRYPTOGRAPHIC PASSPORT ]
 PostgreSQL / SQLite                       Unique ID: HSP-2026-XXXX
 SQLAlchemy ORM Log                        SHA-256 Digest & PDF Export
```

---

## 4. Algorithmic Risk Deduction Formula

The **Trust Score ($T$)** is defined mathematically as:

$$T = \max\left(0, 100 - \sum_{i=1}^{n} P_i\right)$$

Where:
- $T \in [0, 100]$ represents the final explainable trust rating.
- $P_i$ represents the penalty deduction for triggered security rule $i$.

### Penalty Hierarchy:
- **Critical Violation ($P = 40$)**: Explicit advance fee, equipment purchase, or non-reversible transfer demand.
- **High Violation ($P = 25$)**: Sensitive OTP/SSN harvesting or high-risk domain abuse extension (.top, .xyz).
- **High Violation ($P = 20$)**: Off-platform deflection (Telegram/WhatsApp) or corporate domain MX mismatch.
- **Medium Violation ($P = 15$)**: Guaranteed hiring claims, artificial time pressure, or no-interview promises.

---

## 5. Security & Privacy Architecture
1. **Zero Data Retention for Raw Images**: Uploaded offer screenshots are parsed in-memory via PIL and pytesseract; raw image files are never stored unencrypted.
2. **Deterministic Cryptographic Receipts**: Each Job Trust Passport computes a SHA-256 hash across entities, deductions, and timestamp, guaranteeing audit integrity.
3. **Session Authentication**: Passwords hashed using industry-standard **bcrypt** (12 rounds) with short-lived JWT access tokens.

---

## 6. Business Model & Go-To-Market Strategy
1. **B2C Freemium**: Free quick scans for job seekers and university students; Pro tier with unlimited OCR batch uploads and real-time Chrome Extension monitoring.
2. **B2B API for Job Boards**: Integration with platforms (LinkedIn, Unstop, Internshala) to pre-certify job postings with verified Job Trust Passports.
3. **Enterprise Brand Defense**: Domain monitoring service for Fortune 500 brands to detect and takedown spoofed recruiter domains.
