import os
import sys
import json
import base64
import io
import asyncio
from PIL import Image, ImageDraw
import requests
import httpx
from dotenv import load_dotenv

# Ensure backend root is in sys.path
sys.path.insert(0, os.path.abspath("backend"))
load_dotenv("backend/.env")

from app.services.extractor import extract_entities
from app.services.safe_browsing import ThreatIntelligenceService
from app.services.verifier import verify_whois_record, verify_safe_browsing, run_all_verifications
from app.services.ocr_service import extract_text_from_base64_image
from app.services.risk_engine import evaluate_job_risk

async def run_full_suite():
    results = {}

    print("=================================================================")
    print("        HIRESHIELD END-TO-END BACKEND VERIFICATION SUITE         ")
    print("=================================================================\n")

    # -------------------------------------------------------------
    # 1. Verify Gemini API Key & Real Structured Extraction
    # -------------------------------------------------------------
    print("[1/6] Testing Gemini LLM Extraction Service...")
    legit_job_text = """
    Company: Stripe Inc.
    Recruiter: Sarah Connor (Lead Technical Talent Partner)
    Position: Senior Distributed Systems Engineer
    Contact: sarah.connor@stripe.com
    Salary Range: $190,000 - $235,000 / year + equity
    Official Portal: https://stripe.com/jobs
    Please apply through our verified careers page. No application or equipment fees are required.
    """
    gemini_res = await extract_entities(legit_job_text, "https://stripe.com")
    print(f"  -> Extraction Method: {gemini_res.extraction_method}")
    print(f"  -> Extracted Company: {gemini_res.company}")
    print(f"  -> Extracted Recruiter: {gemini_res.recruiter}")
    print(f"  -> Extracted Job Title: {gemini_res.job_title}")
    print(f"  -> Extracted Email: {gemini_res.email}")
    print(f"  -> Extracted Domain: {gemini_res.domain}")
    print(f"  -> Extracted Salary: {gemini_res.salary_claim}")
    print(f"  -> Extracted Payment Demands: {gemini_res.payment_amount}")
    
    gemini_passed = (
        "Gemini" in gemini_res.extraction_method and 
        "Stripe" in (gemini_res.company or "") and 
        gemini_res.email == "sarah.connor@stripe.com"
    )
    results["gemini_extraction"] = {
        "status": "PASSED" if gemini_passed else "FAILED",
        "method": gemini_res.extraction_method,
        "company": gemini_res.company
    }
    print(f"  [RESULT]: {'PASSED' if gemini_passed else 'FAILED'}\n")

    # -------------------------------------------------------------
    # 2. Verify Google Safe Browsing API v4 Live Checks
    # -------------------------------------------------------------
    print("[2/6] Testing Google Safe Browsing Live Telemetry...")
    malware_url = "http://testsafebrowsing.appspot.com/s/malware.html"
    clean_url = "https://stripe.com"
    
    malware_check = ThreatIntelligenceService.lookup_url(malware_url)
    clean_check = ThreatIntelligenceService.lookup_url(clean_url)
    
    print(f"  -> Malware Target: {malware_url}")
    print(f"     is_safe: {malware_check['is_safe']}, Threats: {malware_check['threat_types']}, Source: {malware_check['source']}")
    print(f"  -> Clean Target: {clean_url}")
    print(f"     is_safe: {clean_check['is_safe']}, Source: {clean_check['source']}")
    
    safe_browsing_passed = (
        malware_check["is_safe"] is False and 
        "MALWARE" in malware_check["threat_types"] and 
        clean_check["is_safe"] is True
    )
    results["safe_browsing"] = {
        "status": "PASSED" if safe_browsing_passed else "FAILED",
        "malware_threats": malware_check["threat_types"],
        "source": malware_check["source"]
    }
    print(f"  [RESULT]: {'PASSED' if safe_browsing_passed else 'FAILED'}\n")

    # -------------------------------------------------------------
    # 3. Verify WHOIS / RDAP Integration
    # -------------------------------------------------------------
    print("[3/6] Testing Domain WHOIS / RDAP Intelligence...")
    whois_google = verify_whois_record("google.com")
    whois_stripe = verify_whois_record("stripe.com")
    whois_none = verify_whois_record("None detected")
    
    print(f"  -> google.com: [{whois_google.status}] {whois_google.detail}")
    print(f"  -> stripe.com: [{whois_stripe.status}] {whois_stripe.detail}")
    print(f"  -> None detected: [{whois_none.status}] {whois_none.detail}")
    
    whois_passed = (whois_google.status == "Passed" and whois_stripe.status == "Passed")
    results["whois_rdap"] = {
        "status": "PASSED" if whois_passed else "FAILED",
        "google_detail": whois_google.detail,
        "stripe_detail": whois_stripe.detail
    }
    print(f"  [RESULT]: {'PASSED' if whois_passed else 'FAILED'}\n")

    # -------------------------------------------------------------
    # 4. Verify OCR Screenshot Ingestion Pipeline
    # -------------------------------------------------------------
    print("[4/6] Testing OCR Screenshot Ingestion...")
    img = Image.new("RGB", (650, 140), color=(255, 255, 255))
    draw = ImageDraw.Draw(img)
    draw.text((15, 20), "OFFER: Lead Architect at Stripe Inc.", fill=(0, 0, 0))
    draw.text((15, 55), "Recruiter: Sarah Connor (sarah@stripe.com)", fill=(0, 0, 0))
    draw.text((15, 90), "Apply: https://stripe.com - Compensation: $210k/yr", fill=(0, 0, 0))
    
    buf = io.BytesIO()
    img.save(buf, format="PNG")
    b64_img = f"data:image/png;base64,{base64.b64encode(buf.getvalue()).decode('utf-8')}"
    
    ocr_text = extract_text_from_base64_image(b64_img)
    print(f"  -> OCR Extracted Text:\n    \"{ocr_text.replace(chr(10), ' ')}\"")
    
    ocr_passed = bool(ocr_text and "Stripe" in ocr_text)
    results["ocr_pipeline"] = {
        "status": "PASSED" if ocr_passed else "FAILED",
        "chars_extracted": len(ocr_text)
    }
    print(f"  [RESULT]: {'PASSED' if ocr_passed else 'FAILED'}\n")

    # -------------------------------------------------------------
    # 5. End-to-End Pipeline: Legitimate Job vs Scam Job
    # -------------------------------------------------------------
    print("[5/6] Testing Full Flow: Legitimate Job vs Scam Job...")
    
    # A. Legitimate Job
    legit_verifs = run_all_verifications(gemini_res, "https://stripe.com")
    legit_report = evaluate_job_risk(legit_job_text, "https://stripe.com", gemini_res, legit_verifs)
    print(f"  [Legitimate Job Analysis]:")
    print(f"    Passport ID: {legit_report.passport_id}")
    print(f"    Trust Score: {legit_report.trust_score}/100")
    print(f"    Risk Level: {legit_report.risk_level} ({legit_report.risk_color})")
    print(f"    Verdict: {legit_report.verdict}")
    print(f"    Deductions: {len(legit_report.deductions)} items")

    # B. Scam Job
    scam_job_text = """
    URGENT NOTICE: Congratulations! You have been selected for the Data Entry Specialist role with Amazon Logistics!
    Salary: Earn $450 daily payout ($3,000 weekly guaranteed). No interview or previous experience required.
    Slots are limited to first 10 applicants! Lock in your slot immediately.
    Please connect directly with HR Director David on Telegram: @amazon_careers_fast or WhatsApp wa.me/19998887777.
    You must wire an advance equipment security deposit of $350 via Zelle/CashApp to our certified hardware vendor.
    Please provide your SSN, banking routing number, and one-time OTP password to finalize registration at http://amazon-careers-onboarding.xyz.
    """
    scam_entities = await extract_entities(scam_job_text, "http://amazon-careers-onboarding.xyz")
    scam_verifs = run_all_verifications(scam_entities, "http://amazon-careers-onboarding.xyz")
    scam_report = evaluate_job_risk(scam_job_text, "http://amazon-careers-onboarding.xyz", scam_entities, scam_verifs)
    
    print(f"\n  [Scam Job Analysis]:")
    print(f"    Passport ID: {scam_report.passport_id}")
    print(f"    Trust Score: {scam_report.trust_score}/100")
    print(f"    Risk Level: {scam_report.risk_level} ({scam_report.risk_color})")
    print(f"    Verdict: {scam_report.verdict}")
    print(f"    Deductions ({len(scam_report.deductions)}):")
    for d in scam_report.deductions:
        print(f"      * [{d.severity}] {d.signal}: {d.penalty} pts")

    flow_passed = (legit_report.trust_score >= 80 and scam_report.trust_score <= 30 and scam_report.risk_level == "High")
    results["flow_evaluation"] = {
        "status": "PASSED" if flow_passed else "FAILED",
        "legit_score": legit_report.trust_score,
        "scam_score": scam_report.trust_score
    }
    print(f"  [RESULT]: {'PASSED' if flow_passed else 'FAILED'}\n")

    # -------------------------------------------------------------
    # 6. Live FastAPI Endpoint Health & Integration Verification
    # -------------------------------------------------------------
    print("[6/6] Testing Live HTTP API Endpoints on http://127.0.0.1:8000...")
    async with httpx.AsyncClient(base_url="http://127.0.0.1:8000", timeout=12.0) as client:
        # /api/health
        h_res = await client.get("/api/health")
        print(f"  -> GET /api/health: Status {h_res.status_code}")
        
        # /api/threat-intelligence
        ti_res = await client.get("/api/threat-intelligence")
        print(f"  -> GET /api/threat-intelligence: Status {ti_res.status_code}")
        
        # /api/threat-intelligence/lookup
        lookup_res = await client.post("/api/threat-intelligence/lookup", json={"url": malware_url})
        print(f"  -> POST /api/threat-intelligence/lookup: Status {lookup_res.status_code}, result: {lookup_res.json().get('threat_types')}")
        
        # /api/analyze with OCR image
        analyze_res = await client.post("/api/analyze", json={
            "message": "Senior Python Engineer at Stripe",
            "url": "https://stripe.com",
            "has_image": True,
            "image_base64": b64_img
        })
        print(f"  -> POST /api/analyze (Full Flow with Image): Status {analyze_res.status_code}")
        if analyze_res.status_code == 200:
            analysis_data = analyze_res.json()
            print(f"     Passport generated: {analysis_data.get('passport_id')}, Score: {analysis_data.get('trust_score')}")

        # /api/history
        hist_res = await client.get("/api/history")
        print(f"  -> GET /api/history: Status {hist_res.status_code}, items count: {len(hist_res.json())}")

    print("\n=================================================================")
    print("                    ALL VERIFICATIONS COMPLETE                   ")
    print("=================================================================")

if __name__ == "__main__":
    asyncio.run(run_full_suite())
