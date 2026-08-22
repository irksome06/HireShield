from fastapi import APIRouter, HTTPException, Depends
from typing import List
from app.models.schemas import (
    JobAnalysisRequest, 
    AnalysisResponse, 
    HealthResponse,
    ExtractedEntities
)
from app.services.extractor import extract_entities
from app.services.verifier import run_all_verifications
from app.services.risk_engine import evaluate_job_risk

router = APIRouter()

@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Health check endpoint to confirm backend readiness."""
    return HealthResponse(
        status="ok",
        version="1.0.0",
        deterministic_engine="active",
        services={
            "entity_extractor": "ready",
            "domain_verifier": "ready",
            "risk_engine": "ready"
        }
    )

@router.post("/analyze", response_model=AnalysisResponse)
async def analyze_job(request: JobAnalysisRequest):
    """
    Main HireShield analysis endpoint:
    1. Structured entity extraction
    2. Verification checks (domain, MX, telemetry)
    3. Deterministic risk engine scoring & evidence trail
    4. Job Trust Passport compilation
    """
    if not request.message.strip() and not (request.url and request.url.strip()):
        raise HTTPException(
            status_code=400, 
            detail="Job message text or URL is required for analysis."
        )

    try:
        # Step 1: Entity extraction
        entities = await extract_entities(request.message, request.url)

        # Step 2: Verifications
        verifications = run_all_verifications(entities, request.url)

        # Step 3: Risk engine evaluation & Passport generation
        analysis_result = evaluate_job_risk(
            message=request.message,
            url=request.url or "",
            entities=entities,
            verifications=verifications
        )

        return analysis_result

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=f"An error occurred during threat inspection: {str(e)}"
        )

@router.post("/extract-entities", response_model=ExtractedEntities)
async def extract_only(request: JobAnalysisRequest):
    """Direct entity extraction endpoint."""
    return await extract_entities(request.message, request.url)
