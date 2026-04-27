'use client'

import { fetchAllData } from "@/api/promptService";
import { useFilterStore } from "@/store/useFilterStore"
import { useQuery } from "@tanstack/react-query";

export default function CategoryFilter() {
  const { selectedCategory, setCategory } = useFilterStore();

  const { data, isLoading } = useQuery({
    queryKey: ['prompts', 'all'],
    queryFn: fetchAllData,
  });

  if (isLoading) return <div>로딩 중...</div>

  const categories = [{ id: 'all', name: '전체' }, ...(data?.categories || [])];

  return (
    <>
      <div>
        { categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setCategory(String(cat.id))}
          >
            {cat.name}
          </button>
        ))}
      </div>
    </>
  );
}