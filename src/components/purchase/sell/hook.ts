"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_TRAVELPRODUCT, UPDATE_TRAVELPRODUCT, UPLOAD_FILE, FETCH_TRAVELPRODUCT_FOR_EDIT } from "./queries";

export const usePurchaseSell = (isEdit: boolean = false) => {
  const router = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();
  const travelproductId = params?.travelproductId as string;

  // GraphQL 뮤테이션
  const [uploadFile] = useMutation(UPLOAD_FILE);
  const [createTravelproduct] = useMutation(CREATE_TRAVELPRODUCT);
  const [updateTravelproduct] = useMutation(UPDATE_TRAVELPRODUCT);

  // 수정 모드일 때 기존 데이터 로드
  const { data } = useQuery(FETCH_TRAVELPRODUCT_FOR_EDIT, {
    variables: { travelproductId },
    skip: !isEdit || !travelproductId,
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

  // 태그 상태
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");

  // 이미지 상태 (File 객체 배열 + 미리보기 URL 배열)
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  // 수정 모드: 기존 이미지 URL 저장
  const [existingImageUrls, setExistingImageUrls] = useState<string[]>([]);

  // 폼 유효성
  const [isFormValid, setIsFormValid] = useState(false);

  // 게시글에서 전달된 데이터로 폼 초기화 (쿼리 파라미터)
  useEffect(() => {
    if (!isEdit) {
      const boardId = searchParams.get("boardId");
      if (boardId) {
        // 게시글 데이터를 쿼리 파라미터에서 읽어서 폼에 자동 입력
        const title = searchParams.get("title");
        const contents = searchParams.get("contents");
        const zipcodeParam = searchParams.get("zipcode");
        const addressParam = searchParams.get("address");
        const addressDetailParam = searchParams.get("addressDetail");
        const latitudeParam = searchParams.get("latitude");
        const longitudeParam = searchParams.get("longitude");

        if (title) setProductName(title);
        if (contents) {
          // contents를 summary와 description으로 분리
          // 첫 줄을 summary로, 나머지를 description으로
          const lines = contents.split("\n");
          if (lines.length > 0) {
            setSummary(lines[0].substring(0, 100)); // 첫 줄 최대 100자
            setDescription(contents);
          } else {
            setDescription(contents);
          }
        }
        if (zipcodeParam) setZipcode(zipcodeParam);
        if (addressParam) setAddress(addressParam);
        if (addressDetailParam) setAddressDetail(addressDetailParam);
        if (latitudeParam) setLatitude(latitudeParam);
        if (longitudeParam) setLongitude(longitudeParam);
      }
    }
  }, [isEdit, searchParams]);

  // 수정 모드일 때 초기값 설정
  useEffect(() => {
    if (isEdit && data?.fetchTravelproduct) {
      const product = data.fetchTravelproduct;
      setProductName(product.name || "");
      setSummary(product.remarks || "");
      setDescription(product.contents || "");
      setPrice(product.price?.toString() || "");
      setZipcode(product.travelproductAddress?.zipcode || "");
      setAddress(product.travelproductAddress?.address || "");
      setAddressDetail(product.travelproductAddress?.addressDetail || "");
      setLatitude(product.travelproductAddress?.lat?.toString() || "");
      setLongitude(product.travelproductAddress?.lng?.toString() || "");

      // 기존 이미지 URL 설정
      if (product.images && product.images.length > 0) {
        setExistingImageUrls(product.images);
      }

      // 기존 태그 설정
      if (product.tags && product.tags.length > 0) {
        setTags(product.tags);
      }
    }
  }, [isEdit, data]);

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

  // 태그 입력 핸들러
  const onChangeTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  // 태그 추가 핸들러
  const onAddTag = () => {
    const trimmedTag = tagInput.trim();
    if (!trimmedTag) return;

    // 중복 체크
    if (tags.includes(trimmedTag)) {
      alert("이미 추가된 태그입니다.");
      return;
    }

    // 최대 10개 제한
    if (tags.length >= 10) {
      alert("태그는 최대 10개까지 추가할 수 있습니다.");
      return;
    }

    setTags((prev) => [...prev, trimmedTag]);
    setTagInput("");
  };

  // 태그 삭제 핸들러
  const onRemoveTag = (tagToRemove: string) => {
    setTags((prev) => prev.filter((tag) => tag !== tagToRemove));
  };

  // 엔터키로 태그 추가
  const onTagInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onAddTag();
    }
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

    try {
      // 파일 검증 통과 후 미리보기 URL 생성
      const previewUrl = URL.createObjectURL(file);
      
      // File 객체 배열에 추가
      setImageFiles((prev) => [...prev, file]);
      
      // 미리보기 URL 배열에 추가
      setPreviewUrls((prev) => [...prev, previewUrl]);
    } catch (error) {
      console.error("미리보기 URL 생성 실패:", error);
      alert("이미지 미리보기 생성에 실패했습니다. 다시 시도해주세요.");
      return;
    }

    // input 초기화 (같은 파일 재선택 가능하도록)
    e.target.value = "";
  };

  // 이미지 삭제 핸들러
  const onImageRemove = (index: number) => {
    // 유효한 인덱스 확인
    if (index < 0 || index >= previewUrls.length) {
      console.warn("유효하지 않은 이미지 인덱스:", index);
      return;
    }

    // 메모리 해제 (삭제된 이미지의 URL 즉시 해제)
    const urlToRevoke = previewUrls[index];
    if (urlToRevoke) {
      try {
        URL.revokeObjectURL(urlToRevoke);
      } catch (error) {
        console.error("URL 해제 실패:", error);
      }
    }

    // File 배열에서 제거
    setImageFiles((prev) => prev.filter((_, i) => i !== index));

    // URL 배열에서 제거 (상태 동기화 보장)
    setPreviewUrls((prev) => prev.filter((_, i) => i !== index));
  };

  // 기존 이미지 삭제 핸들러 (수정 모드)
  const onExistingImageRemove = (index: number) => {
    setExistingImageUrls((prev) => prev.filter((_, i) => i !== index));
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
    if (!isFormValid) return;

    try {
      console.log("여행 상품 등록 시작...");

      // 1. 이미지 업로드
      let imageUrls: string[] = [];
      if (imageFiles.length > 0) {
        console.log(`${imageFiles.length}개의 이미지 업로드 중...`);

        const uploadPromises = imageFiles.map(async (file) => {
          try {
            const result = await uploadFile({
              variables: { file },
            });
            return result.data?.uploadFile?.url || "";
          } catch (error) {
            console.error("이미지 업로드 실패:", error);
            throw new Error("이미지 업로드에 실패했습니다.");
          }
        });

        imageUrls = await Promise.all(uploadPromises);
        console.log("이미지 업로드 완료:", imageUrls);
      }

      // 2. 여행 상품 등록
      const createTravelproductInput: any = {
        name: productName,
        remarks: summary,
        contents: description,
        price: Number(price),
      };

      // 이미지 URL 추가
      if (imageUrls.length > 0) {
        createTravelproductInput.images = imageUrls;
      }

      // 태그 추가
      if (tags.length > 0) {
        createTravelproductInput.tags = tags;
      }

      // 주소 정보 추가
      if (address) {
        createTravelproductInput.travelproductAddress = {
          zipcode: zipcode || "",
          address: address || "",
          addressDetail: addressDetail || "",
          lat: latitude ? parseFloat(latitude) : undefined,
          lng: longitude ? parseFloat(longitude) : undefined,
        };
      }

      console.log("여행 상품 등록 요청:", createTravelproductInput);

      const result = await createTravelproduct({
        variables: { createTravelproductInput },
      });

      if (result.data?.createTravelproduct) {
        console.log("여행 상품 등록 완료:", result.data.createTravelproduct);
        alert("숙박권 판매 등록이 완료되었습니다!");
        router.push("/purchase");
      }
    } catch (error: any) {
      console.error("여행 상품 등록 에러:", error);

      let errorMessage = "상품 등록에 실패했습니다.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        errorMessage = error.graphQLErrors[0].message;
      } else if (error.networkError) {
        errorMessage = "네트워크 오류가 발생했습니다.";
      }

      alert(errorMessage);
    }
  };

  // 수정 버튼 클릭 핸들러
  const onClickUpdate = async () => {
    if (!isFormValid) return;

    try {
      console.log("여행 상품 수정 시작...");

      // 1. 새로운 이미지 업로드
      let newImageUrls: string[] = [];
      if (imageFiles.length > 0) {
        console.log(`${imageFiles.length}개의 새 이미지 업로드 중...`);

        const uploadPromises = imageFiles.map(async (file) => {
          try {
            const result = await uploadFile({
              variables: { file },
            });
            return result.data?.uploadFile?.url || "";
          } catch (error) {
            console.error("이미지 업로드 실패:", error);
            throw new Error("이미지 업로드에 실패했습니다.");
          }
        });

        newImageUrls = await Promise.all(uploadPromises);
        console.log("새 이미지 업로드 완료:", newImageUrls);
      }

      // 2. 전체 이미지 URL 배열 (기존 + 새로운)
      const allImageUrls = [...existingImageUrls, ...newImageUrls];

      // 3. 여행 상품 수정
      const updateTravelproductInput: any = {
        name: productName,
        remarks: summary,
        contents: description,
        price: Number(price),
      };

      // 이미지 URL 추가
      if (allImageUrls.length > 0) {
        updateTravelproductInput.images = allImageUrls;
      }

      // 태그 추가
      if (tags.length > 0) {
        updateTravelproductInput.tags = tags;
      }

      // 주소 정보 추가
      if (address) {
        updateTravelproductInput.travelproductAddress = {
          zipcode: zipcode || "",
          address: address || "",
          addressDetail: addressDetail || "",
          lat: latitude ? parseFloat(latitude) : undefined,
          lng: longitude ? parseFloat(longitude) : undefined,
        };
      }

      console.log("여행 상품 수정 요청:", updateTravelproductInput);

      const result = await updateTravelproduct({
        variables: {
          travelproductId,
          updateTravelproductInput,
        },
      });

      if (result.data?.updateTravelproduct) {
        console.log("여행 상품 수정 완료:", result.data.updateTravelproduct);
        alert("숙박권 수정이 완료되었습니다!");
        router.push(`/purchase/${travelproductId}`);
      }
    } catch (error: any) {
      console.error("여행 상품 수정 에러:", error);

      let errorMessage = "상품 수정에 실패했습니다.";

      if (error.message) {
        errorMessage = error.message;
      } else if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        errorMessage = error.graphQLErrors[0].message;
      } else if (error.networkError) {
        errorMessage = "네트워크 오류가 발생했습니다.";
      }

      alert(errorMessage);
    }
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

  // 컴포넌트 언마운트 시 모든 미리보기 URL 해제 (메모리 누수 방지)
  useEffect(() => {
    return () => {
      // cleanup 함수: 모든 생성된 임시 URL 해제
      previewUrls.forEach((url) => {
        if (url) {
          try {
            URL.revokeObjectURL(url);
          } catch (error) {
            console.error("URL 해제 실패:", error);
          }
        }
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
    existingImageUrls,

    // 태그 상태
    tags,
    tagInput,

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
    onExistingImageRemove,

    // 태그 핸들러
    onChangeTagInput,
    onAddTag,
    onRemoveTag,
    onTagInputKeyDown,

    // 주소 검색
    isPostcodeModalOpen,
    handleTogglePostcodeModal,
    handleCompletePostcode,
    handleSetCoordinates,

    // 제출
    onSubmit,
    onClickUpdate,
    isFormValid,
    handleCancel,

    // 수정 모드
    isEdit,
    data,
  };
};
