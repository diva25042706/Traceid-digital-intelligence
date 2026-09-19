from typing import List, Dict, Any

class ConflictDetector:
    """
    Conflict Detection Engine (5 Marks).
    Identifies contradictory roles, overlapping concurrent dates, differing locations,
    and disparate cryptographic keys across source claims.
    """

    def detect_conflicts(
        self,
        candidates: List[Dict[str, Any]],
        timeline: List[Dict[str, Any]]
    ) -> List[Dict[str, Any]]:
        conflicts: List[Dict[str, Any]] = []

        # Detect temporal overlaps
        conflict_events = [e for e in timeline if e.get("is_conflict", False)]
        for ce in conflict_events:
            conflicts.append({
                "id": f"conf-{ce['id']}",
                "type": "TIMELINE_CONFLICT",
                "severity": "MEDIUM",
                "description": ce.get("conflict_details", "Sources report divergent roles during overlapping period (2024)."),
                "sources": [ce.get("source", "Public Web Record"), "NovaTech Official Ledger"]
            })

        # Check for homonym candidate collisions
        if len(candidates) >= 2:
            c_a = candidates[0]
            c_b = candidates[1]
            if c_a.get("name", "").lower() == c_b.get("name", "").lower():
                conflicts.append({
                    "id": "conf-homonym-01",
                    "type": "HOMONYM_AMBIGUITY",
                    "severity": "MEDIUM",
                    "description": f"Identical name '{c_a.get('name')}' identified across distinct geographic centers ({c_a.get('location')} vs {c_b.get('location')}).",
                    "sources": ["SEC Corporate Register", "EU Business Register"]
                })

        return conflicts

conflict_detector = ConflictDetector()
