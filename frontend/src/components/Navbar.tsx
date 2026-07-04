import { Link, useLocation } from 'react-router-dom';
import { FiGlobe, FiCompass, FiBookOpen, FiCalendar, FiLandmark, FiMessageCircle, FiGem } from 'react-icons/fi';

const navItems = [
  { path: '/', label: 'Home', icon: FiGlobe },
  { path: '/discover', label: 'Discover', icon: FiCompass },
  { path: '/stories', label: 'Stories', icon: FiBookOpen },
  { path: '/events', label: 'Events', icon: FiCalendar },
  { path: '/heritage', label: 'Heritage', icon: FiLandmark },
  { path: '/hidden-gems', label: 'Hidden Gems', icon: FiGem },
  { path: '/chat', label: 'AI Guide', icon: FiMessageCircle },
];

export default function Navbar() {
  const location = useLocation();
  return (
    <nav className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <FiGlobe className="text-2xl text-primary-400" />
            <span className="text-xl font-bold text-gradient">TravelVerse</span>
          </Link>
          <div className="hidden md:flex items-center gap-1">
            {navItems.map(({ path, label, icon: Icon }) => (
              <Link
                key={path}
                to={path}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                  location.pathname === path
                    ? 'bg-primary-600/20 text-primary-400'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Icon className="text-lg" />
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
