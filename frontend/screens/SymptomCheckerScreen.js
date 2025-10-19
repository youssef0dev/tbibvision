import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import LoadingAnimation from '../components/LoadingAnimation';
import { analyzeSymptoms } from '../services/api';
import { saveAnalysisToStorage } from '../services/storage';

export default function SymptomCheckerScreen({ navigation }) {
  const { colors } = useTheme();
  const [symptoms, setSymptoms] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const characterLimit = 2000;

  const handleAnalyze = async () => {
    if (!symptoms.trim()) {
      Alert.alert('No Symptoms', 'Please describe your symptoms first');
      return;
    }

    if (symptoms.length < 10) {
      Alert.alert('Too Short', 'Please provide more detail about your symptoms');
      return;
    }

    setLoading(true);
    try {
      const response = await analyzeSymptoms(symptoms);
      setResults(response.results);

      // Save to local storage
      await saveAnalysisToStorage({
        type: 'symptom',
        symptomDescription: symptoms,
        results: response.results,
      });
    } catch (error) {
      Alert.alert('Analysis Error', error.message);
      console.error('Symptom analysis error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setSymptoms('');
    setResults(null);
  };

  const handleFindDoctors = () => {
    if (results?.recommendedSpecialties && results.recommendedSpecialties.length > 0) {
      // Navigate to Doctors screen with the first recommended specialty
      navigation.navigate('Doctors', {
        specialty: results.recommendedSpecialties[0]
      });
    } else {
      navigation.navigate('Doctors');
    }
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency?.toLowerCase()) {
      case 'high':
        return '#EF4444';
      case 'medium':
        return '#F59E0B';
      case 'low':
        return '#10B981';
      default:
        return colors.textSecondary;
    }
  };

  if (loading) {
    return <LoadingAnimation message="Analyzing Your Symptoms..." />;
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>
            AI Symptom Checker
          </Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Describe your symptoms and get AI-powered insights
          </Text>
        </View>

        {!results ? (
          <>
            <View style={[styles.inputContainer, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
              <TextInput
                style={[styles.input, { color: colors.text }]}
                placeholder="Describe your symptoms in detail...&#10;&#10;Example: 'I have been experiencing persistent cough for 3 weeks, with fever in the evenings, night sweats, and fatigue. Sometimes I cough up phlegm...'"
                placeholderTextColor={colors.textSecondary}
                multiline
                numberOfLines={12}
                value={symptoms}
                onChangeText={setSymptoms}
                maxLength={characterLimit}
                textAlignVertical="top"
              />
              <Text style={[styles.characterCount, { color: colors.textSecondary }]}>
                {symptoms.length}/{characterLimit}
              </Text>
            </View>

            <View style={styles.tipsContainer}>
              <Text style={[styles.tipsTitle, { color: colors.text }]}>
                💡 Tips for better analysis:
              </Text>
              <Text style={[styles.tip, { color: colors.textSecondary }]}>
                • Describe when symptoms started
              </Text>
              <Text style={[styles.tip, { color: colors.textSecondary }]}>
                • Mention severity and frequency
              </Text>
              <Text style={[styles.tip, { color: colors.textSecondary }]}>
                • Include any relevant medical history
              </Text>
              <Text style={[styles.tip, { color: colors.textSecondary }]}>
                • Note if symptoms worsen at certain times
              </Text>
            </View>

            <TouchableOpacity
              style={[styles.analyzeButton, { backgroundColor: colors.primary }]}
              onPress={handleAnalyze}
            >
              <Text style={styles.analyzeButtonText}>🔍 Analyze Symptoms</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            {/* Results Section */}
            <View style={[styles.resultsCard, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}>
              <Text style={[styles.resultsTitle, { color: colors.text }]}>
                📋 Analysis Results
              </Text>

              {/* Possible Conditions */}
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                Possible Conditions:
              </Text>
              {results.conditions?.map((condition, index) => (
                <View key={index} style={[styles.conditionCard, { backgroundColor: colors.background }]}>
                  <View style={styles.conditionHeader}>
                    <Text style={[styles.conditionName, { color: colors.text }]}>
                      {index + 1}. {condition.name}
                    </Text>
                    <Text style={[styles.urgencyBadge, { 
                      backgroundColor: getUrgencyColor(condition.urgency) + '20',
                      color: getUrgencyColor(condition.urgency)
                    }]}>
                      {condition.urgency?.toUpperCase()}
                    </Text>
                  </View>
                  <Text style={[styles.confidence, { color: colors.textSecondary }]}>
                    Confidence: {condition.confidence}%
                  </Text>
                  <Text style={[styles.conditionDescription, { color: colors.textSecondary }]}>
                    {condition.description}
                  </Text>
                </View>
              ))}

              {/* Recommended Specialties */}
              {results.recommendedSpecialties && results.recommendedSpecialties.length > 0 && (
                <>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    👨‍⚕️ Recommended Specialists:
                  </Text>
                  <View style={styles.specialtiesList}>
                    {results.recommendedSpecialties.map((specialty, index) => (
                      <View key={index} style={[styles.specialtyChip, { backgroundColor: colors.primary + '20' }]}>
                        <Text style={[styles.specialtyText, { color: colors.primary }]}>
                          {specialty}
                        </Text>
                      </View>
                    ))}
                  </View>
                </>
              )}

              {/* General Advice */}
              {results.generalAdvice && (
                <>
                  <Text style={[styles.sectionTitle, { color: colors.text }]}>
                    ⚕️ General Advice:
                  </Text>
                  <Text style={[styles.adviceText, { color: colors.textSecondary }]}>
                    {results.generalAdvice}
                  </Text>
                </>
              )}

              {/* Disclaimer */}
              <View style={[styles.disclaimerBox, { backgroundColor: colors.primary + '10', borderColor: colors.primary }]}>
                <Text style={[styles.disclaimerText, { color: colors.text }]}>
                  ⚠️ <Text style={{ fontWeight: 'bold' }}>Important:</Text> This is NOT a medical diagnosis.
                  Always consult a qualified healthcare professional for proper diagnosis and treatment.
                </Text>
              </View>
            </View>

            {/* Action Buttons */}
            <TouchableOpacity
              style={[styles.findDoctorsButton, { backgroundColor: colors.accent }]}
              onPress={handleFindDoctors}
            >
              <Text style={styles.findDoctorsButtonText}>
                👨‍⚕️ Find {results.recommendedSpecialties?.[0] || 'Doctors'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.resetButton, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}
              onPress={handleReset}
            >
              <Text style={[styles.resetButtonText, { color: colors.text }]}>
                🔄 Check Another Symptom
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
  inputContainer: {
    marginHorizontal: 20,
    marginTop: 16,
    borderRadius: 16,
    borderWidth: 2,
    padding: 16,
  },
  input: {
    fontSize: 16,
    lineHeight: 22,
    minHeight: 200,
  },
  characterCount: {
    fontSize: 12,
    marginTop: 8,
    textAlign: 'right',
  },
  tipsContainer: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 16,
  },
  tipsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  tip: {
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 8,
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
  resultsCard: {
    marginHorizontal: 20,
    marginTop: 16,
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
  },
  resultsTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 12,
  },
  conditionCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  conditionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  conditionName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  urgencyBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: 'bold',
  },
  confidence: {
    fontSize: 14,
    marginBottom: 8,
  },
  conditionDescription: {
    fontSize: 14,
    lineHeight: 20,
  },
  specialtiesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  specialtyText: {
    fontSize: 14,
    fontWeight: '600',
  },
  adviceText: {
    fontSize: 14,
    lineHeight: 22,
  },
  disclaimerBox: {
    marginTop: 20,
    padding: 16,
    borderRadius: 12,
    borderWidth: 2,
  },
  disclaimerText: {
    fontSize: 14,
    lineHeight: 20,
  },
  findDoctorsButton: {
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
  findDoctorsButtonText: {
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

