import re
import urllib.request
import urllib.parse
from typing import List, Dict, Any
from backend.app.providers.base_provider import BaseProvider
from backend.app.providers.web_search_provider import web_search_provider

class WebsiteProvider(BaseProvider):
    """
    Personal Website, Portfolio, and Outbound Profile Link Extraction Provider.
    Inspects public webpages to discover personal portfolios and cross-linked social handles.
    """

    def __init__(self):
        super().__init__(name="Website & Portfolio", provider_type="DIRECTORY")

    def search_person(self, name: str, organization: str = "", domain: str = "", context: str = "") -> List[Dict[str, Any]]:
        if not name or not name.strip():
            return []

        clean_name = name.strip()
        query = f'"{clean_name}" personal website OR portfolio OR homepage'
        if organization:
            query += f' "{organization}"'

        raw_results = web_search_provider.search(query)
        valid_sites: List[Dict[str, Any]] = []

        for r in raw_results:
            url = r.get("url", "")
            domain_name = r.get("source_domain", "")
            # Filter out major search/social aggregators
            if not any(agg in domain_name for agg in ["duckduckgo", "google", "bing", "yahoo"]):
                valid_sites.append({
                    "provider": self.name,
                    "title": r.get("title", f"{clean_name} Website"),
                    "url": url,
                    "domain": domain_name,
                    "snippet": r.get("snippet", ""),
                    "source_type": "WEBSITE",
                    "retrieved_at": self.get_timestamp(),
                    "reliability": "HIGH" if ".edu" in domain_name or ".org" in domain_name else "MEDIUM"
                })

        return valid_sites

    def extract_profile_links_from_url(self, url: str) -> Dict[str, str]:
        """Inspects HTML at url for outbound links to social platforms."""
        discovered: Dict[str, str] = {}
        if not url:
            return discovered

        try:
            req = urllib.request.Request(url, headers={"User-Agent": "TRACEID-Bot/2.0"})
            with urllib.request.urlopen(req, timeout=4) as resp:
                html = resp.read().decode("utf-8", errors="ignore")
                
                # Check for LinkedIn
                li_match = re.search(r'href=["\'](https?://(?:www\.)?linkedin\.com/in/[^"\'>\s]+)["\']', html)
                if li_match:
                    discovered["LinkedIn"] = li_match.group(1)

                # Check for GitHub
                gh_match = re.search(r'href=["\'](https?://(?:www\.)?github\.com/[^/"\'>\s]+)["\']', html)
                if gh_match:
                    discovered["GitHub"] = gh_match.group(1)

                # Check for Instagram
                ig_match = re.search(r'href=["\'](https?://(?:www\.)?instagram\.com/[^/"\'>\s]+)["\']', html)
                if ig_match:
                    discovered["Instagram"] = ig_match.group(1)

                # Check for Twitter / X
                tw_match = re.search(r'href=["\'](https?://(?:www\.)?(?:twitter\.com|x\.com)/[^/"\'>\s]+)["\']', html)
                if tw_match:
                    discovered["Twitter"] = tw_match.group(1)

                # Check for YouTube
                yt_match = re.search(r'href=["\'](https?://(?:www\.)?youtube\.com/(?:@[^/"\'>\s]+|c/[^/"\'>\s]+|channel/[^/"\'>\s]+))["\']', html)
                if yt_match:
                    discovered["YouTube"] = yt_match.group(1)
        except Exception:
            pass

        return discovered

website_provider = WebsiteProvider()