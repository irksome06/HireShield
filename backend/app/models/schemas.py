from typing import List, Optional, Dict, Any
from pydantic import BaseModel, Field, EmailStr

# --- Auth Schemas ---

class UserSignUpRequest(BaseModel):
    name: str = Field(..., min_length=2, max_length=100, description="Full name")
    email: EmailStr = Field(..., description="Valid email address")
    password: str = Field(..., min_length=6, max_length=128, description="Password (min 6 characters)")

class UserLoginRequest(BaseModel):
    email: EmailStr = Field(..., description="Registered email address")
    password: str = Field(..., description="Account password")

class GoogleAuthRequest(BaseModel):
    credential: str = Field(..., description="Google ID Token from Google Identity Services")

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    auth_provider: str = "local"
    avatar_url: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    created_at: str

    class Config:
        from_attributes = True

class ProfileUpdateRequest(BaseModel):
    name: Optional[str] = Field(None, min_length=1, max_length=100)
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    avatar_url: Optional[str] = None

class ChangePasswordRequest(BaseModel):
    current_password: str
    new_password: str = Field(..., min_length=6, max_length=128)

class AuthResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    user: UserResponse

# --- Analysis & Scanner Schemas ---

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
    linkedin_company_url: Optional[str] = None
    linkedin_recruiter_url: Optional[str] = None
    extraction_method: str = "Deterministic Rule Engine"

class DeductionItem(BaseModel):
    id: int
    signal: str
    penalty: int
    severity: str  # Critical, High, Medium, Low
    description: str

class VerificationItem(BaseModel):
    name: str
    status: str  # Passed, Warning, Failed, Unavailable, Neutral
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
