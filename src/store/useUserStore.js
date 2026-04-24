
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = 'http://localhost:3003'

export const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            loading: false,

            fetchUser: async () => {
                console.log('fetch 실행됨')
                set({ loading: true })

                try {
                    const res = await fetch(`${BASE_URL}/users/1`)
                    console.log('응답받음', res)
                    if (!res.ok) throw new Error('데이터 불러오기 실패')

                    const data = await res.json();
                    console.log('데이터', data)

                    set({
                        user: data,
                        loading: false
                    })
                } catch (error) {
                    console.error(error)
                    set({ loading: false })
                }
            },
            clearUser: () => set({ user: null }),
        }),
        {
            name: 'user-storage'
        }
    )
)