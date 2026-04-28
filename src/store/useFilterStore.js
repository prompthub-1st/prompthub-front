import { create } from "zustand";

export const useFilterStore = create((set) => ({
  selectedCategory: 'all',
  searchKeyword: '',
  page: 1,
  // 카테고리 변경 시 페이지 1로 초기화
  setCategory: (category) => set({selectedCategory: String(category), page: 1}),
  // 검색어 변경 시 페이지 1로 초기화
  setKeyword: (keyword) => set({ searchKeyword: keyword, page: 1}),
  setPage: (page) => set({ page }),
}));