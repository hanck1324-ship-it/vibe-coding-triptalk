"use client";

import { useParams } from "next/navigation";

export const usePurchaseDetail = () => {
  const params = useParams();
  const id = params.id as string;

  // TODO: 숙박권 상세 정보 로드

  return {
    accommodation: null,
    loading: false,
  };
};

