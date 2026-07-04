from fastapi import APIRouter, HTTPException
from app.schemas.schemas import EventResponse
from app.services import ai_service

router = APIRouter()


@router.get("/{destination}", response_model=list[EventResponse])
async def get_events(destination: str, dates: str = None):
    try:
        result = await ai_service.suggest_local_events(destination, dates)
        events = result if isinstance(result, list) else [result]
        return [EventResponse(**event) for event in events]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
