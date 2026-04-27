'use client'

import { usePromptStore } from "@/store/usePromptStore";
import { useEffect } from "react";
import PromptCard from "./PromptCard";


export default function PromptList({ userId }) {

    const { prompts, fetchPrompts } = usePromptStore();

    useEffect(() => {

        console.log("🔥 PromptList userId:", userId);
        if (!userId) return;

        if (prompts.length > 0) return;

        fetchPrompts(userId);
    }, [userId]);

    return (
        <div>
            {prompts.length === 0 ? (
                <p>프롬프트가 없습니다.</p>
            ) : (
                prompts.map((prompt) => (
                    <PromptCard key={prompt.id} prompt={prompt} />
                ))
            )}
        </div>
    )

}