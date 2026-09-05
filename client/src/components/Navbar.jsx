import { Link, useLocation } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-zinc-800 bg-zinc-900/90 backdrop-blur-xl">
      <div className="mx-auto max-w-7xl px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <Sparkles className="w-5 h-5 text-emerald-400 group-hover:rotate-12 transition-transform duration-300" />
          <span className="text-lg font-semibold tracking-tight text-white">
            ProjectForge
          </span>
        </Link>

        <div className="flex items-center gap-8">
          <Link
            to="/"
            className={`text-sm tracking-wide transition-colors duration-200 ${
              isActive('/') 
                ? 'text-white' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Home
          </Link>
          <Link
            to="/profile"
            className={`text-sm tracking-wide transition-colors duration-200 ${
              isActive('/profile') 
                ? 'text-white' 
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Get Started
          </Link>
        </div>
      </div>
    </nav>
  );
}
