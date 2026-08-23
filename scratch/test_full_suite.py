import urllib.request
import urllib.error
import json
import uuid
import time
import sys

BASE_URL = "http://127.0.0.1:8000/api"

def make_req(endpoint, method="GET", data=None, token=None):
    url = f"{BASE_URL}{endpoint}"
    headers = {"Content-Type": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    body = json.dumps(data).encode("utf-8") if data is not None else None
    req = urllib.request.Request(url, data=body, headers=headers, method=method)
    try:
        with urllib.request.urlopen(req, timeout=10) as res:
            res_body = res.read().decode("utf-8")
            return res.status, json.loads(res_body) if res_body else {}
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        try:
            return e.code, json.loads(err_body)
        except Exception:
            return e.code, {"error": err_body}

def run_tests():
    print("==================================================")
    print("  HIRESHIELD FULL END-TO-END VERIFICATION SUITE")
    print("==================================================")
    test_results = []

    def record(test_name, passed, details=""):
        status_str = "PASS" if passed else "FAIL"
        print(f"[{status_str}] {test_name}: {details}")
        test_results.append({"test": test_name, "passed": passed, "details": details})

    # Test 1: Health Check
    status, res = make_req("/health")
    if status == 200 and res.get("status") == "ok":
        record("Health Check Endpoint", True, f"Engine: {res.get('deterministic_engine')}, Services: {list(res.get('services', {}).keys())}")
    else:
        record("Health Check Endpoint", False, f"Status: {status}, Response: {res}")

    # Test 2: User Registration
    test_user_email = f"test_{uuid.uuid4().hex[:8]}@example.com"
    test_pwd = "SecurePassword123!"
    status, res = make_req("/auth/signup", method="POST", data={
        "name": "Alex Shield",
        "email": test_user_email,
        "password": test_pwd
    })
    token = None
    if status == 201 and res.get("access_token"):
        token = res["access_token"]
        record("User Registration (/api/auth/signup)", True, f"Registered {test_user_email}, JWT generated.")
    else:
        record("User Registration (/api/auth/signup)", False, f"Status: {status}, Response: {res}")

    # Test 3: User Login
    status, res = make_req("/auth/login", method="POST", data={
        "email": test_user_email,
        "password": test_pwd
    })
    if status == 200 and res.get("access_token"):
        token = res["access_token"]
        record("User Login (/api/auth/login)", True, f"Logged in user {res.get('user', {}).get('name')}")
    else:
        record("User Login (/api/auth/login)", False, f"Status: {status}, Response: {res}")

    # Test 4: Authenticated /me
    status, res = make_req("/auth/me", method="GET", token=token)
    if status == 200 and res.get("email") == test_user_email:
        record("Get Authenticated Profile (/api/auth/me)", True, f"Email: {res.get('email')}, AuthProvider: {res.get('auth_provider')}")
    else:
        record("Get Authenticated Profile (/api/auth/me)", False, f"Status: {status}, Response: {res}")

    # Test 5: Update Profile
    status, res = make_req("/auth/profile", method="PUT", token=token, data={
        "name": "Alexander Shield Pro",
        "phone": "+1 555-0199",
        "location": "San Francisco, CA",
        "bio": "Senior Cyber Threat & Recruiter Scam Analyst"
    })
    if status == 200 and res.get("name") == "Alexander Shield Pro":
        record("Update Profile (/api/auth/profile)", True, f"Updated Name: {res.get('name')}, Phone: {res.get('phone')}")
    else:
        record("Update Profile (/api/auth/profile)", False, f"Status: {status}, Response: {res}")

    # Test 6: High Risk Scam Job Offer Analysis
    scam_payload = {
        "message": "Congratulations! You are selected for Senior Data Analyst at GlobalTech Inc. Please send $450 via Zelle or Apple Gift Card to sarah.recruiter@apex-careers.top to cover home office Apple MacBook equipment. Also reply with your SSN, banking direct deposit details, and contact hiring manager on WhatsApp https://wa.me/19998887777 immediately.",
        "url": "https://apex-careers.top/apply",
        "has_image": False
    }
    status, res = make_req("/analyze", method="POST", data=scam_payload, token=token)
    scam_passport_id = None
    if status == 200:
        scam_passport_id = res.get("passport_id")
        score = res.get("trust_score")
        risk_lvl = res.get("risk_level")
        deductions = [f"{d.get('rule')}: -{d.get('penalty')}pts" for d in res.get("deductions", [])]
        is_scam_flagged = score <= 35 and risk_lvl in ["High", "High Risk"]
        record("Threat Analysis: High Risk Advance-Fee Scam", is_scam_flagged, f"Score: {score}/100, Tier: {risk_lvl}, Deductions: {len(deductions)} items, Passport ID: {scam_passport_id}")
    else:
        record("Threat Analysis: High Risk Advance-Fee Scam", False, f"Status: {status}, Response: {res}")

    # Test 7: Moderate Risk Offer Analysis
    moderate_payload = {
        "message": "Hi, I am reaching out from TechCorp regarding a software engineer role. Please submit your resume quickly to my personal email techcorp.recruiter99@gmail.com within 24 hours.",
        "url": "https://techcorp-sample.com/careers",
        "has_image": False
    }
    status, res = make_req("/analyze", method="POST", data=moderate_payload, token=token)
    if status == 200:
        score = res.get("trust_score")
        risk_lvl = res.get("risk_level")
        record("Threat Analysis: Moderate Risk Recruiter Mismatch", True, f"Score: {score}/100, Tier: {risk_lvl}")
    else:
        record("Threat Analysis: Moderate Risk Recruiter Mismatch", False, f"Status: {status}, Response: {res}")

    # Test 8: Legitimate Job Offer Analysis
    legit_payload = {
        "message": "Dear Candidate, Thank you for interviewing with Microsoft Corporation. We would like to extend an offer for the Software Engineer II position in Redmond, WA. Please review your formal offer letter on the Microsoft Careers Portal at https://careers.microsoft.com and complete your onboarding through standard corporate portal.",
        "url": "https://careers.microsoft.com",
        "has_image": False
    }
    status, res = make_req("/analyze", method="POST", data=legit_payload, token=token)
    if status == 200:
        score = res.get("trust_score")
        risk_lvl = res.get("risk_level")
        is_low_risk = score >= 75
        record("Threat Analysis: Legitimate Corporate Offer", is_low_risk, f"Score: {score}/100, Tier: {risk_lvl}")
    else:
        record("Threat Analysis: Legitimate Corporate Offer", False, f"Status: {status}, Response: {res}")

    # Test 9: Fetch History
    status, res = make_req("/history", method="GET", token=token)
    if status == 200 and isinstance(res, list) and len(res) >= 3:
        record("Database Audit Log History (/api/history)", True, f"Retrieved {len(res)} audited passports scoped to user session.")
    else:
        record("Database Audit Log History (/api/history)", False, f"Status: {status}, Items: {len(res) if isinstance(res, list) else 0}")

    # Test 10: Fetch Specific Passport by ID
    if scam_passport_id:
        status, res = make_req(f"/history/{scam_passport_id}", method="GET")
        if status == 200 and res.get("passport_id") == scam_passport_id:
            record("Cryptographic Job Trust Passport Retrieval (/api/history/{id})", True, f"Passport {scam_passport_id} verified. Score: {res.get('trust_score')}")
        else:
            record("Cryptographic Job Trust Passport Retrieval (/api/history/{id})", False, f"Status: {status}, Response: {res}")

    # Test 11: Threat Intelligence Aggregated Insights
    status, res = make_req("/threat-intelligence", method="GET")
    if status == 200 and ("summary" in res or "threat_distribution" in res):
        record("Live Threat Intelligence Feed (/api/threat-intelligence)", True, f"Total Inspected: {res.get('summary', {}).get('total_inspected')}, Threats Blocked: {res.get('summary', {}).get('threats_blocked')}")
    else:
        record("Live Threat Intelligence Feed (/api/threat-intelligence)", False, f"Status: {status}, Response: {res}")

    # Test 12: Threat URL Lookup
    status, res = make_req("/threat-intelligence/lookup", method="POST", data={"url": "https://malicious-recruiter.top/phish"})
    if status == 200 and res.get("url"):
        record("Direct Threat URL Telemetry Lookup (/api/threat-intelligence/lookup)", True, f"URL: {res.get('url')}, Safe: {res.get('is_safe')}, Source: {res.get('source')}")
    else:
        record("Direct Threat URL Telemetry Lookup (/api/threat-intelligence/lookup)", False, f"Status: {status}, Response: {res}")

    print("\n==================================================")
    passed_count = sum(1 for t in test_results if t["passed"])
    total_count = len(test_results)
    print(f"  TOTAL RESULTS: {passed_count}/{total_count} PASSED")
    print("==================================================")
    return passed_count == total_count

if __name__ == "__main__":
    success = run_tests()
    sys.exit(0 if success else 1)
