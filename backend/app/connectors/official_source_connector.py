import urllib.parse
from typing import Dict, Any

class OfficialSourceConnector:
    """
    Official Source Priority & Verification Engine.
    Classifies domains and sources into HIGH, MEDIUM, and LOW reliability tiers.
    """

    HIGH_TRUST_DOMAINS = [
        "wikipedia.org",
        "wikidata.org",
        "arxiv.org",
        "nih.gov",
        "sec.gov",
        "mit.edu",
        "stanford.edu",
        "harvard.edu",
        "microsoft.com",
        "google.com",
        "apple.com",
        "nvidia.com",
        "amazon.com",
        "github.com",
        "nature.com",
        "acm.org",
        "ieee.org"
    ]

    MEDIUM_TRUST_DOMAINS = [
        "linkedin.com",
        "twitter.com",
        "x.com",
        "youtube.com",
        "stackoverflow.com",
        "medium.com",
        "hackerone.com",
        "huggingface.co"
    ]

    def evaluate_source_priority(self, url_or_domain: str, source_type: str = "") -> str:
        """Determines source trust priority level: HIGH, MEDIUM, or LOW."""
        if not url_or_domain:
            return "LOW"

        domain = url_or_domain.lower()
        if "://" in domain:
            try:
                domain = urllib.parse.urlparse(domain).netloc.replace("www.", "")
            except Exception:
                pass

        # Check domain endings
        if domain.endswith(".gov") or domain.endswith(".edu") or domain.endswith(".int"):
            return "HIGH"

        # Check high trust domains
        for htd in self.HIGH_TRUST_DOMAINS:
            if htd in domain:
                return "HIGH"

        # Check medium trust domains
        for mtd in self.MEDIUM_TRUST_DOMAINS:
            if mtd in domain:
                return "MEDIUM"

        if source_type in ["Company", "Publication", "Event", "Professional", "Technical"]:
            return "HIGH"

        return "LOW"

    def classify_domain(self, url_or_domain: str) -> Dict[str, Any]:
        """Returns structured reliability and tier classification for domain."""
        priority = self.evaluate_source_priority(url_or_domain)
        tier = "ENTERPRISE_OFFICIAL" if priority == "HIGH" else ("COMMUNITY_VERIFIED" if priority == "MEDIUM" else "UNVERIFIED_PUBLIC")
        return {
            "domain": url_or_domain,
            "reliability": priority,
            "tier": tier,
            "is_authoritative": priority == "HIGH"
        }

official_source_connector = OfficialSourceConnector()
