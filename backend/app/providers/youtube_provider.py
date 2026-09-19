import urllib.parse
from typing import List, Dict, Any
from backend.app.providers.base_provider import BaseProvider
from backend.app.providers.web_search_provider import web_search_provider

class YouTubeProvider(BaseProvider):
    """
    YouTube Public Channel and Content Discovery Provider.
    Dynamically identifies public channels, creator handles, and educational video series.
    """

    def __init__(self):
        super().__init__(name="YouTube", provider_type="VIDEO")

    def search_person(self, name: str, organization: str = "", domain: str = "", context: str = "") -> List[Dict[str, Any]]:
        if not name or not name.strip():
            return []

        clean_name = name.strip()
        query = f'"{clean_name}" site:youtube.com'
        if organization:
            query = f'"{clean_name}" "{organization}" site:youtube.com'

        search_results = web_search_provider.search(query)
        results: List[Dict[str, Any]] = []

        for r in search_results:
            url = r.get("url", "")
            if "youtube.com/" in url:
                if any(x in url for x in ["/channel/", "/c/", "/user/", "/@", "/watch"]):
                    results.append({
                        "provider": self.name,
                        "title": r.get("title", f"{clean_name} YouTube"),
                        "channel_url": url,
                        "description": r.get("snippet", ""),
                        "source_type": "VIDEO",
                        "retrieved_at": self.get_timestamp(),
                        "reliability": "HIGH"
                    })
        return results

youtube_provider = YouTubeProvider()