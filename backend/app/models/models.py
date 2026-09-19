import datetime
from sqlalchemy import Column, String, Integer, Float, Boolean, DateTime, Text, ForeignKey, JSON
from sqlalchemy.orm import relationship
from backend.app.database import Base

class Investigation(Base):
    __tablename__ = "investigations"

    id = Column(String(50), primary_key=True, index=True)
    status = Column(String(50), default="CREATED", index=True)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.datetime.utcnow, onupdate=datetime.datetime.utcnow)
    image_reference = Column(String(500), nullable=True)
    known_name = Column(String(200), nullable=False)
    username = Column(String(200), nullable=True)
    organization = Column(String(200), nullable=True)
    known_platform = Column(String(200), nullable=True)
    additional_context = Column(Text, nullable=True)
    consent_status = Column(Boolean, default=True)

    # Relationships
    candidates = relationship("Candidate", back_populates="investigation", cascade="all, delete-orphan")
    profiles = relationship("PublicProfile", back_populates="investigation", cascade="all, delete-orphan")
    evidence_items = relationship("Evidence", back_populates="investigation", cascade="all, delete-orphan")
    timeline_events = relationship("TimelineEvent", back_populates="investigation", cascade="all, delete-orphan")
    conflicts = relationship("Conflict", back_populates="investigation", cascade="all, delete-orphan")


class Candidate(Base):
    __tablename__ = "candidates"

    id = Column(String(50), primary_key=True, index=True)
    investigation_id = Column(String(50), ForeignKey("investigations.id"), nullable=False)
    candidate_code = Column(String(50), nullable=False) # e.g. "Candidate A"
    name = Column(String(200), nullable=False)
    username = Column(String(200), nullable=True)
    avatar_url = Column(String(500), nullable=True)
    primary_role = Column(String(300), nullable=True)
    location = Column(String(200), nullable=True)
    status = Column(String(50), default="SUPPORTED")
    status_note = Column(Text, nullable=True)
    evidence_count = Column(Integer, default=0)
    score_explanation = Column(Text, nullable=True)
    organizations_json = Column(JSON, default=list)
    platforms_json = Column(JSON, default=list)
    signals_json = Column(JSON, default=dict)
    signal_breakdown_json = Column(JSON, default=list)

    investigation = relationship("Investigation", back_populates="candidates")


class PersonEntity(Base):
    __tablename__ = "person_entities"

    id = Column(String(50), primary_key=True, index=True)
    canonical_name = Column(String(200), nullable=False)
    verified = Column(Boolean, default=True)
    primary_location = Column(String(200), nullable=True)


class PublicProfile(Base):
    __tablename__ = "public_profiles"

    id = Column(String(50), primary_key=True, index=True)
    investigation_id = Column(String(50), ForeignKey("investigations.id"), nullable=False)
    platform = Column(String(100), nullable=False)
    profile_url = Column(String(500), nullable=True)
    display_name = Column(String(200), nullable=True)
    username = Column(String(200), nullable=True)
    description = Column(Text, nullable=True)
    organization = Column(String(200), nullable=True)
    source_id = Column(String(50), nullable=True)
    verified = Column(Boolean, default=False)
    public_metadata = Column(JSON, default=dict)

    investigation = relationship("Investigation", back_populates="profiles")


class Source(Base):
    __tablename__ = "sources"

    id = Column(String(50), primary_key=True, index=True)
    source_name = Column(String(200), nullable=False)
    platform = Column(String(100), nullable=False)
    source_type = Column(String(100), nullable=False) # Professional, Technical, Company, Event, Publication
    reliability = Column(String(50), default="HIGH") # HIGH, MEDIUM, LOW
    last_checked = Column(String(100), nullable=True)
    endpoint_or_domain = Column(String(300), nullable=True)
    verified_signatures = Column(Integer, default=0)
    status = Column(String(50), default="VERIFIED")


class Evidence(Base):
    __tablename__ = "evidence"

    id = Column(String(50), primary_key=True, index=True)
    investigation_id = Column(String(50), ForeignKey("investigations.id"), nullable=False)
    candidate_id = Column(String(50), nullable=True)
    claim = Column(Text, nullable=False)
    source_id = Column(String(50), nullable=True)
    source_url = Column(String(500), nullable=True)
    source_type = Column(String(100), nullable=True)
    evidence_text = Column(Text, nullable=False)
    timestamp = Column(String(100), nullable=True)
    reliability = Column(String(50), default="HIGH")
    confidence = Column(String(50), default="95%")
    provenance = Column(Text, nullable=True)
    supporting_signals_json = Column(JSON, default=list)
    conflicting_signals_json = Column(JSON, default=list)

    investigation = relationship("Investigation", back_populates="evidence_items")


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    domain = Column(String(200), nullable=True)
    verified = Column(Boolean, default=True)


class Project(Base):
    __tablename__ = "projects"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    repo_url = Column(String(500), nullable=True)
    role = Column(String(100), nullable=True)


class Event(Base):
    __tablename__ = "events"

    id = Column(String(50), primary_key=True, index=True)
    name = Column(String(200), nullable=False)
    year = Column(String(20), nullable=True)
    location = Column(String(200), nullable=True)
    role = Column(String(100), nullable=True)


class Publication(Base):
    __tablename__ = "publications"

    id = Column(String(50), primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    year = Column(String(20), nullable=True)
    doi_or_url = Column(String(500), nullable=True)


class Alias(Base):
    __tablename__ = "aliases"

    id = Column(String(50), primary_key=True, index=True)
    person_id = Column(String(50), nullable=False)
    alias_name = Column(String(200), nullable=False)


class Username(Base):
    __tablename__ = "usernames"

    id = Column(String(50), primary_key=True, index=True)
    person_id = Column(String(50), nullable=False)
    handle = Column(String(200), nullable=False)
    platform = Column(String(100), nullable=True)


class TimelineEvent(Base):
    __tablename__ = "timeline_events"

    id = Column(String(50), primary_key=True, index=True)
    investigation_id = Column(String(50), ForeignKey("investigations.id"), nullable=False)
    year = Column(String(20), nullable=False)
    date_range = Column(String(100), nullable=True)
    role = Column(String(200), nullable=False)
    organization = Column(String(200), nullable=False)
    category = Column(String(50), default="Career")
    evidence_text = Column(Text, nullable=False)
    source = Column(String(200), nullable=False)
    source_reliability = Column(String(50), default="HIGH")
    is_conflict = Column(Boolean, default=False)
    conflict_details = Column(Text, nullable=True)
    verified = Column(Boolean, default=True)

    investigation = relationship("Investigation", back_populates="timeline_events")


class Relationship(Base):
    __tablename__ = "relationships"

    id = Column(String(50), primary_key=True, index=True)
    investigation_id = Column(String(50), nullable=False)
    source_node = Column(String(100), nullable=False)
    target_node = Column(String(100), nullable=False)
    relation_type = Column(String(100), nullable=False) # works_at, created, attended, contributed_to, published, profile_of
    status = Column(String(50), default="verified") # verified, ambiguous, conflicting
    confidence = Column(String(50), default="95%")
    source_ref = Column(String(200), nullable=True)


class Conflict(Base):
    __tablename__ = "conflicts"

    id = Column(String(50), primary_key=True, index=True)
    investigation_id = Column(String(50), ForeignKey("investigations.id"), nullable=False)
    conflict_type = Column(String(100), nullable=False) # ROLE_CONFLICT, TIMELINE_CONFLICT, LOCATION_CONFLICT
    severity = Column(String(50), default="MEDIUM") # HIGH, MEDIUM, LOW
    description = Column(Text, nullable=False)
    sources_json = Column(JSON, default=list)

    investigation = relationship("Investigation", back_populates="conflicts")


class AnalysisResult(Base):
    __tablename__ = "analysis_results"

    id = Column(String(50), primary_key=True, index=True)
    investigation_id = Column(String(50), unique=True, nullable=False)
    identity_assessment = Column(Text, nullable=False)
    key_evidence_json = Column(JSON, default=list)
    conflicting_evidence_json = Column(JSON, default=list)
    unknowns_json = Column(JSON, default=list)
    human_review_recommendation = Column(Text, nullable=False)
    dna_signals_json = Column(JSON, default=list)
    twin_guard_json = Column(JSON, default=dict)
    counterfactual_json = Column(JSON, default=dict)
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)
    model_provenance = Column(String(200), default="TRACEID AI Causal Engine v4.2")


class Report(Base):
    __tablename__ = "reports"

    id = Column(String(50), primary_key=True, index=True)
    investigation_id = Column(String(50), unique=True, nullable=False)
    content_json = Column(JSON, nullable=False)
    generated_at = Column(DateTime, default=datetime.datetime.utcnow)
