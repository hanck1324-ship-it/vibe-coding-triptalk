"use client";

import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./styles.module.css";
import { useBoardDetail } from "./hook";
import dynamic from 'next/dynamic';
const ReactPlayer = dynamic(() => import('react-player').then(mod => mod.default), {
  ssr: false,
  loading: () => <div>영상 로딩 중...</div>
});
import { LikeOutlined, DislikeOutlined } from '@ant-design/icons';
import { Tooltip, Modal, Input, Button } from 'antd'; 

import locationImage from "@/assets/icons/location.png";
import clipImage from "@/assets/icons/clip.png";
import profileImage from "@/assets/icons/profile_image.png";

export default function BoardsDetail() {
  const router = useRouter();
  const params = useParams();
  const boardId = params.boardId as string;

  const {
    board,
    loading,
    isDeleteModalOpen,
    deletePassword,
    setDeletePassword,
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleLikeClick,
  } = useBoardDetail(boardId);

  if (loading) { return <div>게시글을 불러오는 중입니다...</div>; }

  const fullAddress = `${board?.boardAddress?.zipcode || ''} ${board?.boardAddress?.address || ''} ${board?.boardAddress?.addressDetail || ''}`.trim();

  return (
    <div className={styles.detailLayout}>
      <div className={styles.detailBody}>
        <div className={styles.detailFrame}>
          <div className={styles.detailSubject}>{board?.title}</div>
          
          <div className={styles.detailMetadataContainer}>
            <div className={styles.detailMetadataProfile}>
              <Image src={profileImage} alt="프로필이미지" width={40} height={40} />
              <div>{board?.writer}</div>
            </div>
            <div className={styles.detailMetadataDate}>
              {board?.createdAt?.split("T")[0]}
            </div>
          </div>

          <div className={styles.detailMetadataIconContainer}>
            <Image src={clipImage} alt="클립아이콘" />
            <Tooltip title={fullAddress}>
              <Image src={locationImage} alt="위치아이콘" />
            </Tooltip>
          </div>

          <div className={styles.detailContentContainer}>
            <div className={styles.detailContentText}>{board?.contents}</div>
            {board?.youtubeUrl && board.youtubeUrl.trim() !== '' && (
              <div className={styles.detailYoutubeWrapper}>
                <ReactPlayer
                  url={board.youtubeUrl}
                  width="100%"
                  height="400px"
                  controls
                  onError={(e: any) => console.error('유튜브 영상을 불러올 수 없습니다:', e)}
                />
              </div>
            )}
            
            <div className={styles.detailContentGoodOrBad}>
              <div
                className={styles.detailGoodContainer}
                onClick={handleLikeClick}
                style={{ cursor: 'pointer' }}
              >
                <LikeOutlined style={{ fontSize: '24px', color: '#FFD600' }} />
                <div className={styles.detailGoodText}>{board?.likeCount}</div>
              </div>
              <div className={styles.detailGoodContainer}>
                <DislikeOutlined style={{ fontSize: '24px', color: '#828282' }} />
                <div className={styles.detailBadText}>{board?.dislikeCount}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.detailButtonsContainer}>
          <button className={styles.detailButton} onClick={() => router.push('/boards')}>
            목록으로
          </button>
          <button className={styles.detailButton} onClick={() => router.push(`/boards/${boardId}/edit`)}>
            수정하기
          </button>
          <button 
            className={styles.detailButton} 
            onClick={handleDeleteClick}
            style={{ backgroundColor: '#ff4d4f', color: 'white' }}
          >
            삭제하기
          </button>
        </div>
      </div>

      {/* 삭제 확인 모달 */}
      <Modal
        title="게시물 삭제"
        open={isDeleteModalOpen}
        onOk={handleDeleteConfirm}
        onCancel={handleDeleteCancel}
        footer={[
          <Button key="cancel" onClick={handleDeleteCancel}>
            취소
          </Button>,
          <Button key="delete" type="primary" danger onClick={handleDeleteConfirm}>
            삭제
          </Button>,
        ]}
      >
        <p>정말로 이 게시물을 삭제하시겠습니까?</p>
        <p style={{ color: '#ff4d4f', fontSize: '12px', marginTop: '8px' }}>
          삭제된 게시물은 복구할 수 없습니다.
        </p>
      </Modal>
    </div>
  );
}