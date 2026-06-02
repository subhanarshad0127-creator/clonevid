const express = require('express');
const router = express.Router();

// const OpenAI = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// D-ID service (replaces HeyGen)
// const { createTalk, getTalkStatus } = require('../services/did');

/**
 * POST /api/generate/scripts
 * Body: { topic, style, length, platform }
 * Returns: { scripts: [{ id, label, hook, body, wordCount }] }
 */
router.post('/scripts', async (req, res) => {
  try {
    const { topic, style = 'Educational', length = '60s', platform = 'TikTok' } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // --- Real OpenAI integration (uncomment when API key is set) ---
    // const generateVariant = async (variantStyle, instructions) => {
    //   const completion = await openai.chat.completions.create({
    //     model: 'gpt-4-turbo-preview',
    //     messages: [
    //       { role: 'system', content: `You are an expert short-form video scriptwriter. ${instructions}` },
    //       { role: 'user', content: `Write a ${variantStyle} script about: "${topic}" for ${platform}. Length: ${length}.` },
    //     ],
    //     temperature: 0.85,
    //     max_tokens: 600,
    //   });
    //   return completion.choices[0].message.content;
    // };

    const scripts = buildMockScriptVariants(topic, style, length, platform);

    res.json({ success: true, scripts });
  } catch (err) {
    console.error('[generate/scripts] Error:', err.message);
    res.status(500).json({ error: 'Script generation failed', details: err.message });
  }
});

/**
 * POST /api/generate
 * Body: { topic, style, length, platform, voiceCloning, aiAvatar, autoBRoll, selectedScript }
 * Returns: { script, jobId, estimatedTime, subtitles }
 */
router.post('/', async (req, res) => {
  try {
    const {
      topic,
      style = 'Educational',
      length = '60s',
      platform = 'TikTok',
      selectedScript,
    } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // Use the selected script body if provided, otherwise build a mock script
    const script = selectedScript
      ? `${selectedScript.hook}\n\n${selectedScript.body}`
      : buildMockScript(topic, style, length, platform);

    // Generate subtitles from the script text (~3-second chunks)
    const subtitles = generateSubtitles(script, length);

    res.json({
      success: true,
      jobId: `job_${Date.now()}`,
      topic,
      style,
      length,
      platform,
      script,
      estimatedTime: 10000,
      subtitles,
    });
  } catch (err) {
    console.error('[generate] Error:', err.message);
    res.status(500).json({ error: 'Script generation failed', details: err.message });
  }
});

// ─── Helper functions ────────────────────────────────────────────────────────

function generateSubtitles(scriptText, length) {
  // Split script into sentences, then chunk into ~3-second segments
  const lengthSeconds = { '30s': 30, '60s': 60, '2min': 120, '3min': 180 };
  const totalSeconds = lengthSeconds[length] || 60;

  // Clean the script text — remove stage directions like [HOOK - 0:00-0:05]
  const cleanText = scriptText
    .replace(/\[.*?\]/g, '')
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  // Split into sentences
  const sentences = cleanText
    .split(/(?<=[.!?])\s+/)
    .filter((s) => s.trim().length > 2);

  const chunkDuration = 3; // seconds per subtitle chunk
  const numChunks = Math.ceil(totalSeconds / chunkDuration);

  const subtitles = [];
  let sentenceIndex = 0;

  for (let i = 0; i < numChunks; i++) {
    const start = i * chunkDuration;
    const end = Math.min(start + chunkDuration, totalSeconds);
    const text = sentences[sentenceIndex % sentences.length] || '...';
    sentenceIndex++;

    subtitles.push({ start, end, text: text.trim() });
  }

  return subtitles;
}

function buildMockScriptVariants(topic, style, length, platform) {
  const lengths = { '30s': 75, '60s': 150, '2min': 300, '3min': 450 };
  const wordCount = lengths[length] || 150;

  return [
    {
      id: 'hook-first',
      label: 'Hook-First',
      hook: `Did you know that 92% of people never discover the real truth about "${topic}"? Here's what changes everything — and it takes less than 60 seconds to understand.`,
      body: `Most people approach ${topic} the wrong way. They focus on tactics when they should be focusing on fundamentals.

Here's the framework that top performers use:

First — master the basics before anything else. Foundations matter more than advanced techniques.

Second — consistency beats intensity. Show up every single day, even when it's hard.

Third — measure what matters. Track your progress and double down on what works.

The result? People who apply this see results 3x faster than those who don't.

Follow for more insights like this. Drop a comment with your biggest takeaway.`,
      wordCount: Math.round(wordCount * 0.95),
    },
    {
      id: 'story-driven',
      label: 'Story-Driven',
      hook: `Six months ago, I was completely lost when it came to ${topic}. I tried everything. Nothing worked. Then one small shift changed absolutely everything.`,
      body: `Let me take you back to where I started. I was overwhelmed, confused, and ready to quit. Sound familiar?

Then I met someone who had cracked the code on ${topic}. They shared a simple three-step process that I wish someone had told me years earlier.

Step one: understand your starting point. Don't skip this. Most people jump to execution before they know where they stand.

Step two: build momentum with small wins. Every big result starts with tiny, consistent actions compounding over time.

Step three: stay in the game long enough to see results. The biggest mistake is quitting right before the breakthrough.

This changed everything for me. It can for you too.`,
      wordCount: Math.round(wordCount * 1.05),
    },
    {
      id: 'list-format',
      label: 'List Format',
      hook: `${topic} in 2026: here are the 5 things you need to know right now. Number 3 is going to surprise you.`,
      body: `Number 1: Start with the fundamentals. Before you dive into advanced strategies, make sure your foundation is airtight.

Number 2: Consistency beats intensity every time. Doing something small every day beats sporadic bursts of effort.

Number 3: Your environment shapes your behavior more than your mindset does. Design your surroundings to make the right choice automatic.

Number 4: Track your progress publicly. Accountability accelerates results by 2-3x according to research.

Number 5: Invest in learning from people who are where you want to be. Proximity is power.

Save this post. Share it with someone who needs it. See you in the next one.`,
      wordCount: Math.round(wordCount * 1.0),
    },
  ];
}

function buildMockScript(topic, style, length, platform) {
  return `[HOOK - 0:00-0:05]
Did you know that 92% of people never discover the real truth about "${topic}"? Here's what changes everything.

[MAIN CONTENT - 0:05-0:${length === '30s' ? '25' : '45'}]
Here's the ${style.toLowerCase()} breakdown of ${topic}:

First — the fundamentals matter more than tactics. Before diving into advanced strategies, make sure your foundation is solid. Most people skip this step.

Second — consistency is your superpower. Whether you're dealing with ${topic} or anything else in life, showing up daily compounds faster than any shortcut.

Third — your environment shapes your outcome. Design your setup to make the right behavior the easy behavior.

The data backs this up: people who implement these three principles consistently see 3x better results within 30 days.

[OUTRO - 0:${length === '30s' ? '25' : '45'}-0:${length === '30s' ? '30' : '60'}]
If this helped, follow for more ${style.toLowerCase()} content. Drop a comment with your biggest takeaway — see you in the next one.`;
}

module.exports = router;
