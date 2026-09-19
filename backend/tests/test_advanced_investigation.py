import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.services.evidence.adversarial_engine import adversarial_engine
from backend.app.services.agents.investigation_orchestrator import investigation_orchestrator
from backend.app.services.identity.identity_matcher import identity_matcher
from backend.app.services.pipeline_orchestrator import pipeline_orchestrator

client = TestClient(app)

def test_evidence_adversarial_engine_supporting_and_contradicting():
    candidate_supported = {
        "id": "cand-test-1",
        "name": "Alex Morgan",
        "username": "alexm_dev",
        "organizations": ["NovaTech Labs"],
        "location": "Seattle, WA",
        "primary_role": "Staff AI Architect"
    }
    res_sup = adversarial_engine.analyze_candidate_adversarially(
        subject_name="Alex Morgan",
        subject_alias="alexm_dev",
        subject_org="NovaTech Labs",
        subject_domain="AI Systems",
        candidate_data=candidate_supported
    )
    assert res_sup["final_evidence_status"] == "SUPPORTED"
    assert len(res_sup["supporting_evidence"]) >= 3
    assert len(res_sup["contradicting_evidence"]) == 0
    assert res_sup["evidence_strength"] > 80.0

    # Conflicting candidate (different legal name, competing org, divergent handle)
    candidate_conflicting = {
        "id": "cand-test-2",
        "name": "Marcus Vance",
        "username": "mvance_sys",
        "organizations": ["Apex Capital"],
        "location": "Berlin, Germany",
        "primary_role": "Security Researcher"
    }
    res_con = adversarial_engine.analyze_candidate_adversarially(
        subject_name="Alex Morgan",
        subject_alias="alexm_dev",
        subject_org="NovaTech Labs",
        subject_domain="AI Systems",
        candidate_data=candidate_conflicting
    )
    assert res_con["final_evidence_status"] == "CONFLICTING"
    assert len(res_con["contradicting_evidence"]) >= 2
    assert res_con["evidence_strength"] < 40.0
    assert res_con["human_review_required"] is True

def test_controlled_multi_agent_orchestrator_audit_trail():
    agents = investigation_orchestrator.get_agent_statuses()
    assert len(agents) == 6
    agent_names = [a["name"] for a in agents]
    assert "Discovery Agent" in agent_names
    assert "Entity Resolution Agent" in agent_names
    assert "Evidence Agent" in agent_names
    assert "Conflict Agent" in agent_names
    assert "Temporal Agent" in agent_names
    assert "Report Agent" in agent_names

    # Build audit trail
    audit_steps = investigation_orchestrator.build_audit_trail(
        investigation_id="TEST-AUDIT-01",
        subject_name="Sathana Jayaraman",
        subject_alias="Sathana0511",
        subject_org="Vel Tech",
        candidates=[{"name": "Sathana Jayaraman"}],
        timeline=[{"id": "t1"}],
        contradictions_found=0
    )
    assert len(audit_steps) >= 8
    assert audit_steps[0]["stage"] == "Investigation Created"
    assert any(s["agent"] == "Discovery Agent" for s in audit_steps)
    assert any(s["agent"] == "Conflict Agent" for s in audit_steps)
    assert any("SHA256:" in s.get("provenance", "") for s in audit_steps)

def test_identity_dna_8_signals():
    dna = identity_matcher.compute_identity_dna(
        candidate_status="SUPPORTED",
        supporting_count=5,
        candidate_name="Alex Morgan"
    )
    assert len(dna) == 8
    signal_names = [s["name"].lower() for s in dna]
    assert any("visual" in n for n in signal_names)
    assert any("name" in n for n in signal_names)
    assert any("username" in n for n in signal_names)
    assert any("organization" in n for n in signal_names)
    assert any("project" in n for n in signal_names)
    assert any("semantic" in n for n in signal_names)
    assert any("network" in n for n in signal_names)
    assert any("temporal" in n for n in signal_names)

def test_adversarial_lab_8_scenarios():
    res = client.get("/api/adversarial/tests")
    assert res.status_code == 200
    cases = res.json()
    assert len(cases) == 8
    categories = [c["category"] for c in cases]
    assert "Normal Identity" in categories
    assert "Common Name" in categories
    assert "Similar Username" in categories
    assert "Look-Alike" in categories
    assert "Conflicting Organization" in categories
    assert "Conflicting Timeline" in categories
    assert "Missing Information" in categories
    assert "Insufficient Evidence" in categories

def test_human_in_the_loop_review_api():
    # Submit review
    review_payload = {
        "investigation_id": "TRC-001",
        "analyst_name": "Senior Security Analyst",
        "analyst_decision": "SUPPORTED",
        "accepted_evidence_ids": ["ev-1", "ev-2"],
        "rejected_evidence_ids": [],
        "analyst_notes": "All multi-source signals verified with cryptographic provenance."
    }
    res = client.post("/api/investigations/TRC-001/review", json=review_payload)
    assert res.status_code == 200
    data = res.json()
    assert "human_review" in data
    assert data["human_review"]["signed_off"] is True
    assert data["human_review"]["analyst_name"] == "Senior Security Analyst"
    assert data["human_review"]["analyst_decision"] == "SUPPORTED"

def test_investigation_audit_trail_endpoint():
    res = client.get("/api/investigations/TRC-001/audit-trail")
    assert res.status_code == 200
    trail = res.json()
    assert isinstance(trail, list)
    assert len(trail) >= 8
