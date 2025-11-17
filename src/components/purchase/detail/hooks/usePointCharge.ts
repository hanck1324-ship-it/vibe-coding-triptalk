"use client";

import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

interface IPointChargeData {
  amount: number; // 충전할 포인트 금액
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

interface IPointChargeResponse {
  success: boolean;
  message?: string;
  paymentId?: string;
  chargedAmount?: number;
}

export const usePointCharge = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const chargePoint = async (
    chargeData: IPointChargeData
  ): Promise<IPointChargeResponse> => {
    setIsProcessing(true);
    setError("");

    try {
      // 주문 고유 ID 생성 (uuid 사용)
      const paymentId = `point-charge-${uuidv4()}`;

      // 포트원 결제 요청 (실제 돈으로 포인트 충전)
      const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-b4c0fab2-aba4-4f20-8a4e-a7ded100e632",
        // 채널 키 설정
        channelKey: "channel-key-oeme427g",

        // 결제 정보
        paymentId,
        orderName: `포인트 ${chargeData.amount.toLocaleString()}원 충전`,
        totalAmount: chargeData.amount,
        currency: "CURRENCY_KRW",
        payMethod: "EASY_PAY", // 카카오페이, 네이버페이 등

        // 구매자 정보
        customer: {
          fullName: chargeData.customerName || "구매자",
          phoneNumber: chargeData.customerPhone || "010-0000-0000",
          email: chargeData.customerEmail,
        },

        // 모바일 결제 후 복귀 URL
        redirectUrl: `${window.location.origin}/myPage?tab=point`,
      });

      // 결제 응답 처리
      if (response?.code != null) {
        // 결제 실패
        const errorMessage = response.message || "포인트 충전에 실패했습니다.";
        console.error("포인트 충전 실패:", errorMessage);
        setError(errorMessage);
        setIsProcessing(false);
        return {
          success: false,
          message: errorMessage,
        };
      }

      // 결제 성공
      console.log("포인트 충전 결제 성공:", response);

      // TODO: 백엔드로 결제 검증 및 포인트 충전 요청
      // const verifyResponse = await fetch('/api/point/charge', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     paymentId: response.paymentId,
      //     txId: response.txId,
      //     amount: chargeData.amount,
      //   }),
      // });

      setIsProcessing(false);
      return {
        success: true,
        paymentId: response?.paymentId || "",
        chargedAmount: chargeData.amount,
      };
    } catch (error) {
      const errorMessage =
        "포인트 충전 중 오류가 발생했습니다. 다시 시도해주세요.";
      console.error("포인트 충전 중 오류:", error);
      setError(errorMessage);
      setIsProcessing(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {
    chargePoint,
    isProcessing,
    error,
    setError,
  };
};
