"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  
  useEffect(() => {
    router.replace("/login?mode=signup");
  }, [router]);

  return null;
}

