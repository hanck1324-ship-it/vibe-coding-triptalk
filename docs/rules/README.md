# 📋 프롬프트 Recheck 규칙

> 프롬프트 작성 및 검증을 위한 규칙 모음

## 📂 이 폴더는?

프롬프트를 작성하거나 검증할 때 **따라야 할 규칙**을 담은 문서들입니다.
AI에게 검증을 요청할 때도 이 문서들을 참조하도록 명령합니다.

---

## 🎯 핵심 규칙

### ⭐ 가장 중요한 문서

**[PROMPT_WIREFRAME_UI_SEPARATION.md](PROMPT_WIREFRAME_UI_SEPARATION.md)**
- Wireframe과 UI의 역할 구분
- 무엇을 포함하고 제외해야 하는지 명확히 정의
- 실전 예시 (잘못된 예 vs 올바른 예)

**이 문서를 반드시 참조해야 하는 경우:**
- 프롬프트를 새로 작성할 때
- 기존 프롬프트를 검증할 때
- AI에게 프롬프트 생성을 요청할 때
- Wireframe과 UI 역할이 헷갈릴 때

---

## 📚 문서 목록

### 1. [PROMPT_WIREFRAME_UI_SEPARATION.md](PROMPT_WIREFRAME_UI_SEPARATION.md)
**Wireframe vs UI 역할 구분 가이드** ⭐ 필독!

- **목적**: Wireframe과 UI 프롬프트의 역할을 명확히 구분
- **내용**:
  - 기본 원칙: 구조 vs 스타일
  - Wireframe에 포함/제외할 내용
  - UI에 포함/제외할 내용
  - 실전 예시 (Before/After)
  - 예외 상황 (Gap, 반응형)
  - 체크리스트

**언제 참조하나요?**
- 프롬프트 작성 전 (필수!)
- AI에게 프롬프트 생성 요청 시
- 프롬프트 검증 시
- 역할 구분이 헷갈릴 때

**AI 명령어 예시:**
```
"PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
[컴포넌트명]의 wireframe 프롬프트를 작성해줘"
```

---

### 2. [PROMPT_BASE_RULES.md](PROMPT_BASE_RULES.md)
**프롬프트 기본 규칙**

- **목적**: 모든 프롬프트가 따라야 할 기본 규칙
- **내용**:
  - 프롬프트 파일 작성 규칙
  - 커서 룰 적용 방법
  - 파일 경로 명시
  - 피그마 정보 작성법
  - 요구사항 작성 규칙

**언제 참조하나요?**
- 프롬프트 파일의 기본 구조를 확인할 때
- 커서 룰 적용이 필요할 때
- 피그마 연동 시

---

### 3. [PROMPT_RECHECK_RULES.md](PROMPT_RECHECK_RULES.md)
**프롬프트 재검토 규칙**

- **목적**: 작성한 프롬프트를 검증하고 개선
- **내용**:
  - 프롬프트 검증 체크리스트
  - 자주 발생하는 실수
  - 개선 방법
  - 검증 절차

**언제 참조하나요?**
- 프롬프트 작성 완료 후 검증 시
- 코드 리뷰 시
- 품질 향상을 위한 재검토 시

---

### 4. [PROMPTS_FOLDER_GUIDE.md](PROMPTS_FOLDER_GUIDE.md)
**프롬프트 폴더 구조 가이드**

- **목적**: 프롬프트 파일의 위치와 명명 규칙
- **내용**:
  - 폴더 구조
  - 파일 명명 규칙
  - 번호 체계
  - 폴더 구성 예시

**언제 참조하나요?**
- 새로운 컴포넌트 폴더 생성 시
- 프롬프트 파일 위치를 찾을 때
- 파일 이름을 정할 때

---

### 5. [PROMPTS_STRUCTURE.md](PROMPTS_STRUCTURE.md)
**프롬프트 구조 및 위치 가이드**

- **목적**: 프로젝트 전체의 프롬프트 구조 이해
- **내용**:
  - 프로젝트 전체 구조
  - 컴포넌트별 프롬프트 위치
  - 단계별 프롬프트 설명

**언제 참조하나요?**
- 프로젝트 구조를 파악할 때
- 프롬프트 파일을 찾을 때

---

## 🔍 검증 워크플로우

### 프롬프트 작성 → 검증 → 개선

```
1. 프롬프트 작성
   ↓
2. 자가 검증 (체크리스트)
   ↓
3. AI 검증 요청
   "PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
    [파일경로]가 규칙을 따르는지 확인해줘"
   ↓
4. 문제점 발견 시 개선
   ↓
5. 재검증
```

---

## 📋 검증 체크리스트

### Wireframe 프롬프트 검증

```
□ PROMPT_WIREFRAME_UI_SEPARATION.md의 "Wireframe에 포함할 것" 준수
□ 색상 값 (#hex) 없음
□ 크기 값 (px, rem) 없음
□ padding, margin 구체적 수치 없음
□ font-size, font-weight 없음
□ border-radius 없음
□ 상태별 스타일 (hover, focus) 없음
□ display, flex, grid 레이아웃 방식 정의됨
□ 반응형 구조 변경 명시됨
□ 컴포넌트 타입 결정됨
```

### UI 프롬프트 검증

```
□ PROMPT_WIREFRAME_UI_SEPARATION.md의 "UI에 포함할 것" 준수
□ 모든 색상 값 명시됨
□ 모든 크기 값 명시됨
□ padding, margin, gap 구체적 수치 명시됨
□ border, border-radius 명시됨
□ font-size, font-weight 명시됨
□ 상태별 스타일 (hover, focus, disabled) 명시됨
□ display, flex-direction 등 레이아웃 구조 변경하지 않음
□ Wireframe의 컴포넌트 타입 유지
□ 반응형 구조 변경하지 않음
```

### 구조 일관성 검증

```
□ Wireframe과 UI의 컴포넌트 타입 일치
□ Wireframe의 레이아웃을 UI에서 유지
□ Wireframe의 요소 개수와 UI의 요소 개수 일치
□ 반응형 breakpoint 일치
```

---

## 🤖 AI 검증 명령어

### 단일 파일 검증
```bash
"[파일경로]를 분석해서
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 따르는지 확인해줘.
문제점과 개선 방안을 제시해줘."
```

### 폴더 전체 검증
```bash
"[폴더경로]의 wireframe과 UI 프롬프트를 분석해줘.

PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 따라:
1. wireframe에 UI 요소가 있는지 확인
2. UI에 구조 변경 요소가 있는지 확인
3. wireframe과 UI 간 구조 일관성 확인
4. 문제점과 개선 방안 제시"
```

### 프로젝트 전체 검증
```bash
"src/components/ 폴더의 모든 prompts를 검사해서
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 위반하는
파일 목록을 알려줘."
```

---

## 🎯 규칙 우선순위

### 1순위: PROMPT_WIREFRAME_UI_SEPARATION.md
- 가장 핵심적인 규칙
- 모든 프롬프트 작성 시 필수 참조
- AI에게 요청할 때 항상 언급

### 2순위: PROMPT_BASE_RULES.md
- 프롬프트 파일의 기본 구조
- 커서 룰, 파일 경로 등

### 3순위: PROMPT_RECHECK_RULES.md
- 작성 후 검증 및 개선

### 4순위: PROMPTS_FOLDER_GUIDE.md, PROMPTS_STRUCTURE.md
- 폴더 구조 및 위치 참조

---

## 💡 활용 팁

### Tip 1: AI에게 검증 요청
프롬프트를 작성한 후 AI에게 검증을 요청하세요:
```
"PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
이 프롬프트가 규칙을 따르는지 확인해줘"
```

### Tip 2: 정기적인 전체 검증
한 달에 한 번 프로젝트 전체 프롬프트를 검증하세요:
```
"src/components/ 폴더의 모든 prompts를 검증해줘"
```

### Tip 3: 코드 리뷰 시 체크리스트 활용
PR 리뷰 시 이 폴더의 체크리스트를 활용하세요.

### Tip 4: .cursorrules 연동
`.cursorrules` 파일이 이 규칙들을 자동으로 참조합니다.

---

## 🔗 관련 문서

### 활용 가이드 (실전 사용법)
프롬프트를 어떻게 활용할지 알고 싶다면:
- **[../guides/QUICK_START_VIBE_CODING.md](../guides/QUICK_START_VIBE_CODING.md)** - 빠른 시작
- [../guides/VIBE_CODING_WORKFLOW.md](../guides/VIBE_CODING_WORKFLOW.md) - 워크플로우
- [../guides/PROMPT_CHEATSHEET.md](../guides/PROMPT_CHEATSHEET.md) - 치트시트

### AI 설정
- **[../../.cursorrules](../../.cursorrules)** - Cursor AI 자동 참조 규칙

---

## 📊 규칙 준수 현황 확인

프로젝트의 프롬프트들이 규칙을 잘 따르고 있는지 확인하려면:

```bash
# AI에게 요청
"src/components/ 폴더의 모든 prompts를 검사해서
PROMPT_WIREFRAME_UI_SEPARATION.md 가이드 준수율을 알려줘.

준수하는 파일과 위반하는 파일을 각각 리스트업해줘."
```

---

## ❓ FAQ

**Q: 모든 규칙을 다 외워야 하나요?**
A: 아니요, `PROMPT_WIREFRAME_UI_SEPARATION.md`만 숙지하면 됩니다.
   나머지는 필요할 때 참조하세요.

**Q: AI가 규칙을 자동으로 따르나요?**
A: `.cursorrules`에 설정되어 있어 대부분 자동으로 따릅니다.
   하지만 항상 검증은 필요합니다.

**Q: 규칙을 어겼는데 어떻게 고치나요?**
A: AI에게 검증을 요청하면 개선 방안을 제시합니다.
   `../guides/QUICK_START_VIBE_CODING.md`의 트러블슈팅 참조.

**Q: 새로운 규칙을 추가하고 싶어요.**
A: 이슈를 등록하거나 PR을 보내주세요.
   팀 논의 후 반영합니다.

---

## 🎓 규칙 학습 로드맵

### 1일차: 핵심 규칙
- `PROMPT_WIREFRAME_UI_SEPARATION.md` 정독
- 예시 확인

### 2일차: 기본 규칙
- `PROMPT_BASE_RULES.md` 읽기
- 프롬프트 파일 구조 이해

### 3일차: 검증 연습
- 기존 프롬프트 검증해보기
- AI에게 검증 요청해보기

### 4일차: 실전 적용
- 새로운 프롬프트 작성
- 규칙 준수 확인

---

## 📞 도움이 필요하신가요?

- 규칙에 대한 질문은 이슈를 등록해주세요
- 규칙 개선 제안도 환영합니다!

---

**규칙을 따르면 일관성 있는 프롬프트를 작성할 수 있습니다! 📋**
