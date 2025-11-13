"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { FETCH_USER_LOGGED_IN } from "@/components/mypage/queries";

export const useNavigation = () => {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  // localStorage에서 토큰 확인 및 변경 감지
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("accessToken");
      setIsLoggedIn(!!token);
    };

    // 초기 확인
    checkToken();

    // storage 이벤트 리스너 (다른 탭에서의 변경 감지)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "accessToken") {
        checkToken();
      }
    };

    // 커스텀 이벤트 리스너 (같은 탭에서의 변경 감지)
    const handleCustomStorageChange = () => {
      checkToken();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("localStorageChange", handleCustomStorageChange);

    // 주기적으로 토큰 확인 (로그인 후 즉시 반영)
    const interval = setInterval(checkToken, 500);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("localStorageChange", handleCustomStorageChange);
      clearInterval(interval);
    };
  }, []);

  // 토큰이 있을 때만 사용자 정보 조회
  const { data, refetch } = useQuery(FETCH_USER_LOGGED_IN, {
    skip: !isLoggedIn,
    fetchPolicy: "cache-and-network", // 로그인 후 네트워크에서 가져오기
    notifyOnNetworkStatusChange: true,
  });

  const user = data?.fetchUserLoggedIn;

  // 로그인 상태가 변경되면 사용자 정보 refetch
  useEffect(() => {
    if (isLoggedIn && refetch) {
      refetch();
    }
  }, [isLoggedIn, refetch]);
  
  const onClickMenu = (path: string) => () => {
    router.push(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    // 커스텀 이벤트 발생 (같은 탭에서 변경 감지)
    window.dispatchEvent(new Event("localStorageChange"));
    setIsLoggedIn(false);
    router.push("/login");
  };

  return {
    onClickMenu,
    isLoggedIn,
    user,
    handleLogout,
  };
};