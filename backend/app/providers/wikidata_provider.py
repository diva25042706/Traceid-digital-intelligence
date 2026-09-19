import urllib.request
import urllib.parse
import json
from typing import List, Dict, Any
from backend.app.providers.base_provider import BaseProvider

class WikidataProvider(BaseProvider):
    """
    Wikidata Structured Public Knowledge Provider.
    Queries live Wikidata API dynamically without assuming specific people.
    """

    def __init__(self):
        super().__init__(name="Wikidata", provider_type="KNOWLEDGE_GRAPH")
        self.endpoint = "https://www.wikidata.org/w/api.php"

    def search_person(self, name: str, organization: str = "", domain: str = "", context: str = "") -> List[Dict[str, Any]]:
        if not name or not name.strip():
            return []

        clean_name = name.strip()
        params = {
            "action": "wbsearchentities",
            "search": clean_name,
            "language": "en",
            "format": "json",
            "limit": 5,
            "type": "item"
        }
        url = f"{self.endpoint}?{urllib.parse.urlencode(params)}"
        headers = {
            "User-Agent": "TRACEID-Bot/2.0 (Responsible AI Research; traceid@anticounterfeit.ai)"
        }

        results: List[Dict[str, Any]] = []
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=4) as response:
                data = json.loads(response.read().decode("utf-8"))
                for item in data.get("search", []):
                    entity_id = item.get("id")
                    label = item.get("label", "")
                    description = item.get("description", "")
                    
                    # Compute contextual relevance
                    relevance = 1.0 if clean_name.lower() == label.lower() else 0.7
                    if organization and organization.lower() in description.lower():
                        relevance = 1.0

                    results.append({
                        "provider": self.name,
                        "entity_id": entity_id,
                        "label": label,
                        "description": description,
                        "url": item.get("concepturi", f"https://www.wikidata.org/wiki/{entity_id}"),
                        "aliases": item.get("aliases", []),
                        "relevance_score": relevance,
                        "retrieved_at": self.get_timestamp(),
                        "reliability": "HIGH"
                    })
        except Exception:
            pass

        return results

wikidata_provider = WikidataProvider()