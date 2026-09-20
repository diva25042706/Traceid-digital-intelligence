import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.app.config import settings
from backend.app.database import engine, Base
import backend.app.models.models

# Import API routers
from backend.app.api.investigations import router as investigations_router
from backend.app.api.candidates import router as candidates_router
from backend.app.api.profiles import router as profiles_router
from backend.app.api.entities import router as entities_router
from backend.app.api.evidence import router as evidence_router
from backend.app.api.sources import router as sources_router
from backend.app.api.timeline import router as timeline_router
from backend.app.api.graph import router as graph_router
from backend.app.api.conflicts import router as conflicts_router
from backend.app.api.reports import router as reports_router
from backend.app.api.analysis import router as analysis_router
from backend.app.api.health import router as health_router
from backend.app.api.adversarial import router as adversarial_router
from backend.app.api.discovery import router as discovery_router
from backend.app.api.correlation import router as correlation_router
from backend.app.api.twin import router as twin_router

# Auto-create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    description="Explainable Public Digital Footprint Intelligence & Identity Resolution REST API",
    version="4.2.0",
    docs_url="/docs",
    redoc_url="/redoc"
)

# CORS configuration for Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include all API routes
app.include_router(health_router, prefix=settings.API_V1_STR)
app.include_router(investigations_router, prefix=settings.API_V1_STR)
app.include_router(candidates_router, prefix=settings.API_V1_STR)
app.include_router(profiles_router, prefix=settings.API_V1_STR)
app.include_router(entities_router, prefix=settings.API_V1_STR)
app.include_router(evidence_router, prefix=settings.API_V1_STR)
app.include_router(sources_router, prefix=settings.API_V1_STR)
app.include_router(timeline_router, prefix=settings.API_V1_STR)
app.include_router(graph_router, prefix=settings.API_V1_STR)
app.include_router(conflicts_router, prefix=settings.API_V1_STR)
app.include_router(reports_router, prefix=settings.API_V1_STR)
app.include_router(analysis_router, prefix=settings.API_V1_STR)
app.include_router(adversarial_router, prefix=settings.API_V1_STR)
app.include_router(discovery_router, prefix=settings.API_V1_STR)
app.include_router(correlation_router, prefix=settings.API_V1_STR)
app.include_router(twin_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "project": settings.PROJECT_NAME,
        "tagline": "Explainable Public Digital Footprint Intelligence & Identity Resolution",
        "docs": "/docs",
        "health": "/api/health"
    }

if __name__ == "__main__":
    uvicorn.run("backend.app.main:app", host="0.0.0.0", port=8000, reload=True)
