import os
import base64
import io
import re
import logging
from typing import Optional

logger = logging.getLogger(__name__)

# Auto-configure Tesseract binary path across Windows & Linux platforms
def _init_tesseract():
    try:
        import pytesseract
        
        # Check custom env var first
        custom_cmd = os.getenv("TESSERACT_CMD")
        if custom_cmd and os.path.exists(custom_cmd):
            pytesseract.pytesseract.tesseract_cmd = custom_cmd
            logger.info(f"Configured Tesseract from TESSERACT_CMD: {custom_cmd}")
            return True

        # Common Windows installation locations
        windows_paths = [
            r"C:\Program Files\Tesseract-OCR\tesseract.exe",
            r"C:\Program Files (x86)\Tesseract-OCR\tesseract.exe",
            os.path.expandvars(r"%LOCALAPPDATA%\Programs\Tesseract-OCR\tesseract.exe")
        ]
        for path in windows_paths:
            if os.path.exists(path):
                pytesseract.pytesseract.tesseract_cmd = path
                logger.info(f"Auto-discovered Tesseract on Windows: {path}")
                return True

        return False
    except ImportError:
        logger.warning("pytesseract module not installed.")
        return False

# Initialize on module load
_tesseract_configured = _init_tesseract()

def extract_text_from_base64_image(image_base64: str) -> str:
    """
    Extracts text from a base64 screenshot image.
    Uses Tesseract OCR locally or Gemini Vision API if configured.
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

    # 1. Try local Tesseract OCR
    try:
        from PIL import Image
        import pytesseract

        # Re-verify path if not yet set
        _init_tesseract()

        image_bytes = base64.b64decode(raw_base64)
        image = Image.open(io.BytesIO(image_bytes))
        
        # Convert RGBA / Palette to RGB for clean OCR recognition
        if image.mode in ('RGBA', 'LA', 'P'):
            image = image.convert('RGB')

        text = pytesseract.image_to_string(image)
        cleaned_text = text.strip() if text else ""

        if cleaned_text and len(cleaned_text) > 3:
            logger.info(f"Tesseract OCR extracted {len(cleaned_text)} chars from screenshot.")
            return cleaned_text
        else:
            logger.warning("Tesseract OCR completed but detected no readable text.")

    except Exception as tesseract_err:
        logger.warning(f"Tesseract OCR execution error: {tesseract_err}")

    # 2. Try Gemini Multimodal Vision API fallback if key configured
    gemini_key = os.getenv("GEMINI_API_KEY")
    if gemini_key and gemini_key.strip():
        import requests
        models_to_try = ["gemini-flash-lite-latest", "gemini-flash-latest", "gemini-2.5-flash-image"]
        for model_name in models_to_try:
            try:
                url = f"https://generativelanguage.googleapis.com/v1beta/models/{model_name}:generateContent?key={gemini_key.strip()}"
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
                    candidates = data.get("candidates", [])
                    if not candidates:
                        continue
                    candidate_content = candidates[0].get("content", {})
                    extracted_text = ""
                    for part in candidate_content.get("parts", []):
                        if "text" in part and not part.get("thought", False):
                            extracted_text = part["text"].strip()
                            break
                    if not extracted_text and candidate_content.get("parts"):
                        extracted_text = candidate_content["parts"][0].get("text", "").strip()

                    if extracted_text:
                        logger.info(f"Gemini Vision OCR extracted {len(extracted_text)} chars from screenshot.")
                        return extracted_text
            except Exception as gemini_err:
                logger.warning(f"Gemini Vision model {model_name} error: {gemini_err}")

    return ""
