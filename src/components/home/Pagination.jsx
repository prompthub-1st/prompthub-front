'use client';

import { useFilterStore } from "@/store/useFilterStore";

export default function Pagination({ totalPages }) {
  const { page, setPage } = useFilterStore();

  // 전체 페이지 수 만큼 배열을 만들어 버튼 생성
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i+1);

  if (totalPages <= 1) return null;

  return (
    <div>
      <button
        disabled={page === 1}
        onClick={() => setPage(page - 1)}
      >
        이전
      </button>
      {pageNumbers.map((num) => (
        <button
          key={num}
          onClick={() => setPage(num)}
        >
          {num}
        </button>
      ))}
      <button
        disabled={page === totalPages}
        onClick={() => setPage(page + 1)}
      >
        다음
      </button>
    </div>
  );
}