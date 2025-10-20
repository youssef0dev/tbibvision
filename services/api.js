import axios from 'axios';

const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

const api = axios.create({
  baseURL: API_URL,
  timeout: 60000, // 60 second timeout for AI analysis
  headers: {
    'Content-Type': 'application/json',
  }
});

/**
 * Analyze lab test image
 * @param {string} imageUri - Local URI of the image
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeLab = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'lab-test.jpg',
    });

    const response = await api.post('/analyze-lab', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Lab analysis error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to analyze lab test');
  }
};

/**
 * Analyze skin image
 * @param {string} imageUri - Local URI of the image
 * @returns {Promise<Object>} Analysis results
 */
export const analyzeSkin = async (imageUri) => {
  try {
    const formData = new FormData();
    formData.append('image', {
      uri: imageUri,
      type: 'image/jpeg',
      name: 'skin-image.jpg',
    });

    const response = await api.post('/analyze-skin', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Skin analysis error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to analyze skin image');
  }
};

/**
 * Get list of doctors
 * @param {string} specialization - Optional filter by specialization
 * @returns {Promise<Array>} List of doctors
 */
export const getDoctors = async (specialization = null) => {
  try {
    const params = specialization ? { specialization } : {};
    const response = await api.get('/doctors', { params });
    return response.data.doctors;
  } catch (error) {
    console.error('Doctors fetch error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to fetch doctors');
  }
};

/**
 * Analyze text-based symptoms
 * @param {string} symptomText - User's symptom description
 * @returns {Promise<Object>} Analysis results with conditions and recommended specialties
 */
export const analyzeSymptoms = async (symptomText) => {
  try {
    const response = await api.post('/analyze-symptoms', { symptoms: symptomText });
    return response.data;
  } catch (error) {
    console.error('Symptom analysis error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to analyze symptoms');
  }
};

/**
 * Save analysis to backend
 * @param {Object} analysisData - Analysis data to save
 * @returns {Promise<Object>} Saved record
 */
export const saveAnalysis = async (analysisData) => {
  try {
    const response = await api.post('/save-analysis', analysisData);
    return response.data;
  } catch (error) {
    console.error('Save analysis error:', error.response?.data || error.message);
    throw new Error(error.response?.data?.message || 'Failed to save analysis');
  }
};

export default api;

