import { Platform } from 'react-native';
import { UserProfile, SkillProfile, Attempt, ReviewSchedule } from '../types';

// Conditional imports to avoid web worker issues
let SQLite: any = null;
let db: any = null;

// Lazy load SQLite only on native platforms
const loadSQLite = async () => {
  if (Platform.OS !== 'web' && !SQLite) {
    SQLite = await import('expo-sqlite');
  }
};

export const initDatabase = async () => {
  // SQLite only works on native platforms (iOS/Android), not web
  if (Platform.OS === 'web') {
    console.log('Database initialization skipped on web platform - using localStorage fallback');
    return null;
  }

  try {
    await loadSQLite();
    db = await SQLite.openDatabaseAsync('morning_memory_gym.db');
    
    // Create tables
    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS user_profile (
        user_id TEXT PRIMARY KEY,
        locale TEXT DEFAULT 'en-US',
        selected_track TEXT DEFAULT 'numbers',
        daily_time INTEGER DEFAULT 5,
        voice_mode INTEGER DEFAULT 0,
        text_size TEXT DEFAULT 'normal',
        high_contrast INTEGER DEFAULT 0,
        notifications_enabled INTEGER DEFAULT 1,
        created_at TEXT,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS skill_profile (
        user_id TEXT PRIMARY KEY,
        number_recall_score REAL DEFAULT 0.0,
        name_face_score REAL DEFAULT 0.0,
        focus_score REAL DEFAULT 0.0,
        updated_at TEXT
      );

      CREATE TABLE IF NOT EXISTS attempts (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        exercise_id TEXT,
        item_id TEXT,
        timestamp TEXT,
        result INTEGER,
        response_time_ms INTEGER,
        difficulty_snapshot TEXT,
        score REAL,
        FOREIGN KEY(user_id) REFERENCES user_profile(user_id)
      );

      CREATE TABLE IF NOT EXISTS review_schedules (
        id TEXT PRIMARY KEY,
        user_id TEXT,
        item_id TEXT,
        exercise_id TEXT,
        next_due_at TEXT,
        ease_factor REAL DEFAULT 2.5,
        interval INTEGER DEFAULT 1,
        repetitions INTEGER DEFAULT 0,
        updated_at TEXT,
        FOREIGN KEY(user_id) REFERENCES user_profile(user_id)
      );

      CREATE INDEX IF NOT EXISTS idx_attempts_user_id ON attempts(user_id);
      CREATE INDEX IF NOT EXISTS idx_attempts_timestamp ON attempts(timestamp);
      CREATE INDEX IF NOT EXISTS idx_review_schedules_user_id ON review_schedules(user_id);
      CREATE INDEX IF NOT EXISTS idx_review_schedules_next_due ON review_schedules(next_due_at);
    `);

    console.log('Database initialized successfully');
    return db;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
};

export const getDatabase = () => {
  if (Platform.OS === 'web') {
    // On web, return a mock or use localStorage/IndexedDB instead
    console.warn('Database not available on web platform');
    return null;
  }
  
  if (!db) {
    throw new Error('Database not initialized. Call initDatabase() first.');
  }
  return db;
};

// User Profile operations
export const createUserProfile = async (profile: UserProfile): Promise<void> => {
  const database = getDatabase();
  await database.runAsync(
    `INSERT OR REPLACE INTO user_profile 
     (user_id, locale, selected_track, daily_time, voice_mode, text_size, high_contrast, notifications_enabled, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      profile.userId,
      profile.locale,
      profile.selectedTrack,
      profile.dailyTime,
      profile.voiceMode ? 1 : 0,
      profile.textSize,
      profile.highContrast ? 1 : 0,
      profile.notificationsEnabled ? 1 : 0,
      profile.createdAt.toISOString(),
      profile.updatedAt.toISOString()
    ]
  );
};

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const database = getDatabase();
  const result = await database.getFirstAsync<any>(
    'SELECT * FROM user_profile WHERE user_id = ?',
    [userId]
  );
  
  if (!result) return null;
  
  return {
    userId: result.user_id,
    locale: result.locale,
    selectedTrack: result.selected_track,
    dailyTime: result.daily_time,
    voiceMode: result.voice_mode === 1,
    textSize: result.text_size,
    highContrast: result.high_contrast === 1,
    notificationsEnabled: result.notifications_enabled === 1,
    createdAt: new Date(result.created_at),
    updatedAt: new Date(result.updated_at)
  };
};

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>): Promise<void> => {
  const database = getDatabase();
  const fields: string[] = [];
  const values: any[] = [];
  
  if (updates.locale) {
    fields.push('locale = ?');
    values.push(updates.locale);
  }
  if (updates.selectedTrack) {
    fields.push('selected_track = ?');
    values.push(updates.selectedTrack);
  }
  if (updates.dailyTime) {
    fields.push('daily_time = ?');
    values.push(updates.dailyTime);
  }
  if (updates.voiceMode !== undefined) {
    fields.push('voice_mode = ?');
    values.push(updates.voiceMode ? 1 : 0);
  }
  if (updates.textSize) {
    fields.push('text_size = ?');
    values.push(updates.textSize);
  }
  if (updates.highContrast !== undefined) {
    fields.push('high_contrast = ?');
    values.push(updates.highContrast ? 1 : 0);
  }
  if (updates.notificationsEnabled !== undefined) {
    fields.push('notifications_enabled = ?');
    values.push(updates.notificationsEnabled ? 1 : 0);
  }
  
  fields.push('updated_at = ?');
  values.push(new Date().toISOString());
  values.push(userId);
  
  await database.runAsync(
    `UPDATE user_profile SET ${fields.join(', ')} WHERE user_id = ?`,
    values
  );
};

// Skill Profile operations
export const createSkillProfile = async (skill: SkillProfile): Promise<void> => {
  const database = getDatabase();
  await database.runAsync(
    `INSERT OR REPLACE INTO skill_profile 
     (user_id, number_recall_score, name_face_score, focus_score, updated_at)
     VALUES (?, ?, ?, ?, ?)`,
    [
      skill.userId,
      skill.numberRecallScore,
      skill.nameFaceScore,
      skill.focusScore,
      skill.updatedAt.toISOString()
    ]
  );
};

export const getSkillProfile = async (userId: string): Promise<SkillProfile | null> => {
  const database = getDatabase();
  const result = await database.getFirstAsync<any>(
    'SELECT * FROM skill_profile WHERE user_id = ?',
    [userId]
  );
  
  if (!result) return null;
  
  return {
    userId: result.user_id,
    numberRecallScore: result.number_recall_score,
    nameFaceScore: result.name_face_score,
    focusScore: result.focus_score,
    updatedAt: new Date(result.updated_at)
  };
};

export const updateSkillProfile = async (userId: string, updates: Partial<SkillProfile>): Promise<void> => {
  const database = getDatabase();
  const fields: string[] = [];
  const values: any[] = [];
  
  if (updates.numberRecallScore !== undefined) {
    fields.push('number_recall_score = ?');
    values.push(updates.numberRecallScore);
  }
  if (updates.nameFaceScore !== undefined) {
    fields.push('name_face_score = ?');
    values.push(updates.nameFaceScore);
  }
  if (updates.focusScore !== undefined) {
    fields.push('focus_score = ?');
    values.push(updates.focusScore);
  }
  
  fields.push('updated_at = ?');
  values.push(new Date().toISOString());
  values.push(userId);
  
  await database.runAsync(
    `UPDATE skill_profile SET ${fields.join(', ')} WHERE user_id = ?`,
    values
  );
};

// Attempt operations
export const createAttempt = async (attempt: Attempt): Promise<void> => {
  const database = getDatabase();
  const id = attempt.id || `attempt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  await database.runAsync(
    `INSERT INTO attempts 
     (id, user_id, exercise_id, item_id, timestamp, result, response_time_ms, difficulty_snapshot, score)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      attempt.userId,
      attempt.exerciseId,
      attempt.itemId || '',
      attempt.timestamp.toISOString(),
      attempt.result ? 1 : 0,
      attempt.responseTimeMs,
      JSON.stringify(attempt.difficultySnapshot),
      attempt.score || 0
    ]
  );
};

export const getUserAttempts = async (userId: string, limit: number = 100): Promise<Attempt[]> => {
  const database = getDatabase();
  const results = await database.getAllAsync<any>(
    'SELECT * FROM attempts WHERE user_id = ? ORDER BY timestamp DESC LIMIT ?',
    [userId, limit]
  );
  
  return results.map(row => ({
    id: row.id,
    userId: row.user_id,
    exerciseId: row.exercise_id,
    itemId: row.item_id || undefined,
    timestamp: new Date(row.timestamp),
    result: row.result === 1,
    responseTimeMs: row.response_time_ms,
    difficultySnapshot: JSON.parse(row.difficulty_snapshot),
    score: row.score
  }));
};

// Review Schedule operations
export const createReviewSchedule = async (schedule: ReviewSchedule): Promise<void> => {
  const database = getDatabase();
  const id = schedule.id || `schedule_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  
  await database.runAsync(
    `INSERT OR REPLACE INTO review_schedules 
     (id, user_id, item_id, exercise_id, next_due_at, ease_factor, interval, repetitions, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      id,
      schedule.userId,
      schedule.itemId,
      schedule.exerciseId,
      schedule.nextDueAt.toISOString(),
      schedule.easeFactor,
      schedule.interval,
      schedule.repetitions,
      schedule.updatedAt.toISOString()
    ]
  );
};

export const getDueReviews = async (userId: string): Promise<ReviewSchedule[]> => {
  const database = getDatabase();
  const now = new Date().toISOString();
  const results = await database.getAllAsync<any>(
    'SELECT * FROM review_schedules WHERE user_id = ? AND next_due_at <= ? ORDER BY next_due_at ASC',
    [userId, now]
  );
  
  return results.map(row => ({
    id: row.id,
    userId: row.user_id,
    itemId: row.item_id,
    exerciseId: row.exercise_id,
    nextDueAt: new Date(row.next_due_at),
    easeFactor: row.ease_factor,
    interval: row.interval,
    repetitions: row.repetitions,
    updatedAt: new Date(row.updated_at)
  }));
};

export const updateReviewSchedule = async (scheduleId: string, updates: Partial<ReviewSchedule>): Promise<void> => {
  const database = getDatabase();
  const fields: string[] = [];
  const values: any[] = [];
  
  if (updates.nextDueAt) {
    fields.push('next_due_at = ?');
    values.push(updates.nextDueAt.toISOString());
  }
  if (updates.easeFactor !== undefined) {
    fields.push('ease_factor = ?');
    values.push(updates.easeFactor);
  }
  if (updates.interval !== undefined) {
    fields.push('interval = ?');
    values.push(updates.interval);
  }
  if (updates.repetitions !== undefined) {
    fields.push('repetitions = ?');
    values.push(updates.repetitions);
  }
  
  fields.push('updated_at = ?');
  values.push(new Date().toISOString());
  values.push(scheduleId);
  
  await database.runAsync(
    `UPDATE review_schedules SET ${fields.join(', ')} WHERE id = ?`,
    values
  );
};
