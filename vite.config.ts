import { defineConfig } from 'vitest/config';

// Vite / Vitest 共通設定
// Vitest で localStorage を利用するために jsdom 環境を指定
export default defineConfig({
  server: {
    port: 5173,
    open: false,
    host: true
  },
  test: {
    environment: 'jsdom',
    clearMocks: true
  }
});
