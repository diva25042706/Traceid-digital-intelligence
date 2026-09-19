import uuid
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field
from fastapi import APIRouter, HTTPException, BackgroundTasks

from backend.app.services.twin.twin_identification_engine import twin_identification_engine

router = APIRouter(prefix="/twin", tags=["Twin Identification & False-Match Analysis"])

class PersonInput(BaseModel):
    name: Optional[str] = Field("", description="Known name of subject")
    organization: Optional[str] = Field("", description="Known organization / affiliation")
    handle: Optional[str] = Field("", description="Known handle or username")
    domain: Optional[str] = Field("", description="Known technical domain")
    context: Optional[str] = Field("", description="Additional context or notes")
    image_url: Optional[str] = Field("", description="Consented reference portrait URL")

class TwinAnalysisRequest(BaseModel):
    person_a: PersonInput
    person_b: PersonInput
    consent_confirmed: bool = Field(True, description="Consent affirmation for both subjects")

@router.post("/analyze")
async def analyze_twin(req: TwinAnalysisRequest, background_tasks: BackgroundTasks) -> Dict[str, Any]:
    """
    Launch Twin Identification & False-Match Analysis.
    Evaluates visual similarity vs independent public evidence across 14 stages.
    """
    investigation_id = f"TWIN-{uuid.uuid4().hex[:6].upper()}"

    twin_identification_engine.update_status(
        investigation_id=investigation_id,
        stage_name="Initializing twin investigation...",
        progress_percent=7
    )

    result = twin_identification_engine.run_twin_analysis(
        investigation_id=investigation_id,
        person_a=req.person_a.model_dump(),
        person_b=req.person_b.model_dump()
    )

    return result

@router.get("/{investigation_id}/status")
async def get_twin_status(investigation_id: str) -> Dict[str, Any]:
    """
    Poll live twin investigation status across 14 stages.
    """
    status = twin_identification_engine.status_store.get(investigation_id)
    if not status:
        raise HTTPException(status_code=404, detail="Twin investigation not found")
    return status

@router.get("/{investigation_id}")
async def get_twin_report(investigation_id: str) -> Dict[str, Any]:
    """
    Retrieve completed Twin Identification & False-Match Analysis Report.
    """
    result = twin_identification_engine.results_store.get(investigation_id)
    if not result:
        raise HTTPException(status_code=404, detail="Twin report not found")
    return result

@router.get("")
async def get_all_twins() -> List[Dict[str, Any]]:
    """
    List all twin investigations.
    """
    return list(twin_identification_engine.results_store.values())
