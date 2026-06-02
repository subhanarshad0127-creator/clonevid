import React from 'react';
import { Download, Play, Clock, Zap, Volume2 } from 'lucide-react';

// Animated waveform bars
function Waveform() {
  const bars = Array.from({ length: 32 }, (_, i) => i);
  return (
    <div className="flex items-center justify-center gap-0.5 h-12">
      {bars.map((i) => (
        <div
          key={i}
          className="w-1 rounded-full"
          style={{
            height: `${20 + Math.sin(i * 0.5) * 15 + Math.random() * 10}px`,
            background: `linear-gradient(to top, #00E5FF, #7B5CFF)`,
            animation: `wave ${0.8 + (i % 5) * 0.15}s ease-in-out ${(i * 0.04).toFixed(2)}s infinite`,
            minHeight: '4px',
          }}
        />
      ))}
    </div>
  );
}

export default function VideoPreview({ topic, length, platform }) {
  const lengthMap = { '30s': '0:30', '60s': '1:00', '2min': '2:00', '3min': '3:00' };
  const displayLength = lengthMap[length] || '1:00';

  return (
    <div className="gradient-border rounded-2xl p-6 bg-bg-surface animate-slide-up">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-syne font-bold text-lg text-white">Video Preview</h3>
        <button className="gradient-btn px-4 py-2 rounded-lg text-sm font-bold text-white flex items-center gap-2">
          <Download size={14} />
          Download
        </button>
      </div>

      {/* Video card */}
      <div className="rounded-2xl overflow-hidden bg-bg-primary border border-white/5 mb-5">
        {/* Thumbnail area */}
        <div
          className="relative h-44 flex items-center justify-center overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #080C14 0%, #0E1420 40%, #131928 100%)',
          }}
        >
          {/* Background glow */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              background:
                'radial-gradient(ellipse at 30% 50%, #7B5CFF44, transparent 60%), radial-gradient(ellipse at 70% 50%, #00E5FF33, transparent 60%)',
            }}
          />

          {/* Avatar placeholder */}
          <div className="flex flex-col items-center gap-3 relative z-10">
            <div className="relative">
              <div
                className="w-16 h-16 rounded-full flex items-center justify-center font-syne font-bold text-xl text-white"
                style={{
                  background: 'linear-gradient(135deg, #7B5CFF, #FF3CAC)',
                }}
              >
                AI
              </div>
              <div
                className="absolute inset-0 rounded-full animate-ping opacity-30"
                style={{ background: 'linear-gradient(135deg, #7B5CFF, #FF3CAC)' }}
              />
            </div>
            <span className="text-xs text-slate-400">AI Avatar Active</span>
          </div>

          {/* Play button overlay */}
          <div className="absolute bottom-3 right-3 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center hover:bg-white/20 cursor-pointer transition-all">
            <Play size={14} className="text-white ml-0.5" fill="white" />
          </div>

          {/* Duration badge */}
          <div className="absolute bottom-3 left-3 flex items-center gap-1 px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm">
            <Clock size={10} className="text-slate-400" />
            <span className="text-xs text-slate-300 font-semibold">{displayLength}</span>
          </div>
        </div>

        {/* Waveform section */}
        <div className="px-4 py-3 border-t border-white/5">
          <div className="flex items-center gap-2 mb-2">
            <Volume2 size={12} className="text-cyan-accent" />
            <span className="text-xs text-slate-500">AI Voice Track</span>
          </div>
          <Waveform />
        </div>
      </div>

      {/* Metadata */}
      <div className="space-y-3">
        <div>
          <p className="text-xs text-slate-500 mb-1">Title</p>
          <p className="text-sm font-semibold text-slate-200 leading-snug">
            {topic ? `The TRUTH About ${topic} Nobody Tells You` : 'Your Generated Video Title'}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3">
          <div className="bg-bg-primary rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Platform</p>
            <p className="text-sm font-semibold text-slate-200">{platform || 'TikTok'}</p>
          </div>
          <div className="bg-bg-primary rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Duration</p>
            <p className="text-sm font-semibold text-slate-200">{displayLength}</p>
          </div>
          <div className="bg-bg-primary rounded-xl p-3 text-center">
            <p className="text-xs text-slate-500 mb-1">Format</p>
            <p className="text-sm font-semibold text-slate-200">9:16 HD</p>
          </div>
        </div>

        <div className="flex items-center gap-2 p-3 rounded-xl bg-cyan-accent/5 border border-cyan-accent/10">
          <Zap size={14} className="text-cyan-accent shrink-0" />
          <p className="text-xs text-slate-400">
            AI-optimized for maximum engagement on your selected platform.
          </p>
        </div>
      </div>
    </div>
  );
}
