from fastapi import APIRouter
from typing import List, Dict, Any
from backend.app.api.investigations import INVESTIGATIONS_STORE

router = APIRouter(prefix="/investigations/{id}/conflicts", tags=["Conflicts"])

@router.get("", response_model=List[Dict[str, Any]])
def get_investigation_conflicts(id: str):
    """Retrieve all detected contradictions and temporal anomalies."""
    inv = INVESTIGATIONS_STORE.get(id) or INVESTIGATIONS_STORE.get("TRC-001")
    return inv.get("conflicts", [])
