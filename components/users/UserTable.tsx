'use client'

import React from 'react'
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Skeleton, Link as MUILink } from '@mui/material'
import { User } from '@/types/user'
import Link from 'next/link'

interface UserTableProps {
  users: User[]
  isLoading: boolean
}

const UserTableRow = React.memo(({ user }: { user: User }) => (
  <TableRow
    sx={{
      borderBottom: '1px solid #e8dfd5',
      transition: 'background-color 0.2s ease',
      '&:hover': {
        backgroundColor: 'rgba(26, 77, 92, 0.03)',
      },
    }}
  >
    <TableCell
      sx={{
        padding: '16px',
        fontSize: '14px',
      }}
    >
      <MUILink
        component={Link}
        href={`/dashboard/users/${user.id}`}
        sx={{
          textDecoration: 'none',
          color: '#1a4d5c',
          fontWeight: 600,
          transition: 'color 0.2s ease',
          '&:hover': {
            color: '#d4a574',
          },
        }}
      >
        {user.firstName} {user.lastName}
      </MUILink>
    </TableCell>
    <TableCell sx={{ padding: '16px', fontSize: '14px', color: '#555555' }}>{user.email}</TableCell>
    <TableCell sx={{ padding: '16px', fontSize: '14px', color: '#555555' }}>{user.gender}</TableCell>
    <TableCell sx={{ padding: '16px', fontSize: '14px', color: '#555555' }}>{user.phone}</TableCell>
    <TableCell sx={{ padding: '16px', fontSize: '14px', color: '#555555' }}>{user.company?.name || '-'}</TableCell>
  </TableRow>
))

UserTableRow.displayName = 'UserTableRow'

export function UserTable({ users, isLoading }: UserTableProps) {
  return (
    <TableContainer
      component={Paper}
      sx={{
        mt: 3,
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(44, 44, 44, 0.1)',
        border: '1px solid #ddd6ce',
        overflow: 'hidden',
      }}
    >
      <Table>
        <TableHead
          sx={{
            background: 'linear-gradient(135deg, #1a4d5c 0%, #2d6b7a 100%)',
            '& th': {
              color: 'white',
              fontWeight: 700,
              fontSize: '13px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
              padding: '16px',
              borderBottom: '2px solid rgba(212, 165, 116, 0.2)',
            },
          }}
        >
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Gender</TableCell>
            <TableCell>Phone</TableCell>
            <TableCell>Company</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading ? (
            Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                {Array.from({ length: 5 }).map((_, j) => (
                  <TableCell key={j} sx={{ padding: '12px 16px' }}>
                    <Skeleton variant="text" />
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : users.length > 0 ? (
            users.map((user) => <UserTableRow key={user.id} user={user} />)
          ) : (
            <TableRow>
              <TableCell
                colSpan={5}
                align="center"
                sx={{
                  padding: '32px 16px',
                  color: '#8b8680',
                  fontSize: '14px',
                  fontWeight: 500,
                }}
              >
                No users found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  )
}
