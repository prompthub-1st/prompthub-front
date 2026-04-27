
import { create } from "zustand";

const BASE_URL = 'http://localhost:3003'

export const useUserStore = create((set) => ({
    user: null,
    loading: false,
    error: null,


    login: (userData) => set({ user: userData }),
    logout: () => set({ user: null }),
    setUser: (user) => set({ user }),

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
    }
}))
