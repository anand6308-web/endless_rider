import { Attempt, DifficultyLevel } from '../types';

/**
 * Adaptive Difficulty Engine
 * Adjusts difficulty to keep success rate around 70-85%
 */

const TARGET_SUCCESS_RATE_MIN = 0.70;
const TARGET_SUCCESS_RATE_MAX = 0.85;
const DIFFICULTY_MIN = 1;
const DIFFICULTY_MAX = 10;

/**
 * Calculate success rate from recent attempts
 */
export const calculateSuccessRate = (attempts: Attempt[], count: number = 10): number => {
  const recentAttempts = attempts.slice(0, count);
  if (recentAttempts.length === 0) return 0.75; // Default to middle
  
  const successes = recentAttempts.filter(a => a.result).length;
  return successes / recentAttempts.length;
};

/**
 * Determine if difficulty should be adjusted
 */
export const shouldAdjustDifficulty = (
  attempts: Attempt[],
  minAttempts: number = 5
): { adjust: boolean; direction: 'increase' | 'decrease' | 'maintain' } => {
  if (attempts.length < minAttempts) {
    return { adjust: false, direction: 'maintain' };
  }
  
  const successRate = calculateSuccessRate(attempts);
  
  if (successRate >= TARGET_SUCCESS_RATE_MAX) {
    return { adjust: true, direction: 'increase' };
  } else if (successRate <= TARGET_SUCCESS_RATE_MIN) {
    return { adjust: true, direction: 'decrease' };
  }
  
  return { adjust: false, direction: 'maintain' };
};

/**
 * Adjust difficulty level based on performance
 */
export const adjustDifficulty = (
  currentDifficulty: DifficultyLevel,
  direction: 'increase' | 'decrease' | 'maintain',
  step: number = 1
): DifficultyLevel => {
  if (direction === 'maintain') {
    return currentDifficulty;
  }
  
  let newLevel = currentDifficulty.level;
  
  if (direction === 'increase') {
    newLevel = Math.min(DIFFICULTY_MAX, newLevel + step);
  } else {
    newLevel = Math.max(DIFFICULTY_MIN, newLevel - step);
  }
  
  return {
    ...currentDifficulty,
    level: newLevel,
    params: adjustParams(currentDifficulty.params, newLevel)
  };
};

/**
 * Adjust exercise-specific parameters based on difficulty level
 */
const adjustParams = (params: Record<string, any>, level: number): Record<string, any> => {
  // This will be customized per exercise type
  return { ...params, difficultyLevel: level };
};

/**
 * Get difficulty parameters for number recall exercise
 */
export const getNumberRecallDifficulty = (level: number): {
  digits: number;
  exposureMs: number;
  hasDistractor: boolean;
} => {
  const baseDigits = 4;
  const baseExposure = 2000;
  
  const digits = Math.min(10, baseDigits + Math.floor(level / 2));
  const exposureMs = Math.max(600, baseExposure - (level - 1) * 150);
  const hasDistractor = level >= 7;
  
  return { digits, exposureMs, hasDistractor };
};

/**
 * Get difficulty parameters for name-face exercise
 */
export const getNameFaceDifficulty = (level: number): {
  exposureMs: number;
  recallDelayMs: number;
  multipleChoice: boolean;
  choiceCount: number;
} => {
  const baseExposure = 3000;
  const baseDelay = 2000;
  
  const exposureMs = Math.max(1000, baseExposure - (level - 1) * 200);
  const recallDelayMs = baseDelay + (level - 1) * 500;
  const multipleChoice = level <= 5;
  const choiceCount = Math.max(3, 6 - Math.floor(level / 2));
  
  return { exposureMs, recallDelayMs, multipleChoice, choiceCount };
};

/**
 * Get difficulty parameters for focus switch exercise
 */
export const getFocusSwitchDifficulty = (level: number): {
  numbersCount: number;
  timeLimit: number;
  switchFrequency: number;
} => {
  const baseNumbers = 10;
  const baseTime = 5000;
  
  const numbersCount = baseNumbers + Math.floor(level / 2) * 2;
  const timeLimit = Math.max(2000, baseTime - (level - 1) * 300);
  const switchFrequency = Math.min(5, 2 + Math.floor(level / 3));
  
  return { numbersCount, timeLimit, switchFrequency };
};
