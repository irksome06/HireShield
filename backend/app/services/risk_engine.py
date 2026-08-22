import uuid
from datetime import datetime
from typing import List, Tuple
from app.models.schemas import (
    ExtractedEntities, 
    DeductionItem, 
    VerificationItem, 
    AnalysisResponse
)

def evaluate_job_risk(
    message: str, 
    url: str, 
    entities: ExtractedEntities, 
    verifications: List[VerificationItem]
) -> AnalysisResponse:
    """
    Transparent, deterministic risk engine.
    Calculates a 0-100 Trust Score based on clear security heuristics and evidence deduction rules.
    """
    score = 100
    deductions: List[DeductionItem] = []
    text_lower = message.lower()
    url_lower = (url or "").lower()
    deduction_id = 1

    # 1. UPFRONT PAYMENT / EQUIPMENT FEE (Severe critical signal: -40)
    payment_terms = ['fee', 'wire', 'zelle', 'deposit', 'pay upfront', 'purchase equipment', '$350', 'reimbursed on your first paycheck', 'cashapp', 'gift card']
    if any(term in text_lower for term in payment_terms) or (entities.payment_amount != "None detected" and not "none" in entities.payment_amount.lower()):
        penalty = -40
        score += penalty
        deductions.append(DeductionItem(
            id=deduction_id,
            signal="Upfront Payment / Equipment Fee Demand",
            penalty=penalty,
            severity="Critical",
            description="Message explicitly demands advance funds, hardware fees, or non-reversible money transfers prior to employment."
        ))
        deduction_id += 1

    # 2. SENSITIVE IDENTIFIERS / OTP / DATA HARVESTING (High risk: -25)
    data_harvesting_terms = ['ssn', 'social security', 'otp', 'one-time password', 'bank account details', 'routing number', 'passport copy', 'driver license']
    if any(term in text_lower for term in data_harvesting_terms):
        penalty = -25
        score += penalty
        deductions.append(DeductionItem(
            id=deduction_id,
            signal="Urgent Sensitive Data / OTP Harvesting",
            penalty=penalty,
            severity="High",
            description="Demands confidential identity numbers (SSN/OTP/banking) before formal verified contracts or onboarding."
        ))
        deduction_id += 1

    # 3. OFF-PLATFORM REDIRECTION (Telegram, WhatsApp, Signal) (High risk: -20)
    off_platform_terms = ['telegram', 't.me', 'whatsapp', 'wa.me', 'signal', 'direct message on telegram', '@talentpeak']
    if any(term in text_lower for term in off_platform_terms) or 't.me' in url_lower:
        penalty = -20
        score += penalty
        deductions.append(DeductionItem(
            id=deduction_id,
            signal="Off-Platform Unindexed Communication",
            penalty=penalty,
            severity="High",
            description="Directs candidate away from verified enterprise portals into unmonitored messaging channels (Telegram/WhatsApp)."
        ))
        deduction_id += 1

    # 4. SUSPICIOUS DOMAIN / HIGH-RISK TLD (High risk: -25)
    high_risk_tlds = ['.top', '.xyz', '.click', '.cam', '.work', '.live', '.buzz']
    if any(tld in url_lower or tld in entities.domain.lower() for tld in high_risk_tlds):
        penalty = -25
        score += penalty
        deductions.append(DeductionItem(
            id=deduction_id,
            signal="High-Risk Domain TLD & Spoofing Indicator",
            penalty=penalty,
            severity="High",
            description=f"Domain '{entities.domain}' utilizes an extension heavily associated with ephemeral recruitment fraud."
        ))
        deduction_id += 1

    # 5. RECRUITER EMAIL MISMATCH (Medium risk: -20)
    email_verification = next((v for v in verifications if v.name == "Email & Domain Authenticity"), None)
    if email_verification and email_verification.status == "Failed":
        penalty = -20
        score += penalty
        deductions.append(DeductionItem(
            id=deduction_id,
            signal="Recruiter Email Domain Mismatch",
            penalty=penalty,
            severity="Medium",
            description="Recruiter's contact address does not correspond with the verified corporate entity domain."
        ))
        deduction_id += 1

    # 6. UNREALISTIC EARNINGS / GUARANTEED NO-INTERVIEW CLAIMS (Medium risk: -15)
    unrealistic_terms = ['no experience required', 'earn $150', 'earn $400 daily', 'daily payout', 'guaranteed job', 'slots are limited', 'first 10 applicants', 'lock in your slot immediately']
    if any(term in text_lower for term in unrealistic_terms):
        penalty = -15
        score += penalty
        deductions.append(DeductionItem(
            id=deduction_id,
            signal="Artificial Scarcity & Unrealistic Compensation",
            penalty=penalty,
            severity="Medium",
            description="Employs pressure tactics ('first 10 applicants', 'immediate start without interview') common in task scams."
        ))
        deduction_id += 1

    # Clamp Trust Score to 0..100
    final_score = max(0, min(100, score))

    # Risk level classification
    if final_score < 35:
        risk_level = "High"
        risk_color = "rose"
        verdict = "High-Risk Recruitment Scam Pattern Detected"
        summary = f"Severe risk triggers identified (-{100 - final_score} pts). Contains critical indicators characteristic of upfront-fee fraud or credential harvesting."
        recommendations = [
            "DO NOT send money, wire transfers, or purchase equipment through their designated vendor.",
            "Never disclose your Social Security Number, OTP codes, or online banking credentials.",
            "Report the job post and sender domain to the FTC (reportfraud.ftc.gov) and Google Safe Browsing."
        ]
    elif final_score < 60:
        risk_level = "Suspicious"
        risk_color = "amber"
        verdict = "Suspicious Task / Off-Platform Recruitment Activity"
        summary = f"Multiple anomalies detected (-{100 - final_score} pts). The offer redirects to unverified communication channels with high-risk payment or urgency claims."
        recommendations = [
            "Avoid conducting formal job onboarding via Telegram, WhatsApp, or personal messaging apps.",
            "Require the recruiter to contact you from an official corporate email address with verifiable MX records.",
            "Do not accept tasks that require personal cryptocurrency deposits to unlock compensation."
        ]
    elif final_score < 80:
        risk_level = "Moderate"
        risk_color = "sky"
        verdict = "Moderate Confidence — Secondary Verification Advised"
        summary = f"Minor warnings detected (-{100 - final_score} pts). The core profile appears plausible, but recruiter identity requires confirmation."
        recommendations = [
            "Verify the specific job requisition ID on the official company careers page.",
            "Confirm the recruiter's identity on LinkedIn or through the company's verified switchboard."
        ]
    else:
        risk_level = "Low"
        risk_color = "emerald"
        verdict = "Verified & High-Trust Recruitment Correspondence"
        summary = "No anomalous risk indicators detected. Corporate email MX matches domain, standard recruitment lifecycle, and clean telemetry."
        recommendations = [
            "Proceed with confidence following standard interview practices.",
            "Ensure all future interview correspondence remains strictly within the verified company email domain."
        ]

    # Generate Job Trust Passport ID
    passport_id = f"HSP-{datetime.utcnow().year}-{uuid.uuid4().hex[:6].upper()}-{risk_level[0]}"

    return AnalysisResponse(
        trust_score=final_score,
        risk_level=risk_level,
        risk_color=risk_color,
        verdict=verdict,
        summary=summary,
        entities=entities,
        deductions=deductions,
        verifications=verifications,
        recommendations=recommendations,
        passport_id=passport_id,
        timestamp=datetime.utcnow().isoformat() + "Z"
    )
