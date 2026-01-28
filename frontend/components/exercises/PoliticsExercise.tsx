import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface PoliticsExerciseProps {
  item: {
    question: string;
    facts: string[];
    options: string[];
    correctAnswer: number;
  };
  onComplete: (correct: boolean, responseTime: number) => void;
}

export default function PoliticsExercise({ item, onComplete }: PoliticsExerciseProps) {
  const [phase, setPhase] = useState<'ready' | 'study' | 'question' | 'feedback'>('ready');
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [startTime, setStartTime] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [phase]);

  const handleReady = () => {
    setPhase('study');
    setTimeout(() => {
      setPhase('question');
      setStartTime(Date.now());
    }, 5000); // 5 seconds to study facts
  };

  const handleAnswer = (index: number) => {
    const responseTime = Date.now() - startTime;
    const correct = index === item.correctAnswer;
    
    setSelectedAnswer(index);
    setPhase('feedback');
    
    setTimeout(() => {
      onComplete(correct, responseTime);
    }, 2000);
  };

  const renderPhase = () => {
    switch (phase) {
      case 'ready':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Ionicons name="flag" size={64} color="#ec4899" />
            <Text style={styles.phaseTitle}>Politics & Governance</Text>
            <Text style={styles.phaseDescription}>
              Study facts and answer questions about governance
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleReady}>
              <Text style={styles.primaryButtonText}>Start</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 'study':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Text style={styles.phaseTitle}>Study These Facts</Text>
            <ScrollView style={styles.factsList}>
              {item.facts.map((fact, index) => (
                <View key={index} style={styles.factCard}>
                  <View style={styles.factIcon}>
                    <Ionicons name="document-text" size={24} color="#ec4899" />
                  </View>
                  <Text style={styles.factText}>{fact}</Text>
                </View>
              ))}
            </ScrollView>
            <View style={styles.timerIndicator}>
              <Ionicons name="time" size={20} color="#94a3b8" />
              <Text style={styles.timerText}>Memorizing...</Text>
            </View>
          </Animated.View>
        );

      case 'question':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Text style={styles.questionTitle}>Question</Text>
            <View style={styles.questionCard}>
              <Text style={styles.questionText}>{item.question}</Text>
            </View>
            <ScrollView style={styles.optionsList}>
              {item.options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswer(index)}
                >
                  <View style={styles.optionNumber}>
                    <Text style={styles.optionNumberText}>{String.fromCharCode(65 + index)}</Text>
                  </View>
                  <Text style={styles.optionText}>{option}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </Animated.View>
        );

      case 'feedback':
        const correct = selectedAnswer === item.correctAnswer;
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Ionicons 
              name={correct ? 'checkmark-circle' : 'close-circle'} 
              size={80} 
              color={correct ? '#10b981' : '#ef4444'} 
            />
            <Text style={[styles.feedbackTitle, { color: correct ? '#10b981' : '#ef4444' }]}>
              {correct ? 'Well Informed!' : 'Not Quite'}
            </Text>
            <View style={styles.feedbackDetails}>
              <Text style={styles.feedbackLabel}>Correct Answer:</Text>
              <Text style={styles.feedbackAnswer}>
                {String.fromCharCode(65 + item.correctAnswer)}. {item.options[item.correctAnswer]}
              </Text>
              {!correct && selectedAnswer !== null && (
                <>
                  <Text style={styles.feedbackLabel}>Your Answer:</Text>
                  <Text style={styles.feedbackWrong}>
                    {String.fromCharCode(65 + selectedAnswer)}. {item.options[selectedAnswer]}
                  </Text>
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
  phaseTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    marginTop: 16,
    marginBottom: 12,
    textAlign: 'center',
  },
  phaseDescription: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 32,
  },
  factsList: {
    flex: 1,
    marginVertical: 16,
  },
  factCard: {
    flexDirection: 'row',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#ec4899',
  },
  factIcon: {
    marginRight: 12,
  },
  factText: {
    fontSize: 15,
    color: '#cbd5e1',
    flex: 1,
    lineHeight: 22,
  },
  timerIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
  },
  timerText: {
    fontSize: 14,
    color: '#94a3b8',
    marginLeft: 8,
  },
  questionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ec4899',
    marginBottom: 16,
    textAlign: 'center',
  },
  questionCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#ec4899',
  },
  questionText: {
    fontSize: 18,
    color: '#ffffff',
    lineHeight: 26,
    textAlign: 'center',
  },
  optionsList: {
    flex: 1,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  optionNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ec4899',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  optionNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  optionText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  primaryButton: {
    backgroundColor: '#ec4899',
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
  feedbackTitle: {
    fontSize: 32,
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
    marginBottom: 8,
  },
  feedbackAnswer: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#10b981',
    lineHeight: 26,
  },
  feedbackWrong: {
    fontSize: 18,
    color: '#ef4444',
    lineHeight: 26,
  },
});
