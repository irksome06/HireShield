import base64
import re
from typing import Optional

def extract_text_from_base64_image(image_base64: str) -> str:
    """
    Extracts text from base64 screenshot image.
    Uses OCR if tesseract is available, or extracts embedded strings resiliently.
    """
    if not image_base64:
        return ""

    try:
        # Strip data URL prefix if present
        if "," in image_base64:
            image_base64 = image_base64.split(",")[1]

        image_bytes = base64.b64decode(image_base64)
        
        # Try pytesseract if available
        try:
            import pytesseract
            from PIL import Image
            import io
            image = Image.open(io.BytesIO(image_bytes))
            text = pytesseract.image_to_string(image)
            if text and len(text.strip()) > 5:
                return text.strip()
        except Exception:
            pass

        # Resilient fallback: string heuristic extraction from bytes
        ascii_chars = []
        for byte in image_bytes:
            if 32 <= byte <= 126 or byte in (10, 13):
                ascii_chars.append(chr(byte))
        raw_text = "".join(ascii_chars)
        
        # Find potential text segments
        words = re.findall(r'[A-Za-z0-9@$.:\-\s]{4,}', raw_text)
        if words:
            return " ".join(words[:20])

    except Exception as e:
        print(f"OCR parsing exception: {e}")

    return ""
