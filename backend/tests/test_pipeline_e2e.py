import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_full_e2e_investigation_workflow():
    # 1. Create investigation
    create_payload = {
        "subject_name": "Alex Morgan",
        "alias": "alexm_dev",
        "organization": "NovaTech Labs",
        "known_platform": "GitHub / OpenSource Hub",
        "additional_context": "Lead architect of Project Atlas and speaker at CyberSummit 2025.",
        "consent_confirmed": True
    }
    create_res = client.post("/api/investigations", json=create_payload)
    assert create_res.status_code == 200
    inv_id = create_res.json()["id"]

    # 2. Trigger Full 9-Stage Analysis Pipeline
    analyze_res = client.post(f"/api/investigations/{inv_id}/analyze")
    assert analyze_res.status_code == 200
    analyzed_data = analyze_res.json()
    assert analyzed_data["status"] == "ANALYSIS COMPLETE"
    assert len(analyzed_data["pipeline"]) == 9
    assert len(analyzed_data["candidates"]) == 3

    # 3. Retrieve Candidates
    cand_res = client.get(f"/api/investigations/{inv_id}/candidates")
    assert cand_res.status_code == 200
    candidates = cand_res.json()
    assert len(candidates) == 3
    cand_a = next(c for c in candidates if c["candidate_code"] == "Candidate A")
    cand_b = next(c for c in candidates if c["candidate_code"] == "Candidate B")
    cand_c = next(c for c in candidates if c["candidate_code"] == "Candidate C")
    assert cand_a["status"] == "SUPPORTED"
    assert cand_b["status"] == "AMBIGUOUS"
    assert cand_c["status"] == "INSUFFICIENT EVIDENCE"

    # 4. Retrieve Evidence
    ev_res = client.get(f"/api/investigations/{inv_id}/evidence")
    assert ev_res.status_code == 200
    evidence = ev_res.json()
    assert len(evidence) >= 3
    assert any(e["reliability"] == "HIGH" for e in evidence)

    # 5. Retrieve Timeline
    tl_res = client.get(f"/api/investigations/{inv_id}/timeline")
    assert tl_res.status_code == 200
    timeline = tl_res.json()
    assert len(timeline) >= 5
    assert any(t.get("is_conflict") is True for t in timeline)

    # 6. Retrieve Knowledge Graph
    graph_res = client.get(f"/api/investigations/{inv_id}/graph")
    assert graph_res.status_code == 200
    graph = graph_res.json()
    assert len(graph["nodes"]) > 5
    assert len(graph["edges"]) > 5

    # 7. Retrieve Final Intelligence Report
    report_res = client.get(f"/api/investigations/{inv_id}/report")
    assert report_res.status_code == 200
    report = report_res.json()
    assert report["investigation_id"] == inv_id
    assert report["executive_summary"] != ""
    assert len(report["candidates"]) == 3
