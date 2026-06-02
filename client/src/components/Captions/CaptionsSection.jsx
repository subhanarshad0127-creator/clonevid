import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import { TikTokTab, InstagramTab, YouTubeTab } from './PlatformTab.jsx';

const TABS = [
  { id: 'tiktok', label: 'TikTok', color: '#FF0050' },
  { id: 'instagram', label: 'Instagram', color: '#833AB4' },
  { id: 'youtube', label: 'YouTube', color: '#FF0000' },
];

export default function CaptionsSection({ captions }) {
  const [activeTab, setActiveTab] = useState('tiktok');

  return (
    <div className="animate-slide-up">
      {/* Section Header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl bg-purple-accent/20 border border-purple-accent/30 flex items-center justify-center">
          <MessageSquare size={18} className="text-purple-accent" />
        </div>
        <div>
          <h2 className="font-syne font-bold text-xl text-white">Caption Generator</h2>
          <p className="text-xs text-slate-400">Platform-optimized captions, hashtags & metadata</p>
        </div>
      </div>

      {/* Tab Container */}
      <div className="gradient-border rounded-2xl p-6 bg-bg-surface">
        {/* Tabs */}
        <div className="flex gap-2 mb-6 bg-bg-primary rounded-xl p-1">
          {TABS.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 ${
                activeTab === tab.id ? 'text-white shadow-lg' : 'text-slate-500 hover:text-slate-300'
              }`}
              style={
                activeTab === tab.id
                  ? { background: `${tab.color}22`, border: `1px solid ${tab.color}44`, color: tab.color }
                  : {}
              }
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div key={activeTab} className="animate-fade-in">
          {activeTab === 'tiktok' && <TikTokTab data={captions.tiktok} />}
          {activeTab === 'instagram' && <InstagramTab data={captions.instagram} />}
          {activeTab === 'youtube' && <YouTubeTab data={captions.youtube} />}
        </div>
      </div>
    </div>
  );
}
