"use client";

import styles from "./styles.module.css";

export type MyPageTab = "profile" | "point" | "history";

interface INavigationProps {
  activeTab: MyPageTab;
  onTabChange: (tab: MyPageTab) => void;
}

export default function MyPageNavigation({
  activeTab,
  onTabChange,
}: INavigationProps) {
  return (
    <nav className={styles.navigation}>
      <button
        className={`${styles.navItem} ${activeTab === "profile" ? styles.active : ""}`}
        onClick={() => onTabChange("profile")}
      >
        프로필
      </button>
      <button
        className={`${styles.navItem} ${activeTab === "point" ? styles.active : ""}`}
        onClick={() => onTabChange("point")}
      >
        포인트 충전
      </button>
      <button
        className={`${styles.navItem} ${activeTab === "history" ? styles.active : ""}`}
        onClick={() => onTabChange("history")}
      >
        구매 내역
      </button>
    </nav>
  );
}
