"use client";

import { useState } from "react";

interface IAccommodation {
  id: string;
  title: string;
  price: number;
  image: string;
}

export const useAccommodationDetail = (id: string) => {
  // TODO: 실제로는 API에서 가져오기
  const [accommodation] = useState<IAccommodation>({
    id: id || "1",
    title: "제주 오션뷰 펜션",
    price: 120000,
    image: "https://via.placeholder.com/400x300",
  });

  // TODO: 실제로는 API에서 사용자 포인트 가져오기
  const [currentPoint] = useState(50000);

  const [loading] = useState(false);

  const requiredPoint = accommodation?.price || 0;

  return {
    accommodation,
    currentPoint,
    requiredPoint,
    loading,
  };
};
