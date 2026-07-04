from fastapi import APIRouter, HTTPException
from app.schemas.schemas import StoryRequest, StoryResponse
from app.services import ai_service

router = APIRouter()


@router.post("/generate", response_model=StoryResponse)
async def generate_story(request: StoryRequest):
    try:
        result = await ai_service.generate_cultural_story(
            request.destination, request.theme, request.style, request.length
        )
        return StoryResponse(**result)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
