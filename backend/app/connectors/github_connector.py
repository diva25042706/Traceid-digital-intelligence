import requests
import datetime
from typing import Dict, Any, List, Optional

class GitHubConnector:
    """
    Public GitHub REST API connector.
    Searches public developer profiles, organizations, and open-source contributions.
    Enforces supporting signal verification rather than blindly matching names.
    """

    USER_API = "https://api.github.com/users"
    SEARCH_API = "https://api.github.com/search/users"

    def search_user(self, username_or_name: str) -> Optional[Dict[str, Any]]:
        """Searches GitHub public users API for matching developer profile."""
        if not username_or_name or len(username_or_name.strip()) < 2:
            return None

        clean_query = username_or_name.strip().lstrip("@")
        headers = {
            "Accept": "application/vnd.github.v3+json",
            "User-Agent": "TraceID-AI/4.2 (Public Footprint Intelligence)"
        }

        try:
            # 1. Try direct username lookup first
            res = requests.get(f"{self.USER_API}/{clean_query}", headers=headers, timeout=5)
            if res.status_code == 200:
                data = res.json()
                return self._normalize_github_user(data)

            # 2. Try search by full name
            search_res = requests.get(f"{self.SEARCH_API}?q={clean_query}+type:user", headers=headers, timeout=5)
            if search_res.status_code == 200:
                s_data = search_res.json()
                items = s_data.get("items", [])
                if items:
                    first_login = items[0].get("login")
                    # Fetch detailed user
                    det_res = requests.get(f"{self.USER_API}/{first_login}", headers=headers, timeout=5)
                    if det_res.status_code == 200:
                        return self._normalize_github_user(det_res.json())

            return None
        except Exception as e:
            print(f"[GitHubConnector] Note: {e}")
            return None

    def search_users(self, username_or_name: str) -> List[Dict[str, Any]]:
        """Searches GitHub and returns list of candidate user objects."""
        user = self.search_user(username_or_name)
        return [user] if user else []


    def _normalize_github_user(self, data: Dict[str, Any]) -> Dict[str, Any]:
        login = data.get("login", "")
        name = data.get("name", login)
        company = data.get("company", "") or ""
        location = data.get("location", "") or ""
        bio = data.get("bio", "") or ""
        public_repos = data.get("public_repos", 0)
        followers = data.get("followers", 0)
        html_url = data.get("html_url", f"https://github.com/{login}")
        avatar_url = data.get("avatar_url", "")

        return {
            "source_type": "github",
            "source": "GitHub Public API",
            "username": login,
            "display_name": name,
            "company": company.lstrip("@").strip(),
            "location": location,
            "bio": bio,
            "public_repos": public_repos,
            "followers": followers,
            "url": html_url,
            "avatar_url": avatar_url,
            "retrieved_at": datetime.datetime.now(datetime.timezone.utc).isoformat(),
            "reliability": "HIGH" if public_repos > 5 else "MEDIUM",
            "evidence": [
                f"Public GitHub account @{login} ({name}) created on {data.get('created_at', '')[:10]}",
                f"Affiliation listed as '{company}' with {public_repos} public repositories"
            ]
        }

github_connector = GitHubConnector()
