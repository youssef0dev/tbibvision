import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const SUPABASE_URL = 'https://wxnfkimplrwizgehmfed.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4bmZraW1wbHJ3aXpnZWhtZmVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk0MDYyNTUsImV4cCI6MjA3NDk4MjI1NX0.GaARh3T6WZTnQJ53_R1yzY9q8My9yXT2oV4erqwxr6Q';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const ONBOARDING_KEY = 'hasSeenOnboarding';
const ANALYSIS_HISTORY_KEY = 'analysisHistory';

/**
 * Check if user has seen onboarding
 */
export const hasSeenOnboarding = async () => {
  try {
    const value = await AsyncStorage.getItem(ONBOARDING_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking onboarding status:', error);
    return false;
  }
};

/**
 * Mark onboarding as completed
 */
export const setOnboardingCompleted = async () => {
  try {
    await AsyncStorage.setItem(ONBOARDING_KEY, 'true');
  } catch (error) {
    console.error('Error setting onboarding status:', error);
  }
};

/**
 * Get analysis history from Supabase (filtered by current user)
 */
export const getAnalysisHistory = async () => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // If not logged in, return empty array
      return [];
    }

    // Fetch history from Supabase filtered by user ID
    const { data, error } = await supabase
      .from('analysis_history')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) {
      console.error('Error fetching history from Supabase:', error);
      return [];
    }

    // Transform Supabase data to match the app's format
    return data.map(item => ({
      id: item.id.toString(),
      type: item.analysis_type,
      timestamp: item.created_at,
      result: item.result_text,
      image: item.image_url,
      symptomDescription: item.symptom_description
    }));
  } catch (error) {
    console.error('Error getting analysis history:', error);
    return [];
  }
};

/**
 * Save analysis to local storage
 */
export const saveAnalysisToStorage = async (analysis) => {
  try {
    const history = await getAnalysisHistory();
    const newHistory = [
      {
        id: Date.now().toString(),
        timestamp: new Date().toISOString(),
        ...analysis
      },
      ...history
    ];
    // Keep only last 50 analyses
    const trimmedHistory = newHistory.slice(0, 50);
    await AsyncStorage.setItem(ANALYSIS_HISTORY_KEY, JSON.stringify(trimmedHistory));
    return trimmedHistory;
  } catch (error) {
    console.error('Error saving analysis:', error);
    throw error;
  }
};

/**
 * Clear all analysis history for current user from Supabase
 */
export const clearAnalysisHistory = async () => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('No user logged in');
      return;
    }

    // Delete all history for this user from Supabase
    const { error } = await supabase
      .from('analysis_history')
      .delete()
      .eq('user_id', user.id);

    if (error) {
      console.error('Error clearing history from Supabase:', error);
      throw error;
    }
  } catch (error) {
    console.error('Error clearing history:', error);
    throw error;
  }
};

/**
 * Delete specific analysis from history in Supabase
 */
export const deleteAnalysis = async (analysisId) => {
  try {
    // Get current user
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      console.error('No user logged in');
      return [];
    }

    // Delete from Supabase (with user_id check for security)
    const { error } = await supabase
      .from('analysis_history')
      .delete()
      .eq('id', parseInt(analysisId))
      .eq('user_id', user.id);

    if (error) {
      console.error('Error deleting analysis from Supabase:', error);
      throw error;
    }

    // Return updated history
    return await getAnalysisHistory();
  } catch (error) {
    console.error('Error deleting analysis:', error);
    throw error;
  }
};

