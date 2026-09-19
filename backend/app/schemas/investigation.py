from typing import List, Optional, Dict, Any
from datetime import datetime
from pydantic import BaseModel, Field

# Base Enums/Literals
InvestigationStatusEnum = str # CREATED, ANALYZING, COMPLETED, REVIEW_REQUIRED, INSUFFICIENT_EVIDENCE, FAILED
ConfidenceStatusEnum = str # HIGH CONFIDENCE, SUPPORTED, AMBIGUOUS, CONFLICTING, INSUFFICIENT EVIDENCE, UNDER REVIEW

class InvestigationCreate(BaseModel):
    subject_name: str
    alias: Optional[str] = ""
    organization: Optional[str] = ""
    known_platform: Optional[str] = ""
    additional_context: Optional[str] = ""
    image_reference: Optional[str] = None
    consent_confirmed: bool = True

class SignalCheckSchema(BaseModel):
    name: str
    matched: bool
    status: str # match, conflict, unverified, ambiguous
    detail: str

class PlatformSchema(BaseModel):
    platform: str
    handle: str
    verified: bool = False
    url: Optional[str] = None

class CandidateSchema(BaseModel):
    id: str
    candidate_code: str
    name: str
    username: str
    avatar_url: Optional[str] = None
    primary_role: Optional[str] = None
    organizations: List[str] = []
    location: Optional[str] = None
    platforms: List[PlatformSchema] = []
    status: str # SUPPORTED, AMBIGUOUS, CONFLICTING, INSUFFICIENT EVIDENCE
    status_note: str
    evidence_count: int = 0
    supporting_signals: List[str] = []
    conflicting_signals: List[str] = []
    signal_breakdown: List[SignalCheckSchema] = []
    match_score_explanation: str
    # Evidence Adversarial Fields
    supporting_evidence: List[Dict[str, Any]] = []
    contradicting_evidence: List[Dict[str, Any]] = []
    evidence_strength: float = 0.0
    major_concerns: List[str] = []
    final_evidence_status: Optional[str] = None

class SignalMetricSchema(BaseModel):
    name: str
    value: int # 0-100
    label: str # Supported, Strong, Consistent, Partial, Weak, Conflicting
    description: str
    supporting_evidence_count: Optional[int] = 1
    contradicting_evidence_count: Optional[int] = 0
    details: Optional[str] = None

class PipelineStepSchema(BaseModel):
    id: str
    name: str
    short_name: str
    status: str # completed, current, warning, conflict, pending
    description: str
    timestamp: Optional[str] = None

class CounterfactualItemSchema(BaseModel):
    id: str
    title: str
    category: str
    detail: str
    source: str
    confidence_weight: int

class CounterfactualSchema(BaseModel):
    overall_assessment: str
    assessment_rationale: str
    supporting: List[CounterfactualItemSchema] = []
    contradicting: List[CounterfactualItemSchema] = []

class TwinGuardCandidate(BaseModel):
    name: str
    handle: str
    org: str
    location: str
    avatar: str
    key_distinctive_factor: str

class TwinGuardSchema(BaseModel):
    detected: bool
    severity: str # low, medium, high
    title: str
    subtitle: str
    reasons: List[str] = []
    candidate_a: TwinGuardCandidate
    candidate_b: TwinGuardCandidate
    recommendation: str
    required_action: str

class TimelineItemSchema(BaseModel):
    id: str
    year: str
    date_range: Optional[str] = None
    role: str
    organization: str
    category: str # Career, Education, Projects, Events, Publications, Organizations
    evidence_text: str
    source: str
    source_reliability: str = "HIGH"
    is_conflict: bool = False
    conflict_details: Optional[str] = None
    verified: bool = True

class EvidenceSchema(BaseModel):
    id: str
    claim: str
    source: str
    source_type: str
    evidence_snippet: str
    reliability: str # HIGH, MEDIUM, LOW
    timestamp: str
    confidence_level: str
    provenance: str
    supporting_signals: List[str] = []
    conflicting_evidence: List[str] = []
    url: Optional[str] = None

class SourceSchema(BaseModel):
    id: str
    source: str
    platform: str
    type: str # Professional, Technical, Company, Event, Publication, Media
    reliability: str # HIGH, MEDIUM, LOW
    last_checked: str
    evidence_count: int
    status: str # VERIFIED, CONFLICTING, UNRESOLVED
    endpoint_or_domain: str
    verified_signatures: int = 0

class GraphNodeSchema(BaseModel):
    id: str
    type: str # person, organization, project, profile, publication, event, source
    label: str
    subtitle: Optional[str] = None
    avatar: Optional[str] = None
    icon: Optional[str] = None
    status: str = "verified"
    reliability: str = "HIGH"
    claim_count: Optional[int] = None
    metadata: Optional[Dict[str, Any]] = None

class GraphEdgeSchema(BaseModel):
    id: str
    source: str
    target: str
    label: str # works_at, created, attended, contributed_to, published, profile_of, associated_with
    status: str = "verified"
    confidence: Optional[str] = "95%"
    source_ref: Optional[str] = None

class GraphSchema(BaseModel):
    nodes: List[GraphNodeSchema] = []
    edges: List[GraphEdgeSchema] = []

class ConflictSchema(BaseModel):
    id: str
    type: str
    severity: str
    description: str
    sources: List[str] = []

class AIAnalystSchema(BaseModel):
    identity_assessment: str
    key_evidence: List[str] = []
    conflicting_evidence: List[str] = []
    unknowns: List[str] = []
    human_review_recommendation: str
    generated_at: str
    model_provenance: str

class CoverageItemSchema(BaseModel):
    category: str
    coverage_percent: int
    evidence_count: int
    note: str

# Audit Trail Replay Schema
class AuditTrailStepSchema(BaseModel):
    id: str
    step_index: int
    stage: str
    agent: str
    agent_role: str
    action: str
    source: str
    claim: str
    result: str
    timestamp: str
    status: str
    provenance: Optional[str] = None

# Multi-Agent Schema
class AgentRecordSchema(BaseModel):
    id: str
    name: str
    role: str
    permissions: List[str] = []
    constraints: str
    avatar_icon: Optional[str] = None
    status: str = "ACTIVE"
    actions_performed: List[str] = []
    findings_count: int = 0

# Risk & Uncertainty Panel Schema
class RiskUncertaintySchema(BaseModel):
    evidence_status: str # SUPPORTED, AMBIGUOUS, CONFLICTING, INSUFFICIENT EVIDENCE
    supporting_evidence_count: int = 0
    contradicting_evidence_count: int = 0
    unresolved_signals_count: int = 0
    major_concerns: List[str] = []
    human_review_required: bool = True
    risk_level: str = "LOW" # LOW, MEDIUM, HIGH, CRITICAL

# Human-in-the-Loop Review Submission
class HumanReviewSubmission(BaseModel):
    investigation_id: str
    analyst_name: str
    analyst_decision: str # SUPPORTED, AMBIGUOUS, CONFLICTING, INSUFFICIENT EVIDENCE
    accepted_evidence_ids: List[str] = []
    rejected_evidence_ids: List[str] = []
    analyst_notes: str = ""
    sign_off_timestamp: Optional[str] = None

class InvestigationResponse(BaseModel):
    id: str
    subject_name: str
    alias: str
    organization: str
    known_platform: str
    avatar_url: Optional[str] = None
    created_at: str
    status: str
    sources_count: int = 0
    candidates_count: int = 0
    evidence_links_count: int = 0
    ambiguities_count: int = 0
    coverage: List[CoverageItemSchema] = []
    pipeline: List[PipelineStepSchema] = []
    dna_signals: List[SignalMetricSchema] = []
    candidates: List[CandidateSchema] = []
    twin_guard: Optional[TwinGuardSchema] = None
    counterfactual: Optional[CounterfactualSchema] = None
    timeline: List[TimelineItemSchema] = []
    ai_analyst: Optional[AIAnalystSchema] = None
    nodes: List[GraphNodeSchema] = []
    edges: List[GraphEdgeSchema] = []
    # Advanced Investigation Additions
    audit_trail: List[AuditTrailStepSchema] = []
    agents: List[AgentRecordSchema] = []
    risk_uncertainty: Optional[RiskUncertaintySchema] = None
    human_review: Optional[Dict[str, Any]] = None

class PublicProfileSchema(BaseModel):
    id: str
    platform: str
    profile_url: Optional[str] = None
    display_name: Optional[str] = None
    username: Optional[str] = None
    description: Optional[str] = None
    organization: Optional[str] = None
    source_id: Optional[str] = None
    verified: bool = False
    public_metadata: Dict[str, Any] = {}

class AnalysisProgressSchema(BaseModel):
    investigation_id: str
    status: str # IN_PROGRESS, COMPLETED, FAILED, NOT_FOUND
    current_stage: str
    progress_percent: int
    completed_stages: List[str] = []
    sources_found: int = 0
    candidates_found: int = 0
    evidence_found: int = 0
    conflicts_found: int = 0
    result: Optional[InvestigationResponse] = None
