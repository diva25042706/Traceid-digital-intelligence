import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.correlation.multi_platform_correlation_engine import multi_platform_correlation_engine

client = TestClient(app)

def test_multi_platform_correlation_engine_execution():
    result = multi_platform_correlation_engine.run_correlation(
        investigation_id="TEST-CORR-01",
        subject_name="Hareesh Rajendiran",
        known_linkedin="https://www.linkedin.com/in/hareesh-r/",
        known_website="https://hareesh.web.app/",
        organization="Vanakkam DSA",
        domain="DSA / Programming / Developer Education",
        additional_sources=[{"platform": "GitHub", "url": "https://github.com/hareesh-r"}],
        additional_context="Public programming / DSA educator and contributor associated with Vanakkam DSA."
    )

    assert result["subject_name"] == "Hareesh Rajendiran"
    assert result["final_correlation_status"] == "SUPPORTED"
    assert result["overview"]["platforms_analyzed_count"] >= 3
    assert result["overview"]["signals_compared_count"] >= 20
    assert result["overview"]["relationships_found_count"] >= 5

    # Check Graph Topology
    graph = result["graph"]
    assert len(graph["nodes"]) >= 4
    assert any(n["type"] == "SUBJECT" and n["label"] == "Hareesh Rajendiran" for n in graph["nodes"])
    assert any(n["type"] == "PLATFORM" and "LinkedIn" in n["label"] for n in graph["nodes"])
    assert any(n["type"] == "PLATFORM" and "Website" in n["label"] for n in graph["nodes"])
    assert any(n["type"] == "PLATFORM" and "GitHub" in n["label"] for n in graph["nodes"])
    assert len(graph["edges"]) >= 5
    assert all(len(e["reasons"]) > 0 for e in graph["edges"])

    # Check Correlation Matrix
    matrix = result["matrix"]
    assert len(matrix["headers"]) >= 3
    assert len(matrix["rows"]) >= 3
    for row in matrix["rows"]:
        assert len(row["cells"]) == len(matrix["headers"])

def test_hareesh_rajendiran_checkpoint3_case3_api():
    payload = {
        "subject_name": "Hareesh Rajendiran",
        "known_linkedin": "https://www.linkedin.com/in/hareesh-r/",
        "known_website": "https://hareesh.web.app/",
        "organization": "Vanakkam DSA",
        "domain": "DSA / Programming / Developer Education",
        "additional_sources": [{"platform": "GitHub", "url": "https://github.com/hareesh-r"}],
        "additional_context": "Public programming / DSA educator and contributor associated with Vanakkam DSA.",
        "image_reference": "/hareesh_correlation_reference.png",
        "consent_confirmed": True
    }
    res = client.post("/api/correlation/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()

    assert data["subject_name"] == "Hareesh Rajendiran"
    assert data["final_correlation_status"] == "SUPPORTED"
    assert len(data["platforms"]) >= 3
    assert "explainability" in data
    assert "Finding profiles is not enough" in data["explainability"]["jury_statement"]

    # Check status endpoint
    corr_id = data["id"]
    status_res = client.get(f"/api/correlation/{corr_id}/status")
    assert status_res.status_code == 200
    st = status_res.json()
    assert st["status"] == "COMPLETED"
    assert st["progress_percent"] == 100
    assert len(st["completed_stages"]) == 12
    assert st["signals_compared"] >= 20

def test_unseeded_person_case3_correlation():
    payload = {
        "subject_name": "Elena Rostova",
        "known_linkedin": "https://www.linkedin.com/in/elena-rostova/",
        "known_website": "https://elena-ai.dev/",
        "organization": "Quantum Labs",
        "domain": "Quantum ML",
        "additional_sources": [],
        "consent_confirmed": True
    }
    res = client.post("/api/correlation/analyze", json=payload)
    assert res.status_code == 200
    data = res.json()
    assert data["subject_name"] == "Elena Rostova"
    assert not any("Hareesh" in p["entity_title"] for p in data["platforms"])
    assert not any("Vanakkam" in p["name"] for p in data["platforms"])
