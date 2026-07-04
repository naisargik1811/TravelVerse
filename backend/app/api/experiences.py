from fastapi import APIRouter, HTTPException
from app.schemas.schemas import ChatRequest
from app.services import ai_service

router = APIRouter()


@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        messages = [{"role": msg.role, "content": msg.content} for msg in request.messages]
        response = await ai_service.chat_with_travel_expert(messages, request.destination)
        return {"response": response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/chat-suggestions/{destination}")
async def get_suggestions(destination: str):
    try:
        suggestions = await ai_service.get_chat_suggestions(destination)
        return {"suggestions": suggestions}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
