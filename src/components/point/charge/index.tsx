"use client";

import { useState } from "react";
import styles from "./styles.module.css";

export default function PointCharge() {
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);

  const handleCharge = () => {
    if (!selectedAmount) {
      alert("충전할 금액을 선택해주세요.");
      return;
    }
    // TODO: 결제 기능 연동
    alert(`${selectedAmount.toLocaleString()}원 충전 기능은 준비중입니다.`);
  };

  return (
    <div className={styles.pointChargeContainer}>
      <div className={styles.container}>
        <h1>포인트 충전</h1>

        <div className={styles.pointSection}>
          <div className={styles.currentPoint}>
            <span className={styles.label}>현재 보유 포인트</span>
            <span className={styles.value}>0 P</span>
          </div>

          <div className={styles.chargeOptions}>
            <h3>충전 금액 선택</h3>
            <div className={styles.chargeButtons}>
              {[10000, 30000, 50000, 100000].map((amount) => (
                <button
                  key={amount}
                  className={`${styles.chargeButton} ${selectedAmount === amount ? styles.selected : ''}`}
                  onClick={() => setSelectedAmount(amount)}
                >
                  {amount.toLocaleString()}원
                </button>
              ))}
            </div>
          </div>

          <button
            className={styles.confirmButton}
            onClick={handleCharge}
          >
            충전하기
          </button>
        </div>
      </div>
    </div>
  );
}
