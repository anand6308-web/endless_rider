import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Picker } from '@react-native-picker/picker';
import { useAppStore } from '../../store/appStore';
import { t } from '../../constants/i18n';
import { SessionConfig } from '../../types';

export default function HomeScreen() {
  const router = useRouter();
  const { userProfile } = useAppStore();
  const locale = (userProfile?.locale || 'en-US') as 'en-US' | 'en-IN' | 'te-IN';
  
  const [selectedTrack, setSelectedTrack] = useState(userProfile?.selectedTrack || 'numbers');
  const [selectedTime, setSelectedTime] = useState(userProfile?.dailyTime || 5);
  const [selectedMode, setSelectedMode] = useState<'calm' | 'game'>('calm');

  const tracks = [
    { value: 'numbers', label: t('track.numbers', locale), icon: 'calculator', color: '#3b82f6' },
    { value: 'names', label: t('track.names', locale), icon: 'people', color: '#8b5cf6' },
    { value: 'focus', label: t('track.focus', locale), icon: 'eye', color: '#10b981' },
    { value: 'cooking', label: 'Cooking', icon: 'restaurant', color: '#f59e0b' },
    { value: 'politics', label: 'Politics', icon: 'flag', color: '#ec4899' },
    { value: 'farming', label: 'Farming', icon: 'leaf', color: '#22c55e' },
    { value: 'custom', label: t('track.custom', locale), icon: 'shuffle', color: '#f59e0b' },
    { value: 'surprise', label: t('track.surprise', locale), icon: 'gift', color: '#ec4899' },
  ];

  const handleStartSession = () => {
    const sessionConfig: SessionConfig = {
      track: selectedTrack,
      duration: selectedTime,
      mode: selectedMode,
    };

    // Navigate to session screen
    router.push({
      pathname: '/session',
      params: {
        track: selectedTrack,
        duration: selectedTime.toString(),
        mode: selectedMode,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Good Morning! 🌅</Text>
            <Text style={styles.subtitle}>Ready to train your brain?</Text>
          </View>
          <TouchableOpacity style={styles.notificationButton}>
            <Ionicons name="notifications-outline" size={24} color="#cbd5e1" />
          </TouchableOpacity>
        </View>

        {/* Daily Streak Card */}
        <View style={styles.streakCard}>
          <View style={styles.streakIcon}>
            <Text style={styles.fireEmoji}>🔥</Text>
          </View>
          <View style={styles.streakInfo}>
            <Text style={styles.streakNumber}>0 Days</Text>
            <Text style={styles.streakLabel}>Current Streak</Text>
          </View>
          <TouchableOpacity style={styles.streakButton}>
            <Text style={styles.streakButtonText}>Details</Text>
          </TouchableOpacity>
        </View>

        {/* Session Configuration */}
        <View style={styles.configSection}>
          <Text style={styles.sectionTitle}>{t('home.title', locale)}</Text>
          
          {/* Track Selection */}
          <View style={styles.configCard}>
            <Text style={styles.configLabel}>
              <Ionicons name="layers-outline" size={16} color="#94a3b8" /> {t('home.track', locale)}
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tracksScroll}>
              {tracks.map((track) => (
                <TouchableOpacity
                  key={track.value}
                  style={[
                    styles.trackChip,
                    selectedTrack === track.value && { ...styles.trackChipActive, borderColor: track.color },
                  ]}
                  onPress={() => setSelectedTrack(track.value)}
                >
                  <Ionicons
                    name={track.icon as any}
                    size={20}
                    color={selectedTrack === track.value ? track.color : '#64748b'}
                  />
                  <Text
                    style={[
                      styles.trackChipText,
                      selectedTrack === track.value && { color: '#ffffff' },
                    ]}
                  >
                    {track.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Time Selection */}
          <View style={styles.configCard}>
            <Text style={styles.configLabel}>
              <Ionicons name="time-outline" size={16} color="#94a3b8" /> {t('home.time', locale)}
            </Text>
            <View style={styles.timeOptions}>
              {[2, 5, 10].map((time) => (
                <TouchableOpacity
                  key={time}
                  style={[
                    styles.timeChip,
                    selectedTime === time && styles.timeChipActive,
                  ]}
                  onPress={() => setSelectedTime(time as 2 | 5 | 10)}
                >
                  <Text
                    style={[
                      styles.timeChipText,
                      selectedTime === time && styles.timeChipTextActive,
                    ]}
                  >
                    {time} min
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Mode Selection */}
          <View style={styles.configCard}>
            <Text style={styles.configLabel}>
              <Ionicons name="musical-notes-outline" size={16} color="#94a3b8" /> {t('home.mode', locale)}
            </Text>
            <View style={styles.modeOptions}>
              <TouchableOpacity
                style={[
                  styles.modeChip,
                  selectedMode === 'calm' && styles.modeChipActive,
                ]}
                onPress={() => setSelectedMode('calm')}
              >
                <Ionicons
                  name="flower-outline"
                  size={20}
                  color={selectedMode === 'calm' ? '#6366f1' : '#64748b'}
                />
                <Text
                  style={[
                    styles.modeChipText,
                    selectedMode === 'calm' && styles.modeChipTextActive,
                  ]}
                >
                  {t('mode.calm', locale)}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.modeChip,
                  selectedMode === 'game' && styles.modeChipActive,
                ]}
                onPress={() => setSelectedMode('game')}
              >
                <Ionicons
                  name="game-controller-outline"
                  size={20}
                  color={selectedMode === 'game' ? '#6366f1' : '#64748b'}
                />
                <Text
                  style={[
                    styles.modeChipText,
                    selectedMode === 'game' && styles.modeChipTextActive,
                  ]}
                >
                  {t('mode.game', locale)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Start Button */}
        <TouchableOpacity style={styles.startButton} onPress={handleStartSession}>
          <Text style={styles.startButtonText}>{t('home.startSession', locale)}</Text>
          <Ionicons name="arrow-forward" size={24} color="#ffffff" />
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsSection}>
          <View style={styles.statCard}>
            <Ionicons name="trophy-outline" size={24} color="#f59e0b" />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle-outline" size={24} color="#10b981" />
            <Text style={styles.statValue}>0%</Text>
            <Text style={styles.statLabel}>Accuracy</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="trending-up-outline" size={24} color="#6366f1" />
            <Text style={styles.statValue}>0</Text>
            <Text style={styles.statLabel}>Level</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  subtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
  notificationButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  streakIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#312e81',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  fireEmoji: {
    fontSize: 32,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  streakLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 2,
  },
  streakButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#312e81',
  },
  streakButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#818cf8',
  },
  configSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  configCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  configLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
    fontWeight: '600',
  },
  tracksScroll: {
    flexDirection: 'row',
  },
  trackChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#0f172a',
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#334155',
  },
  trackChipActive: {
    backgroundColor: '#312e81',
  },
  trackChipText: {
    fontSize: 14,
    color: '#cbd5e1',
    marginLeft: 8,
  },
  timeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeChip: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#0f172a',
    marginHorizontal: 4,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  timeChipActive: {
    backgroundColor: '#312e81',
    borderColor: '#6366f1',
  },
  timeChipText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cbd5e1',
  },
  timeChipTextActive: {
    color: '#ffffff',
  },
  modeOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modeChip: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#0f172a',
    marginHorizontal: 4,
    borderWidth: 2,
    borderColor: '#334155',
  },
  modeChipActive: {
    backgroundColor: '#312e81',
    borderColor: '#6366f1',
  },
  modeChipText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#cbd5e1',
    marginLeft: 8,
  },
  modeChipTextActive: {
    color: '#ffffff',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6366f1',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    marginTop: 4,
  },
});
