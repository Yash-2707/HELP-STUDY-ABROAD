'use client'

import { SessionProvider } from 'next-auth/react'
import { ThemeProvider, CssBaseline } from '@/theme'
import { theme } from '@/theme'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </SessionProvider>
  )
}
