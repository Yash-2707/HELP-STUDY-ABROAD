'use client'

import { Alert, Button, Box } from '@mui/material'
import ReplayIcon from '@mui/icons-material/Replay'

interface ErrorAlertProps {
  message: string
  onRetry?: () => void
}

export function ErrorAlert({ message, onRetry }: ErrorAlertProps) {
  return (
    <Alert
      severity="error"
      action={
        onRetry ? (
          <Button
            color="inherit"
            size="small"
            startIcon={<ReplayIcon />}
            onClick={onRetry}
            sx={{
              color: '#c53030',
              fontSize: '12px',
              fontWeight: 600,
              textTransform: 'uppercase',
              '&:hover': {
                background: 'rgba(197, 48, 48, 0.1)',
              },
            }}
          >
            Retry
          </Button>
        ) : undefined
      }
      sx={{
        borderRadius: '8px',
        backgroundColor: 'rgba(197, 48, 48, 0.08)',
        color: '#c53030',
        border: '1px solid rgba(197, 48, 48, 0.15)',
        borderLeft: '4px solid #c53030',
        fontSize: '14px',
        fontWeight: 500,
        '& .MuiAlert-icon': {
          color: '#c53030',
        },
      }}
    >
      {message}
    </Alert>
  )
}

// Also export LoadingSpinner from here
import { CircularProgress, Typography } from '@mui/material'

interface LoadingSpinnerProps {
  message?: string
}

export function LoadingSpinner({ message = 'Loading...' }: LoadingSpinnerProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 6,
        minHeight: '400px',
      }}
    >
      <CircularProgress
        sx={{
          color: '#1a4d5c',
        }}
      />
      {message && (
        <Typography
          variant="body2"
          sx={{
            mt: 3,
            color: '#8b8680',
            fontSize: '14px',
            fontWeight: 500,
          }}
        >
          {message}
        </Typography>
      )}
    </Box>
  )
}
