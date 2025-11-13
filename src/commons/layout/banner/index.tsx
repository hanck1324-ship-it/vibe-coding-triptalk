"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import { useBanner } from "./hook";
import closeIcon from "@/assets/icons/close.png";

export default function Banner() {
  const { isVisible, handleClose } = useBanner();

  if (!isVisible) {
    return null;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.message}>
          🎉 특별 이벤트! 첫 숙박권 구매 시 10% 할인 혜택
        </div>
        <button className={styles.closeButton} onClick={handleClose}>
          <Image
            src={closeIcon}
            alt="닫기"
            width={16}
            height={16}
          />
        </button>
      </div>
    </div>
  );
}

