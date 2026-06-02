const express = require('express');
const router = express.Router();

/**
 * POST /api/captions
 * Body: { topic, script, platform }
 * Returns: { captions: { tiktok, instagram, youtube } }
 */
router.post('/', async (req, res) => {
  try {
    const { topic, script } = req.body;

    if (!topic) {
      return res.status(400).json({ error: 'Topic is required' });
    }

    // --- Real integration placeholder ---
    // In production: use OpenAI to generate platform-specific captions,
    // YouTube Data API v3 to fetch trending hashtags, etc.
    // const youtubeHashtags = await fetchTrendingHashtags(topic);
    // ---

    const slug = topic.replace(/\s+/g, '').toLowerCase().slice(0, 20);

    const captions = {
      tiktok: {
        variants: [
          `92% of people FAIL at ${topic} because they don't know this 👇 #fyp #viral #${slug}`,
          `The secret top 1% use for ${topic} (nobody talks about this) 🔥 Save this before it's gone`,
          `I wish someone told me this about ${topic} earlier... Part 1 of 3 👆`,
        ],
        hashtags: [
          '#fyp', '#foryou', '#viral', '#trending', '#learnontiktok',
          '#selfdevelopment', '#mindset', '#productivity', '#success', '#motivation',
          '#lifehacks', '#growth', '#tips', '#howto', `#${slug}`,
        ],
        bestTime: 'Tuesday–Thursday, 7–9 PM EST',
        trendingSound: 'Aesthetic Lo-fi Study Beats',
      },
      instagram: {
        caption: `✨ The truth about ${topic} that nobody is talking about.\n\nMost people overcomplicate it. Here's what actually works:\n\n→ Consistency > Intensity\n→ Environment > Willpower\n→ Systems > Goals\n\nSave this post and share it with someone who needs to hear it 💬\n\n#instagram #reels #viral`,
        hashtags: [
          '#instagram', '#reels', '#viral', '#explore', '#motivation',
          '#success', '#mindset', '#productivity', '#lifestyle', '#creator',
          '#instagood', '#content', '#growth', '#tips', `#${slug}`,
        ],
        storyText: `Swipe up for the FULL breakdown on ${topic} 👆`,
        reelDescription: `Everything you need to know about ${topic} in 60 seconds. Drop a ❤️ if this helped!`,
      },
      youtube: {
        titles: [
          `The TRUTH About ${topic} Nobody Tells You (2025)`,
          `I Tried ${topic} For 30 Days — Here's What Happened`,
          `${topic}: Complete Guide For Beginners (Step-by-Step)`,
        ],
        description: `In this video, I break down everything you need to know about ${topic}.\n\nWhether you're just starting out or looking to level up, this guide covers:\n✅ The biggest mistakes people make\n✅ Proven strategies that actually work\n✅ Step-by-step action plan\n\n⏱️ TIMESTAMPS:\n0:00 - Introduction\n0:05 - The #1 Mistake\n0:20 - Strategy Breakdown\n0:45 - Action Plan\n0:55 - Wrap Up\n\n👍 Like and subscribe for weekly content!\n📩 Questions? Comment below.\n\n#${slug} #YouTube #Shorts`,
        tags: [
          topic,
          `${topic} tips`,
          `${topic} guide`,
          'how to',
          'tutorial',
          'beginners guide',
          'productivity',
          'self improvement',
          '2025',
          'youtube shorts',
        ],
        thumbnailText: `"${topic.toUpperCase()}" with neon yellow text on dark background, shocked face reaction`,
      },
    };

    res.json({ success: true, topic, captions });
  } catch (err) {
    console.error('[captions] Error:', err.message);
    res.status(500).json({ error: 'Caption generation failed', details: err.message });
  }
});

module.exports = router;
