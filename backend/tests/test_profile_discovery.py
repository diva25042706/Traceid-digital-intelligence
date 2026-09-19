import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.discovery.profile_discovery_engine import profile_discovery_engine

client = TestClient(app)

def test_dynamic_query_generation():
    queries = profile_discovery_engine.generate_discovery_queries(
        name="Hareesh Rajendiran",
        organization="Vanakkam DSA",
        domain="DSA / Programming / Developer Education",
        context="Public programming / DSA educator associated with Vanakkam DSA."
    )
    assert len(queries) >= 8
    assert '"Hareesh Rajendiran"' in queries
    assert any("Vanakkam DSA" in q for q in queries)
    assert any("DSA" in q or "programming" in q for q in queries)
    assert any("GitHub" in q for q in queries)
    assert any("LinkedIn" in q for q in queries)

def test_hareesh_rajendiran_checkpoint3_case2():
    payload = {
        "subject_name": "Hareesh Rajendiran",
        "alias": "",
        "organization": "Vanakkam DSA",
        "domain": "DSA / Programming / Developer Education",
        "additional_context": "Public programming / DSA educator and contributor associated with Vanakkam DSA.",
        "image_reference": "/hareesh_reference.png",
        "consent_confirmed": True
    }
    res = client.post("/api/discovery/profiles", json=payload)
    assert res.status_code == 200
    data = res.json()

    assert data["subject_name"] == "Hareesh Rajendiran"
    assert data["organization"] == "Vanakkam DSA"
    assert len(data["profiles"]) >= 3
    assert len(data["public_records"]) >= 2
    assert "discovery_summary" in data
    assert "TRACEID discovered" in data["discovery_summary"]
    assert "Public profile discovered" in data["disclaimer"] or "Profile discovered" in data["disclaimer"]

    # Check that GitHub profile is discovered
    gh_prof = next((p for p in data["profiles"] if p["platform"] == "GitHub"), None)
    assert gh_prof is not None
    assert gh_prof["status"] == "DISCOVERED"
    assert len(gh_prof["matched_signals"]) >= 2

    # Check that Community Hub profile is discovered
    comm_prof = next((p for p in data["profiles"] if "Vanakkam DSA" in p["platform"]), None)
    assert comm_prof is not None
    assert comm_prof["status"] == "DISCOVERED"
    assert comm_prof["reliability"] == "HIGH"

    # Check status endpoint
    disc_id = data["id"]
    status_res = client.get(f"/api/discovery/{disc_id}/status")
    assert status_res.status_code == 200
    st = status_res.json()
    assert st["status"] == "COMPLETED"
    assert st["progress_percent"] == 100
    assert len(st["completed_stages"]) == 12
    assert st["queries_generated"] >= 5
    assert st["profiles_discovered"] >= 3

def test_unseeded_person_discovery():
    payload = {
        "subject_name": "Marcus Vance",
        "alias": "mvance_ai",
        "organization": "OpenKernel Systems",
        "domain": "Systems Programming",
        "additional_context": "Kernel contributor",
        "consent_confirmed": True
    }
    res = client.post("/api/discovery/profiles", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["subject_name"] == "Marcus Vance"
    assert not any("Hareesh" in p["display_name"] for p in data["profiles"])
    assert not any("Vanakkam" in p["platform"] for p in data["profiles"])
