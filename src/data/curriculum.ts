import { Grade, Unit, Lesson } from '../types/curriculum';

export const grades: Grade[] = [
  {
    id: 'grade-1',
    name: '중학교 1학년',
    description: '스크래치 기초와 알고리즘 개념 학습',
    order: 1
  },
  {
    id: 'grade-2', 
    name: '중학교 2학년',
    description: '프로그래밍 논리와 게임 제작 실습',
    order: 2
  },
  {
    id: 'grade-3',
    name: '중학교 3학년', 
    description: '고급 프로젝트와 실생활 문제 해결',
    order: 3
  }
];

export const units: Unit[] = [
  // 중학교 1학년
  {
    id: 'unit-1-1',
    gradeId: 'grade-1',
    name: '스크래치 시작하기',
    description: '스크래치 인터페이스와 기본 블록 익히기',
    order: 1,
    isPremium: false,
    estimatedHours: 4
  },
  {
    id: 'unit-1-2',
    gradeId: 'grade-1', 
    name: '움직이는 캐릭터 만들기',
    description: '스프라이트 움직임과 이벤트 처리',
    order: 2,
    isPremium: false,
    estimatedHours: 6
  },
  {
    id: 'unit-1-3',
    gradeId: 'grade-1',
    name: '반복과 조건',
    description: '프로그래밍의 핵심 구조 이해하기',
    order: 3,
    isPremium: true,
    estimatedHours: 8
  },
  // 중학교 2학년
  {
    id: 'unit-2-1',
    gradeId: 'grade-2',
    name: '변수와 연산',
    description: '데이터 저장과 계산 방법 학습',
    order: 1,
    isPremium: false,
    estimatedHours: 6
  },
  {
    id: 'unit-2-2',
    gradeId: 'grade-2',
    name: '게임 만들기',
    description: '인터랙티브 게임 프로젝트',
    order: 2,
    isPremium: true,
    estimatedHours: 10
  },
  // 중학교 3학년
  {
    id: 'unit-3-1',
    gradeId: 'grade-3',
    name: '알고리즘과 효율성',
    description: '문제 해결 전략과 최적화',
    order: 1,
    isPremium: false,
    estimatedHours: 8
  },
  {
    id: 'unit-3-2',
    gradeId: 'grade-3',
    name: '인공지능 기초',
    description: 'AI와 머신러닝 개념 이해',
    order: 2,
    isPremium: true,
    estimatedHours: 12
  }
];

export const lessons: Lesson[] = [
  // 1학년 - 스크래치 시작하기
  {
    id: 'lesson-1-1-1',
    unitId: 'unit-1-1',
    name: '스크래치란 무엇인가요?',
    description: '스크래치 프로그래밍 언어의 개념과 특징 이해하기',
    order: 1,
    type: 'theory',
    difficulty: 'beginner',
    isPremium: false,
    estimatedMinutes: 30,
    concepts: ['프로그래밍', '스크래치', '비주얼 프로그래밍'],
    content: {
      introduction: '스크래치는 MIT에서 개발한 교육용 프로그래밍 언어입니다. 블록을 끌어다 놓는 방식으로 쉽게 프로그래밍을 배울 수 있어요.',
      objectives: [
        '스크래치가 무엇인지 이해한다',
        '비주얼 프로그래밍의 특징을 안다',
        '스크래치로 만들 수 있는 것들을 안다'
      ],
      theory: {
        explanations: [
          {
            title: '스크래치의 탄생',
            content: '스크래치는 2007년 MIT 미디어랩에서 어린이와 청소년들이 쉽게 프로그래밍을 배울 수 있도록 만든 언어입니다.'
          },
          {
            title: '비주얼 프로그래밍',
            content: '텍스트로 코드를 작성하는 대신, 그래픽 요소(블록)를 사용해서 프로그램을 만드는 방법입니다.'
          }
        ],
        examples: [
          {
            title: '간단한 인사 프로그램',
            description: '고양이가 "안녕하세요!"라고 말하는 프로그램',
            code: '녹색 깃발을 클릭했을 때 → "안녕하세요!" 말하기'
          }
        ]
      }
    }
  },
  {
    id: 'lesson-1-1-2',
    unitId: 'unit-1-1',
    name: '첫 번째 프로젝트 만들기',
    description: '간단한 인사 프로그램을 직접 만들어보기',
    order: 2,
    type: 'practice',
    difficulty: 'beginner',
    isPremium: false,
    estimatedMinutes: 40,
    concepts: ['이벤트', '블록 연결'],
    content: {
      introduction: '이제 직접 스크래치로 첫 번째 프로그램을 만들어봅시다.',
      objectives: [
        '이벤트 블록을 사용할 수 있다',
        '블록을 연결하는 방법을 안다',
        '프로그램을 실행하고 결과를 확인한다'
      ],
      practice: {
        instructions: [
          '스크래치 사이트(scratch.mit.edu)에 접속하세요',
          '새 프로젝트를 만들어주세요',
          '"깃발 클릭했을 때" 블록을 찾아 스크립트 영역으로 끌어오세요',
          '"말하기" 블록을 연결하고 "안녕하세요!"로 바꾸세요',
          '녹색 깃발을 클릭해서 실행해보세요'
        ],
        hints: [
          '블록들이 제대로 연결되었는지 확인하세요',
          '텍스트를 바꾸려면 말하기 블록의 흰색 영역을 클릭하세요'
        ]
      }
    }
  },
  {
    id: 'quiz-1-1',
    unitId: 'unit-1-1',
    name: '스크래치 기초 퀴즈',
    description: '배운 내용을 확인하는 퀴즈',
    order: 3,
    type: 'quiz',
    difficulty: 'beginner',
    isPremium: false,
    estimatedMinutes: 15,
    concepts: ['스크래치', '기본 개념'],
    content: {
      introduction: '지금까지 배운 스크래치 기초 내용을 퀴즈로 확인해봅시다.',
      objectives: ['스크래치의 기본 개념을 확인한다'],
      quiz: {
        questions: [
          {
            id: 'q1',
            type: 'multiple-choice',
            question: '스크래치에서 프로그램이 실행되는 공간은 무엇인가요?',
            options: ['스크립트 영역', '무대', '블록 팔레트', '스프라이트 목록'],
            correctAnswer: '무대',
            explanation: '무대는 스프라이트들이 움직이고 프로그램이 실행되는 공간입니다.',
            points: 10
          },
          {
            id: 'q2',
            type: 'true-false',
            question: '스크래치는 텍스트 기반 프로그래밍 언어이다.',
            correctAnswer: 'false',
            explanation: '스크래치는 블록을 조립하는 비주얼 프로그래밍 언어입니다.',
            points: 10
          }
        ]
      }
    }
  }
];