import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function SessionResultsScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();

  const totalAttempts = parseInt(params.totalAttempts as string) || 0;
  const successfulAttempts = parseInt(params.successfulAttempts as string) || 0;
  const averageResponseTime = parseInt(params.averageResponseTime as string) || 0;
  const accuracyPercentage = parseInt(params.accuracyPercentage as string) || 0;

  const getPerformanceMessage = () => {
    if (accuracyPercentage >= 90) return { emoji: '🏆', message: 'Outstanding!', color: '#10b981' };
    if (accuracyPercentage >= 75) return { emoji: '⭐', message: 'Great Job!', color: '#6366f1' };
    if (accuracyPercentage >= 60) return { emoji: '👍', message: 'Good Work!', color: '#f59e0b' };
    return { emoji: '💪', message: 'Keep Practicing!', color: '#94a3b8' };
  };

  const performance = getPerformanceMessage();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Success Animation */}
        <View style={styles.celebrationContainer}>
          <Text style={styles.celebrationEmoji}>{performance.emoji}</Text>
          <Text style={[styles.celebrationTitle, { color: performance.color }]}>
            {performance.message}
          </Text>
          <Text style={styles.celebrationSubtitle}>Session Complete</Text>
        </View>

        {/* Main Stats */}
        <View style={styles.mainStatsContainer}>
          <View style={[styles.mainStatCard, { borderColor: performance.color }]}>
            <Text style={styles.mainStatValue}>{accuracyPercentage}%</Text>
            <Text style={styles.mainStatLabel}>Accuracy</Text>
          </View>
        </View>

        {/* Detailed Stats */}
        <View style={styles.statsGrid}>
          <View style={styles.statCard}>
            <Ionicons name="checkmark-circle" size={32} color="#10b981" />
            <Text style={styles.statValue}>{successfulAttempts}</Text>
            <Text style={styles.statLabel}>Correct</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="close-circle" size={32} color="#ef4444" />
            <Text style={styles.statValue}>{totalAttempts - successfulAttempts}</Text>
            <Text style={styles.statLabel}>Incorrect</Text>
          </View>
          <View style={styles.statCard}>
            <Ionicons name="time" size={32} color="#6366f1" />
            <Text style={styles.statValue}>{(averageResponseTime / 1000).toFixed(1)}s</Text>
            <Text style={styles.statLabel}>Avg. Time</Text>
          </View>
        </View>

        {/* Insights */}
        <View style={styles.insightsContainer}>
          <Text style={styles.insightsTitle}>💡 Insights</Text>
          {accuracyPercentage >= 85 ? (
            <Text style={styles.insightText}>
              Excellent! Your performance shows strong recall. Consider increasing difficulty for more challenge.
            </Text>
          ) : accuracyPercentage >= 70 ? (
            <Text style={styles.insightText}>
              Good progress! You're in the optimal learning zone. Keep practicing at this level to solidify your skills.
            </Text>
          ) : (
            <Text style={styles.insightText}>
              Don't worry, improvement comes with practice. Try focusing on one technique at a time and practice regularly.
            </Text>
          )}
        </View>

        {/* Memory Tips */}
        <View style={styles.tipsContainer}>
          <Text style={styles.tipsTitle}>🎯 Quick Tip</Text>
          <Text style={styles.tipText}>
            Spaced repetition works best with regular practice. Try to train at the same time each day for better results.
          </Text>
        </View>

        {/* Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity 
            style={styles.primaryButton} 
            onPress={() => router.push('/(tabs)')}
          >
            <Text style={styles.primaryButtonText}>Back to Home</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.secondaryButton} 
            onPress={() => router.push('/(tabs)/progress')}
          >
            <Text style={styles.secondaryButtonText}>View Progress</Text>
          </TouchableOpacity>
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
    padding: 24,
  },
  celebrationContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  celebrationEmoji: {
    fontSize: 80,
    marginBottom: 16,
  },
  celebrationTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  celebrationSubtitle: {
    fontSize: 18,
    color: '#94a3b8',
  },
  mainStatsContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  mainStatCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    borderWidth: 3,
    minWidth: 200,
  },
  mainStatValue: {
    fontSize: 64,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  mainStatLabel: {
    fontSize: 18,
    color: '#94a3b8',
    marginTop: 8,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
    textAlign: 'center',
  },
  insightsContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  insightsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  insightText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  tipsContainer: {
    backgroundColor: '#312e81',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
  },
  tipsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 12,
  },
  tipText: {
    fontSize: 15,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  actionsContainer: {
    gap: 12,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  secondaryButton: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#cbd5e1',
  },
});
