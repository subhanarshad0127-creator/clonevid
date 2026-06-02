import React from 'react';
import { FileText, Mic2, User2, Film, Clapperboard, CheckCircle2 } from 'lucide-react';

const STEPS = [
  { icon: FileText, label: 'AI Script Generation', desc: 'Writing your optimized script with GPT-4' },
  { icon: Mic2, label: 'Voice Cloning', desc: 'Synthesizing natural-sounding narration' },
  { icon: User2, label: 'Avatar Generation', desc: 'Rendering your photorealistic presenter' },
  { icon: Film, label: 'B-Roll Assembly', desc: 'Sourcing and editing supporting footage' },
  { icon: Clapperboard, label: 'Final Render', desc: 'Compositing and encoding your video' },
];

function StepRow({ step, index, currentStep, isComplete }) {
  const status =
    index < currentStep
      ? 'done'
      : index === currentStep
      ? 'active'
      : 'pending';

  const Icon = step.icon;

  return (
    <div className="flex gap-4 items-start">
      {/* Left: icon + connector */}
      <div className="flex flex-col items-center">
        <div
          className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-all duration-500 ${
            status === 'done'
              ? 'bg-cyan-accent/20 border border-cyan-accent/40'
              : status === 'active'
              ? 'bg-purple-accent/20 border border-purple-accent/40 animate-pulse-ring'
              : 'bg-bg-elevated border border-white/5'
          }`}
        >
          {status === 'done' ? (
            <CheckCircle2 size={20} className="text-cyan-accent" />
          ) : status === 'active' ? (
            <div className="w-5 h-5 border-2 border-purple-accent/40 border-t-purple-accent rounded-full animate-spin" />
          ) : (
            <Icon size={18} className="text-slate-600" />
          )}
        </div>
        {index < STEPS.length - 1 && (
          <div
            className={`w-0.5 flex-1 min-h-[28px] rounded-full transition-all duration-700 ${
              index < currentStep ? 'step-line-active' : 'step-line'
            }`}
          />
        )}
      </div>

      {/* Right: text */}
      <div className="pt-2 pb-4">
        <div
          className={`font-syne font-semibold text-sm transition-colors duration-300 ${
            status === 'done'
              ? 'text-cyan-accent'
              : status === 'active'
              ? 'text-white'
              : 'text-slate-600'
          }`}
        >
          {step.label}
          {status === 'done' && (
            <span className="ml-2 text-xs font-normal text-cyan-accent/60">Complete</span>
          )}
          {status === 'active' && (
            <span className="ml-2 text-xs font-normal text-purple-accent/60">Processing...</span>
          )}
        </div>
        <p
          className={`text-xs mt-0.5 transition-colors duration-300 ${
            status === 'active' ? 'text-slate-400' : 'text-slate-600'
          }`}
        >
          {step.desc}
        </p>
      </div>
    </div>
  );
}

export default function ProgressTracker({ currentStep, isComplete }) {
  const displayStep = isComplete ? 5 : currentStep;

  return (
    <div className="gradient-border rounded-2xl p-6 bg-bg-surface">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-syne font-bold text-lg text-white">Generation Progress</h3>
        <span className="text-xs text-slate-400 bg-bg-elevated px-3 py-1 rounded-full">
          {isComplete ? '5 / 5 complete' : `${currentStep} / 5 complete`}
        </span>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 bg-bg-primary rounded-full mb-6 overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-700"
          style={{
            width: `${(displayStep / 5) * 100}%`,
            background: 'linear-gradient(90deg, #00E5FF, #7B5CFF)',
          }}
        />
      </div>

      <div className="flex flex-col">
        {STEPS.map((step, i) => (
          <StepRow
            key={i}
            step={step}
            index={i}
            currentStep={displayStep}
            isComplete={isComplete}
          />
        ))}
      </div>

      {isComplete && (
        <div className="mt-4 p-3 rounded-xl bg-cyan-accent/10 border border-cyan-accent/20 flex items-center gap-2 animate-slide-up">
          <CheckCircle2 size={16} className="text-cyan-accent" />
          <span className="text-sm font-semibold text-cyan-accent">Video generated successfully!</span>
        </div>
      )}
    </div>
  );
}
