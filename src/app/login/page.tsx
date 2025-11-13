"use client";

import { Suspense } from "react";
import Auth from "@/components/auth";

export default function LoginPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Auth />
    </Suspense>
  );
}


