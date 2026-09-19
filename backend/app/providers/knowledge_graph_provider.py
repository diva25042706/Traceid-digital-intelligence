import urllib.request
import urllib.parse
import json
from typing import List, Dict, Any
from backend.app.providers.base_provider import BaseProvider

class KnowledgeGraphProvider(BaseProvider):
    """
    Open Knowledge Graph Provider (Wikipedia / DBpedia Open Graph).
    Retrieves disambiguated entity data, canonical titles, descriptions, and thumbnail references.
    """

    def __init__(self):
        super().__init__(name="Open Knowledge Graph", provider_type="KNOWLEDGE_GRAPH")

    def search_person(self, name: str, organization: str = "", domain: str = "", context: str = "") -> List[Dict[str, Any]]:
        if not name or not name.strip():
            return []

        clean_name = name.strip()
        encoded = urllib.parse.quote(clean_name.replace(" ", "_"))
        url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{encoded}"
        headers = {
            "User-Agent": "TRACEID-Bot/2.0 (Responsible AI Research; traceid@anticounterfeit.ai)"
        }

        results: List[Dict[str, Any]] = []
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=4) as response:
                data = json.loads(response.read().decode("utf-8"))
                if data.get("type") in ["standard", "disambiguation"] or data.get("title"):
                    title = data.get("title", clean_name)
                    extract = data.get("extract", "")
                    page_url = data.get("content_urls", {}).get("desktop", {}).get("page", f"https://en.wikipedia.org/wiki/{encoded}")
                    thumbnail = data.get("thumbnail", {}).get("source")

                    results.append({
                        "provider": self.name,
                        "entity_name": title,
                        "description": extract or data.get("description", ""),
                        "url": page_url,
                        "image_url": thumbnail,
                        "entity_type": "Person" if "born" in extract.lower() or "is a" in extract.lower() else "Entity",
                        "retrieved_at": self.get_timestamp(),
                        "reliability": "HIGH"
                    })
        except Exception:
            pass

        return results

knowledge_graph_provider = KnowledgeGraphProvider()