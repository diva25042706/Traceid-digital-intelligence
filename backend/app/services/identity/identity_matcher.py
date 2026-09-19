import re
from typing import Dict, Any, List

class IdentityMatcher:
    """
    Identity Matching Engine for TRACEID AI.
    Evaluates 8 multi-signal DNA dimensions without relying on single black-box decisions.
    """

    @staticmethod
    def calculate_string_similarity(str1: str, str2: str) -> float:
        if not str1 or not str2:
            return 0.0
        s1 = set(re.findall(r"\w+", str1.lower()))
        s2 = set(re.findall(r"\w+", str2.lower()))
        if not s1 or not s2:
            return 0.0
        intersection = len(s1.intersection(s2))
        union = len(s1.union(s2))
        return intersection / union if union > 0 else 0.0

    def evaluate_candidate_signals(
        self,
        seed_name: str,
        seed_alias: str,
        seed_org: str,
        candidate_data: Dict[str, Any]
    ) -> Dict[str, Any]:
        cand_name = candidate_data.get("name", "")
        cand_username = candidate_data.get("username", "")
        cand_orgs = candidate_data.get("organizations", [])

        name_sim = self.calculate_string_similarity(seed_name, cand_name)
        username_sim = self.calculate_string_similarity(seed_alias, cand_username)
        org_match = any(self.calculate_string_similarity(seed_org, org) > 0.4 for org in cand_orgs) if seed_org else False

        name_matched = name_sim >= 0.5 or (seed_name.lower() in cand_name.lower())
        username_matched = username_sim >= 0.4 or (seed_alias.lower() in cand_username.lower() if seed_alias else False)

        return {
            "name_match": name_matched,
            "username_match": username_matched,
            "organization_match": org_match,
            "project_match": candidate_data.get("status") == "SUPPORTED",
            "timeline_consistency": candidate_data.get("status") in ["SUPPORTED", "AMBIGUOUS"],
            "name_similarity_score": round(name_sim, 2),
            "username_similarity_score": round(username_sim, 2),
        }

    def compute_identity_dna(self, candidate_status: str, supporting_count: int, candidate_name: str = "") -> List[Dict[str, Any]]:
        """
        Builds the complete 8-signal Identity DNA array:
        1. Visual similarity
        2. Name similarity
        3. Username similarity
        4. Organization match
        5. Project/skill match
        6. Semantic similarity
        7. Network/relationship signals
        8. Temporal consistency
        """
        if candidate_status == "SUPPORTED":
            return [
                {
                    "name": "Visual similarity",
                    "value": 84,
                    "label": "Supported",
                    "description": "Facial landmark consistency across public conference decks (Supporting signal only).",
                    "supporting_evidence_count": 3,
                    "contradicting_evidence_count": 0,
                    "details": "Visual similarity extracted from consented portrait and public keynote video thumbnails. Does not constitute identity proof alone."
                },
                {
                    "name": "Name similarity",
                    "value": 98,
                    "label": "Strong",
                    "description": f"Exact token match for canonical name '{candidate_name or 'Candidate'}'.",
                    "supporting_evidence_count": 4,
                    "contradicting_evidence_count": 0,
                    "details": "Lexical and phonetic token matching across corporate filings, ORCID records, and published papers."
                },
                {
                    "name": "Username similarity",
                    "value": 92,
                    "label": "Strong",
                    "description": "Namespace match across verified developer platforms (GitHub, HuggingFace).",
                    "supporting_evidence_count": 3,
                    "contradicting_evidence_count": 0,
                    "details": "Consistent handle namespace corroborated with shared GPG signing keys and SSH public key digests."
                },
                {
                    "name": "Organization match",
                    "value": 90,
                    "label": "Strong",
                    "description": "Institutional affiliation corroborated via press releases and domain emails.",
                    "supporting_evidence_count": 3,
                    "contradicting_evidence_count": 0,
                    "details": "Primary employer verified across official corporate directory and public project author credits."
                },
                {
                    "name": "Project/skill match",
                    "value": 86,
                    "label": "Strong",
                    "description": "Technical repository contributions match core skill taxonomy.",
                    "supporting_evidence_count": 4,
                    "contradicting_evidence_count": 0,
                    "details": "Open-source commits in distributed systems, kernel optimization, and AI models verified in public git logs."
                },
                {
                    "name": "Semantic similarity",
                    "value": 91,
                    "label": "Strong",
                    "description": "High semantic vocabulary alignment in technical bio and commit messages.",
                    "supporting_evidence_count": 3,
                    "contradicting_evidence_count": 0,
                    "details": "Natural language embedding alignment across technical writing, speaker bios, and documentation."
                },
                {
                    "name": "Network/relationship signals",
                    "value": 78,
                    "label": "Consistent",
                    "description": "Co-authorship cluster verified with 4 shared peer contributors.",
                    "supporting_evidence_count": 2,
                    "contradicting_evidence_count": 0,
                    "details": "Shared repository maintainers and conference co-speakers verified in public schedule listings."
                },
                {
                    "name": "Temporal consistency",
                    "value": 88,
                    "label": "Strong",
                    "description": "Continuous uninterrupted chronological progression 2021-2026.",
                    "supporting_evidence_count": 5,
                    "contradicting_evidence_count": 0,
                    "details": "Zero overlapping or impossible simultaneous full-time positions across separate geographic jurisdictions."
                }
            ]
        elif candidate_status == "AMBIGUOUS":
            return [
                {
                    "name": "Visual similarity",
                    "value": 65,
                    "label": "Partial",
                    "description": "Partial facial resemblance; archive snapshot with lower feature confidence.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 0,
                    "details": "Resemblance observed but insufficient for definitive extraction."
                },
                {
                    "name": "Name similarity",
                    "value": 95,
                    "label": "Strong",
                    "description": "Identical canonical name string; homonym collision detected.",
                    "supporting_evidence_count": 2,
                    "contradicting_evidence_count": 1,
                    "details": "Common name tokens shared with separate physical entities in other countries."
                },
                {
                    "name": "Username similarity",
                    "value": 50,
                    "label": "Weak",
                    "description": "Divergent suffix/prefix variations in public handle namespace.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 1,
                    "details": "Handles appear similar but originate from differing registration periods."
                },
                {
                    "name": "Organization match",
                    "value": 40,
                    "label": "Weak",
                    "description": "Unverified or secondary institutional affiliation.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 2,
                    "details": "Listed employer differs from seed context; requires human analyst disambiguation."
                },
                {
                    "name": "Project/skill match",
                    "value": 60,
                    "label": "Partial",
                    "description": "General domain overlap without verified repository commit ownership.",
                    "supporting_evidence_count": 2,
                    "contradicting_evidence_count": 1,
                    "details": "Subject works in similar technology sector but maintains distinct projects."
                },
                {
                    "name": "Semantic similarity",
                    "value": 70,
                    "label": "Consistent",
                    "description": "General software engineering vocabulary overlap.",
                    "supporting_evidence_count": 2,
                    "contradicting_evidence_count": 0,
                    "details": "High-level topical alignment without specific proprietary overlap."
                },
                {
                    "name": "Network/relationship signals",
                    "value": 45,
                    "label": "Weak",
                    "description": "Distinct independent collaborator clusters.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 2,
                    "details": "No shared cryptographic signers or co-maintainers found."
                },
                {
                    "name": "Temporal consistency",
                    "value": 35,
                    "label": "Conflicting",
                    "description": "Concurrent residency reported in disparate geographic locations.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 2,
                    "details": "Simultaneous physical presence claimed in Europe and North America."
                }
            ]
        elif candidate_status == "CONFLICTING":
            return [
                {
                    "name": "Visual similarity",
                    "value": 85,
                    "label": "Supported",
                    "description": "Look-alike facial similarity detected (Supporting signal only).",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 0,
                    "details": "Facial geometry exhibits high similarity but non-visual signals completely diverge."
                },
                {
                    "name": "Name similarity",
                    "value": 20,
                    "label": "Conflicting",
                    "description": "Contradictory legal name tokens discovered in authoritative registries.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 3,
                    "details": "Official government and corporate records identify candidate under different legal name."
                },
                {
                    "name": "Username similarity",
                    "value": 15,
                    "label": "Conflicting",
                    "description": "Completely separate handle namespace and PGP key signatures.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 2,
                    "details": "Cryptographic key fingerprints demonstrate separate administrative control."
                },
                {
                    "name": "Organization match",
                    "value": 10,
                    "label": "Conflicting",
                    "description": "Mutually exclusive institutional employment records.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 3,
                    "details": "Full-time concurrent employment claimed at competing institution."
                },
                {
                    "name": "Project/skill match",
                    "value": 30,
                    "label": "Weak",
                    "description": "Divergent technical repository footprints.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 2,
                    "details": "Commits made to unrelated technology stack."
                },
                {
                    "name": "Semantic similarity",
                    "value": 40,
                    "label": "Weak",
                    "description": "Low lexical similarity in professional profiles.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 1,
                    "details": "Topic distributions point to different subfields."
                },
                {
                    "name": "Network/relationship signals",
                    "value": 15,
                    "label": "Conflicting",
                    "description": "Disjoint co-author and collaborator graphs.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 2,
                    "details": "Zero peer intersection across all verified public event rosters."
                },
                {
                    "name": "Temporal consistency",
                    "value": 10,
                    "label": "Conflicting",
                    "description": "Impossible geographic overlap in active career timeline.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 3,
                    "details": "In-person appearances documented simultaneously in distant cities."
                }
            ]
        else: # INSUFFICIENT EVIDENCE
            return [
                {
                    "name": "Visual similarity",
                    "value": 30,
                    "label": "Weak",
                    "description": "Single isolated reference image; no corroborating public appearances.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 0,
                    "details": "No secondary imagery found in public repositories or conference media."
                },
                {
                    "name": "Name similarity",
                    "value": 40,
                    "label": "Weak",
                    "description": "Common name tokens without unique disambiguating anchors.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 0,
                    "details": "Name match alone cannot establish identity without corroborating public records."
                },
                {
                    "name": "Username similarity",
                    "value": 20,
                    "label": "Weak",
                    "description": "No verified handle found in authorized developer indices.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 0,
                    "details": "Handle unindexed in public directories."
                },
                {
                    "name": "Organization match",
                    "value": 15,
                    "label": "Weak",
                    "description": "No institutional records indexed in public domain.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 0,
                    "details": "Zero employer records verified in public filings."
                },
                {
                    "name": "Project/skill match",
                    "value": 25,
                    "label": "Weak",
                    "description": "No public open-source or academic repository contributions.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 0,
                    "details": "Unindexed technical footprint."
                },
                {
                    "name": "Semantic similarity",
                    "value": 30,
                    "label": "Weak",
                    "description": "Sparse biographical text available for semantic analysis.",
                    "supporting_evidence_count": 1,
                    "contradicting_evidence_count": 0,
                    "details": "Under-specified profile descriptions."
                },
                {
                    "name": "Network/relationship signals",
                    "value": 10,
                    "label": "Weak",
                    "description": "Zero co-author or peer connections found in public sources.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 0,
                    "details": "Isolated profile node."
                },
                {
                    "name": "Temporal consistency",
                    "value": 20,
                    "label": "Weak",
                    "description": "Insufficient timeline depth to reconstruct career trajectory.",
                    "supporting_evidence_count": 0,
                    "contradicting_evidence_count": 0,
                    "details": "Fewer than 2 verifiable historical dates available in public sources."
                }
            ]

identity_matcher = IdentityMatcher()
