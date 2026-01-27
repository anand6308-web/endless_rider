import { create } from 'zustand';
import { UserProfile, SkillProfile, ExerciseDefinition, ContentPack, SessionConfig } from '../types';
import exercisesData from '../constants/exercises.json';
import contentPacksData from '../constants/content-packs.json';

interface AppState {
  // User data
  userProfile: UserProfile | null;
  skillProfile: SkillProfile | null;
  userId: string;
  
  // Exercise data
  exercises: ExerciseDefinition[];
  contentPacks: ContentPack[];
  currentLocale: string;
  
  // Session state
  currentSession: SessionConfig | null;
  isSessionActive: boolean;
  
  // UI state
  isOnboarded: boolean;
  isLoading: boolean;
  
  // Actions
  setUserProfile: (profile: UserProfile) => void;
  setSkillProfile: (profile: SkillProfile) => void;
  setUserId: (id: string) => void;
  setCurrentLocale: (locale: string) => void;
  setCurrentSession: (session: SessionConfig | null) => void;
  setIsSessionActive: (active: boolean) => void;
  setIsOnboarded: (onboarded: boolean) => void;
  setIsLoading: (loading: boolean) => void;
  loadExercises: () => void;
  loadContentPacks: () => void;
  getContentPackForLocale: (locale: string) => ContentPack | null;
  getExerciseById: (id: string) => ExerciseDefinition | null;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Initial state
  userProfile: null,
  skillProfile: null,
  userId: '',
  exercises: [],
  contentPacks: [],
  currentLocale: 'en-US',
  currentSession: null,
  isSessionActive: false,
  isOnboarded: false,
  isLoading: false,
  
  // Actions
  setUserProfile: (profile) => set({ userProfile: profile }),
  setSkillProfile: (profile) => set({ skillProfile: profile }),
  setUserId: (id) => set({ userId: id }),
  setCurrentLocale: (locale) => set({ currentLocale: locale }),
  setCurrentSession: (session) => set({ currentSession: session }),
  setIsSessionActive: (active) => set({ isSessionActive: active }),
  setIsOnboarded: (onboarded) => set({ isOnboarded: onboarded }),
  setIsLoading: (loading) => set({ isLoading: loading }),
  
  loadExercises: () => {
    const exercises = exercisesData.exercises as ExerciseDefinition[];
    set({ exercises });
  },
  
  loadContentPacks: () => {
    const packs = contentPacksData.contentPacks as ContentPack[];
    set({ contentPacks: packs });
  },
  
  getContentPackForLocale: (locale: string) => {
    const packs = get().contentPacks;
    return packs.find(pack => pack.locale === locale) || null;
  },
  
  getExerciseById: (id: string) => {
    const exercises = get().exercises;
    return exercises.find(ex => ex.id === id) || null;
  },
}));
