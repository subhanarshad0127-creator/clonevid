const axios = require('axios');

const BASE_URL = 'https://api.d-id.com';

/**
 * Create a talk (avatar video) using D-ID.
 * Returns a talk ID when the job is queued.
 */
async function createTalk({ script, sourceUrl, voiceId }) {
  // Uncomment when DID_API_KEY is configured:
  //
  // const response = await axios.post(
  //   `${BASE_URL}/talks`,
  //   {
  //     source_url: sourceUrl || 'https://d-id-public-bucket.s3.amazonaws.com/alice.jpg',
  //     script: {
  //       type: 'text',
  //       input: script,
  //       provider: {
  //         type: 'microsoft',
  //         voice_id: voiceId || 'en-US-JennyNeural',
  //       },
  //     },
  //     config: {
  //       fluent: true,
  //       pad_audio: 0.0,
  //     },
  //   },
  //   {
  //     headers: {
  //       Authorization: `Basic ${Buffer.from(process.env.DID_API_KEY + ':').toString('base64')}`,
  //       'Content-Type': 'application/json',
  //     },
  //   }
  // );
  // return response.data.id;

  throw new Error('D-ID integration not configured. Set DID_API_KEY in .env');
}

/**
 * Poll for talk completion status.
 * Returns { status, result_url } when done.
 */
async function getTalkStatus(talkId) {
  // const response = await axios.get(`${BASE_URL}/talks/${talkId}`, {
  //   headers: {
  //     Authorization: `Basic ${Buffer.from(process.env.DID_API_KEY + ':').toString('base64')}`,
  //   },
  // });
  // return response.data;

  throw new Error('D-ID integration not configured. Set DID_API_KEY in .env');
}

/**
 * List available stock presenters from D-ID.
 */
async function listPresenters() {
  // const response = await axios.get(`${BASE_URL}/presenters`, {
  //   headers: {
  //     Authorization: `Basic ${Buffer.from(process.env.DID_API_KEY + ':').toString('base64')}`,
  //   },
  // });
  // return response.data.presenters;

  // Mock stock avatars for UI display
  return [
    { id: 'alex', name: 'Alex', color: '#00E5FF', gradient: 'from-cyan-500 to-blue-600' },
    { id: 'maya', name: 'Maya', color: '#7B5CFF', gradient: 'from-violet-500 to-purple-700' },
    { id: 'jordan', name: 'Jordan', color: '#FF3CAC', gradient: 'from-pink-500 to-rose-600' },
    { id: 'sam', name: 'Sam', color: '#F59E0B', gradient: 'from-amber-400 to-orange-500' },
    { id: 'riley', name: 'Riley', color: '#10B981', gradient: 'from-emerald-400 to-teal-600' },
    { id: 'taylor', name: 'Taylor', color: '#EF4444', gradient: 'from-red-400 to-rose-700' },
  ];
}

module.exports = { createTalk, getTalkStatus, listPresenters };
