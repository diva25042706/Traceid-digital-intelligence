from fastapi import APIRouter
from typing import List, Dict, Any

router = APIRouter(prefix="/adversarial", tags=["Adversarial Lab"])

ADVERSARIAL_CASES = [
    {
        "id": "adv-1",
        "title": "Normal Identity Match (Baseline)",
        "category": "Normal Identity",
        "input_context": {
            "name": "Alex Morgan",
            "alias": "alexm_dev",
            "org": "NovaTech Labs",
            "photo_type": "Consented Headshot"
        },
        "candidates_found": 3,
        "detected_risk": "Low risk. Disambiguation needed for homonym in Europe.",
        "final_status": "SUPPORTED",
        "system_reasoning": "Multiple independent, corroborating cryptographic and institutional signals establish high confidence while TwinGuard prevents merging the Berlin developer profile.",
        "twin_guard_triggered": True,
        "counterfactual_summary": "5 supporting dimensions vs 1 external homonym successfully separated.",
        "evidence_strength": 92.4,
        "major_concerns": ["Homonym collision in EU namespace (successfully isolated)"],
        "supporting_count": 8,
        "contradicting_count": 0,
        "self_challenge_result": "Initial match upheld: Independent PGP signatures & institutional press releases confirm primary candidate."
    },
    {
        "id": "adv-2",
        "title": "Common Name Homonym Collision",
        "category": "Common Name",
        "input_context": {
            "name": "David Chen",
            "alias": "dchen",
            "org": "Tech Industry (Generic)",
            "photo_type": "Stock Portrait"
        },
        "candidates_found": 14,
        "detected_risk": "Extreme homonym collision. 14 individuals share identical name and tech titles.",
        "final_status": "AMBIGUOUS",
        "system_reasoning": "Without unique contextual anchors or cryptographic keys, the system strictly refuses to declare a single identity match.",
        "twin_guard_triggered": True,
        "counterfactual_summary": "Refusal to force match: 'Name alone is insufficient to distinguish candidates.'",
        "evidence_strength": 48.0,
        "major_concerns": ["14 conflicting candidate clusters with identical canonical name"],
        "supporting_count": 2,
        "contradicting_count": 6,
        "self_challenge_result": "System successfully challenges initial positive match and enforces strict AMBIGUOUS status."
    },
    {
        "id": "adv-3",
        "title": "Similar Username / Typosquatting Ambiguity",
        "category": "Similar Username",
        "input_context": {
            "name": "Elena Rostova",
            "alias": "elena_rostova",
            "org": "CyberSec Group",
            "photo_type": "Consented Portrait"
        },
        "candidates_found": 4,
        "detected_risk": "Near-identical handle variations (@elena_rostova, @elena-rostova, @elenarostova_dev) across independent networks.",
        "final_status": "AMBIGUOUS",
        "system_reasoning": "Handle namespace collision detected across separate domains. System flags username ambiguity and demands secondary credential corroboration.",
        "twin_guard_triggered": True,
        "counterfactual_summary": "4 similar username variations isolated across distinct registration epochs.",
        "evidence_strength": 52.0,
        "major_concerns": ["Handle typosquatting risk", "Differing registration timestamps"],
        "supporting_count": 3,
        "contradicting_count": 3,
        "self_challenge_result": "System detected username namespace overlap but prevented false unification."
    },
    {
        "id": "adv-4",
        "title": "Adversarial Look-Alike / Twin Impersonation",
        "category": "Look-Alike",
        "input_context": {
            "name": "Marcus Vance",
            "alias": "mvance_real",
            "org": "Apex Capital",
            "photo_type": "Facial Doppelganger / Twin Reference"
        },
        "candidates_found": 2,
        "detected_risk": "Facial similarity matches at 91%, but contextual & biographical signals are completely contradictory.",
        "final_status": "CONFLICTING",
        "system_reasoning": "TRACEID AI enforces multi-signal DNA: 'Face similarity alone does not establish identity.' The contextual and credential contradictions override visual similarity.",
        "twin_guard_triggered": True,
        "counterfactual_summary": "Visual signal (91%) overridden by contextual conflicts (-100%).",
        "evidence_strength": 18.5,
        "major_concerns": ["High visual similarity contradicted by distinct legal names & employers"],
        "supporting_count": 1,
        "contradicting_count": 5,
        "self_challenge_result": "System successfully rejects facial resemblance hypothesis in favor of verified legal and repository credentials."
    },
    {
        "id": "adv-5",
        "title": "Conflicting Organization / Employer Claims",
        "category": "Conflicting Organization",
        "input_context": {
            "name": "Marcus Vance",
            "alias": "mvance_sec",
            "org": "Vanguard Cyber Systems",
            "photo_type": "Consented Portrait"
        },
        "candidates_found": 2,
        "detected_risk": "Simultaneous full-time on-site employment asserted at Vanguard Cyber (London) and Apex Research (Austin).",
        "final_status": "CONFLICTING",
        "system_reasoning": "Mutually exclusive institutional employment claims trigger conflict detector. System flags conflicting employer records as negative evidence.",
        "twin_guard_triggered": True,
        "counterfactual_summary": "Mutually exclusive corporate affiliation records across jurisdictions.",
        "evidence_strength": 22.0,
        "major_concerns": ["Concurrent exclusive employment in competing entities"],
        "supporting_count": 2,
        "contradicting_count": 4,
        "self_challenge_result": "System challenges unified identity and isolates candidate as distinct physical entity."
    },
    {
        "id": "adv-6",
        "title": "Conflicting Timeline / Impossible Geographic Overlap",
        "category": "Conflicting Timeline",
        "input_context": {
            "name": "Julian Alvarez",
            "alias": "jalvarez_sys",
            "org": "Pacific Distributed Labs",
            "photo_type": "Consented Portrait"
        },
        "candidates_found": 2,
        "detected_risk": "Simultaneous in-person keynote and full-time residency recorded in Singapore and Zurich during Q3 2025.",
        "final_status": "CONFLICTING",
        "system_reasoning": "Temporal DNA Engine detects physical impossibilities in career chronology. Timeline conflict acts as decisive negative evidence.",
        "twin_guard_triggered": True,
        "counterfactual_summary": "Concurrent in-person milestones in disparate continents during identical date range.",
        "evidence_strength": 15.0,
        "major_concerns": ["Anachronistic event attendance and impossible geographic overlap"],
        "supporting_count": 1,
        "contradicting_count": 5,
        "self_challenge_result": "Temporal Engine invalidates merged profile based on verified conference schedule logs."
    },
    {
        "id": "adv-7",
        "title": "Missing Biographical & Professional Information",
        "category": "Missing Information",
        "input_context": {
            "name": "Aria Thorne",
            "alias": "",
            "org": "",
            "photo_type": "Unlabeled Snapshot"
        },
        "candidates_found": 1,
        "detected_risk": "Sparse input metadata; zero organizational or repository anchors supplied.",
        "final_status": "INSUFFICIENT EVIDENCE",
        "system_reasoning": "System refuses to hallucinate connections for sparse seeds. Preserves controlled uncertainty.",
        "twin_guard_triggered": False,
        "counterfactual_summary": "Missing 6 out of 8 required DNA dimensions.",
        "evidence_strength": 12.0,
        "major_concerns": ["Under-specified input parameters", "Zero institutional anchors"],
        "supporting_count": 1,
        "contradicting_count": 0,
        "self_challenge_result": "System prevents speculation and mandates human analyst clarification."
    },
    {
        "id": "adv-8",
        "title": "Sparse / Synthetic Digital Footprint (Anti-Hallucination)",
        "category": "Insufficient Evidence",
        "input_context": {
            "name": "Maya Lin",
            "alias": "mlin_synthetic",
            "org": "Unverified Entity",
            "photo_type": "Consented Test Image"
        },
        "candidates_found": 1,
        "detected_risk": "Total available evidence < 2 independent nodes. Zero historical depth.",
        "final_status": "INSUFFICIENT EVIDENCE",
        "system_reasoning": "The system terminates with INSUFFICIENT EVIDENCE rather than fabricating identity connections.",
        "twin_guard_triggered": False,
        "counterfactual_summary": "Zero verified institutional anchors. Safe abort triggered.",
        "evidence_strength": 5.0,
        "major_concerns": ["Unverified digital footprint with zero verifiable cryptographic or institutional provenance"],
        "supporting_count": 0,
        "contradicting_count": 0,
        "self_challenge_result": "Strict anti-hallucination gate aborts without false-positive match."
    }
]

@router.get("/tests", response_model=List[Dict[str, Any]])
def get_adversarial_tests():
    """Retrieve all 8 adversarial stress test vectors."""
    return ADVERSARIAL_CASES
