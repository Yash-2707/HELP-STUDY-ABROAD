'use client'

import React from 'react'
import {
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Box,
  Chip,
  Skeleton,
} from '@mui/material'
import { Product } from '@/types/product'
import Link from 'next/link'

interface ProductCardProps {
  product: Product
}

const ProductCardComponent = React.memo(({ product }: ProductCardProps) => (
  <Link href={`/dashboard/products/${product.id}`} style={{ textDecoration: 'none' }}>
    <Card
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
        boxShadow: '0 4px 12px rgba(44, 44, 44, 0.08)',
        border: '1px solid #ddd6ce',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 32px rgba(26, 77, 92, 0.15)',
          borderColor: '#d4a574',
        },
      }}
    >
      <CardActionArea sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            paddingTop: '100%',
            overflow: 'hidden',
            backgroundColor: '#f5f3f0',
          }}
        >
          <Box
            component="img"
            src={product.thumbnail || product.images?.[0] || '/placeholder.png'}
            alt={product.title}
            sx={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
            }}
          />
          {product.discountPercentage > 0 && (
            <Chip
              label={`-${Math.round(product.discountPercentage)}%`}
              sx={{
                position: 'absolute',
                top: 12,
                right: 12,
                background: 'linear-gradient(135deg, #c53030 0%, #a02a2a 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: '12px',
                boxShadow: '0 2px 8px rgba(197, 48, 48, 0.3)',
              }}
            />
          )}
        </Box>

        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', padding: '16px' }}>
          <Typography
            sx={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              fontSize: '14px',
              fontWeight: 600,
              color: '#1a4d5c',
              mb: 2,
              lineHeight: 1.4,
            }}
          >
            {product.title}
          </Typography>

          <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography
              sx={{
                fontWeight: 700,
                color: '#d4a574',
                fontSize: '16px',
              }}
            >
              ${product.price.toFixed(2)}
            </Typography>
            {product.discountPercentage > 0 && (
              <Typography
                sx={{
                  textDecoration: 'line-through',
                  color: '#b5ada3',
                  fontSize: '13px',
                  fontWeight: 500,
                }}
              >
                ${(product.price / (1 - product.discountPercentage / 100)).toFixed(2)}
              </Typography>
            )}
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                padding: '4px 8px',
                background: 'rgba(212, 165, 116, 0.1)',
                borderRadius: '6px',
              }}
            >
              <Typography sx={{ fontSize: '12px', fontWeight: 600, color: '#d4a574' }}>
                ⭐ {product.rating.toFixed(1)}
              </Typography>
            </Box>
            <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 500 }}>
              Stock: {product.stock}
            </Typography>
          </Box>

          <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 500 }}>
            {product.brand}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  </Link>
))

ProductCardComponent.displayName = 'ProductCard'

export function ProductGrid({ products, isLoading }: { products: Product[]; isLoading: boolean }) {
  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)', lg: 'repeat(4, 1fr)' },
        gap: 3,
        mt: 3,
      }}
    >
      {isLoading
        ? Array.from({ length: 8 }).map((_, i) => (
            <Box key={i}>
              <Card
                sx={{
                  borderRadius: '12px',
                  boxShadow: '0 4px 12px rgba(44, 44, 44, 0.08)',
                  border: '1px solid #ddd6ce',
                }}
              >
                <Skeleton variant="rectangular" height={200} />
                <CardContent>
                  <Skeleton variant="text" />
                  <Skeleton variant="text" width="60%" />
                </CardContent>
              </Card>
            </Box>
          ))
        : products.length > 0
          ? products.map((product) => (
              <Box key={product.id}>
                <ProductCardComponent product={product} />
              </Box>
            ))
          : (
              <Box sx={{ gridColumn: '1 / -1', textAlign: 'center', py: 8 }}>
                <Typography sx={{ color: '#8b8680', fontSize: '14px', fontWeight: 500 }}>
                  No products found
                </Typography>
              </Box>
            )}
    </Box>
  )
}
