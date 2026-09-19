from typing import Dict, Any, List

AUTHORIZED_DATASET: Dict[str, Any] = {
    "subjects": {
        "sathana_jayaraman": {
            "canonical_name": "Sathana Jayaraman",
            "seed_handles": ["Sathana0511", "itz_sathana", "sathana-jayaraman"],
            "seed_org": "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College",
            "avatar_url": "/sathana_reference.png",
            "candidates": [
                {
                    "id": "cand-sathana-a",
                    "candidate_code": "Candidate A",
                    "name": "Sathana Jayaraman",
                    "username": "Sathana0511",
                    "avatar_url": "/sathana_reference.png",
                    "primary_role": "Engineering Student & Developer @ Vel Tech High Tech",
                    "organizations": ["Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College", "Open Source Developer Community"],
                    "location": "Chennai, Tamil Nadu, India",
                    "platforms": [
                        {"platform": "LinkedIn Public", "handle": "Sathana Jayaraman", "verified": True, "url": "https://linkedin.com/in/sathana-jayaraman"},
                        {"platform": "GitHub", "handle": "Sathana0511", "verified": True, "url": "https://github.com/Sathana0511"},
                        {"platform": "Instagram", "handle": "itz_sathana", "verified": True, "url": "https://instagram.com/itz_sathana"},
                        {"platform": "College / Institutional Registry", "handle": "Vel Tech High Tech", "verified": True, "url": "https://veltechhightech.com"}
                    ],
                    "status": "SUPPORTED",
                    "status_note": "Multi-signal identity resolution supported across 4 independent public sources without contradiction.",
                    "evidence_count": 18,
                    "supporting_signals": [
                        "Candidate name matches supplied known name 'Sathana Jayaraman'",
                        "GitHub repository owner signature verified for @Sathana0511",
                        "Public LinkedIn professional profile corroborated with institutional college enrollment",
                        "Instagram handle @itz_sathana verified as correlating social endpoint"
                    ],
                    "conflicting_signals": [],
                    "signal_breakdown": [
                        {"name": "Name Match", "matched": True, "status": "match", "detail": "Exact lexical token match for Sathana Jayaraman"},
                        {"name": "Username Match", "matched": True, "status": "match", "detail": "Correlation across GitHub (Sathana0511) & Instagram (itz_sathana)"},
                        {"name": "Organization Match", "matched": True, "status": "match", "detail": "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College"},
                        {"name": "Project Match", "matched": True, "status": "match", "detail": "Public technical repositories and contributions"},
                        {"name": "Timeline Consistency", "matched": True, "status": "match", "detail": "Academic and technical milestones aligned"},
                        {"name": "Independent Evidence", "matched": True, "status": "match", "detail": "4 distinct public sources corroborate identity"},
                        {"name": "Conflicting Evidence", "matched": False, "status": "match", "detail": "No unresolvable identity collisions"}
                    ],
                    "match_score_explanation": "Corroborated across GitHub, LinkedIn, Instagram, and College registry records."
                },
                {
                    "id": "cand-sathana-b",
                    "candidate_code": "Candidate B",
                    "name": "Sathana J. (Disambiguated Entity)",
                    "username": "sathana_j_alt",
                    "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                    "primary_role": "Independent Designer @ Creative Hub",
                    "organizations": ["Independent Design Lab", "Coimbatore Arts Forum"],
                    "location": "Coimbatore, India",
                    "platforms": [
                        {"platform": "Behance", "handle": "sathanadesign", "verified": False, "url": "https://behance.net/sathanadesign"}
                    ],
                    "status": "AMBIGUOUS",
                    "status_note": "Shares given name 'Sathana' but distinct institution and portfolio namespace.",
                    "evidence_count": 4,
                    "supporting_signals": ["Partial given name match"],
                    "conflicting_signals": ["Divergent institution (No Vel Tech link)", "Design portfolio namespace"],
                    "signal_breakdown": [
                        {"name": "Name Match", "matched": True, "status": "match", "detail": "Given name match"},
                        {"name": "Username Match", "matched": False, "status": "conflict", "detail": "Distinct handle namespace"},
                        {"name": "Organization Match", "matched": False, "status": "conflict", "detail": "No Vel Tech affiliation"}
                    ],
                    "match_score_explanation": "TwinGuard isolated to avoid false-positive association."
                },
                {
                    "id": "cand-sathana-c",
                    "candidate_code": "Candidate C",
                    "name": "S. Jayaraman (Peripheral Match)",
                    "username": "s_jayaraman_pub",
                    "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
                    "primary_role": "Senior Research Contributor",
                    "organizations": ["National Science Foundation"],
                    "location": "Bengaluru, India",
                    "platforms": [
                        {"platform": "ResearchGate", "handle": "s_jayaraman", "verified": False, "url": "https://researchgate.net"}
                    ],
                    "status": "INSUFFICIENT EVIDENCE",
                    "status_note": "Single truncated token match without repository or student corroboration.",
                    "evidence_count": 1,
                    "supporting_signals": ["Token string fragment match"],
                    "conflicting_signals": ["Senior faculty timeline incompatible with student profile"],
                    "signal_breakdown": [
                        {"name": "Name Match", "matched": False, "status": "ambiguous", "detail": "Initials only"},
                        {"name": "Username Match", "matched": False, "status": "unverified", "detail": "No handle overlap"},
                        {"name": "Organization Match", "matched": False, "status": "unverified", "detail": "Distinct research lab"}
                    ],
                    "match_score_explanation": "Excluded due to insufficient evidentiary threshold."
                }
            ],
            "dna_signals": [
                {"name": "Visual Signal", "value": 85, "label": "Supporting", "description": "Visual signal available — supporting evidence only."},
                {"name": "Name Signal", "value": 95, "label": "Strong", "description": "Candidate name matches the supplied known name."},
                {"name": "Username Signal", "value": 92, "label": "Strong", "description": "GitHub: Sathana0511, Instagram: itz_sathana, LinkedIn: Sathana Jayaraman"},
                {"name": "Organization Signal", "value": 90, "label": "Strong", "description": "Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College"},
                {"name": "Platform Correlation", "value": 92, "label": "Strong", "description": "Cross-platform multi-identifier corroboration across GitHub, LinkedIn, Instagram"},
                {"name": "Project / Activity Signal", "value": 80, "label": "Supporting", "description": "Public technical projects and open repositories"},
                {"name": "Timeline Signal", "value": 85, "label": "Supported", "description": "Chronological milestones aligned with academic and technical timeline"},
                {"name": "Cross-source Evidence", "value": 88, "label": "Supported", "description": "Corroborated across multiple independent public endpoints"}
            ],
            "nodes": [
                {"id": "node-target", "type": "person", "label": "Sathana Jayaraman", "subtitle": "Target Subject", "avatar": "/sathana_reference.png", "status": "verified", "reliability": "HIGH", "claim_count": 12},
                {"id": "node-linkedin", "type": "profile", "label": "LinkedIn: Sathana Jayaraman", "subtitle": "Professional Profile", "status": "verified", "reliability": "HIGH", "claim_count": 6},
                {"id": "node-github", "type": "profile", "label": "GitHub: Sathana0511", "subtitle": "Public Code Repositories", "status": "verified", "reliability": "HIGH", "claim_count": 8},
                {"id": "node-instagram", "type": "profile", "label": "Instagram: itz_sathana", "subtitle": "Public Social Handle", "status": "verified", "reliability": "MEDIUM", "claim_count": 4},
                {"id": "node-projects", "type": "project", "label": "Public Projects / Contributions", "subtitle": "Technical Repositories", "status": "verified", "reliability": "HIGH", "claim_count": 5},
                {"id": "node-org", "type": "organization", "label": "Vel Tech High Tech", "subtitle": "Engineering College", "status": "verified", "reliability": "HIGH", "claim_count": 7},
                {"id": "node-crypto", "type": "publication", "label": "Cryptographic Ledger", "subtitle": "SHA-256 Provenance", "status": "verified", "reliability": "HIGH", "claim_count": 4}
            ],
            "edges": [
                {"id": "e1", "source": "node-target", "target": "node-linkedin", "label": "profile_of", "status": "verified", "confidence": "96%"},
                {"id": "e2", "source": "node-target", "target": "node-github", "label": "profile_of", "status": "verified", "confidence": "98%"},
                {"id": "e3", "source": "node-target", "target": "node-instagram", "label": "profile_of", "status": "verified", "confidence": "90%"},
                {"id": "e4", "source": "node-target", "target": "node-projects", "label": "contributed_to", "status": "verified", "confidence": "92%"},
                {"id": "e5", "source": "node-target", "target": "node-org", "label": "affiliated_with", "status": "verified", "confidence": "95%"},
                {"id": "e6", "source": "node-target", "target": "node-crypto", "label": "cryptographically_anchored", "status": "verified", "confidence": "100%"}
            ],
            "ai_analyst": {
                "identity_assessment": "Candidate A ('Sathana Jayaraman') is supported by multi-signal correlation across GitHub (@Sathana0511), LinkedIn, Instagram (@itz_sathana), and Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College.",
                "key_evidence": [
                    "Visual reference portrait uploaded and verified as supporting evidence only (never conclusive proof).",
                    "Canonical name match 'Sathana Jayaraman' with matching GitHub handle @Sathana0511.",
                    "Institutional correlation verified with Vel Tech High Tech Dr Rangarajan Dr Sakunthala Engineering College.",
                    "Cross-source correlation across 4 independent public endpoints."
                ],
                "conflicting_evidence": [
                    "TwinGuard successfully evaluated and isolated homonym candidate 'Sathana J.' (Coimbatore) to prevent false-positive association."
                ],
                "unknowns": [
                    "Strict privacy safeguards active: no private emails, phone numbers, or credentials were queryable or ingested."
                ],
                "human_review_recommendation": "Ready for human investigator sign-off. Candidate A is supported by multiple public signals.",
                "generated_at": "2026-03-19T10:00:00Z",
                "model_provenance": "TRACEID AI Identity Resolution Engine v4.2"
            }
        },
        "alex_morgan": {
            "canonical_name": "Alex Morgan",
            "seed_handles": ["alexm_dev", "alex-morgan-ai"],
            "seed_org": "NovaTech Labs",
            "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
            "candidates": [
                {
                    "id": "cand-a",
                    "candidate_code": "Candidate A",
                    "name": "Alex Morgan",
                    "username": "alexm_dev",
                    "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
                    "primary_role": "Machine Learning Engineer / Staff AI Architect @ NovaTech Labs",
                    "organizations": ["NovaTech Labs", "Project Atlas Foundation", "OpenKernel Org", "Stanford AI Lab (Alum)"],
                    "location": "Seattle, WA, USA",
                    "platforms": [
                        {"platform": "GitHub", "handle": "alexm_dev", "verified": True, "url": "https://github.com/alexm_dev"},
                        {"platform": "LinkedIn Public", "handle": "alex-morgan-ai", "verified": True, "url": "https://linkedin.com/in/alex-morgan-ai"},
                        {"platform": "ArXiv", "handle": "a.morgan.1", "verified": True, "url": "https://arxiv.org/a/morgan_a_1"},
                        {"platform": "HuggingFace", "handle": "alexm-novatech", "verified": True, "url": "https://huggingface.co/alexm-novatech"}
                    ],
                    "status": "SUPPORTED",
                    "status_note": "Multi-signal corroboration verified across 8 independent sources with verified PGP commit keys.",
                    "evidence_count": 24,
                    "supporting_signals": [
                        "PGP Key ID 0x8F4E2 matched across GitHub and ArXiv author identity",
                        "Public conference speaker bio matches NovaTech AI Architect title",
                        "Project Atlas lead committer signature verified in git logs",
                        "Academic co-authorship with Stanford AI Lab research group"
                    ],
                    "conflicting_signals": [
                        "Secondary bio listed under 'Berlin Dev Community' contains similar username 'alexm_dev' with different employer"
                    ],
                    "signal_breakdown": [
                        {"name": "Name Match", "matched": True, "status": "match", "detail": "Exact token match on public filings & author lists"},
                        {"name": "Username Match", "matched": True, "status": "match", "detail": "Consistent handle across GitHub, HuggingFace & ArXiv"},
                        {"name": "Organization Match", "matched": True, "status": "match", "detail": "NovaTech Labs employment verified via press releases"},
                        {"name": "Project Match", "matched": True, "status": "match", "detail": "Project Atlas repository created and maintained"},
                        {"name": "Timeline Consistency", "matched": True, "status": "match", "detail": "Uninterrupted chronological career chain 2021-2026"},
                        {"name": "Independent Evidence", "matched": True, "status": "match", "detail": "5 distinct autonomous domains corroborate identity"},
                        {"name": "Conflicting Evidence", "matched": True, "status": "conflict", "detail": "Disambiguation required with Berlin-based Alex Morgan"}
                    ],
                    "match_score_explanation": "Corroborated by 5 distinct domain authorities. High confidence identity resolution with explainable provenance."
                },
                {
                    "id": "cand-b",
                    "candidate_code": "Candidate B",
                    "name": "Alex Morgan",
                    "username": "alex_morgan",
                    "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                    "primary_role": "Research Intern @ Open Systems Research",
                    "organizations": ["Open Systems Research", "Vue Europe", "Berlin JS Meetup"],
                    "location": "Berlin, Germany",
                    "platforms": [
                        {"platform": "GitHub", "handle": "alex_morgan_osr", "verified": True, "url": "https://github.com/alex_morgan_osr"},
                        {"platform": "X / Twitter", "handle": "alex_berlin_tech", "verified": False, "url": "https://x.com/alex_berlin_tech"}
                    ],
                    "status": "AMBIGUOUS",
                    "status_note": "Shares identical name and overlapping research topics, but divergent geographic footprint and employer records.",
                    "evidence_count": 9,
                    "supporting_signals": [
                        "Identical lexical name string 'Alex Morgan'",
                        "Overlapping open-source code discussions"
                    ],
                    "conflicting_signals": [
                        "Full-time residence in Berlin, Germany (2020-2026)",
                        "Different GPG signature keypair (0x3C19B)",
                        "Employer is Open Systems Research / Hyperion Cloud rather than NovaTech Labs"
                    ],
                    "signal_breakdown": [
                        {"name": "Name Match", "matched": True, "status": "match", "detail": "Same canonical name"},
                        {"name": "Username Match", "matched": False, "status": "ambiguous", "detail": "Separate handle namespace"},
                        {"name": "Organization Match", "matched": False, "status": "conflict", "detail": "Open Systems Research != NovaTech Labs"},
                        {"name": "Project Match", "matched": False, "status": "conflict", "detail": "No contributions to Project Atlas"},
                        {"name": "Timeline Consistency", "matched": True, "status": "match", "detail": "Self-consistent European career timeline"},
                        {"name": "Independent Evidence", "matched": True, "status": "match", "detail": "European registry records verified"},
                        {"name": "Conflicting Evidence", "matched": True, "status": "conflict", "detail": "Identified as distinct physical individual by TwinGuard"}
                    ],
                    "match_score_explanation": "TwinGuard successfully separated this candidate to prevent false-positive association."
                },
                {
                    "id": "cand-c",
                    "candidate_code": "Candidate C",
                    "name": "Alex M.",
                    "username": "alextech",
                    "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
                    "primary_role": "Independent Developer / Designer",
                    "organizations": ["Independent Developer"],
                    "location": "Chicago, IL, USA",
                    "platforms": [
                        {"platform": "Dribbble", "handle": "alextech_ui", "verified": True, "url": "https://dribbble.com/alextech_ui"}
                    ],
                    "status": "INSUFFICIENT EVIDENCE",
                    "status_note": "Single truncated name match with zero technical repository links or cryptographic corroboration.",
                    "evidence_count": 2,
                    "supporting_signals": ["Partial name overlap"],
                    "conflicting_signals": ["Domain mismatch", "Zero shared infrastructure or cryptographic footprint"],
                    "signal_breakdown": [
                        {"name": "Name Match", "matched": True, "status": "match", "detail": "Partial name match"},
                        {"name": "Username Match", "matched": False, "status": "conflict", "detail": "Unrelated design handle"},
                        {"name": "Organization Match", "matched": False, "status": "conflict", "detail": "No corporate affiliations found"},
                        {"name": "Project Match", "matched": False, "status": "conflict", "detail": "No software artifacts"},
                        {"name": "Timeline Consistency", "matched": False, "status": "unverified", "detail": "Not investigated further due to early divergence"},
                        {"name": "Independent Evidence", "matched": False, "status": "unverified", "detail": "Insufficient correlation"},
                        {"name": "Conflicting Evidence", "matched": True, "status": "conflict", "detail": "High domain divergence"}
                    ],
                    "match_score_explanation": "Ruled out automatically in early entity resolution stage."
                }
            ],
            "twin_guard": {
                "detected": True,
                "severity": "medium",
                "title": "TwinGuard Disambiguation Alert",
                "subtitle": "Potential False-Match Risk Detected between Candidate A and Candidate B",
                "reasons": [
                    "Identical lexical name 'Alex Morgan'",
                    "High handle similarity ('alexm_dev' vs 'alex_morgan')",
                    "Overlapping participation in generic open-source forums"
                ],
                "candidate_a": {
                    "name": "Alex Morgan (Target Candidate)",
                    "handle": "alexm_dev",
                    "org": "NovaTech Labs (Seattle, WA)",
                    "location": "Seattle, WA, USA",
                    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
                    "key_distinctive_factor": "Co-author of Project Atlas; PGP Signed commits verified; US West Coast timeline"
                },
                "candidate_b": {
                    "name": "Alex Morgan (Disambiguated Entity)",
                    "handle": "alex_morgan",
                    "org": "Open Systems Research (Berlin, Germany)",
                    "location": "Berlin, Germany",
                    "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                    "key_distinctive_factor": "Frontend JavaScript lead; German residency since 2020; No AI systems publication record"
                },
                "recommendation": "Preserve separate entity clusters. Do NOT merge Candidate B into Candidate A digital footprint.",
                "required_action": "Human investigator confirmation logged. TwinGuard separation rule actively enforced."
            },
            "counterfactual": {
                "overall_assessment": "SUPPORTED",
                "assessment_rationale": "Candidate A exhibits dense, mutually corroborating evidence across autonomous public domains, while identified conflicts have been verified as distinct external entities by TwinGuard.",
                "supporting": [
                    {
                        "id": "sup-1",
                        "title": "Organization Match: NovaTech Labs",
                        "category": "organization",
                        "detail": "Confirmed via official NovaTech engineering blog author attribution and 2025 AI Systems Whitepaper.",
                        "source": "novatech.ai/research/team",
                        "confidence_weight": 5
                    },
                    {
                        "id": "sup-2",
                        "title": "Username & Repository Provenance: alexm_dev",
                        "category": "username",
                        "detail": "GitHub account created Feb 2020 contains signed commits matching GPG key fingerprint registered on public keyservers.",
                        "source": "github.com/alexm_dev",
                        "confidence_weight": 5
                    },
                    {
                        "id": "sup-3",
                        "title": "Project Correlation: Project Atlas Core Maintainer",
                        "category": "project",
                        "detail": "Listed in root CODEOWNERS file for Project Atlas open-source repository (12.4k stars).",
                        "source": "github.com/atlas-core/atlas",
                        "confidence_weight": 4
                    },
                    {
                        "id": "sup-4",
                        "title": "Timeline Continuity (2021-2026)",
                        "category": "timeline",
                        "detail": "Unbroken temporal sequence: Stanford Graduate Research → NovaTech Machine Learning Engineer → Staff AI Architect.",
                        "source": "Public academic & corporate records",
                        "confidence_weight": 4
                    },
                    {
                        "id": "sup-5",
                        "title": "Public Conference Keynote Speaker Bio",
                        "category": "publication",
                        "detail": "Featured speaker at CyberSummit 2025 and TechConf 2026 with matching headshot and bio describing NovaTech AI systems.",
                        "source": "cybersummit2025.org/speakers/alex-morgan",
                        "confidence_weight": 4
                    }
                ],
                "contradicting": [
                    {
                        "id": "con-1",
                        "title": "Geographic Anomaly: Berlin Dev Community Post",
                        "category": "location",
                        "detail": "An account under alex_morgan organized an in-person meetup in Berlin during the same month Alex spoke in San Francisco.",
                        "source": "meetup.com/berlin-js-devs",
                        "confidence_weight": 3
                    },
                    {
                        "id": "con-2",
                        "title": "Conflicting Role Descriptor: 'Research Intern'",
                        "category": "role",
                        "detail": "Secondary profile attributed to Open Systems Research in Berlin; resolved by TwinGuard as belonging to Candidate B.",
                        "source": "opensystemsresearch.org/team",
                        "confidence_weight": 3
                    }
                ]
            },
            "timeline": [
                {
                    "id": "tl-1",
                    "year": "2021",
                    "date_range": "Sep 2020 – Jun 2021",
                    "role": "Graduate Research Assistant",
                    "organization": "Stanford AI Laboratory",
                    "category": "Education",
                    "evidence_text": "Co-authored public paper 'Distributed Graph Invariant Representations' indexed on ArXiv (2104.09211).",
                    "source": "Stanford University CS Department Public Directory",
                    "source_reliability": "HIGH",
                    "verified": True
                },
                {
                    "id": "tl-2",
                    "year": "2022",
                    "date_range": "Jul 2021 – Dec 2022",
                    "role": "Machine Learning Engineer",
                    "organization": "NovaTech Labs",
                    "category": "Career",
                    "evidence_text": "Engineered high-throughput feature pipeline for NovaTech foundational models; initial public commits to OpenKernel repository.",
                    "source": "NovaTech Labs Engineering Bulletin #14",
                    "source_reliability": "HIGH",
                    "verified": True
                },
                {
                    "id": "tl-3",
                    "year": "2023",
                    "date_range": "Jan 2023 – Nov 2023",
                    "role": "Open Source Creator & Lead Maintainer",
                    "organization": "Project Atlas Foundation",
                    "category": "Projects",
                    "evidence_text": "Initiated Project Atlas; tagged v1.0.0 release signed with PGP Key 0x8F4E2.",
                    "source": "GitHub Public Release Tag Archive",
                    "source_reliability": "HIGH",
                    "verified": True
                },
                {
                    "id": "tl-4",
                    "year": "2024",
                    "date_range": "Feb 2024 – Dec 2024",
                    "role": "Senior AI Systems Engineer",
                    "organization": "NovaTech Labs",
                    "category": "Career",
                    "evidence_text": "Promoted to lead Systems Architecture team; published benchmark comparison at SystemsML 2024.",
                    "source": "NovaTech Annual Research Review 2024",
                    "source_reliability": "HIGH",
                    "verified": True
                },
                {
                    "id": "tl-5",
                    "year": "2024",
                    "date_range": "May 2024",
                    "role": "Research Intern (Disambiguated Conflict)",
                    "organization": "Open Systems Research (Berlin)",
                    "category": "Career",
                    "evidence_text": "Overlapping role attributed to 'Alex Morgan' in Berlin registry. Resolved by TwinGuard as belonging to Candidate B.",
                    "source": "EU Tech Directory 2024",
                    "source_reliability": "MEDIUM",
                    "is_conflict": True,
                    "conflict_details": "Identical name in Germany during full-time US employment. Flagged and separated by TwinGuard.",
                    "verified": False
                },
                {
                    "id": "tl-6",
                    "year": "2025",
                    "date_range": "Jan 2025 – Present",
                    "role": "Staff AI Systems Architect",
                    "organization": "NovaTech Labs",
                    "category": "Career",
                    "evidence_text": "Keynote presentation at CyberSummit 2025; technical advisor to OpenKernel foundation board.",
                    "source": "CyberSummit 2025 Official Program & NovaTech Directory",
                    "source_reliability": "HIGH",
                    "verified": True
                },
                {
                    "id": "tl-7",
                    "year": "2026",
                    "date_range": "Feb 2026",
                    "role": "Featured Speaker: 'Project Atlas at Scale'",
                    "organization": "TechConf 2026",
                    "category": "Events",
                    "evidence_text": "Presented Project Atlas architecture at TechConf 2026; matching reference portrait and bio.",
                    "source": "TechConf 2026 Proceedings",
                    "source_reliability": "HIGH",
                    "verified": True
                }
            ],
            "dna_signals": [
                {"name": "Visual Signal", "value": 84, "label": "Supported", "description": "Facial landmark consistency across 3 public conference speaker decks"},
                {"name": "Semantic Signal", "value": 92, "label": "Strong", "description": "High syntactic & vocabulary alignment in open-source AI commit messages"},
                {"name": "Contextual Signal", "value": 88, "label": "Strong", "description": "NovaTech Labs affiliation corroborated across SEC public filings and project repos"},
                {"name": "Temporal Signal", "value": 76, "label": "Consistent", "description": "Chronological progression from University intern to Staff AI Architect matches"},
                {"name": "Network Signal", "value": 62, "label": "Partial", "description": "Co-authorship cluster verified with 4 shared peer contributors; 1 unverified link"}
            ],
            "nodes": [
                {"id": "n-subject", "type": "person", "label": "Alex Morgan", "subtitle": "Subject / Target", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", "status": "verified", "reliability": "HIGH", "claim_count": 8},
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
            ],
            "edges": [
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
            ],
            "ai_analyst": {
                "identity_assessment": "Candidate A ('alexm_dev') is strongly supported by multiple independent, verifiable public digital signals spanning 2021 to 2026 with consistent geographic anchors in the Pacific Northwest.",
                "key_evidence": [
                    "Corroborated cryptographic identity: PGP Key 0x8F4E2 anchors GitHub commits, ArXiv author submissions, and Project Atlas releases.",
                    "Corporate affiliation at NovaTech Labs is verified across 4 independent public domains including official blogs, SEC corporate filings, and conference speaker directories.",
                    "Uninterrupted temporal career trajectory with unbroken public contributions from Stanford AI Lab (2021) to Staff AI Architect at NovaTech Labs (2026)."
                ],
                "conflicting_evidence": [
                    "A secondary entity in Berlin ('alex_morgan') shares the canonical name and related handle, but has been isolated by TwinGuard due to divergent technical domains, distinct geographic residency, and incompatible timelines."
                ],
                "unknowns": [
                    "Personal unconsented contact details and private communication channels are strictly omitted in compliance with Responsible Intelligence guidelines.",
                    "Exact project role during Q3 2023 hiatus relies solely on open-source git commit timestamps without third-party employer corroboration."
                ],
                "human_review_recommendation": "Identity resolution is ready for sign-off. Review and acknowledge the TwinGuard separation rule separating Candidate A from the Berlin-based Candidate B.",
                "generated_at": "2026-03-18T10:30:35Z",
                "model_provenance": "TRACEID AI Deterministic Graph Correlator v4.2 + Explainability Engine (Zero-Hallucination Safe Mode)"
            }
        }
    },
    "public_sources": [
        {"id": "src-sathana-1", "source": "LinkedIn Public Profile", "platform": "LinkedIn", "type": "Professional", "reliability": "HIGH", "last_checked": "5 mins ago", "evidence_count": 8, "status": "VERIFIED", "endpoint_or_domain": "linkedin.com/in/sathana-jayaraman", "verified_signatures": 2},
        {"id": "src-sathana-2", "source": "GitHub Developer Profile", "platform": "GitHub API", "type": "Technical", "reliability": "HIGH", "last_checked": "10 mins ago", "evidence_count": 12, "status": "VERIFIED", "endpoint_or_domain": "github.com/Sathana0511", "verified_signatures": 3},
        {"id": "src-sathana-3", "source": "Instagram Public Profile", "platform": "Instagram", "type": "Social", "reliability": "MEDIUM", "last_checked": "15 mins ago", "evidence_count": 4, "status": "VERIFIED", "endpoint_or_domain": "instagram.com/itz_sathana", "verified_signatures": 1},
        {"id": "src-sathana-4", "source": "College / Institutional Directory", "platform": "Vel Tech High Tech College Domain", "type": "Institutional", "reliability": "HIGH", "last_checked": "30 mins ago", "evidence_count": 6, "status": "VERIFIED", "endpoint_or_domain": "veltechhightech.com", "verified_signatures": 2},
        {"id": "src-1", "source": "GitHub Public API & Key Server", "platform": "GitHub / PGP Keyserver", "type": "Technical", "reliability": "HIGH", "last_checked": "12 mins ago", "evidence_count": 16, "status": "VERIFIED", "endpoint_or_domain": "api.github.com / keys.openpgp.org", "verified_signatures": 4},
        {"id": "src-2", "source": "ArXiv Scientific Repository", "platform": "ArXiv.org API", "type": "Publication", "reliability": "HIGH", "last_checked": "1 hour ago", "evidence_count": 4, "status": "VERIFIED", "endpoint_or_domain": "export.arxiv.org/api", "verified_signatures": 2},
        {"id": "src-3", "source": "SEC EDGAR Corporate Filings", "platform": "SEC Public Registries", "type": "Company", "reliability": "HIGH", "last_checked": "3 hours ago", "evidence_count": 3, "status": "VERIFIED", "endpoint_or_domain": "data.sec.gov", "verified_signatures": 1},
        {"id": "src-4", "source": "NovaTech Labs Research Blog", "platform": "Public Company Domain", "type": "Company", "reliability": "HIGH", "last_checked": "20 mins ago", "evidence_count": 8, "status": "VERIFIED", "endpoint_or_domain": "novatech.ai/research", "verified_signatures": 2},
        {"id": "src-5", "source": "CyberSummit 2025 Speaker Portal", "platform": "Conference Web Archives", "type": "Event", "reliability": "HIGH", "last_checked": "1 day ago", "evidence_count": 3, "status": "VERIFIED", "endpoint_or_domain": "cybersummit2025.org", "verified_signatures": 1},
        {"id": "src-6", "source": "TechConf 2026 Keynote Archives", "platform": "Conference Web Archives", "type": "Event", "reliability": "HIGH", "last_checked": "2 days ago", "evidence_count": 2, "status": "VERIFIED", "endpoint_or_domain": "techconf2026.org", "verified_signatures": 1},
        {"id": "src-7", "source": "Stanford University Public Faculty & Alumni Directory", "platform": "University Domain", "type": "Professional", "reliability": "HIGH", "last_checked": "4 hours ago", "evidence_count": 4, "status": "VERIFIED", "endpoint_or_domain": "cs.stanford.edu/people", "verified_signatures": 1},
        {"id": "src-8", "source": "EU Tech Company Index (Berlin)", "platform": "EU Business Registry", "type": "Company", "reliability": "MEDIUM", "last_checked": "6 hours ago", "evidence_count": 3, "status": "CONFLICTING", "endpoint_or_domain": "handelsregister.de", "verified_signatures": 0},
        {"id": "src-9", "source": "StackOverflow Public Data Dump", "platform": "Developer Q&A", "type": "Technical", "reliability": "MEDIUM", "last_checked": "12 hours ago", "evidence_count": 5, "status": "VERIFIED", "endpoint_or_domain": "data.stackexchange.com", "verified_signatures": 0},
        {"id": "src-10", "source": "YouTube Public Tech Talk Archive", "platform": "YouTube Channel", "type": "Media", "reliability": "MEDIUM", "last_checked": "3 days ago", "evidence_count": 2, "status": "VERIFIED", "endpoint_or_domain": "youtube.com/@novatech_ai", "verified_signatures": 0}
    ]
}
