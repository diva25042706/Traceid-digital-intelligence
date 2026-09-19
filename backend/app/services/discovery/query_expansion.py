from typing import List

class QueryExpansionEngine:
    """
    Context-Aware Search Query Expansion Engine.
    Dynamically generates targeted public-search hypotheses based on user inputs.
    Works for ANY name, organization, domain, or role without hardcoding.
    """

    def generate_search_hypotheses(
        self,
        name: str,
        username: str = "",
        organization: str = "",
        domain: str = "",
        role: str = "",
        location: str = "",
        context: str = ""
    ) -> List[str]:
        clean_name = name.strip()
        if not clean_name:
            return []

        hypotheses: List[str] = [
            f'"{clean_name}"'
        ]

        if organization.strip():
            org = organization.strip()
            hypotheses.append(f'"{clean_name}" "{org}"')
            # Extract common short prefixes for multi-word institutions (e.g. "Vel Tech High Tech", "Vel Tech")
            org_words = org.split()
            if len(org_words) >= 4:
                hypotheses.append(f'"{clean_name}" "{" ".join(org_words[:4])}"')
                hypotheses.append(f'"{clean_name}" "{" ".join(org_words[:2])}"')
            elif len(org_words) >= 2:
                hypotheses.append(f'"{clean_name}" "{" ".join(org_words[:2])}"')
            hypotheses.append(f'"{clean_name}" {org} leadership team directory')

        if domain.strip():
            d = domain.strip()
            for token in [t.strip() for t in d.replace("/", ",").split(",") if t.strip()]:
                hypotheses.append(f'"{clean_name}" {token}')

        if role.strip():
            r = role.strip()
            hypotheses.append(f'"{clean_name}" "{r}"')

        if username.strip():
            u = username.strip().lstrip("@")
            hypotheses.append(f'"{u}"')
            hypotheses.append(f'"{clean_name}" "{u}"')
            hypotheses.append(f'"{u}" GitHub')
            hypotheses.append(f'"{u}" LinkedIn')

        # Context-extracted identifiers (e.g., GitHub, Instagram, LinkedIn, College)
        if context.strip():
            import re
            lines = context.strip().split("\n")
            for line in lines:
                line_str = line.strip()
                if not line_str:
                    continue
                # Match patterns like "Instagram username: itz_sathana" or "GitHub: Sathana0511"
                match_id = re.search(r'(?:github|instagram|linkedin|handle|alias|username|profile|college)[:\s]+([a-zA-Z0-9_\-\.\s]+)', line_str, re.IGNORECASE)
                if match_id:
                    extracted = match_id.group(1).strip()
                    if extracted and len(extracted) < 40 and not extracted.startswith("http"):
                        hypotheses.append(f'"{extracted}"')
                        hypotheses.append(f'"{clean_name}" "{extracted}"')
                elif not ":" in line_str and len(line_str.split()) <= 2:
                    tok = line_str.strip().lstrip("@")
                    hypotheses.append(f'"{tok}"')

        if location.strip():
            loc = location.strip()
            hypotheses.append(f'"{clean_name}" "{loc}"')

        # Generic technical / public registry hypotheses
        hypotheses.extend([
            f'"{clean_name}" GitHub',
            f'"{clean_name}" LinkedIn',
            f'"{clean_name}" publications research ORCID',
            f'"{clean_name}" conference speaker bio'
        ])

        # Deduplicate preserving order
        seen = set()
        unique_queries = []
        for h in hypotheses:
            if h not in seen:
                seen.add(h)
                unique_queries.append(h)

        return unique_queries

query_expansion_engine = QueryExpansionEngine()
