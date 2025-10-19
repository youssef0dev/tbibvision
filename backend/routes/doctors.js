const express = require('express');
const router = express.Router();
const supabase = require('../utils/supabase');

/**
 * GET /api/doctors
 * Get list of doctors, optionally filtered by specialization
 */
router.get('/doctors', async (req, res) => {
  try {
    const { specialization } = req.query;

    let query = supabase
      .from('doctors')
      .select('*')
      .order('name', { ascending: true });

    // Filter by specialization if provided
    if (specialization) {
      query = query.ilike('specialization', `%${specialization}%`);
    }

    const { data, error } = await query;

    if (error) {
      throw error;
    }

    res.json({
      success: true,
      count: data.length,
      doctors: data
    });
  } catch (error) {
    console.error('Doctors fetch error:', error);
    res.status(500).json({
      error: 'Failed to fetch doctors',
      message: error.message
    });
  }
});

module.exports = router;

