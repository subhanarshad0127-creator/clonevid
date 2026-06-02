const axios = require('axios');

const BASE_URL = 'https://api.heygen.com/v2';

/**
 * Create an avatar video using HeyGen.
 * Returns a video URL when complete.
 */
async function createAvatarVideo({ script, avatarId, voiceId, backgroundId }) {
  // Uncomment when HEYGEN_API_KEY is configured:
  //
  // const response = await axios.post(
  //   `${BASE_URL}/video/generate`,
  //   {
  //     video_inputs: [
  //       {
  //         character: {
  //           type: 'avatar',
  //           avatar_id: avatarId || 'Kristin_public_3_20240108',
  //           avatar_style: 'normal',
  //         },
  //         voice: {
  //           type: 'text',
  //           input_text: script,
  //           voice_id: voiceId || '2d5b0e6cf36f460aa7fc47e3eee4ba54',
  //         },
  //         background: {
  //           type: 'color',
  //           value: '#080C14',
  //         },
  //       },
  //     ],
  //     dimension: { width: 1080, height: 1920 },
  //   },
  //   {
  //     headers: {
  //       'X-Api-Key': process.env.HEYGEN_API_KEY,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // return response.data.data.video_id;

  throw new Error('HeyGen integration not configured. Set HEYGEN_API_KEY in .env');
}

/**
 * Poll for video completion status.
 */
async function getVideoStatus(videoId) {
  // const response = await axios.get(`${BASE_URL}/video/${videoId}`, {
  //   headers: { 'X-Api-Key': process.env.HEYGEN_API_KEY },
  // });
  // return response.data.data;

  throw new Error('HeyGen integration not configured. Set HEYGEN_API_KEY in .env');
}

/**
 * List available avatars.
 */
async function listAvatars() {
  // const response = await axios.get(`${BASE_URL}/avatars`, {
  //   headers: { 'X-Api-Key': process.env.HEYGEN_API_KEY },
  // });
  // return response.data.data.avatars;

  throw new Error('HeyGen integration not configured. Set HEYGEN_API_KEY in .env');
}

module.exports = { createAvatarVideo, getVideoStatus, listAvatars };
