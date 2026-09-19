import abc
import datetime
from typing import Dict, Any, List, Optional
from pydantic import BaseModel, Field

class NormalizedSourceRecord(BaseModel):
    source_id: str
    source_type: str # WIKIDATA, WIKIPEDIA, GITHUB, WEB_SEARCH, OFFICIAL_REGISTRY, ACADEMIC_INDEX
    title: str
    url: str
    content: str
    entities: List[Dict[str, Any]] = Field(default_factory=list)
    relationships: List[Dict[str, Any]] = Field(default_factory=list)
    retrieved_at: str = Field(default_factory=lambda: datetime.datetime.now(datetime.timezone.utc).isoformat())
    reliability: str = 'MEDIUM' # HIGH, MEDIUM, LOW
    source_mode: str = 'PUBLIC_RETRIEVAL' # PUBLIC_RETRIEVAL, CACHED_PUBLIC_EVIDENCE, DEMO_SEED
    raw_payload: Dict[str, Any] = Field(default_factory=dict)

class PublicSourceConnector(abc.ABC):
    @abc.abstractmethod
    def search(self, query: str) -> List[NormalizedSourceRecord]:
        pass

    @abc.abstractmethod
    def get_entity(self, identifier: str) -> Optional[NormalizedSourceRecord]:
        pass

    @abc.abstractmethod
    def get_profile(self, identifier: str) -> Optional[NormalizedSourceRecord]:
        pass

    @abc.abstractmethod
    def get_related_entities(self, identifier: str) -> List[NormalizedSourceRecord]:
        pass
