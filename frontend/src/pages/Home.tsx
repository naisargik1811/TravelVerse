import { Link } from 'react-router-dom';
import { FiCompass, FiBookOpen, FiCalendar, FiLandmark, FiMessageCircle, FiGem } from 'react-icons/fi';

const features = [
  { icon: FiCompass, title: 'Smart Discovery', desc: 'AI-powered destination recommendations tailored to your interests', link: '/discover', color: 'from-blue-500 to-cyan-400' },
  { icon: FiGem, title: 'Hidden Gems', desc: 'Uncover authentic, off-the-beaten-path experiences', link: '/hidden-gems', color: 'from-amber-500 to-orange-400' },
  { icon: FiBookOpen, title: 'Cultural Stories', desc: 'Immersive storytelling that brings destinations to life', link: '/stories', color: 'from-purple-500 to-pink-400' },
  { icon: FiCalendar, title: 'Local Events', desc: 'Discover festivals, markets, and cultural gatherings', link: '/events', color: 'from-green-500 to-emerald-400' },
  { icon: FiLandmark, title: 'Heritage', desc: 'Explore cultural heritage and preservation efforts', link: '/heritage', color: 'from-rose-500 to-red-400' },
  { icon: FiMessageCircle, title: 'AI Travel Guide', desc: 'Chat with an expert about any destination', link: '/chat', color: 'from-indigo-500 to-violet-400' },
];

export default function Home() {
  return (
    <div className="space-y-16">
      <section className="text-center py-16 space-y-6">
        <h1 className="text-5xl md:text-7xl font-bold">
          <span className="text-gradient">Discover</span>
          <span className="text-white"> the World</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto">
          AI-powered platform that helps travelers discover destinations and engage with local culture in meaningful ways
        </p>
        <div className="flex justify-center gap-4">
          <Link to="/discover" className="btn-primary text-lg">Start Exploring</Link>
          <Link to="/chat" className="btn-accent text-lg">Chat with AI Guide</Link>
        </div>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map(({ icon: Icon, title, desc, link, color }) => (
          <Link
            key={title}
            to={link}
            className="card-glass rounded-2xl p-6 hover:scale-105 transition-all duration-300 group"
          >
            <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
              <Icon className="text-2xl text-white" />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
            <p className="text-slate-400">{desc}</p>
          </Link>
        ))}
      </section>

      <section className="card-glass rounded-2xl p-8 text-center space-y-4">
        <h2 className="text-3xl font-bold text-white">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-8 pt-4">
          {[
            { step: '1', title: 'Tell Us Your Vision', desc: 'Share your travel preferences, interests, and dreams' },
            { step: '2', title: 'AI Crafts Your Journey', desc: 'Our GenAI creates personalized recommendations and stories' },
            { step: '3', title: 'Immerse & Experience', desc: 'Connect with authentic local culture and hidden treasures' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="space-y-3">
              <div className="w-12 h-12 rounded-full bg-primary-600 flex items-center justify-center mx-auto text-xl font-bold text-white">{step}</div>
              <h3 className="text-lg font-semibold text-white">{title}</h3>
              <p className="text-slate-400 text-sm">{desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
