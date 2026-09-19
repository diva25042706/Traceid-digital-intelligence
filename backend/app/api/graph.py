from fastapi import APIRouter, HTTPException
from typing import Dict, Any
from backend.app.api.investigations import INVESTIGATIONS_STORE

router = APIRouter(prefix="/investigations/{id}/graph", tags=["Graph"])

@router.get("", response_model=Dict[str, Any])
def get_investigation_graph(id: str):
    """Retrieve React Flow and Neo4j compatible knowledge graph (nodes and edges)."""
    inv = INVESTIGATIONS_STORE.get(id)
    if not inv:
        raise HTTPException(status_code=404, detail=f"Investigation '{id}' not found")
    return {
        "nodes": inv.get("nodes", []),
        "edges": inv.get("edges", [])
    }
