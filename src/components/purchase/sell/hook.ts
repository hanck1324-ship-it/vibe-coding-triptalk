"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useApolloClient } from "@apollo/client";
import { CREATE_TRAVELPRODUCT, UPLOAD_FILE } from "./queries";
import { FETCH_TRAVELPRODUCTS } from "@/components/purchase/list/queries";
import type { Travelproduct } from "@/commons/graphql/graphql";

export const usePurchaseSell = () => {
  const router = useRouter();
  const client = useApolloClient();

  // GraphQL mutations
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createTravelproduct, { loading: isSubmitting }] = useMutation(CREATE_TRAVELPRODUCT, {
    update(cache, { data }) {
      if (!data?.createTravelproduct) return;

      const newProduct = data.createTravelproduct;

      // FETCH_TRAVELPRODUCTS 캐시에 새로운 상품 추가
      try {
        const existingData = cache.readQuery<{ fetchTravelproducts: Travelproduct[] }>({
          query: FETCH_TRAVELPRODUCTS,
        });

        if (existingData?.fetchTravelproducts) {
          cache.writeQuery({
            query: FETCH_TRAVELPRODUCTS,
            data: {
              fetchTravelproducts: [newProduct, ...existingData.fetchTravelproducts],
            },
          });
        }
      } catch (error) {
        console.log("캐시에 FETCH_TRAVELPRODUCTS 데이터가 없습니다. 첫 등록일 수 있습니다.");
      }
    },
  });

  // 폼 상태
  const [productName, setProductName] = useState("");
  const [summary, setSummary] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");

  // 이미지 상태 (File 객체 배열 + 미리보기 URL 배열)
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // 폼 유효성
  const [isFormValid, setIsFormValid] = useState(false);

  // 폼 입력 핸들러
  const onChangeProductName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProductName(e.target.value);
  };

  const onChangeSummary = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSummary(e.target.value);
  };

  const onChangeDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const onChangePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const onChangeAddressDetail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressDetail(e.target.value);
  };

  const onChangeLatitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLatitude(e.target.value);
  };

  const onChangeLongitude = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLongitude(e.target.value);
  };

  // 이미지 추가 핸들러
  const onImageAdd = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 파일 타입 검증 (JPG, JPEG, PNG, WebP)
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type)) {
      alert("JPG, JPEG, PNG, WebP 형식의 이미지만 업로드 가능합니다.");
      return;
    }

    // 파일 크기 검증 (5MB 이하)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      alert("이미지 크기는 5MB 이하여야 합니다.");
      return;
    }

    // 최대 5개 제한
    if (imageFiles.length >= 5) {
      alert("이미지는 최대 5개까지 업로드할 수 있습니다.");
      return;
    }

    // File 객체 배열에 추가
    setImageFiles((prev) => [...prev, file]);

    // 미리보기 URL 생성 및 추가
    const previewUrl = URL.createObjectURL(file);
    setPreviewUrls((prev) => [...prev, previewUrl]);

    // input 초기화 (같은 파일 재선택 가능하도록)
    e.target.value = "";
  };

  // 이미지 삭제 핸들러
  const onImageRemove = (index: number) => {
    // 메모리 해제
    URL.revokeObjectURL(previewUrls[index]);

    // File 배열에서 제거
    setImageFiles((prev) => prev.filter((_, i) => i !== index));

    // URL 배열에서 제거
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // 주소 검색 모달 상태
  const [isPostcodeModalOpen, setIsPostcodeModalOpen] = useState(false);

  // 주소 검색 모달 토글
  const handleTogglePostcodeModal = () => {
    setIsPostcodeModalOpen((prev) => !prev);
  };

  // 주소 검색 완료 핸들러
  const handleCompletePostcode = (data: any) => {
    console.log("주소 검색 완료:", data);
    
    setZipcode(data.zonecode);
    setAddress(data.address);
    setIsPostcodeModalOpen(false);
    
    // DaumMap 컴포넌트에서 자동으로 좌표를 설정해줌
    // onCoordinatesChange 콜백을 통해 handleSetCoordinates가 호출됨
    
    // API가 작동하지 않을 경우를 대비한 기본 좌표 (2초 후에도 좌표 없으면 설정)
    setTimeout(() => {
      if (!latitude && !longitude && data.address) {
        console.warn("좌표 자동 입력 실패, 기본 좌표 사용");
        setLatitude("37.5665");
        setLongitude("126.9780");
      }
    }, 2000);
  };

  // 위도/경도 설정 핸들러
  const handleSetCoordinates = (lat: string, lng: string) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  // 취소 버튼 클릭 핸들러
  const handleCancel = () => {
    router.back();
  };

  // 등록 버튼 클릭 핸들러
  const onSubmit = async () => {
    if (!isFormValid || isSubmitting) return;

    try {
      // 1. 이미지 업로드 (Promise.all로 동시 업로드)
      console.log("🚀 [Upload Start] 이미지 동시 업로드 시작:", imageFiles.length, "개");

      const uploadPromises = imageFiles.map(async (file) => {
        try {
          console.log("📤 업로드 중:", file.name, "| 크기:", file.size, "| 타입:", file.type);

          const result = await uploadFile({
            variables: { file },
          });

          if (result.data?.uploadFile?.url) {
            console.log("✅ 업로드 성공:", file.name, "->", result.data.uploadFile.url);
            return result.data.uploadFile.url;
          }

          throw new Error(`이미지 URL이 없습니다: ${file.name}`);
        } catch (error) {
          console.error("❌ 이미지 업로드 실패:", file.name, error);
          throw error;
        }
      });

      const uploadedImageUrls = await Promise.all(uploadPromises);
      console.log("✅ [Upload Complete] 모든 이미지 업로드 완료:", uploadedImageUrls.length, "개");

      // 2. 여행 상품 등록
      console.log("📤 상품 등록 전송 데이터:");
      console.log("  - 업로드된 이미지 URLs:", uploadedImageUrls);
      console.log("  - images 배열 길이:", uploadedImageUrls.length);

      // 디버깅: 이미지 URL 확인
      if (uploadedImageUrls.length === 0) {
        alert("⚠️ 이미지 업로드 실패!\n이미지가 업로드되지 않았습니다.");
        return;
      }

      const { data } = await createTravelproduct({
        variables: {
          createTravelproductInput: {
            name: productName,
            remarks: summary,
            contents: description,
            price: parseInt(price),
            images: uploadedImageUrls,
            travelproductAddress: {
              zipcode,
              address,
              addressDetail,
              lat: parseFloat(latitude),
              lng: parseFloat(longitude),
            },
          },
        },
      });

      console.log("✅ 상품 등록 응답:", data?.createTravelproduct);

      if (data?.createTravelproduct?._id) {
        alert("상품이 등록되었습니다!");
        router.push("/products/list");
      }
    } catch (error: any) {
      console.error("등록 실패:", error);
      alert(error.message || "등록 중 오류가 발생했습니다.");
    }
  };

  // 폼 유효성 검증
  useEffect(() => {
    const isValid =
      productName.trim() !== "" &&
      summary.trim() !== "" &&
      description.trim().length >= 20 &&
      price.trim() !== "" &&
      address.trim() !== "" &&
      imageFiles.length > 0;

    setIsFormValid(isValid);
  }, [productName, summary, description, price, address, imageFiles]);

  // 컴포넌트 언마운트 시 모든 미리보기 URL 해제
  useEffect(() => {
    return () => {
      previewUrls.forEach((url) => {
        URL.revokeObjectURL(url);
      });
    };
  }, [previewUrls]);

  return {
    // 폼 상태
    productName,
    summary,
    description,
    price,
    address,
    addressDetail,
    zipcode,
    latitude,
    longitude,

    // 이미지 상태
    imageFiles,
    previewUrls,

    // 폼 핸들러
    onChangeProductName,
    onChangeSummary,
    onChangeDescription,
    onChangePrice,
    onChangeAddressDetail,
    onChangeLatitude,
    onChangeLongitude,

    // 이미지 핸들러
    onImageAdd,
    onImageRemove,

    // 주소 검색
    isPostcodeModalOpen,
    handleTogglePostcodeModal,
    handleCompletePostcode,
    handleSetCoordinates,

    // 제출
    onSubmit,
    isFormValid,
    isSubmitting,
    handleCancel,
  };
};
