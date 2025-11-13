# E2E 테스트 가이드

## E2E (End-to-End) 테스팅이란?

E2E 테스팅은 **실제 사용자의 관점에서 애플리케이션 전체를 테스트**하는 방법입니다.

### 왜 E2E 테스트가 필요한가?

1. **실제 사용자 경험 검증**
   - 실제 브라우저에서 버튼 클릭, 폼 입력 등 시뮬레이션
   - UI/UX 버그를 사전에 발견

2. **회귀 버그 방지**
   - 새로운 기능 추가 시 기존 기능이 깨지지 않았는지 자동 확인
   - 매번 수동 테스트할 필요 없음

3. **자신감 있는 배포**
   - CI/CD 파이프라인에 통합하여 배포 전 자동 검증
   - 프로덕션 버그 감소

## 실행 방법

### 1. 모든 테스트 실행 (헤드리스 모드)

```bash
pnpm run test:e2e
```

### 2. UI 모드로 실행 (디버깅에 유용)

```bash
pnpm run test:e2e:ui
```

이 모드에서는:
- 테스트를 하나씩 선택해서 실행 가능
- 각 단계별로 스크린샷 확인
- 디버깅 모드로 중단점 설정 가능

### 3. 특정 테스트만 실행

```bash
# 파일명으로 필터링
pnpm exec playwright test example.spec.ts

# 테스트 이름으로 필터링
pnpm exec playwright test --grep "로그인"
```

### 4. 특정 브라우저에서만 실행

```bash
# Chromium만
pnpm exec playwright test --project=chromium

# Firefox만
pnpm exec playwright test --project=firefox

# 모바일 Chrome
pnpm exec playwright test --project="Mobile Chrome"
```

### 5. 테스트 리포트 보기

```bash
pnpm run test:e2e:report
```

## 테스트 작성 가이드

### 기본 구조

```typescript
import { test, expect } from '@playwright/test';

test('테스트 설명', async ({ page }) => {
  // 1. 페이지 이동
  await page.goto('/login');

  // 2. 요소와 상호작용
  await page.fill('input[type="email"]', 'user@example.com');
  await page.click('button[type="submit"]');

  // 3. 결과 검증
  await expect(page).toHaveURL('/dashboard');
});
```

### 유용한 선택자

```typescript
// 텍스트로 찾기
page.locator('text=로그인')
page.getByText('로그인')

// Role로 찾기 (권장)
page.getByRole('button', { name: '로그인' })

// data-testid로 찾기 (가장 안정적)
page.locator('[data-testid="login-button"]')

// CSS 선택자
page.locator('.login-button')
```

### data-testid 사용 예시

컴포넌트에 `data-testid` 추가:

```tsx
<button data-testid="purchase-button">구매하기</button>
```

테스트에서 사용:

```typescript
await page.locator('[data-testid="purchase-button"]').click();
```

## 베스트 프랙티스

### 1. 안정적인 선택자 사용

❌ 나쁜 예:
```typescript
page.locator('.css-123xyz')  // CSS 클래스는 변경될 수 있음
page.locator('div > button')  // DOM 구조에 의존
```

✅ 좋은 예:
```typescript
page.locator('[data-testid="login-button"]')
page.getByRole('button', { name: '로그인' })
```

### 2. 대기 처리

```typescript
// 네트워크 요청 완료 대기
await page.waitForLoadState('networkidle');

// 특정 요소가 나타날 때까지 대기
await page.waitForSelector('[data-testid="user-profile"]');

// 페이지 이동 대기
await Promise.all([
  page.waitForNavigation(),
  page.click('a[href="/dashboard"]')
]);
```

### 3. 테스트 격리

각 테스트는 독립적이어야 합니다:

```typescript
test.beforeEach(async ({ page }) => {
  // 각 테스트 전에 초기 상태로 설정
  await page.goto('/');
});
```

### 4. 스크린샷으로 디버깅

```typescript
// 실패 시 스크린샷 자동 저장 (playwright.config.ts에 설정됨)

// 수동으로 스크린샷 찍기
await page.screenshot({ path: 'screenshot.png' });

// 특정 요소만 스크린샷
await page.locator('.error-message').screenshot({ path: 'error.png' });
```

## 디버깅 팁

### 1. 헤드풀 모드로 실행

브라우저 창을 보면서 테스트:

```bash
pnpm exec playwright test --headed
```

### 2. 슬로우 모션 모드

각 액션 사이에 지연 추가:

```bash
pnpm exec playwright test --headed --slow-mo=1000
```

### 3. 디버거 사용

```typescript
test('디버깅 예제', async ({ page }) => {
  await page.goto('/login');

  // 여기서 일시정지
  await page.pause();

  await page.fill('input[type="email"]', 'test@example.com');
});
```

```bash
pnpm exec playwright test --debug
```

## CI/CD 통합

GitHub Actions 예시:

```yaml
name: E2E Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3

      - name: Install dependencies
        run: pnpm install

      - name: Install Playwright browsers
        run: pnpm exec playwright install --with-deps

      - name: Run E2E tests
        run: pnpm run test:e2e

      - name: Upload test results
        if: always()
        uses: actions/upload-artifact@v3
        with:
          name: playwright-report
          path: playwright-report/
```

## 추가 리소스

- [Playwright 공식 문서](https://playwright.dev)
- [Best Practices](https://playwright.dev/docs/best-practices)
- [Selectors Guide](https://playwright.dev/docs/selectors)
