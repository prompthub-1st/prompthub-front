'use client';

import { useFilterStore } from "@/store/useFilterStore";
import styles from "./Pagination.module.css";

export default function Pagination({ totalPages }) {
  const { page, setPage } = useFilterStore();

  // 전체 페이지 수 만큼 배열을 만들어 버튼 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i+1);

  if (totalPages <= 1) return null;

  return (
    <div className={styles.container}>
      <button
        className={`${styles.button} ${styles.navButton}`}
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        이전
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          className={`${styles.button} ${page === num ? styles.active : ''}`}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      ))}
      <button
        className={`${styles.button} ${styles.navButton}`}
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        다음
      </button>
    </div>
  );
}