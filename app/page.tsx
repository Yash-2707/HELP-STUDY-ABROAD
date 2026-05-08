'use client'

import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '@/components/shared/ErrorAlert'

export default function RootPage() {
  const { status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'authenticated') {
      router.replace('/dashboard')
    } else if (status === 'unauthenticated') {
      router.replace('/login')
    }
  }, [status, router])

  return <LoadingSpinner message="Redirecting..." />
}
