import os
import sys
import httpx
import json
import asyncio
from dotenv import load_dotenv

load_dotenv('backend/.env')
key = os.getenv('GEMINI_API_KEY', '').strip()

async def test():
    prompt = """
You are a cybersecurity and recruitment intelligence assistant.
Extract structured entities from the following job communication or offer text.
Return ONLY valid JSON matching this exact structure:
{
  "company": "Company name or 'Not detected'",
  "recruiter": "Recruiter full name or 'Not detected'",
  "email": "Official contact email or 'Not provided'",
  "phone": "Phone/WhatsApp number or 'Not provided'",
  "job_title": "Position/Job title or 'Not specified'",
  "domain": "Company or job website domain (e.g. company.com) or 'None detected'",
  "payment_amount": "Explicit upfront fee/equipment payment demanded or 'None detected'",
  "salary_claim": "Stated salary or compensation or 'Not specified'"
}

Job Offer Text:
\"\"\"Senior Software Engineer role at Stripe. Recruiter is Sarah Connor. Contact sarah@stripe.com. Domain stripe.com. Salary $190,000/year.\"\"\"
Job URL (if provided): https://stripe.com
"""
    for model in ['gemini-2.5-flash', 'gemini-2.5-flash-lite', 'gemini-flash-lite-latest', 'gemini-flash-latest']:
        url = f"https://generativelanguage.googleapis.com/v1beta/models/{model}:generateContent?key={key}"
        payload = {
            "contents": [{"parts": [{"text": prompt}]}],
            "generationConfig": {
                "temperature": 0.1,
                "responseMimeType": "application/json"
            }
        }
        async with httpx.AsyncClient(timeout=10.0) as client:
            try:
                res = await client.post(url, json=payload)
                print(f"Model {model} -> Status: {res.status_code}")
                if res.status_code == 200:
                    data = res.json()
                    candidate = data["candidates"][0]["content"]
                    # Extract the text part (handling thinking parts if present)
                    for part in candidate.get("parts", []):
                        if "text" in part and not part.get("thought", False):
                            print(f"Model {model} clean text:\n{part['text']}\n")
                            break
                    break
                else:
                    print(f"Error payload: {res.text[:150]}")
            except Exception as e:
                print(f"Model {model} error: {e}")

asyncio.run(test())
