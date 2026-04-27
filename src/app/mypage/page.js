"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import PromptList from "@/components/common/PromptList";

export default function MyPage() {
    const router = useRouter();
    const user = useUserStore((state) => state.user);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, [])

    if (!mounted) return;
    if (!user) {
        router.replace('/')
    }

    if (!user) {
        return <p>로그인 필요</p>;
    }

    return (
        <div>
            <h1>마이페이지</h1>
            <p>{user.name}님 환영합니다</p>

            <h2>내가 쓴 프롬프트</h2>
            <PromptList userId={user.id} />
        </div>
    );
}