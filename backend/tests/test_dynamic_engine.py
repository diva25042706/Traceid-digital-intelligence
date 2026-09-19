import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.discovery.query_expansion import query_expansion_engine
from backend.app.connectors.source_orchestrator import source_orchestrator
from backend.app.connectors.official_source_connector import official_source_connector

client = TestClient(app)

def test_query_expansion_hypotheses():
    queries = query_expansion_engine.generate_search_hypotheses(
        name="Hareesh Rajendiran",
        organization="Vanakkam DSA",
        domain="DSA / Programming",
        role="Lead Educator"
    )
    assert len(queries) >= 5
    assert any("Hareesh Rajendiran" in q for q in queries)
    assert any("Vanakkam DSA" in q for q in queries)
    assert any("GitHub" in q for q in queries)

def test_unseeded_person_hareesh_rajendiran():
    payload = {
        "subject_name": "Hareesh Rajendiran",
        "alias": "hareesh_dsa",
        "organization": "Vanakkam DSA",
        "known_platform": "GitHub / YouTube",
        "additional_context": "DSA programming instructor and open source educator",
        "consent_confirmed": True
    }
    create_res = client.post("/api/investigations", json=payload)
    assert create_res.status_code == 200
    inv_id = create_res.json()["id"]

    analyze_res = client.post(f"/api/investigations/{inv_id}/analyze")
    assert analyze_res.status_code == 200
    data = analyze_res.json()
    assert data["subject_name"] == "Hareesh Rajendiran"
    assert len(data["candidates"]) >= 1
    assert data["candidates"][0]["name"] == "Hareesh Rajendiran"
    assert len(data["dna_signals"]) >= 5
    assert len(data["nodes"]) >= 4
    assert len(data["edges"]) >= 3
    assert data["ai_analyst"] is not None

    # Check status endpoint metrics
    status_res = client.get(f"/api/investigations/{inv_id}/status")
    assert status_res.status_code == 200
    st = status_res.json()
    assert st["status"] == "COMPLETED"
    assert st["progress_percent"] == 100

def test_completely_new_person_not_in_seed():
    payload = {
        "subject_name": "Dr. Aris Thorne",
        "alias": "athorne_crypto",
        "organization": "Quantum Security Labs",
        "known_platform": "ArXiv",
        "additional_context": "Researcher in post-quantum lattice cryptography",
        "consent_confirmed": True
    }
    create_res = client.post("/api/investigations", json=payload)
    assert create_res.status_code == 200
    inv_id = create_res.json()["id"]

    analyze_res = client.post(f"/api/investigations/{inv_id}/analyze")
    assert analyze_res.status_code == 200
    data = analyze_res.json()
    assert data["subject_name"] == "Dr. Aris Thorne"
    assert data["status"] == "ANALYSIS COMPLETE"
    assert len(data["candidates"]) >= 1
    assert data["ai_analyst"]["identity_assessment"] != ""

def test_common_name_disambiguation():
    payload = {
        "subject_name": "John Smith",
        "alias": "jsmith",
        "organization": "Open Tech Foundation",
        "known_platform": "GitHub",
        "additional_context": "Software developer",
        "consent_confirmed": True
    }
    create_res = client.post("/api/investigations", json=payload)
    assert create_res.status_code == 200
    inv_id = create_res.json()["id"]

    analyze_res = client.post(f"/api/investigations/{inv_id}/analyze")
    assert analyze_res.status_code == 200
    data = analyze_res.json()
    assert len(data["candidates"]) >= 2
    assert data["twin_guard"]["detected"] is True
    assert "TwinGuard" in data["twin_guard"]["title"]

def test_sathana_jayaraman_controlled_demo():
    payload = {
        "subject_name": "Sathana Jayaraman",
        "alias": "Sathana0511",
        "organization": "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
        "known_platform": "LinkedIn / GitHub / Instagram / Student",
        "additional_context": "Public professional profile: Sathana Jayaraman\nGitHub username: Sathana0511\nInstagram username: itz_sathana\nCollege: Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
        "image_file": "/sathana_reference.png",
        "consent_confirmed": True
    }
    create_res = client.post("/api/investigations", json=payload)
    assert create_res.status_code == 200
    inv_id = create_res.json()["id"]

    analyze_res = client.post(f"/api/investigations/{inv_id}/analyze")
    assert analyze_res.status_code == 200
    data = analyze_res.json()
    assert data["subject_name"] == "Sathana Jayaraman"
    assert len(data["candidates"]) == 3
    cand_a = data["candidates"][0]
    assert cand_a["name"] == "Sathana Jayaraman"
    assert cand_a["status"] == "SUPPORTED"
    assert len(data["dna_signals"]) == 8
    assert any("visual" in s["name"].lower() for s in data["dna_signals"])
    assert any("name" in s["name"].lower() for s in data["dna_signals"])
    assert any("username" in s["name"].lower() for s in data["dna_signals"])
    assert any("organization" in s["name"].lower() for s in data["dna_signals"])
    assert len(data["nodes"]) >= 6
    assert len(data["edges"]) >= 5

def test_investigation_subject_isolation():
    """
    Ensure every investigation is 100% isolated by its unique ID.
    Investigating Sathana Jayaraman must NEVER mix up with Hareesh Rajendiran, Satya Nadella, or any other subject.
    """
    # 1. Ingest Sathana Jayaraman
    res_sathana = client.post("/api/investigations", json={
        "subject_name": "Sathana Jayaraman",
        "alias": "Sathana0511",
        "organization": "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
        "known_platform": "LinkedIn / GitHub / Instagram",
        "additional_context": "Engineering student & developer",
        "consent_confirmed": True
    })
    assert res_sathana.status_code == 200
    id_sathana = res_sathana.json()["id"]
    analyze_sathana = client.post(f"/api/investigations/{id_sathana}/analyze")
    assert analyze_sathana.status_code == 200
    data_sathana = analyze_sathana.json()

    # 2. Ingest Hareesh Rajendiran
    res_hareesh = client.post("/api/investigations", json={
        "subject_name": "Hareesh Rajendiran",
        "alias": "hareesh_dsa",
        "organization": "Vanakkam DSA",
        "known_platform": "YouTube / GitHub",
        "additional_context": "DSA educator & software engineer",
        "consent_confirmed": True
    })
    assert res_hareesh.status_code == 200
    id_hareesh = res_hareesh.json()["id"]
    analyze_hareesh = client.post(f"/api/investigations/{id_hareesh}/analyze")
    assert analyze_hareesh.status_code == 200
    data_hareesh = analyze_hareesh.json()

    # 3. Ingest Satya Nadella
    res_satya = client.post("/api/investigations", json={
        "subject_name": "Satya Nadella",
        "alias": "satyanadella",
        "organization": "Microsoft",
        "known_platform": "LinkedIn / Official Domain",
        "additional_context": "Chairman and CEO of Microsoft",
        "consent_confirmed": True
    })
    assert res_satya.status_code == 200
    id_satya = res_satya.json()["id"]
    analyze_satya = client.post(f"/api/investigations/{id_satya}/analyze")
    assert analyze_satya.status_code == 200
    data_satya = analyze_satya.json()

    # 4. Verify Sathana Isolation
    sathana_record = client.get(f"/api/investigations/{id_sathana}").json()
    assert sathana_record["subject_name"] == "Sathana Jayaraman"
    assert sathana_record["candidates"][0]["name"] == "Sathana Jayaraman"
    assert not any("Hareesh" in c["name"] for c in sathana_record["candidates"])
    assert not any("Satya" in c["name"] for c in sathana_record["candidates"])
    assert any("Sathana" in n["label"] for n in sathana_record["nodes"])
    assert not any("Hareesh" in n["label"] for n in sathana_record["nodes"])

    # 5. Verify Hareesh Isolation
    hareesh_record = client.get(f"/api/investigations/{id_hareesh}").json()
    assert hareesh_record["subject_name"] == "Hareesh Rajendiran"
    assert hareesh_record["candidates"][0]["name"] == "Hareesh Rajendiran"
    assert not any("Sathana" in c["name"] for c in hareesh_record["candidates"])
    assert not any("Satya" in c["name"] for c in hareesh_record["candidates"])
    assert any("Hareesh" in n["label"] for n in hareesh_record["nodes"])
    assert not any("Sathana" in n["label"] for n in hareesh_record["nodes"])

    # 6. Verify Satya Isolation
    satya_record = client.get(f"/api/investigations/{id_satya}").json()
    assert satya_record["subject_name"] == "Satya Nadella"
    assert satya_record["candidates"][0]["name"] == "Satya Nadella"
    assert not any("Sathana" in c["name"] for c in satya_record["candidates"])
    assert not any("Hareesh" in c["name"] for c in satya_record["candidates"])
    assert any("Satya" in n["label"] for n in satya_record["nodes"])
    assert not any("Sathana" in n["label"] for n in satya_record["nodes"])

    # 7. Non-existent IDs must return 404, never fallback to another subject
    assert client.get("/api/investigations/TRC-NONEXISTENT").status_code == 404
    assert client.get("/api/investigations/TRC-NONEXISTENT/graph").status_code == 404
    assert client.get("/api/investigations/TRC-NONEXISTENT/report").status_code == 404


