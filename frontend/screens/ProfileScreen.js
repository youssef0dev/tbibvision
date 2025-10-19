import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';

export default function ProfileScreen({ navigation }) {
  const { colors, isDark, toggleTheme } = useTheme();
  const { user, signOut, supabase } = useAuth();
  const [currentUser, setCurrentUser] = useState(user);

  useFocusEffect(
    useCallback(() => {
      loadUserData();
    }, [user])
  );

  const loadUserData = async () => {
    try {
      const { data: { user: refreshedUser } } = await supabase.auth.getUser();
      setCurrentUser(refreshedUser);
    } catch (error) {
      console.error('Error loading user data:', error);
    }
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <View style={[styles.avatar, { backgroundColor: colors.primary + '20' }]}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={[styles.name, { color: colors.text }]}>
          {currentUser ? (currentUser.user_metadata?.full_name || 'TbibVision User') : 'Guest User'}
        </Text>
        <Text style={[styles.email, { color: colors.textSecondary }]}>
          {currentUser ? currentUser.email : 'Sign in to save your data'}
        </Text>
        {currentUser && (
          <TouchableOpacity
            style={[styles.logoutButton, { backgroundColor: colors.backgroundSecondary, borderColor: colors.border }]}
            onPress={async () => {
              const { error } = await signOut();
              if (!error) {
                navigation.replace('Login');
              }
            }}
          >
            <Text style={[styles.logoutButtonText, { color: colors.text }]}>🚪 Logout</Text>
          </TouchableOpacity>
        )}
        {!currentUser && (
          <TouchableOpacity
            style={[styles.loginPromptButton, { backgroundColor: colors.primary }]}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginPromptButtonText}>Sign In</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Settings Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Settings</Text>
        
        <View style={[styles.settingCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: colors.text }]}>
                {isDark ? '🌙' : '☀️'} Dark Mode
              </Text>
              <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
                Toggle dark/light theme
              </Text>
            </View>
            <Switch
              value={isDark}
              onValueChange={toggleTheme}
              trackColor={{ false: '#ccc', true: colors.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>
      </View>

      {/* About Section */}
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>About</Text>
        <View style={[styles.aboutCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            TbibVision v1.0.0
          </Text>
          <Text style={[styles.aboutText, { color: colors.textSecondary }]}>
            AI-Powered Medical Assistant
          </Text>
          <Text style={[styles.disclaimer, { color: colors.warning }]}>
            ⚠️ For educational purposes only
          </Text>
        </View>
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    paddingTop: 60,
    paddingBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 48,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    marginBottom: 16,
  },
  logoutButton: {
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    marginTop: 8,
  },
  logoutButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  loginPromptButton: {
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 20,
    marginTop: 8,
  },
  loginPromptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 13,
  },
  aboutCard: {
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    alignItems: 'center',
  },
  aboutText: {
    fontSize: 14,
    marginBottom: 4,
  },
  disclaimer: {
    fontSize: 13,
    marginTop: 8,
    textAlign: 'center',
  },
  bottomSpace: {
    height: 100,
  },
});

