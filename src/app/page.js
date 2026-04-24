'use client'

import { useUserStore } from "@/store/useUserStore"

export default function Home() {
  const { user } = useUserStore();

  return (
    <div>
      {user ? (
        <>
          <h1>로그인 화면</h1>
          <p>{user.name}님 환영합니다.</p>
        </>
      ) : (
        <p>로그인이 필요합니다.</p>
      )}
    </div>
  )
}