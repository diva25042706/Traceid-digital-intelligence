import uuid
import datetime
from fastapi import APIRouter, Depends, HTTPException, BackgroundTasks
from sqlalchemy.orm import Session
from typing import List, Dict, Any
from backend.app.database import get_db
from backend.app.models.models import Investigation as DBInvestigation
from backend.app.schemas.investigation import (
    InvestigationCreate,
    InvestigationResponse,
    AnalysisProgressSchema,
    HumanReviewSubmission,
)
from backend.app.services.pipeline_orchestrator import pipeline_orchestrator
from backend.app.mock_data.authorized_dataset import AUTHORIZED_DATASET

router = APIRouter(prefix="/investigations", tags=["Investigations"])

# In-memory fast cache for active investigations
INVESTIGATIONS_STORE: Dict[str, Dict[str, Any]] = {}

# Pre-populate default benchmark TRC-001 (Sathana Jayaraman)
default_inv = pipeline_orchestrator.run_full_pipeline(
    investigation_id="TRC-001",
    subject_name="Sathana Jayaraman",
    alias="Sathana0511",
    organization="Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
    known_platform="LinkedIn / GitHub / Instagram / Student",
    additional_context="Public professional profile: Sathana Jayaraman\nGitHub username: Sathana0511\nInstagram username: itz_sathana\nCollege: Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
    image_reference="/sathana_reference.png"
)
INVESTIGATIONS_STORE["TRC-001"] = default_inv

@router.get("", response_model=List[Dict[str, Any]])
def get_all_investigations(db: Session = Depends(get_db)):
    """Retrieve list of all active and completed investigations."""
    return list(INVESTIGATIONS_STORE.values())

@router.post("", response_model=Dict[str, Any])
def create_investigation(payload: InvestigationCreate, db: Session = Depends(get_db)):
    """Create a new consented identity investigation record."""
    new_id = f"TRC-{len(INVESTIGATIONS_STORE) + 1:03d}"

    inv_record = {
        "id": new_id,
        "subject_name": payload.subject_name,
        "alias": payload.alias or "",
        "organization": payload.organization or "",
        "known_platform": payload.known_platform or "Web Registries",
        "additional_context": payload.additional_context or "",
        "avatar_url": payload.image_reference or "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
        "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
        "status": "CREATED",
        "sources_count": 0,
        "candidates_count": 0,
        "evidence_links_count": 0,
        "ambiguities_count": 0,
        "pipeline": [],
        "candidates": [],
        "timeline": [],
        "nodes": [],
        "edges": []
    }

    INVESTIGATIONS_STORE[new_id] = inv_record
    pipeline_orchestrator.update_status(
        investigation_id=new_id,
        stage_name="Stage 1: Ingesting Consented Reference Portrait & Parameters",
        progress_percent=10,
        sources_found=0,
        candidates_found=0
    )
    return inv_record

@router.post("/{id}/analyze", response_model=Dict[str, Any])
def analyze_investigation(id: str, db: Session = Depends(get_db)):
    """Execute the full dynamic TRACEID resolution pipeline."""
    existing = INVESTIGATIONS_STORE.get(id)
    if not existing:
        raise HTTPException(status_code=404, detail=f"Investigation '{id}' not found")

    result = pipeline_orchestrator.run_full_pipeline(
        investigation_id=id,
        subject_name=existing.get("subject_name", ""),
        alias=existing.get("alias", ""),
        organization=existing.get("organization", ""),
        known_platform=existing.get("known_platform", ""),
        additional_context=existing.get("additional_context", ""),
        image_reference=existing.get("avatar_url", "")
    )

    INVESTIGATIONS_STORE[id] = result
    return result

@router.get("/{id}/status", response_model=AnalysisProgressSchema)
def get_investigation_status(id: str):
    """Retrieve real-time pipeline execution progress for an investigation."""
    status_data = pipeline_orchestrator.status_store.get(id)
    if not status_data:
        inv = INVESTIGATIONS_STORE.get(id)
        if inv:
            return {
                "investigation_id": id,
                "status": "COMPLETED",
                "current_stage": "Stage 9: Report Generation & Cryptographic Export",
                "progress_percent": 100,
                "completed_stages": [
                    "Input Ingestion", "Signal Extraction", "Registry Discovery",
                    "Entity Resolution", "Cross-Source Verification", "TwinGuard Analysis",
                    "Knowledge Graph", "AI Analyst Synthesis", "Report Generation"
                ],
                "result": inv
            }
        return {
            "investigation_id": id,
            "status": "NOT_FOUND",
            "current_stage": "Idle",
            "progress_percent": 0,
            "completed_stages": [],
            "result": None
        }
    return status_data

@router.get("/{id}", response_model=Dict[str, Any])
def get_investigation_by_id(id: str, db: Session = Depends(get_db)):
    """Retrieve full investigation dossier and resolved lattice by ID."""
    if id not in INVESTIGATIONS_STORE:
        raise HTTPException(status_code=404, detail=f"Investigation '{id}' not found")
    return INVESTIGATIONS_STORE[id]

@router.get("/{id}/audit-trail", response_model=List[Dict[str, Any]])
def get_investigation_audit_trail(id: str):
    """Retrieve the step-by-step investigation replay & audit trail."""
    inv = INVESTIGATIONS_STORE.get(id)
    if not inv:
        raise HTTPException(status_code=404, detail=f"Investigation '{id}' not found")
    return inv.get("audit_trail", [])

@router.post("/{id}/review", response_model=Dict[str, Any])
def submit_human_review(id: str, submission: HumanReviewSubmission):
    """Submit analyst review, accept/reject evidence, set final decision, and sign off."""
    inv = INVESTIGATIONS_STORE.get(id)
    if not inv:
        raise HTTPException(status_code=404, detail=f"Investigation '{id}' not found")

    timestamp = submission.sign_off_timestamp or datetime.datetime.now(datetime.timezone.utc).strftime("%Y-%m-%d %H:%M:%S UTC")

    # Update human_review state in investigation
    inv["human_review"] = {
        "status": "SIGNED_OFF",
        "analyst_name": submission.analyst_name or "Lead Intelligence Analyst",
        "analyst_decision": submission.analyst_decision,
        "accepted_evidence_ids": submission.accepted_evidence_ids,
        "rejected_evidence_ids": submission.rejected_evidence_ids,
        "analyst_notes": submission.analyst_notes,
        "signed_off": True,
        "sign_off_timestamp": timestamp
    }

    # Update final investigation status
    inv["status"] = "HUMAN SIGNED OFF" if submission.analyst_decision == "SUPPORTED" else f"REVIEWED ({submission.analyst_decision})"

    # Append to audit trail
    if "audit_trail" in inv and len(inv["audit_trail"]) > 0:
        inv["audit_trail"][-1]["status"] = "COMPLETED"
        inv["audit_trail"][-1]["result"] = f"SIGNED OFF by {submission.analyst_name or 'Analyst'} as {submission.analyst_decision}"
        inv["audit_trail"][-1]["timestamp"] = timestamp

    INVESTIGATIONS_STORE[id] = inv
    return inv
