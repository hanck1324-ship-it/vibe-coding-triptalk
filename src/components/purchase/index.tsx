"use client";

import styles from "./styles.module.css";
import Image from "next/image";

export default function Purchase() {
  return (
    <div className={styles.body}>
      {/* 메인페이지 추천 페이지 영역 (285:31930) */}
      <div className={styles.mainRecommendArea}>
        {/* 제목 텍스트 영역 (285:31931) */}
        <h1 className={styles.mainRecommendTitle}>2024 끝여름 낭만있게 마무리 하고 싶다면?</h1>
        
        {/* 메인 배너 카드 영역 (285:31932) */}
        <div className={styles.mainBannerContainer}>
          {/* 첫 번째 숙박권 카드 (285:31933) */}
          <div className={styles.mainBannerCard}>
            <div className={styles.mainBannerImage}>
              <Image
                src="/accommodation_card_placeholder.png"
                alt="포항 숙소"
                fill
                className={styles.mainBannerImageBg}
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.mainBannerGradient}></div>
              <div className={styles.mainBannerBookmarkBadge}>
                <Image src="/icon_bookmark.png" alt="북마크" width={24} height={24} />
                <span className={styles.mainBannerBookmarkCount}>24</span>
              </div>
              <div className={styles.mainBannerContent}>
                <div className={styles.mainBannerCardTitle}>포항 : 당장 가고 싶은 숙소</div>
                <div className={styles.mainBannerCardDescription}>
                  살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고 쳥산(靑山)애 살어리랏다얄리얄리 얄랑셩 얄라리 얄라
                </div>
                <div className={styles.mainBannerPrice}>
                  <span className={styles.mainBannerPriceAmount}>32,900</span>
                  <span className={styles.mainBannerPriceUnit}>원</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 두 번째 숙박권 카드 (285:31934) */}
          <div className={styles.mainBannerCard}>
            <div className={styles.mainBannerImage}>
              <Image
                src="/accommodation_card_placeholder.png"
                alt="강릉 숙소"
                fill
                className={styles.mainBannerImageBg}
                style={{ objectFit: 'cover' }}
              />
              <div className={styles.mainBannerGradient}></div>
              <div className={styles.mainBannerBookmarkBadge}>
                <Image src="/icon_bookmark.png" alt="북마크" width={24} height={24} />
                <span className={styles.mainBannerBookmarkCount}>24</span>
              </div>
              <div className={styles.mainBannerContent}>
                <div className={styles.mainBannerCardTitle}>강릉 : 마음까지 깨끗해지는 하얀 숙소</div>
                <div className={styles.mainBannerCardDescription}>
                  살어리 살어리랏다 강릉에 평생 살어리랏다
                </div>
                <div className={styles.mainBannerPrice}>
                  <span className={styles.mainBannerPriceAmount}>32,900</span>
                  <span className={styles.mainBannerPriceUnit}>원</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* 우측 페이지 버튼 (285:31935) */}
          <button className={styles.rightPageButton}></button>
        </div>
      </div>

      {/* 광고 배너 영역 (285:31937) */}
      <div className={styles.adBanner}>
        {/* 배너 컨텐츠 영역 (285:31941) */}
        <div className={styles.adBannerContent}>
          {/* 배지 컨테이너 (285:31942) */}
          <div className={styles.adBannerBadges}>
            {/* 첫 번째 배지 (285:31943) */}
            <div className={styles.adBannerBadge}>솔로트립 독점 숙소</div>
            {/* 두 번째 배지 (285:31945) */}
            <div className={styles.adBannerBadge}>9.24 얼리버드 오픈 예약</div>
          </div>
          {/* 배너 제목 텍스트 (285:31947) */}
          <h2 className={styles.adBannerTitle}>
            천만 관객이 사랑한 빌 페소 르꼬 전시회 근처 숙소 특가 예약
          </h2>
        </div>
      </div>

      {/* 숙소 배너 영역 (285:31948) */}
      <div className={styles.accommodationBanner}>
        {/* 섹션 제목 (285:31949) */}
        <h2 className={styles.sectionTitle}>여기에서만 예약할 수 있는 숙소</h2>
        
        {/* 탭 영역 (285:31950) */}
        <div className={styles.tabContainer}>
          <button className={`${styles.tab} ${styles.tabActive}`} data-testid="tab-available">예약 가능 숙소</button>
          <button className={styles.tab} data-testid="tab-closed">예약 마감 숙소</button>
        </div>

        {/* 검색/필터 영역 (285:31953) */}
        <div className={styles.searchFilterContainer}>
          {/* 날짜 선택기 (285:31956) */}
          <div className={styles.datePickerContainer}>
            <div className={styles.datePicker}>
              <span className={styles.datePlaceholder}>YYYY.MM.DD - YYYY.MM.DD</span>
            </div>
          </div>
          {/* 검색바 (285:31955) */}
          <div className={styles.searchBarContainer}>
            <input
              type="text"
              placeholder="제목을 검색해 주세요."
              className={styles.searchBar}
              data-testid="search-input"
            />
          </div>
          {/* 검색 버튼 (285:31957) */}
          <button className={styles.searchButton} data-testid="search-button">검색</button>
          {/* 숙박권 판매하기 버튼 (285:31958) */}
          <button className={styles.sellButton} data-testid="sell-button">숙박권 판매하기</button>
        </div>

        {/* 카테고리 필터 영역 (285:31960) */}
        <div className={styles.categoryFilterContainer}>
          {/* 1인 전용 카테고리 (285:31961) */}
          <div className={styles.categoryItem} data-testid="category-single-person">
            <Image src="/icon_single_person.png" alt="1인 전용" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>1인 전용</span>
          </div>
          {/* 아파트 카테고리 (285:31964) */}
          <div className={styles.categoryItem} data-testid="category-apartment">
            <Image src="/icon_apartment.png" alt="아파트" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>아파트</span>
          </div>
          {/* 호텔 카테고리 (285:31967) */}
          <div className={styles.categoryItem} data-testid="category-hotel">
            <Image src="/icon_hotel.png" alt="호텔" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>호텔</span>
          </div>
          {/* 캠핑 카테고리 (285:31970) */}
          <div className={styles.categoryItem} data-testid="category-camp">
            <Image src="/icon_camp.png" alt="캠핑" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>캠핑</span>
          </div>
          {/* 룸 서비스 가능 카테고리 (285:31973) */}
          <div className={styles.categoryItem} data-testid="category-room-service">
            <Image src="/icon_room_service.png" alt="룸 서비스 가능" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>룸 서비스 가능</span>
          </div>
          {/* 불멍 카테고리 (285:31976) */}
          <div className={styles.categoryItem} data-testid="category-fire">
            <Image src="/icon_fire.png" alt="불멍" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>불멍</span>
          </div>
          {/* 반신욕&스파 카테고리 (285:31979) */}
          <div className={styles.categoryItem} data-testid="category-spa">
            <Image src="/icon_spa.png" alt="반신욕&스파" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>반신욕&스파</span>
          </div>
          {/* 바다 위 숙소 카테고리 (285:31982) */}
          <div className={styles.categoryItem} data-testid="category-house-on-sea">
            <Image src="/icon_house_on_sea.png" alt="바다 위 숙소" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>바다 위 숙소</span>
          </div>
          {/* 플랜테리어 카테고리 (285:31985) */}
          <div className={styles.categoryItem} data-testid="category-planterior">
            <Image src="/icon_planterior.png" alt="플랜테리어" width={40} height={40} className={styles.categoryIcon} />
            <span className={styles.categoryLabel}>플랜테리어</span>
          </div>
        </div>

        {/* 숙박권 카드 그리드 영역 (285:31959) */}
        <div className={styles.cardGrid}>
          {/* 숙박권 카드 예시 */}
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <div key={item} className={styles.accommodationCard} data-testid={`accommodation-card-${item}`}>
              <div className={styles.cardImage}>
                <Image 
                  src="/accommodation_card_placeholder.png" 
                  alt="숙박권 이미지" 
                  width={296} 
                  height={296}
                  className={styles.cardImageImg}
                />
                <div className={styles.cardBookmarkBadge}>
                  <Image src="/icon_bookmark.png" alt="북마크" width={24} height={24} />
                  <span className={styles.cardBookmarkCount}>24</span>
                </div>
              </div>
              <div className={styles.cardContent}>
                <div className={styles.cardTitle}>살어리 살어리랏다 쳥산(靑山)애 살어리랏다</div>
                <div className={styles.cardDescription}>
                  살어리 살어리랏다 쳥산(靑山)애 살어리랏다멀위랑 ᄃᆞ래랑 먹고
                </div>
                <div className={styles.cardTags}>
                  #6인 이하 #건식 사우나 #애견동반 가능
                </div>
                <div className={styles.cardFooter}>
                  <div className={styles.cardProfile}>
                    <Image src="/profile_image.png" alt="프로필" width={24} height={24} className={styles.profileImage} />
                    <span className={styles.profileName}>빈얀트리</span>
                  </div>
                  <div className={styles.cardPrice}>
                    <span className={styles.cardPriceAmount}>32,900</span>
                    <span className={styles.cardPriceUnit}>원</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
