"use client";

import Image from "next/image";
import { Modal } from "antd";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import PointAlertModal from "../point-alert-modal";

interface IAccommodationData {
  title: string;
  price: number;
  image: string;
}

export interface IBuyerInfo {
  name: string;
  phone: string;
  email?: string;
}

interface IPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodationId: string;
  accommodationData: IAccommodationData;
  currentUserPoint?: number;
  onConfirm?: (buyerInfo: IBuyerInfo) => void;
}

export default function PurchaseModal(props: IPurchaseModalProps) {
  const {
    isOpen,
    onClose,
    accommodationId,
    accommodationData,
    currentUserPoint = 0,
    onConfirm,
  } = props;

  const router = useRouter();

  // 구매자 정보 상태
  const [buyerName, setBuyerName] = useState("");
  const [buyerPhone, setBuyerPhone] = useState("");
  const [buyerEmail, setBuyerEmail] = useState("");

  // 에러 상태
  const [errors, setErrors] = useState({
    name: "",
    phone: "",
  });

  // 포인트 부족 모달 상태
  const [isPointAlertOpen, setIsPointAlertOpen] = useState(false);

  // 입력값 검증
  const validateInputs = () => {
    const newErrors = {
      name: "",
      phone: "",
    };

    let isValid = true;

    if (!buyerName.trim()) {
      newErrors.name = "이름을 입력해주세요.";
      isValid = false;
    }

    if (!buyerPhone.trim()) {
      newErrors.phone = "연락처를 입력해주세요.";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  // 구매하기 버튼 클릭 핸들러
  const handlePurchase = () => {
    // 1단계: 필수 입력값 검증
    if (!validateInputs()) {
      return;
    }

    // 2단계: 포인트 체크
    const requiredPoint = accommodationData.price;

    if (currentUserPoint < requiredPoint) {
      // 포인트 부족 - PointAlertModal 표시
      setIsPointAlertOpen(true);
      return; // 프로세스 중단 (API 호출 안함, 페이지 이동 안함)
    }

    // 3단계: 포인트 충분하면 - 부모 컴포넌트의 onConfirm 콜백 실행 (구매자 정보 전달)
    if (onConfirm) {
      onConfirm({
        name: buyerName,
        phone: buyerPhone,
        email: buyerEmail || undefined,
      });
    }
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    // 모달만 닫기 (페이지 이동 없음, API 호출 없음)
    onClose();
  };

  // 포인트 부족 모달 닫기
  const handleClosePointAlert = () => {
    setIsPointAlertOpen(false);
  };

  // 충전하러 가기
  const handleGoToCharge = () => {
    router.push("/myPage?tab=point");
    setIsPointAlertOpen(false);
    onClose();
  };

  return (
    <>
      <Modal
        title="숙박권 구매"
        open={isOpen}
        onCancel={handleCancel}
        footer={null}
        width={600}
        className={styles.modal}
      >
        <div className={styles.modalContent}>
          {/* [B] 숙박권 요약 정보 */}
          <div className={styles.accommodationSummary}>
            <div className={styles.imageWrapper}>
              <Image
                src={accommodationData.image}
                alt={accommodationData.title}
                fill
                style={{ objectFit: "cover" }}
                className={styles.accommodationImage}
                onError={(e: any) => {
                  e.target.src = "/assets/images/openthesea.png";
                }}
              />
            </div>
            <div className={styles.accommodationInfo}>
              <h3 className={styles.accommodationTitle}>
                {accommodationData.title}
              </h3>
              <div className={styles.priceInfo}>
                <div className={styles.totalPrice}>
                  {accommodationData.price.toLocaleString()}원
                </div>
              </div>
            </div>
          </div>

          {/* [C] 구매자 정보 입력 폼 */}
          <div className={styles.section}>
            <h4 className={styles.sectionTitle}>구매자 정보</h4>

            <div className={styles.formField}>
              <label className={styles.formLabel}>
                이름
                <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                className={`${styles.formInput} ${
                  errors.name ? styles.error : ""
                }`}
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="이름을 입력하세요"
              />
              {errors.name && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.name}
                </div>
              )}
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>
                연락처
                <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                className={`${styles.formInput} ${
                  errors.phone ? styles.error : ""
                }`}
                value={buyerPhone}
                onChange={(e) => setBuyerPhone(e.target.value)}
                placeholder="010-0000-0000"
              />
              {errors.phone && (
                <div className={styles.errorMessage}>
                  <span className={styles.errorIcon}>⚠</span>
                  {errors.phone}
                </div>
              )}
            </div>

            <div className={styles.formField}>
              <label className={styles.formLabel}>이메일</label>
              <input
                type="email"
                className={styles.formInput}
                value={buyerEmail}
                onChange={(e) => setBuyerEmail(e.target.value)}
                placeholder="example@email.com (선택)"
              />
            </div>
          </div>

          {/* [E] 버튼 영역 */}
          <div className={styles.buttonArea}>
            <button className={styles.cancelButton} onClick={handleCancel}>
              취소
            </button>
            <button className={styles.purchaseButton} onClick={handlePurchase}>
              구매하기
            </button>
          </div>
        </div>
      </Modal>

      {/* 포인트 부족 모달 */}
      <PointAlertModal
        isOpen={isPointAlertOpen}
        onClose={handleClosePointAlert}
        currentPoint={currentUserPoint}
        requiredPoint={accommodationData.price}
      />
    </>
  );
}

