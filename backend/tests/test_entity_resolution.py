import pytest
from backend.app.services.entity_resolution.resolver import entity_resolution_engine

def test_name_and_handle_normalization():
    assert entity_resolution_engine.normalize_name("  Alex Morgan  ") == "alex morgan"
    assert entity_resolution_engine.normalize_handle("@alexm_dev") == "alexm_dev"
    assert entity_resolution_engine.normalize_handle("alex-morgan.ai") == "alex_morgan_ai"

def test_entity_resolution_decision():
    matched = entity_resolution_engine.resolve_entity(
        target_name="Alex Morgan",
        target_handle="alexm_dev",
        target_org="NovaTech Labs",
        candidate={"name": "Alex Morgan", "username": "alexm_dev", "organizations": ["NovaTech Labs"]}
    )
    assert matched["decision"] == "MATCHED"

    ambiguous = entity_resolution_engine.resolve_entity(
        target_name="Alex Morgan",
        target_handle="alexm_dev",
        target_org="NovaTech Labs",
        candidate={"name": "Alex Morgan", "username": "alex_morgan", "organizations": ["Hyperion Cloud"]}
    )
    assert ambiguous["decision"] == "AMBIGUOUS"
