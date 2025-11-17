"use client";

import { useState, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/navigation";
import { FetchBoardsDocument } from "@/commons/graphql/graphql";

export const useBoardsList = () => {
  const router = useRouter();
  const [page, setPage] = useState(1);

  const { data, loading, refetch } = useQuery(FetchBoardsDocument, {
    variables: { page },
  });

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

  return {
    boards: data?.fetchBoards || [],
    loading,
    page,
    onClickBoard,
    onClickPrevPage,
    onClickNextPage,
  };
};

