// 숙박권 상세 페이지 mock 데이터

export interface AccommodationDetail {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  status: 'available' | 'closed';

  // 이미지
  images: string[];
  mainImage: string;

  // 판매자 정보
  seller: {
    id: number;
    name: string;
    profileImage: string;
    rating: number;
    reviewCount: number;
    responseRate: number;
    responseTime: string;
  };

  // 숙소 정보
  accommodation: {
    type: string;
    location: {
      address: string;
      city: string;
      district: string;
      latitude: number;
      longitude: number;
    };
    checkIn: string;
    checkOut: string;
    maxGuests: number;
    bedrooms: number;
    beds: number;
    bathrooms: number;
  };

  // 편의시설
  amenities: string[];

  // 카테고리/태그
  categories: string[];
  tags: string[];

  // 예약 정보
  availableDates: string[];
  minimumNights: number;
  maximumNights: number;

  // 환불 정책
  refundPolicy: {
    type: 'flexible' | 'moderate' | 'strict';
    description: string;
  };

  // 리뷰
  reviews: Review[];
  averageRating: number;

  // 기타
  viewCount: number;
  bookmarkCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Review {
  id: number;
  userId: number;
  userName: string;
  userProfileImage: string;
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  helpful: number;
}

// Mock 상세 데이터
export const mockAccommodationDetails: AccommodationDetail[] = [
  {
    id: 1,
    title: "제주 오션뷰 풀빌라",
    description: "바다가 보이는 프라이빗 풀빌라",
    longDescription: `제주 서귀포에 위치한 프라이빗 풀빌라입니다.

넓은 수영장과 함께 탁 트인 바다 전망을 즐기실 수 있습니다.
침실 3개, 거실, 주방이 모두 분리되어 있어 가족 단위 여행객들에게 최적입니다.

특히 석양이 아름다운 서귀포 앞바다를 한눈에 담을 수 있으며,
조용하고 프라이빗한 휴식을 원하시는 분들께 추천드립니다.

주변에 유명 맛집과 관광지가 가까워 이동이 편리합니다.`,
    price: 189000,
    originalPrice: 250000,
    discount: 24,
    status: "available",

    images: [
      "/assets/images/openthesea.png",
      "/assets/images/cozy.jpg",
      "/assets/images/beach.png",
      "/assets/images/magnificant.png",
      "/assets/images/Rectangle 3011.png"
    ],
    mainImage: "/assets/images/openthesea.png",

    seller: {
      id: 1,
      name: "김제주",
      profileImage: "/assets/icons/profile_image.png",
      rating: 4.8,
      reviewCount: 127,
      responseRate: 98,
      responseTime: "1시간 이내"
    },

    accommodation: {
      type: "풀빌라",
      location: {
        address: "제주특별자치도 서귀포시 중문관광로 72번길 35",
        city: "제주",
        district: "서귀포시",
        latitude: 33.2463,
        longitude: 126.4122
      },
      checkIn: "15:00",
      checkOut: "11:00",
      maxGuests: 6,
      bedrooms: 3,
      beds: 4,
      bathrooms: 2
    },

    amenities: [
      "수영장",
      "무료 Wi-Fi",
      "주차장",
      "에어컨",
      "난방",
      "주방",
      "세탁기",
      "건조기",
      "바베큐 그릴",
      "해변 접근",
      "오션뷰",
      "테라스",
      "정원"
    ],

    categories: ["바다 위 숙소", "1인 전용"],
    tags: ["#오션뷰", "#풀빌라", "#제주", "#프라이빗", "#가족여행"],

    availableDates: [
      "2024-09-15",
      "2024-09-16",
      "2024-09-20",
      "2024-09-25"
    ],
    minimumNights: 2,
    maximumNights: 14,

    refundPolicy: {
      type: "moderate",
      description: "체크인 7일 전까지 전액 환불, 그 이후는 50% 환불"
    },

    reviews: [
      {
        id: 1,
        userId: 101,
        userName: "이서현",
        userProfileImage: "/assets/icons/profile_image.png",
        rating: 5,
        content: "정말 최고의 숙소였습니다! 수영장도 깨끗하고 바다 뷰가 환상적이었어요. 또 방문하고 싶습니다.",
        images: ["/assets/images/openthesea.png"],
        createdAt: "2024-08-15",
        helpful: 24
      },
      {
        id: 2,
        userId: 102,
        userName: "박민준",
        userProfileImage: "/assets/icons/profile_image.png",
        rating: 5,
        content: "가족들과 함께 즐거운 시간 보냈습니다. 시설도 깨끗하고 호스트분도 친절하셨어요.",
        createdAt: "2024-08-10",
        helpful: 18
      },
      {
        id: 3,
        userId: 103,
        userName: "정수아",
        userProfileImage: "/assets/icons/profile_image.png",
        rating: 4,
        content: "전반적으로 만족스러웠어요. 다만 주변이 조금 한적해서 차가 필수입니다.",
        createdAt: "2024-07-28",
        helpful: 12
      }
    ],
    averageRating: 4.8,

    viewCount: 1547,
    bookmarkCount: 234,
    createdAt: "2024-06-01",
    updatedAt: "2024-08-20"
  },
  {
    id: 2,
    title: "강릉 코지 펜션",
    description: "따뜻한 감성의 아늑한 펜션",
    longDescription: `강릉 바닷가 근처 감성 넘치는 펜션입니다.

인테리어가 정말 예쁘고 포근한 분위기로 꾸며져 있습니다.
커플 여행이나 소규모 가족 여행에 최적의 공간입니다.

근처에 강릉 커피거리와 주문진 수산시장이 있어 맛집 투어도 가능합니다.
조용하고 힐링되는 시간을 보내고 싶으신 분들께 추천합니다.`,
    price: 95000,
    originalPrice: 120000,
    discount: 21,
    status: "available",

    images: [
      "/assets/images/cozy.jpg",
      "/assets/images/Rectangle 3011.png",
      "/assets/images/beach.png"
    ],
    mainImage: "/assets/images/cozy.jpg",

    seller: {
      id: 2,
      name: "박감성",
      profileImage: "/assets/icons/profile_image.png",
      rating: 4.9,
      reviewCount: 89,
      responseRate: 100,
      responseTime: "30분 이내"
    },

    accommodation: {
      type: "펜션",
      location: {
        address: "강원도 강릉시 해안로 1234",
        city: "강릉",
        district: "강릉시",
        latitude: 37.7519,
        longitude: 128.8761
      },
      checkIn: "15:00",
      checkOut: "11:00",
      maxGuests: 4,
      bedrooms: 2,
      beds: 2,
      bathrooms: 1
    },

    amenities: [
      "무료 Wi-Fi",
      "주차장",
      "에어컨",
      "난방",
      "주방",
      "커피머신",
      "감성 인테리어",
      "테라스",
      "해변 도보 5분"
    ],

    categories: ["플랜테리어", "반신욕&스파"],
    tags: ["#강릉", "#감성", "#힐링", "#커플", "#인스타감성"],

    availableDates: [
      "2024-09-18",
      "2024-09-22",
      "2024-09-28"
    ],
    minimumNights: 1,
    maximumNights: 7,

    refundPolicy: {
      type: "flexible",
      description: "체크인 3일 전까지 전액 환불"
    },

    reviews: [
      {
        id: 4,
        userId: 104,
        userName: "최지우",
        userProfileImage: "/assets/icons/profile_image.png",
        rating: 5,
        content: "인테리어가 정말 예뻐요! 사진 찍기 좋�� 분위기 최고입니다.",
        images: ["/assets/images/cozy.jpg"],
        createdAt: "2024-08-25",
        helpful: 31
      },
      {
        id: 5,
        userId: 105,
        userName: "윤하늘",
        userProfileImage: "/assets/icons/profile_image.png",
        rating: 5,
        content: "연인과 함께 힐링하기 딱 좋았어요. 조용하고 아늑합니다.",
        createdAt: "2024-08-18",
        helpful: 27
      }
    ],
    averageRating: 4.9,

    viewCount: 892,
    bookmarkCount: 156,
    createdAt: "2024-07-01",
    updatedAt: "2024-08-26"
  }
];

// ID로 상세 정보 찾기
export const getAccommodationDetailById = (id: number): AccommodationDetail | undefined => {
  return mockAccommodationDetails.find(item => item.id === id);
};
