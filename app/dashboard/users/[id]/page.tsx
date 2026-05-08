'use client'

import { useEffect, useState } from 'react'
import { Box, Container, Alert } from '@mui/material'
import { useSession } from 'next-auth/react'
import { useRouter, useParams } from 'next/navigation'
import { useUserStore } from '@/store/userStore'
import { UserDetailView } from '@/components/users/UserDetailView'
import { Navbar } from '@/components/shared/Navbar'
import { LoadingSpinner } from '@/components/shared/ErrorAlert'
import { User } from '@/types/user'

export default function UserDetailPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const params = useParams()
  const userId = parseInt(params.id as string, 10)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { fetchUserById } = useUserStore()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (status === 'authenticated' && userId) {
      fetchUserById(userId)
        .then((data) => {
          setUser(data)
          setLoading(false)
        })
        .catch((err) => {
          setError((err as Error).message)
          setLoading(false)
        })
    }
  }, [status, userId, fetchUserById])

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
        <UserDetailView user={user} isLoading={loading} error={error} />
      </Container>
    </>
  )
}
