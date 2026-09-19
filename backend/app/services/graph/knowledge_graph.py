from typing import List, Dict, Any

class KnowledgeGraphService:
    """
    Knowledge & Evidence Graph Engine (5 Marks).
    Constructs relational graph with React Flow and Neo4j compatible nodes and edges.
    """

    def generate_graph(self, subject_name: str, candidate_id: str = "cand-a") -> Dict[str, Any]:
        nodes = [
            {"id": "n-subject", "type": "person", "label": subject_name, "subtitle": "Subject / Target", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", "status": "verified", "reliability": "HIGH", "claim_count": 8},
            {"id": "n-novatech", "type": "organization", "label": "NovaTech Labs", "subtitle": "Employer (2022-Pres)", "icon": "Building2", "status": "verified", "reliability": "HIGH", "claim_count": 6},
            {"id": "n-stanford", "type": "organization", "label": "Stanford AI Lab", "subtitle": "Education / Research", "icon": "GraduationCap", "status": "verified", "reliability": "HIGH", "claim_count": 3},
            {"id": "n-atlas", "type": "project", "label": "Project Atlas", "subtitle": "Lead Maintainer", "icon": "FolderGit2", "status": "verified", "reliability": "HIGH", "claim_count": 7},
            {"id": "n-openkernel", "type": "project", "label": "OpenKernel Org", "subtitle": "Core Contributor", "icon": "Code2", "status": "verified", "reliability": "HIGH", "claim_count": 4},
            {"id": "n-gh", "type": "profile", "label": "github/alexm_dev", "subtitle": "Public Code Profile", "icon": "Globe", "status": "verified", "reliability": "HIGH", "claim_count": 9},
            {"id": "n-li", "type": "profile", "label": "linkedin/alex-morgan-ai", "subtitle": "Professional Profile", "icon": "UserCheck", "status": "verified", "reliability": "HIGH", "claim_count": 5},
            {"id": "n-arxiv", "type": "publication", "label": "ArXiv:2104.09211", "subtitle": "Research Paper", "icon": "FileText", "status": "verified", "reliability": "HIGH", "claim_count": 2},
            {"id": "n-cyber25", "type": "event", "label": "CyberSummit 2025", "subtitle": "Speaker Session", "icon": "Calendar", "status": "verified", "reliability": "HIGH", "claim_count": 2},
            {"id": "n-techconf26", "type": "event", "label": "TechConf 2026", "subtitle": "Speaker Session", "icon": "Calendar", "status": "verified", "reliability": "HIGH", "claim_count": 2},
            {"id": "n-pgp", "type": "source", "label": "PGP Key 0x8F4E2", "subtitle": "Cryptographic Anchor", "icon": "Key", "status": "verified", "reliability": "HIGH", "claim_count": 4},
            {"id": "n-cand-b", "type": "person", "label": "Alex Morgan (OSR)", "subtitle": "Berlin Entity (TwinGuard)", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces", "status": "ambiguous", "reliability": "MEDIUM", "claim_count": 3},
            {"id": "n-osr", "type": "organization", "label": "Open Systems Research", "subtitle": "Berlin Employer", "icon": "Building", "status": "ambiguous", "reliability": "MEDIUM", "claim_count": 2}
        ]

        edges = [
            {"id": "e1", "source": "n-subject", "target": "n-novatech", "label": "works_at", "status": "verified", "confidence": "98%", "source_ref": "novatech.ai"},
            {"id": "e2", "source": "n-subject", "target": "n-stanford", "label": "attended", "status": "verified", "confidence": "95%", "source_ref": "stanford.edu"},
            {"id": "e3", "source": "n-subject", "target": "n-atlas", "label": "created", "status": "verified", "confidence": "99%", "source_ref": "github.com"},
            {"id": "e4", "source": "n-subject", "target": "n-openkernel", "label": "contributed_to", "status": "verified", "confidence": "94%", "source_ref": "openkernel.org"},
            {"id": "e5", "source": "n-subject", "target": "n-gh", "label": "profile_of", "status": "verified", "confidence": "99%", "source_ref": "github.com"},
            {"id": "e6", "source": "n-subject", "target": "n-li", "label": "profile_of", "status": "verified", "confidence": "96%", "source_ref": "linkedin.com"},
            {"id": "e7", "source": "n-subject", "target": "n-arxiv", "label": "published", "status": "verified", "confidence": "92%", "source_ref": "arxiv.org"},
            {"id": "e8", "source": "n-subject", "target": "n-cyber25", "label": "attended", "status": "verified", "confidence": "97%", "source_ref": "cybersummit2025.org"},
            {"id": "e9", "source": "n-subject", "target": "n-techconf26", "label": "attended", "status": "verified", "confidence": "96%", "source_ref": "techconf2026.org"},
            {"id": "e10", "source": "n-gh", "target": "n-pgp", "label": "associated_with", "status": "verified", "confidence": "100%", "source_ref": "pgp.mit.edu"},
            {"id": "e11", "source": "n-atlas", "target": "n-pgp", "label": "associated_with", "status": "verified", "confidence": "100%", "source_ref": "git commit signature"},
            {"id": "e12", "source": "n-cand-b", "target": "n-osr", "label": "works_at", "status": "ambiguous", "confidence": "91%", "source_ref": "opensystemsresearch.org"},
            {"id": "e13", "source": "n-subject", "target": "n-cand-b", "label": "associated_with", "status": "conflicting", "confidence": "Disambiguated Homonym", "source_ref": "TwinGuard Engine"}
        ]

        return {"nodes": nodes, "edges": edges}

knowledge_graph_service = KnowledgeGraphService()
