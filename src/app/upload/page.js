'use client'

import { fetchAllData } from "@/api/promptService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function UploadPage() {
  const router = useRouter();
  const queryClient = useQueryClient();

  // 서버에서 카테고리 목록 가져오기
  const { data, isLoading } = useQuery({
    queryKey: ['prompts', 'all'],
    queryFn: fetchAllData,
  });

  // 입력 폼 상태
  const [ form, setForm ] = useState({
    title: '',
    description: '',
    content: '',
    categoryId: ''
  });

  // 전송 로직
  const mutation = useMutation({
    mutationFn: (newPrompt) => fetch('http://localhost:3003/prompts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newPrompt)
    }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['prompts', 'all' ] });
      router.push('/');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // 유효성 검사 (카테고리 선택 여부 등)
    if (!form.categoryId) return alert("카테고리를 선택해주세요!");
    const requestData = {
      ...form,
      userId: 1
    }
    mutation.mutate(requestData);
  };

  if (isLoading) return <div>카테고리 불러오는 중...</div>

  const categories = data?.categories || [];

  return (
    <>
      <h1>프롬프트 업로드</h1>
      <form onSubmit={handleSubmit}>
        <section>
          <label>카테고리 선택</label>
          <div>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setForm({ ...form, categoryId: String(cat.id) })}
              >
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
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </section>
        <section>
          <label htmlFor="description">프롬프트 소개: </label>
          <textarea
            id="description"
            placeholder="프롬프트 소개를 입력하세요"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
        </section>
        <section>
          <label htmlFor="content">프롬프트 내용: </label>
          <textarea
            id="content"
            placeholder="프롬프트 내용을 입력하세요"
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
          />
        </section>
        <section>
          <button
            type="button"
            onClick={() => router.back()}
          >
            취소
          </button>
          <button
            type="submit"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? '등록 중...' : '프롬프트 등록하기'}
          </button>
        </section>
      </form>
    </>
  )
}