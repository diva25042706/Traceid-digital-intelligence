export type InvestigationStatus =
  | "ACTIVE"
  | "COMPLETED"
  | "REVIEW REQUIRED"
  | "INSUFFICIENT EVIDENCE"
  | "ANALYSIS COMPLETE"
  | "HUMAN SIGNED OFF"
  | string;

export type ConfidenceStatus =
  | "HIGH CONFIDENCE"
  | "SUPPORTED"
  | "AMBIGUOUS"
  | "CONFLICTING"
  | "INSUFFICIENT EVIDENCE"
  | "UNDER REVIEW";

export type PipelineStepStatus = "completed" | "current" | "warning" | "conflict" | "pending";

export interface PipelineStep {
  id: string;
  name: string;
  shortName: string;
  status: PipelineStepStatus;
  description: string;
  details?: string;
  timestamp?: string;
}

export interface SignalMetric {
  name: string;
  value: number; // 0 - 100
  label: "Supported" | "Strong" | "Consistent" | "Partial" | "Weak" | "Conflicting" | string;
  description: string;
  supporting_evidence_count?: number;
  contradicting_evidence_count?: number;
  details?: string;
}

export interface SignalCheck {
  name: string;
  matched: boolean;
  status: "match" | "conflict" | "unverified" | "ambiguous";
  detail: string;
}

export interface AdversarialEvidenceItem {
  id: string;
  claim: string;
  category: string;
  source: string;
  url?: string;
  date?: string;
  provenance_hash?: string;
  evidence_type: "SUPPORTING" | "CONTRADICTING" | string;
  weight: number;
  rationale: string;
}

export interface CandidateIdentity {
  id: string;
  candidateCode: "Candidate A" | "Candidate B" | "Candidate C" | "Candidate D" | string;
  name: string;
  username: string;
  avatarUrl: string;
  primaryRole: string;
  organizations: string[];
  platforms: {
    platform: string;
    handle: string;
    verified: boolean;
    url?: string;
  }[];
  status: ConfidenceStatus;
  statusNote: string;
  evidenceCount: number;
  supportingSignals: string[];
  conflictingSignals: string[];
  signalBreakdown: SignalCheck[];
  location?: string;
  matchScoreExplanation: string;
  // Advanced Adversarial Engine
  supporting_evidence?: AdversarialEvidenceItem[];
  contradicting_evidence?: AdversarialEvidenceItem[];
  evidence_strength?: number;
  major_concerns?: string[];
  final_evidence_status?: string;
}

export interface TwinGuardComparison {
  detected: boolean;
  severity: "low" | "medium" | "high";
  title: string;
  subtitle: string;
  reasons: string[];
  candidateA: {
    name: string;
    handle: string;
    org: string;
    location: string;
    avatar: string;
    keyDistinctiveFactor: string;
  };
  candidateB: {
    name: string;
    handle: string;
    org: string;
    location: string;
    avatar: string;
    keyDistinctiveFactor: string;
  };
  recommendation: string;
  requiredAction: string;
}

export interface CounterfactualItem {
  id: string;
  title: string;
  category: "organization" | "username" | "project" | "timeline" | "location" | "role" | "publication" | string;
  detail: string;
  source: string;
  confidenceWeight: number; // 1-5
}

export interface CounterfactualAnalysis {
  supporting: CounterfactualItem[];
  contradicting: CounterfactualItem[];
  overallAssessment: ConfidenceStatus;
  assessmentRationale: string;
}

export interface TimelineEventItem {
  id: string;
  year: string;
  dateRange?: string;
  role: string;
  organization: string;
  category: "Career" | "Education" | "Projects" | "Events" | "Publications" | "Organizations" | string;
  evidenceText: string;
  source: string;
  sourceReliability: "HIGH" | "MEDIUM" | "LOW" | string;
  isConflict?: boolean;
  conflictDetails?: string;
  verified: boolean;
}

export interface AIAnalystReport {
  identityAssessment: string;
  keyEvidence: string[];
  conflictingEvidence: string[];
  unknowns: string[];
  humanReviewRecommendation: string;
  generatedAt: string;
  modelProvenance: string;
}

export type NodeType =
  | "person"
  | "profile"
  | "organization"
  | "project"
  | "event"
  | "publication"
  | "source";

export interface EvidenceNodeData {
  id: string;
  type: NodeType;
  label: string;
  subtitle?: string;
  avatar?: string;
  icon?: string;
  status?: "verified" | "ambiguous" | "conflicting" | "normal";
  reliability?: "HIGH" | "MEDIUM" | "LOW" | string;
  metadata?: Record<string, any>;
  claimCount?: number;
  [key: string]: any;
}

export interface EvidenceEdgeData {
  id: string;
  source: string;
  target: string;
  label: "works_at" | "created" | "attended" | "contributed_to" | "published" | "profile_of" | "associated_with" | string;
  status: "verified" | "ambiguous" | "conflicting" | "normal" | string;
  sourceRef?: string;
  confidence?: string;
}

export interface EvidenceDetail {
  id: string;
  claim: string;
  source: string;
  sourceType: string;
  evidenceSnippet: string;
  reliability: "HIGH" | "MEDIUM" | "LOW" | string;
  timestamp: string;
  confidenceLevel: string;
  provenance: string;
  supportingSignals: string[];
  conflictingEvidence: string[];
  url?: string;
}

export interface SourceItem {
  id: string;
  source: string;
  platform: string;
  type: "Professional" | "Technical" | "Company" | "Event" | "Publication" | "Media" | string;
  reliability: "HIGH" | "MEDIUM" | "LOW" | string;
  lastChecked: string;
  evidenceCount: number;
  status: "VERIFIED" | "CONFLICTING" | "UNRESOLVED" | "ARCHIVED" | string;
  endpointOrDomain: string;
  verifiedSignatures: number;
}

export interface InvestigationCoverage {
  category: "Professional" | "Technical" | "Social" | "Events" | "Projects" | "Publications" | string;
  coveragePercent: number;
  evidenceCount: number;
  note: string;
}

export interface AuditTrailStep {
  id: string;
  step_index: number;
  stage: string;
  agent: string;
  agent_role: string;
  action: string;
  source: string;
  claim: string;
  result: string;
  timestamp: string;
  status: string;
  provenance?: string;
}

export interface AgentRecord {
  id: string;
  name: string;
  role: string;
  permissions: string[];
  constraints: string;
  avatar_icon?: string;
  status: string;
  actions_performed: string[];
  findings_count: number;
}

export interface RiskUncertainty {
  evidence_status: string;
  supporting_evidence_count: number;
  contradicting_evidence_count: number;
  unresolved_signals_count: number;
  major_concerns: string[];
  human_review_required: boolean;
  risk_level: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL" | string;
}

export interface HumanReviewState {
  status: string;
  analyst_name?: string | null;
  analyst_decision: string;
  accepted_evidence_ids: string[];
  rejected_evidence_ids: string[];
  analyst_notes: string;
  signed_off: boolean;
  sign_off_timestamp?: string | null;
}

export interface Investigation {
  id: string;
  subjectName: string;
  alias: string;
  organization: string;
  knownPlatform: string;
  avatarUrl: string;
  createdAt: string;
  status: InvestigationStatus;
  coverage: InvestigationCoverage[];
  pipeline: PipelineStep[];
  dnaSignals: SignalMetric[];
  candidates: CandidateIdentity[];
  twinGuard: TwinGuardComparison;
  counterfactual: CounterfactualAnalysis;
  timeline: TimelineEventItem[];
  aiAnalyst: AIAnalystReport;
  sourcesCount: number;
  candidatesCount: number;
  evidenceLinksCount: number;
  ambiguitiesCount: number;
  nodes: EvidenceNodeData[];
  edges: EvidenceEdgeData[];
  // Advanced Investigation Engine Features
  audit_trail?: AuditTrailStep[];
  agents?: AgentRecord[];
  risk_uncertainty?: RiskUncertainty;
  human_review?: HumanReviewState;
}

export interface AdversarialTestCase {
  id: string;
  title: string;
  category:
    | "Normal Identity"
    | "Common Name"
    | "Similar Username"
    | "Different Aliases"
    | "Similar Profiles"
    | "Look-Alike"
    | "Conflicting Information"
    | "Conflicting Organization"
    | "Conflicting Timeline"
    | "Missing Information"
    | "Outdated Information"
    | "Insufficient Evidence"
    | string;
  inputContext: {
    name: string;
    alias?: string;
    org?: string;
    photoType: string;
  };
  candidatesFound: number;
  detectedRisk: string;
  finalStatus: ConfidenceStatus;
  systemReasoning: string;
  twinGuardTriggered: boolean;
  counterfactualSummary: string;
  evidenceStrength?: number;
  majorConcerns?: string[];
  supportingCount?: number;
  contradictingCount?: number;
  selfChallengeResult?: string;
}

export interface DiscoveredProfile {
  profile_id: string;
  platform: string;
  display_name: string;
  username: string;
  url: string;
  source_type: "PROFESSIONAL" | "COMMUNITY" | "TECHNICAL" | "EDUCATIONAL" | string;
  category: "PROFESSIONAL" | "COMMUNITY" | "TECHNICAL" | "EDUCATIONAL" | string;
  description: string;
  matched_signals: string[];
  evidence: string[];
  reliability: "HIGH" | "MEDIUM" | "LOW" | string;
  status: "DISCOVERED" | "NOT_DISCOVERED" | string;
  retrieved_at: string;
}

export interface PublicRecordItem {
  id: string;
  title: string;
  category: "COMMUNITY" | "TECHNICAL" | "EDUCATIONAL" | "PROJECTS" | "EVENTS" | string;
  source: string;
  url: string;
  evidence: string;
  retrieved_at: string;
  reliability: "HIGH" | "MEDIUM" | "LOW" | string;
}

export interface ProfileDiscoveryReport {
  id: string;
  subject_name: string;
  alias: string;
  organization: string;
  domain: string;
  additional_context: string;
  avatar_url: string;
  created_at: string;
  status: string;
  queries_generated: string[];
  sources_searched_count: number;
  profiles_discovered_count: number;
  verified_sources_count: number;
  profiles: DiscoveredProfile[];
  public_records: PublicRecordItem[];
  categories: {
    PROFESSIONAL?: DiscoveredProfile[];
    COMMUNITY?: DiscoveredProfile[];
    TECHNICAL?: DiscoveredProfile[];
    EDUCATIONAL?: DiscoveredProfile[];
    PROJECTS?: DiscoveredProfile[];
    EVENTS?: DiscoveredProfile[];
    [key: string]: DiscoveredProfile[] | undefined;
  };
  confidence_assessment?: string;
  why_this_result?: string[];
  discovery_summary: string;
  disclaimer: string;
}

export interface DiscoveryProgressState {
  discovery_id: string;
  status: "IN_PROGRESS" | "COMPLETED";
  current_stage: string;
  progress_percent: number;
  completed_stages: string[];
  queries_generated: number;
  sources_searched: number;
  profiles_discovered: number;
  community_records: number;
  project_records: number;
  event_records: number;
  verified_sources: number;
  result?: ProfileDiscoveryReport | null;
}
