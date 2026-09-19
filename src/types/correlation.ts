export interface PlatformEntity {
  platform_id: string;
  name: string;
  entity_title: string;
  role_type: string;
  handle: string;
  url: string;
  domain?: string;
  organization?: string;
  signals: string[];
  evidence_snippets: string[];
  confidence: "HIGH" | "MEDIUM" | "LOW";
  status: "ANALYZED" | "NOT_DISCOVERED";
}

export interface CorrelationNode {
  id: string;
  type: "SUBJECT" | "PLATFORM" | "PROJECT_EVENT";
  label: string;
  subtitle?: string;
  avatar?: string;
  url?: string;
  status?: string;
  color?: string;
}

export interface CorrelationEdge {
  id: string;
  source: string;
  target: string;
  label: string;
  reasons: string[];
  status: "SUPPORTED" | "AMBIGUOUS" | "CONFLICTING" | "INSUFFICIENT";
  weight: number;
}

export interface CorrelationMatrixCell {
  platform_from: string;
  platform_to: string;
  status: "SUPPORTED" | "AMBIGUOUS" | "CONFLICTING" | "INSUFFICIENT" | "SELF";
  symbol: string;
  score: number;
  signals: string[];
  evidence: string;
  sources: string[];
}

export interface CorrelationMatrixRow {
  platform: string;
  platform_id: string;
  cells: CorrelationMatrixCell[];
}

export interface ObservedSignalItem {
  title: string;
  status: "VERIFIED" | "AMBIGUOUS" | "CONFLICTING" | "UNVERIFIED";
  description: string;
}

export interface MultiPlatformCorrelationReport {
  id: string;
  subject_name: string;
  organization?: string;
  domain?: string;
  additional_context?: string;
  avatar_url?: string;
  created_at: string;
  status: "COMPLETED" | "IN_PROGRESS" | "FAILED";
  final_correlation_status: "SUPPORTED" | "AMBIGUOUS" | "CONFLICTING" | "INSUFFICIENT EVIDENCE";
  overview: {
    platforms_analyzed_count: number;
    signals_compared_count: number;
    relationships_found_count: number;
    conflicts_count: number;
    evidence_sources_count: number;
  };
  platforms: PlatformEntity[];
  graph: {
    nodes: CorrelationNode[];
    edges: CorrelationEdge[];
  };
  matrix: {
    headers: string[];
    rows: CorrelationMatrixRow[];
  };
  explainability: {
    observed_signals: ObservedSignalItem[];
    conflicts: any[];
    jury_statement: string;
    algorithm_rationale: string;
  };
  disclaimer: string;
}

export interface CorrelationProgressState {
  investigation_id: string;
  status: "IN_PROGRESS" | "COMPLETED" | "FAILED";
  current_stage: string;
  progress_percent: number;
  completed_stages: string[];
  signals_compared: number;
  relationships_found: number;
  conflicts_count: number;
  evidence_sources: number;
  result?: MultiPlatformCorrelationReport;
}
