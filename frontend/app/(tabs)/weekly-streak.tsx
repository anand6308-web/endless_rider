import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/appStore';
import { t } from '../../constants/i18n';

export default function WeeklyStreakScreen() {
  const { userProfile } = useAppStore();
  const locale = (userProfile?.locale || 'en-US') as any;

  const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const completedDays = [true, true, false, false, false, false, false]; // Example data

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>{t('weeklyStreak.title', locale)}</Text>
        <Text style={styles.subtitle}>{t('weeklyStreak.subtitle', locale)}</Text>

        {/* Week View */}
        <View style={styles.weekContainer}>
          {weekDays.map((day, index) => (
            <View key={day} style={styles.dayContainer}>
              <Text style={styles.dayLabel}>{day}</Text>
              <View style={[
                styles.dayCircle,
                completedDays[index] && styles.dayCircleCompleted
              ]}>
                {completedDays[index] && (
                  <Ionicons name="checkmark" size={24} color="#ffffff" />
                )}
              </View>
            </View>
          ))}
        </View>

        {/* Encouragement Message */}
        <View style={styles.messageCard}>
          <Text style={styles.messageEmoji}>🎉</Text>
          <Text style={styles.messageTitle}>{t('weeklyStreak.keepGoing', locale)}</Text>
          <Text style={styles.messageText}>{t('weeklyStreak.encouragement', locale)}</Text>
        </View>

        {/* Current Streak */}
        <View style={styles.streakCard}>
          <View style={styles.streakIconContainer}>
            <Text style={styles.fireEmoji}>🔥</Text>
          </View>
          <View style={styles.streakInfo}>
            <Text style={styles.streakNumber}>0 {t('time.days', locale)}</Text>
            <Text style={styles.streakLabel}>{t('status.currentStreak', locale)}</Text>
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
  content: {
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 32,
  },
  weekContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  dayContainer: {
    alignItems: 'center',
    gap: 12,
  },
  dayLabel: {
    fontSize: 14,
    color: '#94a3b8',
    fontWeight: '600',
  },
  dayCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#1e293b',
    borderWidth: 2,
    borderColor: '#334155',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dayCircleCompleted: {
    backgroundColor: '#6366f1',
    borderColor: '#6366f1',
  },
  messageCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginBottom: 24,
  },
  messageEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  messageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
    textAlign: 'center',
  },
  messageText: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 24,
  },
  streakCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    gap: 16,
  },
  streakIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#312e81',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fireEmoji: {
    fontSize: 36,
  },
  streakInfo: {
    flex: 1,
  },
  streakNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  streakLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 4,
  },
});
