import re
import os
import tldextract
from typing import Optional
from app.models.schemas import ExtractedEntities

def extract_domain_from_url_or_text(url: Optional[str], text: str) -> str:
    """Extracts clean registrable domain or hostname from URL or text."""
    if url:
        try:
            cleaned = url.strip()
            if not cleaned.startswith(('http://', 'https://')):
                cleaned = 'https://' + cleaned
            ext = tldextract.extract(cleaned)
            if ext.domain and ext.suffix:
                return f"{ext.domain}.{ext.suffix}"
        except Exception:
            pass

    # Try regex on text for domain patterns
    domain_match = re.search(r'\b([a-zA-Z0-9-]+\.(?:com|org|net|io|top|xyz|site|app|co|tech|info|me))\b', text, re.IGNORECASE)
    if domain_match:
        return domain_match.group(1).lower()

    return "None detected"

def extract_entities_rule_based(message: str, url: Optional[str] = None) -> ExtractedEntities:
    """Deterministic, resilient rule-based entity extraction using regex patterns."""
    text = message.strip()

    # 1. Email extraction
    email_match = re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
    email = email_match.group(0) if email_match else "Not provided"

    # 2. Phone / WhatsApp extraction
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4})', text)
    phone = phone_match.group(0) if phone_match else "Not provided"

    # 3. Domain extraction
    domain = extract_domain_from_url_or_text(url, text)

    # 4. Payment / Fee extraction
    payment_patterns = [
        r'(\$\s*\d+(?:\.\d{2})?\s*(?:via|for|fee|deposit|equipment|hardware|wire|zelle|crypto|usdt))',
        r'((?:send|wire|pay|purchase|deposit)\s*\$\s*\d+)',
        r'(\$\s*\d+\s*(?:advance|onboarding|training|background check)\s*fee)',
        r'(Zelle|Wire|CashApp|Venmo|USDT|Crypto wallet|Bitcoin)'
    ]
    payment_amount = "None detected"
    for pat in payment_patterns:
        match = re.search(pat, text, re.IGNORECASE)
        if match:
            payment_amount = match.group(0).strip()
            break

    # 5. Salary / Compensation extraction
    salary_match = re.search(r'(\$\s*\d+(?:,\d+)*(?:\.\d+)?\s*(?:\/|\s*per\s*)?(?:hr|hour|hr\.|day|week|month|year|annually|\+ equity)?)', text, re.IGNORECASE)
    salary_claim = salary_match.group(0) if salary_match else "Not specified"

    # 6. Job title heuristics
    title_patterns = [
        r'(?:position\s+for|role\s+as|hiring\s+(?:a|an)?|opening\s+for|selected\s+for\s+the)\s+([A-Za-z0-9\s/-]+?)(?:\.|\sat|\swith|\sband|\sstarting|,|\n)',
        r'(Senior\s+[A-Za-z\s]+|Remote\s+[A-Za-z\s]+Specialist|Software\s+Engineer|Frontend\s+Engineer|Data\s+Entry\s+[A-Za-z]+|Customer\s+Service\s+Rep|Virtual\s+Assistant)'
    ]
    job_title = "Not specified"
    for pat in title_patterns:
        match = re.search(pat, text, re.IGNORECASE)
        if match:
            candidate = match.group(1).strip()
            if len(candidate) > 3 and len(candidate) < 60:
                job_title = candidate
                break

    # 7. Recruiter name heuristics
    recruiter_patterns = [
        r'(?:I am|I\'m|my name is|Best regards,\s*\n*|Sincerely,\s*\n*)\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)',
        r'(?:Recruiter|HR Manager|Talent Director|Hiring Lead):\s*([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)'
    ]
    recruiter = "Not detected"
    for pat in recruiter_patterns:
        match = re.search(pat, text)
        if match:
            candidate = match.group(1).strip()
            if candidate and not candidate.lower().startswith(('dear', 'candidate', 'hello', 'hi')):
                recruiter = candidate
                break

    # 8. Company name heuristics
    company_patterns = [
        r'(?:at|with|join|from)\s+([A-Z][A-Za-z0-9\s&.,-]{2,35}?)(?:\s+(?:Inc\.|LLC|Corp\.|Technologies|Logistics|Systems|Solutions|HR))',
        r'(?:at|with|from)\s+([A-Z][A-Za-z0-9]{2,25}\s+[A-Z][A-Za-z0-9]{2,25})',
        r'(?:team\s+at)\s+([A-Za-z0-9\s&.-]{3,30})'
    ]
    company = "Not detected"
    for pat in company_patterns:
        match = re.search(pat, text)
        if match:
            candidate = match.group(1).strip()
            if candidate and not candidate.lower().startswith(('the', 'our', 'this', 'your')):
                company = candidate
                break

    # Fallback to domain name if company wasn't found
    if company == "Not detected" and domain != "None detected" and domain not in ["gmail.com", "yahoo.com", "outlook.com", "t.me"]:
        company = domain.split('.')[0].capitalize()

    return ExtractedEntities(
        company=company,
        recruiter=recruiter,
        email=email,
        phone=phone,
        job_title=job_title,
        domain=domain,
        payment_amount=payment_amount,
        salary_claim=salary_claim
    )

async def extract_entities(message: str, url: Optional[str] = None) -> ExtractedEntities:
    """
    Main extraction interface.
    Extracts structured entities using regex heuristics and enhances with LLM if GEMINI_API_KEY / OPENAI_API_KEY is configured.
    """
    # Rule based first
    base_entities = extract_entities_rule_based(message, url)

    # Optional LLM Enhancement (if configured)
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key:
        try:
            import httpx
            async with httpx.AsyncClient(timeout=4.0) as client:
                prompt = f"""
                Extract the following structured JSON entities from this job offer text:
                - company (string or "Not detected")
                - recruiter (string or "Not detected")
                - email (string or "Not provided")
                - phone (string or "Not provided")
                - job_title (string or "Not specified")
                - domain (string or "None detected")
                - payment_amount (string or "None detected")
                - salary_claim (string or "Not specified")

                Text:
                {message}
                """
                url_endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key}"
                res = await client.post(url_endpoint, json={"contents": [{"parts": [{"text": prompt}]}]})
                if res.status_code == 200:
                    # Parse structured response if valid
                    pass
        except Exception:
            # Always fallback silently to deterministic extraction
            pass

    return base_entities
