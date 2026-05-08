'use client'

import { Box, Pagination, Typography } from '@mui/material'

interface PaginationBarProps {
  page: number
  total: number
  limit: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

export function PaginationBar({ page, total, limit, onPageChange, disabled = false }: PaginationBarProps) {
  const totalPages = Math.ceil(total / limit)
  const startItem = (page - 1) * limit + 1
  const endItem = Math.min(page * limit, total)

  const handleChange = (_: React.ChangeEvent<unknown>, value: number) => {
    onPageChange(value)
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        mt: 4,
        mb: 2,
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: '#8b8680',
          fontSize: '13px',
          fontWeight: 500,
          minWidth: '120px',
          textAlign: 'right',
        }}
      >
        {startItem}–{endItem} of {total}
      </Typography>
      <Pagination
        count={totalPages}
        page={page}
        onChange={handleChange}
        disabled={disabled}
        sx={{
          '& .MuiPaginationItem-root': {
            borderRadius: '6px',
            border: '1px solid transparent',
            fontSize: '13px',
            fontWeight: 600,
            color: '#8b8680',
            transition: 'all 0.2s ease',
            '&:hover': {
              background: 'rgba(26, 77, 92, 0.08)',
              color: '#1a4d5c',
            },
          },
          '& .MuiPaginationItem-page.Mui-selected': {
            background: '#1a4d5c',
            color: 'white',
            border: '1px solid #1a4d5c',
            fontWeight: 700,
            '&:hover': {
              background: '#2d6b7a',
            },
          },
          '& .MuiPaginationItem-ellipsis': {
            color: '#ddd6ce',
          },
        }}
      />
    </Box>
  )
}
