import pytest
from fastapi.testclient import TestClient
from unittest.mock import AsyncMock, patch
from main import app

client = TestClient(app)


def test_health():
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


def test_root():
    response = client.get("/")
    assert response.status_code == 200
    assert "TravelVerse" in response.json()["message"]


def test_destinations_recommend_requires_api_key():
    with patch("app.services.ai_service.settings") as mock_settings:
        mock_settings.OPENAI_API_KEY = None
        response = client.post("/api/v1/destinations/recommend", json={"query": "beach vacation"})
        assert response.status_code == 500


def test_storytelling_requires_api_key():
    with patch("app.services.ai_service.settings") as mock_settings:
        mock_settings.OPENAI_API_KEY = None
        response = client.post("/api/v1/storytelling/generate", json={"destination": "Kyoto"})
        assert response.status_code == 500


def test_events_requires_api_key():
    with patch("app.services.ai_service.settings") as mock_settings:
        mock_settings.OPENAI_API_KEY = None
        response = client.get("/api/v1/events/Paris")
        assert response.status_code == 500


def test_culture_heritage_requires_api_key():
    with patch("app.services.ai_service.settings") as mock_settings:
        mock_settings.OPENAI_API_KEY = None
        response = client.get("/api/v1/culture/heritage/Rome")
        assert response.status_code == 500
