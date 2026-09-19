from fastapi import APIRouter
from typing import List, Dict, Any
from backend.app.mock_data.authorized_dataset import AUTHORIZED_DATASET

router = APIRouter(tags=["Sources"])

@router.get("/sources", response_model=List[Dict[str, Any]])
def get_all_sources():
    """Retrieve all authorized public ingestion sources."""
    return AUTHORIZED_DATASET.get("public_sources", [])

@router.get("/investigations/{id}/sources", response_model=List[Dict[str, Any]])
def get_investigation_sources(id: str):
    """Retrieve sources utilized for an investigation."""
    return AUTHORIZED_DATASET.get("public_sources", [])
