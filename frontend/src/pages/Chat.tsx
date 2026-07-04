import { useState, useRef, useEffect } from 'react';
import { experienceAPI } from '../services/api';
import type { ChatMessage } from '../types';
import { FiSend, FiMessageCircle } from 'react-icons/fi';

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: "Hello! I'm your TravelVerse AI guide. Ask me anything about destinations, culture, hidden gems, or local experiences. Where would you like to explore?" }
  ]);
  const [input, setInput] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    const userMsg: ChatMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    try {
      const { data } = await experienceAPI.chat(newMessages, destination || undefined);
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Sorry, I encountered an error. Please try again.' }]);
    }
    setLoading(false);
  };

  const suggestions = [
    "What are must-try foods in Bangkok?",
    "Tell me about hidden temples in Bali",
    "Best cultural festivals in Japan this year",
    "Authentic craft workshops in Morocco",
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient">AI Travel Guide</h1>
        <p className="text-slate-400">Chat with our AI expert for personalized cultural insights</p>
      </div>

      <div className="card-glass rounded-2xl p-4">
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)}
          placeholder="Focus on a specific destination (optional)"
          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-2 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
      </div>

      <div className="card-glass rounded-2xl overflow-hidden">
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={msg.role === 'user' ? 'chat-bubble-user' : 'chat-bubble-ai'}>
                {msg.content}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex justify-start">
              <div className="chat-bubble-ai flex items-center gap-2">
                <div className="flex gap-1"><span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:'0ms'}} /><span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:'150ms'}} /><span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{animationDelay:'300ms'}} /></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {messages.length <= 1 && (
          <div className="px-6 pb-4 flex flex-wrap gap-2">
            {suggestions.map((s, i) => (
              <button key={i} onClick={() => setInput(s)}
                className="text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 px-3 py-1.5 rounded-full transition-colors">
                {s}
              </button>
            ))}
          </div>
        )}

        <div className="border-t border-slate-700 p-4 flex gap-3">
          <input type="text" value={input} onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder="Ask about destinations, culture, food..."
            className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <button onClick={handleSend} disabled={loading || !input.trim()}
            className="btn-primary disabled:opacity-50 px-4">
            <FiSend className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
}
