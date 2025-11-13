# 프롬프트 작성 치트시트 (빠른 참조용)

## 🎯 핵심 원칙

```
Wireframe = 구조 (Structure)
UI = 스타일 (Style)
```

---

## 📋 Wireframe 체크리스트

### ✅ 포함할 것
```
□ display (flex, grid, block)
□ flex-direction (row, column)
□ grid-template-columns
□ justify-content, align-items
□ 반응형 구조 변경 (열 수)
□ 컴포넌트 타입 (button, select)
□ gap 적용 여부 (수치 제외)
```

### ❌ 제외할 것
```
□ 색상 (#hex, rgb)
□ 크기 (px, rem)
□ padding, margin 수치
□ font-size, font-weight
□ border-radius
□ hover, focus, disabled
```

---

## 🎨 UI 체크리스트

### ✅ 포함할 것
```
□ 모든 색상 값
□ 모든 크기 값 (width, height, font-size)
□ padding, margin, gap 구체적 수치
□ border, border-radius
□ font-size, font-weight
□ hover, focus, disabled, active
□ cursor, transition
```

### ❌ 제외할 것
```
□ display 변경
□ flex/grid 구조 변경
□ 요소 배치 방향 변경
□ 정렬 방식 변경
□ 반응형 구조 변경
□ 컴포넌트 타입 변경
```

---

## 🚀 AI 명령어 템플릿

### 1. 신규 Wireframe 작성
```
PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
[컴포넌트명]의 wireframe 프롬프트를 작성해줘.

요구사항:
- [요소 1]
- [요소 2]
- [요소 3]
```

### 2. 신규 UI 작성
```
PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
[컴포넌트명]의 UI 프롬프트를 작성해줘.

wireframe에서 정의한 구조를 유지하면서,
브랜드 컬러(#2974e5)를 활용한 시각적 스타일링을 적용해줘.
```

### 3. 기존 프롬프트 검증
```
[파일경로]를 분석해서
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 따르는지 확인해줘.
문제점과 개선 방안을 제시해줘.
```

### 4. 구조 일관성 검증
```
[폴더경로]의 wireframe과 UI 프롬프트 간
구조 일관성을 검증해줘.
```

### 5. 프롬프트 수정
```
[파일경로]를 PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 맞게 수정해줘.
wireframe이면 구조만, UI면 스타일만 남겨줘.
```

---

## 📝 예시: Wireframe vs UI

### Wireframe (prompt.01.wireframe.txt)
```
C. 충전 금액 선택 섹션
   - 라벨 + 필수 표시(*)
   - 금액 버튼 그리드
     * 레이아웃: display: grid
     * 데스크톱: 4열 (repeat(4, 1fr))
     * 모바일: 2열 (repeat(2, 1fr))
     * gap 적용
     * 옵션: 100원, 500원, 2,000원...
```

### UI (prompt.201.ui.txt)
```
충전 금액 선택 영역
- 라벨: font-size 18px, font-weight 600, margin-bottom 16px
- 금액 버튼:
  * gap: 12px
  * 높이: 60px
  * border-radius: 8px
  * border: 1px solid #d4d3d3
  * 배경: #ffffff
  * font-size: 18px, font-weight 600
  * 선택 시: border 2px solid #2974e5, background #e8f2ff
  * hover: border-color #2974e5, background #f5f9ff
```

---

## ⚠️ 자주 틀리는 부분

### 1. Gap
```
❌ Wireframe: gap: 12px
✅ Wireframe: gap 적용
✅ UI: gap: 12px
```

### 2. 반응형
```
❌ UI: 모바일에서 2열로 변경
✅ Wireframe: 모바일 2열
✅ UI: 모바일 font-size 14px
```

### 3. 구조 변경
```
❌ UI: 버튼을 드롭다운으로 변경
✅ Wireframe: 드롭다운으로 변경
✅ UI: 드롭다운 스타일 정의
```

---

## 🔍 빠른 검증 질문

### Wireframe 작성 중
```
Q: 이 요소는 구조/배치에 관한 것인가?
Q: 픽셀 값이나 색상 코드를 사용하고 있지 않은가?
Q: 레이아웃 방식과 배치만 정의했는가?
```

### UI 작성 중
```
Q: 이 요소는 시각적 스타일에 관한 것인가?
Q: HTML 구조나 레이아웃을 변경하려 하지 않는가?
Q: Wireframe에서 정의한 구조를 유지하고 있는가?
```

---

## 📚 관련 문서

- **상세 가이드**: `PROMPT_WIREFRAME_UI_SEPARATION.md`
- **워크플로우**: `VIBE_CODING_WORKFLOW.md`
- **Cursor Rules**: `.cursorrules`

---

## 💡 팁

1. **Wireframe 먼저 작성**: 구조가 명확해야 스타일링이 쉬움
2. **일관성 유지**: Wireframe과 UI 간 컴포넌트 타입 일치
3. **정기적 검증**: AI로 주기적으로 가이드 준수 확인
4. **참조 활용**: 기존 컴포넌트 프롬프트 참조해서 일관성 유지

---

## 🎯 핵심 기억

```
Wireframe:  WHAT & WHERE  (무엇을 어디에)
UI:         HOW           (어떻게 보이게)
```
