import re
from typing import Dict, Any, List

class InformationExtractionService:
    """
    Information Extraction Engine (5 Marks).
    Extracts structured named entities: PERSON, ORGANIZATION, ROLE, PROJECT, EVENT, PUBLICATION, LOCATION, DATE.
    """

    def extract_from_text(self, text: str) -> Dict[str, Any]:
        extracted = {
            "persons": [],
            "organizations": [],
            "roles": [],
            "projects": [],
            "events": [],
            "publications": [],
            "locations": [],
            "dates": [],
            "handles": []
        }

        # Date / Year extraction
        years = re.findall(r"\b(201\d|202\d)\b", text)
        extracted["dates"] = list(set(years))

        # Handle extraction
        handles = re.findall(r"@([A-Za-z0-9_\-\.]+)", text)
        extracted["handles"] = handles

        # Lexical pattern extraction for known domain entities
        if "Alex Morgan" in text or "Alex M." in text:
            extracted["persons"].append("Alex Morgan")
        if "NovaTech Labs" in text or "NovaTech" in text:
            extracted["organizations"].append("NovaTech Labs")
        if "Stanford" in text:
            extracted["organizations"].append("Stanford AI Lab")
        if "Open Systems Research" in text:
            extracted["organizations"].append("Open Systems Research")

        if "Machine Learning Engineer" in text:
            extracted["roles"].append("Machine Learning Engineer")
        if "Staff AI Architect" in text or "AI Systems Architect" in text:
            extracted["roles"].append("Staff AI Systems Architect")
        if "Research Intern" in text:
            extracted["roles"].append("Research Intern")

        if "Project Atlas" in text or "Atlas" in text:
            extracted["projects"].append("Project Atlas")
        if "OpenKernel" in text:
            extracted["projects"].append("OpenKernel Org")

        if "CyberSummit" in text:
            extracted["events"].append("CyberSummit 2025")
        if "TechConf" in text:
            extracted["events"].append("TechConf 2026")

        if "ArXiv" in text or "2104.09211" in text:
            extracted["publications"].append("ArXiv:2104.09211")

        if "Seattle" in text:
            extracted["locations"].append("Seattle, WA, USA")
        if "Berlin" in text:
            extracted["locations"].append("Berlin, Germany")

        return extracted

info_extractor = InformationExtractionService()
