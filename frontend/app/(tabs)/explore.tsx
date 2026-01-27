import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/appStore';
import { t } from '../../constants/i18n';
import exercisesData from '../../constants/exercises.json';

export default function ExploreScreen() {
  const { userProfile } = useAppStore();
  const locale = (userProfile?.locale || 'en-US') as 'en-US' | 'en-IN' | 'te-IN';

  const { tracks, exercises } = exercisesData;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{t('nav.explore', locale)}</Text>
          <Text style={styles.subtitle}>Discover all training modules</Text>
        </View>

        {/* Tracks Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Training Tracks</Text>
          {tracks.map((track) => {
            const trackIcon = {
              calculator: 'calculator',
              person: 'person',
              eye: 'eye',
              shuffle: 'shuffle',
              gift: 'gift',
            }[track.icon] || 'star';

            const trackColor = {
              numbers: '#3b82f6',
              names: '#8b5cf6',
              focus: '#10b981',
              custom: '#f59e0b',
              surprise: '#ec4899',
            }[track.id] || '#6366f1';

            return (
              <TouchableOpacity key={track.id} style={styles.trackCard}>
                <View style={[styles.trackIconContainer, { backgroundColor: trackColor + '20' }]}>
                  <Ionicons name={trackIcon as any} size={32} color={trackColor} />
                </View>
                <View style={styles.trackInfo}>
                  <Text style={styles.trackName}>{track.name}</Text>
                  <Text style={styles.trackDescription}>{track.description}</Text>
                  <Text style={styles.trackExercises}>
                    {track.exerciseIds.length} exercise{track.exerciseIds.length !== 1 ? 's' : ''}
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={24} color="#64748b" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Exercises Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>All Exercises</Text>
          {exercises.map((exercise) => {
            const exerciseIcon = {
              number_recall: 'keypad',
              name_face: 'person-circle',
              focus_switch: 'swap-horizontal',
            }[exercise.type] || 'cube';

            return (
              <TouchableOpacity key={exercise.id} style={styles.exerciseCard}>
                <View style={styles.exerciseHeader}>
                  <View style={styles.exerciseIconContainer}>
                    <Ionicons name={exerciseIcon as any} size={24} color="#6366f1" />
                  </View>
                  <View style={styles.exerciseTitleContainer}>
                    <Text style={styles.exerciseName}>{exercise.name}</Text>
                    <Text style={styles.exerciseType}>
                      {exercise.type.replace('_', ' ').toUpperCase()}
                    </Text>
                  </View>
                  <TouchableOpacity style={styles.infoButton}>
                    <Ionicons name="information-circle-outline" size={24} color="#94a3b8" />
                  </TouchableOpacity>
                </View>
                <Text style={styles.exerciseDescription}>
                  Version {exercise.version} • Min. App v{exercise.minAppVersion}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Content Packs Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Content Packs</Text>
          <View style={styles.contentPackCard}>
            <View style={styles.contentPackHeader}>
              <Ionicons name="language" size={24} color="#6366f1" />
              <View style={styles.contentPackInfo}>
                <Text style={styles.contentPackName}>English (US)</Text>
                <Text style={styles.contentPackStatus}>Installed • v1.0.0</Text>
              </View>
              <View style={styles.installedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
            </View>
          </View>
          <View style={styles.contentPackCard}>
            <View style={styles.contentPackHeader}>
              <Ionicons name="language" size={24} color="#6366f1" />
              <View style={styles.contentPackInfo}>
                <Text style={styles.contentPackName}>English (India)</Text>
                <Text style={styles.contentPackStatus}>Installed • v1.0.0</Text>
              </View>
              <View style={styles.installedBadge}>
                <Ionicons name="checkmark-circle" size={20} color="#10b981" />
              </View>
            </View>
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
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 16,
  },
  trackCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  trackIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  trackInfo: {
    flex: 1,
  },
  trackName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 4,
  },
  trackDescription: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  trackExercises: {
    fontSize: 12,
    color: '#64748b',
  },
  exerciseCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  exerciseHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  exerciseIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#312e81',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  exerciseTitleContainer: {
    flex: 1,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  exerciseType: {
    fontSize: 12,
    color: '#818cf8',
  },
  infoButton: {
    padding: 4,
  },
  exerciseDescription: {
    fontSize: 13,
    color: '#64748b',
  },
  contentPackCard: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  contentPackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentPackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contentPackName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginBottom: 2,
  },
  contentPackStatus: {
    fontSize: 13,
    color: '#94a3b8',
  },
  installedBadge: {
    marginLeft: 12,
  },
});
