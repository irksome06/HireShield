# 🛡️ HireShield — Demo Links, Credentials & Test Scenarios

## 🌐 Live Deployed Application
* **Production URL**: [https://hireshield-ro6i.onrender.com](https://hireshield-ro6i.onrender.com)
* **Backend API Docs (Swagger UI)**: [https://hireshield-ro6i.onrender.com/docs](https://hireshield-ro6i.onrender.com/docs)
* **GitHub Repository**: [https://github.com/irksome06/HireShield](https://github.com/irksome06/HireShield)

---

## 🔑 Demo Access Credentials
You can register any new account instantly, or use the pre-configured evaluator account below:

| Field | Demo Credential |
|---|---|
| **Email** | `evaluator@hireshield.ai` |
| **Password** | `HireShield2026!` |
| **Google Sign-In** | One-Click "Continue with Google" popup supported |

---

## 🧪 Real-World Scam Test Scenarios

Copy & paste these test cases into the **Quick Scanner** or **OCR Scanner** on the dashboard to test the real-time detection pipeline:

### ❌ Test Case 1: Upfront Equipment Fee & Fake Check Scam (Target Score: ~10/100)
```text
Dear Candidate,

Congratulations! Following a review of your application, you have been selected for the Remote Software QA position at Stripe Technologies.

Your starting compensation is $48/hour. To set up your home office hardware (Apple MacBook Pro M3, ergonomic monitor, and VPN router), our finance department has mailed you a certified equipment check of $3,450.

Please deposit the check immediately and wire $450 back via Zelle to our authorized supplier hardware dispatch handle: hardware-procurement@stripe-dispatch.top to initiate shipment today.
```
**Expected Triggers:**
- `Upfront Payment / Equipment Fee Demand` (-40 PTS)
- `High-Risk Domain TLD (.top)` (-25 PTS)
- `Recruiter Email Mismatch` (-20 PTS)
- **Verdict:** `Critical Threat Detected` (Blocked)

---

### ❌ Test Case 2: Telegram Anonymity Trap & Data Harvesting (Target Score: ~25/100)
```text
Hello,

Your profile was shortlisted for an immediate part-time Data Tagging Specialist role. Compensation is $350/day. No prior experience is required, and selection is guaranteed for the first 10 applicants.

To confirm your contract today, please send your Full Name, SSN, Bank Account Routing Number, and contact our hiring manager on Telegram at @sarah_recruitment_apex.
```
**Expected Triggers:**
- `Urgent Sensitive Data / SSN Harvesting` (-25 PTS)
- `Off-Platform Redirection (Telegram)` (-20 PTS)
- `Guaranteed Employment / Artificial Urgency` (-15 PTS)
- **Verdict:** `Critical Threat Detected` (Blocked)

---

### ✅ Test Case 3: Authentic Verified Enterprise Offer (Target Score: 100/100)
```text
Hi,

We are pleased to extend an offer for the Staff Software Architect position at Stripe, Inc. 

Your annual base salary will be $210,000 with standard equity and medical benefits. Your onboarding coordinator, David Miller, can be reached directly at david.miller@stripe.com.

Please review your formal offer packet through our official corporate portal at https://stripe.com/jobs/onboarding before your start date.
```
**Expected Triggers:**
- `Domain Registry & Structure` (Passed)
- `Email & Corporate MX Authenticity` (Passed - `stripe.com`)
- `Advance Fee Risk` (0 Signals Found - Clean)
- **Verdict:** `100/100 High Trust Job Trust Passport™ Issued`

---

## 📁 Submission Package Contents
1. `backend/`: FastAPI Python application with deterministic risk engine, Gemini AI extractor, and DNS/MX verifiers.
2. `frontend/`: React 19 + Vite + TailwindCSS application with 3D interactive cyber terminal and PDF export.
3. `HIRESHIELD_PRESENTATION.pptx`: Official Hackathon Presentation Deck.
4. `PROJECT_DOCUMENTATION.md`: Full architectural, threat modeling, and technical specification document.
5. `README.md`: GitHub repository landing documentation.
6. `sample_scam_test_cases.json`: Structured test payloads for automated benchmark runs.
