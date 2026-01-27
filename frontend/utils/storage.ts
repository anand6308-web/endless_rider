import { Platform } from 'react-native';
import { UserProfile, SkillProfile, Attempt, ReviewSchedule } from '../types';

/**
 * Simple storage utility that works across web and native platforms
 * Uses localStorage for web, in-memory storage as fallback
 */

// In-memory storage for development/web
const memoryStorage: {
  userProfile: UserProfile | null;
  skillProfile: SkillProfile | null;
  attempts: Attempt[];
  schedules: ReviewSchedule[];
} = {
  userProfile: null,
  skillProfile: null,
  attempts: [],
  schedules: [],
};

export const initStorage = async () => {
  console.log('Storage initialized for platform:', Platform.OS);
  return true;
};

// User Profile
export const saveUserProfile = async (profile: UserProfile): Promise<void> => {
  memoryStorage.userProfile = profile;
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    localStorage.setItem('userProfile', JSON.stringify(profile));
  }
};

export const loadUserProfile = async (userId: string): Promise<UserProfile | null> => {
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('userProfile');
    if (stored) {
      const profile = JSON.parse(stored);
      return {
        ...profile,
        createdAt: new Date(profile.createdAt),
        updatedAt: new Date(profile.updatedAt),
      };
    }
  }
  return memoryStorage.userProfile;
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<void> => {
  if (memoryStorage.userProfile) {
    memoryStorage.userProfile = {
      ...memoryStorage.userProfile,
      ...updates,
      updatedAt: new Date(),
    };
    await saveUserProfile(memoryStorage.userProfile);
  }
};

// Skill Profile
export const saveSkillProfile = async (profile: SkillProfile): Promise<void> => {
  memoryStorage.skillProfile = profile;
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    localStorage.setItem('skillProfile', JSON.stringify(profile));
  }
};

export const loadSkillProfile = async (userId: string): Promise<SkillProfile | null> => {
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('skillProfile');
    if (stored) {
      const profile = JSON.parse(stored);
      return {
        ...profile,
        updatedAt: new Date(profile.updatedAt),
      };
    }
  }
  return memoryStorage.skillProfile;
};

export const updateSkillProfile = async (userId: string, updates: Partial<SkillProfile>): Promise<void> => {
  if (memoryStorage.skillProfile) {
    memoryStorage.skillProfile = {
      ...memoryStorage.skillProfile,
      ...updates,
      updatedAt: new Date(),
    };
    await saveSkillProfile(memoryStorage.skillProfile);
  }
};

// Attempts
export const saveAttempt = async (attempt: Attempt): Promise<void> => {
  memoryStorage.attempts.unshift(attempt);
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    localStorage.setItem('attempts', JSON.stringify(memoryStorage.attempts));
  }
};

export const loadAttempts = async (userId: string, limit: number = 100): Promise<Attempt[]> => {
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('attempts');
    if (stored) {
      const attempts = JSON.parse(stored);
      return attempts.map((a: any) => ({
        ...a,
        timestamp: new Date(a.timestamp),
      })).slice(0, limit);
    }
  }
  return memoryStorage.attempts.slice(0, limit);
};

// Review Schedules
export const saveReviewSchedule = async (schedule: ReviewSchedule): Promise<void> => {
  const index = memoryStorage.schedules.findIndex(s => s.id === schedule.id);
  if (index >= 0) {
    memoryStorage.schedules[index] = schedule;
  } else {
    memoryStorage.schedules.push(schedule);
  }
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    localStorage.setItem('schedules', JSON.stringify(memoryStorage.schedules));
  }
};

export const loadDueReviews = async (userId: string): Promise<ReviewSchedule[]> => {
  const now = new Date();
  let schedules = memoryStorage.schedules;
  
  if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem('schedules');
    if (stored) {
      schedules = JSON.parse(stored).map((s: any) => ({
        ...s,
        nextDueAt: new Date(s.nextDueAt),
        updatedAt: new Date(s.updatedAt),
      }));
    }
  }
  
  return schedules.filter(s => s.userId === userId && s.nextDueAt <= now);
};

export const updateReviewSchedule = async (scheduleId: string, updates: Partial<ReviewSchedule>): Promise<void> => {
  const index = memoryStorage.schedules.findIndex(s => s.id === scheduleId);
  if (index >= 0) {
    memoryStorage.schedules[index] = {
      ...memoryStorage.schedules[index],
      ...updates,
      updatedAt: new Date(),
    };
    if (Platform.OS === 'web' && typeof localStorage !== 'undefined') {
      localStorage.setItem('schedules', JSON.stringify(memoryStorage.schedules));
    }
  }
};
