// 숙박권 타입 정의
export interface AccommodationItem {
  id: number;
  title: string;
  description: string;
  price: number;
  imagePath: string;
  tags: string[];
  seller: {
    name: string;
    profileImage: string;
  };
  status: 'available' | 'closed';
  categories: string[];
  discount?: number;
}

// Mock 데이터
export const mockAccommodations: AccommodationItem[] = [
  {
    id: 1,
    title: "제주 오션뷰 풀빌라",
    description: "바다가 보이는 프라이빗 풀빌라",
    price: 189000,
    imagePath: "/assets/images/openthesea.png",
    tags: ["#오션뷰", "#풀빌라", "#제주"],
    seller: {
      name: "김제주",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["바다 위 숙소", "1인 전용"]
  },
  {
    id: 2,
    title: "강릉 코지 펜션",
    description: "따뜻한 감성의 아늑한 펜션",
    price: 95000,
    imagePath: "/assets/images/cozy.jpg",
    tags: ["#강릉", "#감성", "#힐링"],
    seller: {
      name: "박감성",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["플랜테리어", "반신욕&스파"]
  },
  {
    id: 3,
    title: "부산 해운대 호텔",
    description: "해운대 해변 앞 특급 호텔",
    price: 145000,
    imagePath: "/assets/images/Rectangle 3011.png",
    tags: ["#해운대", "#호텔", "#오션뷰"],
    seller: {
      name: "이부산",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["호텔", "룸 서비스 가능"]
  },
  {
    id: 4,
    title: "경주 한옥 스테이",
    description: "전통과 현대가 만난 한옥",
    price: 120000,
    imagePath: "/assets/images/openthesea.png",
    tags: ["#한옥", "#경주", "#전통"],
    seller: {
      name: "최경주",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["1인 전용", "플랜테리어"]
  },
  {
    id: 5,
    title: "속초 캠핑장",
    description: "바다와 산을 동시에 즐기는 캠핑",
    price: 55000,
    imagePath: "/assets/images/cozy.jpg",
    tags: ["#캠핑", "#속초", "#자연"],
    seller: {
      name: "정캠핑",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["캠핑", "불멍"]
  },
  {
    id: 6,
    title: "서울 강남 아파트",
    description: "교통 편리한 강남역 근처",
    price: 78000,
    imagePath: "/assets/images/Rectangle 3011.png",
    tags: ["#강남", "#교통편리", "#깔끔"],
    seller: {
      name: "한서울",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["아파트", "1인 전용"]
  },
  {
    id: 7,
    title: "양양 서핑 펜션",
    description: "서핑하기 좋은 해변가 펜션",
    price: 82000,
    imagePath: "/assets/images/openthesea.png",
    tags: ["#서핑", "#양양", "#액티비티"],
    seller: {
      name: "송양양",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["바다 위 숙소", "캠핑"]
  },
  {
    id: 8,
    title: "전주 한옥마을 게스트하우스",
    description: "한옥마을 중심부의 아늑한 숙소",
    price: 65000,
    imagePath: "/assets/images/cozy.jpg",
    tags: ["#전주", "#한옥마을", "#게스트하우스"],
    seller: {
      name: "윤전주",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "closed",
    categories: ["1인 전용", "플랜테리어"]
  },
  {
    id: 9,
    title: "가평 스파 리조트",
    description: "온천과 스파를 즐기는 힐링 리조트",
    price: 156000,
    imagePath: "/assets/images/Rectangle 3011.png",
    tags: ["#스파", "#온천", "#가평"],
    seller: {
      name: "임가평",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["반신욕&스파", "호텔", "룸 서비스 가능"]
  },
  {
    id: 10,
    title: "남해 독채 펜션",
    description: "바다가 보이는 독채 펜션",
    price: 135000,
    imagePath: "/assets/images/openthesea.png",
    tags: ["#남해", "#독채", "#프라이빗"],
    seller: {
      name: "장남해",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["바다 위 숙소", "불멍"]
  },
  {
    id: 11,
    title: "대전 감성 호텔",
    description: "모던한 감성의 부티크 호텔",
    price: 98000,
    imagePath: "/assets/images/cozy.jpg",
    tags: ["#대전", "#부티크", "#감성"],
    seller: {
      name: "조대전",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "closed",
    categories: ["호텔", "플랜테리어"]
  },
  {
    id: 12,
    title: "인천 공항 근처 호텔",
    description: "공항 이동 편리한 깔끔한 호텔",
    price: 72000,
    imagePath: "/assets/images/Rectangle 3011.png",
    tags: ["#인천", "#공항근처", "#편리"],
    seller: {
      name: "배인천",
      profileImage: "/assets/icons/profile_image.png"
    },
    status: "available",
    categories: ["호텔", "아파트"]
  }
];

// 추천 배너 mock 데이터
export interface RecommendBanner {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  price: number;
  imagePath: string;
  discount?: number;
}

export const mockRecommendBanners: RecommendBanner[] = [
  {
    id: 1,
    title: "제주 끝판왕",
    subtitle: "프라이빗 풀빌라",
    description: "여름의 마지막을 특별하게",
    price: 250000,
    imagePath: "/assets/images/beach.png",
    discount: 20
  },
  {
    id: 2,
    title: "숨은 명소",
    subtitle: "강원도 힐링 펜션",
    description: "도심을 벗어나 자연 속으로",
    price: 180000,
    imagePath: "/assets/images/magnificant.png",
    discount: 15
  }
];
