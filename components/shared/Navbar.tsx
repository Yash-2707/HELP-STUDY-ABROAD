'use client'

import { AppBar, Toolbar, Typography, Button, Avatar, Box, Menu, MenuItem, IconButton, Drawer, List, ListItem, ListItemText, useMediaQuery, Divider } from '@mui/material'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import LogoutIcon from '@mui/icons-material/Logout'
import DashboardIcon from '@mui/icons-material/Dashboard'
import GroupIcon from '@mui/icons-material/Group'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'

export function Navbar() {
  const { data: session } = useSession()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileOpen, setMobileOpen] = useState(false)
  const isMobile = useMediaQuery('(max-width:600px)')

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    handleClose()
    signOut({ redirect: true, callbackUrl: '/login' })
  }

  const navItems = [
    { label: 'Users', href: '/dashboard/users', icon: <GroupIcon sx={{ fontSize: '18px' }} /> },
    { label: 'Products', href: '/dashboard/products', icon: <LocalOfferIcon sx={{ fontSize: '18px' }} /> },
  ]

  if (!session) return null

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background: 'linear-gradient(135deg, #1a4d5c 0%, #2d6b7a 100%)',
          boxShadow: '0 4px 12px rgba(26, 77, 92, 0.15)',
          borderBottom: '1px solid rgba(212, 165, 116, 0.1)',
        }}
      >
        <Toolbar sx={{ padding: '12px 24px' }}>
          {/* Logo */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexGrow: 1,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.3s ease',
              '&:hover': {
                opacity: 0.9,
              },
            }}
            component={Link}
            href="/dashboard"
          >
            <Box
              sx={{
                width: '40px',
                height: '40px',
                background: 'rgba(212, 165, 116, 0.2)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
              }}
            >
              📚
            </Box>
            <Typography
              sx={{
                fontFamily: '"Cormorant Garamond", serif',
                fontSize: '20px',
                fontWeight: 700,
                color: 'white',
                letterSpacing: '-0.5px',
              }}
            >
              Help Study Abroad
            </Typography>
          </Box>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: 'flex', gap: '8px', alignItems: 'center', marginRight: '24px' }}>
              {navItems.map((item) => (
                <Link key={item.href} href={item.href} style={{ textDecoration: 'none' }}>
                  <Button
                    sx={{
                      color: 'rgba(255, 255, 255, 0.85)',
                      textTransform: 'capitalize',
                      fontSize: '14px',
                      fontWeight: 500,
                      padding: '8px 16px',
                      display: 'flex',
                      gap: '8px',
                      alignItems: 'center',
                      transition: 'all 0.3s ease',
                      borderRadius: '6px',
                      '&:hover': {
                        background: 'rgba(212, 165, 116, 0.15)',
                        color: '#d4a574',
                      },
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>
          )}

          {/* User Menu */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            {session.user?.image ? (
              <Avatar
                src={session.user.image}
                sx={{
                  width: 36,
                  height: 36,
                  cursor: 'pointer',
                  border: '2px solid rgba(212, 165, 116, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#d4a574',
                  },
                }}
                onClick={handleMenu}
              />
            ) : (
              <Avatar
                sx={{
                  width: 36,
                  height: 36,
                  background: 'rgba(212, 165, 116, 0.3)',
                  color: '#d4a574',
                  cursor: 'pointer',
                  border: '2px solid rgba(212, 165, 116, 0.3)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    borderColor: '#d4a574',
                  },
                }}
                onClick={handleMenu}
              >
                {session.user?.name?.charAt(0) || 'U'}
              </Avatar>
            )}

            {isMobile && (
              <IconButton
                color="inherit"
                onClick={() => setMobileOpen(!mobileOpen)}
                sx={{
                  color: 'rgba(255, 255, 255, 0.85)',
                }}
              >
                {mobileOpen ? <CloseIcon /> : <MenuIcon />}
              </IconButton>
            )}
          </Box>

          {/* User Dropdown Menu */}
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            slotProps={{
              paper: {
                sx: {
                  background: 'white',
                  boxShadow: '0 8px 24px rgba(44, 44, 44, 0.15)',
                  borderRadius: '12px',
                  minWidth: '240px',
                  marginTop: '8px',
                },
              },
            }}
          >
            <MenuItem disabled sx={{ padding: '12px 16px' }}>
              <Box>
                <Typography sx={{ fontSize: '12px', color: '#8b8680', fontWeight: 500 }}>ACCOUNT</Typography>
                <Typography sx={{ fontSize: '14px', color: '#2c2c2c', fontWeight: 600, marginTop: '4px' }}>
                  {session.user?.email}
                </Typography>
              </Box>
            </MenuItem>
            <Divider sx={{ margin: '8px 0', backgroundColor: '#ddd6ce' }} />
            <MenuItem
              onClick={handleLogout}
              sx={{
                padding: '12px 16px',
                color: '#c53030',
                fontSize: '14px',
                fontWeight: 500,
                display: 'flex',
                gap: '12px',
                alignItems: 'center',
                transition: 'all 0.2s ease',
                '&:hover': {
                  background: 'rgba(197, 48, 48, 0.08)',
                },
              }}
            >
              <LogoutIcon sx={{ fontSize: '18px' }} />
              Logout
            </MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      {isMobile && (
        <Drawer
          anchor="top"
          open={mobileOpen}
          onClose={() => setMobileOpen(false)}
          slotProps={{
            paper: {
              sx: {
                background: 'linear-gradient(135deg, #f5f3f0 0%, #ede8e3 100%)',
                boxShadow: '0 4px 12px rgba(44, 44, 44, 0.1)',
              },
            },
          }}
        >
          <Box sx={{ padding: '16px', width: '100%' }}>
            <List>
              {navItems.map((item) => (
                <ListItem
                  key={item.href}
                  component={Link}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  sx={{
                    borderRadius: '8px',
                    marginBottom: '8px',
                    padding: '12px 16px',
                    background: 'white',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      background: '#ede8e3',
                      transform: 'translateX(4px)',
                    },
                  }}
                >
                  <Box sx={{ display: 'flex', gap: '12px', alignItems: 'center', color: '#1a4d5c' }}>
                    {item.icon}
                    <ListItemText
                      primary={item.label}
                      slotProps={{
                        primary: {
                          sx: {
                            fontSize: '14px',
                            fontWeight: 600,
                          },
                        },
                      }}
                    />
                  </Box>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      )}
    </>
  )
}
