# Vibe 코딩에서 역할 구분 가이드 활용법

## 목차
1. [신규 컴포넌트 개발 워크플로우](#1-신규-컴포넌트-개발-워크플로우)
2. [기존 프롬프트 검증 및 수정](#2-기존-프롬프트-검증-및-수정)
3. [AI에게 요청하는 구체적 명령어](#3-ai에게-요청하는-구체적-명령어)
4. [팀 협업 시 활용법](#4-팀-협업-시-활용법)
5. [트러블슈팅](#5-트러블슈팅)

---

## 1. 신규 컴포넌트 개발 워크플로우

### Step 1: Wireframe 프롬프트 작성

**AI에게 요청:**
```
PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
포인트 사용 내역 페이지의 wireframe 프롬프트를 작성해줘.

요구사항:
- 사용 내역 리스트 (테이블 형식)
- 필터링 버튼 (전체/충전/사용)
- 날짜별 정렬 기능
```

**AI가 생성할 파일:**
- `src/components/point/usage-history/prompts/prompt.01.wireframe.txt`

**검증 포인트:**
- [ ] 레이아웃 구조만 정의되어 있는가?
- [ ] 색상, 크기 값이 없는가?
- [ ] 반응형 구조 변경이 명시되어 있는가?

---

### Step 2: UI 프롬프트 작성

**AI에게 요청:**
```
PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
포인트 사용 내역 페이지의 UI 프롬프트를 작성해줘.

wireframe에서 정의한 구조를 유지하면서,
브랜드 컬러(#2974e5)를 활용한 시각적 스타일링을 적용해줘.

참고할 기존 UI:
- src/components/point/charge/prompts/prompt.201.ui.txt
```

**AI가 생성할 파일:**
- `src/components/point/usage-history/prompts/prompt.201.ui.txt`

**검증 포인트:**
- [ ] 모든 색상 값이 명시되어 있는가?
- [ ] 모든 크기/간격 값이 명시되어 있는가?
- [ ] 레이아웃 구조를 변경하지 않았는가?

---

### Step 3: 컴포넌트 구현

**AI에게 요청:**
```
prompt.01.wireframe.txt와 prompt.201.ui.txt를 참조해서
포인트 사용 내역 컴포넌트를 구현해줘.
```

**AI가 생성할 파일:**
- `src/components/point/usage-history/index.tsx`
- `src/components/point/usage-history/styles.module.css`

---

## 2. 기존 프롬프트 검증 및 수정

### 시나리오 A: 역할 혼재 확인

**AI에게 요청:**
```
src/components/purchase/sell/prompts/ 폴더의
prompt.01.wireframe.txt와 prompt.201.ui.txt를 분석해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 따라:
1. wireframe에 UI 요소가 있는지 확인
2. UI에 구조 변경 요소가 있는지 확인
3. 문제점과 개선 방안 제시
```

**AI 응답 예시:**
```
❌ 발견된 문제:

1. prompt.01.wireframe.txt 47번 줄:
   - "border-radius: 16px" → UI 요소, 제거 필요

2. prompt.201.ui.txt 94번 줄:
   - "display: flex, gap: 24px" → 구조 요소, wireframe으로 이동

✅ 개선 방안:
1. wireframe에 레이아웃 구조만 남기기
2. UI에 스타일 요소만 남기기
```

---

### 시나리오 B: 구조 불일치 확인

**AI에게 요청:**
```
src/components/point/charge/prompts/ 폴더의
wireframe과 UI 프롬프트 간 구조 일관성을 확인해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md 가이드 기준으로:
- wireframe에서 정의한 구조를 UI에서 변경했는지
- 컴포넌트 타입이 일치하는지
```

**AI 응답 예시:**
```
✅ 구조 일관성 검증 결과:

1. 충전 금액 선택 컴포넌트:
   - Wireframe: 버튼 그리드, 4열
   - UI: 버튼 그리드, 4열
   → 일치 ✓

2. 버튼 영역:
   - Wireframe: flex, 오른쪽 정렬
   - UI: flex, 오른쪽 정렬
   → 일치 ✓
```

---

## 3. AI에게 요청하는 구체적 명령어

### 패턴 1: 신규 프롬프트 작성

```bash
# Wireframe 작성
"PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
[컴포넌트명]의 wireframe 프롬프트를 작성해줘.
[컴포넌트 요구사항]"

# UI 작성
"PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
[컴포넌트명]의 UI 프롬프트를 작성해줘.
wireframe에서 정의한 구조를 유지하면서
[디자인 요구사항]"
```

### 패턴 2: 기존 프롬프트 검증

```bash
# 역할 혼재 검증
"[파일경로]를 분석해서
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 따르는지 확인해줘.
문제점이 있으면 개선 방안을 제시해줘."

# 구조 일관성 검증
"[폴더경로]의 wireframe과 UI 프롬프트 간
구조 일관성을 검증해줘."
```

### 패턴 3: 프롬프트 수정

```bash
# 역할에 맞게 수정
"[파일경로]를 PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 맞게 수정해줘.
wireframe이면 구조만, UI면 스타일만 남겨줘."

# 불일치 해소
"wireframe의 [요소]를 [드롭다운]에서 [버튼 그리드]로 변경하고,
UI 프롬프트도 이에 맞게 일관성 있게 수정해줘."
```

---

## 4. 팀 협업 시 활용법

### 코드 리뷰 체크리스트에 추가

```markdown
## 프롬프트 리뷰 체크리스트

### Wireframe (prompt.01.wireframe.txt)
- [ ] HTML 구조와 계층이 명확한가?
- [ ] 레이아웃 방식(flex/grid)이 정의되어 있는가?
- [ ] 반응형 구조 변경이 명시되어 있는가?
- [ ] 색상, 크기 값이 없는가?
- [ ] `PROMPT_WIREFRAME_UI_SEPARATION.md` 가이드를 따르는가?

### UI (prompt.201.ui.txt)
- [ ] 모든 색상이 명시되어 있는가?
- [ ] 모든 크기/간격이 명시되어 있는가?
- [ ] 상태별 스타일이 정의되어 있는가?
- [ ] Wireframe 구조를 변경하지 않았는가?
- [ ] `PROMPT_WIREFRAME_UI_SEPARATION.md` 가이드를 따르는가?

### 구조 일관성
- [ ] Wireframe과 UI의 컴포넌트 타입이 일치하는가?
- [ ] Wireframe에서 정의한 레이아웃을 UI에서 유지하는가?
```

---

### PR 템플릿에 추가

```markdown
## 프롬프트 변경 사항

### 변경된 프롬프트 파일
- [ ] prompt.01.wireframe.txt
- [ ] prompt.201.ui.txt
- [ ] prompt.301.func.txt

### 역할 구분 준수 확인
- [ ] `PROMPT_WIREFRAME_UI_SEPARATION.md` 가이드를 참조했습니다
- [ ] Wireframe과 UI 간 역할이 명확히 구분됩니다
- [ ] Wireframe과 UI 간 구조 일관성이 있습니다

### 검증 명령어 실행
```bash
# AI에게 검증 요청한 명령어
"src/components/[컴포넌트명]/prompts/ 폴더의 프롬프트들이
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 따르는지 확인해줘"
```
```

---

## 5. 트러블슈팅

### Q1: Wireframe과 UI가 불일치할 때

**증상:**
- Wireframe: 셀렉트 박스
- UI: 버튼 그리드

**해결:**
```
"src/components/point/charge/prompts/ 폴더의
wireframe과 UI 프롬프트 간 불일치를 해소해줘.

Wireframe의 '셀렉트 박스'를 '버튼 그리드'로 변경하고,
UI 프롬프트도 이에 맞게 수정해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 참조해서
역할 구분을 명확히 유지해줘."
```

---

### Q2: Gap 같은 애매한 요소는?

**원칙:**
- **Wireframe**: 개념만 ("gap 적용")
- **UI**: 구체적 수치 ("gap: 12px")

**AI 요청 예시:**
```
"gap은 wireframe에 '적용'만 명시하고,
UI에 '12px' 수치를 명시하도록 분리해줘"
```

---

### Q3: 반응형 디자인은 어디에?

**구조 변경** (열 수 변경) → Wireframe
**스타일 변경** (폰트 크기) → UI

**예시:**
```
Wireframe:
- 데스크톱: 4열
- 모바일: 2열

UI:
- 데스크톱: font-size 18px
- 모바일: font-size 14px
```

---

## 6. 자동화 스크립트 (향후 개선)

```bash
# 프롬프트 검증 스크립트
npm run validate-prompts

# 프롬프트 구조 일관성 체크
npm run check-prompt-consistency
```

---

## 7. 참고 자료

- **역할 구분 상세 가���드**: `PROMPT_WIREFRAME_UI_SEPARATION.md`
- **프롬프트 폴더 구조**: `PROMPTS_FOLDER_GUIDE.md`
- **프롬프트 작성 규칙**: `PROMPT_BASE_RULES.md`
- **재검토 규칙**: `PROMPT_RECHECK_RULES.md`

---

## 8. 실전 예시: 포인트 충전 컴포넌트

### 기존 문제 상황
```
❌ Wireframe: 셀렉트 박스
❌ UI: 버튼 그리드 + 레이아웃 구조 정의
→ 역할 혼재, 구조 불일치
```

### AI에게 요청한 명령어
```
"src/components/point/charge/prompts/ 폴더의 프롬프트를
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 맞게 수정해줘.

1. wireframe과 UI 간 구조 일치시키기 (버튼 그리드로 통일)
2. wireframe에서 스타일 요소 제거
3. UI에서 레이아웃 구조 제거
4. 역할 구분 명확히 하기"
```

### 개선 결과
```
✅ Wireframe: 버튼 그리드, 4열, flex 정의
✅ UI: 색상 #2974e5, 크기 60px, 간격 12px만 정의
→ 역할 명확, 구조 일관성 확보
```

---

## 마무리

이 가이드를 활용하면:
- ✅ AI가 일관된 프롬프트를 생성합니다
- ✅ 프롬프트 간 불일치를 방지합니다
- ✅ 유지보수가 쉬워집니다
- ✅ 팀 협업이 원활해집니다

**핵심 원칙:**
> "Wireframe = 구조, UI = 스타일"을 항상 기억하세요!
