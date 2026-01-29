import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppStore } from '../../store/appStore';
import { t } from '../../constants/i18n';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width * 0.75;

export default function HomeScreen() {
  const router = useRouter();
  const { userProfile } = useAppStore();
  const locale = (userProfile?.locale || 'en-US') as any;

  const tracks = [
    { value: 'numbers', label: t('track.numbers', locale), color: '#3b82f6', emoji: '🔢' },
    { value: 'cooking', label: t('track.cooking', locale), color: '#f59e0b', emoji: '🍳' },
    { value: 'farming', label: t('track.farming', locale), color: '#22c55e', emoji: '🌾' },
    { value: 'politics', label: t('track.politics', locale), color: '#ec4899', emoji: '🏛️' },
  ];

  const handleTrackSelect = (track: string) => {
    router.push(`/session?track=${track}`);
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with Settings and Profile */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('home.title', locale)}</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(tabs)/settings')}>
            <Ionicons name="settings-outline" size={28} color="#cbd5e1" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={() => router.push('/(tabs)/profile')}>
            <Ionicons name="person-circle-outline" size={28} color="#cbd5e1" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Greeting */}
      <View style={styles.greetingSection}>
        <Text style={styles.greeting}>{t('greeting.goodMorning', locale)} 🌅</Text>
        <Text style={styles.subtitle}>{t('greeting.readyToTrain', locale)}</Text>
      </View>

      {/* Section Title */}
      <Text style={styles.sectionTitle}>{t('home.selectTrack', locale)}</Text>

      {/* Horizontal Track Cards */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.tracksScroll}
        snapToInterval={CARD_WIDTH + 24}
        decelerationRate="fast"
        pagingEnabled={false}
      >
        {tracks.map((track, index) => (
          <View key={track.value} style={[styles.trackCardWrapper, index === 0 && styles.firstCard]}>
            <TouchableOpacity
              style={[styles.trackCard, { borderColor: track.color }]}
              onPress={() => handleTrackSelect(track.value)}
              activeOpacity={0.7}
            >
              <View style={[styles.trackIconBg, { backgroundColor: track.color + '20' }]}>
                <Text style={styles.trackEmoji}>{track.emoji}</Text>
              </View>
              <Text style={styles.trackLabel}>{track.label}</Text>
              <View style={[styles.startButton, { backgroundColor: track.color }]}>
                <Text style={styles.startButtonText}>{t('button.start', locale)}</Text>
                <Ionicons name="arrow-forward" size={20} color="#ffffff" />
              </View>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      {/* Daily Streak */}
      <View style={styles.streakCard}>
        <View style={styles.streakIcon}>
          <Text style={styles.fireEmoji}>🔥</Text>
        </View>
        <View style={styles.streakInfo}>
          <Text style={styles.streakNumber}>0 {t('time.days', locale)}</Text>
          <Text style={styles.streakLabel}>{t('status.currentStreak', locale)}</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  headerButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  iconButton: {
    padding: 8,
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#ffffff',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tracksScroll: {
    paddingRight: 20,
  },
  trackCardWrapper: {
    marginLeft: 24,
  },
  firstCard: {
    marginLeft: 20,
  },
  trackCard: {
    width: CARD_WIDTH,
    backgroundColor: '#1e293b',
    borderRadius: 20,
    borderWidth: 3,
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 280,
  },
  trackIconBg: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  trackEmoji: {
    fontSize: 56,
  },
  trackLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 24,
    textAlign: 'center',
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
    gap: 8,
  },
  startButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 20,
    marginTop: 24,
    gap: 16,
  },
  streakIcon: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#312e81',
    justifyContent: 'center',
    alignItems: 'center',
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
    marginTop: 4,
  },
});
