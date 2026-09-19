import re
import urllib.parse
import urllib.request
import datetime
import hashlib
from typing import List, Dict, Any, Optional
from abc import ABC, abstractmethod

class SearchProvider(ABC):
    """Abstract base class for public web search providers."""
    
    @abstractmethod
    def search(self, query: str) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def search_people(self, query: str) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def search_profiles(self, query: str, platform: Optional[str] = None) -> List[Dict[str, Any]]:
        pass

    @abstractmethod
    def search_web(self, query: str) -> List[Dict[str, Any]]:
        pass


class DuckDuckGoSearchProvider(SearchProvider):
    """
    Live public search provider querying DuckDuckGo endpoints with anti-fabrication parsing.
    """
    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"

    def __init__(self):
        self.cache: Dict[str, List[Dict[str, Any]]] = {}

    def search(self, query: str) -> List[Dict[str, Any]]:
        return self.search_web(query)

    def search_web(self, query: str) -> List[Dict[str, Any]]:
        if not query or not query.strip():
            return []
        
        q_norm = query.strip()
        cache_key = hashlib.md5(q_norm.lower().encode("utf-8")).hexdigest()
        if cache_key in self.cache:
            return self.cache[cache_key]

        results: List[Dict[str, Any]] = []
        timestamp_now = datetime.datetime.now(datetime.timezone.utc).isoformat()

        # 1. Attempt DuckDuckGo HTML endpoint
        try:
            data = urllib.parse.urlencode({"q": q_norm}).encode("utf-8")
            req = urllib.request.Request(
                "https://html.duckduckgo.com/html/",
                data=data,
                headers={
                    "User-Agent": self.USER_AGENT,
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Referer": "https://html.duckduckgo.com/",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            )
            with urllib.request.urlopen(req, timeout=6) as response:
                html = response.read().decode("utf-8", errors="ignore")
                parsed = self._parse_ddg_html(html)
                if parsed:
                    self.cache[cache_key] = parsed
                    return parsed
        except Exception:
            pass

        # 2. Fallback: DuckDuckGo Lite endpoint
        try:
            url = f"https://lite.duckduckgo.com/lite/?q={urllib.parse.quote(q_norm)}"
            req = urllib.request.Request(url, headers={"User-Agent": self.USER_AGENT})
            with urllib.request.urlopen(req, timeout=5) as response:
                html = response.read().decode("utf-8", errors="ignore")
                parsed = self._parse_ddg_lite(html)
                if parsed:
                    self.cache[cache_key] = parsed
                    return parsed
        except Exception:
            pass

        return []

    def search_people(self, query: str) -> List[Dict[str, Any]]:
        return self.search_web(f'"{query}" profile OR bio OR linkedin OR github')

    def search_profiles(self, query: str, platform: Optional[str] = None) -> List[Dict[str, Any]]:
        if platform:
            return self.search_web(f'"{query}" site:{platform.lower()}.com')
        return self.search_web(f'"{query}" linkedin OR github OR twitter')

    def _parse_ddg_html(self, html: str) -> List[Dict[str, Any]]:
        results = []
        # Match standard DDG HTML result blocks
        blocks = re.findall(r'<div class="result results_links[^"]*">(.*?)</div>\s*</div>\s*</div>', html, re.DOTALL)
        for block in blocks:
            link_match = re.search(r'<a class="result__url"[^>]*href="([^"]+)"', block)
            title_match = re.search(r'<a class="result__snippet"[^>]*>(.*?)</a>', block) or re.search(r'<a class="result__title"[^>]*>(.*?)</a>', block)
            snippet_match = re.search(r'<a class="result__snippet"[^>]*>(.*?)</a>', block)

            raw_url = link_match.group(1) if link_match else ""
            clean_url = self._extract_clean_url(raw_url)
            if not clean_url or "duckduckgo.com" in clean_url:
                continue

            title = re.sub(r"<[^>]+>", "", title_match.group(1)).strip() if title_match else clean_url
            snippet = re.sub(r"<[^>]+>", "", snippet_match.group(1)).strip() if snippet_match else ""

            results.append({
                "title": title,
                "url": clean_url,
                "snippet": snippet,
                "source": "DuckDuckGo Web Index",
                "reliability": "HIGH"
            })
            if len(results) >= 8:
                break
        return results

    def _parse_ddg_lite(self, html: str) -> List[Dict[str, Any]]:
        results = []
        links = re.findall(r'<a class="result-link"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', html, re.DOTALL)
        snippets = re.findall(r'<td class="result-snippet"[^>]*>(.*?)</td>', html, re.DOTALL)

        for i, (raw_url, title_raw) in enumerate(links):
            clean_url = self._extract_clean_url(raw_url)
            if not clean_url or "duckduckgo.com" in clean_url:
                continue

            title = re.sub(r"<[^>]+>", "", title_raw).strip()
            snippet = re.sub(r"<[^>]+>", "", snippets[i]).strip() if i < len(snippets) else ""

            results.append({
                "title": title,
                "url": clean_url,
                "snippet": snippet,
                "source": "DuckDuckGo Lite Index",
                "reliability": "HIGH"
            })
            if len(results) >= 8:
                break
        return results

    def _extract_clean_url(self, url: str) -> str:
        if not url:
            return ""
        if "uddg=" in url:
            match = re.search(r"uddg=([^&]+)", url)
            if match:
                return urllib.parse.unquote(match.group(1))
        return url

duckduckgo_search_provider = DuckDuckGoSearchProvider()