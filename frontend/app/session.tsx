import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../store/appStore';
import { generateSessionPlan } from '../utils/sessionEngine';
import { saveAttempt, updateSkillProfile, loadSkillProfile } from '../../utils/storage';
import { calculateQuality, calculateNextReview } from '../../utils/spacedRepetition';
import { SessionConfig, Attempt, SessionResult } from '../../types';
import NumberRecallExercise from '../../components/exercises/NumberRecallExercise';
import NameFaceExercise from '../../components/exercises/NameFaceExercise';
import FocusSwitchExercise from '../../components/exercises/FocusSwitchExercise';

export default function SessionScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const { userProfile, userId } = useAppStore();
  
  const [sessionPlan, setSessionPlan] = useState<any>(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [attempts, setAttempts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    initializeSession();
  }, []);

  const initializeSession = async () => {
    try {
      // Parse session config from params
      const config: SessionConfig = {
        track: (params.track as string) || 'numbers',
        duration: parseInt(params.duration as string) || 5,
        mode: (params.mode as 'calm' | 'game') || 'calm',
      };

      const locale = userProfile?.locale || 'en-US';
      const plan = generateSessionPlan(config, locale, 5);
      
      setSessionPlan(plan);
      setIsLoading(false);
    } catch (error) {
      console.error('Error initializing session:', error);
      setIsLoading(false);
    }
  };

  const handleExerciseComplete = async (correct: boolean, responseTime: number) => {
    const exercise = sessionPlan.exercises[currentExerciseIndex];
    
    // Save attempt
    const attempt: Attempt = {
      userId,
      exerciseId: exercise.exerciseId,
      timestamp: new Date(),
      result: correct,
      responseTimeMs: responseTime,
      difficultySnapshot: { level: 5, params: {} },
      score: correct ? 10 : 0,
    };

    await saveAttempt(attempt);
    setAttempts([...attempts, attempt]);

    // Move to next item or exercise
    if (currentItemIndex < exercise.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    } else if (currentExerciseIndex < sessionPlan.exercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      setCurrentItemIndex(0);
    } else {
      // Session complete
      await finishSession();
    }
  };

  const finishSession = async () => {
    // Update skill profile based on performance
    const successRate = attempts.filter(a => a.result).length / attempts.length;
    const avgResponseTime = attempts.reduce((sum, a) => sum + a.responseTimeMs, 0) / attempts.length;

    const skillProfile = await loadSkillProfile(userId);
    if (skillProfile) {
      const currentExercise = sessionPlan.exercises[0];
      const scoreIncrease = successRate * 5; // Increase score based on success rate

      if (currentExercise.exerciseType === 'number_recall') {
        await updateSkillProfile(userId, {
          numberRecallScore: Math.min(100, skillProfile.numberRecallScore + scoreIncrease),
        });
      } else if (currentExercise.exerciseType === 'name_face') {
        await updateSkillProfile(userId, {
          nameFaceScore: Math.min(100, skillProfile.nameFaceScore + scoreIncrease),
        });
      } else if (currentExercise.exerciseType === 'focus_switch') {
        await updateSkillProfile(userId, {
          focusScore: Math.min(100, skillProfile.focusScore + scoreIncrease),
        });
      }
    }

    // Navigate to results
    router.push({
      pathname: '/session-results',
      params: {
        totalAttempts: attempts.length,
        successfulAttempts: attempts.filter(a => a.result).length,
        averageResponseTime: avgResponseTime.toFixed(0),
        accuracyPercentage: (successRate * 100).toFixed(0),
      },
    });
  };

  if (isLoading || !sessionPlan) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6366f1" />
          <Text style={styles.loadingText}>Preparing your session...</Text>
        </View>
      </SafeAreaView>
    );
  }

  const currentExercise = sessionPlan.exercises[currentExerciseIndex];
  const currentItem = currentExercise.items[currentItemIndex];
  const progress = ((currentExerciseIndex * currentExercise.items.length + currentItemIndex + 1) / 
    sessionPlan.exercises.reduce((sum: number, ex: any) => sum + ex.items.length, 0)) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Progress Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="close" size={24} color="#ffffff" />
        </TouchableOpacity>
        <View style={styles.progressInfo}>
          <Text style={styles.progressText}>
            {currentExerciseIndex + 1}/{sessionPlan.exercises.length} • Item {currentItemIndex + 1}/{currentExercise.items.length}
          </Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
        </View>
      </View>

      {/* Exercise Content */}
      <View style={styles.exerciseContainer}>
        {currentExercise.exerciseType === 'number_recall' && (
          <NumberRecallExercise
            item={currentItem}
            onComplete={handleExerciseComplete}
          />
        )}
        {currentExercise.exerciseType === 'name_face' && (
          <NameFaceExercise
            item={currentItem}
            onComplete={handleExerciseComplete}
          />
        )}
        {currentExercise.exerciseType === 'focus_switch' && (
          <FocusSwitchExercise
            item={currentItem}
            onComplete={handleExerciseComplete}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#94a3b8',
    marginTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#1e293b',
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#1e293b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  progressInfo: {
    flex: 1,
  },
  progressText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: '#1e293b',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  exerciseContainer: {
    flex: 1,
  },
});
