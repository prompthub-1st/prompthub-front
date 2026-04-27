'use client'

import { usePromptStore } from "@/store/usePromptStore";
import { useEffect } from "react";
import PromptCard from "./PromptCard";
import styles from "./PromptList.module.css";

export default function PromptList({ userId }) {

    const { prompts, fetchPrompts } = usePromptStore();

    useEffect(() => {

        console.log("🔥 PromptList userId:", userId);
        if (!userId) return;

        if (prompts.length > 0) return;

        fetchPrompts(userId);
    }, [userId]);

    return (
        <div className={styles.container}>
            {prompts.length === 0 ? (
                <p className={styles.empty}>프롬프트가 없습니다.</p>
            ) : (
                <div className={styles.grid}>
                    {prompts.map((prompt) => (
                        <PromptCard key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            )}
        </div>
    )

}