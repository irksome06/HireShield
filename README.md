# 🛡️ HireShield — Recruitment Trust & Scam Intelligence

[![React](https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite-61dafb.svg)](https://react.dev/)
[![TailwindCSS](https://img.shields.io/badge/CSS-Tailwind%20v4-38bdf8.svg)](https://tailwindcss.com/)
[![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688.svg)](https://fastapi.tiangolo.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL%20%2F%20SQLite-336791.svg)](https://www.postgresql.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

> **Zero-Trust Recruitment Security Platform**: Explainable AI entity extraction, deterministic risk scoring, transparent evidence audit trails, and cryptographic **Job Trust Passports** to protect job seekers from advance-fee fraud, domain spoofing, and recruiter identity theft.

---

## 🌟 Key Features

1. **Deterministic, Explainable Trust Scoring (0–100)**:
   - Evaluates job communications using rule-based risk triggers rather than black-box AI decisions.
   - Transparent deduction ledger showing exact point penalties (e.g. -40 for upfront fee demands, -25 for sensitive OTP/SSN requests, -25 for high-risk TLDs).

2. **Structured AI & Regex Entity Extractor**:
   - Parses target company, recruiter name, email, phone, job title, domain, compensation claims, and payment demands.
   - LLM structured schema interface with automatic, zero-crash regex heuristic fallback.

3. **External Intelligence & Verification Telemetry**:
   - **Domain WHOIS / TLD Heuristics**: Flags high-risk top-level domains (`.top`, `.xyz`, `.click`, `.work`).
   - **Recruiter Email MX Check**: Flags discrepancies between recruiter sender domains and claimed corporate domains.
   - **Malware & Phishing Telemetry**: Detects Telegram/WhatsApp task-scam redirection patterns.

4. **Official Job Trust Passport™**:
   - Cryptographic record of the job evaluation with a unique passport ID, timestamp, and ECDSA signature token.
   - One-click **Print / Save PDF Certificate** and JSON export.

5. **Screenshot OCR Ingestion**:
   - Drag-and-drop job offer screenshots for automated optical character parsing and entity triage.

6. **Audit History & Persistence**:
   - Full persistence powered by PostgreSQL (with zero-configuration SQLite local fallback).

---

## 📐 Architecture & Workflow

```
[ Job Text / URL / Screenshot ]
              │
              ▼
┌───────────────────────────────┐
│   Structured Entity Extractor │ ──> Company, Recruiter, Email, Phone, Domain, Fee
└──────────────┬────────────────┘
              │
              ▼
┌───────────────────────────────┐
│     Verification Engine       │ ──> Domain TLD Check, Recruiter MX Match, Telemetry
└──────────────┬────────────────┘
              │
              ▼
┌───────────────────────────────┐
│   Deterministic Risk Engine   │ ──> Calculate 0–100 Trust Score & Penalties
└──────────────┬────────────────┘
              │
              ▼
┌───────────────────────────────┐
│      Job Trust Passport       │ ──> Score, Risk Tier, Evidence Ledger, PDF & JSON Export
└──────────────┬────────────────┘
              │
              ▼
┌───────────────────────────────┐
│     Database Audit Log        │ ──> PostgreSQL / SQLite Historical Storage
└───────────────────────────────┘
```

---

## ⚖️ Deterministic Risk Deduction Matrix

| Risk Signal | Severity | Penalty | Description |
|---|---|---|---|
| **Upfront Fee / Equipment Purchase Demand** | `Critical` | **-40 pts** | Demand for advance payments (Zelle, Wire, Gift Card, Crypto) for home-office hardware. |
| **Urgent SSN / OTP / Banking Data Harvesting** | `High` | **-25 pts** | Solicitation of confidential identifiers before formal contract issuance. |
| **High-Risk Domain TLD & Spoofing** | `High` | **-25 pts** | Domain utilizes high-abuse extensions (`.top`, `.xyz`, `.click`) or typo-squatting patterns. |
| **Off-Platform Redirection (Telegram / WhatsApp)** | `High` | **-20 pts** | Deflecting candidate communication to unmonitored chat handles or crypto payout setups. |
| **Recruiter Email Domain Mismatch** | `Medium` | **-20 pts** | Recruiter uses free webmail (e.g. Gmail) or sender MX doesn't match the employer's domain. |
| **Artificial Scarcity / Guaranteed Job** | `Medium` | **-15 pts** | "No interview required", "first 10 applicants", or promises of $400/day for simple tasks. |

### Risk Tiers
* **80 – 100**: `Low Risk` (Verified corporate identity, standard recruitment lifecycle)
* **60 – 79**: `Moderate Risk` (Plausible offer, secondary company portal verification advised)
* **35 – 59**: `Suspicious` (Multiple anomalies detected; off-platform task flags)
* **0 – 34**: `High Risk` (High-confidence recruitment scam pattern detected)

---

## 🚀 Quick Start Guide

### Prerequisites
* **Node.js**: v18+ 
* **Python**: v3.10+
* *(Optional)* **Docker & Docker Compose**

---

### Option A: Local Development

#### 1. Start Backend (FastAPI)
```bash
cd backend
pip install -r requirements.txt
pip install sqlalchemy aiosqlite psycopg2-binary
uvicorn app.main:app --port 8000 --reload
```
*API is live at `http://127.0.0.1:8000` (Docs: `http://127.0.0.1:8000/docs`)*

#### 2. Start Frontend (React + Vite)
```bash
cd frontend
npm install
npm run dev
```
*Open `http://localhost:5173/` in your browser.*

---

### Option B: Unified Single-Container Docker Deployment

```bash
docker-compose up --build
```
*HireShield will be live on `http://localhost:8000` with PostgreSQL attached.*

---

## 📡 API Reference

### 1. `POST /api/analyze`
Submits a job offer for full threat inspection.
```json
{
  "message": "Selected for remote job! Send $350 via Zelle for equipment to sarah@apex-jobs.top",
  "url": "https://apex-jobs.top",
  "has_image": false
}
```

### 2. `GET /api/history`
Retrieves past audited submissions from the database.

### 3. `GET /api/history/{passport_id}`
Retrieves a specific Job Trust Passport by its unique cryptographic identifier.

### 4. `GET /api/health`
Health check verifying status of the deterministic risk engine, database, and verifiers.

---

## 🛡️ License
Built with integrity for hackathons and candidate safety. Released under the [MIT License](LICENSE).
