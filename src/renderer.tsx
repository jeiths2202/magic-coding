import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children }) => {
  return (
    <html lang="ko">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>스크래치 코딩 교실 - 중학생을 위한 프로그래밍 학습</title>
        <meta name="description" content="중학생을 위한 체계적인 스크래치 프로그래밍 교육 플랫폼. 단계별 난이도 조절과 모바일 지원으로 언제 어디서나 코딩을 배워보세요." />
        
        {/* TailwindCSS CDN */}
        <script src="https://cdn.tailwindcss.com"></script>
        
        {/* 폰트 */}
        <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        
        {/* Font Awesome Icons */}
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        
        {/* 커스텀 스타일 */}
        <link href="/static/style.css" rel="stylesheet" />
        
        {/* PWA 메타 태그들 */}
        <meta name="theme-color" content="#3B82F6" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="스크래치 코딩 교실" />
        
        {/* 파비콘 */}
        <link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚀</text></svg>" />
      </head>
      <body style="font-family: 'Noto Sans KR', sans-serif;">
        {children}
        
        {/* JavaScript */}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})
