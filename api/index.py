import sys
import os

sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from app.core.config import settings
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api import destinations, culture, events, storytelling, experiences

app = FastAPI(title=settings.APP_NAME, version=settings.APP_VERSION)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS + ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(destinations.router, prefix="/api/v1/destinations", tags=["Destinations"])
app.include_router(culture.router, prefix="/api/v1/culture", tags=["Culture"])
app.include_router(events.router, prefix="/api/v1/events", tags=["Events"])
app.include_router(storytelling.router, prefix="/api/v1/storytelling", tags=["Storytelling"])
app.include_router(experiences.router, prefix="/api/v1/experiences", tags=["Experiences"])

@app.get("/api/health")
async def health():
    return {"status": "healthy", "version": settings.APP_VERSION}

@app.get("/")
async def root():
    return {"message": f"{settings.APP_NAME} API"}
