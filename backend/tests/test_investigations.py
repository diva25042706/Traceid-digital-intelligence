import pytest
from fastapi.testclient import TestClient
from backend.app.main import app

client = TestClient(app)

def test_health_check():
    response = client.get("/api/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] == "OPERATIONAL"
    assert "TRACEID AI" in data["service"]

def test_create_and_get_investigation():
    payload = {
        "subject_name": "Alex Morgan",
        "alias": "alexm_dev",
        "organization": "NovaTech Labs",
        "known_platform": "GitHub",
        "additional_context": "Test investigation context",
        "consent_confirmed": True
    }
    create_res = client.post("/api/investigations", json=payload)
    assert create_res.status_code == 200
    created = create_res.json()
    assert created["subject_name"] == "Alex Morgan"
    assert "id" in created

    # Fetch investigation
    inv_id = created["id"]
    get_res = client.get(f"/api/investigations/{inv_id}")
    assert get_res.status_code == 200
    inv = get_res.json()
    assert inv["id"] == inv_id
    assert inv["subject_name"] == "Alex Morgan"

def test_demo_figure_satya_nadella():
    payload = {
        "subject_name": "Satya Nadella",
        "alias": "satyanadella",
        "organization": "Microsoft",
        "known_platform": "LinkedIn / SEC",
        "additional_context": "Executive Chairman and CEO of Microsoft",
        "consent_confirmed": True
    }
    create_res = client.post("/api/investigations", json=payload)
    assert create_res.status_code == 200
    inv_id = create_res.json()["id"]

    analyze_res = client.post(f"/api/investigations/{inv_id}/analyze")
    assert analyze_res.status_code == 200
    data = analyze_res.json()
    assert data["subject_name"] == "Satya Nadella"
    assert data["status"] == "ANALYSIS COMPLETE"
    assert len(data["candidates"]) >= 2
    assert data["candidates"][0]["status"] == "SUPPORTED"
    assert data["candidates"][1]["status"] == "AMBIGUOUS"
    assert data["twin_guard"]["detected"] is True

    # Test status endpoint
    status_res = client.get(f"/api/investigations/{inv_id}/status")
    assert status_res.status_code == 200
    status_data = status_res.json()
    assert status_data["investigation_id"] == inv_id
    assert status_data["status"] == "COMPLETED"
    assert status_data["progress_percent"] == 100

def test_custom_person_resolution():
    payload = {
        "subject_name": "David K. Chen",
        "alias": "dchen_dev",
        "organization": "Stanford University",
        "known_platform": "GitHub",
        "additional_context": "Research assistant in robotic vision",
        "consent_confirmed": True
    }
    create_res = client.post("/api/investigations", json=payload)
    assert create_res.status_code == 200
    inv_id = create_res.json()["id"]

    analyze_res = client.post(f"/api/investigations/{inv_id}/analyze")
    assert analyze_res.status_code == 200
    data = analyze_res.json()
    assert data["subject_name"] == "David K. Chen"
    assert len(data["pipeline"]) == 9
    assert len(data["candidates"]) >= 1
    assert data["ai_analyst"] is not None

