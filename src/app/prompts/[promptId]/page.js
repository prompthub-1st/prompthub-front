'use client'

import { fetchAllData } from "@/api/promptService";
import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";

export default function PromptDetailPage() {
  const params = useParams();
  const router = useRouter();
  const promptId = params.promptId;

  const { data, isLoading, isError } = useQuery({
    queryKey: ['prompts', 'all'],
    queryFn: fetchAllData,
  });
  const [copyText, setCopyText] = useState("프롬프트 복사하기")

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


  if (isLoading) return <div>상세 정보를 불러오는 중...</div>;
  if (isError) return <div>상세 정보를 불러오는데 실패했습니다.</div>;

  const prompt = data.prompts.find(p => String(p.id) === String(promptId));

  if (!prompt) return <div>존재하지 않는 프롬프트입니다.</div>;

  const userName = data.users.find(u => String(u.id) === String(prompt.userId))?.name || '익명';
  const categoryName = data.categories.find(c => String(c.id) === String(prompt.categoryId))?.name || '미분류';

  return(
    <>
      <article>
        <section>
          <h1>{prompt.title}</h1>
          <p>작성자: {userName}</p>
          <p>카테고리: {categoryName}</p>
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