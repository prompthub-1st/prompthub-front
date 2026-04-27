

import { create } from "zustand";
import { persist } from "zustand/middleware";


export const useUserStore = create(
    persist(
        (set) => ({
            user: null,
            loading: false,
            error: null,

            login: (user) => set({ user }),
            logout: () => set({ user: null }),
            setUser: (user) => set({ user }),

        }),
        {
            name: 'user-storage',

        }
    ))
