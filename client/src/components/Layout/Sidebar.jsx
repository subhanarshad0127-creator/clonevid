import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Video,
  LayoutDashboard,
  Sparkles,
  Settings,
  HelpCircle,
  ChevronRight,
  Flame,
  Clock,
  Star,
} from 'lucide-react';

const navItems = [
  { icon: Video, label: 'Generate', path: '/generate' },
  { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
];

const recentVideos = [
  { title: '5 Morning Habits...', score: 87 },
  { title: 'Crypto Bull Run 2025', score: 74 },
  { title: 'ChatGPT Productivity...', score: 91 },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="w-60 shrink-0 border-r border-white/5 bg-bg-surface/50 flex flex-col py-6 px-3 gap-6">
      {/* Main Nav */}
      <div>
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
          Main
        </p>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ icon: Icon, label, path }) => (
            <Link
              key={path}
              to={path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                location.pathname === path
                  ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20'
                  : 'text-slate-400 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={16} />
              {label}
              {location.pathname === path && (
                <ChevronRight size={14} className="ml-auto" />
              )}
            </Link>
          ))}
        </nav>
      </div>

      {/* Credits */}
      <div className="gradient-border p-3 rounded-xl">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-cyan-accent" />
            <span className="text-xs font-semibold text-slate-300">Credits</span>
          </div>
          <span className="text-xs text-cyan-accent font-bold">12 left</span>
        </div>
        <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
          <div
            className="h-full rounded-full"
            style={{
              width: '40%',
              background: 'linear-gradient(90deg, #00E5FF, #7B5CFF)',
            }}
          />
        </div>
        <p className="text-xs text-slate-500 mt-2">12 / 30 credits used</p>
      </div>

      {/* Recent Videos */}
      <div className="flex-1">
        <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest px-3 mb-2">
          Recent
        </p>
        <div className="flex flex-col gap-1">
          {recentVideos.map((v, i) => (
            <div
              key={i}
              className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/5 cursor-pointer group transition-all"
            >
              <div className="w-6 h-6 rounded-md bg-bg-elevated flex items-center justify-center shrink-0">
                <Clock size={10} className="text-slate-500" />
              </div>
              <span className="text-xs text-slate-400 group-hover:text-slate-200 truncate flex-1 transition-colors">
                {v.title}
              </span>
              <div className="flex items-center gap-1">
                <Flame size={10} className="text-orange-400" />
                <span className="text-xs text-orange-400 font-semibold">{v.score}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="flex flex-col gap-1">
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <Settings size={16} />
          Settings
        </button>
        <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-all">
          <HelpCircle size={16} />
          Help
        </button>
      </div>
    </aside>
  );
}
