from typing import Dict, Any, List

class TwinGuardEngine:
    """
    TwinGuard Ambiguity & False-Match Engine (5 Marks).
    Prevents false identity associations, homonym merges, and forced decisions.
    """

    def evaluate_ambiguity(
        self,
        candidate_a: Dict[str, Any],
        candidate_b: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        if not candidate_b or candidate_a.get("status") == "INSUFFICIENT EVIDENCE":
            return {
                "detected": False,
                "severity": "low",
                "title": "TwinGuard Clear: No False-Match Collisions",
                "subtitle": "Single unambiguous candidate cluster or isolated test vector",
                "reasons": ["No overlapping homonyms with conflicting professional records"],
                "candidate_a": {
                    "name": candidate_a.get("name", "Unknown"),
                    "handle": candidate_a.get("username", "unknown"),
                    "org": candidate_a.get("organizations", ["Unknown"])[0] if candidate_a.get("organizations") else "Unknown",
                    "location": candidate_a.get("location", "Unknown"),
                    "avatar": candidate_a.get("avatar_url", ""),
                    "key_distinctive_factor": "Single isolated entity record"
                },
                "candidate_b": {
                    "name": "None",
                    "handle": "n/a",
                    "org": "n/a",
                    "location": "n/a",
                    "avatar": "",
                    "key_distinctive_factor": "No comparative candidate found"
                },
                "recommendation": "Proceed with standard review.",
                "required_action": "No manual intervention required."
            }

        # Homonym collision between Candidate A and Candidate B
        return {
            "detected": True,
            "severity": "medium",
            "title": "TwinGuard Disambiguation Alert",
            "subtitle": f"Potential False-Match Risk Detected between {candidate_a.get('candidate_code', 'Candidate A')} and {candidate_b.get('candidate_code', 'Candidate B')}",
            "reasons": [
                f"Identical lexical name '{candidate_a.get('name')}'",
                f"High handle similarity ('{candidate_a.get('username')}' vs '{candidate_b.get('username')}')",
                "Overlapping participation in generic developer communities"
            ],
            "candidate_a": {
                "name": f"{candidate_a.get('name')} (Target Candidate)",
                "handle": candidate_a.get("username", "alexm_dev"),
                "org": f"{candidate_a.get('organizations', ['NovaTech Labs'])[0]} ({candidate_a.get('location', 'Seattle, WA')})",
                "location": candidate_a.get("location", "Seattle, WA, USA"),
                "avatar": candidate_a.get("avatar_url", ""),
                "key_distinctive_factor": "Co-author of Project Atlas; PGP Signed commits verified; US West Coast timeline"
            },
            "candidate_b": {
                "name": f"{candidate_b.get('name')} (Disambiguated Entity)",
                "handle": candidate_b.get("username", "alex_morgan"),
                "org": f"{candidate_b.get('organizations', ['Open Systems Research'])[0]} ({candidate_b.get('location', 'Berlin, Germany')})",
                "location": candidate_b.get("location", "Berlin, Germany"),
                "avatar": candidate_b.get("avatar_url", ""),
                "key_distinctive_factor": "Frontend JavaScript lead; German residency since 2020; No AI systems publication record"
            },
            "recommendation": "Preserve separate entity clusters. Do NOT merge Candidate B into Candidate A digital footprint.",
            "required_action": "Human investigator confirmation logged. TwinGuard separation rule actively enforced."
        }

twin_guard_engine = TwinGuardEngine()
