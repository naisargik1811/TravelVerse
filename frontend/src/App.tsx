import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Stories from './pages/Stories';
import Events from './pages/Events';
import Heritage from './pages/Heritage';
import Chat from './pages/Chat';
import HiddenGems from './pages/HiddenGems';

function App() {
  return (
    <Router>
      <div className="min-h-screen gradient-bg">
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/stories" element={<Stories />} />
            <Route path="/events" element={<Events />} />
            <Route path="/heritage" element={<Heritage />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/hidden-gems" element={<HiddenGems />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
