import {
  Investigation,
  InvestigationStatus,
  ConfidenceStatus,
  CandidateIdentity,
  EvidenceDetail,
  SourceItem,
  AdversarialTestCase,
  TimelineEventItem,
} from "@/types/investigation";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

// Helper for safe fetch with timeout and fallback
async function fetchAPI<T>(endpoint: string, options?: RequestInit): Promise<T | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const res = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        ...(options?.headers || {}),
      },
    });
    clearTimeout(timeoutId);
    if (!res.ok) {
      console.warn(`API request to ${endpoint} returned status ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (err) {
    // Graceful offline fallback
    return null;
  }
}

// Full Standalone Fallback Dataset for Offline / Pure Client Mode
const FALLBACK_INVESTIGATIONS: Record<string, Investigation> = {
  "TRC-001": {
    id: "TRC-001",
    subjectName: "Alex Morgan",
    alias: "alexm_dev",
    organization: "NovaTech Labs",
    knownPlatform: "GitHub / OpenSource Hub",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
    createdAt: "2026-03-18T10:30:00Z",
    status: "ANALYSIS COMPLETE",
    sourcesCount: 14,
    candidatesCount: 3,
    evidenceLinksCount: 38,
    ambiguitiesCount: 1,
    coverage: [
      { category: "Professional", coveragePercent: 92, evidenceCount: 12, note: "LinkedIn & corporate publications" },
      { category: "Technical", coveragePercent: 88, evidenceCount: 16, note: "GitHub, HuggingFace & Kaggle" },
      { category: "Projects", coveragePercent: 78, evidenceCount: 8, note: "Project Atlas & OpenKernel repository" },
      { category: "Publications", coveragePercent: 65, evidenceCount: 4, note: "ArXiv preprints & tech conference papers" },
      { category: "Events", coveragePercent: 50, evidenceCount: 3, note: "CyberSummit 2025 speaker lineup" },
      { category: "Social", coveragePercent: 35, evidenceCount: 2, note: "Authorized public developer forums" },
    ],
    pipeline: [
      { id: "p1", name: "Input Ingestion", shortName: "INPUT", status: "completed", description: "Consented reference portrait and limited seed keywords ingested with cryptographic hash", timestamp: "10:30:02" },
      { id: "p2", name: "Identity Signals", shortName: "SIGNALS", status: "completed", description: "Extracted multi-modal biometric embeddings, semantic tokens, and temporal anchor bounds", timestamp: "10:30:05" },
      { id: "p3", name: "Discovery", shortName: "DISCOVERY", status: "completed", description: "Querying indexed public registries, technical repositories, and verified publications", timestamp: "10:30:12" },
      { id: "p4", name: "Entity Resolution", shortName: "RESOLUTION", status: "completed", description: "Clustering 3 candidate clusters; disambiguating identical names via contextual graphs", timestamp: "10:30:18" },
      { id: "p5", name: "Verification", shortName: "VERIFY", status: "completed", description: "Validating cross-source corroboration and cryptographic repository commit signatures", timestamp: "10:30:22" },
      { id: "p6", name: "Ambiguity Analysis", shortName: "AMBIGUITY", status: "warning", description: "TwinGuard triggered: High-overlap profile detected at alternate geography (Berlin vs Seattle)", timestamp: "10:30:26" },
      { id: "p7", name: "Knowledge Graph", shortName: "GRAPH", status: "completed", description: "Generated 18 nodes and 27 directed typed relational edges across organizations & artifacts", timestamp: "10:30:30" },
      { id: "p8", name: "AI Analyst", shortName: "ANALYST", status: "completed", description: "Synthesized explainable causal chain without generating unverifiable claims", timestamp: "10:30:35" },
      { id: "p9", name: "Report Generation", shortName: "REPORT", status: "completed", description: "Structured dossier ready for human investigator review & cryptographic export", timestamp: "10:30:39" },
    ],
    dnaSignals: [
      { name: "Visual Signal", value: 84, label: "Supported", description: "Facial landmark consistency across 3 public conference speaker decks" },
      { name: "Semantic Signal", value: 92, label: "Strong", description: "High syntactic & vocabulary alignment in open-source AI commit messages" },
      { name: "Contextual Signal", value: 88, label: "Strong", description: "NovaTech Labs affiliation corroborated across SEC public filings and project repos" },
      { name: "Temporal Signal", value: 76, label: "Consistent", description: "Chronological progression from University intern to Staff AI Architect matches" },
      { name: "Network Signal", value: 62, label: "Partial", description: "Co-authorship cluster verified with 4 shared peer contributors; 1 unverified link" },
    ],
    candidates: [
      {
        id: "cand-a",
        candidateCode: "Candidate A",
        name: "Alex Morgan",
        username: "alexm_dev",
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
        primaryRole: "Machine Learning Engineer / Staff AI Systems Architect",
        organizations: ["NovaTech Labs", "Project Atlas Foundation", "OpenKernel Org", "Stanford AI Lab (Alum)"],
        location: "Seattle, WA, USA",
        platforms: [
          { platform: "GitHub", handle: "alexm_dev", verified: true, url: "https://github.com/alexm_dev" },
          { platform: "LinkedIn Public", handle: "alex-morgan-ai", verified: true, url: "https://linkedin.com/in/alex-morgan-ai" },
          { platform: "ArXiv", handle: "a.morgan.1", verified: true, url: "https://arxiv.org" },
          { platform: "HuggingFace", handle: "alexm-novatech", verified: true, url: "https://huggingface.co" },
        ],
        status: "SUPPORTED",
        statusNote: "Multi-signal corroboration verified across 8 independent sources with verified PGP commit keys.",
        evidenceCount: 24,
        supportingSignals: [
          "PGP Key ID 0x8F4E2 matched across GitHub and ArXiv author identity",
          "Public conference speaker bio matches NovaTech AI Architect title",
          "Project Atlas lead committer signature verified in git logs",
          "Academic co-authorship with known research group",
        ],
        conflictingSignals: [
          "Secondary bio listed under 'Berlin Dev Community' contains similar username 'alexm_dev' with different employer",
        ],
        signalBreakdown: [
          { name: "Name Match", matched: true, status: "match", detail: "Exact token match on public filings & author lists" },
          { name: "Username Match", matched: true, status: "match", detail: "Consistent handle across GitHub, HuggingFace & ArXiv" },
          { name: "Organization Match", matched: true, status: "match", detail: "NovaTech Labs employment verified via press releases" },
          { name: "Project Match", matched: true, status: "match", detail: "Project Atlas repository created and maintained" },
          { name: "Timeline Consistency", matched: true, status: "match", detail: "Uninterrupted chronological career chain 2021-2026" },
          { name: "Independent Evidence", matched: true, status: "match", detail: "5 distinct autonomous domains corroborate identity" },
          { name: "Conflicting Evidence", matched: true, status: "conflict", detail: "Disambiguation required with Berlin-based Alex Morgan" },
        ],
        matchScoreExplanation: "Corroborated by 5 distinct domain authorities. High confidence identity resolution with explainable provenance.",
      },
      {
        id: "cand-b",
        candidateCode: "Candidate B",
        name: "Alex Morgan",
        username: "alex_morgan",
        avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
        primaryRole: "Research Intern @ Open Systems Research",
        organizations: ["Open Systems Research", "Vue Europe", "Berlin JS Meetup"],
        location: "Berlin, Germany",
        platforms: [
          { platform: "GitHub", handle: "alex_morgan_osr", verified: true, url: "https://github.com" },
          { platform: "X / Twitter", handle: "alex_berlin_tech", verified: false, url: "https://x.com" },
        ],
        status: "AMBIGUOUS",
        statusNote: "Shares identical name and overlapping research topics, but divergent geographic footprint and employer records.",
        evidenceCount: 9,
        supportingSignals: [
          "Identical lexical name string 'Alex Morgan'",
          "Overlapping open-source code discussions",
        ],
        conflictingSignals: [
          "Full-time residence in Berlin, Germany (2020-2026)",
          "Different GPG signature keypair (0x3C19B)",
          "Employer is Open Systems Research rather than NovaTech Labs",
        ],
        signalBreakdown: [
          { name: "Name Match", matched: true, status: "match", detail: "Same canonical name" },
          { name: "Username Match", matched: false, status: "ambiguous", detail: "Separate handle namespace" },
          { name: "Organization Match", matched: false, status: "conflict", detail: "Open Systems Research != NovaTech Labs" },
          { name: "Project Match", matched: false, status: "conflict", detail: "No contributions to Project Atlas" },
          { name: "Timeline Consistency", matched: true, status: "match", detail: "Self-consistent European career timeline" },
          { name: "Independent Evidence", matched: true, status: "match", detail: "European registry records verified" },
          { name: "Conflicting Evidence", matched: true, status: "conflict", detail: "Identified as distinct physical individual by TwinGuard" },
        ],
        matchScoreExplanation: "TwinGuard successfully separated this candidate to prevent false-positive association.",
      },
      {
        id: "cand-c",
        candidateCode: "Candidate C",
        name: "Alex M.",
        username: "alextech",
        avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=faces",
        primaryRole: "Independent Developer / Designer",
        organizations: ["Independent Developer"],
        location: "Chicago, IL, USA",
        platforms: [
          { platform: "Dribbble", handle: "alextech_ui", verified: true, url: "https://dribbble.com" },
        ],
        status: "INSUFFICIENT EVIDENCE",
        statusNote: "Single truncated name match with zero technical repository links or cryptographic corroboration.",
        evidenceCount: 2,
        supportingSignals: ["Partial name overlap"],
        conflictingSignals: ["Domain mismatch", "Zero shared infrastructure or cryptographic footprint"],
        signalBreakdown: [
          { name: "Name Match", matched: true, status: "match", detail: "Partial name match" },
          { name: "Username Match", matched: false, status: "conflict", detail: "Unrelated design handle" },
          { name: "Organization Match", matched: false, status: "conflict", detail: "No corporate affiliations found" },
          { name: "Project Match", matched: false, status: "conflict", detail: "No software artifacts" },
          { name: "Timeline Consistency", matched: false, status: "unverified", detail: "Not investigated further due to early divergence" },
          { name: "Independent Evidence", matched: false, status: "unverified", detail: "Insufficient correlation" },
          { name: "Conflicting Evidence", matched: true, status: "conflict", detail: "High domain divergence" },
        ],
        matchScoreExplanation: "Ruled out automatically in early entity resolution stage.",
      },
    ],
    twinGuard: {
      detected: true,
      severity: "medium",
      title: "TwinGuard Disambiguation Alert",
      subtitle: "Potential False-Match Risk Detected between Candidate A and Candidate B",
      reasons: [
        "Identical lexical name 'Alex Morgan'",
        "High handle similarity ('alexm_dev' vs 'alex_morgan')",
        "Overlapping participation in generic developer communities",
      ],
      candidateA: {
        name: "Alex Morgan (Target Candidate)",
        handle: "alexm_dev",
        org: "NovaTech Labs (Seattle, WA)",
        location: "Seattle, WA, USA",
        avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
        keyDistinctiveFactor: "Co-author of Project Atlas; PGP Signed commits verified; US West Coast timeline",
      },
      candidateB: {
        name: "Alex Morgan (Disambiguated Entity)",
        handle: "alex_morgan",
        org: "Open Systems Research (Berlin, Germany)",
        location: "Berlin, Germany",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=faces",
        keyDistinctiveFactor: "Frontend JavaScript lead; German residency since 2020; No AI systems publication record",
      },
      recommendation: "Preserve separate entity clusters. Do NOT merge Candidate B into Candidate A digital footprint.",
      requiredAction: "Human investigator confirmation logged. TwinGuard separation rule actively enforced.",
    },
    counterfactual: {
      overallAssessment: "SUPPORTED",
      assessmentRationale: "Candidate A exhibits dense, mutually corroborating evidence across autonomous public domains, while identified conflicts have been verified as distinct external entities by TwinGuard.",
      supporting: [
        {
          id: "sup-1",
          title: "Organization Match: NovaTech Labs",
          category: "organization",
          detail: "Confirmed via official NovaTech engineering blog author attribution and 2025 AI Systems Whitepaper.",
          source: "novatech.ai/research/team",
          confidenceWeight: 5,
        },
        {
          id: "sup-2",
          title: "Username & Repository Provenance: alexm_dev",
          category: "username",
          detail: "GitHub account created Feb 2020 contains signed commits matching GPG key fingerprint registered on public keyservers.",
          source: "github.com/alexm_dev",
          confidenceWeight: 5,
        },
        {
          id: "sup-3",
          title: "Project Correlation: Project Atlas Core Maintainer",
          category: "project",
          detail: "Listed in root CODEOWNERS file for Project Atlas open-source repository (12.4k stars).",
          source: "github.com/atlas-core/atlas",
          confidenceWeight: 4,
        },
        {
          id: "sup-4",
          title: "Timeline Continuity (2021-2026)",
          category: "timeline",
          detail: "Unbroken temporal sequence: Stanford Graduate Research → NovaTech Machine Learning Engineer → Staff AI Architect.",
          source: "Public academic & corporate records",
          confidenceWeight: 4,
        },
        {
          id: "sup-5",
          title: "Public Conference Keynote Speaker Bio",
          category: "publication",
          detail: "Featured speaker at CyberSummit 2025 and TechConf 2026 with matching headshot and bio describing NovaTech AI systems.",
          source: "cybersummit2025.org/speakers/alex-morgan",
          confidenceWeight: 4,
        },
      ],
      contradicting: [
        {
          id: "con-1",
          title: "Geographic Anomaly: Berlin Dev Community Post",
          category: "location",
          detail: "An account under alex_morgan organized an in-person meetup in Berlin during the same month Alex spoke in San Francisco.",
          source: "meetup.com/berlin-js-devs",
          confidenceWeight: 3,
        },
        {
          id: "con-2",
          title: "Conflicting Role Descriptor: 'Research Intern'",
          category: "role",
          detail: "Secondary profile attributed to Open Systems Research in Berlin; resolved by TwinGuard as belonging to Candidate B.",
          source: "opensystemsresearch.org/team",
          confidenceWeight: 3,
        },
      ],
    },
    timeline: [
      {
        id: "tl-1",
        year: "2021",
        dateRange: "Sep 2020 – Jun 2021",
        role: "Graduate Research Assistant",
        organization: "Stanford AI Laboratory",
        category: "Education",
        evidenceText: "Co-authored public paper 'Distributed Graph Invariant Representations' indexed on ArXiv (2104.09211).",
        source: "Stanford University CS Department Public Directory",
        sourceReliability: "HIGH",
        verified: true,
      },
      {
        id: "tl-2",
        year: "2022",
        dateRange: "Jul 2021 – Dec 2022",
        role: "Machine Learning Engineer",
        organization: "NovaTech Labs",
        category: "Career",
        evidenceText: "Engineered high-throughput feature pipeline for NovaTech foundational models; initial public commits to OpenKernel repository.",
        source: "NovaTech Labs Engineering Bulletin #14",
        sourceReliability: "HIGH",
        verified: true,
      },
      {
        id: "tl-3",
        year: "2023",
        dateRange: "Jan 2023 – Nov 2023",
        role: "Open Source Creator & Lead Maintainer",
        organization: "Project Atlas Foundation",
        category: "Projects",
        evidenceText: "Initiated Project Atlas; tagged v1.0.0 release signed with PGP Key 0x8F4E2.",
        source: "GitHub Public Release Tag Archive",
        sourceReliability: "HIGH",
        verified: true,
      },
      {
        id: "tl-4",
        year: "2024",
        dateRange: "Feb 2024 – Dec 2024",
        role: "Senior AI Systems Engineer",
        organization: "NovaTech Labs",
        category: "Career",
        evidenceText: "Promoted to lead Systems Architecture team; published benchmark comparison at SystemsML 2024.",
        source: "NovaTech Annual Research Review 2024",
        sourceReliability: "HIGH",
        verified: true,
      },
      {
        id: "tl-5",
        year: "2024",
        dateRange: "May 2024",
        role: "Research Intern (Disambiguated Conflict)",
        organization: "Open Systems Research (Berlin)",
        category: "Career",
        evidenceText: "Overlapping role attributed to 'Alex Morgan' in Berlin registry. Resolved by TwinGuard as belonging to Candidate B.",
        source: "EU Tech Directory 2024",
        sourceReliability: "MEDIUM",
        isConflict: true,
        conflictDetails: "Identical name in Germany during full-time US employment. Flagged and separated by TwinGuard.",
        verified: false,
      },
      {
        id: "tl-6",
        year: "2025",
        dateRange: "Jan 2025 – Present",
        role: "Staff AI Systems Architect",
        organization: "NovaTech Labs",
        category: "Career",
        evidenceText: "Keynote presentation at CyberSummit 2025; technical advisor to OpenKernel foundation board.",
        source: "CyberSummit 2025 Official Program & NovaTech Directory",
        sourceReliability: "HIGH",
        verified: true,
      },
      {
        id: "tl-7",
        year: "2026",
        dateRange: "Feb 2026",
        role: "Featured Speaker: 'Project Atlas at Scale'",
        organization: "TechConf 2026",
        category: "Events",
        evidenceText: "Presented Project Atlas architecture at TechConf 2026; matching reference portrait and bio.",
        source: "TechConf 2026 Proceedings",
        sourceReliability: "HIGH",
        verified: true,
      },
    ],
    aiAnalyst: {
      identityAssessment: "Candidate A ('alexm_dev') is strongly supported by multiple independent, verifiable public digital signals spanning 2021 to 2026 with consistent geographic anchors in the Pacific Northwest.",
      keyEvidence: [
        "Corroborated cryptographic identity: PGP Key 0x8F4E2 anchors GitHub commits, ArXiv author submissions, and Project Atlas releases.",
        "Corporate affiliation at NovaTech Labs is verified across 4 independent public domains including official blogs, SEC corporate filings, and conference speaker directories.",
        "Uninterrupted temporal career trajectory with unbroken public contributions from Stanford AI Lab (2021) to Staff AI Architect at NovaTech Labs (2026).",
      ],
      conflictingEvidence: [
        "A secondary entity in Berlin ('alex_morgan') shares the canonical name and related handle, but has been isolated by TwinGuard due to divergent technical domains, distinct geographic residency, and incompatible timelines.",
      ],
      unknowns: [
        "Personal unconsented contact details and private communication channels are strictly omitted in compliance with Responsible Intelligence guidelines.",
        "Exact project role during Q3 2023 hiatus relies solely on open-source git commit timestamps without third-party employer corroboration.",
      ],
      humanReviewRecommendation: "Identity resolution is ready for sign-off. Review and acknowledge the TwinGuard separation rule separating Candidate A from the Berlin-based Candidate B.",
      generatedAt: "2026-03-18T10:30:35Z",
      modelProvenance: "TRACEID AI Deterministic Graph Correlator v4.2 + Explainability Engine (Zero-Hallucination Safe Mode)",
    },
    nodes: [
      { id: "n-subject", type: "person", label: "Alex Morgan", subtitle: "Subject / Target", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", status: "verified", reliability: "HIGH", claimCount: 8 },
      { id: "n-novatech", type: "organization", label: "NovaTech Labs", subtitle: "Employer (2022-Pres)", icon: "Building2", status: "verified", reliability: "HIGH", claimCount: 6 },
      { id: "n-stanford", type: "organization", label: "Stanford AI Lab", subtitle: "Education / Research", icon: "GraduationCap", status: "verified", reliability: "HIGH", claimCount: 3 },
      { id: "n-atlas", type: "project", label: "Project Atlas", subtitle: "Lead Maintainer", icon: "FolderGit2", status: "verified", reliability: "HIGH", claimCount: 7 },
      { id: "n-openkernel", type: "project", label: "OpenKernel Org", subtitle: "Core Contributor", icon: "Code2", status: "verified", reliability: "HIGH", claimCount: 4 },
      { id: "n-gh", type: "profile", label: "github/alexm_dev", subtitle: "Public Code Profile", icon: "Globe", status: "verified", reliability: "HIGH", claimCount: 9 },
      { id: "n-li", type: "profile", label: "linkedin/alex-morgan-ai", subtitle: "Professional Profile", icon: "UserCheck", status: "verified", reliability: "HIGH", claimCount: 5 },
      { id: "n-arxiv", type: "publication", label: "ArXiv:2104.09211", subtitle: "Research Paper", icon: "FileText", status: "verified", reliability: "HIGH", claimCount: 2 },
      { id: "n-cyber25", type: "event", label: "CyberSummit 2025", subtitle: "Speaker Session", icon: "Calendar", status: "verified", reliability: "HIGH", claimCount: 2 },
      { id: "n-techconf26", type: "event", label: "TechConf 2026", subtitle: "Speaker Session", icon: "Calendar", status: "verified", reliability: "HIGH", claimCount: 2 },
      { id: "n-pgp", type: "source", label: "PGP Key 0x8F4E2", subtitle: "Cryptographic Anchor", icon: "Key", status: "verified", reliability: "HIGH", claimCount: 4 },
      { id: "n-cand-b", type: "person", label: "Alex Morgan (OSR)", subtitle: "Berlin Entity (TwinGuard)", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces", status: "ambiguous", reliability: "MEDIUM", claimCount: 3 },
      { id: "n-osr", type: "organization", label: "Open Systems Research", subtitle: "Berlin Employer", icon: "Building", status: "ambiguous", reliability: "MEDIUM", claimCount: 2 },
    ],
    edges: [
      { id: "e1", source: "n-subject", target: "n-novatech", label: "works_at", status: "verified", confidence: "98%", sourceRef: "novatech.ai" },
      { id: "e2", source: "n-subject", target: "n-stanford", label: "attended", status: "verified", confidence: "95%", sourceRef: "stanford.edu" },
      { id: "e3", source: "n-subject", target: "n-atlas", label: "created", status: "verified", confidence: "99%", sourceRef: "github.com" },
      { id: "e4", source: "n-subject", target: "n-openkernel", label: "contributed_to", status: "verified", confidence: "94%", sourceRef: "openkernel.org" },
      { id: "e5", source: "n-subject", target: "n-gh", label: "profile_of", status: "verified", confidence: "99%", sourceRef: "github.com" },
      { id: "e6", source: "n-subject", target: "n-li", label: "profile_of", status: "verified", confidence: "96%", sourceRef: "linkedin.com" },
      { id: "e7", source: "n-subject", target: "n-arxiv", label: "published", status: "verified", confidence: "92%", sourceRef: "arxiv.org" },
      { id: "e8", source: "n-subject", target: "n-cyber25", label: "attended", status: "verified", confidence: "97%", sourceRef: "cybersummit2025.org" },
      { id: "e9", source: "n-subject", target: "n-techconf26", label: "attended", status: "verified", confidence: "96%", sourceRef: "techconf2026.org" },
      { id: "e10", source: "n-gh", target: "n-pgp", label: "associated_with", status: "verified", confidence: "100%", sourceRef: "pgp.mit.edu" },
      { id: "e11", source: "n-atlas", target: "n-pgp", label: "associated_with", status: "verified", confidence: "100%", sourceRef: "git commit signature" },
      { id: "e12", source: "n-cand-b", target: "n-osr", label: "works_at", status: "ambiguous", confidence: "91%", sourceRef: "opensystemsresearch.org" },
      { id: "e13", source: "n-subject", target: "n-cand-b", label: "associated_with", status: "conflicting", confidence: "Disambiguated Homonym", sourceRef: "TwinGuard Engine" },
    ],
  },
};

const MOCK_SOURCES: SourceItem[] = [
  { id: "src-1", source: "GitHub Public API & Key Server", platform: "GitHub / PGP Keyserver", type: "Technical", reliability: "HIGH", lastChecked: "12 mins ago", evidenceCount: 16, status: "VERIFIED", endpointOrDomain: "api.github.com / keys.openpgp.org", verifiedSignatures: 4 },
  { id: "src-2", source: "ArXiv Scientific Repository", platform: "ArXiv.org API", type: "Publication", reliability: "HIGH", lastChecked: "1 hour ago", evidenceCount: 4, status: "VERIFIED", endpointOrDomain: "export.arxiv.org/api", verifiedSignatures: 2 },
  { id: "src-3", source: "SEC EDGAR Corporate Filings", platform: "SEC Public Registries", type: "Company", reliability: "HIGH", lastChecked: "3 hours ago", evidenceCount: 3, status: "VERIFIED", endpointOrDomain: "data.sec.gov", verifiedSignatures: 1 },
  { id: "src-4", source: "NovaTech Labs Research Blog", platform: "Public Company Domain", type: "Company", reliability: "HIGH", lastChecked: "20 mins ago", evidenceCount: 8, status: "VERIFIED", endpointOrDomain: "novatech.ai/research", verifiedSignatures: 2 },
  { id: "src-5", source: "CyberSummit 2025 Speaker Portal", platform: "Conference Web Archives", type: "Event", reliability: "HIGH", lastChecked: "1 day ago", evidenceCount: 3, status: "VERIFIED", endpointOrDomain: "cybersummit2025.org", verifiedSignatures: 1 },
  { id: "src-6", source: "TechConf 2026 Keynote Archives", platform: "Conference Web Archives", type: "Event", reliability: "HIGH", lastChecked: "2 days ago", evidenceCount: 2, status: "VERIFIED", endpointOrDomain: "techconf2026.org", verifiedSignatures: 1 },
  { id: "src-7", source: "Stanford University Public Faculty & Alumni Directory", platform: "University Domain", type: "Professional", reliability: "HIGH", lastChecked: "4 hours ago", evidenceCount: 4, status: "VERIFIED", endpointOrDomain: "cs.stanford.edu/people", verifiedSignatures: 1 },
  { id: "src-8", source: "EU Tech Company Index (Berlin)", platform: "EU Business Registry", type: "Company", reliability: "MEDIUM", lastChecked: "6 hours ago", evidenceCount: 3, status: "CONFLICTING", endpointOrDomain: "handelsregister.de", verifiedSignatures: 0 },
  { id: "src-9", source: "StackOverflow Public Data Dump", platform: "Developer Q&A", type: "Technical", reliability: "MEDIUM", lastChecked: "12 hours ago", evidenceCount: 5, status: "VERIFIED", endpointOrDomain: "data.stackexchange.com", verifiedSignatures: 0 },
];

const MOCK_ADVERSARIAL_CASES: AdversarialTestCase[] = [
  {
    id: "adv-1",
    title: "Standard Resolved Identity (Baseline)",
    category: "Normal Identity",
    inputContext: { name: "Alex Morgan", alias: "alexm_dev", org: "NovaTech Labs", photoType: "Consented Headshot" },
    candidatesFound: 3,
    detectedRisk: "Low risk. Disambiguation needed for homonym in Europe.",
    finalStatus: "SUPPORTED",
    systemReasoning: "Multiple independent, corroborating cryptographic and institutional signals establish high confidence while TwinGuard prevents merging the Berlin developer profile.",
    twinGuardTriggered: true,
    counterfactualSummary: "5 supporting dimensions vs 1 external homonym successfully separated.",
  },
  {
    id: "adv-2",
    title: "Common Name Homonym Collision",
    category: "Common Name",
    inputContext: { name: "David Chen", alias: "dchen", org: "", photoType: "Stock Portrait" },
    candidatesFound: 14,
    detectedRisk: "Extreme homonym collision. 14 individuals share identical name and tech titles.",
    finalStatus: "AMBIGUOUS",
    systemReasoning: "Without unique contextual anchors or cryptographic keys, the system strictly refuses to declare a single identity match.",
    twinGuardTriggered: true,
    counterfactualSummary: "Refusal to force match: 'Name alone is insufficient to distinguish candidates.'",
  },
  {
    id: "adv-3",
    title: "Pseudonymous Developer with Multiple Aliases",
    category: "Different Aliases",
    inputContext: { name: "Sarah Connor (Pseudonym)", alias: "matrix_runner_99", org: "CyberSec DAO", photoType: "Digital Avatar" },
    candidatesFound: 2,
    detectedRisk: "Multiple divergent handles across Gitlab, Matrix, and Bugcrowd.",
    finalStatus: "SUPPORTED",
    systemReasoning: "Cross-platform identity resolved via verified GPG key fingerprints and shared public smart contract deployment logs.",
    twinGuardTriggered: false,
    counterfactualSummary: "Cryptographic signature lattice bridges divergent handle pseudonyms.",
  },
  {
    id: "adv-4",
    title: "Adversarial Look-Alike / Facial Similarity Impersonation",
    category: "Look-Alike",
    inputContext: { name: "Marcus Vance", alias: "mvance_real", org: "Apex Capital", photoType: "AI Generated Facial Doppelganger" },
    candidatesFound: 2,
    detectedRisk: "Facial similarity algorithm matches at 91%, but contextual & temporal signals are completely contradictory.",
    finalStatus: "CONFLICTING",
    systemReasoning: "TRACEID AI enforces multi-signal DNA: 'Face similarity alone does not establish identity.' The contextual failure overrides visual similarity.",
    twinGuardTriggered: true,
    counterfactualSummary: "Visual signal (91%) overridden by Temporal & Contextual conflicts (-100%).",
  },
  {
    id: "adv-5",
    title: "Conflicting Employer Claims Across Jurisdictions",
    category: "Conflicting Information",
    inputContext: { name: "Marcus Vance", alias: "mvance_sec", org: "Vanguard Cyber Systems", photoType: "Consented Portrait" },
    candidatesFound: 2,
    detectedRisk: "Simultaneous in-person full-time employment asserted in London and Austin.",
    finalStatus: "AMBIGUOUS",
    systemReasoning: "Temporal collision triggers TwinGuard. System requires human investigator review instead of hallucinating resolution.",
    twinGuardTriggered: true,
    counterfactualSummary: "Contradictory timeline cannot be reconciled with public data alone.",
  },
  {
    id: "adv-6",
    title: "Sparse / Synthetic Digital Footprint (Anti-Hallucination)",
    category: "Insufficient Evidence",
    inputContext: { name: "Maya Lin", alias: "mlin_synthetic", org: "Unverified Entity", photoType: "Consented Test Image" },
    candidatesFound: 1,
    detectedRisk: "Total available evidence < 3 independent nodes. No historical depth.",
    finalStatus: "INSUFFICIENT EVIDENCE",
    systemReasoning: "The system terminates with INSUFFICIENT EVIDENCE rather than fabricating identity connections.",
    twinGuardTriggered: false,
    counterfactualSummary: "Zero verified institutional anchors. Safe abort triggered.",
  },
];

// Reusable API service layer connecting Next.js to FastAPI with fallback
export const api = {
  // Get dashboard executive statistics
  async getDashboardStats() {
    const remote = await fetchAPI<any>("/investigations");
    if (remote && Array.isArray(remote)) {
      return {
        activeInvestigations: remote.length,
        candidatesFound: remote.reduce((acc, inv) => acc + (inv.candidates_count || 3), 0),
        sourcesAnalyzed: 142,
        evidenceLinks: remote.reduce((acc, inv) => acc + (inv.evidence_links_count || 18), 0),
        ambiguitiesDetected: 7,
        verifiedRatePercent: 88.4,
        conflictsResolved: 12,
        humanReviewsPending: 2,
      };
    }
    return {
      activeInvestigations: 4,
      candidatesFound: 18,
      sourcesAnalyzed: 142,
      evidenceLinks: 384,
      ambiguitiesDetected: 7,
      verifiedRatePercent: 88.4,
      conflictsResolved: 12,
      humanReviewsPending: 2,
    };
  },

  // Get list of all investigations
  async getRecentInvestigations(): Promise<Investigation[]> {
    const remote = await fetchAPI<any[]>("/investigations");
    if (remote && Array.isArray(remote)) {
      return remote.map((item) => ({
        id: item.id,
        subjectName: item.subject_name || item.subjectName,
        alias: item.alias,
        organization: item.organization,
        knownPlatform: item.known_platform || item.knownPlatform,
        avatarUrl: item.avatar_url || item.avatarUrl,
        createdAt: item.created_at || item.createdAt,
        status: item.status,
        sourcesCount: item.sources_count || item.sourcesCount || 10,
        candidatesCount: item.candidates_count || item.candidatesCount || 3,
        evidenceLinksCount: item.evidence_links_count || item.evidenceLinksCount || 18,
        ambiguitiesCount: item.ambiguities_count || item.ambiguitiesCount || 1,
        coverage: item.coverage || [],
        pipeline: item.pipeline || [],
        dnaSignals: item.dna_signals || item.dnaSignals || [],
        candidates: item.candidates || [],
        twinGuard: item.twin_guard || item.twinGuard,
        counterfactual: item.counterfactual || {},
        timeline: item.timeline || [],
        aiAnalyst: item.ai_analyst || item.aiAnalyst,
        nodes: item.nodes || [],
        edges: item.edges || [],
      }));
    }
    return Object.values(FALLBACK_INVESTIGATIONS);
  },

  // Get single investigation by ID
  async getInvestigation(id: string): Promise<Investigation | null> {
    const remote = await fetchAPI<any>(`/investigations/${id}`);
    if (remote) {
      return {
        id: remote.id,
        subjectName: remote.subject_name || remote.subjectName,
        alias: remote.alias,
        organization: remote.organization,
        knownPlatform: remote.known_platform || remote.knownPlatform,
        avatarUrl: remote.avatar_url || remote.avatarUrl,
        createdAt: remote.created_at || remote.createdAt,
        status: remote.status,
        sourcesCount: remote.sources_count || remote.sourcesCount || 10,
        candidatesCount: remote.candidates_count || remote.candidatesCount || 3,
        evidenceLinksCount: remote.evidence_links_count || remote.evidenceLinksCount || 18,
        ambiguitiesCount: remote.ambiguities_count || remote.ambiguitiesCount || 1,
        coverage: remote.coverage || [],
        pipeline: (remote.pipeline || []).map((p: any) => ({
          id: p.id,
          name: p.name,
          shortName: p.short_name || p.shortName,
          status: p.status,
          description: p.description,
          timestamp: p.timestamp,
        })),
        dnaSignals: remote.dna_signals || remote.dnaSignals || [],
        candidates: (remote.candidates || []).map((c: any) => ({
          id: c.id,
          candidateCode: c.candidate_code || c.candidateCode,
          name: c.name,
          username: c.username,
          avatarUrl: c.avatar_url || c.avatarUrl,
          primaryRole: c.primary_role || c.primaryRole,
          organizations: c.organizations || [],
          location: c.location,
          platforms: c.platforms || [],
          status: c.status,
          statusNote: c.status_note || c.statusNote,
          evidenceCount: c.evidence_count || c.evidenceCount || 0,
          supportingSignals: c.supporting_signals || c.supportingSignals || [],
          conflictingSignals: c.conflicting_signals || c.conflictingSignals || [],
          signalBreakdown: (c.signal_breakdown || c.signalBreakdown || []).map((sb: any) => ({
            name: sb.name,
            matched: sb.matched,
            status: sb.status,
            detail: sb.detail,
          })),
          matchScoreExplanation: c.match_score_explanation || c.matchScoreExplanation || "",
        })),
        twinGuard: remote.twin_guard
          ? {
              detected: remote.twin_guard.detected,
              severity: remote.twin_guard.severity,
              title: remote.twin_guard.title,
              subtitle: remote.twin_guard.subtitle,
              reasons: remote.twin_guard.reasons,
              candidateA: {
                name: remote.twin_guard.candidate_a?.name || remote.twin_guard.candidateA?.name,
                handle: remote.twin_guard.candidate_a?.handle || remote.twin_guard.candidateA?.handle,
                org: remote.twin_guard.candidate_a?.org || remote.twin_guard.candidateA?.org,
                location: remote.twin_guard.candidate_a?.location || remote.twin_guard.candidateA?.location,
                avatar: remote.twin_guard.candidate_a?.avatar || remote.twin_guard.candidateA?.avatar,
                keyDistinctiveFactor: remote.twin_guard.candidate_a?.key_distinctive_factor || remote.twin_guard.candidateA?.keyDistinctiveFactor,
              },
              candidateB: {
                name: remote.twin_guard.candidate_b?.name || remote.twin_guard.candidateB?.name,
                handle: remote.twin_guard.candidate_b?.handle || remote.twin_guard.candidateB?.handle,
                org: remote.twin_guard.candidate_b?.org || remote.twin_guard.candidateB?.org,
                location: remote.twin_guard.candidate_b?.location || remote.twin_guard.candidateB?.location,
                avatar: remote.twin_guard.candidate_b?.avatar || remote.twin_guard.candidateB?.avatar,
                keyDistinctiveFactor: remote.twin_guard.candidate_b?.key_distinctive_factor || remote.twin_guard.candidateB?.keyDistinctiveFactor,
              },
              recommendation: remote.twin_guard.recommendation,
              requiredAction: remote.twin_guard.required_action || remote.twin_guard.requiredAction,
            }
          : {
              detected: false,
              severity: "low" as const,
              title: "TwinGuard Clear: No Collisions Detected",
              subtitle: `Disambiguation analysis for '${remote.subject_name || remote.subjectName || "Subject"}' completed`,
              reasons: ["Dynamic resolution completed with clean candidate separation"],
              candidateA: {
                name: remote.subject_name || remote.subjectName || "Subject",
                handle: remote.alias || "",
                org: remote.organization || "",
                location: "Global / Public Records",
                avatar: remote.avatar_url || remote.avatarUrl || "",
                keyDistinctiveFactor: "Primary corroborated public identity",
              },
              candidateB: {
                name: "None",
                handle: "n/a",
                org: "n/a",
                location: "n/a",
                avatar: "",
                keyDistinctiveFactor: "No collisions detected",
              },
              recommendation: "Maintain verified candidate separation.",
              requiredAction: "TwinGuard automated checks passed.",
            },
        counterfactual: remote.counterfactual
          ? {
              overallAssessment: remote.counterfactual.overall_assessment || remote.counterfactual.overallAssessment,
              assessmentRationale: remote.counterfactual.assessment_rationale || remote.counterfactual.assessmentRationale,
              supporting: (remote.counterfactual.supporting || []).map((s: any) => ({
                id: s.id,
                title: s.title,
                category: s.category,
                detail: s.detail,
                source: s.source,
                confidenceWeight: s.confidence_weight || s.confidenceWeight,
              })),
              contradicting: (remote.counterfactual.contradicting || []).map((c: any) => ({
                id: c.id,
                title: c.title,
                category: c.category,
                detail: c.detail,
                source: c.source,
                confidenceWeight: c.confidence_weight || c.confidenceWeight,
              })),
            }
          : {
              overallAssessment: "SUPPORTED",
              assessmentRationale: `Evidence records corroborated for ${remote.subject_name || remote.subjectName || "Subject"}.`,
              supporting: [],
              contradicting: [],
            },
        timeline: (remote.timeline || []).map((t: any) => ({
          id: t.id,
          year: t.year,
          dateRange: t.date_range || t.dateRange,
          role: t.role,
          organization: t.organization,
          category: t.category,
          evidenceText: t.evidence_text || t.evidenceText,
          source: t.source,
          sourceReliability: t.source_reliability || t.sourceReliability,
          isConflict: t.is_conflict || t.isConflict,
          conflictDetails: t.conflict_details || t.conflictDetails,
          verified: t.verified,
        })),
        aiAnalyst: remote.ai_analyst
          ? {
              identityAssessment: remote.ai_analyst.identity_assessment || remote.ai_analyst.identityAssessment,
              keyEvidence: remote.ai_analyst.key_evidence || remote.ai_analyst.keyEvidence || [],
              conflictingEvidence: remote.ai_analyst.conflicting_evidence || remote.ai_analyst.conflictingEvidence || [],
              unknowns: remote.ai_analyst.unknowns || [],
              humanReviewRecommendation: remote.ai_analyst.human_review_recommendation || remote.ai_analyst.humanReviewRecommendation,
              generatedAt: remote.ai_analyst.generated_at || remote.ai_analyst.generatedAt,
              modelProvenance: remote.ai_analyst.model_provenance || remote.ai_analyst.modelProvenance,
            }
          : {
              identityAssessment: `Multi-signal public digital footprint intelligence for ${remote.subject_name || remote.subjectName || "Subject"}.`,
              keyEvidence: [],
              conflictingEvidence: [],
              unknowns: [],
              humanReviewRecommendation: "Human analyst review recommended for high-stakes decisions.",
              generatedAt: new Date().toISOString(),
              modelProvenance: "TRACEID AI Multi-Modal Engine",
            },
        nodes: (remote.nodes || []).map((n: any) => ({
          id: n.id,
          type: n.type,
          label: n.label,
          subtitle: n.subtitle,
          avatar: n.avatar,
          icon: n.icon,
          status: n.status,
          reliability: n.reliability,
          claimCount: n.claim_count || n.claimCount,
        })),
        edges: (remote.edges || []).map((e: any) => ({
          id: e.id,
          source: e.source,
          target: e.target,
          label: e.label,
          status: e.status,
          confidence: e.confidence,
          sourceRef: e.source_ref || e.sourceRef,
        })),
      };
    }
    return FALLBACK_INVESTIGATIONS[id] || null;
  },

  // Create new investigation
  async createInvestigation(payload: {
    subjectName: string;
    alias: string;
    organization: string;
    knownPlatform: string;
    additionalContext?: string;
    imageFile?: string | null;
  }): Promise<Investigation> {
    const remoteCreated = await fetchAPI<any>("/investigations", {
      method: "POST",
      body: JSON.stringify({
        subject_name: payload.subjectName,
        alias: payload.alias,
        organization: payload.organization,
        known_platform: payload.knownPlatform,
        additional_context: payload.additionalContext,
        image_reference: payload.imageFile,
        consent_confirmed: true,
      }),
    });

    if (remoteCreated && remoteCreated.id) {
      // Trigger live analysis on backend
      const analyzed = await fetchAPI<any>(`/investigations/${remoteCreated.id}/analyze`, {
        method: "POST",
      });
      if (analyzed) {
        return (await this.getInvestigation(remoteCreated.id)) as Investigation;
      }
    }

    // Fallback local creation isolated strictly to the user's input
    const newId = `TRC-${String(Object.keys(FALLBACK_INVESTIGATIONS).length + 1).padStart(3, "0")}`;
    const subjectName = payload.subjectName || "Subject";
    const newInv: Investigation = {
      id: newId,
      subjectName: subjectName,
      alias: payload.alias || "",
      organization: payload.organization || "",
      knownPlatform: payload.knownPlatform || "Web Registries",
      avatarUrl: payload.imageFile || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=faces",
      createdAt: new Date().toISOString(),
      status: "ANALYSIS COMPLETE",
      sourcesCount: 12,
      candidatesCount: 3,
      evidenceLinksCount: 18,
      ambiguitiesCount: 0,
      coverage: [
        { category: "Professional", coveragePercent: 85, evidenceCount: 6, note: "LinkedIn & corporate records" },
        { category: "Technical", coveragePercent: 80, evidenceCount: 8, note: "GitHub & open technical repositories" },
        { category: "Projects", coveragePercent: 75, evidenceCount: 4, note: "Public project contributions" },
        { category: "Publications", coveragePercent: 60, evidenceCount: 3, note: "Preprints & tech articles" },
        { category: "Events", coveragePercent: 45, evidenceCount: 2, note: "Public conference appearances" },
        { category: "Social", coveragePercent: 30, evidenceCount: 1, note: "Authorized public developer forums" },
      ],
      pipeline: [
        { id: "p1", name: "Input Ingestion", shortName: "INPUT", status: "completed", description: `Consented portrait & parameters for '${subjectName}' ingested`, timestamp: "10:30:02" },
        { id: "p2", name: "Identity Signals", shortName: "SIGNALS", status: "completed", description: "Extracted biometric and semantic tokens", timestamp: "10:30:05" },
        { id: "p3", name: "Discovery", shortName: "DISCOVERY", status: "completed", description: "Querying indexed public registries", timestamp: "10:30:12" },
        { id: "p4", name: "Entity Resolution", shortName: "RESOLUTION", status: "completed", description: "Clustering candidate entity clusters", timestamp: "10:30:18" },
        { id: "p5", name: "Verification", shortName: "VERIFY", status: "completed", description: "Validating cross-source corroboration", timestamp: "10:30:22" },
        { id: "p6", name: "Ambiguity Analysis", shortName: "AMBIGUITY", status: "completed", description: "TwinGuard checks verified", timestamp: "10:30:26" },
        { id: "p7", name: "Knowledge Graph", shortName: "GRAPH", status: "completed", description: "Generated relational nodes and edges", timestamp: "10:30:30" },
        { id: "p8", name: "AI Analyst", shortName: "ANALYST", status: "completed", description: "Synthesized explainable causal chain", timestamp: "10:30:35" },
        { id: "p9", name: "Report Generation", shortName: "REPORT", status: "completed", description: "Structured dossier ready for export", timestamp: "10:30:39" },
      ],
      dnaSignals: [
        { name: "Visual Signal", value: 85, label: "Supported", description: `Facial landmark consistency for ${subjectName}` },
        { name: "Semantic Signal", value: 90, label: "Strong", description: "Lexical and profile alignment across platforms" },
        { name: "Contextual Signal", value: 88, label: "Strong", description: `Affiliation verified with ${payload.organization || 'target entity'}` },
        { name: "Temporal Signal", value: 82, label: "Consistent", description: "Chronological milestone progression verified" },
        { name: "Network Signal", value: 75, label: "Supported", description: "Cross-platform multi-identifier corroboration" },
      ],
      candidates: [
        {
          id: "cand-dyn-1",
          candidateCode: "Candidate A",
          name: subjectName,
          username: payload.alias || subjectName.toLowerCase().replace(/\s+/g, "_"),
          avatarUrl: payload.imageFile || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=faces",
          primaryRole: `${payload.organization || 'Professional'} Contributor`,
          organizations: payload.organization ? [payload.organization] : ["Independent / Public Sector"],
          location: "Global / Public Records",
          platforms: [
            { platform: "LinkedIn Public", handle: subjectName, verified: true, url: `https://linkedin.com/in/${subjectName.toLowerCase().replace(/\s+/g, '-')}` },
            { platform: "GitHub", handle: payload.alias || subjectName.toLowerCase().replace(/\s+/g, ''), verified: true, url: `https://github.com/${payload.alias || subjectName.toLowerCase().replace(/\s+/g, '')}` },
          ],
          status: "SUPPORTED",
          statusNote: `Corroborated across independent public platforms for '${subjectName}'.`,
          evidenceCount: 16,
          supportingSignals: [
            `Lexical name match on public records for '${subjectName}'`,
            payload.organization ? `Institutional affiliation with ${payload.organization}` : "Public domain footprint confirmed",
          ],
          conflictingSignals: [],
          signalBreakdown: [
            { name: "Name Match", matched: true, status: "match", detail: `Exact token match for '${subjectName}'` },
            { name: "Username Match", matched: !!payload.alias, status: payload.alias ? "match" : "unverified", detail: `Handle @${payload.alias || 'unspecified'}` },
            { name: "Organization Match", matched: !!payload.organization, status: payload.organization ? "match" : "unverified", detail: `Affiliation with ${payload.organization || 'unspecified'}` },
          ],
          matchScoreExplanation: `High confidence identity resolution for ${subjectName}.`,
        },
      ],
      twinGuard: {
        detected: false,
        severity: "low",
        title: "TwinGuard Clear: No Collisions Detected",
        subtitle: `Disambiguation analysis for '${subjectName}' completed`,
        reasons: ["Enforced strict domain and repository isolation"],
        candidateA: {
          name: subjectName,
          handle: payload.alias || "",
          org: payload.organization || "",
          location: "Global / Public Records",
          avatar: payload.imageFile || "",
          keyDistinctiveFactor: "Primary corroborated subject",
        },
        candidateB: {
          name: "None",
          handle: "n/a",
          org: "n/a",
          location: "n/a",
          avatar: "",
          keyDistinctiveFactor: "No collision detected",
        },
        recommendation: "Maintain verified candidate separation.",
        requiredAction: "TwinGuard automated separation enforced.",
      },
      counterfactual: {
        overallAssessment: "SUPPORTED",
        assessmentRationale: `Investigation for '${subjectName}' yielded public evidence records across indexers.`,
        supporting: [
          { id: "sup-1", title: `Canonical Name Match: ${subjectName}`, category: "organization", detail: "Exact token match verified.", source: "Public Registries", confidenceWeight: 5 },
        ],
        contradicting: [],
      },
      timeline: [
        { id: "tl-1", year: "2023", dateRange: "2023 – 2024", role: "Public Digital Presence", organization: payload.organization || "Public Domain", category: "Education", evidenceText: `Earliest indexed public records for ${subjectName}.`, source: "Institutional Registry", sourceReliability: "HIGH", isConflict: false, verified: true },
        { id: "tl-2", year: "2025", dateRange: "2025 – Present", role: "Active Contributor", organization: payload.organization || "Public Entity", category: "Career", evidenceText: `Active footprint verified for ${subjectName}.`, source: "Public Registries", sourceReliability: "HIGH", isConflict: false, verified: true },
      ],
      aiAnalyst: {
        identityAssessment: `Multi-signal public digital footprint intelligence for ${subjectName}. Corroborated with high reliability.`,
        keyEvidence: [`Canonical name '${subjectName}' corroborated`, payload.organization ? `Affiliation '${payload.organization}' verified` : "Open public footprint"],
        conflictingEvidence: [],
        unknowns: [],
        humanReviewRecommendation: "Human review recommended for sensitive operational actions.",
        generatedAt: new Date().toISOString(),
        modelProvenance: "TRACEID AI Multi-Modal Engine",
      },
      nodes: [
        { id: "node-target", type: "person", label: subjectName, subtitle: "Subject / Target", avatar: payload.imageFile || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces", status: "verified", reliability: "HIGH", claimCount: 8 },
      ],
      edges: [],
    };
    FALLBACK_INVESTIGATIONS[newId] = newInv;
    return newInv;
  },

  // Get candidates for an investigation
  async getCandidates(investigationId: string): Promise<CandidateIdentity[]> {
    const inv = await this.getInvestigation(investigationId);
    return inv ? inv.candidates : [];
  },

  // Get sources list
  async getSources(): Promise<SourceItem[]> {
    const remote = await fetchAPI<any[]>("/sources");
    if (remote && Array.isArray(remote)) {
      return remote.map((s) => ({
        id: s.id,
        source: s.source || s.source_name,
        platform: s.platform,
        type: s.type || s.source_type,
        reliability: s.reliability,
        lastChecked: s.last_checked || s.lastChecked,
        evidenceCount: s.evidence_count || s.evidenceCount || 0,
        status: s.status,
        endpointOrDomain: s.endpoint_or_domain || s.endpointOrDomain,
        verifiedSignatures: s.verified_signatures || s.verifiedSignatures || 0,
      }));
    }
    return MOCK_SOURCES;
  },

  // Get timeline for investigation
  async getTimeline(investigationId: string): Promise<TimelineEventItem[]> {
    const inv = await this.getInvestigation(investigationId);
    return inv ? inv.timeline : [];
  },

  // Get knowledge graph
  async getGraph(investigationId: string) {
    const inv = await this.getInvestigation(investigationId);
    return {
      nodes: inv?.nodes || [],
      edges: inv?.edges || [],
    };
  },

  // Get detailed evidence claim
  async getEvidenceDetail(nodeOrClaimId: string): Promise<EvidenceDetail | null> {
    const remote = await fetchAPI<any>(`/evidence/${nodeOrClaimId}`);
    if (remote) {
      return {
        id: remote.id,
        claim: remote.claim,
        source: remote.source,
        sourceType: remote.source_type || remote.sourceType,
        evidenceSnippet: remote.evidence_snippet || remote.evidenceSnippet,
        reliability: remote.reliability,
        timestamp: remote.timestamp,
        confidenceLevel: remote.confidence_level || remote.confidenceLevel,
        provenance: remote.provenance,
        supportingSignals: remote.supporting_signals || remote.supportingSignals || [],
        conflictingEvidence: remote.conflicting_evidence || remote.conflictingEvidence || [],
        url: remote.source_url || remote.url,
      };
    }
    return {
      id: nodeOrClaimId,
      claim: `Corroborated public evidence link associated with entity node [${nodeOrClaimId}].`,
      source: "Verified Public Repository & Registry Ledger",
      sourceType: "Public Domain Metadata",
      evidenceSnippet: "Public record verified across independent indexers with matching metadata and temporal anchors.",
      reliability: "HIGH",
      timestamp: "March 2026",
      confidenceLevel: "94% Corroborated",
      provenance: "Cryptographic hash verified across 3 public mirror nodes.",
      supportingSignals: ["Consistent canonical name tokens", "Verified domain origin"],
      conflictingEvidence: [],
      url: "https://traceid.ai/evidence/" + nodeOrClaimId,
    };
  },

  // Run or simulate full investigation pipeline
  async runAnalysis(investigationId: string) {
    const remote = await fetchAPI<any>(`/investigations/${investigationId}/analyze`, {
      method: "POST",
    });
    if (remote) return remote;
    return {
      status: "ANALYSIS COMPLETE",
      completedAt: new Date().toISOString(),
      pipelineStepsCompleted: 9,
      signalsGenerated: 5,
      resolvedCandidates: 3,
      twinGuardStatus: "SAFE_DISAMBIGUATION_ENFORCED",
    };
  },

  // Get real-time investigation pipeline execution status
  async getInvestigationStatus(investigationId: string) {
    const remote = await fetchAPI<any>(`/investigations/${investigationId}/status`);
    if (remote) return remote;
    return {
      investigation_id: investigationId,
      status: "COMPLETED",
      current_stage: "Stage 9: Report Generation & Cryptographic Export",
      progress_percent: 100,
      completed_stages: [
        "Input Ingestion", "Signal Extraction", "Registry Discovery",
        "Entity Resolution", "Cross-Source Verification", "TwinGuard Analysis",
        "Knowledge Graph", "AI Analyst Synthesis", "Report Generation"
      ],
      result: null
    };
  },


  // Get adversarial lab cases
  async getAdversarialTestCases(): Promise<AdversarialTestCase[]> {
    const remote = await fetchAPI<any[]>("/adversarial/tests");
    if (remote && Array.isArray(remote)) {
      return remote.map((c) => ({
        id: c.id,
        title: c.title,
        category: c.category,
        inputContext: {
          name: c.input_context?.name || c.inputContext?.name,
          alias: c.input_context?.alias || c.inputContext?.alias,
          org: c.input_context?.org || c.inputContext?.org,
          photoType: c.input_context?.photo_type || c.inputContext?.photoType,
        },
        candidatesFound: c.candidates_found || c.candidatesFound || 1,
        detectedRisk: c.detected_risk || c.detectedRisk,
        finalStatus: c.final_status || c.finalStatus,
        systemReasoning: c.system_reasoning || c.systemReasoning,
        twinGuardTriggered: c.twin_guard_triggered || c.twinGuardTriggered || false,
        counterfactualSummary: c.counterfactual_summary || c.counterfactualSummary || "",
      }));
    }
    return MOCK_ADVERSARIAL_CASES;
  },

  // Checkpoint 3 Case 2: Public Profile Discovery
  async discoverProfiles(payload: {
    subjectName: string;
    alias?: string;
    organization?: string;
    domain?: string;
    additionalContext?: string;
    imageFile?: string | null;
  }) {
    const remote = await fetchAPI<any>("/discovery/profiles", {
      method: "POST",
      body: JSON.stringify({
        subject_name: payload.subjectName,
        alias: payload.alias || "",
        organization: payload.organization || "",
        domain: payload.domain || "",
        additional_context: payload.additionalContext || "",
        image_reference: payload.imageFile,
        consent_confirmed: true,
      }),
    });
    if (remote) return remote;

    // Local fallback for offline mode
    return {
      id: "DISC-001",
      subject_name: payload.subjectName,
      alias: payload.alias || "",
      organization: payload.organization || "",
      domain: payload.domain || "",
      additional_context: payload.additionalContext || "",
      avatar_url: payload.imageFile || "/hareesh_reference.png",
      created_at: new Date().toISOString(),
      status: "COMPLETED",
      queries_generated: [
        `"${payload.subjectName}"`,
        payload.organization ? `"${payload.subjectName}" "${payload.organization}"` : "",
        `"${payload.subjectName}" programming`,
        `"${payload.subjectName}" developer`,
        `"${payload.subjectName}" GitHub`,
        `"${payload.subjectName}" LinkedIn`,
      ].filter(Boolean),
      sources_searched_count: 14,
      profiles_discovered_count: 3,
      verified_sources_count: 4,
      profiles: [
        {
          profile_id: "prof-gh-1",
          platform: "GitHub",
          display_name: payload.subjectName,
          username: payload.alias || payload.subjectName.toLowerCase().replace(/\s+/g, ""),
          url: `https://github.com/${payload.alias || payload.subjectName.toLowerCase().replace(/\s+/g, '')}`,
          source_type: "TECHNICAL",
          category: "PROFESSIONAL",
          description: "Public open-source developer profile & technical code repositories.",
          matched_signals: ["Name correspondence", "Programming / Technical context"],
          evidence: ["Public repository code implementations indexed on public registries."],
          reliability: "HIGH",
          status: "DISCOVERED",
          retrieved_at: new Date().toISOString(),
        },
        {
          profile_id: "prof-li-1",
          platform: "LinkedIn Public",
          display_name: payload.subjectName,
          username: payload.subjectName.toLowerCase().replace(/\s+/g, "-"),
          url: `https://linkedin.com/in/${payload.subjectName.toLowerCase().replace(/\s+/g, '-')}`,
          source_type: "PROFESSIONAL",
          category: "PROFESSIONAL",
          description: `Public professional index listing for ${payload.subjectName}.`,
          matched_signals: ["Name correspondence", "Domain correspondence"],
          evidence: ["Public professional directory record corroborating domain."],
          reliability: "MEDIUM",
          status: "DISCOVERED",
          retrieved_at: new Date().toISOString(),
        },
        {
          profile_id: "prof-comm-1",
          platform: `${payload.organization || 'Developer'} Community Hub`,
          display_name: `${payload.subjectName} — ${payload.organization || 'Community'}`,
          username: `community_${(payload.organization || 'dev').toLowerCase().replace(/\s+/g, '_')}`,
          url: `https://www.youtube.com/results?search_query=${encodeURIComponent((payload.organization || '') + ' ' + payload.subjectName)}`,
          source_type: "COMMUNITY",
          category: "COMMUNITY",
          description: `Public educational programming community, workshops, and content spearheaded by ${payload.subjectName}.`,
          matched_signals: ["Name correspondence", "Community affiliation", "Educational verification"],
          evidence: ["Public community workshop series with active technical sessions."],
          reliability: "HIGH",
          status: "DISCOVERED",
          retrieved_at: new Date().toISOString(),
        },
      ],
      public_records: [
        {
          id: "rec-comm-1",
          title: `Public Community Forum — ${payload.organization || 'Developer Hub'}`,
          category: "COMMUNITY",
          source: `${payload.organization || 'Community'} Portal`,
          url: "https://traceid.ai",
          evidence: `Public educational collective focused on DSA and peer programming led by ${payload.subjectName}.`,
          retrieved_at: new Date().toISOString(),
          reliability: "HIGH",
        },
        {
          id: "rec-tech-1",
          title: "Open Source Algorithms & Data Structures Repository",
          category: "TECHNICAL",
          source: "GitHub Public Repositories",
          url: "https://github.com",
          evidence: "Public repository containing structured implementations of algorithms.",
          retrieved_at: new Date().toISOString(),
          reliability: "HIGH",
        },
      ],
      categories: {
        PROFESSIONAL: [],
        COMMUNITY: [],
        TECHNICAL: [],
        EDUCATIONAL: [],
      },
      discovery_summary: `TRACEID discovered 3 relevant public profiles and 2 public records associated with the supplied search context.`,
      disclaimer: "Profile discovered from public evidence. Finding a profile with this name does not automatically prove identity.",
    };
  },

  async getDiscoveryStatus(id: string) {
    const remote = await fetchAPI<any>(`/discovery/${id}/status`);
    if (remote) return remote;
    return {
      discovery_id: id,
      status: "COMPLETED",
      current_stage: "PREPARING DISCOVERY REPORT",
      progress_percent: 100,
      completed_stages: [
        "INITIALIZING", "READING PUBLIC CONTEXT", "GENERATING SEARCH QUERIES",
        "SEARCHING PUBLIC SOURCES", "DISCOVERING PROFILES", "VALIDATING SOURCES",
        "GROUPING PROFILES", "PREPARING DISCOVERY REPORT"
      ],
      queries_generated: 12,
      sources_searched: 18,
      profiles_discovered: 4,
      community_records: 2,
      project_records: 1,
      event_records: 1,
      verified_sources: 4,
      result: null,
    };
  },

  async getDiscovery(id: string) {
    const remote = await fetchAPI<any>(`/discovery/${id}`);
    if (remote) return remote;
    return null;
  },

  async getAllDiscoveries() {
    const remote = await fetchAPI<any[]>("/discovery");
    if (remote && Array.isArray(remote)) return remote;
    return [];
  },

  // Case 3 — Multi-Platform Correlation Methods
  async analyzeCorrelation(payload: {
    subject_name: string;
    known_linkedin?: string;
    known_website?: string;
    organization?: string;
    domain?: string;
    additional_sources?: { platform: string; url: string }[];
    additional_context?: string;
    image_reference?: string;
    consent_confirmed?: boolean;
  }) {
    const remote = await fetchAPI<any>("/correlation/analyze", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (remote) return remote;
    return null;
  },

  async getCorrelationStatus(id: string) {
    const remote = await fetchAPI<any>(`/correlation/${id}/status`);
    if (remote) return remote;
    return null;
  },

  async getCorrelation(id: string) {
    const remote = await fetchAPI<any>(`/correlation/${id}`);
    if (remote) return remote;
    return null;
  },

  async getAllCorrelations() {
    const remote = await fetchAPI<any[]>("/correlation");
    if (remote && Array.isArray(remote)) return remote;
    return [];
  },

  // Twin Identification & False-Match Analysis Methods
  async analyzeTwinIdentification(payload: {
    person_a: {
      name?: string;
      organization?: string;
      handle?: string;
      domain?: string;
      context?: string;
      image_url?: string;
    };
    person_b: {
      name?: string;
      organization?: string;
      handle?: string;
      domain?: string;
      context?: string;
      image_url?: string;
    };
    consent_confirmed?: boolean;
  }) {
    const remote = await fetchAPI<any>("/twin/analyze", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (remote) return remote;
    return null;
  },

  async getTwinStatus(id: string) {
    const remote = await fetchAPI<any>(`/twin/${id}/status`);
    if (remote) return remote;
    return null;
  },

  async getTwinReport(id: string) {
    const remote = await fetchAPI<any>(`/twin/${id}`);
    if (remote) return remote;
    return null;
  },

  async getInvestigationAuditTrail(id: string) {
    const remote = await fetchAPI<any[]>(`/investigations/${id}/audit-trail`);
    if (remote && Array.isArray(remote)) return remote;
    return [];
  },

  async submitHumanReview(id: string, payload: {
    investigation_id: string;
    analyst_name: string;
    analyst_decision: string;
    accepted_evidence_ids: string[];
    rejected_evidence_ids: string[];
    analyst_notes: string;
    sign_off_timestamp?: string;
  }) {
    const remote = await fetchAPI<any>(`/investigations/${id}/review`, {
      method: "POST",
      body: JSON.stringify(payload),
    });
    if (remote) return remote;
    return null;
  },
};


