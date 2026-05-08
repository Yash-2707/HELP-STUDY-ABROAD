'use client'

import { useState } from 'react'
import {
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Box,
  Typography,
  CircularProgress,
  Container,
} from '@mui/material'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'

export function LoginForm() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Username and password are required')
      return
    }

    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        username,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError('Invalid username or password')
      } else if (result?.ok) {
        router.push('/dashboard')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
        padding: '16px',
      }}
    >
      <Container maxWidth="sm">
        <Card
          sx={{
            borderRadius: '16px',
            boxShadow: '0 12px 32px rgba(44, 44, 44, 0.16)',
            overflow: 'hidden',
            background: 'white',
            animation: 'slideUp 0.6s ease-out',
            '@keyframes slideUp': {
              from: {
                opacity: 0,
                transform: 'translateY(20px)',
              },
              to: {
                opacity: 1,
                transform: 'translateY(0)',
              },
            },
          }}
        >
          {/* Elegant Header */}
          <Box
            sx={{
              background: 'linear-gradient(135deg, #1a4d5c 0%, #2d6b7a 100%)',
              padding: '48px 24px 32px',
              textAlign: 'center',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                right: -50,
                width: 100,
                height: 100,
                background: 'rgba(212, 165, 116, 0.15)',
                borderRadius: '50%',
              },
              '&::after': {
                content: '""',
                position: 'absolute',
                bottom: -30,
                left: -30,
                width: 100,
                height: 100,
                background: 'rgba(212, 165, 116, 0.1)',
                borderRadius: '50%',
              },
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: '12px',
              }}
            >
              <Box
                sx={{
                  background: 'rgba(212, 165, 116, 0.2)',
                  padding: '12px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <LockOutlinedIcon sx={{ color: '#d4a574', fontSize: '28px' }} />
              </Box>
            </Box>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '32px',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.5px',
              }}
            >
              Help Study Abroad
            </Typography>
          </Box>

          <CardContent sx={{ padding: '48px 32px' }}>
            <Typography
              sx={{
                textAlign: 'center',
                color: '#8b8680',
                marginBottom: '32px',
                fontSize: '14px',
                fontWeight: 500,
                letterSpacing: '0.5px',
              }}
            >
              Sign in to your account to continue
            </Typography>

            {error && (
              <Alert
                severity="error"
                sx={{
                  marginBottom: '24px',
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

            <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <TextField
                label="Username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                disabled={isLoading}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: '#f5f3f0',
                    transition: 'all 0.3s ease',
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
                  '& .MuiInputLabel-root': {
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: '#8b8680',
                    '&.Mui-focused': {
                      color: '#1a4d5c',
                    },
                  },
                }}
              />

              <TextField
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                fullWidth
                disabled={isLoading}
                variant="outlined"
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '8px',
                    fontSize: '14px',
                    backgroundColor: '#f5f3f0',
                    transition: 'all 0.3s ease',
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
                  '& .MuiInputLabel-root': {
                    fontFamily: 'var(--font-sans)',
                    fontSize: '14px',
                    color: '#8b8680',
                    '&.Mui-focused': {
                      color: '#1a4d5c',
                    },
                  },
                }}
              />

              <Button
                type="submit"
                fullWidth
                disabled={isLoading}
                sx={{
                  marginTop: '16px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #1a4d5c 0%, #2d6b7a 100%)',
                  color: 'white',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.5px',
                  borderRadius: '8px',
                  textTransform: 'uppercase',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(26, 77, 92, 0.3)',
                  '&:hover:not(:disabled)': {
                    boxShadow: '0 8px 24px rgba(26, 77, 92, 0.4)',
                    transform: 'translateY(-2px)',
                  },
                  '&:active:not(:disabled)': {
                    transform: 'translateY(0)',
                  },
                  '&:disabled': {
                    opacity: 0.7,
                  },
                }}
              >
                {isLoading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                    <CircularProgress size={18} sx={{ color: 'white' }} />
                    <span>Signing in...</span>
                  </Box>
                ) : (
                  'Sign In'
                )}
              </Button>

              <Box sx={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid #ddd6ce' }}>
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#8b8680',
                    textAlign: 'center',
                    lineHeight: '1.8',
                  }}
                >
                  Demo credentials:
                  <br />
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color: '#1a4d5c',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                  >
                    emilys
                  </Typography>
                  {' / '}
                  <Typography
                    component="span"
                    sx={{
                      fontWeight: 600,
                      color: '#1a4d5c',
                      fontFamily: 'monospace',
                      fontSize: '12px',
                    }}
                  >
                    emilyspass
                  </Typography>
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  )
}
