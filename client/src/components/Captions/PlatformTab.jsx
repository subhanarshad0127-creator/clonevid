import React, { useState } from 'react';
import { Copy, Check, Clock, Music, Hash, Type, FileText, Tag } from 'lucide-react';

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <button
      onClick={handleCopy}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
        copied
          ? 'bg-cyan-accent/20 text-cyan-accent border border-cyan-accent/30'
          : 'bg-bg-primary text-slate-400 border border-white/5 hover:text-white hover:border-white/20'
      }`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? 'Copied!' : 'Copy'}
    </button>
  );
}

function Section({ icon: Icon, title, children, copyText }) {
  return (
    <div className="bg-bg-primary rounded-xl p-4 border border-white/5">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Icon size={14} className="text-slate-500" />
          <span className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{title}</span>
        </div>
        {copyText && <CopyButton text={copyText} />}
      </div>
      {children}
    </div>
  );
}

export function TikTokTab({ data }) {
  return (
    <div className="flex flex-col gap-4">
      <Section icon={Type} title="Caption Variants" copyText={data.variants.join('\n\n')}>
        <div className="flex flex-col gap-3">
          {data.variants.map((v, i) => (
            <div key={i} className="flex gap-2">
              <span
                className="text-xs font-bold px-2 py-1 rounded-md shrink-0 h-fit mt-0.5"
                style={{ background: '#FF005018', color: '#FF0050', border: '1px solid #FF005030' }}
              >
                V{i + 1}
              </span>
              <p className="text-sm text-slate-300 leading-relaxed">{v}</p>
            </div>
          ))}
        </div>
      </Section>

      <div className="grid grid-cols-2 gap-4">
        <Section icon={Hash} title="Hashtags" copyText={data.hashtags.join(' ')}>
          <div className="flex flex-wrap gap-1.5">
            {data.hashtags.map((h, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-md bg-bg-elevated text-slate-400 font-mono">
                {h}
              </span>
            ))}
          </div>
        </Section>

        <div className="flex flex-col gap-4">
          <Section icon={Clock} title="Best Time" copyText={data.bestTime}>
            <p className="text-sm text-slate-200 font-semibold">{data.bestTime}</p>
          </Section>
          <Section icon={Music} title="Trending Sound" copyText={data.trendingSound}>
            <p className="text-sm text-slate-200 font-semibold">{data.trendingSound}</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

export function InstagramTab({ data }) {
  return (
    <div className="flex flex-col gap-4">
      <Section icon={FileText} title="Caption" copyText={data.caption}>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{data.caption}</p>
      </Section>

      <div className="grid grid-cols-2 gap-4">
        <Section icon={Hash} title="Hashtags" copyText={data.hashtags.join(' ')}>
          <div className="flex flex-wrap gap-1.5">
            {data.hashtags.map((h, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-md bg-bg-elevated text-slate-400 font-mono">
                {h}
              </span>
            ))}
          </div>
        </Section>

        <div className="flex flex-col gap-4">
          <Section icon={Type} title="Story Text" copyText={data.storyText}>
            <p className="text-sm text-slate-200 font-semibold">{data.storyText}</p>
          </Section>
          <Section icon={FileText} title="Reel Description" copyText={data.reelDescription}>
            <p className="text-sm text-slate-300">{data.reelDescription}</p>
          </Section>
        </div>
      </div>
    </div>
  );
}

export function YouTubeTab({ data }) {
  return (
    <div className="flex flex-col gap-4">
      <Section icon={Type} title="SEO Titles" copyText={data.titles.join('\n')}>
        <div className="flex flex-col gap-2">
          {data.titles.map((t, i) => (
            <div key={i} className="flex gap-2 items-start">
              <span
                className="text-xs font-bold px-2 py-1 rounded-md shrink-0 h-fit mt-0.5"
                style={{ background: '#FF000018', color: '#FF0000', border: '1px solid #FF000030' }}
              >
                #{i + 1}
              </span>
              <p className="text-sm text-slate-200 font-semibold leading-relaxed">{t}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section icon={FileText} title="Description" copyText={data.description}>
        <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">{data.description}</p>
      </Section>

      <div className="grid grid-cols-2 gap-4">
        <Section icon={Tag} title="Tags" copyText={data.tags.join(', ')}>
          <div className="flex flex-wrap gap-1.5">
            {data.tags.map((t, i) => (
              <span key={i} className="text-xs px-2 py-1 rounded-md bg-bg-elevated text-slate-400">
                {t}
              </span>
            ))}
          </div>
        </Section>

        <Section icon={Type} title="Thumbnail Text" copyText={data.thumbnailText}>
          <p className="text-sm text-slate-300 leading-relaxed">{data.thumbnailText}</p>
        </Section>
      </div>
    </div>
  );
}
