// 중등 교육 커리큘럼 타입 정의
export interface Grade {
  id: string;
  name: string;
  description: string;
  order: number;
}

export interface Unit {
  id: string;
  gradeId: string;
  name: string;
  description: string;
  order: number;
  isPremium: boolean;
  estimatedHours: number;
}

export interface Lesson {
  id: string;
  unitId: string;
  name: string;
  description: string;
  order: number;
  type: 'theory' | 'practice' | 'quiz' | 'project';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  estimatedMinutes: number;
  concepts: string[];
  content: LessonContent;
}

export interface LessonContent {
  introduction: string;
  objectives: string[];
  theory?: {
    explanations: { title: string; content: string; }[];
    examples: { title: string; description: string; code: string; }[];
  };
  practice?: {
    instructions: string[];
    hints: string[];
  };
  quiz?: {
    questions: QuizQuestion[];
  };
}

export interface QuizQuestion {
  id: string;
  type: 'multiple-choice' | 'true-false';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation: string;
  points: number;
}

export interface UserProgress {
  userId: string;
  lessonId: string;
  status: 'not-started' | 'in-progress' | 'completed';
  score?: number;
  completedAt?: Date;
}