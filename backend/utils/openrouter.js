const axios = require('axios');
const fs = require('fs');
require('dotenv').config();

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

/**
 * Analyze lab test image using OpenRouter vision model
 * @param {string} imagePath - Path to the uploaded image
 * @returns {Promise<Array>} - Array of lab test results
 */
async function analyzeLab(imagePath) {
  try {
    // Read image and convert to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

    const prompt = `You are a medical education AI assistant. Analyze this lab test image and extract all visible test results.

For each test found, provide:
1. Test name (e.g., "Hemoglobin", "Glucose", "Cholesterol")
2. Measured value with unit (e.g., "14.5 g/dL")
3. Status: "normal" or "abnormal" based on typical reference ranges
4. Brief educational explanation (2-3 sentences about what this test measures and what the result might indicate)

IMPORTANT: Return ONLY a valid JSON array with this exact structure, no additional text:
[
  {
    "name": "Test Name",
    "value": "Value with unit",
    "status": "normal",
    "explanation": "Educational explanation here."
  }
]

If no lab results are clearly visible, return an empty array: []`;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        temperature: 0.3,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://tbibvision.app',
          'X-Title': 'TbibVision Medical AI'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Parse JSON response
    let results;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        results = JSON.parse(jsonMatch[0]);
      } else {
        results = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse lab analysis results');
    }

    return Array.isArray(results) ? results : [];
  } catch (error) {
    console.error('Error analyzing lab:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Analyze skin image using OpenRouter vision model
 * @param {string} imagePath - Path to the uploaded image
 * @returns {Promise<Object>} - Object with conditions array
 */
async function analyzeSkin(imagePath) {
  try {
    // Read image and convert to base64
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    const mimeType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';

    const prompt = `You are a dermatology education AI assistant. Analyze this skin image and suggest 3 possible conditions (these are NOT medical diagnoses, just educational possibilities).

For each condition, provide:
1. Condition name (common skin conditions like acne, eczema, dermatitis, etc.)
2. Confidence percentage (realistic estimate 0-100)
3. Brief description (2-3 sentences)
4. General advice (when to see a doctor, general care tips)

IMPORTANT: Return ONLY a valid JSON object with this exact structure, no additional text:
{
  "conditions": [
    {
      "name": "Condition Name",
      "confidence": 75,
      "description": "Description here.",
      "advice": "Advice here."
    }
  ]
}

Return exactly 3 conditions ordered by confidence (highest first).`;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4o',
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'text',
                text: prompt
              },
              {
                type: 'image_url',
                image_url: {
                  url: `data:${mimeType};base64,${base64Image}`
                }
              }
            ]
          }
        ],
        temperature: 0.4,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://tbibvision.app',
          'X-Title': 'TbibVision Medical AI'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Parse JSON response
    let results;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        results = JSON.parse(jsonMatch[0]);
      } else {
        results = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse skin analysis results');
    }

    return results;
  } catch (error) {
    console.error('Error analyzing skin:', error.response?.data || error.message);
    throw error;
  }
}

/**
 * Analyze text symptoms and recommend relevant medical specialties
 * @param {string} symptomText - User's description of symptoms
 * @returns {Promise<Object>} - Analysis with possible conditions and recommended specialties
 */
async function analyzeSymptoms(symptomText) {
  try {
    const prompt = `You are a medical triage AI assistant. A patient has described their symptoms. Analyze the symptoms and provide educational information.

Patient's symptoms: "${symptomText}"

Provide:
1. 3 possible conditions that match these symptoms (most likely first)
2. For each condition: name, confidence (0-100), brief description (2-3 sentences), urgency level (low/medium/high)
3. Recommended medical specialties to consult (list 2-3 specialties in order of relevance)
4. General advice about when to seek immediate care

Available specialties: Dermatologist, Cardiologist, Endocrinologist, Nephrologist, Hematologist, Gastroenterologist, Neurologist, Orthopedist, Psychiatrist, Ophthalmologist, ENT Specialist, Rheumatologist, Urologist, Oncologist, Pulmonologist, Infectious Disease Specialist, General Practitioner

IMPORTANT: Return ONLY a valid JSON object with this exact structure, no additional text:
{
  "conditions": [
    {
      "name": "Condition Name",
      "confidence": 75,
      "description": "Description here.",
      "urgency": "medium"
    }
  ],
  "recommendedSpecialties": ["Specialty 1", "Specialty 2"],
  "generalAdvice": "General advice about when to seek care and what to do."
}

Return exactly 3 conditions ordered by confidence.`;

    const response = await axios.post(
      OPENROUTER_API_URL,
      {
        model: 'openai/gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful medical triage assistant. Provide educational information, not medical diagnoses. Always encourage users to see healthcare professionals for proper diagnosis and treatment.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.5,
        max_tokens: 1500
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'Content-Type': 'application/json',
          'HTTP-Referer': 'https://tbibvision.app',
          'X-Title': 'TbibVision Medical AI'
        }
      }
    );

    const content = response.data.choices[0].message.content;
    
    // Parse JSON response
    let results;
    try {
      // Try to extract JSON from the response
      const jsonMatch = content.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        results = JSON.parse(jsonMatch[0]);
      } else {
        results = JSON.parse(content);
      }
    } catch (parseError) {
      console.error('Failed to parse AI response:', content);
      throw new Error('Failed to parse symptom analysis results');
    }

    return results;
  } catch (error) {
    console.error('Error analyzing symptoms:', error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  analyzeLab,
  analyzeSkin,
  analyzeSymptoms
};

