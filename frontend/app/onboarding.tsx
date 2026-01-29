import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppStore } from '../store/appStore';
import { saveUserProfile, saveSkillProfile } from '../utils/storage';
import { t, LocaleCode } from '../constants/i18n';
import { UserProfile, SkillProfile } from '../types';

export default function OnboardingScreen() {
  const router = useRouter();
  const { userId, setUserProfile, setSkillProfile, setIsOnboarded, setCurrentLocale } = useAppStore();
  
  const [step, setStep] = useState(0);
  const [selectedLocale, setSelectedLocale] = useState<LocaleCode>('en-US');
  const [selectedTrack, setSelectedTrack] = useState<'numbers' | 'names' | 'focus' | 'cooking' | 'farming'>('numbers');

  const locales: { code: LocaleCode; name: string }[] = [
    { code: 'en-US', name: 'English (US)' },
    { code: 'en-IN', name: 'English (India)' },
    { code: 'hi-IN', name: 'हिन्दी (Hindi)' },
    { code: 'te-IN', name: 'తెలుగు (Telugu)' },
    { code: 'ta-IN', name: 'தமிழ் (Tamil)' },
    { code: 'kn-IN', name: 'ಕನ್ನಡ (Kannada)' },
    { code: 'ml-IN', name: 'മലയാളം (Malayalam)' },
    { code: 'mr-IN', name: 'मराठी (Marathi)' },
    { code: 'bn-IN', name: 'বাংলা (Bengali)' },
    { code: 'gu-IN', name: 'ગુજરાતી (Gujarati)' },
    { code: 'pa-IN', name: 'ਪੰਜਾਬੀ (Punjabi)' },
  ];

  const tracks = [
    { id: 'numbers' as const, name: t('track.numbers', selectedLocale), icon: '🔢' },
    { id: 'names' as const, name: t('track.names', selectedLocale), icon: '👤' },
    { id: 'focus' as const, name: t('track.focus', selectedLocale), icon: '🎯' },
    { id: 'cooking' as const, name: t('track.cooking', selectedLocale), icon: '🍳' },
    { id: 'farming' as const, name: t('track.farming', selectedLocale), icon: '🌾' },
  ];

  const handleComplete = async () => {
    try {
      const userProfile: UserProfile = {
        userId,
        locale: selectedLocale,
        selectedTrack,
        dailyTime: 5,
        voiceMode: false,
        textSize: 'normal',
        highContrast: false,
        notificationsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await saveUserProfile(userProfile);
      setUserProfile(userProfile);
      setCurrentLocale(selectedLocale);

      const skillProfile: SkillProfile = {
        userId,
        numberRecallScore: 0,
        nameFaceScore: 0,
        focusScore: 0,
        updatedAt: new Date(),
      };

      await saveSkillProfile(skillProfile);
      setSkillProfile(skillProfile);
      setIsOnboarded(true);

      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        // STEP 1: Language Selection
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.emoji}>🌍</Text>
            <Text style={styles.title}>{t('onboarding.selectLanguage', selectedLocale)}</Text>
            <Text style={styles.description}>
              {t('onboarding.languageDescription', selectedLocale)}
            </Text>
            <ScrollView style={styles.optionsScroll} contentContainerStyle={styles.optionsContainer}>
              {locales.map((locale) => (
                <TouchableOpacity
                  key={locale.code}
                  style={[
                    styles.optionCard,
                    selectedLocale === locale.code && styles.optionCardSelected,
                  ]}
                  onPress={() => setSelectedLocale(locale.code)}
                >
                  <Text style={styles.optionText}>{locale.name}</Text>
                  {selectedLocale === locale.code && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={() => {
                setCurrentLocale(selectedLocale);
                setStep(1);
              }}
            >
              <Text style={styles.primaryButtonText}>{t('button.next', selectedLocale)}</Text>
            </TouchableOpacity>
          </View>
        );

      case 1:
        // STEP 2: Track Selection (LAST STEP - goes directly to app)
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.emoji}>🎯</Text>
            <Text style={styles.title}>{t('onboarding.selectTrack', selectedLocale)}</Text>
            <Text style={styles.description}>
              {t('onboarding.trackDescription', selectedLocale)}
            </Text>
            <ScrollView style={styles.optionsScroll} contentContainerStyle={styles.optionsContainer}>
              {tracks.map((track) => (
                <TouchableOpacity
                  key={track.id}
                  style={[
                    styles.optionCard,
                    selectedTrack === track.id && styles.optionCardSelected,
                  ]}
                  onPress={() => setSelectedTrack(track.id)}
                >
                  <Text style={styles.optionIcon}>{track.icon}</Text>
                  <Text style={styles.optionText}>{track.name}</Text>
                  {selectedTrack === track.id && (
                    <Text style={styles.checkmark}>✓</Text>
                  )}
                </TouchableOpacity>
              ))}
            </ScrollView>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleComplete}
            >
              <Text style={styles.primaryButtonText}>{t('button.start', selectedLocale)}</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {renderStep()}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  stepContainer: {
    flex: 1,
    padding: 24,
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  optionsScroll: {
    flex: 1,
  },
  optionsContainer: {
    gap: 12,
    paddingBottom: 24,
  },
  optionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  optionCardSelected: {
    borderColor: '#6366f1',
    backgroundColor: '#312e81',
  },
  optionIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  optionText: {
    fontSize: 18,
    color: '#ffffff',
    flex: 1,
  },
  checkmark: {
    fontSize: 24,
    color: '#6366f1',
    fontWeight: 'bold',
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 18,
    alignItems: 'center',
    marginTop: 16,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
