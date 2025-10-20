import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable';
import { hasSeenOnboarding } from '../services/storage';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    checkOnboardingStatus();
  }, []);

  const checkOnboardingStatus = async () => {
    setTimeout(async () => {
      const seen = await hasSeenOnboarding();
      if (seen) {
        navigation.replace('Main');
      } else {
        navigation.replace('Onboarding');
      }
    }, 2500);
  };

  return (
    <LinearGradient
      colors={['#2196F3', '#00BCD4']}
      style={styles.container}
    >
      <Animatable.View
        animation="bounceIn"
        duration={1500}
        style={styles.logoContainer}
      >
        <Text style={styles.logo}>🏥</Text>
      </Animatable.View>
      <Animatable.Text
        animation="fadeInUp"
        delay={500}
        style={styles.title}
      >
        TbibVision
      </Animatable.Text>
      <Animatable.Text
        animation="fadeInUp"
        delay={800}
        style={styles.subtitle}
      >
        AI-Powered Medical Assistant
      </Animatable.Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    fontSize: 64,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.9)',
  },
});

