import type { Metadata } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'Help Study Abroad',
  description: 'Study Abroad Application Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div className="app-container">{children}</div>
        </Providers>
      </body>
    </html>
  )
}
