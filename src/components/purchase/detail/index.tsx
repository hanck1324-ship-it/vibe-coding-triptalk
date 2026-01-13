"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { usePurchaseDetail } from "./hook";
import PurchaseModal from "../purchase-modal";
import PointAlertModal from "../point-alert-modal";
import DetailMap from "./map_view/DetailMap";

export default function PurchaseDetail() {
  const {
    accommodation,
    loading,
    isPurchaseModalOpen,
    handleOpenPurchaseModal,
    handleClosePurchaseModal,
    handlePurchaseConfirm,
    isPointAlertOpen,
    handleClosePointAlert,
    currentPoint,
    requiredPoint,
    errorMessage,
  } = usePurchaseDetail();

  if (loading) {
    return <div className={styles.loading}>숙박권 정보를 불러오는 중입니다...</div>;
  }

  if (!accommodation && !loading) {
    return (
      <div className={styles.purchaseDetailContainer}>
        <div className={styles.container}>
          <div className={styles.errorMessage}>
            숙박권 정보를 찾을 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  // 이미지 URL 검증 및 fallback 처리
  const getValidImageUrl = (imageUrl?: string | null): string => {
    if (!imageUrl || imageUrl.trim() === '') {
      return "/assets/images/openthesea.png";
    }

    const trimmedUrl = imageUrl.trim();

    try {
      // 상대 경로인 경우 그대로 반환
      if (trimmedUrl.startsWith('/')) {
        return trimmedUrl;
      }

      // 절대 URL인 경우 URL 객체로 검증
      new URL(trimmedUrl);
      return trimmedUrl;
    } catch (e) {
      // 유효하지 않은 URL이면 fallback 이미지 사용
      console.warn(`Invalid image URL: ${trimmedUrl}`);
      return "/assets/images/openthesea.png";
    }
  };

  return (
    <div className={styles.purchaseDetailContainer}>
      <div className={styles.container}>
        <h1>숙박권 상세</h1>

        {/* 숙박권 정보 표시 영역 */}
        {accommodation && (
          <div className={styles.accommodationDetail}>
            <div className={styles.imageWrapper}>
              <Image
                src={getValidImageUrl(accommodation.image)}
                alt={accommodation.title}
                fill
                style={{ objectFit: "cover" }}
                className={styles.accommodationImage}
                onError={(e: any) => {
                  e.target.src = "/assets/images/openthesea.png";
                }}
              />
            </div>
            <h2 className={styles.accommodationTitle}>{accommodation.title}</h2>
            <p className={styles.accommodationPrice}>
              {accommodation.price.toLocaleString()}원
            </p>

            {/* 지도 표시 영역 */}
            {accommodation.lat && accommodation.lng && (
              <div className={styles.mapSection}>
                <h3 className={styles.mapTitle}>위치</h3>
                <DetailMap
                  lat={accommodation.lat}
                  lng={accommodation.lng}
                  address={accommodation.address}
                />
              </div>
            )}
          </div>
        )}

        {/* 에러 메시지 표시 */}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {/* 구매 버튼 */}
        <button
          className={styles.purchaseButton}
          onClick={handleOpenPurchaseModal}
        >
          구매하기
        </button>
      </div>

      {/* 구매 모달 */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={handleClosePurchaseModal}
        onConfirm={handlePurchaseConfirm}
        accommodationId={accommodation?.id || ""}
        accommodationData={{
          title: accommodation?.title || "숙박권",
          price: accommodation?.price || 0,
          image: accommodation?.image || "",
        }}
        currentUserPoint={currentPoint}
      />

      {/* 포인트 부족 모달 */}
      <PointAlertModal
        isOpen={isPointAlertOpen}
        onClose={handleClosePointAlert}
        currentPoint={currentPoint}
        requiredPoint={requiredPoint}
      />
    </div>
  );
}

