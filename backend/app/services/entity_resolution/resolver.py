import re
from typing import Dict, Any, List

class EntityResolutionEngine:
    """
    Entity Resolution Engine (5 Marks).
    Normalizes identities, handles aliases, computes contextual overlap,
    and classifies matches into: MATCHED, POSSIBLE_MATCH, AMBIGUOUS, NOT_MATCHED.
    """

    @staticmethod
    def normalize_name(name: str) -> str:
        if not name:
            return ""
        # Remove extra punctuation, standardize case
        cleaned = re.sub(r"[^\w\s]", "", name).strip().lower()
        return " ".join(cleaned.split())

    @staticmethod
    def normalize_handle(handle: str) -> str:
        if not handle:
            return ""
        # Strip leading @, convert to lower, normalize separators
        cleaned = handle.lstrip("@").lower().replace("-", "_").replace(".", "_")
        return cleaned

    def resolve_entity(
        self,
        target_name: str,
        target_handle: str,
        target_org: str,
        candidate: Dict[str, Any]
    ) -> Dict[str, Any]:
        norm_t_name = self.normalize_name(target_name)
        norm_c_name = self.normalize_name(candidate.get("name", ""))

        norm_t_handle = self.normalize_handle(target_handle)
        norm_c_handle = self.normalize_handle(candidate.get("username", ""))

        # Check name similarity
        exact_name = norm_t_name == norm_c_name
        partial_name = norm_t_name in norm_c_name or norm_c_name in norm_t_name

        # Check handle similarity
        exact_handle = norm_t_handle == norm_c_handle if norm_t_handle and norm_c_handle else False
        partial_handle = (norm_t_handle in norm_c_handle or norm_c_handle in norm_t_handle) if norm_t_handle and norm_c_handle else False

        # Check organization overlap
        cand_orgs = [self.normalize_name(o) for o in candidate.get("organizations", [])]
        org_matched = any(self.normalize_name(target_org) in o for o in cand_orgs) if target_org else False

        # Entity Decision Matrix
        if exact_name and (exact_handle or org_matched):
            decision = "MATCHED"
            rationale = "High lexical and organizational convergence. Primary identity cluster resolved."
        elif exact_name and not org_matched:
            decision = "AMBIGUOUS"
            rationale = "Identical canonical name but disparate corporate/geographic footprint. TwinGuard isolation required."
        elif partial_name and (partial_handle or org_matched):
            decision = "POSSIBLE_MATCH"
            rationale = "Partial alias overlap requires additional cross-source verification."
        else:
            decision = "NOT_MATCHED"
            rationale = "Insufficient entity correlation. Ruled out in early resolution filter."

        return {
            "decision": decision,
            "rationale": rationale,
            "exact_name": exact_name,
            "exact_handle": exact_handle,
            "org_matched": org_matched,
        }

entity_resolution_engine = EntityResolutionEngine()
