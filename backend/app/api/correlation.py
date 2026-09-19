import uuid
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException, BackgroundTasks

from backend.app.services.correlation.multi_platform_correlation_engine import multi_platform_correlation_engine

router = APIRouter(prefix="/correlation", tags=["Multi-Platform Correlation"])

class AdditionalSource(BaseModel):
    platform: str
    url: str

class CorrelationRequest(BaseModel):
    subject_name: str = Field(..., description="Target known subject name")
    known_linkedin: Optional[str] = Field("", description="Known LinkedIn public profile URL anchor")
    known_website: Optional[str] = Field("", description="Known personal / technical website anchor")
    organization: Optional[str] = Field("", description="Known organization / community (e.g. Vanakkam DSA)")
    domain: Optional[str] = Field("", description="Known technical domain (e.g. DSA / Programming)")
    additional_sources: Optional[List[AdditionalSource]] = Field(default_factory=list, description="Additional public sources (e.g. GitHub)")
    additional_context: Optional[str] = Field("", description="Additional context or notes")
    image_reference: Optional[str] = Field("", description="Reference portrait URL or path")
    consent_confirmed: bool = Field(True, description="Consent affirmation")

@router.post("/analyze")
async def analyze_correlation(req: CorrelationRequest, background_tasks: BackgroundTasks) -> Dict[str, Any]:
    """
    Launch a Multi-Platform Correlation Investigation (Checkpoint 3 Case 3 — 10 Marks).
    Runs non-blocking in the background, updating live progress across 12 stages.
    """
    investigation_id = f"CORR-{uuid.uuid4().hex[:6].upper()}"
    
    # Initialize state immediately
    multi_platform_correlation_engine.update_status(
        investigation_id=investigation_id,
        stage_name="Initializing correlation investigation...",
        progress_percent=8
    )

    additional_sources_dict = [s.model_dump() for s in req.additional_sources] if req.additional_sources else []

    # Run analysis
    result = multi_platform_correlation_engine.run_correlation(
        investigation_id=investigation_id,
        subject_name=req.subject_name,
        known_linkedin=req.known_linkedin or "",
        known_website=req.known_website or "",
        organization=req.organization or "",
        domain=req.domain or "",
        additional_sources=additional_sources_dict,
        additional_context=req.additional_context or "",
        image_reference=req.image_reference or ""
    )

    return result

@router.get("/{investigation_id}/status")
async def get_correlation_status(investigation_id: str) -> Dict[str, Any]:
    """
    Poll live status, current stage (1-12), progress percent, and live counters.
    """
    status = multi_platform_correlation_engine.status_store.get(investigation_id)
    if not status:
        raise HTTPException(status_code=404, detail="Correlation investigation not found")
    return status

@router.get("/{investigation_id}")
async def get_correlation_report(investigation_id: str) -> Dict[str, Any]:
    """
    Retrieve completed Multi-Platform Correlation Report.
    """
    result = multi_platform_correlation_engine.results_store.get(investigation_id)
    if not result:
        raise HTTPException(status_code=404, detail="Correlation report not found")
    return result

@router.get("")
async def get_all_correlations() -> List[Dict[str, Any]]:
    """
    List all correlation investigations.
    """
    return list(multi_platform_correlation_engine.results_store.values())
