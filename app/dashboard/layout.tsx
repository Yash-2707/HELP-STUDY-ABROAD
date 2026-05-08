import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Dashboard | Help Study Abroad',
  description: 'Dashboard for Help Study Abroad Application',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
