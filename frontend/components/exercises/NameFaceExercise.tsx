import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NameFaceItem } from '../../types';

interface NameFaceExerciseProps {
  item: NameFaceItem;
  onComplete: (correct: boolean, responseTime: number) => void;
}

export default function NameFaceExercise({ item, onComplete }: NameFaceExerciseProps) {
  const [phase, setPhase] = useState<'ready' | 'memorize' | 'recall' | 'feedback'>('ready');
  const [selectedName, setSelectedName] = useState('');
  const [startTime, setStartTime] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  // Store the original item to prevent re-render issues
  const [originalItem] = useState(item);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
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

  const handleSelectName = (name: string) => {
    const responseTime = Date.now() - startTime;
    const correct = name.toLowerCase() === originalItem.name.toLowerCase();
    
    setSelectedName(name);
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
            <Ionicons name="person-circle" size={64} color="#8b5cf6" />
            <Text style={styles.phaseTitle}>Ready?</Text>
            <Text style={styles.phaseDescription}>
              Remember the name with the face
            </Text>
            <TouchableOpacity style={styles.primaryButton} onPress={handleReady}>
              <Text style={styles.primaryButtonText}>Start</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 'memorize':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Text style={styles.phaseTitle}>Memorize</Text>
            <View style={styles.faceCard}>
              <View style={styles.facePlaceholder}>
                <Ionicons name="person" size={80} color="#8b5cf6" />
              </View>
              <Text style={styles.nameText}>{originalItem.name}</Text>
            </View>
            <View style={styles.timerBar}>
              <View style={[styles.timerFill, { width: '100%' }]} />
            </View>
          </Animated.View>
        );

      case 'recall':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Text style={styles.phaseTitle}>Who is this?</Text>
            <View style={styles.faceCard}>
              <View style={styles.facePlaceholder}>
                <Ionicons name="person" size={80} color="#8b5cf6" />
              </View>
            </View>
            {originalItem.options && originalItem.options.length > 0 ? (
              <View style={styles.optionsContainer}>
                {originalItem.options.map((option) => (
                  <TouchableOpacity
                    key={option}
                    style={styles.optionButton}
                    onPress={() => handleSelectName(option)}
                  >
                    <Text style={styles.optionText}>{option}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            ) : (
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Type the name"
                  placeholderTextColor="#64748b"
                  autoFocus
                  onSubmitEditing={(e) => handleSelectName(e.nativeEvent.text)}
                />
              </View>
            )}
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
              <View style={styles.facePlaceholder}>
                <Ionicons name="person" size={60} color="#8b5cf6" />
              </View>
              <Text style={styles.feedbackLabel}>Your answer:</Text>
              <Text style={styles.feedbackValue}>{selectedName}</Text>
              {!isCorrect && (
                <>
                  <Text style={styles.feedbackLabel}>Correct name:</Text>
                  <Text style={styles.feedbackValue}>{originalItem.name}</Text>
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
  faceCard: {
    backgroundColor: '#1e293b',
    borderRadius: 20,
    padding: 32,
    alignItems: 'center',
    marginBottom: 24,
  },
  facePlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#312e81',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  nameText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
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
    backgroundColor: '#8b5cf6',
  },
  optionsContainer: {
    width: '100%',
  },
  optionButton: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  optionText: {
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    fontWeight: '600',
  },
  inputContainer: {
    width: '100%',
  },
  input: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 20,
    fontSize: 18,
    color: '#ffffff',
    textAlign: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  primaryButton: {
    backgroundColor: '#8b5cf6',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    minWidth: 200,
    alignItems: 'center',
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
    alignItems: 'center',
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
  },
});
