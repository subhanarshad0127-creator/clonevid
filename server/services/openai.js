// const OpenAI = require('openai');

// const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Generate a video script using GPT-4.
 */
async function generateScript({ topic, style, length, platform }) {
  // Uncomment when OPENAI_API_KEY is configured:
  //
  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-4-turbo-preview',
  //   messages: [
  //     {
  //       role: 'system',
  //       content: [
  //         `You are an expert short-form video scriptwriter specializing in viral content.`,
  //         `Write a ${style} script optimized for ${platform}.`,
  //         `Target duration: ${length}.`,
  //         `Include: strong hook, 3 key points, clear CTA.`,
  //         `Format with timestamps (e.g., [HOOK 0:00-0:05]).`,
  //       ].join(' '),
  //     },
  //     { role: 'user', content: `Topic: "${topic}"` },
  //   ],
  //   temperature: 0.8,
  //   max_tokens: 800,
  // });
  // return completion.choices[0].message.content;

  throw new Error('OpenAI integration not configured. Set OPENAI_API_KEY in .env');
}

/**
 * Generate platform captions using GPT-4.
 */
async function generateCaptions({ topic, script, platform }) {
  // Uncomment when OPENAI_API_KEY is configured:
  //
  // const completion = await openai.chat.completions.create({
  //   model: 'gpt-4-turbo-preview',
  //   messages: [
  //     {
  //       role: 'system',
  //       content: `You are a social media expert. Generate engaging ${platform} captions and hashtags for this video.`,
  //     },
  //     {
  //       role: 'user',
  //       content: `Topic: "${topic}"\n\nScript:\n${script}\n\nGenerate 3 caption variants + 15 hashtags for ${platform}.`,
  //     },
  //   ],
  //   temperature: 0.9,
  //   max_tokens: 600,
  // });
  // return completion.choices[0].message.content;

  throw new Error('OpenAI integration not configured. Set OPENAI_API_KEY in .env');
}

module.exports = { generateScript, generateCaptions };
