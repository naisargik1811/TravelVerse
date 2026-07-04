import { useState } from 'react';
import { cultureAPI } from '../services/api';
import type { HeritageItem } from '../types';
import { FiLandmark, FiClock, FiShield } from 'react-icons/fi';

export default function Heritage() {
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState<HeritageItem[]>([]);

  const handleSearch = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    try {
      const { data } = await cultureAPI.heritage(destination);
      setItems(Array.isArray(data) ? data : [data]);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  const statusColors: Record<string, string> = {
    preserved: 'text-green-400', endangered: 'text-red-400', restored: 'text-blue-400', active: 'text-yellow-400',
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient">Cultural Heritage</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Explore the rich heritage and preservation efforts around the world</p>
      </div>

      <div className="card-glass rounded-2xl p-6 flex gap-3">
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)}
          placeholder="Enter destination (e.g., Rome, Kyoto, Cairo)"
          className="flex-1 bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
        <button onClick={handleSearch} disabled={loading} className="btn-primary disabled:opacity-50">
          {loading ? 'Exploring...' : 'Explore Heritage'}
        </button>
      </div>

      <div className="space-y-6">
        {items.map((item, i) => (
          <div key={i} className="card-glass rounded-2xl p-6 space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-500 to-red-400 flex items-center justify-center flex-shrink-0">
                <FiLandmark className="text-2xl text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-white">{item.name}</h2>
                <div className="flex items-center gap-3 text-sm text-slate-400 mt-1">
                  <span className="flex items-center gap-1"><FiClock />{item.historical_period}</span>
                  <span className={`flex items-center gap-1 ${statusColors[item.current_status?.toLowerCase()] || 'text-slate-400'}`}>
                    <FiShield />{item.current_status}
                  </span>
                </div>
              </div>
            </div>
            <p className="text-slate-300">{item.description}</p>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h3 className="font-semibold text-primary-400 text-sm mb-1">Significance</h3>
                <p className="text-sm text-slate-300">{item.significance}</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4">
                <h3 className="font-semibold text-green-400 text-sm mb-1">Preservation Efforts</h3>
                <p className="text-sm text-slate-300">{item.preservation_efforts}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
