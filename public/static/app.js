// 스크래치 코딩 교실 - 메인 JavaScript

class ScratchEducationApp {
  constructor() {
    this.currentUser = null;
    this.init();
  }

  init() {
    this.loadUserData();
    this.setupEventListeners();
  }

  loadUserData() {
    const savedUser = localStorage.getItem('scratchUser');
    if (savedUser) {
      this.currentUser = JSON.parse(savedUser);
    }
  }

  setupEventListeners() {
    // 학습 시작 버튼들
    document.addEventListener('click', (e) => {
      if (e.target.dataset.action === 'start-learning') {
        const gradeId = e.target.dataset.gradeId;
        this.startLearning(gradeId);
      } else if (e.target.dataset.action === 'free-trial') {
        this.startFreeTrial();
      }
    });
  }

  async startLearning(gradeId) {
    this.showNotification('학습을 시작합니다...', 'info');
    
    try {
      const response = await fetch(`/api/grades/${gradeId}/units`);
      const data = await response.json();
      
      if (data.success) {
        this.renderUnits(data.units, gradeId);
      }
    } catch (error) {
      console.error('단원 로드 실패:', error);
      this.showNotification('단원 정보를 불러오는데 실패했습니다.', 'error');
    }
  }

  startFreeTrial() {
    if (!this.currentUser) {
      this.showUserRegistration();
    } else {
      this.startLearning('grade-1');
    }
  }

  renderUnits(units, gradeId) {
    const modal = this.createModal();
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">📚 학습 단원</h2>
        <p class="text-gray-600">원하는 단원을 선택해서 학습을 시작하세요</p>
      </div>
      
      <div class="space-y-4">
        ${units.map(unit => `
          <div class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer unit-card" data-unit-id="${unit.id}">
            <div class="flex justify-between items-start mb-2">
              <h3 class="font-semibold text-gray-800">${unit.name}</h3>
              ${unit.isPremium ? '<span class="premium-badge">프리미엄</span>' : '<span class="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">무료</span>'}
            </div>
            <p class="text-gray-600 text-sm mb-2">${unit.description}</p>
            <div class="flex justify-between items-center text-xs text-gray-500">
              <span>⏱️ 예상 시간: ${unit.estimatedHours}시간</span>
              <span>📊 순서: ${unit.order}번째</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // 단원 클릭 이벤트
    modal.querySelectorAll('.unit-card').forEach(card => {
      card.addEventListener('click', () => {
        const unitId = card.dataset.unitId;
        this.loadLessons(unitId);
        this.closeModal(modal);
      });
    });

    document.body.appendChild(modal);
    modal.style.display = 'flex';
  }

  async loadLessons(unitId) {
    try {
      this.showNotification('레슨을 불러오는 중...', 'info');
      
      const response = await fetch(`/api/units/${unitId}/lessons`);
      const data = await response.json();
      
      if (data.success) {
        this.renderLessons(data.lessons, unitId);
      }
    } catch (error) {
      console.error('레슨 로드 실패:', error);
      this.showNotification('레슨을 불러오는데 실패했습니다.', 'error');
    }
  }

  renderLessons(lessons, unitId) {
    const modal = this.createModal();
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
      <div class="mb-6">
        <h2 class="text-2xl font-bold text-gray-800 mb-2">📖 레슨 목록</h2>
        <p class="text-gray-600">순서대로 학습하시는 것을 권장합니다</p>
      </div>
      
      <div class="space-y-3">
        ${lessons.map((lesson, index) => `
          <div class="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer lesson-card" data-lesson-id="${lesson.id}">
            <div class="flex justify-between items-start mb-2">
              <div class="flex-1">
                <div class="flex items-center gap-2 mb-1">
                  <span class="text-sm font-medium text-gray-500">${index + 1}.</span>
                  <h3 class="font-semibold text-gray-800">${lesson.name}</h3>
                  <span class="difficulty-${lesson.difficulty}">${this.getDifficultyText(lesson.difficulty)}</span>
                </div>
                <p class="text-gray-600 text-sm">${lesson.description}</p>
              </div>
              ${lesson.isPremium ? '<span class="premium-badge ml-2">프리미엄</span>' : ''}
            </div>
            
            <div class="flex justify-between items-center text-xs text-gray-500 mt-3">
              <span>📚 ${this.getLessonTypeText(lesson.type)}</span>
              <span>⏱️ ${lesson.estimatedMinutes}분</span>
              <span class="text-blue-600 font-medium">시작하기 →</span>
            </div>
          </div>
        `).join('')}
      </div>
    `;

    // 레슨 클릭 이벤트
    modal.querySelectorAll('.lesson-card').forEach(card => {
      card.addEventListener('click', () => {
        const lessonId = card.dataset.lessonId;
        this.startLesson(lessonId);
        this.closeModal(modal);
      });
    });

    document.body.appendChild(modal);
    modal.style.display = 'flex';
  }

  async startLesson(lessonId) {
    try {
      this.showNotification('레슨을 시작합니다...', 'info');
      
      const response = await fetch(`/api/lessons/${lessonId}`);
      const data = await response.json();
      
      if (data.success) {
        this.renderLessonContent(data.lesson);
      }
    } catch (error) {
      console.error('레슨 시작 실패:', error);
      this.showNotification('레슨을 시작하는데 실패했습니다.', 'error');
    }
  }

  renderLessonContent(lesson) {
    const modal = this.createModal('lesson-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
      <div class="lesson-header mb-6">
        <div class="flex justify-between items-start mb-4">
          <div>
            <h1 class="text-2xl font-bold text-gray-800">${lesson.name}</h1>
            <p class="text-gray-600 mt-1">${lesson.description}</p>
          </div>
          <div class="flex gap-2">
            <span class="difficulty-${lesson.difficulty}">${this.getDifficultyText(lesson.difficulty)}</span>
            <span class="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">⏱️ ${lesson.estimatedMinutes}분</span>
          </div>
        </div>
        
        <div class="bg-blue-50 p-4 rounded-lg mb-4">
          <h3 class="font-semibold text-blue-800 mb-2">🎯 학습 목표</h3>
          <ul class="text-blue-700 text-sm space-y-1">
            ${lesson.content.objectives.map(obj => `<li>• ${obj}</li>`).join('')}
          </ul>
        </div>
      </div>
      
      <div class="lesson-content">
        ${this.renderLessonContentByType(lesson)}
      </div>
      
      <div class="lesson-footer mt-8 pt-6 border-t">
        <div class="flex justify-between">
          <button class="bg-gray-500 hover:bg-gray-600 text-white px-6 py-2 rounded-lg transition-colors" onclick="scratchApp.closeModal(document.querySelector('.lesson-modal'))">
            닫기
          </button>
          <button class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg transition-colors" onclick="scratchApp.completeLesson('${lesson.id}')">
            완료하기
          </button>
        </div>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';
  }

  renderLessonContentByType(lesson) {
    switch (lesson.type) {
      case 'theory':
        return this.renderTheoryContent(lesson.content);
      case 'practice':
        return this.renderPracticeContent(lesson.content);
      case 'quiz':
        return this.renderQuizContent(lesson.content);
      default:
        return '<p>내용을 준비 중입니다.</p>';
    }
  }

  renderTheoryContent(content) {
    if (!content.theory) return '<p>이론 내용이 없습니다.</p>';
    
    return `
      <div class="theory-content">
        ${content.theory.explanations.map(explanation => `
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-3">${explanation.title}</h3>
            <div class="bg-white p-4 rounded-lg border">
              <p class="text-gray-700 leading-relaxed">${explanation.content}</p>
            </div>
          </div>
        `).join('')}
        
        ${content.theory.examples.length > 0 ? `
          <div class="examples-section mt-8">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">💡 예시</h3>
            ${content.theory.examples.map(example => `
              <div class="bg-yellow-50 border border-yellow-200 p-4 rounded-lg mb-4">
                <h4 class="font-medium text-yellow-800 mb-2">${example.title}</h4>
                <p class="text-yellow-700 text-sm mb-3">${example.description}</p>
                <div class="bg-white p-3 rounded border">
                  <code class="text-blue-600">${example.code}</code>
                </div>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  renderPracticeContent(content) {
    if (!content.practice) return '<p>실습 내용이 없습니다.</p>';
    
    return `
      <div class="practice-content">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">🛠️ 실습 과제</h3>
          <div class="bg-green-50 border border-green-200 p-4 rounded-lg">
            <h4 class="font-medium text-green-800 mb-2">실습 활동</h4>
            <p class="text-green-700">아래 단계를 따라 스크래치에서 직접 실습해보세요.</p>
          </div>
        </div>
        
        <div class="mb-6">
          <h4 class="font-medium text-gray-800 mb-3">📋 단계별 안내</h4>
          <ol class="space-y-2">
            ${content.practice.instructions.map((instruction, index) => `
              <li class="flex gap-3">
                <span class="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium">${index + 1}</span>
                <span class="text-gray-700">${instruction}</span>
              </li>
            `).join('')}
          </ol>
        </div>
        
        ${content.practice.hints.length > 0 ? `
          <div class="hints-section">
            <h4 class="font-medium text-gray-800 mb-3">💡 힌트</h4>
            <div class="bg-blue-50 border border-blue-200 p-4 rounded-lg">
              <ul class="text-blue-700 space-y-1">
                ${content.practice.hints.map(hint => `<li>• ${hint}</li>`).join('')}
              </ul>
            </div>
          </div>
        ` : ''}
        
        <div class="mt-8 p-4 bg-orange-50 border border-orange-200 rounded-lg">
          <h4 class="font-medium text-orange-800 mb-2">🔗 스크래치 사이트 방문하기</h4>
          <p class="text-orange-700 text-sm mb-3">실습을 위해 스크래치 공식 사이트에서 프로젝트를 만들어보세요.</p>
          <a href="https://scratch.mit.edu/projects/editor/" target="_blank" class="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded text-sm transition-colors">
            스크래치 편집기 열기 ↗
          </a>
        </div>
      </div>
    `;
  }

  renderQuizContent(content) {
    if (!content.quiz) return '<p>퀴즈 내용이 없습니다.</p>';
    
    return `
      <div class="quiz-content">
        <div class="mb-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">📝 퀴즈</h3>
          <p class="text-gray-600">아래 문제들을 풀어보세요.</p>
        </div>
        
        <div class="space-y-6">
          ${content.quiz.questions.map((question, index) => `
            <div class="question-card bg-white border rounded-lg p-6">
              <div class="mb-4">
                <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm font-medium">문제 ${index + 1}</span>
                <span class="ml-2 text-gray-500 text-sm">(${question.points}점)</span>
              </div>
              
              <h4 class="font-medium text-gray-800 mb-4">${question.question}</h4>
              
              ${this.renderQuestionByType(question, index)}
              
              <div class="mt-4 p-3 bg-gray-50 rounded text-sm text-gray-600">
                <strong>설명:</strong> ${question.explanation}
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  renderQuestionByType(question, questionIndex) {
    switch (question.type) {
      case 'multiple-choice':
        return `
          <div class="space-y-2">
            ${question.options.map((option, optionIndex) => `
              <div class="flex items-center p-3 border rounded-lg ${option === question.correctAnswer ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'}">
                <span class="mr-3 ${option === question.correctAnswer ? 'text-green-600' : 'text-gray-600'}">${option === question.correctAnswer ? '✓' : '○'}</span>
                <span class="${option === question.correctAnswer ? 'text-green-800 font-medium' : ''}">${option}</span>
              </div>
            `).join('')}
          </div>
        `;
      case 'true-false':
        return `
          <div class="space-y-2">
            <div class="flex items-center p-3 border rounded-lg ${question.correctAnswer === 'true' ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'}">
              <span class="mr-3 ${question.correctAnswer === 'true' ? 'text-green-600' : 'text-gray-600'}">${question.correctAnswer === 'true' ? '✓' : '○'}</span>
              <span class="${question.correctAnswer === 'true' ? 'text-green-800 font-medium' : ''}">참 (True)</span>
            </div>
            <div class="flex items-center p-3 border rounded-lg ${question.correctAnswer === 'false' ? 'bg-green-50 border-green-200' : 'hover:bg-gray-50'}">
              <span class="mr-3 ${question.correctAnswer === 'false' ? 'text-green-600' : 'text-gray-600'}">${question.correctAnswer === 'false' ? '✓' : '○'}</span>
              <span class="${question.correctAnswer === 'false' ? 'text-green-800 font-medium' : ''}">거짓 (False)</span>
            </div>
          </div>
        `;
      default:
        return '<p class="text-gray-500">준비 중인 문제 유형입니다.</p>';
    }
  }

  async completeLesson(lessonId) {
    try {
      const progressData = {
        userId: this.currentUser?.id || 'guest',
        lessonId: lessonId,
        status: 'completed',
        score: 100
      };

      const response = await fetch('/api/progress', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(progressData)
      });

      if (response.ok) {
        this.showNotification('레슨을 완료했습니다! 🎉', 'success');
        
        const modal = document.querySelector('.lesson-modal');
        if (modal) {
          this.closeModal(modal);
        }
      }
    } catch (error) {
      console.error('레슨 완료 처리 실패:', error);
      this.showNotification('완료 처리 중 오류가 발생했습니다.', 'error');
    }
  }

  getDifficultyText(difficulty) {
    const difficultyMap = {
      'beginner': '초급',
      'intermediate': '중급',
      'advanced': '고급'
    };
    return difficultyMap[difficulty] || difficulty;
  }

  getLessonTypeText(type) {
    const typeMap = {
      'theory': '이론',
      'practice': '실습',
      'quiz': '퀴즈',
      'project': '프로젝트'
    };
    return typeMap[type] || type;
  }

  createModal(className = 'custom-modal') {
    const modal = document.createElement('div');
    modal.className = `fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 ${className}`;
    modal.style.display = 'none';
    
    modal.innerHTML = `
      <div class="bg-white rounded-xl max-w-4xl max-h-[90vh] overflow-y-auto m-4 modal-content p-8 relative">
        <button class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl" onclick="scratchApp.closeModal(this.closest('.${className}'))">&times;</button>
        <!-- 내용이 여기에 들어감 -->
      </div>
    `;

    return modal;
  }

  closeModal(modal) {
    if (modal) {
      modal.remove();
    }
  }

  showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.remove();
    }, 3000);
  }

  showUserRegistration() {
    const modal = this.createModal('registration-modal');
    const modalContent = modal.querySelector('.modal-content');
    
    modalContent.innerHTML = `
      <div class="text-center">
        <h2 class="text-2xl font-bold text-gray-800 mb-4">🚀 학습을 시작해보세요!</h2>
        <p class="text-gray-600 mb-6">간단한 정보를 입력하고 무료로 코딩을 배워보세요</p>
        
        <form id="registration-form" class="space-y-4">
          <div>
            <input type="text" name="name" placeholder="이름을 입력하세요" class="w-full p-3 border rounded-lg" required>
          </div>
          <div>
            <select name="grade" class="w-full p-3 border rounded-lg" required>
              <option value="">학년을 선택하세요</option>
              <option value="grade-1">중학교 1학년</option>
              <option value="grade-2">중학교 2학년</option>
              <option value="grade-3">중학교 3학년</option>
            </select>
          </div>
          <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
            무료 체험 시작하기
          </button>
        </form>
      </div>
    `;

    document.body.appendChild(modal);
    modal.style.display = 'flex';

    modal.querySelector('#registration-form').addEventListener('submit', (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      
      this.currentUser = {
        id: 'user_' + Date.now(),
        name: formData.get('name') || '사용자',
        grade: formData.get('grade') || 'grade-1',
        isPremium: false
      };
      
      localStorage.setItem('scratchUser', JSON.stringify(this.currentUser));
      
      this.closeModal(modal);
      this.showNotification('환영합니다! 학습을 시작해보세요 🎉', 'success');
      this.startLearning('grade-1');
    });
  }
}

// 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
  window.scratchApp = new ScratchEducationApp();
});