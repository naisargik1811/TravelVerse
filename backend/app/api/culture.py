from fastapi import APIRouter, HTTPException
from app.schemas.schemas import HeritageItem
from app.services import ai_service

router = APIRouter()


@router.get("/heritage/{destination}", response_model=list[HeritageItem])
async def get_heritage(destination: str):
    try:
        result = await ai_service.get_heritage_info(destination)
        items = result if isinstance(result, list) else [result]
        return [HeritageItem(**item) for item in items]
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/chat-suggestions/{destination}")
async def get_chat_suggestions(destination: str):
    try:
        suggestions = await ai_service.get_chat_suggestions(destination)
        return {"suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
