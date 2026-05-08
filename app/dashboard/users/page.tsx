'use client'

import { useEffect, useCallback, useMemo } from 'react'
import { Box, Container, Alert } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { UserTable } from '@/components/users/UserTable'
import { SearchBar } from '@/components/shared/SearchBar'
import { PaginationBar } from '@/components/shared/PaginationBar'
import { Navbar } from '@/components/shared/Navbar'
import { LoadingSpinner } from '@/components/shared/ErrorAlert'

export default function UsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const { users, total, isLoading, error, page, fetchUsers, searchUsers, setPage } = useUserStore()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  const handleSearch = useCallback(
    (query: string) => {
      if (query.trim()) {
        searchUsers(query)
      } else {
        fetchUsers(1)
      }
    },
    [searchUsers, fetchUsers]
  )

  const handlePageChange = useCallback(
    (newPage: number) => {
      setPage(newPage)
      fetchUsers(newPage)
    },
    [setPage, fetchUsers]
  )

  useEffect(() => {
    if (status === 'authenticated') {
      fetchUsers(page)
    }
  }, [status])

  const pageCount = useMemo(() => Math.ceil(total / 10), [total])

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
                Users Directory
              </h1>
              <p
                style={{
                  margin: '8px 0 0 0',
                  color: '#8b8680',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                Browse and manage all user profiles
              </p>
            </Box>
            <SearchBar onSearch={handleSearch} placeholder="Search users by name or email..." />
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

        {isLoading && !users.length ? (
          <LoadingSpinner />
        ) : (
          <>
            <UserTable users={users} isLoading={isLoading} />
            <PaginationBar page={page} total={total} limit={10} onPageChange={handlePageChange} disabled={isLoading} />
          </>
        )}
      </Container>
    </>
  )
}
