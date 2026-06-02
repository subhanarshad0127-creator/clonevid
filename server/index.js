require('dotenv').config();
const express = require('express');
const cors = require('cors');

const generateRoutes = require('./routes/generate');
const viralRoutes = require('./routes/viral');
const captionsRoutes = require('./routes/captions');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:3000'] }));
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// Routes
app.use('/api/generate', generateRoutes);
app.use('/api/viral-score', viralRoutes);
app.use('/api/captions', captionsRoutes);

// 404
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('[Error]', err.message);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`CloneVid server running on http://localhost:${PORT}`);
});
