'use client'

import { useUserStore } from "@/store/useUserStore"
import { useEffect } from "react";

export default function Home() {
  const { user, login, logout } = useUserStore();

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
        <h2>User: {user ? user.name : '로그인 전'}</h2>
        <button onClick={() => login({ name: 'user1' })}>로그인</button>
        <button onClick={logout}>로그아웃</button>
      </section>
    </>
  )
}