"use client";

import { Rate, Button, Pagination } from "antd";
import { LikeOutlined, LikeFilled } from "@ant-design/icons";
import Image from "next/image";
import styles from "./styles.module.css";
import { useCommentList } from "./hook";

interface CommentListProps {
  accommodationId: string;
}

export default function CommentList({ accommodationId }: CommentListProps) {
  const {
    reviews,
    totalCount,
    averageRating,
    currentPage,
    sortBy,
    isLoading,
    pageSize,
    expandedReviews,
    handlePageChange,
    handleSortChange,
    handleLike,
    handleToggleExpand,
  } = useCommentList({ accommodationId });

  // 로딩 중
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loading}>리뷰를 불러오는 중입니다...</div>
      </div>
    );
  }

  // 리뷰 없음
  if (!isLoading && reviews.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.emptyState}>
          <p className={styles.emptyMessage}>아직 작성된 리뷰가 없습니다</p>
          <p className={styles.emptySubMessage}>첫 번째 리뷰를 남겨보세요!</p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* 리뷰 통계 영역 */}
      <div className={styles.statsSection}>
        <div className={styles.averageRating}>
          <span className={styles.ratingNumber}>{averageRating}</span>
          <Rate disabled value={averageRating} allowHalf className={styles.ratingStars} />
        </div>
        <div className={styles.totalCount}>전체 리뷰 {totalCount}개</div>
      </div>

      {/* 정렬 옵션 영역 */}
      <div className={styles.sortSection}>
        <button
          className={`${styles.sortButton} ${sortBy === "latest" ? styles.sortButtonActive : ""}`}
          onClick={() => handleSortChange("latest")}
        >
          최신순
        </button>
        <button
          className={`${styles.sortButton} ${sortBy === "highRating" ? styles.sortButtonActive : ""}`}
          onClick={() => handleSortChange("highRating")}
        >
          평점 높은순
        </button>
        <button
          className={`${styles.sortButton} ${sortBy === "lowRating" ? styles.sortButtonActive : ""}`}
          onClick={() => handleSortChange("lowRating")}
        >
          평점 낮은순
        </button>
      </div>

      {/* 리뷰 목록 */}
      <div className={styles.reviewList}>
        {reviews.map((review) => {
          const isExpanded = expandedReviews.has(review.id);
          const isLongContent = review.content.length > 150;
          const displayContent =
            isLongContent && !isExpanded ? review.content.slice(0, 150) + "..." : review.content;

          return (
            <div key={review.id} className={styles.reviewItem}>
              {/* 작성자 정보 */}
              <div className={styles.authorInfo}>
                <Image
                  src={review.author.profileImage}
                  alt={review.author.name}
                  width={40}
                  height={40}
                  className={styles.authorProfile}
                />
                <div className={styles.authorDetails}>
                  <span className={styles.authorName}>{review.author.name}</span>
                  <span className={styles.reviewDate}>{review.createdAt}</span>
                </div>
              </div>

              {/* 평점 */}
              <div className={styles.ratingSection}>
                <Rate disabled value={review.rating} className={styles.reviewRating} />
              </div>

              {/* 리뷰 내용 */}
              <div className={styles.contentSection}>
                <p className={styles.reviewContent}>{displayContent}</p>
                {isLongContent && (
                  <button
                    className={styles.moreButton}
                    onClick={() => handleToggleExpand(review.id)}
                  >
                    {isExpanded ? "접기" : "더보기"}
                  </button>
                )}
              </div>

              {/* 리뷰 이미지 (있으면) */}
              {review.images && review.images.length > 0 && (
                <div className={styles.imageGallery}>
                  {review.images.slice(0, 4).map((image, index) => (
                    <div key={index} className={styles.imageWrapper}>
                      <Image
                        src={image}
                        alt={`리뷰 이미지 ${index + 1}`}
                        width={100}
                        height={100}
                        className={styles.reviewImage}
                      />
                    </div>
                  ))}
                </div>
              )}

              {/* 액션 버튼 */}
              <div className={styles.actionSection}>
                <button
                  className={`${styles.likeButton} ${review.isLiked ? styles.likeButtonActive : ""}`}
                  onClick={() => handleLike(review.id)}
                >
                  {review.isLiked ? (
                    <LikeFilled className={styles.likeIcon} />
                  ) : (
                    <LikeOutlined className={styles.likeIcon} />
                  )}
                  <span>도움이 됐어요</span>
                  <span className={styles.likeCount}>{review.likeCount}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* 페이지네이션 */}
      {totalCount > pageSize && (
        <div className={styles.paginationSection}>
          <Pagination
            current={currentPage}
            total={totalCount}
            pageSize={pageSize}
            onChange={handlePageChange}
            showSizeChanger={false}
            className={styles.pagination}
          />
        </div>
      )}
    </div>
  );
}


