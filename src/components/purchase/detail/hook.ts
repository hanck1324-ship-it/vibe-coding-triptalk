"use client";

import { useParams, useRouter } from "next/navigation";
import { useAccommodationDetail } from "./hooks/useAccommodationDetail";
import { useModal } from "./hooks/useModal";
import { usePayment } from "./hooks/usePayment";
import { IBuyerInfo } from "../purchase-modal";

export const usePurchaseDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // 분리된 hooks 사용
  const { accommodation, currentPoint, requiredPoint, loading } =
    useAccommodationDetail(id);

  const {
    isPurchaseModalOpen,
    openPurchaseModal,
    closePurchaseModal,
    isPointAlertOpen,
    openPointAlertModal,
    closePointAlertModal,
  } = useModal();

  const { requestPayment, error, setError } = usePayment();

  // 구매 확인 핸들러 (포인트 체크 + 결제 요청 + 라우팅)
  const handlePurchaseConfirm = async (buyerInfo: IBuyerInfo) => {
    // 1단계: 포인트 체크
    if (currentPoint < requiredPoint) {
      // 포인트 부족
      openPointAlertModal();
      closePurchaseModal();
      return; // 프로세스 중단
    }

    // 2단계: 포트원 결제 요청 (구매자 정보 포함)
    const paymentResult = await requestPayment({
      orderName: accommodation?.title || "숙박권 구매",
      totalAmount: accommodation?.price || 0,
      customerName: buyerInfo.name,
      customerPhone: buyerInfo.phone,
      customerEmail: buyerInfo.email,
    });

    // 3단계: 결제 결과 처리
    if (!paymentResult.success) {
      // 결제 실패
      closePurchaseModal();
      return;
    }

    // 결제 성공
    closePurchaseModal();

    // 4단계: 판매 등록 화면으로 이동
    router.push("/purchase/sell");
  };

  return {
    accommodation,
    loading,
    isPurchaseModalOpen,
    handleOpenPurchaseModal: openPurchaseModal,
    handleClosePurchaseModal: closePurchaseModal,
    handlePurchaseConfirm,
    isPointAlertOpen,
    handleClosePointAlert: closePointAlertModal,
    currentPoint,
    requiredPoint,
    errorMessage: error,
  };
};

