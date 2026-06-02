const express = require('express');
const router = express.Router();

// const OpenAI = require('openai');
// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * POST /api/generate
 * Body: { topic, style, length, platform, voiceCloning, aiAvatar, autoBRoll }
 * Returns: { script, jobId, estimatedTime }
 */
router.post('/', async (req, res) => {
  try {
    const { topic, style = 'Educational', length = '60s', platform = 'TikTok' } = req.body;

    if (!topic || !topic.trim()) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // --- Real OpenAI integration (uncomment when API key is set) ---
    // const completion = await openai.chat.completions.create({
    //   model: 'gpt-4-turbo-preview',
    //   messages: [
    //     {
    //       role: 'system',
    //       content: `You are an expert short-form video scriptwriter. Write engaging ${style} scripts optimized for ${platform}. The video length is ${length}.`,
    //     },
    //     {
    //       role: 'user',
    //       content: `Write a viral ${style.toLowerCase()} script about: "${topic}". Include a strong hook, main content with 3 key points, and a CTA outro. Format with timestamps.`,
    //     },
    //   ],
    //   temperature: 0.8,
    //   max_tokens: 800,
    // });
    // const script = completion.choices[0].message.content;
    // ---

    // Mock script generation
    const script = buildMockScript(topic, style, length, platform);

    res.json({
      success: true,
      jobId: `job_${Date.now()}`,
      topic,
      style,
      length,
      platform,
      script,
      estimatedTime: 10000,
    });
  } catch (err) {
    console.error('[generate] Error:', err.message);
    res.status(500).json({ error: 'Script generation failed', details: err.message });
  }
});

function buildMockScript(topic, style, length, platform) {
  const lengths = { '30s': 75, '60s': 150, '2min': 300, '3min': 450 };
  const wordCount = lengths[length] || 150;

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
