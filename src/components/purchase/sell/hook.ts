"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export const usePurchaseSell = () => {
  const router = useRouter();

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
  const onSubmit = () => {
    if (!isFormValid) return;

    // FormData 생성
    const formData = new FormData();

    // 이미지 파일들 추가
    imageFiles.forEach((file) => {
      formData.append("images", file);
    });

    // 나머지 폼 데이터 추가
    formData.append("productName", productName);
    formData.append("summary", summary);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("zipcode", zipcode);
    formData.append("address", address);
    formData.append("addressDetail", addressDetail);
    formData.append("latitude", latitude);
    formData.append("longitude", longitude);

    // TODO: 실제 API 호출
    console.log("등록 데이터:", {
      productName,
      summary,
      description,
      price,
      zipcode,
      address,
      addressDetail,
      latitude,
      longitude,
      imageCount: imageFiles.length,
    });

    alert("등록이 완료되었습니다! (실제 API는 추후 연동 예정)");
  };

  // 폼 유효성 검증
  useEffect(() => {
    const isValid =
      productName.trim() !== "" &&
      summary.trim() !== "" &&
      description.trim().length >= 20 &&
      price.trim() !== "" &&
      address.trim() !== "";

    setIsFormValid(isValid);
  }, [productName, summary, description, price, address]);

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
    handleCancel,
  };
};
