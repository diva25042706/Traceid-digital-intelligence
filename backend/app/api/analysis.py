from fastapi import APIRouter
from typing import Dict, Any
from backend.app.api.investigations import INVESTIGATIONS_STORE

router = APIRouter(prefix="/investigations/{id}/analysis", tags=["Analysis"])

@router.get("", response_model=Dict[str, Any])
def get_ai_analyst_analysis(id: str):
    """Retrieve structured AI Analyst assessment and causal provenance."""
    inv = INVESTIGATIONS_STORE.get(id) or INVESTIGATIONS_STORE.get("TRC-001")
    return inv.get("ai_analyst", {})
