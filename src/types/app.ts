// 앱 전역 타입 정의

export type Language = 'ko' | 'ja' | 'en';
export type Theme = 'light' | 'dark';

export interface AppSettings {
  language: Language;
  theme: Theme;
}

export interface AppState {
  settings: AppSettings;
  currentUser: User | null;
}

export interface User {
  id: string;
  name: string;
  grade: string;
  isPremium: boolean;
  settings: AppSettings;
}

// 기존 curriculum.ts에서 가져온 인터페이스들을 여기서 re-export
export * from './curriculum';