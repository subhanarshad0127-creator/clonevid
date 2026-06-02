import React from 'react';
import { Link } from 'react-router-dom';
import {
  Video,
  TrendingUp,
  Sparkles,
  Calendar,
  Download,
  Flame,
  User,
  Bell,
  CreditCard,
  LogOut,
  Clock,
  ArrowUp,
} from 'lucide-react';
import { useCredits } from '../hooks/useCredits.js';

const videos = [
  { title: '5 Morning Habits That Changed My Life', date: 'May 28, 2026', score: 87, platform: 'TikTok', duration: '60s' },
  { title: 'Crypto Bull Run 2025: What to Expect', date: 'May 25, 2026', score: 74, platform: 'YouTube Shorts', duration: '60s' },
  { title: 'ChatGPT Productivity Hacks Nobody Talks About', date: 'May 22, 2026', score: 91, platform: 'TikTok', duration: '30s' },
  { title: 'How I Built a $10k/Month Business from Scratch', date: 'May 19, 2026', score: 88, platform: 'Instagram Reels', duration: '60s' },
  { title: 'The Truth About Intermittent Fasting', date: 'May 16, 2026', score: 79, platform: 'YouTube Shorts', duration: '2min' },
  { title: 'Minimalist Desk Setup for Maximum Focus', date: 'May 13, 2026', score: 82, platform: 'TikTok', duration: '60s' },
];

function ScoreBadge({ score }) {
  const color = score >= 85 ? '#00E5FF' : score >= 75 ? '#7B5CFF' : '#F59E0B';
  return (
    <div className="flex items-center gap-1.5">
      <Flame size={12} style={{ color }} />
      <span className="text-sm font-bold font-syne" style={{ color }}>
        {score}
      </span>
    </div>
  );
}

function PlatformBadge({ platform }) {
  const colors = {
    TikTok: '#FF0050',
    'YouTube Shorts': '#FF0000',
    'Instagram Reels': '#833AB4',
  };
  const color = colors[platform] || '#00E5FF';
  return (
    <span
      className="text-xs px-2 py-0.5 rounded-full font-semibold"
      style={{ background: `${color}18`, color, border: `1px solid ${color}30` }}
    >
      {platform}
    </span>
  );
}

function MinutesProgressBar({ used, total }) {
  const pct = Math.round((used / total) * 100);
  const color = pct < 80 ? '#10B981' : pct < 95 ? '#F59E0B' : '#EF4444';
  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex justify-between text-xs text-slate-400">
        <span>{used} min used</span>
        <span>{total - used} min left</span>
      </div>
      <div className="h-2 rounded-full bg-bg-primary overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const credits = useCredits('starter');

  const stats = [
    { label: 'Total Videos', value: '47', icon: Video, color: '#00E5FF' },
    { label: 'This Month', value: '12', icon: Calendar, color: '#7B5CFF' },
    { label: 'Minutes Remaining', value: `${credits.minutesRemaining}`, icon: Clock, color: '#FF3CAC' },
    { label: 'Avg Viral Score', value: '83', icon: TrendingUp, color: '#F59E0B' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-syne font-bold text-3xl text-white mb-1">Dashboard</h1>
          <p className="text-slate-400 text-sm">Welcome back, Creator.</p>
        </div>
        <div className="w-12 h-12 rounded-full gradient-btn flex items-center justify-center font-syne font-bold text-white text-lg">
          SA
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <div key={i} className="gradient-border rounded-2xl p-5 bg-bg-surface">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center mb-3"
              style={{ background: `${s.color}18`, border: `1px solid ${s.color}33` }}
            >
              <s.icon size={18} style={{ color: s.color }} />
            </div>
            <p className="font-syne font-bold text-2xl text-white mb-0.5">{s.value}</p>
            <p className="text-xs text-slate-400">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Minutes usage card */}
      <div className="gradient-border rounded-2xl p-6 bg-bg-surface">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="font-syne font-bold text-lg text-white">
              {credits.planName} Plan — {credits.minutesTotal} min/month
            </h2>
            <p className="text-xs text-slate-400">
              {credits.minutesRemaining} minutes remaining this billing period
            </p>
          </div>
          <Link
            to="/#pricing"
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-sm font-semibold hover:bg-cyan-accent/20 transition-colors"
          >
            <ArrowUp size={14} />
            Upgrade Plan
          </Link>
        </div>
        <MinutesProgressBar used={credits.minutesUsed} total={credits.minutesTotal} />
      </div>

      {/* Videos Table */}
      <div className="gradient-border rounded-2xl overflow-hidden bg-bg-surface">
        <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-syne font-bold text-lg text-white">Recent Videos</h2>
          <span className="text-xs text-slate-500">{videos.length} total</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/5">
                {['Video', 'Platform', 'Date', 'Score', ''].map((h, i) => (
                  <th key={i} className="px-6 py-3 text-left text-xs font-semibold text-slate-500 uppercase tracking-widest">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {videos.map((v, i) => (
                <tr
                  key={i}
                  className="border-b border-white/5 last:border-0 hover:bg-white/2 transition-colors"
                >
                  {/* Thumbnail + Title */}
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          background: 'linear-gradient(135deg, #7B5CFF22, #FF3CAC22)',
                          border: '1px solid #7B5CFF22',
                        }}
                      >
                        <Video size={14} className="text-slate-500" />
                      </div>
                      <div>
                        <p className="text-slate-200 font-medium truncate max-w-xs">{v.title}</p>
                        <p className="text-xs text-slate-500">{v.duration}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <PlatformBadge platform={v.platform} />
                  </td>
                  <td className="px-6 py-4 text-slate-400 text-xs whitespace-nowrap">{v.date}</td>
                  <td className="px-6 py-4">
                    <ScoreBadge score={v.score} />
                  </td>
                  <td className="px-6 py-4">
                    <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bg-primary text-slate-400 text-xs border border-white/5 hover:text-white hover:border-white/20 transition-all">
                      <Download size={12} />
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Account Settings */}
      <div className="gradient-border rounded-2xl p-6 bg-bg-surface">
        <h2 className="font-syne font-bold text-lg text-white mb-5">Account Settings</h2>

        <div className="grid md:grid-cols-2 gap-4">
          {[
            { icon: User, label: 'Profile', desc: 'Update your name and profile picture', color: '#00E5FF' },
            { icon: Bell, label: 'Notifications', desc: 'Manage email and push notifications', color: '#7B5CFF' },
            { icon: CreditCard, label: 'Billing & Plan', desc: `${credits.planName} Plan — $${credits.price}/month`, color: '#FF3CAC' },
            { icon: LogOut, label: 'Sign Out', desc: 'Sign out of your account', color: '#F59E0B' },
          ].map((item, i) => (
            <button
              key={i}
              className="flex items-center gap-3 p-4 rounded-xl bg-bg-primary border border-white/5 hover:border-white/10 hover:bg-white/2 transition-all text-left group"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: `${item.color}18`, border: `1px solid ${item.color}33` }}
              >
                <item.icon size={16} style={{ color: item.color }} />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200 group-hover:text-white transition-colors">
                  {item.label}
                </p>
                <p className="text-xs text-slate-500">{item.desc}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
