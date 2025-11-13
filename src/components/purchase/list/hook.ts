"use client";

import { useState } from "react";
import type { Dayjs } from 'dayjs';

export const usePurchase = () => {
  // 탭 상태
  const [activeTab, setActiveTab] = useState<'available' | 'closed'>('available');

  // 검색 상태
  const [searchKeyword, setSearchKeyword] = useState("");

  // 날짜 선택 상태
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  
  // 카테고리 선택 상태
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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
    console.log('검색:', {
      keyword: searchKeyword,
      date: selectedDate,
      categories: selectedCategories,
      tab: activeTab,
    });
    // TODO: API 호출
  };

  return {
    activeTab,
    searchKeyword,
    selectedDate,
    selectedCategories,
    setActiveTab,
    setSearchKeyword,
    setSelectedDate,
    handleCategoryToggle,
    handleSearch,
  };
};
