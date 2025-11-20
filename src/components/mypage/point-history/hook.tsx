"use client";

import { useState } from "react";
import { usePointCharge } from "@/components/purchase/detail/hooks/usePointCharge";

export const usePointChargeComponent = () => {
  const [selectedAmount, setSelectedAmount] = useState<number>(0);
  const { chargePoint, isProcessing, error, setError } = usePointCharge();

  // TODO: 피그마 디자인에 맞춰 필요한 상태와 핸들러 추가

  const handleAmountSelect = (amount: number) => {
    setSelectedAmount(amount);
  };

  const handleChargeClick = async () => {
    if (selectedAmount <= 0) {
      setError("충전할 금액을 선택해주세요.");
      return;
    }

    // TODO: 사용자 정보 가져오기
    const result = await chargePoint({
      amount: selectedAmount,
      customerName: "", // TODO: 로그인한 사용자 이름
      customerPhone: "", // TODO: 로그인한 사용자 전화번호
      customerEmail: "", // TODO: 로그인한 사용자 이메일
    });

    if (result.success) {
      // TODO: 성공 처리 (포인트 새로고침 등)
      console.log("충전 성공:", result);
    }
  };

  return {
    selectedAmount,
    handleAmountSelect,
    handleChargeClick,
    isProcessing,
    error,
  };
};
