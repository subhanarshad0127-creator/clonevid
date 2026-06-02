const express = require('express');
const router = express.Router();

/**
 * POST /api/viral-score
 * Body: { topic, script, platform }
 * Returns: { scores: { tiktok, instagram, youtube } }
 */
router.post('/', async (req, res) => {
  try {
    const { topic, script, platform } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // --- Real scoring logic placeholder ---
    // In production, this would analyze the script using NLP, check trending topics,
    // compare against historical viral content, etc.
    // Could integrate: YouTube Data API for trend data, TikTok API, etc.
    // ---

    // Deterministic mock scores with slight variation based on topic length
    const seed = topic.length % 20;

    const scores = {
      tiktok: {
        score: 80 + seed % 15,
        verdict: 'High Potential',
        color: '#FF0050',
        factors: [
          { label: 'Hook Strength', score: 85 + (seed % 10) },
          { label: 'Retention Pattern', score: 78 + (seed % 12) },
          { label: 'Trending Keywords', score: 82 + (seed % 8) },
          { label: 'CTA Effectiveness', score: 75 + (seed % 15) },
        ],
      },
      instagram: {
        score: 68 + seed % 15,
        verdict: 'Good Potential',
        color: '#833AB4',
        factors: [
          { label: 'Visual Appeal', score: 72 + (seed % 12) },
          { label: 'Caption Quality', score: 65 + (seed % 15) },
          { label: 'Hashtag Relevance', score: 70 + (seed % 10) },
          { label: 'Engagement Triggers', score: 63 + (seed % 18) },
        ],
      },
      youtube: {
        score: 75 + seed % 15,
        verdict: 'Strong Performance',
        color: '#FF0000',
        factors: [
          { label: 'SEO Optimization', score: 83 + (seed % 10) },
          { label: 'Thumbnail CTR', score: 72 + (seed % 12) },
          { label: 'Watch Time Pattern', score: 78 + (seed % 10) },
          { label: 'Keyword Density', score: 70 + (seed % 14) },
        ],
      },
    };

    // Cap all scores at 98
    for (const platform of Object.values(scores)) {
      platform.score = Math.min(platform.score, 98);
      platform.factors = platform.factors.map((f) => ({
        ...f,
        score: Math.min(f.score, 98),
      }));
    }

    res.json({ success: true, topic, scores });
  } catch (err) {
    console.error('[viral-score] Error:', err.message);
    res.status(500).json({ error: 'Viral score calculation failed', details: err.message });
  }
});

module.exports = router;
