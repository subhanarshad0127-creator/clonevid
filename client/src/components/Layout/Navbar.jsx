import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Zap, LayoutDashboard, Video, Bell, ChevronDown } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 glass">
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
            <Zap size={18} className="text-white" />
          </div>
          <span className="font-syne font-800 text-lg gradient-text">Viralio</span>
        </Link>

        {/* Center nav */}
        <div className="hidden md:flex items-center gap-1">
          <Link
            to="/generate"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              location.pathname === '/generate'
                ? 'bg-cyan-accent/10 text-cyan-accent'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <Video size={16} />
            Generate
          </Link>
          <Link
            to="/dashboard"
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${
              location.pathname === '/dashboard'
                ? 'bg-cyan-accent/10 text-cyan-accent'
                : 'text-slate-400 hover:text-white hover:bg-white/5'
            }`}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-all">
            <Bell size={18} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-cyan-accent rounded-full"></span>
          </button>

          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-white/5 cursor-pointer transition-all">
            <div className="w-7 h-7 rounded-full gradient-btn flex items-center justify-center text-xs font-bold text-white">
              SA
            </div>
            <span className="text-sm text-slate-300 hidden md:block">Creator</span>
            <ChevronDown size={14} className="text-slate-500" />
          </div>

          <Link
            to="/generate"
            className="gradient-btn px-4 py-2 rounded-lg text-sm font-semibold text-white shadow-lg hidden md:flex items-center gap-2"
          >
            <Zap size={14} />
            Create Video
          </Link>
        </div>
      </div>
    </nav>
  );
}
