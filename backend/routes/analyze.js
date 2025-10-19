const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { analyzeLab, analyzeSkin, analyzeSymptoms } = require('../utils/openrouter');
const supabase = require('../utils/supabase');

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.random().toString(36).substring(7)}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = allowedTypes.test(file.mimetype);
    
    if (extname && mimetype) {
      cb(null, true);
    } else {
      cb(new Error('Only JPEG and PNG images are allowed'));
    }
  }
});

/**
 * POST /api/analyze-lab
 * Analyze lab test image
 */
router.post('/analyze-lab', upload.single('image'), async (req, res) => {
  let filePath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    filePath = req.file.path;
    console.log('Analyzing lab image:', filePath);

    // Analyze image with OpenRouter
    const results = await analyzeLab(filePath);

    // Clean up uploaded file
    fs.unlinkSync(filePath);
    filePath = null;

    res.json({
      success: true,
      type: 'lab',
      results
    });
  } catch (error) {
    // Clean up file on error
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error('Lab analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze lab test',
      message: error.message
    });
  }
});

/**
 * POST /api/analyze-skin
 * Analyze skin image
 */
router.post('/analyze-skin', upload.single('image'), async (req, res) => {
  let filePath = null;
  
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    filePath = req.file.path;
    console.log('Analyzing skin image:', filePath);

    // Analyze image with OpenRouter
    const results = await analyzeSkin(filePath);

    // Clean up uploaded file
    fs.unlinkSync(filePath);
    filePath = null;

    res.json({
      success: true,
      type: 'skin',
      results
    });
  } catch (error) {
    // Clean up file on error
    if (filePath && fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    console.error('Skin analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze skin image',
      message: error.message
    });
  }
});

/**
 * POST /api/analyze-symptoms
 * Analyze text-based symptom description
 */
router.post('/analyze-symptoms', async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms || typeof symptoms !== 'string' || symptoms.trim().length === 0) {
      return res.status(400).json({ error: 'Please provide a symptom description' });
    }

    if (symptoms.length > 2000) {
      return res.status(400).json({ error: 'Symptom description too long (max 2000 characters)' });
    }

    console.log('Analyzing symptoms:', symptoms.substring(0, 100) + '...');

    // Analyze symptoms with OpenRouter
    const results = await analyzeSymptoms(symptoms);

    res.json({
      success: true,
      type: 'symptom',
      results
    });
  } catch (error) {
    console.error('Symptom analysis error:', error);
    res.status(500).json({
      error: 'Failed to analyze symptoms',
      message: error.message
    });
  }
});

/**
 * POST /api/save-analysis
 * Save analysis to database
 */
router.post('/save-analysis', async (req, res) => {
  try {
    const { userId, type, imageUrl, results, symptomDescription } = req.body;

    if (!type || !results) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const { data, error } = await supabase
      .from('analysis_history')
      .insert([
        {
          user_id: userId || 'anonymous',
          type,
          image_url: imageUrl || null,
          symptom_description: symptomDescription || null,
          results
        }
      ])
      .select();

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      data: data[0]
    });
  } catch (error) {
    console.error('Save analysis error:', error);
    res.status(500).json({
      error: 'Failed to save analysis',
      message: error.message
    });
  }
});

module.exports = router;

