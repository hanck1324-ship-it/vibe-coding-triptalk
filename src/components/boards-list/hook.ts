"use client";

import { useState, useCallback } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";
import { DELETE_BOARD } from "./quires";

export const useBoardsList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, loading, refetch } = useQuery(FetchBoardsDocument, {
    variables: { page },
  });

  const [deleteBoard] = useMutation(DELETE_BOARD);

  const onClickBoard = useCallback(
    (boardId: string) => {
      router.push(`/boards/${boardId}`);
    },
    [router]
  );

  const onClickPrevPage = useCallback(() => {
    if (page > 1) {
      const newPage = page - 1;
      setPage(newPage);
      refetch({ page: newPage });
    }
  }, [page, refetch]);

  const onClickNextPage = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    refetch({ page: newPage });
  }, [page, refetch]);

  const onDeleteBoard = useCallback(async (boardId: string) => {
    try {
      await deleteBoard({
        variables: { boardId },
      });
      refetch({ page });
      return true;
    } catch (error) {
      console.error("게시글 삭제 에러:", error);
      return false;
    }
  }, [deleteBoard, refetch, page]);

  return {
    boards: data?.fetchBoards || [],
    loading,
    page,
    onClickBoard,
    onClickPrevPage,
    onClickNextPage,
    onDeleteBoard,
  };
};

