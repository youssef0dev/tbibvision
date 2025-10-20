import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native';
import { useTheme } from '../contexts/ThemeContext';

export default function DoctorCard({ doctor }) {
  const { colors } = useTheme();

  const handleCall = () => {
    const phoneNumber = doctor.phone.replace(/\s/g, '');
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
      <View style={[styles.iconContainer, { backgroundColor: colors.primary + '15' }]}>
        <Text style={styles.icon}>👨‍⚕️</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: colors.text }]}>{doctor.name}</Text>
        <Text style={[styles.specialization, { color: colors.primary }]}>
          {doctor.specialization}
        </Text>
        <Text style={[styles.location, { color: colors.textSecondary }]}>
          📍 {doctor.city}
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.callButton, { backgroundColor: colors.accent }]}
        onPress={handleCall}
      >
        <Text style={styles.callButtonText}>📞 Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  icon: {
    fontSize: 28,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  specialization: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  location: {
    fontSize: 13,
  },
  callButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  callButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});

