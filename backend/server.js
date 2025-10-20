const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const analyzeRoutes = require('./routes/analyze');
const doctorsRoutes = require('./routes/doctors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', analyzeRoutes);
app.use('/api', doctorsRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy', 
    message: 'TbibVision API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to TbibVision Medical AI API',
    version: '1.0.0',
    endpoints: {
      health: 'GET /health',
      analyzeLab: 'POST /api/analyze-lab',
      analyzeSkin: 'POST /api/analyze-skin',
      saveAnalysis: 'POST /api/save-analysis',
      doctors: 'GET /api/doctors'
    }
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Server error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: err.message
  });
});

// Start server - Listen on all network interfaces (0.0.0.0)
// Only start server if not in serverless environment (Vercel)
if (!process.env.VERCEL) {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🏥 TbibVision API Server running on port ${PORT}`);
    console.log(`📍 Local: http://localhost:${PORT}`);
    console.log(`📍 Network: http://192.168.110.187:${PORT}`);
    console.log(`✅ Health check: http://192.168.110.187:${PORT}/health`);
  });
}

// Export for Vercel serverless deployment
module.exports = app;

