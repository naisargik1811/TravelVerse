from fastapi import APIRouter, HTTPException
from app.schemas.schemas import (
    DestinationRequest, DestinationResponse, StoryRequest, StoryResponse,
    CulturalExperience, EventResponse, HeritageItem, ChatMessage, ChatRequest
)
from app.services import ai_service

router = APIRouter()


@router.post("/recommend", response_model=list[DestinationResponse])
async def recommend_destinations(request: DestinationRequest):
    try:
        context = {}
        if request.budget:
            context["budget"] = request.budget
        if request.travel_style:
            context["travel_style"] = request.travel_style.value
        if request.duration:
            context["duration"] = request.duration
        if request.interests:
            context["interests"] = request.interests

        result = await ai_service.generate_destination_recommendation(request.query, context)
        destinations = result if isinstance(result, list) else [result]
        return [DestinationResponse(**d) for d in destinations]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.post("/hidden-gems", response_model=list[CulturalExperience])
async def get_hidden_gems(destination: str, interests: list[str] = None):
    try:
        result = await ai_service.discover_hidden_gems(destination, interests)
        gems = result if isinstance(result, list) else [result]
        return [CulturalExperience(**g) for g in gems]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
