"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { useMyPage } from "./hook";
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

        <div className={styles.contentWrapper}>
          {/* 네비게이션 (왼쪽) */}
          <MyPageNavigation
            activeTab={activeTab}
            onTabChange={handleTabChange}
            userName={user.name}
            userPoint={userPoint}
          />

          {/* 탭 컨텐츠 (오른쪽) */}
          <div className={styles.tabContent}>
            {activeTab === "profile" && (
              <div className={styles.section}>
                {/* TODO: 피그마 디자인에 맞는 프로필 영역 구현 필요 */}
              </div>
            )}

            {activeTab === "point" && (
              <div className={styles.section}>
                <PointCharge />
              </div>
            )}

            {activeTab === "history" && (
              <div className={styles.section}>
                {/* TODO: 구매 내역 UI */}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


