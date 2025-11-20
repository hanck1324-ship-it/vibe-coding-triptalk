# 구매 페이지 빠진 기능 요약

## 📋 전체 개요

현재 구현된 구매 관련 페이지들에서 프롬프트에 명시되어 있지만 아직 구현되지 않은 기능들을 정리한 문서입니다.

---

## 1. 구매 목록 페이지 (`/purchase` - list)

### ✅ 현재 구현된 기능
- 탭 전환 (예약 가능/마감)
- 검색 기능 (검색어 입력)
- 날짜 선택 (DatePicker)
- 카테고리 필터
- 숙박권 카드 그리드
- 추천 카드 영역
- 배너 영역
- 삭제 기능 (본인 상품만)
- GraphQL 데이터 조회

### ❌ 빠진 기능 (높은 우선순위)

#### 1.1 북마크 기능 ⭐⭐⭐
- [ ] localStorage 기반 북마크 저장/불러오기
- [ ] 카드 우측 상단에 하트 아이콘 버튼
- [ ] HeartOutlined / HeartFilled 아이콘 토글
- [ ] 북마크 추가/제거 기능
- [ ] 추천 카드에도 북마크 버튼

**프롬프트 파일**: `prompt.401.func.missing-features.txt` (섹션 2)

#### 1.2 카드 Hover 효과 ⭐⭐
- [ ] 숙박권 카드: `transform: translateY(-4px)`
- [ ] 숙박권 카드: `box-shadow` 추가
- [ ] 추천 카드: `transform: scale(1.02)`
- [ ] `transition: all 0.3s ease` 적용

**프롬프트 파일**: `prompt.401.func.missing-features.txt` (섹션 3)

#### 1.3 화살표 버튼 및 슬라이더 ⭐⭐⭐
- [ ] 추천 카드 좌우 화살표 버튼
- [ ] 배너 좌우 화살표 버튼
- [ ] 배너 자동 슬라이드 (5초마다)
- [ ] 배너 하단 인디케이터 dots
- [ ] active dot 스타일링

**프롬프트 파일**: `prompt.401.func.missing-features.txt` (섹션 4)

#### 1.4 최근 본 상품 ⭐⭐
- [ ] localStorage 기반 최근 본 상품 저장
- [ ] 최대 3개 유지
- [ ] 카드 클릭 시 자동 추가
- [ ] 썸네일 이미지, 제목, 가격 표시
- [ ] 클릭 시 상세 페이지 이동

**프롬프트 파일**: `prompt.401.func.missing-features.txt` (섹션 5)

#### 1.5 페이지네이션 ⭐⭐
- [ ] currentPage 상태 관리
- [ ] 이전/다음 버튼 기능 연결
- [ ] disabled 상태 처리
- [ ] 현재 페이지 / 전체 페이지 표시
- [ ] `useMemo`로 페이지네이션된 상품 목록 계산

**프롬프트 파일**: `prompt.401.func.missing-features.txt` (섹션 6)

#### 1.6 광고 배너 콘텐츠 ⭐
- [ ] 그라디언트 배경 적용
- [ ] 배지 2개 추가 ("특가", "한정판매")
- [ ] 배너 제목 2줄 (우측 정렬)
- [ ] 실제 콘텐츠로 교체

**프롬프트 파일**: `prompt.401.func.missing-features.txt` (섹션 7)

---

## 2. 구매 상세 페이지 (`/purchase/[id]` - detail)

### ✅ 현재 구현된 기능
- 상품 기본 정보 표시 (제목, 가격, 이미지)
- 구매 모달 연동
- 포인트 부족 모달
- 구매 확인 로직
- GraphQL 데이터 조회
- 이미지 URL 검증 및 fallback 처리

### ❌ 빠진 기능 (높은 우선순위)

#### 2.1 이미지 갤러리 ⭐⭐⭐
- [ ] 여러 이미지 슬라이더 (images 배열)
- [ ] 메인 이미지 큰 표시
- [ ] 썸네일 이미지 목록 (최대 5개)
- [ ] 썸네일 클릭 시 메인 이미지 변경
- [ ] 좌우 화살표 버튼
- [ ] 이미지 카운터 (1 / 5)

**프롬프트 파일**: `prompt.402.func.missing-details.txt` (섹션 2-A)

#### 2.2 상세 정보 확장 ⭐⭐⭐
- [ ] 태그 배지들 표시 (tags)
- [ ] 짧은 설명 (remarks)
- [ ] 상세 내용 (contents)
- [ ] 생성일/수정일 표시
- [ ] 찜 개수 (pickedCount)

**프롬프트 파일**: `prompt.402.func.missing-details.txt` (섹션 2-B, 2-C)

#### 2.3 판매자 정보 ⭐⭐⭐
- [ ] 판매자 프로필 카드
- [ ] 프로필 이미지 (seller.picture)
- [ ] 판매자 이름 (seller.name)
- [ ] 판매자 이메일 (seller.email)
- [ ] 카드 스타일링

**프롬프트 파일**: `prompt.402.func.missing-details.txt` (섹션 2-D)

#### 2.4 주소 및 지도 ⭐⭐⭐
- [ ] 주소 표시 (address, addressDetail, zipcode)
- [ ] EnvironmentOutlined 아이콘
- [ ] 카카오 지도 표시 (lat, lng)
- [ ] 지도 마커 표시
- [ ] 지도 높이 400px

**프롬프트 파일**: `prompt.402.func.missing-details.txt` (섹션 2-E)

#### 2.5 판매 상태 ⭐⭐
- [ ] 판매 완료 여부 표시 (soldAt)
- [ ] "판매 중" / "판매 완료" 배지
- [ ] 판매 완료 시 구매 버튼 비활성화
- [ ] 구매자 정보 표시 (buyer)
- [ ] "이미 판매되었습니다" 메시지

**프롬프트 파일**: `prompt.402.func.missing-details.txt` (섹션 2-F)

#### 2.6 북마크 기능 ⭐⭐
- [ ] 상세 페이지 북마크 버튼
- [ ] localStorage 연동
- [ ] HeartOutlined / HeartFilled 토글
- [ ] 우측 상단 배치

**프롬프트 파일**: `prompt.402.func.missing-details.txt` (섹션 3-A)

#### 2.7 공유 기능 ⭐
- [ ] 공유 버튼 추가
- [ ] URL 복사 기능 (clipboard API)
- [ ] 복사 완료 메시지 (Toast/Alert)

**프롬프트 파일**: `prompt.402.func.missing-details.txt` (섹션 3-C)

#### 2.8 레이아웃 개선 ⭐⭐
- [ ] 좌우 2단 레이아웃 (Desktop)
  - 좌측: 이미지 갤러리 (60%)
  - 우측: 상세 정보 (40%)
- [ ] 반응형: Tablet (50% / 50%)
- [ ] 반응형: Mobile (1단, 세로 배치)

**프롬프트 파일**: `prompt.402.func.missing-details.txt` (섹션 4)

---

## 3. 판매 등록 페이지 (`/purchase/sell` - sell)

### ✅ 현재 구현된 기능
- 폼 입력 상태 관리
- 이미지 업로드 (최대 5개)
- 태그 추가/삭제
- 주소 검색 (다음 주소 API)
- 지도 표시 (Kakao Map)
- 좌표 자동 입력 (Geocoding)
- GraphQL 뮤테이션 (상품 등록)
- 유효성 검증

### ❌ 빠진 기능
- 판매 페이지는 프롬프트 대로 대부분 구현되어 있음
- 추가 개선사항은 `prompt.401.improvement.txt` 참고

---

## 4. 구매 모달 (`purchase-modal`)

### ✅ 현재 구현된 기능
- 구매자 정보 입력 폼
- 포인트 체크
- 구매 확인 로직
- 이미지 표시 (Image 컴포넌트)

### ❌ 빠진 기능
- 모달은 대부분 구현되어 있음
- 이미지 표시는 최근 수정으로 개선됨

---

## 5. 포인트 부족 모달 (`point-alert-modal`)

### ✅ 현재 구현된 기능
- 현재 포인트 / 필요 포인트 표시
- 충전하러 가기 버튼
- 닫기 버튼

### ❌ 빠진 기능
- 없음 (완전히 구현됨)

---

## 📝 구현 우선순위

### 최우선 (⭐⭐⭐)
1. **목록 페이지 - 북마크 기능**: 사용자 경험에 중요
2. **목록 페이지 - 화살표/슬라이더**: UI/UX 개선
3. **상세 페이지 - 이미지 갤러리**: 상품 정보 제공에 필수
4. **상세 페이지 - 상세 정보 확장**: 상품 정보 제공에 필수
5. **상세 페이지 - 판매자 정보**: 신뢰도 향상
6. **상세 페이지 - 주소 및 지도**: 위치 정보 제공에 필수

### 중요 (⭐⭐)
1. **목록 페이지 - Hover 효과**: UI/UX 개선
2. **목록 페이지 - 최근 본 상품**: 사용자 편의성
3. **목록 페이지 - 페이지네이션**: 대량 데이터 처리
4. **상세 페이지 - 판매 상태**: 정보 제공
5. **상세 페이지 - 북마크**: 사용자 편의성
6. **상세 페이지 - 레이아웃 개선**: UI/UX 개선

### 일반 (⭐)
1. **목록 페이지 - 광고 배너 콘텐츠**: 시각적 개선
2. **상세 페이지 - 공유 기능**: 추가 기능

---

## 🚀 빠른 시작 가이드

### 목록 페이지 전체 기능 구현하기
```bash
# 프롬프트 파일 확인 (통합 버전, 간결함)
cat src/components/purchase/list/prompts/prompt.301.func.txt

# AI에게 구현 요청
"src/components/purchase/list/prompts/prompt.301.func.txt 
프롬프트를 참조해서 전체 기능 구현해줘"
```

**✨ 개선사항**:
- 📦 기존 2개 프롬프트(427줄) → 1개로 통합(200줄) **53% 단축!**
- 🎯 핵심 기능만 간결하게 정리
- ✅ 모든 기능 포함 (탭, 검색, 북마크, 삭제, 슬라이더, 페이지네이션 등)
- 📝 체크리스트 기반으로 구현 결과 확인 가능

### 상세 페이지 빠진 기능 구현하기
```bash
# 프롬프트 파일 확인
cat src/components/purchase/detail/prompts/prompt.402.func.missing-details.txt

# AI에게 구현 요청
"src/components/purchase/detail/prompts/prompt.402.func.missing-details.txt 
프롬프트를 참조해서 구현해줘"
```

---

## 📂 관련 프롬프트 파일

### 목록 페이지 (list)
- `prompt.01.wireframe.txt` - 와이어프레임 (완료)
- `prompt.201.ui.txt` - UI 디자인 (완료)
- **`prompt.301.func.txt`** - 전체 기능 통합 ⭐ (최종 버전, 200줄)
  - 기존 2개 프롬프트 통합 (기본 기능 + 빠진 기능)
  - 핵심만 간결하게 정리

### 상세 페이지 (detail)
- `prompt.01.wireframe.txt` - 와이어프레임 (완료)
- `prompt.201.ui.txt` - UI 디자인 (완료)
- `prompt.301.func.txt` - 기본 기능 (완료)
- **`prompt.402.func.missing-details.txt`** - 상세 정보 추가 ⭐ (신규 작성)

### 판매 페이지 (sell)
- `prompt.01.wireframe.txt` - 와이어프레임 (완료)
- `prompt.201.ui.txt` - UI 디자인 (완료)
- `prompt.301.func.txt` - 기능 구현 (완료)
- `prompt.401.improvement.txt` - 개선사항 (참고용)

---

## ✅ 최근 완료된 개선사항

- [x] Next.js Image 컴포넌트로 변경 (목록/상세/모달)
- [x] next.config.js 외부 이미지 허용 설정
- [x] 이미지 URL 검증 및 fallback 처리
- [x] 삭제 기능 권한 체크 (본인 상품만)
- [x] 공용 쿼리 사용 (중복 제거)

---

## 📌 참고사항

1. **프롬프트 작성 규칙**: `docs/rules/` 폴더 참조
2. **바이브 코딩 가이드**: `docs/guides/` 폴더 참조
3. **GraphQL 타입**: `src/commons/graphql/graphql.ts` (codegen 자동 생성)
4. **공용 쿼리**: `src/components/mypage/queries.ts`

---

**작성일**: 2024-11-18
**최종 업데이트**: 2024-11-18

