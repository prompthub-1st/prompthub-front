'use client'

import { fetchAllData, updatePrompt } from "@/api/promptService";
import { useUserStore } from "@/store/useUserStore";
import { QueryClient, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "next/navigation"
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function PromptEditPage() {
  const { promptId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: loginUser } = useUserStore();


  // 1. 폼 상태 관리
  const [ formData, setFormData ] = useState({
    title: '',
    description: '',
    content: '',
    categoryId: ''
  });

  // 2. 기존 데이터 가져오기
  const { data: allData, isLoading } = useQuery({
    queryKey: ['prompts', 'all'],
    queryFn: fetchAllData
  });

  // 3. 데이터를 가져온 후 폼에 초기값 세팅
  useEffect(() => {
    if (allData) {
      const targetPrompt = allData.prompts.find(p => String(p.id) === String(promptId));
      if (targetPrompt) {
        if (loginUser && String(loginUser?.id) !== String(targetPrompt.userId)) {
          alert("수정 권한이 없습니다.");
          router.back();
          return;
        }
        setFormData({
          title: targetPrompt.title,
          description: targetPrompt.description,
          content: targetPrompt.content,
          categoryId: String(targetPrompt.categoryId)
        });
      }
    }
  }, [allData, promptId, loginUser, router]);

  // 4. 렌더링에 필요한 카테고리 목록 미리 추출
  const categories = allData?.categories || [];

  // 5. 수정 처리 로직
  const mutation = useMutation({
    mutationFn: (updatedData) => updatePrompt({ id: promptId, ...updatedData}),
    onSuccess: () => {
      // 수정 후 캐시 무효화 -> 상세 페이지나 리스트가 새 데이터를 부르도록 함
      queryClient.invalidateQueries({ queryKey: ['prompts', 'all']});
      alert("성공적으로 수정되었습니다.");
      router.push(`/prompts/${promptId}`);
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.categoryId) return alert("카테고리를 선택해주세요!");
    mutation.mutate(formData);
  };

  if (isLoading) return <div>기본 정보를 불러오는 중...</div>

  return (
    <>
      <h1>프롬프트 수정하기</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <label>카테고리 선택</label>
          <div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setFormData({ ...formData, categoryId: String(cat.id)})}>
                {cat.name}
              </button>
            ))}
          </div>
        </section>
        <section>
          <label htmlFor="title">프롬프트 제목: </label>
          <input
            id="title"
            placeholder="제목을 입력하세요"
            value={formData.title} // 현재 상태값(기존 제목)을 보여줌
            onChange={(e) => setFormData({ ...formData, title: e.target.value })} // 입력 시 상태 업데이트
          />
        </section>
        <section>
          <label htmlFor="description">프롬프트 소개: </label>
          <textarea
            id="description"
            placeholder="프롬프트 소개를 입력하세요"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          />
        </section>
        <section>
          <label htmlFor="content">프롬프트 내용: </label>
          <textarea
            id="content"
            placeholder="프롬프트 내용을 입력하세요"
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </section>
        <section>
          <button
            type="button"
            onClick={() => router.push('/')}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '저장 중...' : '수정 완료'}
          </button>
        </section>
      </form>
    </>
  )
}