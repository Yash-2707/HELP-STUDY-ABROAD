'use client'

import { useEffect, useCallback, useMemo } from 'react'
import { Box, Container, Alert, Autocomplete, TextField } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useProductStore } from '@/store/productStore'
import { ProductGrid } from '@/components/products/ProductGrid'
import { SearchBar } from '@/components/shared/SearchBar'
import { PaginationBar } from '@/components/shared/PaginationBar'
import { Navbar } from '@/components/shared/Navbar'
import { LoadingSpinner } from '@/components/shared/ErrorAlert'

export default function ProductsPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const {
    products,
    total,
    isLoading,
    error,
    page,
    categories,
    selectedCategory,
    fetchProducts,
    searchProducts,
    filterByCategory,
    fetchCategories,
    setPage,
    setSelectedCategory,
  } = useProductStore()

  const normalizeCategoryValue = useCallback((category: unknown) => {
    if (typeof category !== 'string') return ''
    return category.trim().toLowerCase()
  }, [])

  const normalizedCategories = useMemo(
    () => Array.from(new Set(categories.map(normalizeCategoryValue).filter(Boolean))),
    [categories, normalizeCategoryValue]
  )

  const formatCategoryLabel = useCallback((category: unknown) => {
    if (typeof category !== 'string') return 'Unknown'
    const normalized = category.trim()
    if (!normalized) return 'Unknown'
    return normalized
      .split('-')
      .map((part) => (part ? part.charAt(0).toUpperCase() + part.slice(1) : part))
      .join(' ')
  }, [])

  const categoryOptions = useMemo(
    () => [
      { value: '', label: 'All Categories' },
      ...normalizedCategories.map((category) => ({
        value: category,
        label: formatCategoryLabel(category),
      })),
    ],
    [normalizedCategories, formatCategoryLabel]
  )

  const selectedCategoryValue = useMemo(
    () => (normalizedCategories.includes(selectedCategory) ? selectedCategory : ''),
    [normalizedCategories, selectedCategory]
  )

  const selectedCategoryOption = useMemo(
    () => categoryOptions.find((option) => option.value === selectedCategoryValue) ?? categoryOptions[0],
    [categoryOptions, selectedCategoryValue]
  )

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchCategories()
      fetchProducts(1)
    }
  }, [status])

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        searchProducts(query)
      } else {
        fetchProducts(1)
      }
    },
    [searchProducts, fetchProducts]
  )

  const handleCategoryChange = useCallback(
    (_event: unknown, option: { value: string; label: string } | null) => {
      const category = option?.value ?? ''
      if (category === selectedCategoryValue) return

      setSelectedCategory(category)
      if (category) {
        filterByCategory(category, 1)
      } else {
        fetchProducts(1)
      }
    },
    [filterByCategory, fetchProducts, selectedCategoryValue, setSelectedCategory]
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage)
      if (selectedCategoryValue) {
        filterByCategory(selectedCategoryValue, newPage)
      } else {
        fetchProducts(newPage)
      }
    },
    [setPage, fetchProducts, filterByCategory, selectedCategoryValue]
  )

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 6 }}>
        {/* Header */}
        <Box sx={{ mb: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: { xs: 'flex-start', md: 'center' },
              flexDirection: { xs: 'column', md: 'row' },
              gap: 3,
              mb: 4,
            }}
          >
            <Box>
              <h1
                style={{
                  margin: 0,
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: 'clamp(28px, 4vw, 36px)',
                  fontWeight: 700,
                  color: '#1a4d5c',
                  letterSpacing: '-0.5px',
                }}
              >
                Products Collection
              </h1>
              <p
                style={{
                  margin: '8px 0 0 0',
                  color: '#8b8680',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Explore our curated selection of premium products
              </p>
            </Box>
          </Box>

          {/* Filters */}
          <Box
            sx={{
              display: 'flex',
              gap: 2,
              alignItems: 'center',
              flexWrap: 'wrap',
              padding: '16px',
              background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
              borderRadius: '12px',
              border: '1px solid #ddd6ce',
            }}
          >
            <SearchBar onSearch={handleSearch} placeholder="Search products by name..." />
            {normalizedCategories.length > 0 && (
              <Autocomplete
                options={categoryOptions}
                value={selectedCategoryOption}
                onChange={handleCategoryChange}
                isOptionEqualToValue={(option, value) => option.value === value.value}
                getOptionLabel={(option) => option.label}
                sx={{
                  minWidth: 240,
                  width: { xs: '100%', sm: 280 },
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    backgroundColor: 'white',
                    fontSize: '14px',
                    '& fieldset': {
                      borderColor: '#ddd6ce',
                      borderWidth: '1px',
                    },
                    '&:hover fieldset': {
                      borderColor: '#d4a574',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: '#1a4d5c',
                      borderWidth: '2px',
                    },
                  },
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Category"
                    size="small"
                    sx={{
                      '& .MuiInputLabel-root': {
                        fontSize: '14px',
                        color: '#8b8680',
                        '&.Mui-focused': {
                          color: '#1a4d5c',
                        },
                      },
                    }}
                  />
                )}
              />
            )}
          </Box>
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              borderRadius: '8px',
              backgroundColor: 'rgba(197, 48, 48, 0.08)',
              color: '#c53030',
              borderLeft: '4px solid #c53030',
              '& .MuiAlert-icon': {
                color: '#c53030',
              },
            }}
          >
            {error}
          </Alert>
        )}

        {isLoading && !products.length ? (
          <LoadingSpinner />
        ) : (
          <>
            <ProductGrid products={products} isLoading={isLoading} />
            <PaginationBar page={page} total={total} limit={10} onPageChange={handlePageChange} disabled={isLoading} />
          </>
        )}
      </Container>
    </>
  )
}
