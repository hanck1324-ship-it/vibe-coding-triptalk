import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright E2E 테스트 설정
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
  testDir: './e2e',
  /* 병렬 테스트 실행 */
  fullyParallel: true,
  /* CI에서 재시도 */
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  /* CI에서 병렬 처리 제한 */
  workers: process.env.CI ? 1 : undefined,
  /* 리포터 설정 */
  reporter: 'html',
  /* 모든 테스트에 공통 설정 */
  use: {
    /* 실패 시 스크린샷 등 수집 */
    trace: 'on-first-retry',
    /* Base URL for navigation */
    baseURL: 'http://localhost:3000',
  },

  /* 다양한 브라우저 설정 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* 모바일 뷰포트 테스트 */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* 테스트 실행 전 dev 서버 시작 */
  webServer: {
    command: 'pnpm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
