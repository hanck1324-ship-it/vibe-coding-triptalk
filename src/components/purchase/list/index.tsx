"use client";

import Image from "next/image";
import { Input, DatePicker, Button, Modal } from "antd";
import { SearchOutlined, DeleteOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";
import { usePurchase } from "./hook";
import { mockRecommendBanners } from "./mockData";

export default function PurchaseList() {
  const router = useRouter();
  const {
    activeTab,
    searchKeyword,
    selectedDate,
    selectedCategories,
    setActiveTab,
    setSearchKeyword,
    setSelectedDate,
    handleCategoryToggle,
    handleSearch,
    travelproducts,
    allTravelproducts,
    loading,
    error,
    isDeleteModalOpen,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    loggedInUserId,
    bookmarkedIds,
    handleToggleBookmark,
    recentProducts,
    handleCardClick,
    currentPage,
    totalPages,
    handleNextPage,
    handlePrevPage,
  } = usePurchase();

  const categories = [
    "1인 전용",
    "아파트",
    "호텔",
    "캠핑",
    "룸 서비스 가능",
    "불멍",
    "반신욕&스파",
    "바다 위 숙소",
    "플랜테리어",
  ];

  return (
    <div className={styles.purchaseListContainer}>
      {/* 3. 헤더 영역 */}
      <div className={styles.header}>
        <h1 className={styles.pageTitle}>숙박권 구매</h1>
      </div>

      {/* 4. 상품 추천 영역 (285:31930) */}
      <div className={styles.recommendArea}>
        <h2 className={styles.sectionTitle}>2024 끝여름 낭만있게 마무리 하고 싶다면?</h2>
        <div className={styles.recommendCards}>
          {mockRecommendBanners.map((banner) => (
            <div key={banner.id} className={styles.recommendCard}>
              <Image
                src={banner.imagePath}
                alt={banner.title}
                fill
                style={{ objectFit: "cover" }}
              />
              <div className={styles.recommendCardContent}>
                <h3>{banner.title}</h3>
                <p>{banner.subtitle}</p>
                <p className={styles.recommendPrice}>
                  {banner.price.toLocaleString()}원
                  {banner.discount && (
                    <span className={styles.discount}> {banner.discount}% 할인</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. 광고 배너 영역 (285:31999, 285:31937) */}
      <div className={styles.bannerArea}>
        <div className={styles.banner}>
          <Image
            src="/assets/images/Solitary Contemplation Beneath Nature's Arch 1.png"
            alt="배너 이미지"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>
      </div>

      <div className={styles.adBannerArea}>
        <div className={styles.adBanner}>광고 배너</div>
      </div>

      {/* 6. 숙박권 목록 영역 (285:31948) */}
      <div className={styles.listArea}>
        <h2 className={styles.sectionTitle}>여기에서만 예약할 수 있는 숙소</h2>

        {/* 탭 */}
        <div className={styles.tabs}>
          <div
            className={`${styles.tab} ${activeTab === 'available' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('available')}
            data-testid="tab-available"
          >
            예약 가능 숙소
          </div>
          <div
            className={`${styles.tab} ${activeTab === 'closed' ? styles.tabActive : ''}`}
            onClick={() => setActiveTab('closed')}
            data-testid="tab-closed"
          >
            예약 마감 숙소
          </div>
        </div>

        {/* 검색/필터 */}
        <div className={styles.searchFilter}>
          <DatePicker
            className={styles.datePicker}
            onChange={(date) => setSelectedDate(date)}
            placeholder="날짜 선택"
          />
          <Input
            className={styles.searchBar}
            placeholder="검색어를 입력하세요"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
            onPressEnter={handleSearch}
            data-testid="search-input"
          />
          <Button
            className={styles.searchButton}
            onClick={handleSearch}
            icon={<SearchOutlined />}
            data-testid="search-button"
          >
            검색
          </Button>
          <Button
            className={styles.sellButton}
            type="primary"
            onClick={() => window.location.href = '/purchase/sell'}
          >
            숙박권 판매하기
          </Button>
        </div>

        {/* 카테고리 필터 */}
        <div className={styles.categoryFilter}>
          {categories.map((cat) => (
            <div
              key={cat}
              className={`${styles.categoryItem} ${
                selectedCategories.includes(cat) ? styles.categoryItemActive : ''
              }`}
              onClick={() => handleCategoryToggle(cat)}
              data-testid={`category-${cat}`}
            >
              {cat}
            </div>
          ))}
        </div>

        {/* 숙박권 카드 그리드 (285:31959) */}
        <div className={styles.cardGrid}>
          {loading && (
            <div className={styles.loading}>상품을 불러오는 중입니다...</div>
          )}
          {error && (
            <div className={styles.error}>상품을 불러오는 중 오류가 발생했습니다.</div>
          )}
          {!loading && !error && travelproducts.length === 0 && (
            <div className={styles.empty}>표시할 상품이 없습니다.</div>
          )}
          {!loading && !error && travelproducts.map((item) => {
            // 이미지 URL 검증 및 fallback 처리
            const getValidImageUrl = (imageUrl?: string | null): string => {
              if (!imageUrl || imageUrl.trim() === '') {
                return "/assets/images/openthesea.png";
              }
              
              const trimmedUrl = imageUrl.trim();
              
              // 유효한 URL 형식인지 확인
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

            const imageUrl = getValidImageUrl(item.images?.[0]);
            
            // 로그인한 사용자가 판매자인지 확인
            const isOwner = loggedInUserId && item.seller?._id === loggedInUserId;

            return (
              <div
                key={item._id}
                className={styles.card}
                data-testid={`accommodation-card-${item._id}`}
                onClick={() => handleCardClick(item._id)}
                style={{ cursor: 'pointer' }}
              >
                <div className={styles.cardImageWrapper}>
                  <Image
                    src={imageUrl}
                    alt={item.name || "숙박 상품"}
                    fill
                    style={{ objectFit: "cover" }}
                    onError={(e: any) => {
                      // 이미지 로드 실패 시 fallback 이미지로 교체
                      e.target.src = "/assets/images/openthesea.png";
                    }}
                  />
                </div>
                <div className={styles.cardContent}>
                  <div className={styles.cardTitle}>{item.name}</div>
                  <div className={styles.cardDescription}>{item.remarks}</div>
                  <div className={styles.cardTags}>
                    {item.tags?.map((tag, idx) => (
                      <span key={idx}>{tag} </span>
                    ))}
                  </div>
                  <div className={styles.cardFooter}>
                    <div className={styles.cardProfile}>
                      <Image
                        src={item.seller?.picture?.trim() ? item.seller.picture.trim() : "/assets/icons/profile_image.png"}
                        alt={item.seller?.name || "판매자"}
                        width={24}
                        height={24}
                        style={{ borderRadius: '50%' }}
                      />
                      <span>{item.seller?.name || "판매자"}</span>
                    </div>
                    <div className={styles.cardPrice}>
                      {item.price?.toLocaleString() || 0}원
                    </div>
                  </div>
                </div>
                {/* 북마크 버튼 */}
                <button
                  className={styles.bookmarkButton}
                  onClick={(e) => handleToggleBookmark(e, item._id)}
                  aria-label="북마크"
                >
                  {bookmarkedIds.includes(item._id) ? (
                    <HeartFilled style={{ color: '#ff4d4f' }} />
                  ) : (
                    <HeartOutlined />
                  )}
                </button>
                {/* 본인이 작성한 상품에만 삭제 버튼 표시 */}
                {isOwner && (
                  <button
                    className={styles.deleteButton}
                    onClick={(e) => handleDeleteClick(e, item._id)}
                    aria-label="삭제"
                    data-testid={`delete-button-${item._id}`}
                  >
                    <DeleteOutlined />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 7. 페이지네이션 영역 */}
      <div className={styles.pagination}>
        <button 
          className={styles.pageButton} 
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          이전
        </button>
        <span className={styles.pageInfo}>
          {currentPage} / {totalPages || 1}
        </span>
        <button 
          className={styles.pageButton} 
          onClick={handleNextPage}
          disabled={currentPage === totalPages || totalPages === 0}
        >
          다음
        </button>
      </div>

      {/* 8. 최근 본 상품 영역 (285:32006) - 96x300px */}
      <div className={styles.recentArea}>
        <div className={styles.recentTitle}>최근 본 상품</div>
        <div className={styles.recentList}>
          {recentProducts.length === 0 && (
            <div className={styles.recentEmpty}>최근 본 상품이 없습니다</div>
          )}
          {recentProducts.map((productId) => {
            const product = allTravelproducts.find((p) => p._id === productId);
            if (!product) return null;
            
            return (
              <div
                key={productId}
                className={styles.recentItem}
                onClick={() => handleCardClick(productId)}
              >
                <Image
                  src={product.images?.[0] || "/assets/images/openthesea.png"}
                  alt={product.name || "상품"}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            );
          })}
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <Modal
        title="상품 삭제"
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
