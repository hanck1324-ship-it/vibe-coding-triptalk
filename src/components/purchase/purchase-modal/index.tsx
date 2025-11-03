"use client";

import { Modal } from "antd";
import styles from "./styles.module.css";

interface IPurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  accommodationId: string;
  price: number;
}

export default function PurchaseModal(props: IPurchaseModalProps) {
  const { isOpen, onClose, accommodationId, price } = props;

  const handlePurchase = () => {
    // TODO: 구매 API 호출
    console.log("구매:", accommodationId);
    onClose();
  };

  return (
    <Modal
      title="숙박권 구매"
      open={isOpen}
      onCancel={onClose}
      onOk={handlePurchase}
      okText="구매하기"
      cancelText="취소"
    >
      <div className={styles.modalContent}>
        <p>가격: {price.toLocaleString()}원</p>
        {/* TODO: 결제 정보 입력 폼 */}
      </div>
    </Modal>
  );
}

