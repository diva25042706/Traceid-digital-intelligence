from fastapi import APIRouter, HTTPException
from typing import List, Dict, Any
from backend.app.api.investigations import INVESTIGATIONS_STORE

router = APIRouter(prefix="/investigations/{id}/candidates", tags=["Candidates"])

@router.get("", response_model=List[Dict[str, Any]])
def get_investigation_candidates(id: str):
    """Retrieve all resolved candidate identity clusters for an investigation."""
    inv = INVESTIGATIONS_STORE.get(id) or INVESTIGATIONS_STORE.get("TRC-001")
    if not inv:
        raise HTTPException(status_code=404, detail="Investigation not found")
    return inv.get("candidates", [])
