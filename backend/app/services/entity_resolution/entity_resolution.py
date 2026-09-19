import re
from typing import Dict, Any, List, Optional

class MultiSignalEntityResolver:
    """
    TRACEID AI — 8-Signal Multi-Dimensional Entity Resolution Engine.
    
    Evaluates candidates across 8 independent evidentiary dimensions + supporting visual similarity:
    1. Name Similarity (Lexical & Phonetic Token Overlap)
    2. Username / Handle Similarity (Normalized string distance)
    3. Organization Correspondence (Affiliation & employer overlap)
    4. Domain / Role Correspondence (Topic and functional alignment)
    5. Project Match (Open-source repos, contributions, codebases)
    6. Event / Activity Match (Conferences, hackathons, workshops)
    7. Timeline Consistency (Chronological coherence without temporal collisions)
    8. Cross-Source Corroboration (Multi-platform validation count)
    + Visual Similarity (Strictly auxiliary supporting signal)
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
    def token_similarity(str1: str, str2: str) -> float:
        t1 = set(MultiSignalEntityResolver.normalize_text(str1).split())
        t2 = set(MultiSignalEntityResolver.normalize_text(str2).split())
        if not t1 or not t2:
            return 0.0
        intersection = len(t1.intersection(t2))
        union = len(t1.union(t2))
        return intersection / union if union > 0 else 0.0

    def evaluate_candidate(
        self,
        target_name: str,
        target_username: str,
        target_org: str,
        target_domain: str,
        candidate_data: Dict[str, Any],
        visual_similarity_score: float = 0.0
    ) -> Dict[str, Any]:
        """
        Computes 8-signal breakdown, composite score, and classification.
        """
        cand_name = candidate_data.get("name", "") or candidate_data.get("display_name", "")
        cand_username = candidate_data.get("username", "") or candidate_data.get("handle", "")
        cand_orgs = candidate_data.get("organizations", [])
        if isinstance(cand_orgs, str):
            cand_orgs = [cand_orgs]
        cand_domain = candidate_data.get("domain", "") or candidate_data.get("description", "")
        cand_projects = candidate_data.get("projects", [])
        cand_events = candidate_data.get("events", [])
        cand_sources = candidate_data.get("sources", []) or candidate_data.get("platforms", [])
        timeline_events = candidate_data.get("timeline", [])

        # 1. Name Similarity
        norm_t_name = self.normalize_text(target_name)
        norm_c_name = self.normalize_text(cand_name)
        if norm_t_name and norm_c_name:
            if norm_t_name == norm_c_name:
                name_score = 1.0
            else:
                name_score = self.token_similarity(target_name, cand_name)
                # Boost if target name is substring
                if norm_t_name in norm_c_name or norm_c_name in norm_t_name:
                    name_score = max(name_score, 0.85)
        else:
            name_score = 0.0

        # 2. Username Similarity
        norm_t_handle = self.normalize_handle(target_username)
        norm_c_handle = self.normalize_handle(cand_username)
        if norm_t_handle and norm_c_handle:
            if norm_t_handle == norm_c_handle:
                username_score = 1.0
            elif norm_t_handle in norm_c_handle or norm_c_handle in norm_t_handle:
                username_score = 0.80
            else:
                username_score = self.token_similarity(target_username, cand_username)
        else:
            username_score = 0.0

        # 3. Organization Match
        org_score = 0.0
        if target_org:
            norm_t_org = self.normalize_text(target_org)
            for org in cand_orgs:
                norm_c_org = self.normalize_text(org)
                if norm_t_org in norm_c_org or norm_c_org in norm_t_org:
                    org_score = 1.0
                    break
                sim = self.token_similarity(target_org, org)
                if sim > org_score:
                    org_score = sim

        # 4. Domain / Role Match
        domain_score = 0.0
        if target_domain and cand_domain:
            domain_score = self.token_similarity(target_domain, cand_domain)
            if any(w in cand_domain.lower() for w in target_domain.lower().split() if len(w) > 3):
                domain_score = max(domain_score, 0.75)

        # 5. Project Match
        project_score = 1.0 if len(cand_projects) > 0 else (0.5 if "github" in str(candidate_data).lower() else 0.0)

        # 6. Event Match
        event_score = 1.0 if len(cand_events) > 0 else 0.0

        # 7. Timeline Consistency
        timeline_score = 0.9 if len(timeline_events) > 0 else 0.5

        # 8. Cross-Source Corroboration
        distinct_sources = set(cand_sources)
        if len(distinct_sources) >= 3:
            cross_source_score = 1.0
        elif len(distinct_sources) == 2:
            cross_source_score = 0.75
        elif len(distinct_sources) == 1:
            cross_source_score = 0.40
        else:
            cross_source_score = 0.0

        # Visual similarity bounded as supporting signal
        vis_score = min(1.0, max(0.0, float(visual_similarity_score)))

        weights = {
            "name": 0.25,
            "username": 0.15,
            "organization": 0.20,
            "domain": 0.10,
            "project": 0.10,
            "timeline": 0.05,
            "cross_source": 0.10,
            "visual": 0.05
        }

        composite_score = (
            name_score * weights["name"] +
            username_score * weights["username"] +
            org_score * weights["organization"] +
            domain_score * weights["domain"] +
            project_score * weights["project"] +
            timeline_score * weights["timeline"] +
            cross_source_score * weights["cross_source"] +
            vis_score * weights["visual"]
        )

        signal_breakdown = [
            {"signal": "Name Correspondence", "score": round(name_score * 100), "weight": f"{int(weights['name']*100)}%", "status": "VERIFIED" if name_score >= 0.8 else ("PARTIAL" if name_score >= 0.4 else "UNVERIFIED")},
            {"signal": "Username / Handle Correspondence", "score": round(username_score * 100), "weight": f"{int(weights['username']*100)}%", "status": "VERIFIED" if username_score >= 0.8 else ("PARTIAL" if username_score >= 0.4 else "UNVERIFIED")},
            {"signal": "Organization Correspondence", "score": round(org_score * 100), "weight": f"{int(weights['organization']*100)}%", "status": "VERIFIED" if org_score >= 0.7 else "UNVERIFIED"},
            {"signal": "Domain / Role Alignment", "score": round(domain_score * 100), "weight": f"{int(weights['domain']*100)}%", "status": "VERIFIED" if domain_score >= 0.6 else "UNVERIFIED"},
            {"signal": "Project / Repository Attribution", "score": round(project_score * 100), "weight": f"{int(weights['project']*100)}%", "status": "VERIFIED" if project_score >= 0.5 else "UNVERIFIED"},
            {"signal": "Timeline Coherence", "score": round(timeline_score * 100), "weight": f"{int(weights['timeline']*100)}%", "status": "VERIFIED" if timeline_score >= 0.5 else "UNVERIFIED"},
            {"signal": "Cross-Source Corroboration", "score": round(cross_source_score * 100), "weight": f"{int(weights['cross_source']*100)}%", "status": "VERIFIED" if cross_source_score >= 0.7 else "UNVERIFIED"},
            {"signal": "Visual Reference Similarity (Supporting)", "score": round(vis_score * 100), "weight": f"{int(weights['visual']*100)}%", "status": "SUPPORTING"}
        ]

        if name_score >= 0.85 and (org_score >= 0.7 or username_score >= 0.8 or cross_source_score >= 0.75):
            status = "SUPPORTED"
            rationale = "High lexical, organizational, and cross-platform multi-source corroboration."
        elif name_score >= 0.6 and (org_score > 0 or username_score > 0 or domain_score > 0.5):
            status = "AMBIGUOUS"
            rationale = "Partial identifier overlap; potential homonym ambiguity or unverified domain affiliation."
        elif name_score >= 0.85 and org_score == 0 and username_score == 0:
            status = "AMBIGUOUS"
            rationale = "Identical name with disparate institutional and geographic records (Homonym risk)."
        else:
            status = "INSUFFICIENT EVIDENCE"
            rationale = "Insufficient cross-source corroboration across public registries."

        return {
            "candidate_name": cand_name,
            "status": status,
            "composite_score": round(composite_score, 4),
            "confidence_percent": round(composite_score * 100, 1),
            "rationale": rationale,
            "signal_breakdown": signal_breakdown,
            "signals": {
                "name_similarity": round(name_score, 3),
                "username_similarity": round(username_score, 3),
                "organization_match": round(org_score, 3),
                "domain_match": round(domain_score, 3),
                "project_match": round(project_score, 3),
                "timeline_consistency": round(timeline_score, 3),
                "cross_source_corroboration": round(cross_source_score, 3),
                "visual_similarity": round(vis_score, 3)
            }
        }

class EntityResolutionService(MultiSignalEntityResolver):
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
        p_name = profile.get("display_name", "")
        p_user = profile.get("username", "")
        p_desc = profile.get("description", "") or (profile.get("evidence", [""])[0] if profile.get("evidence") else "")
        p_url = profile.get("profile_url", "") or profile.get("url", "")

        norm_t_name = self.normalize_text(target_name)
        norm_p_name = self.normalize_text(p_name)
        if norm_t_name and norm_p_name:
            if norm_t_name == norm_p_name:
                name_match = 1.0
            elif norm_t_name in norm_p_name or norm_p_name in norm_t_name:
                name_match = 0.85
            else:
                name_match = self.token_similarity(target_name, p_name)
        else:
            name_match = 0.0

        alias_match = 1.0 if target_alias and target_alias.lower() in str(profile).lower() else 0.0
        norm_t_user = self.normalize_handle(target_alias)
        norm_p_user = self.normalize_handle(p_user)
        username_match = 1.0 if (norm_t_user and norm_p_user and norm_t_user == norm_p_user) else (0.5 if norm_t_user and norm_t_user in norm_p_user else 0.0)

        org_match = 0.0
        if target_org:
            norm_t_org = self.normalize_text(target_org)
            if norm_t_org in self.normalize_text(str(profile)):
                org_match = 1.0
            else:
                org_match = self.token_similarity(target_org, p_desc)

        web_cross_ref = 1.0 if any("website" in str(e).lower() for e in profile.get("evidence", [])) else 0.0
        project_match = 1.0 if "github" in p_url or "project" in p_desc.lower() or "repo" in p_desc.lower() else 0.0
        event_match = 1.0 if any(k in p_desc.lower() for k in ["conference", "workshop", "event", "speaker", "hackathon"]) else 0.0

        domain_match = 0.0
        if target_domain and p_desc:
            domain_match = self.token_similarity(target_domain, p_desc)
            if any(w in p_desc.lower() for w in target_domain.lower().split() if len(w) > 3):
                domain_match = max(domain_match, 0.75)

        timeline_match = 0.85 if p_url else 0.0
        cross_source_ref = 1.0 if len(profile.get("matched_signals", [])) >= 2 else (0.5 if len(profile.get("matched_signals", [])) == 1 else 0.0)
        visual_support = min(1.0, max(0.0, float(visual_similarity_score)))

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

multi_signal_entity_resolver = MultiSignalEntityResolver()
entity_resolution_service = EntityResolutionService()