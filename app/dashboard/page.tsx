'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Container, Box, Typography, Button, Card, CardContent } from '@mui/material'
import Link from 'next/link'
import { Navbar } from '@/components/shared/Navbar'
import { LoadingSpinner } from '@/components/shared/ErrorAlert'
import PeopleIcon from '@mui/icons-material/People'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

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
        {/* Welcome Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontFamily: '"Cormorant Garamond", serif',
              fontSize: 'clamp(32px, 5vw, 48px)',
              fontWeight: 700,
              color: '#1a4d5c',
              letterSpacing: '-1px',
              mb: 2,
            }}
          >
            Welcome to Help Study Abroad
          </Typography>
          <Typography
            sx={{
              fontSize: '18px',
              color: '#8b8680',
              fontWeight: 500,
              maxWidth: '600px',
              mx: 'auto',
              lineHeight: 1.7,
            }}
          >
            Manage your study abroad applications and explore our premium product collection
          </Typography>
        </Box>

        {/* Feature Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 4, mb: 8 }}>
          {/* Users Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(26, 77, 92, 0.08)',
              border: '1px solid #ddd6ce',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              py: 6,
              px: 4,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(26, 77, 92, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
              },
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 32px rgba(26, 77, 92, 0.15)',
                border: '1px solid #d4a574',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(26, 77, 92, 0.1) 0%, rgba(212, 165, 116, 0.1) 100%)',
                    padding: '20px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <PeopleIcon sx={{ fontSize: 48, color: '#1a4d5c' }} />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1a4d5c',
                  mb: 1,
                }}
              >
                Users
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#8b8680',
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Browse and manage user profiles from our growing community
              </Typography>
              <Link href="/dashboard/users" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #1a4d5c 0%, #2d6b7a 100%)',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(26, 77, 92, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(26, 77, 92, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  View Users
                </Button>
              </Link>
            </Box>
          </Card>

          {/* Products Card */}
          <Card
            sx={{
              background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
              borderRadius: '16px',
              boxShadow: '0 4px 12px rgba(26, 77, 92, 0.08)',
              border: '1px solid #ddd6ce',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              py: 6,
              px: 4,
              textAlign: 'center',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                background: 'radial-gradient(circle, rgba(212, 165, 116, 0.05) 0%, transparent 70%)',
                borderRadius: '50%',
              },
              '&:hover': {
                transform: 'translateY(-8px)',
                boxShadow: '0 12px 32px rgba(212, 165, 116, 0.15)',
                border: '1px solid #d4a574',
              },
            }}
          >
            <Box sx={{ position: 'relative', zIndex: 1 }}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  mb: 3,
                }}
              >
                <Box
                  sx={{
                    background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.1) 0%, rgba(26, 77, 92, 0.1) 100%)',
                    padding: '20px',
                    borderRadius: '16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <ShoppingCartIcon sx={{ fontSize: 48, color: '#d4a574' }} />
                </Box>
              </Box>
              <Typography
                sx={{
                  fontFamily: '"Cormorant Garamond", serif',
                  fontSize: '28px',
                  fontWeight: 700,
                  color: '#1a4d5c',
                  mb: 1,
                }}
              >
                Products
              </Typography>
              <Typography
                sx={{
                  fontSize: '14px',
                  color: '#8b8680',
                  mb: 3,
                  lineHeight: 1.6,
                }}
              >
                Explore our premium collection of products and services
              </Typography>
              <Link href="/dashboard/products" style={{ textDecoration: 'none' }}>
                <Button
                  variant="contained"
                  sx={{
                    background: 'linear-gradient(135deg, #d4a574 0%, #b58852 100%)',
                    color: 'white',
                    fontSize: '13px',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    padding: '10px 24px',
                    borderRadius: '8px',
                    boxShadow: '0 4px 12px rgba(212, 165, 116, 0.2)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      boxShadow: '0 8px 24px rgba(212, 165, 116, 0.3)',
                      transform: 'translateY(-2px)',
                    },
                  }}
                >
                  View Products
                </Button>
              </Link>
            </Box>
          </Card>
        </Box>

        {/* Stats Section */}
        <Card
          sx={{
            background: 'linear-gradient(135deg, #fefdfb 0%, #f5f3f0 100%)',
            borderRadius: '16px',
            boxShadow: '0 4px 12px rgba(26, 77, 92, 0.08)',
            border: '1px solid #ddd6ce',
          }}
        >
          <CardContent sx={{ padding: '32px' }}>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '24px',
                fontWeight: 700,
                color: '#1a4d5c',
                mb: 4,
                letterSpacing: '-0.5px',
              }}
            >
              Quick Statistics
            </Typography>
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr 1fr', sm: 'repeat(4, 1fr)' }, gap: 3 }}>
              <Box sx={{ padding: '12px' }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#8b8680',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 2,
                  }}
                >
                  Total Users
                </Typography>
                <Typography
                  sx={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#1a4d5c',
                  }}
                >
                  ~330
                </Typography>
              </Box>
              <Box sx={{ padding: '12px' }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#8b8680',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 2,
                  }}
                >
                  Total Products
                </Typography>
                <Typography
                  sx={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#1a4d5c',
                  }}
                >
                  ~194
                </Typography>
              </Box>
              <Box sx={{ padding: '12px' }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#8b8680',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 2,
                  }}
                >
                  Categories
                </Typography>
                <Typography
                  sx={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#1a4d5c',
                  }}
                >
                  16+
                </Typography>
              </Box>
              <Box sx={{ padding: '12px' }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    fontWeight: 600,
                    color: '#8b8680',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    mb: 2,
                  }}
                >
                  Avg Rating
                </Typography>
                <Typography
                  sx={{
                    fontSize: '28px',
                    fontWeight: 700,
                    color: '#1a4d5c',
                  }}
                >
                  4.5/5
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </>
  )
}
