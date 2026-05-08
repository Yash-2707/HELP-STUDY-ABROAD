'use client'

import { create } from 'zustand'
import { User, UsersResponse } from '@/types/user'
import * as api from '@/lib/dummyJsonApi'

interface UserCache {
  [key: string]: UsersResponse
}

interface UserDetailCache {
  [id: number]: User
}

interface UserState {
  users: User[]
  total: number
  isLoading: boolean
  error: string | null
  page: number
  limit: number
  searchQuery: string
  cache: UserCache
  userCache: UserDetailCache
  fetchUsers: (page: number, limit?: number) => Promise<void>
  searchUsers: (query: string) => Promise<void>
  fetchUserById: (id: number) => Promise<User>
  setPage: (page: number) => void
  setSearchQuery: (query: string) => void
  reset: () => void
}

export const useUserStore = create<UserState>((set, get) => ({
  users: [],
  total: 0,
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  searchQuery: '',
  cache: {},
  userCache: {},

  fetchUsers: async (page: number, limit: number = 10) => {
    set({ isLoading: true, error: null })
    try {
      const cacheKey = `${page}-${limit}`
      const cached = get().cache[cacheKey]

      if (cached) {
        set({
          users: cached.users,
          total: cached.total,
          page,
          isLoading: false,
        })
        return
      }

      const skip = (page - 1) * limit
      const data = await api.fetchUsers(limit, skip)

      set((state) => ({
        users: data.users,
        total: data.total,
        page,
        cache: { ...state.cache, [cacheKey]: data },
        isLoading: false,
      }))
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      })
    }
  },

  searchUsers: async (query: string) => {
    set({ isLoading: true, error: null, searchQuery: query, page: 1 })
    try {
      if (!query.trim()) {
        await get().fetchUsers(1, get().limit)
        return
      }

      const data = await api.searchUsers(query)
      set({
        users: data.users,
        total: data.total,
        isLoading: false,
      })
    } catch (error) {
      set({
        error: (error as Error).message,
        isLoading: false,
      })
    }
  },

  fetchUserById: async (id: number) => {
    const cached = get().userCache[id]
    if (cached) return cached

    try {
      const user = await api.fetchUserById(id)
      set((state) => ({
        userCache: { ...state.userCache, [id]: user },
      }))
      return user
    } catch (error) {
      set({
        error: (error as Error).message,
      })
      throw error
    }
  },

  setPage: (page: number) => {
    set({ page })
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  reset: () => {
    set({
      users: [],
      total: 0,
      page: 1,
      searchQuery: '',
      cache: {},
    })
  },
}))
