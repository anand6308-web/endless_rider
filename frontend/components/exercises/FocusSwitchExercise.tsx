import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { FocusSwitchItem } from '../../types';

interface FocusSwitchExerciseProps {
  item: FocusSwitchItem;
  onComplete: (correct: boolean, responseTime: number) => void;
}

export default function FocusSwitchExercise({ item, onComplete }: FocusSwitchExerciseProps) {
  const [phase, setPhase] = useState<'ready' | 'playing' | 'feedback'>('ready');
  const [selectedNumbers, setSelectedNumbers] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [timeLeft, setTimeLeft] = useState(item.timeLimit / 1000);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  useEffect(() => {
    if (phase === 'playing' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (phase === 'playing' && timeLeft === 0) {
      handleTimeUp();
    }
  }, [phase, timeLeft]);

  const handleReady = () => {
    setPhase('playing');
    setStartTime(Date.now());
  };

  const handleNumberTap = (number: number) => {
    if (!selectedNumbers.includes(number)) {
      setSelectedNumbers([...selectedNumbers, number]);
    }
  };

  const handleSubmit = () => {
    const responseTime = Date.now() - startTime;
    const correct = checkCorrectness();
    
    setPhase('feedback');
    
    setTimeout(() => {
      onComplete(correct, responseTime);
    }, 2000);
  };

  const handleTimeUp = () => {
    const responseTime = Date.now() - startTime;
    const correct = checkCorrectness();
    
    setPhase('feedback');
    
    setTimeout(() => {
      onComplete(correct, responseTime);
    }, 2000);
  };

  const checkCorrectness = () => {
    // Check if user selected exactly the correct answers
    if (selectedNumbers.length !== item.correctAnswers.length) return false;
    
    const sortedSelected = [...selectedNumbers].sort((a, b) => a - b);
    const sortedCorrect = [...item.correctAnswers].sort((a, b) => a - b);
    
    return sortedSelected.every((num, idx) => num === sortedCorrect[idx]);
  };

  const renderPhase = () => {
    switch (phase) {
      case 'ready':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Ionicons name="swap-horizontal" size={64} color="#10b981" />
            <Text style={styles.phaseTitle}>Focus Challenge</Text>
            <View style={styles.ruleCard}>
              <Text style={styles.ruleTitle}>Rule:</Text>
              <Text style={styles.ruleText}>{item.rule}</Text>
            </View>
            <Text style={styles.phaseDescription}>
              You have {item.timeLimit / 1000} seconds
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleReady}>
              <Text style={styles.primaryButtonText}>Start</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 'playing':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <View style={styles.header}>
              <View style={styles.ruleChip}>
                <Text style={styles.ruleChipText}>{item.rule}</Text>
              </View>
              <View style={styles.timerChip}>
                <Ionicons name="time" size={20} color="#ffffff" />
                <Text style={styles.timerText}>{timeLeft}s</Text>
              </View>
            </View>
            
            <View style={styles.numbersGrid}>
              {item.numbers.map((number) => {
                const isSelected = selectedNumbers.includes(number);
                return (
                  <TouchableOpacity
                    key={number}
                    style={[
                      styles.numberButton,
                      isSelected && styles.numberButtonSelected,
                    ]}
                    onPress={() => handleNumberTap(number)}
                  >
                    <Text
                      style={[
                        styles.numberButtonText,
                        isSelected && styles.numberButtonTextSelected,
                      ]}
                    >
                      {number}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitButtonText}>Submit ({selectedNumbers.length} selected)</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 'feedback':
        const correct = checkCorrectness();
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Ionicons 
              name={correct ? 'checkmark-circle' : 'close-circle'} 
              size={80} 
              color={correct ? '#10b981' : '#ef4444'} 
            />
            <Text style={[styles.feedbackTitle, { color: correct ? '#10b981' : '#ef4444' }]}>
              {correct ? 'Perfect!' : 'Not Quite'}
            </Text>
            <View style={styles.feedbackDetails}>
              <Text style={styles.feedbackLabel}>Rule was:</Text>
              <Text style={styles.feedbackRule}>{item.rule}</Text>
              
              <Text style={styles.feedbackLabel}>You selected:</Text>
              <Text style={styles.feedbackValue}>
                {selectedNumbers.length > 0 ? selectedNumbers.join(', ') : 'None'}
              </Text>
              
              {!correct && (
                <>
                  <Text style={styles.feedbackLabel}>Correct answers:</Text>
                  <Text style={styles.feedbackValue}>{item.correctAnswers.join(', ')}</Text>
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
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  ruleChip: {
    flex: 1,
    backgroundColor: '#1e293b',
    borderRadius: 8,
    padding: 12,
    marginRight: 8,
  },
  ruleChipText: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: '600',
  },
  timerChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  timerText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 8,
  },
  phaseTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  phaseDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  ruleCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#10b981',
  },
  ruleTitle: {
    fontSize: 14,
    color: '#10b981',
    fontWeight: '600',
    marginBottom: 8,
  },
  ruleText: {
    fontSize: 20,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  numbersGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginBottom: 24,
  },
  numberButton: {
    width: 70,
    height: 70,
    backgroundColor: '#1e293b',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 6,
    borderWidth: 2,
    borderColor: '#334155',
  },
  numberButtonSelected: {
    backgroundColor: '#10b981',
    borderColor: '#10b981',
  },
  numberButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  numberButtonTextSelected: {
    color: '#ffffff',
  },
  primaryButton: {
    backgroundColor: '#10b981',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    alignSelf: 'center',
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  feedbackTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 24,
    textAlign: 'center',
  },
  feedbackDetails: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
  },
  feedbackLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginTop: 16,
    marginBottom: 4,
  },
  feedbackRule: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
  },
  feedbackValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
  },
});
