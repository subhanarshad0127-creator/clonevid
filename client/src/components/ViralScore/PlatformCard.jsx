import React, { useEffect, useState } from 'react';
import CircularScore from './CircularScore.jsx';

const verdictColors = {
  'High Potential': '#00E5FF',
  'Strong Performance': '#7B5CFF',
  'Good Potential': '#FF3CAC',
  'Average': '#F59E0B',
};

function FactorBar({ label, score, color }) {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => setWidth(score), 200);
    return () => clearTimeout(t);
  }, [score]);

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-slate-400">{label}</span>
        <span className="text-xs font-bold" style={{ color }}>{score}</span>
      </div>
      <div className="h-1.5 bg-bg-primary rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${width}%`, background: color }}
        />
      </div>
    </div>
  );
}

// Platform logo as simple styled element
function PlatformLogo({ platform, color }) {
  const logos = {
    TikTok: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.17 8.17 0 004.78 1.52V6.77a4.85 4.85 0 01-1.01-.08z"/>
      </svg>
    ),
    Instagram: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
      </svg>
    ),
    YouTube: (
      <svg viewBox="0 0 24 24" width="20" height="20" fill={color}>
        <path d="M23.495 6.205a3.007 3.007 0 00-2.088-2.088c-1.87-.501-9.396-.501-9.396-.501s-7.507-.01-9.396.501A3.007 3.007 0 00.527 6.205a31.247 31.247 0 00-.522 5.805 31.247 31.247 0 00.522 5.783 3.007 3.007 0 002.088 2.088c1.868.502 9.396.502 9.396.502s7.506 0 9.396-.502a3.007 3.007 0 002.088-2.088 31.247 31.247 0 00.5-5.783 31.247 31.247 0 00-.5-5.805zM9.609 15.601V8.408l6.264 3.602z"/>
      </svg>
    ),
  };
  return logos[platform] || null;
}

export default function PlatformCard({ platform, data }) {
  const verdictColor = verdictColors[data.verdict] || '#00E5FF';

  return (
    <div className="gradient-border rounded-2xl p-5 bg-bg-surface flex flex-col gap-5 animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: `${data.color}18`, border: `1px solid ${data.color}33` }}
          >
            <PlatformLogo platform={platform} color={data.color} />
          </div>
          <span className="font-syne font-bold text-base text-white">{platform}</span>
        </div>
        <span
          className="text-xs font-bold px-3 py-1 rounded-full"
          style={{ background: `${verdictColor}18`, color: verdictColor, border: `1px solid ${verdictColor}30` }}
        >
          {data.verdict}
        </span>
      </div>

      {/* Score ring */}
      <div className="flex justify-center">
        <CircularScore score={data.score} color={data.color} size={110} strokeWidth={9} />
      </div>

      {/* Factor bars */}
      <div className="flex flex-col gap-3">
        {data.factors.map((f, i) => (
          <FactorBar key={i} label={f.label} score={f.score} color={data.color} />
        ))}
      </div>
    </div>
  );
}
