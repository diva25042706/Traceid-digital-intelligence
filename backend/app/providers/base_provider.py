import datetime
from abc import ABC, abstractmethod
from typing import List, Dict, Any, Optional

class BaseProvider(ABC):
    """
    Abstract Base Class for TRACEID Public Discovery Providers.
    All providers must adhere to normalized public intelligence contracts.
    """

    def __init__(self, name: str, provider_type: str):
        self.name = name
        self.provider_type = provider_type # KNOWLEDGE_GRAPH, WEB_SEARCH, TECHNICAL, VIDEO, SOCIAL, DIRECTORY

    @abstractmethod
    def search_person(self, name: str, organization: str = "", domain: str = "", context: str = "") -> List[Dict[str, Any]]:
        """Search public entity records for a person."""
        pass

    def get_timestamp(self) -> str:
        return datetime.datetime.now(datetime.timezone.utc).isoformat()