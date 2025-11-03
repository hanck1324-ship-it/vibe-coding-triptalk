# 프롬프트 파일 생성 가이드

이 문서는 프로젝트에 새로운 프롬프트 파일을 생성하는 방법과 규칙을 설명합니다.

## 📋 목차

1. [프롬프트 파일이란?](#프롬프트-파일이란)
2. [폴더 구조 규칙](#폴더-구조-규칙)
3. [파일명 규칙](#파일명-규칙)
4. [프롬프트 파일 생성 방법](#프롬프트-파일-생성-방법)
5. [프롬프트 템플릿](#프롬프트-템플릿)
6. [주의사항](#주의사항)

---

## 프롬프트 파일이란?

프롬프트 파일은 AI(Cursor)에게 코드 구현을 지시하는 텍스트 파일입니다. 각 파일은 특정 단계나 기능에 대한 구현 가이드를 포함합니다.

---

## 폴더 구조 규칙

### 1. 기본 위치
프롬프트 파일은 각 컴포넌트 폴더 내 `prompts/` 디렉토리에 위치합니다.

```
src/components/[컴포넌트명]/
  ├── prompts/          ← 여기에 프롬프트 파일 생성
  │   ├── prompt.XXX.wireframe.txt
  │   ├── prompt.XXX.ui.txt
  │   └── prompt.XXX.func.txt
  ├── index.tsx
  ├── hook.ts
  ├── queries.ts
  └── styles.module.css
```

### 2. 폴더 생성 방법

#### 방법 1: 터미널 사용
```bash
mkdir -p src/components/[컴포넌트명]/prompts
```

#### 방법 2: IDE에서 생성
- 컴포넌트 폴더 우클릭 → "New Folder"
- 폴더명: `prompts` (복수형, 소문자)

### 3. 폴더명 규칙
- ✅ **올바른 이름**: `prompts/` (복수형, 소문자)
- ❌ **잘못된 이름**: 
  - `promts/` (오타)
  - `Prompts/` (대문자 시작)
  - `prompt/` (단수형)

---

## 파일명 규칙

### 1. 기본 패턴

#### 와이어프레임 프롬프트
```
prompt.101.wireframe.txt
prompt.01.wireframe.txt
```
- **용도**: HTML 구조와 flexbox 레이아웃만 생성
- **숫자**: 01, 101 등 (작은 숫자일수록 먼저 실행)

#### UI 구현 프롬프트
```
prompt.201.ui.txt
prompt.02.ui.txt
```
- **용도**: 피그마 디자인 반영, 스타일링
- **숫자**: 02, 201 등

#### 기능 구현 프롬프트
```
prompt.301.func.txt
prompt.XXX.func.txt
```
- **용도**: GraphQL 쿼리/뮤테이션, 상태 관리, 비즈니스 로직
- **숫자**: 301, 401, 501 등 (기능별로 증가)

#### 특수 기능 프롬프트
```
prompt.401.func.edit.txt      (수정 기능)
prompt.501.func.delete.txt     (삭제 기능)
prompt.401.func.like.txt       (좋아요 기능)
prompt.auth-signupfunc.form.txt (회원가입 폼)
```
- **용도**: 특정 기능에 특화된 프롬프트
- **이름 규칙**: `prompt.[번호].[타입].[기능].txt`

### 2. 파일명 규칙 체크리스트

- ✅ `prompt`로 시작 (단수형)
- ✅ 확장자: `.txt`
- ✅ 소문자만 사용
- ✅ 숫자와 점(.)으로 단계 구분
- ❌ `prompts`로 시작하지 않음 (복수형 금지)
- ❌ `promt` (오타 금지)

---

## 프롬프트 파일 생성 방법

### 1. 단계별 가이드

#### Step 1: 컴포넌트 폴더 확인
```bash
src/components/[컴포넌트명]/
```

#### Step 2: prompts 폴더 생성 (없는 경우)
```bash
mkdir -p src/components/[컴포넌트명]/prompts
```

#### Step 3: 프롬프트 파일 생성
```bash
touch src/components/[컴포넌트명]/prompts/prompt.XXX.ui.txt
```

또는 IDE에서:
- `prompts/` 폴더 우클릭 → "New File"
- 파일명 입력: `prompt.XXX.ui.txt`

#### Step 4: 프롬프트 내용 작성
템플릿을 참고하여 내용 작성 (아래 섹션 참조)

---

## 프롬프트 템플릿

### 템플릿 1: 와이어프레임 프롬프트

```txt
아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

==============================================

조건-커서룰) 아래의 커서룰을 적용하여 작업하고, 이 작업이 끝나면 해당 rules 적용 결과를 체크리스트로 반환할 것.
            - @01-common.mdc
            - @02-wireframe.mdc

==============================================

조건-파일경로) 구현될 TSX 파일경로: src/components/[컴포넌트명]/index.tsx
조건-파일경로) 구현될 CSS 파일경로: src/components/[컴포넌트명]/styles.module.css

==============================================

핵심요구사항) HTML과 flexbox를 활용한 와이어프레임 구조만 만들어낼 것.

핵심요구사항) [구조 설명]을 step-by-step 으로 구현하고, 적용 결과를 체크리스트로 반환할 것.

        1) 레이아웃 구조
            - 1. wrapper 영역
            - 2. [각 영역 설명]

        2) 스타일링 요구사항
            - CSS Modules 사용 (styles.module.css)
            - flexbox 레이아웃만 사용
```

### 템플릿 2: UI 구현 프롬프트

```txt
아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

==============================================

조건-커서룰) 아래의 커서룰을 적용하여 작업하고, 이 작업이 끝나면 해당 rules 적용 결과를 체크리스트로 반환할 것.
            - @01-common.mdc
            - @02-wireframe.mdc
            - @03-ui.mdc

==============================================

조건-파일경로) 구현될 TSX 파일경로: src/components/[컴포넌트명]/index.tsx
조건-파일경로) 구현될 CSS 파일경로: src/components/[컴포넌트명]/styles.module.css

조건-공통목록) 사용할 공통컴포넌트 목록
            - <ComponentName />
조건-공통목록) 사용할 색상 목록(global.css에 명시된 변수 토큰 활용)
            - 비슷한 토큰 선택하여 사용(하드코딩 금지)
조건-공통목록) 사용할 타이포그래피 목록(global.css에 명시된 변수 토큰 활용)
            - 비슷한 토큰 선택하여 사용(하드코딩 금지)

==============================================

핵심요구사항) [UI 설명]을 step-by-step 으로 구현하고, 적용 결과를 체크리스트로 반환할 것.

        1) UI 구조 요구사항
            - 1. [영역 설명]
            - 2. [영역 설명]

        2) 데이터 바인딩 요구사항
            - [상태 관리 설명]

        3) 스타일링 요구사항
            - CSS Modules 사용
```

### 템플릿 3: 기능 구현 프롬프트

```txt
아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

==============================================

조건-커서룰) 아래의 커서룰을 적용하여 작업하고, 이 작업이 끝나면 해당 rules 적용 결과를 체크리스트로 반환할 것.
            - @01-common.mdc
            - @04-func.mdc

==============================================

조건-파일경로) 참고할 API 문서경로: https://main-practice.codebootcamp.co.kr/graphql
조건-파일경로) 구현될 HOOK 파일경로: src/components/[컴포넌트명]/hook.ts
조건-파일경로) 구현될 GQL 파일경로: src/components/[컴포넌트명]/queries.ts
조건-파일경로) (참고) 공통 GQL 타입: src/commons/graphql/graphql.ts (codegen으로 생성된 타입 사용)

==============================================

핵심요구사항) [기능 설명]을 step-by-step 으로 구현하고, 적용 결과를 체크리스트로 반환할 것.

        1) 라이브러리조건
            - API: @apollo/client의 useQuery/useMutation 훅을 사용할 것.
            - 타입: @/commons/graphql/graphql에서 codegen으로 생성된 타입을 사용할 것.
            - 라우팅: next/navigation의 useRouter 훅을 사용할 것.

        2) 기능 요구사항
            - 1. (GQL) queries.ts 파일에 [쿼리/뮤테이션]을 정의할 것.
                - Query/Mutation: [이름]
                - Variables: [변수 설명]
                - 응답데이터: [필드 목록]
                - gql template literal 사용

            - 2. (HOOK) hook.ts 파일에 커스텀 훅을 만들 것.
                - "use client" 지시어 추가
                - [상태 관리 설명]
                - [함수 설명]

        3) 에러 처리 요구사항
            - [에러 처리 방법]

        4) 최적화 요구사항
            - [최적화 방법]
```

---

## 실제 예시

### 예시 1: 게시글 목록 UI 프롬프트
```
파일 위치: src/components/boards-list/prompts/prompt.02.ui.txt
```

### 예시 2: 댓글 작성 기능 프롬프트
```
파일 위치: src/components/boards-detail/comment-write/prompts/prompt.301.func.txt
```

### 예시 3: 좋아요 기능 프롬프트
```
파일 위치: src/components/boards-detail/detail/prompts/prompt.401.func.like.txt
```

---

## 주의사항

### ✅ DO (해야 할 것)

1. **일관된 네이밍**
   - 폴더명: `prompts/` (복수형)
   - 파일명: `prompt.XXX.txt` (단수형)

2. **단계별 작성**
   - 와이어프레임 → UI → 기능 순서로 작성
   - 각 단계를 명확히 구분

3. **규칙 참조 명시**
   - 항상 `@01-common.mdc`, `@02-wireframe.mdc` 등 규칙 참조

4. **파일 경로 명확히**
   - 절대 경로 사용: `src/components/[컴포넌트명]/index.tsx`
   - 경로 별칭 사용 가능: `@/components/[컴포넌트명]/index.tsx`

### ❌ DON'T (하지 말아야 할 것)

1. **오타 주의**
   - ❌ `promts/` (폴더명 오타)
   - ❌ `promt.XXX.txt` (파일명 오타)
   - ❌ `prompts.XXX.txt` (복수형으로 시작)

2. **일관성 없는 네이밍**
   - 같은 컴포넌트 내에서 다른 패턴 사용 금지

3. **규칙 미준수**
   - 커서룰 규칙을 참조하지 않음
   - 파일 경로를 명확히 하지 않음

---

## 체크리스트

새로운 프롬프트 파일을 생성할 때 다음을 확인하세요:

- [ ] `prompts/` 폴더가 존재하는가?
- [ ] 파일명이 `prompt.`로 시작하는가?
- [ ] 파일명에 오타가 없는가? (`promt` ❌)
- [ ] 적절한 단계 번호를 사용하는가? (01, 101, 201, 301 등)
- [ ] 적절한 타입을 사용하는가? (wireframe, ui, func)
- [ ] 커서룰 규칙을 참조하는가? (@01-common.mdc 등)
- [ ] 파일 경로가 명확히 명시되어 있는가?
- [ ] 요구사항이 step-by-step으로 구체적으로 작성되어 있는가?

---

## 도움말

프롬프트 파일 생성 시 문제가 발생하면:
1. `PROMPTS_STRUCTURE.md` 파일 참조
2. 기존 프롬프트 파일들을 참고
3. 규칙 파일들(`@01-common.mdc` 등) 확인

---

## 업데이트 내역

- 2024년: 프롬프트 생성 가이드 초기 작성
- 게시글, 댓글, 인증 관련 프롬프트 구조 정리


