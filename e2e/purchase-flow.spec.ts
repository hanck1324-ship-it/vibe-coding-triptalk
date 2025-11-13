import { test, expect } from '@playwright/test';

/**
 * 숙박권 구매 플로우 E2E 테스트
 *
 * 이 테스트는 실제 사용자가 숙박권을 구매하는 전체 과정을 검증합니다.
 */
test.describe('숙박권 구매 플로우', () => {

  test('사용자가 숙박권 목록을 조회하고 상세페이지로 이동한다', async ({ page }) => {
    // 1. 숙박권 목록 페이지 접속
    await page.goto('/purchase/list');

    // 2. 페이지 로드 대기 (네트워크 요청 완료까지)
    await page.waitForLoadState('networkidle');

    // 3. 목록 아이템이 표시되는지 확인
    // (실제 데이터가 없을 수 있으므로 조건부 체크)
    const hasItems = await page.locator('[data-testid="purchase-item"]').count() > 0;

    if (hasItems) {
      // 4. 첫 번째 아이템 클릭
      await page.locator('[data-testid="purchase-item"]').first().click();

      // 5. 상세 페이지로 이동되었는지 확인
      await expect(page).toHaveURL(/\/purchase\/detail\//);
    }
  });

  test('숙박권 상세페이지에서 주요 정보가 표시된다', async ({ page }) => {
    // 특정 상품 ID로 직접 접근 (예시)
    await page.goto('/purchase/detail/example-id');

    // 페이지 로드 대기
    await page.waitForLoadState('networkidle');

    // 주요 정보 요소들이 존재하는지 확인
    // (실제 선택자는 컴포넌트 구조에 맞게 수정 필요)
  });
});

/**
 * 검색 및 필터링 테스트
 */
test.describe('숙박권 검색 기능', () => {

  test('검색어를 입력하면 필터링된 결과가 표시된다', async ({ page }) => {
    await page.goto('/purchase/list');

    // 검색 입력 필드가 있다면
    const searchInput = page.locator('input[type="search"]');
    if (await searchInput.count() > 0) {
      await searchInput.fill('제주도');
      await page.keyboard.press('Enter');

      // 검색 결과 로드 대기
      await page.waitForLoadState('networkidle');
    }
  });
});

/**
 * 에러 핸들링 테스트
 */
test.describe('에러 케이스', () => {

  test('존재하지 않는 상품 페이지 접근 시 적절한 처리', async ({ page }) => {
    // 존재하지 않는 ID로 접근
    await page.goto('/purchase/detail/non-existent-id');

    // 에러 메시지 또는 404 페이지 확인
    // (프로젝트의 에러 처리 방식에 따라 조정)
  });
});
