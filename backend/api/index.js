// Vercel serverless function entry point
// Load environment variables first
require('dotenv').config({ path: require('path').join(__dirname, '../.env') });

const app = require('../server');

// Export as a serverless function handler
module.exports = app;

