'use client'

import { TextField, InputAdornment } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import { useCallback, useState, useRef } from 'react'

interface SearchBarProps {
  onSearch: (query: string) => void
  placeholder?: string
}

export function SearchBar({ onSearch, placeholder = 'Search...' }: SearchBarProps) {
  const [value, setValue] = useState('')
  const [focused, setFocused] = useState(false)
  const debounceTimer = useRef<NodeJS.Timeout | null>(null)

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value
      setValue(newValue)

      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current)
      }

      debounceTimer.current = setTimeout(() => {
        onSearch(newValue)
      }, 300)
    },
    [onSearch]
  )

  return (
    <TextField
      size="small"
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      sx={{
        width: '100%',
        maxWidth: '300px',
        '& .MuiOutlinedInput-root': {
          borderRadius: '8px',
          fontSize: '14px',
          backgroundColor: focused ? 'white' : '#f5f3f0',
          transition: 'all 0.2s ease',
          '& fieldset': {
            borderColor: '#ddd6ce',
            borderWidth: '1px',
          },
          '&:hover fieldset': {
            borderColor: '#d4a574',
          },
          '&.Mui-focused fieldset': {
            borderColor: '#1a4d5c',
            borderWidth: '2px',
          },
        },
        '& .MuiInputBase-input::placeholder': {
          color: '#b5ada3',
          opacity: 1,
        },
      }}
      slotProps={{
        input: {
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ fontSize: '18px', color: '#8b8680' }} />
            </InputAdornment>
          ),
        },
      }}
    />
  )
}
