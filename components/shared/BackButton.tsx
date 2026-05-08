'use client'

import { Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'

export function BackButton() {
  const router = useRouter()

  return (
    <Button
      startIcon={<ArrowBackIcon sx={{ fontSize: '18px' }} />}
      onClick={() => router.back()}
      sx={{
        mb: 2,
        color: '#1a4d5c',
        borderColor: '#ddd6ce',
        fontSize: '14px',
        fontWeight: 600,
        textTransform: 'capitalize',
        padding: '8px 16px',
        borderRadius: '8px',
        transition: 'all 0.2s ease',
        border: '1.5px solid',
        '&:hover': {
          borderColor: '#1a4d5c',
          background: 'rgba(26, 77, 92, 0.05)',
          transform: 'translateX(-2px)',
        },
      }}
      variant="outlined"
    >
      Back
    </Button>
  )
}
