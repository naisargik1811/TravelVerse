import { useState } from 'react';
import { eventsAPI } from '../services/api';
import type { Event } from '../types';
import { FiCalendar, FiMapPin, FiTicket } from 'react-icons/fi';

export default function Events() {
  const [destination, setDestination] = useState('');
  const [dates, setDates] = useState('');
  const [loading, setLoading] = useState(false);
  const [events, setEvents] = useState<Event[]>([]);

  const handleSearch = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    try {
      const { data } = await eventsAPI.getEvents(destination, dates || undefined);
      setEvents(Array.isArray(data) ? data : [data]);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const categoryColors: Record<string, string> = {
    festival: 'from-yellow-500 to-amber-400',
    market: 'from-green-500 to-emerald-400',
    workshop: 'from-blue-500 to-cyan-400',
    concert: 'from-purple-500 to-violet-400',
    food: 'from-orange-500 to-red-400',
    art: 'from-pink-500 to-rose-400',
    default: 'from-slate-500 to-slate-400',
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient">Local Events & Festivals</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Discover authentic cultural events and experiences</p>
      </div>

      <div className="card-glass rounded-2xl p-6 flex gap-3">
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)}
          placeholder="Destination" className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
        <input type="text" value={dates} onChange={e => setDates(e.target.value)}
          placeholder="Travel dates (optional)" className="bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
        <button onClick={handleSearch} disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? 'Finding...' : 'Find Events'}
        </button>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {events.map((event, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 space-y-3 hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-3">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${categoryColors[event.category] || categoryColors.default} flex items-center justify-center flex-shrink-0`}>
                <FiCalendar className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{event.name}</h3>
                <p className="text-sm text-slate-400">{event.category} • {event.date}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Local Relevance</div>
                <div className="text-accent-400 font-bold">{Math.round(event.local_relevance * 100)}%</div>
              </div>
            </div>
            <p className="text-slate-300 text-sm">{event.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-slate-400"><FiMapPin />{event.location}</span>
              {event.ticket_info && <span className="flex items-center gap-1 text-green-400"><FiTicket />{event.ticket_info}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
