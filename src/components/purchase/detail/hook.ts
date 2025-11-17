"use client";

import { useParams, useRouter } from "next/navigation";
import { useAccommodationDetail } from "./hooks/useAccommodationDetail";
import { useModal } from "./hooks/useModal";
import { usePointPurchase } from "./hooks/usePointPurchase";
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

  const { purchaseWithPoint, error, setError } = usePointPurchase();

  // 구매 확인 핸들러 (포인트 체크 + 결제 요청 + 라우팅)
  const handlePurchaseConfirm = async (buyerInfo: IBuyerInfo) => {
    // 1단계: 포인트 체크
    if (currentPoint < requiredPoint) {
      // 포인트 부족
      openPointAlertModal();
      closePurchaseModal();
      return; // 프로세스 중단
    }

    // 2단계: 포인트로 숙박권 구매 (백엔드 API 호출)
    const purchaseResult = await purchaseWithPoint({
      accommodationId: id,
      accommodationTitle: accommodation?.title || "숙박권",
      price: accommodation?.price || 0,
      buyerName: buyerInfo.name,
      buyerPhone: buyerInfo.phone,
      buyerEmail: buyerInfo.email,
    });

    // 3단계: 구매 결과 처리
    if (!purchaseResult.success) {
      // 구매 실패
      closePurchaseModal();
      return;
    }

    // 구매 성공
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

