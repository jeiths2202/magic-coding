// 다국어 지원 번역 데이터

export interface Translation {
  // 헤더 & 네비게이션
  title: string;
  subtitle: string;
  startLearning: string;
  freeTrial: string;
  
  // 학년
  grade1: string;
  grade2: string;
  grade3: string;
  grade1Desc: string;
  grade2Desc: string;
  grade3Desc: string;
  
  // 학습 특징
  learningFeatures: string;
  stepByStep: string;
  stepByStepDesc: string;
  mobileOptimized: string;
  mobileOptimizedDesc: string;
  practiceOriented: string;
  practiceOrientedDesc: string;
  premiumCourses: string;
  premiumCoursesDesc: string;
  
  // 공통 버튼 & 액션
  close: string;
  complete: string;
  next: string;
  previous: string;
  startNow: string;
  
  // 학습 콘텐츠
  units: string;
  lessons: string;
  selectUnit: string;
  selectLesson: string;
  learningObjectives: string;
  theory: string;
  practice: string;
  quiz: string;
  project: string;
  
  // 난이도
  beginner: string;
  intermediate: string;
  advanced: string;
  
  // 메시지
  loadingUnits: string;
  loadingLessons: string;
  startingLesson: string;
  lessonCompleted: string;
  error: string;
  
  // 사용자 등록
  registrationTitle: string;
  registrationSubtitle: string;
  nameInput: string;
  gradeSelect: string;
  selectGrade: string;
  registerButton: string;
  welcome: string;
  
  // 프리미엄
  premium: string;
  free: string;
  
  // 시간 표시
  minutes: string;
  hours: string;
  estimatedTime: string;
  order: string;
  
  // 설정
  settings: string;
  language: string;
  theme: string;
  darkMode: string;
  lightMode: string;
}

export const translations: Record<string, Translation> = {
  ko: {
    // 헤더 & 네비게이션
    title: "🚀 스크래치 코딩 교실",
    subtitle: "중학생을 위한 체계적인 스크래치 프로그래밍 학습 플랫폼",
    startLearning: "학습 시작하기",
    freeTrial: "무료 체험하기",
    
    // 학년
    grade1: "중학교 1학년",
    grade2: "중학교 2학년", 
    grade3: "중학교 3학년",
    grade1Desc: "스크래치 기초와 알고리즘 개념 학습",
    grade2Desc: "프로그래밍 논리와 게임 제작 실습",
    grade3Desc: "고급 프로젝트와 실생활 문제 해결",
    
    // 학습 특징
    learningFeatures: "📚 학습 특징",
    stepByStep: "단계별 난이도",
    stepByStepDesc: "기초부터 고급까지 체계적 학습",
    mobileOptimized: "모바일 최적화",
    mobileOptimizedDesc: "스마트폰, 태블릿 완벽 지원",
    practiceOriented: "실습 중심",
    practiceOrientedDesc: "게임과 프로젝트로 재미있게",
    premiumCourses: "프리미엄 과정",
    premiumCoursesDesc: "고급 기능과 개인 지도",
    
    // 공통 버튼 & 액션
    close: "닫기",
    complete: "완료하기",
    next: "다음",
    previous: "이전",
    startNow: "지금 바로 시작해보세요!",
    
    // 학습 콘텐츠
    units: "📚 학습 단원",
    lessons: "📖 레슨 목록", 
    selectUnit: "원하는 단원을 선택해서 학습을 시작하세요",
    selectLesson: "순서대로 학습하시는 것을 권장합니다",
    learningObjectives: "🎯 학습 목표",
    theory: "이론",
    practice: "실습",
    quiz: "퀴즈",
    project: "프로젝트",
    
    // 난이도
    beginner: "초급",
    intermediate: "중급", 
    advanced: "고급",
    
    // 메시지
    loadingUnits: "단원을 불러오는 중...",
    loadingLessons: "레슨을 불러오는 중...",
    startingLesson: "레슨을 시작합니다...",
    lessonCompleted: "레슨을 완료했습니다! 🎉",
    error: "오류가 발생했습니다",
    
    // 사용자 등록
    registrationTitle: "🚀 학습을 시작해보세요!",
    registrationSubtitle: "간단한 정보를 입력하고 무료로 코딩을 배워보세요",
    nameInput: "이름을 입력하세요",
    gradeSelect: "학년을 선택하세요",
    selectGrade: "학년을 선택하세요",
    registerButton: "무료 체험 시작하기",
    welcome: "환영합니다! 학습을 시작해보세요 🎉",
    
    // 프리미엄
    premium: "프리미엄",
    free: "무료",
    
    // 시간 표시
    minutes: "분",
    hours: "시간",
    estimatedTime: "예상 시간",
    order: "순서",
    
    // 설정
    settings: "설정",
    language: "언어",
    theme: "테마",
    darkMode: "다크 모드",
    lightMode: "라이트 모드"
  },
  
  ja: {
    // ヘッダー & ナビゲーション
    title: "🚀 スクラッチコーディング教室",
    subtitle: "中学生のための体系的なスクラッチプログラミング学習プラットフォーム",
    startLearning: "学習を開始",
    freeTrial: "無料体験",
    
    // 学年
    grade1: "中学1年生",
    grade2: "中学2年生",
    grade3: "中学3年生", 
    grade1Desc: "スクラッチの基礎とアルゴリズムの概念学習",
    grade2Desc: "プログラミング論理とゲーム制作実習",
    grade3Desc: "高度なプロジェクトと実生活の問題解決",
    
    // 学習特徴
    learningFeatures: "📚 学習特徴",
    stepByStep: "段階別難易度",
    stepByStepDesc: "基礎から上級まで体系的学習",
    mobileOptimized: "モバイル最適化",
    mobileOptimizedDesc: "スマートフォン、タブレット完全対応",
    practiceOriented: "実習中心",
    practiceOrientedDesc: "ゲームとプロジェクトで楽しく",
    premiumCourses: "プレミアムコース",
    premiumCoursesDesc: "高度な機能と個人指導",
    
    // 共通ボタン & アクション
    close: "閉じる",
    complete: "完了",
    next: "次へ",
    previous: "前へ",
    startNow: "今すぐ始めましょう！",
    
    // 学習コンテンツ
    units: "📚 学習単元",
    lessons: "📖 レッスン一覧",
    selectUnit: "希望の単元を選択して学習を開始してください",
    selectLesson: "順番に学習することをお勧めします",
    learningObjectives: "🎯 学習目標",
    theory: "理論",
    practice: "実習",
    quiz: "クイズ",
    project: "プロジェクト",
    
    // 難易度
    beginner: "初級",
    intermediate: "中級",
    advanced: "上級",
    
    // メッセージ
    loadingUnits: "単元を読み込み中...",
    loadingLessons: "レッスンを読み込み中...",
    startingLesson: "レッスンを開始します...",
    lessonCompleted: "レッスンを完了しました！ 🎉",
    error: "エラーが発生しました",
    
    // ユーザー登録
    registrationTitle: "🚀 学習を始めましょう！",
    registrationSubtitle: "簡単な情報を入力して無料でコーディングを学びましょう",
    nameInput: "お名前を入力してください",
    gradeSelect: "学年を選択してください",
    selectGrade: "学年を選択してください",
    registerButton: "無料体験を開始",
    welcome: "ようこそ！学習を始めましょう 🎉",
    
    // プレミアム
    premium: "プレミアム",
    free: "無料",
    
    // 時間表示
    minutes: "分",
    hours: "時間",
    estimatedTime: "予想時間",
    order: "順序",
    
    // 設定
    settings: "設定",
    language: "言語",
    theme: "テーマ",
    darkMode: "ダークモード",
    lightMode: "ライトモード"
  },
  
  en: {
    // Header & Navigation
    title: "🚀 Scratch Coding Classroom",
    subtitle: "Systematic Scratch Programming Learning Platform for Middle School Students",
    startLearning: "Start Learning",
    freeTrial: "Free Trial",
    
    // Grades
    grade1: "7th Grade",
    grade2: "8th Grade", 
    grade3: "9th Grade",
    grade1Desc: "Learn Scratch basics and algorithm concepts",
    grade2Desc: "Programming logic and game development practice",
    grade3Desc: "Advanced projects and real-world problem solving",
    
    // Learning Features
    learningFeatures: "📚 Learning Features",
    stepByStep: "Step-by-Step Difficulty",
    stepByStepDesc: "Systematic learning from basic to advanced",
    mobileOptimized: "Mobile Optimized",
    mobileOptimizedDesc: "Perfect support for smartphones and tablets",
    practiceOriented: "Practice-Oriented",
    practiceOrientedDesc: "Fun learning with games and projects",
    premiumCourses: "Premium Courses",
    premiumCoursesDesc: "Advanced features and personal guidance",
    
    // Common Buttons & Actions
    close: "Close",
    complete: "Complete",
    next: "Next",
    previous: "Previous",
    startNow: "Start Right Now!",
    
    // Learning Content
    units: "📚 Learning Units",
    lessons: "📖 Lesson List",
    selectUnit: "Select your desired unit to start learning",
    selectLesson: "We recommend learning in order",
    learningObjectives: "🎯 Learning Objectives",
    theory: "Theory",
    practice: "Practice",
    quiz: "Quiz", 
    project: "Project",
    
    // Difficulty
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
    
    // Messages
    loadingUnits: "Loading units...",
    loadingLessons: "Loading lessons...",
    startingLesson: "Starting lesson...",
    lessonCompleted: "Lesson completed! 🎉",
    error: "An error occurred",
    
    // User Registration
    registrationTitle: "🚀 Let's Start Learning!",
    registrationSubtitle: "Enter simple information and learn coding for free",
    nameInput: "Enter your name",
    gradeSelect: "Select your grade",
    selectGrade: "Select your grade",
    registerButton: "Start Free Trial",
    welcome: "Welcome! Let's start learning 🎉",
    
    // Premium
    premium: "Premium",
    free: "Free",
    
    // Time Display
    minutes: "min",
    hours: "hours",
    estimatedTime: "Estimated time",
    order: "Order",
    
    // Settings
    settings: "Settings",
    language: "Language",
    theme: "Theme",
    darkMode: "Dark Mode",
    lightMode: "Light Mode"
  }
};

export const supportedLanguages = [
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'en', name: 'English', flag: '🇺🇸' }
];

export const defaultLanguage = 'ko';