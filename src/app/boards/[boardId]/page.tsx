"use client";

import BoardsDetail from "@/components/boards-detail/detail";
import CommentList from "@/components/boards-detail/comment-list";
import CommentWrite from "@/components/boards-detail/comment-write";

export default function BoardDetailPage() {
  return (
    <div>
      <BoardsDetail />
      <CommentList />
      <CommentWrite />
    </div>
  );
}


