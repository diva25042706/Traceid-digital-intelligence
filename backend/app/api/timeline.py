from fastapi import APIRouter
from typing import List, Dict, Any
from backend.app.api.investigations import INVESTIGATIONS_STORE

router = APIRouter(prefix="/investigations/{id}/timeline", tags=["Timeline"])

@router.get("", response_model=List[Dict[str, Any]])
def get_investigation_timeline(id: str):
    """Retrieve chronological temporal DNA lattice for an investigation."""
    inv = INVESTIGATIONS_STORE.get(id) or INVESTIGATIONS_STORE.get("TRC-001")
    return inv.get("timeline", [])
