"use client";

import { useState, useEffect } from "react";

export function useBanner() {
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // SSR 오류 방지를 위한 브라우저 환경 확인
    if (typeof window !== "undefined") {
      const bannerClosed = localStorage.getItem("bannerClosed");
      // localStorage에 값이 없으면 true (표시), "true"가 있으면 false (숨김)
      setIsVisible(bannerClosed !== "true");
    }
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    if (typeof window !== "undefined") {
      localStorage.setItem("bannerClosed", "true");
    }
  };

  return { isVisible, handleClose };
}

