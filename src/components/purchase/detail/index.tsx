"use client";

import styles from "./styles.module.css";
import { usePurchaseDetail } from "./hook";

export default function PurchaseDetail() {
  const { accommodation, loading } = usePurchaseDetail();

  if (loading) {
    return <div className={styles.loading}>숙박권 정보를 불러오는 중입니다...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>숙박권 상세</h1>
        {/* TODO: 상세 페이지 UI 구현 */}
      </div>
    </div>
  );
}

