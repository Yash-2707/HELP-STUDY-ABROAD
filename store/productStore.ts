'use client'

import { create } from 'zustand'
import { Product, ProductsResponse } from '@/types/product'
import * as api from '@/lib/dummyJsonApi'

interface ProductCache {
  [key: string]: ProductsResponse
}

interface ProductDetailCache {
  [id: number]: Product
}

interface ProductState {
  products: Product[]
  total: number
  isLoading: boolean
  error: string | null
  page: number
  limit: number
  searchQuery: string
  selectedCategory: string
  categories: string[]
  cache: ProductCache
  productCache: ProductDetailCache
  fetchProducts: (page: number, limit?: number) => Promise<void>
  searchProducts: (query: string) => Promise<void>
  filterByCategory: (category: string, page?: number) => Promise<void>
  fetchCategories: () => Promise<void>
  fetchProductById: (id: number) => Promise<Product>
  setPage: (page: number) => void
  setSelectedCategory: (category: string) => void
  setSearchQuery: (query: string) => void
  reset: () => void
}

export const useProductStore = create<ProductState>((set, get) => ({
  products: [],
  total: 0,
  isLoading: false,
  error: null,
  page: 1,
  limit: 10,
  searchQuery: '',
  selectedCategory: '',
  categories: [],
  cache: {},
  productCache: {},

  fetchProducts: async (page: number, limit: number = 10) => {
    set({ isLoading: true, error: null })
    try {
      const cacheKey = `products-${page}-${limit}`
      const cached = get().cache[cacheKey]

      if (cached) {
        set({
          products: cached.products,
          total: cached.total,
          page,
          isLoading: false,
        })
        return
      }

      const skip = (page - 1) * limit
      const data = await api.fetchProducts(limit, skip)

      set((state) => ({
        products: data.products,
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

  searchProducts: async (query: string) => {
    set({ isLoading: true, error: null, searchQuery: query, page: 1 })
    try {
      if (!query.trim()) {
        await get().fetchProducts(1, get().limit)
        return
      }

      const data = await api.searchProducts(query)
      set({
        products: data.products,
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

  filterByCategory: async (category: string, page: number = 1) => {
    set({ isLoading: true, error: null, selectedCategory: category, page })
    try {
      const cacheKey = `category-${category}-${page}`
      const cached = get().cache[cacheKey]

      if (cached) {
        set({
          products: cached.products,
          total: cached.total,
          isLoading: false,
        })
        return
      }

      const limit = get().limit
      const skip = (page - 1) * limit
      const data = await api.fetchProductsByCategory(category, limit, skip)

      set((state) => ({
        products: data.products,
        total: data.total,
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

  fetchCategories: async () => {
    try {
      const categories = await api.fetchProductCategories()
      set({ categories })
    } catch (error) {
      set({
        error: (error as Error).message,
      })
    }
  },

  fetchProductById: async (id: number) => {
    const cached = get().productCache[id]
    if (cached) return cached

    try {
      const product = await api.fetchProductById(id)
      set((state) => ({
        productCache: { ...state.productCache, [id]: product },
      }))
      return product
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

  setSelectedCategory: (category: string) => {
    set({ selectedCategory: category })
  },

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  reset: () => {
    set({
      products: [],
      total: 0,
      page: 1,
      searchQuery: '',
      selectedCategory: '',
      cache: {},
    })
  },
}))
