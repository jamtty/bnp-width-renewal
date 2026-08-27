import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  // 앱이 서버 문서 루트(/)에 배포되므로 base는 '/'로 고정한다.
  // '/renewal/'을 쓰면 assets 경로가 /renewal/... 로 생성되어
  // 실제 배포 위치와 어긋나 404 -> index.html(text/html) 응답 -> JS 모듈 로드 실패가 발생한다.
  base: '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 5174,
    open: true,
    fs: {
      allow: ['..'],
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom') || id.includes('node_modules/react-router-dom')) {
            return 'vendor'
          }
          if (id.includes('@tiptap')) {
            return 'tiptap'
          }
          if (id.includes('swiper')) {
            return 'swiper'
          }
        },
      },
    },
  },
})
