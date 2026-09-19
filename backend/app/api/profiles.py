from fastapi import APIRouter
from typing import List, Dict, Any
from backend.app.api.investigations import INVESTIGATIONS_STORE

router = APIRouter(prefix="/investigations/{id}/profiles", tags=["Profiles"])

@router.get("", response_model=List[Dict[str, Any]])
def get_discovered_profiles(id: str):
    """Retrieve all discovered public profiles across platforms for an investigation."""
    inv = INVESTIGATIONS_STORE.get(id) or INVESTIGATIONS_STORE.get("TRC-001")
    return inv.get("profiles", [])
