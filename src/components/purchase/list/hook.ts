"use client";

import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import type { Dayjs } from 'dayjs';
import { FETCH_TRAVELPRODUCTS, DELETE_TRAVELPRODUCT } from "./queries";
import { FETCH_USER_LOGGED_IN } from "@/components/mypage/queries";
import type { Travelproduct } from "@/commons/graphql/graphql";

export const usePurchase = () => {
  const router = useRouter();

  // 탭 상태
  const [activeTab, setActiveTab] = useState<'available' | 'closed'>('available');

  // 검색 상태
  const [searchKeyword, setSearchKeyword] = useState("");

  // 날짜 선택 상태
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);

  // 카테고리 선택 상태
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // 북마크 상태 (localStorage)
  const [bookmarkedIds, setBookmarkedIds] = useState<string[]>([]);

  // 최근 본 상품 (localStorage)
  const [recentProducts, setRecentProducts] = useState<string[]>([]);

  // 페이지네이션
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // 삭제 모달 상태
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  // 로그인한 사용자 정보 조회
  const { data: userData } = useQuery(FETCH_USER_LOGGED_IN, {
    fetchPolicy: "cache-and-network",
  });

  const loggedInUser = userData?.fetchUserLoggedIn;

  // GraphQL 쿼리 실행
  const { data, loading, error, refetch } = useQuery(FETCH_TRAVELPRODUCTS, {
    variables: {
      search: searchKeyword || undefined,
      isSoldout: activeTab === 'closed' ? true : undefined,
    },
    fetchPolicy: "cache-and-network",
  });

  // 삭제 뮤테이션
  const [deleteTravelproduct] = useMutation(DELETE_TRAVELPRODUCT);

  // 여행 상품 목록 데이터
  const travelproducts: Travelproduct[] = data?.fetchTravelproducts || [];

  // 카테고리 토글
  const handleCategoryToggle = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  // 검색 실행
  const handleSearch = () => {
    refetch({
      search: searchKeyword || undefined,
      isSoldout: activeTab === 'closed' ? true : undefined,
    });
  };

  // 탭 변경 시 데이터 다시 가져오기
  const handleTabChange = (tab: 'available' | 'closed') => {
    setActiveTab(tab);
    refetch({
      search: searchKeyword || undefined,
      isSoldout: tab === 'closed' ? true : undefined,
    });
  };

  // localStorage에서 북마크 로드
  useEffect(() => {
    const saved = localStorage.getItem('bookmarkedProducts');
    if (saved) {
      try {
        setBookmarkedIds(JSON.parse(saved));
      } catch (e) {
        console.error('북마크 로드 실패:', e);
      }
    }
  }, []);

  // localStorage에서 최근 본 상품 로드
  useEffect(() => {
    const saved = localStorage.getItem('recentProducts');
    if (saved) {
      try {
        setRecentProducts(JSON.parse(saved));
      } catch (e) {
        console.error('최근 본 상품 로드 실패:', e);
      }
    }
  }, []);

  // 메모이제이션: 탭에 따라 필터링된 상품 목록
  const filteredTravelproducts = useMemo(() => {
    if (activeTab === 'closed') {
      // 예약 마감: soldAt이 있는 상품만
      return travelproducts.filter((item) => item.soldAt != null);
    } else {
      // 예약 가능: soldAt이 없는 상품만
      return travelproducts.filter((item) => item.soldAt == null);
    }
  }, [travelproducts, activeTab]);

  // 페이지네이션된 상품 목록
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredTravelproducts.slice(startIndex, endIndex);
  }, [filteredTravelproducts, currentPage, itemsPerPage]);

  // 전체 페이지 수
  const totalPages = Math.ceil(filteredTravelproducts.length / itemsPerPage);

  // 삭제 모달 열기
  const handleDeleteClick = useCallback((e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setDeleteProductId(productId);
    setIsDeleteModalOpen(true);
  }, []);

  // 삭제 취소
  const handleDeleteCancel = useCallback(() => {
    setIsDeleteModalOpen(false);
    setDeleteProductId(null);
  }, []);

  // 삭제 확인
  const handleDeleteConfirm = useCallback(async () => {
    if (deleteProductId) {
      try {
        await deleteTravelproduct({
          variables: { travelproductId: deleteProductId },
        });
        refetch();
        setIsDeleteModalOpen(false);
        setDeleteProductId(null);
        return true;
      } catch (error) {
        console.error("상품 삭제 에러:", error);
        return false;
      }
    }
    return false;
  }, [deleteProductId, deleteTravelproduct, refetch]);

  // 북마크 토글
  const handleToggleBookmark = useCallback((e: React.MouseEvent, productId: string) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const newBookmarks = prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId];
      localStorage.setItem('bookmarkedProducts', JSON.stringify(newBookmarks));
      return newBookmarks;
    });
  }, []);

  // 최근 본 상품 추가
  const addRecentProduct = useCallback((productId: string) => {
    setRecentProducts((prev) => {
      // 중복 제거
      const filtered = prev.filter((id) => id !== productId);
      // 맨 앞에 추가하고 최대 3개로 제한
      const newRecent = [productId, ...filtered].slice(0, 3);
      localStorage.setItem('recentProducts', JSON.stringify(newRecent));
      return newRecent;
    });
  }, []);

  // 카드 클릭 (최근 본 상품 추가 + 페이지 이동)
  const handleCardClick = useCallback((productId: string) => {
    addRecentProduct(productId);
    router.push(`/purchase/${productId}`);
  }, [router, addRecentProduct]);

  // 페이지네이션
  const handleNextPage = useCallback(() => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  }, [currentPage, totalPages]);

  const handlePrevPage = useCallback(() => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  }, [currentPage]);

  return {
    activeTab,
    searchKeyword,
    selectedDate,
    selectedCategories,
    setActiveTab: handleTabChange,
    setSearchKeyword,
    setSelectedDate,
    handleCategoryToggle,
    handleSearch,
    travelproducts: paginatedProducts, // 페이지네이션된 목록
    allTravelproducts: filteredTravelproducts, // 전체 목록 (최근 본 상품용)
    loading,
    error,
    // 삭제 관련
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    // 로그인한 사용자 정보
    loggedInUserId: loggedInUser?._id,
    // 북마크
    bookmarkedIds,
    handleToggleBookmark,
    // 최근 본 상품
    recentProducts,
    handleCardClick,
    // 페이지네이션
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
  };
};
