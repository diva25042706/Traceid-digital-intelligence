import time
import datetime
import hashlib
from typing import Dict, Any, List, Optional
from concurrent.futures import ThreadPoolExecutor, as_completed

from backend.app.connectors.base_connector import NormalizedSourceRecord, PublicSourceConnector
from backend.app.connectors.wikidata_connector import wikidata_connector
from backend.app.connectors.wikipedia_connector import wikipedia_connector
from backend.app.connectors.github_connector import github_connector
from backend.app.connectors.web_search_connector import web_search_connector
from backend.app.connectors.official_source_connector import official_source_connector

class PublicEvidenceCache:
    """
    In-memory / Persistent cache for public evidence retrieval.
    Stores query, source, result, retrieved_at, expiration.
    Allows labeling records as 'CACHED_PUBLIC_EVIDENCE' vs 'LIVE_SOURCE'.
    """
    def __init__(self, ttl_seconds: int = 3600):
        self._cache: Dict[str, Dict[str, Any]] = {}
        self.ttl_seconds = ttl_seconds

    def _hash_key(self, query: str, source: str) -> str:
        raw = f"{query.strip().lower()}::{source.strip().lower()}"
        return hashlib.sha256(raw.encode('utf-8')).hexdigest()

    def get(self, query: str, source: str) -> Optional[List[NormalizedSourceRecord]]:
        key = self._hash_key(query, source)
        item = self._cache.get(key)
        if not item:
            return None
        if time.time() > item['expires_at']:
            del self._cache[key]
            return None
        return item['records']

    def set(self, query: str, source: str, records: List[NormalizedSourceRecord]):
        key = self._hash_key(query, source)
        self._cache[key] = {
            'records': records,
            'cached_at': datetime.datetime.now(datetime.timezone.utc).isoformat(),
            'expires_at': time.time() + self.ttl_seconds
        }

public_evidence_cache = PublicEvidenceCache()

class SourceOrchestrator:
    """
    Dynamic Public Source Orchestrator.
    Dispatches targeted public queries across multiple modular public connectors.
    """

    def __init__(self):
        self.connectors: Dict[str, Any] = {
            'wikidata': wikidata_connector,
            'wikipedia': wikipedia_connector,
            'github': github_connector,
            'web_search': web_search_connector,
            'official': official_source_connector
        }

    def execute_multi_source_search(
        self,
        queries: List[str],
        primary_name: str,
        alias: str = '',
        organization: str = '',
        domain: str = '',
        role: str = '',
        max_workers: int = 5
    ) -> List[NormalizedSourceRecord]:
        all_records: List[NormalizedSourceRecord] = []
        seen_urls = set()

        def query_single_connector(connector_name: str, q: str) -> List[NormalizedSourceRecord]:
            cached = public_evidence_cache.get(q, connector_name)
            if cached:
                return [
                    NormalizedSourceRecord(
                        **{**r.model_dump(), 'source_mode': 'CACHED_PUBLIC_EVIDENCE'}
                    ) for r in cached
                ]


            records: List[NormalizedSourceRecord] = []
            try:
                if connector_name == 'wikidata':
                    items = self.connectors['wikidata'].search_person(primary_name, organization)
                    for item in items:
                        rec = NormalizedSourceRecord(
                            source_id=f"wd-{item.get('entity_id')}",
                            source_type='WIKIDATA',
                            title=f"{item.get('label')} (Wikidata {item.get('entity_id')})",
                            url=item.get('source_url', f"https://www.wikidata.org/wiki/{item.get('entity_id')}"),
                            content=item.get('description', ''),
                            entities=[{'type': 'person', 'name': item.get('label'), 'wikidata_id': item.get('entity_id')}],
                            relationships=[{'source': item.get('label'), 'rel': 'described_in', 'target': 'Wikidata'}],
                            reliability='HIGH',
                            source_mode='PUBLIC_RETRIEVAL'
                        )
                        records.append(rec)

                elif connector_name == 'wikipedia':
                    summary = self.connectors['wikipedia'].get_summary(primary_name)
                    if summary and summary.get('extract'):
                        page_url = summary.get('content_urls', {}).get('desktop', {}).get('page', f"https://en.wikipedia.org/wiki/{primary_name.replace(' ', '_')}")
                        rec = NormalizedSourceRecord(
                            source_id=f"wp-{primary_name.lower().replace(' ', '_')}",
                            source_type='WIKIPEDIA',
                            title=f"{summary.get('title', primary_name)} — Wikipedia",
                            url=page_url,
                            content=summary.get('extract', ''),
                            entities=[{'type': 'person', 'name': primary_name, 'description': summary.get('description')}],
                            relationships=[],
                            reliability='HIGH',
                            source_mode='PUBLIC_RETRIEVAL',
                            raw_payload={'thumbnail': summary.get('thumbnail')}
                        )
                        records.append(rec)

                elif connector_name == 'github':
                    gh_query = alias or primary_name
                    gh_users = self.connectors['github'].search_users(gh_query)
                    for user in gh_users:
                        rec = NormalizedSourceRecord(
                            source_id=f"gh-{user.get('username')}",
                            source_type='GITHUB',
                            title=f"GitHub Profile: {user.get('name')} (@{user.get('username')})",
                            url=user.get('profile_url', f"https://github.com/{user.get('username')}"),
                            content=f"Developer profile with {user.get('public_repos', 0)} repositories. Bio: {user.get('bio', 'N/A')}. Company: {user.get('company', 'N/A')}. Location: {user.get('location', 'N/A')}",
                            entities=[
                                {'type': 'username', 'value': user.get('username')},
                                {'type': 'person', 'name': user.get('name', primary_name)},
                                {'type': 'organization', 'name': user.get('company', '')}
                            ],
                            relationships=[{'source': user.get('username'), 'rel': 'profile_of', 'target': user.get('name')}],
                            reliability='MEDIUM',
                            source_mode='PUBLIC_RETRIEVAL',
                            raw_payload=user
                        )
                        records.append(rec)

                elif connector_name == 'web_search':
                    web_items = self.connectors['web_search'].search_public_query(q)
                    if not web_items:
                        web_items = self.connectors['web_search'].search_public_footprint(primary_name, organization, role)
                    for idx, w in enumerate(web_items):
                        rel = self.connectors['official'].evaluate_source_priority(w.get('url', ''))
                        rec = NormalizedSourceRecord(
                            source_id=f"web-{idx}-{hashlib.md5(w.get('url', '').encode()).hexdigest()[:6]}",
                            source_type='WEB_SEARCH',
                            title=w.get('title', 'Public Web Record'),
                            url=w.get('url', ''),
                            content=w.get('snippet', ''),
                            entities=[{'type': 'person', 'name': primary_name}],
                            relationships=[],
                            reliability=rel,
                            source_mode='PUBLIC_RETRIEVAL'
                        )
                        records.append(rec)

                if records:
                    public_evidence_cache.set(q, connector_name, records)
            except Exception as e:
                print(f"[SourceOrchestrator] Note querying {connector_name}: {e}")

            return records

        with ThreadPoolExecutor(max_workers=max_workers) as executor:
            futures = []
            for c_name in ['wikidata', 'wikipedia', 'github', 'web_search']:
                for q in queries[:4]:
                    futures.append(executor.submit(query_single_connector, c_name, q))

            for fut in as_completed(futures):
                try:
                    res = fut.result()
                    for r in res:
                        if r.url and r.url not in seen_urls:
                            seen_urls.add(r.url)
                            all_records.append(r)
                except Exception:
                    pass

        return all_records

source_orchestrator = SourceOrchestrator()
