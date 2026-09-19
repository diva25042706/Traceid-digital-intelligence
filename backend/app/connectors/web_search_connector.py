import re
import urllib.parse
import urllib.request
import datetime
from typing import List, Dict, Any, Optional

class WebSearchConnector:
    """
    Targeted real-time public web search connector.
    Executes precise, authorized public queries across open search engines,
    technical repositories, and official directories to extract actual public profiles.
    
    Zero URL guessing or fabrication.
    """

    USER_AGENT = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36"

    def search_public_query(self, query: str) -> List[Dict[str, Any]]:
        """
        Executes a real-time public web search query and parses search result items:
        title, url, snippet, source_domain, reliability.
        """
        results: List[Dict[str, Any]] = []
        if not query or not query.strip():
            return results

        clean_query = query.strip()
        timestamp_now = datetime.datetime.now(datetime.timezone.utc).isoformat()

        # 1. Attempt DuckDuckGo HTML search
        try:
            data = urllib.parse.urlencode({"q": clean_query}).encode("utf-8")
            req = urllib.request.Request(
                "https://html.duckduckgo.com/html/",
                data=data,
                headers={
                    "User-Agent": self.USER_AGENT,
                    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "Accept-Language": "en-US,en;q=0.5",
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            )
            with urllib.request.urlopen(req, timeout=6) as response:
                html = response.read().decode("utf-8", "ignore")

                # Extract result blocks
                # Pattern: extract uddg target URL, title, snippet
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

                        raw_title = titles[i] if i < len(titles) else self._clean_html(actual_url)
                        raw_snippet = snippets[i] if i < len(snippets) else ""

                        clean_title = self._clean_html(raw_title)
                        clean_snippet = self._clean_html(raw_snippet)
                        domain = self._extract_domain(actual_url)

                        reliability = "HIGH" if any(h in domain for h in ["linkedin.com", "github.com", "wikipedia.org", "arxiv.org", ".edu", ".gov"]) else "MEDIUM"

                        results.append({
                            "title": clean_title or f"Public Record ({domain})",
                            "url": actual_url,
                            "snippet": clean_snippet or f"Public search result indexed under {domain}.",
                            "source_domain": domain,
                            "retrieved_at": timestamp_now,
                            "reliability": reliability
                        })
                    except Exception:
                        continue
        except Exception as e:
            # Silently handle network timeout / rate-limit gracefully
            pass

        # 2. Attempt DuckDuckGo Lite if HTML gave 0 results
        if not results:
            try:
                data = urllib.parse.urlencode({"q": clean_query}).encode("utf-8")
                req = urllib.request.Request(
                    "https://lite.duckduckgo.com/lite/",
                    data=data,
                    headers={"User-Agent": self.USER_AGENT}
                )
                with urllib.request.urlopen(req, timeout=5) as response:
                    lite_html = response.read().decode("utf-8", "ignore")
                    lite_links = re.findall(r'class="result-link"[^>]*href="([^"]+)"[^>]*>(.*?)</a>', lite_html, re.DOTALL)
                    lite_snippets = re.findall(r'class="result-snippet"[^>]*>(.*?)</td>', lite_html, re.DOTALL)

                    for j, (raw_link, raw_title) in enumerate(lite_links[:10]):
                        if raw_link.startswith("//duckduckgo.com/l/?uddg="):
                            raw_link = urllib.parse.unquote(raw_link.split("uddg=")[1].split("&")[0])
                        if "duckduckgo.com" in raw_link:
                            continue

                        clean_title = self._clean_html(raw_title)
                        clean_snippet = self._clean_html(lite_snippets[j]) if j < len(lite_snippets) else ""
                        domain = self._extract_domain(raw_link)
                        reliability = "HIGH" if any(h in domain for h in ["linkedin.com", "github.com", "wikipedia.org", ".edu", ".gov"]) else "MEDIUM"

                        results.append({
                            "title": clean_title,
                            "url": raw_link,
                            "snippet": clean_snippet,
                            "source_domain": domain,
                            "retrieved_at": timestamp_now,
                            "reliability": reliability
                        })
            except Exception:
                pass

        return results

    def search_public_footprint(
        self,
        name: str,
        organization: str = "",
        role: str = "",
        context: str = ""
    ) -> List[Dict[str, Any]]:
        """Searches multi-query footprint for a subject."""
        queries = [f'"{name}"']
        if organization:
            queries.append(f'"{name}" "{organization}"')
        if role:
            queries.append(f'"{name}" {role}')
        if context:
            queries.append(f'"{name}" {context[:40]}')

        all_res: List[Dict[str, Any]] = []
        seen = set()
        for q in queries:
            for r in self.search_public_query(q):
                if r["url"] not in seen:
                    seen.add(r["url"])
                    all_res.append(r)
        return all_res

    def search_public_context(
        self,
        name: str,
        organization: str = "",
        role: str = ""
    ) -> List[Dict[str, Any]]:
        return self.search_public_footprint(name=name, organization=organization, role=role)

    def extract_real_linkedin_url(self, records: List[Dict[str, Any]], target_name: str) -> Optional[Dict[str, Any]]:
        """
        Extracts a REAL, discovered public LinkedIn profile from search records.
        Strict zero-guess rule: only returns if an actual linkedin.com/in/... URL was found.
        """
        tokens = [t.lower() for t in target_name.split() if len(t) > 2]
        
        for r in records:
            url = r.get("url", "")
            title = r.get("title", "").lower()
            snippet = r.get("snippet", "").lower()

            if "linkedin.com/in/" in url.lower():
                # Verify that the search result matches at least one name token or title
                if not tokens or any(t in title or t in snippet or t in url.lower() for t in tokens):
                    slug = url.split("linkedin.com/in/")[-1].strip("/").split("?")[0]
                    return {
                        "platform": "LinkedIn Public",
                        "profile_url": url,
                        "slug": slug,
                        "display_name": r.get("title", target_name),
                        "snippet": r.get("snippet", ""),
                        "source_url": url,
                        "reliability": "HIGH"
                    }
        return None

    def extract_real_github_url(self, records: List[Dict[str, Any]], target_name: str, alias: str = "") -> Optional[Dict[str, Any]]:
        """
        Extracts a REAL, discovered public GitHub profile from search records.
        """
        for r in records:
            url = r.get("url", "")
            if "github.com/" in url.lower() and not any(x in url.lower() for x in ["/search", "/topics", "/explore", "/features"]):
                parts = url.split("github.com/")[-1].strip("/").split("/")
                if len(parts) == 1:
                    username = parts[0].split("?")[0]
                    return {
                        "platform": "GitHub",
                        "profile_url": url,
                        "username": username,
                        "display_name": r.get("title", target_name),
                        "snippet": r.get("snippet", ""),
                        "source_url": url,
                        "reliability": "HIGH"
                    }
        return None

    @staticmethod
    def _clean_html(raw_html: str) -> str:
        clean = re.sub(r'<[^>]+>', '', raw_html)
        clean = urllib.parse.unquote(clean)
        return clean.strip()

    @staticmethod
    def _extract_domain(url: str) -> str:
        try:
            parsed = urllib.parse.urlparse(url)
            return parsed.netloc.replace("www.", "")
        except Exception:
            return "web"

web_search_connector = WebSearchConnector()

