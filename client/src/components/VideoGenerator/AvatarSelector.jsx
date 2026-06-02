import React, { useState, useRef } from 'react';
import { Upload, User2, Check } from 'lucide-react';

const STOCK_AVATARS = [
  { id: 'alex', name: 'Alex', gradient: 'linear-gradient(135deg, #00E5FF, #0072FF)' },
  { id: 'maya', name: 'Maya', gradient: 'linear-gradient(135deg, #7B5CFF, #A855F7)' },
  { id: 'jordan', name: 'Jordan', gradient: 'linear-gradient(135deg, #FF3CAC, #FF6B6B)' },
  { id: 'sam', name: 'Sam', gradient: 'linear-gradient(135deg, #F59E0B, #F97316)' },
  { id: 'riley', name: 'Riley', gradient: 'linear-gradient(135deg, #10B981, #14B8A6)' },
  { id: 'taylor', name: 'Taylor', gradient: 'linear-gradient(135deg, #EF4444, #BE185D)' },
];

export default function AvatarSelector({ value, onChange }) {
  const [tab, setTab] = useState('stock'); // 'upload' | 'stock'
  const [uploadPreview, setUploadPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);

  const handleFile = (file) => {
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) return;
    const url = URL.createObjectURL(file);
    setUploadPreview(url);
    onChange({ type: 'upload', file, previewUrl: url });
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFile(file);
  };

  const handleFileInput = (e) => {
    handleFile(e.target.files[0]);
  };

  const selectStock = (avatar) => {
    onChange({ type: 'stock', id: avatar.id, name: avatar.name });
  };

  return (
    <div className="flex flex-col gap-3">
      <label className="text-xs font-semibold text-slate-400 uppercase tracking-widest">
        Avatar
      </label>

      {/* Tabs */}
      <div className="flex gap-1 p-1 bg-bg-primary rounded-xl border border-white/5">
        {['stock', 'upload'].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2 rounded-lg text-xs font-semibold transition-all capitalize ${
              tab === t
                ? 'bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {t === 'upload' ? 'Upload Photo' : 'Stock Avatars'}
          </button>
        ))}
      </div>

      {/* Stock Avatars Grid */}
      {tab === 'stock' && (
        <div className="grid grid-cols-3 gap-2">
          {STOCK_AVATARS.map((avatar) => {
            const isSelected = value?.type === 'stock' && value?.id === avatar.id;
            return (
              <button
                key={avatar.id}
                onClick={() => selectStock(avatar)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  isSelected
                    ? 'border-cyan-accent bg-cyan-accent/5 shadow-[0_0_12px_#00E5FF33]'
                    : 'border-white/5 bg-bg-primary hover:border-white/20'
                }`}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-lg relative"
                  style={{ background: avatar.gradient }}
                >
                  {avatar.name[0]}
                  {isSelected && (
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-cyan-accent rounded-full flex items-center justify-center">
                      <Check size={10} className="text-black" />
                    </div>
                  )}
                </div>
                <span className="text-xs text-slate-300">{avatar.name}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Upload Tab */}
      {tab === 'upload' && (
        <div>
          <div
            className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
              isDragging
                ? 'border-cyan-accent bg-cyan-accent/5'
                : 'border-white/10 hover:border-white/20 hover:bg-white/2'
            }`}
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploadPreview ? (
              <div className="flex flex-col items-center gap-2">
                <img
                  src={uploadPreview}
                  alt="Preview"
                  className="w-16 h-16 rounded-full object-cover border-2 border-cyan-accent"
                />
                <p className="text-xs text-cyan-accent font-semibold">Photo uploaded</p>
                <p className="text-xs text-slate-500">Click to change</p>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                  <Upload size={18} className="text-slate-400" />
                </div>
                <p className="text-sm text-slate-300 font-medium">Drop your photo here</p>
                <p className="text-xs text-slate-500">or click to browse · JPG, PNG</p>
              </div>
            )}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/jpeg,image/png"
            className="hidden"
            onChange={handleFileInput}
          />
        </div>
      )}
    </div>
  );
}
