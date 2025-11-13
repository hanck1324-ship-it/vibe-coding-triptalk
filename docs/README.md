# 📚 프롬프트 문서 모음

> AI 기반 개발을 위한 완벽한 가이드

## 📂 폴더 구조

```
docs/
├── guides/              # 바이브 코딩 활용 가이드
│   ├── README.md
│   ├── QUICK_START_VIBE_CODING.md       ⭐ 가장 먼저 읽기!
│   ├── PROMPT_CHEATSHEET.md             ⭐ 빠른 참조용
│   ├── VIBE_CODING_WORKFLOW.md
│   ├── PROMPT_WRITING_PRINCIPLES.md
│   └── HOW_TO_CREATE_PROMPTS.md
│
└── rules/               # Recheck 규칙 (검증용)
    ├── README.md
    ├── PROMPT_WIREFRAME_UI_SEPARATION.md   ⭐ 필수 규칙!
    ├── PROMPT_BASE_RULES.md
    ├── PROMPT_RECHECK_RULES.md
    ├── PROMPTS_FOLDER_GUIDE.md
    └── PROMPTS_STRUCTURE.md
```

---

## 🎯 어떤 문서를 봐야 할까요?

### 상황별 추천 문서

#### 🆕 "처음 시작합니다"
```
1. guides/QUICK_START_VIBE_CODING.md      (5분 빠른 시작)
2. guides/PROMPT_CHEATSHEET.md            (체크리스트)
3. rules/PROMPT_WIREFRAME_UI_SEPARATION.md (핵심 규칙)
```

#### 💻 "신규 컴포넌트를 만들어야 합니다"
```
1. guides/QUICK_START_VIBE_CODING.md
   → "신규 컴포넌트 개발" 섹션
2. 명령어 복사 → AI에게 요청
3. guides/PROMPT_CHEATSHEET.md로 검증
```

#### 🔍 "기존 프롬프트를 검증해야 합니다"
```
1. rules/PROMPT_WIREFRAME_UI_SEPARATION.md (검증 기준)
2. guides/VIBE_CODING_WORKFLOW.md
   → "기존 프롬프트 검증" 섹션
3. AI에게 검증 요청
```

#### 🐛 "문제가 생겼어요"
```
1. guides/QUICK_START_VIBE_CODING.md
   → "트러블슈팅" 섹션
2. guides/VIBE_CODING_WORKFLOW.md
   → "트러블슈팅" 섹션
3. rules/PROMPT_WIREFRAME_UI_SEPARATION.md
   → 예시 확인
```

#### 👥 "팀원에게 설명해야 합니다"
```
1. 프로젝트 루트 README.md 보여주기
2. guides/QUICK_START_VIBE_CODING.md 공유
3. guides/PROMPT_CHEATSHEET.md 프린트해서 나눠주기
```

---

## 📖 문서 카테고리

### 🚀 guides/ - 바이브 코딩 활용 가이드
**"어떻게 사용하나요?"**

실전에서 바로 활용할 수 있는 방법을 담은 문서들입니다.
- 복사 붙여넣기용 AI 명령어
- Step-by-Step 워크플로우
- 베스트 프랙티스
- 트러블슈팅

**대표 문서:**
- **QUICK_START_VIBE_CODING.md** - 5분 만에 시작하기
- **PROMPT_CHEATSHEET.md** - 빠른 참조 치트시트
- **VIBE_CODING_WORKFLOW.md** - 전체 워크플로우

---

### 📋 rules/ - Recheck 규칙
**"규칙을 따르고 있나요?"**

프롬프트 작성 및 검증을 위한 규칙 문서들입니다.
- Wireframe vs UI 역할 구분
- 프롬프트 기본 규칙
- 검증 체크리스트
- 폴더 구조 가이드

**대표 문서:**
- **PROMPT_WIREFRAME_UI_SEPARATION.md** - 핵심 규칙 (필독!)
- **PROMPT_BASE_RULES.md** - 기본 규칙
- **PROMPT_RECHECK_RULES.md** - 재검토 규칙

---

## 🎓 학습 로드맵

### 1일차: 빠른 시작
```
1. guides/QUICK_START_VIBE_CODING.md 읽기
2. 예제 명령어 복사해서 AI에게 요청해보기
3. 신규 컴포넌트 하나 만들어보기
```

### 2일차: 규칙 이해
```
1. rules/PROMPT_WIREFRAME_UI_SEPARATION.md 정독
2. Wireframe vs UI 차이 이해
3. 예시 코드 분석
```

### 3일차: 검증 연습
```
1. guides/PROMPT_CHEATSHEET.md로 체크리스트 확인
2. 기존 프롬프트 검증해보기
3. AI에게 검증 요청해보기
```

### 4일차: 워크플로우 숙지
```
1. guides/VIBE_CODING_WORKFLOW.md 읽기
2. 전체 개발 프로세스 이해
3. 팀 협업 방법 학습
```

### 5일차: 실전 적용
```
1. 신규 컴포넌트 개발 (처음부터 끝까지)
2. 규칙 준수 확인
3. 코드 리뷰 받기
```

---

## 💡 활용 팁

### Tip 1: 북마크 설정
자주 보는 문서를 북마크하세요:
- `guides/QUICK_START_VIBE_CODING.md` (매일)
- `guides/PROMPT_CHEATSHEET.md` (매일)
- `rules/PROMPT_WIREFRAME_UI_SEPARATION.md` (주 1회)

### Tip 2: 프린트 추천
`guides/PROMPT_CHEATSHEET.md`를 프린트해서 책상에 두세요.

### Tip 3: AI 명령어 즐겨찾기
`guides/QUICK_START_VIBE_CODING.md`의 명령어를 메모장에 복사해두세요.

### Tip 4: 정기적인 검증
한 달에 한 번 전체 프롬프트를 검증하세요:
```
"src/components/ 폴더의 모든 prompts를
docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md 가이드에 따라 검증해줘"
```

---

## 🔗 관련 리소스

### 프로젝트 루트
- **README.md** - 프로젝트 전체 소개
- **.cursorrules** - Cursor AI 자동 참조 설정

### 각 폴더의 README
- **guides/README.md** - 활용 가이드 상세 소개
- **rules/README.md** - 검증 규칙 상세 소개

---

## ❓ FAQ

**Q: 문서가 너무 많아요. 어디서 시작하나요?**
A: `guides/QUICK_START_VIBE_CODING.md` 하나만 보세요. 나머지는 필요할 때 참조하세요.

**Q: Wireframe과 UI 차이가 헷갈려요.**
A: `guides/PROMPT_CHEATSHEET.md`의 체크리스트를 보거나,
   `rules/PROMPT_WIREFRAME_UI_SEPARATION.md`의 예시를 참조하세요.

**Q: AI가 규칙을 자동으로 따르나요?**
A: `.cursorrules`에 설정되어 있어 대부분 자동으로 따릅니다.
   하지만 항상 검증은 필요합니다.

**Q: 명령어를 외워야 하나요?**
A: 아니요, `guides/QUICK_START_VIBE_CODING.md`에서 복사 붙여넣기하세요.

**Q: 팀원에게 어떻게 알려주나요?**
A: 이 문서 (`docs/README.md`)와
   `guides/QUICK_START_VIBE_CODING.md`를 공유하세요.

---

## 📊 문서 업데이트 이력

### 2024년 (최신)
- 문서 체계 개편: `docs/guides/`와 `docs/rules/`로 분리
- `QUICK_START_VIBE_CODING.md` 추가 (복사 붙여넣기용)
- `PROMPT_CHEATSHEET.md` 추가 (빠른 참조용)
- `VIBE_CODING_WORKFLOW.md` 추가 (워크플로우 상세)
- `PROMPT_WIREFRAME_UI_SEPARATION.md` 대폭 개선

---

## 🎯 핵심 원칙 (항상 기억하세요)

```
Wireframe = 구조 (Structure)
  ✅ display, flex, grid, 레이아웃
  ❌ 색상, 크기, padding/margin 수치

UI = 스타일 (Style)
  ✅ 색상, 크기, padding/margin 수치
  ❌ 레이아웃 구조 변경
```

---

## 📞 도움이 필요하신가요?

- 문서에서 답을 찾지 못했다면 이슈를 등록해주세요
- 문서 개선 제안도 환영합니다!
- 오타나 잘못된 내용을 발견하면 PR을 보내주세요

---

**Happy Learning & Happy Coding! 🚀**
