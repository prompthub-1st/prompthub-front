
import { create } from "zustand";
import { persist } from "zustand/middleware";

const BASE_URL = 'http://localhost:3003'

export const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,
            isReady: false,

            login: (user) => set({ user, isReady: true }),
            logout: () => set({ user: null, isReady: true }),
            setUser: (user) => set({ user, isReady: true }),

            fetchUser: async () => {
                set({ loading: true });

                try {
                    const res = await fetch(`${BASE_URL}/users/1`)
                    const data = await res.json();

                    set({ user: data });
                } catch (error) {
                    console.error(error);
                } finally {
                    set({ loading: false })
                }
            },

        }),
        {
            name: 'user-storage'
        }
    ))
