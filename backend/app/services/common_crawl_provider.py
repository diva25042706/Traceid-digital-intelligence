import requests
import json
import urllib.parse
import datetime
from typing import List, Dict, Any, Optional

class CommonCrawlProvider:
    """
    Common Crawl Index & Public Web Record Discovery Provider.
    Queries the publicly available Common Crawl CDX Index for public web mentions,
    institutional records, and project pages without mass-downloading web corpora.
    """
    
    INDEX_SERVER = "https://index.commoncrawl.org/collinfo.json"
    CDX_API = "https://index.commoncrawl.org/CC-MAIN-2024-10-index"

    def __init__(self):
        self._active_index: Optional[str] = None

    def get_latest_index(self) -> str:
        if self._active_index:
            return self._active_index
        try:
            res = requests.get(self.INDEX_SERVER, timeout=4)
            if res.status_code == 200:
                data = res.json()
                if isinstance(data, list) and len(data) > 0:
                    self._active_index = data[0].get("cdx-api", self.CDX_API)
                    return self._active_index
        except Exception:
            pass
        return self.CDX_API

    def search_domain_records(self, domain: str, match_type: str = "domain", limit: int = 5) -> List[Dict[str, Any]]:
        """Searches Common Crawl CDX index for domain occurrences."""
        results: List[Dict[str, Any]] = []
        if not domain:
            return results

        api_url = self.get_latest_index()
        params = {
            "url": f"*.{domain}/*" if match_type == "domain" else domain,
            "output": "json",
            "limit": limit
        }

        try:
            res = requests.get(api_url, params=params, timeout=5)
            if res.status_code == 200:
                lines = res.text.strip().split("\n")
                for line in lines:
                    if not line:
                        continue
                    try:
                        record = json.loads(line)
                        results.append({
                            "url": record.get("url"),
                            "mime": record.get("mime"),
                            "status": record.get("status"),
                            "timestamp": record.get("timestamp"),
                            "source": "Common Crawl CDX Index",
                            "reliability": "HIGH"
                        })
                    except Exception:
                        continue
        except Exception:
            pass

        return results

    def search_mentions(self, entity_tokens: List[str]) -> List[Dict[str, Any]]:
        """Queries for entity mentions across authorized public domain indexes."""
        records: List[Dict[str, Any]] = []
        for token in entity_tokens:
            if not token:
                continue
            cleaned = urllib.parse.quote(token.strip())
            # Search relevant domains
            for domain in ["github.com", "linkedin.com", "wikipedia.org"]:
                try:
                    res = self.search_domain_records(f"{domain}/*{cleaned}*", match_type="exact", limit=3)
                    records.extend(res)
                except Exception:
                    pass
        return records

common_crawl_provider = CommonCrawlProvider()