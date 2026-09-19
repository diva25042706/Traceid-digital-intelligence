import urllib.request
import urllib.parse
import json
from typing import List, Dict, Any
from backend.app.providers.base_provider import BaseProvider

class GitHubProvider(BaseProvider):
    """
    GitHub Public Repository and Developer Profile Provider.
    Queries public open-source accounts, repositories, organizations, and bio signals.
    """

    def __init__(self):
        super().__init__(name="GitHub", provider_type="TECHNICAL")
        self.base_url = "https://api.github.com"

    def search_person(self, name: str, organization: str = "", domain: str = "", context: str = "") -> List[Dict[str, Any]]:
        if not name or not name.strip():
            return []

        clean_name = name.strip()
        query = f'"{clean_name}" in:name'
        if organization:
            query += f' {organization}'

        url = f"{self.base_url}/search/users?q={urllib.parse.quote(query)}&per_page=5"
        headers = {
            "User-Agent": "TRACEID-Bot/2.0 (Open Source Intelligence Research)",
            "Accept": "application/vnd.github.v3+json"
        }

        results: List[Dict[str, Any]] = []
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=4) as response:
                data = json.loads(response.read().decode("utf-8"))
                for item in data.get("items", []):
                    username = item.get("login")
                    html_url = item.get("html_url", f"https://github.com/{username}")
                    avatar = item.get("avatar_url")
                    
                    results.append({
                        "provider": self.name,
                        "username": username,
                        "display_name": clean_name,
                        "profile_url": html_url,
                        "avatar_url": avatar,
                        "source_type": "TECHNICAL",
                        "retrieved_at": self.get_timestamp(),
                        "reliability": "HIGH"
                    })
        except Exception:
            pass

        return results

    def search_repositories(self, query: str) -> List[Dict[str, Any]]:
        url = f"{self.base_url}/search/repositories?q={urllib.parse.quote(query)}&sort=stars&per_page=5"
        headers = {"User-Agent": "TRACEID-Bot/2.0", "Accept": "application/vnd.github.v3+json"}
        results: List[Dict[str, Any]] = []
        try:
            req = urllib.request.Request(url, headers=headers)
            with urllib.request.urlopen(req, timeout=4) as response:
                data = json.loads(response.read().decode("utf-8"))
                for repo in data.get("items", []):
                    results.append({
                        "name": repo.get("name"),
                        "full_name": repo.get("full_name"),
                        "html_url": repo.get("html_url"),
                        "description": repo.get("description", ""),
                        "stars": repo.get("stargazers_count", 0),
                        "language": repo.get("language", "Unknown")
                    })
        except Exception:
            pass
        return results

github_provider = GitHubProvider()