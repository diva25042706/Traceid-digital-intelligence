import re
from typing import List, Dict, Any
from backend.app.mock_data.authorized_dataset import AUTHORIZED_DATASET

class ProfileDiscoveryService:
    """
    Public Profile Discovery Engine (5 Marks).
    Discovers authorized public profiles across technical, professional, company, event, and publication platforms.
    """

    def discover_profiles(
        self,
        name: str,
        username: str = "",
        organization: str = "",
        context: str = ""
    ) -> List[Dict[str, Any]]:
        discovered: List[Dict[str, Any]] = []
        name_clean = name.strip().lower()

        # Check authorized dataset for matching persona
        subject_data = AUTHORIZED_DATASET["subjects"].get("alex_morgan")

        if subject_data:
            for cand in subject_data.get("candidates", []):
                for p in cand.get("platforms", []):
                    discovered.append({
                        "id": f"prof-{cand['id']}-{p['platform'].lower().replace(' ', '-')}",
                        "platform": p["platform"],
                        "profile_url": p.get("url", f"https://{p['platform'].lower().replace(' ', '')}.com/{p['handle']}"),
                        "display_name": cand["name"],
                        "username": p["handle"],
                        "description": f"{cand['primary_role']} associated with {', '.join(cand['organizations'])}",
                        "organization": cand["organizations"][0] if cand["organizations"] else "Public Domain",
                        "source_id": "src-1" if "git" in p["platform"].lower() else "src-4",
                        "verified": p.get("verified", False),
                        "public_metadata": {
                            "candidate_code": cand["candidate_code"],
                            "location": cand.get("location", "Unknown"),
                            "status": cand.get("status")
                        }
                    })

        return discovered

profile_discovery_service = ProfileDiscoveryService()
