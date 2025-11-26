
"use client";
import { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { FetchBoardDocument } from "@/commons/graphql/graphql";
import { DELETE_BOARD, LIKE_BOARD } from "./queries";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";

export const useBoardDetail = (boardId: string) => {
  const router = useRouter();
  const params = useParams();
  const id = params.boardId?.toString() || "";
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deletePassword, setDeletePassword] = useState("");
  
  // 보여줄 board 정보 받아오기
  const { data , loading} = useQuery(FetchBoardDocument, {
    variables: { boardId: boardId },
    skip: !boardId, // boardId가 없을 경우 쿼리 실행을 pass
  });

  // 디버깅: 게시글 데이터 확인
  console.log("Board data:", data?.fetchBoard);
  console.log("YouTube URL:", data?.fetchBoard?.youtubeUrl);

  // 게시물 삭제 뮤테이션
  const [deleteBoard] = useMutation(DELETE_BOARD, {
    refetchQueries: [
      {
        query: FetchBoardsDocument,
        variables: { page: 1 },
      },
    ],
  });

  // 좋아요 뮤테이션 (옵티미스틱 UI 적용)
  const [likeBoard] = useMutation(LIKE_BOARD, {
    optimisticResponse: {
      likeBoard: (data?.fetchBoard?.likeCount ?? 0) + 1,
    },
    update(cache, { data: mutationData }) {
      const existingBoard = cache.readQuery({
        query: FetchBoardDocument,
        variables: { boardId },
      });

      if (existingBoard?.fetchBoard) {
        cache.writeQuery({
          query: FetchBoardDocument,
          variables: { boardId },
          data: {
            fetchBoard: {
              ...existingBoard.fetchBoard,
              likeCount: mutationData?.likeBoard ?? existingBoard.fetchBoard.likeCount + 1,
            },
          },
        });
      }
    },
  });

  //수정하기 페이지로 이동
  const goToEditPage = () => {
    router.push(`${id}/edit`);
  };

  // 삭제 모달 열기
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };

  // 삭제 취소
  const handleDeleteCancel = () => {
    setIsDeleteModalOpen(false);
    setDeletePassword("");
  };

  // 게시물 삭제 실행
  const handleDeleteConfirm = async () => {
    try {
      await deleteBoard({
        variables: { boardId },
      });

      // 삭제 성공 시 목록 페이지로 이동
      router.push("/boards");
    } catch (error: any) {
      console.error("게시물 삭제 에러:", error);
      alert(error.message || "게시물 삭제에 실패했습니다.");
    } finally {
      setIsDeleteModalOpen(false);
      setDeletePassword("");
    }
  };

  // 좋아요 클릭 핸들러
  const handleLikeClick = async () => {
    try {
      await likeBoard({
        variables: { boardId },
      });
    } catch (error: any) {
      console.error("좋아요 에러:", error);
      alert(error.message || "좋아요에 실패했습니다.");
    }
  };

  return {
      board: data?.fetchBoard, // data 안에 들어있는 실제 게시글 정보는 data.fetchBoard
      loading, // 받아온 loading 상태를 그대로 넘겨
      goToEditPage,
      // 삭제 관련
      isDeleteModalOpen,
      deletePassword,
      setDeletePassword,
      handleDeleteClick,
      handleDeleteCancel,
      handleDeleteConfirm,
      // 좋아요 관련
      handleLikeClick,
    };
  };

