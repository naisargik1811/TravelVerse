export interface Destination {
  name: string;
  country: string;
  description: string;
  highlights: string[];
  hidden_gems: string[];
  best_time_to_visit: string;
  estimated_budget: string;
  cultural_tips: string[];
}

export interface CulturalExperience {
  name: string;
  description: string;
  location: string;
  type: string;
  authenticity_score: number;
  booking_info?: string;
}

export interface Story {
  title: string;
  narrative: string;
  characters: string[];
  cultural_elements: string[];
}

export interface Event {
  name: string;
  description: string;
  date: string;
  location: string;
  category: string;
  local_relevance: number;
  ticket_info?: string;
}

export interface HeritageItem {
  name: string;
  description: string;
  historical_period: string;
  significance: string;
  current_status: string;
  preservation_efforts: string;
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export type TravelStyle = 'adventure' | 'cultural' | 'relaxation' | 'foodie' | 'budget' | 'luxury' | 'eco' | 'family';
