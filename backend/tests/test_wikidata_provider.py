import pytest
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.providers.wikidata_provider import wikidata_provider

client = TestClient(app)

def test_wikidata_provider_search_known_entity():
    results = wikidata_provider.search_person("Tim Berners-Lee")
    assert len(results) > 0
    assert any("Q80" in r["entity_id"] for r in results)
    top = results[0]
    assert "Tim Berners-Lee" in top["canonical_name"]
    assert top["sources"][0]["source"] == "Wikidata"

def test_wikidata_provider_get_details():
    details = wikidata_provider.get_person_details("Q30942") # Guido van Rossum
    assert isinstance(details, dict)
    assert "websites" in details
    assert "profiles" in details
    assert any("github" in str(p).lower() for p in details.get("profiles", []))

def test_wikidata_endpoint_get():
    res = client.get("/api/discovery/wikidata?name=Satya Nadella")
    assert res.status_code == 200
    data = res.json()
    assert data["query"] == "Satya Nadella"
    assert len(data["candidates"]) > 0
    assert data["candidates"][0]["entity_id"] == "Q7426870"
    assert len(data["sources"]) > 0

def test_wikidata_endpoint_non_existent():
    res = client.get("/api/discovery/wikidata?name=NonExistentPersonX999Z")
    assert res.status_code == 200
    data = res.json()
    assert len(data["candidates"]) == 0