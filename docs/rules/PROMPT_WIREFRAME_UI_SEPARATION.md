# Wireframe vs UI 프롬프트 역할 구분 가이드

## 1. 기본 원칙

프롬프트는 **구조(Structure)**와 **스타일(Style)**을 명확히 분리합니다.

```
prompt.01.wireframe.txt → 구조와 배치 (Structure & Layout)
prompt.201.ui.txt       → 스타일과 디자인 (Style & Design)
```

---

## 2. Wireframe 프롬프트 (prompt.01.wireframe.txt)

### 역할: "무엇을", "어디에" 배치할 것인가

Wireframe 단계에서는 **HTML 구조**와 **레이아웃 배치**만 정의합니다.
색상, 크기, 폰트 등 시각적 스타일은 일절 포함하지 않습니다.

### 포함되어야 할 내용 ✅

#### A. HTML 구조
- 어떤 섹션들이 있는가?
- 각 섹션에 어떤 요소들이 포함되는가?
- 요소들의 계층 구조는 어떻게 되는가?

```
예시:
A. 페이지 헤더 섹션
   - 페이지 제목
   - 구분선

B. 현재 포인트 섹션
   - 라벨
   - 포인트 값 표시
   - 구분선
```

#### B. 레이아웃 방식
- `display: flex` / `display: grid`
- `flex-direction: row` / `column`
- `grid-template-columns: repeat(2, 1fr)`
- column/row 배치 결정

```
예시:
- 충전 금액 선택: grid 레이아웃, 2열 배치
- 버튼 영역: flex 레이아웃, 가로 배치, 오른쪽 정렬
```

#### C. 반응형 구조 변경
- 모바일에서 레이아웃 변경 (예: 2열 → 1열)
- breakpoint 정의

```
예시:
- 데스크톱: 2열 grid
- 모바일(768px 이하): 1열 grid
```

#### D. 컴포넌트 타입 결정
- 어떤 UI 컴포넌트를 사용할 것인가?
- 예: 버튼, 드롭다운, 입력 필드, 체크박스 등

```
예시:
- 충전 금액 선택: 버튼 그리드 (셀렉트 박스 X)
- 주소 입력: input + 검색 버튼
```

### 포함하지 말아야 할 내용 ❌

- ❌ 색상 값 (`#2974e5`, `#f2f2f2` 등)
- ❌ 크기 값 (`28px`, `160px`, `800px` 등)
- ❌ padding, margin 구체적 수치
- ❌ border-radius 값
- ❌ font-size, font-weight 값
- ❌ 상태별 스타일 (hover, focus, disabled)
- ❌ transition, animation

---

## 3. UI 프롬프트 (prompt.201.ui.txt)

### 역할: "어떻게" 보이게 할 것인가

UI 단계에서는 **시각적 디자인**과 **상세 스타일링**만 정의합니다.
HTML 구조나 레이아웃 방식은 이미 wireframe에서 결정되었으므로 변경하지 않습니다.

### 포함되어야 할 내용 ✅

#### A. 색상 (Colors)
- 배경색, 텍스트 색, 테두리 색
- 상태별 색상 (hover, active, disabled, focus)
- 브랜드 컬러

```
예시:
- 기본 배경: #ffffff
- 비활성화 배경: #f2f2f2
- 비활성화 텍스트: #999999
- 주요 액션 버튼: #2974e5
- 호버 상태: #1e5bb8
- 에러 색상: #f66a6a
```

#### B. 크기 (Sizes)
- width, height, max-width
- font-size, line-height
- 이미지/아이콘 크기
- 컨테이너 크기

```
예시:
- 최대 너비: 800px
- 이미지 썸네일: 160x160px
- 제목 폰트: 28px
- 버튼 높이: 60px
```

#### C. 간격 (Spacing)
- padding, margin
- gap (flex/grid의 간격)
- 구분선 여백

```
예시:
- 컨테이너 padding: 40px
- 섹션 간 margin: 24px
- 버튼 그리드 gap: 12px
- 입력 필드 padding: 12px 16px
```

#### D. 테두리 (Borders)
- border 두께, 스타일, 색상
- border-radius 값
- 구분선 스타일

```
예시:
- 입력 필드 border: 1px solid #d4d3d3
- 선택된 버튼 border: 2px solid #2974e5
- border-radius: 8px
- 구분선: height 1px, background #e4e4e4
```

#### E. 타이포그래피 (Typography)
- font-size
- font-weight
- font-family (필요시)
- letter-spacing, line-height

```
예시:
- 제목: font-size 28px, font-weight 700
- 라벨: font-size 14px, color #666666
- 포인트 값: font-size 32px, font-weight 700, color #2974e5
```

#### F. 상태별 스타일 (State Styles)
- hover, focus, active, disabled
- 에러 상태, 성공 상태

```
예시:
- 버튼 hover: background #1e5bb8
- 입력 필드 focus: border-color #2974e5
- 버튼 disabled: background #c7c7c7, color #e4e4e4, cursor not-allowed
```

#### G. 기타 시각적 요소
- box-shadow
- opacity
- cursor 종류
- transition, animation

```
예시:
- 카드 shadow: 0 2px 8px rgba(0,0,0,0.1)
- transition: all 0.2s ease
- cursor: pointer / not-allowed
```

### 포함하지 말아야 할 내용 ❌

- ❌ HTML 구조 변경
- ❌ 레이아웃 방식 변경 (flex ↔ grid 전환)
- ❌ 컴포넌트 타입 변경 (버튼 → 드롭다운)
- ❌ 요소 추가/제거
- ❌ 반응형 구조 변경 (2열 → 1열)

---

## 4. 실전 예시: 포인트 충전 페이지

### ❌ 잘못된 예 (현재 상태)

**wireframe에서:**
```
충전 금액 선택 섹션
- 셀렉트 박스 (드롭다운)
```

**UI에서:**
```
충전 금액 선택 영역
- 금액 버튼들: grid, repeat(2, 1fr), gap: 12px  ← 구조 변경!
```

→ **문제점**: wireframe에서 드롭다운으로 정했는데, UI에서 버튼 그리드로 변경됨

---

### ✅ 올바른 예

**wireframe에서:**
```
C. 충전 금액 선택 섹션
   - 라벨: "충전 금액 선택" + 필수 표시(*)
   - 금액 버튼 그리드
     * 레이아웃: display: grid
     * 데스크톱: 4열 (repeat(4, 1fr))
     * 태블릿: 2열 (repeat(2, 1fr))
     * 모바일: 1열 (1fr)
     * gap 적용
   - 옵션:
     - 100원
     - 500원
     - 2,000원
     - 5,000원
     - 10,000원
     - 50,000원
   - 구분선
```

**UI에서:**
```
충전 금액 선택 영역
- 라벨: font-size 18px, font-weight 600, margin-bottom 16px
- 금액 버튼들:
  * gap: 12px
  * 각 버튼:
    - 높이: 60px
    - border-radius: 8px
    - border: 1px solid #d4d3d3
    - 배경: #ffffff
    - font-size: 18px, font-weight: 600
    - cursor: pointer
  * 선택된 버튼:
    - border: 2px solid #2974e5
    - background: #e8f2ff
    - color: #2974e5
  * hover:
    - border-color: #2974e5
    - background: #f5f9ff
- 구분선: width 100%, height 1px, background #e4e4e4, margin 24px 0
```

---

## 5. 체크리스트

### Wireframe 작성 시 자문하기

- [ ] 이 요소는 구조와 배치에 관한 것인가?
- [ ] 픽셀 값이나 색상 코드를 사용하고 있지 않은가?
- [ ] 레이아웃 방식(flex/grid)과 배치만 정의했는가?
- [ ] 반응형 구조 변경을 명시했는가?

### UI 작성 시 자문하기

- [ ] 이 요소는 시각적 스타일에 관한 것인가?
- [ ] HTML 구조나 레이아웃을 변경하려 하지 않는가?
- [ ] wireframe에서 정의한 구조를 유지하고 있는가?
- [ ] 모든 색상, 크기, 간격이 구체적으로 명시되어 있는가?

---

## 6. 예외 상황

### Gap은 어디에?

`gap`은 **레이아웃 간격**이므로 wireframe에 속하지만,
**구체적인 픽셀 값**은 UI에 속합니다.

- **Wireframe**: "gap 적용"
- **UI**: "gap: 12px"

### 반응형 디자인은?

**구조적 변경** (2열 → 1열)은 wireframe,
**스타일 변경** (폰트 크기 조정)은 UI에 속합니다.

- **Wireframe**: "모바일: 1열로 변경"
- **UI**: "모바일: font-size 14px로 축소"

---

## 7. 참고 문서

- `PROMPTS_FOLDER_GUIDE.md`: 프롬프트 폴더 구조 가이드
- `PROMPT_BASE_RULES.md`: 프롬프트 작성 기본 규칙
- `PROMPT_RECHECK_RULES.md`: 프롬프트 재검토 규칙
