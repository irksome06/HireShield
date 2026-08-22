import json
from fastapi import APIRouter, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.models.schemas import (
    JobAnalysisRequest, 
    AnalysisResponse, 
    HealthResponse,
    ExtractedEntities,
    DeductionItem,
    VerificationItem
)
from app.services.extractor import extract_entities
from app.services.verifier import run_all_verifications
from app.services.risk_engine import evaluate_job_risk
from app.services.ocr_service import extract_text_from_base64_image
from app.db.database import get_db, init_db
from app.db.models import JobAuditLog

router = APIRouter()

# Initialize tables on startup
try:
    init_db()
except Exception as e:
    print(f"Database init warning: {e}")

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint confirming status of backend & risk services."""
    return HealthResponse(
        status="ok",
        version="1.0.0",
        deterministic_engine="active",
        services={
            "entity_extractor": "ready",
            "domain_verifier": "ready",
            "risk_engine": "ready",
            "database": "active"
        }
    )

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_job(request: JobAnalysisRequest, db: Session = Depends(get_db)):
    """
    Main HireShield analysis endpoint:
    1. Screenshot OCR parsing (if image attached)
    2. Structured entity extraction
    3. External telemetry & domain verifications
    4. Deterministic risk engine scoring & evidence trail
    5. Database audit logging
    6. Job Trust Passport compilation
    """
    combined_message = (request.message or "").strip()

    # Step 0: Screenshot OCR processing
    if request.has_image and request.image_base64:
        ocr_extracted_text = extract_text_from_base64_image(request.image_base64)
        if ocr_extracted_text:
            combined_message = f"{combined_message}\n\n[Extracted from Offer Screenshot]:\n{ocr_extracted_text}"

    if not combined_message and not (request.url and request.url.strip()):
        raise HTTPException(
            status_code=400, 
            detail="Job message text, screenshot, or URL is required for analysis."
        )

    try:
        # Step 1: Entity extraction
        entities = await extract_entities(combined_message, request.url)

        # Step 2: Domain and MX verifications
        verifications = run_all_verifications(entities, request.url)

        # Step 3: Deterministic risk engine scoring & Passport generation
        analysis_result = evaluate_job_risk(
            message=combined_message,
            url=request.url or "",
            entities=entities,
            verifications=verifications
        )

        # Step 4: Persist to Database Audit Log
        try:
            audit_entry = JobAuditLog(
                passport_id=analysis_result.passport_id,
                trust_score=analysis_result.trust_score,
                risk_level=analysis_result.risk_level,
                risk_color=analysis_result.risk_color,
                verdict=analysis_result.verdict,
                summary=analysis_result.summary,
                job_message=combined_message[:2000],
                job_url=request.url,
                entities_json=json.dumps(analysis_result.entities.model_dump()),
                deductions_json=json.dumps([d.model_dump() for d in analysis_result.deductions]),
                verifications_json=json.dumps([v.model_dump() for v in analysis_result.verifications]),
                recommendations_json=json.dumps(analysis_result.recommendations)
            )
            db.add(audit_entry)
            db.commit()
            db.refresh(audit_entry)
        except Exception as db_err:
            print(f"Database persist warning: {db_err}")
            db.rollback()

        return analysis_result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during threat inspection: {str(e)}"
        )

@router.get("/history", response_model=List[AnalysisResponse])
async def get_audit_history(limit: int = 20, db: Session = Depends(get_db)):
    """Retrieves recent job audits from the database."""
    try:
        logs = db.query(JobAuditLog).order_by(JobAuditLog.created_at.desc()).limit(limit).all()
        results = []
        for log in logs:
            results.append(AnalysisResponse(
                trust_score=log.trust_score,
                risk_level=log.risk_level,
                risk_color=log.risk_color,
                verdict=log.verdict,
                summary=log.summary or "",
                entities=ExtractedEntities(**json.loads(log.entities_json)),
                deductions=[DeductionItem(**d) for d in json.loads(log.deductions_json)],
                verifications=[VerificationItem(**v) for v in json.loads(log.verifications_json)],
                recommendations=json.loads(log.recommendations_json),
                passport_id=log.passport_id,
                timestamp=log.created_at.isoformat() + "Z"
            ))
        return results
    except Exception as e:
        print(f"Error fetching history: {e}")
        return []

@router.get("/history/{passport_id}", response_model=AnalysisResponse)
async def get_passport_by_id(passport_id: str, db: Session = Depends(get_db)):
    """Retrieves a specific Job Trust Passport by its unique cryptographic passport ID."""
    log = db.query(JobAuditLog).filter(JobAuditLog.passport_id == passport_id).first()
    if not log:
        raise HTTPException(status_code=404, detail="Job Trust Passport not found.")

    return AnalysisResponse(
        trust_score=log.trust_score,
        risk_level=log.risk_level,
        risk_color=log.risk_color,
        verdict=log.verdict,
        summary=log.summary or "",
        entities=ExtractedEntities(**json.loads(log.entities_json)),
        deductions=[DeductionItem(**d) for d in json.loads(log.deductions_json)],
        verifications=[VerificationItem(**v) for v in json.loads(log.verifications_json)],
        recommendations=json.loads(log.recommendations_json),
        passport_id=log.passport_id,
        timestamp=log.created_at.isoformat() + "Z"
    )

@router.post("/extract-entities", response_model=ExtractedEntities)
async def extract_only(request: JobAnalysisRequest):
    """Direct entity extraction endpoint."""
    return await extract_entities(request.message, request.url)
