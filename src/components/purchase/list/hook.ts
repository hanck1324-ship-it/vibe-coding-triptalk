"use client";

import { useState, useMemo } from "react";
import { useQuery } from "@apollo/client";
import type { Dayjs } from 'dayjs';
import { FETCH_TRAVELPRODUCTS } from "./queries";
import type { Travelproduct } from "@/commons/graphql/graphql";

export const usePurchase = () => {
  // 탭 상태
  const [activeTab, setActiveTab] = useState<'available' | 'closed'>('available');

  // 검색 상태
  const [searchKeyword, setSearchKeyword] = useState("");

  // 날짜 선택 상태
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  
  // 카테고리 선택 상태
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // GraphQL 쿼리 실행
  const { data, loading, error, refetch } = useQuery(FETCH_TRAVELPRODUCTS, {
    variables: {
      search: searchKeyword || undefined,
      isSoldout: activeTab === 'closed' ? true : undefined,
    },
    fetchPolicy: "cache-and-network",
  });

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
    travelproducts: filteredTravelproducts,
    loading,
    error,
  };
};
