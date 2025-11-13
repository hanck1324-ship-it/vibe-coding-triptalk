"use client";

import { Input, Button, Rate } from "antd";
import styles from "./styles.module.css";
import { useCommentWrite } from "./hook";
import Image from "next/image";
import profileImage from "@/assets/icons/profile_image.png";

const { TextArea } = Input;

interface CommentWriteProps {
  accommodationId: string;
  onSuccess?: () => void;
}

export default function CommentWrite({ accommodationId, onSuccess }: CommentWriteProps) {
  const {
    rating,
    content,
    isSubmitting,
    errorMessage,
    isFormValid,
    handleRatingChange,
    handleContentChange,
    handleSubmit,
    handleCancel,
  } = useCommentWrite({ accommodationId, onSuccess });

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {/* 작성자 정보 영역 */}
        <div className={styles.authorSection}>
          <Image
            src={profileImage}
            alt="프로필"
            width={32}
            height={32}
            className={styles.profileImage}
          />
          <span className={styles.authorName}>홍길동</span>
          {/* TODO: 실제 사용자 정보로 교체 */}
        </div>

        {/* 평점 입력 영역 */}
        <div className={styles.ratingSection}>
          <label className={styles.label}>평점</label>
          <Rate
            value={rating}
            onChange={handleRatingChange}
            className={styles.rateComponent}
          />
          <span className={styles.ratingText}>{rating}점</span>
        </div>

        {/* 리뷰 내용 입력 영역 */}
        <div className={styles.contentSection}>
          <label className={styles.label}>
            리뷰 내용 <span className={styles.required}>*</span>
          </label>
          <TextArea
            value={content}
            onChange={handleContentChange}
            placeholder="숙소에 대한 솔직한 후기를 남겨주세요"
            autoSize={{ minRows: 5, maxRows: 10 }}
            className={styles.textarea}
            disabled={isSubmitting}
          />
          <div className={styles.charCount}>
            {content.length}/500자
          </div>
        </div>

        {/* 에러 메시지 */}
        {errorMessage && (
          <div className={styles.errorMessage}>{errorMessage}</div>
        )}

        {/* 버튼 영역 */}
        <div className={styles.buttonSection}>
          <Button
            onClick={handleCancel}
            disabled={isSubmitting}
            className={styles.cancelButton}
          >
            취소
          </Button>
          <Button
            type="primary"
            onClick={handleSubmit}
            disabled={!isFormValid || isSubmitting}
            loading={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
          </Button>
        </div>
      </div>
    </div>
  );
}


