import uuid
import datetime
from fastapi import APIRouter, HTTPException, Depends
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

from backend.app.services.discovery.profile_discovery_engine import profile_discovery_engine
from backend.app.providers.wikidata_provider import wikidata_provider

router = APIRouter(prefix="/discovery", tags=["Profile Discovery"])

class ProfileDiscoveryRequest(BaseModel):
    subject_name: Optional[str] = ""
    alias: Optional[str] = ""
    organization: Optional[str] = ""
    domain: Optional[str] = ""
    additional_context: Optional[str] = ""
    image_reference: Optional[str] = None
    consent_confirmed: bool = True

DISCOVERY_STORE: Dict[str, Dict[str, Any]] = {}

def ensure_default_discovery():
    if "DISC-001" not in DISCOVERY_STORE:
        DISCOVERY_STORE["DISC-001"] = profile_discovery_engine.run_profile_discovery(
            discovery_id="DISC-001",
            subject_name="Hareesh Rajendiran",
            alias="",
            organization="Vanakkam DSA",
            domain="DSA / Programming / Developer Education",
            additional_context="Public programming / DSA educator and contributor associated with Vanakkam DSA.",
            image_reference="/hareesh_reference.png"
        )

@router.get("/wikidata", response_model=Dict[str, Any])
def search_wikidata_entities(name: str):
    """
    Direct Wikidata Query Service & Entity Discovery Endpoint.
    Programmatically searches Wikidata for candidate persons, QIDs, websites, and external profiles.
    """
    if not name or not name.strip():
        raise HTTPException(status_code=400, detail="Name parameter is required.")
    
    try:
        candidates = wikidata_provider.search_person(name=name)
        sources = [
            {
                "source": "Wikidata Query Service",
                "endpoint": "https://query.wikidata.org/sparql",
                "retrieved_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
            }
        ]
        return {
            "query": name,
            "candidates": candidates,
            "sources": sources,
            "errors": []
        }
    except Exception as e:
        return {
            "query": name,
            "candidates": [],
            "sources": [],
            "errors": [str(e)]
        }

@router.get("", response_model=List[Dict[str, Any]])
def get_all_discoveries():
    """Retrieve all executed profile discovery investigations."""
    ensure_default_discovery()
    return list(DISCOVERY_STORE.values())

@router.post("/profiles", response_model=Dict[str, Any])
def create_and_run_profile_discovery(payload: ProfileDiscoveryRequest):
    """
    Checkpoint 3 Case 2: Real-Time Public Profile Discovery Pipeline.
    Takes person's image + optional context, dynamically expands search hypotheses,
    queries permitted public indexers, and extracts verified profiles and records.
    """
    disc_id = f"TRACEID-2026-{uuid.uuid4().hex[:6].upper()}"
    
    result = profile_discovery_engine.run_profile_discovery(
        discovery_id=disc_id,
        subject_name=payload.subject_name or "",
        alias=payload.alias or "",
        organization=payload.organization or "",
        domain=payload.domain or "",
        additional_context=payload.additional_context or "",
        image_reference=payload.image_reference or "/hareesh_reference.png"
    )

    DISCOVERY_STORE[disc_id] = result
    return result

@router.get("/{id}/status", response_model=Dict[str, Any])
def get_discovery_status(id: str):
    """Retrieve real-time pipeline execution status and counters for profile discovery."""
    status_data = profile_discovery_engine.status_store.get(id)
    if not status_data:
        disc = DISCOVERY_STORE.get(id)
        if disc:
            return {
                "discovery_id": id,
                "status": "COMPLETED",
                "current_stage": "PREPARING DISCOVERY REPORT",
                "progress_percent": 100,
                "completed_stages": [
                    "INITIALIZING", "READING PUBLIC CONTEXT", "GENERATING SEARCH QUERIES",
                    "SEARCHING PUBLIC SOURCES", "DISCOVERING PROFILES", "VALIDATING SOURCES",
                    "GROUPING PROFILES", "PREPARING DISCOVERY REPORT"
                ],
                "queries_generated": len(disc.get("queries_generated", [])),
                "sources_searched": disc.get("sources_searched_count", 0),
                "profiles_discovered": disc.get("profiles_discovered_count", 0),
                "community_records": len([r for r in disc.get("public_records", []) if r.get("category") == "COMMUNITY"]),
                "project_records": len([r for r in disc.get("public_records", []) if r.get("category") in ["TECHNICAL", "PROJECTS"]]),
                "event_records": len([r for r in disc.get("public_records", []) if r.get("category") == "EVENTS"]),
                "verified_sources": disc.get("verified_sources_count", 0),
                "result": disc
            }
        raise HTTPException(status_code=404, detail=f"Discovery '{id}' not found.")
    return status_data

@router.get("/{id}", response_model=Dict[str, Any])
def get_discovery_by_id(id: str):
    """Retrieve full Public Profile Discovery Report by ID."""
    if id == "DISC-001":
        ensure_default_discovery()
    if id not in DISCOVERY_STORE:
        raise HTTPException(status_code=404, detail=f"Discovery '{id}' not found.")
    return DISCOVERY_STORE[id]
