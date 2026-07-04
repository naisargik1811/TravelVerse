from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from app.core.config import settings
from app.api import destinations, culture, events, storytelling, experiences


def create_app() -> FastAPI:
    app = FastAPI(
        title=settings.APP_NAME,
        version=settings.APP_VERSION,
        docs_url="/docs",
        redoc_url="/redoc",
    )

    app.add_middleware(
        CORSMiddleware,
        allow_origins=settings.CORS_ORIGINS,
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

    app.include_router(destinations.router, prefix=f"{settings.API_PREFIX}/destinations", tags=["Destinations"])
    app.include_router(culture.router, prefix=f"{settings.API_PREFIX}/culture", tags=["Culture"])
    app.include_router(events.router, prefix=f"{settings.API_PREFIX}/events", tags=["Events"])
    app.include_router(storytelling.router, prefix=f"{settings.API_PREFIX}/storytelling", tags=["Storytelling"])
    app.include_router(experiences.router, prefix=f"{settings.API_PREFIX}/experiences", tags=["Experiences"])

    @app.get("/")
    async def root():
        return {"message": f"{settings.APP_NAME} API v{settings.APP_VERSION}"}

    @app.get("/health")
    async def health():
        return {"status": "healthy", "version": settings.APP_VERSION}

    return app


app = create_app()

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
