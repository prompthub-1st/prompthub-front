import { create } from "zustand";

const BASE_URL = 'http://localhost:3003';

export const usePromptStore = create((set) => ({
    prompts: [],

    fetchPrompts: async (userId) => {

        console.log("🔥 userId:", userId, typeof userId);
        try {
            const res = await fetch(`http://localhost:8080/prompts?userId=${userId}`, {
                credentials: "include"
            });
            const result = await res.json();

            console.log("🔥 RESULT:", result.data);

            if (!result.success) {
                throw new Error(result.message);
            }

            set({ prompts: result.data || [] });
        } catch (error) {
            console.error(error);
            set({ prompts: [] })
        }
    }
}))