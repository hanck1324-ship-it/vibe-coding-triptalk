"use client";

import styles from "./styles.module.css";
import { usePurchaseSell } from "./hook";
import Image from "next/image";
// import addImageIcon from "@/assets/add_image.png"; // 삭제된 파일
import closeBtnIcon from "@/assets/icons/close btn.png";
import { Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import DaumPostcodeEmbed from "react-daum-postcode";
import DaumMap from "./DaumMap";

export default function PurchaseSell() {
  const {
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
  } = usePurchaseSell();

  return (
    <>
      {/* 주소 검색 모달 */}
      {isPostcodeModalOpen && (
        <Modal
          title="우편번호 검색"
          open={true}
          onCancel={handleTogglePostcodeModal}
          footer={null}
        >
          <DaumPostcodeEmbed onComplete={handleCompletePostcode} />
        </Modal>
      )}

      <div className={styles.purchaseSellContainer}>
        <div className={styles.container}>
          <div className={styles.title_section}>
            <h1 className={styles.page_title}>숙박권 판매 등록</h1>
          </div>

        <div className={styles.form_container}>
          {/* 상품명 */}
          <div className={styles.form_section}>
            <div className={styles.form_label}>
              <span>상품명</span>
              <span className={styles.required}>*</span>
            </div>
            <input
              type="text"
              value={productName}
              onChange={onChangeProductName}
              placeholder="상품명을 입력해 주세요."
              className={styles.input}
            />
          </div>

          <div className={styles.divider}></div>

          {/* 한줄요약 */}
          <div className={styles.form_section}>
            <div className={styles.form_label}>
              <span>한줄요약</span>
              <span className={styles.required}>*</span>
            </div>
            <input
              type="text"
              value={summary}
              onChange={onChangeSummary}
              placeholder="한줄요약을 입력해 주세요."
              className={styles.input}
            />
          </div>

          <div className={styles.divider}></div>

          {/* 상품설명 */}
          <div className={styles.form_section}>
            <div className={styles.form_label}>
              <span>상품설명</span>
              <span className={styles.required}>*</span>
            </div>
            <textarea
              value={description}
              onChange={onChangeDescription}
              placeholder="상품설명을 입력해 주세요. (최소 20자)"
              className={`${styles.input} ${styles.textarea}`}
            />
            {description.length > 0 && description.length < 20 && (
              <div className={styles.error_msg}>
                최소 20자 이상 입력해 주세요. (현재: {description.length}자)
              </div>
            )}
          </div>

          <div className={styles.divider}></div>

          {/* 판매 가격 */}
          <div className={styles.form_section}>
            <div className={styles.form_label}>
              <span>판매 가격</span>
              <span className={styles.required}>*</span>
            </div>
            <div className={styles.price_input_wrapper}>
              <input
                type="number"
                value={price}
                onChange={onChangePrice}
                placeholder="가격을 입력해 주세요."
                className={styles.input}
              />
              {price && Number(price) >= 1000 && (
                <span className={styles.price_unit}>
                  {Number(price).toLocaleString()}원
                </span>
              )}
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* 주소 + 위도/경도 (왼쪽) + 지도 (오른쪽) 2-Column 레이아웃 */}
          <div className={styles.address_map_container}>
            {/* 왼쪽: 주소 관련 입력 */}
            <div className={styles.address_inputs_column}>
              {/* 주소 */}
              <div className={styles.form_section_inline}>
                <div className={styles.form_label}>
                  <span>주소</span>
                  <span className={styles.required}>*</span>
                </div>
                <div className={styles.address_row}>
                  <input
                    type="text"
                    value={zipcode}
                     placeholder="01234"
                    readOnly
                    className={styles.zipcode_input}
                  />
                  <button
                    type="button"
                    onClick={handleTogglePostcodeModal}
                    className={styles.address_search_btn}
                  >
                    우편번호 검색
                  </button>
                </div>
              </div>

              {/* 상세주소 (라벨 없이) */}
              <div className={styles.form_section_inline}>
                <input
                  type="text"
                  value={addressDetail}
                  onChange={onChangeAddressDetail}
                  placeholder="상세주소를 입력해 주세요."
                  className={styles.input}
                />
              </div>

              {/* 위도(LAT) */}
              <div className={styles.form_section_inline}>
                <div className={styles.form_label}>
                  <span>위도(LAT)</span>
                  <span className={styles.required}>*</span>
                </div>
                <input
                  type="text"
                  value={latitude}
                  onChange={onChangeLatitude}
                  placeholder="주소를 먼저 입력해 주세요."
                  className={styles.input}
                  readOnly={!address}
                  disabled={!address}
                />
              </div>

              {/* 경도(LNG) */}
              <div className={styles.form_section_inline}>
                <div className={styles.form_label}>
                  <span>경도(LNG)</span>
                  <span className={styles.required}>*</span>
                </div>
                <input
                  type="text"
                  value={longitude}
                  onChange={onChangeLongitude}
                  placeholder="주소를 먼저 입력해 주세요."
                  className={styles.input}
                  readOnly={!address}
                  disabled={!address}
                />
              </div>
            </div>

            {/* 오른쪽: 지도 */}
            <div className={styles.map_column}>
              <div className={styles.form_label}>상세위치</div>
              {zipcode && address ? (
                <DaumMap address={address} onCoordinatesChange={handleSetCoordinates} />
              ) : (
                <div className={styles.map_container}>
                  <div className={styles.map_placeholder}>
                    주소를 먼저 입력해 주세요.
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className={styles.divider}></div>

          {/* 이미지 업로드 영역 */}
          <div className={styles.form_section}>
            <div className={styles.form_label}>
              <span>사진 첨부</span>
              <span className={styles.required}>*</span>
            </div>
            <div className={styles.image_upload_container}>
              {/* 업로드된 이미지 미리보기 */}
              {previewUrls.map((url, index) => (
                <div key={index} className={styles.image_preview_wrapper}>
                  <Image
                    src={url}
                    alt={`업로드 이미지 ${index + 1}`}
                    width={160}
                    height={160}
                    className={styles.image_preview}
                  />
                  <button
                    type="button"
                    className={styles.image_remove_btn}
                    onClick={() => onImageRemove(index)}
                  >
                    <Image
                      src={closeBtnIcon}
                      alt="삭제"
                      width={24}
                      height={24}
                    />
                  </button>
                </div>
              ))}

              {/* 이미지 추가 버튼 (5개 미만일 때만) */}
              {imageFiles.length < 5 && (
                <label className={styles.image_add_label}>
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png,image/webp"
                    onChange={onImageAdd}
                    className={styles.image_input}
                  />
                  <div style={{ 
                    width: '160px', 
                    height: '160px', 
                    border: '1px dashed #d9d9d9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    backgroundColor: '#fafafa'
                  }}>
                    <PlusOutlined style={{ fontSize: '32px', color: '#999' }} />
                  </div>
                </label>
              )}
            </div>
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className={styles.button_container}>
          <button
            type="button"
            onClick={() => window.history.back()}
            className={styles.cancel_button}
          >
            취소
          </button>
          <button
            type="button"
            onClick={onSubmit}
            disabled={!isFormValid || isSubmitting}
            className={
              isFormValid && !isSubmitting
                ? styles.submit_button_active
                : styles.submit_button_disabled
            }
          >
            {isSubmitting ? "등록 중..." : "등록하기"}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
