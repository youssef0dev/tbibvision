import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import ImageUploadCard from '../components/ImageUploadCard';
import AnalysisResultCard from '../components/AnalysisResultCard';
import LoadingAnimation from '../components/LoadingAnimation';
import { analyzeLab } from '../services/api';
import { saveAnalysisToStorage } from '../services/storage';
import { findRelevantSpecialty, extractTextFromResults, getSpecialtyDisplayName } from '../utils/specialtyMatcher';

export default function LabAnalyzerScreen({ navigation }) {
  const { colors } = useTheme();
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);

  const handleImageSelected = (uri) => {
    setImage(uri);
    setResults(null); // Clear previous results
  };

  const handleAnalyze = async () => {
    if (!image) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeLab(image);
      setResults(response.results);

      // Save to local storage
      await saveAnalysisToStorage({
        type: 'lab',
        imageUri: image,
        results: response.results,
      });

      if (response.results.length === 0) {
        Alert.alert(
          'No Results Found',
          'No lab results were detected in the image. Please try with a clearer image of a lab test report.'
        );
      }
    } catch (error) {
      Alert.alert('Analysis Error', error.message);
      console.error('Analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImage(null);
    setResults(null);
  };

  const handleFindDoctors = () => {
    // Extract text from results and find relevant specialty
    const resultsText = extractTextFromResults(results);
    const specialty = findRelevantSpecialty(resultsText);
    
    // Navigate to Doctors screen with specialty filter
    navigation.navigate('Doctors', { 
      specialty: specialty || 'General Practitioner' // Default to GP for general lab tests
    });
  };

  if (loading) {
    return <LoadingAnimation message="Analyzing Lab Results..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Lab Analyzer</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Upload your lab test and get AI-powered analysis
          </Text>
        </View>

        <ImageUploadCard image={image} onImageSelected={handleImageSelected} />

        {image && !results && (
          <TouchableOpacity
            style={[styles.analyzeButton, { backgroundColor: colors.primary }]}
            onPress={handleAnalyze}
          >
            <Text style={styles.analyzeButtonText}>🔬 Analyze Lab Test</Text>
          </TouchableOpacity>
        )}

        {results && (
          <>
            <AnalysisResultCard results={results} type="lab" />
            
            <TouchableOpacity
              style={[styles.doctorsButton, { backgroundColor: colors.accent }]}
              onPress={handleFindDoctors}
            >
              <Text style={styles.doctorsButtonText}>
                👨‍⚕️ Find {getSpecialtyDisplayName(findRelevantSpecialty(extractTextFromResults(results)) || 'General Practitioner')}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>
                📷 Analyze Another Test
              </Text>
            </TouchableOpacity>
          </>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  analyzeButton: {
    marginHorizontal: 20,
    marginTop: 24,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  analyzeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  doctorsButton: {
    marginHorizontal: 20,
    marginTop: 16,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  doctorsButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    marginHorizontal: 20,
    marginTop: 16,
    marginBottom: 20,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
  bottomSpace: {
    height: 100,
  },
});

