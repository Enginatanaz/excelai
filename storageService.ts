import { UserProgress, MistakeRecord } from '../types/excel';
import { CURRICULUM_PHASES } from '../data/curriculum';

const STORAGE_KEY = 'excel_akademi_progress_v2';

export function getCurriculumLessonIds(): string[] {
  return CURRICULUM_PHASES.flatMap((p) => p.lessons.map((l) => l.id));
}

export const LESSON_SEQUENCE: string[] = getCurriculumLessonIds();

const DEFAULT_PROGRESS: UserProgress = {
  completedLessonIds: [],
  currentLessonId: CURRICULUM_PHASES[0]?.lessons[0]?.id || 'sec1_l1',
  completedTasks: {},
  quizScores: {},
  mistakes: [],
  skillMastery: {
    'Giriş ve Çalışma Ortamı': 20,
    'Hücreler & Veri Girişi': 15,
    'Hücre Biçimlendirme & Tasarım': 15,
    'Formül Mantığı & Referanslar ($)': 15,
    'Matematik & İstatistik Fonksiyonları': 15,
    'Mantıksal Karar Fonksiyonları (EĞER)': 10,
    'Koşullu Hesaplamalar (ETOPLA/EĞERSAY)': 10,
    'Metin & Tarih Fonksiyonları': 10,
    'Arama Fonksiyonları (DÜŞEYARA/ÇAPRAZARA)': 5,
    'Dinamik Diziler & Excel Tabloları': 5,
    'Veri Yönetimi & Koşullu Biçimlendirme': 5,
    'Grafik, PivotTable & Dashboard': 5,
    'Power Query & Veri Modeli (DAX)': 5,
    'What-If & Finansal Modelleme': 5,
    'Makrolar, VBA & Office Scripts': 5,
  },
  totalTimeSpentMinutes: 45,
  lastStudyDate: new Date().toISOString().split('T')[0],
  unlockAllLessons: false,
};

export function isLessonUnlocked(lessonId: string, progress: UserProgress): boolean {
  if (progress.unlockAllLessons) return true;
  const allIds = getCurriculumLessonIds();
  if (allIds.length > 0 && lessonId === allIds[0]) return true;

  const idx = allIds.indexOf(lessonId);
  if (idx <= 0) return true;

  // The immediately previous lesson must be in completedLessonIds
  const prevLessonId = allIds[idx - 1];
  return progress.completedLessonIds.includes(prevLessonId);
}

export function loadUserProgress(): UserProgress {
  if (typeof window === 'undefined') return DEFAULT_PROGRESS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PROGRESS;
    const parsed = JSON.parse(raw);
    const allIds = getCurriculumLessonIds();
    let validLessonId = parsed.currentLessonId;
    if (!validLessonId || !allIds.includes(validLessonId)) {
      validLessonId = allIds[0] || 'sec1_l1';
    }
    return {
      ...DEFAULT_PROGRESS,
      ...parsed,
      currentLessonId: validLessonId,
      completedTasks: parsed.completedTasks || {},
      unlockAllLessons: !!parsed.unlockAllLessons,
    };
  } catch (e) {
    console.error('Failed to load user progress:', e);
    return DEFAULT_PROGRESS;
  }
}

export function saveUserProgress(progress: UserProgress): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save user progress:', e);
  }
}

export function markTaskCompleted(lessonId: string, taskIdx: number): UserProgress {
  const current = loadUserProgress();
  const currentLessonTasks = new Set(current.completedTasks[lessonId] || []);
  currentLessonTasks.add(taskIdx);

  const updatedTasks = {
    ...current.completedTasks,
    [lessonId]: Array.from(currentLessonTasks),
  };

  const updated: UserProgress = {
    ...current,
    completedTasks: updatedTasks,
    lastStudyDate: new Date().toISOString().split('T')[0],
  };
  saveUserProgress(updated);
  return updated;
}

export function markLessonCompleted(lessonId: string, categoryName?: string): UserProgress {
  const current = loadUserProgress();
  const completed = new Set(current.completedLessonIds);
  completed.add(lessonId);

  const updatedMastery = { ...current.skillMastery };
  if (categoryName && updatedMastery[categoryName] !== undefined) {
    updatedMastery[categoryName] = Math.min(100, updatedMastery[categoryName] + 15);
  }

  // Auto advance currentLessonId to next lesson if available
  const idx = LESSON_SEQUENCE.indexOf(lessonId);
  let nextLessonId = current.currentLessonId;
  if (idx !== -1 && idx < LESSON_SEQUENCE.length - 1) {
    nextLessonId = LESSON_SEQUENCE[idx + 1];
  }

  const updated: UserProgress = {
    ...current,
    completedLessonIds: Array.from(completed),
    currentLessonId: nextLessonId,
    skillMastery: updatedMastery,
    lastStudyDate: new Date().toISOString().split('T')[0],
  };
  saveUserProgress(updated);
  return updated;
}

export function saveQuizResult(lessonId: string, score: number, categoryName?: string): UserProgress {
  const current = loadUserProgress();
  const updatedScores = { ...current.quizScores, [lessonId]: score };

  const updatedMastery = { ...current.skillMastery };
  if (categoryName && updatedMastery[categoryName] !== undefined) {
    const boost = score >= 80 ? 20 : 10;
    updatedMastery[categoryName] = Math.min(100, updatedMastery[categoryName] + boost);
  }

  const updated: UserProgress = {
    ...current,
    quizScores: updatedScores,
    skillMastery: updatedMastery,
  };
  saveUserProgress(updated);
  return updated;
}

export function toggleUnlockAll(unlock: boolean): UserProgress {
  const current = loadUserProgress();
  const updated: UserProgress = {
    ...current,
    unlockAllLessons: unlock,
  };
  saveUserProgress(updated);
  return updated;
}

export function logMistake(record: Omit<MistakeRecord, 'id' | 'timestamp'>): void {
  const current = loadUserProgress();
  const newRecord: MistakeRecord = {
    ...record,
    id: 'mstk_' + Date.now() + '_' + Math.random().toString(36).substring(2, 6),
    timestamp: Date.now(),
  };

  const updated: UserProgress = {
    ...current,
    mistakes: [newRecord, ...current.mistakes].slice(0, 50),
  };
  saveUserProgress(updated);
}

export function exportProgressJSON(): string {
  const progress = loadUserProgress();
  return JSON.stringify(progress, null, 2);
}

export function importProgressJSON(jsonStr: string): boolean {
  try {
    const parsed = JSON.parse(jsonStr);
    if (parsed && Array.isArray(parsed.completedLessonIds)) {
      saveUserProgress({ ...DEFAULT_PROGRESS, ...parsed });
      return true;
    }
  } catch (e) {
    console.error('Failed to import progress JSON:', e);
  }
  return false;
}

export function resetProgress(): UserProgress {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_PROGRESS;
}
