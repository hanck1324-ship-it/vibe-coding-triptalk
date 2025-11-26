"use client";

import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { FETCH_TRAVELPRODUCT, DELETE_TRAVELPRODUCT } from "../queries";
import { FETCH_TRAVELPRODUCTS } from "@/components/purchase/list/queries";
import { FETCH_USER_LOGGED_IN } from "@/components/mypage/queries";
import type { Travelproduct } from "@/commons/graphql/graphql";

interface IAccommodation {
  id: string;
  title: string;
  price: number;
  image: string;
  address?: string;
  addressDetail?: string;
  latitude?: number;
  longitude?: number;
}

// Travelproduct를 IAccommodation으로 변환하는 헬퍼 함수
const transformTravelproduct = (product: Travelproduct | undefined): IAccommodation | null => {
  if (!product) return null;

  console.log("====== GraphQL 원본 데이터 ======");
  console.log("전체 product:", product);
  console.log("images 배열:", product.images);
  console.log("첫 번째 이미지:", product.images?.[0]);
  console.log("============================");

  return {
    id: product._id,
    title: product.name,
    price: product.price || 0,
    image: product.images?.[0] || "/assets/images/openthesea.png",
    address: product.travelproductAddress?.address ?? undefined,
    addressDetail: product.travelproductAddress?.addressDetail ?? undefined,
    latitude: product.travelproductAddress?.lat ? Number(product.travelproductAddress.lat) : undefined,
    longitude: product.travelproductAddress?.lng ? Number(product.travelproductAddress.lng) : undefined,
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

  // 여행 상품 삭제 mutation
  const [deleteTravelproduct, { loading: deleteLoading }] = useMutation(DELETE_TRAVELPRODUCT, {
    update(cache, { data }) {
      if (!data?.deleteTravelproduct) return;

      // FETCH_TRAVELPRODUCTS 캐시에서 삭제된 상품 제거
      const existingData = cache.readQuery<{ fetchTravelproducts: Travelproduct[] }>({
        query: FETCH_TRAVELPRODUCTS,
      });

      if (existingData?.fetchTravelproducts) {
        cache.writeQuery({
          query: FETCH_TRAVELPRODUCTS,
          data: {
            fetchTravelproducts: existingData.fetchTravelproducts.filter(
              (product) => product._id !== id
            ),
          },
        });
      }

      // 상세 페이지 캐시도 제거
      cache.evict({
        id: cache.identify({ __typename: 'Travelproduct', _id: id }),
      });
      cache.gc();
    },
  });

  const travelproduct: Travelproduct | undefined = travelproductData?.fetchTravelproduct;
  const accommodation = transformTravelproduct(travelproduct);
  const currentPoint = userData?.fetchUserLoggedIn?.userPoint?.amount || 0;
  const requiredPoint = accommodation?.price || 0;
  const loading = travelproductLoading || userLoading;

  // 삭제 핸들러
  const handleDelete = async () => {
    if (!window.confirm('정말 이 상품을 삭제하시겠습니까?')) {
      return false;
    }

    try {
      await deleteTravelproduct({
        variables: { travelproductId: id },
      });
      alert('상품이 삭제되었습니다.');
      return true;
    } catch (error: any) {
      console.error('삭제 실패:', error);
      alert(error.message || '상품 삭제 중 오류가 발생했습니다.');
      return false;
    }
  };

  return {
    accommodation,
    currentPoint,
    requiredPoint,
    loading,
    travelproduct, // 원본 데이터도 반환 (필요한 경우 사용)
    handleDelete,
    deleteLoading,
  };
};
