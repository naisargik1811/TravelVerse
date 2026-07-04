from openai import AsyncOpenAI
from app.core.config import settings
from typing import Optional
import json


client: Optional[AsyncOpenAI] = None


def get_openai_client() -> AsyncOpenAI:
    global client
    if client is None:
        client = AsyncOpenAI(api_key=settings.OPENAI_API_KEY)
    return client


async def generate_destination_recommendation(query: str, context: dict = None) -> dict:
    client = get_openai_client()
    system_prompt = """You are TravelVerse, an expert travel advisor specializing in authentic cultural experiences.
    Provide detailed, personalized destination recommendations with hidden gems and cultural insights.
    Always include: destination name, country, description, highlights, hidden gems, best time to visit, budget, cultural tips.
    Return valid JSON."""

    user_msg = f"Recommend destinations for: {query}"
    if context:
        user_msg += f"\nAdditional context: {json.dumps(context)}"

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_msg}
        ],
        temperature=0.7,
        max_tokens=1500,
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


async def generate_cultural_story(destination: str, theme: str, style: str, length: str) -> dict:
    client = get_openai_client()
    token_map = {"short": 500, "medium": 1000, "long": 2000}
    system_prompt = """You are a master storyteller specializing in cultural narratives and heritage tales.
    Create immersive, vivid stories that bring destinations to life through local legends, history, and traditions.
    Return valid JSON with: title, narrative, characters (list), cultural_elements (list)."""

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Create a {length} {style} story about {destination} with theme: {theme}. Make it immersive and culturally rich."}
        ],
        temperature=0.8,
        max_tokens=token_map.get(length, 1000),
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


async def discover_hidden_gems(destination: str, interests: list[str] = None) -> list[dict]:
    client = get_openai_client()
    interest_str = ", ".join(interests) if interests else "general exploration"
    system_prompt = """You are a local insider who knows every hidden corner of destinations worldwide.
    Discover authentic, off-the-beaten-path experiences that most tourists never find.
    Return valid JSON array with: name, description, location, type, authenticity_score (0-1), booking_info."""

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Find hidden gems in {destination} for someone interested in: {interest_str}. Include authentic local experiences."}
        ],
        temperature=0.7,
        max_tokens=1500,
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


async def suggest_local_events(destination: str, travel_dates: str = None) -> list[dict]:
    client = get_openai_client()
    system_prompt = """You are a local events expert. Suggest authentic cultural events, festivals, and activities.
    Include both popular and lesser-known local events that offer genuine cultural immersion.
    Return valid JSON array with: name, description, date, location, category, local_relevance (0-1), ticket_info."""

    date_context = f" during {travel_dates}" if travel_dates else ""
    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Suggest cultural events and experiences in {destination}{date_context}. Include festivals, markets, workshops, and local gatherings."}
        ],
        temperature=0.7,
        max_tokens=1500,
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


async def get_heritage_info(destination: str) -> list[dict]:
    client = get_openai_client()
    system_prompt = """You are a cultural heritage expert and historian. Provide detailed information about heritage sites, traditions, and cultural preservation.
    Return valid JSON array with: name, description, historical_period, significance, current_status, preservation_efforts."""

    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": f"Provide heritage and cultural preservation information about {destination}. Cover historical sites, traditions, art forms, and preservation efforts."}
        ],
        temperature=0.6,
        max_tokens=1500,
        response_format={"type": "json_object"}
    )
    return json.loads(response.choices[0].message.content)


async def chat_with_travel_expert(messages: list[dict], destination: str = None) -> str:
    client = get_openai_client()
    dest_context = f" Currently discussing: {destination}." if destination else ""
    system_msg = f"""You are TravelVerse AI, a friendly and knowledgeable travel expert specializing in cultural immersion.
    You help travelers discover authentic experiences, hidden gems, and local culture.{dest_context}
    Be conversational, helpful, and passionate about cultural exchange."""

    all_messages = [{"role": "system", "content": system_msg}] + messages
    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=all_messages,
        temperature=0.7,
        max_tokens=1000
    )
    return response.choices[0].message.content


async def get_chat_suggestions(destination: str) -> list[str]:
    client = get_openai_client()
    response = await client.chat.completions.create(
        model=settings.OPENAI_MODEL,
        messages=[
            {"role": "system", "content": "Generate 5 engaging travel conversation starters about a destination. Return valid JSON array of strings."},
            {"role": "user", "content": f"Generate conversation starters about {destination} focusing on culture, food, hidden gems, and local life."}
        ],
        temperature=0.8,
        max_tokens=500,
        response_format={"type": "json_object"}
    )
    result = json.loads(response.choices[0].message.content)
    return result.get("suggestions", result) if isinstance(result, dict) else result
