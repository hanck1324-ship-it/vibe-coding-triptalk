"use client";

import styles from "./styles.module.css";
import { usePurchaseSell } from "./hook";

export default function PurchaseSell() {
  const {
    title,
    description,
    price,
    onChangeTitle,
    onChangeDescription,
    onChangePrice,
    onSubmit,
  } = usePurchaseSell();

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>숙박권 판매 등록</h1>
        {/* TODO: 판매 등록 폼 UI 구현 */}
      </div>
    </div>
  );
}

