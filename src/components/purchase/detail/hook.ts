"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

export const usePurchaseDetail = () => {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  // 구매 모달 상태 관리
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);

  // 포인트 부족 모달 상태 관리
  const [isPointAlertOpen, setIsPointAlertOpen] = useState(false);

  // 사용자 보유 포인트 (테스트용 하드코딩)
  // TODO: API에서 가져오기
  const [currentPoint] = useState(50000);

  // 에러 상태 관리
  const [errorMessage, setErrorMessage] = useState("");

  // TODO: 숙박권 상세 정보 로드 (테스트용 임시 데이터)
  const accommodation = {
    id: id || "1",
    title: "제주 오션뷰 펜션",
    price: 120000,
    image: "https://via.placeholder.com/400x300",
  };

  const requiredPoint = accommodation?.price || 0;

  const handleOpenPurchaseModal = () => {
    setIsPurchaseModalOpen(true);
  };

  const handleClosePurchaseModal = () => {
    setIsPurchaseModalOpen(false);
  };

  const handleClosePointAlert = () => {
    setIsPointAlertOpen(false);
  };

  // 구매 확인 핸들러 (포인트 체크 + API 호출 + 라우팅)
  const handlePurchaseConfirm = async () => {
    // 1단계: 포인트 체크
    if (currentPoint < requiredPoint) {
      // 포인트 부족
      setIsPointAlertOpen(true);
      setIsPurchaseModalOpen(false); // 구매 모달 닫기
      return; // 프로세스 중단
    }

    // 2단계: 포인트 충분 - API 호출
    try {
      // TODO: 실제 구매 API 호출
      // const response = await purchaseAccommodation({
      //   accommodationId: accommodation.id,
      //   price: accommodation.price,
      // });

      // 임시: API 성공 시뮬레이션
      console.log("구매 API 호출 예정:", {
        accommodationId: accommodation?.id,
        price: accommodation?.price,
        userId: "user-id", // TODO: 실제 사용자 ID
      });

      // 모달 닫기
      setIsPurchaseModalOpen(false);

      // 3단계: 판매 등록 화면으로 이동
      router.push("/purchase/sell");
    } catch (error) {
      // 4단계: 에러 처리
      console.error("구매 실패:", error);
      setErrorMessage("구매 중 오류가 발생했습니다. 다시 시도해주세요.");
      setIsPurchaseModalOpen(false);
    }
  };

  return {
    accommodation,
    loading: false,
    isPurchaseModalOpen,
    handleOpenPurchaseModal,
    handleClosePurchaseModal,
    handlePurchaseConfirm,
    isPointAlertOpen,
    handleClosePointAlert,
    currentPoint,
    requiredPoint,
    errorMessage,
  };
};

