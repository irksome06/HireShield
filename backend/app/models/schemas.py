from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field

class JobAnalysisRequest(BaseModel):
    message: str = Field(..., description="Job description, email, or chat text to analyze")
    url: Optional[str] = Field(None, description="Optional job post URL or recruiter domain")
    has_image: Optional[bool] = Field(False, description="Flag indicating if a screenshot was attached")
    image_base64: Optional[str] = Field(None, description="Optional base64 image data for OCR parsing")

class ExtractedEntities(BaseModel):
    company: str = "Not detected"
    recruiter: str = "Not detected"
    email: str = "Not provided"
    phone: str = "Not provided"
    job_title: str = "Not specified"
    domain: str = "None detected"
    payment_amount: str = "None detected"
    salary_claim: str = "Not specified"

class DeductionItem(BaseModel):
    id: int
    signal: str
    penalty: int
    severity: str  # Critical, High, Medium, Low
    description: str

class VerificationItem(BaseModel):
    name: str
    status: str  # Passed, Warning, Failed, Unverified, Neutral
    detail: str

class AnalysisResponse(BaseModel):
    trust_score: int = Field(..., ge=0, le=100, description="Explainable 0-100 Trust Score")
    risk_level: str = Field(..., description="Low, Moderate, Suspicious, or High")
    risk_color: str = Field(..., description="emerald, sky, amber, or rose")
    verdict: str = Field(..., description="High-level security verdict")
    summary: str = Field(..., description="Executive security explanation")
    entities: ExtractedEntities
    deductions: List[DeductionItem] = []
    verifications: List[VerificationItem] = []
    recommendations: List[str] = []
    passport_id: str
    timestamp: str

class HealthResponse(BaseModel):
    status: str = "ok"
    version: str = "1.0.0"
    deterministic_engine: str = "active"
    services: Dict[str, str] = {}
