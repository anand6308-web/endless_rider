import { ReviewSchedule } from '../types';

/**
 * SM-2 Spaced Repetition Algorithm
 * Based on SuperMemo 2 algorithm for optimal review scheduling
 */

interface SM2Result {
  easeFactor: number;
  interval: number;
  repetitions: number;
  nextDueAt: Date;
}

/**
 * Calculate next review schedule based on SM-2 algorithm
 * @param quality - Performance quality (0-5): 0=complete failure, 5=perfect recall
 * @param currentSchedule - Current review schedule
 * @returns Updated schedule parameters
 */
export const calculateNextReview = (
  quality: number,
  currentSchedule: ReviewSchedule
): SM2Result => {
  let { easeFactor, interval, repetitions } = currentSchedule;
  
  // Quality below 3 means failure - reset
  if (quality < 3) {
    repetitions = 0;
    interval = 1; // Start again in 1 day
  } else {
    // Success case
    if (repetitions === 0) {
      interval = 1;
    } else if (repetitions === 1) {
      interval = 6;
    } else {
      interval = Math.round(interval * easeFactor);
    }
    repetitions += 1;
  }
  
  // Update ease factor based on quality
  easeFactor = easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
  
  // Keep ease factor in reasonable bounds
  if (easeFactor < 1.3) {
    easeFactor = 1.3;
  }
  
  // Calculate next due date
  const nextDueAt = new Date();
  nextDueAt.setDate(nextDueAt.getDate() + interval);
  
  return {
    easeFactor,
    interval,
    repetitions,
    nextDueAt
  };
};

/**
 * Convert attempt result to SM-2 quality score (0-5)
 * @param result - Whether the attempt was successful
 * @param responseTimeMs - Response time in milliseconds
 * @param targetTimeMs - Target time for optimal response
 * @returns Quality score (0-5)
 */
export const calculateQuality = (
  result: boolean,
  responseTimeMs: number,
  targetTimeMs: number = 5000
): number => {
  if (!result) {
    return 0; // Complete failure
  }
  
  // Success - quality depends on response time
  const timeRatio = responseTimeMs / targetTimeMs;
  
  if (timeRatio <= 0.5) {
    return 5; // Perfect - very fast
  } else if (timeRatio <= 0.75) {
    return 4; // Good - fast
  } else if (timeRatio <= 1.0) {
    return 3; // Correct - within target time
  } else if (timeRatio <= 1.5) {
    return 3; // Correct - slightly slow
  } else {
    return 3; // Correct - slow
  }
};

/**
 * Get priority score for review items (higher = more urgent)
 */
export const getReviewPriority = (schedule: ReviewSchedule): number => {
  const now = new Date();
  const overdueDays = (now.getTime() - schedule.nextDueAt.getTime()) / (1000 * 60 * 60 * 24);
  
  // Items overdue get higher priority
  if (overdueDays > 0) {
    return 100 + overdueDays * 10;
  }
  
  // Items due soon get medium priority
  return Math.max(0, 100 - Math.abs(overdueDays) * 10);
};
