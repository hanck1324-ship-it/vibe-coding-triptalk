// 메인 페이지 mock 데이터

export interface PopularAccommodation {
  id: number;
  rank: number;
  title: string;
  description: string;
  price: number;
  imagePath: string;
  rating: number;
  reviewCount: number;
  tags: string[];
  location: string;
}

export interface RecentAccommodation {
  id: number;
  title: string;
  description: string;
  price: number;
  imagePath: string;
  seller: string;
  uploadedAt: string;
  isNew: boolean;
}

export interface CategoryRecommendation {
  category: string;
  icon: string;
  accommodations: {
    id: number;
    title: string;
    price: number;
    imagePath: string;
  }[];
}

export interface MainBanner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imagePath: string;
  linkUrl: string;
  backgroundColor: string;
}

export interface PopularLocation {
  id: number;
  name: string;
  count: number;
  imagePath: string;
  description: string;
}

// 인기 숙박권 TOP 10
export const mockPopularAccommodations: PopularAccommodation[] = [
  {
    id: 1,
    rank: 1,
    title: "제주 오션뷰 풀빌라",
    description: "바다가 보이는 프라이빗 풀빌라",
    price: 189000,
    imagePath: "/assets/images/openthesea.png",
    rating: 4.8,
    reviewCount: 127,
    tags: ["#오션뷰", "#풀빌라", "#제주"],
    location: "제주"
  },
  {
    id: 2,
    rank: 2,
    title: "강릉 코지 펜션",
    description: "따뜻한 감성의 아늑한 펜션",
    price: 95000,
    imagePath: "/assets/images/cozy.jpg",
    rating: 4.9,
    reviewCount: 89,
    tags: ["#강릉", "#감성", "#힐링"],
    location: "강릉"
  },
  {
    id: 3,
    rank: 3,
    title: "부산 해운대 호텔",
    description: "해운대 해변 앞 특급 호텔",
    price: 145000,
    imagePath: "/assets/images/Rectangle 3011.png",
    rating: 4.7,
    reviewCount: 203,
    tags: ["#해운대", "#호텔", "#오션뷰"],
    location: "부산"
  },
  {
    id: 4,
    rank: 4,
    title: "경주 한옥 스테이",
    description: "전통과 현대가 만난 한옥",
    price: 120000,
    imagePath: "/assets/images/beach.png",
    rating: 4.6,
    reviewCount: 78,
    tags: ["#한옥", "#경주", "#전통"],
    location: "경주"
  },
  {
    id: 5,
    rank: 5,
    title: "속초 캠핑장",
    description: "바다와 산을 동시에 즐기는 캠핑",
    price: 55000,
    imagePath: "/assets/images/magnificant.png",
    rating: 4.5,
    reviewCount: 134,
    tags: ["#캠핑", "#속초", "#자연"],
    location: "속초"
  },
  {
    id: 6,
    rank: 6,
    title: "서울 강남 아파트",
    description: "교통 편리한 강남역 근처",
    price: 78000,
    imagePath: "/assets/images/openthesea.png",
    rating: 4.4,
    reviewCount: 92,
    tags: ["#강남", "#교통편리", "#깔끔"],
    location: "서울"
  },
  {
    id: 7,
    rank: 7,
    title: "양양 서핑 펜션",
    description: "서핑하기 좋은 해변가 펜션",
    price: 82000,
    imagePath: "/assets/images/cozy.jpg",
    rating: 4.7,
    reviewCount: 156,
    tags: ["#서핑", "#양양", "#액티비티"],
    location: "양양"
  },
  {
    id: 8,
    rank: 8,
    title: "전주 한옥마을 게스트하우스",
    description: "한옥마을 중심부의 아늑한 숙소",
    price: 65000,
    imagePath: "/assets/images/Rectangle 3011.png",
    rating: 4.6,
    reviewCount: 88,
    tags: ["#전주", "#한옥마을", "#게스트하우스"],
    location: "전주"
  },
  {
    id: 9,
    rank: 9,
    title: "가평 스파 리조트",
    description: "온천과 스파를 즐기는 힐링 리조트",
    price: 156000,
    imagePath: "/assets/images/beach.png",
    rating: 4.8,
    reviewCount: 201,
    tags: ["#스파", "#온천", "#가평"],
    location: "가평"
  },
  {
    id: 10,
    rank: 10,
    title: "남해 독채 펜션",
    description: "바다가 보이는 독채 펜션",
    price: 135000,
    imagePath: "/assets/images/magnificant.png",
    rating: 4.7,
    reviewCount: 112,
    tags: ["#남해", "#독채", "#프라이빗"],
    location: "남해"
  }
];

// 최근 등록된 숙박권
export const mockRecentAccommodations: RecentAccommodation[] = [
  {
    id: 11,
    title: "대전 감성 호텔",
    description: "모던한 감성의 부티크 호텔",
    price: 98000,
    imagePath: "/assets/images/cozy.jpg",
    seller: "조대전",
    uploadedAt: "2024-09-01",
    isNew: true
  },
  {
    id: 12,
    title: "인천 공항 근처 호텔",
    description: "공항 이동 편리한 깔끔한 호텔",
    price: 72000,
    imagePath: "/assets/images/Rectangle 3011.png",
    seller: "배인천",
    uploadedAt: "2024-09-02",
    isNew: true
  },
  {
    id: 13,
    title: "여수 밤바다 펜션",
    description: "여수 밤바다를 한눈에",
    price: 110000,
    imagePath: "/assets/images/openthesea.png",
    seller: "김여수",
    uploadedAt: "2024-09-03",
    isNew: true
  },
  {
    id: 14,
    title: "포항 해돋이 펜션",
    description: "일출 명소 호미곶 인근",
    price: 85000,
    imagePath: "/assets/images/beach.png",
    seller: "이포항",
    uploadedAt: "2024-09-04",
    isNew: true
  }
];

// 카테고리별 추천
export const mockCategoryRecommendations: CategoryRecommendation[] = [
  {
    category: "바다 위 숙소",
    icon: "🌊",
    accommodations: [
      { id: 1, title: "제주 오션뷰 풀빌라", price: 189000, imagePath: "/assets/images/openthesea.png" },
      { id: 7, title: "양양 서핑 펜션", price: 82000, imagePath: "/assets/images/cozy.jpg" },
      { id: 13, title: "여수 밤바다 펜션", price: 110000, imagePath: "/assets/images/openthesea.png" }
    ]
  },
  {
    category: "호텔",
    icon: "🏨",
    accommodations: [
      { id: 3, title: "부산 해운대 호텔", price: 145000, imagePath: "/assets/images/Rectangle 3011.png" },
      { id: 11, title: "대전 감성 호텔", price: 98000, imagePath: "/assets/images/cozy.jpg" },
      { id: 12, title: "인천 공항 근처 호텔", price: 72000, imagePath: "/assets/images/Rectangle 3011.png" }
    ]
  },
  {
    category: "캠핑",
    icon: "🏕️",
    accommodations: [
      { id: 5, title: "속초 캠핑장", price: 55000, imagePath: "/assets/images/magnificant.png" },
      { id: 4, title: "경주 한옥 스테이", price: 120000, imagePath: "/assets/images/beach.png" }
    ]
  },
  {
    category: "플랜테리어",
    icon: "🪴",
    accommodations: [
      { id: 2, title: "강릉 코지 펜션", price: 95000, imagePath: "/assets/images/cozy.jpg" },
      { id: 8, title: "전주 한옥마을 게스트하우스", price: 65000, imagePath: "/assets/images/Rectangle 3011.png" }
    ]
  }
];

// 메인 배너/프로모션
export const mockMainBanners: MainBanner[] = [
  {
    id: 1,
    title: "2024 가을 특별 할인",
    subtitle: "지금 예약하면 최대 30% 할인",
    description: "9월 한정 프로모션",
    imagePath: "/assets/images/Solitary Contemplation Beneath Nature's Arch 1.png",
    linkUrl: "/promotion/autumn2024",
    backgroundColor: "#ff6b6b"
  },
  {
    id: 2,
    title: "제주도 숙박권 대전",
    subtitle: "제주 여행의 시작",
    description: "인기 숙소 모음",
    imagePath: "/assets/images/beach.png",
    linkUrl: "/purchase/list?location=jeju",
    backgroundColor: "#2974e5"
  },
  {
    id: 3,
    title: "신규 회원 웰컴 쿠폰",
    subtitle: "첫 구매 시 10,000원 할인",
    description: "지금 가입하고 혜택 받기",
    imagePath: "/assets/images/magnificant.png",
    linkUrl: "/signup",
    backgroundColor: "#51cf66"
  }
];

// 인기 지역
export const mockPopularLocations: PopularLocation[] = [
  {
    id: 1,
    name: "제주",
    count: 234,
    imagePath: "/assets/images/openthesea.png",
    description: "국내 최고 휴양지"
  },
  {
    id: 2,
    name: "강릉",
    count: 156,
    imagePath: "/assets/images/cozy.jpg",
    description: "커피와 바다의 도시"
  },
  {
    id: 3,
    name: "부산",
    count: 189,
    imagePath: "/assets/images/Rectangle 3011.png",
    description: "해운대와 광안리"
  },
  {
    id: 4,
    name: "속초",
    count: 98,
    imagePath: "/assets/images/beach.png",
    description: "설악산과 동해바다"
  },
  {
    id: 5,
    name: "경주",
    count: 67,
    imagePath: "/assets/images/magnificant.png",
    description: "천년 고도의 멋"
  },
  {
    id: 6,
    name: "전주",
    count: 78,
    imagePath: "/assets/images/cozy.jpg",
    description: "한옥마을과 맛의 고장"
  }
];
