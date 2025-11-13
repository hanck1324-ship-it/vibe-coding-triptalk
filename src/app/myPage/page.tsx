"use client";

import { Suspense } from "react";
import MyPage from "@/components/mypage";

export default function MyPagePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyPage />
    </Suspense>
  );
}


