// 게시판 상세 페이지 mock 데이터

export interface BoardDetailPost {
  id: number;
  title: string;
  content: string;
  author: {
    id: number;
    name: string;
    profileImage: string;
    level: number;
    postCount: number;
  };
  category: string;
  views: number;
  likes: number;
  createdAt: string;
  updatedAt: string;
  tags: string[];
  images: string[];
  attachments?: Attachment[];
  isPinned: boolean;
  isLikedByMe: boolean;
}

export interface Attachment {
  id: number;
  name: string;
  size: number;
  url: string;
}

export interface Comment {
  id: number;
  postId: number;
  author: {
    id: number;
    name: string;
    profileImage: string;
    level: number;
  };
  content: string;
  likes: number;
  createdAt: string;
  updatedAt: string;
  isLikedByMe: boolean;
  parentCommentId?: number;
  replies?: Comment[];
}

// Mock 게시글 상세 데이터
export const mockBoardDetailPosts: BoardDetailPost[] = [
  {
    id: 1,
    title: "제주도 3박 4일 여행 후기 - 가족 여행 코스 추천",
    content: `제주도에서 가족과 함께 보낸 3박 4일 여행 후기입니다.
아이들과 함께 가기 좋은 코스를 소개합니다.

## 1일차
- 제주 공항 도착
- 렌터카 픽업
- 협재 해수욕장
- 한림 공원
- 숙소 체크인 (제주 오션뷰 풀빌라)

## 2일차
- 성산 일출봉
- 섭지코지
- 성읍민속마을
- 만장굴

## 3일차
- 천지연 폭포
- 주상절리대
- 중문 색달 해변
- 테디베어 박물관

## 4일차
- 협재 해수욕장 재방문
- 제주 공항 출발

특히 숙소로 예약한 오션뷰 풀빌라가 정말 최고였습니다!
아이들이 수영장에서 놀면서 정말 행복해했어요.

다음에 또 가고 싶네요 😊`,
    author: {
      id: 101,
      name: "여행러버",
      profileImage: "/assets/icons/profile_image.png",
      level: 7,
      postCount: 47
    },
    category: "review",
    views: 1247,
    likes: 89,
    createdAt: "2024-09-05",
    updatedAt: "2024-09-05",
    tags: ["#제주도", "#가족여행", "#3박4일", "#여행코스"],
    images: [
      "/assets/images/beach.png",
      "/assets/images/openthesea.png",
      "/assets/images/magnificant.png"
    ],
    isPinned: true,
    isLikedByMe: false
  },
  {
    id: 2,
    title: "강릉 커피 투어 완벽 가이드",
    content: `강릉에 가면 꼭 들러야 할 카페 베스트 10을 소개합니다.

## 추천 카페 리스트

### 1. 테라로사 커피공장
- 위치: 강릉시 구정면
- 특징: 로스팅 현장을 볼 수 있음
- 추천 메뉴: 시그니처 블렌드

### 2. 보헤미안 커피
- 위치: 강릉시 초당동
- 특징: 바다 뷰가 환상적
- 추천 메뉴: 카페 라떼

### 3. 커피커퍼 로스터스
- 위치: 강릉시 강문동
- 특징: 핸드드립 전문
- 추천 메뉴: 싱글 오리진

강릉 커피 투어하시는 분들께 도움이 되길 바랍니다!`,
    author: {
      id: 102,
      name: "카페인중독",
      profileImage: "/assets/icons/profile_image.png",
      level: 5,
      postCount: 32
    },
    category: "tip",
    views: 892,
    likes: 67,
    createdAt: "2024-09-04",
    updatedAt: "2024-09-04",
    tags: ["#강릉", "#카페", "#커피", "#여행팁"],
    images: [
      "/assets/images/cozy.jpg"
    ],
    isPinned: false,
    isLikedByMe: true
  }
];

// Mock 댓글 데이터
export const mockComments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: {
      id: 201,
      name: "댓글러",
      profileImage: "/assets/icons/profile_image.png",
      level: 3
    },
    content: "정보 감사합니다! 다음 달에 제주도 가는데 많은 도움이 됐어요 👍",
    likes: 12,
    createdAt: "2024-09-05T10:30:00",
    updatedAt: "2024-09-05T10:30:00",
    isLikedByMe: false,
    replies: [
      {
        id: 101,
        postId: 1,
        author: {
          id: 101,
          name: "여행러버",
          profileImage: "/assets/icons/profile_image.png",
          level: 7
        },
        content: "도움이 되셨다니 기쁩니다! 좋은 여행 되세요 😊",
        likes: 5,
        createdAt: "2024-09-05T11:00:00",
        updatedAt: "2024-09-05T11:00:00",
        isLikedByMe: false,
        parentCommentId: 1
      }
    ]
  },
  {
    id: 2,
    postId: 1,
    author: {
      id: 202,
      name: "제주도러",
      profileImage: "/assets/icons/profile_image.png",
      level: 4
    },
    content: "숙소 이름이 뭔가요? 저도 예약하고 싶어요!",
    likes: 8,
    createdAt: "2024-09-05T12:15:00",
    updatedAt: "2024-09-05T12:15:00",
    isLikedByMe: true,
    replies: []
  },
  {
    id: 3,
    postId: 1,
    author: {
      id: 203,
      name: "가족여행좋아",
      profileImage: "/assets/icons/profile_image.png",
      level: 2
    },
    content: "아이들 몇 살인가요? 저희도 7살, 5살 아이 데리고 가려고 하는데 괜찮을까요?",
    likes: 3,
    createdAt: "2024-09-05T14:20:00",
    updatedAt: "2024-09-05T14:20:00",
    isLikedByMe: false,
    replies: [
      {
        id: 102,
        postId: 1,
        author: {
          id: 101,
          name: "여행러버",
          profileImage: "/assets/icons/profile_image.png",
          level: 7
        },
        content: "저희는 8살, 6살이었는데 정말 즐거워했어요! 충분히 괜찮을 것 같아요.",
        likes: 2,
        createdAt: "2024-09-05T15:00:00",
        updatedAt: "2024-09-05T15:00:00",
        isLikedByMe: false,
        parentCommentId: 3
      }
    ]
  },
  {
    id: 4,
    postId: 2,
    author: {
      id: 204,
      name: "커피마니아",
      profileImage: "/assets/icons/profile_image.png",
      level: 6
    },
    content: "강릉 커피 투어 최고죠! 테라로사는 진짜 강추입니다 ☕",
    likes: 15,
    createdAt: "2024-09-04T09:30:00",
    updatedAt: "2024-09-04T09:30:00",
    isLikedByMe: false,
    replies: []
  },
  {
    id: 5,
    postId: 2,
    author: {
      id: 205,
      name: "바다보러가자",
      profileImage: "/assets/icons/profile_image.png",
      level: 3
    },
    content: "보헤미안 커피 바다 뷰 정말 좋더라고요. 사진 찍기도 좋아요!",
    likes: 9,
    createdAt: "2024-09-04T11:45:00",
    updatedAt: "2024-09-04T11:45:00",
    isLikedByMe: true,
    replies: []
  }
];

// ID로 게시글 찾기
export const getBoardDetailById = (id: number): BoardDetailPost | undefined => {
  return mockBoardDetailPosts.find(post => post.id === id);
};

// 게시글의 댓글 가져오기
export const getCommentsByPostId = (postId: number): Comment[] => {
  return mockComments.filter(comment => comment.postId === postId && !comment.parentCommentId);
};

// 대댓글 가져오기
export const getRepliesByCommentId = (commentId: number): Comment[] => {
  return mockComments.filter(comment => comment.parentCommentId === commentId);
};
