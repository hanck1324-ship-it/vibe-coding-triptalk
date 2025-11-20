"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { useMyPage } from "./hook";
import profileImage from "@/assets/icons/profile_image.png";
import PointHistory from "./point-history";
import PasswordChange from "./password-Change";
import TransactionHistoryBookmarks from "./transaction-history & bookmarks";

export default function MyPage() {
  const { user, userPoint, loading, error } = useMyPage();
  const [activeMenu, setActiveMenu] = useState<
    "transaction" | "point-history" | "password-change" | null
  >(null);

  if (loading) {
    return (
      <div className={styles.mypageContainer}>
        <div className={styles.container}>
          <div className={styles.loading}>로딩 중...</div>
        </div>
      </div>
    );
  }

  if (error || !user) {
    return (
      <div className={styles.mypageContainer}>
        <div className={styles.container}>
          <div className={styles.error}>
            사용자 정보를 불러올 수 없습니다.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.mypageContainer}>
      <div className={styles.container}>
        {/* 상단 영역: 내 정보 영역 */}
        <div className={styles.topSection}>
          {/* 1. 내 정보 헤더: 프로필 이미지 + 이름 */}
          <div className={styles.profileHeader}>
            <div className={styles.profileImageWrapper}>
              <Image
                src={user.picture || profileImage}
                alt="프로필 이미지"
                width={120}
                height={120}
                className={styles.profileImage}
              />
            </div>
            <div className={styles.profileName}>{user.name}</div>
          </div>

          {/* 2. 포인트 영역: 보유 포인트 표시 (구분선으로 분리) */}
          <div className={styles.divider}></div>
          <div className={styles.pointArea}>
            <div className={styles.pointLabel}>보유 포인트</div>
            <div className={styles.pointValue}>
              {userPoint.toLocaleString()} P
            </div>
          </div>

          {/* 3. 메뉴 리스트 영역 (3개 메뉴) */}
          <div className={styles.divider}></div>
          <div className={styles.menuList}>
            <button
              className={`${styles.menuItem} ${
                activeMenu === "transaction" ? styles.active : ""
              }`}
              onClick={() => setActiveMenu("transaction")}
            >
              거래내역&북마크
            </button>
            <button
              className={`${styles.menuItem} ${
                activeMenu === "point-history" ? styles.active : ""
              }`}
              onClick={() => setActiveMenu("point-history")}
            >
              포인트 사용 내역
            </button>
            <button
              className={`${styles.menuItem} ${
                activeMenu === "password-change" ? styles.active : ""
              }`}
              onClick={() => setActiveMenu("password-change")}
            >
              비밀번호 변경
            </button>
          </div>
        </div>

        {/* 하단 영역: 가변 컨텐츠 (Dynamic Content) */}
        <div className={styles.bottomSection}>
          {activeMenu === "transaction" && (
            <TransactionHistoryBookmarks />
          )}
          {activeMenu === "point-history" && <PointHistory />}
          {activeMenu === "password-change" && <PasswordChange />}
          {!activeMenu && (
            <div className={styles.emptyState}>
              메뉴를 선택하면 내용이 표시됩니다.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


