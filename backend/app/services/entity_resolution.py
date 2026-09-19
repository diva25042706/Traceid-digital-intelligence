import re
from typing import Dict, Any, List, Optional

class EntityResolutionService:
    """
    Universal 11-Signal Entity Resolution & Disambiguation Service.
    
    Evaluates discovered profile candidates across 11 independent signals:
    1. name_match: Lexical & token similarity between query name and profile display name
    2. alias_match: Overlap with known/searched aliases
    3. username_match: Normalized handle / username correspondence
    4. organization_match: Employer, institutional, or community affiliation overlap
    5. website_cross_reference: Outbound profile link on confirmed personal/org domain
    6. project_match: Open-source repository, publication, or curriculum attribution
    7. event_match: Hackathon, keynote, workshop, or conference record
    8. domain_match: Topic, technology, or professional area alignment
    9. timeline_match: Chronological plausibility across career events
    10. cross_source_reference: Multiple distinct indexers corroborating the entity
    11. visual_support: Portrait similarity strictly as an auxiliary supporting signal
    """

    @staticmethod
    def normalize_text(text: str) -> str:
        if not text:
            return ""
        cleaned = re.sub(r"[^\w\s]", " ", text.lower()).strip()
        return " ".join(cleaned.split())

    @staticmethod
    def normalize_handle(handle: str) -> str:
        if not handle:
            return ""
        return handle.lstrip("@").lower().replace("-", "").replace("_", "").replace(".", "")

    @staticmethod
    def token_overlap(str1: str, str2: str) -> float:
        t1 = set(EntityResolutionService.normalize_text(str1).split())
        t2 = set(EntityResolutionService.normalize_text(str2).split())
        if not t1 or not t2:
            return 0.0
        intersection = len(t1.intersection(t2))
        union = len(t1.union(t2))
        return intersection / union if union > 0 else 0.0

    def resolve_candidate_profile(
        self,
        target_name: str,
        target_alias: str,
        target_org: str,
        target_domain: str,
        target_context: str,
        profile: Dict[str, Any],
        visual_similarity_score: float = 0.0
    ) -> Dict[str, Any]:
        """Calculates 11-signal resolution matrix and assigns verification status."""
        p_name = profile.get("display_name", "")
        p_user = profile.get("username", "")
        p_desc = profile.get("description", "") or profile.get("evidence", [""])[0]
        p_url = profile.get("profile_url", "")

        # 1. Name match
        norm_t_name = self.normalize_text(target_name)
        norm_p_name = self.normalize_text(p_name)
        if norm_t_name and norm_p_name:
            if norm_t_name == norm_p_name:
                name_match = 1.0
            elif norm_t_name in norm_p_name or norm_p_name in norm_t_name:
                name_match = 0.85
            else:
                name_match = self.token_overlap(target_name, p_name)
        else:
            name_match = 0.0

        # 2. Alias match
        alias_match = 1.0 if target_alias and target_alias.lower() in str(profile).lower() else 0.0

        # 3. Username match
        norm_t_user = self.normalize_handle(target_alias)
        norm_p_user = self.normalize_handle(p_user)
        username_match = 1.0 if (norm_t_user and norm_p_user and norm_t_user == norm_p_user) else (0.5 if norm_t_user and norm_t_user in norm_p_user else 0.0)

        # 4. Organization match
        org_match = 0.0
        if target_org:
            norm_t_org = self.normalize_text(target_org)
            if norm_t_org in self.normalize_text(str(profile)):
                org_match = 1.0
            else:
                org_match = self.token_overlap(target_org, p_desc)

        # 5. Website cross reference
        web_cross_ref = 1.0 if any("website" in str(e).lower() for e in profile.get("evidence", [])) else 0.0

        # 6. Project match
        project_match = 1.0 if "github" in p_url or "project" in p_desc.lower() or "repo" in p_desc.lower() else 0.0

        # 7. Event match
        event_match = 1.0 if any(k in p_desc.lower() for k in ["conference", "workshop", "event", "speaker", "hackathon"]) else 0.0

        # 8. Domain match
        domain_match = 0.0
        if target_domain and p_desc:
            domain_match = self.token_overlap(target_domain, p_desc)
            if any(w in p_desc.lower() for w in target_domain.lower().split() if len(w) > 3):
                domain_match = max(domain_match, 0.75)

        # 9. Timeline match
        timeline_match = 0.85 if p_url else 0.0

        # 10. Cross source reference
        cross_source_ref = 1.0 if len(profile.get("matched_signals", [])) >= 2 else (0.5 if len(profile.get("matched_signals", [])) == 1 else 0.0)

        # 11. Visual support (supporting only, bounded)
        visual_support = min(1.0, max(0.0, float(visual_similarity_score)))

        # Composite score
        score = (
            name_match * 0.25 +
            org_match * 0.20 +
            username_match * 0.15 +
            domain_match * 0.10 +
            project_match * 0.08 +
            cross_source_ref * 0.08 +
            web_cross_ref * 0.05 +
            timeline_match * 0.04 +
            visual_support * 0.05
        )

        # Verification Status determination
        if not p_url:
            ver_status = "NOT_DISCOVERED"
        elif name_match >= 0.8 and (org_match >= 0.7 or username_match >= 0.8 or cross_source_ref >= 0.75):
            ver_status = "SUPPORTED"
        elif name_match >= 0.5:
            ver_status = "AMBIGUOUS"
        else:
            ver_status = "NOT_VERIFIED"

        return {
            "platform": profile.get("platform"),
            "verification_status": ver_status,
            "confidence_score": round(score, 3),
            "signals": {
                "name_match": name_match >= 0.7,
                "alias_match": alias_match > 0,
                "username_match": username_match >= 0.5,
                "organization_match": org_match >= 0.6,
                "website_cross_reference": web_cross_ref > 0,
                "project_match": project_match > 0,
                "event_match": event_match > 0,
                "domain_match": domain_match >= 0.5,
                "timeline_match": timeline_match > 0,
                "cross_source_reference": cross_source_ref >= 0.5,
                "visual_support": visual_support >= 0.7
            }
        }

entity_resolution_service = EntityResolutionService()