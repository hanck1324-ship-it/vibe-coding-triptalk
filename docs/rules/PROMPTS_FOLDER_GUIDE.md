# 프롬프트 폴더 구조 가이드

프로젝트 전체 컴포넌트의 프롬프트 폴더 구조와 필요한 프롬프트 파일을 정리합니다.

## 📂 전체 프롬프트 구조

### 1. auth (인증)

#### 📁 `auth/prompts/` (전역 인증 관련)
```
✅ prompt.401.func.logout.txt      (로그아웃 기능)
✅ prompt.auth-signupfunc.form.txt (회원가입 폼)
```

#### 📁 `auth/login/prompts/` (로그인)
```
✅ prompt.01.wireframe.txt  (구조)
✅ prompt.201.ui.txt        (UI)
✅ prompt.301.func.txt      (로그인 기능)
```

#### 📁 `auth/signup/prompts/` (회원가입)
```
❌ 프롬프트 없음 (필요시 생성)

권장:
- prompt.01.wireframe.txt
- prompt.201.ui.txt
- prompt.301.func.txt
```

---

### 2. boards-detail (게시글 상세)

#### 📁 `boards-detail/prompts/` (페이지 통합)
```
✅ prompt.01.wireframe.txt       (전체 레이아웃)
✅ prompt.201.integration.txt    (컴포넌트 통합)
```

**역할:**
- 3개 하위 컴포넌트(detail, comment-list, comment-write) 통합
- 전체 페이지 레이아웃 구성

#### 📁 `boards-detail/detail/prompts/` (게시글 본문)
```
✅ prompt.201.ui.txt   (게시글 상세 UI)
✅ prompt.301.func.txt (데이터 조회)
```

#### 📁 `boards-detail/comment-list/prompts/` (댓글 목록)
```
✅ prompt.201.ui.txt            (댓글 목록 UI)
✅ prompt.301.func.txt          (댓글 조회)
✅ prompt.401.func.edit.txt     (댓글 수정)
✅ prompt.501.func.delete.txt   (댓글 삭제)
```

#### 📁 `boards-detail/comment-write/prompts/` (댓글 작성)
```
✅ prompt.201.ui.txt   (댓글 작성 폼 UI)
✅ prompt.301.func.txt (댓글 작성 기능)
```

---

### 3. boards-list (게시글 목록)

#### 📁 `boards-list/prompts/`
```
✅ prompt.01.wireframe.txt  (목록 구조)
✅ prompt.02.ui.txt         (목록 UI)

추가 권장:
❌ prompt.301.func.txt (목록 조회, 페이지네이션, 검색)
```

---

### 4. boards-write (게시글 작성/수정)

#### 📁 `boards-write/prompts/`
```
✅ prompt.101.wireframe.txt  (작성 폼 구조)
✅ prompt.201.ui.txt         (작성 폼 UI)
✅ prompt.301.func.txt       (작성 기능)
✅ prompt.301.func.edit.txt  (수정 기능)
```

---

### 5. mypage (마이페이지)

#### 📁 `mypage/prompts/`
```
✅ prompt.01.wireframe.txt  (마이페이지 구조)
✅ prompt.201.ui.txt        (마이페이지 UI)
✅ prompt.301.func.txt      (사용자 정보 조회)

추가 권장:
❌ prompt.401.func.edit-profile.txt (프로필 수정)
❌ prompt.501.func.my-posts.txt     (내 게시글 조회)
```

---

### 6. purchase (숙박권 구매)

#### 📁 `purchase/detail/prompts/` (상세)
```
✅ prompt.101.wireframe.txt         (상세 페이지 구조)
✅ prompt.201.ui.txt                (상세 페이지 UI)
✅ prompt.301.func.txt              (상세 정보 조회)
✅ prompt.401.comment-write.txt     (댓글 작성)

추가 권장:
❌ prompt.501.comment-list.txt (댓글 목록)
```

#### 📁 `purchase/list/prompts/` (목록)
```
✅ prompt.01.wireframe.txt           (목록 구조)
✅ prompt.201.ui-IMPROVED.txt        (목록 UI)
✅ prompt.301.func-IMPROVED.txt      (목록 조회, 검색, 필터)

정리 필요:
⚠️ -IMPROVED 접미사 파일들 → 원본 파일로 변경 권장
```

#### 📁 `purchase/sell/prompts/` (판매 등록)
```
✅ prompt.101.wireframe.txt  (등록 폼 구조)
✅ prompt.201.ui.txt         (등록 폼 UI)
✅ prompt.301.func.txt       (등록 기능)

추가 권장:
❌ prompt.401.func.edit.txt (수정 기능)
```

#### 📁 `purchase/purchase-modal/prompts/` (구매 모달)
```
✅ prompt.201.ui.txt                 (모달 UI)
✅ prompt.301.func.modal-connect.txt (모달 연결)
✅ prompt.302.func.point-check.txt   (포인트 확인)
✅ prompt.303.func.purchase-api.txt  (구매 API)
```

#### 📁 `purchase/point-alert-modal/prompts/` (포인트 부족 알림)
```
✅ prompt.201.ui.txt (알림 모달 UI)

추가 권장:
❌ prompt.301.func.txt (포인트 충전 연결)
```

---

## 🎯 프롬프트 작성 우선순위

### 🔴 높음 (필수 - 기능 동작 안 함)
```
1. boards-list/prompts/
   └─ prompt.301.func.txt (목록 조회 기능 없음!)

2. purchase/sell/prompts/
   └─ prompt.401.func.edit.txt (수정 기능 없음)

3. auth/signup/prompts/
   └─ 전체 (회원가입 기능 없음)
```

### 🟡 중간 (있으면 좋음)
```
1. mypage/prompts/
   └─ prompt.401.func.edit-profile.txt (프로필 수정)
   └─ prompt.501.func.my-posts.txt (내 게시글)

2. purchase/detail/prompts/
   └─ prompt.501.comment-list.txt (댓글 목록)
```

### 🟢 낮음 (부가 기능)
```
1. purchase/point-alert-modal/prompts/
   └─ prompt.301.func.txt (포인트 충전)
```

---

## 📋 프롬프트 파일 명명 규칙

### 기본 패턴
```
prompt.[번호].[타입].txt
prompt.[번호].[타입].[기능명].txt
```

### 번호 규칙
- `01, 101`: wireframe (구조)
- `02, 201`: ui (디자인)
- `301`: func (기본 기능)
- `401`: func (추가 기능 1)
- `501`: func (추가 기능 2)
- `601`: func (추가 기능 3)

### 타입
- `wireframe`: 와이어프레임 (구조만)
- `ui`: UI 구현 (디자인)
- `func`: 기능 구현
- `integration`: 컴포넌트 통합
- `e2e`: e2e 테스트
- `story`: Storybook

---

## 🗂️ 폴더별 필요한 프롬프트 템플릿

### 일반 페이지 컴포넌트 (기본 3개)
```
컴포넌트/prompts/
├── prompt.01.wireframe.txt  (필수)
├── prompt.201.ui.txt         (필수)
└── prompt.301.func.txt       (필수)
```

### 복잡한 페이지 (5개 이상)
```
컴포넌트/prompts/
├── prompt.01.wireframe.txt
├── prompt.201.ui.txt
├── prompt.301.func.txt          (기본 기능)
├── prompt.401.func.[기능명].txt (추가 기능 1)
├── prompt.501.func.[기능명].txt (추가 기능 2)
└── prompt.601.story.txt         (Storybook - 선택)
```

### 모달 컴포넌트 (간단)
```
모달/prompts/
├── prompt.201.ui.txt    (모달 UI)
└── prompt.301.func.txt  (모달 로직)
```

### 통합 페이지 (2개)
```
페이지/prompts/
├── prompt.01.wireframe.txt    (전체 레이아웃)
└── prompt.201.integration.txt (컴포넌트 통합)
```

---

## ✅ 현재 상태 요약

### 완료된 컴포넌트 ✅
- `auth/login` (3개)
- `boards-detail/detail` (2개)
- `boards-detail/comment-list` (4개)
- `boards-detail/comment-write` (2개)
- `boards-detail` (2개 - 방금 생성!)
- `boards-write` (4개)
- `mypage` (3개)
- `purchase/detail` (4개)
- `purchase/list` (3개)
- `purchase/sell` (3개)
- `purchase/purchase-modal` (4개)
- `purchase/point-alert-modal` (1개)

### 프롬프트 부족 ⚠️
- `boards-list` - func 프롬프트 없음
- `auth/signup` - 프롬프트 폴더 없음
- `auth/prompts` - 일부만 있음

---

## 🚀 다음 작업 추천

### 1순위: boards-list 기능 프롬프트
```
boards-list/prompts/prompt.301.func.txt 생성
- 목록 조회 (fetchBoards)
- 페이지네이션
- 검색 기능
```

### 2순위: auth/signup 전체
```
auth/signup/prompts/ 폴더 생성
- prompt.01.wireframe.txt
- prompt.201.ui.txt  
- prompt.301.func.txt
```

### 3순위: purchase 추가 기능
```
purchase/sell/prompts/prompt.401.func.edit.txt (수정 기능)
purchase/detail/prompts/prompt.501.comment-list.txt (댓글 목록)
```

---

## 📝 프롬프트 생성 빠른 참고

**새 프롬프트 만들 때:**
1. `PROMPT_BASE_RULES.md` 확인 (기본 구조)
2. `PROMPT_RECHECK_RULES.md` 확인 (체크리스트)
3. 유사 컴포넌트 프롬프트 참고
4. MCP 채널과 노드 ID 명시 (UI인 경우)

---

## 🔍 폴더별 상세 정보

위에서 정리한 내용 참고!

이제 프로젝트 전체의 프롬프트 구조가 명확해졌습니다! 🎉












