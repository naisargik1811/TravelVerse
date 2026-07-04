import { useState } from 'react';
import { destinationAPI } from '../services/api';
import type { Destination } from '../types';
import { FiSearch, FiMapPin, FiClock, FiDollarSign, FiStar } from 'react-icons/fi';

const styles = [
  { value: 'adventure', label: 'Adventure' }, { value: 'cultural', label: 'Cultural' },
  { value: 'relaxation', label: 'Relaxation' }, { value: 'foodie', label: 'Foodie' },
  { value: 'budget', label: 'Budget' }, { value: 'luxury', label: 'Luxury' },
  { value: 'eco', label: 'Eco' }, { value: 'family', label: 'Family' },
];

export default function Discover() {
  const [query, setQuery] = useState('');
  const [travelStyle, setTravelStyle] = useState('');
  const [budget, setBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Destination[]>([]);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);
    try {
      const { data } = await destinationAPI.recommend({
        query,
        travel_style: travelStyle || undefined,
        budget: budget || undefined,
        duration: duration ? parseInt(duration) : undefined,
      });
      setResults(Array.isArray(data) ? data : [data]);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient">Discover Your Next Destination</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Let AI find the perfect destination based on your preferences</p>
      </div>

      <div className="card-glass rounded-2xl p-6 space-y-4">
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text" value={query} onChange={e => setQuery(e.target.value)}
              placeholder="Where do you want to go? What are you looking for?"
              className="w-full bg-slate-800 border border-slate-600 rounded-xl pl-10 pr-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
              onKeyDown={e => e.key === 'Enter' && handleSearch()}
            />
          </div>
          <button onClick={handleSearch} disabled={loading} className="btn-primary disabled:opacity-50">
            {loading ? 'Searching...' : 'Explore'}
          </button>
        </div>
        <div className="flex flex-wrap gap-3">
          <select value={travelStyle} onChange={e => setTravelStyle(e.target.value)}
            className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
            <option value="">Travel Style</option>
            {styles.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
          </select>
          <input type="text" value={budget} onChange={e => setBudget(e.target.value)}
            placeholder="Budget (e.g., $1000)" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm w-40" />
          <input type="number" value={duration} onChange={e => setDuration(e.target.value)}
            placeholder="Days" className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm w-24" />
        </div>
      </div>

      <div className="space-y-6">
        {results.map((dest, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                  <FiMapPin className="text-accent-400" />{dest.name}
                </h2>
                <p className="text-slate-400">{dest.country}</p>
              </div>
              <div className="flex items-center gap-4 text-sm text-slate-300">
                <span className="flex items-center gap-1"><FiClock />{dest.best_time_to_visit}</span>
                <span className="flex items-center gap-1"><FiDollarSign />{dest.estimated_budget}</span>
              </div>
            </div>
            <p className="text-slate-300">{dest.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold text-primary-400 mb-2 flex items-center gap-1"><FiStar /> Highlights</h3>
                <ul className="space-y-1">{dest.highlights.map((h, j) => <li key={j} className="text-sm text-slate-300">• {h}</li>)}</ul>
              </div>
              <div>
                <h3 className="font-semibold text-accent-400 mb-2">Hidden Gems</h3>
                <ul className="space-y-1">{dest.hidden_gems.map((g, j) => <li key={j} className="text-sm text-slate-300">💎 {g}</li>)}</ul>
              </div>
            </div>
            {dest.cultural_tips.length > 0 && (
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h3 className="font-semibold text-yellow-400 mb-2">Cultural Tips</h3>
                <ul className="space-y-1">{dest.cultural_tips.map((t, j) => <li key={j} className="text-sm text-slate-300">🏮 {t}</li>)}</ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
