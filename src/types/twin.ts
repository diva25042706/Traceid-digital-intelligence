export interface TwinSubject {
  name?: string;
  organization?: string;
  handle?: string;
  domain?: string;
  context?: string;
  avatar_url?: string;
}

export interface SignalComparisonRow {
  signal: string;
  person_a: string;
  person_b: string;
  relationship: string;
  status: "SUPPORTING" | "MATCH" | "CONFLICT" | "CONSISTENT" | "NEUTRAL";
  evidence: string;
}

export interface FalseMatchFactor {
  factor: string;
  detected: boolean;
  detail: string;
}

export interface FalseMatchAnalysis {
  potential_false_match: boolean;
  risk_level: "HIGH" | "MEDIUM" | "LOW";
  contradictions: string[];
  risk_factors: FalseMatchFactor[];
}

export interface EvidenceFusion {
  visual_evidence: string;
  name_evidence: string;
  organization_evidence: string;
  domain_evidence: string;
  timeline_evidence: string;
  conclusion: "SAME ENTITY" | "DISTINCT ENTITIES" | "AMBIGUOUS" | "INSUFFICIENT EVIDENCE";
  conclusion_summary: string;
}

export interface TwinEvidenceGraphNode {
  id: string;
  type: "SUBJECT_A" | "SUBJECT_B" | "ENGINE" | "SIGNAL";
  label: string;
  subtitle?: string;
  color?: string;
}

export interface TwinEvidenceGraphEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  status: "SUPPORTS" | "CONTRADICTS" | "CONSISTENT" | "UNKNOWN";
}

export interface TwinSourceLedgerItem {
  platform: string;
  url: string;
  source_type: string;
  retrieved_at: string;
  evidence: string;
  reliability: string;
}

export interface TwinReport {
  id: string;
  created_at: string;
  status: "COMPLETED" | "IN_PROGRESS" | "FAILED";
  final_status: "SAME ENTITY" | "DISTINCT ENTITIES" | "AMBIGUOUS" | "INSUFFICIENT EVIDENCE";
  person_a: TwinSubject;
  person_b: TwinSubject;
  visual_similarity_percent: number;
  comparison_matrix: SignalComparisonRow[];
  false_match_analysis: FalseMatchAnalysis;
  evidence_fusion: EvidenceFusion;
  graph: {
    nodes: TwinEvidenceGraphNode[];
    edges: TwinEvidenceGraphEdge[];
  };
  source_ledger: TwinSourceLedgerItem[];
  disclaimer: string;
}

export interface TwinProgressState {
  investigation_id: string;
  status: "IN_PROGRESS" | "COMPLETED" | "FAILED";
  current_stage: string;
  progress_percent: number;
  completed_stages: string[];
  signals_compared: number;
  contradictions_found: number;
  evidence_sources: number;
  result?: TwinReport;
}
