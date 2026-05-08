import { LoginRequest, LoginResponse } from '@/types/auth'
import { UsersResponse, User } from '@/types/user'
import { ProductsResponse, Product } from '@/types/product'

const API_URL = 'https://dummyjson.com'

export async function login(credentials: LoginRequest): Promise<LoginResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
  })

  if (!response.ok) {
    throw new Error('Invalid username or password')
  }

  return response.json()
}

export async function fetchUsers(limit: number = 10, skip: number = 0): Promise<UsersResponse> {
  const response = await fetch(`${API_URL}/users?limit=${limit}&skip=${skip}`)
  if (!response.ok) throw new Error('Failed to fetch users')
  return response.json()
}

export async function searchUsers(query: string): Promise<UsersResponse> {
  const response = await fetch(`${API_URL}/users/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) throw new Error('Failed to search users')
  return response.json()
}

export async function fetchUserById(id: number): Promise<User> {
  const response = await fetch(`${API_URL}/users/${id}`)
  if (!response.ok) throw new Error('User not found')
  return response.json()
}

export async function fetchProducts(limit: number = 10, skip: number = 0): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products?limit=${limit}&skip=${skip}`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export async function searchProducts(query: string): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products/search?q=${encodeURIComponent(query)}`)
  if (!response.ok) throw new Error('Failed to search products')
  return response.json()
}

export async function fetchProductsByCategory(category: string, limit: number = 10, skip: number = 0): Promise<ProductsResponse> {
  const response = await fetch(`${API_URL}/products/category/${encodeURIComponent(category)}?limit=${limit}&skip=${skip}`)
  if (!response.ok) throw new Error('Failed to fetch products by category')
  return response.json()
}

export async function fetchProductCategories(): Promise<string[]> {
  const response = await fetch(`${API_URL}/products/categories`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  const data = await response.json()

  if (!Array.isArray(data)) {
    return []
  }

  // DummyJSON may return either string[] or objects like { slug, name, url }.
  return data
    .map((item) => {
      if (typeof item === 'string') return item
      if (item && typeof item === 'object') {
        const slug = (item as { slug?: unknown }).slug
        const name = (item as { name?: unknown }).name
        if (typeof slug === 'string') return slug
        if (typeof name === 'string') return name
      }
      return null
    })
    .filter((value): value is string => Boolean(value))
}

export async function fetchProductById(id: number): Promise<Product> {
  const response = await fetch(`${API_URL}/products/${id}`)
  if (!response.ok) throw new Error('Product not found')
  return response.json()
}
