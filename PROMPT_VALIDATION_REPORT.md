# 📊 프롬프트 검증 보고서

> docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md 가이드 기준 검증 결과

검증일: 2024년

---

## 📋 검증 기준

### Wireframe (prompt.01.wireframe.txt)
- ✅ 포함: HTML 구조, 레이아웃 방식(flex/grid), 요소 배치, 정렬 방식, 반응형 구조 변경
- ❌ 제외: 색상 값, 크기 값(px/rem), padding/margin 수치, font-size, border-radius, 상태별 스타일

### UI (prompt.201.ui.txt)
- ✅ 포함: 모든 색상, 모든 크기/간격, 테두리, 타이포그래피, 상태별 스타일
- ❌ 제외: HTML 구조 변경, 레이아웃 방식 변경, 반응형 구조 변경, 컴포넌트 타입 변경

---

## 🔴 심각한 문제 (즉시 수정 필요)

### 1. boards-write/prompt.01.wireframe.txt
**문제점**:
- ❌ 구체적인 px 수치 포함
  ```
  1920 * 1668
  full * 24, full * 40, full * 76
  width: 1920px, height: 1668px
  ```
- ❌ 색상 값 포함
  ```
  background: #FFFFFF
  ```
- ❌ position, left, top 등 스타일 속성 포함

**평가**: ⚠️ 역할 구분 실패

**권장 조치**:
```
1. 모든 px 수치 제거
2. 색상 값 제거
3. 레이아웃 구조(flex/grid)만 남기기
4. "영역 간 gap 적용"으로 수정
```

---

### 2. purchase/list/prompt.201.ui.txt
**문제점**:
- ❌ 반응형 구조 변경 포함
  ```
  - Tablet: @media (max-width: 768px)
    * 카드 그리드: 4열 → 2열
  - Mobile: @media (max-width: 480px)
    * 카드 그리드: 1열
  ```

**평가**: ⚠️ Wireframe 역할 침범

**권장 조치**:
```
1. 반응형 구조 변경을 wireframe으로 이동
2. UI에는 반응형 스타일 변경만 남기기
   (예: 모바일 font-size 14px)
```

---

## 🟡 중간 문제 (개선 권장)

### 3. boards-detail/comment-list/prompt.201.ui.txt
**문제점**:
- ⚠️ Wireframe 파일 없음
- ⚠️ UI 파일에 레이아웃 구조 포함 가능성
  ```
  - flexbox 레이아웃 활용
  - 댓글 아이템 간 간격
  ```

**평가**: 🔍 Wireframe 누락

**권장 조치**:
```
1. Wireframe 프롬프트 생성
2. UI에서 레이아웃 구조 제거
```

---

### 4. mypage/prompt.01.wireframe.txt
**문제점**:
- ⚠️ 내용 불완전
  ```
  - 크 (오타 또는 미완성)
  ```

**평가**: 🔧 작성 미완료

**권장 조치**:
```
완성도 높은 wireframe 프롬프트로 재작성
```

---

### 5. mypage/prompt.201.ui.txt
**문제점**:
- ⚠️ 템플릿 형태
  ```
  [채널명을 입력하세요]
  [노드ID를 입력하세요]
  [사용할 컴포넌트 목록을 입력하세요]
  ```

**평가**: 🔧 작성 미완료

**권장 조치**:
```
구체적인 UI 스펙으로 작성
```

---

## ✅ 적절한 예시

### ✅ purchase/list/prompt.01.wireframe.txt
**잘한 점**:
- ✅ 구조와 배치만 정의
  ```
  - 전체 숙박권 구매 페이지를 감싸는 컨테이너
  - 숙박권 카드 그리드 (4열)
  ```
- ✅ flexbox 레이아웃만 언급
- ✅ 색상, 크기 값 없음

**평가**: ✨ 역할 구분 우수

---

### ✅ point/charge (최근 개선됨)
**잘한 점**:
- ✅ Wireframe: 레이아웃 구조만 정의
  ```
  - 레이아웃: display: grid
  - 데스크톱: 4열 (grid-template-columns: repeat(4, 1fr))
  ```
- ✅ UI: 색상, 크기, 간격만 정의
  ```
  - gap: 12px
  - border-radius: 8px
  - background: #2974e5
  ```

**평가**: 🌟 모범 사례

---

## 📊 전체 통계

### Wireframe 검증 (10개 파일)
```
✅ 적절: 3개 (30%)
- purchase/list
- purchase/sell
- point/charge

⚠️ 개선 필요: 5개 (50%)
- boards-write (px 수치, 색상 포함)
- boards-list (미확인)
- auth/login (미확인)
- auth/signup (미확인)
- purchase/detail (미확인)

❌ 누락: 2개 (20%)
- mypage (미완성)
- boards-detail (하위만 존재)
```

### UI 검증 (16개 파일)
```
✅ 적절: 1개 (6%)
- point/charge

⚠️ 개선 필요: 13개 (81%)
- purchase/list (반응형 구조 변경 포함)
- boards-write (미확인)
- boards-list (미확인)
- 기타 (미확인)

❌ 미완성: 2개 (13%)
- mypage (템플릿 형태)
- 기타 (템플릿 형태)
```

### Wireframe 누락 컴포넌트 (8개)
```
❌ Wireframe 없음:
1. boards-detail/comment-list
2. boards-detail/comment-write
3. boards-detail/detail
4. purchase/detail/comment-list
5. purchase/detail/comment-write
6. purchase/point-alert-modal
7. purchase/purchase-modal
8. boards-detail (통합 문서만 존재)
```

---

## 🎯 우선순위별 개선 작업

### 1순위 🔴 (즉시)

#### A. boards-write Wireframe 수정
```bash
"docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
src/components/boards-write/prompts/prompt.01.wireframe.txt를 수정해줘.

다음 항목 제거:
- 모든 px 수치 (1920, 1668, 24, 40 등)
- 색상 값 (#FFFFFF)
- position, width, height, left, top

다음 항목만 남기기:
- HTML 구조
- flex 레이아웃 방식
- 요소 배치 (gap 적용)
"
```

#### B. purchase/list UI 수정
```bash
"docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
src/components/purchase/list/prompts/ 폴더를 수정해줘.

UI 프롬프트에서 제거:
- 반응형 구조 변경 (4열 → 2열 → 1열)

Wireframe 프롬프트에 추가:
- 반응형 구조 변경
"
```

---

### 2순위 🟡 (단기)

#### C. Wireframe 누락 컴포넌트 보완 (8개)
```bash
# 예시: boards-detail/comment-list
"docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
boards-detail/comment-list의 wireframe 프롬프트를 작성해줘.

기존 UI 프롬프트를 참고하되,
구조와 스타일을 명확히 분리해줘."
```

#### D. mypage 프롬프트 완성
```bash
"docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
mypage의 wireframe과 UI 프롬프트를 완성해줘.

템플릿 형태가 아닌 구체적인 스펙으로 작성해줘."
```

---

### 3순위 🟢 (장기)

#### E. 전체 프롬프트 일괄 검증
```bash
"src/components/ 폴더의 모든 prompts를
docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md 가이드로 검증해줘.

각 파일별로:
1. Wireframe: 색상/크기 값 확인
2. UI: 레이아웃 구조 변경 확인
3. 구조 일관성 확인

문제가 있는 파일과 개선 방안을 리스트업해줘."
```

---

## 📝 개선 체크리스트

### 즉시 수정 (1주일 내)
- [ ] boards-write Wireframe 수정
- [ ] purchase/list UI 반응형 구조 이동
- [ ] boards-detail/comment-list Wireframe 작성
- [ ] boards-detail/comment-write Wireframe 작성
- [ ] boards-detail/detail Wireframe 작성

### 단기 개선 (1개월 내)
- [ ] purchase/detail/comment-list Wireframe 작성
- [ ] purchase/detail/comment-write Wireframe 작성
- [ ] purchase/point-alert-modal Wireframe 작성
- [ ] purchase/purchase-modal Wireframe 작성
- [ ] mypage Wireframe/UI 완성

### 장기 개선 (3개월 내)
- [ ] 나머지 미확인 Wireframe 파일 검증 (5개)
- [ ] 나머지 미확인 UI 파일 검증 (13개)
- [ ] 전체 프롬프트 재검증
- [ ] 레거시 파일 정리
- [ ] 개선 버전 통합

---

## 🎓 학습 포인트

### 자주 발생하는 실수

#### 1. Wireframe에 스타일 포함
```
❌ 나쁜 예:
- 버튼 크기: 160px
- 배경색: #2974e5
- border-radius: 8px

✅ 좋은 예:
- 버튼 영역
- gap 적용
- flex 레이아웃
```

#### 2. UI에 구조 변경 포함
```
❌ 나쁜 예:
- 모바일: 2열로 변경
- 태블릿: flex-direction: column

✅ 좋은 예:
- 모바일: font-size 14px
- 태블릿: padding 12px
```

#### 3. Wireframe 누락
```
❌ 나쁜 예:
- UI 파일만 작성
- UI에 레이아웃 구조 포함

✅ 좋은 예:
- Wireframe 먼저 작성
- UI는 Wireframe 기반으로 스타일링
```

---

## 🔗 참고 문서

- **역할 구분 가이드**: [`docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md`](docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md)
- **빠른 시작**: [`docs/guides/QUICK_START_VIBE_CODING.md`](docs/guides/QUICK_START_VIBE_CODING.md)
- **치트시트**: [`docs/guides/PROMPT_CHEATSHEET.md`](docs/guides/PROMPT_CHEATSHEET.md)
- **프롬프트 현황**: [`PROMPT_STATUS.md`](PROMPT_STATUS.md)

---

**다음 단계**: 1순위 개선 작업부터 시작하세요!
