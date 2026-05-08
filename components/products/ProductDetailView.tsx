'use client'

import { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Rating,
  Alert,
  IconButton,
  Skeleton,
} from '@mui/material'
import { Product, Review } from '@/types/product'
import { BackButton } from '@/components/shared/BackButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft'
import ChevronRightIcon from '@mui/icons-material/ChevronRight'

interface ProductDetailViewProps {
  product: Product | null
  isLoading: boolean
  error: string | null
}

export function ProductDetailView({ product, isLoading, error }: ProductDetailViewProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)

  if (isLoading) {
    return (
      <Box>
        <BackButton />
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3, mt: 2 }}>
          <Box>
            <Skeleton variant="rectangular" height={400} />
          </Box>
          <Box>
            <Skeleton variant="text" width="50%" sx={{ mb: 2 }} />
            <Skeleton variant="text" width="30%" sx={{ mb: 2 }} />
            <Skeleton variant="rectangular" height={200} />
          </Box>
        </Box>
      </Box>
    )
  }

  if (error || !product) {
    return (
      <Box>
        <BackButton />
        <Alert severity="error">Product not found</Alert>
      </Box>
    )
  }

  const images = product.images && product.images.length > 0 ? product.images : [product.thumbnail]
  const hasMultipleImages = images.length > 1

  const handlePrevImage = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setActiveImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))
  }

  const discountedPrice = product.price * (1 - product.discountPercentage / 100)

  return (
    <Box>
      <BackButton />

      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mt: 2 }}>
        {/* Image Carousel */}
        <Box>
          <Card
            sx={{
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(44, 44, 44, 0.1)',
              border: '1px solid #ddd6ce',
              overflow: 'hidden',
            }}
          >
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                paddingTop: '100%',
                backgroundColor: '#f5f3f0',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={images[activeImageIndex]}
                alt={product.title}
                sx={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  padding: 3,
                }}
              />

              {hasMultipleImages && (
                <>
                  <IconButton
                    onClick={handlePrevImage}
                    sx={{
                      position: 'absolute',
                      left: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 2px 8px rgba(44, 44, 44, 0.15)',
                      color: '#1a4d5c',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'translateY(-50%) scale(1.1)',
                      },
                    }}
                  >
                    <ChevronLeftIcon />
                  </IconButton>
                  <IconButton
                    onClick={handleNextImage}
                    sx={{
                      position: 'absolute',
                      right: 12,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      backgroundColor: 'rgba(255, 255, 255, 0.95)',
                      boxShadow: '0 2px 8px rgba(44, 44, 44, 0.15)',
                      color: '#1a4d5c',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        backgroundColor: 'white',
                        transform: 'translateY(-50%) scale(1.1)',
                      },
                    }}
                  >
                    <ChevronRightIcon />
                  </IconButton>

                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'rgba(26, 77, 92, 0.85)',
                      color: 'white',
                      px: 1.5,
                      py: 0.75,
                      borderRadius: '8px',
                      fontSize: '12px',
                      fontWeight: 600,
                    }}
                  >
                    {activeImageIndex + 1} / {images.length}
                  </Box>
                </>
              )}
            </Box>
          </Card>
        </Box>

        {/* Product Details */}
        <Box>
          {/* Title & Rating */}
          <Box sx={{ mb: 4 }}>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '28px',
                fontWeight: 700,
                color: '#1a4d5c',
                letterSpacing: '-0.5px',
                mb: 2,
              }}
            >
              {product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Rating value={product.rating} readOnly size="small" sx={{ color: '#d4a574' }} />
                <Typography sx={{ fontSize: '13px', fontWeight: 600, color: '#1a4d5c' }}>
                  {product.rating.toFixed(1)}
                </Typography>
              </Box>
              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  alignItems: 'center',
                  padding: '6px 12px',
                  background: 'rgba(26, 77, 92, 0.08)',
                  borderRadius: '6px',
                }}
              >
                <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#1a4d5c' }}>
                  In Stock: {product.stock}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Pricing */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
              borderRadius: '12px',
              border: '1px solid #ddd6ce',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, mb: 1 }}>
              <Typography
                sx={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: '#d4a574',
                }}
              >
                ${discountedPrice.toFixed(2)}
              </Typography>
              {product.discountPercentage > 0 && (
                <>
                  <Typography
                    sx={{
                      fontSize: '16px',
                      textDecoration: 'line-through',
                      color: '#b5ada3',
                      fontWeight: 500,
                    }}
                  >
                    ${product.price.toFixed(2)}
                  </Typography>
                  <Chip
                    label={`Save -${Math.round(product.discountPercentage)}%`}
                    sx={{
                      background: '#c53030',
                      color: 'white',
                      fontWeight: 700,
                      fontSize: '11px',
                    }}
                    size="small"
                  />
                </>
              )}
            </Box>
            <Typography sx={{ fontSize: '12px', color: '#8b8680' }}>
              Regular price: ${product.price.toFixed(2)}
            </Typography>
          </Box>

          {/* Product Info Grid */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              background: 'white',
              border: '1px solid #ddd6ce',
              borderRadius: '12px',
            }}
          >
            <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3 }}>
              {[
                { label: 'Brand', value: product.brand },
                { label: 'Category', value: product.category },
                { label: 'SKU', value: product.sku },
                { label: 'Weight', value: `${product.weight} kg` },
              ].map((item) => (
                <Box key={item.label}>
                  <Typography sx={{ fontSize: '11px', fontWeight: 700, color: '#8b8680', textTransform: 'uppercase', letterSpacing: '0.5px', mb: 1 }}>
                    {item.label}
                  </Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>
                    {item.value}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          {/* Description */}
          <Box
            sx={{
              mb: 4,
              p: 3,
              background: 'white',
              border: '1px solid #ddd6ce',
              borderRadius: '12px',
            }}
          >
            <Typography
              sx={{
                fontSize: '11px',
                fontWeight: 700,
                color: '#8b8680',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                mb: 2,
              }}
            >
              Description
            </Typography>
            <Typography sx={{ fontSize: '13px', color: '#555555', lineHeight: 1.7 }}>
              {product.description}
            </Typography>
          </Box>

          {/* Tags */}
          {product.tags && product.tags.length > 0 && (
            <Box sx={{ mb: 4 }}>
              <Typography
                sx={{
                  fontSize: '11px',
                  fontWeight: 700,
                  color: '#8b8680',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 2,
                }}
              >
                Tags
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {product.tags.map((tag) => (
                  <Chip
                    key={tag}
                    label={tag}
                    size="small"
                    sx={{
                      fontSize: '12px',
                      fontWeight: 600,
                      backgroundColor: '#f5f3f0',
                      border: '1px solid #ddd6ce',
                      color: '#1a4d5c',
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          {/* Warranty & Shipping */}
          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 3 }}>
            {[
              { label: 'Warranty', value: product.warrantyInformation },
              { label: 'Shipping', value: product.shippingInformation },
            ].map((item) => (
              <Box
                key={item.label}
                sx={{
                  p: 3,
                  background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
                  border: '1px solid #ddd6ce',
                  borderRadius: '12px',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: '#8b8680',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 2,
                  }}
                >
                  {item.label}
                </Typography>
                <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>
                  {item.value}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
