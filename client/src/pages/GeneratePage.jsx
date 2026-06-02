import React from 'react';
import VideoGeneratorForm from '../components/VideoGenerator/VideoGeneratorForm.jsx';
import ProgressTracker from '../components/VideoGenerator/ProgressTracker.jsx';
import VideoPreview from '../components/VideoGenerator/VideoPreview.jsx';
import ViralScoreSection from '../components/ViralScore/ViralScoreSection.jsx';
import CaptionsSection from '../components/Captions/CaptionsSection.jsx';
import { useVideoGeneration } from '../hooks/useVideoGeneration.js';

export default function GeneratePage() {
  const {
    formData,
    setFormData,
    generationStatus,
    currentStep,
    mockResults,
    startGeneration,
  } = useVideoGeneration();

  const isGenerating = generationStatus === 'generating';
  const isComplete = generationStatus === 'complete';

  return (
    <div className="max-w-5xl mx-auto px-6 py-8 flex flex-col gap-8">
      {/* Page Title */}
      <div>
        <h1 className="font-syne font-bold text-3xl text-white mb-1">Create New Video</h1>
        <p className="text-slate-400 text-sm">
          Fill in the details below and let AI handle the rest.
        </p>
      </div>

      {/* Form + Progress side by side when generating */}
      <div className={`grid gap-6 ${isGenerating || isComplete ? 'lg:grid-cols-2' : 'grid-cols-1 max-w-2xl'}`}>
        <VideoGeneratorForm
          formData={formData}
          setFormData={setFormData}
          onGenerate={startGeneration}
          isGenerating={isGenerating}
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

      {/* Results — shown after generation */}
      {isComplete && mockResults && (
        <>
          {/* Script Preview */}
          <div className="gradient-border rounded-2xl p-6 bg-bg-surface animate-slide-up">
            <h3 className="font-syne font-bold text-lg text-white mb-4">Generated Script</h3>
            <pre className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap font-dm bg-bg-primary rounded-xl p-4 border border-white/5 max-h-64 overflow-y-auto">
              {mockResults.script}
            </pre>
          </div>

          <ViralScoreSection viralScores={mockResults.viralScores} />

          <CaptionsSection captions={mockResults.captions} />
        </>
      )}
    </div>
  );
}
