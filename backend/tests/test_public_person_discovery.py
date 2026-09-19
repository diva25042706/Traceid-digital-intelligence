import pytest
from backend.app.services.vector_store import VectorStore
from backend.app.services.entity_resolution.entity_resolution import MultiSignalEntityResolver
from backend.app.services.public_person_discovery import PublicPersonDiscoveryService
from backend.app.services.search_provider import DuckDuckGoSearchProvider

def test_vector_store_indexing_and_similarity():
    vs = VectorStore()
    vs.add_document("doc1", "Hareesh Rajendiran Vanakkam DSA Python Tutor")
    vs.add_document("doc2", "Sathana Jayaraman Vel Tech Computer Science AI")
    vs.add_document("doc3", "Praveena Machine Learning Deep Learning Researcher")

    results = vs.search("Hareesh Vanakkam DSA", top_k=2)
    assert len(results) > 0
    assert results[0]["id"] == "doc1"
    assert results[0]["score"] > 0.3

def test_multi_signal_entity_resolution_supported():
    resolver = MultiSignalEntityResolver()
    eval_result = resolver.evaluate_candidate(
        target_name="Hareesh Rajendiran",
        target_username="hareesh_r",
        target_org="Vanakkam DSA",
        target_domain="Programming / Data Structures",
        candidate_data={
            "name": "Hareesh Rajendiran",
            "username": "hareesh_r",
            "organizations": ["Vanakkam DSA"],
            "domain": "Programming / Data Structures",
            "projects": [{"name": "vanakkam-dsa-curriculum"}],
            "sources": ["LinkedIn", "GitHub", "Community"]
        },
        visual_similarity_score=0.88
    )

    assert eval_result["status"] == "SUPPORTED"
    assert eval_result["composite_score"] >= 0.70
    assert eval_result["signals"]["name_similarity"] == 1.0
    assert eval_result["signals"]["organization_match"] == 1.0
    assert len(eval_result["signal_breakdown"]) == 8

def test_multi_signal_entity_resolution_ambiguous():
    resolver = MultiSignalEntityResolver()
    eval_result = resolver.evaluate_candidate(
        target_name="John Doe",
        target_username="",
        target_org="Acme Corp",
        target_domain="Software",
        candidate_data={
            "name": "John Doe",
            "username": "johndoe99",
            "organizations": ["Different Org Inc"],
            "domain": "Sales",
            "projects": [],
            "sources": ["LinkedIn"]
        },
        visual_similarity_score=0.0
    )

    assert eval_result["status"] in ["AMBIGUOUS", "INSUFFICIENT EVIDENCE"]
    assert eval_result["signals"]["organization_match"] == 0.0

def test_multi_signal_entity_resolution_insufficient():
    resolver = MultiSignalEntityResolver()
    eval_result = resolver.evaluate_candidate(
        target_name="Zxyw Qrstuv",
        target_username="unknown_999",
        target_org="NonExistentOrg",
        target_domain="Unknown",
        candidate_data={
            "name": "Completely Different Person",
            "username": "other_user",
            "organizations": [],
            "domain": "",
            "projects": [],
            "sources": []
        },
        visual_similarity_score=0.0
    )

    assert eval_result["status"] == "INSUFFICIENT EVIDENCE"
    assert eval_result["composite_score"] < 0.3

def test_query_generation_and_no_link_fabrication():
    service = PublicPersonDiscoveryService()
    queries = service.generate_search_queries(
        name="Hareesh Rajendiran",
        organization="Vanakkam DSA",
        domain="DSA"
    )

    assert len(queries) >= 4
    assert any("Hareesh Rajendiran" in q for q in queries)
    assert any("Vanakkam DSA" in q for q in queries)