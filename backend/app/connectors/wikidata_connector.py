import requests
import datetime
from typing import Dict, Any, List, Optional

class WikidataConnector:
    """
    Real-time public Wikidata knowledge graph connector.
    Queries public Wikidata REST API for entity attributes, employers, occupations, and official links.
    """

    SEARCH_API = "https://www.wikidata.org/w/api.php"
    ENTITY_API = "https://www.wikidata.org/wiki/Special:EntityData"

    def search_person(self, name: str, expected_org: str = "") -> List[Dict[str, Any]]:
        """Searches Wikidata for public person entities matching name and optional context."""
        if not name or len(name.strip()) < 2:
            return []

        try:
            params = {
                "action": "wbsearchentities",
                "search": name.strip(),
                "language": "en",
                "limit": 5,
                "format": "json"
            }
            headers = {"User-Agent": "TraceID-AI/4.2 (Responsible Cybersecurity Identity Intelligence; contact@traceid.ai)"}
            res = requests.get(self.SEARCH_API, params=params, headers=headers, timeout=5)
            if res.status_code != 200:
                return []

            data = res.json()
            results = data.get("search", [])
            entities = []

            for item in results:
                q_id = item.get("id")
                label = item.get("label", "")
                desc = item.get("description", "")
                aliases = item.get("aliases", [])
                url = item.get("url", f"https://www.wikidata.org/wiki/{q_id}")

                entities.append({
                    "source": "Wikidata",
                    "entity_id": q_id,
                    "label": label,
                    "description": desc,
                    "aliases": aliases,
                    "source_url": url,
                    "retrieved_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                    "reliability": "HIGH",
                    "claims": {
                        "canonical_name": label,
                        "description": desc,
                        "wikidata_id": q_id
                    }
                })

            return entities
        except Exception as e:
            print(f"[WikidataConnector] Note: {e}")
            return []

    def search_entities(self, name: str, expected_org: str = "") -> List[Dict[str, Any]]:
        """Alias for search_person."""
        return self.search_person(name, expected_org)

    def get_entity_claims(self, entity_id: str) -> Dict[str, Any]:

        """Fetches detailed property claims for a specific Wikidata Q-ID."""
        try:
            url = f"{self.ENTITY_API}/{entity_id}.json"
            headers = {"User-Agent": "TraceID-AI/4.2 (Responsible Cybersecurity Identity Intelligence)"}
            res = requests.get(url, headers=headers, timeout=5)
            if res.status_code != 200:
                return {}
            data = res.json()
            entities = data.get("entities", {})
            entity = entities.get(entity_id, {})
            claims = entity.get("claims", {})
            return {
                "entity_id": entity_id,
                "raw_claims_count": len(claims),
                "url": f"https://www.wikidata.org/wiki/{entity_id}"
            }
        except Exception as e:
            return {}

wikidata_connector = WikidataConnector()
