// Core Types for Morning Memory Gym

export interface UserProfile {
  userId: string;
  locale: 'en-US' | 'en-IN' | 'te-IN' | 'hi-IN' | 'ta-IN' | 'kn-IN' | 'ml-IN' | 'mr-IN' | 'bn-IN' | 'gu-IN' | 'pa-IN';
  selectedTrack: 'numbers' | 'names' | 'cooking' | 'farming' | 'politics';
  dailyTime: 2 | 5 | 10;
  voiceMode: boolean;
  textSize: 'normal' | 'large' | 'extra_large';
  highContrast: boolean;
  notificationsEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface SkillProfile {
  userId: string;
  numberRecallScore: number;
  nameFaceScore: number;
  focusScore: number;
  updatedAt: Date;
}

export interface ExerciseDefinition {
  id: string;
  name: string;
  type: 'number_recall' | 'name_face' | 'focus_switch';
  params: Record<string, any>;
  scoring: ScoringRules;
  scheduling: SchedulingRules;
  minAppVersion: string;
  version: string;
}

export interface ScoringRules {
  correctPoints: number;
  partialPoints?: number;
  timeBonus?: boolean;
  penaltyPerError?: number;
}

export interface SchedulingRules {
  initialInterval: number; // minutes
  successMultiplier: number;
  failureMultiplier: number;
  maxInterval: number; // days
}

export interface ContentPack {
  id: string;
  locale: string;
  version: string;
  assets: {
    images?: Record<string, string>; // base64 encoded
    audio?: Record<string, string>;
  };
  items: {
    names?: string[];
    faces?: FaceItem[];
    tips?: Record<string, string[]>;
  };
}

export interface FaceItem {
  id: string;
  name: string;
  imageBase64: string;
  locale: string;
}

export interface Attempt {
  id?: string;
  userId: string;
  exerciseId: string;
  itemId?: string;
  timestamp: Date;
  result: boolean;
  responseTimeMs: number;
  difficultySnapshot: DifficultyLevel;
  score?: number;
}

export interface DifficultyLevel {
  level: number; // 1-10
  params: Record<string, any>;
}

export interface ReviewSchedule {
  id?: string;
  userId: string;
  itemId: string;
  exerciseId: string;
  nextDueAt: Date;
  easeFactor: number;
  interval: number;
  repetitions: number;
  updatedAt: Date;
}

export interface TrackDefinition {
  id: string;
  name: string;
  description: string;
  exerciseIds: string[];
  icon: string;
}

export interface SessionConfig {
  track: string;
  duration: number; // minutes
  mode: 'calm' | 'game';
}

export interface SessionResult {
  totalAttempts: number;
  successfulAttempts: number;
  averageResponseTime: number;
  accuracyPercentage: number;
  exercisesCompleted: string[];
}

export interface ExerciseSession {
  exerciseId: string;
  items: any[];
  currentItemIndex: number;
  startTime: Date;
  attempts: Attempt[];
}

// Exercise-specific types
export interface NumberRecallItem {
  digits: string;
  exposureMs: number;
  difficulty: number;
}

export interface NameFaceItem {
  id: string;
  name: string;
  imageBase64: string;
  exposureMs: number;
  options?: string[]; // for multiple choice
}

export interface FocusSwitchItem {
  rule: string;
  numbers: number[];
  correctAnswers: number[];
  timeLimit: number;
}

// New exercise types
export interface CookingItem {
  recipeName: string;
  ingredients: string[];
  correctOrder: number[];
  timeLimit: number;
}

export interface PoliticsItem {
  question: string;
  facts: string[];
  options: string[];
  correctAnswer: number;
}

export interface FarmingItem {
  cropName: string;
  stages: string[];
  tips: string[];
  question: string;
  options: string[];
  correctAnswer: number;
}

// Navigation types
export type RootStackParamList = {
  Onboarding: undefined;
  Main: undefined;
  Exercise: { exerciseId: string; sessionConfig: SessionConfig };
  Results: { sessionResult: SessionResult };
};

export type MainTabParamList = {
  Home: undefined;
  Explore: undefined;
  Progress: undefined;
  Settings: undefined;
};
