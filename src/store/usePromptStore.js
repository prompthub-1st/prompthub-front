import { create } from "zustand";

const BASE_URL = 'http://localhost:3003';

export const usePromptStore = create((set) => ({
    prompts: [],

    fetchPrompts: async (userId) => {

        console.log("🔥 userId:", userId, typeof userId);
        try {
            const res = await fetch(`${BASE_URL}/prompts?userId=${Number(userId)}`);
            const data = await res.json();

            console.log("🔥 RESULT:", data);

            set({ prompts: data })
        } catch (error) {
            console.error(error);
        }
    }
}))