'use client'

import { Box, Card, CardContent, Typography, Avatar, Skeleton, Alert } from '@mui/material'
import { User } from '@/types/user'
import { BackButton } from '@/components/shared/BackButton'

interface UserDetailViewProps {
  user: User | null
  isLoading: boolean
  error: string | null
}

export function UserDetailView({ user, isLoading, error }: UserDetailViewProps) {
  if (isLoading) {
    return (
      <Box>
        <BackButton />
        <Card>
          <CardContent>
            <Box sx={{ textAlign: 'center', py: 4 }}>
              <Skeleton variant="circular" width={100} height={100} sx={{ mx: 'auto', mb: 2 }} />
              <Skeleton variant="text" width="30%" sx={{ mx: 'auto', mb: 1 }} />
              <Skeleton variant="text" width="50%" sx={{ mx: 'auto' }} />
            </Box>
          </CardContent>
        </Card>
      </Box>
    )
  }

  if (error || !user) {
    return (
      <Box>
        <BackButton />
        <Alert severity="error">User not found</Alert>
      </Box>
    )
  }

  return (
    <Box>
      <BackButton />

      <Card
        sx={{
          mb: 3,
          borderRadius: '16px',
          boxShadow: '0 4px 12px rgba(44, 44, 44, 0.1)',
          border: '1px solid #ddd6ce',
          overflow: 'hidden',
        }}
      >
        <CardContent sx={{ padding: '32px' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            {user.image ? (
              <Avatar
                src={user.image}
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  boxShadow: '0 4px 12px rgba(26, 77, 92, 0.2)',
                  border: '4px solid #d4a574',
                }}
              />
            ) : (
              <Avatar
                sx={{
                  width: 120,
                  height: 120,
                  mx: 'auto',
                  mb: 3,
                  background: 'linear-gradient(135deg, #1a4d5c 0%, #2d6b7a 100%)',
                  fontSize: '48px',
                  fontWeight: 700,
                  boxShadow: '0 4px 12px rgba(26, 77, 92, 0.2)',
                }}
              >
                {user.firstName[0]}
              </Avatar>
            )}
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '32px',
                fontWeight: 700,
                color: '#1a4d5c',
                letterSpacing: '-0.5px',
              }}
            >
              {user.firstName} {user.lastName}
            </Typography>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#8b8680',
                fontWeight: 500,
                mt: 1,
              }}
            >
              @{user.username}
            </Typography>
          </Box>

          <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' }, gap: 4 }}>
            {/* Personal Information */}
            <Box
              sx={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
                borderRadius: '12px',
                border: '1px solid #ddd6ce',
              }}
            >
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#1a4d5c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 3,
                }}
              >
                Personal Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Email</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>{user.email}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Phone</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>{user.phone}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Gender</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>{user.gender}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Age</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>{user.age}</Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Birth Date</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>
                    {new Date(user.birthDate).toLocaleDateString()}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Blood Group</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>{user.bloodGroup}</Typography>
                </Box>
              </Box>
            </Box>

            {/* Company Information */}
            <Box
              sx={{
                padding: '20px',
                background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
                borderRadius: '12px',
                border: '1px solid #ddd6ce',
              }}
            >
              <Typography
                sx={{
                  fontSize: '12px',
                  fontWeight: 700,
                  color: '#1a4d5c',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  mb: 3,
                }}
              >
                Company Information
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Company</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>
                    {user.company?.name || '-'}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Department</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>
                    {user.company?.department || '-'}
                  </Typography>
                </Box>
                <Box>
                  <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 600, mb: 0.5 }}>Position</Typography>
                  <Typography sx={{ fontSize: '13px', color: '#2c2c2c', fontWeight: 500 }}>
                    {user.company?.title || '-'}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}
