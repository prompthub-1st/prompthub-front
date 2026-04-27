"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/store/useUserStore";
import PromptList from "@/components/common/PromptList";
import styles from "./page.module.css";

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
        return <p className={styles.error}>로그인 필요</p>;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>마이페이지</h1>
                <p className={styles.welcome}>{user.name}님 환영합니다</p>
            </div>

            <section className={styles.section}>
                <h2 className={styles.sectionTitle}>내가 쓴 프롬프트</h2>
                <PromptList userId={user.id} />
            </section>
        </div>
    );
}