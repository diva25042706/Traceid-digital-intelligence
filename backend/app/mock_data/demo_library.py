from typing import Dict, Any

DEMO_PERSON_LIBRARY: Dict[str, Any] = {
    "satya nadella": {
        "canonical_name": "Satya Nadella",
        "alias": "satyanadella",
        "organization": "Microsoft",
        "role": "Chairman and Chief Executive Officer",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
        "biography_summary": "Satya Narayana Nadella is an Indian-American business executive who serves as the executive chairman and CEO of Microsoft, succeeding Steve Ballmer in 2014 and John W. Thompson in 2021.",
        "wikipedia_url": "https://en.wikipedia.org/wiki/Satya_Nadella",
        "wikidata_id": "Q3950853",
        "candidates": [
            {
                "id": "cand-satya-a",
                "candidate_code": "Candidate A",
                "name": "Satya Nadella",
                "username": "satyanadella",
                "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                "primary_role": "Executive Chairman & CEO @ Microsoft",
                "organizations": ["Microsoft", "University of Chicago Booth (Trustee)", "Fred Hutchinson Cancer Center"],
                "location": "Redmond, WA, USA",
                "platforms": [
                    {"platform": "LinkedIn Public", "handle": "satyanadella", "verified": True, "url": "https://linkedin.com/in/satyanadella"},
                    {"platform": "X / Twitter", "handle": "satyanadella", "verified": True, "url": "https://x.com/satyanadella"},
                    {"platform": "GitHub (Org Sponsor)", "handle": "satyanadella", "verified": True, "url": "https://github.com/satyanadella"},
                    {"platform": "Wikipedia", "handle": "Satya_Nadella", "verified": True, "url": "https://en.wikipedia.org/wiki/Satya_Nadella"}
                ],
                "status": "SUPPORTED",
                "status_note": "Unambiguous multi-signal verification across SEC filings, official Microsoft directories, and global media archives.",
                "evidence_count": 38,
                "supporting_signals": [
                    "Official Microsoft Board & Executive Directory match",
                    "SEC Form 8-K / 10-K filing executive officer attribution",
                    "Continuous leadership tenure from 1992 to present",
                    "Verified public addresses at Microsoft Build & Ignite keynotes"
                ],
                "conflicting_signals": [],
                "signal_breakdown": [
                    {"name": "Name Match", "matched": True, "status": "match", "detail": "Exact canonical match on SEC & corporate registry"},
                    {"name": "Username Match", "matched": True, "status": "match", "detail": "Verified public handle @satyanadella across LinkedIn & X"},
                    {"name": "Organization Match", "matched": True, "status": "match", "detail": "Microsoft employment active since 1992 (CEO since 2014)"},
                    {"name": "Project Match", "matched": True, "status": "match", "detail": "Microsoft Cloud & AI Transformation leadership"},
                    {"name": "Timeline Consistency", "matched": True, "status": "match", "detail": "Flawless chronological career chain (1992-2026)"},
                    {"name": "Independent Evidence", "matched": True, "status": "match", "detail": "Corroborated across 12 autonomous public domains"},
                    {"name": "Conflicting Evidence", "matched": False, "status": "match", "detail": "Zero conflicting corporate claims identified"}
                ],
                "match_score_explanation": "Verified with Highest Public Confidence. Corroborated by official SEC filings and global enterprise registries."
            },
            {
                "id": "cand-satya-b",
                "candidate_code": "Candidate B",
                "name": "Satya N. (Disambiguated Student)",
                "username": "satya_n_dev",
                "avatar_url": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
                "primary_role": "Computer Science Graduate Student @ UT Austin",
                "organizations": ["University of Texas at Austin"],
                "location": "Austin, TX, USA",
                "platforms": [
                    {"platform": "GitHub", "handle": "satya_n_dev", "verified": False, "url": "https://github.com"}
                ],
                "status": "AMBIGUOUS",
                "status_note": "Shared first name and initial only. Isolated by TwinGuard to prevent homonym collision.",
                "evidence_count": 4,
                "supporting_signals": ["Partial name token match"],
                "conflicting_signals": ["Student enrollment vs Corporate Executive", "Austin geography vs Seattle"],
                "signal_breakdown": [
                    {"name": "Name Match", "matched": True, "status": "match", "detail": "Partial token overlap"},
                    {"name": "Username Match", "matched": False, "status": "conflict", "detail": "Student handle"},
                    {"name": "Organization Match", "matched": False, "status": "conflict", "detail": "UT Austin != Microsoft"},
                    {"name": "Project Match", "matched": False, "status": "conflict", "detail": "Coursework repositories"},
                    {"name": "Timeline Consistency", "matched": False, "status": "unverified", "detail": "Academic timeline 2024-2026"},
                    {"name": "Independent Evidence", "matched": False, "status": "unverified", "detail": "Single unverified profile"},
                    {"name": "Conflicting Evidence", "matched": True, "status": "conflict", "detail": "Isolated by TwinGuard"}
                ],
                "match_score_explanation": "TwinGuard rule active. Ruled out as distinct individual."
            }
        ],
        "twin_guard": {
            "detected": True,
            "severity": "low",
            "title": "TwinGuard Disambiguation Notice",
            "subtitle": "Homonym Isolation: Distinguished Target CEO from unrelated academic profiles",
            "reasons": [
                "Unique canonical namespace for executive public records",
                "Isolated student profiles sharing similar first name tokens"
            ],
            "candidate_a": {
                "name": "Satya Nadella (Target Subject)",
                "handle": "satyanadella",
                "org": "Microsoft (Redmond, WA)",
                "location": "Redmond, WA, USA",
                "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                "key_distinctive_factor": "Executive Chairman & CEO of Microsoft; 30+ year public leadership record"
            },
            "candidate_b": {
                "name": "Satya N. (Student Entity)",
                "handle": "satya_n_dev",
                "org": "UT Austin (Austin, TX)",
                "location": "Austin, TX, USA",
                "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
                "key_distinctive_factor": "Graduate student; No enterprise corporate executive filings"
            },
            "recommendation": "Maintain strict separation. Do NOT merge student profiles into executive footprint.",
            "required_action": "TwinGuard automated separation enforced."
        },
        "counterfactual": {
            "overall_assessment": "HIGH CONFIDENCE",
            "assessment_rationale": "Identity verified with dense, multi-decade corroboration across official SEC registries, global press archives, and academic boards.",
            "supporting": [
                {
                    "id": "sup-satya-1",
                    "title": "Official Microsoft Leadership Directory",
                    "category": "organization",
                    "detail": "Listed as Executive Chairman and CEO on official Microsoft News Center & Investor Relations.",
                    "source": "microsoft.com/en-us/about/leadership",
                    "confidence_weight": 5
                },
                {
                    "id": "sup-satya-2",
                    "title": "SEC EDGAR Form 10-K Executive Listing",
                    "category": "organization",
                    "detail": "Formally registered as Principal Executive Officer on Microsoft Annual Reports filed with the US SEC.",
                    "source": "sec.gov/edgar/data/789019",
                    "confidence_weight": 5
                },
                {
                    "id": "sup-satya-3",
                    "title": "Wikidata Entity Q3950853",
                    "category": "publication",
                    "detail": "Cross-referenced with 80+ international national library identifiers and verified official accounts.",
                    "source": "wikidata.org/wiki/Q3950853",
                    "confidence_weight": 5
                },
                {
                    "id": "sup-satya-4",
                    "title": "Keynote Speaker: Microsoft Build & Ignite",
                    "category": "project",
                    "detail": "Delivered annual flagship technical keynotes on Azure, Windows, and Microsoft AI infrastructure (2014-2026).",
                    "source": "build.microsoft.com",
                    "confidence_weight": 5
                }
            ],
            "contradicting": []
        },
        "timeline": [
            {
                "id": "tl-s1",
                "year": "1992",
                "date_range": "1992",
                "role": "Joined Microsoft (Windows NT Team)",
                "organization": "Microsoft",
                "category": "Career",
                "evidence_text": "Joined Microsoft as a member of technical staff in the Windows NT group.",
                "source": "Microsoft Historical Archives",
                "source_reliability": "HIGH",
                "verified": True
            },
            {
                "id": "tl-s2",
                "year": "2011",
                "date_range": "2011 – 2014",
                "role": "President of Server & Tools Business",
                "organization": "Microsoft",
                "category": "Career",
                "evidence_text": "Led the transformation to Cloud OS and Azure cloud infrastructure.",
                "source": "Microsoft Press Release",
                "source_reliability": "HIGH",
                "verified": True
            },
            {
                "id": "tl-s3",
                "year": "2014",
                "date_range": "Feb 2014 – Present",
                "role": "Chief Executive Officer",
                "organization": "Microsoft",
                "category": "Career",
                "evidence_text": "Appointed Chief Executive Officer of Microsoft Corporation.",
                "source": "SEC Form 8-K Filing",
                "source_reliability": "HIGH",
                "verified": True
            },
            {
                "id": "tl-s4",
                "year": "2021",
                "date_range": "Jun 2021 – Present",
                "role": "Executive Chairman of the Board",
                "organization": "Microsoft",
                "category": "Career",
                "evidence_text": "Unanimously elected Executive Chairman of Microsoft Board of Directors.",
                "source": "Microsoft Investor Relations",
                "source_reliability": "HIGH",
                "verified": True
            },
            {
                "id": "tl-s5",
                "year": "2026",
                "date_range": "Jan 2026",
                "role": "Keynote Speaker: 'Copilot AI Systems'",
                "organization": "World Economic Forum (Davos)",
                "category": "Events",
                "evidence_text": "Delivered special address on AI governance and enterprise productivity.",
                "source": "WEF Official Program 2026",
                "source_reliability": "HIGH",
                "verified": True
            }
        ],
        "dna_signals": [
            {"name": "Visual Signal", "value": 94, "label": "Supported", "description": "High facial feature alignment across public keynote broadcasts & official portraits"},
            {"name": "Semantic Signal", "value": 96, "label": "Strong", "description": "Executive shareholder letters and technology leadership vocabulary consistency"},
            {"name": "Contextual Signal", "value": 98, "label": "Strong", "description": "Flawless corporate directory & SEC regulatory filings corroboration"},
            {"name": "Temporal Signal", "value": 95, "label": "Consistent", "description": "Unbroken 34-year tenure at Microsoft Corporation"},
            {"name": "Network Signal", "value": 90, "label": "Strong", "description": "Extensive corporate board and academic trustee relational lattice"}
        ]
    },
    "sundar pichai": {
        "canonical_name": "Sundar Pichai",
        "alias": "sundarpichai",
        "organization": "Google / Alphabet",
        "role": "Chief Executive Officer",
        "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
        "biography_summary": "Pichai Sundararajan, known as Sundar Pichai, is an Indian-American business executive. He is the CEO of Alphabet Inc. and its subsidiary Google.",
        "wikipedia_url": "https://en.wikipedia.org/wiki/Sundar_Pichai",
        "wikidata_id": "Q17488880",
        "candidates": [
            {
                "id": "cand-sundar-a",
                "candidate_code": "Candidate A",
                "name": "Sundar Pichai",
                "username": "sundarpichai",
                "avatar_url": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
                "primary_role": "CEO @ Alphabet and Google",
                "organizations": ["Alphabet Inc.", "Google", "Stanford University (Alum)", "IIT Kharagpur (Alum)"],
                "location": "Mountain View, CA, USA",
                "platforms": [
                    {"platform": "LinkedIn Public", "handle": "sundarpichai", "verified": True, "url": "https://linkedin.com/in/sundarpichai"},
                    {"platform": "X / Twitter", "handle": "sundarpichai", "verified": True, "url": "https://x.com/sundarpichai"},
                    {"platform": "Wikipedia", "handle": "Sundar_Pichai", "verified": True, "url": "https://en.wikipedia.org/wiki/Sundar_Pichai"}
                ],
                "status": "SUPPORTED",
                "status_note": "Multi-signal corroboration verified across SEC filings, official Google I/O keynotes, and academic registries.",
                "evidence_count": 35,
                "supporting_signals": [
                    "Alphabet SEC Form 10-K CEO attribution",
                    "Google I/O annual opening keynote leadership (2015-2026)",
                    "Stanford University Graduate School of Engineering distinguished alum"
                ],
                "conflicting_signals": [],
                "signal_breakdown": [
                    {"name": "Name Match", "matched": True, "status": "match", "detail": "Exact canonical name"},
                    {"name": "Username Match", "matched": True, "status": "match", "detail": "Verified handle @sundarpichai"},
                    {"name": "Organization Match", "matched": True, "status": "match", "detail": "Alphabet & Google CEO"},
                    {"name": "Project Match", "matched": True, "status": "match", "detail": "Chrome, Android & Gemini AI leadership"},
                    {"name": "Timeline Consistency", "matched": True, "status": "match", "detail": "Continuous tenure 2004-2026"},
                    {"name": "Independent Evidence", "matched": True, "status": "match", "detail": "14 autonomous global authorities"},
                    {"name": "Conflicting Evidence", "matched": False, "status": "match", "detail": "Zero conflicting corporate records"}
                ],
                "match_score_explanation": "Confirmed with High Public Confidence across verified SEC & corporate portals."
            }
        ],
        "twin_guard": {
            "detected": False,
            "severity": "low",
            "title": "TwinGuard Clear: No False-Match Collisions",
            "subtitle": "Unique global executive namespace",
            "reasons": ["Unambiguous official executive records"],
            "candidate_a": {"name": "Sundar Pichai", "handle": "sundarpichai", "org": "Alphabet / Google", "location": "Mountain View, CA", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces", "key_distinctive_factor": "CEO of Alphabet and Google"},
            "candidate_b": {"name": "None", "handle": "n/a", "org": "n/a", "location": "n/a", "avatar": "", "key_distinctive_factor": "No collisions found"},
            "recommendation": "Proceed with verified assessment.",
            "required_action": "None required."
        },
        "counterfactual": {
            "overall_assessment": "HIGH CONFIDENCE",
            "assessment_rationale": "High-confidence corporate and academic verification.",
            "supporting": [
                {"id": "sup-sp-1", "title": "Alphabet Inc. Leadership Index", "category": "organization", "detail": "Chief Executive Officer of Alphabet & Google.", "source": "abc.xyz/investor", "confidence_weight": 5},
                {"id": "sup-sp-2", "title": "Google I/O Keynote Speaker", "category": "project", "detail": "Lead keynote speaker announcing Android & Gemini AI systems.", "source": "io.google", "confidence_weight": 5}
            ],
            "contradicting": []
        },
        "timeline": [
            {"id": "tl-sp1", "year": "2004", "date_range": "2004", "role": "Joined Google (Product Management)", "organization": "Google", "category": "Career", "evidence_text": "Led product management for Google Chrome and ChromeOS.", "source": "Google History", "source_reliability": "HIGH", "verified": True},
            {"id": "tl-sp2", "year": "2015", "date_range": "2015 – Present", "role": "Chief Executive Officer", "organization": "Google", "category": "Career", "evidence_text": "Appointed CEO of Google LLC upon Alphabet restructuring.", "source": "SEC Form 8-K", "source_reliability": "HIGH", "verified": True},
            {"id": "tl-sp3", "year": "2019", "date_range": "2019 – Present", "role": "Chief Executive Officer", "organization": "Alphabet Inc.", "category": "Career", "evidence_text": "Assumed CEO leadership of Alphabet parent entity.", "source": "Alphabet Investor Relations", "source_reliability": "HIGH", "verified": True}
        ],
        "dna_signals": [
            {"name": "Visual Signal", "value": 92, "label": "Supported", "description": "Facial landmark consistency across broadcast keynotes"},
            {"name": "Semantic Signal", "value": 94, "label": "Strong", "description": "Google product strategy and AI-first mission syntax"},
            {"name": "Contextual Signal", "value": 98, "label": "Strong", "description": "SEC corporate filings alignment"},
            {"name": "Temporal Signal", "value": 96, "label": "Consistent", "description": "Continuous tenure since 2004"},
            {"name": "Network Signal", "value": 88, "label": "Strong", "description": "Global enterprise executive lattice"}
        ]
    },
    "jensen huang": {
        "canonical_name": "Jensen Huang",
        "alias": "jensenhuang",
        "organization": "NVIDIA",
        "role": "Founder and Chief Executive Officer",
        "avatar_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=200&h=200&fit=crop&crop=faces",
        "biography_summary": "Jen-Hsun 'Jensen' Huang is a Taiwanese-American business executive and electrical engineer who co-founded Nvidia in 1993 and serves as its president and CEO.",
        "wikipedia_url": "https://en.wikipedia.org/wiki/Jensen_Huang",
        "wikidata_id": "Q596541",
        "candidates": [
            {
                "id": "cand-jensen-a",
                "candidate_code": "Candidate A",
                "name": "Jensen Huang",
                "username": "jensenhuang",
                "avatar_url": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces",
                "primary_role": "Founder, President & CEO @ NVIDIA",
                "organizations": ["NVIDIA", "Stanford University (Trustee/Alum)", "Oregon State University (Alum)"],
                "location": "Santa Clara, CA, USA",
                "platforms": [
                    {"platform": "NVIDIA Official", "handle": "leadership/jensen-huang", "verified": True, "url": "https://nvidianews.nvidia.com/bios/jen-hsun-huang"},
                    {"platform": "Wikipedia", "handle": "Jensen_Huang", "verified": True, "url": "https://en.wikipedia.org/wiki/Jensen_Huang"}
                ],
                "status": "SUPPORTED",
                "status_note": "Multi-signal corroboration verified across 30+ years of SEC filings, GTC keynotes, and patent filings.",
                "evidence_count": 40,
                "supporting_signals": ["NVIDIA Co-founder since 1993", "GTC Keynote speaker", "National Academy of Engineering member"],
                "conflicting_signals": [],
                "signal_breakdown": [
                    {"name": "Name Match", "matched": True, "status": "match", "detail": "Exact matching name"},
                    {"name": "Username Match", "matched": True, "status": "match", "detail": "Official leadership reference"},
                    {"name": "Organization Match", "matched": True, "status": "match", "detail": "NVIDIA Founder & CEO"},
                    {"name": "Project Match", "matched": True, "status": "match", "detail": "CUDA, Hopper, Blackwell GPU architecture"},
                    {"name": "Timeline Consistency", "matched": True, "status": "match", "detail": "Unbroken tenure 1993-2026"},
                    {"name": "Independent Evidence", "matched": True, "status": "match", "detail": "Corroborated across 15+ autonomous registers"},
                    {"name": "Conflicting Evidence", "matched": False, "status": "match", "detail": "Zero conflicting corporate records"}
                ],
                "match_score_explanation": "Highest confidence public hardware & AI architecture provenance."
            }
        ],
        "twin_guard": {
            "detected": False,
            "severity": "low",
            "title": "TwinGuard Clear",
            "subtitle": "Unambiguous founder and CEO namespace",
            "reasons": ["Unbroken public corporate ledger"],
            "candidate_a": {"name": "Jensen Huang", "handle": "jensenhuang", "org": "NVIDIA", "location": "Santa Clara, CA", "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&fit=crop&crop=faces", "key_distinctive_factor": "Co-founder & CEO of NVIDIA"},
            "candidate_b": {"name": "None", "handle": "n/a", "org": "n/a", "location": "n/a", "avatar": "", "key_distinctive_factor": "No collisions found"},
            "recommendation": "Proceed with verified status.",
            "required_action": "None."
        },
        "counterfactual": {
            "overall_assessment": "HIGH CONFIDENCE",
            "assessment_rationale": "Overwhelming public evidence verified.",
            "supporting": [
                {"id": "sup-jh-1", "title": "NVIDIA Executive Profile", "category": "organization", "detail": "Co-founder, President and CEO of NVIDIA Corporation.", "source": "nvidianews.nvidia.com", "confidence_weight": 5}
            ],
            "contradicting": []
        },
        "timeline": [
            {"id": "tl-jh1", "year": "1993", "date_range": "1993", "role": "Co-Founded NVIDIA", "organization": "NVIDIA", "category": "Career", "evidence_text": "Co-founded NVIDIA with Chris Malachowsky and Curtis Priem.", "source": "NVIDIA SEC Filings", "source_reliability": "HIGH", "verified": True},
            {"id": "tl-jh2", "year": "2006", "date_range": "2006", "role": "Announced CUDA Architecture", "organization": "NVIDIA", "category": "Projects", "evidence_text": "Introduced CUDA parallel computing platform.", "source": "NVIDIA Technical Archive", "source_reliability": "HIGH", "verified": True},
            {"id": "tl-jh3", "year": "2026", "date_range": "2026", "role": "Keynote Speaker: GTC 2026", "organization": "NVIDIA", "category": "Events", "evidence_text": "Unveiled next-generation accelerated AI computing platforms.", "source": "NVIDIA GTC Proceedings", "source_reliability": "HIGH", "verified": True}
        ],
        "dna_signals": [
            {"name": "Visual Signal", "value": 96, "label": "Supported", "description": "Distinctive landmark alignment across keynotes"},
            {"name": "Semantic Signal", "value": 98, "label": "Strong", "description": "Parallel computing and accelerated systems domain vocabulary"},
            {"name": "Contextual Signal", "value": 99, "label": "Strong", "description": "SEC registration and corporate executive status"},
            {"name": "Temporal Signal", "value": 98, "label": "Consistent", "description": "33-year continuous CEO leadership"},
            {"name": "Network Signal", "value": 92, "label": "Strong", "description": "Semiconductor and AI industry co-authorship & patents"}
        ]
    },
    "andrew ng": {
        "canonical_name": "Andrew Ng",
        "alias": "andrewng",
        "organization": "DeepLearning.AI / Stanford",
        "role": "Founder and Professor",
        "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=faces",
        "biography_summary": "Andrew Yan-Tak Ng is a British-American computer scientist and technology entrepreneur. He was a co-founder and head of Google Brain and was the former Chief Scientist at Baidu.",
        "wikipedia_url": "https://en.wikipedia.org/wiki/Andrew_Ng",
        "wikidata_id": "Q4758133",
        "candidates": [
            {
                "id": "cand-andrew-a",
                "candidate_code": "Candidate A",
                "name": "Andrew Ng",
                "username": "andrewng",
                "avatar_url": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
                "primary_role": "Adjunct Professor @ Stanford, Founder @ DeepLearning.AI",
                "organizations": ["Stanford University", "DeepLearning.AI", "Coursera (Co-founder)", "AI Fund"],
                "location": "Palo Alto, CA, USA",
                "platforms": [
                    {"platform": "LinkedIn Public", "handle": "andrewng", "verified": True, "url": "https://linkedin.com/in/andrewng"},
                    {"platform": "X / Twitter", "handle": "AndrewYNg", "verified": True, "url": "https://x.com/AndrewYNg"},
                    {"platform": "GitHub", "handle": "andrewng", "verified": True, "url": "https://github.com/andrewng"},
                    {"platform": "Coursera", "handle": "instructor/andrewng", "verified": True, "url": "https://coursera.org/instructor/andrewng"}
                ],
                "status": "SUPPORTED",
                "status_note": "Multi-signal academic, entrepreneurial, and publication verification across Coursera, Stanford, and Google Brain.",
                "evidence_count": 32,
                "supporting_signals": ["Stanford CS Faculty", "Coursera Co-founder", "DeepLearning.AI Founder", "Google Brain founding lead"],
                "conflicting_signals": [],
                "signal_breakdown": [
                    {"name": "Name Match", "matched": True, "status": "match", "detail": "Exact canonical name"},
                    {"name": "Username Match", "matched": True, "status": "match", "detail": "Verified handle @AndrewYNg"},
                    {"name": "Organization Match", "matched": True, "status": "match", "detail": "Stanford University & DeepLearning.AI"},
                    {"name": "Project Match", "matched": True, "status": "match", "detail": "Machine Learning Specialization on Coursera"},
                    {"name": "Timeline Consistency", "matched": True, "status": "match", "detail": "Consistent academic & entrepreneurial career"},
                    {"name": "Independent Evidence", "matched": True, "status": "match", "detail": "10+ independent academic & corporate sources"},
                    {"name": "Conflicting Evidence", "matched": False, "status": "match", "detail": "Zero conflicting claims"}
                ],
                "match_score_explanation": "Flawless academic and public online education identity footprint."
            }
        ],
        "twin_guard": {
            "detected": False,
            "severity": "low",
            "title": "TwinGuard Clear",
            "subtitle": "Unique AI pioneer public profile",
            "reasons": ["Academic and educational persistent records"],
            "candidate_a": {"name": "Andrew Ng", "handle": "AndrewYNg", "org": "Stanford / DeepLearning.AI", "location": "Palo Alto, CA", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces", "key_distinctive_factor": "Stanford Professor, Coursera & DeepLearning.AI Founder"},
            "candidate_b": {"name": "None", "handle": "n/a", "org": "n/a", "location": "n/a", "avatar": "", "key_distinctive_factor": "No collisions found"},
            "recommendation": "Proceed with verified assessment.",
            "required_action": "None."
        },
        "counterfactual": {
            "overall_assessment": "HIGH CONFIDENCE",
            "assessment_rationale": "High-confidence academic and entrepreneurial footprint.",
            "supporting": [
                {"id": "sup-an-1", "title": "Stanford CS Faculty Directory", "category": "organization", "detail": "Adjunct Professor of Computer Science at Stanford University.", "source": "cs.stanford.edu", "confidence_weight": 5}
            ],
            "contradicting": []
        },
        "timeline": [
            {"id": "tl-an1", "year": "2002", "date_range": "2002 – Present", "role": "Professor / Faculty", "organization": "Stanford University", "category": "Education", "evidence_text": "Joined Stanford Computer Science faculty.", "source": "Stanford Directory", "source_reliability": "HIGH", "verified": True},
            {"id": "tl-an2", "year": "2011", "date_range": "2011 – 2012", "role": "Founder & Lead", "organization": "Google Brain", "category": "Projects", "evidence_text": "Founded Google Brain deep learning project at Google X.", "source": "Google Research", "source_reliability": "HIGH", "verified": True},
            {"id": "tl-an3", "year": "2012", "date_range": "2012", "role": "Co-Founder", "organization": "Coursera", "category": "Career", "evidence_text": "Co-founded Coursera with Daphne Koller.", "source": "Coursera Press", "source_reliability": "HIGH", "verified": True}
        ],
        "dna_signals": [
            {"name": "Visual Signal", "value": 90, "label": "Supported", "description": "Consistent course lecture video features"},
            {"name": "Semantic Signal", "value": 95, "label": "Strong", "description": "Machine learning education and neural network lexicon"},
            {"name": "Contextual Signal", "value": 96, "label": "Strong", "description": "Stanford academic registry confirmation"},
            {"name": "Temporal Signal", "value": 94, "label": "Consistent", "description": "Linear timeline from PhD to Professor and Founder"},
            {"name": "Network Signal", "value": 92, "label": "Strong", "description": "Co-authorship network with top AI scientists"}
        ]
    }
}
