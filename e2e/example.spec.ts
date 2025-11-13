import { test, expect } from '@playwright/test';

/**
 * 기본 페이지 접속 테스트
 */
test('홈페이지가 정상적으로 로드된다', async ({ page }) => {
  await page.goto('/');

  // 페이지가 로드되었는지 확인
  await expect(page).toHaveTitle(/My trip talk/i);
});

/**
 * 로그인 페이지 테스트
 */
test.describe('로그인 기능', () => {
  test('로그인 페이지가 표시된다', async ({ page }) => {
    await page.goto('/login');

    // 로그인 폼 요소 확인
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });
});

/**
 * 숙박권 목록 페이지 테스트
 */
test.describe('숙박권 목록', () => {
  test('숙박권 목록 페이지가 로드된다', async ({ page }) => {
    await page.goto('/purchase/list');

    // 페이지 로드 확인
    await expect(page).toHaveURL(/\/purchase\/list/);
  });
});

/**
 * 반응형 디자인 테스트 (모바일)
 */
test.describe('모바일 뷰', () => {
  test.use({
    viewport: { width: 375, height: 667 } // iPhone SE 크기
  });

  test('모바일에서 홈페이지가 정상적으로 표시된다', async ({ page }) => {
    await page.goto('/');

    // 모바일 뷰포트에서 페이지가 로드되는지 확인
    await expect(page).toHaveTitle(/My trip talk/i);
  });
});
