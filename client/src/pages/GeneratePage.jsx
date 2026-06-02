import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle2, ArrowRight } from 'lucide-react';
import VideoGeneratorForm from '../components/VideoGenerator/VideoGeneratorForm.jsx';
import ProgressTracker from '../components/VideoGenerator/ProgressTracker.jsx';
import VideoPreview from '../components/VideoGenerator/VideoPreview.jsx';
import ViralScoreSection from '../components/ViralScore/ViralScoreSection.jsx';
import CaptionsSection from '../components/Captions/CaptionsSection.jsx';
import VideoEditor from '../components/VideoEditor/VideoEditor.jsx';
import PayPalButton from '../components/PayPalButton.jsx';
import { useVideoGeneration } from '../hooks/useVideoGeneration.js';
import { useCredits } from '../hooks/useCredits.js';

// ─── Script Options Step ─────────────────────────────────────────────────────

function ScriptCard({ script, onSelect }) {
  const labelColors = {
    'Hook-First': { bg: 'bg-cyan-accent/10', text: 'text-cyan-accent', border: 'border-cyan-accent/20' },
    'Story-Driven': { bg: 'bg-violet-500/10', text: 'text-violet-400', border: 'border-violet-500/20' },
    'List Format': { bg: 'bg-pink-500/10', text: 'text-pink-400', border: 'border-pink-500/20' },
  };
  const colors = labelColors[script.label] || labelColors['Hook-First'];

  // First 2 sentences of hook
  const hookPreview = script.hook.split(/(?<=[.!?])\s+/).slice(0, 2).join(' ');

  return (
    <div className="gradient-border rounded-2xl p-5 bg-bg-surface flex flex-col gap-4 hover:scale-[1.01] transition-transform">
      <div className="flex items-center justify-between">
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${colors.bg} ${colors.text} ${colors.border}`}>
          {script.label}
        </span>
        <span className="text-xs text-slate-500">{script.wordCount} words</span>
      </div>

      <div>
        <p className="text-xs text-slate-500 uppercase tracking-widest mb-2">Hook Preview</p>
        <p className="text-sm text-slate-200 leading-relaxed italic">"{hookPreview}"</p>
      </div>

      <button
        onClick={() => onSelect(script)}
        className="w-full gradient-btn py-3 rounded-xl text-sm font-bold text-white flex items-center justify-center gap-2"
      >
        <CheckCircle2 size={14} />
        Select This Script
      </button>
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function GeneratePage() {
  const {
    formData,
    setFormData,
    generationStatus,
    currentStep,
    mockResults,
    scriptOptions,
    selectedScript,
    loadScripts,
    startGeneration,
    resetGeneration,
  } = useVideoGeneration();

  const credits = useCredits('starter');

  const isLoadingScripts = generationStatus === 'loadingScripts';
  const isSelectingScript = generationStatus === 'selectingScript';
  const isGenerating = generationStatus === 'generating';
  const isComplete = generationStatus === 'complete';

  // Length → estimated display
  const lengthMinutes = { '30s': 0.5, '60s': 1, '2min': 2, '3min': 3 };
  const videoDurationSeconds = { '30s': 30, '60s': 60, '2min': 120, '3min': 180 };
  const videoDuration = videoDurationSeconds[formData.length] || 60;

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Page Title */}
      <div>
        <h1 className="font-syne font-bold text-3xl text-white mb-1">Create New Video</h1>
        <p className="text-slate-400 text-sm">
          Fill in the details below and let AI handle the rest.
        </p>
      </div>

      {/* Credit Guard Banner */}
      {!credits.canGenerate && (
        <div className="rounded-2xl p-5 bg-red-500/5 border border-red-500/20 flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-syne font-bold text-white mb-1">You've used all your minutes this month.</p>
            <p className="text-sm text-slate-400">Upgrade your plan to keep creating videos.</p>
          </div>
          <PayPalButton planName="Creator" price={29.99} planId="creator" />
        </div>
      )}

      {/* Form + Progress side by side when generating */}
      <div className={`grid gap-6 ${isGenerating || isComplete ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
        <VideoGeneratorForm
          formData={formData}
          setFormData={setFormData}
          onGenerate={loadScripts}
          isGenerating={isLoadingScripts || isGenerating}
          minutesRemaining={credits.minutesRemaining}
        />

        {(isGenerating || isComplete) && (
          <div className="flex flex-col gap-6">
            <ProgressTracker currentStep={currentStep} isComplete={isComplete} />
            {isComplete && (
              <VideoPreview
                topic={formData.topic}
                length={formData.length}
                platform={formData.platform}
              />
            )}
          </div>
        )}
      </div>

      {/* Script Selection Step */}
      {isLoadingScripts && (
        <div className="flex flex-col items-center gap-4 py-10 animate-fade-in">
          <div className="w-10 h-10 border-2 border-cyan-accent/30 border-t-cyan-accent rounded-full animate-spin" />
          <p className="text-slate-400 text-sm">Generating 3 script variations for you...</p>
        </div>
      )}

      {isSelectingScript && scriptOptions && (
        <div className="flex flex-col gap-5 animate-slide-up">
          <div>
            <h2 className="font-syne font-bold text-2xl text-white mb-1">Choose Your Script</h2>
            <p className="text-slate-400 text-sm">Three AI-generated variations — pick the one that fits your style.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {scriptOptions.map((script) => (
              <ScriptCard key={script.id} script={script} onSelect={startGeneration} />
            ))}
          </div>
          <button
            onClick={resetGeneration}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors self-start"
          >
            ← Back to form
          </button>
        </div>
      )}

      {/* Results — shown after generation */}
      {isComplete && mockResults && (
        <>
          {/* Script Preview */}
          <div className="gradient-border rounded-2xl p-6 bg-bg-surface animate-slide-up">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-syne font-bold text-lg text-white">Generated Script</h3>
              {selectedScript && (
                <span className="text-xs px-2 py-1 rounded-full bg-cyan-accent/10 text-cyan-accent border border-cyan-accent/20">
                  {selectedScript.label}
                </span>
              )}
            </div>
            <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-dm bg-bg-primary rounded-xl p-4 border border-white/5 max-h-64 overflow-y-auto">
              {mockResults.script}
            </pre>
          </div>

          <ViralScoreSection viralScores={mockResults.viralScores} />

          <CaptionsSection captions={mockResults.captions} />

          {/* Video Editor */}
          <div className="pt-2">
            <VideoEditor videoDuration={videoDuration} />
          </div>
        </>
      )}
    </div>
  );
}
