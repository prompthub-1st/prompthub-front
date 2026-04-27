'use client'

import { fetchAllData } from "@/api/promptService";
import { useFilterStore } from "@/store/useFilterStore"
import { useQuery } from "@tanstack/react-query";
import styles from "./CategoryFilter.module.css";

export default function CategoryFilter() {
  const { selectedCategory, setCategory } = useFilterStore();

  const { data, isLoading } = useQuery({
    queryKey: ['prompts', 'all'],
    queryFn: fetchAllData,
  });

  if (isLoading) return <div className={styles.loading}>로딩 중...</div>

  const categories = [{ id: 'all', name: '전체' }, ...(data?.categories || [])];

  return (
    <div className={styles.container}>
      { categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(String(cat.id))}
          className={`${styles.categoryButton} ${selectedCategory === String(cat.id) ? styles.active : ''}`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}