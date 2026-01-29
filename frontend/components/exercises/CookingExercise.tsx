import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppStore } from '../../store/appStore';
import { t } from '../../constants/i18n';

interface CookingExerciseProps {
  item: {
    recipeName: string;
    ingredients: string[];
    correctOrder: number[];
    timeLimit: number;
  };
  onComplete: (correct: boolean, responseTime: number) => void;
}

// Translation mapping for recipe names
const recipeNameMap: { [key: string]: string } = {
  'Sambar': 'cooking.recipe.sambar',
  'Pulao': 'cooking.recipe.pulao',
  'Biryani': 'cooking.recipe.biryani',
  'Dosa': 'cooking.recipe.dosa',
};

// Translation mapping for ingredients
const ingredientMap: { [key: string]: string } = {
  'Toor dal': 'cooking.ingredient.toorDal',
  'Tamarind': 'cooking.ingredient.tamarind',
  'Tomatoes': 'cooking.ingredient.tomatoes',
  'Drumsticks': 'cooking.ingredient.drumsticks',
  'Sambar powder': 'cooking.ingredient.sambarPowder',
  'Curry leaves': 'cooking.ingredient.curryLeaves',
  'Mustard seeds': 'cooking.ingredient.mustardSeeds',
  'Basmati rice': 'cooking.ingredient.basmatiRice',
  'Ghee': 'cooking.ingredient.ghee',
  'Whole spices': 'cooking.ingredient.wholeSpices',
  'Vegetables': 'cooking.ingredient.vegetables',
  'Water': 'cooking.ingredient.water',
  'Salt': 'cooking.ingredient.salt',
};

export default function CookingExercise({ item, onComplete }: CookingExerciseProps) {
  const { userProfile } = useAppStore();
  const locale = (userProfile?.locale || 'en-US') as 'en-US' | 'en-IN' | 'te-IN' | 'hi-IN' | 'ta-IN' | 'kn-IN' | 'ml-IN' | 'mr-IN' | 'bn-IN' | 'gu-IN' | 'pa-IN';
  
  const [phase, setPhase] = useState<'ready' | 'memorize' | 'recall' | 'feedback'>('ready');
  const [selectedOrder, setSelectedOrder] = useState<number[]>([]);
  const [startTime, setStartTime] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0));
  
  // Translate recipe name
  const translatedRecipeName = recipeNameMap[item.recipeName] 
    ? t(recipeNameMap[item.recipeName], locale)
    : item.recipeName;
  
  // Translate ingredients
  const translatedIngredients = item.ingredients.map(ing => 
    ingredientMap[ing] ? t(ingredientMap[ing], locale) : ing
  );

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
    }, item.timeLimit);
  };

  const handleIngredientTap = (index: number) => {
    if (!selectedOrder.includes(index)) {
      setSelectedOrder([...selectedOrder, index]);
    }
  };

  const handleSubmit = () => {
    const responseTime = Date.now() - startTime;
    const correct = JSON.stringify(selectedOrder) === JSON.stringify(item.correctOrder);
    
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
            <Ionicons name="restaurant" size={64} color="#f59e0b" />
            <Text style={styles.phaseTitle}>{t('exercise.name.cooking_recipes', locale)}</Text>
            <Text style={styles.phaseDescription}>
              {t('cooking.learning', locale)}
            </Text>
            <View style={styles.recipeCard}>
              <Text style={styles.recipeName}>{translatedRecipeName}</Text>
            </View>
            <TouchableOpacity style={styles.primaryButton} onPress={handleReady}>
              <Text style={styles.primaryButtonText}>{t('button.start', locale)}</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 'memorize':
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Text style={styles.phaseTitle}>{t('cooking.learning', locale)}</Text>
            <Text style={styles.recipeName}>{translatedRecipeName}</Text>
            <ScrollView style={styles.ingredientsList}>
              {item.correctOrder.map((idx, position) => (
                <View key={position} style={styles.ingredientCard}>
                  <View style={styles.stepNumber}>
                    <Text style={styles.stepNumberText}>{position + 1}</Text>
                  </View>
                  <Text style={styles.ingredientText}>{translatedIngredients[idx]}</Text>
                </View>
              ))}
            </ScrollView>
          </Animated.View>
        );

      case 'recall':
        const shuffledIngredients = translatedIngredients
          .map((ing, idx) => ({ ing, idx }))
          .sort(() => Math.random() - 0.5);
        
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Text style={styles.phaseTitle}>{t('cooking.testing', locale)}</Text>
            <Text style={styles.phaseDescription}>
              {t('cooking.testing', locale)}
            </Text>
            
            {selectedOrder.length > 0 && (
              <View style={styles.selectedContainer}>
                <Text style={styles.selectedLabel}>{t('cooking.testing', locale)}</Text>
                <View style={styles.selectedList}>
                  {selectedOrder.map((idx, pos) => (
                    <View key={pos} style={styles.selectedChip}>
                      <Text style={styles.selectedChipNumber}>{pos + 1}</Text>
                      <Text style={styles.selectedChipText}>{translatedIngredients[idx]}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            <ScrollView style={styles.ingredientsList}>
              {shuffledIngredients.map(({ ing, idx }) => {
                const isSelected = selectedOrder.includes(idx);
                return (
                  <TouchableOpacity
                    key={idx}
                    style={[
                      styles.ingredientButton,
                      isSelected && styles.ingredientButtonDisabled,
                    ]}
                    onPress={() => handleIngredientTap(idx)}
                    disabled={isSelected}
                  >
                    <Text style={[
                      styles.ingredientButtonText,
                      isSelected && styles.ingredientButtonTextDisabled,
                    ]}>
                      {ing}
                    </Text>
                    {isSelected && (
                      <Ionicons name="checkmark-circle" size={24} color="#10b981" />
                    )}
                  </TouchableOpacity>
                );
              })}
            </ScrollView>

            <TouchableOpacity 
              style={[
                styles.submitButton,
                selectedOrder.length !== item.ingredients.length && styles.submitButtonDisabled
              ]} 
              onPress={handleSubmit}
              disabled={selectedOrder.length !== item.ingredients.length}
            >
              <Text style={styles.submitButtonText}>Submit Order</Text>
            </TouchableOpacity>
          </Animated.View>
        );

      case 'feedback':
        const correct = JSON.stringify(selectedOrder) === JSON.stringify(item.correctOrder);
        return (
          <Animated.View style={[styles.phaseContainer, { opacity: fadeAnim }]}>
            <Ionicons 
              name={correct ? 'checkmark-circle' : 'close-circle'} 
              size={80} 
              color={correct ? '#10b981' : '#ef4444'} 
            />
            <Text style={[styles.feedbackTitle, { color: correct ? '#10b981' : '#ef4444' }]}>
              {correct ? 'Perfect Recipe!' : 'Try Again!'}
            </Text>
            <View style={styles.feedbackDetails}>
              <Text style={styles.feedbackLabel}>Correct Order:</Text>
              {item.correctOrder.map((idx, pos) => (
                <View key={pos} style={styles.feedbackStep}>
                  <Text style={styles.feedbackStepNumber}>{pos + 1}.</Text>
                  <Text style={styles.feedbackStepText}>{item.ingredients[idx]}</Text>
                </View>
              ))}
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
    marginBottom: 24,
  },
  recipeCard: {
    backgroundColor: '#1e293b',
    borderRadius: 16,
    padding: 24,
    marginBottom: 32,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  recipeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  ingredientsList: {
    flex: 1,
    marginVertical: 16,
  },
  ingredientCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f59e0b',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  ingredientText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  selectedContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  selectedLabel: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 12,
  },
  selectedList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  selectedChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#312e81',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    marginBottom: 8,
  },
  selectedChipNumber: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#818cf8',
    marginRight: 6,
  },
  selectedChipText: {
    fontSize: 12,
    color: '#ffffff',
  },
  ingredientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#1e293b',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#334155',
  },
  ingredientButtonDisabled: {
    backgroundColor: '#0f172a',
    borderColor: '#10b981',
  },
  ingredientButtonText: {
    fontSize: 16,
    color: '#ffffff',
    flex: 1,
  },
  ingredientButtonTextDisabled: {
    color: '#64748b',
  },
  primaryButton: {
    backgroundColor: '#f59e0b',
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
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#334155',
    opacity: 0.5,
  },
  submitButtonText: {
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
    marginBottom: 16,
  },
  feedbackStep: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  feedbackStepNumber: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f59e0b',
    marginRight: 12,
    width: 30,
  },
  feedbackStepText: {
    fontSize: 18,
    color: '#ffffff',
    flex: 1,
  },
});
