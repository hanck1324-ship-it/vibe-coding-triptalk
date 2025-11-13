"use client";

import styles from "./styles.module.css";
import { usePurchaseDetail } from "./hook";
import PurchaseModal from "../purchase-modal";
import PointAlertModal from "../point-alert-modal";

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

  return (
    <div className={styles.purchaseDetailContainer}>
      <div className={styles.container}>
        <h1>숙박권 상세</h1>
        
        {/* 숙박권 정보 표시 영역 */}
        {accommodation && (
          <div className={styles.accommodationDetail}>
            <img
              src={accommodation.image}
              alt={accommodation.title}
              className={styles.accommodationImage}
            />
            <h2 className={styles.accommodationTitle}>{accommodation.title}</h2>
            <p className={styles.accommodationPrice}>
              {accommodation.price.toLocaleString()}원
            </p>
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

