// 게시판 목록 mock 데이터

export interface BoardPost {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    profileImage: string;
  };
  category: string;
  views: number;
  likes: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  thumbnailImage?: string;
  isPinned: boolean;
  isHot: boolean;
}

export interface BoardCategory {
  id: string;
  name: string;
  count: number;
}

// 게시판 카테고리
export const mockBoardCategories: BoardCategory[] = [
  { id: "all", name: "전체", count: 248 },
  { id: "review", name: "후기", count: 89 },
  { id: "tip", name: "여행 팁", count: 67 },
  { id: "question", name: "질문", count: 45 },
  { id: "story", name: "여행 이야기", count: 34 },
  { id: "meetup", name: "동행 구함", count: 13 }
];

// Mock 게시글 데이터
export const mockBoardPosts: BoardPost[] = [
  {
    id: 1,
    title: "제주도 3박 4일 여행 후기 - 가족 여행 코스 추천",
    content: "제주도에서 가족과 함께 보낸 3박 4일 여행 후기입니다. 아이들과 함께 가기 좋은 코스를 소개합니다...",
    author: {
      id: 101,
      name: "여행러버",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "review",
    views: 1247,
    likes: 89,
    commentCount: 23,
    createdAt: "2024-09-05",
    updatedAt: "2024-09-05",
    tags: ["#제주도", "#가족여행", "#3박4일", "#여행코스"],
    thumbnailImage: "/assets/images/beach.png",
    isPinned: true,
    isHot: true
  },
  {
    id: 2,
    title: "강릉 커피 투어 완벽 가이드",
    content: "강릉에 가면 꼭 들러야 할 카페 베스트 10을 소개합니다. 커피 애호가라면 필독!",
    author: {
      id: 102,
      name: "카페인중독",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "tip",
    views: 892,
    likes: 67,
    commentCount: 18,
    createdAt: "2024-09-04",
    updatedAt: "2024-09-04",
    tags: ["#강릉", "#카페", "#커피", "#여행팁"],
    thumbnailImage: "/assets/images/cozy.jpg",
    isPinned: false,
    isHot: true
  },
  {
    id: 3,
    title: "부산 맛집 리스트 공유합니다",
    content: "부산 여행하면서 다녀온 맛집 리스트입니다. 현지인 추천 맛집 위주로 정리했어요!",
    author: {
      id: 103,
      name: "맛집탐험가",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "tip",
    views: 756,
    likes: 54,
    commentCount: 31,
    createdAt: "2024-09-03",
    updatedAt: "2024-09-03",
    tags: ["#부산", "#맛집", "#현지인추천", "#음식"],
    thumbnailImage: "/assets/images/Rectangle 3011.png",
    isPinned: false,
    isHot: true
  },
  {
    id: 4,
    title: "경주 한옥 스테이 추천 받아요!",
    content: "다음 주에 경주 여행 가는데 한옥 스테이 추천 부탁드립니다. 가격대는 10만원 이하로요~",
    author: {
      id: 104,
      name: "경주가고파",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "question",
    views: 234,
    likes: 12,
    commentCount: 15,
    createdAt: "2024-09-02",
    updatedAt: "2024-09-03",
    tags: ["#경주", "#한옥스테이", "#추천요청"],
    isPinned: false,
    isHot: false
  },
  {
    id: 5,
    title: "속초 캠핑장 다녀왔어요 (사진 多)",
    content: "속초 해변 근처 캠핑장에서 1박 2일 캠핑했습니다. 너무 힐링되는 시간이었어요!",
    author: {
      id: 105,
      name: "캠핑마니아",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "review",
    views: 567,
    likes: 43,
    commentCount: 9,
    createdAt: "2024-09-01",
    updatedAt: "2024-09-01",
    tags: ["#속초", "#캠핑", "#힐링", "#해변"],
    thumbnailImage: "/assets/images/magnificant.png",
    isPinned: false,
    isHot: false
  },
  {
    id: 6,
    title: "전주 한옥마을 주차 꿀팁",
    content: "전주 한옥마을 주차가 너무 어려웠는데 드디어 좋은 주차장 찾았어요!",
    author: {
      id: 106,
      name: "주차왕",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "tip",
    views: 423,
    likes: 38,
    commentCount: 12,
    createdAt: "2024-08-31",
    updatedAt: "2024-08-31",
    tags: ["#전주", "#한옥마을", "#주차", "#꿀팁"],
    isPinned: false,
    isHot: false
  },
  {
    id: 7,
    title: "10월 첫째 주 제주도 동행 구합니다 (20대 여성)",
    content: "10월 첫째 주에 제주도 2박 3일 여행 가는데 같이 갈 여성분 구합니다!",
    author: {
      id: 107,
      name: "솔로트래블러",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "meetup",
    views: 189,
    likes: 8,
    commentCount: 7,
    createdAt: "2024-08-30",
    updatedAt: "2024-09-01",
    tags: ["#제주도", "#동행구함", "#10월", "#여성"],
    isPinned: false,
    isHot: false
  },
  {
    id: 8,
    title: "양양 서핑 입문자를 위한 가이드",
    content: "서핑 처음 배우시는 분들을 위한 양양 서핑 입문 가이드입니다. 강습비부터 준비물까지!",
    author: {
      id: 108,
      name: "서프보드타는사람",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "tip",
    views: 678,
    likes: 51,
    commentCount: 16,
    createdAt: "2024-08-29",
    updatedAt: "2024-08-29",
    tags: ["#양양", "#서핑", "#입문", "#강습"],
    thumbnailImage: "/assets/images/openthesea.png",
    isPinned: false,
    isHot: false
  },
  {
    id: 9,
    title: "가평 펜션 예약할 때 주의사항",
    content: "가평 펜션 예약하면서 겪은 일들을 공유합니다. 꼭 확인하세요!",
    author: {
      id: 109,
      name: "여행초보",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "story",
    views: 512,
    likes: 29,
    commentCount: 19,
    createdAt: "2024-08-28",
    updatedAt: "2024-08-28",
    tags: ["#가평", "#펜션", "#주의사항", "#예약"],
    isPinned: false,
    isHot: false
  },
  {
    id: 10,
    title: "남해 바다 드라이브 코스 추천",
    content: "남해 해안도로 드라이브 코스입니다. 경치가 정말 환상적이에요!",
    author: {
      id: 110,
      name: "드라이브광",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "tip",
    views: 445,
    likes: 35,
    commentCount: 8,
    createdAt: "2024-08-27",
    updatedAt: "2024-08-27",
    tags: ["#남해", "#드라이브", "#해안도로", "#경치"],
    thumbnailImage: "/assets/images/beach.png",
    isPinned: false,
    isHot: false
  },
  {
    id: 11,
    title: "대전 숙소 어디가 좋을까요?",
    content: "대전에 출장 가는데 괜찮은 숙소 추천 부탁드립니다.",
    author: {
      id: 111,
      name: "출장러",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "question",
    views: 156,
    likes: 5,
    commentCount: 11,
    createdAt: "2024-08-26",
    updatedAt: "2024-08-26",
    tags: ["#대전", "#숙소추천", "#출장"],
    isPinned: false,
    isHot: false
  },
  {
    id: 12,
    title: "인천 공항 근처 1박 하기 좋은 곳",
    content: "새벽 비행기 타러 공항 근처에서 1박 해야 하는데 괜찮은 곳 있나요?",
    author: {
      id: 112,
      name: "비행기타요",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "question",
    views: 289,
    likes: 14,
    commentCount: 13,
    createdAt: "2024-08-25",
    updatedAt: "2024-08-25",
    tags: ["#인천공항", "#새벽비행기", "#공항근처"],
    isPinned: false,
    isHot: false
  },
  {
    id: 13,
    title: "여수 밤바다 야경 포인트 알려드려요",
    content: "여수 밤바다 야경 찍기 좋은 포인트 정리해봤습니다!",
    author: {
      id: 113,
      name: "사진작가",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "tip",
    views: 634,
    likes: 47,
    commentCount: 10,
    createdAt: "2024-08-24",
    updatedAt: "2024-08-24",
    tags: ["#여수", "#밤바다", "#야경", "#사진"],
    thumbnailImage: "/assets/images/magnificant.png",
    isPinned: false,
    isHot: false
  },
  {
    id: 14,
    title: "포항 호미곶 일출 보고 왔어요",
    content: "새해 첫날 호미곶에서 일출을 봤는데 정말 감동적이었습니다.",
    author: {
      id: 114,
      name: "일출러버",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "story",
    views: 378,
    likes: 26,
    commentCount: 6,
    createdAt: "2024-08-23",
    updatedAt: "2024-08-23",
    tags: ["#포항", "#호미곶", "#일출", "#새해"],
    isPinned: false,
    isHot: false
  },
  {
    id: 15,
    title: "서울 근교 당일치기 여행지 추천",
    content: "서울에서 당일치기로 다녀오기 좋은 여행지 5곳을 소개합니다!",
    author: {
      id: 115,
      name: "주말여행러",
      profileImage: "/assets/icons/profile_image.png"
    },
    category: "tip",
    views: 923,
    likes: 72,
    commentCount: 25,
    createdAt: "2024-08-22",
    updatedAt: "2024-08-22",
    tags: ["#서울근교", "#당일치기", "#주말여행"],
    thumbnailImage: "/assets/images/cozy.jpg",
    isPinned: false,
    isHot: true
  }
];

// 카테고리로 필터링
export const getBoardPostsByCategory = (category: string): BoardPost[] => {
  if (category === "all") {
    return mockBoardPosts;
  }
  return mockBoardPosts.filter(post => post.category === category);
};

// 인기 게시글 (Hot)
export const getHotPosts = (): BoardPost[] => {
  return mockBoardPosts.filter(post => post.isHot);
};

// 고정 게시글
export const getPinnedPosts = (): BoardPost[] => {
  return mockBoardPosts.filter(post => post.isPinned);
};
