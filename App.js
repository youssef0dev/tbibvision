import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, StyleSheet, TouchableOpacity, Text, ActivityIndicator } from 'react-native';
import { ThemeProvider, useTheme } from './contexts/ThemeContext';
import { AuthProvider, useAuth } from './contexts/AuthContext';

// Screens
import SplashScreen from './screens/SplashScreen';
import OnboardingScreen from './screens/OnboardingScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import LabAnalyzerScreen from './screens/LabAnalyzerScreen';
import SkinCheckScreen from './screens/SkinCheckScreen';
import SymptomCheckerScreen from './screens/SymptomCheckerScreen';
import DoctorsScreen from './screens/DoctorsScreen';
import ProfileScreen from './screens/ProfileScreen';

const Stack = createNativeStackNavigator();

// Custom Bottom Tab Navigation
function BottomTabNavigator({ navigation: stackNavigation }) {
  const { colors } = useTheme();
  const [activeTab, setActiveTab] = React.useState('Lab');
  const [routeParams, setRouteParams] = React.useState({});

  const tabs = [
    { name: 'Lab', icon: '🧪', component: LabAnalyzerScreen },
    { name: 'Skin', icon: '🩺', component: SkinCheckScreen },
    { name: 'AI', icon: '🤖', component: SymptomCheckerScreen },
    { name: 'Doctors', icon: '👨‍⚕️', component: DoctorsScreen },
    { name: 'Profile', icon: '👤', component: ProfileScreen },
  ];

  const ActiveComponent = tabs.find(tab => tab.name === activeTab)?.component || LabAnalyzerScreen;

  // Enhanced navigation object that handles both tab and stack navigation
  const enhancedNavigation = {
    navigate: (screen, params) => {
      // If it's a tab screen, use local navigation
      if (tabs.some(tab => tab.name === screen)) {
        setActiveTab(screen);
        // Store params for the target screen
        if (params) {
          setRouteParams(prev => ({ ...prev, [screen]: params }));
        }
      } else {
        // Otherwise use stack navigation for Login, Signup, etc.
        stackNavigation.navigate(screen, params);
      }
    },
    replace: (screen, params) => {
      stackNavigation.replace(screen, params);
    },
    goBack: () => {
      stackNavigation.goBack();
    },
  };

  return (
    <View style={{ flex: 1, backgroundColor: colors.background }}>
      <ActiveComponent 
        navigation={enhancedNavigation} 
        route={{ params: routeParams[activeTab] || {} }} 
      />
      
      {/* Bottom Navigation Bar */}
      <View style={[styles.bottomBar, { backgroundColor: colors.card, borderTopColor: colors.border }]}>
        {tabs.map((tab) => (
          <TouchableOpacity
            key={tab.name}
            style={styles.tabButton}
            onPress={() => {
              setActiveTab(tab.name);
              // Clear params when manually switching tabs
              setRouteParams(prev => ({ ...prev, [tab.name]: {} }));
            }}
          >
            <View style={[
              styles.tabIconContainer,
              activeTab === tab.name && { backgroundColor: colors.primary + '20' }
            ]}>
              <Text style={styles.tabIcon}>{tab.icon}</Text>
            </View>
            <Text style={[
              styles.tabLabel,
              { color: activeTab === tab.name ? colors.primary : colors.textSecondary }
            ]}>
              {tab.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

function AppNavigator() {
  const { user, loading } = useAuth();
  const { colors } = useTheme();
  const [hasSeenOnboarding, setHasSeenOnboarding] = React.useState(false);

  // Check if user has seen onboarding
  React.useEffect(() => {
    const checkOnboarding = async () => {
      try {
        const AsyncStorage = (await import('@react-native-async-storage/async-storage')).default;
        const seen = await AsyncStorage.getItem('hasSeenOnboarding');
        setHasSeenOnboarding(seen === 'true');
      } catch (error) {
        console.error('Error checking onboarding:', error);
      }
    };
    checkOnboarding();
  }, []);

  // Show loading screen while checking auth
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: colors.background }}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 16, color: colors.text }}>Loading...</Text>
      </View>
    );
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: 'fade',
      }}
      initialRouteName={user ? 'Main' : (hasSeenOnboarding ? 'Login' : 'Splash')}
    >
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Onboarding" component={OnboardingScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Main" component={BottomTabNavigator} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <NavigationContainer>
          <AppNavigator />
        </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    height: 80,
    borderTopWidth: 1,
    paddingBottom: 10,
    paddingTop: 8,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
  },
  tabIcon: {
    fontSize: 24,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
});

