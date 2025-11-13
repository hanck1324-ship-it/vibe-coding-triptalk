// 마이페이지 mock 데이터

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  profileImage: string;
  level: number;
  points: number;
  joinDate: string;
  bio?: string;
}

export interface PurchaseHistory {
  id: number;
  accommodationId: number;
  accommodationTitle: string;
  accommodationImage: string;
  price: number;
  status: 'completed' | 'pending' | 'cancelled' | 'refunded';
  purchaseDate: string;
  usageDate: string;
  sellerName: string;
  hasReview: boolean;
}

export interface SalesHistory {
  id: number;
  accommodationId: number;
  accommodationTitle: string;
  accommodationImage: string;
  price: number;
  status: 'sold' | 'available' | 'reserved';
  registrationDate: string;
  soldDate?: string;
  buyerName?: string;
  viewCount: number;
}

export interface BookmarkedAccommodation {
  id: number;
  title: string;
  price: number;
  imagePath: string;
  seller: string;
  rating: number;
  bookmarkedAt: string;
}

export interface RecentlyViewed {
  id: number;
  title: string;
  price: number;
  imagePath: string;
  viewedAt: string;
}

export interface PointHistory {
  id: number;
  type: 'earn' | 'spend' | 'refund';
  amount: number;
  description: string;
  createdAt: string;
  balance: number;
}

// Mock 사용자 프로필
export const mockUserProfile: UserProfile = {
  id: 1,
  name: "홍길동",
  email: "hong@example.com",
  profileImage: "/assets/icons/profile_image.png",
  level: 7,
  points: 52300,
  joinDate: "2023-06-15",
  bio: "여행을 사랑하는 평범한 직장인입니다. 주말마다 새로운 곳을 탐험하는 것이 제 낙입니다 ✈️"
};

// Mock 구매 내역
export const mockPurchaseHistory: PurchaseHistory[] = [
  {
    id: 1,
    accommodationId: 1,
    accommodationTitle: "제주 오션뷰 풀빌라",
    accommodationImage: "/assets/images/openthesea.png",
    price: 189000,
    status: "completed",
    purchaseDate: "2024-08-01",
    usageDate: "2024-08-15",
    sellerName: "김제주",
    hasReview: true
  },
  {
    id: 2,
    accommodationId: 2,
    accommodationTitle: "강릉 코지 펜션",
    accommodationImage: "/assets/images/cozy.jpg",
    price: 95000,
    status: "completed",
    purchaseDate: "2024-07-10",
    usageDate: "2024-07-20",
    sellerName: "박감성",
    hasReview: false
  },
  {
    id: 3,
    accommodationId: 9,
    accommodationTitle: "가평 스파 리조트",
    accommodationImage: "/assets/images/Rectangle 3011.png",
    price: 156000,
    status: "pending",
    purchaseDate: "2024-09-01",
    usageDate: "2024-09-20",
    sellerName: "임가평",
    hasReview: false
  },
  {
    id: 4,
    accommodationId: 5,
    accommodationTitle: "속초 캠핑장",
    accommodationImage: "/assets/images/magnificant.png",
    price: 55000,
    status: "cancelled",
    purchaseDate: "2024-06-05",
    usageDate: "2024-06-15",
    sellerName: "정캠핑",
    hasReview: false
  },
  {
    id: 5,
    accommodationId: 3,
    accommodationTitle: "부산 해운대 호텔",
    accommodationImage: "/assets/images/Rectangle 3011.png",
    price: 145000,
    status: "completed",
    purchaseDate: "2024-05-20",
    usageDate: "2024-06-01",
    sellerName: "이부산",
    hasReview: true
  }
];

// Mock 판매 내역
export const mockSalesHistory: SalesHistory[] = [
  {
    id: 1,
    accommodationId: 101,
    accommodationTitle: "서울 홍대 원룸",
    accommodationImage: "/assets/images/cozy.jpg",
    price: 45000,
    status: "sold",
    registrationDate: "2024-07-01",
    soldDate: "2024-07-15",
    buyerName: "김구매",
    viewCount: 234
  },
  {
    id: 2,
    accommodationId: 102,
    accommodationTitle: "인천 송도 아파트",
    accommodationImage: "/assets/images/Rectangle 3011.png",
    price: 68000,
    status: "available",
    registrationDate: "2024-08-10",
    viewCount: 89
  },
  {
    id: 3,
    accommodationId: 103,
    accommodationTitle: "대전 유성 펜션",
    accommodationImage: "/assets/images/beach.png",
    price: 120000,
    status: "reserved",
    registrationDate: "2024-08-20",
    buyerName: "이예약",
    viewCount: 156
  }
];

// Mock 북마크한 숙박권
export const mockBookmarkedAccommodations: BookmarkedAccommodation[] = [
  {
    id: 1,
    title: "제주 오션뷰 풀빌라",
    price: 189000,
    imagePath: "/assets/images/openthesea.png",
    seller: "김제주",
    rating: 4.8,
    bookmarkedAt: "2024-08-25"
  },
  {
    id: 7,
    title: "양양 서핑 펜션",
    price: 82000,
    imagePath: "/assets/images/cozy.jpg",
    seller: "송양양",
    rating: 4.7,
    bookmarkedAt: "2024-08-20"
  },
  {
    id: 13,
    title: "여수 밤바다 펜션",
    price: 110000,
    imagePath: "/assets/images/magnificant.png",
    seller: "김여수",
    rating: 4.6,
    bookmarkedAt: "2024-08-15"
  },
  {
    id: 9,
    title: "가평 스파 리조트",
    price: 156000,
    imagePath: "/assets/images/Rectangle 3011.png",
    seller: "임가평",
    rating: 4.8,
    bookmarkedAt: "2024-08-10"
  },
  {
    id: 4,
    title: "경주 한옥 스테이",
    price: 120000,
    imagePath: "/assets/images/beach.png",
    seller: "최경주",
    rating: 4.6,
    bookmarkedAt: "2024-08-05"
  }
];

// Mock 최근 본 상품
export const mockRecentlyViewed: RecentlyViewed[] = [
  {
    id: 1,
    title: "제주 오션뷰 풀빌라",
    price: 189000,
    imagePath: "/assets/images/openthesea.png",
    viewedAt: "2024-09-05T14:30:00"
  },
  {
    id: 2,
    title: "강릉 코지 펜션",
    price: 95000,
    imagePath: "/assets/images/cozy.jpg",
    viewedAt: "2024-09-05T12:15:00"
  },
  {
    id: 3,
    title: "부산 해운대 호텔",
    price: 145000,
    imagePath: "/assets/images/Rectangle 3011.png",
    viewedAt: "2024-09-04T18:45:00"
  },
  {
    id: 7,
    title: "양양 서핑 펜션",
    price: 82000,
    imagePath: "/assets/images/magnificant.png",
    viewedAt: "2024-09-04T16:20:00"
  },
  {
    id: 9,
    title: "가평 스파 리조트",
    price: 156000,
    imagePath: "/assets/images/beach.png",
    viewedAt: "2024-09-03T20:10:00"
  },
  {
    id: 5,
    title: "속초 캠핑장",
    price: 55000,
    imagePath: "/assets/images/cozy.jpg",
    viewedAt: "2024-09-03T15:00:00"
  }
];

// Mock 포인트 내역
export const mockPointHistory: PointHistory[] = [
  {
    id: 1,
    type: "earn",
    amount: 5000,
    description: "제주 오션뷰 풀빌라 리뷰 작성",
    createdAt: "2024-08-16",
    balance: 52300
  },
  {
    id: 2,
    type: "spend",
    amount: -10000,
    description: "가평 스파 리조트 구매 시 포인트 사용",
    createdAt: "2024-09-01",
    balance: 47300
  },
  {
    id: 3,
    type: "earn",
    amount: 3000,
    description: "부산 해운대 호텔 리뷰 작성",
    createdAt: "2024-06-02",
    balance: 57300
  },
  {
    id: 4,
    type: "earn",
    amount: 10000,
    description: "회원 레벨업 보너스 (Lv.7 달성)",
    createdAt: "2024-05-20",
    balance: 54300
  },
  {
    id: 5,
    type: "refund",
    amount: 5500,
    description: "속초 캠핑장 예약 취소 환불",
    createdAt: "2024-06-10",
    balance: 44300
  },
  {
    id: 6,
    type: "earn",
    amount: 2000,
    description: "친구 추천 보너스",
    createdAt: "2024-04-15",
    balance: 38800
  },
  {
    id: 7,
    type: "spend",
    amount: -5000,
    description: "강릉 코지 펜션 구매 시 포인트 사용",
    createdAt: "2024-07-10",
    balance: 36800
  },
  {
    id: 8,
    type: "earn",
    amount: 1000,
    description: "출석 체크 보너스",
    createdAt: "2024-03-01",
    balance: 41800
  }
];
