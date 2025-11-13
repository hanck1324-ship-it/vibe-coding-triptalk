# 🚀 바이브 코딩 빠른 시작 가이드

> AI와 함께하는 효율적인 개발 워크플로우

## 📖 이 문서는?

AI(Cursor)를 활용해서 빠르게 컴포넌트를 개발하는 실전 가이드입니다.
복사해서 바로 사용할 수 있는 명령어 템플릿을 제공합니다.

---

## 🎯 1. 신규 컴포넌트 개발 (5단계)

### Step 1: Wireframe 프롬프트 작성 ⚡

**AI에게 복사해서 요청:**
```
PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
[컴포넌트명]의 wireframe 프롬프트를 작성해줘.

파일 경로: src/components/[경로]/prompts/prompt.01.wireframe.txt

요구사항:
- [요소 1]
- [요소 2]
- [요소 3]
```

**예시:**
```
PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
포인트 사용 내역 페이지의 wireframe 프롬프트를 작성해줘.

파일 경로: src/components/point/usage-history/prompts/prompt.01.wireframe.txt

요구사항:
- 사용 내역 테이블 (날짜, 내용, 금액, 잔액)
- 필터링 버튼 (전체/충전/사용)
- 페이지네이션
```

---

### Step 2: UI 프롬프트 작성 🎨

**AI에게 복사해서 요청:**
```
PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
[컴포넌트명]의 UI 프롬프트를 작성해줘.

파일 경로: src/components/[경로]/prompts/prompt.201.ui.txt

wireframe에서 정의한 구조를 유지하면서,
브랜드 컬러(#2974e5)를 활용한 시각적 스타일링을 적용해줘.

참고할 기존 UI:
- src/components/point/charge/prompts/prompt.201.ui.txt
```

---

### Step 3: 프롬프트 검증 ✅

**AI에게 복사해서 요청:**
```
src/components/[경로]/prompts/ 폴더의
prompt.01.wireframe.txt와 prompt.201.ui.txt를 분석해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 따라:
1. wireframe에 UI 요소(색상, 크기)가 있는지 확인
2. UI에 구조 변경 요소가 있는지 확인
3. wireframe과 UI 간 구조 일관성 확인
4. 문제점과 개선 방안 제시
```

---

### Step 4: 컴포넌트 구현 💻

**AI에게 복사해서 요청:**
```
src/components/[경로]/prompts/ 폴더의
prompt.01.wireframe.txt와 prompt.201.ui.txt를 참조해서
컴포넌트를 구현해줘.

파일 생성:
- src/components/[경로]/index.tsx
- src/components/[경로]/styles.module.css
```

---

### Step 5: 테스트 및 개선 🔍

1. 브라우저에서 확인
2. 디자인 검토
3. 필요시 프롬프트 수정 후 재구현

---

## 🔧 2. 기존 프롬프트 수정

### 시나리오 A: 역할 혼재 해소

**문제:** Wireframe에 색상/크기가 있거나, UI에 레이아웃 구조가 있음

**AI에게 복사해서 요청:**
```
src/components/[경로]/prompts/ 폴더의 프롬프트를
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 맞게 수정해줘.

1. wireframe에서 스타일 요소(색상, 크기, padding 등) 제거
2. UI에서 레이아웃 구조(display, flex, grid) 제거
3. 역할 구분 명확히 하기
```

---

### 시나리오 B: 구조 불일치 해소

**문제:** Wireframe과 UI에서 컴포넌트 타입이 다름

**AI에게 복사해서 요청:**
```
src/components/[경로]/prompts/ 폴더의
wireframe과 UI 프롬프트 간 불일치를 해소해줘.

Wireframe의 [셀렉트 박스]를 [버튼 그리드]로 변경하고,
UI 프롬프트도 이에 맞게 일관성 있게 수정해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 참조해서
역할 구분을 명확히 유지해줘.
```

---

## 📋 3. 프롬프트 검증 (품질 체크)

### 전체 컴포넌트 검증

**AI에게 복사해서 요청:**
```
src/components/ 폴더의 모든 prompts를 검사해서
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 위반하는 파일 목록을 알려줘.

검사 항목:
1. wireframe에 색상, 크기, padding 값이 있는가?
2. UI에 display, flex-direction, grid-template-columns이 있는가?
3. wireframe과 UI 간 컴포넌트 타입 불일치가 있는가?
```

---

### 단일 컴포넌트 상세 검증

**AI에게 복사해서 요청:**
```
src/components/[경로]/prompts/ 폴더를 상세히 분석해줘.

체크리스트:
□ Wireframe: 구조와 배치만 정의되어 있는가?
□ Wireframe: 색상, 크기 값이 없는가?
□ UI: 모든 색상 값이 명시되어 있는가?
□ UI: 모든 크기/간격 값이 명시되어 있는가?
□ UI: 레이아웃 구조를 변경하지 않았는가?
□ Wireframe과 UI: 컴포넌트 타입이 일치하는가?

각 항목별로 통과/실패 여부와 개선 방안을 제시해줘.
```

---

## 🎨 4. 자주 쓰는 명령어 모음

### 명령어 1: 비슷한 컴포넌트 참조해서 생성

```
src/components/[참조 컴포넌트]/prompts/를 참조해서
[신규 컴포넌트]의 wireframe과 UI 프롬프트를 작성해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 따르고,
[참조 컴포넌트]와 일관성 있는 스타일을 유지해줘.
```

---

### 명령어 2: Figma 기반 프롬프트 생성

```
Figma 디자인을 참조해서 [컴포넌트명]의 프롬프트를 작성해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 따라:
1. Wireframe: Figma의 레이아웃 구조만 추출
2. UI: Figma의 색상, 크기, 간격 값 추출

Figma 정보:
- 채널: [채널ID]
- 노드: [노드ID]
```

---

### 명령어 3: 반응형 추가

```
[컴포넌트 경로]의 wireframe과 UI 프롬프트에
반응형 디자인을 추가해줘.

Wireframe에 추가:
- 데스크톱(1024px~): [레이아웃 구조]
- 태블릿(768px~1023px): [레이아웃 구조]
- 모바일(~767px): [레이아웃 구조]

UI에 추가:
- 각 breakpoint별 font-size, padding 조정
```

---

## 🔍 5. 트러블슈팅

### 문제 1: "Wireframe에 스타일이 섞여 있어요"

**해결:**
```
[파일경로]의 wireframe 프롬프트를 정리해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md의 "포함하지 말아야 할 내용"을 참조해서:
- 색상 값 (#hex) 모두 제거
- 크기 값 (px, rem) 모두 제거
- padding, margin 구체적 수치 제거
- border-radius 값 제거

구조와 배치 정보만 남겨줘.
```

---

### 문제 2: "UI에서 레이아웃을 변경하고 있어요"

**해결:**
```
[파일경로]의 UI 프롬프트를 정리해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md의 "포함하지 말아야 할 내용"을 참조해서:
- display 속성 제거
- flex-direction, justify-content 제거
- grid-template-columns 제거
- 반응형 구조 변경 제거

색상, 크기, 간격, 상태별 스타일만 남겨줘.
```

---

### 문제 3: "Wireframe과 UI가 불일치해요"

**해결:**
```
[폴더경로]의 wireframe과 UI를 비교 분석해서
불일치하는 부분을 찾아줘.

불일치 발견 시:
1. 어떤 요소가 불일치하는지 명확히 제시
2. wireframe을 기준으로 UI를 수정할지,
   아니면 UI를 기준으로 wireframe을 수정할지 추천
3. 수정안 제시
```

---

## 💡 6. 베스트 프랙티스

### ✅ DO (이렇게 하세요)

1. **항상 가이드 참조**
   ```
   PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서...
   ```

2. **단계별 진행**
   - Wireframe 먼저 → UI 나중
   - 구조 확정 후 스타일링

3. **검증 습관화**
   - 프롬프트 작성 후 검증
   - 컴포넌트 구현 전 검증

4. **기존 컴포넌트 참조**
   ```
   src/components/point/charge/prompts/를 참조해서...
   ```

---

### ❌ DON'T (하지 마세요)

1. **가이드 없이 작성**
   - 매번 가이드 문서를 참조하세요

2. **Wireframe과 UI 동시 작성**
   - 반드시 단계별로 진행

3. **검증 없이 구현**
   - 프롬프트 검증 → 구현 순서

4. **역할 혼재**
   - Wireframe: 구조만
   - UI: 스타일만

---

## 📚 7. 더 알아보기

- **상세 가이드**: [PROMPT_WIREFRAME_UI_SEPARATION.md](PROMPT_WIREFRAME_UI_SEPARATION.md)
- **워크플로우**: [VIBE_CODING_WORKFLOW.md](VIBE_CODING_WORKFLOW.md)
- **치트시트**: [PROMPT_CHEATSHEET.md](PROMPT_CHEATSHEET.md)
- **Cursor Rules**: [.cursorrules](.cursorrules)

---

## 🎓 8. 실전 예시

### Before (문제 상황)
```
❌ Wireframe: 셀렉트 박스
❌ UI: 버튼 그리드 + display: grid 정의
→ 구조 불일치, 역할 혼재
```

### AI 명령어
```
src/components/point/charge/prompts/를
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 맞게 수정해줘.

1. wireframe과 UI 간 구조 일치 (버튼 그리드 통일)
2. wireframe: 레이아웃 구조만 (display: grid, 4열)
3. UI: 스타일만 (gap: 12px, border-radius: 8px, 색상)
```

### After (개선 결과)
```
✅ Wireframe: 버튼 그리드, 4열, flex 정의
✅ UI: 색상 #2974e5, 크기 60px, 간격 12px만 정의
→ 역할 명확, 구조 일관성 확보
```

---

## 🚀 시작하기

1. **먼저 읽기**: `PROMPT_WIREFRAME_UI_SEPARATION.md`
2. **명령어 복사**: 이 문서의 템플릿 활용
3. **AI에게 요청**: Cursor에 붙여넣기
4. **검증**: 생성된 프롬프트 확인
5. **구현**: 컴포넌트 개발

---

**Happy Vibe Coding! 🎉**
