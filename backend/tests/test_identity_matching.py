import pytest
from backend.app.services.identity.identity_matcher import identity_matcher

def test_string_similarity():
    sim = identity_matcher.calculate_string_similarity("Alex Morgan", "Alex Morgan")
    assert sim == 1.0
    sim_diff = identity_matcher.calculate_string_similarity("Alex Morgan", "Marcus Vance")
    assert sim_diff == 0.0

def test_evaluate_candidate_signals():
    candidate_data = {
        "name": "Alex Morgan",
        "username": "alexm_dev",
        "organizations": ["NovaTech Labs", "Project Atlas"],
        "status": "SUPPORTED"
    }
    signals = identity_matcher.evaluate_candidate_signals(
        seed_name="Alex Morgan",
        seed_alias="alexm_dev",
        seed_org="NovaTech Labs",
        candidate_data=candidate_data
    )
    assert signals["name_match"] is True
    assert signals["username_match"] is True
    assert signals["organization_match"] is True
    assert signals["project_match"] is True

def test_identity_dna_generation():
    dna = identity_matcher.compute_identity_dna("SUPPORTED", 24)
    assert len(dna) == 8
    assert any("visual" in s["name"].lower() for s in dna)
    assert any("semantic" in s["name"].lower() for s in dna)
    assert any("temporal" in s["name"].lower() for s in dna)
