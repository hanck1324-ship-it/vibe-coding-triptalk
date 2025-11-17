"use client";

import { useState } from "react";

interface IPurchaseData {
  accommodationId: string;
  accommodationTitle: string;
  price: number;
  buyerName: string;
  buyerPhone: string;
  buyerEmail?: string;
}

interface IPurchaseResponse {
  success: boolean;
  message?: string;
  purchaseId?: string;
}

export const usePointPurchase = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const purchaseWithPoint = async (
    purchaseData: IPurchaseData
  ): Promise<IPurchaseResponse> => {
    setIsProcessing(true);
    setError("");

    try {
      // TODO: 백엔드 API 호출 - 포인트로 숙박권 구매
      // const response = await fetch('/api/accommodation/purchase', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     accommodationId: purchaseData.accommodationId,
      //     price: purchaseData.price,
      //     buyerInfo: {
      //       name: purchaseData.buyerName,
      //       phone: purchaseData.buyerPhone,
      //       email: purchaseData.buyerEmail,
      //     },
      //   }),
      // });
      //
      // const result = await response.json();
      //
      // if (!response.ok || !result.success) {
      //   throw new Error(result.message || '구매에 실패했습니다.');
      // }

      // 임시: API 구현 전 시뮬레이션
      console.log("포인트로 숙박권 구매:", purchaseData);

      // 임시 딜레이 (실제 API 호출 시뮬레이션)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 임시 성공 응답
      setIsProcessing(false);
      return {
        success: true,
        purchaseId: `purchase-${Date.now()}`,
        message: "숙박권 구매가 완료되었습니다.",
      };

      // 실제 API 구현 후:
      // setIsProcessing(false);
      // return {
      //   success: true,
      //   purchaseId: result.data.purchaseId,
      //   message: result.message,
      // };
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "숙박권 구매 중 오류가 발생했습니다.";
      console.error("포인트 구매 중 오류:", error);
      setError(errorMessage);
      setIsProcessing(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {
    purchaseWithPoint,
    isProcessing,
    error,
    setError,
  };
};
