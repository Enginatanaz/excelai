export type CellValue = string | number | boolean | null;

export interface CellFormat {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  fontSize?: number;
  textColor?: string;
  bgColor?: string;
  align?: 'left' | 'center' | 'right';
  border?: 'none' | 'all' | 'bottom' | 'thick-bottom' | 'outer';
  numberFormat?: 'general' | 'currency' | 'percent' | 'decimal' | 'date';
  wrapText?: boolean;
}

export interface CellData {
  raw: string; // The formula or literal entered by user, e.g. "=TOPLA(B2:B5)" or "45000"
  computed: CellValue; // The computed result, e.g. 180000 or "#DEĞER!"
  error?: string; // e.g. "#DEĞER!", "#SIFIR/0!", "#YOK"
  format?: CellFormat;
}

export interface Sheet {
  id: string;
  name: string;
  cells: Record<string, CellData>; // key: "A1", "B2", etc.
  mergedCells?: string[]; // e.g. ["A1:C1"]
  columnWidths?: Record<string, number>; // key: "A", "B", etc.
  rowHeights?: Record<number, number>; // key: 1, 2, etc.
}

export interface WorkbookData {
  sheets: Sheet[];
  activeSheetId: string;
}

export interface CellCoordinate {
  col: number; // 0-based: 0 = A, 1 = B
  row: number; // 0-based: 0 = 1, 1 = 2
}

export interface SelectionRange {
  start: CellCoordinate;
  end: CellCoordinate;
}

// Curriculum and Pedagogical Types
export interface LearningObjective {
  id: string;
  title: string;
  description: string;
}

export interface TeachingStep {
  id: string;
  title: string;
  explanation: string;
  speechText: string; // Turkish natural spoken script
  targetCell?: string; // Cell highlighted during this step
  targetRange?: string; // e.g. "B2:B10"
  suggestedFormula?: string;
}

export interface TaskValidation {
  targetCell: string;
  expectedValue?: any;
  expectedFormulaKeywords?: string[]; // e.g. ["TOPLA", "SUM"] or ["EĞER", "IF"]
  customValidator?: string; // name of logic check
  errorMessage?: string;
  successMessage?: string;
}

export interface LessonTask {
  id: string;
  stepNumber: number;
  instruction: string;
  targetCell: string;
  hints: string[]; // 1: Conceptual hint, 2: Formula structure hint, 3: Full solution
  validation: TaskValidation;
  isCompleted?: boolean;
}

export interface QuizOption {
  id: string;
  text: string;
}

export interface QuizQuestion {
  id: string;
  question: string;
  codeSnippet?: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
  measuredObjectiveId?: string; // Measured learning objective ID
  measuredSkill?: string; // Description of skill measured
  commonMistakeExplanation?: string; // Why the distractors are wrong
}

export interface LessonQuiz {
  id: string;
  title: string;
  passingScore: number; // e.g. 80
  questions: QuizQuestion[];
}

export interface Lesson {
  id: string;
  phaseId: number;
  unitId: string;
  title: string;
  shortDesc: string;
  category?: string; // e.g. "Mantıksal Fonksiyonlar"
  groupTitle?: string; // e.g. "EĞER Fonksiyonu ve Tek Koşul Yönetimi"
  primaryGoal?: string; // Single sentence primary learning objective
  prerequisites?: string[]; // Required prior knowledge
  commonMistakes?: string[]; // Frequent beginner pitfalls and solutions
  successCriteria?: string; // Grading and mastery guidelines
  level: 'Başlangıç' | 'Orta' | 'İleri' | 'Uzman';
  durationMinutes: number;
  functionsUsed: string[];
  initialWorkbook: WorkbookData;
  objectives: LearningObjective[];
  teachingSteps: TeachingStep[];
  tasks: LessonTask[];
  quiz?: LessonQuiz;
}

export interface CurriculumPhase {
  id: number;
  category?: string; // Üst Kategori: e.g. "Mantıksal Fonksiyonlar"
  title: string;
  subtitle: string;
  iconName: string;
  description: string;
  lessons: Lesson[];
}

export interface MistakeRecord {
  id: string;
  lessonId: string;
  cellAddress: string;
  userFormula: string;
  errorType: string;
  timestamp: number;
  advice: string;
}

export interface UserProgress {
  completedLessonIds: string[];
  currentLessonId: string;
  completedTasks: Record<string, number[]>; // lessonId -> task indexes completed
  quizScores: Record<string, number>; // lessonId -> score
  mistakes: MistakeRecord[];
  skillMastery: Record<string, number>; // category -> percentage (0-100)
  totalTimeSpentMinutes: number;
  lastStudyDate: string;
  unlockAllLessons?: boolean;
}

