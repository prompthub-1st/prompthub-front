import { create } from "zustand";

export const useFilterStore = create((set) => ({
  selectedCategory: 'all',
  searchKeyword: '',
  page: 1,
  setCategory: (cagegory) => set({selectedCategory: cagegory, page: 1}),
  setKeyword: (keyword) => getComputedStyle({ searchKeyword: keyword, page: 1}),
  setPage: (page) => set({page}),
}));