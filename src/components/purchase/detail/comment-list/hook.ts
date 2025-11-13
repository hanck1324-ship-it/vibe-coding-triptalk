"use client";

import { useState, useEffect } from "react";

// 리뷰 타입 정의
export interface Review {
  id: string;
  author: {
    id: string;
    name: string;
    profileImage: string;
  };
  rating: number;
  content: string;
  images?: string[];
  createdAt: string;
  likeCount: number;
  isLiked: boolean;
}

interface UseCommentListProps {
  accommodationId: string;
}

export const useCommentList = ({ accommodationId }: UseCommentListProps) => {
  // 상태 관리
  const [reviews, setReviews] = useState<Review[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [sortBy, setSortBy] = useState<"latest" | "highRating" | "lowRating">("latest");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());

  const pageSize = 10; // 페이지당 10개

  // Mock 데이터 생성 (TODO: 실제 API로 교체)
  const generateMockReviews = (): Review[] => {
    return [
      {
        id: "1",
        author: {
          id: "user1",
          name: "김민수",
          profileImage: "/assets/icons/profile_image.png",
        },
        rating: 5,
        content:
          "정말 좋은 숙소였습니다! 깨끗하고 조용하며, 직원분들도 친절하셨어요. 다음에 제주도 여행 오면 또 이용하고 싶습니다. 강력 추천합니다!",
        images: ["/assets/images/beach.png", "/assets/images/cozy.jpg"],
        createdAt: "2024.11.10",
        likeCount: 15,
        isLiked: false,
      },
      {
        id: "2",
        author: {
          id: "user2",
          name: "이지은",
          profileImage: "/assets/icons/profile_image.png",
        },
        rating: 4,
        content: "전체적으로 만족스러웠어요. 바다 뷰가 정말 멋있었습니다. 다만 주차장이 좁아서 조금 불편했네요.",
        images: ["/assets/images/openthesea.png"],
        createdAt: "2024.11.09",
        likeCount: 8,
        isLiked: true,
      },
      {
        id: "3",
        author: {
          id: "user3",
          name: "박준호",
          profileImage: "/assets/icons/profile_image.png",
        },
        rating: 5,
        content:
          "완벽한 휴식을 즐길 수 있었습니다. 조식도 맛있고, 위치도 좋아요. 가족들과 함께 편안하게 지낼 수 있었습니다.",
        createdAt: "2024.11.08",
        likeCount: 12,
        isLiked: false,
      },
      {
        id: "4",
        author: {
          id: "user4",
          name: "최서영",
          profileImage: "/assets/icons/profile_image.png",
        },
        rating: 3,
        content: "가격 대비 괜찮았어요. 특별히 나쁜 점은 없었지만, 기대했던 것보다는 평범했습니다.",
        createdAt: "2024.11.07",
        likeCount: 3,
        isLiked: false,
      },
      {
        id: "5",
        author: {
          id: "user5",
          name: "정태민",
          profileImage: "/assets/icons/profile_image.png",
        },
        rating: 5,
        content: "최고의 숙소! 모든 것이 완벽했습니다. 조용하고 깨끗하며, 사진보다 실물이 더 좋았어요.",
        images: ["/assets/images/magnificant.png"],
        createdAt: "2024.11.06",
        likeCount: 20,
        isLiked: false,
      },
    ];
  };

  // 리뷰 목록 조회
  const fetchReviews = async () => {
    setIsLoading(true);

    try {
      // TODO: 실제 API 호출
      // const response = await getReviews({
      //   accommodationId,
      //   page: currentPage,
      //   pageSize,
      //   sortBy,
      // });

      // Mock 데이터 사용
      await new Promise((resolve) => setTimeout(resolve, 500));

      let mockReviews = generateMockReviews();

      // 정렬 적용
      if (sortBy === "highRating") {
        mockReviews = mockReviews.sort((a, b) => b.rating - a.rating);
      } else if (sortBy === "lowRating") {
        mockReviews = mockReviews.sort((a, b) => a.rating - b.rating);
      }
      // latest는 기본 정렬 (최신순)

      setReviews(mockReviews);
      setTotalCount(mockReviews.length);

      // 평균 평점 계산
      const avgRating =
        mockReviews.reduce((sum, review) => sum + review.rating, 0) / mockReviews.length;
      setAverageRating(Math.round(avgRating * 10) / 10);
    } catch (error) {
      console.error("리뷰 조회 실패:", error);
      setReviews([]);
      setTotalCount(0);
      setAverageRating(0);
    } finally {
      setIsLoading(false);
    }
  };

  // 페이지 변경
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 스크롤 상단 이동
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // 정렬 변경
  const handleSortChange = (newSortBy: "latest" | "highRating" | "lowRating") => {
    setSortBy(newSortBy);
    setCurrentPage(1); // 정렬 변경 시 1페이지로 초기화
  };

  // 도움됐어요 클릭
  const handleLike = (reviewId: string) => {
    setReviews((prevReviews) =>
      prevReviews.map((review) => {
        if (review.id === reviewId) {
          return {
            ...review,
            isLiked: !review.isLiked,
            likeCount: review.isLiked ? review.likeCount - 1 : review.likeCount + 1,
          };
        }
        return review;
      })
    );

    // TODO: 실제 API 호출
    console.log("좋아요 토글:", reviewId);
  };

  // 리뷰 내용 펼치기/접기
  const handleToggleExpand = (reviewId: string) => {
    setExpandedReviews((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(reviewId)) {
        newSet.delete(reviewId);
      } else {
        newSet.add(reviewId);
      }
      return newSet;
    });
  };

  // accommodationId, currentPage, sortBy 변경 시 데이터 재조회
  useEffect(() => {
    fetchReviews();
  }, [accommodationId, currentPage, sortBy]);

  return {
    // 상태
    reviews,
    totalCount,
    averageRating,
    currentPage,
    sortBy,
    isLoading,
    pageSize,
    expandedReviews,

    // 함수
    fetchReviews,
    handlePageChange,
    handleSortChange,
    handleLike,
    handleToggleExpand,
  };
};


