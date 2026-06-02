import React from 'react';
import { Zap, Mic2, User2, Film, ChevronDown } from 'lucide-react';

const STYLES = ['Educational', 'Motivational', 'News', 'Tutorial', 'Storytelling'];
const LENGTHS = ['30s', '60s', '2min', '3min'];
const PLATFORMS = ['TikTok', 'Instagram Reels', 'YouTube Shorts', 'YouTube'];

function SelectField({ label, value, options, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 focus:outline-none focus:border-cyan-accent/50 focus:ring-1 focus:ring-cyan-accent/30 transition-all cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
      </div>
    </div>
  );
}

function Toggle({ label, icon: Icon, color, checked, onChange, description }) {
  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer ${
        checked ? 'border-opacity-40 bg-opacity-5' : 'border-white/5 bg-bg-primary/50'
      }`}
      style={checked ? { borderColor: `${color}44`, backgroundColor: `${color}08` } : {}}
      onClick={() => onChange(!checked)}
    >
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0"
        style={{ background: `${color}18`, border: `1px solid ${color}33` }}
      >
        <Icon size={16} style={{ color }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-slate-200">{label}</p>
        <p className="text-xs text-slate-500 truncate">{description}</p>
      </div>
      {/* Toggle switch */}
      <div
        className={`relative w-11 h-6 rounded-full transition-all duration-300 shrink-0 ${
          checked ? '' : 'bg-bg-elevated'
        }`}
        style={checked ? { background: color } : {}}
      >
        <div
          className={`absolute top-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300 ${
            checked ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </div>
    </div>
  );
}

export default function VideoGeneratorForm({ formData, setFormData, onGenerate, isGenerating }) {
  const update = (key) => (val) => setFormData((prev) => ({ ...prev, [key]: val }));

  return (
    <div className="gradient-border rounded-2xl p-6 bg-bg-surface">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-xl gradient-btn flex items-center justify-center">
          <Zap size={18} className="text-white" />
        </div>
        <div>
          <h2 className="font-syne font-bold text-xl text-white">Video Generator</h2>
          <p className="text-xs text-slate-400">Powered by GPT-4, ElevenLabs & HeyGen</p>
        </div>
      </div>

      {/* Topic Input */}
      <div className="mb-6">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest block mb-2">
          Video Topic
        </label>
        <textarea
          value={formData.topic}
          onChange={(e) => update('topic')(e.target.value)}
          placeholder="e.g. 5 morning habits that changed my life, How to save $1000 in 30 days, The truth about intermittent fasting..."
          rows={3}
          className="w-full bg-bg-primary border border-white/10 rounded-xl px-4 py-3 text-sm text-slate-200 placeholder-slate-600 focus:outline-none focus:border-cyan-accent/50 focus:ring-1 focus:ring-cyan-accent/30 transition-all resize-none"
        />
      </div>

      {/* 3 Dropdowns */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <SelectField
          label="Style"
          value={formData.style}
          options={STYLES}
          onChange={update('style')}
        />
        <SelectField
          label="Length"
          value={formData.length}
          options={LENGTHS}
          onChange={update('length')}
        />
        <SelectField
          label="Platform"
          value={formData.platform}
          options={PLATFORMS}
          onChange={update('platform')}
        />
      </div>

      {/* Toggles */}
      <div className="flex flex-col gap-3 mb-8">
        <Toggle
          label="Voice Cloning"
          icon={Mic2}
          color="#7B5CFF"
          checked={formData.voiceCloning}
          onChange={update('voiceCloning')}
          description="Use your voice or a cloned preset"
        />
        <Toggle
          label="AI Avatar"
          icon={User2}
          color="#FF3CAC"
          checked={formData.aiAvatar}
          onChange={update('aiAvatar')}
          description="Photorealistic presenter avatar"
        />
        <Toggle
          label="Auto B-Roll"
          icon={Film}
          color="#00E5FF"
          checked={formData.autoBRoll}
          onChange={update('autoBRoll')}
          description="Automatically add relevant footage"
        />
      </div>

      {/* Generate Button */}
      <button
        onClick={onGenerate}
        disabled={isGenerating || !formData.topic.trim()}
        className="w-full gradient-btn py-4 rounded-xl font-bold text-white text-base shadow-2xl flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
      >
        {isGenerating ? (
          <>
            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <Zap size={18} />
            Generate Video
          </>
        )}
      </button>
    </div>
  );
}
