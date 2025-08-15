import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { serveStatic } from 'hono/cloudflare-workers'
import { renderer } from './renderer'
import { grades, units, lessons } from './data/curriculum'
import { translations, supportedLanguages, defaultLanguage } from './data/translations'

const app = new Hono()

// CORS 설정
app.use('/api/*', cors())

// 정적 파일 서빙
app.use('/static/*', serveStatic({ root: './public' }))

// 렌더러 사용
app.use(renderer)

// API 라우트들
app.get('/api/grades', (c) => {
  return c.json({ grades, success: true })
})

app.get('/api/grades/:gradeId/units', (c) => {
  const gradeId = c.req.param('gradeId')
  const gradeUnits = units.filter(unit => unit.gradeId === gradeId)
  return c.json({ units: gradeUnits, success: true })
})

app.get('/api/units/:unitId/lessons', (c) => {
  const unitId = c.req.param('unitId')
  const unitLessons = lessons.filter(lesson => lesson.unitId === unitId)
  return c.json({ lessons: unitLessons, success: true })
})

app.get('/api/lessons/:lessonId', (c) => {
  const lessonId = c.req.param('lessonId')
  const lesson = lessons.find(l => l.id === lessonId)
  
  if (!lesson) {
    return c.json({ error: 'Lesson not found', success: false }, 404)
  }
  
  return c.json({ lesson, success: true })
})

// 진도 관리 API
app.post('/api/progress', async (c) => {
  try {
    const { userId, lessonId, status, score } = await c.req.json()
    
    const progress = {
      userId,
      lessonId,
      status,
      score,
      completedAt: status === 'completed' ? new Date() : null
    }
    
    return c.json({ progress, success: true })
  } catch (error) {
    return c.json({ error: 'Invalid request', success: false }, 400)
  }
})

// 다국어 지원 API
app.get('/api/translations/:lang', (c) => {
  const lang = c.req.param('lang')
  const translation = translations[lang] || translations[defaultLanguage]
  return c.json({ translation, supportedLanguages, success: true })
})

// 앱 설정 API
app.get('/api/settings', (c) => {
  const defaultSettings = {
    language: defaultLanguage,
    theme: 'light'
  }
  return c.json({ settings: defaultSettings, success: true })
})

// 메인 페이지
app.get('/', (c) => {
  return c.render(
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        {/* 상단 설정 바 */}
        <div className="flex justify-end mb-4">
          <button 
            id="settings-btn"
            className="bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 p-2 rounded-lg shadow-md hover:shadow-lg transition-all"
            data-action="open-settings"
            title="Settings"
          >
            <i className="fas fa-cog text-lg"></i>
          </button>
        </div>

        <header className="text-center mb-12">
          <h1 id="main-title" className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-white mb-4">
            🚀 스크래치 코딩 교실
          </h1>
          <p id="main-subtitle" className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            중학생을 위한 체계적인 스크래치 프로그래밍 학습 플랫폼
          </p>
        </header>

        <div className="grid md:grid-cols-3 gap-8 mb-12" id="grades-container">
          {grades.map((grade, index) => (
            <div key={grade.id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all card-hover">
              <div className="text-center">
                <div className="text-3xl mb-4">
                  {index === 0 ? '🌱' : index === 1 ? '🌿' : '🌳'}
                </div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2" data-i18n={`grade${index + 1}`}>
                  {grade.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4" data-i18n={`grade${index + 1}Desc`}>
                  {grade.description}
                </p>
                <button 
                  className="bg-blue-500 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors btn-animated"
                  data-action="start-learning"
                  data-grade-id={grade.id}
                  data-i18n="startLearning"
                >
                  학습 시작하기
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-8 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6 text-center" data-i18n="learningFeatures">
            📚 학습 특징
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-semibold text-gray-800 dark:text-white" data-i18n="stepByStep">단계별 난이도</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1" data-i18n="stepByStepDesc">기초부터 고급까지 체계적 학습</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">📱</div>
              <h4 className="font-semibold text-gray-800 dark:text-white" data-i18n="mobileOptimized">모바일 최적화</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1" data-i18n="mobileOptimizedDesc">스마트폰, 태블릿 완벽 지원</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">🎮</div>
              <h4 className="font-semibold text-gray-800 dark:text-white" data-i18n="practiceOriented">실습 중심</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1" data-i18n="practiceOrientedDesc">게임과 프로젝트로 재미있게</p>
            </div>
            <div className="text-center">
              <div className="text-3xl mb-2">⭐</div>
              <h4 className="font-semibold text-gray-800 dark:text-white" data-i18n="premiumCourses">프리미엄 과정</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1" data-i18n="premiumCoursesDesc">고급 기능과 개인 지도</p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4" data-i18n="startNow">지금 바로 시작해보세요!</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">기초 과정은 무료로 제공됩니다</p>
          <button 
            className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-lg text-lg font-semibold transition-all transform hover:scale-105"
            data-action="free-trial"
            data-i18n="freeTrial"
          >
            무료 체험하기
          </button>
        </div>
      </div>
    </div>
  )
})

export default app
