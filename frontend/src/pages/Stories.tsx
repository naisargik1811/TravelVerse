import { useState } from 'react';
import { storyAPI } from '../services/api';
import type { Story } from '../types';
import { FiBookOpen, FiPlay } from 'react-icons/fi';

export default function Stories() {
  const [destination, setDestination] = useState('');
  const [theme, setTheme] = useState('cultural_heritage');
  const [style, setStyle] = useState('immersive');
  const [length, setLength] = useState('medium');
  const [loading, setLoading] = useState(false);
  const [story, setStory] = useState<Story | null>(null);

  const handleGenerate = async () => {
    if (!destination.trim()) return;
    setLoading(true);
    try {
      const { data } = await storyAPI.generate({ destination, theme, style, length });
      setStory(data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-gradient">Cultural Storytelling</h1>
        <p className="text-slate-400 max-w-xl mx-auto">Immerse yourself in captivating stories of destinations worldwide</p>
      </div>

      <div className="card-glass rounded-2xl p-6 space-y-4">
        <input type="text" value={destination} onChange={e => setDestination(e.target.value)}
          placeholder="Enter a destination (e.g., Kyoto, Marrakech, Cusco)"
          className="w-full bg-slate-800 border border-slate-600 rounded-xl px-4 py-3 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500" />
        <div className="flex flex-wrap gap-3">
          <select value={theme} onChange={e => setTheme(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
            <option value="cultural_heritage">Cultural Heritage</option>
            <option value="local_legend">Local Legends</option>
            <option value="historical_event">Historical Events</option>
            <option value="culinary_tradition">Culinary Traditions</option>
            <option value="folklore">Folklore</option>
          </select>
          <select value={style} onChange={e => setStyle(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
            <option value="immersive">Immersive</option>
            <option value="poetic">Poetic</option>
            <option value="documentary">Documentary</option>
            <option value="adventure">Adventure</option>
          </select>
          <select value={length} onChange={e => setLength(e.target.value)} className="bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm">
            <option value="short">Short</option>
            <option value="medium">Medium</option>
            <option value="long">Long</option>
          </select>
          <button onClick={handleGenerate} disabled={loading} className="btn-accent disabled:opacity-50">
            {loading ? 'Creating...' : 'Generate Story'}
          </button>
        </div>
      </div>

      {story && (
        <div className="card-glass rounded-2xl p-8 space-y-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-400 flex items-center justify-center">
              <FiBookOpen className="text-xl text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white">{story.title}</h2>
          </div>
          <div className="prose prose-invert max-w-none">
            {story.narrative.split('\n').map((p, i) => <p key={i} className="text-slate-300 leading-relaxed">{p}</p>)}
          </div>
          {story.characters.length > 0 && (
            <div>
              <h3 className="font-semibold text-purple-400 mb-2">Characters</h3>
              <div className="flex flex-wrap gap-2">{story.characters.map((c, i) => <span key={i} className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">{c}</span>)}</div>
            </div>
          )}
          {story.cultural_elements.length > 0 && (
            <div>
              <h3 className="font-semibold text-accent-400 mb-2">Cultural Elements</h3>
              <div className="flex flex-wrap gap-2">{story.cultural_elements.map((e, i) => <span key={i} className="bg-accent-500/20 text-accent-300 px-3 py-1 rounded-full text-sm">{e}</span>)}</div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
