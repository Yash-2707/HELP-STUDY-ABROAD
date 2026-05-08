'use client'

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthState {
  token: string | null
  user: any | null
  isLoading: boolean
  error: string | null
  setAuth: (token: string, user: any) => void
  clearAuth: () => void
  rehydrate: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,
      isLoading: false,
      error: null,

      setAuth: (token: string, user: any) => {
        set({ token, user, error: null })
        localStorage.setItem('hsa_token', token)
        localStorage.setItem('hsa_user', JSON.stringify(user))
      },

      clearAuth: () => {
        set({ token: null, user: null })
        localStorage.removeItem('hsa_token')
        localStorage.removeItem('hsa_user')
      },

      rehydrate: () => {
        const token = localStorage.getItem('hsa_token')
        const userStr = localStorage.getItem('hsa_user')
        if (token && userStr) {
          const user = JSON.parse(userStr)
          set({ token, user })
        }
      },
    }),
    {
      name: 'auth-store',
      skipHydration: true,
    }
  )
)
