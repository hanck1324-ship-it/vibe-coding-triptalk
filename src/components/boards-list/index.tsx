"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Modal } from "antd";
import styles from "./styles.module.css";
import { useBoardsList } from "./hook";
import { mockBoardCategories, getHotPosts } from "./mockData";

// 이미지 import
import beachImg from "@/assets/images/beach.png";
import cozyImg from "@/assets/images/cozy.jpg";
import magnificantImg from "@/assets/images/magnificant.png";
import opentheseaImg from "@/assets/images/openthesea.png";
import rectangleImg from "@/assets/images/Rectangle 3011.png";
import profileImg from "@/assets/icons/profile_image.png";
import trashIcon from "@/assets/icons/trashbin.png";

// 배너 이미지 (상수는 컴포넌트 외부로)
const BANNER_IMAGES = [
  beachImg,
  cozyImg,
  magnificantImg,
  opentheseaImg
];

export default function BoardsList() {
  const router = useRouter();
  const { boards, loading, page, onClickBoard, onClickPrevPage, onClickNextPage, onDeleteBoard } = useBoardsList();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteBoardId, setDeleteBoardId] = useState<string | null>(null);

  // 핫한 트립토크 게시글 (mockData 유지)
  const hotPosts = useMemo(() => getHotPosts().slice(0, 4), []);

  // 삭제 확인 모달 열기
  const handleDeleteClick = (e: React.MouseEvent, boardId: string) => {
    e.stopPropagation();
    setDeleteBoardId(boardId);
    setIsDeleteModalOpen(true);
  };

  // 삭제 확인
  const handleDeleteConfirm = async () => {
    if (deleteBoardId) {
      const success = await onDeleteBoard(deleteBoardId);
      if (success) {
        setIsDeleteModalOpen(false);
        setDeleteBoardId(null);
      }
    }
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeleteBoardId(null);
  };

  // 검색 필터링
  const filteredBoards = useMemo(() => {
    if (!searchKeyword) return boards;
    return boards.filter((board) =>
      board.title.toLowerCase().includes(searchKeyword.toLowerCase())
    );
  }, [searchKeyword, boards]);

  // 총 페이지 수 계산 (API는 페이지당 10개 반환)
  const totalPages = Math.max(1, Math.ceil(filteredBoards.length > 0 ? 10 : 1));

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prev) => (prev === 0 ? BANNER_IMAGES.length - 1 : prev - 1));
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex((prev) => (prev === BANNER_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const handleSearch = () => {
    // 검색은 클라이언트 사이드에서 처리
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  const handlePageClick = (pageNum: number) => {
    if (pageNum > page) {
      onClickNextPage();
    } else if (pageNum < page) {
      onClickPrevPage();
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleRegisterClick = () => {
    router.push("/boards/new");
  };

  return (
    <div className={styles.boardsListContainer}>
      {/* 1. 배너 이미지 캐러셀 */}
      <section className={styles.bannerSection}>
        <div className={styles.bannerContainer}>
          <Image
            src={BANNER_IMAGES[currentBannerIndex]}
            alt={`배너 이미지 ${currentBannerIndex + 1}`}
            className={styles.bannerImage}
            fill
            priority
            style={{ objectFit: "cover" }}
          />
          <button
            className={styles.bannerArrowLeft}
            onClick={handlePrevBanner}
            aria-label="이전 배너"
          >
            ‹
          </button>
          <button
            className={styles.bannerArrowRight}
            onClick={handleNextBanner}
            aria-label="다음 배너"
          >
            ›
          </button>
          <div className={styles.bannerIndicators}>
            {BANNER_IMAGES.map((_, index) => (
              <span
                key={index}
                className={`${styles.indicator} ${index === currentBannerIndex ? styles.indicatorActive : ""}`}
                onClick={() => setCurrentBannerIndex(index)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. 오늘 핫한 트립토크 섹션 */}
      <section className={styles.hotSection}>
        <h2 className={styles.hotTitle}>오늘 핫한 트립토크</h2>
        <div className={styles.hotCardsContainer}>
          {hotPosts.map((post) => {
            // 썸네일 이미지 매핑
            const thumbnailMap: { [key: string]: any } = {
              "/assets/images/beach.png": beachImg,
              "/assets/images/cozy.jpg": cozyImg,
              "/assets/images/magnificant.png": magnificantImg,
              "/assets/images/openthesea.png": opentheseaImg,
              "/assets/images/Rectangle 3011.png": rectangleImg,
            };
            const thumbnailSrc = post.thumbnailImage ? thumbnailMap[post.thumbnailImage] : null;

            return (
              <div key={post.id} className={styles.hotCard}>
                <div className={styles.hotCardThumbnail}>
                  {thumbnailSrc && (
                    <Image 
                      src={thumbnailSrc} 
                      alt={post.title}
                      width={112}
                      height={112}
                      style={{ objectFit: "cover" }}
                    />
                  )}
                </div>
                <div className={styles.hotCardContent}>
                  <h3 className={styles.hotCardTitle}>{post.title}</h3>
                  <p className={styles.hotCardAuthor}>{post.author.name}</p>
                  <div className={styles.hotCardStats}>
                    <span>👁️ {post.views}</span>
                    <span>❤️ {post.likes}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. 검색 영역 */}
      <section className={styles.searchSection}>
        <div className={styles.searchContainer}>
          <div className={styles.searchInputWrapper}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="제목을 검색해주세요."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSearch()}
            />
            <span className={styles.searchIcon}>🔍</span>
          </div>
          <button className={styles.searchButton} onClick={handleSearch}>
            검색
          </button>
          <button className={styles.registerButton} onClick={handleRegisterClick}>
            트립토크 등록
          </button>
        </div>
      </section>

      {/* 4. 카테고리 필터 */}
      <section className={styles.categorySection}>
        <div className={styles.categoryContainer}>
          {mockBoardCategories.map((category) => (
            <button
              key={category.id}
              className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.categoryButtonActive : ""}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.name} <span className={styles.categoryCount}>({category.count})</span>
            </button>
          ))}
        </div>
      </section>

      {/* 5. 게시판 테이블 */}
      <section className={styles.boardSection}>
        <table className={styles.boardTable}>
          <thead>
            <tr className={styles.tableHeader}>
              <th className={styles.columnNumber}>번호</th>
              <th className={styles.columnTitle}>제목</th>
              <th className={styles.columnAuthor}>작성자</th>
              <th className={styles.columnDate}>날짜</th>
              <th className={styles.columnViews}>조회수</th>
              <th className={styles.columnLikes}>좋아요</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                  로딩 중...
                </td>
              </tr>
            ) : filteredBoards.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '20px' }}>
                  게시글이 없습니다.
                </td>
              </tr>
            ) : (
              filteredBoards.map((board, index) => {
                const globalIndex = (page - 1) * 10 + index + 1;

                return (
                  <tr
                    key={board._id}
                    className={styles.tableRow}
                    onClick={() => onClickBoard(board._id)}
                  >
                    <td className={styles.columnNumber}>{globalIndex}</td>
                    <td className={styles.columnTitle}>
                      <span className={styles.postTitle}>{board.title}</span>
                      <button
                        className={styles.deleteIcon}
                        aria-label="삭제"
                        onClick={(e) => handleDeleteClick(e, board._id)}
                      >
                        <Image
                          src={trashIcon}
                          alt="삭제"
                          width={20}
                          height={20}
                        />
                      </button>
                    </td>
                    <td className={styles.columnAuthor}>{board.writer}</td>
                    <td className={styles.columnDate}>
                      {new Date(board.createdAt).toLocaleDateString()}
                    </td>
                    <td className={styles.columnViews}>-</td>
                    <td className={styles.columnLikes}>-</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </section>

      {/* 6. 페이지네이션 */}
      <section className={styles.paginationSection}>
        <div className={styles.paginationContainer}>
          <button
            className={styles.paginationArrow}
            onClick={onClickPrevPage}
            disabled={page === 1}
            aria-label="이전 페이지"
          >
            ‹
          </button>

          <button
            className={`${styles.paginationButton} ${styles.paginationButtonActive}`}
          >
            {page}
          </button>

          <button
            className={styles.paginationArrow}
            onClick={onClickNextPage}
            disabled={filteredBoards.length < 10}
            aria-label="다음 페이지"
          >
            ›
          </button>
        </div>

        {/* 현재 페이지 정보 표시 */}
        <div className={styles.pageInfo}>
          페이지 {page} (현재 {filteredBoards.length}개의 게시글)
        </div>
      </section>

      {/* 삭제 확인 모달 */}
      <Modal
        title="게시글 삭제"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        okText="예"
        cancelText="아니오"
        centered
      >
        <p>정말 삭제하시겠습니까?</p>
      </Modal>
    </div>
  );
}
