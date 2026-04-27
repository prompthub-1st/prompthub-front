'use client'

import CategoryFilter from "@/components/home/CategoryFilter"
import PromptList from "@/components/home/PromptList"
import { useUserStore } from "@/store/useUserStore"
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user, logout } = useUserStore();
  const login = useUserStore((state) => state.login)
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:3003/users');

        if (!res.ok) {
          throw new Error('서버 응답 에러');
        }
        const data = await res.json();

        login(data);
      } catch (error) {
        console.error('유저 불러오기 실패:', error)
      }
    };
    fetchUser();
  }, []);

  return (
    <>
      <section>
        <h1>프롬프트 저장소</h1>
      </section>
      <section>
        <h2>User: {user ? user.name : '로그인 전'}</h2>
        <button onClick={() => login({ id: 1, name: 'user1' })}>로그인</button>
        <button onClick={logout}>로그아웃</button>
        {user && (
          <button onClick={() => router.push('/mypage')}>마이페이지 가기</button>
        )}
      </section>
      <hr />
      <br />
      <section>
        {user && (
          <Link href="/upload">
            <button>프롬프트 업로드</button>
          </Link>
        )}
      </section>
      <section>
        <CategoryFilter />
        <PromptList />
      </section>
    </>
  )
}