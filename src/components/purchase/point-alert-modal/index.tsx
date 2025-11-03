"use client";

import { Modal } from "antd";
import styles from "./styles.module.css";
import { useRouter } from "next/navigation";

interface IPointAlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPoint: number;
  requiredPoint: number;
}

export default function PointAlertModal(props: IPointAlertModalProps) {
  const { isOpen, onClose, currentPoint, requiredPoint } = props;
  const router = useRouter();
  
  const shortagePoint = requiredPoint - currentPoint;

  const handleGoToCharge = () => {
    // TODO: 포인트 충전 페이지로 이동
    router.push("/myPage?tab=point");
    onClose();
  };

  return (
    <Modal
      title="포인트 부족"
      open={isOpen}
      onCancel={onClose}
      onOk={handleGoToCharge}
      okText="충전하러 가기"
      cancelText="닫기"
    >
      <div className={styles.modalContent}>
        <p className={styles.alertMessage}>
          포인트가 부족합니다.
        </p>
        <div className={styles.pointInfo}>
          <div className={styles.pointRow}>
            <span>보유 포인트:</span>
            <span className={styles.pointValue}>{currentPoint.toLocaleString()}P</span>
          </div>
          <div className={styles.pointRow}>
            <span>필요 포인트:</span>
            <span className={styles.pointValue}>{requiredPoint.toLocaleString()}P</span>
          </div>
          <div className={`${styles.pointRow} ${styles.shortage}`}>
            <span>부족 포인트:</span>
            <span className={styles.pointValue}>{shortagePoint.toLocaleString()}P</span>
          </div>
        </div>
      </div>
    </Modal>
  );
}

