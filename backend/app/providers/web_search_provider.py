import re
import urllib.parse
import urllib.request
from typing import List, Dict, Any, Optional
from backend.app.providers.base_provider import BaseProvider

class WebSearchProvider(BaseProvider):
    """
    Live Public Web Search Provider.
    Dynamically generates and executes queries across public web search endpoints.
    Enforces strict anti-fabrication / zero URL guessing.
    """

    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

    def __init__(self):
        super().__init__(name="Public Web Search", provider_type="WEB_SEARCH")
        self.cache: Dict[str, List[Dict[str, Any]]] = {}

    def search(self, query: str) -> List[Dict[str, Any]]:
        """Executes a single web search query."""
        if not query or not query.strip():
            return []

        q_norm = query.strip()
        if q_norm in self.cache:
            return self.cache[q_norm]

        results: List[Dict[str, Any]] = []
        timestamp_now = self.get_timestamp()

        # 1. Attempt DuckDuckGo HTML endpoint
        try:
            data = urllib.parse.urlencode({"q": q_norm}).encode("utf-8")
            req = urllib.request.Request(
                "https://html.duckduckgo.com/html/",
                data=data,
                headers={
                    "User-Agent": self.USER_AGENT,
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            )
            with urllib.request.urlopen(req, timeout=5) as response:
                html = response.read().decode("utf-8", errors="ignore")
                uddg_matches = re.findall(r'//duckduckgo\.com/l/\?uddg=([^&"\']+)', html)
                snippets = re.findall(r'class="result__snippet[^"]*">(.*?)</a>', html, re.DOTALL)
                titles = re.findall(r'class="result__title"[^>]*>.*?<a[^>]*>(.*?)</a>', html, re.DOTALL)

                seen_urls = set()
                for i, encoded_url in enumerate(uddg_matches):
                    try:
                        actual_url = urllib.parse.unquote(encoded_url)
                        if "duckduckgo.com" in actual_url or actual_url in seen_urls:
                            continue
                        seen_urls.add(actual_url)

                        raw_title = titles[i] if i < len(titles) else actual_url
                        raw_snippet = snippets[i] if i < len(snippets) else ""

                        clean_title = re.sub(r'<[^>]+>', '', raw_title).strip()
                        clean_snippet = re.sub(r'<[^>]+>', '', raw_snippet).strip()
                        domain = urllib.parse.urlparse(actual_url).netloc.replace("www.", "")

                        results.append({
                            "title": clean_title or f"Public Record ({domain})",
                            "url": actual_url,
                            "snippet": clean_snippet,
                            "source_domain": domain,
                            "retrieved_at": timestamp_now,
                            "reliability": "HIGH" if any(h in domain for h in ["linkedin.com", "github.com", "instagram.com", "twitter.com", "x.com", "facebook.com", "youtube.com", "wikipedia.org", ".edu", ".gov"]) else "MEDIUM"
                        })
                    except Exception:
                        continue
        except Exception:
            pass

        # 2. Attempt DuckDuckGo Lite fallback if needed
        if not results:
            try:
                url = f"https://lite.duckduckgo.com/lite/?q={urllib.parse.quote(q_norm)}"
                req = urllib.request.Request(url, headers={"User-Agent": self.USER_AGENT})
                with urllib.request.urlopen(req, timeout=4) as response:
                    lite_html = response.read().decode("utf-8", errors="ignore")
                    lite_links = re.findall(r'class="result-link"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', lite_html, re.DOTALL)
                    lite_snippets = re.findall(r'class="result-snippet"[^>]*>(.*?)</td>', lite_html, re.DOTALL)

                    for j, (raw_link, raw_title) in enumerate(lite_links[:8]):
                        if raw_link.startswith("//duckduckgo.com/l/?uddg="):
                            raw_link = urllib.parse.unquote(raw_link.split("uddg=")[1].split("&")[0])
                        if "duckduckgo.com" in raw_link:
                            continue

                        clean_title = re.sub(r'<[^>]+>', '', raw_title).strip()
                        clean_snippet = re.sub(r'<[^>]+>', '', lite_snippets[j]).strip() if j < len(lite_snippets) else ""
                        domain = urllib.parse.urlparse(raw_link).netloc.replace("www.", "")

                        results.append({
                            "title": clean_title,
                            "url": raw_link,
                            "snippet": clean_snippet,
                            "source_domain": domain,
                            "retrieved_at": timestamp_now,
                            "reliability": "HIGH" if any(h in domain for h in ["linkedin.com", "github.com", "instagram.com", "twitter.com", "x.com", "facebook.com", "youtube.com", "wikipedia.org"]) else "MEDIUM"
                        })
            except Exception:
                pass

        self.cache[q_norm] = results
        return results

    def search_person(self, name: str, organization: str = "", domain: str = "", context: str = "") -> List[Dict[str, Any]]:
        clean_name = name.strip()
        queries = [f'"{clean_name}"']
        if organization:
            queries.append(f'"{clean_name}" "{organization}"')
        if domain:
            queries.append(f'"{clean_name}" {domain}')

        all_results: List[Dict[str, Any]] = []
        seen = set()
        for q in queries:
            for r in self.search(q):
                if r["url"] not in seen:
                    seen.add(r["url"])
                    all_results.append(r)
        return all_results

    def search_profile(self, name: str, platform: str) -> List[Dict[str, Any]]:
        return self.search(f'"{name}" {platform}')

    def search_public_pages(self, name: str) -> List[Dict[str, Any]]:
        return self.search(f'"{name}" website OR portfolio OR publication OR project OR event')

web_search_provider = WebSearchProvider()