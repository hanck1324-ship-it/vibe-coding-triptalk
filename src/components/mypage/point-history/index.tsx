"use client";

import styles from "./styles.module.css";
import { usePointChargeComponent } from "./hook";

export default function PointCharge() {
  const {
    // TODO: 피그마 디자인에 맞춰 필요한 상태와 핸들러 추가
  } = usePointChargeComponent();

  return (
    <div className={styles.pointChargeContainer}>
      <h2 className={styles.title}>포인트 충전</h2>

      {/* TODO: 피그마 디자인 기반으로 UI 구현 */}
      {/* 충전 금액 선택 버튼들 */}
      {/* 충전하기 버튼 */}
    </div>
  );
}
