"use client";

import styles from "./styles.module.css";
import { useBoardsList } from "./hook";

export default function BoardsList() {
  const { boards, loading, page, onClickBoard, onClickPrevPage, onClickNextPage } = useBoardsList();

  if (loading) {
    return <div className={styles.loading}>게시글을 불러오는 중입니다...</div>;
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.listContainer}>
        {boards.map((board: any, index: number) => (
          <div
            key={board._id}
            className={styles.boardItem}
            data-testid={`board-item-${index}`}
            onClick={() => onClickBoard(board._id)}
          >
            <div className={styles.boardWriter}>{board.writer || "익명"}</div>
            <div className={styles.boardTitle}>{board.title}</div>
            <div className={styles.boardDate}>
              {board.createdAt ? new Date(board.createdAt).toLocaleDateString() : ""}
            </div>
          </div>
        ))}
      </div>

      <div className={styles.paginationContainer}>
        <button
          className={styles.paginationButton}
          data-testid="pagination-prev-button"
          onClick={onClickPrevPage}
          disabled={page === 1}
        >
          이전
        </button>
        <span className={styles.pageNumber}>{page}</span>
        <button
          className={styles.paginationButton}
          data-testid="pagination-next-button"
          onClick={onClickNextPage}
        >
          다음
        </button>
      </div>
    </div>
  );
}
