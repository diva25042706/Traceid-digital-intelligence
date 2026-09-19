import time
import requests
import urllib.parse
from typing import List, Dict, Any, Optional
from backend.app.providers.base_provider import BaseProvider

class WikidataCache:
    """In-memory cache for Wikidata search and entity lookups."""
    def __init__(self, ttl_seconds: int = 3600):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self.ttl_seconds = ttl_seconds

    def get(self, key: str) -> Optional[Any]:
        item = self._cache.get(key)
        if not item:
            return None
        if time.time() > item["expires_at"]:
            del self._cache[key]
            return None
        return item["data"]

    def set(self, key: str, data: Any):
        self._cache[key] = {
            "data": data,
            "expires_at": time.time() + self.ttl_seconds,
            "retrieved_at": time.strftime("%Y-%m-%dT%H:%M:%SZ", time.gmtime())
        }

wikidata_cache = WikidataCache()

class WikidataProvider(BaseProvider):
    """
    Wikidata Structured Public Knowledge Provider & SPARQL Query Engine.
    Communicates programmatically with the Wikidata Query Service (https://query.wikidata.org/sparql)
    and Wikidata API to discover entities, social identifiers, websites, and organizational affiliations.
    """

    SPARQL_ENDPOINT = "https://query.wikidata.org/sparql"
    API_ENDPOINT = "https://www.wikidata.org/w/api.php"
    USER_AGENT = "TRACEID-Bot/2.0 (Responsible AI Research; contact@traceid.ai; https://traceid.ai)"

    def __init__(self):
        super().__init__(name="Wikidata", provider_type="KNOWLEDGE_GRAPH")

    def execute_sparql(self, sparql_query: str, timeout: int = 3) -> Optional[Dict[str, Any]]:
        """Executes a SPARQL query against Wikidata Query Service with error handling."""
        params = {
            "query": sparql_query,
            "format": "json"
        }
        headers = {
            "User-Agent": self.USER_AGENT,
            "Accept": "application/sparql-results+json, application/json"
        }

        try:
            resp = requests.get(self.SPARQL_ENDPOINT, params=params, headers=headers, timeout=timeout)
            if resp.status_code == 200:
                return resp.json()
        except Exception:
            pass
        return None

    def search_person(self, name: str, organization: str = "", domain: str = "", context: str = "") -> List[Dict[str, Any]]:
        """
        Searches for candidate persons in Wikidata dynamically for ANY name.
        Uses wbsearchentities for robust candidate retrieval, then enriches with entity details.
        """
        if not name or not name.strip():
            return []

        clean_name = name.strip()
        cache_key = f"search::{clean_name.lower()}::{organization.lower()}"
        cached = wikidata_cache.get(cache_key)
        if cached is not None:
            return cached

        params = {
            "action": "wbsearchentities",
            "search": clean_name,
            "language": "en",
            "format": "json",
            "limit": 4,
            "type": "item"
        }
        headers = {"User-Agent": self.USER_AGENT}

        candidates: List[Dict[str, Any]] = []
        try:
            resp = requests.get(self.API_ENDPOINT, params=params, headers=headers, timeout=3)
            if resp.status_code == 200:
                data = resp.json()
                search_items = data.get("search", [])
                for idx, item in enumerate(search_items):
                    qid = item.get("id")
                    label = item.get("label", clean_name)
                    description = item.get("description", "")
                    concept_uri = item.get("concepturi", f"https://www.wikidata.org/wiki/{qid}")

                    # Detailed enrichment for top candidate
                    details = self.get_person_details(qid) if idx < 2 else {}

                    relevance = 1.0 if clean_name.lower() == label.lower() else 0.7
                    if organization and organization.lower() in (description.lower() + " " + " ".join(details.get("organizations", []))).lower():
                        relevance = 1.0

                    normalized_candidate = {
                        "entity_id": qid,
                        "canonical_name": label,
                        "aliases": item.get("aliases", []) + details.get("aliases", []),
                        "description": description or details.get("description", ""),
                        "image": details.get("image", ""),
                        "websites": details.get("websites", []),
                        "organizations": details.get("organizations", []),
                        "occupations": details.get("occupations", []),
                        "profiles": details.get("profiles", []),
                        "external_identifiers": details.get("external_identifiers", []),
                        "relevance_score": relevance,
                        "sources": [
                            {
                                "source": "Wikidata",
                                "qid": qid,
                                "url": concept_uri,
                                "retrieved_at": self.get_timestamp()
                            }
                        ]
                    }
                    candidates.append(normalized_candidate)
        except Exception:
            pass

        # Sort candidates by relevance
        candidates.sort(key=lambda x: x.get("relevance_score", 0), reverse=True)
        wikidata_cache.set(cache_key, candidates)
        return candidates

    def get_entity(self, qid: str) -> Optional[Dict[str, Any]]:
        """Retrieves raw entity claims for a given QID via Wikidata API."""
        if not qid:
            return None
        cache_key = f"entity::{qid}"
        cached = wikidata_cache.get(cache_key)
        if cached is not None:
            return cached

        params = {
            "action": "wbgetentities",
            "ids": qid,
            "format": "json",
            "languages": "en",
            "props": "labels|descriptions|claims|aliases"
        }
        headers = {"User-Agent": self.USER_AGENT}

        try:
            resp = requests.get(self.API_ENDPOINT, params=params, headers=headers, timeout=3)
            if resp.status_code == 200:
                data = resp.json()
                entity = data.get("entities", {}).get(qid)
                if entity:
                    wikidata_cache.set(cache_key, entity)
                    return entity
        except Exception:
            pass
        return None

    def get_person_details(self, qid: str) -> Dict[str, Any]:
        """
        Extracts structured claims, image, website, and external profiles from Wikidata entity.
        """
        if not qid or not qid.startswith("Q"):
            return {}

        cache_key = f"details::{qid}"
        cached = wikidata_cache.get(cache_key)
        if cached is not None:
            return cached

        details: Dict[str, Any] = {
            "image": "",
            "websites": [],
            "organizations": [],
            "occupations": [],
            "profiles": [],
            "external_identifiers": [],
            "aliases": []
        }

        # Fast path: Extract from Wikidata Claims API
        entity = self.get_entity(qid)
        if entity:
            claims = entity.get("claims", {})
            
            # P18: Image
            if "P18" in claims:
                for c in claims["P18"]:
                    val = c.get("mainsnak", {}).get("datavalue", {}).get("value")
                    if val and isinstance(val, str):
                        encoded_img = urllib.parse.quote(val.replace(" ", "_"))
                        details["image"] = f"https://commons.wikimedia.org/wiki/Special:FilePath/{encoded_img}"
                        break

            # P856: Official website
            if "P856" in claims:
                for c in claims["P856"]:
                    val = c.get("mainsnak", {}).get("datavalue", {}).get("value")
                    if val and isinstance(val, str) and val not in details["websites"]:
                        details["websites"].append(val)

            # P2037: GitHub username
            if "P2037" in claims:
                for c in claims["P2037"]:
                    val = c.get("mainsnak", {}).get("datavalue", {}).get("value")
                    if val and isinstance(val, str):
                        details["profiles"].append({
                            "platform": "GitHub",
                            "username": val,
                            "url": f"https://github.com/{val}",
                            "source": "Wikidata",
                            "qid": qid,
                            "evidence": [f"GitHub handle P2037 recorded on Wikidata {qid}"]
                        })

            # P2002: Twitter / X username
            if "P2002" in claims:
                for c in claims["P2002"]:
                    val = c.get("mainsnak", {}).get("datavalue", {}).get("value")
                    if val and isinstance(val, str):
                        details["profiles"].append({
                            "platform": "X / Twitter",
                            "username": val,
                            "url": f"https://twitter.com/{val}",
                            "source": "Wikidata",
                            "qid": qid,
                            "evidence": [f"X/Twitter handle P2002 recorded on Wikidata {qid}"]
                        })

            # P2003: Instagram username
            if "P2003" in claims:
                for c in claims["P2003"]:
                    val = c.get("mainsnak", {}).get("datavalue", {}).get("value")
                    if val and isinstance(val, str):
                        details["profiles"].append({
                            "platform": "Instagram",
                            "username": val,
                            "url": f"https://instagram.com/{val}",
                            "source": "Wikidata",
                            "qid": qid,
                            "evidence": [f"Instagram username P2003 recorded on Wikidata {qid}"]
                        })

            # P2397: YouTube channel ID
            if "P2397" in claims:
                for c in claims["P2397"]:
                    val = c.get("mainsnak", {}).get("datavalue", {}).get("value")
                    if val and isinstance(val, str):
                        details["profiles"].append({
                            "platform": "YouTube",
                            "username": val,
                            "url": f"https://youtube.com/channel/{val}",
                            "source": "Wikidata",
                            "qid": qid,
                            "evidence": [f"YouTube channel ID P2397 recorded on Wikidata {qid}"]
                        })

            # P6634: LinkedIn personal profile ID
            if "P6634" in claims:
                for c in claims["P6634"]:
                    val = c.get("mainsnak", {}).get("datavalue", {}).get("value")
                    if val and isinstance(val, str):
                        li_url = f"https://linkedin.com/in/{val}" if not val.startswith("http") else val
                        details["profiles"].append({
                            "platform": "LinkedIn",
                            "username": val,
                            "url": li_url,
                            "source": "Wikidata",
                            "qid": qid,
                            "evidence": [f"LinkedIn identifier P6634 recorded on Wikidata {qid}"]
                        })

            # P2013: Facebook ID
            if "P2013" in claims:
                for c in claims["P2013"]:
                    val = c.get("mainsnak", {}).get("datavalue", {}).get("value")
                    if val and isinstance(val, str):
                        details["profiles"].append({
                            "platform": "Facebook",
                            "username": val,
                            "url": f"https://facebook.com/{val}",
                            "source": "Wikidata",
                            "qid": qid,
                            "evidence": [f"Facebook ID P2013 recorded on Wikidata {qid}"]
                        })

        wikidata_cache.set(cache_key, details)
        return details

    def get_person_profiles(self, qid: str) -> List[Dict[str, Any]]:
        """Retrieves verified public profiles for a QID."""
        details = self.get_person_details(qid)
        return details.get("profiles", [])

wikidata_provider = WikidataProvider()