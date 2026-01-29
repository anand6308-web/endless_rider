import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
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
  const [selectedTime, setSelectedTime] = useState<2 | 5 | 10>(5);
  const [voiceMode, setVoiceMode] = useState(false);

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

  const timeOptions = [2, 5, 10] as const;

  const handleComplete = async () => {
    try {
      // Create user profile
      const userProfile: UserProfile = {
        userId,
        locale: selectedLocale,
        selectedTrack,
        dailyTime: selectedTime,
        voiceMode,
        textSize: 'normal',
        highContrast: false,
        notificationsEnabled: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      await saveUserProfile(userProfile);
      setUserProfile(userProfile);
      setCurrentLocale(selectedLocale);

      // Create skill profile
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

      // Navigate to main app
      router.replace('/(tabs)');
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        // STEP 1: Language Selection (FIRST SCREEN)
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.emoji}>🌍</Text>
            <Text style={styles.title}>{t('onboarding.selectLanguage', selectedLocale)}</Text>
            <Text style={styles.description}>
              {t('onboarding.languageDescription', selectedLocale)}
            </Text>
            <ScrollView style={styles.optionsContainer}>
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
                setStep(1); // Go directly to track selection
              }}
            >
              <Text style={styles.primaryButtonText}>{t('button.next', selectedLocale)}</Text>
            </TouchableOpacity>
          </View>
        );

      case 1:
        // STEP 2: Track Selection (IMMEDIATE AFTER LANGUAGE)
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.emoji}>🎯</Text>
            <Text style={styles.title}>{t('onboarding.selectTrack', selectedLocale)}</Text>
            <Text style={styles.description}>
              {t('onboarding.trackDescription', selectedLocale)}
            </Text>
            <ScrollView style={styles.optionsContainer}>
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
            <TouchableOpacity style={styles.primaryButton} onPress={() => setStep(2)}>
              <Text style={styles.primaryButtonText}>{t('button.next', selectedLocale)}</Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('onboarding.selectLocale', selectedLocale)}</Text>
            <View style={styles.optionsContainer}>
              {locales.map((locale) => (
                <TouchableOpacity
                  key={locale.code}
                  style={[
                    styles.optionButton,
                    selectedLocale === locale.code && styles.optionButtonActive,
                  ]}
                  onPress={() => setSelectedLocale(locale.code)}
                >
                  <Text
                    style={[
                      styles.optionText,
                      selectedLocale === locale.code && styles.optionTextActive,
                    ]}
                  >
                    {locale.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setStep(2)}>
              <Text style={styles.primaryButtonText}>{t('common.continue', selectedLocale)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(0)}>
              <Text style={styles.secondaryButtonText}>{t('common.back', selectedLocale)}</Text>
            </TouchableOpacity>
          </View>
        );

      case 2:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('onboarding.selectTrack', selectedLocale)}</Text>
            <View style={styles.optionsContainer}>
              {tracks.map((track) => (
                <TouchableOpacity
                  key={track.id}
                  style={[
                    styles.trackButton,
                    selectedTrack === track.id && styles.trackButtonActive,
                  ]}
                  onPress={() => setSelectedTrack(track.id)}
                >
                  <Text style={styles.trackEmoji}>{track.icon}</Text>
                  <Text
                    style={[
                      styles.trackText,
                      selectedTrack === track.id && styles.trackTextActive,
                    ]}
                  >
                    {track.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={() => setStep(3)}>
              <Text style={styles.primaryButtonText}>{t('common.continue', selectedLocale)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(1)}>
              <Text style={styles.secondaryButtonText}>{t('common.back', selectedLocale)}</Text>
            </TouchableOpacity>
          </View>
        );

      case 3:
        return (
          <View style={styles.stepContainer}>
            <Text style={styles.stepTitle}>{t('onboarding.selectTime', selectedLocale)}</Text>
            <View style={styles.timeContainer}>
              {timeOptions.map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeButton,
                    selectedTime === time && styles.timeButtonActive,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Text
                    style={[
                      styles.timeNumber,
                      selectedTime === time && styles.timeNumberActive,
                    ]}
                  >
                    {time}
                  </Text>
                  <Text
                    style={[
                      styles.timeLabel,
                      selectedTime === time && styles.timeLabelActive,
                    ]}
                  >
                    {t('home.minutes', selectedLocale)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.voiceContainer}>
              <View style={styles.voiceInfo}>
                <Text style={styles.voiceTitle}>{t('onboarding.voiceMode', selectedLocale)}</Text>
                <Text style={styles.voiceDescription}>Read prompts aloud and allow voice input</Text>
              </View>
              <Switch
                value={voiceMode}
                onValueChange={setVoiceMode}
                trackColor={{ false: '#334155', true: '#6366f1' }}
                thumbColor={voiceMode ? '#ffffff' : '#94a3b8'}
              />
            </View>

            <TouchableOpacity style={styles.primaryButton} onPress={handleComplete}>
              <Text style={styles.primaryButtonText}>{t('onboarding.getStarted', selectedLocale)}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.secondaryButton} onPress={() => setStep(2)}>
              <Text style={styles.secondaryButtonText}>{t('common.back', selectedLocale)}</Text>
            </TouchableOpacity>
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {renderStep()}
      </ScrollView>
      
      {/* Progress indicator */}
      <View style={styles.progressContainer}>
        {[0, 1, 2, 3].map((i) => (
          <View
            key={i}
            style={[
              styles.progressDot,
              step >= i && styles.progressDotActive,
            ]}
          />
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 24,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 64,
    textAlign: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 16,
  },
  stepTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 32,
  },
  description: {
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
  },
  disclaimer: {
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    marginBottom: 32,
    fontStyle: 'italic',
  },
  optionsContainer: {
    marginBottom: 32,
  },
  optionButton: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  optionButtonActive: {
    borderColor: '#6366f1',
    backgroundColor: '#312e81',
  },
  optionText: {
    fontSize: 18,
    color: '#cbd5e1',
    textAlign: 'center',
  },
  optionTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  trackButton: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackButtonActive: {
    borderColor: '#6366f1',
    backgroundColor: '#312e81',
  },
  trackEmoji: {
    fontSize: 32,
    marginRight: 16,
  },
  trackText: {
    fontSize: 18,
    color: '#cbd5e1',
  },
  trackTextActive: {
    color: '#ffffff',
    fontWeight: '600',
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  timeButton: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 6,
    borderWidth: 2,
    borderColor: '#334155',
    alignItems: 'center',
  },
  timeButtonActive: {
    borderColor: '#6366f1',
    backgroundColor: '#312e81',
  },
  timeNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#cbd5e1',
    marginBottom: 4,
  },
  timeNumberActive: {
    color: '#ffffff',
  },
  timeLabel: {
    fontSize: 14,
    color: '#64748b',
  },
  timeLabelActive: {
    color: '#94a3b8',
  },
  voiceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 32,
  },
  voiceInfo: {
    flex: 1,
    marginRight: 16,
  },
  voiceTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 4,
  },
  voiceDescription: {
    fontSize: 14,
    color: '#94a3b8',
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginBottom: 12,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 24,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#334155',
    marginHorizontal: 4,
  },
  progressDotActive: {
    backgroundColor: '#6366f1',
    width: 24,
  },
});
