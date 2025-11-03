"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import styles from "./styles.module.css";

export default function MyPage() {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "profile";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tab = searchParams.get("tab");
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <h1>마이 페이지</h1>

        {/* 탭 메뉴 */}
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "profile" ? styles.active : ""}`}
            onClick={() => setActiveTab("profile")}
          >
            프로필
          </button>
          <button
            className={`${styles.tab} ${activeTab === "point" ? styles.active : ""}`}
            onClick={() => setActiveTab("point")}
          >
            포인트 충전
          </button>
          <button
            className={`${styles.tab} ${activeTab === "history" ? styles.active : ""}`}
            onClick={() => setActiveTab("history")}
          >
            구매 내역
          </button>
        </div>

        {/* 탭 컨텐츠 */}
        <div className={styles.tabContent}>
          {activeTab === "profile" && (
            <div className={styles.section}>
              <h2>프로필 정보</h2>
              {/* TODO: 프로필 정보 UI */}
              <p>프로필 정보를 표시합니다.</p>
            </div>
          )}

          {activeTab === "point" && (
            <div className={styles.section}>
              <h2>포인트 충전</h2>
              <div className={styles.pointSection}>
                <div className={styles.currentPoint}>
                  <span className={styles.label}>현재 보유 포인트</span>
                  <span className={styles.value}>0 P</span>
                </div>

                <div className={styles.chargeOptions}>
                  <h3>충전 금액 선택</h3>
                  <div className={styles.chargeButtons}>
                    <button className={styles.chargeButton}>10,000원</button>
                    <button className={styles.chargeButton}>30,000원</button>
                    <button className={styles.chargeButton}>50,000원</button>
                    <button className={styles.chargeButton}>100,000원</button>
                  </div>
                </div>

                <button className={styles.confirmButton}>
                  충전하기
                </button>
              </div>
            </div>
          )}

          {activeTab === "history" && (
            <div className={styles.section}>
              <h2>구매 내역</h2>
              {/* TODO: 구매 내역 UI */}
              <p>구매 내역을 표시합니다.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


