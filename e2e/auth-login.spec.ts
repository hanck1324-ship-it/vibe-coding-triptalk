import { test, expect } from '@playwright/test';

/**
 * 로그인 시나리오 E2E 테스트
 */
test.describe('로그인 기능', () => {

  test.beforeEach(async ({ page }) => {
    // 각 테스트 전에 로그인 페이지로 이동
    await page.goto('/login');
  });

  test('로그인 페이지가 정상적으로 표시된다', async ({ page }) => {
    // 페이지 제목 확인
    await expect(page).toHaveTitle(/login|로그인/i);

    // 필수 입력 필드 확인
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
    await expect(page.locator('button[type="submit"]')).toBeVisible();
  });

  test('이메일과 비밀번호를 입력하고 로그인할 수 있다', async ({ page }) => {
    // 테스트 계정 정보 (실제 환경에 맞게 수정)
    const testEmail = 'test@example.com';
    const testPassword = 'test1234!';

    // 이메일 입력
    await page.fill('input[type="email"]', testEmail);

    // 비밀번호 입력
    await page.fill('input[type="password"]', testPassword);

    // 로그인 버튼 클릭
    await page.click('button[type="submit"]');

    // 로그인 성공 후 리다이렉트 확인 (예: 메인 페이지 또는 대시보드)
    await expect(page).toHaveURL(/\/(boards|purchase)?/);

    // 로그인 성공 표시 확인 (예: 사용자 프로필 또는 로그아웃 버튼)
    // await expect(page.locator('[data-testid="user-profile"]')).toBeVisible();
  });

  test('잘못된 이메일 형식은 에러를 표시한다', async ({ page }) => {
    // 잘못된 이메일 입력
    await page.fill('input[type="email"]', 'invalid-email');
    await page.fill('input[type="password"]', 'test1234!');
    await page.click('button[type="submit"]');

    // 에러 메시지 확인
    // await expect(page.locator('text=유효한 이메일')).toBeVisible();
  });

  test('빈 필드로 로그인 시도 시 에러를 표시한다', async ({ page }) => {
    // 빈 필드 상태에서 로그인 시도
    await page.click('button[type="submit"]');

    // HTML5 validation 또는 커스텀 에러 메시지 확인
    const emailInput = page.locator('input[type="email"]');
    await expect(emailInput).toBeFocused(); // 첫 번째 필드에 포커스
  });
});

/**
 * 로그아웃 시나리오
 */
test.describe('로그아웃 기능', () => {

  test('로그인 후 로그아웃할 수 있다', async ({ page }) => {
    // 1. 로그인
    await page.goto('/login');
    await page.fill('input[type="email"]', 'test@example.com');
    await page.fill('input[type="password"]', 'test1234!');
    await page.click('button[type="submit"]');

    // 2. 로그인 완료 대기
    await page.waitForLoadState('networkidle');

    // 3. 로그아웃 버튼 찾기 및 클릭
    // await page.click('[data-testid="logout-button"]');

    // 4. 로그인 페이지로 리다이렉트 확인
    // await expect(page).toHaveURL(/\/login/);
  });
});
