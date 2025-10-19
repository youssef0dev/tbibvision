/**
 * Maps medical conditions/keywords to doctor specializations
 * This helps route users to the right specialists based on AI analysis
 */

// Keywords mapped to specializations in the database
const specialtyKeywords = {
  'Pulmonologist': [
    'lung', 'respiratory', 'breathing', 'cough', 'tuberculosis', 'tb',
    'asthma', 'copd', 'pneumonia', 'bronchitis', 'shortness of breath',
    'chest pain', 'wheezing', 'phlegm', 'sputum', 'pulmonary', 'pulmonologist',
    'night sweats', 'hemoptysis', 'coughing blood', 'chest x-ray', 'breathing difficulty'
  ],
  'Infectious Disease Specialist': [
    'infection', 'infectious', 'fever', 'tuberculosis', 'tb', 'hiv', 'aids',
    'malaria', 'typhoid', 'hepatitis', 'covid', 'virus', 'bacteria',
    'contagious', 'outbreak', 'epidemic', 'infectious disease'
  ],
  'Dermatologist': [
    'skin', 'acne', 'rash', 'eczema', 'psoriasis', 'dermatitis', 
    'mole', 'melanoma', 'dermatology', 'dermatologist', 'pigmentation',
    'wrinkle', 'aging', 'scar', 'lesion', 'birthmark', 'wart',
    'fungal infection', 'vitiligo', 'rosacea', 'hives', 'urticaria'
  ],
  'Cardiologist': [
    'heart', 'cardiac', 'cholesterol', 'blood pressure', 'hypertension',
    'cardiovascular', 'ecg', 'ekg', 'triglycerides', 'ldl', 'hdl',
    'cardiac enzyme', 'troponin', 'cardiology', 'cardiologist', 'chest pain',
    'palpitation', 'arrhythmia', 'angina'
  ],
  'Endocrinologist': [
    'diabetes', 'thyroid', 'glucose', 'insulin', 'tsh', 'hormone',
    'endocrine', 'metabolic', 'hba1c', 'sugar level', 'hyperthyroid',
    'hypothyroid', 'endocrinology', 'endocrinologist', 't3', 't4',
    'weight gain', 'weight loss', 'fatigue', 'metabolism'
  ],
  'Nephrologist': [
    'kidney', 'renal', 'creatinine', 'urea', 'bun', 'nephrology',
    'nephrologist', 'urinary', 'protein in urine', 'kidney function',
    'dialysis', 'kidney stone', 'kidney failure'
  ],
  'Hematologist': [
    'blood', 'anemia', 'hemoglobin', 'platelet', 'wbc', 'rbc',
    'leukemia', 'lymphoma', 'bleeding disorder', 'coagulation',
    'hematology', 'hematologist', 'blood count', 'cbc', 'bruising'
  ],
  'Gastroenterologist': [
    'liver', 'hepatic', 'digestive', 'stomach', 'intestine',
    'liver enzyme', 'alt', 'ast', 'bilirubin', 'gastroenterology',
    'gastroenterologist', 'ggt', 'alkaline phosphatase', 'abdominal pain',
    'diarrhea', 'constipation', 'nausea', 'vomiting', 'indigestion'
  ],
  'Neurologist': [
    'brain', 'nerve', 'neurological', 'headache', 'migraine', 'seizure',
    'epilepsy', 'stroke', 'paralysis', 'numbness', 'tingling',
    'memory loss', 'alzheimer', 'parkinson', 'neurology', 'neurologist',
    'dizziness', 'vertigo', 'tremor'
  ],
  'Orthopedist': [
    'bone', 'joint', 'muscle', 'orthopedic', 'fracture', 'arthritis',
    'back pain', 'neck pain', 'knee pain', 'shoulder pain', 'sprain',
    'ligament', 'tendon', 'osteoporosis', 'orthopedist', 'sports injury'
  ],
  'Psychiatrist': [
    'mental health', 'depression', 'anxiety', 'stress', 'psychiatry',
    'psychiatrist', 'panic attack', 'bipolar', 'schizophrenia',
    'mood disorder', 'psychological', 'therapy', 'counseling'
  ],
  'Ophthalmologist': [
    'eye', 'vision', 'sight', 'ophthalmology', 'ophthalmologist',
    'cataract', 'glaucoma', 'blurred vision', 'eye pain', 'redness',
    'dry eyes', 'floaters', 'blindness', 'retina', 'cornea'
  ],
  'ENT Specialist': [
    'ear', 'nose', 'throat', 'ent', 'sinus', 'hearing', 'tinnitus',
    'sore throat', 'hoarseness', 'nasal congestion', 'ear infection',
    'vertigo', 'tonsillitis', 'laryngitis', 'rhinitis'
  ],
  'Rheumatologist': [
    'arthritis', 'rheumatoid', 'lupus', 'joint pain', 'inflammation',
    'autoimmune', 'rheumatology', 'rheumatologist', 'stiffness',
    'swelling', 'gout', 'fibromyalgia'
  ],
  'Urologist': [
    'urinary', 'bladder', 'prostate', 'urology', 'urologist',
    'kidney stone', 'urinary tract infection', 'uti', 'incontinence',
    'frequent urination', 'blood in urine'
  ],
  'Oncologist': [
    'cancer', 'tumor', 'oncology', 'oncologist', 'chemotherapy',
    'radiation', 'malignancy', 'metastasis', 'lymph node', 'biopsy',
    'carcinoma', 'sarcoma'
  ],
  'General Practitioner': [
    'general', 'routine', 'checkup', 'vitamin', 'mineral',
    'basic', 'wellness', 'preventive', 'screening', 'gp',
    'general practitioner', 'family medicine', 'primary care'
  ],
};

/**
 * Analyzes text to find the most relevant medical specialty
 * @param {string} text - The analysis results text
 * @returns {string|null} - The matched specialty or null
 */
export function findRelevantSpecialty(text) {
  if (!text || typeof text !== 'string') {
    return null;
  }

  const lowerText = text.toLowerCase();
  const matches = {};

  // Count keyword matches for each specialty
  for (const [specialty, keywords] of Object.entries(specialtyKeywords)) {
    matches[specialty] = keywords.filter(keyword => 
      lowerText.includes(keyword.toLowerCase())
    ).length;
  }

  // Find specialty with most matches
  let maxMatches = 0;
  let bestMatch = null;

  for (const [specialty, count] of Object.entries(matches)) {
    if (count > maxMatches) {
      maxMatches = count;
      bestMatch = specialty;
    }
  }

  // Only return if we have at least 1 match
  return maxMatches > 0 ? bestMatch : null;
}

/**
 * Extracts analysis text from results object/array
 * @param {*} results - The analysis results
 * @returns {string} - Concatenated text from results
 */
export function extractTextFromResults(results) {
  if (!results) return '';

  // If it's a string, return it
  if (typeof results === 'string') {
    return results;
  }

  // If it's an array, concatenate all text
  if (Array.isArray(results)) {
    return results.map(item => {
      if (typeof item === 'string') return item;
      if (typeof item === 'object') {
        return Object.values(item).join(' ');
      }
      return '';
    }).join(' ');
  }

  // If it's an object, concatenate all values
  if (typeof results === 'object') {
    return Object.values(results).map(val => {
      if (typeof val === 'string') return val;
      if (Array.isArray(val)) return val.join(' ');
      return '';
    }).join(' ');
  }

  return '';
}

/**
 * Gets a user-friendly specialty name
 * @param {string} specialty - The specialty name
 * @returns {string} - User-friendly name
 */
export function getSpecialtyDisplayName(specialty) {
  const displayNames = {
    'Pulmonologist': 'Pulmonologists',
    'Infectious Disease Specialist': 'Infectious Disease Specialists',
    'Dermatologist': 'Dermatologists',
    'Cardiologist': 'Cardiologists',
    'Endocrinologist': 'Endocrinologists',
    'Nephrologist': 'Nephrologists',
    'Hematologist': 'Hematologists',
    'Gastroenterologist': 'Gastroenterologists',
    'Neurologist': 'Neurologists',
    'Orthopedist': 'Orthopedists',
    'Psychiatrist': 'Psychiatrists',
    'Ophthalmologist': 'Ophthalmologists',
    'ENT Specialist': 'ENT Specialists',
    'Rheumatologist': 'Rheumatologists',
    'Urologist': 'Urologists',
    'Oncologist': 'Oncologists',
    'General Practitioner': 'General Practitioners',
  };

  return displayNames[specialty] || specialty;
}

