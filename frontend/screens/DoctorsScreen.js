import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../contexts/ThemeContext';
import DoctorCard from '../components/DoctorCard';
import { getDoctors } from '../services/api';

export default function DoctorsScreen({ route }) {
  const { colors } = useTheme();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);

  // Auto-set filter if passed from navigation
  useEffect(() => {
    if (route?.params?.specialty) {
      setFilter(route.params.specialty);
    }
  }, [route?.params?.specialty]);

  useEffect(() => {
    fetchDoctors();
  }, [filter]);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      const data = await getDoctors(filter);
      setDoctors(data);
    } catch (error) {
      Alert.alert('Error', error.message);
      console.error('Doctors fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderHeader = () => (
    <View>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Find Doctors</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          Connect with medical professionals
        </Text>
      </View>

      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === null ? colors.primary : colors.backgroundSecondary,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setFilter(null)}
        >
          <Text style={[
            styles.filterText,
            { color: filter === null ? '#FFFFFF' : colors.text }
          ]}>
            All
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === 'Dermatologist' ? colors.primary : colors.backgroundSecondary,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setFilter('Dermatologist')}
        >
          <Text style={[
            styles.filterText,
            { color: filter === 'Dermatologist' ? '#FFFFFF' : colors.text }
          ]}>
            Dermatologists
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.filterButton,
            {
              backgroundColor: filter === 'General Practitioner' ? colors.primary : colors.backgroundSecondary,
              borderColor: colors.border,
            },
          ]}
          onPress={() => setFilter('General Practitioner')}
        >
          <Text style={[
            styles.filterText,
            { color: filter === 'General Practitioner' ? '#FFFFFF' : colors.text }
          ]}>
            GP
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
          Loading doctors...
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={doctors}
        renderItem={({ item }) => <DoctorCard doctor={item} />}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
              No doctors found
            </Text>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
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
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
    gap: 8,
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '600',
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    paddingVertical: 40,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
  },
});

