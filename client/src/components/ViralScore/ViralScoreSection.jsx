import React from 'react';
import { Flame, TrendingUp } from 'lucide-react';
import PlatformCard from './PlatformCard.jsx';
import CircularScore from './CircularScore.jsx';

export default function ViralScoreSection({ viralScores }) {
  const { tiktok, instagram, youtube } = viralScores;
  const overall = Math.round((tiktok.score + instagram.score + youtube.score) / 3);

  return (
    <div className="animate-slide-up">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-pink-accent/20 border border-pink-accent/30 flex items-center justify-center">
          <Flame size={18} className="text-pink-accent" />
        </div>
        <div>
          <h2 className="font-syne font-bold text-xl text-white">Viral Score Analysis</h2>
          <p className="text-xs text-slate-400">AI-powered engagement prediction per platform</p>
        </div>
      </div>

      {/* Overall Score */}
      <div className="gradient-border rounded-2xl p-6 bg-bg-surface mb-6">
        <div className="flex items-center gap-6">
          <CircularScore
            score={overall}
            color="#FF3CAC"
            size={120}
            strokeWidth={10}
          />
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp size={16} className="text-pink-accent" />
              <span className="font-syne font-bold text-lg text-white">Overall Viral Score</span>
            </div>
            <p className="text-slate-400 text-sm mb-4">
              Combined analysis across TikTok, Instagram, and YouTube Shorts.
              Your content has{' '}
              <span className="text-pink-accent font-semibold">
                {overall >= 80 ? 'strong viral potential' : overall >= 65 ? 'good potential' : 'moderate potential'}
              </span>
              .
            </p>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'TikTok', score: tiktok.score, color: tiktok.color },
                { label: 'Instagram', score: instagram.score, color: instagram.color },
                { label: 'YouTube', score: youtube.score, color: youtube.color },
              ].map((p) => (
                <div key={p.label} className="bg-bg-primary rounded-xl p-2.5 text-center">
                  <span className="text-xs text-slate-500 block mb-1">{p.label}</span>
                  <span
                    className="text-lg font-bold font-syne"
                    style={{ color: p.color }}
                  >
                    {p.score}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Platform Cards */}
      <div className="grid md:grid-cols-3 gap-5">
        <PlatformCard platform="TikTok" data={tiktok} />
        <PlatformCard platform="Instagram" data={instagram} />
        <PlatformCard platform="YouTube" data={youtube} />
      </div>
    </div>
  );
}
