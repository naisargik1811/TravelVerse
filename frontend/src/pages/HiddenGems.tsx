import { useState } from 'react';
import { destinationAPI } from '../services/api';
import type { CulturalExperience } from '../types';
import { FiGem, FiMapPin, FiStar } from 'react-icons/fi';

export default function HiddenGems() {
  const [destination, setDestination] = useState('');
  const [interests, setInterests] = useState('');
  const [loading, setLoading] = useState(false);
  const [gems, setGems] = useState<CulturalExperience[]>([]);

  const handleSearch = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    try {
      const interestList = interests ? interests.split(',').map(i => i.trim()) : [];
      const { data } = await destinationAPI.hiddenGems(destination, interestList.length ? interestList : undefined);
      setGems(Array.isArray(data) ? data : [data]);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient">Hidden Gems</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Discover authentic, off-the-beaten-path experiences</p>
      </div>

      <div className="card-glass rounded-2xl p-6 space-y-4">
        <div className="flex gap-3">
          <input type="text" value={destination} onChange={e => setDestination(e.target.value)}
            placeholder="Destination" className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
          <button onClick={handleSearch} disabled={loading} className="btn-accent disabled:opacity-50">
            {loading ? 'Finding...' : 'Discover Gems'}
          </button>
        </div>
        <input type="text" value={interests} onChange={e => setInterests(e.target.value)}
          placeholder="Interests (comma-separated): street food, art, nature, history..."
          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500 text-sm" />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {gems.map((gem, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 space-y-3 hover:scale-[1.02] transition-transform">
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-amber-500 to-orange-400 flex items-center justify-center flex-shrink-0">
                <FiGem className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-white">{gem.name}</h3>
                <p className="text-sm text-slate-400">{gem.type}</p>
              </div>
              <div className="text-right">
                <div className="text-xs text-slate-500">Authenticity</div>
                <div className="flex items-center gap-1 text-accent-400 font-bold">
                  <FiStar className="text-sm" />{Math.round(gem.authenticity_score * 100)}%
                </div>
              </div>
            </div>
            <p className="text-slate-300 text-sm">{gem.description}</p>
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-1 text-slate-400"><FiMapPin />{gem.location}</span>
              {gem.booking_info && <span className="text-green-400">{gem.booking_info}</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
