import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.twin.twin_identification_engine import twin_identification_engine

client = TestClient(app)

def test_twin_identification_engine_false_match():
    person_a = {
        "name": "Hareesh Rajendiran",
        "organization": "Vanakkam DSA",
        "handle": "hareesh_dsa",
        "domain": "DSA / Programming / Developer Education",
        "context": "Public programming educator associated with Vanakkam DSA."
    }
    person_b = {
        "name": "Alex Vance",
        "organization": "OpenKernel Systems",
        "handle": "avance_os",
        "domain": "Linux Kernel / Systems Engineering",
        "context": "Systems engineer and kernel maintainer based in Berlin."
    }

    result = twin_identification_engine.run_twin_analysis(
        investigation_id="TEST-TWIN-01",
        person_a=person_a,
        person_b=person_b
    )

    assert result["final_status"] == "DISTINCT ENTITIES"
    assert result["false_match_analysis"]["potential_false_match"] is True
    assert len(result["false_match_analysis"]["contradictions"]) >= 2
    assert len(result["comparison_matrix"]) == 8
    assert any(r["signal"].lower() == "visual similarity" for r in result["comparison_matrix"])
    assert any(r["signal"].lower() == "name" and r["status"] == "CONFLICT" for r in result["comparison_matrix"])
    assert any(r["signal"].lower() == "organization" and r["status"] == "CONFLICT" for r in result["comparison_matrix"])
    assert "Visual similarity is supporting evidence only" in result["disclaimer"]

def test_twin_identification_engine_same_entity():
    person_a = {
        "name": "Hareesh Rajendiran",
        "organization": "Vanakkam DSA",
        "handle": "hareesh-r",
        "domain": "DSA / Programming / Developer Education",
        "context": "Lead educator at Vanakkam DSA."
    }
    person_b = {
        "name": "Hareesh Rajendiran",
        "organization": "Vanakkam DSA",
        "handle": "hareesh-r",
        "domain": "DSA / Programming / Developer Education",
        "context": "Active DSA video lecture archives."
    }

    result = twin_identification_engine.run_twin_analysis(
        investigation_id="TEST-TWIN-02",
        person_a=person_a,
        person_b=person_b
    )

    assert result["final_status"] == "SAME ENTITY"
    assert result["false_match_analysis"]["potential_false_match"] is False
    assert len(result["false_match_analysis"]["contradictions"]) == 0

def test_twin_api_endpoints():
    payload = {
        "person_a": {
            "name": "Hareesh Rajendiran",
            "organization": "Vanakkam DSA",
            "handle": "hareesh_dsa",
            "domain": "DSA",
            "image_url": "/hareesh_reference.png"
        },
        "person_b": {
            "name": "Alex Vance",
            "organization": "OpenKernel Systems",
            "handle": "avance_os",
            "domain": "Systems",
            "image_url": "/hareesh_correlation_reference.png"
        },
        "consent_confirmed": True
    }

    res = client.post("/api/twin/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()

    assert data["final_status"] == "DISTINCT ENTITIES"
    assert "evidence_fusion" in data
    assert "conclusion_summary" in data["evidence_fusion"]

    # Check status endpoint
    twin_id = data["id"]
    status_res = client.get(f"/api/twin/{twin_id}/status")
    assert status_res.status_code == 200
    st = status_res.json()
    assert st["status"] == "COMPLETED"
    assert st["progress_percent"] == 100
    assert len(st["completed_stages"]) == 16
