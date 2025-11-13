"use client";

import { useState } from "react";

interface UseCommentWriteProps {
  accommodationId: string;
  onSuccess?: () => void;
}

export const useCommentWrite = ({ accommodationId, onSuccess }: UseCommentWriteProps) => {
  // 상태 관리
  const [rating, setRating] = useState<number>(5); // 기본값 5점
  const [content, setContent] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  // 평점 변경
  const handleRatingChange = (value: number) => {
    setRating(value);
  };

  // 내용 변경
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    if (value.length <= 500) {
      setContent(value);
      setErrorMessage("");
    }
  };

  // Validation 체크
  const validateForm = (): boolean => {
    if (rating < 1) {
      setErrorMessage("평점을 선택해 주세요.");
      return false;
    }

    if (content.trim().length < 10) {
      setErrorMessage("리뷰 내용은 최소 10자 이상 입력해 주세요.");
      return false;
    }

    if (content.length > 500) {
      setErrorMessage("리뷰 내용은 최대 500자까지 입력 가능합니다.");
      return false;
    }

    return true;
  };

  // 리뷰 등록 실행
  const handleSubmit = async () => {
    // Validation
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      // TODO: 실제 API 호출
      // const response = await createReview({
      //   accommodationId,
      //   rating,
      //   content: content.trim(),
      // });

      // 임시: API 호출 시뮬레이션
      console.log("리뷰 등록 API 호출:", {
        accommodationId,
        rating,
        content: content.trim(),
      });

      // 성공 시뮬레이션 (2초 후)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 폼 초기화
      setRating(5);
      setContent("");

      // 성공 콜백 실행
      if (onSuccess) {
        onSuccess();
      }

      alert("리뷰가 등록되었습니다.");
    } catch (error) {
      console.error("리뷰 등록 실패:", error);
      setErrorMessage("리뷰 등록 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // 입력 내용 초기화
  const handleCancel = () => {
    setRating(5);
    setContent("");
    setErrorMessage("");
  };

  // 폼 유효성 (버튼 활성화 여부)
  const isFormValid = rating >= 1 && content.trim().length >= 10 && content.length <= 500;

  return {
    // 상태
    rating,
    content,
    isSubmitting,
    errorMessage,
    isFormValid,

    // 함수
    handleRatingChange,
    handleContentChange,
    handleSubmit,
    handleCancel,
    setRating,
    setContent,
  };
};


