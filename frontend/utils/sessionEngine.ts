import { ExerciseDefinition, SessionConfig, NumberRecallItem, NameFaceItem, FocusSwitchItem, CookingItem, PoliticsItem, FarmingItem, DifficultyLevel } from '../types';
import { getNumberRecallDifficulty, getNameFaceDifficulty, getFocusSwitchDifficulty } from './adaptiveDifficulty';
import exercisesData from '../constants/exercises.json';
import contentPacksData from '../constants/content-packs.json';

/**
 * Session Engine - Generates training sessions based on configuration
 */

export interface SessionPlan {
  exercises: {
    exerciseId: string;
    exerciseName: string;
    exerciseType: string;
    items: (NumberRecallItem | NameFaceItem | FocusSwitchItem)[];
  }[];
  estimatedDuration: number;
}

/**
 * Generate a session plan based on user configuration
 */
export const generateSessionPlan = (
  config: SessionConfig,
  locale: string,
  difficultyLevel: number = 5
): SessionPlan => {
  const duration = config.duration; // minutes
  const exercises = exercisesData.exercises as ExerciseDefinition[];
  const tracks = exercisesData.tracks;
  
  // Get exercises for the selected track
  const track = tracks.find(t => t.id === config.track);
  if (!track) {
    throw new Error(`Track not found: ${config.track}`);
  }

  let exerciseIds: string[];
  
  if (config.track === 'surprise') {
    // Random selection
    exerciseIds = [track.exerciseIds[Math.floor(Math.random() * track.exerciseIds.length)]];
  } else {
    exerciseIds = track.exerciseIds;
  }

  // Determine how many items per exercise based on duration
  const itemsPerExercise = duration === 2 ? 3 : duration === 5 ? 5 : 8;

  const sessionPlan: SessionPlan = {
    exercises: [],
    estimatedDuration: duration,
  };

  // Generate items for each exercise
  exerciseIds.forEach(exerciseId => {
    const exercise = exercises.find(e => e.id === exerciseId);
    if (!exercise) return;

    const items = generateExerciseItems(exercise, itemsPerExercise, locale, difficultyLevel);
    
    sessionPlan.exercises.push({
      exerciseId: exercise.id,
      exerciseName: exercise.name,
      exerciseType: exercise.type,
      items,
    });
  });

  return sessionPlan;
};

/**
 * Generate items for a specific exercise
 */
const generateExerciseItems = (
  exercise: ExerciseDefinition,
  count: number,
  locale: string,
  difficultyLevel: number
): (NumberRecallItem | NameFaceItem | FocusSwitchItem)[] => {
  const items: any[] = [];

  switch (exercise.type) {
    case 'number_recall':
      for (let i = 0; i < count; i++) {
        items.push(generateNumberRecallItem(exercise, difficultyLevel));
      }
      break;

    case 'name_face':
      const contentPacks = contentPacksData.contentPacks;
      const pack = contentPacks.find(p => p.locale === locale);
      const names = pack?.items.names || [];
      
      for (let i = 0; i < count && i < names.length; i++) {
        items.push(generateNameFaceItem(exercise, names[i], names, difficultyLevel));
      }
      break;

    case 'focus_switch':
      for (let i = 0; i < count; i++) {
        items.push(generateFocusSwitchItem(exercise, difficultyLevel));
      }
      break;
  }

  return items;
};

/**
 * Generate a number recall item
 */
const generateNumberRecallItem = (
  exercise: ExerciseDefinition,
  difficultyLevel: number
): NumberRecallItem => {
  const params = getNumberRecallDifficulty(difficultyLevel);
  
  // Generate random digits
  let digits = '';
  for (let i = 0; i < params.digits; i++) {
    digits += Math.floor(Math.random() * 10);
  }

  return {
    digits,
    exposureMs: params.exposureMs,
    difficulty: difficultyLevel,
  };
};

/**
 * Generate a name-face item
 */
const generateNameFaceItem = (
  exercise: ExerciseDefinition,
  name: string,
  allNames: string[],
  difficultyLevel: number
): NameFaceItem => {
  const params = getNameFaceDifficulty(difficultyLevel);
  
  let options: string[] | undefined;
  
  if (params.multipleChoice) {
    // Generate distractors
    options = [name];
    const otherNames = allNames.filter(n => n !== name);
    
    while (options.length < params.choiceCount && otherNames.length > 0) {
      const randomIndex = Math.floor(Math.random() * otherNames.length);
      options.push(otherNames.splice(randomIndex, 1)[0]);
    }
    
    // Shuffle options
    options = options.sort(() => Math.random() - 0.5);
  }

  return {
    id: `face_${name}`,
    name,
    imageBase64: '', // Placeholder - in real app would have actual images
    exposureMs: params.exposureMs,
    options,
  };
};

/**
 * Generate a focus switch item
 */
const generateFocusSwitchItem = (
  exercise: ExerciseDefinition,
  difficultyLevel: number
): FocusSwitchItem => {
  const params = getFocusSwitchDifficulty(difficultyLevel);
  const rules = exercise.params.rules as string[];
  
  // Pick a random rule
  const rule = rules[Math.floor(Math.random() * rules.length)];
  
  // Generate random numbers
  const numbers: number[] = [];
  for (let i = 0; i < params.numbersCount; i++) {
    numbers.push(Math.floor(Math.random() * 10));
  }

  // Determine correct answers based on rule
  const correctAnswers = numbers.filter(num => {
    if (rule.includes('odd')) return num % 2 === 1;
    if (rule.includes('even')) return num % 2 === 0;
    if (rule.includes('greater than 5')) return num > 5;
    if (rule.includes('less than 5')) return num < 5;
    if (rule.includes('prime')) return isPrime(num);
    return false;
  });

  return {
    rule,
    numbers,
    correctAnswers,
    timeLimit: params.timeLimit,
  };
};

const isPrime = (num: number): boolean => {
  if (num < 2) return false;
  for (let i = 2; i <= Math.sqrt(num); i++) {
    if (num % i === 0) return false;
  }
  return true;
};
