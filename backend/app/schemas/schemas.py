from pydantic import BaseModel, Field
from typing import Optional
from enum import Enum


class TravelStyle(str, Enum):
    ADVENTURE = "adventure"
    CULTURAL = "cultural"
    RELAXATION = "relaxation"
    FOODIE = "foodie"
    BUDGET = "budget"
    LUXURY = "luxury"
    ECO = "eco"
    FAMILY = "family"


class DestinationRequest(BaseModel):
    query: str = Field(..., description="User query about destination")
    budget: Optional[str] = Field(None, description="Budget range")
    travel_style: Optional[TravelStyle] = None
    duration: Optional[int] = Field(None, description="Trip duration in days")
    interests: list[str] = Field(default_factory=list)
    climate_preference: Optional[str] = None


class DestinationResponse(BaseModel):
    name: str
    country: str
    description: str
    highlights: list[str]
    hidden_gems: list[str]
    best_time_to_visit: str
    estimated_budget: str
    cultural_tips: list[str]


class StoryRequest(BaseModel):
    destination: str
    theme: str = Field(default="cultural_heritage", description="Story theme")
    style: str = Field(default="immersive", description="Narrative style")
    length: str = Field(default="medium", description="short/medium/long")


class StoryResponse(BaseModel):
    title: str
    narrative: str
    characters: list[str]
    cultural_elements: list[str]
    audio_narration_url: Optional[str] = None


class CulturalExperience(BaseModel):
    name: str
    description: str
    location: str
    type: str
    authenticity_score: float
    booking_info: Optional[str] = None


class EventResponse(BaseModel):
    name: str
    description: str
    date: str
    location: str
    category: str
    local_relevance: float
    ticket_info: Optional[str] = None


class HeritageItem(BaseModel):
    name: str
    description: str
    historical_period: str
    significance: str
    current_status: str
    preservation_efforts: str


class ChatMessage(BaseModel):
    role: str
    content: str


class ChatRequest(BaseModel):
    messages: list[ChatMessage]
    destination: Optional[str] = None
    context: Optional[str] = "destination_discovery"
