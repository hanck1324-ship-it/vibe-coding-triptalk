"use client";

import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_TRAVELPRODUCT } from "../queries";
import { FETCH_USER_LOGGED_IN } from "@/components/mypage/queries";
import type { Travelproduct } from "@/commons/graphql/graphql";

interface IAccommodation {
  id: string;
  title: string;
  price: number;
  image: string;
  lat?: number;
  lng?: number;
  address?: string;
}

// 이미지 URL 검증 및 fallback 처리
const getValidImageUrl = (imageUrl?: string | null): string => {
  if (!imageUrl || imageUrl.trim() === '') {
    return "/assets/images/openthesea.png";
  }

  const trimmedUrl = imageUrl.trim();

  try {
    // 상대 경로인 경우 그대로 반환
    if (trimmedUrl.startsWith('/')) {
      return trimmedUrl;
    }

    // 절대 URL인 경우 URL 객체로 검증
    new URL(trimmedUrl);
    return trimmedUrl;
  } catch (e) {
    // 유효하지 않은 URL이면 fallback 이미지 사용
    console.warn(`Invalid image URL: ${trimmedUrl}`);
    return "/assets/images/openthesea.png";
  }
};

// Travelproduct를 IAccommodation으로 변환하는 헬퍼 함수
const transformTravelproduct = (product: Travelproduct | undefined): IAccommodation | null => {
  if (!product) return null;

  return {
    id: product._id,
    title: product.name,
    price: product.price || 0,
    image: getValidImageUrl(product.images?.[0]),
    lat: product.travelproductAddress?.lat || undefined,
    lng: product.travelproductAddress?.lng || undefined,
    address: product.travelproductAddress?.address || undefined,
  };
};

export const useAccommodationDetail = (id: string) => {
  // 여행 상품 상세 조회
  const { data: travelproductData, loading: travelproductLoading } = useQuery(FETCH_TRAVELPRODUCT, {
    variables: {
      travelproductId: id,
    },
    skip: !id,
    fetchPolicy: "cache-and-network",
  });

  // 사용자 포인트 조회
  const { data: userData, loading: userLoading } = useQuery(FETCH_USER_LOGGED_IN, {
    fetchPolicy: "cache-and-network",
  });

  const travelproduct: Travelproduct | undefined = travelproductData?.fetchTravelproduct;
  const accommodation = transformTravelproduct(travelproduct);
  const currentPoint = userData?.fetchUserLoggedIn?.userPoint?.amount || 0;
  const requiredPoint = accommodation?.price || 0;
  const loading = travelproductLoading || userLoading;

  return {
    accommodation,
    currentPoint,
    requiredPoint,
    loading,
    travelproduct, // 원본 데이터도 반환 (필요한 경우 사용)
  };
};
