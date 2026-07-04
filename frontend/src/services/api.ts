import axios from 'axios';
import type { Destination, CulturalExperience, Story, Event, HeritageItem, ChatMessage } from '../types';

const api = axios.create({ baseURL: '/api/v1' });

export const destinationAPI = {
  recommend: (data: { query: string; budget?: string; travel_style?: string; duration?: number; interests?: string[] }) =>
    api.post<Destination[]>('/destinations/recommend', data),
  hiddenGems: (destination: string, interests?: string[]) =>
    api.get<CulturalExperience[]>('/destinations/hidden-gems', { params: { destination, interests } }),
};

export const cultureAPI = {
  heritage: (destination: string) =>
    api.get<HeritageItem[]>(`/culture/heritage/${destination}`),
  chatSuggestions: (destination: string) =>
    api.get<string[]>(`/culture/chat-suggestions/${destination}`),
};

export const eventsAPI = {
  getEvents: (destination: string, dates?: string) =>
    api.get<Event[]>(`/events/${destination}`, { params: { dates } }),
};

export const storyAPI = {
  generate: (data: { destination: string; theme?: string; style?: string; length?: string }) =>
    api.post<Story>('/storytelling/generate', data),
};

export const experienceAPI = {
  chat: (messages: ChatMessage[], destination?: string) =>
    api.post<{ response: string }>('/experiences/chat', { messages, destination }),
};

export default api;
