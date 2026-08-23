import re
import os
import json
import urllib.parse
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
                return f"{ext.domain}.{ext.suffix}".lower()
        except Exception:
            pass

    # Try regex on text for domain patterns
    domain_match = re.search(r'\b([a-zA-Z0-9-]+\.(?:com|org|net|io|top|xyz|site|app|co|tech|info|me))\b', text, re.IGNORECASE)
    if domain_match:
        return domain_match.group(1).lower()

    return "None detected"

def extract_entities_rule_based(message: str, url: Optional[str] = None) -> ExtractedEntities:
    """Deterministic, resilient rule-based entity extraction using regex patterns."""
    text = (message or "").strip()

    # 1. Email extraction
    email_match = re.search(r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b', text)
    email = email_match.group(0) if email_match else "Not provided"

    # 2. Phone / WhatsApp extraction
    phone_match = re.search(r'(\+?\d{1,3}[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4})', text)
    phone = phone_match.group(0) if phone_match else "Not provided"

    # 3. Domain extraction
    domain = extract_domain_from_url_or_text(url, text)

    # 4. Payment / Fee extraction (precise scam phrases, avoiding false positives like 'wireframes' or 'wireless')
    payment_patterns = [
        r'(\$\s*\d+(?:\.\d{2})?\s*(?:via|for|in|as)\s*(?:fee|deposit|equipment|hardware|wire|zelle|crypto|usdt))',
        r'((?:send|wire|pay|deposit)\s*\$\s*\d+)',
        r'(\$\s*\d+\s*(?:advance|onboarding|training|background check|hardware|equipment)\s*fee)',
        r'\b(Zelle|Wire transfer|CashApp|Venmo|USDT|Crypto wallet|Bitcoin|Gift card)\b'
    ]
    payment_amount = "None detected"
    for pat in payment_patterns:
        match = re.search(pat, text, re.IGNORECASE)
        if match:
            start_pos = max(0, match.start() - 25)
            context_before = text[start_pos:match.start()].lower()
            if not re.search(r'\b(?:no|never|zero|without|free of)\s*$', context_before):
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
            if 3 < len(candidate) < 60:
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

    # Public LinkedIn search URLs
    linkedin_company_url = None
    if company and company != "Not detected":
        linkedin_company_url = f"https://www.linkedin.com/search/results/companies/?keywords={urllib.parse.quote(company)}"

    linkedin_recruiter_url = None
    if recruiter and recruiter != "Not detected":
        query = f"{recruiter} {company}" if company and company != "Not detected" else recruiter
        linkedin_recruiter_url = f"https://www.linkedin.com/search/results/people/?keywords={urllib.parse.quote(query)}"

    return ExtractedEntities(
        company=company,
        recruiter=recruiter,
        email=email,
        phone=phone,
        job_title=job_title,
        domain=domain,
        payment_amount=payment_amount,
        salary_claim=salary_claim,
        linkedin_company_url=linkedin_company_url,
        linkedin_recruiter_url=linkedin_recruiter_url,
        extraction_method="Deterministic Rule Engine"
    )

async def extract_entities(message: str, url: Optional[str] = None) -> ExtractedEntities:
    """
    Main extraction interface.
    Extracts structured entities using Gemini LLM if GEMINI_API_KEY is configured,
    or falls back cleanly to deterministic regex heuristics.
    """
    base_entities = extract_entities_rule_based(message, url)

    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key and gemini_key.strip():
        import httpx
        prompt = f"""
You are a cybersecurity and recruitment intelligence assistant.
Extract structured entities from the following job communication or offer text.
Return ONLY valid JSON matching this exact structure:
{{
  "company": "Company name or 'Not detected'",
  "recruiter": "Recruiter full name or 'Not detected'",
  "email": "Official contact email or 'Not provided'",
  "phone": "Phone/WhatsApp number or 'Not provided'",
  "job_title": "Position/Job title or 'Not specified'",
  "domain": "Company or job website domain (e.g. company.com) or 'None detected'",
  "payment_amount": "Explicit upfront fee/equipment payment demanded or 'None detected'",
  "salary_claim": "Stated salary or compensation or 'Not specified'"
}}

Job Offer Text:
\"\"\"{message}\"\"\"
Job URL (if provided): {url or 'None'}
"""
        models_to_try = ["gemini-flash-lite-latest", "gemini-flash-latest", "gemini-2.5-flash"]
        for model_name in models_to_try:
            try:
                url_endpoint = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={gemini_key.strip()}"
                payload = {
                    "contents": [{"parts": [{"text": prompt}]}],
                    "generationConfig": {
                        "temperature": 0.1,
                        "responseMimeType": "application/json"
                    }
                }

                async with httpx.AsyncClient(timeout=8.0) as client:
                    res = await client.post(url_endpoint, json=payload)
                    if res.status_code == 200:
                        data = res.json()
                        candidates = data.get("candidates", [])
                        if not candidates:
                            continue
                        
                        candidate_content = candidates[0].get("content", {})
                        raw_text = ""
                        for part in candidate_content.get("parts", []):
                            if "text" in part and not part.get("thought", False):
                                raw_text = part["text"].strip()
                                break
                        
                        if not raw_text and candidate_content.get("parts"):
                            raw_text = candidate_content["parts"][0].get("text", "").strip()

                        if raw_text.startswith("```"):
                            raw_text = re.sub(r"^```(?:json)?\s*", "", raw_text)
                            raw_text = re.sub(r"\s*```$", "", raw_text)
                        
                        parsed = json.loads(raw_text)

                        company = parsed.get("company") or base_entities.company
                        recruiter = parsed.get("recruiter") or base_entities.recruiter

                        linkedin_company_url = None
                        if company and company != "Not detected":
                            linkedin_company_url = f"https://www.linkedin.com/search/results/companies/?keywords={urllib.parse.quote(company)}"

                        linkedin_recruiter_url = None
                        if recruiter and recruiter != "Not detected":
                            query = f"{recruiter} {company}" if company and company != "Not detected" else recruiter
                            linkedin_recruiter_url = f"https://www.linkedin.com/search/results/people/?keywords={urllib.parse.quote(query)}"

                        return ExtractedEntities(
                            company=company,
                            recruiter=recruiter,
                            email=parsed.get("email") or base_entities.email,
                            phone=parsed.get("phone") or base_entities.phone,
                            job_title=parsed.get("job_title") or base_entities.job_title,
                            domain=parsed.get("domain") or base_entities.domain,
                            payment_amount=parsed.get("payment_amount") or base_entities.payment_amount,
                            salary_claim=parsed.get("salary_claim") or base_entities.salary_claim,
                            linkedin_company_url=linkedin_company_url,
                            linkedin_recruiter_url=linkedin_recruiter_url,
                            extraction_method="Gemini AI (Structured Schema)"
                        )
            except Exception as e:
                print(f"Gemini model {model_name} extraction fallback: {e}")

    return base_entities
