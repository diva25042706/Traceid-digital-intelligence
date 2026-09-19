import requests
import datetime
import urllib.parse
from typing import Dict, Any, Optional

class WikipediaConnector:
    """
    Public Wikipedia REST API connector.
    Retrieves verifiable public biographical abstracts, career summaries, and citations.
    """

    SUMMARY_API = "https://en.wikipedia.org/api/rest_v1/page/summary"
    SEARCH_API = "https://en.wikipedia.org/w/api.php"

    def get_summary(self, name: str) -> Optional[Dict[str, Any]]:
        """Retrieves verified public Wikipedia page summary for a given subject."""
        if not name or len(name.strip()) < 2:
            return None

        # Format title (e.g. Satya Nadella -> Satya_Nadella)
        encoded_title = urllib.parse.quote(name.strip().replace(" ", "_"))
        url = f"{self.SUMMARY_API}/{encoded_title}"

        try:
            headers = {"User-Agent": "TraceID-AI/4.2 (Public Research & Verification; contact@traceid.ai)"}
            res = requests.get(url, headers=headers, timeout=5)

            if res.status_code == 200:
                data = res.json()
                page_title = data.get("title", name)
                extract = data.get("extract", "")
                page_url = data.get("content_urls", {}).get("desktop", {}).get("page", f"https://en.wikipedia.org/wiki/{encoded_title}")
                thumbnail = data.get("thumbnail", {}).get("source", "")
                description = data.get("description", "")

                return {
                    "source": "Wikipedia",
                    "title": page_title,
                    "description": description,
                    "biography_summary": extract,
                    "source_url": page_url,
                    "avatar_url": thumbnail,
                    "retrieved_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                    "reliability": "HIGH",
                    "evidence_snippet": extract[:350] + "..." if len(extract) > 350 else extract
                }
            elif res.status_code == 404:
                # Try OpenSearch fallback
                return self._search_fallback(name)
            return None
        except Exception as e:
            print(f"[WikipediaConnector] Note: {e}")
            return None

    def _search_fallback(self, name: str) -> Optional[Dict[str, Any]]:
        try:
            params = {
                "action": "opensearch",
                "search": name.strip(),
                "limit": 1,
                "namespace": 0,
                "format": "json"
            }
            headers = {"User-Agent": "TraceID-AI/4.2 (Public Research & Verification)"}
            res = requests.get(self.SEARCH_API, params=params, headers=headers, timeout=5)
            if res.status_code == 200:
                data = res.json()
                titles = data[1] if len(data) > 1 else []
                urls = data[3] if len(data) > 3 else []
                if titles and urls:
                    first_title = titles[0]
                    first_url = urls[0]
                    # Fetch summary for first title
                    enc = urllib.parse.quote(first_title.replace(" ", "_"))
                    sub_res = requests.get(f"{self.SUMMARY_API}/{enc}", headers=headers, timeout=5)
                    if sub_res.status_code == 200:
                        sdata = sub_res.json()
                        return {
                            "source": "Wikipedia",
                            "title": sdata.get("title", first_title),
                            "description": sdata.get("description", ""),
                            "biography_summary": sdata.get("extract", ""),
                            "source_url": first_url,
                            "avatar_url": sdata.get("thumbnail", {}).get("source", ""),
                            "retrieved_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
                            "reliability": "HIGH",
                            "evidence_snippet": sdata.get("extract", "")[:350] + "..."
                        }
            return None
        except Exception:
            return None

wikipedia_connector = WikipediaConnector()
