import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function AnalysisResultCard({ results, type }) {
  const { colors } = useTheme();

  if (type === 'lab') {
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.header, { color: colors.text }]}>Lab Results</Text>
        {results && results.length > 0 ? (
          results.map((result, index) => (
            <View
              key={index}
              style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <View style={styles.resultHeader}>
                <Text style={[styles.testName, { color: colors.text }]}>{result.name}</Text>
                <View style={[
                  styles.statusBadge,
                  { backgroundColor: result.status === 'normal' ? colors.success + '20' : colors.error + '20' }
                ]}>
                  <Text style={[
                    styles.statusText,
                    { color: result.status === 'normal' ? colors.success : colors.error }
                  ]}>
                    {result.status === 'normal' ? '🟢 Normal' : '🔴 Abnormal'}
                  </Text>
                </View>
              </View>
              <Text style={[styles.value, { color: colors.primary }]}>{result.value}</Text>
              <Text style={[styles.explanation, { color: colors.textSecondary }]}>
                {result.explanation}
              </Text>
            </View>
          ))
        ) : (
          <View style={[styles.emptyCard, { backgroundColor: colors.card }]}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No lab results found in the image. Please try with a clearer image.
            </Text>
          </View>
        )}
      </ScrollView>
    );
  }

  if (type === 'skin' && results?.conditions) {
    return (
      <ScrollView style={styles.container}>
        <Text style={[styles.header, { color: colors.text }]}>Skin Analysis Results</Text>
        <Text style={[styles.disclaimer, { color: colors.warning, backgroundColor: colors.warning + '15' }]}>
          ⚠️ This is educational information only, not a medical diagnosis. Consult a dermatologist for proper evaluation.
        </Text>
        {results.conditions.map((condition, index) => (
          <View
            key={index}
            style={[styles.resultCard, { backgroundColor: colors.card, borderColor: colors.border }]}
          >
            <View style={styles.resultHeader}>
              <Text style={[styles.testName, { color: colors.text }]}>{condition.name}</Text>
              <View style={[styles.confidenceBadge, { backgroundColor: colors.accent + '20' }]}>
                <Text style={[styles.confidenceText, { color: colors.accent }]}>
                  {condition.confidence}%
                </Text>
              </View>
            </View>
            <Text style={[styles.description, { color: colors.textSecondary }]}>
              {condition.description}
            </Text>
            <View style={[styles.adviceBox, { backgroundColor: colors.backgroundSecondary }]}>
              <Text style={[styles.adviceLabel, { color: colors.primary }]}>💡 Advice:</Text>
              <Text style={[styles.adviceText, { color: colors.text }]}>{condition.advice}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 16,
  },
  disclaimer: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
    fontSize: 13,
    lineHeight: 20,
  },
  resultCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  testName: {
    fontSize: 18,
    fontWeight: '600',
    flex: 1,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  confidenceBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  confidenceText: {
    fontSize: 14,
    fontWeight: '700',
  },
  value: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
  },
  explanation: {
    fontSize: 14,
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 12,
  },
  adviceBox: {
    padding: 12,
    borderRadius: 8,
    marginTop: 8,
  },
  adviceLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 6,
  },
  adviceText: {
    fontSize: 13,
    lineHeight: 18,
  },
  emptyCard: {
    padding: 24,
    borderRadius: 12,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

