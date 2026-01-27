import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/appStore';
import { t } from '../../constants/i18n';
import { loadAttempts } from '../../utils/storage';
import { Attempt } from '../../types';

const { width } = Dimensions.get('window');

export default function ProgressScreen() {
  const { userProfile, skillProfile, userId } = useAppStore();
  const locale = (userProfile?.locale || 'en-US') as 'en-US' | 'en-IN' | 'te-IN';
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [stats, setStats] = useState({
    totalSessions: 0,
    weeklyStreak: 0,
    averageAccuracy: 0,
    averageResponseTime: 0,
  });

  useEffect(() => {
    loadProgress();
  }, [userId]);

  const loadProgress = async () => {
    try {
      const userAttempts = await getUserAttempts(userId, 100);
      setAttempts(userAttempts);

      // Calculate stats
      const totalSessions = userAttempts.length;
      const successfulAttempts = userAttempts.filter(a => a.result).length;
      const averageAccuracy = totalSessions > 0 ? (successfulAttempts / totalSessions) * 100 : 0;
      const averageResponseTime =
        totalSessions > 0
          ? userAttempts.reduce((sum, a) => sum + a.responseTimeMs, 0) / totalSessions
          : 0;

      // Calculate weekly streak (simplified)
      const uniqueDays = new Set(
        userAttempts.map(a => a.timestamp.toISOString().split('T')[0])
      );
      const weeklyStreak = uniqueDays.size;

      setStats({
        totalSessions,
        weeklyStreak,
        averageAccuracy,
        averageResponseTime,
      });
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  };

  const getSkillLevel = (score: number): string => {
    if (score < 20) return 'Beginner';
    if (score < 40) return 'Intermediate';
    if (score < 60) return 'Advanced';
    if (score < 80) return 'Expert';
    return 'Master';
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('progress.weeklyStreak', locale)}</Text>
          <Text style={styles.subtitle}>Track your memory improvement</Text>
        </View>

        {/* Main Stats */}
        <View style={styles.mainStatsContainer}>
          <View style={styles.largeStatCard}>
            <View style={styles.largeStatIcon}>
              <Text style={styles.largeStatEmoji}>🔥</Text>
            </View>
            <Text style={styles.largeStatValue}>{stats.weeklyStreak}</Text>
            <Text style={styles.largeStatLabel}>Day Streak</Text>
          </View>
        </View>

        {/* Quick Stats Grid */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="trophy" size={24} color="#f59e0b" />
            <Text style={styles.statValue}>{stats.totalSessions}</Text>
            <Text style={styles.statLabel}>{t('progress.totalSessions', locale)}</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={24} color="#10b981" />
            <Text style={styles.statValue}>{stats.averageAccuracy.toFixed(0)}%</Text>
            <Text style={styles.statLabel}>{t('progress.accuracy', locale)}</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={24} color="#6366f1" />
            <Text style={styles.statValue}>{(stats.averageResponseTime / 1000).toFixed(1)}s</Text>
            <Text style={styles.statLabel}>{t('progress.avgResponseTime', locale)}</Text>
          </View>
        </View>

        {/* Skill Profiles */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skill Progress</Text>
          
          <View style={styles.skillCard}>
            <View style={styles.skillHeader}>
              <Ionicons name="calculator" size={24} color="#3b82f6" />
              <View style={styles.skillInfo}>
                <Text style={styles.skillName}>Number Recall</Text>
                <Text style={styles.skillLevel}>
                  {getSkillLevel(skillProfile?.numberRecallScore || 0)}
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${skillProfile?.numberRecallScore || 0}%`, backgroundColor: '#3b82f6' },
                ]}
              />
            </View>
            <Text style={styles.skillScore}>{skillProfile?.numberRecallScore || 0} / 100</Text>
          </View>

          <View style={styles.skillCard}>
            <View style={styles.skillHeader}>
              <Ionicons name="person" size={24} color="#8b5cf6" />
              <View style={styles.skillInfo}>
                <Text style={styles.skillName}>Name & Face Memory</Text>
                <Text style={styles.skillLevel}>
                  {getSkillLevel(skillProfile?.nameFaceScore || 0)}
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${skillProfile?.nameFaceScore || 0}%`, backgroundColor: '#8b5cf6' },
                ]}
              />
            </View>
            <Text style={styles.skillScore}>{skillProfile?.nameFaceScore || 0} / 100</Text>
          </View>

          <View style={styles.skillCard}>
            <View style={styles.skillHeader}>
              <Ionicons name="eye" size={24} color="#10b981" />
              <View style={styles.skillInfo}>
                <Text style={styles.skillName}>Focus & Attention</Text>
                <Text style={styles.skillLevel}>
                  {getSkillLevel(skillProfile?.focusScore || 0)}
                </Text>
              </View>
            </View>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${skillProfile?.focusScore || 0}%`, backgroundColor: '#10b981' },
                ]}
              />
            </View>
            <Text style={styles.skillScore}>{skillProfile?.focusScore || 0} / 100</Text>
          </View>
        </View>

        {/* Recent Activity */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          {attempts.length === 0 ? (
            <View style={styles.emptyState}>
              <Ionicons name="fitness" size={48} color="#334155" />
              <Text style={styles.emptyStateText}>No sessions yet</Text>
              <Text style={styles.emptyStateSubtext}>Start training to see your progress here</Text>
            </View>
          ) : (
            attempts.slice(0, 10).map((attempt, index) => (
              <View key={attempt.id || index} style={styles.activityCard}>
                <View style={styles.activityIcon}>
                  <Ionicons
                    name={attempt.result ? 'checkmark-circle' : 'close-circle'}
                    size={24}
                    color={attempt.result ? '#10b981' : '#ef4444'}
                  />
                </View>
                <View style={styles.activityInfo}>
                  <Text style={styles.activityExercise}>{attempt.exerciseId}</Text>
                  <Text style={styles.activityTime}>
                    {new Date(attempt.timestamp).toLocaleDateString()} •{' '}
                    {(attempt.responseTimeMs / 1000).toFixed(1)}s
                  </Text>
                </View>
                <Text style={styles.activityScore}>
                  {attempt.score?.toFixed(0) || 0} pts
                </Text>
              </View>
            ))
          )}
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
    marginBottom: 24,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
  },
  mainStatsContainer: {
    marginBottom: 24,
  },
  largeStatCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
  },
  largeStatIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#312e81',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  largeStatEmoji: {
    fontSize: 48,
  },
  largeStatValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  largeStatLabel: {
    fontSize: 16,
    color: '#94a3b8',
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
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
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 11,
    color: '#94a3b8',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  skillCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  skillHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  skillInfo: {
    flex: 1,
    marginLeft: 12,
  },
  skillName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  skillLevel: {
    fontSize: 13,
    color: '#94a3b8',
  },
  progressBar: {
    height: 8,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
  },
  skillScore: {
    fontSize: 13,
    color: '#64748b',
    textAlign: 'right',
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 8,
  },
  activityIcon: {
    marginRight: 12,
  },
  activityInfo: {
    flex: 1,
  },
  activityExercise: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  activityTime: {
    fontSize: 12,
    color: '#94a3b8',
  },
  activityScore: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
  },
  emptyStateText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#cbd5e1',
    marginTop: 16,
    marginBottom: 4,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#64748b',
  },
});
