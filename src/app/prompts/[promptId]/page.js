'use client'

import { deletePrompt, fetchAllData, fetchPromptById } from "@/api/promptService";
import { useUserStore } from "@/store/useUserStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PromptDetailPage() {
  const { promptId } = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { user: loginUser } = useUserStore();

  const { data: allData, isLoading, isError } = useQuery({
    queryKey: ['prompts', 'all'], 
    queryFn: fetchAllData,
  });

  const [copyText, setCopyText] = useState("프롬프트 복사하기")

  const deleteMutation = useMutation({
    mutationFn: () => deletePrompt(promptId),
    onSuccess: () => {
      // 삭제 후 리스트 캐시 무효화 및 이동
      queryClient.invalidateQueries({ queryKey: ['prompts', 'all']});
      router.push('/');
    },
    onError: () => {
      alert("삭제 중 오류가 발생했습니다.");
    }
  });

  const handleCopy = async(text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopyText("복사 완료! ✅")

      setTimeout(() => {
        setCopyText("프롬프트 복사하기")
      }, 1500)
    } catch (err) {
      console.error("복사 실패:", err);
      setCopyText("복사 실패 ❌")

      setTimeout(() => {
        setCopyText("프롬프트 복사하기")
      }, 1500)
    }
  };

  const handleDelete = () => {
    if (window.confirm("정말로 이 프롬프트를 삭제하시겠습니까?")) {
      deleteMutation.mutate();
    }
  };


  if (isLoading) return <div>데이터 로딩 중...</div>;
  if (isError) return <div>데이터를 불러오지 못했습니다.</div>;

  const prompt = allData.prompts.find(p => String(p.id) === String(promptId));
  if (!prompt) return <div>존재하지 않는 프롬프트입니다.</div>

  const userName = allData.users.find(u => String(u.id) === String(prompt.userId))?.name || '익명';
  const categoryName = allData.categories.find(c => String(c.id) === String(prompt.categoryId))?.name || '미분류';

  return(
    <>
      <article>
        <section>
          <h1>{prompt.title}</h1>
          <p>작성자: {userName}</p>
          <p>카테고리: {categoryName}</p>
          {loginUser && String(loginUser.id) === String(prompt.userId) && (
            <div>
              <button
                onClick={() => router.push(`/prompts/edit/${promptId}`)}
              >수정</button>
              <button
                onClick={handleDelete}
                disabled={deleteMutation.isPending}
              >
                {deleteMutation.isPending ? '삭제 중...' : '삭제하기'}
              </button>
            </div>
          )}
        </section>
        <hr />
        <br />
        <section>
          <h3>프롬프트 설명</h3>
          <p>
            {prompt.description}
          </p>
        </section>
        <section>
          <h3>프롬프트 내용</h3>
          <button
            onClick={() => handleCopy(prompt.content)}
            disabled={copyText !== "프롬프트 복사하기"}
          >
            {copyText}
          </button>
          <pre>
            {prompt.content}
          </pre>
        </section>
        <section>
          <button
            onClick={() => router.back()}
          >
            뒤로가기
          </button>
        </section>
      </article>
    </>
  )
}