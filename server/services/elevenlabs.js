const axios = require('axios');

const BASE_URL = 'https://api.elevenlabs.io/v1';

/**
 * Generate speech from text using ElevenLabs TTS.
 * Returns audio buffer.
 */
async function textToSpeech({ text, voiceId = 'EXAVITQu4vr4xnSDxMaL', modelId = 'eleven_monolingual_v1' }) {
  // Uncomment when ELEVENLABS_API_KEY is configured:
  //
  // const response = await axios.post(
  //   `${BASE_URL}/text-to-speech/${voiceId}`,
  //   {
  //     text,
  //     model_id: modelId,
  //     voice_settings: { stability: 0.5, similarity_boost: 0.75 },
  //   },
  //   {
  //     headers: {
  //       'xi-api-key': process.env.ELEVENLABS_API_KEY,
  //       'Content-Type': 'application/json',
  //       Accept: 'audio/mpeg',
  //     },
  //     responseType: 'arraybuffer',
  //   }
  // );
  // return response.data;

  throw new Error('ElevenLabs integration not configured. Set ELEVENLABS_API_KEY in .env');
}

/**
 * Clone a voice from an audio sample.
 * Returns the new voiceId.
 */
async function cloneVoice({ name, files }) {
  // Uncomment when ELEVENLABS_API_KEY is configured:
  //
  // const formData = new FormData();
  // formData.append('name', name);
  // files.forEach((f) => formData.append('files', f));
  //
  // const response = await axios.post(`${BASE_URL}/voices/add`, formData, {
  //   headers: {
  //     'xi-api-key': process.env.ELEVENLABS_API_KEY,
  //     ...formData.getHeaders(),
  //   },
  // });
  // return response.data.voice_id;

  throw new Error('ElevenLabs voice cloning not configured. Set ELEVENLABS_API_KEY in .env');
}

/**
 * List available voices.
 */
async function listVoices() {
  // const response = await axios.get(`${BASE_URL}/voices`, {
  //   headers: { 'xi-api-key': process.env.ELEVENLABS_API_KEY },
  // });
  // return response.data.voices;

  throw new Error('ElevenLabs integration not configured. Set ELEVENLABS_API_KEY in .env');
}

module.exports = { textToSpeech, cloneVoice, listVoices };
