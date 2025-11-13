"use client";

import * as PortOne from "@portone/browser-sdk/v2";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";

interface IPaymentData {
  orderName: string;
  totalAmount: number;
  customerName?: string;
  customerPhone?: string;
  customerEmail?: string;
}

interface IPaymentResponse {
  success: boolean;
  message?: string;
  paymentId?: string;
}

export const usePayment = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string>("");

  const requestPayment = async (
    paymentData: IPaymentData
  ): Promise<IPaymentResponse> => {
    setIsProcessing(true);
    setError("");

    try {
      // 주문 고유 ID 생성 (uuid 사용)
      const paymentId = `payment-${uuidv4()}`;

      // 포트원 결제 요청
      const response = await PortOne.requestPayment({
        // Store ID 설정
        storeId: "store-b4c0fab2-aba4-4f20-8a4e-a7ded100e632",
        // 채널 키 설정
        channelKey: "channel-key-oeme427g",

        // 결제 정보
        paymentId,
        orderName: paymentData.orderName,
        totalAmount: paymentData.totalAmount,
        currency: "CURRENCY_KRW",
        payMethod: "CARD",

        // 구매자 정보
        customer: {
          fullName: paymentData.customerName || "구매자",
          phoneNumber: paymentData.customerPhone || "010-0000-0000",
          email: paymentData.customerEmail,
        },

        // 모바일 결제 후 복귀 URL
        redirectUrl: "http://localhost:3000",
      });

      // 결제 응답 처리
      if (response?.code != null) {
        // 결제 실패
        const errorMessage = response.message || "결제에 실패했습니다.";
        console.error("결제 실패:", errorMessage);
        setError(errorMessage);
        setIsProcessing(false);
        return {
          success: false,
          message: errorMessage,
        };
      }

      // 결제 성공
      console.log("결제 성공:", response);

      // TODO: 백엔드로 결제 검증 요청
      // const verifyResponse = await fetch('/api/payment/verify', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     paymentId: response.paymentId,
      //     txId: response.txId,
      //   }),
      // });

      setIsProcessing(false);
      return {
        success: true,
        paymentId: response?.paymentId || "",
      };
    } catch (error) {
      const errorMessage = "결제 중 오류가 발생했습니다. 다시 시도해주세요.";
      console.error("결제 중 오류:", error);
      setError(errorMessage);
      setIsProcessing(false);
      return {
        success: false,
        message: errorMessage,
      };
    }
  };

  return {
    requestPayment,
    isProcessing,
    error,
    setError,
  };
};