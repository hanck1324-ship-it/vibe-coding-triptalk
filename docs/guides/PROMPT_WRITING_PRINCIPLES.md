# 프롬프트 작성 원칙 (Prompt Writing Principles)

이 문서는 AI에게 효과적으로 지시하기 위한 프롬프트 작성 원칙을 정리합니다.

## 📋 목차

1. [핵심 원칙](#핵심-원칙)
2. [좋은 프롬프트 vs 나쁜 프롬프트](#좋은-프롬프트-vs-나쁜-프롬프트)
3. [프롬프트 구조](#프롬프트-구조)
4. [금지 사항](#금지-사항)
5. [권장 사항](#권장-사항)
6. [실제 예시 비교](#실제-예시-비교)

---

## 핵심 원칙

### 1. **"무엇을(What)"에 집중하라**
- ✅ 구현해야 할 **기능과 요구사항**을 명확히 명시
- ❌ 구현 방법이나 코드 구조를 지시하지 않음

### 2. **"어떻게(How)"는 AI에게 위임하라**
- ✅ AI가 최적의 구현 방법을 선택하도록 자율성 부여
- ❌ 마이크로매니징 금지

### 3. **간결하고 명확하게**
- ✅ 핵심 요구사항만 명시
- ❌ 불필요한 설명이나 예시 코드 제거

### 4. **일관성 유지**
- ✅ 프로젝트 전체에서 동일한 프롬프트 스타일 사용
- ❌ 파일마다 다른 형식 사용하지 않음

---

## 좋은 프롬프트 vs 나쁜 프롬프트

### ❌ 나쁜 프롬프트 (Bad Prompt)

```txt
핵심요구사항) 다음과 같이 구현할 것:

        구현 예시 구조:
            ```typescript
            "use client";
            
            import { useState } from "react";
            
            export const useExample = () => {
              const [data, setData] = useState("");
              
              const handleChange = (e) => {
                setData(e.target.value);
              };
              
              return { data, handleChange };
            };
            ```
```

**문제점:**
- 코드 구조를 미리 정해버림
- AI의 자율성 제한
- "어떻게" 만들지까지 지시
- 템플릿이 되어 버림

### ✅ 좋은 프롬프트 (Good Prompt)

```txt
핵심요구사항) 데이터 입력 기능을 step-by-step 으로 구현할 것.

        1) 상태 관리
            - useState를 사용하여 입력 데이터 상태 관리
            - 입력값 변경 시 상태 업데이트
            
        2) 기능 요구사항
            - 입력 핸들러 함수 구현
            - 입력값 유효성 검증
            
        3) 반환값
            - 입력 데이터 상태
            - 입력 핸들러 함수
```

**장점:**
- "무엇을" 구현할지만 명시
- AI가 최적의 방법 선택 가능
- 요구사항 중심
- 간결하고 명확함

---

## 프롬프트 구조

### 기본 템플릿

```txt
아래의 조건을 모두 적용하여, 아래의 요구사항을 모두 구현할 것.
구현 결과를 체크리스트로 반환할 것.

==============================================

조건-커서룰) 아래의 커서룰을 적용할 것.
            - @01-common.mdc
            - @04-func.mdc

==============================================

조건-파일경로) 참고할 API 문서경로: [URL]
조건-파일경로) 구현될 파일경로: [경로]

==============================================

핵심요구사항) [기능명]을 step-by-step 으로 구현할 것.

        1) 라이브러리조건
            - [사용할 라이브러리와 훅]
            
        2) 기능 요구사항
            - 1. [세부 요구사항 1]
            - 2. [세부 요구사항 2]
            
        3) 에러 처리 요구사항
            - [에러 처리 방법]
            
        4) 테스트 체크리스트
            - [ ] [테스트 항목 1]
            - [ ] [테스트 항목 2]
```

### 구조 설명

#### 1. 조건-커서룰
- 적용할 커서 룰 명시
- 코드 품질과 스타일 가이드

#### 2. 조건-파일경로
- API 문서 URL
- 구현될 파일 경로
- 참고할 공통 타입 경로

#### 3. 핵심요구사항
- **기능 설명** (무엇을 만들지)
- **라이브러리 조건** (사용할 도구)
- **세부 요구사항** (포함해야 할 것)
- **에러 처리** (예외 상황 대응)
- **테스트 항목** (검증 방법)

---

## 금지 사항

### ❌ 1. 구현 예시 코드 제공 금지

**나쁜 예:**
```txt
구현 예시:
    const [state, setState] = useState("");
    const handleChange = (e) => { setState(e.target.value); }
```

**좋은 예:**
```txt
- useState를 사용하여 상태 관리
- 입력 핸들러 함수 구현
```

### ❌ 2. HTML/JSX 구조 예시 제공 금지

**나쁜 예:**
```txt
구현 예시 구조:
    <div className={styles.wrapper}>
      <input onChange={handleChange} />
    </div>
```

**좋은 예:**
```txt
- wrapper > input 계층 구조
- CSS Modules 클래스명 적용
- onChange 이벤트 핸들러 연결
```

### ❌ 3. 변수명/함수명 강제 금지

**나쁜 예:**
```txt
- const onChangeWriter = (e) => { ... } 형태로 구현할 것
```

**좋은 예:**
```txt
- 작성자 입력 핸들러 함수 구현
- onChange 이벤트 처리
```

### ❌ 4. 구체적인 구현 로직 지시 금지

**나쁜 예:**
```txt
- if (writer && password && title) { setIsActive(true); } 형태로 구현
```

**좋은 예:**
```txt
- 필수 입력값이 모두 입력되면 버튼 활성화
- useEffect로 입력값 변경 감지
```

---

## 권장 사항

### ✅ 1. 요구사항 중심으로 작성

```txt
기능 요구사항:
    - GraphQL 쿼리 정의
    - Variables: boardId (ID!)
    - 응답데이터: _id, title, contents
```

### ✅ 2. 계층 구조로 정리

```txt
1) 상위 요구사항
    - 1. 세부 요구사항 A
        - 구체적 조건 1
        - 구체적 조건 2
    - 2. 세부 요구사항 B
```

### ✅ 3. 검증 가능한 기준 제시

```txt
테스트 체크리스트:
    - [ ] 버튼 클릭 시 데이터가 전송되는가?
    - [ ] 에러 발생 시 메시지가 표시되는가?
```

### ✅ 4. 기술 스택 명시

```txt
라이브러리조건:
    - API: @apollo/client의 useQuery 훅
    - 타입: codegen으로 생성된 타입 사용
    - 라우팅: next/navigation의 useRouter 훅
```

---

## 실제 예시 비교

### 예시 1: 게시글 작성 기능

#### ❌ 과도하게 구체적 (194줄)

```txt
핵심요구사항) 게시글 작성 기능 구현

        구현 예시 구조 (hook.ts):
            ```typescript
            export const useBoardWrite = (isEdit: boolean) => {
              const [writer, setWriter] = useState("");
              const [password, setPassword] = useState("");
              
              const onChangeWriter = (e) => {
                setWriter(e.target.value);
                if (e.target.value) setWriterError("");
              };
              
              const onClickSubmit = async () => {
                try {
                  await createBoard({
                    variables: { createBoardInput }
                  });
                } catch (error) {
                  console.error(error);
                }
              };
              
              return { writer, onChangeWriter, onClickSubmit };
            };
            ```
```

#### ✅ 간결하고 명확 (139줄)

```txt
핵심요구사항) 게시글 작성 기능을 step-by-step 으로 구현할 것.

        1) 라이브러리조건
            - API: @apollo/client의 useMutation 훅
            - 상태 관리: React의 useState 훅
            - 라우팅: next/navigation의 useRouter 훅
            
        2) 기능 요구사항
            - 1. (HOOK) hook.ts 파일에 useBoardWrite 커스텀 훅 생성
                - "use client" 지시어 추가
                - Props로 isEdit (boolean) 받기
                
                - 상태 관리:
                    - writer, password, title, contents (필수)
                    - 각 필드의 에러 메시지 상태
                    - youtubeUrl, 주소 정보 (선택)
                
                - 입력 핸들러:
                    - 각 필드별 onChange 핸들러 구현
                    - 입력 시 에러 메시지 초기화
                
                - 등록 함수:
                    - 유효성 검증
                    - createBoard 뮤테이션 실행
                    - 성공 시 목록 페이지 이동
```

**개선 효과:**
- 코드 예시 제거 → 55줄 감소
- 요구사항만 명시
- AI의 구현 자율성 확보

---

### 예시 2: 배너 컴포넌트

#### ❌ HTML 구조 제공 (63줄)

```txt
        4) 구현 예시 구조
            <div className={styles.wrapper}>
              <div className={styles.content}>
                <p className={styles.message}>
                  여기에 배너 메시지 표시
                </p>
                <button className={styles.closeButton}>
                  X
                </button>
              </div>
            </div>
```

#### ✅ 요구사항만 명시 (51줄)

```txt
        1) 레이아웃 구조
            - wrapper > content > (message + closeButton) 계층
            - message는 p 태그, closeButton은 button 태그
            - CSS Modules 클래스명 적용
            
        2) 컴포넌트 구조
            - "use client" 지시어 추가
            - useState로 표시/숨김 상태 관리
            - isVisible이 false일 때 null 반환
```

**개선 효과:**
- HTML 코드 제거 → 12줄 감소
- 구조 요구사항만 명시
- 더 읽기 쉬움

---

## 체크리스트

프롬프트 작성 후 다음을 확인하세요:

### 필수 체크 항목

- [ ] 구현 예시 코드가 없는가?
- [ ] HTML/JSX 구조 예시가 없는가?
- [ ] "무엇을"에 집중하고 있는가?
- [ ] "어떻게"를 지시하지 않는가?
- [ ] 요구사항이 명확한가?
- [ ] 기술 스택이 명시되어 있는가?
- [ ] 테스트 가능한 기준이 있는가?
- [ ] 파일 경로가 정확한가?

### 품질 체크 항목

- [ ] 불필요한 설명이 없는가?
- [ ] 계층 구조가 명확한가?
- [ ] 다른 프롬프트와 일관된 형식인가?
- [ ] 50-100줄 정도의 적절한 길이인가?
- [ ] AI가 자율적으로 구현할 수 있는가?

---

## 프롬프트 길이 가이드

### 적절한 길이

- **와이어프레임 프롬프트:** 40-60줄
- **UI 프롬프트:** 60-80줄
- **기능 프롬프트:** 80-120줄

### 너무 긴 경우 (120줄 이상)

**원인:**
- 구현 예시 코드 포함
- 불필요한 설명 중복
- "어떻게"까지 지시

**해결:**
- 코드 예시 제거
- 요구사항만 남기기
- 핵심만 간결하게

---

## 프롬프트 개선 프로세스

### 1단계: 초안 작성
```txt
- 필요한 기능 나열
- 기술 스택 명시
- 파일 경로 확인
```

### 2단계: 불필요한 부분 제거
```txt
- ❌ 코드 예시 삭제
- ❌ HTML 구조 삭제
- ❌ 구체적인 변수명 삭제
```

### 3단계: 요구사항 정리
```txt
- ✅ "무엇을"로 재작성
- ✅ 계층 구조 정리
- ✅ 테스트 항목 추가
```

### 4단계: 검증
```txt
- 체크리스트 확인
- 다른 프롬프트와 비교
- 필요시 동료 리뷰
```

---

## 참고 자료

### 좋은 프롬프트 예시

프로젝트 내 참고할 만한 프롬프트:
- `src/components/boards-detail/comment-write/prompts/prompt.301.func.txt` (52줄, 간결)
- `src/components/boards-list/prompts/prompt.02.ui.txt` (87줄, 적절한 상세도)

### 개선이 필요했던 프롬프트

- ~~`src/components/boards-write/prompts/prompt.301.func.txt`~~ (194줄 → 139줄로 개선)
- ~~`src/commons/layout/banner/prompts/`~~ (코드 예시 제거)

---

## 마무리

### 핵심 메시지

> **"무엇을(What)" 만들지 명확히 하고,**  
> **"어떻게(How)" 만들지는 AI에게 맡겨라.**

### 좋은 프롬프트의 3대 원칙

1. **명확성(Clarity):** 요구사항이 분명한가?
2. **간결성(Conciseness):** 불필요한 내용이 없는가?
3. **자율성(Autonomy):** AI가 최적 방법을 선택할 수 있는가?

---

## 업데이트 히스토리

- 2025-01-XX: 초기 문서 작성
- 프롬프트 개선 작업 후 작성된 가이드
- 127줄의 불필요한 코드 예시 제거 경험 반영

