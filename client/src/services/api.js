import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
});

export async function generateVideo(payload) {
  const { data } = await api.post('/generate', payload);
  return data;
}

export async function getViralScore(payload) {
  const { data } = await api.post('/viral-score', payload);
  return data;
}

export async function getCaptions(payload) {
  const { data } = await api.post('/captions', payload);
  return data;
}

export default api;
