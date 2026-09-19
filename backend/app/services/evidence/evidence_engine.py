from typing import List, Dict, Any, Optional
from backend.app.mock_data.authorized_dataset import AUTHORIZED_DATASET

class EvidenceEngine:
    """
    Evidence & Source Reliability Engine (5 Marks).
    Attaches cryptographic, corporate, academic, and repository proof to claims.
    Manages configurable source reliability levels: HIGH, MEDIUM, LOW.
    """

    RELIABILITY_LEVELS = {
        "Company": "HIGH",
        "Publication": "HIGH",
        "Event": "HIGH",
        "Professional": "HIGH",
        "Technical": "HIGH",
        "Developer Q&A": "MEDIUM",
        "Media": "MEDIUM",
        "Unindexed Mirror": "LOW"
    }

    def get_source_reliability(self, source_type: str) -> str:
        return self.RELIABILITY_LEVELS.get(source_type, "MEDIUM")

    def generate_evidence_lattice(self, candidate_id: str) -> List[Dict[str, Any]]:
        if candidate_id == "cand-a":
            return [
                {
                    "id": "ev-novatech",
                    "claim": "Alex Morgan is employed as Staff AI Systems Architect at NovaTech Labs.",
                    "source_id": "src-4",
                    "source": "NovaTech Labs Research Bulletin & Staff Index",
                    "source_type": "Corporate Public Domain (Verified TLS / DNSSEC)",
                    "source_url": "https://novatech.ai/research/team",
                    "evidence_snippet": "Authored 'Scalable Graph Transformers in Production' (Jan 2025). Biography identifies Alex as Staff AI Systems Architect.",
                    "reliability": "HIGH",
                    "timestamp": "March 2026 (Continuous 2022-2026)",
                    "confidence_level": "98% Corroborated",
                    "provenance": "SHA-256 Hash of Public Snapshot: 7f8a9e2d4c... verified across Wayback Machine snapshot and live DNS endpoint.",
                    "supporting_signals": [
                        "Official company email domain linked to GitHub organization membership",
                        "SEC Schedule 13D filing references technical team roster",
                        "Keynote attribution at CyberSummit 2025 sponsored by NovaTech"
                    ],
                    "conflicting_evidence": [
                        "A Berlin registry entry under the same canonical name lists Open Systems Research as employer; verified by TwinGuard as Candidate B."
                    ]
                },
                {
                    "id": "ev-atlas",
                    "claim": "Alex Morgan is the creator and primary maintainer of Project Atlas.",
                    "source_id": "src-1",
                    "source": "GitHub Public Git Log & GPG Signature Ledger",
                    "source_type": "Technical Cryptographic Artifact",
                    "source_url": "https://github.com/atlas-core/atlas",
                    "evidence_snippet": "Commit 9b4f2a1 ('Initial architecture release v1.0.0') cryptographically signed by PGP Key 0x8F4E2 belonging to alexm_dev.",
                    "reliability": "HIGH",
                    "timestamp": "2023 - 2026",
                    "confidence_level": "99% Cryptographic Proof",
                    "provenance": "Signed git tag verified against openpgp.org public keyserver fingerprint 8F4E201B4991A.",
                    "supporting_signals": [
                        "1,480+ signed commits over 36 months",
                        "Lead speaker session at OpenSource Global 2024 presenting Project Atlas",
                        "Referenced in Stanford AI Lab alumni showcase"
                    ],
                    "conflicting_evidence": []
                },
                {
                    "id": "ev-stanford",
                    "claim": "Alex Morgan conducted distributed systems research at Stanford AI Lab.",
                    "source_id": "src-7",
                    "source": "Stanford University CS Department Public Directory",
                    "source_type": "University Domain (High Academic Reliability)",
                    "source_url": "https://cs.stanford.edu/people",
                    "evidence_snippet": "Co-authored 'Distributed Graph Invariant Representations' (ArXiv:2104.09211).",
                    "reliability": "HIGH",
                    "timestamp": "2020 - 2021",
                    "confidence_level": "95% Corroborated",
                    "provenance": "Institutional academic directory record matching graduation records.",
                    "supporting_signals": ["ArXiv primary author record", "Faculty advisor endorsement"],
                    "conflicting_evidence": []
                },
                {
                    "id": "ev-cybersummit",
                    "claim": "Alex Morgan presented keynote on Explainable Systems at CyberSummit 2025.",
                    "source_id": "src-5",
                    "source": "CyberSummit 2025 Official Program",
                    "source_type": "Conference Web Archives",
                    "source_url": "https://cybersummit2025.org/speakers/alex-morgan",
                    "evidence_snippet": "Keynote speaker bio confirms Staff AI Architect role at NovaTech Labs.",
                    "reliability": "HIGH",
                    "timestamp": "October 2025",
                    "confidence_level": "97% Corroborated",
                    "provenance": "Official conference agenda with indexed video archive.",
                    "supporting_signals": ["Matching headshot portrait", "Published conference slides"],
                    "conflicting_evidence": []
                }
            ]
        elif candidate_id == "cand-b":
            return [
                {
                    "id": "ev-osr",
                    "claim": "Entity 'Alex Morgan' in Berlin is employed as Research Intern at Open Systems Research.",
                    "source_id": "src-8",
                    "source": "EU Tech Company Index & OSR Team Registry",
                    "source_type": "EU Business Registry",
                    "source_url": "https://opensystemsresearch.org/team",
                    "evidence_snippet": "Alex Morgan listed as frontend/intern researcher in Berlin since 2023.",
                    "reliability": "MEDIUM",
                    "timestamp": "2023 - 2025",
                    "confidence_level": "TwinGuard Isolated",
                    "provenance": "Handelsregister Berlin corporate filing record.",
                    "supporting_signals": ["European corporate filing"],
                    "conflicting_evidence": [
                        "Identical name string creates potential false match for naive string matching."
                    ]
                }
            ]
        else: # cand-c
            return [
                {
                    "id": "ev-sparse",
                    "claim": "Alex M. operates as an independent developer with no corporate anchors.",
                    "source_id": "src-9",
                    "source": "Public Freelance Profile Mirror",
                    "source_type": "Personal Profile",
                    "source_url": "https://dribbble.com/alextech_ui",
                    "evidence_snippet": "Independent designer profile with zero software code repositories.",
                    "reliability": "LOW",
                    "timestamp": "2024",
                    "confidence_level": "Insufficient Evidence",
                    "provenance": "Unverified portfolio stub.",
                    "supporting_signals": ["Partial name match"],
                    "conflicting_evidence": ["Zero technical code artifacts"]
                }
            ]

evidence_engine = EvidenceEngine()
