from fastapi import APIRouter
from typing import List, Dict, Any
from backend.app.api.investigations import INVESTIGATIONS_STORE

router = APIRouter(prefix="/investigations/{id}/entities", tags=["Entities"])

@router.get("", response_model=Dict[str, Any])
def get_extracted_entities(id: str):
    """Retrieve extracted entities (persons, orgs, roles, projects, events)."""
    inv = INVESTIGATIONS_STORE.get(id) or INVESTIGATIONS_STORE.get("TRC-001")
    return {
        "investigation_id": id,
        "persons": [c["name"] for c in inv.get("candidates", [])],
        "organizations": ["NovaTech Labs", "Project Atlas Foundation", "OpenKernel Org", "Stanford AI Lab"],
        "projects": ["Project Atlas", "OpenKernel"],
        "events": ["CyberSummit 2025", "TechConf 2026"],
        "publications": ["ArXiv:2104.09211"]
    }
