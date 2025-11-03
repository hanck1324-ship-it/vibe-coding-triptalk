# 프롬프트 파일 구조 및 위치 가이드

이 문서는 프로젝트 내 프롬프트 파일들의 위치와 구조를 정리한 가이드입니다.

## 📁 프롬프트 파일 위치 규칙

### 1. 기본 구조
프롬프트 파일은 각 컴포넌트 폴더 내 `prompts/` 디렉토리에 위치합니다.

```
src/components/[컴포넌트명]/
  ├── prompts/
  │   ├── prompt.XXX.wireframe.txt  (와이어프레임)
  │   ├── prompt.XXX.ui.txt        (UI 구현)
  │   └── prompt.XXX.func.txt       (기능 구현)
  ├── index.tsx
  ├── hook.ts
  ├── queries.ts
  └── styles.module.css
```

### 2. 파일명 규칙

#### 와이어프레임 프롬프트
- **패턴**: `prompt.101.wireframe.txt` 또는 `prompt.01.wireframe.txt`
- **용도**: HTML과 flexbox 구조만 생성하는 와이어프레임 단계

#### UI 구현 프롬프트
- **패턴**: `prompt.201.ui.txt` 또는 `prompt.02.ui.txt`
- **용도**: 피그마 디자인을 반영한 UI 구현

#### 기능 구현 프롬프트
- **패턴**: `prompt.301.func.txt` 또는 `prompt.XXX.func.txt`
- **용도**: GraphQL 쿼리/뮤테이션, 상태 관리, 비즈니스 로직 구현

#### 특수 프롬프트
- **패턴**: `prompt.[이름].form.txt`, `prompt.[이름].hook.txt` 등
- **용도**: 특정 기능 중심 (예: form, hook 등)

---

## 📂 현재 프로젝트 프롬프트 위치

### 1. 게시글 작성 (boards-write)
```
src/components/boards-write/prompts/
├── prompt.101.wireframe.txt    ✅ 존재
└── prompt.201.ui.txt          ✅ 존재
```

### 2. 게시글 목록 (boards-list)
```
src/components/boards-list/prompts/
├── prompt.01.wireframe.txt    ✅ 수정 완료
└── prompt.02.ui.txt           ✅ 수정 완료
```

### 3. 게시글 상세 (boards-detail/detail)
```
src/components/boards-detail/detail/prompts/
├── prompt.201.ui.txt          ✅ 생성 완료
└── prompt.301.func.txt        ✅ 생성 완료
```

### 4. 댓글 작성 (boards-detail/comment-write)
```
src/components/boards-detail/comment-write/prompts/
    prompt.101.wrireframe.txt 
├── prompt.201.ui.txt          ✅ 생성 완료
└── prompt.301.func.txt        ✅ 생성 완료
```

### 5. 댓글 목록 (boards-detail/comment-list)
```
src/components/boards-detail/comment-list/prompts/
├── prompt.201.ui.txt          ✅ 생성 완료
└── prompt.301.func.txt        ✅ 생성 완료
```

### 6. 로그인 (auth/login)
```
src/components/auth/login/prompts/
├── prompt.201.ui.txt          ✅ 생성 완료
└── prompt.301.func.txt        ✅ 생성 완료
```

### 7. 회원가입 (auth)
```
src/components/auth/prompts/
└── prompt.auth-signupfunc.form.txt    ✅ 존재
```

### 8. 배너 (commons/layout/banner)
```
src/commons/layout/banner/prompts/
└── prompts.banner.txt         ✅ 존재
```

---

## 🔧 추가로 생성된 프롬프트

### 1. 게시글 수정 (boards-write/edit)
```
src/components/boards-write/prompts/
└── prompt.301.func.edit.txt   ✅ 생성 완료
```

### 2. 댓글 수정/삭제 (boards-detail/comment-list)
```
src/components/boards-detail/comment-list/prompts/
├── prompt.401.func.edit.txt   ✅ 생성 완료
└── prompt.501.func.delete.txt  ✅ 생성 완료
```

### 3. 좋아요/싫어요 기능 (boards-detail/detail)
```
src/components/boards-detail/detail/prompts/
└── prompt.401.func.like.txt    ✅ 생성 완료
```

### 4. 로그아웃 (auth)
```
src/components/auth/prompts/
└── prompt.401.func.logout.txt  ✅ 생성 완료
```

---

## 📋 프롬프트 사용 순서

일반적인 개발 순서는 다음과 같습니다:

1. **와이어프레임 단계** (`prompt.101.wireframe.txt`)
   - HTML 구조와 flexbox 레이아웃만 생성
   - CSS는 최소한의 구조만 적용

2. **UI 구현 단계** (`prompt.201.ui.txt`)
   - 피그마 디자인 반영
   - 이미지, 아이콘, 색상, 타이포그래피 적용
   - CSS Modules 스타일링

3. **기능 구현 단계** (`prompt.301.func.txt`)
   - GraphQL 쿼리/뮤테이션 연동
   - 상태 관리 및 비즈니스 로직
   - 이벤트 핸들러 구현

---

## ⚠️ 주의사항

1. **폴더명 일관성**
   - `prompts/` (복수형) 사용
   - `promts/` (오타) 피하기

2. **파일명 일관성**
   - `prompt`로 시작 (단수형)
   - `prompts`로 시작하지 않기

3. **파일 경로**
   - 각 컴포넌트별로 독립적인 `prompts/` 폴더 생성
   - 공통 컴포넌트는 `commons/` 폴더 내에 위치

4. **규칙 참조**
   - 모든 프롬프트는 `@01-common.mdc`, `@02-wireframe.mdc`, `@03-ui.mdc`, `@04-func.mdc` 규칙 참조
   - 규칙 파일 위치: `/Users/hanchang-gi/Desktop/트립토크 플랫폼/01-03/rules/`

---

## 🔄 업데이트 내역
