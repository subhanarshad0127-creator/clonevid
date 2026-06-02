import React from 'react';
import { Link } from 'react-router-dom';
import {
  Zap,
  Mic2,
  User2,
  ArrowRight,
  Sparkles,
  FileText,
  Film,
  Share2,
  CheckCircle2,
  Star,
} from 'lucide-react';

const features = [
  {
    icon: FileText,
    color: '#00E5FF',
    title: 'AI Script Writing',
    desc: 'GPT-4 powered scripts tailored to your topic, style, and target platform — ready in seconds.',
  },
  {
    icon: Mic2,
    color: '#7B5CFF',
    title: 'Voice Cloning',
    desc: 'Clone any voice with ElevenLabs. Upload a 30-second sample and your AI will speak for you.',
  },
  {
    icon: User2,
    color: '#FF3CAC',
    title: 'AI Avatar',
    desc: 'HeyGen-powered photorealistic avatars. Choose from our library or create your digital twin.',
  },
];

const steps = [
  { icon: FileText, label: 'Enter your topic or idea', color: '#00E5FF' },
  { icon: Sparkles, label: 'AI writes your script', color: '#7B5CFF' },
  { icon: Mic2, label: 'Voice & avatar generated', color: '#FF3CAC' },
  { icon: Film, label: 'B-roll & music assembled', color: '#00E5FF' },
  { icon: Share2, label: 'Download & publish', color: '#7B5CFF' },
];

const plans = [
  {
    name: 'Starter',
    price: 19,
    credits: 10,
    features: [
      '10 videos / month',
      'AI Script Generation',
      'Basic Voice Options',
      'TikTok & Reels Export',
      'Viral Score Analysis',
    ],
    accent: '#00E5FF',
    popular: false,
  },
  {
    name: 'Creator',
    price: 49,
    credits: 30,
    features: [
      '30 videos / month',
      'AI Script Generation',
      'Voice Cloning',
      'AI Avatar (5 options)',
      'All Platform Export',
      'Auto B-Roll',
      'Caption Generator',
    ],
    accent: '#7B5CFF',
    popular: true,
  },
  {
    name: 'Pro',
    price: 99,
    credits: 100,
    features: [
      '100 videos / month',
      'AI Script Generation',
      'Unlimited Voice Cloning',
      'Custom AI Avatar',
      'All Platform Export',
      'Auto B-Roll & Music',
      'Priority Support',
      'API Access',
    ],
    accent: '#FF3CAC',
    popular: false,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-bg-primary bg-grid-pattern font-dm">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-btn flex items-center justify-center">
              <Zap size={18} className="text-white" />
            </div>
            <span className="font-syne font-bold text-lg gradient-text">CloneVid</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-sm text-slate-400">
            <a href="#features" className="hover:text-white transition-colors">Features</a>
            <a href="#how" className="hover:text-white transition-colors">How It Works</a>
            <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          </div>
          <Link
            to="/generate"
            className="gradient-btn px-5 py-2 rounded-lg text-sm font-semibold text-white shadow-lg flex items-center gap-2"
          >
            <Zap size={14} /> Get Started
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-24 px-6 text-center relative overflow-hidden">
        {/* Background glows */}
        <div className="absolute top-20 left-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #00E5FF, transparent)' }} />
        <div className="absolute top-20 right-1/4 w-96 h-96 rounded-full blur-3xl opacity-10"
          style={{ background: 'radial-gradient(circle, #7B5CFF, transparent)' }} />

        <div className="max-w-4xl mx-auto relative">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-accent/10 border border-cyan-accent/20 text-cyan-accent text-xs font-semibold mb-6 animate-fade-in">
            <Sparkles size={12} />
            AI-Powered Video Generation
          </div>

          <h1 className="font-syne font-bold text-5xl md:text-7xl leading-tight mb-6 animate-slide-up">
            Turn Any Topic Into a{' '}
            <span className="gradient-text">Viral Video</span>{' '}
            in Minutes
          </h1>

          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-slide-up">
            CloneVid uses cutting-edge AI to write your script, clone your voice, generate your
            avatar, and assemble a publish-ready short video — automatically.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
            <Link
              to="/generate"
              className="gradient-btn px-8 py-4 rounded-xl text-base font-bold text-white shadow-2xl flex items-center gap-3 justify-center"
            >
              <Zap size={18} />
              Start Creating Free
              <ArrowRight size={16} />
            </Link>
            <button className="px-8 py-4 rounded-xl text-base font-semibold text-slate-300 border border-white/10 hover:border-white/20 hover:bg-white/5 transition-all flex items-center gap-2 justify-center">
              <Film size={16} />
              Watch Demo
            </button>
          </div>

          {/* Social proof */}
          <div className="flex items-center justify-center gap-8 mt-14 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} size={12} className="text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span>4.9 / 5</span>
            </div>
            <span>•</span>
            <span>12,000+ videos created</span>
            <span>•</span>
            <span>3,500+ creators</span>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-4xl md:text-5xl mb-4">
              Everything You Need to{' '}
              <span className="gradient-text">Go Viral</span>
            </h2>
            <p className="text-slate-400 text-lg max-w-xl mx-auto">
              Three powerful AI engines working together to create scroll-stopping content.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div
                key={i}
                className="gradient-border p-6 rounded-2xl hover:scale-105 transition-transform duration-300 group"
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: `${f.color}18`, border: `1px solid ${f.color}33` }}
                >
                  <f.icon size={22} style={{ color: f.color }} />
                </div>
                <h3 className="font-syne font-bold text-lg text-white mb-2">{f.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" className="py-20 px-6 bg-bg-surface/30">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-4xl md:text-5xl mb-4">
              From <span className="gradient-text">Idea to Video</span> in 5 Steps
            </h2>
            <p className="text-slate-400 text-lg">
              Our AI pipeline handles everything — you just provide the idea.
            </p>
          </div>

          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 top-0 bottom-0 w-px step-line hidden md:block" />

            <div className="flex flex-col gap-6">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-6 items-start group">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 z-10 transition-transform group-hover:scale-110"
                    style={{
                      background: `${step.color}18`,
                      border: `2px solid ${step.color}44`,
                    }}
                  >
                    <step.icon size={24} style={{ color: step.color }} />
                  </div>
                  <div className="pt-3">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-1">
                      Step {i + 1}
                    </div>
                    <h3 className="font-syne font-bold text-lg text-white">{step.label}</h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-syne font-bold text-4xl md:text-5xl mb-4">
              Simple, <span className="gradient-text">Transparent</span> Pricing
            </h2>
            <p className="text-slate-400 text-lg">No hidden fees. Cancel anytime.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {plans.map((plan, i) => (
              <div
                key={i}
                className={`relative rounded-2xl p-6 flex flex-col ${
                  plan.popular
                    ? 'bg-bg-elevated border-2'
                    : 'bg-bg-surface border border-white/5'
                }`}
                style={plan.popular ? { borderColor: plan.accent } : {}}
              >
                {plan.popular && (
                  <div
                    className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-white"
                    style={{ background: plan.accent }}
                  >
                    Most Popular
                  </div>
                )}

                <div>
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
                    style={{ background: `${plan.accent}18`, border: `1px solid ${plan.accent}33` }}
                  >
                    <Zap size={18} style={{ color: plan.accent }} />
                  </div>
                  <h3 className="font-syne font-bold text-xl text-white mb-1">{plan.name}</h3>
                  <div className="flex items-end gap-1 mb-6">
                    <span className="text-4xl font-bold text-white">${plan.price}</span>
                    <span className="text-slate-400 mb-1">/month</span>
                  </div>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((feat, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-300">
                      <CheckCircle2 size={14} style={{ color: plan.accent }} className="shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>

                <Link
                  to="/generate"
                  className="w-full py-3 rounded-xl text-sm font-bold text-center transition-all"
                  style={
                    plan.popular
                      ? {
                          background: plan.accent,
                          color: '#080C14',
                        }
                      : {
                          border: `1px solid ${plan.accent}44`,
                          color: plan.accent,
                        }
                  }
                >
                  Get Started
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 rounded-full blur-3xl opacity-10"
            style={{ background: 'radial-gradient(circle, #7B5CFF, transparent)' }} />
        </div>
        <div className="max-w-2xl mx-auto text-center relative">
          <h2 className="font-syne font-bold text-4xl md:text-5xl mb-6">
            Ready to <span className="gradient-text">Go Viral?</span>
          </h2>
          <p className="text-slate-400 text-lg mb-8">
            Join 3,500+ creators already using CloneVid to grow their audience.
          </p>
          <Link
            to="/generate"
            className="gradient-btn inline-flex px-10 py-4 rounded-xl text-base font-bold text-white shadow-2xl items-center gap-3"
          >
            <Zap size={18} />
            Create Your First Video Free
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-6 border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md gradient-btn flex items-center justify-center">
              <Zap size={12} className="text-white" />
            </div>
            <span className="font-syne font-bold text-sm gradient-text">CloneVid</span>
          </div>
          <p className="text-slate-500 text-xs">© 2026 CloneVid. All rights reserved.</p>
          <div className="flex gap-4 text-xs text-slate-500">
            <a href="#" className="hover:text-white transition-colors">Privacy</a>
            <a href="#" className="hover:text-white transition-colors">Terms</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
