import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NumberRecallItem } from '../../types';

interface NumberRecallExerciseProps {
  item: NumberRecallItem;
  onComplete: (correct: boolean, responseTime: number) => void;
}

export default function NumberRecallExercise({ item, onComplete }: NumberRecallExerciseProps) {
  const [phase, setPhase] = useState<'ready' | 'memorize' | 'recall' | 'feedback'>('ready');
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  // Store the original item to prevent re-render issues
  const [originalItem] = useState(item);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    // Start animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const handleReady = () => {
    setPhase('memorize');
    setTimeout(() => {
      setPhase('recall');
      setStartTime(Date.now());
    }, originalItem.exposureMs);
  };

  const handleSubmit = () => {
    const responseTime = Date.now() - startTime;
    const correct = userInput.trim() === originalItem.digits;
    
    setIsCorrect(correct);
    setPhase('feedback');
    
    setTimeout(() => {
      onComplete(correct, responseTime);
    }, 1500);
  };

  const renderPhase = () => {
    switch (phase) {
      case 'ready':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Ionicons name="eye" size={64} color="#6366f1" />
            <Text style={styles.phaseTitle}>Ready?</Text>
            <Text style={styles.phaseDescription}>
              Memorize the {originalItem.digits.length}-digit number that appears
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleReady}>
              <Text style={styles.primaryButtonText}>Start</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 'memorize':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Text style={styles.phaseTitle}>Memorize this</Text>
            <View style={styles.numberDisplay}>
              <Text style={styles.numberText}>{originalItem.digits}</Text>
            </View>
            <View style={styles.timerBar}>
              <View style={[styles.timerFill, { width: '100%' }]} />
            </View>
          </Animated.View>
        );

      case 'recall':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Text style={styles.phaseTitle}>Now recall</Text>
            <Text style={styles.phaseDescription}>Enter the number you memorized</Text>
            <TextInput
              style={styles.input}
              value={userInput}
              onChangeText={setUserInput}
              keyboardType="number-pad"
              placeholder="Enter digits"
              placeholderTextColor="#64748b"
              autoFocus
              maxLength={originalItem.digits.length}
            />
            <Text style={styles.inputHint}>
              {userInput.length} / {originalItem.digits.length} digits
            </Text>
            <TouchableOpacity 
              style={[styles.primaryButton, userInput.length !== originalItem.digits.length && styles.buttonDisabled]} 
              onPress={handleSubmit}
              disabled={userInput.length !== originalItem.digits.length}
            >
              <Text style={styles.primaryButtonText}>Submit</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 'feedback':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Ionicons 
              name={isCorrect ? 'checkmark-circle' : 'close-circle'} 
              size={80} 
              color={isCorrect ? '#10b981' : '#ef4444'} 
            />
            <Text style={[styles.feedbackTitle, { color: isCorrect ? '#10b981' : '#ef4444' }]}>
              {isCorrect ? 'Correct!' : 'Incorrect'}
            </Text>
            <View style={styles.feedbackDetails}>
              <Text style={styles.feedbackLabel}>Your answer:</Text>
              <Text style={styles.feedbackValue}>{userInput || '(empty)'}</Text>
              {!isCorrect && (
                <>
                  <Text style={styles.feedbackLabel}>Correct answer:</Text>
                  <Text style={styles.feedbackValue}>{originalItem.digits}</Text>
                </>
              )}
            </View>
          </Animated.View>
        );

      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      {renderPhase()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 24,
  },
  phaseContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  phaseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 12,
  },
  phaseDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  numberDisplay: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 32,
    marginBottom: 24,
  },
  numberText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 8,
  },
  timerBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    overflow: 'hidden',
  },
  timerFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  input: {
    width: '100%',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    letterSpacing: 8,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  inputHint: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#334155',
    opacity: 0.5,
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  feedbackTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 24,
  },
  feedbackDetails: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    width: '100%',
  },
  feedbackLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 12,
    marginBottom: 4,
  },
  feedbackValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    letterSpacing: 4,
  },
});
