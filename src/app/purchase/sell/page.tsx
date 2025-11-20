import { Suspense } from "react";
import PurchaseSell from "@/components/purchase/sell";

export default function PurchaseSellPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PurchaseSell />
    </Suspense>
  );
}

