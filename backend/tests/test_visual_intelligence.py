import pytest
import numpy as np
import cv2
from fastapi.testclient import TestClient
from backend.app.main import app
from backend.app.providers.visual_intelligence_provider import visual_intelligence_provider
from backend.app.services.discovery.visual_profile_discovery_service import visual_profile_discovery_service

client = TestClient(app)

def create_synthetic_face_image() -> np.ndarray:
    """Creates a synthetic test image with a circle representing a face."""
    img = np.zeros((200, 200, 3), dtype=np.uint8) + 220
    # Draw simple facial features
    cv2.circle(img, (100, 100), 60, (180, 180, 180), -1) # face
    cv2.circle(img, (80, 85), 8, (50, 50, 50), -1)        # left eye
    cv2.circle(img, (120, 85), 8, (50, 50, 50), -1)       # right eye
    cv2.ellipse(img, (100, 125), (25, 12), 0, 0, 180, (50, 50, 50), 3) # smile
    return img

def test_visual_provider_dhash_and_phash():
    img1 = create_synthetic_face_image()
    dhash = visual_intelligence_provider.compute_dhash(img1)
    phash = visual_intelligence_provider.compute_phash(img1)
    
    assert len(dhash) == 64
    assert len(phash) == 64
    assert all(c in "01" for c in dhash)
    assert all(c in "01" for c in phash)

def test_visual_similarity_identical_images():
    img = create_synthetic_face_image()
    sim = visual_intelligence_provider.calculate_visual_similarity(img, img)
    
    assert sim["visual_similarity_score"] >= 0.95
    assert sim["visual_match_status"] == "EXACT_MATCH"

def test_visual_similarity_different_images():
    img1 = create_synthetic_face_image()
    img2 = np.zeros((200, 200, 3), dtype=np.uint8) # pure black
    
    sim = visual_intelligence_provider.calculate_visual_similarity(img1, img2)
    assert sim["visual_similarity_score"] < 0.60
    assert sim["visual_match_status"] in ["MODERATE_SIMILARITY", "NO_VISUAL_MATCH"]

def test_api_visual_analyze():
    # Test visual analyze on preset public image
    resp = client.post("/api/discovery/visual-analyze", json={"image_data": "/sathana_reference.png"})
    assert resp.status_code == 200
    data = resp.json()
    assert data["success"] is True
    assert "fingerprint_id" in data
    assert "candidate_matches" in data

def test_api_visual_similarity():
    resp = client.post("/api/discovery/visual-similarity", json={
        "image_a": "/hareesh_reference.png",
        "image_b": "/hareesh_reference.png"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert data["visual_similarity_score"] >= 0.85
    assert data["visual_match_status"] == "EXACT_MATCH"

def test_api_from_image_discovery():
    resp = client.post("/api/discovery/from-image", json={
        "image_data": "/sathana_reference.png",
        "subject_name": "Sathana Jayaraman",
        "alias": "Sathana0511",
        "organization": "Vel Tech High Tech",
        "domain": "Computer Science"
    })
    assert resp.status_code == 200
    data = resp.json()
    assert "discovered_profiles" in data
    assert len(data["discovered_profiles"]) > 0
    # Verify visual similarity attached to profiles
    first_prof = data["discovered_profiles"][0]
    assert "visual_similarity_score" in first_prof
    assert "visual_match_status" in first_prof
    assert "verification_status" in first_prof
