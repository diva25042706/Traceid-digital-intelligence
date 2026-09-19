import os
from pydantic import BaseModel

class Settings(BaseModel):
    PROJECT_NAME: str = "TRACEID AI — Public Digital Footprint Intelligence"
    API_V1_STR: str = "/api"
    DATABASE_URL: str = os.getenv("DATABASE_URL", "sqlite:///./traceid.db")
    CORS_ORIGINS: list[str] = [
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:8000",
        "http://127.0.0.1:8000",
        "*",
    ]
    SOURCE_RELIABILITY_DEFAULT: str = "HIGH"
    TWINGUARD_AMBIGUITY_THRESHOLD: float = 0.75
    MINIMUM_EVIDENCE_THRESHOLD: int = 3
    LOG_LEVEL: str = "INFO"

settings = Settings()
