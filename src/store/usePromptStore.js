import { create } from "zustand";

const BASE_URL = "http://localhost:8080/api/prompts";

export const usePromptStore = create((set) => ({
    prompts: [],

    fetchPrompts: async (userId) => {
        try {
            console.log("🔥 userId:", userId);

            // 1. 전체 데이터 가져오기
            const res = await fetch(`${BASE_URL}/list`);

            if (!res.ok) {
                throw new Error("서버 응답 에러");
            }

            const data = await res.json();

            console.log("🔥 전체 데이터:", data);

            // 2. 프론트에서 필터링
            const filtered = data.filter(
                (prompt) => String(prompt.userId) === String(userId)
            );

            console.log("🔥 필터링 결과:", filtered);

            // 3. 상태 저장
            set({ prompts: filtered });

        } catch (error) {
            console.error("fetchPrompts error:", error);
        }
    }
}));



// ========================================================
// 백엔드 연동 전 코드
// ========================================================

// import { create } from "zustand";

// const BASE_URL = 'http://localhost:3003';

// export const usePromptStore = create((set) => ({
//     prompts: [],

//     fetchPrompts: async (userId) => {

//         console.log("🔥 userId:", userId, typeof userId);
//         try {
//             const res = await fetch(`${BASE_URL}/prompts?userId=${Number(userId)}`);
//             const data = await res.json();

//             console.log("🔥 RESULT:", data);

//             set({ prompts: data })
//         } catch (error) {
//             console.error(error);
//         }
//     }
// }))
