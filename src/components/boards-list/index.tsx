"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import styles from "./styles.module.css";
import { mockBoardPosts, mockBoardCategories, getHotPosts, getPinnedPosts, getBoardPostsByCategory, type BoardPost } from "./mockData";

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
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const itemsPerPage = 10;

  // 핫한 트립토크 게시글
  const hotPosts = useMemo(() => getHotPosts().slice(0, 4), []);

  // 고정된 게시글
  const pinnedPosts = useMemo(() => getPinnedPosts(), []);

  // 카테고리별 게시글 필터링
  const filteredPosts = useMemo(
    () => getBoardPostsByCategory(selectedCategory),
    [selectedCategory]
  );

  // 검색 필터링
  const searchedPosts = useMemo(() => {
    return searchKeyword
      ? filteredPosts.filter((post) => post.title.toLowerCase().includes(searchKeyword.toLowerCase()))
      : filteredPosts;
  }, [searchKeyword, filteredPosts]);

  // 페이지네이션
  const totalPages = useMemo(
    () => Math.ceil(searchedPosts.length / itemsPerPage),
    [searchedPosts.length, itemsPerPage]
  );

  const currentPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return searchedPosts.slice(startIndex, startIndex + itemsPerPage);
  }, [searchedPosts, currentPage, itemsPerPage]);

  const handlePrevBanner = () => {
    setCurrentBannerIndex((prev) => (prev === 0 ? BANNER_IMAGES.length - 1 : prev - 1));
  };

  const handleNextBanner = () => {
    setCurrentBannerIndex((prev) => (prev === BANNER_IMAGES.length - 1 ? 0 : prev + 1));
  };

  const handleSearch = () => {
    setCurrentPage(1);
  };

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
    // 페이지 변경 시 상단으로 스크롤
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
          <button className={styles.registerButton}>
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
            {currentPosts.map((post, index) => {
              const isPinned = pinnedPosts.some((p) => p.id === post.id);
              const globalIndex = startIndex + index + 1;

              return (
                <tr
                  key={post.id}
                  className={`${styles.tableRow} ${isPinned ? styles.tableRowPinned : ""}`}
                >
                  <td className={styles.columnNumber}>{globalIndex}</td>
                  <td className={styles.columnTitle}>
                    {isPinned && <span className={styles.iconPinned}>📌</span>}
                    {post.isHot && <span className={styles.iconHot}>🔥</span>}
                    <span className={styles.postTitle}>{post.title}</span>
                    {post.commentCount > 0 && (
                      <span className={styles.commentCount}>[{post.commentCount}]</span>
                    )}
                    <button className={styles.deleteIcon} aria-label="삭제">
                      <Image 
                        src={trashIcon} 
                        alt="삭제" 
                        width={20} 
                        height={20}
                      />
                    </button>
                  </td>
                  <td className={styles.columnAuthor}>{post.author.name}</td>
                  <td className={styles.columnDate}>{post.createdAt}</td>
                  <td className={styles.columnViews}>{post.views}</td>
                  <td className={styles.columnLikes}>{post.likes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>

      {/* 6. 페이지네이션 */}
      <section className={styles.paginationSection}>
        <div className={styles.paginationContainer}>
          <button
            className={styles.paginationArrow}
            onClick={() => handlePageClick(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            aria-label="이전 페이지"
          >
            ‹
          </button>
          
          {/* 첫 페이지 */}
          {currentPage > 3 && (
            <>
              <button
                className={styles.paginationButton}
                onClick={() => handlePageClick(1)}
              >
                1
              </button>
              {currentPage > 4 && <span className={styles.paginationDots}>...</span>}
            </>
          )}

          {/* 현재 페이지 주변 페이지들 */}
          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .filter((page) => {
              // 현재 페이지 기준 앞뒤 2개씩만 표시
              return page >= currentPage - 2 && page <= currentPage + 2;
            })
            .map((page) => (
              <button
                key={page}
                className={`${styles.paginationButton} ${page === currentPage ? styles.paginationButtonActive : ""}`}
                onClick={() => handlePageClick(page)}
              >
                {page}
              </button>
            ))}

          {/* 마지막 페이지 */}
          {currentPage < totalPages - 2 && (
            <>
              {currentPage < totalPages - 3 && <span className={styles.paginationDots}>...</span>}
              <button
                className={styles.paginationButton}
                onClick={() => handlePageClick(totalPages)}
              >
                {totalPages}
              </button>
            </>
          )}

          <button
            className={styles.paginationArrow}
            onClick={() => handlePageClick(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            aria-label="다음 페이지"
          >
            ›
          </button>
        </div>

        {/* 현재 페이지 정보 표시 */}
        <div className={styles.pageInfo}>
          페이지 {currentPage} / {totalPages} (총 {searchedPosts.length}개의 게시글)
        </div>
      </section>
    </div>
  );
}
