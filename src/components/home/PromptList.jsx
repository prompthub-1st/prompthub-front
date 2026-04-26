import { fetchAllData } from "@/api/promptService";
import { useFilterStore } from "@/store/useFilterStore";
import { useQuery } from "@tanstack/react-query";
import PromptCard from "../common/PromptCard";

export default function PromptList() {
  // 필터 조건 꺼내오기
  const { selectedCategory, searchKeyword, page } = useFilterStore();
  const ITEMS_PER_PAGE = 8;

  // 서버에서 전체 데이터 가져오기
  const { data, isLoading, isError } = useQuery({
    queryKey: ['prompts', 'all'],
    queryFn: fetchAllData,
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>데이터 로드 실패!</div>;
  if (!data || !data.prompts) return <div>데이터가 비어있습니다.</div>;

  // 직접 합치기(Join)
  const enrichedPrompts = data.prompts.map(prompt => {
    // 1. 유저 찾기: 둘 다 String으로 변환해서 비교해야 안전합니다.
    const foundUser = data.users.find(u => String(u.id) === String(prompt.userId));
    
    // 2. 카테고리 찾기
    const foundCategory = data.categories.find(c => String(c.id) === String(prompt.categoryId));

    return {
      ...prompt,
      userName: foundUser ? foundUser.name : '익명',
      categoryName: foundCategory ? foundCategory.name : '미분류'
    };
  });

  // 🔍 필터링 로직
  const filteredData = enrichedPrompts.filter(item => {
    const matchesCategory = selectedCategory === 'all' || String(item.categoryId) === String(selectedCategory);
    const matchesSearch = item.title.toLowerCase().includes(searchKeyword.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // 📖 페이지네이션
  const paginatedData = filteredData.slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem' }}>
      {paginatedData.map(prompt => (
        <PromptCard key={prompt.id} prompt={prompt} />
      ))}
      {paginatedData.length === 0 && <p>데이터가 없습니다.</p>}
    </div>
  );
}