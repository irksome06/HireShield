import os
import base64
import io
import re
from typing import Optional

def extract_text_from_base64_image(image_base64: str) -> str:
    """
    Extracts text from a base64 screenshot image.
    Uses Tesseract OCR if available, or Gemini Vision API if configured.
    """
    if not image_base64 or not image_base64.strip():
        return ""

    raw_base64 = image_base64.strip()
    mime_type = "image/png"
    if "," in raw_base64:
        header, raw_base64 = raw_base64.split(",", 1)
        if "image/jpeg" in header or "image/jpg" in header:
            mime_type = "image/jpeg"
        elif "image/webp" in header:
            mime_type = "image/webp"

    # 1. Try local Tesseract OCR via Pillow
    try:
        from PIL import Image
        import pytesseract

        image_bytes = base64.b64decode(raw_base64)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert RGBA to RGB for cleaner OCR
        if image.mode in ('RGBA', 'LA', 'P'):
            image = image.convert('RGB')

        text = pytesseract.image_to_string(image)
        if text and len(text.strip()) > 5:
            return text.strip()
    except Exception as tesseract_err:
        # Tesseract binary might not be on system PATH
        pass

    # 2. Try Gemini Multimodal Vision API if key configured
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key and gemini_key.strip():
        try:
            import requests
            url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key={gemini_key.strip()}"
            payload = {
                "contents": [
                    {
                        "parts": [
                            {"text": "Transcribe all visible text from this job offer or email screenshot accurately. Return ONLY the extracted text with no extra commentary."},
                            {
                                "inline_data": {
                                    "mime_type": mime_type,
                                    "data": raw_base64
                                }
                            }
                        ]
                    }
                ]
            }
            res = requests.post(url, json=payload, timeout=8.0)
            if res.status_code == 200:
                data = res.json()
                text = data["candidates"][0]["content"]["parts"][0]["text"].strip()
                if text:
                    return text
        except Exception as gemini_err:
            print(f"Gemini Vision OCR fallback error: {gemini_err}")

    return ""
