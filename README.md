# TravelVerse - GenAI Destination Discovery & Cultural Experiences Platform

## Chosen Vertical
**Destination Discovery & Cultural Experiences** - A GenAI-powered platform that helps travelers discover destinations and engage with local culture in meaningful ways.

## Approach & Logic
TravelVerse uses OpenAI's GPT-3.5-turbo as its core GenAI engine to deliver five key capabilities:

1. **Smart Destination Discovery** - Users describe what they're looking for (vibe, budget, style), and the AI returns personalized destination recommendations with highlights, hidden gems, budget estimates, and cultural tips.

2. **Hidden Gems Discovery** - Goes beyond tourist hotspots to uncover authentic local experiences, scored by authenticity level. Users can filter by interests (street food, art, nature, etc.).

3. **Cultural Storytelling** - Generates immersive narrative stories about destinations themed around cultural heritage, local legends, historical events, culinary traditions, and folklore. Stories include characters and cultural elements.

4. **Local Events & Festivals** - Discovers authentic cultural events, festivals, markets, workshops, and local gatherings with local relevance scoring.

5. **Heritage Promotion** - Provides detailed information about heritage sites, historical periods, significance, current status, and preservation efforts.

6. **AI Travel Guide Chat** - Conversational AI that answers questions about any destination, providing personalized cultural insights and recommendations.

## Architecture

### Backend (FastAPI + Python)
- **FastAPI** - High-performance async REST API
- **OpenAI API** - GenAI engine for all content generation
- **Pydantic** - Data validation and schemas
- **Structured JSON responses** - All AI outputs use `response_format={"type": "json_object"}` for reliable parsing

### Frontend (React + TypeScript + Tailwind CSS)
- **React 18** - Component-based UI
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Rapid styling with glass-morphism design
- **React Router** - SPA navigation
- **Axios** - API communication

## How the Solution Works

1. User visits the platform and chooses a feature (Discover, Hidden Gems, Stories, Events, Heritage, or AI Chat)
2. User provides input (destination, preferences, interests)
3. Frontend sends request to FastAPI backend
4. Backend constructs detailed prompts and calls OpenAI API
5. AI generates structured JSON responses
6. Backend validates and returns typed responses
7. Frontend renders results with rich UI

## Gen AI Services Utilized

| Service | Where Used |
|---------|-----------|
| **OpenAI GPT-3.5-turbo** | Destination recommendations, hidden gems discovery, cultural storytelling, event suggestions, heritage information, chat conversations |
| **OpenAI JSON Mode** | Structured output for all features ensuring reliable parsing |
| **Prompt Engineering** | System prompts for each feature with role-based expertise (travel advisor, storyteller, heritage expert, events specialist) |

## Key Features
- **8 Travel Styles** - Adventure, Cultural, Relaxation, Foodie, Budget, Luxury, Eco, Family
- **5 Story Themes** - Cultural Heritage, Local Legends, Historical Events, Culinary Traditions, Folklore
- **4 Narrative Styles** - Immersive, Poetic, Documentary, Adventure
- **Authenticity Scoring** - Hidden gems scored 0-100% for authenticity
- **Local Relevance** - Events scored by local cultural relevance
- **Quick Suggestions** - Pre-built conversation starters in chat

## Assumptions
1. User has an OpenAI API key (set in `.env` file)
2. Internet connection required for AI generation
3. Content is generated in English
4. Single-user deployment (no authentication required for demo)

## Setup Instructions

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY
python main.py
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The app runs on `http://localhost:3000` (frontend) and `http://localhost:8000` (API).

## Project Structure
```
TravelVerse/
├── backend/
│   ├── app/
│   │   ├── api/          # API route handlers
│   │   ├── core/         # Configuration
│   │   ├── schemas/      # Pydantic models
│   │   └── services/     # AI service layer
│   ├── tests/            # API tests
│   ├── main.py           # FastAPI entry point
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/   # Navbar
│   │   ├── pages/        # 7 page components
│   │   ├── services/     # API client
│   │   ├── types/        # TypeScript types
│   │   └── styles/       # Tailwind + custom CSS
│   └── package.json
└── README.md
```
