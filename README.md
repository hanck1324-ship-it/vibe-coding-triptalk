# 트립토크 (My Trip Talk) 🌍✈️

여행 경험을 공유하는 커뮤니티 플랫폼

## 📖 프로젝트 소개

트립토크는 사용자들이 여행 경험과 이야기를 공유하는 웹 플랫폼입니다.
게시글 작성, 댓글, 유튜브 영상 공유 등의 기능을 제공합니다.

## 🛠️ 기술 스택

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **State Management**: React Hooks
- **API**: GraphQL (Apollo Client)
- **Styling**: CSS Modules
- **Code Generation**: GraphQL Code Generator
- **UI Library**: Ant Design
- **Video Player**: React Player
- **Address Search**: Daum Postcode

## 🚀 시작하기

### 1. 클론 및 설치

```bash
git clone https://github.com/hanck1324-ship-it/vibe-coding-triptalk.git
cd vibe-coding-triptalk
npm install
```

### 2. 개발 서버 실행

```bash
npm run dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000) 접속

### 3. GraphQL 타입 생성

```bash
npm run codegen
```

## 📁 프로젝트 구조

```
src/
├── app/                    # Next.js App Router 페이지
│   ├── boards/            # 게시판 페이지
│   ├── login/             # 로그인 페이지
│   ├── myPage/            # 마이페이지
│   └── purchase/          # 숙박권 구매 페이지
├── components/            # 재사용 가능한 컴포넌트
│   ├── boards-list/       # 게시글 목록
│   ├── boards-write/      # 게시글 작성/수정
│   ├── boards-detail/     # 게시글 상세
│   │   ├── detail/        # 상세 정보
│   │   ├── comment-write/ # 댓글 작성
│   │   └── comment-list/  # 댓글 목록
│   ├── auth/              # 인증 관련
│   ├── mypage/            # 마이페이지
│   └── purchase/          # 구매 관련
├── commons/               # 공통 모듈
│   ├── graphql/           # GraphQL 타입 (자동 생성)
│   ├── layout/            # 레이아웃 컴포넌트
│   │   ├── banner/        # 배너
│   │   └── navigation/    # 네비게이션
│   └── settings/          # Apollo Client 설정
└── assets/                # 이미지 및 정적 파일
```

## ✨ 주요 기능

### 1. 게시글 관리
- ✅ 게시글 목록 조회
- ✅ 게시글 상세 보기
- ✅ 게시글 작성/수정
- ✅ 유튜브 영상 임베드
- ✅ 주소 검색 및 등록

### 2. 댓글 시스템
- ✅ 댓글 목록 조회
- ✅ 댓글 작성
- ✅ 댓글 수정/삭제
- ✅ 평점 기능

### 3. 인증
- ✅ 로그인
- ✅ 로그아웃

### 4. 기타
- ✅ 네비게이션 메뉴
- ✅ 배너 (공지사항)
- ✅ 반응형 디자인 (부분)

## 📚 Documentation

문서가 체계적으로 정리되었습니다! 📂

### 🚀 [docs/guides/](docs/guides/) - 바이브 코딩 활용 가이드
**실전에서 바로 사용하는 방법**

- **⭐ [`QUICK_START_VIBE_CODING.md`](docs/guides/QUICK_START_VIBE_CODING.md)** - 빠른 시작 (복사 붙여넣기용!)
- **⭐ [`PROMPT_CHEATSHEET.md`](docs/guides/PROMPT_CHEATSHEET.md)** - 빠른 참조 치트시트
- [`VIBE_CODING_WORKFLOW.md`](docs/guides/VIBE_CODING_WORKFLOW.md) - AI 코딩 워크플로우
- [`PROMPT_WRITING_PRINCIPLES.md`](docs/guides/PROMPT_WRITING_PRINCIPLES.md) - 프롬프트 작성 원칙
- [`HOW_TO_CREATE_PROMPTS.md`](docs/guides/HOW_TO_CREATE_PROMPTS.md) - 프롬프트 파일 생성 가이드

> 💡 **처음이라면?** [`docs/guides/QUICK_START_VIBE_CODING.md`](docs/guides/QUICK_START_VIBE_CODING.md)부터 시작하세요!

---

### 📋 [docs/rules/](docs/rules/) - Recheck 규칙
**프롬프트 작성 및 검증 규칙**

- **⭐ [`PROMPT_WIREFRAME_UI_SEPARATION.md`](docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md)** - Wireframe vs UI 역할 구분 (필독!)
- [`PROMPT_BASE_RULES.md`](docs/rules/PROMPT_BASE_RULES.md) - 프롬프트 기본 규칙
- [`PROMPT_RECHECK_RULES.md`](docs/rules/PROMPT_RECHECK_RULES.md) - 재검토 규칙
- [`PROMPTS_FOLDER_GUIDE.md`](docs/rules/PROMPTS_FOLDER_GUIDE.md) - 폴더 구조
- [`PROMPTS_STRUCTURE.md`](docs/rules/PROMPTS_STRUCTURE.md) - 프롬프트 구조

> 🔍 **검증할 때?** [`docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md`](docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md) 참조!

---

### 🤖 AI 설정
- `.cursorrules` - Cursor AI 자동 참조 규칙

### 📝 기타
- `NEEDED_IMAGES.md` - 필요한 이미지 목록

## 🎯 AI 기반 개발 (Vibe Coding)

이 프로젝트는 **AI 기반 개발(Vibe Coding)** 방식을 채택하고 있습니다.

### 프롬프트 구조
각 컴포넌트 폴더 내 `prompts/` 디렉토리에 단계별 프롬프트가 위치합니다:

```
src/components/[컴포넌트명]/
├── prompts/
│   ├── prompt.01.wireframe.txt    # 1단계: 구조 (Structure)
│   ├── prompt.201.ui.txt          # 2단계: 스타일 (Style)
│   └── prompt.301.func.txt        # 3단계: 기능 (Function)
├── index.tsx                      # 컴포넌트
├── hook.ts                        # 커스텀 훅
├── queries.ts                     # GraphQL 쿼리
└── styles.module.css              # 스타일
```

### ⚡ 빠른 시작 (AI 명령어)

#### 1. 신규 컴포넌트 개발
```bash
# Step 1: Wireframe 작성
"docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
포인트 사용 내역 컴포넌트의 wireframe 프롬프트를 작성해줘"

# Step 2: UI 작성
"docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md를 참조해서
포인트 사용 내역 컴포넌트의 UI 프롬프트를 작성해줘.
wireframe 구조를 유지하면서 브랜드 컬러(#2974e5)를 활용해줘"

# Step 3: 컴포넌트 구현
"prompt.01.wireframe.txt와 prompt.201.ui.txt를 참조해서
컴포넌트를 구현해줘"
```

#### 2. 기존 프롬프트 검증
```bash
"src/components/point/charge/prompts/ 폴더의 프롬프트들이
docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md 가이드를 따르는지 확인해줘"
```

### 📋 개발 워크플로우

```
1. Wireframe 프롬프트 작성 (구조 정의)
   ↓
2. UI 프롬프트 작성 (스타일 정의)
   ↓
3. AI에게 컴포넌트 구현 요청
   ↓
4. 생성된 코드 검토 및 테스트
   ↓
5. 필요시 프롬프트 개선 후 재실행
```

### 🎯 핵심 원칙

```
Wireframe (prompt.01) = 구조 (Structure)
  ✅ display, flex, grid, 레이아웃
  ❌ 색상, 크기, padding/margin 수치

UI (prompt.201) = 스타일 (Style)
  ✅ 색상, 크기, padding/margin 수치
  ❌ 레이아웃 구조 변경
```

### 📚 자세한 내용
- **문서 전체 보기**: [`docs/README.md`](docs/README.md)
- **역할 구분**: [`docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md`](docs/rules/PROMPT_WIREFRAME_UI_SEPARATION.md)
- **워크플로우**: [`docs/guides/VIBE_CODING_WORKFLOW.md`](docs/guides/VIBE_CODING_WORKFLOW.md)
- **치트시트**: [`docs/guides/PROMPT_CHEATSHEET.md`](docs/guides/PROMPT_CHEATSHEET.md)

## 🧪 테스트

```bash
# 테스트 실행 (준비 중)
npm run test
```

## 📝 커밋 컨벤션

```
feat: 새로운 기능 추가
fix: 버그 수정
refactor: 코드 리팩토링
docs: 문서 수정
style: 코드 포맷팅
test: 테스트 코드
chore: 빌드 설정, 패키지 등
```

## 🔗 API 문서

- GraphQL Playground: https://main-practice.codebootcamp.co.kr/graphql

## 📄 라이선스

이 프로젝트는 MIT 라이선스를 따릅니다.

## 👥 기여

이슈와 PR은 언제나 환영합니다!

## 📧 문의

프로젝트 관련 문의사항이 있으시면 이슈를 등록해주세요.

---

**Happy Coding! 🚀**
