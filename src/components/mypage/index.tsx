"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import { useMyPage } from "./hook";
import profileImage from "@/assets/icons/profile_image.png";
import MyPageNavigation, { MyPageTab } from "./navigation";
import PointCharge from "./point-charge";

export default function MyPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = (searchParams.get("tab") as MyPageTab) || "profile";
  const [activeTab, setActiveTab] = useState<MyPageTab>(initialTab);
  const { user, userPoint, loading, error } = useMyPage();

  const handleTabChange = (tab: MyPageTab) => {
    setActiveTab(tab);
    router.push(`/myPage?tab=${tab}`);
  };

  useEffect(() => {
    const tab = searchParams.get("tab") as MyPageTab;
    if (tab) {
      setActiveTab(tab);
    }
  }, [searchParams]);

  // 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  useEffect(() => {
    if (!loading && error) {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        router.push("/login");
      }
    }
  }, [loading, error, router]);

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
        <h1>마이 페이지</h1>

        {/* 네비게이션 */}
        <MyPageNavigation activeTab={activeTab} onTabChange={handleTabChange} />

        {/* 탭 컨텐츠 */}
        <div className={styles.tabContent}>
          {activeTab === "profile" && (
            <div className={styles.section}>
              <div className={styles.profileCard}>
                <div className={styles.profileImageWrapper}>
                  <Image
                    src={user.picture || profileImage}
                    alt="프로필 이미지"
                    width={120}
                    height={120}
                    className={styles.profileImage}
                  />
                </div>
                <div className={styles.profileInfo}>
                  <h2 className={styles.profileName}>{user.name}</h2>
                  <p className={styles.profileEmail}>{user.email}</p>
                  <div className={styles.profilePoint}>
                    <span className={styles.pointLabel}>보유 포인트</span>
                    <span className={styles.pointValue}>
                      {userPoint.toLocaleString()} P
                    </span>
                  </div>
                  <div className={styles.profileMeta}>
                    <span>가입일: {new Date(user.createdAt).toLocaleDateString("ko-KR")}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "point" && (
            <div className={styles.section}>
              <PointCharge />
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


