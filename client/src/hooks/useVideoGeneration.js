import { useState, useCallback } from 'react';

const STEP_DELAYS = [2000, 2000, 2500, 2000, 1500];

function buildMockResults(topic) {
  const topicTitle = topic || 'How to Build Good Habits';

  return {
    script: `[HOOK - 0:00-0:05]
Did you know that 92% of people fail to achieve their goals? But the ones who succeed all share one secret. Here's what top performers know about "${topicTitle}" that nobody talks about.

[MAIN CONTENT - 0:05-0:45]
First — consistency beats intensity every single time. You don't need three-hour deep work sessions. You need 20 focused minutes done daily. The compound effect is real: small actions repeated daily create massive results over months.

Second — your environment shapes your behavior more than your willpower. Want to apply this to ${topicTitle}? Redesign your space so the right choice is the easy choice. Remove friction. Add visual cues.

Third — track your progress publicly. Accountability accelerates everything. Share your journey, find your tribe, and let social pressure work FOR you instead of against you.

The bottom line: ${topicTitle} is not about talent or luck. It's about systems over goals, environment design, and showing up consistently — even when you don't feel like it.

[OUTRO - 0:45-1:00]
If this helped you, follow for more insights. Drop a comment with your biggest takeaway. See you in the next one.`,

    viralScores: {
      tiktok: {
        score: 87,
        verdict: 'High Potential',
        color: '#FF0050',
        factors: [
          { label: 'Hook Strength', score: 92 },
          { label: 'Retention Pattern', score: 85 },
          { label: 'Trending Keywords', score: 88 },
          { label: 'CTA Effectiveness', score: 82 },
        ],
      },
      instagram: {
        score: 74,
        verdict: 'Good Potential',
        color: '#833AB4',
        factors: [
          { label: 'Visual Appeal', score: 78 },
          { label: 'Caption Quality', score: 72 },
          { label: 'Hashtag Relevance', score: 75 },
          { label: 'Engagement Triggers', score: 70 },
        ],
      },
      youtube: {
        score: 82,
        verdict: 'Strong Performance',
        color: '#FF0000',
        factors: [
          { label: 'SEO Optimization', score: 89 },
          { label: 'Thumbnail CTR', score: 78 },
          { label: 'Watch Time Pattern', score: 84 },
          { label: 'Keyword Density', score: 77 },
        ],
      },
    },

    captions: {
      tiktok: {
        variants: [
          `92% of people FAIL at ${topicTitle} because they don't know this 👇 #fyp #viral #${topicTitle.replace(/\s+/g, '').toLowerCase()}`,
          `The secret top 1% use for ${topicTitle} (nobody talks about this) 🔥 Save this before it's gone`,
          `I wish someone told me this about ${topicTitle} earlier... Part 1 of 3 👆`,
        ],
        hashtags: [
          '#fyp', '#foryou', '#viral', '#trending', '#learnontiktok',
          '#selfdevelopment', '#mindset', '#productivity', '#success', '#motivation',
          '#lifehacks', '#growth', '#tips', '#howto', '#creator',
        ],
        bestTime: 'Tuesday–Thursday, 7–9 PM EST',
        trendingSound: 'Aesthetic Lo-fi Study Beats',
      },
      instagram: {
        caption: `✨ The truth about ${topicTitle} that nobody is talking about.\n\nMost people overcomplicate it. Here's what actually works:\n\n→ Consistency > Intensity\n→ Environment > Willpower\n→ Systems > Goals\n\nSave this post and share it with someone who needs to hear it 💬\n\n#instagram #reels #viral`,
        hashtags: [
          '#instagram', '#reels', '#viral', '#explore', '#motivation',
          '#success', '#mindset', '#productivity', '#lifestyle', '#creator',
          '#instagood', '#content', '#growth', '#tips', '#knowledge',
        ],
        storyText: `Swipe up for the FULL breakdown on ${topicTitle} 👆`,
        reelDescription: `Everything you need to know about ${topicTitle} in 60 seconds. Drop a ❤️ if this helped!`,
      },
      youtube: {
        titles: [
          `The TRUTH About ${topicTitle} Nobody Tells You (2025)`,
          `I Tried ${topicTitle} For 30 Days — Here's What Happened`,
          `${topicTitle}: Complete Guide For Beginners (Step-by-Step)`,
        ],
        description: `In this video, I break down everything you need to know about ${topicTitle}.\n\nWhether you're just starting out or looking to level up, this guide covers:\n✅ The biggest mistakes people make\n✅ Proven strategies that actually work\n✅ Step-by-step action plan\n\n⏱️ TIMESTAMPS:\n0:00 - Introduction\n0:05 - The #1 Mistake\n0:20 - Strategy Breakdown\n0:45 - Action Plan\n0:55 - Wrap Up\n\n👍 Like and subscribe for weekly content!\n📩 Questions? Comment below.\n\n#${topicTitle.replace(/\s+/g, '')} #YouTube #Shorts`,
        tags: [
          topicTitle,
          `${topicTitle} tips`,
          `${topicTitle} guide`,
          'how to',
          'tutorial',
          'beginners guide',
          'productivity',
          'self improvement',
          '2025',
          'youtube shorts',
        ],
        thumbnailText: `"${topicTitle.toUpperCase()}" with neon yellow text on dark background, shocked face reaction`,
      },
    },
  };
}

export function useVideoGeneration() {
  const [formData, setFormData] = useState({
    topic: '',
    style: 'Educational',
    length: '60s',
    platform: 'TikTok',
    voiceCloning: false,
    aiAvatar: false,
    autoBRoll: true,
  });

  const [generationStatus, setGenerationStatus] = useState('idle'); // idle | generating | complete
  const [currentStep, setCurrentStep] = useState(0);
  const [mockResults, setMockResults] = useState(null);

  const startGeneration = useCallback(() => {
    if (!formData.topic.trim()) return;

    setGenerationStatus('generating');
    setCurrentStep(0);
    setMockResults(null);

    let step = 0;

    function advanceStep() {
      step += 1;
      setCurrentStep(step);

      if (step < 5) {
        setTimeout(advanceStep, STEP_DELAYS[step]);
      } else {
        // All steps done
        setTimeout(() => {
          setMockResults(buildMockResults(formData.topic));
          setGenerationStatus('complete');
        }, 800);
      }
    }

    setTimeout(advanceStep, STEP_DELAYS[0]);
  }, [formData.topic]);

  const resetGeneration = useCallback(() => {
    setGenerationStatus('idle');
    setCurrentStep(0);
    setMockResults(null);
  }, []);

  return {
    formData,
    setFormData,
    generationStatus,
    currentStep,
    mockResults,
    startGeneration,
    resetGeneration,
  };
}
