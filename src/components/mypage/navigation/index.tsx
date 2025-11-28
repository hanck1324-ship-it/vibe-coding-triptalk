"use client";

import styles from "./styles.module.css";
import Image from "next/image";
import profileImage from "@/assets/icons/profile_image.png";
import pointIcon from "@/assets/icons/point.png";
import rightArrowIcon from "@/assets/icons/right_arrow.png";

export type MyPageTab = "profile" | "point" | "history";

interface INavigationProps {
  activeTab: MyPageTab;
  onTabChange: (tab: MyPageTab) => void;
  userName?: string;
  userPoint?: number;
}

export default function MyPageNavigation({
  activeTab,
  onTabChange,
  userName = "사용자",
  userPoint = 0,
}: INavigationProps) {
  return (
    <div className={styles.myPageContainer}>
      <div className={styles.infoWrapper}>
        <div className={styles.infoSection}>
          <div className={styles.profileSection}>
            <Image
              src={profileImage}
              alt="프로필"
              width={32}
              height={32}
              className={styles.profileImage}
            />
            <span className={styles.profileName}>{userName}</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.pointSection}>
            <Image
              src={pointIcon}
              alt="포인트"
              width={20}
              height={20}
              className={styles.pointIcon}
            />
            <span className={styles.pointValue}>{userPoint.toLocaleString()} P</span>
          </div>

          <div className={styles.divider} />

          <div className={styles.menuSection}>
            <button
              className={`${styles.menuItem} ${activeTab === "history" ? styles.active : ""}`}
              onClick={() => onTabChange("history")}
            >
              <span className={styles.menuItemText}>거래내역&북마크</span>
              <Image
                src={rightArrowIcon}
                alt="화살표"
                width={16}
                height={16}
                className={styles.menuItemArrow}
              />
            </button>

            <button
              className={`${styles.menuItem} ${activeTab === "point" ? styles.active : ""}`}
              onClick={() => onTabChange("point")}
            >
              <span className={styles.menuItemText}>포인트 사용 내역</span>
              <Image
                src={rightArrowIcon}
                alt="화살표"
                width={16}
                height={16}
                className={styles.menuItemArrow}
              />
            </button>

            <button
              className={`${styles.menuItem} ${activeTab === "profile" ? styles.active : ""}`}
              onClick={() => onTabChange("profile")}
            >
              <span className={styles.menuItemText}>비밀번호 변경</span>
              <Image
                src={rightArrowIcon}
                alt="화살표"
                width={16}
                height={16}
                className={styles.menuItemArrow}
              />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
