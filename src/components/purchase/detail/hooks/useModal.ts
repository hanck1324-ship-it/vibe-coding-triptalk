"use client";

import { useState } from "react";

export const useModal = () => {
  // 구매 모달 상태 관리
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // 포인트 부족 모달 상태 관리
  const [isPointAlertOpen, setIsPointAlertOpen] = useState(false);

  const openPurchaseModal = () => {
    setIsPurchaseModalOpen(true);
  };

  const closePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  const openPointAlertModal = () => {
    setIsPointAlertOpen(true);
  };

  const closePointAlertModal = () => {
    setIsPointAlertOpen(false);
  };

  return {
    // 구매 모달
    isPurchaseModalOpen,
    openPurchaseModal,
    closePurchaseModal,

    // 포인트 부족 모달
    isPointAlertOpen,
    openPointAlertModal,
    closePointAlertModal,
  };
};
