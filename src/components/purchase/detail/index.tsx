"use client";

import Image from "next/image";
import styles from "./styles.module.css";
import { usePurchaseDetail } from "./hook";
import PurchaseModal from "../purchase-modal";
import PointAlertModal from "../point-alert-modal";
import KakaoMap from "./KakaoMap";

// 이미지 URL 검증 헬퍼 함수
const getImageUrl = (url?: string | null): string => {
  console.log("원본 이미지 URL:", url); // 디버깅용

  if (!url || typeof url !== 'string' || url.trim() === "") {
    console.log("URL이 비어있음, 기본 이미지 사용");
    return "/assets/images/openthesea.png";
  }

  if (url.startsWith('/') || url.startsWith('http://') || url.startsWith('https://')) {
    console.log("유효한 URL:", url);
    return url;
  }

  console.log("유효하지 않은 URL 형식, 기본 이미지 사용:", url);
  return "/assets/images/openthesea.png";
};

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
    handleDeleteProduct,
    deleteLoading,
    travelproduct,
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

  return (
    <div className={styles.purchaseDetailContainer}>
      <div className={styles.container}>
        <h1>숙박권 상세</h1>

        {/* 디버깅: 이미지 URL 표시 */}
        {accommodation && (
          <div style={{ padding: '10px', background: '#fff3cd', marginBottom: '20px', borderRadius: '8px', fontSize: '14px' }}>
            <strong>🔍 디버깅 정보:</strong>
            <br />
            <strong>이미지 URL:</strong> {accommodation.image || '(없음)'}
          </div>
        )}

        {/* 숙박권 정보 표시 영역 */}
        {accommodation && (
          <div className={styles.accommodationDetail}>
            <div className={styles.accommodationImageWrapper}>
              <Image
                src={getImageUrl(accommodation.image)}
                alt={accommodation.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                style={{ objectFit: "contain" }}
                className={styles.accommodationImage}
                priority
              />
            </div>
            <h2 className={styles.accommodationTitle}>{accommodation.title}</h2>
            <p className={styles.accommodationPrice}>
              {accommodation.price.toLocaleString()}원
            </p>
          </div>
        )}

        {/* 위치 정보 섹션 */}
        {accommodation && accommodation.latitude && accommodation.longitude && (
          <div className={styles.locationSection}>
            <h3 className={styles.locationTitle}>위치 정보</h3>

            {/* 주소 정보 */}
            {accommodation.address && (
              <div className={styles.addressInfo}>
                <p className={styles.address}>{accommodation.address}</p>
                {accommodation.addressDetail && (
                  <p className={styles.addressDetail}>{accommodation.addressDetail}</p>
                )}
              </div>
            )}

            {/* 카카오 지도 */}
            <KakaoMap
              latitude={accommodation.latitude}
              longitude={accommodation.longitude}
              address={accommodation.address}
            />
          </div>
        )}

        {/* 에러 메시지 표시 */}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {/* 버튼 영역 */}
        <div className={styles.buttonContainer}>
          <button
            className={styles.purchaseButton}
            onClick={handleOpenPurchaseModal}
          >
            구매하기
          </button>

          {/* 삭제 버튼 (판매자만 표시) */}
          {travelproduct?.seller && (
            <button
              className={styles.deleteButton}
              onClick={handleDeleteProduct}
              disabled={deleteLoading}
            >
              {deleteLoading ? "삭제 중..." : "삭제하기"}
            </button>
          )}
        </div>
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

