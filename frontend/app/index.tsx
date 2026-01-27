import { useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppStore } from '../store/appStore';
import { getUserProfile } from '../utils/database';

export default function SplashScreen() {
  const router = useRouter();
  const { setUserProfile, setIsOnboarded, setUserId, userId } = useAppStore();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      try {
        // Generate or retrieve user ID
        const storedUserId = userId || `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
        setUserId(storedUserId);

        // Check if user profile exists
        const profile = await getUserProfile(storedUserId);
        
        if (profile) {
          setUserProfile(profile);
          setIsOnboarded(true);
          // Navigate to main app
          setTimeout(() => {
            router.replace('/(tabs)');
          }, 1000);
        } else {
          // Navigate to onboarding
          setTimeout(() => {
            router.replace('/onboarding');
          }, 1000);
        }
      } catch (error) {
        console.error('Error checking onboarding status:', error);
        // Default to onboarding on error
        setTimeout(() => {
          router.replace('/onboarding');
        }, 1000);
      }
    };

    checkOnboardingStatus();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Morning Memory Gym</Text>
      <Text style={styles.subtitle}>Train Your Brain Daily</Text>
      <ActivityIndicator size="large" color="#6366f1" style={styles.loader} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    color: '#94a3b8',
    marginBottom: 32,
  },
  loader: {
    marginTop: 24,
  },
});
