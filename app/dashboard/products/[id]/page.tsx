'use client'

import { useEffect, useState } from 'react'
import { Box, Container, Alert } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useProductStore } from '@/store/productStore'
import { ProductDetailView } from '@/components/products/ProductDetailView'
import { Navbar } from '@/components/shared/Navbar'
import { LoadingSpinner } from '@/components/shared/ErrorAlert'
import { Product } from '@/types/product'

export default function ProductDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const productId = parseInt(params.id as string, 10)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { fetchProductById } = useProductStore()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated' && productId) {
      fetchProductById(productId)
        .then((data) => {
          setProduct(data)
          setLoading(false)
        })
        .catch((err) => {
          setError((err as Error).message)
          setLoading(false)
        })
    }
  }, [status, productId, fetchProductById])

  if (status === 'loading') {
    return <LoadingSpinner />
  }

  if (status === 'unauthenticated') {
    return null
  }

  return (
    <>
      <Navbar />
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <ProductDetailView product={product} isLoading={loading} error={error} />
      </Container>
    </>
  )
}
