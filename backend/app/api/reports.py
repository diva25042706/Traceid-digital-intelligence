from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from backend.app.api.investigations import INVESTIGATIONS_STORE

router = APIRouter(prefix="/investigations/{id}/report", tags=["Reports"])

@router.get("", response_model=Dict[str, Any])
def get_final_intelligence_report(id: str):
    """Retrieve structured final intelligence dossier ready for export."""
    inv = INVESTIGATIONS_STORE.get(id)
    if not inv:
        raise HTTPException(status_code=404, detail=f"Investigation '{id}' not found")
    return {
        "report_id": f"REP-{id}",
        "investigation_id": id,
        "subject_name": inv.get("subject_name"),
        "status": inv.get("status"),
        "executive_summary": inv.get("ai_analyst", {}).get("identity_assessment", ""),
        "candidates": inv.get("candidates", []),
        "dna_signals": inv.get("dna_signals", []),
        "timeline": inv.get("timeline", []),
        "evidence_summary": inv.get("counterfactual", {}),
        "ai_analyst": inv.get("ai_analyst", {})
    }
